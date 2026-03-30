import * as THREE from 'three';
import { TargetDummy } from '../targets/TargetDummy.js';
import { createMapBuilder } from './mapBuilder.js';

export function createTrainingGround() {
  const builder = createMapBuilder();
  const { group } = builder;

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

  const floorCollision = new THREE.Mesh(
    new THREE.BoxGeometry(72, 1, 72),
    new THREE.MeshBasicMaterial(),
  );
  floorCollision.position.set(0, -0.5, 0);
  builder.addCollisionFromMesh(floorCollision);

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

  const blocks = [
    { size: new THREE.Vector3(72, 6, 2), position: new THREE.Vector3(0, 3, -36), color: 0x51616d },
    { size: new THREE.Vector3(72, 6, 2), position: new THREE.Vector3(0, 3, 36), color: 0x51616d },
    { size: new THREE.Vector3(2, 6, 72), position: new THREE.Vector3(-36, 3, 0), color: 0x4c5c68 },
    { size: new THREE.Vector3(2, 6, 72), position: new THREE.Vector3(36, 3, 0), color: 0x4c5c68 },
    { size: new THREE.Vector3(16, 4, 1.4), position: new THREE.Vector3(0, 2, 6), color: 0x6a7a84 },
    { size: new THREE.Vector3(1.4, 4, 18), position: new THREE.Vector3(-8, 2, -4), color: 0x60717c },
    { size: new THREE.Vector3(1.4, 4, 18), position: new THREE.Vector3(8, 2, -10), color: 0x60717c },
    { size: new THREE.Vector3(10, 2.6, 6), position: new THREE.Vector3(-15, 1.3, -18), color: 0x7b6d5f },
    { size: new THREE.Vector3(8, 2.6, 6), position: new THREE.Vector3(13, 1.3, -22), color: 0x7b6d5f },
    { size: new THREE.Vector3(6, 2.2, 6), position: new THREE.Vector3(0, 1.1, -18), color: 0x71828c },
    { size: new THREE.Vector3(4, 1.6, 4), position: new THREE.Vector3(-18, 0.8, 10), color: 0x8a7d67 },
    { size: new THREE.Vector3(4, 1.6, 4), position: new THREE.Vector3(18, 0.8, 12), color: 0x8a7d67 },
    { size: new THREE.Vector3(12, 3.2, 1.2), position: new THREE.Vector3(0, 1.6, -28), color: 0x55656f },
  ];

  blocks.forEach((block) => builder.addBox(block));

  const catwalk = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.5, 6),
    new THREE.MeshStandardMaterial({
      color: 0x44545f,
      roughness: 0.82,
      metalness: 0.14,
    }),
  );
  catwalk.position.set(19, 2.75, -6);
  catwalk.castShadow = true;
  catwalk.receiveShadow = true;
  builder.addMesh(catwalk);

  const ramp = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.4, 10),
    new THREE.MeshStandardMaterial({
      color: 0x495a65,
      roughness: 0.84,
      metalness: 0.12,
    }),
  );
  ramp.position.set(24, 1.2, -6);
  ramp.rotation.z = -0.24;
  ramp.castShadow = true;
  ramp.receiveShadow = true;
  builder.addMesh(ramp);

  const spawnPoint = new THREE.Vector3(0, 0, 24);

  const targetDummy = new TargetDummy(new THREE.Vector3(6, 0, 10));
  builder.addTarget(targetDummy);

  return builder.finalize({
    spawnPoint,
    groundHeight: 0,
  });
}
