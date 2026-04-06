import { SHARED_WEAPON_DATA } from '../../shared/weaponData.js';

export const BASE_FOV = 75;
const VIEWMODEL_TUNING_STORAGE_KEY = 'fpsViewModelTuning.v1';

export const WEAPON_CONFIGS = {
  rifle: {
    ...SHARED_WEAPON_DATA.rifle,
    slot: 'Digit1',
    label: 'Rifle',
    fireSound: 'rifle-fire',
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
  sniper: {
    ...SHARED_WEAPON_DATA.sniper,
    slot: 'Digit2',
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

applyStoredViewModelTuning();

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
