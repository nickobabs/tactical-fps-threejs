import * as THREE from 'three';

const WORLD_POSITION = new THREE.Vector3();
const WORLD_QUATERNION = new THREE.Quaternion();
const WORLD_EULER = new THREE.Euler(0, 0, 0, 'YXZ');

function buildSpawnMarkerState(marker, name) {
  const worldPosition = marker.getWorldPosition?.(WORLD_POSITION) ?? marker.position;
  const worldQuaternion = marker.getWorldQuaternion?.(WORLD_QUATERNION) ?? marker.quaternion;
  WORLD_EULER.setFromQuaternion(worldQuaternion, 'YXZ');

  return {
    name,
    position: {
      x: Number(worldPosition.x ?? 0),
      y: Number(worldPosition.y ?? 0),
      z: Number(worldPosition.z ?? 0),
    },
    yaw: Number(WORLD_EULER.y ?? 0),
  };
}

export function findNamedSpawnPoints(root, candidateNames = []) {
  if (!root || !Array.isArray(candidateNames) || candidateNames.length === 0) {
    return [];
  }

  root.updateMatrixWorld?.(true);

  return candidateNames.flatMap((candidateName) => {
    if (!candidateName) {
      return [];
    }

    const marker = root.getObjectByName(candidateName);
    if (!marker) {
      return [];
    }

    return [buildSpawnMarkerState(marker, candidateName)];
  });
}

export function findNamedSpawnPoint(root, candidateNames = []) {
  return findNamedSpawnPoints(root, candidateNames)[0] ?? null;
}
