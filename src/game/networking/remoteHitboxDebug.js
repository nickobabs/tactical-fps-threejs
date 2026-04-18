import * as THREE from 'three';
import { computePlayerHitboxLayout, createPlayerHitboxLayout } from '../../shared/playerHitboxes.js';
import {
  buildRemoteHitboxSnapshotFromPoints,
  createRemoteHitboxPointCache,
  createRemoteHitboxSnapshot,
  REMOTE_HITBOX_HEAD_OFFSET,
} from '../../shared/remoteHitboxes.js';
import { REMOTE_CHARACTER_HITBOX_SETTINGS } from '../../shared/remoteCharacterConfig.js';
import {
  getLagCompensationRewindMs,
  getTimelineNow,
  interpolateRemotePlayerSnapshotAtTime,
} from '../../shared/remoteTimeline.js';

export const DEFAULT_REMOTE_HITBOX_DEBUG_SETTINGS = {
  enabled: false,
  showLatestHitboxes: true,
  showLatestMarkers: true,
  showRewoundHitboxes: false,
  showRewoundMarkers: false,
};

const REMOTE_HITBOX_LAYOUT = createPlayerHitboxLayout();
const REMOTE_HITBOX_SEGMENT_START = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_END = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_CENTER = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_DIRECTION = new THREE.Vector3();
const REMOTE_HITBOX_UP_AXIS = new THREE.Vector3(0, 1, 0);
const REMOTE_HITBOX_WORLD_POINT = new THREE.Vector3();
const REMOTE_DEBUG_RENDERED_POSITION = new THREE.Vector3();
const REMOTE_DEBUG_AUTHORITATIVE_POSITION = new THREE.Vector3();
const REMOTE_DEBUG_POSITION_DELTA = new THREE.Vector3();
const REMOTE_LOCAL_HITBOX_POINTS = createRemoteHitboxPointCache();
const REMOTE_LOCAL_HITBOX_SNAPSHOT = createRemoteHitboxSnapshot();
const DEBUG_BASIS_RIGHT = new THREE.Vector3();
const DEBUG_BASIS_UP = new THREE.Vector3();
const DEBUG_BASIS_FORWARD = new THREE.Vector3();

function createRemoteHitCapsuleDebugMesh(color) {
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });
  const group = new THREE.Group();
  const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 12, 1, true), material);
  const top = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), material);
  const bottom = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), material);
  group.add(cylinder, top, bottom);
  return { group, cylinder, top, bottom };
}

function createRemoteHitSphereDebugMesh(color) {
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), material);
}

function updateRemoteHitEllipsoidDebugMesh(debugMesh, ellipsoid) {
  if (!debugMesh || !ellipsoid?.center) {
    return;
  }

  debugMesh.position.set(
    Number(ellipsoid.center.x ?? 0),
    Number(ellipsoid.center.y ?? 0),
    Number(ellipsoid.center.z ?? 0),
  );
  debugMesh.scale.set(
    Math.max(0.001, Number(ellipsoid.size?.x ?? Number(ellipsoid.radius ?? 0.15) * 2) * 0.5),
    Math.max(0.001, Number(ellipsoid.size?.y ?? Number(ellipsoid.radius ?? 0.15) * 2) * 0.5),
    Math.max(0.001, Number(ellipsoid.size?.z ?? Number(ellipsoid.radius ?? 0.15) * 2) * 0.5),
  );

  if (ellipsoid.right && ellipsoid.up && ellipsoid.forward) {
    const basis = new THREE.Matrix4().makeBasis(
      DEBUG_BASIS_RIGHT.set(ellipsoid.right.x, ellipsoid.right.y, ellipsoid.right.z),
      DEBUG_BASIS_UP.set(ellipsoid.up.x, ellipsoid.up.y, ellipsoid.up.z),
      DEBUG_BASIS_FORWARD.set(ellipsoid.forward.x, ellipsoid.forward.y, ellipsoid.forward.z),
    );
    debugMesh.quaternion.setFromRotationMatrix(basis);
  } else {
    debugMesh.quaternion.identity();
  }
}

