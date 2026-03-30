import * as THREE from 'three';
import { addImpactEffect, addMissTracer } from './weaponEffects.js';

const SHOT_OFFSET = new THREE.Vector2();
const FAR_POINT = new THREE.Vector3();
const KNIFE_HIT_POINT = new THREE.Vector3();

export function createFireContext() {
  return {
    shotOffset: new THREE.Vector2(),
  };
}

export function playWeaponAudio(audioManager, weaponKey, weapon) {
  if (!weapon.fireSound) {
    return;
  }

  audioManager?.play(weapon.fireSound, {
    baseVolume: weaponKey === 'sniper' ? 0.72 : weaponKey === 'knife' ? 0.5 : 0.6,
    pitchMin: weaponKey === 'sniper' ? 0.992 : weaponKey === 'knife' ? 0.94 : 0.95,
    pitchMax: weaponKey === 'sniper' ? 1.008 : weaponKey === 'knife' ? 1.08 : 1.06,
  });
}

export function applyHipfireSpread(weapon, isScoped, target = SHOT_OFFSET) {
  target.set(0, 0);

  if (weapon.hipfireSpread > 0 && !isScoped) {
    target.x = (Math.random() * 2 - 1) * weapon.hipfireSpread;
    target.y = (Math.random() * 2 - 1) * weapon.hipfireSpread;
  }

  return target;
}

export function fireHitscan({
  camera,
  scene,
  shootables,
  raycaster,
  temporaryObjects,
  muzzleWorld,
  weapon,
  isScoped,
}) {
  const shotOffset = applyHipfireSpread(weapon, isScoped);
  raycaster.layers.set(0);
  raycaster.setFromCamera(shotOffset, camera);
  const hit = raycaster.intersectObjects(shootables, false)[0];

  if (hit) {
    addImpactEffect(scene, temporaryObjects, muzzleWorld, hit);
    hit.object.userData.damageReceiver?.applyDamage(weapon.damage, hit.point, hit);
    return hit;
  }

  FAR_POINT.copy(raycaster.ray.origin)
    .addScaledVector(raycaster.ray.direction, 120);
  addMissTracer(scene, temporaryObjects, muzzleWorld, FAR_POINT);
  return null;
}

export function performKnifeHit({ camera, shootables, raycaster, weapon }) {
  raycaster.layers.set(0);
  raycaster.setFromCamera(SHOT_OFFSET.set(0, 0), camera);
  const hit = raycaster.intersectObjects(shootables, false)[0];
  if (!hit || hit.distance > weapon.meleeRange) {
    return null;
  }

  KNIFE_HIT_POINT.copy(hit.point);
  hit.object.userData.damageReceiver?.applyDamage(weapon.damage, KNIFE_HIT_POINT, hit);
  return hit;
}
