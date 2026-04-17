import * as THREE from 'three';

const DEFAULT_NORMAL = new THREE.Vector3(0, 1, 0);
const SMOKE_PUFF_LAYOUT = [
  [0.0, 0.44, 0.0, 2.84, 0.46, 0.03, 0.01],
  [-0.56, 0.42, -0.26, 2.62, 0.43, -0.01, -0.01],
  [0.62, 0.4, 0.18, 2.6, 0.43, 0.01, 0.01],
  [-1.66, 0.39, -0.32, 2.5, 0.4, -0.03, 0.0],
  [1.74, 0.37, -0.24, 2.46, 0.39, 0.03, -0.01],
  [-1.18, 0.5, 1.3, 2.5, 0.39, -0.02, 0.02],
  [1.28, 0.46, 1.26, 2.46, 0.39, 0.02, 0.02],
  [-0.24, 0.4, -1.58, 2.34, 0.38, -0.01, -0.03],
  [1.04, 0.48, -1.18, 2.34, 0.37, 0.02, -0.02],
  [-2.34, 0.4, 0.18, 2.16, 0.34, -0.04, 0.0],
  [2.34, 0.38, 0.14, 2.12, 0.34, 0.04, 0.0],
  [-1.94, 0.36, 1.66, 1.98, 0.31, -0.03, 0.02],
  [1.9, 0.34, 1.62, 1.96, 0.31, 0.03, 0.02],
  [-0.88, 0.36, 2.12, 1.86, 0.29, -0.01, 0.03],
  [0.9, 0.36, 2.08, 1.86, 0.29, 0.01, 0.03],
  [-0.04, 0.46, 1.46, 2.22, 0.33, 0.0, 0.02],
  [-0.02, 0.4, -2.22, 2.08, 0.28, 0.0, -0.04],
];
const SMOKE_FADE_IN = 0.38;
const SMOKE_FADE_OUT = 1.15;
const SMOKE_GROW_DURATION = 1.2;
const SMOKE_BASE_SCALE_MULTIPLIER = 1.62;
const SMOKE_INITIAL_SCALE = 0.78;
const SMOKE_EXPANSION = 1.78;
const SMOKE_CENTER_OPACITY = 1.04;
const SMOKE_EDGE_OPACITY = 0.82;
const SMOKE_COLOR = 0x55585c;
const SMOKE_RISE_DISTANCE = 0.01;
const SMOKE_SPREAD_DISTANCE = 0.12;
const SMOKE_EDGE_SHIFT_DISTANCE = 0.18;
const BOMB_EXPLOSION_LAYOUT = [
  [0.0, 0.95, 0.0, 4.6, 0.9, 0.0, 0.0],
  [-1.45, 1.18, -0.46, 3.8, 0.72, -0.22, -0.08],
  [1.5, 1.1, -0.3, 3.72, 0.72, 0.22, -0.06],
  [-1.02, 1.48, 1.42, 3.36, 0.64, -0.15, 0.14],
  [1.08, 1.4, 1.34, 3.32, 0.64, 0.15, 0.14],
  [0.0, 1.74, 0.42, 3.52, 0.7, 0.0, 0.1],
  [-2.2, 0.92, 0.14, 2.9, 0.58, -0.28, 0.02],
  [2.24, 0.88, 0.12, 2.86, 0.58, 0.28, 0.02],
];
const BOMB_EXPLOSION_DURATION = 1.45;
const BLOOD_BURST_DURATION = 0.16;
const BLOOD_BURST_COUNT = 4;

let smokeTexture = null;
let bloodTexture = null;

function createImpactMarker(point, normal = DEFAULT_NORMAL) {
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffb36b }),
  );
  marker.position.copy(point).addScaledVector(normal, 0.05);
  marker.userData.life = 0.1;
  return marker;
}

