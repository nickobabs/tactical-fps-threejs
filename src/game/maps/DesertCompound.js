import * as THREE from 'three';
import { TargetDummy } from '../targets/TargetDummy.js';
import { createMapBuilder } from './mapBuilder.js';
import { getMapLayout } from '../../shared/maps/mapLayouts.js';

const DESERT_BOX_STYLES = [
  { color: 0x9c8567 },
  { color: 0x9c8567 },
  { color: 0x90795e },
  { color: 0x90795e },
  { color: 0x8d7256 },
  { color: 0x8d7256 },
  { color: 0x84694f },
  { color: 0x84694f },
  { color: 0x856c52 },
  { color: 0x8d7559 },
  { color: 0x8d7559 },
  { color: 0x9a8162 },
  { color: 0x6c7770 },
  { color: 0x967c5d },
  { color: 0x66716a },
  { color: 0x8f765a },
  { color: 0x6d7771 },
  { color: 0x8c7559 },
  { color: 0xaf926e },
  { color: 0x8f7659 },
  { color: 0x5d6c65 },
  { color: 0x61706a },
  { color: 0x6d7a75 },
  { color: 0xa58b6d },
  { color: 0x8d7558 },
  { color: 0x9b8364 },
  { color: 0x74817a },
  { color: 0xa18a6c, roughness: 0.9, metalness: 0.04 },
  { color: 0x64716b, roughness: 0.9, metalness: 0.04 },
  { color: 0x7c654e, roughness: 0.86, metalness: 0.08 },
  { color: 0xa58b6a, roughness: 0.9, metalness: 0.03 },
  { color: 0x6f7a73, roughness: 0.9, metalness: 0.03 },
];

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
  const layout = getMapLayout('desert-compound');

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
  builder.addLayoutBoxes(layout.collisionBoxes.slice(1), DESERT_BOX_STYLES, { collision: false });

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

  const targetPositions = [
    new THREE.Vector3(-23, 0.8, -20),
    new THREE.Vector3(0, 1.1, -6),
    new THREE.Vector3(23, 0.8, -20),
  ];
  targetPositions.forEach((position) => {
    const targetDummy = new TargetDummy(position);
    builder.addTarget(targetDummy);
  });

  return builder.finalize();
}
