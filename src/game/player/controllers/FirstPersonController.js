import * as THREE from 'three';

const WORLD_UP = new THREE.Vector3(0, 1, 0);
const FORWARD = new THREE.Vector3();
const RIGHT = new THREE.Vector3();
const MOVE = new THREE.Vector3();
const STEP = new THREE.Vector3();
const HORIZONTAL_STEP = new THREE.Vector3();

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

  setMouseSensitivity(value) {
    this.mouseSensitivity = Math.max(0.0001, value);
  }

  getMouseSensitivity() {
    return this.mouseSensitivity;
  }

  update(delta, frameInput) {
    this.updateLook(frameInput.lookDelta);
    this.updateStance(delta);
    this.updateMovement(delta, frameInput.justPressed);
  }

  updateLook(lookDelta) {
    const relativeSensitivity = this.mouseSensitivity * (this.camera.fov / this.baseFov);

    this.yawAngle -= lookDelta.x * relativeSensitivity;
    this.pitchAngle -= lookDelta.y * relativeSensitivity;
    this.pitchAngle = THREE.MathUtils.clamp(this.pitchAngle, -Math.PI / 2, Math.PI / 2);

    this.yaw.rotation.y = this.yawAngle;
    this.pitch.rotation.x = this.pitchAngle;
  }

  updateStance(delta) {
    this.isCrouched = this.input.isPressed('ControlLeft') || this.input.isPressed('KeyC');

    const targetHeight = this.isCrouched ? this.crouchHeight : this.standHeight;
    this.currentHeight = THREE.MathUtils.lerp(
      this.currentHeight,
      targetHeight,
      1 - Math.exp(-this.crouchLerpSpeed * delta),
    );
    this.pitch.position.y = this.currentHeight;
  }

  updateMovement(delta, justPressed) {
    const wasGrounded = this.isGrounded;

    FORWARD.set(0, 0, -1).applyAxisAngle(WORLD_UP, this.yawAngle);
    RIGHT.set(1, 0, 0).applyAxisAngle(WORLD_UP, this.yawAngle);
    MOVE.set(0, 0, 0);

    if (this.input.isPressed('KeyW')) MOVE.add(FORWARD);
    if (this.input.isPressed('KeyS')) MOVE.sub(FORWARD);
    if (this.input.isPressed('KeyD')) MOVE.add(RIGHT);
    if (this.input.isPressed('KeyA')) MOVE.sub(RIGHT);

    const wantsToMove = MOVE.lengthSq() > 0;
    if (wantsToMove) {
      MOVE.normalize();
    }

    const weaponSpeedMultiplier = this.getSpeedMultiplier();
    const maxSpeed = (this.isCrouched
      ? this.crouchSpeed
      : this.input.isPressed('ShiftLeft')
        ? this.runSpeed
        : this.walkSpeed) * weaponSpeedMultiplier;

    const targetVelocityX = wantsToMove ? MOVE.x * maxSpeed : 0;
    const targetVelocityZ = wantsToMove ? MOVE.z * maxSpeed : 0;
    const control = this.isGrounded ? 1 : this.airControl;
    const blend = Math.min(1, this.acceleration * control * delta);

    this.velocity.x = THREE.MathUtils.lerp(this.velocity.x, targetVelocityX, blend);
    this.velocity.z = THREE.MathUtils.lerp(this.velocity.z, targetVelocityZ, blend);

    if (this.isGrounded && justPressed.has('Space')) {
      this.velocity.y = this.jumpForce;
      this.isGrounded = false;
    }

    if (!this.isGrounded) {
      this.velocity.y -= this.gravity * delta;
    }

    STEP.copy(this.velocity).multiplyScalar(delta);
    HORIZONTAL_STEP.set(STEP.x, 0, STEP.z);

    const nextPosition = this.collisionWorld
      ? this.collisionWorld.move(this.position, this.radius, this.currentHeight, HORIZONTAL_STEP)
      : this.position.clone().add(HORIZONTAL_STEP);

    this.position.x = nextPosition.x;
    this.position.z = nextPosition.z;
    this.position.y += STEP.y;

    const floor = this.collisionWorld?.getGroundHeightAt(
      this.position.x,
      this.position.z,
      this.position.y,
      wasGrounded ? this.maxStepHeight : 0,
    )
      ?? this.groundHeight;

    if (wasGrounded && this.velocity.y <= 0 && this.position.y <= floor + this.maxStepHeight) {
      this.position.y = floor;
      this.velocity.y = 0;
      this.isGrounded = true;
    } else if (this.position.y <= floor) {
      this.position.y = floor;
      this.velocity.y = 0;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }
  }
}
