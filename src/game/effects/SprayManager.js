import * as THREE from 'three';

const DEFAULT_SPRAY_SIZE = 0.96;
const SPRAY_SURFACE_OFFSET = 0.01;
const SPRAY_RENDER_ORDER = 12;
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const NORMAL = new THREE.Vector3();
const POSITION = new THREE.Vector3();
const RIGHT = new THREE.Vector3();
const UPRIGHT = new THREE.Vector3();
const BITANGENT = new THREE.Vector3();
const FALLBACK_FORWARD = new THREE.Vector3(0, 0, -1);
const FALLBACK_RIGHT = new THREE.Vector3(1, 0, 0);

function projectVectorOntoPlane(target, vector, planeNormal) {
  return target.copy(vector).addScaledVector(planeNormal, -vector.dot(planeNormal));
}

function createSprayMaterial(texture) {
  return new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    side: THREE.DoubleSide,
  });
}

export class SprayManager {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'SprayManagerGroup';
    this.scene.add(this.group);
    this.textureLoader = new THREE.TextureLoader();
    this.textureLoader.setCrossOrigin('anonymous');
    this.textureCache = new Map();
    this.texturePromises = new Map();
    this.meshes = new Map();
    this.desiredSprays = new Map();
    this.pendingSprayTokens = new Map();
  }

  createSprayToken(spray) {
    return JSON.stringify({
      id: String(spray?.id ?? ''),
      sprayUrl: String(spray?.sprayUrl ?? ''),
      rotation: Number(spray?.rotation ?? 0),
      createdAt: Number(spray?.createdAt ?? 0),
      position: {
        x: Number(spray?.position?.x ?? 0),
        y: Number(spray?.position?.y ?? 0),
        z: Number(spray?.position?.z ?? 0),
      },
      normal: {
        x: Number(spray?.normal?.x ?? 0),
        y: Number(spray?.normal?.y ?? 0),
        z: Number(spray?.normal?.z ?? 1),
      },
    });
  }

  async loadTexture(url) {
    if (!url) {
      return null;
    }
    if (this.textureCache.has(url)) {
      return this.textureCache.get(url);
    }
    if (this.texturePromises.has(url)) {
      return this.texturePromises.get(url);
    }

    const loadPromise = this.textureLoader.loadAsync(url)
      .then((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        this.textureCache.set(url, texture);
        this.texturePromises.delete(url);
        return texture;
      })
      .catch((error) => {
        console.warn('[SprayManager] Failed to load spray texture.', error);
        this.texturePromises.delete(url);
        return null;
      });

    this.texturePromises.set(url, loadPromise);
    return loadPromise;
  }

  async ensureSprayMesh(spray) {
    const sprayId = String(spray?.id ?? '');
    if (!sprayId || this.meshes.has(sprayId)) {
      return;
    }
    const sprayToken = this.createSprayToken(spray);
    this.pendingSprayTokens.set(sprayId, sprayToken);

    const texture = await this.loadTexture(String(spray?.sprayUrl ?? ''));
    if (!texture) {
      if (this.pendingSprayTokens.get(sprayId) === sprayToken) {
        this.pendingSprayTokens.delete(sprayId);
      }
      return;
    }

    const desiredSpray = this.desiredSprays.get(sprayId);
    const desiredToken = desiredSpray ? this.createSprayToken(desiredSpray) : null;
    if (
      this.pendingSprayTokens.get(sprayId) !== sprayToken
      || desiredToken !== sprayToken
      || this.meshes.has(sprayId)
    ) {
      if (this.pendingSprayTokens.get(sprayId) === sprayToken) {
        this.pendingSprayTokens.delete(sprayId);
      }
      return;
    }

    const geometry = new THREE.PlaneGeometry(DEFAULT_SPRAY_SIZE, DEFAULT_SPRAY_SIZE);
    const material = createSprayMaterial(texture);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = SPRAY_RENDER_ORDER;
    this.applySprayTransform(mesh, spray);
    this.group.add(mesh);
    this.meshes.set(sprayId, mesh);
    if (this.pendingSprayTokens.get(sprayId) === sprayToken) {
      this.pendingSprayTokens.delete(sprayId);
    }
  }

  applySprayTransform(mesh, spray) {
    NORMAL.set(
      Number(spray?.normal?.x ?? 0),
      Number(spray?.normal?.y ?? 0),
      Number(spray?.normal?.z ?? 1),
    ).normalize();

    POSITION.set(
      Number(spray?.position?.x ?? 0),
      Number(spray?.position?.y ?? 0),
      Number(spray?.position?.z ?? 0),
    ).addScaledVector(NORMAL, SPRAY_SURFACE_OFFSET);

    projectVectorOntoPlane(UPRIGHT, WORLD_UP, NORMAL);
    if (UPRIGHT.lengthSq() <= 1e-5) {
      projectVectorOntoPlane(UPRIGHT, FALLBACK_FORWARD, NORMAL);
    }
    if (UPRIGHT.lengthSq() <= 1e-5) {
      projectVectorOntoPlane(UPRIGHT, FALLBACK_RIGHT, NORMAL);
    }
    UPRIGHT.normalize();

    RIGHT.copy(UPRIGHT).cross(NORMAL).normalize();
    BITANGENT.copy(NORMAL).cross(RIGHT).normalize();

    mesh.position.copy(POSITION);
    mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(RIGHT, BITANGENT, NORMAL));
  }

  syncSprays(sprays, mapId) {
    const activeIds = new Set();
    const visibleSprays = Array.isArray(sprays)
      ? sprays.filter((spray) => String(spray?.mapId ?? '') === String(mapId ?? '') && spray?.sprayUrl)
      : [];

    this.desiredSprays.clear();

    for (const spray of visibleSprays) {
      const sprayId = String(spray?.id ?? '');
      if (!sprayId) {
        continue;
      }
      activeIds.add(sprayId);
      this.desiredSprays.set(sprayId, spray);
      const existingMesh = this.meshes.get(sprayId);
      if (existingMesh) {
        this.applySprayTransform(existingMesh, spray);
        continue;
      }
      void this.ensureSprayMesh(spray);
    }

    for (const [sprayId, mesh] of this.meshes) {
      if (activeIds.has(sprayId)) {
        continue;
      }
      mesh.removeFromParent();
      mesh.geometry?.dispose?.();
      mesh.material?.dispose?.();
      this.meshes.delete(sprayId);
    }

    for (const sprayId of this.pendingSprayTokens.keys()) {
      if (!activeIds.has(sprayId)) {
        this.pendingSprayTokens.delete(sprayId);
      }
    }
  }

  clear() {
    this.syncSprays([], null);
  }

  destroy() {
    this.clear();
    for (const texture of this.textureCache.values()) {
      texture.dispose?.();
    }
    this.textureCache.clear();
    this.texturePromises.clear();
    this.group.removeFromParent();
  }
}
