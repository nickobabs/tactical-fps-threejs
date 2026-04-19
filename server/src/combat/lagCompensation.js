import { computePlayerHitboxLayout, createPlayerHitboxLayout } from '../../../src/shared/playerHitboxes.js';
import {
  createRemoteHitboxPointCache,
  buildRemoteHitboxSnapshotFromPoints,
  interpolateRemoteHitboxPoints,
  createRemoteHitboxSnapshot,
  REMOTE_HITBOX_BONE_KEYS,
  REMOTE_HITBOX_HEAD_OFFSET,
} from '../../../src/shared/remoteHitboxes.js';
import { getMissingRemoteHitBoneKeys } from '../../../src/shared/remoteSkeleton.js';
import { NETCODE_SERVER_HITBOX_HISTORY_MS } from '../../../src/shared/netcode.js';
import { getSnapshotPairAtTime, interpolateRemoteHitboxHistoryAtTime } from '../../../src/shared/remoteTimeline.js';
import { REMOTE_CHARACTER_HITBOX_SETTINGS } from '../../../src/shared/remoteCharacterConfig.js';

export function buildAuthoritativeHitboxes(player) {
  const bones = player.hitboxRig?.bones;
  const hitboxPoints = player.hitboxRig?.hitboxPoints ?? null;
  const missingBoneKeys = getMissingRemoteHitBoneKeys(bones);
  if (missingBoneKeys.length > 0) {
    if (!player.missingHitboxBonesLogged) {
      console.warn(`[TacticalRoom] Falling back to coarse hitboxes for ${player.playerId}; missing bones: ${missingBoneKeys.join(', ')}`);
      player.missingHitboxBonesLogged = true;
    }
    const layout = computePlayerHitboxLayout({
      position: player.motionState.position,
      yaw: player.motionState?.yaw ?? 0,
      currentHeight: player.motionState?.currentHeight ?? 1.72,
      isCrouched: player.motionState?.isCrouched ?? false,
      activeWeaponKey: player.activeWeaponKey ?? 'rifle',
    }, createPlayerHitboxLayout());
    return {
      head: layout.head,
      torso: layout.torso,
      pelvis: layout.pelvis,
      arms: layout.arms,
      hands: [],
      legs: layout.legs,
    };
  }

  return buildRemoteHitboxSnapshotFromPoints({
    points: hitboxPoints,
    headOffset: REMOTE_CHARACTER_HITBOX_SETTINGS.headOffset ?? REMOTE_HITBOX_HEAD_OFFSET,
    headRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.headRadius,
    headSize: REMOTE_CHARACTER_HITBOX_SETTINGS.headSize,
    torsoRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoRadius,
    torsoTopOffset: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoTopOffset,
    torsoLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoLengthPadding,
    pelvisRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.pelvisRadius,
    pelvisLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.pelvisLengthPadding,
    armRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.armRadius,
    armLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.armLengthPadding,
    handRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.handRadius,
    legRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.legRadius,
    legLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.legLengthPadding,
  }, player.authoritativeHitboxes ?? createRemoteHitboxSnapshot());
}

function clonePoint(point) {
  if (!point) {
    return null;
  }

  return {
    x: Number(point.x ?? 0),
    y: Number(point.y ?? 0),
    z: Number(point.z ?? 0),
  };
}

function cloneVector(vector) {
  if (!vector) {
    return null;
  }

  return {
    x: Number(vector.x ?? 0),
    y: Number(vector.y ?? 0),
    z: Number(vector.z ?? 0),
  };
}

function cloneSegment(segment) {
  if (!segment?.start || !segment?.end) {
    return null;
  }

  return {
    start: clonePoint(segment.start),
    end: clonePoint(segment.end),
    radius: Number(segment.radius ?? 0),
  };
}

function cloneSphere(sphere) {
  if (!sphere?.center) {
    return null;
  }

  return {
    center: clonePoint(sphere.center),
    radius: Number(sphere.radius ?? 0),
  };
}

