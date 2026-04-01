export const PLAYER_MAX_HEALTH = 100;
export const PLAYER_RESPAWN_DELAY_MS = 2000;

export const SHARED_WEAPON_DATA = {
  rifle: {
    key: 'rifle',
    damage: 5,
    fireInterval: 0.095,
    automatic: true,
    canScope: true,
    hipfireSpread: 0,
    movementSpeedMultiplier: 1,
  },
  sniper: {
    key: 'sniper',
    damage: 35,
    fireInterval: 1.25,
    automatic: false,
    canScope: true,
    hipfireSpread: 0.05,
    movementSpeedMultiplier: 0.96,
  },
  knife: {
    key: 'knife',
    damage: 25,
    meleeRange: 2.2,
    fireInterval: 0.42,
    automatic: false,
    canScope: false,
    hipfireSpread: 0,
    movementSpeedMultiplier: 1.2,
  },
};

export function getSharedWeaponData(weaponKey) {
  return SHARED_WEAPON_DATA[weaponKey] ?? null;
}