function createTracer(start, end) {
  const geometry = new THREE.BufferGeometry().setFromPoints([start.clone(), end.clone()]);
  const material = new THREE.LineBasicMaterial({
    color: 0xffe7b0,
    transparent: true,
    opacity: 0.9,
  });

  const tracer = new THREE.Line(geometry, material);
  tracer.userData.life = 0.05;
  return tracer;
}

function getSmokeTexture() {
  if (smokeTexture || typeof document === 'undefined') {
    return smokeTexture;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(64, 64, 10, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,0.96)');
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.82)');
  gradient.addColorStop(0.68, 'rgba(255,255,255,0.28)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  smokeTexture = new THREE.CanvasTexture(canvas);
  smokeTexture.colorSpace = THREE.SRGBColorSpace;
  smokeTexture.needsUpdate = true;
  return smokeTexture;
}

function getBloodTexture() {
  if (bloodTexture || typeof document === 'undefined') {
    return bloodTexture;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(48, 48, 8, 48, 48, 48);
  gradient.addColorStop(0, 'rgba(255,210,210,0.95)');
  gradient.addColorStop(0.28, 'rgba(190,28,28,0.92)');
  gradient.addColorStop(0.68, 'rgba(115,8,8,0.52)');
  gradient.addColorStop(1, 'rgba(70,0,0,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  bloodTexture = new THREE.CanvasTexture(canvas);
  bloodTexture.colorSpace = THREE.SRGBColorSpace;
  bloodTexture.needsUpdate = true;
  return bloodTexture;
}

function createSmokeCloud(position, {
  duration = 14,
} = {}) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.userData.effectType = 'smoke-cloud';
  group.userData.life = duration;
  group.userData.duration = duration;

  const texture = getSmokeTexture();

  for (const [x, y, z, scale, opacityScale, driftX, driftZ] of SMOKE_PUFF_LAYOUT) {
    const puff = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        color: SMOKE_COLOR,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    puff.position.set(x, y, z);
    puff.scale.setScalar(scale * SMOKE_BASE_SCALE_MULTIPLIER);
    puff.userData.baseScale = scale * SMOKE_BASE_SCALE_MULTIPLIER;
    puff.userData.opacityScale = opacityScale;
    puff.userData.basePosition = new THREE.Vector3(x, y, z);
    puff.userData.drift = new THREE.Vector3(driftX, 0, driftZ);
    group.add(puff);
  }

  return group;
}

function createBombExplosion(position) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.userData.effectType = 'bomb-explosion';
  group.userData.life = BOMB_EXPLOSION_DURATION;
  group.userData.duration = BOMB_EXPLOSION_DURATION;

  const flash = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xffd38a,
      transparent: true,
      opacity: 0,
    }),
  );
  flash.position.y = 0.55;
  flash.userData.effectRole = 'flash';
  group.add(flash);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.2, 2.1, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffb15a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    }),
  );
  ring.rotation.x = -Math.PI * 0.5;
  ring.position.y = 0.05;
  ring.userData.effectRole = 'ring';
  group.add(ring);

  const texture = getSmokeTexture();
  for (const [x, y, z, scale, opacityScale, driftX, driftZ] of BOMB_EXPLOSION_LAYOUT) {
    const puff = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        color: 0x6c5b4e,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    puff.position.set(x, y, z);
    puff.scale.setScalar(scale);
    puff.userData.effectRole = 'plume';
    puff.userData.baseScale = scale;
    puff.userData.opacityScale = opacityScale;
    puff.userData.basePosition = new THREE.Vector3(x, y, z);
    puff.userData.drift = new THREE.Vector3(driftX, 1, driftZ);
    group.add(puff);
  }

  return group;
}

