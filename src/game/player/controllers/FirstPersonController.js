import * as THREE from 'three';
import { createPlayerMovementState, simulatePlayerMovement } from '../../../shared/playerMovement.js';
import { NETCODE_SIMULATION_STEP } from '../../../shared/netcode.js';
import { getImmediatePresentationVelocity, getMovementInputSnapshot } from './playerInputState.js';
import { findLandingHeightAtCurrentPosition, getNextFlyMode } from './playerFlyMode.js';
import { updatePresentationState } from './playerPresentation.js';

const NEXT_POSITION = new THREE.Vector3();
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
const MAX_CORRECTION_HORIZONTAL_SUBSTEP = 0.08;
const FLY_PRESENTATION_VELOCITY = new THREE.Vector3();
const BUFFERED_CORRECTION_START = new THREE.Vector3();
const BUFFERED_CORRECTION_TARGET = new THREE.Vector3();
const BUFFERED_CORRECTION_APPLIED = new THREE.Vector3();
const BUFFERED_CORRECTION_MOVE = new THREE.Vector3();
const CORRECTION_STEP_TARGET = new THREE.Vector3();
function getNow() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }

  return Date.now();
}

export class FirstPersonController {
  constructor(camera, input, options = {}) {
    this.camera = camera;
    this.input = input;
    this.collisionWorld = options.collisionWorld ?? null;
    this.landingSurfaces = options.landingSurfaces ?? [];
    this.getSpeedMultiplier = options.getSpeedMultiplier ?? (() => 1);
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

    this.walkSpeed = 4.1;
    this.runSpeed = 6.2;
    this.crouchSpeed = 2.2;
    this.flySpeed = 8;
    this.flySprintSpeed = 16;
    this.jumpForce = 6.1;
    this.gravity = 18;
    this.acceleration = 32;
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
  }

  getObject() {
    return this.collider;
  }

  getDebugState(options = {}) {
    const includeVectors = Boolean(options.includeVectors);
    const horizontalSpeed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z,
    );

