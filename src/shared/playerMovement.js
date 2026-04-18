export const PLAYER_MOVEMENT_DEFAULTS = {
  standHeight: 1.72,
  crouchHeight: 1.08,
  radius: 0.35,
  walkSpeed: 4.92,
  runSpeed: 7.44,
  crouchSpeed: 2.1,
  jumpForce: 6.1,
  gravity: 18,
  acceleration: 18,
  deceleration: 14,
  airControl: 0.35,
  crouchLerpSpeed: 12,
  crouchFatigueGraceToggles: 2,
  crouchFatiguePerToggle: 0.45,
  crouchFatigueMax: 1,
  crouchFatigueDecayPerSecond: 1,
  crouchFatigueResetDelay: 1,
  crouchFatigueMinLerpMultiplier: 0.45,
  maxStepHeight: 0.45,
};
export const PLAYER_CROUCH_PRESENTATION_ENTER_THRESHOLD = 0.55;
const GROUNDED_PROBE_EPSILON = 0.04;
const GROUNDED_STICK_EPSILON = 0.08;
const LANDING_SNAP_PADDING = 0.14;
const MAX_AIR_LANDING_SNAP_DISTANCE = 0.1;
const MAX_AIR_COLLISION_LIFT = 0.03;
const POSITION_CLAMP_BELOW_GROUND = 4096;
const POSITION_CLAMP_ABOVE_GROUND = 4096;
const STATIONARY_LEDGE_SUPPORT_SPEED = 0.2;
const GROUND_SUPPORT_OFFSETS = [
  [0, 0],
  [-0.63, 0],
  [0.63, 0],
  [0, -0.63],
  [0, 0.63],
  [-0.46, -0.46],
  [0.46, -0.46],
  [-0.46, 0.46],
  [0.46, 0.46],
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start, end, alpha) {
  return start + (end - start) * alpha;
}

export function getPlayerCrouchFraction(currentHeight, config = PLAYER_MOVEMENT_DEFAULTS) {
  const standHeight = Number(config?.standHeight ?? PLAYER_MOVEMENT_DEFAULTS.standHeight);
  const crouchHeight = Number(config?.crouchHeight ?? PLAYER_MOVEMENT_DEFAULTS.crouchHeight);
  const heightRange = Math.max(1e-6, standHeight - crouchHeight);
  return clamp((standHeight - Number(currentHeight ?? standHeight)) / heightRange, 0, 1);
}

export function isPlayerPresentationCrouched(
  state,
  {
    config = PLAYER_MOVEMENT_DEFAULTS,
    threshold = PLAYER_CROUCH_PRESENTATION_ENTER_THRESHOLD,
  } = {},
) {
  return getPlayerCrouchFraction(state?.currentHeight, config) >= Number(threshold ?? PLAYER_CROUCH_PRESENTATION_ENTER_THRESHOLD);
}

function getGroundSupportInfo({
  getGroundHeightAt,
  x,
  z,
  currentY,
  maxStepUp,
  maxDrop,
  radius,
  supportThreshold,
}) {
  if (typeof getGroundHeightAt !== 'function') {
    return null;
  }

  const sampleRadius = Math.max(0.08, Number(radius ?? PLAYER_MOVEMENT_DEFAULTS.radius));
  const heights = GROUND_SUPPORT_OFFSETS.map(([offsetX, offsetZ]) => (
    getGroundHeightAt(
      x + (offsetX * sampleRadius),
      z + (offsetZ * sampleRadius),
      currentY,
      maxStepUp,
      maxDrop,
    )
  ));

  const centerHeight = heights[0];
  if (!Number.isFinite(centerHeight)) {
    return {
      height: null,
      centerHeight: null,
      supportedSamples: 0,
      supportRatio: 0,
    };
  }
  let supportedSamples = 0;
  let accumulatedHeight = 0;

  for (const height of heights) {
    if (!Number.isFinite(height)) {
      continue;
    }

    if (Math.abs(height - centerHeight) <= supportThreshold) {
      supportedSamples += 1;
      accumulatedHeight += height;
    }
  }

  if (supportedSamples === 0) {
    return {
      height: centerHeight,
      centerHeight,
      supportedSamples: 0,
      supportRatio: 0,
    };
  }

  return {
    height: accumulatedHeight / supportedSamples,
    centerHeight,
    supportedSamples,
    supportRatio: supportedSamples / heights.length,
  };
}

