import * as THREE from 'three';
import { Room } from '@colyseus/core';
import { CollisionWorld } from '../../../src/core/physics/CollisionWorld.js';
import {
  createPlayerMovementState,
  simulatePlayerMovement,
} from '../../../src/shared/playerMovement.js';
import {
  NETCODE_SIMULATION_RATE,
  NETCODE_SIMULATION_STEP,
} from '../../../src/shared/netcode.js';
import {
  createPlayerInputMessage,
  createPlayerFireMessage,
  createPlayerReadyMessage,
  createPlayerStatusMessage,
  serializeAuthoritativePlayerState,
} from '../../../src/shared/netcodeProtocol.js';
import { createCollisionMapForMapIdAsync } from '../../../src/shared/maps/mapCollision.js';
import {
  getSharedWeaponData,
  PLAYER_MAX_HEALTH,
  PLAYER_RESPAWN_DELAY_MS,
} from '../../../src/shared/weaponData.js';
import { computePlayerHitboxLayout, createPlayerHitboxLayout } from '../../../src/shared/playerHitboxes.js';
import {
  buildRemoteHitboxSnapshotFromPoints,
  createRemoteHitboxSnapshot,
  REMOTE_HITBOX_HEAD_OFFSET,
  REMOTE_HITBOX_RADII,
} from '../../../src/shared/remoteHitboxes.js';
import {
  createRemoteHitboxRig,
  triggerRemoteHitboxRigFire,
  updateRemoteHitboxRig,
} from '../remoteHitboxRig.js';
import { REMOTE_CHARACTER_HITBOX_SETTINGS } from '../../../src/shared/remoteCharacterConfig.js';

const SERVER_MOVE_POSITION = new THREE.Vector3();
const SHOT_ORIGIN = new THREE.Vector3();
const SHOT_DIRECTION = new THREE.Vector3();
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
const TARGET_TEST_VECTOR = new THREE.Vector3();
const SHOT_RAY = new THREE.Ray();
const PLAYER_MOVE_SPEED_EPSILON = 0.1;
const TARGET_HITBOX_LAYOUT = createPlayerHitboxLayout();
function buildAuthoritativeHitboxes(player) {
  const bones = player.hitboxRig?.bones;
  const hitboxPoints = player.hitboxRig?.hitboxPoints ?? null;
  if (!bones?.head || !bones?.neck || !bones?.spine || !bones?.pelvis) {
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
  }, player.authoritativeHitboxes ?? createRemoteHitboxSnapshot());
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

function getPlayerHitDistance(ray, target, maxDistance, currentBestDistance) {
  const layout = computePlayerHitboxLayout({
    position: target.motionState.position,
    yaw: target.motionState?.yaw ?? 0,
    currentHeight: target.motionState?.currentHeight ?? 1.72,
    isCrouched: target.motionState?.isCrouched ?? false,
    activeWeaponKey: target.activeWeaponKey ?? 'rifle',
  }, TARGET_HITBOX_LAYOUT);

  let bestDistance = currentBestDistance;

  TARGET_POINT.set(layout.head.center.x, layout.head.center.y, layout.head.center.z);
  bestDistance = Math.min(
    bestDistance,
    getRaySphereHitDistance(ray, TARGET_POINT, layout.head.radius, bestDistance),
  );

  TARGET_SEGMENT.start.set(layout.torso.start.x, layout.torso.start.y, layout.torso.start.z);
  TARGET_SEGMENT.end.set(layout.torso.end.x, layout.torso.end.y, layout.torso.end.z);
  bestDistance = Math.min(
    bestDistance,
    getRayCapsuleHitDistance(ray, TARGET_SEGMENT.start, TARGET_SEGMENT.end, layout.torso.radius, bestDistance),
  );

  TARGET_SEGMENT.start.set(layout.pelvis.start.x, layout.pelvis.start.y, layout.pelvis.start.z);
  TARGET_SEGMENT.end.set(layout.pelvis.end.x, layout.pelvis.end.y, layout.pelvis.end.z);
  bestDistance = Math.min(
    bestDistance,
    getRayCapsuleHitDistance(ray, TARGET_SEGMENT.start, TARGET_SEGMENT.end, layout.pelvis.radius, bestDistance),
  );

  for (const arm of layout.arms) {
    TARGET_SHOULDER.set(arm.start.x, arm.start.y, arm.start.z);
    TARGET_HAND.set(arm.end.x, arm.end.y, arm.end.z);
    bestDistance = Math.min(
      bestDistance,
      getRayCapsuleHitDistance(ray, TARGET_SHOULDER, TARGET_HAND, arm.radius, bestDistance),
    );
  }

  for (const leg of layout.legs) {
    TARGET_LEG_START.set(leg.start.x, leg.start.y, leg.start.z);
    TARGET_LEG_END.set(leg.end.x, leg.end.y, leg.end.z);
    bestDistance = Math.min(
      bestDistance,
      getRayCapsuleHitDistance(ray, TARGET_LEG_START, TARGET_LEG_END, leg.radius, bestDistance),
    );
  }

  return bestDistance;
}

