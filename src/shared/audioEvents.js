export const REMOTE_AUDIO_DEFAULTS = {
  minDistance: 1.5,
  maxDistance: 24,
  rolloffExponent: 1.05,
};

export const REMOTE_FOOTSTEP_AUDIO = {
  walk: {
    soundPrefix: 'footstep-floor-',
    baseVolume: 0.6,
    minDistance: 1.1,
    maxDistance: 28,
    rolloffExponent: 2.1,
    attenuationHoldExponent: 0.6,
    attenuationCutoffStart: 0.4,
    attenuationCutoffExponent: 3.2,
  },
};

export const REMOTE_WEAPON_AUDIO = {
  rifle: {
    soundKey: 'rifle-fire',
    baseVolume: 0.6,
    minDistance: 2.5,
    maxDistance: 52,
    rolloffExponent: 1.02,
  },
  pistol: {
    soundKey: 'rifle-fire',
    baseVolume: 0.5,
    minDistance: 2,
    maxDistance: 19,
    rolloffExponent: 1.08,
  },
  sniper: {
    soundKey: 'sniper-fire',
    baseVolume: 0.72,
    minDistance: 3,
    maxDistance: 65,
    rolloffExponent: 1.0,
  },
  knife: {
    soundKey: 'knife-slash',
    baseVolume: 0.5,
    minDistance: 1.2,
    maxDistance: 10,
    rolloffExponent: 1.2,
  },
};

export const REMOTE_UTILITY_AUDIO = {
  smokeBloom: {
    soundKey: 'smoke-bloom',
    baseVolume: 0.78,
    minDistance: 2.4,
    maxDistance: 22,
    rolloffExponent: 1.04,
  },
};

export const REMOTE_FOOTSTEP_SAMPLE_COUNT = 16;
export const REMOTE_FOOTSTEP_AUDIBLE_SPEED_FLOOR = 0.1;
export const REMOTE_FOOTSTEP_STRIDE_DISTANCE_WALK = 1.995;
export const REMOTE_FOOTSTEP_STRIDE_DISTANCE_CROUCH = 2.57;
export const REMOTE_FOOTSTEP_MIN_HORIZONTAL_SPEED = 0.45;

export function createRemoteAudioEvent(event = {}) {
  return {
    type: String(event?.type ?? ''),
    sourcePlayerId: event?.sourcePlayerId ? String(event.sourcePlayerId) : null,
    mapId: String(event?.mapId ?? 'training-ground'),
    soundKey: event?.soundKey ? String(event.soundKey) : null,
    position: {
      x: Number(event?.position?.x ?? 0),
      y: Number(event?.position?.y ?? 0),
      z: Number(event?.position?.z ?? 0),
    },
    baseVolume: Number(event?.baseVolume ?? 1),
    minDistance: Number(event?.minDistance ?? REMOTE_AUDIO_DEFAULTS.minDistance),
    maxDistance: Number(event?.maxDistance ?? REMOTE_AUDIO_DEFAULTS.maxDistance),
    rolloffExponent: Number(event?.rolloffExponent ?? REMOTE_AUDIO_DEFAULTS.rolloffExponent),
    attenuationHoldExponent: event?.attenuationHoldExponent == null
      ? null
      : Number(event.attenuationHoldExponent),
    attenuationCutoffStart: event?.attenuationCutoffStart == null
      ? null
      : Number(event.attenuationCutoffStart),
    attenuationCutoffExponent: event?.attenuationCutoffExponent == null
      ? null
      : Number(event.attenuationCutoffExponent),
    playback: event?.playback ? String(event.playback) : null,
    minIntervalMs: Number(event?.minIntervalMs ?? 0),
    pitchMin: Number(event?.pitchMin ?? 1),
    pitchMax: Number(event?.pitchMax ?? 1),
    duration: event?.duration == null ? null : Number(event.duration),
  };
}
