import * as THREE from 'three';
import { CollisionWorld } from '../../core/physics/CollisionWorld.js';
import {
  createCollisionMapForMapId,
  createCollisionMapFromLayoutData,
  createCollisionGeometryFromScene,
} from '../../shared/maps/mapCollision.js';

const MAP_RUNTIME_LOADERS = {
  'training-ground': () => import('./TrainingGround.js'),
  'desert-compound': () => import('./DesertCompound.js'),
};

const MAP_RUNTIME_FACTORIES = {
  'training-ground': 'createTrainingGround',
  'desert-compound': 'createDesertCompound',
};
const SPAWN_SAMPLE_GRID_SIZE = 9;
const SPAWN_SUPPORT_OFFSETS = [
  [0, 0],
  [-0.22, 0],
  [0.22, 0],
  [0, -0.22],
  [0, 0.22],
  [-0.16, -0.16],
  [0.16, -0.16],
  [-0.16, 0.16],
  [0.16, 0.16],
];
const WORLD_NORMAL_MATRIX = new THREE.Matrix3();
const WORLD_FACE_NORMAL = new THREE.Vector3();

function loadMapRuntimeModule(runtimeId) {
  const loadModule = MAP_RUNTIME_LOADERS[runtimeId];

  if (!loadModule) {
    throw new Error(`Missing runtime module loader for map runtime "${runtimeId}".`);
  }

  return loadModule;
}

function getMapRuntimeFactoryExport(runtimeId) {
  const exportName = MAP_RUNTIME_FACTORIES[runtimeId];

  if (!exportName) {
    throw new Error(`Missing runtime factory export for map runtime "${runtimeId}".`);
  }

  return exportName;
}

export function preloadMapRuntime(runtimeId) {
  return loadMapRuntimeModule(runtimeId)();
}

const JSON_ASSET_CACHE = new Map();
const GLTF_SCENE_CACHE = new Map();

function fetchJsonAsset(path) {
  let promise = JSON_ASSET_CACHE.get(path);

  if (!promise) {
    promise = fetch(path).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
      }

      return response.json();
    });
    JSON_ASSET_CACHE.set(path, promise);
  }

  return promise;
}

function cloneJsonAsset(value) {
  return structuredClone(value);
}

async function loadLayoutJsonMapData(path, mapId) {
  const layout = cloneJsonAsset(await fetchJsonAsset(path));
  return createCollisionMapFromLayoutData(layout, { mapId });
}

async function loadGltfScene(path) {
  let promise = GLTF_SCENE_CACHE.get(path);

  if (!promise) {
    promise = (async () => {
      const [{ GLTFLoader }] = await Promise.all([
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        fetch(path, { method: 'GET' }),
      ]);

      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(path);
      return gltf.scene;
    })();
    GLTF_SCENE_CACHE.set(path, promise);
  }

  return promise.then((scene) => scene.clone(true));
}

function collectSceneMeshes(root) {
  const meshes = [];
  root.traverse((child) => {
    if (child.isMesh) {
      meshes.push(child);
    }
  });
  return meshes;
}

function getIntersectionWorldNormal(intersection) {
  const faceNormal = intersection.face?.normal;
  if (!faceNormal || !intersection.object) {
    return null;
  }

  WORLD_NORMAL_MATRIX.getNormalMatrix(intersection.object.matrixWorld);
  return WORLD_FACE_NORMAL.copy(faceNormal).applyMatrix3(WORLD_NORMAL_MATRIX).normalize();
}

function scoreSpawnSupport(collisionWorld, pointY, sampleX, sampleZ) {
  if (!collisionWorld) {
    return 0;
  }

  let supportedSamples = 0;
  let accumulatedHeightDelta = 0;

  for (const [offsetX, offsetZ] of SPAWN_SUPPORT_OFFSETS) {
    const supportHeight = collisionWorld.getGroundHeightAt(
      sampleX + offsetX,
      sampleZ + offsetZ,
      pointY + 0.2,
      1.6,
      3,
    );
    const heightDelta = Math.abs(supportHeight - pointY);

    if (heightDelta <= 0.35) {
      supportedSamples += 1;
      accumulatedHeightDelta += heightDelta;
    }
  }

  if (supportedSamples === 0) {
    return -Infinity;
  }

  return supportedSamples * 10 - accumulatedHeightDelta;
}