export function createPlayerMovementState({
  position = { x: 0, y: 0, z: 0 },
  velocity = { x: 0, y: 0, z: 0 },
  yaw = 0,
  isGrounded = true,
  isCrouched = false,
  currentHeight = PLAYER_MOVEMENT_DEFAULTS.standHeight,
  distanceToGround = 0,
  supportHeight = null,
  supportRatio = 0,
  airborneMaxSpeed = null,
  crouchFatigue = 0,
  crouchToggleCount = 0,
  timeSinceCrouchToggle = Infinity,
} = {}) {
  return {
    position: { x: position.x, y: position.y, z: position.z },
    velocity: { x: velocity.x, y: velocity.y, z: velocity.z },
    yaw,
    isGrounded,
    isCrouched,
    currentHeight,
    distanceToGround: Number(distanceToGround ?? 0),
    supportHeight: Number.isFinite(supportHeight) ? Number(supportHeight) : null,
    supportRatio: Number(supportRatio ?? 0),
    airborneMaxSpeed: Number.isFinite(airborneMaxSpeed) ? Math.max(0, Number(airborneMaxSpeed)) : null,
    crouchFatigue: clamp(Number(crouchFatigue ?? 0), 0, Number(PLAYER_MOVEMENT_DEFAULTS.crouchFatigueMax ?? 1)),
    crouchToggleCount: Math.max(0, Math.floor(Number(crouchToggleCount ?? 0))),
    timeSinceCrouchToggle: Number.isFinite(timeSinceCrouchToggle) ? Math.max(0, Number(timeSinceCrouchToggle)) : Infinity,
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
  const wasCrouched = Boolean(state.isCrouched);
  const wantsWalk = Boolean(inputSnapshot?.walk);
  const walkSpeedFactor = Math.max(0.1, Number(inputSnapshot?.walkSpeedFactor ?? 0.5));
  const wantsJump = Boolean(inputSnapshot?.jump);
  const previousHorizontalSpeed = Math.hypot(
    Number(state.velocity?.x ?? 0),
    Number(state.velocity?.z ?? 0),
  );

  state.yaw = yaw;
  state.timeSinceCrouchToggle = Number.isFinite(state.timeSinceCrouchToggle)
    ? state.timeSinceCrouchToggle + delta
    : delta;

  if (state.timeSinceCrouchToggle >= config.crouchFatigueResetDelay) {
    state.crouchFatigue = 0;
    state.crouchToggleCount = 0;
  } else {
    state.crouchFatigue = Math.max(
      0,
      Number(state.crouchFatigue ?? 0) - (config.crouchFatigueDecayPerSecond * delta),
    );
  }

  if (wantsCrouch !== wasCrouched) {
    if (state.timeSinceCrouchToggle >= config.crouchFatigueResetDelay) {
      state.crouchFatigue = 0;
      state.crouchToggleCount = 0;
    }
    state.crouchToggleCount = Number(state.crouchToggleCount ?? 0) + 1;
    state.timeSinceCrouchToggle = 0;
    if (state.crouchToggleCount > config.crouchFatigueGraceToggles) {
      state.crouchFatigue = Math.min(
        config.crouchFatigueMax,
        Number(state.crouchFatigue ?? 0) + config.crouchFatiguePerToggle,
      );
    }
  }

  state.isCrouched = wantsCrouch;

  const targetHeight = wantsCrouch ? config.crouchHeight : config.standHeight;
  const crouchLerpMultiplier = lerp(
    1,
    config.crouchFatigueMinLerpMultiplier,
    clamp(
      config.crouchFatigueMax > 1e-6
        ? Number(state.crouchFatigue ?? 0) / config.crouchFatigueMax
        : 0,
      0,
      1,
    ),
  );
  state.currentHeight = lerp(
    state.currentHeight,
    targetHeight,
    1 - Math.exp(-(config.crouchLerpSpeed * crouchLerpMultiplier) * delta),
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

  const groundedMaxSpeed = (wantsCrouch
    ? config.crouchSpeed
    : (wantsWalk ? config.walkSpeed * walkSpeedFactor : config.walkSpeed)) * speedMultiplier;
  const effectiveMaxSpeed = state.isGrounded
    ? groundedMaxSpeed
    : (Number.isFinite(state.airborneMaxSpeed) ? Number(state.airborneMaxSpeed) : groundedMaxSpeed);

  const targetVelocityX = moveLength > 0 ? moveX * effectiveMaxSpeed : 0;
  const targetVelocityZ = moveLength > 0 ? moveZ * effectiveMaxSpeed : 0;
  const control = state.isGrounded ? 1 : config.airControl;
  const currentHorizontalSpeed = Math.hypot(state.velocity.x, state.velocity.z);
  const speedAlpha = effectiveMaxSpeed > 1e-6
    ? clamp(currentHorizontalSpeed / effectiveMaxSpeed, 0, 1)
    : 0;
  const groundedAccelerationRamp = state.isGrounded
    ? lerp(0.24, 1, Math.pow(speedAlpha, 0.9))
    : 1;
  const targetHorizontalSpeed = Math.hypot(targetVelocityX, targetVelocityZ);
  let directionalDot = 1;
  if (currentHorizontalSpeed > 1e-6 && targetHorizontalSpeed > 1e-6) {
    directionalDot = (
      (state.velocity.x / currentHorizontalSpeed) * (targetVelocityX / targetHorizontalSpeed)
      + (state.velocity.z / currentHorizontalSpeed) * (targetVelocityZ / targetHorizontalSpeed)
    );
  }
  const reverseAlpha = state.isGrounded ? clamp(-directionalDot, 0, 1) : 0;
  const groundedDeceleration = state.isGrounded
    ? config.deceleration * lerp(1, 2.4, reverseAlpha)
    : config.acceleration * control;
  const blend = moveLength <= 0
    ? Math.min(1, groundedDeceleration * delta)
    : Math.min(1, config.acceleration * control * groundedAccelerationRamp * delta);

  state.velocity.x = lerp(state.velocity.x, targetVelocityX, blend);
  state.velocity.z = lerp(state.velocity.z, targetVelocityZ, blend);

  const wasGrounded = state.isGrounded;
  if (state.isGrounded && wantsJump) {
    state.airborneMaxSpeed = groundedMaxSpeed;
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
      const supportThreshold = wasGrounded
        ? config.maxStepHeight + GROUNDED_STICK_EPSILON
        : GROUNDED_PROBE_EPSILON;
      const supportInfo = getGroundSupportInfo({
        getGroundHeightAt: options.getGroundHeightAt,
        x: resolvedPosition.x,
        z: resolvedPosition.z,
        currentY: supportProbeY,
        maxStepUp: wasGrounded ? config.maxStepHeight : 0,
        maxDrop: Math.max(2, Math.abs(stepY) + config.maxStepHeight + config.radius + 0.5),
        radius: config.radius,
        supportThreshold: Math.max(GROUNDED_PROBE_EPSILON, config.maxStepHeight * 0.35),
      });
      const stationaryLedgeSupport = wasGrounded
        && previousHorizontalSpeed <= STATIONARY_LEDGE_SUPPORT_SPEED
        && Number.isFinite(supportInfo?.centerHeight);
      const resolvedSupportFloor = stationaryLedgeSupport
        ? Number(supportInfo.centerHeight)
        : Number.isFinite(supportInfo?.height)
          ? Number(supportInfo.height)
        : Number.isFinite(supportFloor)
          ? Number(supportFloor)
          : null;
      const hasSupportFloor = Number.isFinite(resolvedSupportFloor);
      const floorDelta = hasSupportFloor ? resolvedPosition.y - resolvedSupportFloor : Infinity;
      state.distanceToGround = hasSupportFloor ? Math.max(0, floorDelta) : Infinity;
      state.supportHeight = hasSupportFloor ? resolvedSupportFloor : null;
      state.supportRatio = Number(supportInfo?.supportRatio ?? 0);
      const landingSnapDistance = wasGrounded
        ? supportThreshold
        : Math.min(
          MAX_AIR_LANDING_SNAP_DISTANCE,
          Math.max(
            GROUNDED_PROBE_EPSILON,
            Math.abs(stepY) + (LANDING_SNAP_PADDING * 0.25),
          ),
        );
      const minSupportRatio = wasGrounded
        ? (stationaryLedgeSupport ? 0.23 : 0.34)
        : 0.45;
      const hasEnoughSupport = Number(supportInfo?.supportRatio ?? 0) >= minSupportRatio;

      if (hasSupportFloor && hasEnoughSupport && state.velocity.y <= 0 && floorDelta <= landingSnapDistance) {
        resolvedPosition.y = resolvedSupportFloor;
        groundedFromCorrection = true;
        state.distanceToGround = 0;
      } else if (!wasGrounded) {
        const maxAirborneY = desiredPosition.y + MAX_AIR_COLLISION_LIFT;
        if (resolvedPosition.y > maxAirborneY) {
          resolvedPosition.y = maxAirborneY;
        }
      }
    } else {
      state.distanceToGround = state.isGrounded ? 0 : Infinity;
      state.supportHeight = null;
      state.supportRatio = 0;
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
    state.position.y = clamp(
      state.position.y,
      groundHeight - POSITION_CLAMP_BELOW_GROUND,
      groundHeight + POSITION_CLAMP_ABOVE_GROUND,
    );
    if (state.isGrounded) {
      state.distanceToGround = 0;
      state.airborneMaxSpeed = null;
    } else if (wasGrounded) {
      state.airborneMaxSpeed = groundedMaxSpeed;
    }
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
  const supportThreshold = Math.max(GROUNDED_PROBE_EPSILON, config.maxStepHeight * 0.35);
  const supportInfo = options.getGroundHeightAt
    ? getGroundSupportInfo({
      getGroundHeightAt: options.getGroundHeightAt,
      x: state.position.x,
      z: state.position.z,
      currentY: groundProbeY,
      maxStepUp: wasGrounded ? config.maxStepHeight : 0,
      maxDrop: maxGroundDrop,
      radius: config.radius,
      supportThreshold,
    })
    : null;
  const stationaryLedgeSupport = wasGrounded
    && previousHorizontalSpeed <= STATIONARY_LEDGE_SUPPORT_SPEED
    && Number.isFinite(supportInfo?.centerHeight);
  const resolvedFloor = stationaryLedgeSupport
    ? Number(supportInfo.centerHeight)
    : Number.isFinite(supportInfo?.height)
      ? Number(supportInfo.height)
    : Number.isFinite(floor)
      ? Number(floor)
      : null;
  const hasSupportFloor = Number.isFinite(resolvedFloor);
  const supportRatio = hasSupportFloor ? Number(supportInfo?.supportRatio ?? 1) : 0;
  const floorDelta = hasSupportFloor ? state.position.y - resolvedFloor : Infinity;
  state.distanceToGround = hasSupportFloor ? Math.max(0, floorDelta) : Infinity;
  state.supportHeight = hasSupportFloor ? resolvedFloor : null;
  state.supportRatio = supportRatio;

  if (
    wasGrounded
    && hasSupportFloor
    && supportRatio >= (stationaryLedgeSupport ? 0.23 : 0.34)
    && state.velocity.y <= 0
    && state.position.y <= resolvedFloor + config.maxStepHeight
  ) {
    state.position.y = resolvedFloor;
    state.velocity.y = 0;
    state.isGrounded = true;
    state.distanceToGround = 0;
  } else if (hasSupportFloor && supportRatio >= 0.45 && state.position.y <= resolvedFloor) {
    state.position.y = resolvedFloor;
    state.velocity.y = 0;
    state.isGrounded = true;
    state.distanceToGround = 0;
  } else {
    state.isGrounded = false;
  }

  state.position.y = clamp(
    state.position.y,
    groundHeight - POSITION_CLAMP_BELOW_GROUND,
    groundHeight + POSITION_CLAMP_ABOVE_GROUND,
  );
  if (state.isGrounded) {
    state.airborneMaxSpeed = null;
  } else if (wasGrounded) {
    state.airborneMaxSpeed = groundedMaxSpeed;
  }

  return state;
}
