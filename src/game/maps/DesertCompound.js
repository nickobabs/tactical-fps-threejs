import * as THREE from 'three';
import { TargetDummy } from '../targets/TargetDummy.js';
import { createMapBuilder } from './mapBuilder.js';

function addSiteMark(builder, { label, color, position, rotation = 0 }) {
  const { group } = builder;
  const mark = new THREE.Mesh(
    new THREE.CircleGeometry(4.8, 32),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.9,
    }),
  );
  mark.rotation.x = -Math.PI / 2;
  mark.rotation.z = rotation;
  mark.position.copy(position).setY(0.05);
  group.add(mark);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(5.15, 5.8, 32),
    new THREE.MeshStandardMaterial({
      color: 0xf0e6d4,
      roughness: 1,
      metalness: 0,
    }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.rotation.z = rotation;
  ring.position.copy(position).setY(0.06);
  group.add(ring);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f7efdf';
  ctx.font = 'bold 170px Segoe UI';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 8);

  const texture = new THREE.CanvasTexture(canvas);
  builder.addDisposable(texture);
  const text = new THREE.Mesh(
    new THREE.PlaneGeometry(5.8, 5.8),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    }),
  );
  text.rotation.x = -Math.PI / 2;
  text.rotation.z = rotation;
  text.position.copy(position).setY(0.07);
  group.add(text);
}

function addStripe(group, { width, height, color, position, rotation = 0 }) {
  const stripe = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 1,
      metalness: 0,
    }),
  );
  stripe.rotation.x = -Math.PI / 2;
  stripe.rotation.z = rotation;
  stripe.position.copy(position).setY(0.03);
  group.add(stripe);
}

