export function createPlayerInputMessage(inputSnapshot, sequence, timestamp) {
  return {
    forward: Boolean(inputSnapshot?.forward),
    backward: Boolean(inputSnapshot?.backward),
    left: Boolean(inputSnapshot?.left),
    right: Boolean(inputSnapshot?.right),
    sprint: Boolean(inputSnapshot?.sprint),
    walk: Boolean(inputSnapshot?.walk),
    walkSpeedFactor: Number(inputSnapshot?.walkSpeedFactor ?? 0.5),
    crouch: Boolean(inputSnapshot?.crouch),
    jump: Boolean(inputSnapshot?.jump),
    yaw: Number(inputSnapshot?.yaw ?? 0),
    pitch: Number(inputSnapshot?.pitch ?? 0),
    speedMultiplier: Number(inputSnapshot?.speedMultiplier ?? 1),
    activeWeaponKey: String(inputSnapshot?.activeWeaponKey ?? 'rifle'),
    sequence: Number(sequence ?? 0),
    timestamp: Number(timestamp ?? 0),
  };
}

export function createPlayerFireMessage(fireRequest, timestamp) {
  return {
    weaponKey: String(fireRequest?.weaponKey ?? 'rifle'),
    origin: {
      x: Number(fireRequest?.origin?.x ?? 0),
      y: Number(fireRequest?.origin?.y ?? 0),
      z: Number(fireRequest?.origin?.z ?? 0),
    },
    direction: {
      x: Number(fireRequest?.direction?.x ?? 0),
      y: Number(fireRequest?.direction?.y ?? 0),
      z: Number(fireRequest?.direction?.z ?? -1),
    },
    timestamp: Number(timestamp ?? fireRequest?.timestamp ?? 0),
  };
}

export function createPlayerReadyMessage(state) {
  return {
    mapId: String(state?.mapId ?? 'training-ground'),
    team: String(state?.team ?? 'attackers'),
    displayName: String(state?.displayName ?? '').trim(),
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
    pitch: Number(state?.pitch ?? 0),
    isGrounded: Boolean(state?.isGrounded ?? true),
    isCrouched: Boolean(state?.isCrouched ?? false),
    currentHeight: Number(state?.currentHeight ?? 1.72),
    activeWeaponKey: String(state?.activeWeaponKey ?? 'rifle'),
  };
}

export function createPlayerStatusMessage(state) {
  return {
    activeWeaponKey: String(state?.activeWeaponKey ?? 'rifle'),
    isScoped: Boolean(state?.isScoped ?? false),
  };
}

