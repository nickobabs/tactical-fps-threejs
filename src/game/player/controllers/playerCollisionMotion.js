import * as THREE from 'three';

const NEXT_POSITION = new THREE.Vector3();
const BUFFERED_CORRECTION_MOVE = new THREE.Vector3();
const CORRECTION_STEP_TARGET = new THREE.Vector3();
const MAX_CORRECTION_HORIZONTAL_SUBSTEP = 0.08;

export function movePositionCollisionSafe({
  position,
  movementMode,
  collisionWorld,
  radius,
  currentHeight,
  targetPosition,
  targetHeight = currentHeight,
}) {
  if (movementMode === 'fly' || !collisionWorld) {
    position.copy(targetPosition);
    return;
  }

  const startX = position.x;
  const startY = position.y;
  const startZ = position.z;
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

    const moved = collisionWorld.move(
      position,
      radius,
      targetHeight,
      BUFFERED_CORRECTION_MOVE.set(
        nextTargetX - position.x,
        nextTargetY - position.y,
        nextTargetZ - position.z,
      ),
      NEXT_POSITION,
    );

    position.copy(moved);
  }
}

export function applyMotionStateCollisionSafe({
  movementMode,
  collisionWorld,
  position,
  currentHeight,
  nextState,
  applyMotionState,
  applyMotionStatePreservingLook,
  movePosition,
  preserveLook = false,
}) {
  if (movementMode === 'fly' || !collisionWorld) {
    if (preserveLook) {
      applyMotionStatePreservingLook(nextState);
      return;
    }

    applyMotionState(nextState);
    return;
  }

  CORRECTION_STEP_TARGET.set(
    nextState.position.x,
    nextState.position.y,
    nextState.position.z,
  );
  movePosition(CORRECTION_STEP_TARGET, {
    targetHeight: nextState.currentHeight ?? currentHeight,
  });

  const resolvedState = {
    ...nextState,
    position: {
      x: position.x,
      y: position.y,
      z: position.z,
    },
  };

  if (preserveLook) {
    applyMotionStatePreservingLook(resolvedState);
    return;
  }

  applyMotionState(resolvedState);
}
