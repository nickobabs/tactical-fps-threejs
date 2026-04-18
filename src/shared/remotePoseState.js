import {
  REMOTE_CLIPS,
  getRemoteMovementClipBaselineSpeeds,
  shouldUseRemoteWalkClip,
  usesRemoteMeleeClipSet,
} from './remoteCharacterConfig.js';
import { getPlayerCrouchFraction, isPlayerPresentationCrouched } from './playerMovement.js';

const REMOTE_MOVEMENT_DIRECTION_EPSILON = 0.08;
const REMOTE_MIN_MOVEMENT_PLAYBACK_SCALE = 0.55;
const REMOTE_MAX_MOVEMENT_PLAYBACK_SCALE = 1.45;

function getRemotePoseStateCore(state, presentationState) {
  const resolvedPresentationState = String(presentationState ?? state?.presentationState ?? 'idle');
  const weaponKey = String(state?.activeWeaponKey ?? 'rifle');
  const velocity = state?.velocity ?? null;
  const horizontalVelocityX = Number(velocity?.x ?? 0);
  const horizontalVelocityZ = Number(velocity?.z ?? 0);
  const horizontalSpeed = Math.hypot(horizontalVelocityX, horizontalVelocityZ);
  const yaw = Number(state?.yaw ?? 0);
  const isCrouched = isPlayerPresentationCrouched(state);
  const crouchFraction = getPlayerCrouchFraction(state?.currentHeight);

  return {
    presentationState: resolvedPresentationState,
    weaponKey,
    velocity,
    horizontalVelocityX,
    horizontalVelocityZ,
    horizontalSpeed,
    yaw,
    isCrouched,
    crouchFraction,
  };
}

export function selectRemoteMovementClip(state, presentationState, clips = REMOTE_CLIPS) {
  const poseState = getRemotePoseStateCore(state, presentationState);
  const usingMeleeClipSet = usesRemoteMeleeClipSet(poseState.weaponKey);

  if (poseState.presentationState === 'dead') {
    return clips.idle;
  }

  if (poseState.presentationState === 'air') {
    return usingMeleeClipSet ? clips.meleeJump : clips.jump;
  }

  if (!poseState.velocity || poseState.horizontalSpeed <= REMOTE_MOVEMENT_DIRECTION_EPSILON) {
    if (poseState.isCrouched) {
      return usingMeleeClipSet ? clips.meleeCrouchIdle : clips.crouchIdle;
    }
    return usingMeleeClipSet ? clips.meleeIdle : clips.idle;
  }

  const forwardX = -Math.sin(poseState.yaw);
  const forwardZ = -Math.cos(poseState.yaw);
  const rightX = Math.cos(poseState.yaw);
  const rightZ = -Math.sin(poseState.yaw);
  const forwardAmount = (poseState.horizontalVelocityX * forwardX) + (poseState.horizontalVelocityZ * forwardZ);
  const strafeAmount = (poseState.horizontalVelocityX * rightX) + (poseState.horizontalVelocityZ * rightZ);

  if (poseState.isCrouched) {
    if (usingMeleeClipSet) {
      return clips.meleeCrouchWalk;
    }
    if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
      return forwardAmount >= 0 ? clips.crouchWalk : clips.crouchBackward;
    }
    return clips.crouchWalk;
  }

  if (usingMeleeClipSet) {
    if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
      if (forwardAmount >= 0) {
        return shouldUseRemoteWalkClip(poseState.weaponKey, poseState.horizontalSpeed)
          ? clips.meleeWalkForward
          : clips.meleeRunForward;
      }
      return clips.meleeWalkBackward;
    }
    return strafeAmount >= 0 ? clips.meleeStrafeRight : clips.meleeStrafeLeft;
  }

  if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
    if (shouldUseRemoteWalkClip(poseState.weaponKey, poseState.horizontalSpeed)) {
      return forwardAmount >= 0 ? clips.walkForward : clips.walkBackward;
    }
    return forwardAmount >= 0 ? clips.runForward : clips.runBackward;
  }

  return strafeAmount >= 0 ? clips.strafeRight : clips.strafeLeft;
}

export function selectRemoteTargetClip(state, presentationState, clips = REMOTE_CLIPS) {
  const weaponKey = String(state?.activeWeaponKey ?? 'rifle');
  return String(presentationState ?? state?.presentationState ?? 'idle') === 'air'
    ? (usesRemoteMeleeClipSet(weaponKey) ? clips.meleeJump : clips.jump)
    : selectRemoteMovementClip(state, presentationState, clips);
}

