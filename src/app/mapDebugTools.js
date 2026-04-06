export function getCurrentPlayerDebugPosition(playerController, mapId) {
  if (!playerController) {
    return null;
  }

  return {
    x: Number(playerController.position.x.toFixed(3)),
    y: Number(playerController.position.y.toFixed(3)),
    z: Number(playerController.position.z.toFixed(3)),
    mode: playerController.getMovementMode?.() ?? 'grounded',
    mapId,
  };
}

export function logCurrentPlayerDebugPosition(position) {
  if (!position) {
    return;
  }

  console.log('[MapDebug] position', position);
}

export function createDebugMarker(position, markerId) {
  if (!position) {
    return null;
  }

  return {
    id: markerId,
    ...position,
  };
}

export function logSavedDebugMarker(marker) {
  if (!marker) {
    return;
  }

  console.log('[MapDebug] saved marker', marker);
}

export function dumpDebugMarkers(markers) {
  console.log('[MapDebug] markers', JSON.stringify(markers, null, 2));
}
