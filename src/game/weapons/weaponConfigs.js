import { SHARED_WEAPON_DATA } from '../../shared/weaponData.js';

export const BASE_FOV = 75;
const VIEWMODEL_TUNING_STORAGE_KEY = 'fpsViewModelTuning.v1';
const RECOIL_TUNING_STORAGE_KEY = 'fpsRecoilTuning.v1';

export const WEAPON_CONFIGS = {
  rifle: {
    ...SHARED_WEAPON_DATA.rifle,
    slot: 'Digit1',
    label: 'Rifle',
    fireSound: 'rifle-fire',
    equipSound: 'rifle-equip',
    zoomFov: 52,
    swayScale: 1,
    hasScopeOverlay: false,
    hasAdsReticle: true,
    hideViewModelWhenScoped: false,
    aimRecoilFactor: 0.15,
    viewModel: {
      position: { x: -0.1, y: -0.36, z: -1.06 },
      rotation: { x: -0.06, y: -0.1, z: -0.02 },
      muzzle: { x: 0.676, y: 0.008, z: -1.265 },
      recoilY: 0.03,
      recoilZ: 0.1,
    },
    aimViewModel: {
      position: { x: -0.675, y: -0.25, z: -0.87 },
      rotation: { x: 0.03, y: 0, z: 0 },
      muzzle: { x: 0.676, y: 0.088, z: -1.265 },
    },
  },
  pistol: {
    ...SHARED_WEAPON_DATA.pistol,
    slot: 'Digit2',
    label: 'Pistol',
    fireSound: 'rifle-fire',
    zoomFov: 58,
    swayScale: 0.9,
    hasScopeOverlay: false,
    hasAdsReticle: true,
    hideViewModelWhenScoped: false,
    aimRecoilFactor: 0.3,
    viewModel: {
      position: { x: -0.066, y: -0.375, z: -1.015 },
      rotation: { x: -0.02, y: 0.04, z: 0.02 },
      muzzle: { x: 0.694, y: 0.092, z: -0.971 },
      recoilY: 0.02,
      recoilZ: 0.08,
    },
    aimViewModel: {
      position: { x: -0.656, y: -0.221, z: -0.838 },
      rotation: { x: 0, y: -0.005, z: 0 },
      muzzle: { x: 0.65, y: 0.11, z: -0.92 },
    },
  },
  sniper: {
    ...SHARED_WEAPON_DATA.sniper,
    slot: 'Digit4',
    label: 'Sniper',
    fireSound: 'sniper-fire',
    zoomSound: 'sniper-zoom',
    zoomFov: 18,
    swayScale: 0.7,
    hasScopeOverlay: true,
    hasAdsReticle: false,
    hideViewModelWhenScoped: true,
    aimRecoilFactor: 1,
    viewModel: {
      position: { x: 0.24, y: -0.26, z: -0.68 },
      rotation: { x: -0.08, y: -0.17, z: -0.04 },
      muzzle: { x: 0, y: 0, z: -1.93 },
      recoilY: 0.018,
      recoilZ: 0.14,
    },
    aimViewModel: {
      position: { x: 0.24, y: -0.26, z: -0.44 },
      rotation: { x: -0.08, y: -0.17, z: -0.04 },
      muzzle: { x: 0, y: 0, z: -1.93 },
    },
  },
  knife: {
    ...SHARED_WEAPON_DATA.knife,
    slot: 'Digit3',
    label: 'Knife',
    fireSound: 'knife-slash',
    equipSound: 'knife-draw',
    zoomFov: BASE_FOV,
    swayScale: 1.2,
    hasScopeOverlay: false,
    hasAdsReticle: false,
    hideViewModelWhenScoped: false,
    aimRecoilFactor: 0,
    viewModel: {
      position: { x: -0.03, y: -0.32, z: -1.31 },
      rotation: { x: 0.18, y: -0.26, z: -0.04 },
      muzzle: { x: 0.28, y: 0.04, z: -0.3 },
      recoilY: 0,
      recoilZ: 0,
    },
    aimViewModel: {
      position: { x: -0.03, y: -0.32, z: -1.31 },
      rotation: { x: 0.18, y: -0.26, z: -0.04 },
      muzzle: { x: 0.28, y: 0.04, z: -0.3 },
    },
  },
  bomb: {
    ...SHARED_WEAPON_DATA.bomb,
    slot: 'Digit5',
    label: 'C4 Explosive',
    zoomFov: BASE_FOV,
    swayScale: 0.7,
    hasScopeOverlay: false,
    hasAdsReticle: false,
    hideViewModelWhenScoped: false,
    aimRecoilFactor: 0,
    viewModel: {
      position: { x: -0.02, y: -0.34, z: -1.04 },
      rotation: { x: 0.02, y: 0.04, z: 0.01 },
      muzzle: { x: 0, y: 0, z: -0.4 },
      recoilY: 0,
      recoilZ: 0,
    },
    aimViewModel: {
      position: { x: -0.02, y: -0.34, z: -1.04 },
      rotation: { x: 0.02, y: 0.04, z: 0.01 },
      muzzle: { x: 0, y: 0, z: -0.4 },
    },
  },
};

