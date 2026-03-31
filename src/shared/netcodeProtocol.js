export function createPlayerInputMessage(inputSnapshot, sequence, timestamp) {
  return {
    forward: Boolean(inputSnapshot?.forward),
    backward: Boolean(inputSnapshot?.backward),
    left: Boolean(inputSnapshot?.left),
    right: Boolean(inputSnapshot?.right),
    sprint: Boolean(inputSnapshot?.sprint),
    crouch: Boolean(inputSnapshot?.crouch),
    jump: Boolean(inputSnapshot?.jump),
    yaw: Number(inputSnapshot?.yaw ?? 0),
    speedMultiplier: Number(inputSnapshot?.speedMultiplier ?? 1),
    sequence: Number(sequence ?? 0),
    timestamp: Number(timestamp ?? 0),
  };
}

export function createPlayerReadyMessage(state) {
  return {
    mapId: String(state?.mapId ?? 'training-ground'),
    position: {
      x: Number(state?.position?.x ?? 0),
      y: Number(state?.position?.y ?? 0),
      z: Number(state?.position?.z ?? 0),
    },
    velocity: {
      x: Number(state?.velocity?.x ?? 0),
      y: Number(state?.velocity?.y ?? 0),
      z: Number(state?.velocity?.z ?? 0),
    },
    yaw: Number(state?.yaw ?? 0),
    isGrounded: Boolean(state?.isGrounded ?? true),
    isCrouched: Boolean(state?.isCrouched ?? false),
    currentHeight: Number(state?.currentHeight ?? 1.72),
  };
}

export function normalizeAuthoritativePlayerState(playerId, state) {
  return {
    playerId,
    position: {
      x: Number(state?.position?.x ?? 0),
      y: Number(state?.position?.y ?? 0),
      z: Number(state?.position?.z ?? 0),
    },
    velocity: {
      x: Number(state?.velocity?.x ?? 0),
      y: Number(state?.velocity?.y ?? 0),
      z: Number(state?.velocity?.z ?? 0),
    },
    yaw: Number(state?.yaw ?? 0),
    sequence: Number(state?.lastProcessedSequence ?? 0),
    timestamp: Number(state?.lastProcessedTimestamp ?? 0),
    isGrounded: Boolean(state?.isGrounded),
    isCrouched: Boolean(state?.isCrouched),
    currentHeight: Number(state?.currentHeight ?? 1.72),
  };
}

export function serializeAuthoritativePlayerState(playerId, player) {
  return {
    playerId,
    position: {
      x: Number(player?.motionState?.position?.x ?? 0),
      y: Number(player?.motionState?.position?.y ?? 0),
      z: Number(player?.motionState?.position?.z ?? 0),
    },
    velocity: {
      x: Number(player?.motionState?.velocity?.x ?? 0),
      y: Number(player?.motionState?.velocity?.y ?? 0),
      z: Number(player?.motionState?.velocity?.z ?? 0),
    },
    yaw: Number(player?.motionState?.yaw ?? 0),
    isGrounded: Boolean(player?.motionState?.isGrounded),
    isCrouched: Boolean(player?.motionState?.isCrouched),
    currentHeight: Number(player?.motionState?.currentHeight ?? 1.72),
    lastProcessedSequence: Number(player?.lastProcessedSequence ?? 0),
    lastProcessedTimestamp: Number(player?.lastProcessedTimestamp ?? 0),
  };
}