function getAuthoritativeHitboxSnapshotDistance(ray, hitboxes, maxDistance, currentBestDistance) {
  if (!hitboxes?.head || !hitboxes?.torso || !hitboxes?.pelvis) {
    return Infinity;
  }

  let bestDistance = currentBestDistance;

  TARGET_POINT.set(hitboxes.head.center.x, hitboxes.head.center.y, hitboxes.head.center.z);
    bestDistance = Math.min(
      bestDistance,
      getRaySphereHitDistance(ray, TARGET_POINT, Number(hitboxes.head.radius ?? REMOTE_HITBOX_RADII.head), bestDistance),
    );

  TARGET_SEGMENT.start.set(hitboxes.torso.start.x, hitboxes.torso.start.y, hitboxes.torso.start.z);
  TARGET_SEGMENT.end.set(hitboxes.torso.end.x, hitboxes.torso.end.y, hitboxes.torso.end.z);
  bestDistance = Math.min(
    bestDistance,
    getRayCapsuleHitDistance(
      ray,
      TARGET_SEGMENT.start,
      TARGET_SEGMENT.end,
        Number(hitboxes.torso.radius ?? REMOTE_HITBOX_RADII.torso),
        bestDistance,
      ),
    );

  TARGET_SEGMENT.start.set(hitboxes.pelvis.start.x, hitboxes.pelvis.start.y, hitboxes.pelvis.start.z);
  TARGET_SEGMENT.end.set(hitboxes.pelvis.end.x, hitboxes.pelvis.end.y, hitboxes.pelvis.end.z);
  bestDistance = Math.min(
    bestDistance,
    getRayCapsuleHitDistance(
      ray,
      TARGET_SEGMENT.start,
      TARGET_SEGMENT.end,
        Number(hitboxes.pelvis.radius ?? REMOTE_HITBOX_RADII.pelvis),
        bestDistance,
      ),
    );

  for (const arm of hitboxes.arms ?? []) {
    if (!arm?.start || !arm?.end) {
      continue;
    }
    TARGET_SHOULDER.set(arm.start.x, arm.start.y, arm.start.z);
    TARGET_HAND.set(arm.end.x, arm.end.y, arm.end.z);
    bestDistance = Math.min(
      bestDistance,
      getRayCapsuleHitDistance(ray, TARGET_SHOULDER, TARGET_HAND, Number(arm.radius ?? REMOTE_HITBOX_RADII.arm), bestDistance),
    );
  }

  for (const hand of hitboxes.hands ?? []) {
    if (!hand?.center) {
      continue;
    }
    TARGET_POINT.set(hand.center.x, hand.center.y, hand.center.z);
    bestDistance = Math.min(
      bestDistance,
      getRaySphereHitDistance(ray, TARGET_POINT, Number(hand.radius ?? REMOTE_HITBOX_RADII.hand), bestDistance),
    );
  }

  for (const leg of hitboxes.legs ?? []) {
    if (!leg?.start || !leg?.end) {
      continue;
    }
    TARGET_LEG_START.set(leg.start.x, leg.start.y, leg.start.z);
    TARGET_LEG_END.set(leg.end.x, leg.end.y, leg.end.z);
    bestDistance = Math.min(
      bestDistance,
      getRayCapsuleHitDistance(ray, TARGET_LEG_START, TARGET_LEG_END, Number(leg.radius ?? REMOTE_HITBOX_RADII.leg), bestDistance),
    );
  }

  return bestDistance;
}