export function createChatMessage(state) {
  const rawScope = String(state?.scope ?? 'all').trim().toLowerCase();
  const scope = rawScope === 'team' ? 'team' : 'all';
  const text = String(state?.text ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
  return {
    scope,
    text,
  };
}

export function createBuyRequestMessage(state) {
  const weaponKey = String(state?.weaponKey ?? 'rifle');
  return {
    weaponKey: weaponKey === 'sniper' ? 'sniper' : 'rifle',
  };
}

export function createGamemodeChangeMessage(state) {
  return {
    gamemode: String(state?.gamemode ?? 'debug'),
    mapId: String(state?.mapId ?? 'training-ground'),
    resetMatch: Boolean(state?.resetMatch ?? false),
  };
}

export function createBombPlantMessage(state) {
  return {
    zoneName: String(state?.zoneName ?? '').trim(),
    position: {
      x: Number(state?.position?.x ?? 0),
      y: Number(state?.position?.y ?? 0),
      z: Number(state?.position?.z ?? 0),
    },
  };
}

export function createBombDropMessage() {
  return {};
}

export function createDebugRoundControlMessage(state) {
  return {
    action: String(state?.action ?? '').trim(),
    enabled: state?.enabled == null ? null : Boolean(state.enabled),
  };
}

export function createBombDefuseMessage(state) {
  return {
    action: String(state?.action ?? 'complete'),
    position: {
      x: Number(state?.position?.x ?? 0),
      y: Number(state?.position?.y ?? 0),
      z: Number(state?.position?.z ?? 0),
    },
    eyePosition: {
      x: Number(state?.eyePosition?.x ?? 0),
      y: Number(state?.eyePosition?.y ?? 0),
      z: Number(state?.eyePosition?.z ?? 0),
    },
    direction: {
      x: Number(state?.direction?.x ?? 0),
      y: Number(state?.direction?.y ?? 0),
      z: Number(state?.direction?.z ?? -1),
    },
  };
}

export function createSmokeBloomMessage(state) {
  return {
    position: {
      x: Number(state?.position?.x ?? 0),
      y: Number(state?.position?.y ?? 0),
      z: Number(state?.position?.z ?? 0),
    },
  };
}

export function createSmokeThrowMessage(state) {
  return {
    origin: {
      x: Number(state?.origin?.x ?? 0),
      y: Number(state?.origin?.y ?? 0),
      z: Number(state?.origin?.z ?? 0),
    },
    direction: {
      x: Number(state?.direction?.x ?? 0),
      y: Number(state?.direction?.y ?? 0),
      z: Number(state?.direction?.z ?? -1),
    },
    inheritedVelocity: {
      x: Number(state?.inheritedVelocity?.x ?? 0),
      y: Number(state?.inheritedVelocity?.y ?? 0),
      z: Number(state?.inheritedVelocity?.z ?? 0),
    },
    speed: Number(state?.speed ?? 15.2),
  };
}

export function normalizeAuthoritativePlayerState(playerId, state) {
  return {
    playerId,
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
    pitch: Number(state?.pitch ?? 0),
    sequence: Number(state?.lastProcessedSequence ?? 0),
    timestamp: Number(state?.lastProcessedTimestamp ?? 0),
    isGrounded: Boolean(state?.isGrounded),
    isCrouched: Boolean(state?.isCrouched),
    currentHeight: Number(state?.currentHeight ?? 1.72),
    airborneMaxSpeed: state?.airborneMaxSpeed == null ? null : Number(state.airborneMaxSpeed),
    crouchFatigue: Number(state?.crouchFatigue ?? 0),
    crouchToggleCount: Number(state?.crouchToggleCount ?? 0),
    timeSinceCrouchToggle: state?.timeSinceCrouchToggle == null ? null : Number(state.timeSinceCrouchToggle),
    health: Number(state?.health ?? 100),
    maxHealth: Number(state?.maxHealth ?? 100),
    isAlive: Boolean(state?.isAlive ?? true),
    respawnAt: Number(state?.respawnAt ?? 0),
    displayName: String(state?.displayName ?? playerId),
    team: String(state?.team ?? 'attackers'),
    kills: Number(state?.kills ?? 0),
    deaths: Number(state?.deaths ?? 0),
    pingMs: Number(state?.pingMs ?? 0),
    activeWeaponKey: String(state?.activeWeaponKey ?? 'rifle'),
    ownsSniper: Boolean(state?.ownsSniper ?? false),
    isScoped: Boolean(state?.isScoped ?? false),
    presentationState: String(state?.presentationState ?? 'idle'),
    deathClip: state?.deathClip ? String(state.deathClip) : null,
    hitboxes: state?.hitboxes ?? null,
    hitboxDebug: state?.hitboxDebug ?? null,
  };
}

export function serializeAuthoritativePlayerState(playerId, player) {
  return {
    playerId,
    mapId: String(player?.mapId ?? 'training-ground'),
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
    pitch: Number(player?.pitch ?? 0),
    isGrounded: Boolean(player?.motionState?.isGrounded),
    isCrouched: Boolean(player?.motionState?.isCrouched),
    currentHeight: Number(player?.motionState?.currentHeight ?? 1.72),
    airborneMaxSpeed: player?.motionState?.airborneMaxSpeed == null
      ? null
      : Number(player.motionState.airborneMaxSpeed),
    crouchFatigue: Number(player?.motionState?.crouchFatigue ?? 0),
    crouchToggleCount: Number(player?.motionState?.crouchToggleCount ?? 0),
    timeSinceCrouchToggle: player?.motionState?.timeSinceCrouchToggle == null
      ? null
      : Number(player.motionState.timeSinceCrouchToggle),
    lastProcessedSequence: Number(player?.lastProcessedSequence ?? 0),
    lastProcessedTimestamp: Number(player?.lastProcessedTimestamp ?? 0),
    health: Number(player?.health ?? 100),
    maxHealth: Number(player?.maxHealth ?? 100),
    isAlive: Boolean(player?.isAlive ?? true),
    respawnAt: Number(player?.respawnAt ?? 0),
    displayName: String(player?.displayName ?? playerId),
    team: String(player?.team ?? 'attackers'),
    kills: Number(player?.kills ?? 0),
    deaths: Number(player?.deaths ?? 0),
    pingMs: Number(player?.pingMs ?? 0),
    activeWeaponKey: String(player?.activeWeaponKey ?? 'rifle'),
    ownsSniper: Boolean(player?.ownsSniper ?? false),
    isScoped: Boolean(player?.isScoped ?? false),
    presentationState: String(player?.presentationState ?? 'idle'),
    deathClip: player?.deathClip ? String(player.deathClip) : null,
    hitboxes: player?.authoritativeHitboxes ?? null,
    hitboxDebug: player?.hitboxRig?.debugState ?? null,
  };
}
