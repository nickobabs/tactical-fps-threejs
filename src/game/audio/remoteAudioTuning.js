import { REMOTE_FOOTSTEP_AUDIO } from '../../shared/audioEvents.js';

const REMOTE_AUDIO_TUNING_STORAGE_KEY = 'tactical-fps-threejs-remote-audio-tuning';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getDefaultRemoteAudioTuning() {
  return {
    footstep: {
      baseVolume: Number(REMOTE_FOOTSTEP_AUDIO.walk.baseVolume ?? 0.6),
      minDistance: Number(REMOTE_FOOTSTEP_AUDIO.walk.minDistance ?? 1.1),
      maxDistance: Number(REMOTE_FOOTSTEP_AUDIO.walk.maxDistance ?? 27),
      attenuationHoldExponent: Number(REMOTE_FOOTSTEP_AUDIO.walk.attenuationHoldExponent ?? 0.6),
      attenuationCutoffStart: Number(REMOTE_FOOTSTEP_AUDIO.walk.attenuationCutoffStart ?? 0.82),
      attenuationCutoffExponent: Number(REMOTE_FOOTSTEP_AUDIO.walk.attenuationCutoffExponent ?? 3.2),
    },
  };
}

const REMOTE_AUDIO_TUNING = getDefaultRemoteAudioTuning();

function persistRemoteAudioTuning() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(REMOTE_AUDIO_TUNING_STORAGE_KEY, JSON.stringify(REMOTE_AUDIO_TUNING));
}

function applyRemoteAudioTuningValue(groupKey, entryKey, value) {
  if (!REMOTE_AUDIO_TUNING[groupKey]) {
    return;
  }

  REMOTE_AUDIO_TUNING[groupKey][entryKey] = value;
  persistRemoteAudioTuning();
}

function loadRemoteAudioTuning() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    const raw = window.localStorage.getItem(REMOTE_AUDIO_TUNING_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    const footstep = parsed?.footstep ?? null;
    if (!footstep) {
      return;
    }
    if (Number.isFinite(footstep.baseVolume)) {
      REMOTE_AUDIO_TUNING.footstep.baseVolume = clamp(Number(footstep.baseVolume), 0, 1);
    }
    if (Number.isFinite(footstep.minDistance)) {
      REMOTE_AUDIO_TUNING.footstep.minDistance = clamp(Number(footstep.minDistance), 0.1, 10);
    }
    if (Number.isFinite(footstep.maxDistance)) {
      REMOTE_AUDIO_TUNING.footstep.maxDistance = clamp(Number(footstep.maxDistance), 1, 60);
    }
    if (Number.isFinite(footstep.attenuationHoldExponent)) {
      REMOTE_AUDIO_TUNING.footstep.attenuationHoldExponent = clamp(Number(footstep.attenuationHoldExponent), 0.05, 3);
    }
    if (Number.isFinite(footstep.attenuationCutoffStart)) {
      REMOTE_AUDIO_TUNING.footstep.attenuationCutoffStart = clamp(Number(footstep.attenuationCutoffStart), 0.4, 0.99);
    }
    if (Number.isFinite(footstep.attenuationCutoffExponent)) {
      REMOTE_AUDIO_TUNING.footstep.attenuationCutoffExponent = clamp(Number(footstep.attenuationCutoffExponent), 0.1, 12);
    }
  } catch (error) {
    console.warn('[remoteAudioTuning] Failed to load remote audio tuning.', error);
  }
}

export function setRemoteAudioTuningValue(groupKey, entryKey, value) {
  applyRemoteAudioTuningValue(groupKey, entryKey, value);
}

export function resetRemoteAudioTuning() {
  const defaults = getDefaultRemoteAudioTuning();
  REMOTE_AUDIO_TUNING.footstep = { ...defaults.footstep };
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(REMOTE_AUDIO_TUNING_STORAGE_KEY);
  }
}

loadRemoteAudioTuning();

export { REMOTE_AUDIO_TUNING };
