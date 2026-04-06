import * as THREE from 'three';

export function createGameLighting() {
  const group = new THREE.Group();

  const hemi = new THREE.HemisphereLight(0xb8d7ff, 0x162027, 1.9);
  group.add(hemi);

  const sun = new THREE.DirectionalLight(0xfff2db, 1.5);
  sun.position.set(18, 30, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 90;
  sun.shadow.camera.left = -40;
  sun.shadow.camera.right = 40;
  sun.shadow.camera.top = 40;
  sun.shadow.camera.bottom = -40;
  group.add(sun);

  return group;
}
