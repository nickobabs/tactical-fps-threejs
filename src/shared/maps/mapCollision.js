import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { getMapLayout } from './mapLayouts.js';

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

export function createCollisionMapForMapId(mapId) {
  const layout = getMapLayout(mapId);
  if (!layout) {
    return null;
  }

  return {
    mapId: layout.mapId,
    groundHeight: layout.groundHeight ?? 0,
    spawnPoint: new THREE.Vector3(layout.spawnPoint.x, layout.spawnPoint.y, layout.spawnPoint.z),
    collisionGeometry: createCollisionGeometryFromLayout(layout),
  };
}
