import * as THREE from 'three';
import {
  REMOTE_CLIPS,
  getRemoteMovementClipBaselineSpeeds,
  shouldUseRemoteWalkClip,
  usesRemoteMeleeClipSet,
} from '../../shared/remoteCharacterConfig.js';
import { isPlayerPresentationCrouched } from '../../shared/playerMovement.js';

const MOVEMENT_DIRECTION_EPSILON = 0.08;
const REMOTE_MIN_MOVEMENT_PLAYBACK_SCALE = 0.55;
const REMOTE_MAX_MOVEMENT_PLAYBACK_SCALE = 1.45;
const POLICY_MOVE_VECTOR = new THREE.Vector3();
const POLICY_FORWARD = new THREE.Vector3();
const POLICY_RIGHT = new THREE.Vector3();

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
  if (presentationState === 'dead') {
    return REMOTE_CLIPS.idle;
  }

  if (presentationState === 'air') {
    return REMOTE_CLIPS.jump;
  }

  const velocity = authoritativeState?.velocity ?? null;
  const isCrouched = isPlayerPresentationCrouched(authoritativeState);
  if (!velocity) {
    return isCrouched ? REMOTE_CLIPS.crouchIdle : REMOTE_CLIPS.idle;
  }

  POLICY_MOVE_VECTOR.set(Number(velocity.x ?? 0), 0, Number(velocity.z ?? 0));
  const horizontalSpeed = POLICY_MOVE_VECTOR.length();
  const weaponKey = String(authoritativeState?.activeWeaponKey ?? 'rifle');
  if (horizontalSpeed <= MOVEMENT_DIRECTION_EPSILON) {
    if (isCrouched) {
      return usesRemoteMeleeClipSet(weaponKey) ? REMOTE_CLIPS.meleeCrouchIdle : REMOTE_CLIPS.crouchIdle;
    }
    return usesRemoteMeleeClipSet(weaponKey) ? REMOTE_CLIPS.meleeIdle : REMOTE_CLIPS.idle;
  }

  const yaw = Number(authoritativeState?.yaw ?? 0);
  POLICY_FORWARD.set(-Math.sin(yaw), 0, -Math.cos(yaw));
  POLICY_RIGHT.set(Math.cos(yaw), 0, -Math.sin(yaw));

  const forwardAmount = POLICY_MOVE_VECTOR.dot(POLICY_FORWARD);
  const strafeAmount = POLICY_MOVE_VECTOR.dot(POLICY_RIGHT);

  if (isCrouched) {
    if (usesRemoteMeleeClipSet(weaponKey)) {
      return REMOTE_CLIPS.meleeCrouchWalk;
    }
    if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
      return forwardAmount >= 0 ? REMOTE_CLIPS.crouchWalk : REMOTE_CLIPS.crouchBackward;
    }

    return REMOTE_CLIPS.crouchWalk;
  }

  if (usesRemoteMeleeClipSet(weaponKey)) {
    if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
      if (forwardAmount >= 0) {
        return shouldUseRemoteWalkClip(weaponKey, horizontalSpeed)
          ? REMOTE_CLIPS.meleeWalkForward
          : REMOTE_CLIPS.meleeRunForward;
      }
      return REMOTE_CLIPS.meleeWalkBackward;
    }

    return strafeAmount >= 0 ? REMOTE_CLIPS.meleeStrafeRight : REMOTE_CLIPS.meleeStrafeLeft;
  }

  if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
    if (shouldUseRemoteWalkClip(weaponKey, horizontalSpeed)) {
      return forwardAmount >= 0 ? REMOTE_CLIPS.walkForward : REMOTE_CLIPS.walkBackward;
    }
    return forwardAmount >= 0 ? REMOTE_CLIPS.runForward : REMOTE_CLIPS.runBackward;
  }

  return strafeAmount >= 0 ? REMOTE_CLIPS.strafeRight : REMOTE_CLIPS.strafeLeft;
}

export function selectTargetClip(authoritativeState, presentationState) {
  const weaponKey = String(authoritativeState?.activeWeaponKey ?? 'rifle');
  return presentationState === 'air'
    ? (usesRemoteMeleeClipSet(weaponKey) ? REMOTE_CLIPS.meleeJump : REMOTE_CLIPS.jump)
    : selectMovementClip(authoritativeState, presentationState);
}

export function getRemoteMovementPlaybackScale(authoritativeState, targetClip) {
  const velocity = authoritativeState?.velocity ?? null;
  if (!velocity) {
    return 1;
  }

  const horizontalSpeed = Math.hypot(
    Number(velocity.x ?? 0),
    Number(velocity.z ?? 0),
  );
  if (horizontalSpeed <= MOVEMENT_DIRECTION_EPSILON) {
    return 1;
  }

  const weaponKey = String(authoritativeState?.activeWeaponKey ?? 'rifle');
  const baselineSpeeds = getRemoteMovementClipBaselineSpeeds(weaponKey);
  const crouchClip = [
    REMOTE_CLIPS.crouchWalk,
    REMOTE_CLIPS.crouchBackward,
    REMOTE_CLIPS.meleeCrouchWalk,
  ].includes(targetClip);
  const walkClip = [
    REMOTE_CLIPS.walkForward,
    REMOTE_CLIPS.walkBackward,
    REMOTE_CLIPS.meleeWalkForward,
    REMOTE_CLIPS.meleeWalkBackward,
  ].includes(targetClip);
  const baselineSpeed = crouchClip
    ? baselineSpeeds.crouchSpeed
    : (walkClip ? baselineSpeeds.walkSpeed : baselineSpeeds.fullSpeed);
  if (!Number.isFinite(baselineSpeed) || baselineSpeed <= 0) {
    return 1;
  }

  return THREE.MathUtils.clamp(
    horizontalSpeed / baselineSpeed,
    REMOTE_MIN_MOVEMENT_PLAYBACK_SCALE,
    REMOTE_MAX_MOVEMENT_PLAYBACK_SCALE,
  );
}
