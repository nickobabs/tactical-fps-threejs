import * as THREE from 'three';
import { pickKnifeSlashSoundKey } from '../../shared/audioEvents.js';
const SHOT_OFFSET = new THREE.Vector2();
const FAR_POINT = new THREE.Vector3();
const KNIFE_HIT_POINT = new THREE.Vector3();
const SPRAY_CURVE_OFFSET = new THREE.Vector2();

export function createFireContext() {
  return {
    shotOffset: new THREE.Vector2(),
  };
}

function resolveWeaponFireSoundKey(weaponKey, weapon) {
  const fireSound = String(weapon?.fireSound ?? '');
  if (!fireSound) {
    return null;
  }

  if (weaponKey === 'knife' && fireSound === 'knife-slash') {
    return pickKnifeSlashSoundKey();
  }

  return fireSound;
}

export function playWeaponAudio(audioManager, weaponKey, weapon) {
  const soundKey = resolveWeaponFireSoundKey(weaponKey, weapon);
  if (!soundKey) {
    return;
  }

  audioManager?.play(soundKey, {
    baseVolume: weaponKey === 'sniper' ? 0.4 : weaponKey === 'knife' ? 0.5 : weaponKey === 'pistol' ? 0.5 : 0.6,
    pitchMin: weaponKey === 'sniper' ? 0.992 : weaponKey === 'knife' ? 0.94 : weaponKey === 'pistol' ? 1.02 : 0.95,
    pitchMax: weaponKey === 'sniper' ? 1.008 : weaponKey === 'knife' ? 1.08 : weaponKey === 'pistol' ? 1.08 : 1.06,
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

export function applyMovementSpread(weapon, horizontalSpeed = 0, target = SHOT_OFFSET) {
  const movingSpread = Math.max(0, Number(weapon?.movingSpread ?? 0));
  const speedThreshold = Math.max(0, Number(weapon?.movingSpreadSpeedThreshold ?? Infinity));
  if (movingSpread <= 0 || !Number.isFinite(horizontalSpeed) || horizontalSpeed <= speedThreshold) {
    return target;
  }

  target.x += (Math.random() * 2 - 1) * movingSpread;
  target.y += (Math.random() * 2 - 1) * movingSpread;
  return target;
}

export function applyAirborneSpread(weapon, isGrounded = true, target = SHOT_OFFSET) {
  const airborneSpread = Math.max(0, Number(weapon?.airborneSpread ?? 0));
  if (airborneSpread <= 0 || isGrounded) {
    return target;
  }

  target.x += (Math.random() * 2 - 1) * airborneSpread;
  target.y += (Math.random() * 2 - 1) * airborneSpread;
  return target;
}

export function applyAdditionalSpread(spread = 0, target = SHOT_OFFSET) {
  const safeSpread = Math.max(0, Number(spread ?? 0));
  if (safeSpread <= 0) {
    return target;
  }

  target.x += (Math.random() * 2 - 1) * safeSpread;
  target.y += (Math.random() * 2 - 1) * safeSpread;
  return target;
}

export function applySprayRecoil(weapon, sprayShotCount = 1, target = SPRAY_CURVE_OFFSET) {
  target.set(0, 0);

  const sprayRecoil = weapon?.sprayRecoil;
  if (!sprayRecoil) {
    return target;
  }

  const warmupShots = Math.max(1, Number(sprayRecoil.warmupShots ?? 1));
  const maxShots = Math.max(warmupShots, Number(sprayRecoil.maxShots ?? warmupShots));
  const initialOffsetY = Math.max(0, Number(sprayRecoil.initialOffsetY ?? 0));
  const maxOffsetY = Math.max(initialOffsetY, Number(sprayRecoil.maxOffsetY ?? initialOffsetY));
  const shoulderShots = Math.max(warmupShots + 1, Number(sprayRecoil.shoulderShots ?? (warmupShots + 2)));
  const shoulderOffsetY = THREE.MathUtils.clamp(
    Number(sprayRecoil.shoulderOffsetY ?? initialOffsetY),
    initialOffsetY,
    maxOffsetY,
  );
  const riseSharpness = Math.max(0.25, Number(sprayRecoil.riseSharpness ?? 3));
  const horizontalStartShots = Math.max(
    warmupShots + 1,
    Number(sprayRecoil.horizontalStartShots ?? shoulderShots),
  );
  const maxOffsetX = Math.max(0, Number(sprayRecoil.maxOffsetX ?? 0));
  const horizontalExponent = Math.max(0.25, Number(sprayRecoil.horizontalExponent ?? 1));
  if (sprayShotCount <= warmupShots) {
    return target;
  }

  if (sprayShotCount <= shoulderShots) {
    const earlyAlpha = THREE.MathUtils.clamp(
      (sprayShotCount - (warmupShots + 1)) / Math.max(shoulderShots - (warmupShots + 1), 1),
      0,
      1,
    );
    target.y = THREE.MathUtils.lerp(initialOffsetY, shoulderOffsetY, earlyAlpha);
    return target;
  }

  const lateAlpha = THREE.MathUtils.clamp(
    (sprayShotCount - shoulderShots) / Math.max(maxShots - shoulderShots, 1),
    0,
    1,
  );
  const exponentialAlpha = (1 - Math.exp(-riseSharpness * lateAlpha))
    / (1 - Math.exp(-riseSharpness));
  target.y = THREE.MathUtils.lerp(shoulderOffsetY, maxOffsetY, exponentialAlpha);

  if (maxOffsetX > 0 && sprayShotCount >= horizontalStartShots) {
    const horizontalAlpha = THREE.MathUtils.clamp(
      (sprayShotCount - horizontalStartShots) / Math.max(maxShots - horizontalStartShots, 1),
      0,
      1,
    );
    const horizontalMagnitude = maxOffsetX * Math.pow(horizontalAlpha, horizontalExponent);
    target.x = (Math.random() * 2 - 1) * horizontalMagnitude;
  }
  return target;
}

export function fireHitscan({
  camera,
  shootables,
  raycaster,
  effectsManager,
  muzzleWorld,
  weapon,
  isScoped,
  applyDamage = true,
  sprayShotCount = 1,
  horizontalSpeed = 0,
  isGrounded = true,
  additionalSpread = 0,
}) {
  const shotOffset = applyHipfireSpread(weapon, isScoped);
  applyMovementSpread(weapon, horizontalSpeed, shotOffset);
  applyAirborneSpread(weapon, isGrounded, shotOffset);
  applyAdditionalSpread(additionalSpread, shotOffset);
  shotOffset.add(applySprayRecoil(weapon, sprayShotCount));
  raycaster.layers.set(0);
  raycaster.setFromCamera(shotOffset, camera);
  const hit = raycaster.intersectObjects(shootables, false)[0];

  if (hit) {
    effectsManager?.addImpactEffect?.(muzzleWorld, hit);
    if (applyDamage) {
      hit.object.userData.damageReceiver?.applyDamage(weapon.damage, hit.point, hit);
    }
    return hit;
  }

  FAR_POINT.copy(raycaster.ray.origin)
    .addScaledVector(raycaster.ray.direction, 120);
  effectsManager?.addMissTracer?.(muzzleWorld, FAR_POINT);
  return null;
}

export function performKnifeHit({
  camera,
  shootables,
  raycaster,
  weapon,
  applyDamage = true,
}) {
  raycaster.layers.set(0);
  raycaster.setFromCamera(SHOT_OFFSET.set(0, 0), camera);
  const hit = raycaster.intersectObjects(shootables, false)[0];
  if (!hit || hit.distance > weapon.meleeRange) {
    return null;
  }

  KNIFE_HIT_POINT.copy(hit.point);
  if (applyDamage) {
    hit.object.userData.damageReceiver?.applyDamage(weapon.damage, KNIFE_HIT_POINT, hit);
  }
  return hit;
}
