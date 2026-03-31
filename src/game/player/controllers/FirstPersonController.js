import * as THREE from 'three';
import { createPlayerMovementState, simulatePlayerMovement } from '../../../shared/playerMovement.js';
import { NETCODE_SIMULATION_STEP } from '../../../shared/netcode.js';

const NEXT_POSITION = new THREE.Vector3();
const HORIZONTAL_DELTA = new THREE.Vector3();
const SOFT_CORRECTION_DELTA = new THREE.Vector3();
const RENDER_POSITION_WORLD = new THREE.Vector3();
const PRESENTATION_TARGET_WORLD = new THREE.Vector3();
const IMMEDIATE_PRESENTATION_VELOCITY = new THREE.Vector3();
const RESPONSIVE_PRESENTATION_OFFSET = new THREE.Vector3();
const BUFFERED_CANONICAL_CORRECTION = new THREE.Vector3();
const SOFT_CORRECTION_MIN_DISTANCE = 0.02;
const SOFT_CORRECTION_MAX_DISTANCE = 2.5;
const CORRECTION_OFFSET_DECAY = 18;
const CORRECTION_OFFSET_EPSILON = 0.0001;
const PRESENTATION_MAX_EXTRAPOLATION = NETCODE_SIMULATION_STEP;
const RESPONSIVE_OFFSET_GAIN = 0.012;
const RESPONSIVE_OFFSET_DECAY = 16;
const RESPONSIVE_OFFSET_MAX = 0.08;
const CANONICAL_CORRECTION_BLEND = 9;
const MAX_CANONICAL_CORRECTION_PER_STEP = 0.035;
const LOCAL_CORRECTION_START_DISTANCE = 0.18;
const LOCAL_CORRECTION_STOP_DISTANCE = 0.06;

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
    this.getSpeedMultiplier = options.getSpeedMultiplier ?? (() => 1);

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

  getDebugState() {
    const horizontalSpeed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z,
    );

    return {
      grounded: this.isGrounded,
      crouched: this.isCrouched,
      speed: horizontalSpeed,
      position: this.position.clone(),
      canonicalPosition: this.position.clone(),
      presentationPosition: this.presentationPosition.clone(),
      presentationTargetPosition: this.presentationTargetPosition.clone(),
      responsiveOffsetMagnitude: this.responsivePresentationOffset.length(),
      bufferedCanonicalCorrectionMagnitude: this.bufferedCanonicalCorrection.length(),
      correctionEnqueueRatePerSecond: this.correctionEnqueueEvents.length,
      correctionActive: this.isCorrectionActive,
      correctionOffsetMagnitude: this.correctionOffsetWorld.length(),
      simulationDeltaMagnitude: horizontalSpeed * NETCODE_SIMULATION_STEP,
      lastCorrectionDistance: this.lastCorrectionDistance,
      correctionRatePerSecond: this.correctionEvents.length,
    };
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
    };
  }

  setMouseSensitivity(value) {
    this.mouseSensitivity = Math.max(0.0001, value);
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
    return {
      forward: this.input.isPressed('KeyW'),
      backward: this.input.isPressed('KeyS'),
      left: this.input.isPressed('KeyA'),
      right: this.input.isPressed('KeyD'),
      sprint: this.input.isPressed('ShiftLeft'),
      crouch: this.input.isPressed('ControlLeft') || this.input.isPressed('KeyC'),
      jump: Boolean(options.jumpPressed),
      yaw: this.yawAngle,
    };
  }

  getCurrentSpeedMultiplier() {
    return this.getSpeedMultiplier();
  }

  getImmediatePresentationVelocity() {
    const speedMultiplier = this.getSpeedMultiplier();
    const wantsCrouch = this.input.isPressed('ControlLeft') || this.input.isPressed('KeyC');
    const wantsSprint = this.input.isPressed('ShiftLeft');
    const moveForward = this.input.isPressed('KeyW');
    const moveBackward = this.input.isPressed('KeyS');
    const moveLeft = this.input.isPressed('KeyA');
    const moveRight = this.input.isPressed('KeyD');

    const forwardX = -Math.sin(this.yawAngle);
    const forwardZ = -Math.cos(this.yawAngle);
    const rightX = Math.cos(this.yawAngle);
    const rightZ = -Math.sin(this.yawAngle);

    let moveX = 0;
    let moveZ = 0;

    if (moveForward) {
      moveX += forwardX;
      moveZ += forwardZ;
    }
    if (moveBackward) {
      moveX -= forwardX;
      moveZ -= forwardZ;
    }
    if (moveRight) {
      moveX += rightX;
      moveZ += rightZ;
    }
    if (moveLeft) {
      moveX -= rightX;
      moveZ -= rightZ;
    }

    const moveLength = Math.hypot(moveX, moveZ);
    if (moveLength <= 0) {
      return { x: 0, y: this.velocity.y, z: 0 };
    }

    moveX /= moveLength;
    moveZ /= moveLength;

    const maxSpeed = (wantsCrouch
      ? this.crouchSpeed
      : wantsSprint
        ? this.runSpeed
        : this.walkSpeed) * speedMultiplier;

    return {
      x: moveX * maxSpeed,
      y: this.velocity.y,
      z: moveZ * maxSpeed,
    };
  }

  updatePresentation(delta, alpha = 1) {
    const damping = Math.exp(-CORRECTION_OFFSET_DECAY * delta);
    this.correctionOffsetWorld.multiplyScalar(damping);

    if (this.correctionOffsetWorld.lengthSq() <= CORRECTION_OFFSET_EPSILON * CORRECTION_OFFSET_EPSILON) {
      this.correctionOffsetWorld.set(0, 0, 0);
    }

    const immediateVelocity = this.getImmediatePresentationVelocity();
    const responsiveDecay = Math.exp(-RESPONSIVE_OFFSET_DECAY * delta);
    this.responsivePresentationOffset.multiplyScalar(responsiveDecay);
    RESPONSIVE_PRESENTATION_OFFSET.set(
      immediateVelocity.x * RESPONSIVE_OFFSET_GAIN,
      0,
      immediateVelocity.z * RESPONSIVE_OFFSET_GAIN,
    );
    this.responsivePresentationOffset.addScaledVector(
      RESPONSIVE_PRESENTATION_OFFSET.sub(this.responsivePresentationOffset),
      1 - responsiveDecay,
    );
    if (this.responsivePresentationOffset.lengthSq() > RESPONSIVE_OFFSET_MAX * RESPONSIVE_OFFSET_MAX) {
      this.responsivePresentationOffset.setLength(RESPONSIVE_OFFSET_MAX);
    }

    PRESENTATION_TARGET_WORLD.copy(this.position).addScaledVector(
      IMMEDIATE_PRESENTATION_VELOCITY.set(
        immediateVelocity.x,
        immediateVelocity.y,
        immediateVelocity.z,
      ),
      THREE.MathUtils.clamp(alpha, 0, 1) * PRESENTATION_MAX_EXTRAPOLATION,
    );
    PRESENTATION_TARGET_WORLD.add(this.responsivePresentationOffset);
    PRESENTATION_TARGET_WORLD.add(this.correctionOffsetWorld);
    this.presentationTargetPosition.copy(PRESENTATION_TARGET_WORLD);
    RENDER_POSITION_WORLD.copy(this.presentationTargetPosition);
    this.presentationPosition.copy(RENDER_POSITION_WORLD);
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

  simulateMovementStep(baseState, movementInput, delta, speedMultiplier = this.getSpeedMultiplier()) {
    return simulatePlayerMovement(baseState, movementInput, delta, {
      groundHeight: this.groundHeight,
      speedMultiplier,
      moveHorizontal: this.collisionWorld
        ? (position, radius, height, horizontalDelta) => {
          NEXT_POSITION.set(position.x, position.y, position.z);
          const moved = this.collisionWorld.move(
            NEXT_POSITION,
            radius,
            height,
            HORIZONTAL_DELTA.set(horizontalDelta.x, 0, horizontalDelta.z),
          );
          return {
            x: moved.x,
            y: moved.y,
            z: moved.z,
          };
        }
        : null,
      getGroundHeightAt: this.collisionWorld
        ? (x, z, currentY, maxStepUp) => this.collisionWorld.getGroundHeightAt(
          x,
          z,
          currentY,
          maxStepUp,
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
    this.position.add(BUFFERED_CANONICAL_CORRECTION);
    this.bufferedCanonicalCorrection.sub(BUFFERED_CANONICAL_CORRECTION);

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
      this.applyMotionState(replayState);
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
      this.applyMotionState(replayState);
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