function createBloodBurst(position) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.userData.effectType = 'blood-burst';
  group.userData.life = BLOOD_BURST_DURATION;
  group.userData.duration = BLOOD_BURST_DURATION;

  const texture = getBloodTexture();
  for (let index = 0; index < BLOOD_BURST_COUNT; index += 1) {
    const angle = (index / BLOOD_BURST_COUNT) * Math.PI * 2;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
      }),
    );
    const baseScale = 0.18 + (index * 0.03);
    sprite.scale.setScalar(baseScale);
    sprite.position.set(
      Math.cos(angle) * (0.08 + index * 0.015),
      0.02 + (index * 0.025),
      Math.sin(angle) * (0.05 + index * 0.01),
    );
    sprite.userData.baseScale = baseScale;
    sprite.userData.velocity = new THREE.Vector3(
      Math.cos(angle) * (0.55 + index * 0.08),
      0.28 + (index * 0.08),
      Math.sin(angle) * (0.38 + index * 0.06),
    );
    group.add(sprite);
  }

  return group;
}

function disposeEffectObject(root) {
  root?.removeFromParent?.();
  root?.traverse?.((child) => {
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material?.dispose?.());
      return;
    }
    child.material?.dispose?.();
  });
}

export class EffectsManager {
  constructor(scene = null) {
    this.scene = scene ?? null;
    this.transientObjects = [];
  }

  addImpactEffect(start, hit) {
    if (!this.scene || !hit?.point) {
      return;
    }

    const marker = createImpactMarker(hit.point, hit.face?.normal ?? DEFAULT_NORMAL);
    const tracer = createTracer(start, hit.point);
    this.scene.add(marker, tracer);
    this.transientObjects.push(marker, tracer);
  }

  addMissTracer(start, end) {
    if (!this.scene) {
      return;
    }

    const tracer = createTracer(start, end);
    this.scene.add(tracer);
    this.transientObjects.push(tracer);
  }

  addTracerImpact(start, end) {
    if (!this.scene || !start || !end) {
      return;
    }

    const marker = createImpactMarker(end);
    const tracer = createTracer(start, end);
    this.scene.add(marker, tracer);
    this.transientObjects.push(marker, tracer);
  }

  addSmokeCloud(position, options = {}) {
    if (!this.scene || !position) {
      return null;
    }

    const cloud = createSmokeCloud(position, options);
    this.scene.add(cloud);
    this.transientObjects.push(cloud);
    return cloud;
  }

  addBombExplosion(position) {
    if (!this.scene || !position) {
      return null;
    }

    const explosion = createBombExplosion(position);
    this.scene.add(explosion);
    this.transientObjects.push(explosion);
    return explosion;
  }

  addBloodBurst(position) {
    if (!this.scene || !position) {
      return null;
    }

    const burst = createBloodBurst(position);
    this.scene.add(burst);
    this.transientObjects.push(burst);
    return burst;
  }

  updateSmokeCloud(object) {
    const duration = Math.max(0.001, Number(object.userData.duration ?? 14));
    const elapsed = Math.max(0, duration - Number(object.userData.life ?? 0));
    const fadeInAlpha = Math.max(0, Math.min(1, elapsed / SMOKE_FADE_IN));
    const fadeOutAlpha = Math.max(0, Math.min(1, Number(object.userData.life ?? 0) / SMOKE_FADE_OUT));
    const densityAlpha = fadeInAlpha * fadeOutAlpha;
    const growAlpha = THREE.MathUtils.clamp(elapsed / SMOKE_GROW_DURATION, 0, 1);
    const easedGrowAlpha = 1 - ((1 - growAlpha) * (1 - growAlpha) * (1 - growAlpha));
    const scaleMultiplier = THREE.MathUtils.lerp(SMOKE_INITIAL_SCALE, SMOKE_EXPANSION, easedGrowAlpha);
    const edgeShift = Math.min(elapsed, SMOKE_GROW_DURATION) * SMOKE_SPREAD_DISTANCE
      + Math.max(0, elapsed - SMOKE_GROW_DURATION) * SMOKE_EDGE_SHIFT_DISTANCE * 0.12;

    object.traverse((child) => {
      if (!child.isSprite) {
        return;
      }

      const basePosition = child.userData.basePosition;
      const drift = child.userData.drift;
      const opacityScale = Number(child.userData.opacityScale ?? 0.3);
      const baseScale = Number(child.userData.baseScale ?? 1);
      const opacityFloor = THREE.MathUtils.lerp(
        SMOKE_EDGE_OPACITY,
        SMOKE_CENTER_OPACITY,
        THREE.MathUtils.clamp((opacityScale - 0.28) / 0.2, 0, 1),
      );
      const puffOpacity = opacityFloor * densityAlpha;

      child.position.copy(basePosition).addScaledVector(drift, edgeShift);
      child.position.y += elapsed * SMOKE_RISE_DISTANCE;
      child.scale.setScalar(baseScale * scaleMultiplier);
      child.material.opacity = puffOpacity;
    });
  }

