import { REMOTE_CLIPS } from '../../shared/remoteCharacterConfig.js';
import { shouldPlayRemoteFullBodyFire } from '../../shared/remotePosePlayback.js';
import { playRemoteUpperBodyClip, setRemoteCharacterClip } from './remoteAnimationPlayback.js';

export function triggerRemotePlayerFireFlash(
  visual,
  {
    fireFlashDuration,
    fullBodyFireActionDuration,
    captureAimBoneBasePose,
  } = {},
) {
  if (!visual) {
    return;
  }

  visual.flashTime = fireFlashDuration;
  if (shouldPlayRemoteFullBodyFire({
    characterDefinition: visual.characterDefinition,
    weaponKey: visual.weaponKey,
    presentationState: visual.presentationState,
  })) {
    visual.fullBodyActionClip = REMOTE_CLIPS.fire;
    visual.fullBodyActionTime = fullBodyFireActionDuration;
    setRemoteCharacterClip(visual, REMOTE_CLIPS.fire);
    visual.characterMixer?.update?.(0);
    captureAimBoneBasePose?.(visual);
    return;
  }
  playRemoteUpperBodyClip(visual, REMOTE_CLIPS.fire);
  visual.characterMixer?.update?.(0);
  captureAimBoneBasePose?.(visual);
}

export function triggerRemotePlayerHitReaction(
  visual,
  {
    killed = false,
    hitReactionDuration,
    deathTransitionDuration,
    playRemoteDeathClip,
    player = null,
    authoritativeState = null,
  } = {},
) {
  if (!visual) {
    return;
  }

  visual.hitReactionTime = hitReactionDuration;
  if (killed) {
    visual.deathTransitionTime = deathTransitionDuration;
    playRemoteDeathClip?.(visual, player, authoritativeState);
  }
}
