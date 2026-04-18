import * as THREE from 'three';
import {
  buildRemoteHitboxSnapshotFromPoints,
  createRemoteHitboxPointCache,
  createRemoteHitboxSnapshot,
} from '../../shared/remoteHitboxes.js';

const REMOTE_HITBOX_WORLD_POINT = new THREE.Vector3();
const REMOTE_LOCAL_HITBOX_POINTS = createRemoteHitboxPointCache();

function pickAuditCoreSnapshot(snapshot) {
  if (!snapshot) {
    return null;
  }

  return {
    head: snapshot.head ?? null,
    torso: snapshot.torso ?? null,
    pelvis: snapshot.pelvis ?? null,
  };
}

export function maybeSendRemoteHitboxAudit({
  showHitVolumeDebug,
  sendHitboxAudit,
  visual,
  renderPlayer,
  authoritativeState,
  hitboxSettings,
  findClipAction,
}) {
  if (!showHitVolumeDebug || !sendHitboxAudit || !visual?.characterHitBones || !authoritativeState?.hitboxDebug) {
    return;
  }

  const now = Date.now();
  if (now - (visual.lastSentHitboxAuditAt ?? 0) < 750) {
    return;
  }

  for (const [key, point] of Object.entries(REMOTE_LOCAL_HITBOX_POINTS)) {
    const bone = visual.characterHitBones[key];
    if (!bone?.getWorldPosition) {
      continue;
    }
    bone.getWorldPosition(REMOTE_HITBOX_WORLD_POINT);
    point.x = REMOTE_HITBOX_WORLD_POINT.x;
    point.y = REMOTE_HITBOX_WORLD_POINT.y;
    point.z = REMOTE_HITBOX_WORLD_POINT.z;
  }

  const localSnapshot = buildRemoteHitboxSnapshotFromPoints({
    points: REMOTE_LOCAL_HITBOX_POINTS,
    headOffset: hitboxSettings.headOffset,
    headRadius: hitboxSettings.headRadius,
    headSize: hitboxSettings.headSize,
    torsoRadius: hitboxSettings.torsoRadius,
    torsoLengthPadding: hitboxSettings.torsoLengthPadding,
    pelvisRadius: hitboxSettings.pelvisRadius,
    pelvisLengthPadding: hitboxSettings.pelvisLengthPadding,
    armRadius: hitboxSettings.armRadius,
    armLengthPadding: hitboxSettings.armLengthPadding,
    handRadius: hitboxSettings.handRadius,
    legRadius: hitboxSettings.legRadius,
    legLengthPadding: hitboxSettings.legLengthPadding,
  }, createRemoteHitboxSnapshot());

  const signature = JSON.stringify({
    playerId: renderPlayer?.playerId,
    activeClip: authoritativeState.hitboxDebug.activeClip,
    clipTime: Number(authoritativeState.hitboxDebug.clipTime ?? 0).toFixed(3),
    position: authoritativeState.position,
    localHead: localSnapshot?.head?.center ?? null,
    serverHead: authoritativeState.hitboxes?.head?.center ?? null,
  });
  if (visual.lastSentHitboxAuditSignature === signature) {
    return;
  }
  visual.lastSentHitboxAuditAt = now;
  visual.lastSentHitboxAuditSignature = signature;

  const visiblePoints = {};
  for (const [key, bone] of Object.entries(visual.characterHitBones)) {
    if (!bone?.getWorldPosition) {
      visiblePoints[key] = null;
      continue;
    }
    bone.getWorldPosition(REMOTE_HITBOX_WORLD_POINT);
    visiblePoints[key] = {
      x: REMOTE_HITBOX_WORLD_POINT.x,
      y: REMOTE_HITBOX_WORLD_POINT.y,
      z: REMOTE_HITBOX_WORLD_POINT.z,
    };
  }

  const activeClientAction = visual.activeCharacterClip
    ? findClipAction(visual, visual.activeCharacterClip)
    : null;

  sendHitboxAudit({
    capturedAt: Date.now(),
    playerId: renderPlayer?.playerId ?? authoritativeState.playerId ?? null,
    renderPlayer: {
      position: renderPlayer?.position ?? null,
      yaw: renderPlayer?.yaw ?? null,
      pitch: renderPlayer?.pitch ?? null,
      currentHeight: renderPlayer?.currentHeight ?? null,
      presentationState: renderPlayer?.presentationState ?? null,
    },
    authoritativeState: {
      position: authoritativeState.position,
      yaw: authoritativeState.yaw,
      pitch: authoritativeState.pitch,
      currentHeight: authoritativeState.currentHeight,
      presentationState: authoritativeState.presentationState,
      hitboxes: authoritativeState.hitboxes ?? null,
      hitboxDebug: authoritativeState.hitboxDebug ?? null,
    },
    clientAnimationDebug: {
      activeClip: visual.activeCharacterClip ?? null,
      clipTime: activeClientAction ? Number(activeClientAction.time ?? 0) : null,
      clipPlaybackSpeed: activeClientAction
        ? Number(activeClientAction.getEffectiveTimeScale?.() ?? 1)
        : null,
    },
    clientVisibleBones: {
      head: visiblePoints.head ?? null,
      neck: visiblePoints.neck ?? null,
      spine: visiblePoints.spine ?? null,
      pelvis: visiblePoints.pelvis ?? null,
    },
    clientLocalSnapshot: pickAuditCoreSnapshot(localSnapshot),
  });
}
