import { REMOTE_CLIPS } from '../../shared/remoteCharacterConfig.js';
import {
  getRemoteMovementPlaybackScale as getSharedRemoteMovementPlaybackScale,
  selectRemoteMovementClip,
  selectRemoteTargetClip,
} from '../../shared/remotePoseState.js';

export function getRequestedRemoteDeathClip(player, authoritativeState) {
  const deathClip = authoritativeState?.deathClip ?? player?.deathClip ?? null;
  if (deathClip) {
    return deathClip;
  }
  return REMOTE_CLIPS.dieBackward;
}

export function resolveRemoteDeathClip(visual, player, authoritativeState, findClipAction) {
  const preferredClip = getRequestedRemoteDeathClip(player, authoritativeState);
  if (findClipAction(visual, preferredClip)) {
    return preferredClip;
  }
  if (preferredClip !== REMOTE_CLIPS.dieBackward && findClipAction(visual, REMOTE_CLIPS.dieBackward)) {
    return REMOTE_CLIPS.dieBackward;
  }
  if (preferredClip !== REMOTE_CLIPS.dieForward && findClipAction(visual, REMOTE_CLIPS.dieForward)) {
    return REMOTE_CLIPS.dieForward;
  }
  return null;
}

export function selectMovementClip(authoritativeState, presentationState) {
  return selectRemoteMovementClip(authoritativeState, presentationState, REMOTE_CLIPS);
}

export function selectTargetClip(authoritativeState, presentationState) {
  return selectRemoteTargetClip(authoritativeState, presentationState, REMOTE_CLIPS);
}

export function getRemoteMovementPlaybackScale(authoritativeState, targetClip) {
  return getSharedRemoteMovementPlaybackScale(authoritativeState, targetClip, REMOTE_CLIPS);
}
