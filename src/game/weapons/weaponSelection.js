import { WEAPON_CONFIGS } from './weaponConfigs.js';

export function getWeaponSelectionState(activeWeaponKey, weaponKey) {
  const nextWeapon = WEAPON_CONFIGS[weaponKey];
  if (!nextWeapon || activeWeaponKey === weaponKey) {
    return null;
  }

  return {
    activeWeaponKey: weaponKey,
    currentWeapon: nextWeapon,
    activeWeapon: nextWeapon.label,
    isScoped: false,
    showScopeOverlay: false,
    showAdsReticle: false,
    cooldown: 0,
    recoil: 0,
    triggerHeld: false,
    wasScoped: false,
  };
}

export function applyActiveViewModelSelection({
  currentViewModel,
  currentViewModelController,
  viewModels,
  weaponKey,
  currentWeapon,
}) {
  if (currentViewModel) {
    currentViewModel.visible = false;
  }

  if (currentViewModelController?.group) {
    currentViewModelController.group.visible = false;
  }

  const activeViewModel = viewModels[weaponKey];
  activeViewModel.group.visible = true;
  activeViewModel.setMuzzleOffset?.(currentWeapon.viewModel.muzzle);
  activeViewModel.onSelected?.();

  return {
    viewModel: activeViewModel.group,
    viewModelController: activeViewModel,
    muzzle: activeViewModel.muzzle,
    muzzleFlash: activeViewModel.muzzleFlash,
  };
}
