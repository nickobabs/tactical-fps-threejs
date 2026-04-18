import { setRemoteCharacterClip, stopRemoteUpperBodyActions } from './remoteAnimationPlayback.js';

export function resetRemoteDeathPresentation(visual) {
  if (!visual) {
    return;
  }

  visual.fullBodyActionClip = null;
  visual.fullBodyActionTime = 0;
  visual.deathTransitionTime = 0;
}

export function playRemoteDeathClip(
  visual,
  player,
  authoritativeState,
  {
    persistentActionTime,
    resolveRemoteDeathClip,
  } = {},
) {
  if (!visual) {
    return false;
  }

  const deathClip = resolveRemoteDeathClip?.(visual, player, authoritativeState) ?? null;
  if (!deathClip) {
    return false;
  }

  stopRemoteUpperBodyActions(visual);
  visual.fullBodyActionClip = deathClip;
  visual.fullBodyActionTime = persistentActionTime;
  setRemoteCharacterClip(visual, deathClip);
  return true;
}
