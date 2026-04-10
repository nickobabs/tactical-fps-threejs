const MOVEMENT_TUNING_STORAGE_KEY = 'fpsMovementTuning.v1';

const DEFAULT_MOVEMENT_TUNING = {
  footstepStrideDistanceWalk: 1.995,
  footstepStrideDistanceCrouch: 2.57,
  footstepMinHorizontalSpeed: 0.45,
  footstepVolumeWalk: 0.52,
  footstepVolumeCrouch: 0.34,
  footstepPitchMinWalk: 1,
  footstepPitchMaxWalk: 1,
  footstepPitchMinCrouch: 1,
  footstepPitchMaxCrouch: 1,
  footstepDurationWalk: 0.24,
  footstepDurationCrouch: 0.22,
  footstepMinIntervalWalkMs: 60,
  footstepMinIntervalCrouchMs: 80,
  bobAttack: 2.4,
  bobDamp: 8.5,
  bobOffsetX: 0.024,
  bobOffsetY: 0,
  bobRotationX: 0,
  bobRotationY: 0.016,
  bobRotationZ: -0.038,
  movePullBack: 0.055,
};

export const MOVEMENT_TUNING = {
  ...DEFAULT_MOVEMENT_TUNING,
};

function persistMovementTuning() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(MOVEMENT_TUNING_STORAGE_KEY, JSON.stringify(MOVEMENT_TUNING));
}

function applyStoredMovementTuning() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const raw = window.localStorage.getItem(MOVEMENT_TUNING_STORAGE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    for (const [key, value] of Object.entries(parsed ?? {})) {
      if (Number.isFinite(value) && key in MOVEMENT_TUNING) {
        MOVEMENT_TUNING[key] = Number(value);
      }
    }
  } catch (error) {
    console.warn('[movementTuning] Failed to load movement tuning.', error);
  }
}

applyStoredMovementTuning();

export function setMovementTuningValue(key, value) {
  if (!(key in MOVEMENT_TUNING) || !Number.isFinite(value)) {
    return;
  }

  MOVEMENT_TUNING[key] = Number(value);
  persistMovementTuning();
}

export function resetMovementTuning() {
  for (const [key, value] of Object.entries(DEFAULT_MOVEMENT_TUNING)) {
    MOVEMENT_TUNING[key] = value;
  }

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(MOVEMENT_TUNING_STORAGE_KEY);
  }
}