function updateRemoteHitCapsuleDebugMesh(debugMesh, segment) {
  REMOTE_HITBOX_SEGMENT_START.set(segment.start.x, segment.start.y, segment.start.z);
  REMOTE_HITBOX_SEGMENT_END.set(segment.end.x, segment.end.y, segment.end.z);
  REMOTE_HITBOX_SEGMENT_CENTER.copy(REMOTE_HITBOX_SEGMENT_START).add(REMOTE_HITBOX_SEGMENT_END).multiplyScalar(0.5);
  REMOTE_HITBOX_SEGMENT_DIRECTION.copy(REMOTE_HITBOX_SEGMENT_END).sub(REMOTE_HITBOX_SEGMENT_START);
  const length = Math.max(0.001, REMOTE_HITBOX_SEGMENT_DIRECTION.length());
  REMOTE_HITBOX_SEGMENT_DIRECTION.normalize();

  debugMesh.group.position.copy(REMOTE_HITBOX_SEGMENT_CENTER);
  debugMesh.group.quaternion.setFromUnitVectors(REMOTE_HITBOX_UP_AXIS, REMOTE_HITBOX_SEGMENT_DIRECTION);
  debugMesh.cylinder.scale.set(segment.radius, length, segment.radius);
  debugMesh.top.position.set(0, length * 0.5, 0);
  debugMesh.bottom.position.set(0, -length * 0.5, 0);
  debugMesh.top.scale.setScalar(segment.radius);
  debugMesh.bottom.scale.setScalar(segment.radius);
}

function createRemoteHitVolumeDebugGroup(colors = {}) {
  const group = new THREE.Group();
  group.renderOrder = 1200;

  const head = createRemoteHitSphereDebugMesh(colors.head ?? 0xff5d5d);
  const torso = createRemoteHitCapsuleDebugMesh(colors.torso ?? 0x6bd3ff);
  const pelvis = createRemoteHitCapsuleDebugMesh(colors.pelvis ?? 0x8cff7a);
  const arms = Array.from({ length: 6 }, () => createRemoteHitCapsuleDebugMesh(colors.arms ?? 0xffd166));
  const hands = [
    createRemoteHitSphereDebugMesh(colors.hands ?? colors.arms ?? 0xffd166),
    createRemoteHitSphereDebugMesh(colors.hands ?? colors.arms ?? 0xffd166),
  ];
  const legs = Array.from({ length: 4 }, () => createRemoteHitCapsuleDebugMesh(colors.legs ?? 0xc792ff));

  group.add(
    head,
    torso.group,
    pelvis.group,
    ...arms.map((entry) => entry.group),
    ...hands,
    ...legs.map((entry) => entry.group),
  );

  return { group, head, torso, pelvis, arms, hands, legs };
}

function createRemotePositionDebugGroup() {
  const group = new THREE.Group();
  const renderedMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0x32d17c, depthTest: false, transparent: true, opacity: 0.95 }),
  );
  const authoritativeMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0xff5b5b, depthTest: false, transparent: true, opacity: 0.95 }),
  );
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6), 3));
  const connector = new THREE.Line(
    lineGeometry,
    new THREE.LineBasicMaterial({ color: 0xffd54d, depthTest: false, transparent: true, opacity: 0.9 }),
  );
  connector.renderOrder = 999;
  renderedMarker.renderOrder = 999;
  authoritativeMarker.renderOrder = 999;
  group.add(connector, renderedMarker, authoritativeMarker);
  return {
    group,
    renderedMarker,
    authoritativeMarker,
    connector,
  };
}

function updateRemotePositionDebugGroup(debugGroup, renderedPosition, authoritativePosition) {
  if (!debugGroup || !renderedPosition || !authoritativePosition) {
    return;
  }

  debugGroup.renderedMarker.position.set(renderedPosition.x, renderedPosition.y + 0.05, renderedPosition.z);
  debugGroup.authoritativeMarker.position.set(authoritativePosition.x, authoritativePosition.y + 0.05, authoritativePosition.z);

  const positions = debugGroup.connector.geometry.attributes.position.array;
  positions[0] = renderedPosition.x;
  positions[1] = renderedPosition.y + 0.05;
  positions[2] = renderedPosition.z;
  positions[3] = authoritativePosition.x;
  positions[4] = authoritativePosition.y + 0.05;
  positions[5] = authoritativePosition.z;
  debugGroup.connector.geometry.attributes.position.needsUpdate = true;
  debugGroup.connector.geometry.computeBoundingSphere();
}

