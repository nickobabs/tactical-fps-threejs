export function findNamedSpawnPoint(root, candidateNames = []) {
  if (!root || !Array.isArray(candidateNames) || candidateNames.length === 0) {
    return null;
  }

  root.updateMatrixWorld?.(true);

  for (const candidateName of candidateNames) {
    if (!candidateName) {
      continue;
    }

    const marker = root.getObjectByName(candidateName);
    if (!marker) {
      continue;
    }

    const worldPosition = marker.getWorldPosition?.(marker.position.clone()) ?? marker.position.clone();
    return {
      name: candidateName,
      position: {
        x: Number(worldPosition.x ?? 0),
        y: Number(worldPosition.y ?? 0),
        z: Number(worldPosition.z ?? 0),
      },
    };
  }

  return null;
}