const WEAPONS_BY_SLOT = Object.values(WEAPON_CONFIGS).reduce((slots, weapon) => {
  slots.set(weapon.slot, weapon);
  return slots;
}, new Map());

const DEFAULT_VIEWMODEL_POSES = Object.fromEntries(
  Object.entries(WEAPON_CONFIGS).map(([weaponKey, weapon]) => [
    weaponKey,
    {
      viewModel: structuredClone(weapon.viewModel),
      aimViewModel: structuredClone(weapon.aimViewModel ?? weapon.viewModel),
    },
  ]),
);
const DEFAULT_RECOIL_TUNING = Object.fromEntries(
  Object.entries(WEAPON_CONFIGS).map(([weaponKey, weapon]) => [
    weaponKey,
    {
      hipfireSpread: Number(weapon.hipfireSpread ?? 0),
      visualRecoil: structuredClone(weapon.visualRecoil ?? null),
      sprayRecoil: structuredClone(weapon.sprayRecoil ?? null),
    },
  ]),
);

function clonePose(pose) {
  return {
    position: { ...pose.position },
    rotation: { ...pose.rotation },
    muzzle: { ...(pose.muzzle ?? { x: 0, y: 0, z: 0 }) },
    recoilY: pose.recoilY ?? 0,
    recoilZ: pose.recoilZ ?? 0,
  };
}

function persistViewModelTuning() {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = Object.fromEntries(
    Object.entries(WEAPON_CONFIGS).map(([weaponKey, weapon]) => [
      weaponKey,
      {
        viewModel: clonePose(weapon.viewModel),
        aimViewModel: clonePose(weapon.aimViewModel ?? weapon.viewModel),
      },
    ]),
  );

  window.localStorage.setItem(VIEWMODEL_TUNING_STORAGE_KEY, JSON.stringify(payload));
}

function persistRecoilTuning() {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = Object.fromEntries(
    Object.entries(WEAPON_CONFIGS).map(([weaponKey, weapon]) => [
      weaponKey,
      {
        hipfireSpread: Number(weapon.hipfireSpread ?? 0),
        visualRecoil: structuredClone(weapon.visualRecoil ?? null),
        sprayRecoil: structuredClone(weapon.sprayRecoil ?? null),
      },
    ]),
  );

  window.localStorage.setItem(RECOIL_TUNING_STORAGE_KEY, JSON.stringify(payload));
}

function applyStoredViewModelTuning() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const raw = window.localStorage.getItem(VIEWMODEL_TUNING_STORAGE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    for (const [weaponKey, value] of Object.entries(parsed ?? {})) {
      const weapon = WEAPON_CONFIGS[weaponKey];
      if (!weapon) {
        continue;
      }

        for (const poseKey of ['viewModel', 'aimViewModel']) {
        const sourcePose = value?.[poseKey];
        const targetPose = weapon[poseKey];
        if (!sourcePose || !targetPose) {
          continue;
        }

        for (const axis of ['x', 'y', 'z']) {
          if (Number.isFinite(sourcePose.position?.[axis])) {
            targetPose.position[axis] = sourcePose.position[axis];
          }
          if (Number.isFinite(sourcePose.rotation?.[axis])) {
            targetPose.rotation[axis] = sourcePose.rotation[axis];
          }
          if (Number.isFinite(sourcePose.muzzle?.[axis])) {
            targetPose.muzzle[axis] = sourcePose.muzzle[axis];
          }
        }
      }
    }
  } catch (error) {
    console.warn('[weaponConfigs] Failed to load viewmodel tuning.', error);
  }
}