function hasCompleteRemoteHitBones(bones) {
  return Boolean(
    bones?.head
    && bones?.neck
    && bones?.spine
    && bones?.pelvis
    && bones?.leftClavicle
    && bones?.leftUpperArm
    && bones?.leftForearm
    && bones?.leftHand
    && bones?.rightClavicle
    && bones?.rightUpperArm
    && bones?.rightForearm
    && bones?.rightHand
    && bones?.leftThigh
    && bones?.leftCalf
    && bones?.leftFoot
    && bones?.rightThigh
    && bones?.rightCalf
    && bones?.rightFoot
  );
}

function updateRemoteHitVolumeDebugGroup(debugGroup, player, standHeight) {
  if (!debugGroup) {
    return;
  }

  const layout = computePlayerHitboxLayout({
    position: player.position,
    yaw: player.yaw ?? 0,
    currentHeight: player.currentHeight ?? standHeight,
    isCrouched: player.isCrouched ?? false,
    activeWeaponKey: player.activeWeaponKey ?? 'rifle',
  }, REMOTE_HITBOX_LAYOUT);

  updateRemoteHitEllipsoidDebugMesh(debugGroup.head, {
    center: layout.head.center,
    radius: layout.head.radius,
    size: {
      x: layout.head.radius * 2,
      y: layout.head.radius * 2,
      z: layout.head.radius * 2,
    },
  });
  updateRemoteHitCapsuleDebugMesh(debugGroup.torso, layout.torso);
  updateRemoteHitCapsuleDebugMesh(debugGroup.pelvis, layout.pelvis);
  updateRemoteHitCapsuleDebugMesh(debugGroup.arms[0], layout.arms[0]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.arms[1], layout.arms[1]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.arms[2], layout.arms[2]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.arms[3], layout.arms[3]);
  debugGroup.arms[4].group.visible = false;
  debugGroup.arms[5].group.visible = false;
  debugGroup.hands[0].visible = false;
  debugGroup.hands[1].visible = false;
  updateRemoteHitCapsuleDebugMesh(debugGroup.legs[0], layout.legs[0]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.legs[1], layout.legs[1]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.legs[2], layout.legs[2]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.legs[3], layout.legs[3]);
}

function updateRemoteAuthoritativeHitVolumeDebugGroup(debugGroup, hitboxes) {
  if (!debugGroup || !hitboxes?.head || !hitboxes?.torso || !hitboxes?.pelvis) {
    return false;
  }

  updateRemoteHitEllipsoidDebugMesh(debugGroup.head, hitboxes.head);
  updateRemoteHitCapsuleDebugMesh(debugGroup.torso, hitboxes.torso);
  updateRemoteHitCapsuleDebugMesh(debugGroup.pelvis, hitboxes.pelvis);

  for (let index = 0; index < debugGroup.arms.length; index += 1) {
    const arm = hitboxes.arms?.[index] ?? null;
    debugGroup.arms[index].group.visible = Boolean(arm);
    if (arm) {
      updateRemoteHitCapsuleDebugMesh(debugGroup.arms[index], arm);
    }
  }

  for (let index = 0; index < debugGroup.hands.length; index += 1) {
    const hand = hitboxes.hands?.[index] ?? null;
    debugGroup.hands[index].visible = Boolean(hand);
    if (hand) {
      debugGroup.hands[index].position.set(hand.center.x, hand.center.y, hand.center.z);
      debugGroup.hands[index].scale.setScalar(hand.radius);
    }
  }

  for (let index = 0; index < debugGroup.legs.length; index += 1) {
    const leg = hitboxes.legs?.[index] ?? null;
    debugGroup.legs[index].group.visible = Boolean(leg);
    if (leg) {
      updateRemoteHitCapsuleDebugMesh(debugGroup.legs[index], leg);
    }
  }

  return true;
}