export class TacticalRoom extends Room {
  onCreate() {
    this.setPrivate(false);
    this.players = {};
    this.nextPlayerNumber = 1;
    this.collisionWorlds = new Map();
    this.collisionWorldPromises = new Map();
    void createRemoteHitboxRig().catch((error) => {
      console.warn('[TacticalRoom] Failed to preload remote hitbox rig.', error);
    });
    this.setSimulationInterval(() => {
      let hasSimulationChanges = false;

      for (const player of Object.values(this.players)) {
        if (!player.isAlive) {
          if (player.respawnAt > 0 && Date.now() >= player.respawnAt) {
            this.respawnPlayer(player);
            hasSimulationChanges = true;
          }
          continue;
        }

        if (!player.pendingInputs.length) {
          if (player.hitboxRig) {
            updateRemoteHitboxRig(player.hitboxRig, player, NETCODE_SIMULATION_STEP);
          }
          player.authoritativeHitboxes = buildAuthoritativeHitboxes(player);
          continue;
        }

        const collisionWorld = this.getCollisionWorldForMap(player.mapId);
        while (player.pendingInputs.length > 0) {
          const nextInput = player.pendingInputs.shift();
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
          hasSimulationChanges = true;
        }

        if (player.hitboxRig) {
          updateRemoteHitboxRig(player.hitboxRig, player, NETCODE_SIMULATION_STEP);
        }
        player.authoritativeHitboxes = buildAuthoritativeHitboxes(player);
      }

      this.broadcastPlayerState();
    }, 1000 / NETCODE_SIMULATION_RATE);

    this.onMessage('player-input', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        console.warn(`[TacticalRoom] Ignoring input for missing client ${client.sessionId}`);
        return;
      }

      const sequence = Number(message?.sequence ?? 0);
      if (sequence <= player.lastProcessedSequence) {
        return;
      }

      const normalizedInput = createPlayerInputMessage({
        ...message,
        yaw: Number(message?.yaw ?? player.motionState.yaw),
        pitch: Number(message?.pitch ?? player.pitch ?? 0),
      }, sequence, Number(message?.timestamp ?? Date.now()));
      player.pendingInputs.push(normalizedInput);
    });

    this.onMessage('player-ready', async (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      try {
        const readyState = createPlayerReadyMessage(message);
        await this.ensureCollisionWorldForMap(readyState.mapId);
        player.mapId = readyState.mapId;
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
        player.health = player.maxHealth;
        player.isAlive = true;
        player.respawnAt = 0;
        player.pitch = readyState.pitch;
        player.activeWeaponKey = getSharedWeaponData(readyState.activeWeaponKey)
          ? readyState.activeWeaponKey
          : player.activeWeaponKey;
        player.isScoped = false;
        player.presentationState = this.getPresentationStateForPlayer(player);
        this.broadcastPlayerState();
      } catch (error) {
        console.error(`[TacticalRoom] Failed to initialize player ${client.sessionId} on map.`, error);
      }
    });

    this.onMessage('player-fire', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player || !player.isAlive) {
        return;
      }

      const fireRequest = createPlayerFireMessage(message, Number(message?.timestamp ?? Date.now()));
      this.processPlayerFire(player, fireRequest);
    });

    this.onMessage('player-status', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      const nextStatus = createPlayerStatusMessage(message);
      const nextWeaponKey = getSharedWeaponData(nextStatus.activeWeaponKey)
        ? nextStatus.activeWeaponKey
        : player.activeWeaponKey;
      const nextScoped = Boolean(nextStatus.isScoped) && nextWeaponKey !== 'knife';
      if (nextWeaponKey === player.activeWeaponKey && nextScoped === player.isScoped) {
        return;
      }

      player.activeWeaponKey = nextWeaponKey;
      player.isScoped = nextScoped;
      this.broadcastPlayerState();
    });

    this.onMessage('request-player-state', (client) => {
      client.send('player-state', { players: this.getSerializablePlayers() });
    });

    console.log('[TacticalRoom] Waiting for clients...');
    console.log('[TacticalRoom] Room created');
  }

  onJoin(client) {
    this.players[client.sessionId] = {
      playerId: client.sessionId,
      displayName: `Player ${this.nextPlayerNumber}`,
      motionState: createPlayerMovementState(),
      pendingInputs: [],
      mapId: 'training-ground',
      spawnState: {
        position: { x: 0, y: 0, z: 0 },
        yaw: 0,
        pitch: 0,
        currentHeight: 1.72,
      },
      lastProcessedSequence: 0,
      lastProcessedTimestamp: Date.now(),
      maxHealth: PLAYER_MAX_HEALTH,
      health: PLAYER_MAX_HEALTH,
      isAlive: true,
      respawnAt: 0,
      lastFireAt: 0,
      pitch: 0,
      activeWeaponKey: 'rifle',
      isScoped: false,
      presentationState: 'idle',
      hitboxRig: null,
      authoritativeHitboxes: null,
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
      })
      .catch((error) => {
        console.warn(`[TacticalRoom] Failed to create hitbox rig for ${client.sessionId}.`, error);
      });

    this.broadcast('player-joined', {
      playerId: client.sessionId,
      sessionId: client.sessionId,
    });
    this.broadcastPlayerState();

    console.log(
      `[TacticalRoom] Client joined: session=${client.sessionId} playerId=${client.sessionId} players=${Object.keys(this.players).length}`,
    );
  }

  onLeave(client) {
    delete this.players[client.sessionId];

    this.broadcast('player-left', {
      playerId: client.sessionId,
      sessionId: client.sessionId,
    });
    this.broadcastPlayerState();

    console.log(
      `[TacticalRoom] Client left: session=${client.sessionId} playerId=${client.sessionId} players=${Object.keys(this.players).length}`,
    );
  }

  onDispose() {
    this.collisionWorldPromises.clear();
    for (const collisionWorld of this.collisionWorlds.values()) {
      collisionWorld.collisionGeometry?.dispose?.();
    }

    this.collisionWorlds.clear();
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
    });
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
    })();

    this.collisionWorldPromises.set(resolvedMapId, loadPromise);

    try {
      return await loadPromise;
    } finally {
      this.collisionWorldPromises.delete(resolvedMapId);
    }
  }

  respawnPlayer(player) {
    player.health = player.maxHealth;
    player.isAlive = true;
    player.respawnAt = 0;
    player.pendingInputs.length = 0;
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
    this.broadcast('combat-event', {
      type: 'player-respawned',
      playerId: player.playerId,
    });
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

    this.broadcast('combat-event', {
      type: 'player-fired',
      playerId: player.playerId,
      weaponKey: player.activeWeaponKey,
    });
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

    const maxDistance = weapon.meleeRange ?? 512;
    const collisionWorld = this.getCollisionWorldForMap(player.mapId);
    const worldHit = collisionWorld?.raycast(SHOT_ORIGIN, SHOT_DIRECTION, maxDistance) ?? null;
    const worldHitDistance = worldHit ? worldHit.point.distanceTo(SHOT_ORIGIN) : Infinity;

    let bestTarget = null;
    let bestDistance = Math.min(maxDistance, worldHitDistance);

    for (const target of Object.values(this.players)) {
      if (
        target.playerId === player.playerId
        || !target.isAlive
        || target.mapId !== player.mapId
      ) {
        continue;
      }

      const authoritativeHitDistance = getAuthoritativeHitboxSnapshotDistance(
        SHOT_RAY,
        target.authoritativeHitboxes,
        maxDistance,
        bestDistance,
      );
      const hitDistance = Number.isFinite(authoritativeHitDistance)
        ? authoritativeHitDistance
        : getPlayerHitDistance(SHOT_RAY, target, maxDistance, bestDistance);
      if (!Number.isFinite(hitDistance) || hitDistance >= bestDistance) {
        continue;
      }

      bestDistance = hitDistance;
      bestTarget = target;
    }

    if (!bestTarget) {
      return;
    }

    bestTarget.health = Math.max(0, bestTarget.health - weapon.damage);
    if (bestTarget.health === 0) {
      bestTarget.isAlive = false;
      bestTarget.respawnAt = now + PLAYER_RESPAWN_DELAY_MS;
      bestTarget.pendingInputs.length = 0;
      bestTarget.presentationState = 'dead';
    }

    player.presentationState = this.getPresentationStateForPlayer(player);

    this.broadcast('combat-event', {
      type: 'player-hit',
      attackerPlayerId: player.playerId,
      victimPlayerId: bestTarget.playerId,
      damage: weapon.damage,
      remainingHealth: bestTarget.health,
      killed: bestTarget.health === 0,
      respawnAt: bestTarget.respawnAt,
    });
    this.broadcastPlayerState();
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
