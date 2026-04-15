import * as THREE from 'three';
import { createPlayerMovementState, simulatePlayerMovement } from '../../../shared/playerMovement.js';
import { NETCODE_SIMULATION_STEP } from '../../../shared/netcode.js';
import { getImmediatePresentationVelocity, getMovementInputSnapshot } from './playerInputState.js';
import { findLandingHeightAtCurrentPosition, getNextFlyMode } from './playerFlyMode.js';
import { updatePresentationState } from './playerPresentation.js';
import { applyMotionStateCollisionSafe, movePositionCollisionSafe } from './playerCollisionMotion.js';
import { getBufferedCorrectionStep, shouldDropBufferedCorrection } from './playerBufferedCorrection.js';
import { recordRecentCorrectionEvent } from './playerCorrectionMetrics.js';
import { getReconciliationOutcome, replayAuthoritativeState } from './playerReconciliation.js';
import { MOVEMENT_TUNING } from '../movementTuning.js';

const RESOLVED_POSITION = new THREE.Vector3();
const HORIZONTAL_DELTA = new THREE.Vector3();
const SOFT_CORRECTION_DELTA = new THREE.Vector3();
const BUFFERED_CANONICAL_CORRECTION = new THREE.Vector3();
const SOFT_CORRECTION_MIN_DISTANCE = 0.02;
const SOFT_CORRECTION_MAX_DISTANCE = 2.5;
const CORRECTION_OFFSET_EPSILON = 0.0001;
const CANONICAL_CORRECTION_BLEND = 9;
const MAX_CANONICAL_CORRECTION_PER_STEP = 0.035;
const LOCAL_CORRECTION_START_DISTANCE = 0.18;
const LOCAL_CORRECTION_STOP_DISTANCE = 0.06;
const FLY_PRESENTATION_VELOCITY = new THREE.Vector3();
const BUFFERED_CORRECTION_START = new THREE.Vector3();
const BUFFERED_CORRECTION_TARGET = new THREE.Vector3();
const BUFFERED_CORRECTION_APPLIED = new THREE.Vector3();
const FOOTSTEP_SAMPLE_COUNT = 16;
const FOOTSTEP_POSITION_BEFORE_STEP = new THREE.Vector3();
const FOOTSTEP_AUDIBLE_SPEED_FLOOR = 2.46;

function getNow() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }

  return Date.now();
}

function formatSigned(value) {
  return Number(value ?? 0).toFixed(2);
}

function formatVectorText(vector) {
  return `${formatSigned(vector?.x)}, ${formatSigned(vector?.z)}`;
}

function formatPositionText(vector) {
  return `${formatSigned(vector?.x)}, ${formatSigned(vector?.y)}, ${formatSigned(vector?.z)}`;
}

function getPlanarUnitVector(x, z) {
  const length = Math.hypot(x, z);
  if (length <= 1e-6) {
    return null;
  }

  return {
    x: x / length,
    z: z / length,
  };
}

export class FirstPersonController {
  constructor(camera, input, options = {}) {
    this.camera = camera;
    this.input = input;
    this.collisionWorld = options.collisionWorld ?? null;
    this.landingSurfaces = options.landingSurfaces ?? [];
    this.audioManager = options.audioManager ?? null;
    this.getSpeedMultiplier = options.getSpeedMultiplier ?? (() => 1);
    this.getWalkSpeedFactor = options.getWalkSpeedFactor ?? (() => 0.5);
    this.movementMode = options.movementMode ?? 'grounded';
    this.allowGroundedMode = options.allowGroundedMode ?? true;

    this.collider = new THREE.Group();
    this.yaw = new THREE.Object3D();
    this.viewAnchor = new THREE.Object3D();
    this.pitch = new THREE.Object3D();

    this.standHeight = 1.72;
    this.crouchHeight = 1.08;
    this.currentHeight = this.standHeight;
    this.radius = 0.35;
    this.position = new THREE.Vector3().copy(options.position ?? new THREE.Vector3(0, 0, 0));
    this.presentationPosition = this.position.clone();
    this.presentationTargetPosition = this.position.clone();
    this.responsivePresentationOffset = new THREE.Vector3();
    this.bufferedCanonicalCorrection = new THREE.Vector3();

    this.yaw.position.copy(this.presentationPosition);
    this.yaw.add(this.viewAnchor);
    this.viewAnchor.add(this.pitch);
    this.pitch.add(this.camera);
    this.collider.add(this.yaw);

    this.velocity = new THREE.Vector3();

    this.walkSpeed = 4.92;
    this.runSpeed = 7.44;
    this.crouchSpeed = 2.64;
    this.flySpeed = 8;
    this.flySprintSpeed = 16;
    this.jumpForce = 6.1;
    this.gravity = 18;
    this.acceleration = 18;
    this.deceleration = 14;
    this.airControl = 0.35;
    this.mouseSensitivity = options.mouseSensitivity ?? 0.0011;
    this.baseFov = camera.fov;
    this.crouchLerpSpeed = 12;
    this.maxStepHeight = 0.45;

    this.groundHeight = options.groundHeight ?? 0;
    this.isGrounded = true;
    this.isCrouched = false;
    this.pitchAngle = 0;
    this.yawAngle = 0;
    this.motionState = createPlayerMovementState({
      position: this.position,
      velocity: this.velocity,
      yaw: this.yawAngle,
      isGrounded: this.isGrounded,
      isCrouched: this.isCrouched,
      currentHeight: this.currentHeight,
    });

    this.camera.position.set(0, 0, 0);
    this.pitch.position.y = this.currentHeight;
    this.correctionOffsetWorld = new THREE.Vector3();
    this.lastCorrectionDistance = 0;
    this.correctionEvents = [];
    this.correctionEnqueueEvents = [];
    this.isCorrectionActive = false;
    this.lastReconciliationAction = 'none';
    this.lastReplayInputCount = 0;
    this.lastCorrectionDeltaText = '0.00, 0.00';
    this.lastCorrectionDeltaY = 0;
    this.lastCorrectionDistanceXZ = 0;
    this.lastCorrectionAlongVelocity = 0;
    this.lastCorrectionPerpendicularVelocity = 0;
    this.lastCorrectionAlongInput = 0;
    this.lastCorrectionPerpendicularInput = 0;
    this.lastAuthoritativeVelocityText = '0.00, 0.00';
    this.lastReplayVelocityText = '0.00, 0.00';
    this.lastCurrentPositionText = '0.00, 0.00, 0.00';
    this.lastAuthoritativePositionText = '0.00, 0.00, 0.00';
    this.lastReplayPositionText = '0.00, 0.00, 0.00';
    this.visualRecoilPitch = 0;
    this.visualRecoilTargetPitch = 0;
    this.visualRecoilShotCount = 0;
    this.visualRecoilTimeSinceShot = Infinity;
    this.visualRecoilConfig = null;
    this.footstepDistance = 0;
    this.wasFootstepAudible = false;
    this.lastFootstepSampleIndex = -1;
    this.viewModelStepBob = 0;
    this.viewModelStepBobTarget = 0;
    this.viewModelStepBobSide = 1;
    this.interactionLockMode = null;
  }