function updateRemoteBoneDrivenHitVolumeDebugGroup(debugGroup, bones, localHitboxSettings) {
  if (!debugGroup || !hasCompleteRemoteHitBones(bones)) {
    return false;
  }

  for (const [key, point] of Object.entries(REMOTE_LOCAL_HITBOX_POINTS)) {
    const bone = bones[key];
    if (!bone?.getWorldPosition) {
      return false;
    }
    bone.getWorldPosition(REMOTE_HITBOX_WORLD_POINT);
    point.x = REMOTE_HITBOX_WORLD_POINT.x;
    point.y = REMOTE_HITBOX_WORLD_POINT.y;
    point.z = REMOTE_HITBOX_WORLD_POINT.z;
  }

  const localSnapshot = buildRemoteHitboxSnapshotFromPoints({
    points: REMOTE_LOCAL_HITBOX_POINTS,
    headOffset: localHitboxSettings.headOffset,
    headRadius: localHitboxSettings.headRadius,
    headSize: localHitboxSettings.headSize,
    torsoRadius: localHitboxSettings.torsoRadius,
    torsoLengthPadding: localHitboxSettings.torsoLengthPadding,
    pelvisRadius: localHitboxSettings.pelvisRadius,
    pelvisLengthPadding: localHitboxSettings.pelvisLengthPadding,
    armRadius: localHitboxSettings.armRadius,
    armLengthPadding: localHitboxSettings.armLengthPadding,
    handRadius: localHitboxSettings.handRadius,
    legRadius: localHitboxSettings.legRadius,
    legLengthPadding: localHitboxSettings.legLengthPadding,
  }, REMOTE_LOCAL_HITBOX_SNAPSHOT);

  return updateRemoteAuthoritativeHitVolumeDebugGroup(debugGroup, localSnapshot);
}

export function createRemoteDebugAttachments() {
  const hitVolumeDebugGroup = createRemoteHitVolumeDebugGroup();
  hitVolumeDebugGroup.group.visible = false;
  const positionDebugGroup = createRemotePositionDebugGroup();
  positionDebugGroup.group.visible = false;
  const rewoundHitVolumeDebugGroup = createRemoteHitVolumeDebugGroup({
    head: 0xffb36b,
    torso: 0xffc874,
    pelvis: 0xffdf8b,
    arms: 0xffcf76,
    hands: 0xffcf76,
    legs: 0xe1a95f,
  });
  rewoundHitVolumeDebugGroup.group.visible = false;
  const rewoundPositionDebugGroup = createRemotePositionDebugGroup();
  rewoundPositionDebugGroup.renderedMarker.material.color.setHex(0x67d7ff);
  rewoundPositionDebugGroup.authoritativeMarker.material.color.setHex(0xffb347);
  rewoundPositionDebugGroup.connector.material.color.setHex(0xffb347);
  rewoundPositionDebugGroup.group.visible = false;

  return {
    hitVolumeDebugGroup,
    positionDebugGroup,
    rewoundHitVolumeDebugGroup,
    rewoundPositionDebugGroup,
    showHitVolumeDebug: false,
    latestDebugState: null,
  };
}

