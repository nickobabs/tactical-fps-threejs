import * as THREE from 'three';
import { disposeSceneResources, loadNodeGltfScene } from './mapCollision.js';

export function buildExplicitPlantZone(zone) {
  const centerX = Number(zone?.center?.x ?? 0);
  const centerY = Number(zone?.center?.y ?? 0);
  const centerZ = Number(zone?.center?.z ?? 0);
  const halfX = Math.max(0.5, Number(zone?.halfExtents?.x ?? 2));
  const halfZ = Math.max(0.5, Number(zone?.halfExtents?.z ?? 2));
  return {
    name: String(zone?.name ?? 'plant-zone'),
    center: { x: centerX, y: centerY, z: centerZ },
    min: { x: centerX - halfX, y: centerY - 2, z: centerZ - halfZ },
    max: { x: centerX + halfX, y: centerY + 2, z: centerZ + halfZ },
    halfExtents: { x: halfX, z: halfZ },
  };
}

export function buildPlantZoneFromObject(object, index) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const halfX = Math.max(0.5, size.x * 0.5 || 2);
  const halfZ = Math.max(0.5, size.z * 0.5 || 2);
  return {
    name: String(object.name ?? `plantable_${index + 1}`),
    center: {
      x: Number(center.x ?? 0),
      y: Number(center.y ?? 0),
      z: Number(center.z ?? 0),
    },
    min: {
      x: Number(center.x - halfX),
      y: Number(box.min.y ?? center.y - 2),
      z: Number(center.z - halfZ),
    },
    max: {
      x: Number(center.x + halfX),
      y: Number(box.max.y ?? center.y + 2),
      z: Number(center.z + halfZ),
    },
    halfExtents: { x: halfX, z: halfZ },
  };
}

export function getExplicitPlantZonesFromEntry(entry) {
  const explicitPlantZones = entry?.gameplay?.plantZones;
  if (!Array.isArray(explicitPlantZones) || explicitPlantZones.length === 0) {
    return [];
  }

  return explicitPlantZones.map((zone) => buildExplicitPlantZone(zone));
}

export function getPlantZoneNamesFromEntry(entry) {
  return getExplicitPlantZonesFromEntry(entry)
    .map((zone) => String(zone?.name ?? '').trim())
    .filter(Boolean);
}

export function getPlantableMarkerPrefix(entry) {
  return String(entry?.gameplay?.plantableMarkerPrefix ?? '').trim();
}

export function getPlantZonesFromSceneRoots(roots, markerPrefix) {
  const normalizedPrefix = String(markerPrefix ?? '').trim();
  if (!normalizedPrefix) {
    return [];
  }

  const zones = [];
  for (const root of roots) {
    if (!root) {
      continue;
    }
    root.updateMatrixWorld?.(true);
    root.traverse((child) => {
      if (!child?.name?.startsWith?.(normalizedPrefix)) {
        return;
      }
      zones.push(buildPlantZoneFromObject(child, zones.length));
    });
    if (zones.length > 0) {
      break;
    }
  }

  return zones;
}

export function hidePlantZoneMarkerMeshes(roots, markerPrefix) {
  const normalizedPrefix = String(markerPrefix ?? '').trim();
  if (!normalizedPrefix) {
    return;
  }

  for (const root of roots) {
    if (!root) {
      continue;
    }

    root.traverse((child) => {
      if (!child?.name?.startsWith?.(normalizedPrefix)) {
        return;
      }

      child.visible = false;
      if (child.isMesh) {
        child.raycast = () => {};
      }
    });
  }
}

export async function getImportedPlantZoneNamesFromEntryAsync(entry) {
  const markerPrefix = getPlantableMarkerPrefix(entry);
  if (!markerPrefix) {
    return [];
  }

  const candidatePaths = [
    entry?.assets?.render?.source === 'gltf-scene' ? entry.assets?.render?.path : null,
    entry?.assets?.collision?.path,
  ].filter(Boolean);

  if (candidatePaths.length === 0) {
    return [];
  }

  const loadedScenes = [];
  try {
    for (const assetPath of candidatePaths) {
      loadedScenes.push(await loadNodeGltfScene(assetPath));
    }

    return getPlantZonesFromSceneRoots(loadedScenes, markerPrefix)
      .map((zone) => String(zone?.name ?? '').trim())
      .filter(Boolean);
  } finally {
    for (const scene of loadedScenes) {
      disposeSceneResources(scene);
    }
  }
}

export function getPlantZoneAtPosition(plantZones, position) {
  if (!position || !Array.isArray(plantZones) || plantZones.length === 0) {
    return null;
  }

  return plantZones.find((zone) => (
    position.x >= Number(zone.min?.x ?? 0)
    && position.x <= Number(zone.max?.x ?? 0)
    && position.z >= Number(zone.min?.z ?? 0)
    && position.z <= Number(zone.max?.z ?? 0)
    && position.y >= Number(zone.min?.y ?? -Infinity) - 1
    && position.y <= Number(zone.max?.y ?? Infinity) + 2
  )) ?? null;
}
