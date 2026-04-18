export function getDefaultMovementDebugState() {
  return {
    grounded: true,
    crouched: false,
    speed: 0,
    traceRecording: false,
    correctionOffsetMagnitude: 0,
    simulationDeltaMagnitude: 0,
    movementMode: 'grounded',
    positionText: '0.00, 0.00, 0.00',
  };
}

export function getDefaultNetworkDebugState() {
  return {
    connectionState: 'offline',
    localMapId: null,
    receivedPlayerStateCount: 0,
    sameMapRemoteStateCount: 0,
    filteredRemoteStateCount: 0,
    receivedRemoteMaps: [],
    latestSequence: 0,
    acknowledgedSequence: 0,
    pendingInputCount: 0,
    sequenceGap: 0,
    snapshotAgeMs: -1,
    lastPredictedDriftDistance: 0,
    authoritativeUpdatesPerSecond: 0,
    pendingJumpSend: false,
    remoteTraceRecording: false,
  };
}

export function collectHudDebugState({
  playerController,
  networkClient,
  remotePlayerPresenter,
  isMovementTraceRecording = false,
  isRemoteAnimationTraceRecording = false,
} = {}) {
  const movement = playerController?.getDebugState?.() ?? getDefaultMovementDebugState();
  movement.traceRecording = Boolean(isMovementTraceRecording);

  const networkDebug = networkClient?.getDebugState?.() ?? getDefaultNetworkDebugState();
  networkDebug.remoteTraceRecording = Boolean(isRemoteAnimationTraceRecording);
  const remoteDebug = remotePlayerPresenter?.getDebugState?.() ?? null;

  return {
    movement,
    networkDebug,
    remoteDebug,
  };
}
