import * as THREE from 'three';
import { computePlayerHitboxLayout, createPlayerHitboxLayout } from '../../../src/shared/playerHitboxes.js';
import { REMOTE_HITBOX_RADII } from '../../../src/shared/remoteHitboxes.js';
import { REMOTE_CLIPS } from '../../../src/shared/remoteCharacterConfig.js';

const TARGET_HITBOX_LAYOUT = createPlayerHitboxLayout();
const TARGET_SEGMENT = new THREE.Line3();
const CLOSEST_POINT_ON_RAY = new THREE.Vector3();
const CLOSEST_POINT_ON_SEGMENT = new THREE.Vector3();
const TARGET_POINT = new THREE.Vector3();
const TARGET_RIGHT = new THREE.Vector3();
const TARGET_FORWARD = new THREE.Vector3();
const TARGET_SHOULDER = new THREE.Vector3();
const TARGET_HAND = new THREE.Vector3();
const TARGET_LEG_START = new THREE.Vector3();
const TARGET_LEG_END = new THREE.Vector3();
const TARGET_DEATH_FORWARD = new THREE.Vector3();
const TARGET_TEST_VECTOR = new THREE.Vector3();

function getRayDistanceAlong(ray, point) {
  return TARGET_TEST_VECTOR.copy(point).sub(ray.origin).dot(ray.direction);
}

function getRaySphereHitDistance(ray, center, radius, maxDistance) {
  const projectedDistance = getRayDistanceAlong(ray, center);
  if (projectedDistance < -radius || projectedDistance >= maxDistance + radius) {
    return Infinity;
  }

  const distanceSq = ray.distanceSqToPoint(center);
  if (distanceSq > radius * radius) {
    return Infinity;
  }

  return Math.max(0, projectedDistance);
}

function getRayEllipsoidHitDistance(ray, ellipsoid, maxDistance) {
  const center = ellipsoid?.center ?? null;
  const size = ellipsoid?.size ?? null;
  const right = ellipsoid?.right ?? null;
  const up = ellipsoid?.up ?? null;
  const forward = ellipsoid?.forward ?? null;
  if (!center || !size || !right || !up || !forward) {
    return Infinity;
  }

  const halfX = Math.max(1e-6, Number(size.x ?? 0) * 0.5);
  const halfY = Math.max(1e-6, Number(size.y ?? 0) * 0.5);
  const halfZ = Math.max(1e-6, Number(size.z ?? 0) * 0.5);
  TARGET_TEST_VECTOR.set(
    Number(ray.origin.x ?? 0) - Number(center.x ?? 0),
    Number(ray.origin.y ?? 0) - Number(center.y ?? 0),
    Number(ray.origin.z ?? 0) - Number(center.z ?? 0),
  );
  TARGET_RIGHT.set(Number(right.x ?? 1), Number(right.y ?? 0), Number(right.z ?? 0)).normalize();
  TARGET_FORWARD.set(Number(up.x ?? 0), Number(up.y ?? 1), Number(up.z ?? 0)).normalize();
  TARGET_SHOULDER.set(Number(forward.x ?? 0), Number(forward.y ?? 0), Number(forward.z ?? -1)).normalize();

  const originX = TARGET_TEST_VECTOR.dot(TARGET_RIGHT) / halfX;
  const originY = TARGET_TEST_VECTOR.dot(TARGET_FORWARD) / halfY;
  const originZ = TARGET_TEST_VECTOR.dot(TARGET_SHOULDER) / halfZ;
  const directionX = ray.direction.dot(TARGET_RIGHT) / halfX;
  const directionY = ray.direction.dot(TARGET_FORWARD) / halfY;
  const directionZ = ray.direction.dot(TARGET_SHOULDER) / halfZ;

  const a = (directionX * directionX) + (directionY * directionY) + (directionZ * directionZ);
  const b = 2 * ((originX * directionX) + (originY * directionY) + (originZ * directionZ));
  const c = (originX * originX) + (originY * originY) + (originZ * originZ) - 1;
  const discriminant = (b * b) - (4 * a * c);
  if (a <= 1e-8 || discriminant < 0) {
    return Infinity;
  }

  const sqrtDiscriminant = Math.sqrt(discriminant);
  const nearDistance = (-b - sqrtDiscriminant) / (2 * a);
  const farDistance = (-b + sqrtDiscriminant) / (2 * a);
  const hitDistance = nearDistance >= 0 ? nearDistance : farDistance;
  if (!Number.isFinite(hitDistance) || hitDistance < 0 || hitDistance >= maxDistance) {
    return Infinity;
  }
  return hitDistance;
}

