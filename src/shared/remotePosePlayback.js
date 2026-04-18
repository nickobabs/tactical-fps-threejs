import { REMOTE_CLIPS } from './remoteCharacterConfig.js';

export const REMOTE_BASE_CLIP_FADE_DURATION = 0.12;
export const REMOTE_UPPER_BODY_FADE_DURATION = 0.08;
export const REMOTE_UPPER_BODY_ACTION_DURATION = 0.22;
export const REMOTE_FULL_BODY_FIRE_ACTION_DURATION = 0.18;
export const REMOTE_PERSISTENT_ACTION_TIME = Number.POSITIVE_INFINITY;

function normalizeRemotePoseClipName(name) {
  return String(name ?? '')
    .split(/[|/\\]/)
    .pop()
    .trim()
    .toLowerCase();
}

export function prefersRemoteFullBodyFire(characterDefinition, weaponKey) {
  if (!characterDefinition) {
    return false;
  }
  if (weaponKey === 'rifle') {
    return Boolean(characterDefinition.prefersFullBodyRifleFire);
  }
  if (weaponKey === 'pistol') {
    return Boolean(characterDefinition.prefersFullBodyPistolFire);
  }
  return false;
}

export function shouldPlayRemoteFullBodyFire({
  characterDefinition = null,
  weaponKey = 'rifle',
  presentationState = 'idle',
} = {}) {
  return prefersRemoteFullBodyFire(characterDefinition, weaponKey)
    && ['idle', 'scoped-idle'].includes(String(presentationState ?? 'idle'));
}

export function shouldLockRemoteFireBaseClip({
  characterDefinition = null,
  weaponKey = 'rifle',
  targetClip = null,
  activeUpperBodyClip = null,
  upperBodyActionTime = 0,
  clips = REMOTE_CLIPS,
} = {}) {
  if (!prefersRemoteFullBodyFire(characterDefinition, weaponKey)) {
    return false;
  }

  if (normalizeRemotePoseClipName(targetClip) !== normalizeRemotePoseClipName(clips.idle)) {
    return false;
  }

  const isFireOverlayActive = normalizeRemotePoseClipName(activeUpperBodyClip) === normalizeRemotePoseClipName(clips.fire)
    && Number(upperBodyActionTime ?? 0) > 0;
  return isFireOverlayActive;
}

export function createRemoteClipTransitionState() {
  return {
    fromClip: null,
    toClip: null,
    elapsed: 0,
    duration: REMOTE_BASE_CLIP_FADE_DURATION,
    alpha: 1,
    active: false,
  };
}

export function stepRemoteClipTransitionState(
  transitionState,
  {
    nextClip = null,
    currentClip = null,
    delta = 0,
    duration = REMOTE_BASE_CLIP_FADE_DURATION,
  } = {},
) {
  const state = transitionState ?? createRemoteClipTransitionState();
  const resolvedDuration = Math.max(0.0001, Number(duration ?? REMOTE_BASE_CLIP_FADE_DURATION));
  const normalizedNextClip = nextClip == null ? null : String(nextClip);
  const normalizedCurrentClip = currentClip == null ? null : String(currentClip);
  const resolvedCurrentClip = normalizedCurrentClip ?? state.toClip ?? normalizedNextClip;

  if (normalizedNextClip == null) {
    state.fromClip = null;
    state.toClip = null;
    state.elapsed = 0;
    state.duration = resolvedDuration;
    state.alpha = 1;
    state.active = false;
    return state;
  }

  if (state.toClip !== normalizedNextClip) {
    state.fromClip = resolvedCurrentClip;
    state.toClip = normalizedNextClip;
    state.elapsed = 0;
    state.duration = resolvedDuration;
    state.active = Boolean(state.fromClip) && state.fromClip !== normalizedNextClip;
    state.alpha = state.active ? 0 : 1;
    if (!state.active) {
      state.fromClip = null;
    }
    return state;
  }

  state.duration = resolvedDuration;
  if (!state.active) {
    state.alpha = 1;
    return state;
  }

  state.elapsed = Math.max(0, state.elapsed + Math.max(0, delta));
  state.alpha = Math.min(1, state.elapsed / resolvedDuration);
  if (state.alpha >= 1) {
    state.active = false;
    state.fromClip = null;
  }
  return state;
}
