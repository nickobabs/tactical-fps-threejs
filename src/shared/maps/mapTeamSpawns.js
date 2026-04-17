import { TEAMS } from '../constants.js';
import { disposeSceneResources, loadNodeGltfScene } from './mapCollision.js';
import { findNamedSpawnPoints } from './mapSpawnMarkers.js';

export function getTeamSpawnMarkerNames(entry, teamKey) {
  const teamSpawnMarkers = entry?.gameplay?.teamSpawnMarkers;
  if (!teamSpawnMarkers || typeof teamSpawnMarkers !== 'object') {
    return [];
  }

  const markerNames = teamSpawnMarkers[teamKey];
  return Array.isArray(markerNames) ? markerNames.filter(Boolean) : [];
}

export async function getImportedTeamSpawnPointsFromEntryAsync(entry) {
  const candidatePaths = [
    entry?.assets?.render?.source === 'gltf-scene' ? entry.assets?.render?.path : null,
    entry?.assets?.collision?.path,
  ].filter(Boolean);
  if (candidatePaths.length === 0) {
    return null;
  }

  const loadedScenes = [];
  try {
    for (const assetPath of candidatePaths) {
      loadedScenes.push(await loadNodeGltfScene(assetPath));
    }

    const teamSpawnPoints = {};
    for (const teamKey of [TEAMS.ATTACKERS, TEAMS.DEFENDERS]) {
      const markerNames = getTeamSpawnMarkerNames(entry, teamKey);
      if (markerNames.length === 0) {
        continue;
      }

      for (const scene of loadedScenes) {
        const markers = findNamedSpawnPoints(scene, markerNames);
        if (markers.length > 0) {
          teamSpawnPoints[teamKey] = markers;
          break;
        }
      }
    }

    return Object.keys(teamSpawnPoints).length > 0 ? teamSpawnPoints : null;
  } finally {
    for (const scene of loadedScenes) {
      disposeSceneResources(scene);
    }
  }
}
