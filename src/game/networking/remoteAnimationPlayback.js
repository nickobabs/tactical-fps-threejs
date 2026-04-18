import { REMOTE_CLIPS } from '../../shared/remoteCharacterConfig.js';
import {
  REMOTE_BASE_CLIP_FADE_DURATION,
  REMOTE_UPPER_BODY_ACTION_DURATION,
  REMOTE_UPPER_BODY_FADE_DURATION,
} from '../../shared/remotePosePlayback.js';

export function normalizeRemoteClipName(name) {
  return String(name ?? '')
    .split(/[|/\\]/)
    .pop()
    .trim()
    .toLowerCase();
}

export function findRemoteClipAction(visual, clipName) {
  const normalizedClipName = normalizeRemoteClipName(clipName);
  return visual.characterActions.get(normalizedClipName)
    ?? [...visual.characterActions.entries()].find(([name]) => name.includes(normalizedClipName))?.[1]
    ?? null;
}

export function findRemoteUpperBodyAction(visual, clipName) {
  const normalizedClipName = normalizeRemoteClipName(clipName);
  return visual.characterUpperBodyActions.get(normalizedClipName)
    ?? [...visual.characterUpperBodyActions.entries()].find(([name]) => name.includes(normalizedClipName))?.[1]
    ?? null;
}

export function setRemoteCharacterClip(
  visual,
  clipName,
  {
    clipFadeDuration = REMOTE_BASE_CLIP_FADE_DURATION,
    fireClipName = REMOTE_CLIPS.fire,
  } = {},
) {
  if (!visual.characterMixer || !visual.characterActions?.size) {
    return;
  }

  const normalizedClipName = normalizeRemoteClipName(clipName);
  const nextAction = findRemoteClipAction(visual, normalizedClipName);
  if (!nextAction) {
    return;
  }
  const isImmediateFireTransition = normalizedClipName === normalizeRemoteClipName(fireClipName);

  const previousAction = visual.activeCharacterClip
    ? findRemoteClipAction(visual, visual.activeCharacterClip)
    : null;

  if (visual.activeCharacterClip === normalizedClipName) {
    return;
  }

  if (previousAction && previousAction !== nextAction) {
    if (isImmediateFireTransition) {
      previousAction.stop();
    } else {
      previousAction.fadeOut(clipFadeDuration);
    }
  }

  nextAction.reset();
  if (isImmediateFireTransition) {
    nextAction.setEffectiveWeight(1).setEffectiveTimeScale(1).play();
  } else {
    nextAction.fadeIn(clipFadeDuration).play();
  }
  visual.activeCharacterClip = normalizedClipName;
}

export function freezeRemoteCharacterClip(
  visual,
  clipName,
  {
    captureAimBoneBasePose = null,
    clipFadeDuration = REMOTE_BASE_CLIP_FADE_DURATION,
    fireClipName = REMOTE_CLIPS.fire,
  } = {},
) {
  if (!visual.characterMixer || !visual.characterActions?.size) {
    return;
  }

  const normalizedClipName = normalizeRemoteClipName(clipName);
  setRemoteCharacterClip(visual, normalizedClipName, { clipFadeDuration, fireClipName });
  const targetAction = findRemoteClipAction(visual, normalizedClipName);
  if (!targetAction) {
    return;
  }

  for (const action of visual.characterActions.values()) {
    if (action === targetAction) {
      action.enabled = true;
      action.play();
      action.time = 0;
      action.paused = true;
      action.setEffectiveTimeScale(0);
      action.setEffectiveWeight(1);
    } else {
      action.stop();
      action.paused = true;
    }
  }
  for (const action of visual.characterUpperBodyActions.values()) {
    action.stop();
    action.paused = true;
    action.setEffectiveWeight(0);
  }
  visual.activeUpperBodyClip = null;
  visual.upperBodyActionTime = 0;
  visual.characterMixer.update(0);
  captureAimBoneBasePose?.(visual);
}

export function playRemoteUpperBodyClip(
  visual,
  clipName,
  {
    upperBodyFadeDuration = REMOTE_UPPER_BODY_FADE_DURATION,
    upperBodyActionDuration = REMOTE_UPPER_BODY_ACTION_DURATION,
  } = {},
) {
  if (!visual.characterMixer || !visual.characterUpperBodyActions?.size) {
    return;
  }

  const normalizedClipName = normalizeRemoteClipName(clipName);
  const nextAction = findRemoteUpperBodyAction(visual, normalizedClipName);
  if (!nextAction) {
    return;
  }

  const previousAction = visual.activeUpperBodyClip
    ? findRemoteUpperBodyAction(visual, visual.activeUpperBodyClip)
    : null;
  if (previousAction && previousAction !== nextAction) {
    previousAction.fadeOut(upperBodyFadeDuration);
  }

  nextAction
    .reset()
    .setEffectiveWeight(1)
    .setEffectiveTimeScale(1)
    .fadeIn(upperBodyFadeDuration)
    .play();
  visual.activeUpperBodyClip = normalizedClipName;
  visual.activeUpperBodyWeight = 1;
  visual.upperBodyActionTime = upperBodyActionDuration;
}

export function updateRemoteUpperBodyAction(
  visual,
  delta,
  {
    upperBodyFadeDuration = REMOTE_UPPER_BODY_FADE_DURATION,
  } = {},
) {
  if (!visual.activeUpperBodyClip) {
    return;
  }

  const action = findRemoteUpperBodyAction(visual, visual.activeUpperBodyClip);
  if (!action) {
    visual.activeUpperBodyClip = null;
    visual.upperBodyActionTime = 0;
    return;
  }

  visual.upperBodyActionTime = Math.max(0, visual.upperBodyActionTime - delta);
  if (visual.upperBodyActionTime > 0) {
    action.setEffectiveWeight(visual.activeUpperBodyWeight ?? 1);
    return;
  }

  action.fadeOut(upperBodyFadeDuration);
  visual.activeUpperBodyClip = null;
  visual.activeUpperBodyWeight = 1;
}

export function updateRemoteFullBodyAction(visual, delta) {
  if (!visual.fullBodyActionClip) {
    return null;
  }

  const activeClip = visual.fullBodyActionClip;
  visual.fullBodyActionTime = Math.max(0, visual.fullBodyActionTime - delta);
  if (visual.fullBodyActionTime <= 0) {
    visual.fullBodyActionClip = null;
    visual.fullBodyActionTime = 0;
  }
  return activeClip;
}

export function stopRemoteUpperBodyActions(visual) {
  for (const action of visual.characterUpperBodyActions.values()) {
    action.stop();
    action.paused = false;
    action.setEffectiveWeight(0);
  }
  visual.activeUpperBodyClip = null;
  visual.activeUpperBodyWeight = 1;
  visual.upperBodyActionTime = 0;
}