function getRayCapsuleHitDistance(ray, start, end, radius, maxDistance) {
  const distanceSq = ray.distanceSqToSegment(
    start,
    end,
    CLOSEST_POINT_ON_RAY,
    CLOSEST_POINT_ON_SEGMENT,
  );
  if (distanceSq > radius * radius) {
    return Infinity;
  }

  const hitDistance = getRayDistanceAlong(ray, CLOSEST_POINT_ON_RAY);
  if (hitDistance < 0 || hitDistance >= maxDistance) {
    return Infinity;
  }

  return hitDistance;
}

export function getWeaponDamageForHitZone(weapon, hitZone = 'body') {
  const damageByHitZone = weapon?.damageByHitZone ?? null;
  if (!damageByHitZone) {
    return Number(weapon?.damage ?? 0);
  }

  if (hitZone === 'head') {
    return Number(damageByHitZone.head ?? weapon.damage ?? 0);
  }

  if (hitZone === 'arms') {
    return Number(damageByHitZone.arms ?? damageByHitZone.body ?? weapon.damage ?? 0);
  }

  if (hitZone === 'legs') {
    return Number(damageByHitZone.legs ?? damageByHitZone.body ?? weapon.damage ?? 0);
  }

  return Number(damageByHitZone.body ?? weapon.damage ?? 0);
}

export function getDeathClipForShot(target, shotDirection) {
  if (!target?.motionState || !shotDirection) {
    return REMOTE_CLIPS.dieBackward;
  }

  TARGET_DEATH_FORWARD.set(
    -Math.sin(Number(target.motionState.yaw ?? 0)),
    0,
    -Math.cos(Number(target.motionState.yaw ?? 0)),
  );
  return TARGET_DEATH_FORWARD.dot(shotDirection) > 0
    ? REMOTE_CLIPS.dieForward
    : REMOTE_CLIPS.dieBackward;
}

export function getPlayerHitResult(ray, target, maxDistance, currentBestDistance) {
  const layout = computePlayerHitboxLayout({
    position: target.motionState.position,
    yaw: target.motionState?.yaw ?? 0,
    currentHeight: target.motionState?.currentHeight ?? 1.72,
    isCrouched: target.motionState?.isCrouched ?? false,
    activeWeaponKey: target.activeWeaponKey ?? 'rifle',
  }, TARGET_HITBOX_LAYOUT);

  let bestDistance = currentBestDistance;
  let bestHitZone = null;

  TARGET_POINT.set(layout.head.center.x, layout.head.center.y, layout.head.center.z);
  {
    const hitDistance = getRaySphereHitDistance(ray, TARGET_POINT, layout.head.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'head';
    }
  }

  TARGET_SEGMENT.start.set(layout.torso.start.x, layout.torso.start.y, layout.torso.start.z);
  TARGET_SEGMENT.end.set(layout.torso.end.x, layout.torso.end.y, layout.torso.end.z);
  {
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_SEGMENT.start, TARGET_SEGMENT.end, layout.torso.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'body';
    }
  }

  TARGET_SEGMENT.start.set(layout.pelvis.start.x, layout.pelvis.start.y, layout.pelvis.start.z);
  TARGET_SEGMENT.end.set(layout.pelvis.end.x, layout.pelvis.end.y, layout.pelvis.end.z);
  {
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_SEGMENT.start, TARGET_SEGMENT.end, layout.pelvis.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'body';
    }
  }

  for (const arm of layout.arms) {
    TARGET_SHOULDER.set(arm.start.x, arm.start.y, arm.start.z);
    TARGET_HAND.set(arm.end.x, arm.end.y, arm.end.z);
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_SHOULDER, TARGET_HAND, arm.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'arms';
    }
  }

  for (const leg of layout.legs) {
    TARGET_LEG_START.set(leg.start.x, leg.start.y, leg.start.z);
    TARGET_LEG_END.set(leg.end.x, leg.end.y, leg.end.z);
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_LEG_START, TARGET_LEG_END, leg.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'legs';
    }
  }

  return {
    distance: bestDistance,
    hitZone: bestHitZone,
  };
}

