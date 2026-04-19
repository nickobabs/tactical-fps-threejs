import { REMOTE_CLIPS } from './remoteCharacterConfig.js';
import {
  shouldLockRemoteFireBaseClip,
  shouldPlayRemoteFullBodyFire,
} from './remotePosePlayback.js';
import {
  resolveRemoteIdleEntryTarget,
  selectRemoteTargetClip,
} from './remotePoseState.js';

export function resolveRemotePoseClipIntent({
  state = null,
  presentationState = null,
  characterDefinition = null,
  weaponKey = null,
  activeUpperBodyClip = null,
  upperBodyActionTime = 0,
  fullBodyActionClip = null,
  fireActionTime = 0,
  idleEntryCandidateClip = null,
  idleEntryElapsed = 0,
  lastNonIdleClip = null,
  delta = 0,
  idleEntryDelay = 0.1,
  clips = REMOTE_CLIPS,
} = {}) {
  const resolvedPresentationState = String(presentationState ?? state?.presentationState ?? 'idle');
  const resolvedWeaponKey = String(weaponKey ?? state?.activeWeaponKey ?? 'rifle');
  const targetClip = selectRemoteTargetClip(state, resolvedPresentationState, clips);
  const idleEntry = resolveRemoteIdleEntryTarget({
    targetClip,
    idleEntryCandidateClip,
    idleEntryElapsed,
    lastNonIdleClip,
    delta,
    idleEntryDelay,
    clips,
  });
  const delayedBaseTargetClip = idleEntry.resolvedClip;
  const fireBaseLocked = shouldLockRemoteFireBaseClip({
    characterDefinition,
    weaponKey: resolvedWeaponKey,
    targetClip: delayedBaseTargetClip,
    activeUpperBodyClip,
    upperBodyActionTime,
    clips,
  });
  const baseClip = fireBaseLocked ? clips.fire : delayedBaseTargetClip;
  const actionClip = fullBodyActionClip
    || (
      Number(fireActionTime ?? 0) > 0
      && shouldPlayRemoteFullBodyFire({
        characterDefinition,
        weaponKey: resolvedWeaponKey,
        presentationState: resolvedPresentationState,
      })
        ? clips.fire
        : null
    );

  return {
    presentationState: resolvedPresentationState,
    weaponKey: resolvedWeaponKey,
    targetClip,
    delayedBaseTargetClip,
    baseClip,
    fullBodyActionClip: actionClip,
    presentationClip: actionClip ?? baseClip,
    fireBaseLocked,
    idleEntryCandidateClip: idleEntry.idleEntryCandidateClip,
    idleEntryElapsed: idleEntry.idleEntryElapsed,
    lastNonIdleClip: idleEntry.lastNonIdleClip,
  };
}
