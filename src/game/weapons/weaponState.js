import { getWeaponConfigBySlot } from './weaponConfigs.js';

export function getWeaponSwapSelection(justPressed) {
  for (const key of justPressed) {
    const weapon = getWeaponConfigBySlot(key);
    if (weapon) {
      return weapon.key;
    }
  }

  return null;
}

export function getScopeState(currentWeapon, mouseButtons, debugForceAdsPreview) {
  const isScoped = currentWeapon.canScope !== false && (mouseButtons.has(2) || debugForceAdsPreview);
  return {
    isScoped,
    showScopeOverlay: isScoped && currentWeapon.hasScopeOverlay,
    showAdsReticle: isScoped && currentWeapon.hasAdsReticle,
  };
}

export function shouldPlayScopeSound({
  activeWeaponKey,
  isScoped,
  wasScoped,
  currentWeapon,
}) {
  return activeWeaponKey === 'sniper' && isScoped !== wasScoped && Boolean(currentWeapon.zoomSound);
}

export function canWeaponFire({
  currentWeapon,
  canViewModelFire,
  leftHeld,
  triggerHeld,
  cooldown,
  isReloading = false,
  ammoInMagazine = Infinity,
}) {
  if (currentWeapon.canFire === false || cooldown !== 0 || !canViewModelFire || isReloading) {
    return false;
  }

  if (Number(currentWeapon.magazineSize ?? 0) > 0 && ammoInMagazine <= 0) {
    return false;
  }

  return currentWeapon.automatic ? leftHeld : leftHeld && !triggerHeld;
}
