import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as THREE from 'three';
import { exportNavMesh, init } from 'recast-navigation';
import { generateSoloNavMesh } from 'recast-navigation/generators';
import {
  createCollisionMapForMapId,
  createCollisionMapFromLayoutData,
  createCollisionGeometryFromScene,
} from '../src/shared/maps/mapCollision.js';
import { MAP_MANIFEST } from '../src/shared/maps/mapManifest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const publicDir = path.join(repoRoot, 'public');

function getGeometryArrays(geometry) {
  const positions = geometry.getAttribute('position');
  const indices = geometry.index;

  if (!positions) {
    return { positions: [], indices: [] };
  }

  return {
    positions: Array.from(positions.array),
    indices: indices
      ? Array.from(indices.array)
      : Array.from({ length: positions.count }, (_, index) => index),
  };
}

function getNavigationBuildEntries() {
  return MAP_MANIFEST.filter((entry) => (
    entry.assets?.navigation?.format === 'recast-navmesh-binary'
    && entry.assets?.navigation?.path
    && ['shared-layout', 'layout-json', 'gltf-scene'].includes(entry.assets?.navigation?.buildSource)
  ));
}

async function loadGltfSceneForBuild(assetPath) {
  globalThis.self = globalThis;
  globalThis.createImageBitmap = async () => ({ close() {} });
  const { GLTFLoader } = await import(pathToFileURL(path.resolve(
    repoRoot,
    'node_modules/three/examples/jsm/loaders/GLTFLoader.js',
  )).href);
  const filePath = path.join(publicDir, assetPath.replace(/^\/+/, ''));
  const buffer = await fs.readFile(filePath);
  const loader = new GLTFLoader();
  const gltf = await loader.parseAsync(
    buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
    `file://${path.dirname(filePath)}/`,
  );
  return gltf.scene;
}

async function loadLayoutJsonForEntry(entry) {
  const layoutPath = entry.assets?.collision?.path ?? entry.gameplay?.path;

  if (!layoutPath) {
    throw new Error(`Map "${entry.id}" is missing layout JSON path.`);
  }

  const filePath = path.join(publicDir, layoutPath.replace(/^\/+/, ''));
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function createCollisionMapForEntry(entry) {
  switch (entry.assets?.navigation?.buildSource) {
    case 'shared-layout':
      if (!entry.layoutId) {
        throw new Error(`Map "${entry.id}" is missing layoutId for shared-layout nav generation.`);
      }
      return createCollisionMapForMapId(entry.layoutId);
    case 'layout-json': {
      const layout = await loadLayoutJsonForEntry(entry);
      return createCollisionMapFromLayoutData(layout, { mapId: entry.id });
    }
    case 'gltf-scene': {
      const collisionPath = entry.assets?.collision?.path;
      if (!collisionPath) {
        throw new Error(`Map "${entry.id}" is missing collision glTF path.`);
      }
      const scene = await loadGltfSceneForBuild(collisionPath);
      const collisionGeometry = createCollisionGeometryFromScene(scene);
      const spawnPoint = entry.gameplay?.spawnPoint ?? { x: 0, y: 0, z: 0 };
      return {
        mapId: entry.id,
        groundHeight: entry.gameplay?.groundHeight ?? 0,
        spawnPoint: new THREE.Vector3(spawnPoint.x ?? 0, spawnPoint.y ?? 0, spawnPoint.z ?? 0),
        collisionGeometry,
      };
    }
    default:
      throw new Error(`Unsupported navigation build source "${entry.assets?.navigation?.buildSource}" for map "${entry.id}".`);
  }
}

async function buildNavMeshForMap(entry) {
  const collisionMap = await createCollisionMapForEntry(entry);
  if (!collisionMap?.collisionGeometry) {
    throw new Error(`Missing collision geometry for map "${entry.id}"`);
  }

  const { positions, indices } = getGeometryArrays(collisionMap.collisionGeometry);
  const result = generateSoloNavMesh(positions, indices, {
    cs: 0.2,
    ch: 0.2,
    walkableSlopeAngle: 55,
    walkableHeight: 10,
    walkableClimb: 4,
    walkableRadius: 2,
    maxEdgeLen: 20,
    maxSimplificationError: 1.15,
    minRegionArea: 12,
    mergeRegionArea: 24,
    maxVertsPerPoly: 6,
    detailSampleDist: 4,
    detailSampleMaxError: 0.8,
  });

  collisionMap.collisionGeometry.dispose();

  if (!result.success || !result.navMesh) {
    throw new Error(`Navmesh generation failed for map "${entry.id}"`);
  }

  const navMeshBinary = exportNavMesh(result.navMesh);
  result.navMesh.destroy?.();
  return navMeshBinary;
}

async function main() {
  await init();
  await fs.mkdir(publicDir, { recursive: true });

  for (const entry of getNavigationBuildEntries()) {
    const navMeshBinary = await buildNavMeshForMap(entry);
    const outputPath = path.join(publicDir, entry.assets.navigation.path.replace(/^\/+/, ''));
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, navMeshBinary);
    console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
  }
}

main().catch((error) => {
  console.error('Failed to build navmeshes.', error);
  process.exitCode = 1;
});
