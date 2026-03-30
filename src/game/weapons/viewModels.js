import * as THREE from 'three';

export const VIEWMODEL_LAYER = 1;

function setLayerRecursive(object, layer) {
  object.layers.set(layer);
  object.children.forEach((child) => setLayerRecursive(child, layer));
}

function createPart(geometry, material, position, rotation = null) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);

  if (rotation) {
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);
  }

  return mesh;
}

function createCommonMaterials() {
  return {
    dark: new THREE.MeshStandardMaterial({
      color: 0x24282d,
      roughness: 0.68,
      metalness: 0.24,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: 0x7a5b37,
      roughness: 0.94,
      metalness: 0.03,
    }),
    detail: new THREE.MeshStandardMaterial({
      color: 0x171a1f,
      roughness: 0.62,
      metalness: 0.3,
    }),
  };
}

function createMuzzleFlash(muzzle) {
  const flash = new THREE.Mesh(
    new THREE.ConeGeometry(0.07, 0.22, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffd18c,
      transparent: true,
      opacity: 0,
    }),
  );
  flash.rotation.x = Math.PI / 2;
  flash.position.copy(muzzle.position).add(new THREE.Vector3(0, 0, -0.06));
  return flash;
}

function createHiddenFlash() {
  const flash = new THREE.Mesh(
    new THREE.SphereGeometry(0.001, 4, 4),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    }),
  );
  flash.visible = false;
  return flash;
}

