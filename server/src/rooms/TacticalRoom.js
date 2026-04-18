import * as THREE from 'three';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Room } from '@colyseus/core';
import { CollisionWorld } from '../../../src/core/physics/CollisionWorld.js';
import {
  createPlayerMovementState,
  simulatePlayerMovement,
} from '../../../src/shared/playerMovement.js';
import {
  NETCODE_SIMULATION_RATE,
  NETCODE_SIMULATION_STEP,
  NETCODE_SERVER_HITBOX_HISTORY_MS,
} from '../../../src/shared/netcode.js';
import {
  getLagCompensationRewindMs,
  interpolateRemoteHitboxHistoryAtTime,
} from '../../../src/shared/remoteTimeline.js';
import {
  createBuyRequestMessage,
  createChatMessage,
  createPlayerInputMessage,
  createPlayerFireMessage,
  createDebugRoundControlMessage,
  createGamemodeChangeMessage,
  createPlayerReadyMessage,
  createSmokeThrowMessage,
  createPlayerStatusMessage,
  serializeAuthoritativePlayerState,
} from '../../../src/shared/netcodeProtocol.js';
import { TEAMS } from '../../../src/shared/constants.js';
import { createCollisionMapForMapIdAsync } from '../../../src/shared/maps/mapCollision.js';
import { getMapManifestEntry } from '../../../src/shared/maps/mapManifest.js';
import {
  getImportedPlantZoneNamesFromEntryAsync,
  getPlantZoneNamesFromEntry,
} from '../../../src/shared/maps/mapPlantZones.js';
import { getImportedTeamSpawnPointsFromEntryAsync } from '../../../src/shared/maps/mapTeamSpawns.js';
import {
  createBombObjectiveSnapshot,
  DEFAULT_BOMB_DURATION,
  getBombPulseIntervalSeconds,
  selectBombCarrierPlayerId,
} from '../../../src/shared/bombObjective.js';
import { GAMEMODES, isCompetitiveGamemode, sanitizeGamemodeForMap } from '../../../src/shared/gamemodes.js';
import {
  getSharedWeaponData,
  PLAYER_MAX_HEALTH,
  PLAYER_RESPAWN_DELAY_MS,
} from '../../../src/shared/weaponData.js';
import {
  REMOTE_FOOTSTEP_AUDIO,
  REMOTE_FOOTSTEP_AUDIBLE_SPEED_FLOOR,
  REMOTE_FOOTSTEP_MIN_HORIZONTAL_SPEED,
  REMOTE_FOOTSTEP_SAMPLE_COUNT,
  REMOTE_FOOTSTEP_STRIDE_DISTANCE_CROUCH,
  REMOTE_FOOTSTEP_STRIDE_DISTANCE_WALK,
  REMOTE_UTILITY_AUDIO,
  pickRemoteWeaponAudioSoundKey,
  REMOTE_WEAPON_AUDIO,
} from '../../../src/shared/audioEvents.js';
import { RoundManager } from '../../../src/game/rounds/RoundManager.js';
import { computePlayerHitboxLayout, createPlayerHitboxLayout } from '../../../src/shared/playerHitboxes.js';
import {
  buildRemoteHitboxSnapshotFromPoints,
  createRemoteHitboxSnapshot,
  interpolateRemoteHitboxSnapshots,
  REMOTE_HITBOX_HEAD_OFFSET,
  REMOTE_HITBOX_RADII,
} from '../../../src/shared/remoteHitboxes.js';
import { getMissingRemoteHitBoneKeys } from '../../../src/shared/remoteSkeleton.js';
import {
  createRemoteHitboxRig,
  triggerRemoteHitboxRigFire,
  updateRemoteHitboxRig,
} from '../remoteHitboxRig.js';
import {
  REMOTE_CHARACTER_HITBOX_SETTINGS,
  REMOTE_CLIPS,
} from '../../../src/shared/remoteCharacterConfig.js';

const SERVER_MOVE_POSITION = new THREE.Vector3();
const SHOT_ORIGIN = new THREE.Vector3();
const SHOT_DIRECTION = new THREE.Vector3();
const SHOT_TRACE_END = new THREE.Vector3();
const PLAYER_EYE = new THREE.Vector3();
const TARGET_SEGMENT = new THREE.Line3();
const CLOSEST_POINT_ON_RAY = new THREE.Vector3();
const CLOSEST_POINT_ON_SEGMENT = new THREE.Vector3();
const TARGET_POINT = new THREE.Vector3();
const TARGET_RIGHT = new THREE.Vector3();
const TARGET_FORWARD = new THREE.Vector3();
const TARGET_SHOULDER = new THREE.Vector3();
const TARGET_HAND = new THREE.Vector3();
const TARGET_LEG_START = new THREE.Vector3();
const TARGET_LEG_END = new THREE.Vector3();
const TARGET_DEATH_FORWARD = new THREE.Vector3();
const TARGET_TEST_VECTOR = new THREE.Vector3();
const OBJECTIVE_TO_BOMB = new THREE.Vector3();
const OBJECTIVE_DIRECTION = new THREE.Vector3();
const SHOT_RAY = new THREE.Ray();
const PLAYER_MOVE_SPEED_EPSILON = 0.1;
const TARGET_HITBOX_LAYOUT = createPlayerHitboxLayout();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REMOTE_HITBOX_AUDIT_LOG_PATH = path.resolve(__dirname, '../../../debug/remote-hitbox-audit.log');
const MAX_SCOREBOARD_PING_MS = 999;
const MAX_DISPLAY_NAME_LENGTH = 24;
const SERVER_OBJECTIVE_STEP = 1 / NETCODE_SIMULATION_RATE;
const BOMB_DEFUSE_MAX_DISTANCE = 2.4;
const BOMB_DEFUSE_AIM_DOT_THRESHOLD = 0.96;
const BOMB_DROP_FORWARD_DISTANCE = 0.85;
const BOMB_DROP_HEIGHT_OFFSET = 0.08;
const BOMB_PICKUP_RADIUS = 1.1;
const BOMB_DROPPER_PICKUP_LOCK_MS = 750;
const BOMB_EXPLOSION_LETHAL_RADIUS = 30;
const BOMB_EXPLOSION_MAX_RADIUS = 100;
const FOOTSTEP_POSITION_Y_OFFSET = 0.08;
const SMOKE_BLOOM_MAX_VALIDATE_DISTANCE = 32;
const SMOKE_THROW_MAX_VALIDATE_DISTANCE = 3;
const DEFAULT_GAMEPLAY_SETTINGS = Object.freeze({
  infiniteAmmoEnabled: true,
});

function createGameplaySettingsForGamemode(gamemode) {
  return {
    ...DEFAULT_GAMEPLAY_SETTINGS,
    infiniteAmmoEnabled: !isCompetitiveGamemode(gamemode),
  };
}

function isSniperWeaponKey(weaponKey) {
  return String(weaponKey ?? '') === 'sniper';
}

function getFreezeLockedInput(input) {
  return {
    ...input,
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    walk: false,
    crouch: false,
    jump: false,
  };
}

function shuffleArray(values) {
  const nextValues = Array.isArray(values) ? [...values] : [];
  for (let index = nextValues.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextValues[index], nextValues[swapIndex]] = [nextValues[swapIndex], nextValues[index]];
  }
  return nextValues;
}

async function appendRemoteHitboxAudit(entry) {
  await fs.mkdir(path.dirname(REMOTE_HITBOX_AUDIT_LOG_PATH), { recursive: true });
  await fs.appendFile(REMOTE_HITBOX_AUDIT_LOG_PATH, `${JSON.stringify(entry)}\n`, 'utf8');
}

