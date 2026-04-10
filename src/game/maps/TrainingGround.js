import * as THREE from 'three';
import { TargetDummy } from '../targets/TargetDummy.js';
import { createMapBuilder } from './mapBuilder.js';
import { getMapLayout } from '../../shared/maps/mapLayouts.js';

const TRAINING_BOX_STYLES = [
  { color: 0x51616d },
  { color: 0x51616d },
  { color: 0x4c5c68 },
  { color: 0x4c5c68 },
  { color: 0x6a7a84 },
  { color: 0x60717c },
  { color: 0x60717c },
  { color: 0x7b6d5f },
  { color: 0x7b6d5f },
  { color: 0x71828c },
  { color: 0x8a7d67 },
  { color: 0x8a7d67 },
  { color: 0x55656f },
  { color: 0x44545f, roughness: 0.82, metalness: 0.14 },
  { color: 0x495a65, roughness: 0.84, metalness: 0.12 },
];

function addPlantSiteMark(builder, { label, position, color }) {
  const { group } = builder;
  const mark = new THREE.Mesh(
    new THREE.CircleGeometry(4.25, 32),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.72,
    }),
  );
  mark.rotation.x = -Math.PI / 2;
  mark.position.copy(position).setY(0.05);
  group.add(mark);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(4.55, 5.1, 32),
    new THREE.MeshStandardMaterial({
      color: 0xe8dcc3,
      roughness: 1,
      metalness: 0,
    }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.copy(position).setY(0.06);
  group.add(ring);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#f6ebd5';
  ctx.font = 'bold 170px Segoe UI';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 8);

  const texture = new THREE.CanvasTexture(canvas);
  builder.addDisposable(texture);
  const text = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 5.5),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    }),
  );
  text.rotation.x = -Math.PI / 2;
  text.position.copy(position).setY(0.07);
  group.add(text);
}

export function createTrainingGround() {
  const builder = createMapBuilder();
  const { group } = builder;
  const layout = getMapLayout('training-ground');

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(72, 72),
    new THREE.MeshStandardMaterial({
      color: 0x202a31,
      roughness: 0.97,
      metalness: 0.03,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  group.add(floor);
  builder.shootables.push(floor);

  const grid = new THREE.GridHelper(72, 36, 0x4f6778, 0x2a3944);
  grid.position.y = 0.02;
  group.add(grid);

  const laneStripe = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 28),
    new THREE.MeshStandardMaterial({
      color: 0x334550,
      roughness: 1,
      metalness: 0,
    }),
  );
  laneStripe.rotation.x = -Math.PI / 2;
  laneStripe.position.set(0, 0.03, -1);
  group.add(laneStripe);

  addPlantSiteMark(builder, {
    label: 'A',
    color: 0xc27035,
    position: new THREE.Vector3(0, 0, -1),
  });

  builder.addLayoutBoxes(layout.collisionBoxes.slice(1), TRAINING_BOX_STYLES, { collision: false });

  const targetDummy = new TargetDummy(new THREE.Vector3(6, 0, 10));
  builder.addTarget(targetDummy);

  return builder.finalize();
}