    const debugState = {
      grounded: this.isGrounded,
      crouched: this.isCrouched,
      speed: horizontalSpeed,
      movementMode: this.movementMode,
      positionText: `${this.position.x.toFixed(2)}, ${this.position.y.toFixed(2)}, ${this.position.z.toFixed(2)}`,
      responsiveOffsetMagnitude: this.responsivePresentationOffset.length(),
      bufferedCanonicalCorrectionMagnitude: this.bufferedCanonicalCorrection.length(),
      correctionEnqueueRatePerSecond: this.correctionEnqueueEvents.length,
      correctionActive: this.isCorrectionActive,
      correctionOffsetMagnitude: this.correctionOffsetWorld.length(),
      simulationDeltaMagnitude: horizontalSpeed * NETCODE_SIMULATION_STEP,
      lastCorrectionDistance: this.lastCorrectionDistance,
      correctionRatePerSecond: this.correctionEvents.length,
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

  getMovementInputSnapshot(options = {}) {
    return getMovementInputSnapshot({
      input: this.input,
      movementMode: this.movementMode,
      yawAngle: this.yawAngle,
      pitchAngle: this.pitchAngle,
      jumpPressed: options.jumpPressed,
    });
  }

  getCurrentSpeedMultiplier() {
    return this.getSpeedMultiplier();
  }

  getImmediatePresentationVelocity() {
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
    });
  }

  updatePresentation(delta, alpha = 1) {
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
    if (this.movementMode === 'fly' || !this.collisionWorld) {
      this.position.copy(targetPosition);
      return;
    }

    const startX = this.position.x;
    const startY = this.position.y;
    const startZ = this.position.z;
    const deltaX = targetPosition.x - startX;
    const deltaY = targetPosition.y - startY;
    const deltaZ = targetPosition.z - startZ;
    const horizontalDistance = Math.hypot(deltaX, deltaZ);
    const steps = Math.max(1, Math.ceil(horizontalDistance / MAX_CORRECTION_HORIZONTAL_SUBSTEP));

    for (let stepIndex = 1; stepIndex <= steps; stepIndex += 1) {
      const alpha = stepIndex / steps;
      const nextTargetX = startX + deltaX * alpha;
      const nextTargetY = startY + deltaY * alpha;
      const nextTargetZ = startZ + deltaZ * alpha;

      const moved = this.collisionWorld.move(
        this.position,
        this.radius,
        targetHeight,
        BUFFERED_CORRECTION_MOVE.set(
          nextTargetX - this.position.x,
          nextTargetY - this.position.y,
          nextTargetZ - this.position.z,
        ),
        NEXT_POSITION,
      );

      this.position.copy(moved);
    }
  }

  applyMotionStateCollisionSafe(nextState) {
    if (this.movementMode === 'fly' || !this.collisionWorld) {
      this.applyMotionState(nextState);
      return;
    }

    BUFFERED_CORRECTION_START.copy(this.position);
    CORRECTION_STEP_TARGET.set(
      nextState.position.x,
      nextState.position.y,
      nextState.position.z,
    );
    this.movePositionCollisionSafe(CORRECTION_STEP_TARGET, {
      targetHeight: nextState.currentHeight ?? this.currentHeight,
    });

    this.applyMotionState({
      ...nextState,
      position: {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      },
    });
  }

  applyMotionStateCollisionSafePreservingLook(nextState) {
    if (this.movementMode === 'fly' || !this.collisionWorld) {
      this.applyMotionStatePreservingLook(nextState);
      return;
    }

    BUFFERED_CORRECTION_START.copy(this.position);
    CORRECTION_STEP_TARGET.set(
      nextState.position.x,
      nextState.position.y,
      nextState.position.z,
    );
    this.movePositionCollisionSafe(CORRECTION_STEP_TARGET, {
      targetHeight: nextState.currentHeight ?? this.currentHeight,
    });

    this.applyMotionStatePreservingLook({
      ...nextState,
      position: {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      },
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
          NEXT_POSITION.set(position.x, position.y, position.z);
          const moved = this.collisionWorld.move(
            NEXT_POSITION,
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
    if (this.bufferedCanonicalCorrection.lengthSq() <= CORRECTION_OFFSET_EPSILON * CORRECTION_OFFSET_EPSILON) {
      this.bufferedCanonicalCorrection.set(0, 0, 0);
      return;
    }

    const alpha = 1 - Math.exp(-CANONICAL_CORRECTION_BLEND * delta);
    BUFFERED_CANONICAL_CORRECTION.copy(this.bufferedCanonicalCorrection).multiplyScalar(alpha);
    if (BUFFERED_CANONICAL_CORRECTION.lengthSq() > MAX_CANONICAL_CORRECTION_PER_STEP * MAX_CANONICAL_CORRECTION_PER_STEP) {
      BUFFERED_CANONICAL_CORRECTION.setLength(MAX_CANONICAL_CORRECTION_PER_STEP);
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
    if (
      BUFFERED_CORRECTION_APPLIED.lengthSq() <= CORRECTION_OFFSET_EPSILON * CORRECTION_OFFSET_EPSILON
      && BUFFERED_CANONICAL_CORRECTION.lengthSq() > CORRECTION_OFFSET_EPSILON * CORRECTION_OFFSET_EPSILON
    ) {
      this.bufferedCanonicalCorrection.set(0, 0, 0);
    }

    if (this.bufferedCanonicalCorrection.lengthSq() <= CORRECTION_OFFSET_EPSILON * CORRECTION_OFFSET_EPSILON) {
      this.bufferedCanonicalCorrection.set(0, 0, 0);
    }
  }

  stepSimulation(delta, movementInput, speedMultiplier = this.getSpeedMultiplier()) {
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
  }

  reconcileAuthoritativeState(correction) {
    if (!correction?.authoritativeState) {
      return;
    }

    let replayState = createPlayerMovementState({
      position: correction.authoritativeState.position,
      velocity: correction.authoritativeState.velocity,
      yaw: correction.authoritativeState.yaw ?? this.yawAngle,
      isGrounded: correction.authoritativeState.isGrounded ?? true,
      isCrouched: correction.authoritativeState.isCrouched ?? false,
      currentHeight: correction.authoritativeState.currentHeight ?? this.currentHeight,
    });

    for (const replayInput of correction.replayInputs ?? []) {
      replayState = this.simulateMovementStep(
        replayState,
        replayInput.input,
        replayInput.simulationStep ?? NETCODE_SIMULATION_STEP,
        replayInput.input?.speedMultiplier,
      );
    }

    SOFT_CORRECTION_DELTA.set(
      replayState.position.x - this.position.x,
      replayState.position.y - this.position.y,
      replayState.position.z - this.position.z,
    );

    const correctionDistance = SOFT_CORRECTION_DELTA.length();
    this.lastCorrectionDistance = correctionDistance;
    if (correctionDistance <= SOFT_CORRECTION_MIN_DISTANCE) {
      this.isCorrectionActive = false;
      this.bufferedCanonicalCorrection.set(0, 0, 0);
      this.applyMotionStateCollisionSafePreservingLook(replayState);
      return;
    }

    if (!this.isCorrectionActive && correctionDistance < LOCAL_CORRECTION_START_DISTANCE) {
      return;
    }

    const now = getNow();
    this.correctionEvents.push(now);
    while (this.correctionEvents.length > 0 && now - this.correctionEvents[0] > 1000) {
      this.correctionEvents.shift();
    }

    if (correctionDistance >= SOFT_CORRECTION_MAX_DISTANCE) {
      this.isCorrectionActive = false;
      this.bufferedCanonicalCorrection.set(0, 0, 0);
      this.applyMotionStateCollisionSafePreservingLook(replayState);
      this.correctionOffsetWorld.set(0, 0, 0);
      this.presentationPosition.copy(this.position);
      this.presentationTargetPosition.copy(this.position);
      this.yaw.position.copy(this.presentationPosition);
      return;
    }

    if (this.isCorrectionActive && correctionDistance <= LOCAL_CORRECTION_STOP_DISTANCE) {
      this.isCorrectionActive = false;
      this.bufferedCanonicalCorrection.set(0, 0, 0);
      return;
    }

    this.isCorrectionActive = true;
    this.correctionEnqueueEvents.push(now);
    while (this.correctionEnqueueEvents.length > 0 && now - this.correctionEnqueueEvents[0] > 1000) {
      this.correctionEnqueueEvents.shift();
    }
    this.bufferedCanonicalCorrection.copy(SOFT_CORRECTION_DELTA);
  }
}