function applyStoredRecoilTuning() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const raw = window.localStorage.getItem(RECOIL_TUNING_STORAGE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    for (const [weaponKey, value] of Object.entries(parsed ?? {})) {
      const weapon = WEAPON_CONFIGS[weaponKey];
      if (!weapon) {
        continue;
      }

      if (Number.isFinite(value?.hipfireSpread)) {
        weapon.hipfireSpread = Number(value.hipfireSpread);
      }

      for (const groupKey of ['visualRecoil', 'sprayRecoil']) {
        const sourceGroup = value?.[groupKey];
        const targetGroup = weapon[groupKey];
        if (!sourceGroup || !targetGroup) {
          continue;
        }

        for (const [entryKey, entryValue] of Object.entries(sourceGroup)) {
          if (Number.isFinite(entryValue)) {
            targetGroup[entryKey] = entryValue;
          }
        }
      }
    }
  } catch (error) {
    console.warn('[weaponConfigs] Failed to load recoil tuning.', error);
  }
}

applyStoredViewModelTuning();
applyStoredRecoilTuning();

export function getWeaponConfigBySlot(slot) {
  return WEAPONS_BY_SLOT.get(slot) ?? null;
}

export function setViewModelTransformValue(weaponKey, poseKey, kind, axis, value) {
  const weapon = WEAPON_CONFIGS[weaponKey];
  const pose = weapon?.[poseKey];
  if (!weapon || !pose || !Number.isFinite(value)) {
    return;
  }

  pose[kind][axis] = value;
  persistViewModelTuning();
}

export function copyViewModelPose(weaponKey, fromPoseKey, toPoseKey) {
  const weapon = WEAPON_CONFIGS[weaponKey];
  const sourcePose = weapon?.[fromPoseKey];
  const targetPose = weapon?.[toPoseKey];
  if (!weapon || !sourcePose || !targetPose) {
    return;
  }

  targetPose.position = { ...sourcePose.position };
  targetPose.rotation = { ...sourcePose.rotation };
  persistViewModelTuning();
}

export function resetViewModelTuning(weaponKey = null) {
  const keys = weaponKey ? [weaponKey] : Object.keys(WEAPON_CONFIGS);
  for (const key of keys) {
    const weapon = WEAPON_CONFIGS[key];
    const defaults = DEFAULT_VIEWMODEL_POSES[key];
    if (!weapon || !defaults) {
      continue;
    }
    weapon.viewModel = clonePose(defaults.viewModel);
    weapon.aimViewModel = clonePose(defaults.aimViewModel);
  }

  if (typeof window !== 'undefined') {
    if (weaponKey) {
      persistViewModelTuning();
    } else {
      window.localStorage.removeItem(VIEWMODEL_TUNING_STORAGE_KEY);
    }
  }
}

export function setRecoilConfigValue(weaponKey, groupKey, entryKey, value) {
  const weapon = WEAPON_CONFIGS[weaponKey];
  if (!weapon || !Number.isFinite(value)) {
    return;
  }

  if (groupKey === 'root') {
    weapon[entryKey] = value;
    persistRecoilTuning();
    return;
  }

  const group = weapon?.[groupKey];
  if (!group) {
    return;
  }

  group[entryKey] = value;
  persistRecoilTuning();
}

export function resetRecoilTuning(weaponKey = null) {
  const keys = weaponKey ? [weaponKey] : Object.keys(WEAPON_CONFIGS);
  for (const key of keys) {
    const weapon = WEAPON_CONFIGS[key];
    const defaults = DEFAULT_RECOIL_TUNING[key];
    if (!weapon || !defaults) {
      continue;
    }

    weapon.hipfireSpread = Number(defaults.hipfireSpread ?? weapon.hipfireSpread ?? 0);
    weapon.visualRecoil = structuredClone(defaults.visualRecoil ?? null);
    weapon.sprayRecoil = structuredClone(defaults.sprayRecoil ?? null);
  }

  if (typeof window !== 'undefined') {
    if (weaponKey) {
      persistRecoilTuning();
    } else {
      window.localStorage.removeItem(RECOIL_TUNING_STORAGE_KEY);
    }
  }
}