function buildAuthoritativeHitboxes(player) {
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

function recordPlayerHitboxHistory(player, now) {
  if (!player?.authoritativeHitboxes) {
    return;
  }

  const snapshot = cloneHitboxSnapshot(player.authoritativeHitboxes);
  if (!snapshot) {
    return;
  }

  const history = player.hitboxHistory ?? (player.hitboxHistory = []);
  history.push({
    recordedAt: Number(now ?? Date.now()),
    hitboxes: snapshot,
  });

  const cutoff = Number(now ?? Date.now()) - NETCODE_SERVER_HITBOX_HISTORY_MS;
  while (history.length > 0 && Number(history[0]?.recordedAt ?? 0) < cutoff) {
    history.shift();
  }
}

function getLagCompensatedHitboxes(target, rewindTimestamp) {
  const history = target?.hitboxHistory ?? null;
  if (!Array.isArray(history) || history.length === 0) {
    return target?.authoritativeHitboxes ?? null;
  }
  return interpolateRemoteHitboxHistoryAtTime(history, rewindTimestamp)
    ?? target?.authoritativeHitboxes
    ?? null;
}

function getRayDistanceAlong(ray, point) {
  return TARGET_TEST_VECTOR.copy(point).sub(ray.origin).dot(ray.direction);
}

function getRaySphereHitDistance(ray, center, radius, maxDistance) {
  const projectedDistance = getRayDistanceAlong(ray, center);
  if (projectedDistance < -radius || projectedDistance >= maxDistance + radius) {
    return Infinity;
  }

  const distanceSq = ray.distanceSqToPoint(center);
  if (distanceSq > radius * radius) {
    return Infinity;
  }

  return Math.max(0, projectedDistance);
}

function getRayEllipsoidHitDistance(ray, ellipsoid, maxDistance) {
  const center = ellipsoid?.center ?? null;
  const size = ellipsoid?.size ?? null;
  const right = ellipsoid?.right ?? null;
  const up = ellipsoid?.up ?? null;
  const forward = ellipsoid?.forward ?? null;
  if (!center || !size || !right || !up || !forward) {
    return Infinity;
  }

  const halfX = Math.max(1e-6, Number(size.x ?? 0) * 0.5);
  const halfY = Math.max(1e-6, Number(size.y ?? 0) * 0.5);
  const halfZ = Math.max(1e-6, Number(size.z ?? 0) * 0.5);
  TARGET_TEST_VECTOR.set(
    Number(ray.origin.x ?? 0) - Number(center.x ?? 0),
    Number(ray.origin.y ?? 0) - Number(center.y ?? 0),
    Number(ray.origin.z ?? 0) - Number(center.z ?? 0),
  );
  TARGET_RIGHT.set(Number(right.x ?? 1), Number(right.y ?? 0), Number(right.z ?? 0)).normalize();
  TARGET_FORWARD.set(Number(up.x ?? 0), Number(up.y ?? 1), Number(up.z ?? 0)).normalize();
  TARGET_SHOULDER.set(Number(forward.x ?? 0), Number(forward.y ?? 0), Number(forward.z ?? -1)).normalize();

  const originX = TARGET_TEST_VECTOR.dot(TARGET_RIGHT) / halfX;
  const originY = TARGET_TEST_VECTOR.dot(TARGET_FORWARD) / halfY;
  const originZ = TARGET_TEST_VECTOR.dot(TARGET_SHOULDER) / halfZ;
  const directionX = ray.direction.dot(TARGET_RIGHT) / halfX;
  const directionY = ray.direction.dot(TARGET_FORWARD) / halfY;
  const directionZ = ray.direction.dot(TARGET_SHOULDER) / halfZ;

  const a = (directionX * directionX) + (directionY * directionY) + (directionZ * directionZ);
  const b = 2 * ((originX * directionX) + (originY * directionY) + (originZ * directionZ));
  const c = (originX * originX) + (originY * originY) + (originZ * originZ) - 1;
  const discriminant = (b * b) - (4 * a * c);
  if (a <= 1e-8 || discriminant < 0) {
    return Infinity;
  }

  const sqrtDiscriminant = Math.sqrt(discriminant);
  const nearDistance = (-b - sqrtDiscriminant) / (2 * a);
  const farDistance = (-b + sqrtDiscriminant) / (2 * a);
  const hitDistance = nearDistance >= 0 ? nearDistance : farDistance;
  if (!Number.isFinite(hitDistance) || hitDistance < 0 || hitDistance >= maxDistance) {
    return Infinity;
  }
  return hitDistance;
}

function getRayCapsuleHitDistance(ray, start, end, radius, maxDistance) {
  const distanceSq = ray.distanceSqToSegment(
    start,
    end,
    CLOSEST_POINT_ON_RAY,
    CLOSEST_POINT_ON_SEGMENT,
  );
  if (distanceSq > radius * radius) {
    return Infinity;
  }

  const hitDistance = getRayDistanceAlong(ray, CLOSEST_POINT_ON_RAY);
  if (hitDistance < 0 || hitDistance >= maxDistance) {
    return Infinity;
  }

  return hitDistance;
}

function getWeaponDamageForHitZone(weapon, hitZone = 'body') {
  const damageByHitZone = weapon?.damageByHitZone ?? null;
  if (!damageByHitZone) {
    return Number(weapon?.damage ?? 0);
  }

  if (hitZone === 'head') {
    return Number(damageByHitZone.head ?? weapon.damage ?? 0);
  }

  if (hitZone === 'arms') {
    return Number(damageByHitZone.arms ?? damageByHitZone.body ?? weapon.damage ?? 0);
  }

  if (hitZone === 'legs') {
    return Number(damageByHitZone.legs ?? damageByHitZone.body ?? weapon.damage ?? 0);
  }

  return Number(damageByHitZone.body ?? weapon.damage ?? 0);
}

function getDeathClipForShot(target, shotDirection) {
  if (!target?.motionState || !shotDirection) {
    return REMOTE_CLIPS.dieBackward;
  }

  TARGET_DEATH_FORWARD.set(
    -Math.sin(Number(target.motionState.yaw ?? 0)),
    0,
    -Math.cos(Number(target.motionState.yaw ?? 0)),
  );
  return TARGET_DEATH_FORWARD.dot(shotDirection) > 0
    ? REMOTE_CLIPS.dieForward
    : REMOTE_CLIPS.dieBackward;
}

function getPlayerHitResult(ray, target, maxDistance, currentBestDistance) {
  const layout = computePlayerHitboxLayout({
    position: target.motionState.position,
    yaw: target.motionState?.yaw ?? 0,
    currentHeight: target.motionState?.currentHeight ?? 1.72,
    isCrouched: target.motionState?.isCrouched ?? false,
    activeWeaponKey: target.activeWeaponKey ?? 'rifle',
  }, TARGET_HITBOX_LAYOUT);

  let bestDistance = currentBestDistance;
  let bestHitZone = null;

  TARGET_POINT.set(layout.head.center.x, layout.head.center.y, layout.head.center.z);
  {
    const hitDistance = getRaySphereHitDistance(ray, TARGET_POINT, layout.head.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'head';
    }
  }

  TARGET_SEGMENT.start.set(layout.torso.start.x, layout.torso.start.y, layout.torso.start.z);
  TARGET_SEGMENT.end.set(layout.torso.end.x, layout.torso.end.y, layout.torso.end.z);
  {
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_SEGMENT.start, TARGET_SEGMENT.end, layout.torso.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'body';
    }
  }

  TARGET_SEGMENT.start.set(layout.pelvis.start.x, layout.pelvis.start.y, layout.pelvis.start.z);
  TARGET_SEGMENT.end.set(layout.pelvis.end.x, layout.pelvis.end.y, layout.pelvis.end.z);
  {
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_SEGMENT.start, TARGET_SEGMENT.end, layout.pelvis.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'body';
    }
  }

  for (const arm of layout.arms) {
    TARGET_SHOULDER.set(arm.start.x, arm.start.y, arm.start.z);
    TARGET_HAND.set(arm.end.x, arm.end.y, arm.end.z);
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_SHOULDER, TARGET_HAND, arm.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'arms';
    }
  }

  for (const leg of layout.legs) {
    TARGET_LEG_START.set(leg.start.x, leg.start.y, leg.start.z);
    TARGET_LEG_END.set(leg.end.x, leg.end.y, leg.end.z);
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_LEG_START, TARGET_LEG_END, leg.radius, bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'legs';
    }
  }

  return {
    distance: bestDistance,
    hitZone: bestHitZone,
  };
}

function getAuthoritativeHitboxSnapshotResult(ray, hitboxes, maxDistance, currentBestDistance) {
  if (!hitboxes?.head || !hitboxes?.torso || !hitboxes?.pelvis) {
    return {
      distance: Infinity,
      hitZone: null,
    };
  }

  let bestDistance = currentBestDistance;
  let bestHitZone = null;

  TARGET_POINT.set(hitboxes.head.center.x, hitboxes.head.center.y, hitboxes.head.center.z);
  {
    const hitDistance = hitboxes.head?.size && hitboxes.head?.right && hitboxes.head?.up && hitboxes.head?.forward
      ? getRayEllipsoidHitDistance(ray, hitboxes.head, bestDistance)
      : getRaySphereHitDistance(ray, TARGET_POINT, Number(hitboxes.head.radius ?? REMOTE_HITBOX_RADII.head), bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'head';
    }
  }

  TARGET_SEGMENT.start.set(hitboxes.torso.start.x, hitboxes.torso.start.y, hitboxes.torso.start.z);
  TARGET_SEGMENT.end.set(hitboxes.torso.end.x, hitboxes.torso.end.y, hitboxes.torso.end.z);
  {
    const hitDistance = getRayCapsuleHitDistance(
      ray,
      TARGET_SEGMENT.start,
      TARGET_SEGMENT.end,
      Number(hitboxes.torso.radius ?? REMOTE_HITBOX_RADII.torso),
      bestDistance,
    );
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'body';
    }
  }

  TARGET_SEGMENT.start.set(hitboxes.pelvis.start.x, hitboxes.pelvis.start.y, hitboxes.pelvis.start.z);
  TARGET_SEGMENT.end.set(hitboxes.pelvis.end.x, hitboxes.pelvis.end.y, hitboxes.pelvis.end.z);
  {
    const hitDistance = getRayCapsuleHitDistance(
      ray,
      TARGET_SEGMENT.start,
      TARGET_SEGMENT.end,
      Number(hitboxes.pelvis.radius ?? REMOTE_HITBOX_RADII.pelvis),
      bestDistance,
    );
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'body';
    }
  }

  for (const arm of hitboxes.arms ?? []) {
    if (!arm?.start || !arm?.end) {
      continue;
    }
    TARGET_SHOULDER.set(arm.start.x, arm.start.y, arm.start.z);
    TARGET_HAND.set(arm.end.x, arm.end.y, arm.end.z);
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_SHOULDER, TARGET_HAND, Number(arm.radius ?? REMOTE_HITBOX_RADII.arm), bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'arms';
    }
  }

  for (const hand of hitboxes.hands ?? []) {
    if (!hand?.center) {
      continue;
    }
    TARGET_POINT.set(hand.center.x, hand.center.y, hand.center.z);
    const hitDistance = getRaySphereHitDistance(ray, TARGET_POINT, Number(hand.radius ?? REMOTE_HITBOX_RADII.hand), bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'arms';
    }
  }

  for (const leg of hitboxes.legs ?? []) {
    if (!leg?.start || !leg?.end) {
      continue;
    }
    TARGET_LEG_START.set(leg.start.x, leg.start.y, leg.start.z);
    TARGET_LEG_END.set(leg.end.x, leg.end.y, leg.end.z);
    const hitDistance = getRayCapsuleHitDistance(ray, TARGET_LEG_START, TARGET_LEG_END, Number(leg.radius ?? REMOTE_HITBOX_RADII.leg), bestDistance);
    if (Number.isFinite(hitDistance) && hitDistance < bestDistance) {
      bestDistance = hitDistance;
      bestHitZone = 'legs';
    }
  }

  return {
    distance: bestDistance,
    hitZone: bestHitZone,
  };
}

export class TacticalRoom extends Room {
  sanitizeTeam(team) {
    return team === TEAMS.DEFENDERS ? TEAMS.DEFENDERS : TEAMS.ATTACKERS;
  }