function resolveDefaultGameplayState(entry, renderMap, collisionGeometry) {
  const explicitSpawn = entry.gameplay?.spawnPoint;
  if (explicitSpawn) {
    return {
      spawnPoint: {
        x: explicitSpawn.x ?? 0,
        y: explicitSpawn.y ?? 2,
        z: explicitSpawn.z ?? 0,
      },
      groundHeight: entry.gameplay?.groundHeight ?? 0,
      allowGroundedMode: entry.gameplay?.allowGroundedMode ?? true,
    };
  }

  const sceneBounds = new THREE.Box3().setFromObject(renderMap.scene);
  if (sceneBounds.isEmpty()) {
    return {
      spawnPoint: { x: 0, y: 2, z: 0 },
      groundHeight: entry.gameplay?.groundHeight ?? 0,
      allowGroundedMode: entry.gameplay?.allowGroundedMode ?? true,
    };
  }

  const raycastMeshes = renderMap.shootables?.length ? renderMap.shootables : collectSceneMeshes(renderMap.scene);
  const raycaster = new THREE.Raycaster();
  const collisionWorld = collisionGeometry
    ? new CollisionWorld({
      groundHeight: sceneBounds.min.y,
      collisionGeometry,
    })
    : null;
  const center = sceneBounds.getCenter(new THREE.Vector3());
  const size = sceneBounds.getSize(new THREE.Vector3());
  if (entry.gameplay?.movementMode === 'fly') {
    return {
      spawnPoint: {
        x: center.x,
        y: sceneBounds.max.y + Math.max(12, size.y * 0.2),
        z: center.z,
      },
      groundHeight: sceneBounds.min.y,
      movementMode: 'fly',
      allowGroundedMode: entry.gameplay?.allowGroundedMode ?? true,
    };
  }
  const rayOriginY = sceneBounds.max.y + Math.max(8, size.y * 0.25);
  let bestHit = null;
  let bestScore = -Infinity;

  for (let gridZ = 0; gridZ < SPAWN_SAMPLE_GRID_SIZE; gridZ += 1) {
    const normalizedZ = SPAWN_SAMPLE_GRID_SIZE === 1 ? 0 : (gridZ / (SPAWN_SAMPLE_GRID_SIZE - 1)) * 2 - 1;

    for (let gridX = 0; gridX < SPAWN_SAMPLE_GRID_SIZE; gridX += 1) {
      const normalizedX = SPAWN_SAMPLE_GRID_SIZE === 1 ? 0 : (gridX / (SPAWN_SAMPLE_GRID_SIZE - 1)) * 2 - 1;
      const sampleX = center.x + normalizedX * size.x * 0.45;
      const sampleZ = center.z + normalizedZ * size.z * 0.45;

      raycaster.set(
        new THREE.Vector3(sampleX, rayOriginY, sampleZ),
        new THREE.Vector3(0, -1, 0),
      );

      const hit = raycaster.intersectObjects(raycastMeshes, false).find((candidate) => {
        const worldNormal = getIntersectionWorldNormal(candidate);
        return (worldNormal?.y ?? 0) > 0.35;
      });

      if (!hit) {
        continue;
      }

      const supportScore = scoreSpawnSupport(collisionWorld, hit.point.y, hit.point.x, hit.point.z);
      if (!Number.isFinite(supportScore)) {
        continue;
      }

      const horizontalDistance = Math.hypot(hit.point.x - center.x, hit.point.z - center.z);
      const normalizedDistance = Math.min(1, horizontalDistance / Math.max(size.x, size.z, 1));
      const normalizedHeight = size.y > 0 ? (hit.point.y - sceneBounds.min.y) / size.y : 0;
      const score = supportScore + (1 - normalizedDistance) * 0.75 + normalizedHeight * 0.25;

      if (score > bestScore) {
        bestScore = score;
        bestHit = hit;
      }
    }
  }

  const groundHeight = entry.gameplay?.groundHeight ?? bestHit?.point.y ?? sceneBounds.min.y;

  return {
    spawnPoint: {
      x: bestHit?.point.x ?? center.x,
      y: groundHeight,
      z: bestHit?.point.z ?? center.z,
    },
    groundHeight,
    movementMode: entry.gameplay?.movementMode ?? 'grounded',
    allowGroundedMode: entry.gameplay?.allowGroundedMode ?? true,
  };
}

async function loadGltfRenderMap(renderAsset) {
  const scene = await loadGltfScene(renderAsset.path);

  return {
    scene,
    shootables: renderAsset.collectShootables === false ? [] : collectSceneMeshes(scene),
    targets: [],
    dispose() {},
  };
}

async function loadRuntimeFactoryRenderMap(renderAsset) {
  const loadModule = loadMapRuntimeModule(renderAsset.runtimeId);
  const exportName = getMapRuntimeFactoryExport(renderAsset.runtimeId);
  const module = await loadModule();
  const factory = module[exportName];

  if (typeof factory !== 'function') {
    throw new Error(
      `Map runtime "${renderAsset.runtimeId}" is missing export "${exportName}".`,
    );
  }

  return factory();
}

async function loadRenderMap(entry) {
  const renderAsset = entry.assets?.render;

  switch (renderAsset?.source) {
    case 'runtime-factory':
      return loadRuntimeFactoryRenderMap(renderAsset);
    case 'gltf-scene':
      return loadGltfRenderMap(renderAsset);
    default:
      throw new Error(`Unsupported render source "${renderAsset?.source ?? 'unknown'}" for map "${entry.id}".`);
  }
}

function needsLayoutMapData(entry) {
  const collisionSource = entry.assets?.collision?.source;
  const gameplaySource = entry.gameplay?.source;

  return collisionSource === 'shared-layout'
    || collisionSource === 'layout-json'
    || gameplaySource === 'shared-layout'
    || gameplaySource === 'layout-json';
}

