import { fireHitscan, performKnifeHit, playWeaponAudio } from './weaponFiring.js';

export function executeWeaponShot({
  activeWeaponKey,
  currentWeapon,
  audioManager,
  camera,
  shootables,
  raycaster,
  effectsManager,
  muzzle,
  muzzleWorld,
  isScoped,
  authoritativeCombatEnabled,
  onFireRequest,
  viewModelController,
  sprayShotCount = 1,
  horizontalSpeed = 0,
  isGrounded = true,
  additionalSpread = 0,
}) {
  playWeaponAudio(audioManager, activeWeaponKey, currentWeapon);

  muzzle.getWorldPosition(muzzleWorld);
  const hit = fireHitscan({
    camera,
    shootables,
    raycaster,
    effectsManager,
    muzzleWorld,
    weapon: currentWeapon,
    isScoped,
    applyDamage: !authoritativeCombatEnabled,
    sprayShotCount,
    horizontalSpeed,
    isGrounded,
    additionalSpread,
  });
  onFireRequest?.({
    weaponKey: activeWeaponKey,
    origin: muzzleWorld,
    direction: raycaster.ray.direction,
  });
  viewModelController?.playFire?.();
}

export function executeKnifeAttack({
  activeWeaponKey,
  currentWeapon,
  audioManager,
  camera,
  shootables,
  raycaster,
  muzzle,
  muzzleWorld,
  fireDirection,
  authoritativeCombatEnabled,
  onFireRequest,
  viewModelController,
}) {
  playWeaponAudio(audioManager, activeWeaponKey, currentWeapon);
  muzzle?.getWorldPosition?.(muzzleWorld);
  performKnifeHit({
    camera,
    shootables,
    raycaster,
    weapon: currentWeapon,
    applyDamage: !authoritativeCombatEnabled,
  });
  onFireRequest?.({
    weaponKey: activeWeaponKey,
    origin: muzzleWorld,
    direction: camera.getWorldDirection(fireDirection),
  });
  viewModelController?.playFire?.();
}