export function syncRemoteHitboxDebug({
  visual,
  player,
  authoritativeSnapshots,
  authoritativeState,
  showHitVolumeDebug,
  hitboxDebugSettings,
  hideForSpectator,
  debugPingRoundTripMs,
  localHitboxDebugEnabled,
  localHitboxSettings,
  standHeight,
}) {
  const rewindMs = getLagCompensationRewindMs(debugPingRoundTripMs);
  const rewoundState = interpolateRemotePlayerSnapshotAtTime(authoritativeSnapshots, getTimelineNow() - rewindMs);
  const debugEnabled = showHitVolumeDebug && !hideForSpectator;

  visual.hitVolumeDebugGroup.group.visible = debugEnabled && hitboxDebugSettings.showLatestHitboxes;
  visual.positionDebugGroup.group.visible = debugEnabled && hitboxDebugSettings.showLatestMarkers && Boolean(authoritativeState?.position);
  visual.rewoundHitVolumeDebugGroup.group.visible = debugEnabled && hitboxDebugSettings.showRewoundHitboxes;
  visual.rewoundPositionDebugGroup.group.visible = debugEnabled && hitboxDebugSettings.showRewoundMarkers && Boolean(rewoundState?.position);

  if (showHitVolumeDebug && !hideForSpectator && authoritativeState?.position) {
    REMOTE_DEBUG_RENDERED_POSITION.copy(visual.root.position);
    REMOTE_DEBUG_AUTHORITATIVE_POSITION.set(
      Number(authoritativeState.position.x ?? 0),
      Number(authoritativeState.position.y ?? 0),
      Number(authoritativeState.position.z ?? 0),
    );
    REMOTE_DEBUG_POSITION_DELTA.subVectors(REMOTE_DEBUG_AUTHORITATIVE_POSITION, REMOTE_DEBUG_RENDERED_POSITION);
    updateRemotePositionDebugGroup(
      visual.positionDebugGroup,
      REMOTE_DEBUG_RENDERED_POSITION,
      REMOTE_DEBUG_AUTHORITATIVE_POSITION,
    );
    visual.latestDebugState = {
      playerId: player.playerId,
      displayName: player.displayName ?? authoritativeState.displayName ?? player.playerId,
      renderedPosition: {
        x: REMOTE_DEBUG_RENDERED_POSITION.x,
        y: REMOTE_DEBUG_RENDERED_POSITION.y,
        z: REMOTE_DEBUG_RENDERED_POSITION.z,
      },
      authoritativePosition: {
        x: REMOTE_DEBUG_AUTHORITATIVE_POSITION.x,
        y: REMOTE_DEBUG_AUTHORITATIVE_POSITION.y,
        z: REMOTE_DEBUG_AUTHORITATIVE_POSITION.z,
      },
      delta: {
        x: REMOTE_DEBUG_POSITION_DELTA.x,
        y: REMOTE_DEBUG_POSITION_DELTA.y,
        z: REMOTE_DEBUG_POSITION_DELTA.z,
      },
      distance: REMOTE_DEBUG_POSITION_DELTA.length(),
      horizontalDistance: Math.hypot(REMOTE_DEBUG_POSITION_DELTA.x, REMOTE_DEBUG_POSITION_DELTA.z),
      snapshotAgeMs: Number.isFinite(authoritativeState.receivedAt) ? Math.max(0, getTimelineNow() - authoritativeState.receivedAt) : null,
      animation: visual.animationDebugState
        ? {
          presentationState: visual.animationDebugState.presentationState ?? null,
          targetClip: visual.animationDebugState.targetClip ?? null,
          baseClip: visual.animationDebugState.baseClip ?? null,
          activeCharacterClip: visual.animationDebugState.activeCharacterClip ?? null,
          activeUpperBodyClip: visual.animationDebugState.activeUpperBodyClip ?? null,
          fullBodyActionClip: visual.animationDebugState.fullBodyActionClip ?? null,
          upperBodyActionTime: Number(visual.animationDebugState.upperBodyActionTime ?? 0),
          fullBodyActionTime: Number(visual.animationDebugState.fullBodyActionTime ?? 0),
          fireBaseLocked: Boolean(visual.animationDebugState.fireBaseLocked),
          freezePose: Boolean(visual.animationDebugState.freezePose),
        }
        : null,
      playerState: {
        currentHeight: Number(player.currentHeight ?? authoritativeState?.currentHeight ?? 0),
        isCrouched: Boolean(player.isCrouched ?? authoritativeState?.isCrouched),
        crouchFatigue: Number(authoritativeState?.crouchFatigue ?? 0),
        crouchToggleCount: Number(authoritativeState?.crouchToggleCount ?? 0),
        timeSinceCrouchToggle: authoritativeState?.timeSinceCrouchToggle == null
          ? null
          : Number(authoritativeState.timeSinceCrouchToggle),
        activeWeaponKey: String(authoritativeState?.activeWeaponKey ?? player.activeWeaponKey ?? 'rifle'),
        presentationState: String(player.presentationState ?? authoritativeState?.presentationState ?? 'idle'),
      },
    };
  } else {
    visual.latestDebugState = null;
  }

  if (debugEnabled && hitboxDebugSettings.showLatestHitboxes) {
    const usedAuthoritativeHitboxes = !localHitboxDebugEnabled && updateRemoteAuthoritativeHitVolumeDebugGroup(
      visual.hitVolumeDebugGroup,
      authoritativeState?.hitboxes,
    );
    if (!usedAuthoritativeHitboxes) {
      const usedBoneDrivenHitboxes = updateRemoteBoneDrivenHitVolumeDebugGroup(
        visual.hitVolumeDebugGroup,
        visual.characterHitBones,
        localHitboxSettings,
      );
      if (!usedBoneDrivenHitboxes) {
        updateRemoteHitVolumeDebugGroup(visual.hitVolumeDebugGroup, {
          position: player.position,
          yaw: player.yaw,
          currentHeight: player.currentHeight ?? authoritativeState?.currentHeight,
          isCrouched: player.isCrouched ?? authoritativeState?.isCrouched,
          activeWeaponKey: authoritativeState?.activeWeaponKey ?? player.activeWeaponKey,
        }, standHeight);
      }
    }
  }

  if (debugEnabled && hitboxDebugSettings.showRewoundHitboxes) {
    updateRemoteAuthoritativeHitVolumeDebugGroup(
      visual.rewoundHitVolumeDebugGroup,
      rewoundState?.hitboxes,
    );
  }

  if (debugEnabled && hitboxDebugSettings.showRewoundMarkers && rewoundState?.position) {
    REMOTE_DEBUG_RENDERED_POSITION.copy(visual.root.position);
    REMOTE_DEBUG_AUTHORITATIVE_POSITION.set(
      Number(rewoundState.position.x ?? 0),
      Number(rewoundState.position.y ?? 0),
      Number(rewoundState.position.z ?? 0),
    );
    updateRemotePositionDebugGroup(
      visual.rewoundPositionDebugGroup,
      REMOTE_DEBUG_RENDERED_POSITION,
      REMOTE_DEBUG_AUTHORITATIVE_POSITION,
    );
  }

  if (visual.latestDebugState) {
    if (rewoundState?.position) {
      REMOTE_DEBUG_RENDERED_POSITION.copy(visual.root.position);
      REMOTE_DEBUG_AUTHORITATIVE_POSITION.set(
        Number(rewoundState.position.x ?? 0),
        Number(rewoundState.position.y ?? 0),
        Number(rewoundState.position.z ?? 0),
      );
      REMOTE_DEBUG_POSITION_DELTA.subVectors(REMOTE_DEBUG_AUTHORITATIVE_POSITION, REMOTE_DEBUG_RENDERED_POSITION);
      visual.latestDebugState.rewoundPosition = {
        x: REMOTE_DEBUG_AUTHORITATIVE_POSITION.x,
        y: REMOTE_DEBUG_AUTHORITATIVE_POSITION.y,
        z: REMOTE_DEBUG_AUTHORITATIVE_POSITION.z,
      };
      visual.latestDebugState.rewoundDelta = {
        x: REMOTE_DEBUG_POSITION_DELTA.x,
        y: REMOTE_DEBUG_POSITION_DELTA.y,
        z: REMOTE_DEBUG_POSITION_DELTA.z,
      };
      visual.latestDebugState.rewoundDistance = REMOTE_DEBUG_POSITION_DELTA.length();
      visual.latestDebugState.rewoundHorizontalDistance = Math.hypot(REMOTE_DEBUG_POSITION_DELTA.x, REMOTE_DEBUG_POSITION_DELTA.z);
      visual.latestDebugState.rewindMs = rewindMs;
      visual.latestDebugState.rewoundSnapshotAgeMs = Number.isFinite(rewoundState.receivedAt)
        ? Math.max(0, getTimelineNow() - rewoundState.receivedAt)
        : null;
    } else {
      visual.latestDebugState.rewoundPosition = null;
      visual.latestDebugState.rewoundDelta = null;
      visual.latestDebugState.rewoundDistance = 0;
      visual.latestDebugState.rewoundHorizontalDistance = 0;
      visual.latestDebugState.rewindMs = rewindMs;
      visual.latestDebugState.rewoundSnapshotAgeMs = null;
    }
  }
}

