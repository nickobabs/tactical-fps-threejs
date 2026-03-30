export const BASE_FOV = 75;

export const WEAPON_CONFIGS = {
  rifle: {
    key: 'rifle',
    slot: 'Digit1',
    label: 'Rifle',
    fireSound: 'rifle-fire',
    damage: 5,
    fireInterval: 0.095,
    automatic: true,
    canScope: true,
    zoomFov: 52,
    hipfireSpread: 0,
    swayScale: 1,
    hasScopeOverlay: false,
    hasAdsReticle: true,
    hideViewModelWhenScoped: false,
    aimRecoilFactor: 0.15,
    viewModel: {
      position: { x: 0.32, y: -0.32, z: -0.5 },
      rotation: { x: -0.16, y: -0.24, z: -0.08 },
      recoilY: 0.03,
      recoilZ: 0.1,
    },
    aimViewModel: {
      position: { x: 0, y: -0.145, z: -0.16 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    movementSpeedMultiplier: 1,
  },
  sniper: {
    key: 'sniper',
    slot: 'Digit2',
    label: 'Sniper',
    fireSound: 'sniper-fire',
    zoomSound: 'sniper-zoom',
    damage: 35,
    fireInterval: 1.25,
    automatic: false,
    canScope: true,
    zoomFov: 18,
    hipfireSpread: 0.05,
    swayScale: 0.7,
    hasScopeOverlay: true,
    hasAdsReticle: false,
    hideViewModelWhenScoped: true,
    aimRecoilFactor: 1,
    viewModel: {
      position: { x: 0.24, y: -0.26, z: -0.68 },
      rotation: { x: -0.08, y: -0.17, z: -0.04 },
      recoilY: 0.018,
      recoilZ: 0.14,
    },
    aimViewModel: {
      position: { x: 0.24, y: -0.26, z: -0.44 },
      rotation: { x: -0.08, y: -0.17, z: -0.04 },
    },
    movementSpeedMultiplier: 0.96,
  },
  knife: {
    key: 'knife',
    slot: 'Digit3',
    label: 'Knife',
    fireSound: 'knife-slash',
    damage: 25,
    meleeRange: 2.2,
    fireInterval: 0.42,
    automatic: false,
    canScope: false,
    zoomFov: BASE_FOV,
    hipfireSpread: 0,
    swayScale: 1.2,
    hasScopeOverlay: false,
    hasAdsReticle: false,
    hideViewModelWhenScoped: false,
    aimRecoilFactor: 0,
    viewModel: {
      position: { x: 0.22, y: -0.24, z: -0.34 },
      rotation: { x: 0.42, y: -0.62, z: -0.18 },
      recoilY: 0,
      recoilZ: 0,
    },
    aimViewModel: {
      position: { x: 0.22, y: -0.24, z: -0.34 },
      rotation: { x: 0.42, y: -0.62, z: -0.18 },
    },
    movementSpeedMultiplier: 1.2,
  },
};

const WEAPONS_BY_SLOT = Object.values(WEAPON_CONFIGS).reduce((slots, weapon) => {
  slots.set(weapon.slot, weapon);
  return slots;
}, new Map());

export function getWeaponConfigBySlot(slot) {
  return WEAPONS_BY_SLOT.get(slot) ?? null;
}