  updateBombExplosion(object) {
    const duration = Math.max(0.001, Number(object.userData.duration ?? BOMB_EXPLOSION_DURATION));
    const elapsed = Math.max(0, duration - Number(object.userData.life ?? 0));
    const alpha = THREE.MathUtils.clamp(elapsed / duration, 0, 1);
    const flashOpacity = Math.max(0, 1 - (alpha * 3.4));
    const ringOpacity = Math.max(0, 0.72 - (alpha * 0.9));

    object.traverse((child) => {
      const role = child.userData.effectRole;
      if (role === 'flash' && child.isMesh) {
        child.scale.setScalar(THREE.MathUtils.lerp(0.65, 7.4, alpha));
        child.material.opacity = flashOpacity;
        return;
      }

      if (role === 'ring' && child.isMesh) {
        child.scale.setScalar(THREE.MathUtils.lerp(0.5, 9.8, alpha));
        child.material.opacity = ringOpacity;
        return;
      }

      if (role !== 'plume' || !child.isSprite) {
        return;
      }

      const baseScale = Number(child.userData.baseScale ?? 1);
      const opacityScale = Number(child.userData.opacityScale ?? 0.5);
      child.position.copy(child.userData.basePosition)
        .addScaledVector(child.userData.drift, elapsed * 1.85);
      child.scale.setScalar(baseScale * THREE.MathUtils.lerp(0.82, 3.2, alpha));
      child.material.opacity = Math.max(0, (0.95 - (alpha * 1.15)) * opacityScale);
    });
  }

  updateBloodBurst(object) {
    const duration = Math.max(0.001, Number(object.userData.duration ?? BLOOD_BURST_DURATION));
    const elapsed = Math.max(0, duration - Number(object.userData.life ?? 0));
    const alpha = 1 - THREE.MathUtils.clamp(elapsed / duration, 0, 1);

    object.traverse((child) => {
      if (!child.isSprite) {
        return;
      }

      const velocity = child.userData.velocity ?? DEFAULT_NORMAL;
      const baseScale = Number(child.userData.baseScale ?? 0.2);
      child.position.addScaledVector(velocity, 0.016);
      child.scale.setScalar(baseScale * THREE.MathUtils.lerp(0.9, 1.35, elapsed / duration));
      child.material.opacity = alpha * 0.9;
    });
  }

  update(delta) {
    for (let index = this.transientObjects.length - 1; index >= 0; index -= 1) {
      const object = this.transientObjects[index];
      object.userData.life -= delta;

      if (object.userData.effectType === 'smoke-cloud') {
        this.updateSmokeCloud(object);
      } else if (object.userData.effectType === 'bomb-explosion') {
        this.updateBombExplosion(object);
      } else if (object.userData.effectType === 'blood-burst') {
        this.updateBloodBurst(object);
      } else if (object.material?.opacity !== undefined) {
        object.material.opacity = Math.max(object.userData.life * 10, 0);
      }

      if (object.userData.life > 0) {
        continue;
      }

      disposeEffectObject(object);
      this.transientObjects.splice(index, 1);
    }
  }

  destroy() {
    this.update(Infinity);
  }
}