function createRifleViewModel() {
  const group = new THREE.Group();
  const materials = createCommonMaterials();

  const body = createPart(
    new THREE.BoxGeometry(0.2, 0.18, 0.75),
    materials.dark,
    new THREE.Vector3(0, 0, -0.2),
  );
  const handguard = createPart(
    new THREE.BoxGeometry(0.16, 0.14, 0.52),
    materials.accent,
    new THREE.Vector3(0, -0.01, -0.72),
  );
  const barrel = createPart(
    new THREE.CylinderGeometry(0.024, 0.024, 0.58, 12),
    materials.detail,
    new THREE.Vector3(0, 0.01, -1.12),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const suppressor = createPart(
    new THREE.CylinderGeometry(0.034, 0.034, 0.24, 12),
    materials.detail,
    new THREE.Vector3(0, 0.01, -1.48),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const stock = createPart(
    new THREE.BoxGeometry(0.12, 0.12, 0.34),
    materials.dark,
    new THREE.Vector3(0.01, 0.01, 0.28),
    new THREE.Vector3(-0.1, 0, -0.12),
  );
  const magazine = createPart(
    new THREE.BoxGeometry(0.08, 0.24, 0.16),
    materials.detail,
    new THREE.Vector3(0.01, -0.18, -0.18),
    new THREE.Vector3(-0.24, 0, 0.04),
  );
  const sightMount = createPart(
    new THREE.BoxGeometry(0.05, 0.03, 0.08),
    materials.detail,
    new THREE.Vector3(0, 0.105, -0.2),
  );
  const adsGuide = new THREE.Group();
  adsGuide.position.set(0, 0.145, -0.26);

  const sightRing = createPart(
    new THREE.TorusGeometry(0.04, 0.006, 8, 20),
    materials.detail,
    new THREE.Vector3(0, 0, 0),
  );
  adsGuide.add(sightRing);
  const frontSight = createPart(
    new THREE.BoxGeometry(0.026, 0.022, 0.026),
    materials.detail,
    new THREE.Vector3(0, 0.078, -0.9),
  );

  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, 0.005, -1.62);
  const muzzleFlash = createMuzzleFlash(muzzle);

  group.add(body, handguard, barrel, suppressor, stock, magazine, sightMount, adsGuide, frontSight);
  group.add(muzzle, muzzleFlash);
  setLayerRecursive(group, VIEWMODEL_LAYER);
  return { group, muzzle, muzzleFlash };
}

function createSniperViewModel() {
  const group = new THREE.Group();
  const materials = createCommonMaterials();
  const scopeMaterial = new THREE.MeshStandardMaterial({
    color: 0x111519,
    roughness: 0.58,
    metalness: 0.32,
  });

  const body = createPart(
    new THREE.BoxGeometry(0.18, 0.16, 1.05),
    materials.dark,
    new THREE.Vector3(0, -0.01, -0.12),
  );
  const stock = createPart(
    new THREE.BoxGeometry(0.11, 0.12, 0.46),
    materials.accent,
    new THREE.Vector3(0.01, -0.01, 0.62),
    new THREE.Vector3(-0.08, 0, -0.06),
  );
  const forearm = createPart(
    new THREE.BoxGeometry(0.14, 0.1, 0.42),
    materials.accent,
    new THREE.Vector3(0, -0.02, -0.78),
  );
  const barrel = createPart(
    new THREE.CylinderGeometry(0.022, 0.022, 1.05, 12),
    materials.detail,
    new THREE.Vector3(0, 0, -1.38),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const scopeBody = createPart(
    new THREE.CylinderGeometry(0.08, 0.08, 0.54, 16),
    scopeMaterial,
    new THREE.Vector3(0, 0.15, -0.26),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const scopeFront = createPart(
    new THREE.CylinderGeometry(0.095, 0.095, 0.08, 16),
    scopeMaterial,
    new THREE.Vector3(0, 0.15, -0.56),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const scopeRear = createPart(
    new THREE.CylinderGeometry(0.085, 0.085, 0.08, 16),
    scopeMaterial,
    new THREE.Vector3(0, 0.15, 0.04),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );

  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, 0, -1.93);
  const muzzleFlash = createMuzzleFlash(muzzle);

  group.add(body, stock, forearm, barrel, scopeBody, scopeFront, scopeRear);
  group.add(muzzle, muzzleFlash);
  setLayerRecursive(group, VIEWMODEL_LAYER);
  return { group, muzzle, muzzleFlash };
}

function createKnifeViewModel() {
  const group = new THREE.Group();
  const bladeMaterial = new THREE.MeshStandardMaterial({
    color: 0xb8c0c8,
    roughness: 0.38,
    metalness: 0.62,
  });
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x171a1f,
    roughness: 0.78,
    metalness: 0.14,
  });
  const guardMaterial = new THREE.MeshStandardMaterial({
    color: 0x353b42,
    roughness: 0.54,
    metalness: 0.4,
  });

  const handle = createPart(
    new THREE.CylinderGeometry(0.03, 0.038, 0.26, 10),
    handleMaterial,
    new THREE.Vector3(0.02, -0.1, 0.08),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const pommel = createPart(
    new THREE.SphereGeometry(0.038, 10, 10),
    guardMaterial,
    new THREE.Vector3(0.02, -0.1, 0.21),
  );
  const guard = createPart(
    new THREE.BoxGeometry(0.04, 0.1, 0.024),
    guardMaterial,
    new THREE.Vector3(0.02, -0.1, -0.06),
  );
  const blade = createPart(
    new THREE.ConeGeometry(0.042, 0.62, 4),
    bladeMaterial,
    new THREE.Vector3(0.02, -0.08, -0.42),
    new THREE.Vector3(-Math.PI / 2, Math.PI / 4, 0),
  );
  const bladeGuard = createPart(
    new THREE.BoxGeometry(0.034, 0.018, 0.08),
    guardMaterial,
    new THREE.Vector3(0.02, -0.084, -0.02),
    new THREE.Vector3(0.18, 0, 0),
  );

  const muzzle = new THREE.Object3D();
  muzzle.position.set(0.02, -0.08, -0.72);
  const muzzleFlash = createHiddenFlash();

  group.add(handle, pommel, guard, blade, bladeGuard);
  group.add(muzzle, muzzleFlash);
  setLayerRecursive(group, VIEWMODEL_LAYER);
  return { group, muzzle, muzzleFlash };
}

export function createWeaponViewModels() {
  return {
    rifle: createRifleViewModel(),
    sniper: createSniperViewModel(),
    knife: createKnifeViewModel(),
  };
}