  getObject() {
    return this.collider;
  }

  getDebugState(options = {}) {
    const includeVectors = Boolean(options.includeVectors);
    const horizontalSpeed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z,
    );
    const moveForward = this.input?.isPressed?.('KeyW') ?? false;
    const moveBackward = this.input?.isPressed?.('KeyS') ?? false;
    const moveLeft = this.input?.isPressed?.('KeyA') ?? false;
    const moveRight = this.input?.isPressed?.('KeyD') ?? false;
    const wantsCrouch = this.input?.isPressed?.('KeyC') ?? false;
    const wantsWalk = this.input?.isPressed?.('ShiftLeft') ?? false;
    const forwardX = -Math.sin(this.yawAngle);
    const forwardZ = -Math.cos(this.yawAngle);
    const rightX = Math.cos(this.yawAngle);
    const rightZ = -Math.sin(this.yawAngle);
    let targetMoveX = 0;
    let targetMoveZ = 0;

    if (moveForward) {
      targetMoveX += forwardX;
      targetMoveZ += forwardZ;
    }
    if (moveBackward) {
      targetMoveX -= forwardX;
      targetMoveZ -= forwardZ;
    }
    if (moveRight) {
      targetMoveX += rightX;
      targetMoveZ += rightZ;
    }
    if (moveLeft) {
      targetMoveX -= rightX;
      targetMoveZ -= rightZ;
    }

    const targetMoveLength = Math.hypot(targetMoveX, targetMoveZ);
    if (targetMoveLength > 0) {
      targetMoveX /= targetMoveLength;
      targetMoveZ /= targetMoveLength;
    }

    const targetBaseSpeed = this.movementMode === 'fly'
      ? ((this.input?.isPressed?.('ShiftLeft') ?? false) ? this.flySprintSpeed : this.flySpeed)
      : (wantsCrouch ? this.crouchSpeed : (wantsWalk ? this.walkSpeed * 0.5 : this.walkSpeed));
    const targetSpeed = targetMoveLength > 0 ? targetBaseSpeed * this.getSpeedMultiplier() : 0;
    const targetVelocityX = targetMoveLength > 0 ? targetMoveX * targetSpeed : 0;
    const targetVelocityZ = targetMoveLength > 0 ? targetMoveZ * targetSpeed : 0;
    const speedRatio = targetSpeed > 1e-6 ? horizontalSpeed / targetSpeed : 0;
    const hasVelocityDirection = horizontalSpeed > 1e-6;
    const hasTargetDirection = targetSpeed > 1e-6;
    const movementDirectionDot = hasVelocityDirection && hasTargetDirection
      ? (
        ((this.velocity.x / horizontalSpeed) * (targetVelocityX / targetSpeed))
        + ((this.velocity.z / horizontalSpeed) * (targetVelocityZ / targetSpeed))
      )
      : 1;
    const inputFlags = [
      moveForward ? 'W' : '',
      moveBackward ? 'S' : '',
      moveLeft ? 'A' : '',
      moveRight ? 'D' : '',
      wantsWalk ? 'Shift' : '',
      wantsCrouch ? 'C' : '',
    ].filter(Boolean).join('');

