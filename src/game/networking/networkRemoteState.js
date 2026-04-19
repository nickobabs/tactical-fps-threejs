import { NETCODE_MAX_REMOTE_SNAPSHOTS } from '../../shared/netcode.js';

function hasSamePoint(a, b) {
  return a && b && a.x === b.x && a.y === b.y && a.z === b.z;
}

function hasSameSegment(a, b) {
  return a && b
    && hasSamePoint(a.start, b.start)
    && hasSamePoint(a.end, b.end)
    && a.radius === b.radius;
}

function hasSameSphere(a, b) {
  return a && b && hasSamePoint(a.center, b.center) && a.radius === b.radius;
}

function hasSameVector(a, b) {
  return a && b && a.x === b.x && a.y === b.y && a.z === b.z;
}

function hasSameVelocity(a, b) {
  return hasSameVector(a, b);
}

function hasSameHead(a, b) {
  return a && b
    && hasSamePoint(a.center, b.center)
    && a.radius === b.radius
    && hasSameVector(a.size, b.size)
    && hasSameVector(a.right, b.right)
    && hasSameVector(a.up, b.up)
    && hasSameVector(a.forward, b.forward);
}

export function hasSameHitboxes(a, b) {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return !a && !b;
  }
  if (!hasSameHead(a.head, b.head) || !hasSameSegment(a.torso, b.torso) || !hasSameSegment(a.pelvis, b.pelvis)) {
    return false;
  }
  const armsA = a.arms ?? [];
  const armsB = b.arms ?? [];
  if (armsA.length !== armsB.length) {
    return false;
  }
  for (let index = 0; index < armsA.length; index += 1) {
    if (!hasSameSegment(armsA[index], armsB[index])) {
      return false;
    }
  }
  const handsA = a.hands ?? [];
  const handsB = b.hands ?? [];
  if (handsA.length !== handsB.length) {
    return false;
  }
  for (let index = 0; index < handsA.length; index += 1) {
    if (!hasSameSphere(handsA[index], handsB[index])) {
      return false;
    }
  }
  const legsA = a.legs ?? [];
  const legsB = b.legs ?? [];
  if (legsA.length !== legsB.length) {
    return false;
  }
  for (let index = 0; index < legsA.length; index += 1) {
    if (!hasSameSegment(legsA[index], legsB[index])) {
      return false;
    }
  }
  return true;
}

function hasSameClipTransition(a, b) {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return !a && !b;
  }
  return a.active === b.active
    && a.fromClip === b.fromClip
    && a.toClip === b.toClip
    && a.elapsed === b.elapsed
    && a.duration === b.duration
    && a.alpha === b.alpha;
}

function hasSameHitboxDebug(a, b) {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return !a && !b;
  }
  return a.targetClip === b.targetClip
    && a.delayedBaseTargetClip === b.delayedBaseTargetClip
    && a.baseClip === b.baseClip
    && a.presentationClip === b.presentationClip
    && a.activeClip === b.activeClip
    && a.fireBaseLocked === b.fireBaseLocked
    && a.fireTime === b.fireTime
    && a.clipTime === b.clipTime
    && a.clipPlaybackSpeed === b.clipPlaybackSpeed
    && hasSameClipTransition(a.clipTransition, b.clipTransition)
    && hasSamePoint(a.points?.head, b.points?.head)
    && hasSamePoint(a.points?.neck, b.points?.neck)
    && hasSamePoint(a.points?.spine, b.points?.spine)
    && hasSamePoint(a.points?.pelvis, b.points?.pelvis)
    && hasSamePoint(a.points?.leftUpperArm, b.points?.leftUpperArm)
    && hasSamePoint(a.points?.leftForearm, b.points?.leftForearm)
    && hasSamePoint(a.points?.leftHand, b.points?.leftHand)
    && hasSamePoint(a.points?.rightUpperArm, b.points?.rightUpperArm)
    && hasSamePoint(a.points?.rightForearm, b.points?.rightForearm)
    && hasSamePoint(a.points?.rightHand, b.points?.rightHand)
    && hasSamePoint(a.points?.leftThigh, b.points?.leftThigh)
    && hasSamePoint(a.points?.leftCalf, b.points?.leftCalf)
    && hasSamePoint(a.points?.leftFoot, b.points?.leftFoot)
    && hasSamePoint(a.points?.rightThigh, b.points?.rightThigh)
    && hasSamePoint(a.points?.rightCalf, b.points?.rightCalf)
    && hasSamePoint(a.points?.rightFoot, b.points?.rightFoot);
}

export function pushRemotePlayerSnapshot(remotePlayerBuffers, playerId, normalizedState, receivedAt) {
  const buffer = remotePlayerBuffers.get(playerId) ?? [];
  const previousSnapshot = buffer[buffer.length - 1];
  const isDuplicate = previousSnapshot
    && previousSnapshot.position.x === normalizedState.position.x
    && previousSnapshot.position.y === normalizedState.position.y
    && previousSnapshot.position.z === normalizedState.position.z
    && hasSameVelocity(previousSnapshot.velocity, normalizedState.velocity)
    && previousSnapshot.yaw === normalizedState.yaw
    && previousSnapshot.pitch === normalizedState.pitch
    && previousSnapshot.currentHeight === normalizedState.currentHeight
    && previousSnapshot.isCrouched === normalizedState.isCrouched
    && previousSnapshot.displayName === normalizedState.displayName
    && previousSnapshot.team === normalizedState.team
    && previousSnapshot.activeWeaponKey === normalizedState.activeWeaponKey
    && previousSnapshot.isScoped === normalizedState.isScoped
    && previousSnapshot.presentationState === normalizedState.presentationState
    && previousSnapshot.deathClip === normalizedState.deathClip
    && previousSnapshot.isAlive === normalizedState.isAlive
    && hasSameHitboxes(previousSnapshot.hitboxes, normalizedState.hitboxes)
    && hasSameHitboxDebug(previousSnapshot.hitboxDebug, normalizedState.hitboxDebug);

  if (!isDuplicate) {
    buffer.push({
      ...normalizedState,
      receivedAt,
    });

    while (buffer.length > NETCODE_MAX_REMOTE_SNAPSHOTS) {
      buffer.shift();
    }
  }

  remotePlayerBuffers.set(playerId, buffer);
}

export function pruneRemotePlayerState({ remotePlayerBuffers, scoreboardPlayers, localPlayerId, nextRemotePlayerIds }) {
  for (const playerId of remotePlayerBuffers.keys()) {
    if (!nextRemotePlayerIds.has(playerId)) {
      remotePlayerBuffers.delete(playerId);
    }
  }

  for (const playerId of [...scoreboardPlayers.keys()]) {
    if (playerId !== localPlayerId && !nextRemotePlayerIds.has(playerId)) {
      scoreboardPlayers.delete(playerId);
    }
  }
}
