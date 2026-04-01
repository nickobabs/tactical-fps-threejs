import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

function createVector3Like(value = {}) {
  if (value instanceof THREE.Vector3) {
    return value.clone();
  }

  return new THREE.Vector3(value.x ?? 0, value.y ?? 0, value.z ?? 0);
}

export function createBoxMesh({
  size,
  position,
  rotation,
  color,
  roughness = 0.85,
  metalness = 0.08,
}) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(size.x, size.y, size.z),
    new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    }),
  );
  mesh.position.copy(createVector3Like(position));
  if (rotation) {
    mesh.rotation.set(rotation.x ?? 0, rotation.y ?? 0, rotation.z ?? 0);
  }
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function createMapBuilder(root = new THREE.Group()) {
  const shootables = [];
  const collisionGeometries = [];
  const targets = [];
  const disposables = [];

  function addDisposable(resource) {
    if (resource) {
      disposables.push(resource);
    }

    return resource;
  }

  function addCollisionFromMesh(mesh) {
    mesh.updateMatrixWorld(true);
    collisionGeometries.push(mesh.geometry.clone().applyMatrix4(mesh.matrixWorld));
    return mesh;
  }

  function addMesh(mesh, { shootable = true, collision = true } = {}) {
    root.add(mesh);

    if (shootable) {
      shootables.push(mesh);
    }

    if (collision) {
      addCollisionFromMesh(mesh);
    }

    return mesh;
  }

  function addBox(config, options) {
    return addMesh(createBoxMesh(config), options);
  }

  function addLayoutBoxes(boxes, styles = [], options) {
    return boxes.map((box, index) => addBox({
      ...box,
      ...(styles[index] ?? {}),
    }, options));
  }

  function addTarget(target) {
    root.add(target.getObject());
    shootables.push(...target.getShootables());
    targets.push(target);
    return target;
  }

  function finalize({ spawnPoint, groundHeight = 0, collisionGeometry = null } = {}) {
    return {
      scene: root,
      spawnPoint,
      groundHeight,
      collisionGeometry: collisionGeometry ?? (collisionGeometries.length > 0
        ? mergeGeometries(collisionGeometries, false)
        : null),
      shootables,
      targets,
      dispose() {
        disposables.forEach((resource) => resource.dispose?.());
      },
    };
  }

  return {
    group: root,
    shootables,
    targets,
    addBox,
    addLayoutBoxes,
    addMesh,
    addTarget,
    addDisposable,
    addCollisionFromMesh,
    finalize,
  };
}