  sanitizeDisplayName(value, fallback = 'Player') {
    const normalized = String(value ?? '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, MAX_DISPLAY_NAME_LENGTH);
    return normalized || fallback;
  }

  emitChatEvent(player, chatMessage) {
    if (!player || !chatMessage?.text) {
      return;
    }

    const event = {
      scope: chatMessage.scope === 'team' ? 'team' : 'all',
      text: String(chatMessage.text ?? ''),
      playerId: String(player.playerId ?? ''),
      displayName: this.sanitizeDisplayName(player.displayName, String(player.playerId ?? 'Player')),
      team: this.sanitizeTeam(player.team),
      sentAt: Date.now(),
    };

    for (const client of this.clients) {
      const recipient = this.players[client.sessionId];
      if (!recipient) {
        continue;
      }
      if (event.scope === 'team' && this.sanitizeTeam(recipient.team) !== event.team) {
        continue;
      }
      client.send('chat-event', event);
    }
  }

  createObjectiveState() {
    return {
      ...createBombObjectiveSnapshot(),
      bombBeepCountdown: 0,
    };
  }

  clearDefuserPlayer() {
    if (!this.objectiveState?.defuserPlayerId) {
      return false;
    }
    this.objectiveState.defuserPlayerId = null;
    return true;
  }

  getPlantZonesForMap(mapId) {
    return this.plantZoneNamesByMap.get(mapId) ?? [];
  }

  async ensurePlantZonesForMap(mapId) {
    const resolvedMapId = mapId ?? 'training-ground';
    if (this.plantZoneNamesByMap.has(resolvedMapId)) {
      return this.plantZoneNamesByMap.get(resolvedMapId);
    }

    if (this.plantZonePromises.has(resolvedMapId)) {
      return this.plantZonePromises.get(resolvedMapId);
    }

    const entry = getMapManifestEntry(resolvedMapId);
    const loadPromise = (async () => {
      if (!entry) {
        const emptyZones = [];
        this.plantZoneNamesByMap.set(resolvedMapId, emptyZones);
        return emptyZones;
      }

      const explicitZones = getPlantZoneNamesFromEntry(entry);
      if (explicitZones.length > 0) {
        this.plantZoneNamesByMap.set(resolvedMapId, explicitZones);
        return explicitZones;
      }

      const importedZones = await getImportedPlantZoneNamesFromEntryAsync(entry);
      this.plantZoneNamesByMap.set(resolvedMapId, importedZones);
      return importedZones;
    })();

    this.plantZonePromises.set(resolvedMapId, loadPromise);

    try {
      return await loadPromise;
    } finally {
      this.plantZonePromises.delete(resolvedMapId);
    }
  }

  getTeamSpawnPointsForMap(mapId, teamKey) {
    return this.teamSpawnPointsByMap.get(mapId)?.[teamKey] ?? [];
  }

  async ensureTeamSpawnPointsForMap(mapId) {
    const resolvedMapId = mapId ?? 'training-ground';
    if (this.teamSpawnPointsByMap.has(resolvedMapId)) {
      return this.teamSpawnPointsByMap.get(resolvedMapId);
    }

    if (this.teamSpawnPromises.has(resolvedMapId)) {
      return this.teamSpawnPromises.get(resolvedMapId);
    }

    const entry = getMapManifestEntry(resolvedMapId);
    const loadPromise = (async () => {
      if (!entry) {
        this.teamSpawnPointsByMap.set(resolvedMapId, null);
        return null;
      }

      const importedTeamSpawns = await getImportedTeamSpawnPointsFromEntryAsync(entry);
      this.teamSpawnPointsByMap.set(resolvedMapId, importedTeamSpawns);
      return importedTeamSpawns;
    })();

    this.teamSpawnPromises.set(resolvedMapId, loadPromise);

    try {
      return await loadPromise;
    } finally {
      this.teamSpawnPromises.delete(resolvedMapId);
    }
  }

  getReadyPlayers() {
    return Object.values(this.players).filter((player) => player.isReady);
  }

  areAllConnectedPlayersReady() {
    const players = Object.values(this.players);
    return players.length > 0 && players.every((player) => player.isReady);
  }

  collectAttackerPlayerIds() {
    return this.getReadyPlayers()
      .filter((player) => player.team === TEAMS.ATTACKERS)
      .map((player) => player.playerId)
      .sort();
  }

  swapReadyPlayerSides() {
    for (const player of Object.values(this.players)) {
      if (!player?.isReady) {
        continue;
      }

      player.team = player.team === TEAMS.DEFENDERS ? TEAMS.ATTACKERS : TEAMS.DEFENDERS;
    }
  }

  hashSelectionSeed(value) {
    let hash = 0;
    const text = String(value ?? '');
    for (let index = 0; index < text.length; index += 1) {
      hash = ((hash << 5) - hash) + text.charCodeAt(index);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  assignBombCarrier() {
    this.objectiveState.bombCarrierPlayerId = selectBombCarrierPlayerId({
      roundNumber: this.roundManager.roundNumber,
      attackerPlayerIds: this.collectAttackerPlayerIds(),
    });
    this.objectiveState.bombState = 'idle';
    this.objectiveState.droppedPosition = null;
    this.objectiveState.droppedMapId = null;
  }

  resetObjectiveState() {
    this.objectiveState = this.createObjectiveState();
  }

  beginFreezeIfReady() {
    if (!this.areAllConnectedPlayersReady()) {
      return false;
    }

    this.roundManager.beginFreeze();
    this.resetObjectiveState();
    return true;
  }

  forceDebugSideSwap(player = null) {
    const activeMapId = player?.mapId ?? this.getActiveMatchMapId();
    if (
      !isCompetitiveGamemode(this.roundManager.gamemode)
      || this.roundManager.matchEnded
      || !activeMapId
    ) {
      return false;
    }

    this.roundManager.startDebugSideSwapIntermission();
    this.swapReadyPlayerSides();
    this.resetObjectiveState();
    this.requestStateBroadcast();
    return true;
  }

  getActiveMatchMapId() {
    const readyPlayer = Object.values(this.players).find((player) => player?.isReady && player?.mapId);
    if (readyPlayer?.mapId) {
      return readyPlayer.mapId;
    }

    const anyPlayer = Object.values(this.players).find((player) => player?.mapId);
    return anyPlayer?.mapId ?? 'training-ground';
  }

  resetMatchState(gamemode, mapId) {
    const nextGamemode = sanitizeGamemodeForMap(gamemode, mapId);
    this.roundManager.resetMatch(nextGamemode);
    this.resetObjectiveState();
    this.gameplaySettings = createGameplaySettingsForGamemode(nextGamemode);

    for (const player of Object.values(this.players)) {
      if (!player?.isReady) {
        continue;
      }

      player.kills = 0;
      player.deaths = 0;
      player.activeWeaponKey = 'rifle';
      player.ownsSniper = false;
      player.isScoped = false;
      this.respawnPlayer(player, { broadcastEvent: false });
    }

    this.requestStateBroadcast();
    return nextGamemode;
  }

  resetPlayersForNextRound() {
    const spawnPoolsByMapTeam = new Map();

    for (const player of Object.values(this.players)) {
      if (!player?.isReady) {
        continue;
      }

      const spawnPoolKey = `${String(player.mapId ?? 'training-ground')}::${String(player.team ?? TEAMS.ATTACKERS)}`;
      if (!spawnPoolsByMapTeam.has(spawnPoolKey)) {
        spawnPoolsByMapTeam.set(
          spawnPoolKey,
          shuffleArray(this.getTeamSpawnPointsForMap(player.mapId, player.team)),
        );
      }

      const teamSpawns = spawnPoolsByMapTeam.get(spawnPoolKey) ?? [];
      if (Array.isArray(teamSpawns) && teamSpawns.length > 0) {
        const selectedSpawn = teamSpawns.shift();
        const collisionWorld = this.getCollisionWorldForMap(player.mapId);
        const fallbackY = Number(selectedSpawn?.position?.y ?? player.spawnState?.position?.y ?? 0);
        const groundedY = collisionWorld?.getGroundHeightAt(
          Number(selectedSpawn?.position?.x ?? 0),
          Number(selectedSpawn?.position?.z ?? 0),
          fallbackY + 0.5,
          2,
          8,
        ) ?? fallbackY;
        player.spawnState = {
          ...player.spawnState,
          position: {
            x: Number(selectedSpawn?.position?.x ?? 0),
            y: Number(groundedY),
            z: Number(selectedSpawn?.position?.z ?? 0),
          },
          yaw: Number(selectedSpawn?.yaw ?? 0),
        };
      } else {
        const fallbackTeamSpawns = this.getTeamSpawnPointsForMap(player.mapId, player.team);
        if (Array.isArray(fallbackTeamSpawns) && fallbackTeamSpawns.length > 0) {
          const selectedSpawn = fallbackTeamSpawns[Math.floor(Math.random() * fallbackTeamSpawns.length)];
          const collisionWorld = this.getCollisionWorldForMap(player.mapId);
          const fallbackY = Number(selectedSpawn?.position?.y ?? player.spawnState?.position?.y ?? 0);
          const groundedY = collisionWorld?.getGroundHeightAt(
            Number(selectedSpawn?.position?.x ?? 0),
            Number(selectedSpawn?.position?.z ?? 0),
            fallbackY + 0.5,
            2,
            8,
          ) ?? fallbackY;
          player.spawnState = {
            ...player.spawnState,
            position: {
              x: Number(selectedSpawn?.position?.x ?? 0),
              y: Number(groundedY),
              z: Number(selectedSpawn?.position?.z ?? 0),
            },
            yaw: Number(selectedSpawn?.yaw ?? 0),
          };
        }
      }

      player.activeWeaponKey = 'rifle';
      player.ownsSniper = false;
      player.isScoped = false;
      this.respawnPlayer(player, { broadcastEvent: false });
    }
  }

  getAliveReadyPlayersForTeam(teamKey, mapId = null) {
    return Object.values(this.players).filter((player) => (
      player?.isReady
      && player?.isAlive
      && player?.team === teamKey
      && (!mapId || player?.mapId === mapId)
    ));
  }

  evaluateCompetitiveEliminationWin(mapId = null) {
    if (
      !isCompetitiveGamemode(this.roundManager.gamemode)
      || this.roundManager.phase !== 'live'
      || this.roundManager.roundEnded
    ) {
      return false;
    }

    const attackersAlive = this.getAliveReadyPlayersForTeam(TEAMS.ATTACKERS, mapId).length;
    const defendersAlive = this.getAliveReadyPlayersForTeam(TEAMS.DEFENDERS, mapId).length;
    const bombPlantedOnMap = this.objectiveState?.bombState === 'planted'
      && (!mapId || this.objectiveState?.plantedMapId === mapId);

    if (defendersAlive === 0) {
      return this.roundManager.endRound(TEAMS.ATTACKERS, 'defenders-eliminated');
    }

    if (attackersAlive === 0 && !bombPlantedOnMap) {
      return this.roundManager.endRound(TEAMS.DEFENDERS, 'attackers-eliminated');
    }

    return false;
  }

  updateRoundState(delta) {
    if (this.roundManager.phase === 'waiting') {
      if (this.beginFreezeIfReady()) {
        this.requestStateBroadcast();
      }
      return;
    }

    const previousPhase = this.roundManager.phase;
    const previousRoundNumber = this.roundManager.roundNumber;
    const previousRoundEnded = this.roundManager.roundEnded;
    const event = this.roundManager.update(delta);

    if (event?.type === 'phase-changed' && event.phase === 'live') {
      this.assignBombCarrier();
      this.requestStateBroadcast();
      return;
    }

    if (event?.type === 'intermission-started') {
      if (event.sideSwap) {
        this.swapReadyPlayerSides();
      }
      this.requestStateBroadcast();
      return;
    }

    if (event?.type === 'phase-changed' && event.phase === 'freeze') {
      this.resetObjectiveState();
      this.resetPlayersForNextRound();
      if (!this.areAllConnectedPlayersReady()) {
        this.roundManager.startWaiting();
      }
      this.requestStateBroadcast();
      return;
    }

    if (event?.type === 'match-ended') {
      this.resetMatchState(this.roundManager.gamemode, this.getActiveMatchMapId());
      return;
    }

    if (
      previousPhase !== this.roundManager.phase
      || previousRoundNumber !== this.roundManager.roundNumber
      || previousRoundEnded !== this.roundManager.roundEnded
    ) {
      this.requestStateBroadcast();
    }
  }

  updateObjectiveState(delta) {
    if (this.roundManager.phase !== 'live' || this.roundManager.roundEnded) {
      return;
    }

    if (this.objectiveState.bombState !== 'planted') {
      this.clearDefuserPlayer();
      return;
    }

    if (this.objectiveState.defuserPlayerId) {
      const defuser = this.players[this.objectiveState.defuserPlayerId] ?? null;
      const plantedMapId = this.objectiveState.plantedMapId ?? null;
      if (
        !defuser
        || !defuser.isAlive
        || defuser.team !== TEAMS.DEFENDERS
        || (plantedMapId && defuser.mapId !== plantedMapId)
      ) {
        this.clearDefuserPlayer();
        this.requestStateBroadcast();
      }
    }

    this.objectiveState.bombTimeRemaining = Math.max(0, this.objectiveState.bombTimeRemaining - delta);
    this.objectiveState.bombBeepCountdown = Math.max(
      Number(this.objectiveState.bombBeepCountdown ?? 0) - delta,
      -delta,
    );
    while (this.objectiveState.bombTimeRemaining > 0 && this.objectiveState.bombBeepCountdown <= 0) {
      this.emitBombBeepAudioEvent();
      this.objectiveState.bombBeepCountdown += getBombPulseIntervalSeconds(this.objectiveState.bombTimeRemaining);
    }
    if (this.objectiveState.bombTimeRemaining === 0) {
      this.applyBombExplosionDamage();
      this.clearDefuserPlayer();
      this.objectiveState.bombState = 'exploded';
      this.objectiveState.bombBeepCountdown = 0;
      this.roundManager.endRound(TEAMS.ATTACKERS, 'bomb-exploded');
    }
  }

  getBombExplosionDamage(distance) {
    const safeDistance = Number(distance);
    if (!Number.isFinite(safeDistance) || safeDistance >= BOMB_EXPLOSION_MAX_RADIUS) {
      return 0;
    }
    if (safeDistance <= BOMB_EXPLOSION_LETHAL_RADIUS) {
      return PLAYER_MAX_HEALTH;
    }

    const normalized = (safeDistance - BOMB_EXPLOSION_LETHAL_RADIUS)
      / (BOMB_EXPLOSION_MAX_RADIUS - BOMB_EXPLOSION_LETHAL_RADIUS);
    return PLAYER_MAX_HEALTH * (1 - normalized);
  }

  killPlayer(player, { now, deathClip = null } = {}) {
    if (!player || player.isAlive === false) {
      return;
    }

    player.deaths = Number(player.deaths ?? 0) + 1;
    player.isAlive = false;
    player.respawnAt = isCompetitiveGamemode(this.roundManager.gamemode)
      ? 0
      : now + PLAYER_RESPAWN_DELAY_MS;
    player.pendingInputs.length = 0;
    player.deathClip = deathClip;
    player.presentationState = 'dead';
    if (this.objectiveState?.defuserPlayerId === player.playerId) {
      this.clearDefuserPlayer();
    }
    this.dropBombForPlayer(player);
  }

  applyBombExplosionDamage() {
    const plantedPosition = this.objectiveState?.plantedPosition;
    if (!plantedPosition) {
      return;
    }

    const bombMapId = this.objectiveState?.plantedMapId ?? null;
    const explosionOrigin = new THREE.Vector3(
      Number(plantedPosition.x ?? 0),
      Number(plantedPosition.y ?? 0),
      Number(plantedPosition.z ?? 0),
    );
    const now = Date.now();

    for (const player of Object.values(this.players)) {
      if (!player || player.isAlive === false) {
        continue;
      }
      if ((player.mapId ?? null) !== bombMapId) {
        continue;
      }

      const motionPosition = player.motionState?.position ?? null;
      if (!motionPosition) {
        continue;
      }

      const distance = explosionOrigin.distanceTo(SERVER_MOVE_POSITION.set(
        Number(motionPosition.x ?? 0),
        Number(motionPosition.y ?? 0),
        Number(motionPosition.z ?? 0),
      ));
      const damage = this.getBombExplosionDamage(distance);
      if (damage <= 0) {
        continue;
      }

      player.health = Math.max(0, Number(player.health ?? PLAYER_MAX_HEALTH) - damage);
      if (player.health > 0) {
        continue;
      }

      this.killPlayer(player, { now });
    }
  }

  getBombDropPositionForPlayer(player) {
    const yaw = Number(player?.motionState?.yaw ?? 0);
    const collisionWorld = this.getCollisionWorldForMap(player?.mapId);
    const baseX = Number(player?.motionState?.position?.x ?? 0) - Math.sin(yaw) * BOMB_DROP_FORWARD_DISTANCE;
    const baseZ = Number(player?.motionState?.position?.z ?? 0) - Math.cos(yaw) * BOMB_DROP_FORWARD_DISTANCE;
    const baseY = Number(player?.motionState?.position?.y ?? 0);
    const groundedY = collisionWorld?.getGroundHeightAt(
      baseX,
      baseZ,
      baseY + 0.5,
      2,
      8,
    ) ?? baseY;

    return {
      x: baseX,
      y: groundedY + BOMB_DROP_HEIGHT_OFFSET,
      z: baseZ,
    };
  }

  clearDroppedBombState() {
    this.objectiveState.droppedPosition = null;
    this.objectiveState.droppedMapId = null;
    this.objectiveState.droppedByPlayerId = null;
    this.objectiveState.droppedPickupBlockedUntil = 0;
  }

  dropBombForPlayer(player) {
    if (
      !player
      || this.objectiveState.bombState === 'planted'
      || this.objectiveState.bombCarrierPlayerId !== player.playerId
    ) {
      return false;
    }

    this.objectiveState.bombCarrierPlayerId = null;
    this.objectiveState.bombState = 'dropped';
    this.objectiveState.droppedMapId = player.mapId ?? null;
    this.objectiveState.droppedPosition = this.getBombDropPositionForPlayer(player);
    this.objectiveState.droppedByPlayerId = player.playerId;
    this.objectiveState.droppedPickupBlockedUntil = Date.now() + BOMB_DROPPER_PICKUP_LOCK_MS;
    this.requestStateBroadcast();
    return true;
  }

  tryPickupDroppedBomb() {
    if (
      this.objectiveState.bombState !== 'dropped'
      || !this.objectiveState.droppedPosition
    ) {
      return false;
    }

    const pickupMapId = this.objectiveState.droppedMapId ?? null;
    const blockedPlayerId = this.objectiveState.droppedByPlayerId ?? null;
    const blockedUntil = Number(this.objectiveState.droppedPickupBlockedUntil ?? 0);
    const now = Date.now();
    let bestCandidate = null;
    let bestDistance = Infinity;
    for (const player of this.getAliveReadyPlayersForTeam(TEAMS.ATTACKERS, pickupMapId)) {
      if (player.playerId === blockedPlayerId && now < blockedUntil) {
        continue;
      }

      const distance = Math.hypot(
        Number(player.motionState?.position?.x ?? 0) - Number(this.objectiveState.droppedPosition.x ?? 0),
        Number(player.motionState?.position?.y ?? 0) - Number(this.objectiveState.droppedPosition.y ?? 0),
        Number(player.motionState?.position?.z ?? 0) - Number(this.objectiveState.droppedPosition.z ?? 0),
      );
      if (distance > BOMB_PICKUP_RADIUS || distance >= bestDistance) {
        continue;
      }

      bestCandidate = player;
      bestDistance = distance;
    }

    if (!bestCandidate) {
      return false;
    }

    this.objectiveState.bombCarrierPlayerId = bestCandidate.playerId;
    this.objectiveState.bombState = 'idle';
    this.clearDroppedBombState();
    this.requestStateBroadcast();
    return true;
  }

  handleBombPlant(player, message) {
    if (
      !player.isReady
      || !player.isAlive
      || player.team !== TEAMS.ATTACKERS
      || this.roundManager.phase !== 'live'
      || this.roundManager.roundEnded
      || this.objectiveState.bombState !== 'idle'
      || this.objectiveState.bombCarrierPlayerId !== player.playerId
    ) {
      return;
    }

    const zoneName = String(message?.zoneName ?? '').trim();
    const validZones = this.getPlantZonesForMap(player.mapId);
    if (validZones.length > 0 && zoneName && !validZones.includes(zoneName)) {
      return;
    }

    this.objectiveState.bombCarrierPlayerId = null;
    this.objectiveState.bombState = 'planted';
    this.clearDroppedBombState();
    this.objectiveState.bombTimeRemaining = DEFAULT_BOMB_DURATION;
    this.objectiveState.plantedZoneName = zoneName || 'plant-site';
    this.objectiveState.defuserPlayerId = null;
    this.objectiveState.plantedMapId = player.mapId ?? null;
    this.objectiveState.bombBeepCountdown = getBombPulseIntervalSeconds(DEFAULT_BOMB_DURATION);
    this.objectiveState.plantedPosition = {
      x: Number(message?.position?.x ?? player.motionState?.position?.x ?? 0),
      y: Number(message?.position?.y ?? player.motionState?.position?.y ?? 0),
      z: Number(message?.position?.z ?? player.motionState?.position?.z ?? 0),
    };
    this.roundManager.phaseTime = Math.max(0, this.roundManager.liveDuration - DEFAULT_BOMB_DURATION);
    this.requestStateBroadcast();
  }

  handleBombDefuse(player, message) {
    if (
      !player.isReady
      || !player.isAlive
      || player.team !== TEAMS.DEFENDERS
      || this.roundManager.phase !== 'live'
      || this.roundManager.roundEnded
      || this.objectiveState.bombState !== 'planted'
      || !this.objectiveState.plantedPosition
    ) {
      return;
    }

    const action = String(message?.action ?? 'complete');
    if (action === 'cancel') {
      if (this.objectiveState.defuserPlayerId === player.playerId) {
        this.clearDefuserPlayer();
        this.requestStateBroadcast();
      }
      return;
    }

    if (this.objectiveState.defuserPlayerId && this.objectiveState.defuserPlayerId !== player.playerId) {
      return;
    }

    const plantedPosition = this.objectiveState.plantedPosition;
    const playerPosition = {
      x: Number(message?.position?.x ?? player.motionState?.position?.x ?? 0),
      y: Number(message?.position?.y ?? player.motionState?.position?.y ?? 0),
      z: Number(message?.position?.z ?? player.motionState?.position?.z ?? 0),
    };
    const eyePosition = {
      x: Number(message?.eyePosition?.x ?? playerPosition.x),
      y: Number(message?.eyePosition?.y ?? (playerPosition.y + player.motionState.currentHeight)),
      z: Number(message?.eyePosition?.z ?? playerPosition.z),
    };
    OBJECTIVE_DIRECTION.set(
      Number(message?.direction?.x ?? 0),
      Number(message?.direction?.y ?? 0),
      Number(message?.direction?.z ?? -1),
    );
    if (OBJECTIVE_DIRECTION.lengthSq() <= 1e-6) {
      return;
    }
    OBJECTIVE_DIRECTION.normalize();

    OBJECTIVE_TO_BOMB.set(
      Number(plantedPosition.x ?? 0) - eyePosition.x,
      (Number(plantedPosition.y ?? 0) + 0.08) - eyePosition.y,
      Number(plantedPosition.z ?? 0) - eyePosition.z,
    );
    const eyeDistance = OBJECTIVE_TO_BOMB.length();
    if (eyeDistance <= 1e-6 || eyeDistance > BOMB_DEFUSE_MAX_DISTANCE) {
      return;
    }

    const aimDot = OBJECTIVE_TO_BOMB.normalize().dot(OBJECTIVE_DIRECTION);
    if (aimDot < BOMB_DEFUSE_AIM_DOT_THRESHOLD) {
      return;
    }

    const playerDistance = Math.hypot(
      playerPosition.x - Number(plantedPosition.x ?? 0),
      playerPosition.y - Number(plantedPosition.y ?? 0),
      playerPosition.z - Number(plantedPosition.z ?? 0),
    );
    if (playerDistance > BOMB_DEFUSE_MAX_DISTANCE) {
      return;
    }

    if (action === 'start') {
      if (this.objectiveState.defuserPlayerId !== player.playerId) {
        this.objectiveState.defuserPlayerId = player.playerId;
        this.emitDefuseStartAudioEvent(player);
        this.requestStateBroadcast();
      }
      return;
    }

    this.objectiveState.defuserPlayerId = null;
    this.objectiveState.bombState = 'idle';
    this.objectiveState.bombTimeRemaining = 0;
    this.clearDroppedBombState();
    this.objectiveState.plantedZoneName = null;
    this.objectiveState.plantedMapId = null;
    this.objectiveState.bombBeepCountdown = 0;
    this.objectiveState.plantedPosition = null;
    this.roundManager.endRound(TEAMS.DEFENDERS, 'bomb-defused');
    this.requestStateBroadcast();
  }

  getObjectiveSnapshot() {
    return {
      bombCarrierPlayerId: this.objectiveState.bombCarrierPlayerId,
      bombState: this.objectiveState.bombState,
      bombTimeRemaining: Number(this.objectiveState.bombTimeRemaining ?? 0),
      droppedMapId: this.objectiveState.droppedMapId,
      droppedPosition: this.objectiveState.droppedPosition
        ? {
          x: Number(this.objectiveState.droppedPosition.x ?? 0),
          y: Number(this.objectiveState.droppedPosition.y ?? 0),
          z: Number(this.objectiveState.droppedPosition.z ?? 0),
        }
        : null,
      plantedZoneName: this.objectiveState.plantedZoneName,
      defuserPlayerId: this.objectiveState.defuserPlayerId,
      plantedPosition: this.objectiveState.plantedPosition
        ? {
          x: Number(this.objectiveState.plantedPosition.x ?? 0),
          y: Number(this.objectiveState.plantedPosition.y ?? 0),
          z: Number(this.objectiveState.plantedPosition.z ?? 0),
        }
        : null,
    };
  }

  onCreate() {
    this.setPrivate(false);
    this.players = {};
    this.nextPlayerNumber = 1;
    this.collisionWorlds = new Map();
    this.collisionWorldPromises = new Map();
    this.plantZoneNamesByMap = new Map();
    this.plantZonePromises = new Map();
    this.teamSpawnPointsByMap = new Map();
    this.teamSpawnPromises = new Map();
    this.stateDirty = true;
    this.roundManager = new RoundManager();
    this.roundManager.startWaiting();
    this.objectiveState = this.createObjectiveState();
    this.roundManager.setGamemode(GAMEMODES.DEBUG);
    this.gameplaySettings = createGameplaySettingsForGamemode(this.roundManager.gamemode);
    void createRemoteHitboxRig().catch((error) => {
      console.warn('[TacticalRoom] Failed to preload remote hitbox rig.', error);
    });
    this.setSimulationInterval(() => {
      this.updateObjectiveState(SERVER_OBJECTIVE_STEP);
      this.updateRoundState(SERVER_OBJECTIVE_STEP);
      const tickNow = Date.now();
      let movementStateChanged = false;

      for (const player of Object.values(this.players)) {
        const collisionWorld = this.getCollisionWorldForMap(player.mapId);

        if (!player.isAlive) {
          if (
            !isCompetitiveGamemode(this.roundManager.gamemode)
            && player.respawnAt > 0
            && tickNow >= player.respawnAt
          ) {
            this.respawnPlayer(player);
            movementStateChanged = true;
          }
          continue;
        }

        if (!player.isReady) {
          if (player.hitboxRig) {
            updateRemoteHitboxRig(player.hitboxRig, player, NETCODE_SIMULATION_STEP);
          }
          player.authoritativeHitboxes = buildAuthoritativeHitboxes(player);
          recordPlayerHitboxHistory(player, tickNow);
          continue;
        }

        if (!player.pendingInputs.length) {
          if (player.hitboxRig) {
            updateRemoteHitboxRig(player.hitboxRig, player, NETCODE_SIMULATION_STEP);
          }
          player.authoritativeHitboxes = buildAuthoritativeHitboxes(player);
          recordPlayerHitboxHistory(player, tickNow);
          continue;
        }

        while (player.pendingInputs.length > 0) {
          const nextInput = player.pendingInputs.shift();
          movementStateChanged = true;
          const previousPosition = {
            x: Number(player.motionState.position.x ?? 0),
            y: Number(player.motionState.position.y ?? 0),
            z: Number(player.motionState.position.z ?? 0),
          };
            const wasGroundedBeforeStep = Boolean(player.motionState?.isGrounded);
            player.pitch = Number(nextInput.pitch ?? player.pitch ?? 0);
            player.motionState = simulatePlayerMovement(player.motionState, nextInput, NETCODE_SIMULATION_STEP, {
              groundHeight: collisionWorld?.getGroundHeight() ?? 0,
              speedMultiplier: Number(nextInput.speedMultiplier ?? 1),
              resolvePosition: collisionWorld
                ? (position, radius, height, movementDelta) => {
                const moved = collisionWorld.move(
                  SERVER_MOVE_POSITION.set(position.x, position.y, position.z),
                  radius,
                  height,
                  movementDelta,
                );
                return {
                  x: moved.x,
                  y: moved.y,
                  z: moved.z,
                };
              }
              : null,
            getGroundHeightAt: collisionWorld
              ? (x, z, currentY, maxStepUp, maxDrop) => collisionWorld.getGroundHeightAt(
                x,
                z,
                currentY,
                maxStepUp,
                maxDrop,
              )
              : null,
          });
          player.presentationState = this.getPresentationStateForPlayer(player);
            player.lastProcessedSequence = nextInput.sequence;
            player.lastProcessedTimestamp = nextInput.timestamp;
            player.lastDequeuedSequence = nextInput.sequence;
            player.lastDequeuedTimestamp = nextInput.timestamp;
            this.updatePlayerFootsteps(player, previousPosition, nextInput, wasGroundedBeforeStep);
          }

        if (player.hitboxRig) {
          updateRemoteHitboxRig(player.hitboxRig, player, NETCODE_SIMULATION_STEP);
        }
        player.authoritativeHitboxes = buildAuthoritativeHitboxes(player);
        recordPlayerHitboxHistory(player, tickNow);
      }

      if (movementStateChanged) {
        this.requestStateBroadcast();
      }

      if (this.tryPickupDroppedBomb()) {
        movementStateChanged = true;
      }

      this.flushStateBroadcast();
    }, 1000 / NETCODE_SIMULATION_RATE);

    this.onMessage('player-input', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        console.warn(`[TacticalRoom] Ignoring input for missing client ${client.sessionId}`);
        return;
      }

      const inputTimestamp = Number(message?.timestamp ?? Date.now());
      if (inputTimestamp < Number(player.inputTimestampGate ?? 0)) {
        player.droppedByTimestampGate = Number(player.droppedByTimestampGate ?? 0) + 1;
        return;
      }

      const sequence = Number(message?.sequence ?? 0);
      if (sequence <= player.lastProcessedSequence) {
        player.droppedBySequence = Number(player.droppedBySequence ?? 0) + 1;
        return;
      }

      const normalizedInput = createPlayerInputMessage({
        ...message,
        yaw: Number(message?.yaw ?? player.motionState.yaw),
        pitch: Number(message?.pitch ?? player.pitch ?? 0),
      }, sequence, inputTimestamp);
      player.pendingInputs.push(
        isCompetitiveGamemode(this.roundManager.gamemode) && this.roundManager.phase === 'freeze'
          ? getFreezeLockedInput(normalizedInput)
          : normalizedInput,
      );
      player.lastQueuedSequence = sequence;
      player.lastQueuedTimestamp = inputTimestamp;
    });

    this.onMessage('ping', (client, message) => {
      const serverReceivedAt = Date.now();
      client.send('pong', {
        id: Number(message?.id ?? 0),
        serverReceivedAt,
        serverSentAt: Date.now(),
      });
    });

    this.onMessage('player-ping', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      player.pingMs = Math.max(
        0,
        Math.min(MAX_SCOREBOARD_PING_MS, Number(message?.pingMs ?? 0)),
      );
    });

    this.onMessage('player-ready', async (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      try {
        const readyState = createPlayerReadyMessage(message);
        player.mapId = readyState.mapId;
        player.team = this.sanitizeTeam(readyState.team);
        player.displayName = this.sanitizeDisplayName(readyState.displayName, player.displayName);
        player.isReady = false;
        player.pendingInputs.length = 0;
        player.footstepDistance = 0;
        player.wasFootstepAudible = false;
        player.lastFootstepSampleIndex = -1;
        player.inputTimestampGate = Date.now();
        player.lastProcessedTimestamp = Date.now();
        player.spawnState = {
          position: { ...readyState.position },
          yaw: readyState.yaw,
          pitch: readyState.pitch,
          currentHeight: readyState.currentHeight,
        };
        player.motionState = createPlayerMovementState({
          position: readyState.position,
          velocity: readyState.velocity,
          yaw: readyState.yaw,
          isGrounded: readyState.isGrounded,
          isCrouched: readyState.isCrouched,
          currentHeight: readyState.currentHeight,
        });
        player.pitch = readyState.pitch;
        player.presentationState = this.getPresentationStateForPlayer(player);
        this.requestStateBroadcast();
        await this.ensureCollisionWorldForMap(readyState.mapId);
        await this.ensurePlantZonesForMap(readyState.mapId);
        await this.ensureTeamSpawnPointsForMap(readyState.mapId);
        player.isReady = true;
        player.health = player.maxHealth;
        player.isAlive = true;
        player.respawnAt = 0;
        player.ownsSniper = false;
        player.activeWeaponKey = getSharedWeaponData(readyState.activeWeaponKey)
          ? readyState.activeWeaponKey
          : player.activeWeaponKey;
        player.isScoped = false;
        player.deathClip = null;
        player.presentationState = this.getPresentationStateForPlayer(player);
        if (this.roundManager.phase === 'waiting') {
          this.beginFreezeIfReady();
        }
        this.requestStateBroadcast();
      } catch (error) {
        console.error(`[TacticalRoom] Failed to initialize player ${client.sessionId} on map.`, error);
      }
    });

    this.onMessage('player-fire', (client, message) => {
      const player = this.players[client.sessionId];
      if (
        !player
        || !player.isAlive
        || (isCompetitiveGamemode(this.roundManager.gamemode) && this.roundManager.phase !== 'live')
      ) {
        return;
      }

    const fireRequest = createPlayerFireMessage(message, Number(message?.timestamp ?? Date.now()));
    if (isSniperWeaponKey(fireRequest.weaponKey) && !player.ownsSniper) {
      return;
    }
    this.processPlayerFire(player, fireRequest);
  });

    this.onMessage('player-status', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      const previousWeaponKey = player.activeWeaponKey;
      const previousScoped = Boolean(player.isScoped);
      const nextStatus = createPlayerStatusMessage(message);
      const nextWeaponKey = getSharedWeaponData(nextStatus.activeWeaponKey)
        ? nextStatus.activeWeaponKey
        : player.activeWeaponKey;
      if (isSniperWeaponKey(nextWeaponKey) && !player.ownsSniper) {
        return;
      }
      const nextScoped = Boolean(nextStatus.isScoped) && nextWeaponKey !== 'knife';
      if (nextWeaponKey === player.activeWeaponKey && nextScoped === player.isScoped) {
        return;
      }

      player.activeWeaponKey = nextWeaponKey;
      player.isScoped = nextScoped;
      if (
        player.isAlive
        && previousWeaponKey === 'sniper'
        && nextWeaponKey === 'sniper'
        && !previousScoped
        && nextScoped
      ) {
        this.emitScopeInAudioEvent(player);
      }
      this.requestStateBroadcast();
    });

