export const PLAYER_MOVEMENT_DEFAULTS = {
  standHeight: 1.72,
  crouchHeight: 1.08,
  radius: 0.35,
  walkSpeed: 4.1,
  runSpeed: 6.2,
  crouchSpeed: 2.2,
  jumpForce: 6.1,
  gravity: 18,
  acceleration: 32,
  airControl: 0.35,
  crouchLerpSpeed: 12,
  maxStepHeight: 0.45,
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start, end, alpha) {
  return start + (end - start) * alpha;
}

export function createPlayerMovementState({
  position = { x: 0, y: 0, z: 0 },
  velocity = { x: 0, y: 0, z: 0 },
  yaw = 0,
  isGrounded = true,
  isCrouched = false,
  currentHeight = PLAYER_MOVEMENT_DEFAULTS.standHeight,
} = {}) {
  return {
    position: { x: position.x, y: position.y, z: position.z },
    velocity: { x: velocity.x, y: velocity.y, z: velocity.z },
    yaw,
    isGrounded,
    isCrouched,
    currentHeight,
  };
}

export function simulatePlayerMovement(
  previousState,
  inputSnapshot,
  delta,
  options = {},
) {
  const config = { ...PLAYER_MOVEMENT_DEFAULTS, ...(options.config ?? {}) };
  const state = createPlayerMovementState(previousState);
  const groundHeight = options.groundHeight ?? 0;
  const speedMultiplier = options.speedMultiplier ?? 1;
  const yaw = Number(inputSnapshot?.yaw ?? state.yaw ?? 0);
  const wantsCrouch = Boolean(inputSnapshot?.crouch);
  const wantsJump = Boolean(inputSnapshot?.jump);
  const wantsSprint = Boolean(inputSnapshot?.sprint);

  state.yaw = yaw;
  state.isCrouched = wantsCrouch;

  const targetHeight = wantsCrouch ? config.crouchHeight : config.standHeight;
  state.currentHeight = lerp(
    state.currentHeight,
    targetHeight,
    1 - Math.exp(-config.crouchLerpSpeed * delta),
  );

  const forwardX = -Math.sin(yaw);
  const forwardZ = -Math.cos(yaw);
  const rightX = Math.cos(yaw);
  const rightZ = -Math.sin(yaw);

  let moveX = 0;
  let moveZ = 0;

  if (inputSnapshot?.forward) {
    moveX += forwardX;
    moveZ += forwardZ;
  }
  if (inputSnapshot?.backward) {
    moveX -= forwardX;
    moveZ -= forwardZ;
  }
  if (inputSnapshot?.right) {
    moveX += rightX;
    moveZ += rightZ;
  }
  if (inputSnapshot?.left) {
    moveX -= rightX;
    moveZ -= rightZ;
  }

  const moveLength = Math.hypot(moveX, moveZ);
  if (moveLength > 0) {
    moveX /= moveLength;
    moveZ /= moveLength;
  }

  const maxSpeed = (wantsCrouch
    ? config.crouchSpeed
    : wantsSprint
      ? config.runSpeed
      : config.walkSpeed) * speedMultiplier;

  const targetVelocityX = moveLength > 0 ? moveX * maxSpeed : 0;
  const targetVelocityZ = moveLength > 0 ? moveZ * maxSpeed : 0;
  const control = state.isGrounded ? 1 : config.airControl;
  const blend = Math.min(1, config.acceleration * control * delta);

  state.velocity.x = lerp(state.velocity.x, targetVelocityX, blend);
  state.velocity.z = lerp(state.velocity.z, targetVelocityZ, blend);

  const wasGrounded = state.isGrounded;
  if (state.isGrounded && wantsJump) {
    state.velocity.y = config.jumpForce;
    state.isGrounded = false;
  }

  if (!state.isGrounded) {
    state.velocity.y -= config.gravity * delta;
  }

  const stepX = state.velocity.x * delta;
  const stepY = state.velocity.y * delta;
  const stepZ = state.velocity.z * delta;

  const nextHorizontalPosition = options.moveHorizontal
    ? options.moveHorizontal(
      state.position,
      config.radius,
      state.currentHeight,
      { x: stepX, z: stepZ },
    )
    : {
      x: state.position.x + stepX,
      y: state.position.y,
      z: state.position.z + stepZ,
    };

  state.position.x = nextHorizontalPosition.x;
  state.position.z = nextHorizontalPosition.z;
  state.position.y += stepY;

  const floor = options.getGroundHeightAt
    ? options.getGroundHeightAt(
      state.position.x,
      state.position.z,
      state.position.y,
      wasGrounded ? config.maxStepHeight : 0,
    )
    : groundHeight;

  if (wasGrounded && state.velocity.y <= 0 && state.position.y <= floor + config.maxStepHeight) {
    state.position.y = floor;
    state.velocity.y = 0;
    state.isGrounded = true;
  } else if (state.position.y <= floor) {
    state.position.y = floor;
    state.velocity.y = 0;
    state.isGrounded = true;
  } else {
    state.isGrounded = false;
  }

  state.position.y = clamp(state.position.y, groundHeight - 32, 256);

  return state;
}
