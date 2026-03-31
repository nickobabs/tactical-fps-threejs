import * as THREE from 'three';
import { createPlayerMovementState, simulatePlayerMovement } from '../../../shared/playerMovement.js';

const NEXT_POSITION = new THREE.Vector3();
const HORIZONTAL_DELTA = new THREE.Vector3();

export class FirstPersonController {
  constructor(camera, input, options = {}) {
    this.camera = camera;
    this.input = input;
    this.collisionWorld = options.collisionWorld ?? null;
    this.getSpeedMultiplier = options.getSpeedMultiplier ?? (() => 1);

    this.collider = new THREE.Group();
    this.yaw = new THREE.Object3D();
    this.pitch = new THREE.Object3D();

    this.standHeight = 1.72;
    this.crouchHeight = 1.08;
    this.currentHeight = this.standHeight;
    this.radius = 0.35;

    this.yaw.position.copy(options.position ?? new THREE.Vector3(0, 0, 0));
    this.yaw.add(this.pitch);
    this.pitch.add(this.camera);
    this.collider.add(this.yaw);

    this.velocity = new THREE.Vector3();
    this.position = this.yaw.position;

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
    this.updateMovement(delta, this.getMovementInputSnapshot(frameInput));
  }

  updateLook(lookDelta) {
    const relativeSensitivity = this.mouseSensitivity * (this.camera.fov / this.baseFov);

    this.yawAngle -= lookDelta.x * relativeSensitivity;
    this.pitchAngle -= lookDelta.y * relativeSensitivity;
    this.pitchAngle = THREE.MathUtils.clamp(this.pitchAngle, -Math.PI / 2, Math.PI / 2);

    this.yaw.rotation.y = this.yawAngle;
    this.pitch.rotation.x = this.pitchAngle;
  }

  getMovementInputSnapshot(frameInput) {
    return {
      forward: this.input.isPressed('KeyW'),
      backward: this.input.isPressed('KeyS'),
      left: this.input.isPressed('KeyA'),
      right: this.input.isPressed('KeyD'),
      sprint: this.input.isPressed('ShiftLeft'),
      crouch: this.input.isPressed('ControlLeft') || this.input.isPressed('KeyC'),
      jump: frameInput.justPressed.has('Space'),
      yaw: this.yawAngle,
    };
  }

  updateMovement(delta, movementInput) {
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

    this.motionState = simulatePlayerMovement(this.motionState, movementInput, delta, {
      groundHeight: this.groundHeight,
      speedMultiplier: this.getSpeedMultiplier(),
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

    this.position.set(
      this.motionState.position.x,
      this.motionState.position.y,
      this.motionState.position.z,
    );
    this.velocity.set(
      this.motionState.velocity.x,
      this.motionState.velocity.y,
      this.motionState.velocity.z,
    );
    this.isGrounded = this.motionState.isGrounded;
    this.isCrouched = this.motionState.isCrouched;
    this.currentHeight = this.motionState.currentHeight;
    this.pitch.position.y = this.currentHeight;
  }

  reconcileAuthoritativeState(authoritativeState, snapThreshold = 1.5, hardSnapThreshold = 3.5) {
    const dx = authoritativeState.position.x - this.position.x;
    const dy = authoritativeState.position.y - this.position.y;
    const dz = authoritativeState.position.z - this.position.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < snapThreshold) {
      return;
    }

    const shouldHardSnap = distance >= hardSnapThreshold;
    const correctionBlend = shouldHardSnap ? 1 : 0.35;
    const nextX = THREE.MathUtils.lerp(this.position.x, authoritativeState.position.x, correctionBlend);
    const nextY = THREE.MathUtils.lerp(this.position.y, authoritativeState.position.y, correctionBlend);
    const nextZ = THREE.MathUtils.lerp(this.position.z, authoritativeState.position.z, correctionBlend);

    this.position.set(nextX, nextY, nextZ);

    if (shouldHardSnap) {
      this.velocity.set(0, 0, 0);
      this.motionState.velocity.x = 0;
      this.motionState.velocity.y = 0;
      this.motionState.velocity.z = 0;
    } else {
      this.velocity.x *= 0.6;
      this.velocity.y *= 0.6;
      this.velocity.z *= 0.6;
      this.motionState.velocity.x = this.velocity.x;
      this.motionState.velocity.y = this.velocity.y;
      this.motionState.velocity.z = this.velocity.z;
    }

    this.motionState.yaw = authoritativeState.yaw ?? this.motionState.yaw;
    this.motionState.isGrounded = authoritativeState.isGrounded ?? this.motionState.isGrounded;
    this.motionState.isCrouched = authoritativeState.isCrouched ?? this.motionState.isCrouched;
    this.motionState.currentHeight = authoritativeState.currentHeight ?? this.motionState.currentHeight;
    this.motionState.position.x = nextX;
    this.motionState.position.y = nextY;
    this.motionState.position.z = nextZ;
    this.isGrounded = this.motionState.isGrounded;
    this.isCrouched = this.motionState.isCrouched;
    this.currentHeight = this.motionState.currentHeight;
    this.pitch.position.y = this.currentHeight;
  }
}
