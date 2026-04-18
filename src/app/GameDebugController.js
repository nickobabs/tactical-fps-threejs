import * as THREE from 'three';
import {
  createDebugMarker,
  dumpDebugMarkers,
  getCurrentPlayerDebugPosition,
  logCurrentPlayerDebugPosition,
  logSavedDebugMarker,
} from './mapDebugTools.js';

export class GameDebugController {
  constructor(scene) {
    this.scene = scene;
    this.ignoreLocalCorrections = false;
    this.markDebugSnapshotRequested = false;
    this.movementTraceRecording = false;
    this.remoteAnimationTraceRecording = false;
    this.debugMarkers = [];
    this.nextDebugMarkerId = 1;
    this.showCollisionDebug = false;
    this.collisionDebugMesh = null;
  }

  destroy() {
    this.disposeCollisionDebugMesh();
  }

  getIgnoreLocalCorrections() {
    return this.ignoreLocalCorrections;
  }

  toggleIgnoreLocalCorrections() {
    this.ignoreLocalCorrections = !this.ignoreLocalCorrections;
  }

  isCollisionDebugEnabled() {
    return this.showCollisionDebug;
  }

  requestDebugSnapshot() {
    this.markDebugSnapshotRequested = true;
  }

  isMovementTraceRecording() {
    return this.movementTraceRecording;
  }

  toggleMovementTraceRecording() {
    this.movementTraceRecording = !this.movementTraceRecording;
    return this.movementTraceRecording;
  }

  isRemoteAnimationTraceRecording() {
    return this.remoteAnimationTraceRecording;
  }

  toggleRemoteAnimationTraceRecording() {
    this.remoteAnimationTraceRecording = !this.remoteAnimationTraceRecording;
    return this.remoteAnimationTraceRecording;
  }

  consumeMarkDebugSnapshotRequested() {
    const requested = this.markDebugSnapshotRequested;
    this.markDebugSnapshotRequested = false;
    return requested;
  }

  getCurrentPlayerPosition(playerController, mapId) {
    return getCurrentPlayerDebugPosition(playerController, mapId);
  }

  logCurrentPosition(playerController, mapId) {
    logCurrentPlayerDebugPosition(this.getCurrentPlayerPosition(playerController, mapId));
  }

  saveDebugMarker(playerController, mapId) {
    const marker = createDebugMarker(
      this.getCurrentPlayerPosition(playerController, mapId),
      `marker-${this.nextDebugMarkerId}`,
    );
    if (!marker) {
      return;
    }

    this.nextDebugMarkerId += 1;
    this.debugMarkers.push(marker);
    logSavedDebugMarker(marker);
  }

  dumpDebugMarkers() {
    dumpDebugMarkers(this.debugMarkers);
  }

  createCollisionDebugMesh(collisionGeometry) {
    if (!collisionGeometry) {
      return null;
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(collisionGeometry, material);
    mesh.frustumCulled = false;
    mesh.renderOrder = 1000;
    return mesh;
  }

  disposeCollisionDebugMesh() {
    if (!this.collisionDebugMesh) {
      return;
    }

    this.scene.remove(this.collisionDebugMesh);
    this.collisionDebugMesh.material.dispose();
    this.collisionDebugMesh = null;
  }

  syncCollisionDebugMesh(collisionGeometry) {
    this.disposeCollisionDebugMesh();

    if (!this.showCollisionDebug || !collisionGeometry) {
      return;
    }

    this.collisionDebugMesh = this.createCollisionDebugMesh(collisionGeometry);
    if (this.collisionDebugMesh) {
      this.scene.add(this.collisionDebugMesh);
    }
  }

  toggleCollisionDebug(collisionGeometry) {
    this.showCollisionDebug = !this.showCollisionDebug;
    this.syncCollisionDebugMesh(collisionGeometry);
  }
}
