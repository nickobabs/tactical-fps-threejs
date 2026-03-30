import * as THREE from 'three';

export const BODY_COLOR = 0xae7d53;
export const HEAD_COLOR = 0xd7b589;
export const DOWNED_BODY_COLOR = 0x4b2d2d;
export const DOWNED_HEAD_COLOR = 0x6d4b4b;
export const EYE_COLOR = 0xff2d2d;
export const EYE_IDLE_COLOR = 0x050505;
export const BROW_COLOR = 0x050505;

function createMesh(geometry, material, position) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createWeaponProp() {
  const group = new THREE.Group();

  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x262a30,
    roughness: 0.74,
    metalness: 0.18,
  });
  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x7f5735,
    roughness: 0.94,
    metalness: 0.02,
  });

  const receiver = createMesh(
    new THREE.BoxGeometry(0.18, 0.14, 0.54),
    darkMaterial,
    new THREE.Vector3(0, 0, 0),
  );
  const handguard = createMesh(
    new THREE.BoxGeometry(0.15, 0.1, 0.38),
    woodMaterial,
    new THREE.Vector3(0, -0.01, -0.43),
  );
  const stock = createMesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.28),
    woodMaterial,
    new THREE.Vector3(0.01, 0.01, 0.37),
  );
  const barrel = createMesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.48, 10),
    darkMaterial,
    new THREE.Vector3(0, 0.01, -0.82),
  );
  barrel.rotation.x = Math.PI / 2;

  const magazine = createMesh(
    new THREE.BoxGeometry(0.08, 0.22, 0.14),
    darkMaterial,
    new THREE.Vector3(0.01, -0.18, -0.06),
  );
  magazine.rotation.z = 0.18;

  group.add(receiver, handguard, stock, barrel, magazine);
  group.rotation.set(0.02, 0.2, -0.26);
  group.position.set(0.38, 1.32, 0.08);
  return group;
}

export function createTargetView() {
  const group = new THREE.Group();

  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x5b6670,
    roughness: 0.97,
    metalness: 0.03,
  });
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: BODY_COLOR,
    roughness: 0.9,
    metalness: 0.02,
    emissive: 0xffc577,
    emissiveIntensity: 0,
  });
  const headMaterial = new THREE.MeshStandardMaterial({
    color: HEAD_COLOR,
    roughness: 0.86,
    metalness: 0.02,
    emissive: 0xffdfae,
    emissiveIntensity: 0,
  });
  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: EYE_IDLE_COLOR,
    roughness: 0.4,
    metalness: 0.05,
    emissive: EYE_COLOR,
    emissiveIntensity: 0.18,
  });
  const browMaterial = new THREE.MeshStandardMaterial({
    color: BROW_COLOR,
    roughness: 0.72,
    metalness: 0.02,
    emissive: BROW_COLOR,
    emissiveIntensity: 0,
  });

  const stand = createMesh(
    new THREE.CylinderGeometry(0.08, 0.08, 2.2, 12),
    baseMaterial,
    new THREE.Vector3(0, 1.1, 0),
  );
  const body = createMesh(
    new THREE.CylinderGeometry(0.36, 0.42, 1.35, 16),
    bodyMaterial,
    new THREE.Vector3(0, 1.45, 0),
  );
  const head = createMesh(
    new THREE.SphereGeometry(0.24, 18, 16),
    headMaterial,
    new THREE.Vector3(0, 2.28, 0),
  );
  const leftEye = createMesh(
    new THREE.SphereGeometry(0.034, 10, 10),
    eyeMaterial,
    new THREE.Vector3(-0.085, 2.31, 0.195),
  );
  const rightEye = createMesh(
    new THREE.SphereGeometry(0.034, 10, 10),
    eyeMaterial,
    new THREE.Vector3(0.085, 2.31, 0.195),
  );
  const expressionGroup = new THREE.Group();
  expressionGroup.visible = false;
  const leftBrow = createMesh(
    new THREE.BoxGeometry(0.12, 0.022, 0.03),
    browMaterial,
    new THREE.Vector3(-0.085, 2.43, 0.205),
  );
  leftBrow.rotation.z = -0.34;
  const rightBrow = createMesh(
    new THREE.BoxGeometry(0.12, 0.022, 0.03),
    browMaterial,
    new THREE.Vector3(0.085, 2.43, 0.205),
  );
  rightBrow.rotation.z = 0.34;
  expressionGroup.add(leftBrow, rightBrow);
  const foot = createMesh(
    new THREE.CylinderGeometry(0.44, 0.52, 0.18, 18),
    baseMaterial,
    new THREE.Vector3(0, 0.09, 0),
  );

  group.add(stand, body, head, leftEye, rightEye, expressionGroup, foot, createWeaponProp());

  return {
    group,
    shootables: [body, head],
    expressionGroup,
    materials: {
      base: baseMaterial,
      body: bodyMaterial,
      head: headMaterial,
      eyes: eyeMaterial,
      brows: browMaterial,
    },
  };
}
