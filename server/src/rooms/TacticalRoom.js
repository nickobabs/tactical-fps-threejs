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
  serializeAuthoritativePlayerState,
} from '../../../src/shared/netcodeProtocol.js';
import { createCollisionMapForMapIdAsync } from '../../../src/shared/maps/mapCollision.js';
import {
  getSharedWeaponData,
  PLAYER_MAX_HEALTH,
  PLAYER_RESPAWN_DELAY_MS,
} from '../../../src/shared/weaponData.js';

const SERVER_MOVE_POSITION = new THREE.Vector3();
const SHOT_ORIGIN = new THREE.Vector3();
const SHOT_DIRECTION = new THREE.Vector3();
const PLAYER_EYE = new THREE.Vector3();
const TARGET_SEGMENT = new THREE.Line3();
const CLOSEST_POINT_ON_RAY = new THREE.Vector3();
const CLOSEST_POINT_ON_SEGMENT = new THREE.Vector3();
const SHOT_RAY = new THREE.Ray();

export class TacticalRoom extends Room {
  onCreate() {
    this.setPrivate(false);
    this.players = {};
    this.collisionWorlds = new Map();
    this.collisionWorldPromises = new Map();
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
          continue;
        }

        const collisionWorld = this.getCollisionWorldForMap(player.mapId);
        while (player.pendingInputs.length > 0) {
          const nextInput = player.pendingInputs.shift();
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
          player.lastProcessedSequence = nextInput.sequence;
          player.lastProcessedTimestamp = nextInput.timestamp;
          hasSimulationChanges = true;
        }
      }

      if (hasSimulationChanges) {
        this.broadcastPlayerState();
      }
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

    this.onMessage('request-player-state', (client) => {
      client.send('player-state', { players: this.getSerializablePlayers() });
    });

    console.log('[TacticalRoom] Waiting for clients...');
    console.log('[TacticalRoom] Room created');
  }

  onJoin(client) {
    this.players[client.sessionId] = {
      playerId: client.sessionId,
      motionState: createPlayerMovementState(),
      pendingInputs: [],
      mapId: 'training-ground',
      spawnState: {
        position: { x: 0, y: 0, z: 0 },
        yaw: 0,
        currentHeight: 1.72,
      },
      lastProcessedSequence: 0,
      lastProcessedTimestamp: Date.now(),
      maxHealth: PLAYER_MAX_HEALTH,
      health: PLAYER_MAX_HEALTH,
      isAlive: true,
      respawnAt: 0,
      lastFireAt: 0,
    };

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

    const now = Date.now();
    const fireIntervalMs = weapon.fireInterval * 1000;
    if (player.lastFireAt > 0 && now - player.lastFireAt < fireIntervalMs * 0.9) {
      return;
    }
    player.lastFireAt = now;

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

      TARGET_SEGMENT.start.set(
        target.motionState.position.x,
        target.motionState.position.y + 0.35,
        target.motionState.position.z,
      );
      TARGET_SEGMENT.end.set(
        target.motionState.position.x,
        target.motionState.position.y + Math.max(0.35, target.motionState.currentHeight),
        target.motionState.position.z,
      );

      const distanceSq = SHOT_RAY.distanceSqToSegment(
        TARGET_SEGMENT.start,
        TARGET_SEGMENT.end,
        CLOSEST_POINT_ON_RAY,
        CLOSEST_POINT_ON_SEGMENT,
      );

      if (distanceSq > 0.35 * 0.35) {
        continue;
      }

      const hitDistance = CLOSEST_POINT_ON_RAY.distanceTo(SHOT_ORIGIN);
      if (hitDistance < 0 || hitDistance >= bestDistance) {
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
    }

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
}
