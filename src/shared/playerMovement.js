export const PLAYER_MOVEMENT_DEFAULTS = {
  standHeight: 1.72,
  crouchHeight: 1.08,
  radius: 0.35,
  walkSpeed: 4.92,
  runSpeed: 7.44,
  crouchSpeed: 2.64,
  jumpForce: 6.1,
  gravity: 18,
  acceleration: 32,
  airControl: 0.35,
  crouchLerpSpeed: 12,
  maxStepHeight: 0.45,
};
const GROUNDED_PROBE_EPSILON = 0.04;
const GROUNDED_STICK_EPSILON = 0.08;

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
  const desiredPosition = {
    x: state.position.x + stepX,
    y: state.position.y + stepY,
    z: state.position.z + stepZ,
  };

  if (options.resolvePosition) {
    const resolvedPosition = options.resolvePosition(
      state.position,
      config.radius,
      state.currentHeight,
      { x: stepX, y: stepY, z: stepZ },
    );
    const resolvedStepX = resolvedPosition.x - state.position.x;
    const resolvedStepY = resolvedPosition.y - state.position.y;
    const resolvedStepZ = resolvedPosition.z - state.position.z;
    const correctionX = resolvedPosition.x - desiredPosition.x;
    const correctionY = resolvedPosition.y - desiredPosition.y;
    const correctionZ = resolvedPosition.z - desiredPosition.z;
    const correctionLength = Math.hypot(correctionX, correctionY, correctionZ);
    let groundedFromCorrection = correctionY > Math.abs(stepY * 0.25);

    if (options.getGroundHeightAt) {
      const supportProbeY = Math.max(state.position.y, resolvedPosition.y);
      const supportFloor = options.getGroundHeightAt(
        resolvedPosition.x,
        resolvedPosition.z,
        supportProbeY,
        wasGrounded ? config.maxStepHeight : 0,
        Math.max(2, Math.abs(stepY) + config.maxStepHeight + config.radius + 0.5),
      );
      const floorDelta = resolvedPosition.y - supportFloor;
      const supportThreshold = wasGrounded
        ? config.maxStepHeight + GROUNDED_STICK_EPSILON
        : GROUNDED_PROBE_EPSILON;

      if (state.velocity.y <= 0 && floorDelta <= supportThreshold) {
        resolvedPosition.y = supportFloor;
        groundedFromCorrection = true;
      }
    }

    if (delta > 1e-6) {
      state.velocity.x = resolvedStepX / delta;
      state.velocity.z = resolvedStepZ / delta;
      state.velocity.y = groundedFromCorrection ? 0 : resolvedStepY / delta;
    }

    if (!groundedFromCorrection && correctionLength > 1e-6) {
      const correctionNormalX = correctionX / correctionLength;
      const correctionNormalY = correctionY / correctionLength;
      const correctionNormalZ = correctionZ / correctionLength;
      const velocityDot = (state.velocity.x * correctionNormalX)
        + (state.velocity.y * correctionNormalY)
        + (state.velocity.z * correctionNormalZ);

      state.velocity.x -= correctionNormalX * velocityDot;
      state.velocity.y -= correctionNormalY * velocityDot;
      state.velocity.z -= correctionNormalZ * velocityDot;
    }

    state.position.x = resolvedPosition.x;
    state.position.y = resolvedPosition.y;
    state.position.z = resolvedPosition.z;
    state.isGrounded = groundedFromCorrection;
    state.position.y = clamp(state.position.y, groundHeight - 32, groundHeight + 256);
    return state;
  }

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

  if (options.moveHorizontal && delta > 1e-6) {
    state.velocity.x = (nextHorizontalPosition.x - state.position.x) / delta;
    state.velocity.z = (nextHorizontalPosition.z - state.position.z) / delta;
  }

  state.position.x = nextHorizontalPosition.x;
  state.position.z = nextHorizontalPosition.z;
  const previousY = state.position.y;
  state.position.y += stepY;

  const groundProbeY = Math.max(previousY, state.position.y);
  const maxGroundDrop = Math.max(12, Math.abs(stepY) + config.maxStepHeight + config.radius + 0.5);

  const floor = options.getGroundHeightAt
    ? options.getGroundHeightAt(
      state.position.x,
      state.position.z,
      groundProbeY,
      wasGrounded ? config.maxStepHeight : 0,
      maxGroundDrop,
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

  state.position.y = clamp(state.position.y, groundHeight - 32, groundHeight + 256);

  return state;
}
