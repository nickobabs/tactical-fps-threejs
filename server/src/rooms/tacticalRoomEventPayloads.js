export function createPlayerRespawnedEvent(player) {
  return {
    type: 'player-respawned',
    playerId: player.playerId,
  };
}

export function createPlayerFiredEvent(player, shotResult) {
  return {
    type: 'player-fired',
    playerId: player.playerId,
    weaponKey: player.activeWeaponKey,
    mapId: player.mapId,
    origin: shotResult.origin,
    tracerEnd: shotResult.traceEnd,
    impact: shotResult.impact,
  };
}

export function createPlayerHitEvent({
  attacker,
  target,
  weaponKey,
  damage,
  hitZone,
  shotResult,
  deathClip,
} = {}) {
  return {
    type: 'player-hit',
    attackerPlayerId: attacker.playerId,
    victimPlayerId: target.playerId,
    weaponKey: String(weaponKey ?? attacker.activeWeaponKey ?? 'rifle'),
    damage,
    hitZone,
    hitPosition: {
      x: shotResult.origin.x + (shotResult.direction.x * shotResult.bestDistance),
      y: shotResult.origin.y + (shotResult.direction.y * shotResult.bestDistance),
      z: shotResult.origin.z + (shotResult.direction.z * shotResult.bestDistance),
    },
    hitDirection: shotResult.direction,
    remainingHealth: target.health,
    killed: target.health === 0,
    deathClip,
    respawnAt: target.respawnAt,
  };
}

export function createPositionalAudioEvent({
  type,
  sourcePlayerId,
  mapId,
  soundKey,
  position,
  baseVolume,
  minDistance,
  maxDistance,
  rolloffExponent,
  playback,
  minIntervalMs,
  attenuationHoldExponent,
  attenuationCutoffStart,
  attenuationCutoffExponent,
  duration,
} = {}) {
  return {
    type,
    sourcePlayerId,
    mapId,
    soundKey,
    position: {
      x: Number(position?.x ?? 0),
      y: Number(position?.y ?? 0),
      z: Number(position?.z ?? 0),
    },
    baseVolume,
    minDistance,
    maxDistance,
    rolloffExponent,
    playback,
    minIntervalMs,
    attenuationHoldExponent,
    attenuationCutoffStart,
    attenuationCutoffExponent,
    duration,
  };
}

export function createDefuseStartAudioEvent({
  player,
  plantedMapId,
  plantedPosition,
  config,
} = {}) {
  return createPositionalAudioEvent({
    type: 'objective-defuse-start',
    sourcePlayerId: player.playerId,
    mapId: plantedMapId,
    soundKey: config.soundKey,
    position: plantedPosition,
    baseVolume: config.baseVolume,
    minDistance: config.minDistance,
    maxDistance: config.maxDistance,
    rolloffExponent: config.rolloffExponent,
    playback: 'interrupt',
    minIntervalMs: 120,
  });
}

export function createBombBeepAudioEvent({
  plantedMapId,
  plantedPosition,
  config,
  duration,
} = {}) {
  return createPositionalAudioEvent({
    type: 'objective-bomb-beep',
    sourcePlayerId: null,
    mapId: plantedMapId,
    soundKey: config.soundKey,
    position: plantedPosition,
    baseVolume: config.baseVolume,
    minDistance: config.minDistance,
    maxDistance: config.maxDistance,
    rolloffExponent: config.rolloffExponent,
    playback: 'interrupt',
    minIntervalMs: 0,
    duration,
  });
}
