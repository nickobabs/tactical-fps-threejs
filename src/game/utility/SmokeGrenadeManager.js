import * as THREE from 'three';

const PROJECTILE_RADIUS = 0.09;
const PROJECTILE_GRAVITY = 23;
const PROJECTILE_RESTITUTION = 0.58;
const PROJECTILE_FRICTION = 0.64;
const PROJECTILE_MIN_FUSE_SECONDS = 1.6;
const PROJECTILE_POST_SETTLE_BLOOM_DELAY = 0.75;
const PROJECTILE_MAX_LIFETIME = 6;
const PROJECTILE_STOP_SPEED = 1.75;
const PROJECTILE_MIN_BOUNCE_SPEED = 1.2;
const COLLISION_PUSH_EPSILON = 0.02;
const SUBSTEP_MAX_DT = 1 / 120;

const THROW_DIRECTION = new THREE.Vector3();
const MOVE_DIRECTION = new THREE.Vector3();
const SURFACE_NORMAL = new THREE.Vector3();
const VELOCITY_NORMAL = new THREE.Vector3();
const VELOCITY_TANGENT = new THREE.Vector3();

function getImpactNormal(hit, fallbackDirection) {
  const faceNormal = hit?.face?.normal;
  if (faceNormal) {
    SURFACE_NORMAL.copy(faceNormal).normalize();
    return SURFACE_NORMAL;
  }

  return SURFACE_NORMAL.copy(fallbackDirection).multiplyScalar(-1).normalize();
}

function disposeMesh(root) {
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

function createProjectileMesh() {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(PROJECTILE_RADIUS, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0x4b5560,
      roughness: 0.85,
      metalness: 0.08,
    }),
  );
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.038, 0.038, 0.048, 12),
    new THREE.MeshStandardMaterial({
      color: 0x7b8b96,
      roughness: 0.7,
      metalness: 0.18,
    }),
  );
  band.rotation.z = Math.PI * 0.5;
  band.position.y = PROJECTILE_RADIUS * 0.32;
  group.add(band);

  return group;
}

export class SmokeGrenadeManager {
  constructor(scene = null, collisionWorld = null, effectsManager = null) {
    this.scene = scene ?? null;
    this.collisionWorld = collisionWorld ?? null;
    this.effectsManager = effectsManager ?? null;
    this.projectiles = [];
  }

  spawn({
    origin = null,
    direction = null,
    inheritedVelocity = null,
    speed = 9.2,
  } = {}) {
    if (!this.scene || !origin || !direction) {
      return false;
    }

    THROW_DIRECTION.copy(direction);
    if (THROW_DIRECTION.lengthSq() <= 1e-6) {
      THROW_DIRECTION.set(0, 0.15, -1);
    }
    THROW_DIRECTION.normalize();

    const mesh = createProjectileMesh();
    mesh.position.copy(origin);
    this.scene.add(mesh);

    const velocity = THROW_DIRECTION.clone().multiplyScalar(speed);
    if (inheritedVelocity) {
      velocity.addScaledVector(inheritedVelocity, 0.35);
    }

    this.projectiles.push({
      mesh,
      position: origin.clone(),
      velocity,
      age: 0,
      settled: false,
      settledAt: null,
    });
    return true;
  }

  detonate(projectile) {
    this.effectsManager?.addSmokeCloud?.(projectile.position, {
      duration: 14,
    });
  }

  updateProjectile(projectile, delta) {
    projectile.age += delta;

    const steps = Math.max(1, Math.ceil(delta / SUBSTEP_MAX_DT));
    const stepDelta = delta / steps;

    for (let index = 0; index < steps; index += 1) {
      projectile.velocity.y -= PROJECTILE_GRAVITY * stepDelta;
      const movement = projectile.velocity.clone().multiplyScalar(stepDelta);
      const distance = movement.length();
      if (distance <= 1e-6) {
        continue;
      }

      MOVE_DIRECTION.copy(movement).divideScalar(distance);
      const hit = this.collisionWorld?.raycast?.(
        projectile.position,
        MOVE_DIRECTION,
        distance + PROJECTILE_RADIUS,
      ) ?? null;

      if (!hit) {
        projectile.position.add(movement);
        continue;
      }

      const travelDistance = Math.max(0, Number(hit.distance ?? 0) - PROJECTILE_RADIUS);
      if (travelDistance > 1e-5) {
        projectile.position.addScaledVector(MOVE_DIRECTION, travelDistance);
      }

      const normal = getImpactNormal(hit, MOVE_DIRECTION);
      projectile.position.addScaledVector(normal, COLLISION_PUSH_EPSILON);

      const normalVelocity = projectile.velocity.dot(normal);
      VELOCITY_NORMAL.copy(normal).multiplyScalar(normalVelocity);
      VELOCITY_TANGENT.copy(projectile.velocity).sub(VELOCITY_NORMAL);
      projectile.velocity.copy(VELOCITY_TANGENT.multiplyScalar(PROJECTILE_FRICTION));

      if (normalVelocity < 0) {
        const bounceSpeed = -normalVelocity * PROJECTILE_RESTITUTION;
        if (bounceSpeed >= PROJECTILE_MIN_BOUNCE_SPEED) {
          projectile.velocity.addScaledVector(normal, bounceSpeed);
        }
      }

      if (normal.y > 0.45 && projectile.velocity.length() <= PROJECTILE_STOP_SPEED) {
        projectile.velocity.set(0, 0, 0);
        projectile.settled = true;
        projectile.settledAt ??= projectile.age;
      }
    }

    projectile.mesh.position.copy(projectile.position);
    projectile.mesh.rotation.x += delta * 5.6;
    projectile.mesh.rotation.z += delta * 4.3;

    const settleDetonateAge = projectile.settledAt == null
      ? Infinity
      : Math.max(PROJECTILE_MIN_FUSE_SECONDS, projectile.settledAt + PROJECTILE_POST_SETTLE_BLOOM_DELAY);

    if (projectile.settled && projectile.age >= settleDetonateAge) {
      return 'detonate';
    }
    if (projectile.age >= PROJECTILE_MAX_LIFETIME) {
      return 'expire';
    }

    return null;
  }

  update(delta) {
    this.projectiles = this.projectiles.filter((projectile) => {
      const result = this.updateProjectile(projectile, delta);
      if (!result) {
        return true;
      }

      if (result === 'detonate') {
        this.detonate(projectile);
      }
      disposeMesh(projectile.mesh);
      return false;
    });
  }

  destroy() {
    for (const projectile of this.projectiles) {
      disposeMesh(projectile.mesh);
    }
    this.projectiles = [];
  }
}
