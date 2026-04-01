import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { getMapLayout } from './mapLayouts.js';
import { getMapManifestEntry } from './mapManifest.js';

function createBoxCollisionGeometry(box) {
  const geometry = new THREE.BoxGeometry(box.size.x, box.size.y, box.size.z);
  const mesh = new THREE.Mesh(geometry);
  mesh.position.set(box.position.x, box.position.y, box.position.z);
  mesh.rotation.set(
    box.rotation?.x ?? 0,
    box.rotation?.y ?? 0,
    box.rotation?.z ?? 0,
  );
  mesh.updateMatrixWorld(true);
  const transformed = geometry.clone().applyMatrix4(mesh.matrixWorld);
  geometry.dispose();
  return transformed;
}

export function createCollisionGeometryFromLayout(layout) {
  if (!layout?.collisionBoxes?.length) {
    return null;
  }

  const geometries = layout.collisionBoxes.map((box) => createBoxCollisionGeometry(box));
  const merged = mergeGeometries(geometries, false);
  geometries.forEach((geometry) => geometry.dispose());
  return merged;
}

export function createCollisionGeometryFromScene(root) {
  if (!root) {
    return null;
  }

  const geometries = [];

  root.updateMatrixWorld(true);
  root.traverse((child) => {
    if (!child.isMesh || !child.geometry) {
      return;
    }

    const transformed = child.geometry.clone().applyMatrix4(child.matrixWorld);
    geometries.push(transformed);
  });

  if (geometries.length === 0) {
    return null;
  }

  const merged = mergeGeometries(geometries, false);
  geometries.forEach((geometry) => geometry.dispose());
  return merged;
}

export function createCollisionMapFromLayoutData(layout, { mapId = layout?.mapId ?? null } = {}) {
  if (!layout) {
    return null;
  }

  return {
    mapId,
    groundHeight: layout.groundHeight ?? 0,
    spawnPoint: new THREE.Vector3(layout.spawnPoint.x, layout.spawnPoint.y, layout.spawnPoint.z),
    collisionGeometry: createCollisionGeometryFromLayout(layout),
  };
}

export function createCollisionMapForMapId(mapId) {
  const layout = getMapLayout(mapId);
  if (!layout) {
    return null;
  }

  return createCollisionMapFromLayoutData(layout, { mapId: layout.mapId });
}

function getNodePublicAssetUrl(assetPath) {
  if (typeof window !== 'undefined') {
    return null;
  }

  if (typeof assetPath !== 'string' || !assetPath.startsWith('/')) {
    throw new Error(`Unsupported asset path "${assetPath ?? 'unknown'}". Expected an absolute public path.`);
  }

  return new URL(`../../../public${assetPath}`, import.meta.url);
}

async function loadNodeGltfScene(assetPath) {
  const assetUrl = getNodePublicAssetUrl(assetPath);
  globalThis.self ??= globalThis;
  globalThis.createImageBitmap ??= async () => ({ close() {} });

  const loadDynamicImport = new Function('specifier', 'return import(specifier)');
  const [{ GLTFLoader }, { readFile }] = await Promise.all([
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    loadDynamicImport('node:fs/promises'),
  ]);
  const gltfBuffer = await readFile(assetUrl);
  const loader = new GLTFLoader();
  const gltf = await loader.parseAsync(
    gltfBuffer.buffer.slice(
      gltfBuffer.byteOffset,
      gltfBuffer.byteOffset + gltfBuffer.byteLength,
    ),
    new URL('.', assetUrl).href,
  );
  return gltf.scene;
}

export async function createCollisionMapFromManifestEntry(entry) {
  if (!entry) {
    return null;
  }

  const collisionSource = entry.assets?.collision?.source;
  if (collisionSource === 'shared-layout') {
    return createCollisionMapForMapId(entry.layoutId ?? entry.id);
  }

  if (collisionSource === 'gltf-scene') {
    if (typeof window !== 'undefined') {
      throw new Error('Manifest-based glTF collision loading is only intended for the Node server path.');
    }

    if (!entry.assets?.collision?.path) {
      throw new Error(`Map "${entry.id}" is missing a collision glTF path.`);
    }

    const scene = await loadNodeGltfScene(entry.assets.collision.path);
    try {
      return {
        mapId: entry.id,
        groundHeight: entry.gameplay?.groundHeight ?? 0,
        spawnPoint: new THREE.Vector3(
          Number(entry.gameplay?.spawnPoint?.x ?? 0),
          Number(entry.gameplay?.spawnPoint?.y ?? 0),
          Number(entry.gameplay?.spawnPoint?.z ?? 0),
        ),
        collisionGeometry: createCollisionGeometryFromScene(scene),
      };
    } finally {
      scene.traverse((child) => {
        child.geometry?.dispose?.();
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material?.dispose?.());
        } else {
          child.material?.dispose?.();
        }
      });
    }
  }

  throw new Error(
    `Unsupported collision source "${collisionSource ?? 'unknown'}" for map "${entry.id}".`,
  );
}

export async function createCollisionMapForMapIdAsync(mapId) {
  const manifestEntry = getMapManifestEntry(mapId);
  if (manifestEntry) {
    return createCollisionMapFromManifestEntry(manifestEntry);
  }

  return createCollisionMapForMapId(mapId);
}