async function loadLayoutMapData(entry) {
  const collisionSource = entry.assets?.collision?.source;
  const gameplaySource = entry.gameplay?.source;

  if (collisionSource === 'layout-json' || gameplaySource === 'layout-json') {
    const layoutJsonPath = entry.assets?.collision?.path ?? entry.gameplay?.path;

    if (!layoutJsonPath) {
      throw new Error(`Map "${entry.id}" is missing layout JSON path.`);
    }

    return loadLayoutJsonMapData(layoutJsonPath, entry.id);
  }

  if (!entry.layoutId) {
    throw new Error(`Map "${entry.id}" is missing layoutId for shared-layout data.`);
  }

  const layoutMap = createCollisionMapForMapId(entry.layoutId);

  if (!layoutMap) {
    throw new Error(`No shared layout data found for map "${entry.id}" (${entry.layoutId}).`);
  }

  return layoutMap;
}

export async function preloadMapAssets(entry) {
  const preloadTasks = [];
  const renderAsset = entry.assets?.render;

  if (renderAsset?.source === 'runtime-factory' && renderAsset.runtimeId) {
    preloadTasks.push(preloadMapRuntime(renderAsset.runtimeId));
  }

  if (renderAsset?.source === 'gltf-scene' && renderAsset.path) {
    preloadTasks.push(loadGltfScene(renderAsset.path));
  }

  if (entry.assets?.collision?.source === 'gltf-scene' && entry.assets?.collision?.path) {
    preloadTasks.push(loadGltfScene(entry.assets.collision.path));
  }

  if (needsLayoutMapData(entry) && (
    entry.assets?.collision?.source === 'layout-json' || entry.gameplay?.source === 'layout-json'
  )) {
    const layoutJsonPath = entry.assets?.collision?.path ?? entry.gameplay?.path;
    if (layoutJsonPath) {
      preloadTasks.push(fetchJsonAsset(layoutJsonPath));
    }
  }

  await Promise.allSettled(preloadTasks);
}

function resolveCollisionGeometry(entry, renderMap, sharedLayoutMap) {
  const collisionAsset = entry.assets?.collision;

  switch (collisionAsset?.source) {
    case 'shared-layout':
    case 'layout-json':
      return sharedLayoutMap?.collisionGeometry ?? null;
    case 'gltf-scene':
      return createCollisionGeometryFromScene(renderMap.collisionScene ?? renderMap.scene);
    case 'render-scene':
      return createCollisionGeometryFromScene(renderMap.scene);
    case 'runtime-map':
      return renderMap.collisionGeometry ?? null;
    default:
      throw new Error(
        `Unsupported collision source "${collisionAsset?.source ?? 'unknown'}" for map "${entry.id}".`,
      );
  }
}

function resolveGameplayState(entry, renderMap, sharedLayoutMap, collisionGeometry) {
  switch (entry.gameplay?.source) {
    case 'shared-layout':
    case 'layout-json':
      return {
        spawnPoint: sharedLayoutMap?.spawnPoint ?? null,
        groundHeight: sharedLayoutMap?.groundHeight ?? 0,
        movementMode: entry.gameplay?.movementMode ?? 'grounded',
        allowGroundedMode: entry.gameplay?.allowGroundedMode ?? true,
      };
    case 'defaults':
      return resolveDefaultGameplayState(entry, renderMap, collisionGeometry);
    case 'runtime-map':
      return {
        spawnPoint: renderMap.spawnPoint ?? null,
        groundHeight: renderMap.groundHeight ?? 0,
        movementMode: entry.gameplay?.movementMode ?? 'grounded',
        allowGroundedMode: entry.gameplay?.allowGroundedMode ?? true,
      };
    default:
      throw new Error(`Unsupported gameplay source "${entry.gameplay?.source ?? 'unknown'}" for map "${entry.id}".`);
  }
}

export async function createMapFromManifest(entry) {
  const renderMap = await loadRenderMap(entry);
  const sharedLayoutMap = needsLayoutMapData(entry) ? await loadLayoutMapData(entry) : null;
  if (entry.assets?.collision?.source === 'gltf-scene' && entry.assets?.collision?.path) {
    renderMap.collisionScene = await loadGltfScene(entry.assets.collision.path);
  }
  const collisionGeometry = resolveCollisionGeometry(entry, renderMap, sharedLayoutMap);
  const gameplayState = resolveGameplayState(entry, renderMap, sharedLayoutMap, collisionGeometry);

  return {
    ...renderMap,
    spawnPoint: gameplayState.spawnPoint,
    groundHeight: gameplayState.groundHeight,
    movementMode: gameplayState.movementMode ?? 'grounded',
    allowGroundedMode: gameplayState.allowGroundedMode ?? true,
    collisionGeometry,
    shootables: renderMap.shootables ?? [],
    targets: renderMap.targets ?? [],
  };
}