export function getAuthoritativeHitboxSnapshotResult(ray, hitboxes, maxDistance, currentBestDistance) {
  if (!hitboxes?.head || !hitboxes?.torso || !hitboxes?.pelvis) {
    return {
      distance: Infinity,
      hitZone: null,
    };
  }

  let bestDistance = currentBestDistance;
  let bestHitZone = null;

  TARGET_POINT.set(hitboxes.head.center.x, hitboxes.head.center.y, hitboxes.head.center.z);
  {
    const hitDistance = hitboxes.head?.size && hitboxes.head?.right && hitboxes.head?.up && hitboxes.head?.forward
      ? getRayEllipsoidHitDistance(ray, hitboxes.head, bestDistance)
      : getRaySphereHitDistance(ray, TARGET_POINT, Number(hitboxes.head.radius ?? REMOTE_HITBOX_RADII.head), bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'head';
    }
  }

  TARGET_SEGMENT.start.set(hitboxes.torso.start.x, hitboxes.torso.start.y, hitboxes.torso.start.z);
  TARGET_SEGMENT.end.set(hitboxes.torso.end.x, hitboxes.torso.end.y, hitboxes.torso.end.z);
  {
    const hitDistance = getRayCapsuleHitDistance(
      ray,
      TARGET_SEGMENT.start,
      TARGET_SEGMENT.end,
      Number(hitboxes.torso.radius ?? REMOTE_HITBOX_RADII.torso),
      bestDistance,
    );
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'body';
    }
  }

  TARGET_SEGMENT.start.set(hitboxes.pelvis.start.x, hitboxes.pelvis.start.y, hitboxes.pelvis.start.z);
  TARGET_SEGMENT.end.set(hitboxes.pelvis.end.x, hitboxes.pelvis.end.y, hitboxes.pelvis.end.z);
  {
    const hitDistance = getRayCapsuleHitDistance(
      ray,
      TARGET_SEGMENT.start,
      TARGET_SEGMENT.end,
      Number(hitboxes.pelvis.radius ?? REMOTE_HITBOX_RADII.pelvis),
      bestDistance,
    );
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'body';
    }
  }

  for (const arm of hitboxes.arms ?? []) {
    if (!arm?.start || !arm?.end) {
      continue;
    }
    TARGET_SHOULDER.set(arm.start.x, arm.start.y, arm.start.z);
    TARGET_HAND.set(arm.end.x, arm.end.y, arm.end.z);
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_SHOULDER, TARGET_HAND, Number(arm.radius ?? REMOTE_HITBOX_RADII.arm), bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'arms';
    }
  }

  for (const hand of hitboxes.hands ?? []) {
    if (!hand?.center) {
      continue;
    }
    TARGET_POINT.set(hand.center.x, hand.center.y, hand.center.z);
    const hitDistance = getRaySphereHitDistance(ray, TARGET_POINT, Number(hand.radius ?? REMOTE_HITBOX_RADII.hand), bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'arms';
    }
  }

  for (const leg of hitboxes.legs ?? []) {
    if (!leg?.start || !leg?.end) {
      continue;
    }
    TARGET_LEG_START.set(leg.start.x, leg.start.y, leg.start.z);
    TARGET_LEG_END.set(leg.end.x, leg.end.y, leg.end.z);
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_LEG_START, TARGET_LEG_END, Number(leg.radius ?? REMOTE_HITBOX_RADII.leg), bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'legs';
    }
  }

  return {
    distance: bestDistance,
    hitZone: bestHitZone,
  };
}
