export function createObjectiveSnapshot(objectiveState) {
  return {
    bombCarrierPlayerId: objectiveState.bombCarrierPlayerId,
    bombState: objectiveState.bombState,
    bombTimeRemaining: Number(objectiveState.bombTimeRemaining ?? 0),
    droppedMapId: objectiveState.droppedMapId,
    droppedPosition: objectiveState.droppedPosition
      ? {
        x: Number(objectiveState.droppedPosition.x ?? 0),
        y: Number(objectiveState.droppedPosition.y ?? 0),
        z: Number(objectiveState.droppedPosition.z ?? 0),
      }
      : null,
    plantedZoneName: objectiveState.plantedZoneName,
    defuserPlayerId: objectiveState.defuserPlayerId,
    plantedPosition: objectiveState.plantedPosition
      ? {
        x: Number(objectiveState.plantedPosition.x ?? 0),
        y: Number(objectiveState.plantedPosition.y ?? 0),
        z: Number(objectiveState.plantedPosition.z ?? 0),
      }
      : null,
  };
}

export function createSmokeThrownEvent(player, smokeThrow) {
  return {
    type: 'smoke-thrown',
    playerId: player.playerId,
    mapId: player.mapId,
    origin: smokeThrow.origin,
    direction: smokeThrow.direction,
    inheritedVelocity: smokeThrow.inheritedVelocity,
    speed: smokeThrow.speed,
  };
}

export function createRoundSnapshot(roundManager) {
  return roundManager.getSnapshot();
}

export function createGameplaySnapshot(gameplaySettings) {
  return { ...gameplaySettings };
}

export function createSpraySnapshot(spray) {
  return {
    id: String(spray?.id ?? ''),
    playerId: String(spray?.playerId ?? ''),
    mapId: String(spray?.mapId ?? ''),
    sprayUrl: spray?.sprayUrl ? String(spray.sprayUrl) : null,
    rotation: Number(spray?.rotation ?? 0),
    createdAt: Number(spray?.createdAt ?? Date.now()),
    position: {
      x: Number(spray?.position?.x ?? 0),
      y: Number(spray?.position?.y ?? 0),
      z: Number(spray?.position?.z ?? 0),
    },
    normal: {
      x: Number(spray?.normal?.x ?? 0),
      y: Number(spray?.normal?.y ?? 0),
      z: Number(spray?.normal?.z ?? 1),
    },
  };
}

export function createPlayerStatePayload({ players, roundManager, objectiveState, gameplaySettings, sprays } = {}) {
  return {
    players,
    round: createRoundSnapshot(roundManager),
    objective: createObjectiveSnapshot(objectiveState),
    gameplay: createGameplaySnapshot(gameplaySettings),
    sprays: Array.isArray(sprays) ? sprays.map((spray) => createSpraySnapshot(spray)) : [],
  };
}
