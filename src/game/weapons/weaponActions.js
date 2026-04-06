import { fireHitscan, performKnifeHit, playWeaponAudio } from './weaponFiring.js';

export function executeWeaponShot({
  activeWeaponKey,
  currentWeapon,
  audioManager,
  camera,
  scene,
  shootables,
  raycaster,
  temporaryObjects,
  muzzle,
  muzzleWorld,
  isScoped,
  authoritativeCombatEnabled,
  onFireRequest,
  viewModelController,
}) {
  playWeaponAudio(audioManager, activeWeaponKey, currentWeapon);

  muzzle.getWorldPosition(muzzleWorld);
  fireHitscan({
    camera,
    scene,
    shootables,
    raycaster,
    temporaryObjects,
    muzzleWorld,
    weapon: currentWeapon,
    isScoped,
    applyDamage: !authoritativeCombatEnabled,
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
