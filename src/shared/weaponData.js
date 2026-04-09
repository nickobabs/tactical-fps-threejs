export const PLAYER_MAX_HEALTH = 100;
export const PLAYER_RESPAWN_DELAY_MS = 2000;

export const SHARED_WEAPON_DATA = {
  rifle: {
    key: 'rifle',
    damage: 5,
    fireInterval: 1 / 8,
    automatic: true,
    canScope: true,
    hipfireSpread: 0,
    movementSpeedMultiplier: 1,
    magazineSize: 30,
    reserveAmmo: 90,
    reloadTime: 2.45,
    visualRecoil: {
      warmupShots: 4,
      initialPitch: 0.024,
      warmupPitch: 0.036,
      curveShots: 8,
      maxPitch: 0.14,
      shotResetDelay: 0.22,
      recoveryFast: 16,
      recoverySlow: 6.5,
    },
  },
  pistol: {
    key: 'pistol',
    damage: 14,
    fireInterval: 0.24,
    automatic: false,
    canScope: true,
    hipfireSpread: 0.012,
    movementSpeedMultiplier: 1.04,
    magazineSize: 12,
    reserveAmmo: 36,
    reloadTime: 1.9,
  },
  sniper: {
    key: 'sniper',
    damage: 35,
    fireInterval: 1.25,
    automatic: false,
    canScope: true,
    hipfireSpread: 0.05,
    movementSpeedMultiplier: 0.96,
    magazineSize: 5,
    reserveAmmo: 20,
    reloadTime: 3.1,
  },
  knife: {
    key: 'knife',
    damage: 25,
    meleeRange: 2.2,
    fireInterval: 0.42,
    automatic: false,
    canScope: false,
    hipfireSpread: 0,
    movementSpeedMultiplier: 1.25,
    magazineSize: 0,
    reserveAmmo: 0,
    reloadTime: 0,
  },
};

export function getSharedWeaponData(weaponKey) {
  return SHARED_WEAPON_DATA[weaponKey] ?? null;
}
