export function getMovementInputSnapshot({
  input,
  movementMode,
  yawAngle,
  pitchAngle,
  jumpPressed = false,
}) {
  if (movementMode === 'fly') {
    return {
      forward: input.isPressed('KeyW'),
      backward: input.isPressed('KeyS'),
      left: input.isPressed('KeyA'),
      right: input.isPressed('KeyD'),
      sprint: input.isPressed('ShiftLeft'),
      descend: input.isPressed('KeyC'),
      jump: Boolean(jumpPressed),
      yaw: yawAngle,
      pitch: pitchAngle,
    };
  }

  return {
    forward: input.isPressed('KeyW'),
    backward: input.isPressed('KeyS'),
    left: input.isPressed('KeyA'),
    right: input.isPressed('KeyD'),
    sprint: false,
    crouch: input.isPressed('KeyC'),
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
}) {
  if (movementMode === 'fly') {
    const speedMultiplier = getSpeedMultiplier();
    const wantsSprint = input.isPressed('ShiftLeft');
    const moveForward = input.isPressed('KeyW');
    const moveBackward = input.isPressed('KeyS');
    const moveLeft = input.isPressed('KeyA');
    const moveRight = input.isPressed('KeyD');
    const moveUp = input.isPressed('Space');
    const moveDown = input.isPressed('KeyC');

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
  const wantsCrouch = input.isPressed('KeyC');
  const moveForward = input.isPressed('KeyW');
  const moveBackward = input.isPressed('KeyS');
  const moveLeft = input.isPressed('KeyA');
  const moveRight = input.isPressed('KeyD');

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
    : walkSpeed) * speedMultiplier;

  return {
    x: moveX * maxSpeed,
    y: velocity.y,
    z: moveZ * maxSpeed,
  };
}
