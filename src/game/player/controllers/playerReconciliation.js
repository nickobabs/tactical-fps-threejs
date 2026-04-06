import { createPlayerMovementState } from '../../../shared/playerMovement.js';
import { NETCODE_SIMULATION_STEP } from '../../../shared/netcode.js';

export function replayAuthoritativeState({
  correction,
  fallbackYaw,
  fallbackCurrentHeight,
  simulateMovementStep,
}) {
  let replayState = createPlayerMovementState({
    position: correction.authoritativeState.position,
    velocity: correction.authoritativeState.velocity,
    yaw: correction.authoritativeState.yaw ?? fallbackYaw,
    isGrounded: correction.authoritativeState.isGrounded ?? true,
    isCrouched: correction.authoritativeState.isCrouched ?? false,
    currentHeight: correction.authoritativeState.currentHeight ?? fallbackCurrentHeight,
  });

  for (const replayInput of correction.replayInputs ?? []) {
    replayState = simulateMovementStep(
      replayState,
      replayInput.input,
      replayInput.simulationStep ?? NETCODE_SIMULATION_STEP,
      replayInput.input?.speedMultiplier,
    );
  }

  return replayState;
}

export function getReconciliationOutcome({
  replayState,
  currentPosition,
  isCorrectionActive,
  softCorrectionMinDistance,
  softCorrectionMaxDistance,
  localCorrectionStartDistance,
  localCorrectionStopDistance,
  correctionDeltaTarget,
}) {
  correctionDeltaTarget.set(
    replayState.position.x - currentPosition.x,
    replayState.position.y - currentPosition.y,
    replayState.position.z - currentPosition.z,
  );

  const correctionDistance = correctionDeltaTarget.length();

  if (correctionDistance <= softCorrectionMinDistance) {
    return {
      action: 'apply_exact',
      correctionDistance,
    };
  }

  if (!isCorrectionActive && correctionDistance < localCorrectionStartDistance) {
    return {
      action: 'ignore',
      correctionDistance,
    };
  }

  if (correctionDistance >= softCorrectionMaxDistance) {
    return {
      action: 'snap_exact',
      correctionDistance,
    };
  }

  if (isCorrectionActive && correctionDistance <= localCorrectionStopDistance) {
    return {
      action: 'stop',
      correctionDistance,
    };
  }

  return {
    action: 'buffer',
    correctionDistance,
  };
}