export function createDesertCompound() {
  const builder = createMapBuilder();
  const { group } = builder;

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(104, 88),
    new THREE.MeshStandardMaterial({
      color: 0x77654f,
      roughness: 0.98,
      metalness: 0.02,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  group.add(floor);
  builder.shootables.push(floor);

  const floorCollision = new THREE.Mesh(
    new THREE.BoxGeometry(104, 1, 88),
    new THREE.MeshBasicMaterial(),
  );
  floorCollision.position.set(0, -0.5, 0);
  builder.addCollisionFromMesh(floorCollision);

  const grid = new THREE.GridHelper(104, 26, 0xa38662, 0x614d39);
  grid.position.y = 0.02;
  group.add(grid);

  addStripe(group, {
    width: 7,
    height: 54,
    color: 0x6b5946,
    position: new THREE.Vector3(0, 0, -4),
  });
  addStripe(group, {
    width: 12,
    height: 14,
    color: 0x6d5d49,
    position: new THREE.Vector3(-24, 0, -22),
    rotation: Math.PI / 10,
  });
  addStripe(group, {
    width: 12,
    height: 14,
    color: 0x606963,
    position: new THREE.Vector3(24, 0, -22),
    rotation: -Math.PI / 12,
  });

  const outerWalls = [
    { size: new THREE.Vector3(104, 8, 2), position: new THREE.Vector3(0, 4, -44), color: 0x9c8567 },
    { size: new THREE.Vector3(104, 8, 2), position: new THREE.Vector3(0, 4, 44), color: 0x9c8567 },
    { size: new THREE.Vector3(2, 8, 88), position: new THREE.Vector3(-52, 4, 0), color: 0x90795e },
    { size: new THREE.Vector3(2, 8, 88), position: new THREE.Vector3(52, 4, 0), color: 0x90795e },
  ];
  outerWalls.forEach((wall) => builder.addBox(wall));

  const structuralWalls = [
    { size: new THREE.Vector3(18, 6, 3), position: new THREE.Vector3(-14, 3, 20), color: 0x8d7256 },
    { size: new THREE.Vector3(18, 6, 3), position: new THREE.Vector3(14, 3, 20), color: 0x8d7256 },
    { size: new THREE.Vector3(3, 6, 18), position: new THREE.Vector3(-22, 3, 12), color: 0x84694f },
    { size: new THREE.Vector3(3, 6, 18), position: new THREE.Vector3(22, 3, 12), color: 0x84694f },
    { size: new THREE.Vector3(10, 6, 3), position: new THREE.Vector3(0, 3, 7), color: 0x856c52 },
    { size: new THREE.Vector3(3, 6, 18), position: new THREE.Vector3(-10, 3, -5), color: 0x8d7559 },
    { size: new THREE.Vector3(3, 6, 18), position: new THREE.Vector3(10, 3, -5), color: 0x8d7559 },
    { size: new THREE.Vector3(14, 6, 3), position: new THREE.Vector3(-30, 3, -3), color: 0x9a8162 },
    { size: new THREE.Vector3(14, 6, 3), position: new THREE.Vector3(30, 3, -3), color: 0x6c7770 },
    { size: new THREE.Vector3(3, 6, 20), position: new THREE.Vector3(-37, 3, -15), color: 0x967c5d },
    { size: new THREE.Vector3(3, 6, 20), position: new THREE.Vector3(37, 3, -15), color: 0x66716a },
    { size: new THREE.Vector3(16, 6, 3), position: new THREE.Vector3(-16, 3, -33), color: 0x8f765a },
    { size: new THREE.Vector3(16, 6, 3), position: new THREE.Vector3(16, 3, -33), color: 0x6d7771 },
    { size: new THREE.Vector3(8, 5, 3), position: new THREE.Vector3(0, 2.5, -22), color: 0x8c7559 },
  ];
  structuralWalls.forEach((wall) => builder.addBox(wall));

  const siteCover = [
    { size: new THREE.Vector3(5, 2.4, 5), position: new THREE.Vector3(-24, 1.2, -19), color: 0xaf926e },
    { size: new THREE.Vector3(4, 1.8, 9), position: new THREE.Vector3(-15, 0.9, -26), color: 0x8f7659 },
    { size: new THREE.Vector3(5, 1.7, 5), position: new THREE.Vector3(-31, 0.85, -31), color: 0x5d6c65 },
    { size: new THREE.Vector3(5, 2.4, 5), position: new THREE.Vector3(24, 1.2, -19), color: 0x61706a },
    { size: new THREE.Vector3(4, 1.8, 9), position: new THREE.Vector3(15, 0.9, -26), color: 0x6d7a75 },
    { size: new THREE.Vector3(5, 1.7, 5), position: new THREE.Vector3(31, 0.85, -31), color: 0xa58b6d },
    { size: new THREE.Vector3(6, 2.2, 4), position: new THREE.Vector3(0, 1.1, -10), color: 0x8d7558 },
    { size: new THREE.Vector3(4, 1.7, 4), position: new THREE.Vector3(-5, 0.85, -17), color: 0x9b8364 },
    { size: new THREE.Vector3(4, 1.7, 4), position: new THREE.Vector3(5, 0.85, -17), color: 0x74817a },
  ];
  siteCover.forEach((block) => builder.addBox(block));

  const leftSitePad = new THREE.Mesh(
    new THREE.BoxGeometry(11, 0.8, 8),
    new THREE.MeshStandardMaterial({
      color: 0xa18a6c,
      roughness: 0.9,
      metalness: 0.04,
    }),
  );
  leftSitePad.position.set(-24, 0.4, -22);
  leftSitePad.castShadow = true;
  leftSitePad.receiveShadow = true;
  builder.addMesh(leftSitePad);

  const rightSitePad = new THREE.Mesh(
    new THREE.BoxGeometry(11, 0.8, 8),
    new THREE.MeshStandardMaterial({
      color: 0x64716b,
      roughness: 0.9,
      metalness: 0.04,
    }),
  );
  rightSitePad.position.set(24, 0.4, -22);
  rightSitePad.castShadow = true;
  rightSitePad.receiveShadow = true;
  builder.addMesh(rightSitePad);

  const midCatwalk = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.7, 12),
    new THREE.MeshStandardMaterial({
      color: 0x7c654e,
      roughness: 0.86,
      metalness: 0.08,
    }),
  );
  midCatwalk.position.set(0, 1.1, -6);
  midCatwalk.castShadow = true;
  midCatwalk.receiveShadow = true;
  builder.addMesh(midCatwalk);

  const leftRamp = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.5, 8),
    new THREE.MeshStandardMaterial({
      color: 0xa58b6a,
      roughness: 0.9,
      metalness: 0.03,
    }),
  );
  leftRamp.position.set(-8, 0.55, -6);
  leftRamp.rotation.z = 0.18;
  leftRamp.castShadow = true;
  leftRamp.receiveShadow = true;
  builder.addMesh(leftRamp);

  const rightRamp = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.5, 8),
    new THREE.MeshStandardMaterial({
      color: 0x6f7a73,
      roughness: 0.9,
      metalness: 0.03,
    }),
  );
  rightRamp.position.set(8, 0.55, -6);
  rightRamp.rotation.z = -0.18;
  rightRamp.castShadow = true;
  rightRamp.receiveShadow = true;
  builder.addMesh(rightRamp);

  addSiteMark(builder, {
    label: 'A',
    color: 0xc66f34,
    position: new THREE.Vector3(-24, 0, -22),
    rotation: Math.PI / 8,
  });
  addSiteMark(builder, {
    label: 'B',
    color: 0x318c84,
    position: new THREE.Vector3(24, 0, -22),
    rotation: -Math.PI / 10,
  });

  const spawnPoint = new THREE.Vector3(0, 0, 31);

  const targetPositions = [
    new THREE.Vector3(-23, 0.8, -20),
    new THREE.Vector3(0, 1.1, -6),
    new THREE.Vector3(23, 0.8, -20),
  ];
  targetPositions.forEach((position) => {
    const targetDummy = new TargetDummy(position);
    builder.addTarget(targetDummy);
  });

  return builder.finalize({
    spawnPoint,
    groundHeight: 0,
  });
}
