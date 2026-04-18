export function getMovementInputSnapshot({
  input,
  movementMode,
  yawAngle,
  pitchAngle,
  jumpPressed = false,
  walkSpeedFactor = 0.5,
}) {
  if (movementMode === 'fly') {
    return {
      forward: input.isPressed('moveForward'),
      backward: input.isPressed('moveBackward'),
      left: input.isPressed('moveLeft'),
      right: input.isPressed('moveRight'),
      sprint: input.isPressed('walk'),
      descend: input.isPressed('crouch'),
      jump: Boolean(jumpPressed),
      yaw: yawAngle,
      pitch: pitchAngle,
    };
  }

  return {
    forward: input.isPressed('moveForward'),
    backward: input.isPressed('moveBackward'),
    left: input.isPressed('moveLeft'),
    right: input.isPressed('moveRight'),
    walk: input.isPressed('walk'),
    walkSpeedFactor: Number(walkSpeedFactor ?? 0.5),
    crouch: input.isPressed('crouch'),
    jump: Boolean(jumpPressed),
    yaw: yawAngle,
    pitch: pitchAngle,
  };
}

export function getImmediatePresentationVelocity({
  input,
  movementMode,
  yawAngle,
  velocity,
  getSpeedMultiplier,
  flySpeed,
  flySprintSpeed,
  crouchSpeed,
  runSpeed,
  walkSpeed,
  walkSpeedFactor = 0.5,
}) {
  if (movementMode === 'fly') {
    const speedMultiplier = getSpeedMultiplier();
    const wantsSprint = input.isPressed('walk');
    const moveForward = input.isPressed('moveForward');
    const moveBackward = input.isPressed('moveBackward');
    const moveLeft = input.isPressed('moveLeft');
    const moveRight = input.isPressed('moveRight');
    const moveUp = input.isPressed('jump');
    const moveDown = input.isPressed('crouch');

    const forwardX = -Math.sin(yawAngle);
    const forwardZ = -Math.cos(yawAngle);
    const rightX = Math.cos(yawAngle);
    const rightZ = -Math.sin(yawAngle);

    let moveX = 0;
    let moveY = 0;
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
    if (moveUp) {
      moveY += 1;
    }
    if (moveDown) {
      moveY -= 1;
    }

    const moveLength = Math.hypot(moveX, moveY, moveZ);
    if (moveLength <= 0) {
      return { x: 0, y: 0, z: 0 };
    }

    const speed = (wantsSprint ? flySprintSpeed : flySpeed) * speedMultiplier;
    return {
      x: (moveX / moveLength) * speed,
      y: (moveY / moveLength) * speed,
      z: (moveZ / moveLength) * speed,
    };
  }

  const speedMultiplier = getSpeedMultiplier();
  const wantsCrouch = input.isPressed('crouch');
  const wantsWalk = input.isPressed('walk');
  const resolvedWalkSpeedFactor = Math.max(0.1, Number(walkSpeedFactor ?? 0.5));
  const moveForward = input.isPressed('moveForward');
  const moveBackward = input.isPressed('moveBackward');
  const moveLeft = input.isPressed('moveLeft');
  const moveRight = input.isPressed('moveRight');

  const forwardX = -Math.sin(yawAngle);
  const forwardZ = -Math.cos(yawAngle);
  const rightX = Math.cos(yawAngle);
  const rightZ = -Math.sin(yawAngle);

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
    return { x: 0, y: velocity.y, z: 0 };
  }

  moveX /= moveLength;
  moveZ /= moveLength;

  const maxSpeed = (wantsCrouch
    ? crouchSpeed
    : (wantsWalk ? walkSpeed * resolvedWalkSpeedFactor : walkSpeed)) * speedMultiplier;

  return {
    x: moveX * maxSpeed,
    y: velocity.y,
    z: moveZ * maxSpeed,
  };
}