    this.onMessage('chat-message', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player?.isReady) {
        return;
      }

      const chatMessage = createChatMessage(message);
      if (!chatMessage.text) {
        return;
      }

      this.emitChatEvent(player, chatMessage);
    });

    this.onMessage('buy-request', (client, message) => {
      const player = this.players[client.sessionId];
      if (
        !player?.isReady
        || !player.isAlive
        || !isCompetitiveGamemode(this.roundManager.gamemode)
        || this.roundManager.phase !== 'freeze'
      ) {
        return;
      }

      const buyRequest = createBuyRequestMessage(message);
      if (buyRequest.weaponKey === 'rifle') {
        const changed = this.setPlayerSniperOwnership(player, false);
        if (!isSniperWeaponKey(player.activeWeaponKey)) {
          if (player.activeWeaponKey !== 'rifle') {
            player.activeWeaponKey = 'rifle';
            player.isScoped = false;
            this.requestStateBroadcast();
          }
        } else {
          this.requestStateBroadcast();
        }
        if (changed) {
          this.requestStateBroadcast();
        }
        return;
      }

      if (!this.canPlayerOwnSniper(player)) {
        return;
      }

      player.ownsSniper = true;
      player.activeWeaponKey = 'sniper';
      player.isScoped = false;
      this.requestStateBroadcast();
    });

    this.onMessage('set-gamemode', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player?.isReady) {
        return;
      }

      const gamemodeChange = createGamemodeChangeMessage(message);
      const nextGamemode = sanitizeGamemodeForMap(gamemodeChange.gamemode, gamemodeChange.mapId || player.mapId);
      if (!gamemodeChange.resetMatch && nextGamemode === this.roundManager.gamemode) {
        return;
      }

      this.resetMatchState(nextGamemode, gamemodeChange.mapId || player.mapId);
    });

    this.onMessage('debug-round-control', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player?.isReady) {
        return;
      }

      const control = createDebugRoundControlMessage(message);
      if (control.action === 'force-side-swap') {
        this.forceDebugSideSwap(player);
        return;
      }

      if (control.action === 'set-infinite-ammo' && control.enabled != null) {
        this.gameplaySettings.infiniteAmmoEnabled = Boolean(control.enabled);
        this.requestStateBroadcast();
      }
    });

    this.onMessage('smoke-throw', (client, message) => {
      const player = this.players[client.sessionId];
      if (
        !player
        || !player.isReady
        || !player.isAlive
        || (isCompetitiveGamemode(this.roundManager.gamemode) && this.roundManager.phase !== 'live')
        || this.roundManager.phase === 'waiting'
        || this.roundManager.roundEnded
      ) {
        return;
      }

      const smokeThrow = createSmokeThrowMessage(message);
      const distanceFromPlayer = Math.hypot(
        Number(smokeThrow.origin.x ?? 0) - Number(player.motionState?.position?.x ?? 0),
        Number(smokeThrow.origin.y ?? 0) - (Number(player.motionState?.position?.y ?? 0) + Number(player.motionState?.currentHeight ?? 1.72)),
        Number(smokeThrow.origin.z ?? 0) - Number(player.motionState?.position?.z ?? 0),
      );
      if (!Number.isFinite(distanceFromPlayer) || distanceFromPlayer > SMOKE_THROW_MAX_VALIDATE_DISTANCE) {
        return;
      }

      this.broadcast('combat-event', {
        type: 'smoke-thrown',
        playerId: player.playerId,
        mapId: player.mapId,
        origin: smokeThrow.origin,
        direction: smokeThrow.direction,
        inheritedVelocity: smokeThrow.inheritedVelocity,
        speed: smokeThrow.speed,
      });
    });

    this.onMessage('bomb-plant', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      this.handleBombPlant(player, message);
    });

    this.onMessage('bomb-drop', (client) => {
      const player = this.players[client.sessionId];
      if (
        !player
        || !player.isReady
        || !player.isAlive
        || player.team !== TEAMS.ATTACKERS
        || this.roundManager.phase !== 'live'
        || this.roundManager.roundEnded
      ) {
        return;
      }

      this.dropBombForPlayer(player);
    });

    this.onMessage('bomb-defuse', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      this.handleBombDefuse(player, message);
    });

    this.onMessage('smoke-bloom', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player || !player.isReady || !player.isAlive) {
        return;
      }

      const position = {
        x: Number(message?.position?.x ?? 0),
        y: Number(message?.position?.y ?? 0),
        z: Number(message?.position?.z ?? 0),
      };
      const distanceFromPlayer = Math.hypot(
        position.x - Number(player.motionState?.position?.x ?? 0),
        position.y - Number(player.motionState?.position?.y ?? 0),
        position.z - Number(player.motionState?.position?.z ?? 0),
      );
      if (!Number.isFinite(distanceFromPlayer) || distanceFromPlayer > SMOKE_BLOOM_MAX_VALIDATE_DISTANCE) {
        return;
      }

      this.emitSmokeBloomAudioEvent(player, position);
    });

    this.onMessage('request-player-state', (client) => {
      client.send('player-state', {
        players: this.getSerializablePlayers(),
        round: this.roundManager.getSnapshot(),
        objective: this.getObjectiveSnapshot(),
        gameplay: { ...this.gameplaySettings },
      });
    });

    this.onMessage('remote-hitbox-audit', (client, message) => {
      const player = this.players[client.sessionId];
      const auditEntry = {
        recordedAt: Date.now(),
        sessionId: client.sessionId,
        playerId: player?.playerId ?? client.sessionId,
        serverPlayerState: player ? serializeAuthoritativePlayerState(player.playerId, player) : null,
        clientAudit: message ?? null,
      };
      void appendRemoteHitboxAudit(auditEntry).catch((error) => {
        console.warn('[TacticalRoom] Failed to append remote hitbox audit.', error);
      });
    });

    console.log('[TacticalRoom] Waiting for clients...');
    console.log('[TacticalRoom] Room created');
  }

  onJoin(client) {
    this.players[client.sessionId] = {
      playerId: client.sessionId,
      displayName: `Player ${this.nextPlayerNumber}`,
      team: 'attackers',
      kills: 0,
      deaths: 0,
      pingMs: 0,
      motionState: createPlayerMovementState(),
      pendingInputs: [],
      footstepDistance: 0,
      wasFootstepAudible: false,
      lastFootstepSampleIndex: -1,
      mapId: 'training-ground',
      isReady: false,
      spawnState: {
        position: { x: 0, y: 0, z: 0 },
        yaw: 0,
        pitch: 0,
        currentHeight: 1.72,
      },
      lastProcessedSequence: 0,
      lastProcessedTimestamp: Date.now(),
      inputTimestampGate: 0,
      lastQueuedSequence: 0,
      lastQueuedTimestamp: 0,
      lastDequeuedSequence: 0,
      lastDequeuedTimestamp: 0,
      droppedByTimestampGate: 0,
      droppedBySequence: 0,
      maxHealth: PLAYER_MAX_HEALTH,
      health: PLAYER_MAX_HEALTH,
      isAlive: true,
      respawnAt: 0,
      lastFireAt: 0,
      pitch: 0,
      activeWeaponKey: 'rifle',
      ownsSniper: false,
      isScoped: false,
      presentationState: 'idle',
      deathClip: null,
      hitboxRig: null,
      authoritativeHitboxes: null,
      hitboxHistory: [],
      missingHitboxBonesLogged: false,
    };
    this.nextPlayerNumber += 1;
    void createRemoteHitboxRig()
      .then((rig) => {
        const player = this.players[client.sessionId];
        if (!player) {
          return;
        }
        player.hitboxRig = rig;
        updateRemoteHitboxRig(player.hitboxRig, player, 0);
        player.authoritativeHitboxes = buildAuthoritativeHitboxes(player);
        recordPlayerHitboxHistory(player, Date.now());
      })
      .catch((error) => {
        console.warn(`[TacticalRoom] Failed to create hitbox rig for ${client.sessionId}.`, error);
      });

    this.broadcast('player-joined', {
      playerId: client.sessionId,
      sessionId: client.sessionId,
    });
    this.requestStateBroadcast();

    console.log(
      `[TacticalRoom] Client joined: session=${client.sessionId} playerId=${client.sessionId} players=${Object.keys(this.players).length}`,
    );
  }

  onLeave(client) {
    const departingPlayer = this.players[client.sessionId] ?? null;
    if (this.objectiveState?.defuserPlayerId === client.sessionId) {
      this.clearDefuserPlayer();
    }
    delete this.players[client.sessionId];

    if (this.objectiveState.bombCarrierPlayerId === client.sessionId) {
      if (!this.dropBombForPlayer(departingPlayer)) {
        this.objectiveState.bombCarrierPlayerId = null;
      }
    }

    if (Object.keys(this.players).length === 0) {
      this.roundManager = new RoundManager();
      this.roundManager.startWaiting();
      this.resetObjectiveState();
    } else if (this.roundManager.phase === 'waiting') {
      this.beginFreezeIfReady();
    }

    this.broadcast('player-left', {
      playerId: client.sessionId,
      sessionId: client.sessionId,
    });
    if (departingPlayer?.isReady) {
      this.evaluateCompetitiveEliminationWin(departingPlayer.mapId ?? null);
    }
    this.requestStateBroadcast();

    console.log(
      `[TacticalRoom] Client left: session=${client.sessionId} playerId=${client.sessionId} players=${Object.keys(this.players).length}`,
    );
  }

  onDispose() {
    this.collisionWorldPromises.clear();
    this.plantZonePromises.clear();
    this.teamSpawnPromises.clear();
    for (const collisionWorld of this.collisionWorlds.values()) {
      collisionWorld.collisionGeometry?.dispose?.();
    }

    this.collisionWorlds.clear();
    this.plantZoneNamesByMap.clear();
    this.teamSpawnPointsByMap.clear();
  }

  getSerializablePlayers() {
    return Object.fromEntries(
      Object.entries(this.players).map(([playerId, player]) => [
        playerId,
        serializeAuthoritativePlayerState(playerId, player),
      ]),
    );
  }

  broadcastPlayerState() {
    this.broadcast('player-state', {
      players: this.getSerializablePlayers(),
      round: this.roundManager.getSnapshot(),
      objective: this.getObjectiveSnapshot(),
      gameplay: { ...this.gameplaySettings },
    });
  }

  getSniperOwnerForTeam(teamKey, { excludePlayerId = null } = {}) {
    return Object.values(this.players).find((player) => (
      player?.isReady
      && player?.team === teamKey
      && player?.playerId !== excludePlayerId
      && Boolean(player?.ownsSniper)
    )) ?? null;
  }

  canPlayerOwnSniper(player) {
    if (!player?.isReady || !isCompetitiveGamemode(this.roundManager.gamemode)) {
      return false;
    }

    const existingOwner = this.getSniperOwnerForTeam(player.team, {
      excludePlayerId: player.playerId,
    });
    return existingOwner == null;
  }

  setPlayerSniperOwnership(player, ownsSniper) {
    if (!player) {
      return false;
    }

    const nextOwnsSniper = Boolean(ownsSniper);
    if (player.ownsSniper === nextOwnsSniper) {
      return false;
    }

    player.ownsSniper = nextOwnsSniper;
    if (!nextOwnsSniper && isSniperWeaponKey(player.activeWeaponKey)) {
      player.activeWeaponKey = 'rifle';
      player.isScoped = false;
    }
    return true;
  }

  requestStateBroadcast() {
    this.stateDirty = true;
  }

  flushStateBroadcast() {
    if (!this.stateDirty) {
      return;
    }

    this.stateDirty = false;
    this.broadcastPlayerState();
  }

  getCollisionWorldForMap(mapId) {
    const resolvedMapId = mapId ?? 'training-ground';
    return this.collisionWorlds.get(resolvedMapId) ?? null;
  }

  async ensureCollisionWorldForMap(mapId) {
    const resolvedMapId = mapId ?? 'training-ground';
    if (this.collisionWorlds.has(resolvedMapId)) {
      return this.collisionWorlds.get(resolvedMapId);
    }

    if (this.collisionWorldPromises.has(resolvedMapId)) {
      return this.collisionWorldPromises.get(resolvedMapId);
    }

    const loadPromise = (async () => {
      try {
        const collisionMap = await createCollisionMapForMapIdAsync(resolvedMapId);
        if (!collisionMap) {
          return null;
        }

        const collisionWorld = new CollisionWorld({
          groundHeight: collisionMap.groundHeight,
          collisionGeometry: collisionMap.collisionGeometry,
        });
        this.collisionWorlds.set(resolvedMapId, collisionWorld);
        return collisionWorld;
      } catch (error) {
        throw error;
      }
    })();

    this.collisionWorldPromises.set(resolvedMapId, loadPromise);

    try {
      return await loadPromise;
    } finally {
      this.collisionWorldPromises.delete(resolvedMapId);
    }
  }

  respawnPlayer(player, { broadcastEvent = true } = {}) {
    player.health = player.maxHealth;
    player.isAlive = true;
    player.respawnAt = 0;
    player.deathClip = null;
    player.pendingInputs.length = 0;
    player.footstepDistance = 0;
    player.wasFootstepAudible = false;
    player.lastFootstepSampleIndex = -1;
    player.motionState = createPlayerMovementState({
      position: player.spawnState.position,
      velocity: { x: 0, y: 0, z: 0 },
      yaw: player.spawnState.yaw,
      isGrounded: true,
      isCrouched: false,
      currentHeight: player.spawnState.currentHeight,
    });
    player.pitch = Number(player.spawnState?.pitch ?? 0);
    player.presentationState = this.getPresentationStateForPlayer(player);
    player.hitboxHistory.length = 0;
    if (broadcastEvent) {
      this.broadcast('combat-event', {
        type: 'player-respawned',
        playerId: player.playerId,
      });
    }
    this.requestStateBroadcast();
  }

  broadcastAudioEvent(event) {
    this.broadcast('audio-event', event);
  }

  emitWeaponAudioEvent(player, weaponKey, origin) {
    const config = REMOTE_WEAPON_AUDIO[weaponKey];
    if (!config || !origin || !player?.mapId) {
      return;
    }

    const soundKey = pickRemoteWeaponAudioSoundKey(config);

    this.broadcastAudioEvent({
      type: 'weapon-fire',
      sourcePlayerId: player.playerId,
      mapId: player.mapId,
      soundKey,
      position: {
        x: Number(origin.x ?? 0),
        y: Number(origin.y ?? 0),
        z: Number(origin.z ?? 0),
      },
      baseVolume: config.baseVolume,
      minDistance: config.minDistance,
      maxDistance: config.maxDistance,
      rolloffExponent: config.rolloffExponent,
      playback: 'overlap',
    });
  }

  emitScopeInAudioEvent(player) {
    const config = REMOTE_UTILITY_AUDIO.scopeIn;
    const position = player?.motionState?.position;
    if (!config || !position || !player?.mapId) {
      return;
    }

    this.broadcastAudioEvent({
      type: 'weapon-scope-in',
      sourcePlayerId: player.playerId,
      mapId: player.mapId,
      soundKey: config.soundKey,
      position: {
        x: Number(position.x ?? 0),
        y: Number(position.y ?? 0) + Number(player?.motionState?.currentHeight ?? 1.72),
        z: Number(position.z ?? 0),
      },
      baseVolume: config.baseVolume,
      minDistance: config.minDistance,
      maxDistance: config.maxDistance,
      rolloffExponent: config.rolloffExponent,
      playback: 'overlap',
      minIntervalMs: 80,
    });
  }

  emitFootstepAudioEvent(player) {
    if (!player?.motionState || !player?.mapId) {
      return;
    }

    const profile = REMOTE_FOOTSTEP_AUDIO.walk;
    let sampleIndex = Math.floor(Math.random() * REMOTE_FOOTSTEP_SAMPLE_COUNT);
    if (REMOTE_FOOTSTEP_SAMPLE_COUNT > 1 && sampleIndex === player.lastFootstepSampleIndex) {
      sampleIndex = (sampleIndex + 1) % REMOTE_FOOTSTEP_SAMPLE_COUNT;
    }
    player.lastFootstepSampleIndex = sampleIndex;

    this.broadcastAudioEvent({
      type: 'footstep',
      sourcePlayerId: player.playerId,
      mapId: player.mapId,
      soundKey: `${profile.soundPrefix}${String(sampleIndex + 1).padStart(3, '0')}`,
      position: {
        x: Number(player.motionState.position.x ?? 0),
        y: Number(player.motionState.position.y ?? 0) + FOOTSTEP_POSITION_Y_OFFSET,
        z: Number(player.motionState.position.z ?? 0),
      },
      baseVolume: profile.baseVolume,
      minDistance: profile.minDistance,
      maxDistance: profile.maxDistance,
      rolloffExponent: profile.rolloffExponent,
      attenuationHoldExponent: profile.attenuationHoldExponent,
      attenuationCutoffStart: profile.attenuationCutoffStart,
      attenuationCutoffExponent: profile.attenuationCutoffExponent,
      playback: 'overlap',
      minIntervalMs: 60,
    });
  }

  emitSmokeBloomAudioEvent(player, position) {
    const config = REMOTE_UTILITY_AUDIO.smokeBloom;
    if (!config || !player?.mapId || !position) {
      return;
    }

    this.broadcastAudioEvent({
      type: 'utility-smoke-bloom',
      sourcePlayerId: player.playerId,
      mapId: player.mapId,
      soundKey: config.soundKey,
      position: {
        x: Number(position.x ?? 0),
        y: Number(position.y ?? 0),
        z: Number(position.z ?? 0),
      },
      baseVolume: config.baseVolume,
      minDistance: config.minDistance,
      maxDistance: config.maxDistance,
      rolloffExponent: config.rolloffExponent,
      playback: 'overlap',
    });
  }

  emitDefuseStartAudioEvent(player) {
    const config = REMOTE_UTILITY_AUDIO.defuseStart;
    const plantedPosition = this.objectiveState?.plantedPosition ?? null;
    const plantedMapId = this.objectiveState?.plantedMapId ?? null;
    if (!config || !player?.playerId || !plantedPosition || !plantedMapId) {
      return;
    }

    this.broadcastAudioEvent({
      type: 'objective-defuse-start',
      sourcePlayerId: player.playerId,
      mapId: plantedMapId,
      soundKey: config.soundKey,
      position: {
        x: Number(plantedPosition.x ?? 0),
        y: Number(plantedPosition.y ?? 0),
        z: Number(plantedPosition.z ?? 0),
      },
      baseVolume: config.baseVolume,
      minDistance: config.minDistance,
      maxDistance: config.maxDistance,
      rolloffExponent: config.rolloffExponent,
      playback: 'interrupt',
      minIntervalMs: 120,
    });
  }

  emitBombBeepAudioEvent() {
    const config = REMOTE_UTILITY_AUDIO.bombBeep;
    const plantedPosition = this.objectiveState?.plantedPosition ?? null;
    const plantedMapId = this.objectiveState?.plantedMapId ?? null;
    const bombTimeRemaining = Number(this.objectiveState?.bombTimeRemaining ?? 0);
    if (!config || !plantedPosition || !plantedMapId) {
      return;
    }

    const pulseInterval = getBombPulseIntervalSeconds(bombTimeRemaining);
    const beepDuration = Math.max(0.05, Math.min(0.16, pulseInterval * 0.58));

    this.broadcastAudioEvent({
      type: 'objective-bomb-beep',
      sourcePlayerId: null,
      mapId: plantedMapId,
      soundKey: config.soundKey,
      position: {
        x: Number(plantedPosition.x ?? 0),
        y: Number(plantedPosition.y ?? 0),
        z: Number(plantedPosition.z ?? 0),
      },
      baseVolume: config.baseVolume,
      minDistance: config.minDistance,
      maxDistance: config.maxDistance,
      rolloffExponent: config.rolloffExponent,
      playback: 'interrupt',
      minIntervalMs: 0,
      duration: beepDuration,
    });
  }

  updatePlayerFootsteps(player, previousPosition, inputSnapshot, wasGroundedBeforeStep = false) {
    if (!player?.motionState || !previousPosition) {
      return;
    }

    const horizontalDistance = Math.hypot(
      Number(player.motionState.position.x ?? 0) - Number(previousPosition.x ?? 0),
      Number(player.motionState.position.z ?? 0) - Number(previousPosition.z ?? 0),
    );
    const horizontalSpeed = Math.hypot(
      Number(player.motionState.velocity?.x ?? 0),
      Number(player.motionState.velocity?.z ?? 0),
    );
    const minimumAudibleSpeed = Math.max(
      REMOTE_FOOTSTEP_MIN_HORIZONTAL_SPEED,
      REMOTE_FOOTSTEP_AUDIBLE_SPEED_FLOOR,
    );
    const landedThisStep = !wasGroundedBeforeStep
      && Boolean(player.motionState.isGrounded)
      && !Boolean(player.motionState.isCrouched)
      && !Boolean(inputSnapshot?.walk);
    if (landedThisStep) {
      player.footstepDistance = 0;
      player.wasFootstepAudible = false;
      this.emitFootstepAudioEvent(player);
    }
    const isAudible = Boolean(player.isAlive)
      && Boolean(player.motionState.isGrounded)
      && !Boolean(player.motionState.isCrouched)
      && !Boolean(inputSnapshot?.walk)
      && horizontalSpeed >= minimumAudibleSpeed
      && horizontalDistance > 1e-4;

    if (!isAudible) {
      player.footstepDistance = 0;
      player.wasFootstepAudible = false;
      return;
    }

    const strideDistance = player.motionState.isCrouched
      ? REMOTE_FOOTSTEP_STRIDE_DISTANCE_CROUCH
      : REMOTE_FOOTSTEP_STRIDE_DISTANCE_WALK;
    if (!player.wasFootstepAudible) {
      player.footstepDistance = Math.max(Number(player.footstepDistance ?? 0), strideDistance * 0.55);
    }
    player.wasFootstepAudible = true;
    player.footstepDistance = Number(player.footstepDistance ?? 0) + horizontalDistance;

    while (player.footstepDistance >= strideDistance) {
      player.footstepDistance -= strideDistance;
      this.emitFootstepAudioEvent(player);
    }
  }

  processPlayerFire(player, fireRequest) {
    const weapon = getSharedWeaponData(fireRequest.weaponKey);
    if (!weapon) {
      return;
    }
    player.activeWeaponKey = fireRequest.weaponKey;

    const now = Date.now();
    const fireIntervalMs = weapon.fireInterval * 1000;
    if (player.lastFireAt > 0 && now - player.lastFireAt < fireIntervalMs * 0.9) {
      return;
    }
    player.lastFireAt = now;

    triggerRemoteHitboxRigFire(player.hitboxRig);

    PLAYER_EYE.set(
      player.motionState.position.x,
      player.motionState.position.y + player.motionState.currentHeight,
      player.motionState.position.z,
    );
    SHOT_ORIGIN.set(
      fireRequest.origin.x,
      fireRequest.origin.y,
      fireRequest.origin.z,
    );
    SHOT_DIRECTION.set(
      fireRequest.direction.x,
      fireRequest.direction.y,
      fireRequest.direction.z,
    );

    if (
      !Number.isFinite(SHOT_ORIGIN.x)
      || !Number.isFinite(SHOT_ORIGIN.y)
      || !Number.isFinite(SHOT_ORIGIN.z)
      || !Number.isFinite(SHOT_DIRECTION.x)
      || !Number.isFinite(SHOT_DIRECTION.y)
      || !Number.isFinite(SHOT_DIRECTION.z)
    ) {
      return;
    }

    if (SHOT_ORIGIN.distanceTo(PLAYER_EYE) > 1.25) {
      SHOT_ORIGIN.copy(PLAYER_EYE);
    }

    if (SHOT_DIRECTION.lengthSq() <= 1e-6) {
      return;
    }
    SHOT_DIRECTION.normalize();
    SHOT_RAY.origin.copy(SHOT_ORIGIN);
    SHOT_RAY.direction.copy(SHOT_DIRECTION);
    this.emitWeaponAudioEvent(player, player.activeWeaponKey, SHOT_ORIGIN);
    const rewindMs = getLagCompensationRewindMs(player?.pingMs);
    const rewindTimestamp = now - rewindMs;

    const maxDistance = weapon.meleeRange ?? 512;
    const collisionWorld = this.getCollisionWorldForMap(player.mapId);
    const worldHit = collisionWorld?.raycast(SHOT_ORIGIN, SHOT_DIRECTION, maxDistance) ?? null;
    const worldHitDistance = worldHit ? worldHit.point.distanceTo(SHOT_ORIGIN) : Infinity;

    let bestTarget = null;
    let bestDistance = Math.min(maxDistance, worldHitDistance);
    let bestHitZone = null;

    for (const target of Object.values(this.players)) {
      if (
        target.playerId === player.playerId
        || !target.isAlive
        || target.mapId !== player.mapId
        || target.team === player.team
      ) {
        continue;
      }

      const lagCompensatedHitboxes = getLagCompensatedHitboxes(target, rewindTimestamp);
      const authoritativeHitResult = getAuthoritativeHitboxSnapshotResult(
        SHOT_RAY,
        lagCompensatedHitboxes,
        maxDistance,
        bestDistance,
      );
      const hitResult = Number.isFinite(authoritativeHitResult.distance)
        ? authoritativeHitResult
        : getPlayerHitResult(SHOT_RAY, target, maxDistance, bestDistance);
      const hitDistance = Number(hitResult?.distance ?? Infinity);
      if (!Number.isFinite(hitDistance) || hitDistance >= bestDistance) {
        continue;
      }

      bestDistance = hitDistance;
      bestTarget = target;
      bestHitZone = hitResult?.hitZone ?? 'body';
    }

    if (!bestTarget) {
      const traceEnd = worldHit?.point
        ? worldHit.point
        : SHOT_TRACE_END.copy(SHOT_ORIGIN).addScaledVector(SHOT_DIRECTION, maxDistance);
      this.broadcast('combat-event', {
        type: 'player-fired',
        playerId: player.playerId,
        weaponKey: player.activeWeaponKey,
        mapId: player.mapId,
        origin: {
          x: SHOT_ORIGIN.x,
          y: SHOT_ORIGIN.y,
          z: SHOT_ORIGIN.z,
        },
        tracerEnd: {
          x: Number(traceEnd.x ?? 0),
          y: Number(traceEnd.y ?? 0),
          z: Number(traceEnd.z ?? 0),
        },
        impact: Boolean(worldHit),
      });
      return;
    }

    const damage = getWeaponDamageForHitZone(weapon, bestHitZone);
    bestTarget.health = Math.max(0, bestTarget.health - damage);
    let deathClip = null;
    if (bestTarget.health === 0) {
      player.kills = Number(player.kills ?? 0) + 1;
      deathClip = getDeathClipForShot(bestTarget, SHOT_DIRECTION);
      this.killPlayer(bestTarget, { now, deathClip });
      this.evaluateCompetitiveEliminationWin(bestTarget.mapId ?? null);
    }

    player.presentationState = this.getPresentationStateForPlayer(player);

    this.broadcast('combat-event', {
      type: 'player-hit',
      attackerPlayerId: player.playerId,
      victimPlayerId: bestTarget.playerId,
      weaponKey: String(weapon?.key ?? player.activeWeaponKey ?? 'rifle'),
      damage,
      hitZone: bestHitZone,
      hitPosition: {
        x: SHOT_ORIGIN.x + (SHOT_DIRECTION.x * bestDistance),
        y: SHOT_ORIGIN.y + (SHOT_DIRECTION.y * bestDistance),
        z: SHOT_ORIGIN.z + (SHOT_DIRECTION.z * bestDistance),
      },
      hitDirection: {
        x: SHOT_DIRECTION.x,
        y: SHOT_DIRECTION.y,
        z: SHOT_DIRECTION.z,
      },
      remainingHealth: bestTarget.health,
      killed: bestTarget.health === 0,
      deathClip,
      respawnAt: bestTarget.respawnAt,
    });
    SHOT_TRACE_END.copy(SHOT_ORIGIN).addScaledVector(SHOT_DIRECTION, bestDistance);
    this.broadcast('combat-event', {
      type: 'player-fired',
      playerId: player.playerId,
      weaponKey: player.activeWeaponKey,
      mapId: player.mapId,
      origin: {
        x: SHOT_ORIGIN.x,
        y: SHOT_ORIGIN.y,
        z: SHOT_ORIGIN.z,
      },
      tracerEnd: {
        x: SHOT_TRACE_END.x,
        y: SHOT_TRACE_END.y,
        z: SHOT_TRACE_END.z,
      },
      impact: true,
    });
    this.requestStateBroadcast();
  }

  getPresentationStateForPlayer(player) {
    if (!player?.isAlive) {
      return 'dead';
    }

    if (!player.motionState?.isGrounded) {
      return 'air';
    }

    const velocity = player.motionState?.velocity;
    const horizontalSpeed = Math.hypot(
      Number(velocity?.x ?? 0),
      Number(velocity?.z ?? 0),
    );
    const moving = horizontalSpeed > PLAYER_MOVE_SPEED_EPSILON;
    const crouched = Boolean(player.motionState?.isCrouched);

    if (crouched) {
      return moving ? 'crouch-move' : 'crouch-idle';
    }

    if (player.isScoped) {
      return moving ? 'scoped-move' : 'scoped-idle';
    }

    return moving ? 'move' : 'idle';
  }
}
