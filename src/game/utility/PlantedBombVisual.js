import * as THREE from 'three';

export class PlantedBombVisual {
  constructor(scene = null) {
    this.scene = scene ?? null;
    this.mesh = null;
  }

  ensureMesh() {
    if (this.mesh) {
      return this.mesh;
    }

    if (!this.scene) {
      return null;
    }

    const group = new THREE.Group();
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x35393d,
      roughness: 0.88,
      metalness: 0.06,
    });
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x72815b,
      roughness: 0.92,
      metalness: 0.02,
    });
    const wireMaterial = new THREE.MeshStandardMaterial({
      color: 0xc6703c,
      roughness: 0.84,
      metalness: 0.04,
    });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.18), shellMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.06), screenMaterial);
    screen.position.set(0, 0.071, 0);
    screen.castShadow = true;
    group.add(screen);

    const wireLeft = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.11, 0.012), wireMaterial);
    wireLeft.position.set(-0.085, 0.11, 0);
    wireLeft.rotation.z = -0.26;
    group.add(wireLeft);

    const wireRight = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.11, 0.012), wireMaterial);
    wireRight.position.set(0.085, 0.11, 0);
    wireRight.rotation.z = 0.22;
    group.add(wireRight);

    group.visible = false;
    this.scene.add(group);
    this.mesh = group;
    return group;
  }

  setVisiblePosition(position) {
    const mesh = this.ensureMesh();
    if (!mesh) {
      return;
    }

    if (!position) {
      mesh.visible = false;
      return;
    }

    mesh.visible = true;
    mesh.position.set(
      Number(position.x ?? 0),
      Number(position.y ?? 0) + 0.08,
      Number(position.z ?? 0),
    );
  }

  destroy() {
    if (!this.mesh) {
      return;
    }

    this.mesh.removeFromParent();
    this.mesh.traverse((child) => {
      child.geometry?.dispose?.();
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material?.dispose?.());
      } else {
        child.material?.dispose?.();
      }
    });
    this.mesh = null;
  }
}