export function collectRemoteHitboxDebugState(remotePlayerMeshes, showHitVolumeDebug, hitboxDebugSettings) {
  let focus = null;
  for (const visual of remotePlayerMeshes.values()) {
    if (!visual?.latestDebugState) {
      continue;
    }
    if (!focus || Number(visual.latestDebugState.horizontalDistance ?? 0) > Number(focus.horizontalDistance ?? 0)) {
      focus = visual.latestDebugState;
    }
  }

  return {
    showHitVolumeDebug,
    trackedRemoteCount: remotePlayerMeshes.size,
    focusPlayerId: focus?.playerId ?? null,
    focusDisplayName: focus?.displayName ?? null,
    renderedPosition: focus?.renderedPosition ?? null,
    authoritativePosition: focus?.authoritativePosition ?? null,
    delta: focus?.delta ?? null,
    distance: focus?.distance ?? 0,
    horizontalDistance: focus?.horizontalDistance ?? 0,
    snapshotAgeMs: focus?.snapshotAgeMs ?? null,
    rewoundPosition: focus?.rewoundPosition ?? null,
    rewoundDelta: focus?.rewoundDelta ?? null,
    rewoundDistance: focus?.rewoundDistance ?? 0,
    rewoundHorizontalDistance: focus?.rewoundHorizontalDistance ?? 0,
    rewoundSnapshotAgeMs: focus?.rewoundSnapshotAgeMs ?? null,
    rewindMs: focus?.rewindMs ?? 0,
    animation: focus?.animation ?? null,
    playerState: focus?.playerState ?? null,
    settings: { ...hitboxDebugSettings },
  };
}