export function getRemoteMovementPlaybackScale(state, targetClip, clips = REMOTE_CLIPS) {
  const poseState = getRemotePoseStateCore(state);
  if (!poseState.velocity || poseState.horizontalSpeed <= REMOTE_MOVEMENT_DIRECTION_EPSILON) {
    return 1;
  }

  const crouchClip = [
    clips.crouchWalk,
    clips.crouchBackward,
    clips.meleeCrouchWalk,
  ].includes(targetClip);
  const walkClip = [
    clips.walkForward,
    clips.walkBackward,
    clips.meleeWalkForward,
    clips.meleeWalkBackward,
  ].includes(targetClip);
  const baselineSpeeds = getRemoteMovementClipBaselineSpeeds(poseState.weaponKey);
  const baselineSpeed = crouchClip
    ? baselineSpeeds.crouchSpeed
    : (walkClip ? baselineSpeeds.walkSpeed : baselineSpeeds.fullSpeed);
  if (!Number.isFinite(baselineSpeed) || baselineSpeed <= 0) {
    return 1;
  }

  return Math.max(
    REMOTE_MIN_MOVEMENT_PLAYBACK_SCALE,
    Math.min(REMOTE_MAX_MOVEMENT_PLAYBACK_SCALE, poseState.horizontalSpeed / baselineSpeed),
  );
}

export function getRemotePoseStateSnapshot(state, presentationState) {
  return getRemotePoseStateCore(state, presentationState);
}

function isRemoteIdleClip(targetClip, clips = REMOTE_CLIPS) {
  return targetClip === clips.idle
    || targetClip === clips.crouchIdle
    || targetClip === clips.meleeIdle
    || targetClip === clips.meleeCrouchIdle;
}

export function getRemoteIdleClipFamily(targetClip, clips = REMOTE_CLIPS) {
  if (targetClip === clips.idle) {
    return 'stand';
  }
  if (targetClip === clips.crouchIdle || targetClip === clips.crouchWalk || targetClip === clips.crouchBackward) {
    return 'crouch';
  }
  if (targetClip === clips.meleeIdle) {
    return 'melee-stand';
  }
  if (targetClip === clips.meleeCrouchIdle || targetClip === clips.meleeCrouchWalk) {
    return 'melee-crouch';
  }
  if (
    targetClip === clips.meleeWalkForward
    || targetClip === clips.meleeWalkBackward
    || targetClip === clips.meleeRunForward
    || targetClip === clips.meleeStrafeLeft
    || targetClip === clips.meleeStrafeRight
  ) {
    return 'melee-stand';
  }
  return 'stand';
}

export function clearRemoteIdleEntryState() {
  return {
    idleEntryCandidateClip: null,
    idleEntryElapsed: 0,
    lastNonIdleClip: null,
  };
}

export function resolveRemoteIdleEntryTarget({
  targetClip,
  idleEntryCandidateClip = null,
  idleEntryElapsed = 0,
  lastNonIdleClip = null,
  delta = 0,
  idleEntryDelay = 0.1,
  clips = REMOTE_CLIPS,
} = {}) {
  if (!isRemoteIdleClip(targetClip, clips)) {
    return {
      resolvedClip: targetClip,
      idleEntryCandidateClip: null,
      idleEntryElapsed: 0,
      lastNonIdleClip: targetClip,
    };
  }

  if (!lastNonIdleClip) {
    return {
      resolvedClip: targetClip,
      idleEntryCandidateClip,
      idleEntryElapsed,
      lastNonIdleClip,
    };
  }

  const targetFamily = getRemoteIdleClipFamily(targetClip, clips);
  const lastNonIdleFamily = getRemoteIdleClipFamily(lastNonIdleClip, clips);
  if (targetFamily !== lastNonIdleFamily) {
    return {
      resolvedClip: targetClip,
      idleEntryCandidateClip: null,
      idleEntryElapsed: 0,
      lastNonIdleClip,
    };
  }

  const shouldDelayIdleEntry = (
    (targetClip === clips.idle && lastNonIdleClip !== clips.meleeIdle)
    || (targetClip === clips.crouchIdle && lastNonIdleClip !== clips.meleeCrouchIdle)
    || (targetClip === clips.meleeIdle && lastNonIdleClip !== clips.idle)
    || (targetClip === clips.meleeCrouchIdle && lastNonIdleClip !== clips.crouchIdle)
  );
  if (!shouldDelayIdleEntry) {
    return {
      resolvedClip: targetClip,
      idleEntryCandidateClip,
      idleEntryElapsed,
      lastNonIdleClip,
    };
  }

  const nextIdleEntryCandidateClip = idleEntryCandidateClip !== targetClip
    ? targetClip
    : idleEntryCandidateClip;
  const nextIdleEntryElapsed = idleEntryCandidateClip !== targetClip
    ? 0
    : Math.min(idleEntryDelay, idleEntryElapsed + Math.max(0, delta));

  if (nextIdleEntryElapsed < idleEntryDelay) {
    return {
      resolvedClip: lastNonIdleClip,
      idleEntryCandidateClip: nextIdleEntryCandidateClip,
      idleEntryElapsed: nextIdleEntryElapsed,
      lastNonIdleClip,
    };
  }

  return {
    resolvedClip: targetClip,
    idleEntryCandidateClip: nextIdleEntryCandidateClip,
    idleEntryElapsed: nextIdleEntryElapsed,
    lastNonIdleClip,
  };
}