    const debugState = {
      grounded: this.isGrounded,
      crouched: this.isCrouched,
      walking: wantsWalk,
      speed: horizontalSpeed,
      targetSpeed,
      speedRatio,
      movementDirectionDot,
      reversingInput: hasVelocityDirection && hasTargetDirection && movementDirectionDot < -0.35,
      inputFlags: inputFlags || '-',
      targetVectorText: `${formatSigned(targetVelocityX)}, ${formatSigned(targetVelocityZ)}`,
      velocityVectorText: `${formatSigned(this.velocity.x)}, ${formatSigned(this.velocity.z)}`,
      movementMode: this.movementMode,
      positionText: `${this.position.x.toFixed(2)}, ${this.position.y.toFixed(2)}, ${this.position.z.toFixed(2)}`,
      groundDistance: Number(this.motionState?.distanceToGround ?? 0),
      supportHeight: Number.isFinite(this.motionState?.supportHeight) ? Number(this.motionState.supportHeight) : null,
      supportRatio: Number(this.motionState?.supportRatio ?? 0),
      responsiveOffsetMagnitude: this.responsivePresentationOffset.length(),
      bufferedCanonicalCorrectionMagnitude: this.bufferedCanonicalCorrection.length(),
      correctionEnqueueRatePerSecond: this.correctionEnqueueEvents.length,
      correctionActive: this.isCorrectionActive,
      correctionOffsetMagnitude: this.correctionOffsetWorld.length(),
      simulationDeltaMagnitude: horizontalSpeed * NETCODE_SIMULATION_STEP,
      lastCorrectionDistance: this.lastCorrectionDistance,
      correctionRatePerSecond: this.correctionEvents.length,
      reconciliationAction: this.lastReconciliationAction,
      replayInputCount: this.lastReplayInputCount,
      correctionDeltaText: this.lastCorrectionDeltaText,
      correctionDeltaY: this.lastCorrectionDeltaY,
      correctionDistanceXZ: this.lastCorrectionDistanceXZ,
      correctionAlongVelocity: this.lastCorrectionAlongVelocity,
      correctionPerpendicularVelocity: this.lastCorrectionPerpendicularVelocity,
      correctionAlongInput: this.lastCorrectionAlongInput,
      correctionPerpendicularInput: this.lastCorrectionPerpendicularInput,
      authoritativeVelocityText: this.lastAuthoritativeVelocityText,
      replayVelocityText: this.lastReplayVelocityText,
      currentPositionDetailText: this.lastCurrentPositionText,
      authoritativePositionText: this.lastAuthoritativePositionText,
      replayPositionText: this.lastReplayPositionText,
      interactionLockMode: this.interactionLockMode ?? 'none',
    };

    if (includeVectors) {
      debugState.position = this.position.clone();
      debugState.canonicalPosition = this.position.clone();
      debugState.presentationPosition = this.presentationPosition.clone();
      debugState.presentationTargetPosition = this.presentationTargetPosition.clone();
    }

