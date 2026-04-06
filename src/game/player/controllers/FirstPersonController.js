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