function cloneHead(head) {
  if (!head?.center) {
    return null;
  }

  return {
    center: clonePoint(head.center),
    radius: Number(head.radius ?? 0),
    size: cloneVector(head.size),
    right: cloneVector(head.right),
    up: cloneVector(head.up),
    forward: cloneVector(head.forward),
  };
}

function cloneHitboxSnapshot(hitboxes) {
  if (!hitboxes?.head || !hitboxes?.torso || !hitboxes?.pelvis) {
    return null;
  }

  return {
    head: cloneHead(hitboxes.head),
    torso: cloneSegment(hitboxes.torso),
    pelvis: cloneSegment(hitboxes.pelvis),
    arms: Array.isArray(hitboxes.arms) ? hitboxes.arms.map(cloneSegment).filter(Boolean) : [],
    hands: Array.isArray(hitboxes.hands) ? hitboxes.hands.map(cloneSphere).filter(Boolean) : [],
    legs: Array.isArray(hitboxes.legs) ? hitboxes.legs.map(cloneSegment).filter(Boolean) : [],
  };
}

function cloneHitboxPoints(points) {
  if (!points) {
    return null;
  }

  const cloned = createRemoteHitboxPointCache();
  for (const key of REMOTE_HITBOX_BONE_KEYS) {
    cloned[key].x = Number(points[key]?.x ?? 0);
    cloned[key].y = Number(points[key]?.y ?? 0);
    cloned[key].z = Number(points[key]?.z ?? 0);
  }
  return cloned;
}

export function recordPlayerHitboxHistory(player, now) {
  if (!player?.authoritativeHitboxes) {
    return;
  }

  const snapshot = cloneHitboxSnapshot(player.authoritativeHitboxes);
  const points = cloneHitboxPoints(player.hitboxRig?.hitboxPoints);
  if (!snapshot) {
    return;
  }

  const recordedAt = Number(now ?? Date.now());
  const history = player.hitboxHistory ?? (player.hitboxHistory = []);
  history.push({
    recordedAt,
    hitboxes: snapshot,
    points,
  });

  const cutoff = recordedAt - NETCODE_SERVER_HITBOX_HISTORY_MS;
  while (history.length > 0 && Number(history[0]?.recordedAt ?? 0) < cutoff) {
    history.shift();
  }
}

export function getLagCompensatedHitboxes(target, rewindTimestamp) {
  const history = target?.hitboxHistory ?? null;
  if (!Array.isArray(history) || history.length === 0) {
    return target?.authoritativeHitboxes ?? null;
  }

  const pointPair = getSnapshotPairAtTime(history, rewindTimestamp, { timeKey: 'recordedAt' });
  if (pointPair?.kind === 'between' && pointPair.previousSnapshot?.points && pointPair.nextSnapshot?.points) {
    const interpolatedPoints = interpolateRemoteHitboxPoints(
      pointPair.previousSnapshot.points,
      pointPair.nextSnapshot.points,
      pointPair.alpha,
      createRemoteHitboxPointCache(),
    );
    return buildRemoteHitboxSnapshotFromPoints({
      points: interpolatedPoints,
      headOffset: REMOTE_CHARACTER_HITBOX_SETTINGS.headOffset ?? REMOTE_HITBOX_HEAD_OFFSET,
      headRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.headRadius,
      headSize: REMOTE_CHARACTER_HITBOX_SETTINGS.headSize,
      torsoRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoRadius,
      torsoTopOffset: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoTopOffset,
      torsoLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoLengthPadding,
      pelvisRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.pelvisRadius,
      pelvisLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.pelvisLengthPadding,
      armRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.armRadius,
      armLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.armLengthPadding,
      handRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.handRadius,
      legRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.legRadius,
      legLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.legLengthPadding,
    }, createRemoteHitboxSnapshot());
  }

  return interpolateRemoteHitboxHistoryAtTime(history, rewindTimestamp)
    ?? target?.authoritativeHitboxes
    ?? null;
}

export function clearPlayerHitboxHistory(player) {
  if (Array.isArray(player?.hitboxHistory)) {
    player.hitboxHistory.length = 0;
  }
}