    return debugState;
  }

  getEyePosition(target = new THREE.Vector3()) {
    return target.copy(this.position).setY(this.position.y + this.currentHeight);
  }

  getNetworkState() {
    return {
      position: {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      },
      yaw: this.yawAngle,
      pitch: this.pitchAngle,
    };
  }

  getMovementMode() {
    return this.movementMode;
  }

  setPlantInteractionLock(locked) {
    this.interactionLockMode = Boolean(locked) && this.movementMode !== 'fly' ? 'plant' : null;
  }

  setDefuseInteractionLock(locked) {
    this.interactionLockMode = Boolean(locked) && this.movementMode !== 'fly' ? 'defuse' : null;
  }

  spawnAt(spawnState = {}) {
    const nextPosition = spawnState.position ?? spawnState;
    this.position.set(
      Number(nextPosition?.x ?? 0),
      Number(nextPosition?.y ?? this.groundHeight),
      Number(nextPosition?.z ?? 0),
    );
    this.presentationPosition.copy(this.position);
    this.presentationTargetPosition.copy(this.position);
    this.velocity.set(0, 0, 0);
    this.yawAngle = Number(spawnState.yaw ?? 0);
    this.pitchAngle = Number(spawnState.pitch ?? 0);
    this.yaw.rotation.y = this.yawAngle;
    this.pitch.rotation.x = this.pitchAngle;
    this.isGrounded = this.movementMode !== 'fly';
    this.isCrouched = false;
    this.currentHeight = this.standHeight;
    this.pitch.position.y = this.currentHeight;
    this.correctionOffsetWorld.set(0, 0, 0);
    this.responsivePresentationOffset.set(0, 0, 0);
    this.bufferedCanonicalCorrection.set(0, 0, 0);
    this.isCorrectionActive = false;
    this.visualRecoilPitch = 0;
    this.visualRecoilTargetPitch = 0;
    this.visualRecoilShotCount = 0;
    this.visualRecoilTimeSinceShot = Infinity;
    this.visualRecoilConfig = null;
    this.footstepDistance = 0;
    this.wasFootstepAudible = false;
    this.viewModelStepBob = 0;
    this.viewModelStepBobTarget = 0;
    this.motionState = createPlayerMovementState({
      position: this.position,
      velocity: this.velocity,
      yaw: this.yawAngle,
      isGrounded: this.isGrounded,
      isCrouched: false,
      currentHeight: this.currentHeight,
    });
    this.yaw.position.copy(this.presentationPosition);
    this.viewAnchor.rotation.set(0, 0, 0);
  }

  setMovementMode(mode) {
    this.movementMode = mode === 'fly' ? 'fly' : 'grounded';
    this.velocity.set(0, 0, 0);
    this.motionState.velocity.x = 0;
    this.motionState.velocity.y = 0;
    this.motionState.velocity.z = 0;
    this.isGrounded = this.movementMode !== 'fly' && this.isGrounded;
    this.isCrouched = false;
    this.currentHeight = this.standHeight;
    this.pitch.position.y = this.currentHeight;
  }

  toggleFlyMode() {
    const nextFlyMode = getNextFlyMode({
      movementMode: this.movementMode,
      allowGroundedMode: this.allowGroundedMode,
      findLandingHeight: () => this.findLandingHeightAtCurrentPosition(),
    });
    if (nextFlyMode.nextMode === 'grounded') {
      this.applyGroundedLanding(nextFlyMode.landingHeight);
      return this.movementMode;
    }

    this.setMovementMode('fly');
    return this.movementMode;
  }

  applyGroundedLanding(landingHeight) {
    this.setMovementMode('grounded');
    this.position.y = landingHeight;
    this.presentationPosition.y = landingHeight;
    this.presentationTargetPosition.y = landingHeight;
    this.velocity.set(0, 0, 0);
    this.isGrounded = true;
    this.motionState.position.y = landingHeight;
    this.motionState.velocity.x = 0;
    this.motionState.velocity.y = 0;
    this.motionState.velocity.z = 0;
    this.motionState.isGrounded = true;
    this.yaw.position.copy(this.presentationPosition);
  }

  findLandingHeightAtCurrentPosition() {
    return findLandingHeightAtCurrentPosition({
      position: this.position,
      landingSurfaces: this.landingSurfaces,
      collisionWorld: this.collisionWorld,
    });
  }

  setMouseSensitivity(value) {
    this.mouseSensitivity = Math.max(0.0001, value);
  }

  setBaseFov(value) {
    this.baseFov = Math.max(1, value);
  }

  getMouseSensitivity() {
    return this.mouseSensitivity;
  }

  update(delta, frameInput) {
    this.updateLook(frameInput.lookDelta);
    FOOTSTEP_POSITION_BEFORE_STEP.copy(this.position);
    this.stepSimulation(delta, this.getMovementInputSnapshot({
      jumpPressed: frameInput.justPressed?.has?.('Space'),
    }));
  }

  updateLook(lookDelta) {
    const relativeSensitivity = this.mouseSensitivity * (this.camera.fov / this.baseFov);

    this.yawAngle -= lookDelta.x * relativeSensitivity;
    this.pitchAngle -= lookDelta.y * relativeSensitivity;
    this.pitchAngle = THREE.MathUtils.clamp(this.pitchAngle, -Math.PI / 2, Math.PI / 2);

    this.yaw.rotation.y = this.yawAngle;
    this.pitch.rotation.x = this.pitchAngle;
  }

  applyVisualRecoil(config = null) {
    if (!config) {
      return;
    }

    this.visualRecoilConfig = config;
    const penaltyShotCount = Math.max(1, Number(config.recoveryShotPenaltyShots ?? 8));
    const currentSprayAlpha = THREE.MathUtils.clamp(
      Math.max(this.visualRecoilShotCount - 1, 0) / penaltyShotCount,
      0,
      1,
    );
    const shotResetDelay = Math.max(
      0.01,
      Number(config.shotResetDelay ?? 0.2)
        + (Number(config.sprayResetDelay ?? 0) * currentSprayAlpha),
    );
    if (this.visualRecoilTimeSinceShot > shotResetDelay) {
      this.visualRecoilShotCount = 0;
    }
    this.visualRecoilShotCount += 1;
    this.visualRecoilTimeSinceShot = 0;

    const warmupShots = Math.max(1, Number(config.warmupShots ?? 4));
    const initialPitch = Math.max(0, Number(config.initialPitch ?? 0));
    const maxPitch = Math.max(initialPitch, Number(config.maxPitch ?? initialPitch));
    const shoulderShots = Math.max(warmupShots + 1, Number(config.shoulderShots ?? (warmupShots + 2)));
    const shoulderPitch = THREE.MathUtils.clamp(
      Number(config.shoulderPitch ?? initialPitch),
      initialPitch,
      maxPitch,
    );
    const riseSharpness = Math.max(0.25, Number(config.riseSharpness ?? 3));
    const maxVisualShots = Math.max(
      shoulderShots + 1,
      Number(config.maxShots ?? config.recoveryShotPenaltyShots ?? 12),
    );
    let nextTargetPitch = initialPitch;

    if (this.visualRecoilShotCount > warmupShots) {
      if (this.visualRecoilShotCount <= shoulderShots) {
        const earlyAlpha = THREE.MathUtils.clamp(
          (this.visualRecoilShotCount - (warmupShots + 1)) / Math.max(shoulderShots - (warmupShots + 1), 1),
          0,
          1,
        );
        nextTargetPitch = THREE.MathUtils.lerp(initialPitch, shoulderPitch, earlyAlpha);
      } else {
        const lateAlpha = THREE.MathUtils.clamp(
          (this.visualRecoilShotCount - shoulderShots) / Math.max(
            maxVisualShots - shoulderShots,
            1,
          ),
          0,
          1,
        );
        const exponentialAlpha = (1 - Math.exp(-riseSharpness * lateAlpha))
          / (1 - Math.exp(-riseSharpness));
        nextTargetPitch = THREE.MathUtils.lerp(shoulderPitch, maxPitch, exponentialAlpha);
      }
    }

    this.visualRecoilTargetPitch = Math.max(this.visualRecoilTargetPitch, nextTargetPitch);
    this.applyAimPullRecoil(config, {
      warmupShots,
      shoulderShots,
    });
  }

  updateFootsteps(previousPosition, wasGroundedBeforeStep = this.isGrounded) {
    if (!this.audioManager || this.movementMode === 'fly') {
      this.footstepDistance = 0;
      return;
    }

    const horizontalDistance = Math.hypot(
      this.position.x - previousPosition.x,
      this.position.z - previousPosition.z,
    );
    const horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    const isWalking = this.input?.isPressed?.('ShiftLeft') ?? false;
    const minimumAudibleSpeed = Math.max(
      MOVEMENT_TUNING.footstepMinHorizontalSpeed,
      FOOTSTEP_AUDIBLE_SPEED_FLOOR,
    );
    const landedThisStep = !wasGroundedBeforeStep
      && this.isGrounded
      && !this.isCrouched
      && !isWalking;
    if (landedThisStep) {
      this.footstepDistance = 0;
      this.wasFootstepAudible = false;
      this.playFootstepFloor();
    }
    const isAudible = this.isGrounded
      && !this.isCrouched
      && !isWalking
      && horizontalSpeed >= minimumAudibleSpeed
      && horizontalDistance > 1e-4;
    if (!isAudible) {
      this.footstepDistance = 0;
      this.wasFootstepAudible = false;
      return;
    }
    const strideDistance = this.isCrouched
      ? MOVEMENT_TUNING.footstepStrideDistanceCrouch
      : MOVEMENT_TUNING.footstepStrideDistanceWalk;
    if (!this.wasFootstepAudible) {
      this.footstepDistance = Math.max(this.footstepDistance, strideDistance * 0.55);
    }
    this.wasFootstepAudible = true;
    this.footstepDistance += horizontalDistance;

    while (this.footstepDistance >= strideDistance) {
      this.footstepDistance -= strideDistance;
      this.playFootstepFloor();
    }
  }

  playFootstepFloor() {
    if (!this.audioManager) {
      return;
    }

    let sampleIndex = Math.floor(Math.random() * FOOTSTEP_SAMPLE_COUNT);
    if (FOOTSTEP_SAMPLE_COUNT > 1 && sampleIndex === this.lastFootstepSampleIndex) {
      sampleIndex = (sampleIndex + 1) % FOOTSTEP_SAMPLE_COUNT;
    }
    this.lastFootstepSampleIndex = sampleIndex;
    this.viewModelStepBobTarget = 1;
    this.viewModelStepBobSide *= -1;

    const sampleNumber = String(sampleIndex + 1).padStart(3, '0');
    const isCrouched = this.isCrouched;
    this.audioManager.play(`footstep-floor-${sampleNumber}`, {
      baseVolume: isCrouched ? MOVEMENT_TUNING.footstepVolumeCrouch : MOVEMENT_TUNING.footstepVolumeWalk,
      pitchMin: isCrouched ? MOVEMENT_TUNING.footstepPitchMinCrouch : MOVEMENT_TUNING.footstepPitchMinWalk,
      pitchMax: isCrouched ? MOVEMENT_TUNING.footstepPitchMaxCrouch : MOVEMENT_TUNING.footstepPitchMaxWalk,
      duration: isCrouched ? MOVEMENT_TUNING.footstepDurationCrouch : MOVEMENT_TUNING.footstepDurationWalk,
      playback: 'overlap',
      minIntervalMs: isCrouched ? MOVEMENT_TUNING.footstepMinIntervalCrouchMs : MOVEMENT_TUNING.footstepMinIntervalWalkMs,
    });
  }

  getViewModelBobState() {
    if (this.isCrouched) {
      return {
        offsetX: 0,
        offsetY: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        moveAlpha: 0,
        movePullBack: 0,
      };
    }

    const bob = THREE.MathUtils.clamp(this.viewModelStepBob, 0, 1);
    const horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    const targetSpeed = this.isCrouched
      ? this.crouchSpeed * this.getSpeedMultiplier()
      : this.walkSpeed * this.getSpeedMultiplier();
    const moveAlpha = this.isGrounded && targetSpeed > 1e-4
      ? THREE.MathUtils.clamp(horizontalSpeed / targetSpeed, 0, 1)
      : 0;
    return {
      offsetX: MOVEMENT_TUNING.bobOffsetX * bob * this.viewModelStepBobSide,
      offsetY: MOVEMENT_TUNING.bobOffsetY * bob,
      rotationX: MOVEMENT_TUNING.bobRotationX * bob,
      rotationY: MOVEMENT_TUNING.bobRotationY * bob * this.viewModelStepBobSide,
      rotationZ: MOVEMENT_TUNING.bobRotationZ * bob * this.viewModelStepBobSide,
      moveAlpha,
      movePullBack: MOVEMENT_TUNING.movePullBack,
    };
  }

  applyAimPullRecoil(config, {
    warmupShots,
    shoulderShots,
  }) {
    const aimPullStartShots = Math.max(
      warmupShots + 1,
      Number(config.aimPullStartShots ?? shoulderShots),
    );
    const aimPullYawMax = Math.max(0, Number(config.aimPullYawMax ?? 0));
    if (aimPullYawMax <= 0 || this.visualRecoilShotCount < aimPullStartShots) {
      return;
    }

    const maxPenaltyShots = Math.max(
      aimPullStartShots + 1,
      Number(config.recoveryShotPenaltyShots ?? 12),
    );
    const sprayAlpha = THREE.MathUtils.clamp(
      (this.visualRecoilShotCount - aimPullStartShots) / Math.max(maxPenaltyShots - aimPullStartShots, 1),
      0,
      1,
    );
    const yawPull = (Math.random() * 2 - 1) * THREE.MathUtils.lerp(0, aimPullYawMax, sprayAlpha);
    this.yawAngle += yawPull;
    this.yaw.rotation.y = this.yawAngle;
  }

  updateVisualRecoil(delta) {
    this.visualRecoilTimeSinceShot += delta;
    const recoilConfig = this.visualRecoilConfig ?? {};
    const maxPitch = Math.max(0.0001, Number(recoilConfig.maxPitch ?? 0.14));
    const recoveryFast = Math.max(0.01, Number(recoilConfig.recoveryFast ?? 16));
    const recoverySlow = Math.max(0.01, Number(recoilConfig.recoverySlow ?? 6.5));
    const shotPenaltyShots = Math.max(1, Number(recoilConfig.recoveryShotPenaltyShots ?? 8));
    const shotPenaltyFactor = THREE.MathUtils.clamp(
      Number(recoilConfig.recoveryShotPenaltyFactor ?? 0.6),
      0.05,
      1,
    );
    const sprayAlpha = THREE.MathUtils.clamp(
      Math.max(this.visualRecoilShotCount - 1, 0) / shotPenaltyShots,
      0,
      1,
    );
    const depthAlpha = THREE.MathUtils.clamp(
      Math.max(this.visualRecoilPitch, this.visualRecoilTargetPitch) / maxPitch,
      0,
      1,
    );
    const recoveryRate = THREE.MathUtils.lerp(recoveryFast, recoverySlow, depthAlpha)
      * THREE.MathUtils.lerp(1, shotPenaltyFactor, sprayAlpha);

    this.visualRecoilPitch = THREE.MathUtils.damp(this.visualRecoilPitch, this.visualRecoilTargetPitch, 26, delta);
    this.visualRecoilTargetPitch = THREE.MathUtils.damp(this.visualRecoilTargetPitch, 0, recoveryRate, delta);
    if (this.visualRecoilPitch <= 0.0001 && this.visualRecoilTargetPitch <= 0.0001) {
      this.visualRecoilPitch = 0;
      this.visualRecoilTargetPitch = 0;
      if (this.visualRecoilTimeSinceShot > 0.3) {
        this.visualRecoilShotCount = 0;
        this.visualRecoilConfig = null;
      }
    }
    this.viewAnchor.rotation.x = this.visualRecoilPitch;
    this.viewAnchor.rotation.y = 0;
    this.viewAnchor.rotation.z = 0;
  }

  getMovementInputSnapshot(options = {}) {
    const snapshot = getMovementInputSnapshot({
      input: this.input,
      movementMode: this.movementMode,
      yawAngle: this.yawAngle,
      pitchAngle: this.pitchAngle,
      jumpPressed: options.jumpPressed,
      walkSpeedFactor: this.getWalkSpeedFactor(),
    });
    if (!this.interactionLockMode || this.movementMode === 'fly') {
      return snapshot;
    }

    return {
      ...snapshot,
      forward: false,
      backward: false,
      left: false,
      right: false,
      walk: false,
      crouch: this.interactionLockMode === 'plant' ? true : snapshot.crouch,
      jump: false,
    };
  }

  getCurrentSpeedMultiplier() {
    return this.getSpeedMultiplier();
  }

  getImmediatePresentationVelocity() {
    if (this.movementMode !== 'fly') {
      return {
        x: this.velocity.x,
        y: this.velocity.y,
        z: this.velocity.z,
      };
    }

    return getImmediatePresentationVelocity({
      input: this.input,
      movementMode: this.movementMode,
      yawAngle: this.yawAngle,
      velocity: this.velocity,
      getSpeedMultiplier: this.getSpeedMultiplier,
      flySpeed: this.flySpeed,
      flySprintSpeed: this.flySprintSpeed,
      crouchSpeed: this.crouchSpeed,
      runSpeed: this.runSpeed,
      walkSpeed: this.walkSpeed,
      walkSpeedFactor: this.getWalkSpeedFactor(),
    });
  }

  updatePresentation(delta, alpha = 1) {
    this.viewModelStepBob = THREE.MathUtils.damp(
      this.viewModelStepBob,
      this.viewModelStepBobTarget,
      MOVEMENT_TUNING.bobAttack,
      delta,
    );
    this.viewModelStepBobTarget = THREE.MathUtils.damp(
      this.viewModelStepBobTarget,
      0,
      MOVEMENT_TUNING.bobDamp,
      delta,
    );
    this.updateVisualRecoil(delta);
    updatePresentationState({
      delta,
      alpha,
      position: this.position,
      correctionOffsetWorld: this.correctionOffsetWorld,
      responsivePresentationOffset: this.responsivePresentationOffset,
      immediateVelocity: this.getImmediatePresentationVelocity(),
      presentationTargetPosition: this.presentationTargetPosition,
    });
    this.presentationPosition.copy(this.presentationTargetPosition);
    this.yaw.position.copy(this.presentationPosition);
    this.viewAnchor.position.set(0, 0, 0);
  }

  applyMotionState(nextState) {
    this.position.set(
      nextState.position.x,
      nextState.position.y,
      nextState.position.z,
    );
    this.velocity.set(
      nextState.velocity.x,
      nextState.velocity.y,
      nextState.velocity.z,
    );
    this.yawAngle = nextState.yaw;
    this.yaw.rotation.y = this.yawAngle;
    this.isGrounded = nextState.isGrounded;
    this.isCrouched = nextState.isCrouched;
    this.currentHeight = nextState.currentHeight;
    this.pitch.position.y = this.currentHeight;
    this.motionState = createPlayerMovementState(nextState);
  }

  applyMotionStatePreservingLook(nextState) {
    const preservedYaw = this.yawAngle;
    const preservedPitch = this.pitchAngle;
    this.applyMotionState({
      ...nextState,
      yaw: preservedYaw,
    });
    this.yawAngle = preservedYaw;
    this.pitchAngle = preservedPitch;
    this.yaw.rotation.y = this.yawAngle;
    this.pitch.rotation.x = this.pitchAngle;
    this.motionState.yaw = preservedYaw;
  }

  movePositionCollisionSafe(targetPosition, {
    targetHeight = this.currentHeight,
  } = {}) {
    movePositionCollisionSafe({
      position: this.position,
      movementMode: this.movementMode,
      collisionWorld: this.collisionWorld,
      radius: this.radius,
      currentHeight: this.currentHeight,
      targetPosition,
      targetHeight,
    });
  }

  applyMotionStateCollisionSafe(nextState) {
    applyMotionStateCollisionSafe({
      movementMode: this.movementMode,
      collisionWorld: this.collisionWorld,
      position: this.position,
      currentHeight: this.currentHeight,
      nextState,
      applyMotionState: (resolvedState) => {
        this.applyMotionState(resolvedState);
      },
      applyMotionStatePreservingLook: (resolvedState) => {
        this.applyMotionStatePreservingLook(resolvedState);
      },
      movePosition: (targetPosition, options) => {
        this.movePositionCollisionSafe(targetPosition, options);
      },
    });
  }

  applyMotionStateCollisionSafePreservingLook(nextState) {
    applyMotionStateCollisionSafe({
      movementMode: this.movementMode,
      collisionWorld: this.collisionWorld,
      position: this.position,
      currentHeight: this.currentHeight,
      nextState,
      applyMotionState: (resolvedState) => {
        this.applyMotionState(resolvedState);
      },
      applyMotionStatePreservingLook: (resolvedState) => {
        this.applyMotionStatePreservingLook(resolvedState);
      },
      movePosition: (targetPosition, options) => {
        this.movePositionCollisionSafe(targetPosition, options);
      },
      preserveLook: true,
    });
  }

  simulateMovementStep(baseState, movementInput, delta, speedMultiplier = this.getSpeedMultiplier()) {
    if (this.movementMode === 'fly') {
      const nextState = createPlayerMovementState(baseState);
      const flyVelocity = this.getImmediatePresentationVelocity();

      nextState.position.x += flyVelocity.x * delta;
      nextState.position.y += flyVelocity.y * delta;
      nextState.position.z += flyVelocity.z * delta;
      nextState.velocity.x = flyVelocity.x;
      nextState.velocity.y = flyVelocity.y;
      nextState.velocity.z = flyVelocity.z;
      nextState.yaw = Number(movementInput?.yaw ?? baseState.yaw ?? 0);
      nextState.isGrounded = false;
      nextState.isCrouched = false;
      nextState.currentHeight = this.standHeight;
      return nextState;
    }

    return simulatePlayerMovement(baseState, movementInput, delta, {
      groundHeight: this.groundHeight,
      speedMultiplier,
      resolvePosition: this.collisionWorld
        ? (position, radius, height, movementDelta) => {
          RESOLVED_POSITION.set(position.x, position.y, position.z);
          const moved = this.collisionWorld.move(
            RESOLVED_POSITION,
            radius,
            height,
            HORIZONTAL_DELTA.set(movementDelta.x, movementDelta.y, movementDelta.z),
          );
          return {
            x: moved.x,
            y: moved.y,
            z: moved.z,
          };
        }
        : null,
      getGroundHeightAt: this.collisionWorld
        ? (x, z, currentY, maxStepUp, maxDrop) => this.collisionWorld.getGroundHeightAt(
          x,
          z,
          currentY,
          maxStepUp,
          maxDrop,
        )
        : null,
    });
  }

  applyBufferedCanonicalCorrection(delta) {
    const hasBufferedStep = getBufferedCorrectionStep({
      bufferedCorrection: this.bufferedCanonicalCorrection,
      delta,
      blendRate: CANONICAL_CORRECTION_BLEND,
      maxCorrectionPerStep: MAX_CANONICAL_CORRECTION_PER_STEP,
      epsilon: CORRECTION_OFFSET_EPSILON,
      stepTarget: BUFFERED_CANONICAL_CORRECTION,
    });
    if (!hasBufferedStep) {
      this.bufferedCanonicalCorrection.set(0, 0, 0);
      return;
    }

    BUFFERED_CORRECTION_START.copy(this.position);
    BUFFERED_CORRECTION_TARGET.copy(this.position).add(BUFFERED_CANONICAL_CORRECTION);
    this.movePositionCollisionSafe(BUFFERED_CORRECTION_TARGET, {
      targetIsGrounded: this.isGrounded,
      targetHeight: this.currentHeight,
    });

    BUFFERED_CORRECTION_APPLIED.subVectors(this.position, BUFFERED_CORRECTION_START);
    this.bufferedCanonicalCorrection.sub(BUFFERED_CORRECTION_APPLIED);

    // If collision blocks most of the buffered correction, drop the remainder so
    // reconciliation cannot keep grinding the local capsule through thin blockers.
    if (shouldDropBufferedCorrection({
      appliedCorrection: BUFFERED_CORRECTION_APPLIED,
      requestedCorrection: BUFFERED_CANONICAL_CORRECTION,
      epsilon: CORRECTION_OFFSET_EPSILON,
    })) {
      this.bufferedCanonicalCorrection.set(0, 0, 0);
    }

    if (this.bufferedCanonicalCorrection.lengthSq() <= CORRECTION_OFFSET_EPSILON * CORRECTION_OFFSET_EPSILON) {
      this.bufferedCanonicalCorrection.set(0, 0, 0);
    }
  }

  stepSimulation(delta, movementInput, speedMultiplier = this.getSpeedMultiplier()) {
    FOOTSTEP_POSITION_BEFORE_STEP.copy(this.position);
    const wasGroundedBeforeStep = this.isGrounded;
    this.applyBufferedCanonicalCorrection(delta);
    this.motionState.position.x = this.position.x;
    this.motionState.position.y = this.position.y;
    this.motionState.position.z = this.position.z;
    this.motionState.velocity.x = this.velocity.x;
    this.motionState.velocity.y = this.velocity.y;
    this.motionState.velocity.z = this.velocity.z;
    this.motionState.yaw = this.yawAngle;
    this.motionState.isGrounded = this.isGrounded;
    this.motionState.isCrouched = this.isCrouched;
    this.motionState.currentHeight = this.currentHeight;

    this.applyMotionState(
      this.simulateMovementStep(this.motionState, movementInput, delta, speedMultiplier),
    );
    this.updateFootsteps(FOOTSTEP_POSITION_BEFORE_STEP, wasGroundedBeforeStep);
  }

  reconcileAuthoritativeState(correction) {
    if (!correction?.authoritativeState) {
      return;
    }

    const replayState = replayAuthoritativeState({
      correction,
      fallbackYaw: this.yawAngle,
      fallbackCurrentHeight: this.currentHeight,
      simulateMovementStep: (baseState, movementInput, delta, speedMultiplier) => this.simulateMovementStep(
        baseState,
        movementInput,
        delta,
        speedMultiplier,
      ),
    });
    const reconciliationOutcome = getReconciliationOutcome({
      replayState,
      currentPosition: this.position,
      isCorrectionActive: this.isCorrectionActive,
      softCorrectionMinDistance: SOFT_CORRECTION_MIN_DISTANCE,
      softCorrectionMaxDistance: SOFT_CORRECTION_MAX_DISTANCE,
      localCorrectionStartDistance: LOCAL_CORRECTION_START_DISTANCE,
      localCorrectionStopDistance: LOCAL_CORRECTION_STOP_DISTANCE,
      correctionDeltaTarget: SOFT_CORRECTION_DELTA,
    });
    const { action, correctionDistance } = reconciliationOutcome;
    this.lastCorrectionDistance = correctionDistance;
    this.lastReconciliationAction = action;
    this.lastReplayInputCount = correction.replayInputs?.length ?? 0;
    this.lastCorrectionDeltaText = formatVectorText(SOFT_CORRECTION_DELTA);
    this.lastCorrectionDeltaY = Number(SOFT_CORRECTION_DELTA.y ?? 0);
    this.lastCorrectionDistanceXZ = Math.hypot(SOFT_CORRECTION_DELTA.x, SOFT_CORRECTION_DELTA.z);
    const velocityDirection = getPlanarUnitVector(this.velocity.x, this.velocity.z);
    const replayVelocityDirection = getPlanarUnitVector(replayState?.velocity?.x ?? 0, replayState?.velocity?.z ?? 0);
    const inputDirection = getPlanarUnitVector(
      (replayState?.velocity?.x ?? 0) || (correction.authoritativeState?.velocity?.x ?? 0),
      (replayState?.velocity?.z ?? 0) || (correction.authoritativeState?.velocity?.z ?? 0),
    );
    const referenceVelocityDirection = replayVelocityDirection ?? velocityDirection;
    const correctionX = Number(SOFT_CORRECTION_DELTA.x ?? 0);
    const correctionZ = Number(SOFT_CORRECTION_DELTA.z ?? 0);
    if (referenceVelocityDirection) {
      const alongVelocity = (
        correctionX * referenceVelocityDirection.x
        + correctionZ * referenceVelocityDirection.z
      );
      this.lastCorrectionAlongVelocity = alongVelocity;
      this.lastCorrectionPerpendicularVelocity = Math.sqrt(Math.max(
        0,
        (correctionX * correctionX + correctionZ * correctionZ) - (alongVelocity * alongVelocity),
      ));
    } else {
      this.lastCorrectionAlongVelocity = 0;
      this.lastCorrectionPerpendicularVelocity = 0;
    }
    if (inputDirection) {
      const alongInput = (
        correctionX * inputDirection.x
        + correctionZ * inputDirection.z
      );
      this.lastCorrectionAlongInput = alongInput;
      this.lastCorrectionPerpendicularInput = Math.sqrt(Math.max(
        0,
        (correctionX * correctionX + correctionZ * correctionZ) - (alongInput * alongInput),
      ));
    } else {
      this.lastCorrectionAlongInput = 0;
      this.lastCorrectionPerpendicularInput = 0;
    }
    this.lastAuthoritativeVelocityText = formatVectorText(correction.authoritativeState?.velocity);
    this.lastReplayVelocityText = formatVectorText(replayState?.velocity);
    this.lastCurrentPositionText = formatPositionText(this.position);
    this.lastAuthoritativePositionText = formatPositionText(correction.authoritativeState?.position);
    this.lastReplayPositionText = formatPositionText(replayState?.position);
    if (action === 'apply_exact') {
      this.isCorrectionActive = false;
      this.bufferedCanonicalCorrection.set(0, 0, 0);
      this.applyMotionStateCollisionSafePreservingLook(replayState);
      return;
    }

    if (action === 'ignore') {
      return;
    }

    const now = getNow();
    recordRecentCorrectionEvent(this.correctionEvents, now);

    if (action === 'snap_exact') {
      this.isCorrectionActive = false;
      this.bufferedCanonicalCorrection.set(0, 0, 0);
      this.applyMotionStateCollisionSafePreservingLook(replayState);
      this.correctionOffsetWorld.set(0, 0, 0);
      this.presentationPosition.copy(this.position);
      this.presentationTargetPosition.copy(this.position);
      this.yaw.position.copy(this.presentationPosition);
      return;
    }

    if (action === 'stop') {
      this.isCorrectionActive = false;
      this.bufferedCanonicalCorrection.set(0, 0, 0);
      return;
    }

    this.isCorrectionActive = true;
    recordRecentCorrectionEvent(this.correctionEnqueueEvents, now);
    this.bufferedCanonicalCorrection.copy(SOFT_CORRECTION_DELTA);
  }
}
