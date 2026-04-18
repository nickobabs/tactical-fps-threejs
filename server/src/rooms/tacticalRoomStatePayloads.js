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

export function createPlayerStatePayload({ players, roundManager, objectiveState, gameplaySettings } = {}) {
  return {
    players,
    round: createRoundSnapshot(roundManager),
    objective: createObjectiveSnapshot(objectiveState),
    gameplay: createGameplaySnapshot(gameplaySettings),
  };
}
