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
  createPlayerReadyMessage,
  serializeAuthoritativePlayerState,
} from '../../../src/shared/netcodeProtocol.js';
import { createCollisionMapForMapId } from '../../../src/shared/maps/mapCollision.js';

const SERVER_MOVE_POSITION = new THREE.Vector3();

export class TacticalRoom extends Room {
  onCreate() {
    this.setPrivate(false);
    this.players = {};
    this.collisionWorlds = new Map();
    this.setSimulationInterval(() => {
      let hasSimulationChanges = false;

      for (const player of Object.values(this.players)) {
        if (!player.latestInput) {
          continue;
        }

        const collisionWorld = this.getCollisionWorldForMap(player.mapId);
        player.motionState = simulatePlayerMovement(player.motionState, player.latestInput, NETCODE_SIMULATION_STEP, {
          groundHeight: collisionWorld?.getGroundHeight() ?? 0,
          speedMultiplier: Number(player.latestInput.speedMultiplier ?? 1),
          moveHorizontal: collisionWorld
            ? (position, radius, height, horizontalDelta) => {
              const moved = collisionWorld.move(
                SERVER_MOVE_POSITION.set(position.x, position.y, position.z),
                radius,
                height,
                horizontalDelta,
              );
              return {
                x: moved.x,
                y: moved.y,
                z: moved.z,
              };
            }
            : null,
          getGroundHeightAt: collisionWorld
            ? (x, z, currentY, maxStepUp) => collisionWorld.getGroundHeightAt(
              x,
              z,
              currentY,
              maxStepUp,
            )
            : null,
        });
        player.latestInput.jump = false;
        player.lastProcessedSequence = player.latestInput.sequence;
        player.lastProcessedTimestamp = player.latestInput.timestamp;
        hasSimulationChanges = true;
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

      player.latestInput = createPlayerInputMessage({
        ...message,
        yaw: Number(message?.yaw ?? player.motionState.yaw),
      }, sequence, Number(message?.timestamp ?? Date.now()));
    });

    this.onMessage('player-ready', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      const readyState = createPlayerReadyMessage(message);
      player.mapId = readyState.mapId;
      player.motionState = createPlayerMovementState({
        position: readyState.position,
        velocity: readyState.velocity,
        yaw: readyState.yaw,
        isGrounded: readyState.isGrounded,
        isCrouched: readyState.isCrouched,
        currentHeight: readyState.currentHeight,
      });
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
      motionState: createPlayerMovementState(),
      latestInput: null,
      mapId: 'training-ground',
      lastProcessedSequence: 0,
      lastProcessedTimestamp: Date.now(),
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
    if (this.collisionWorlds.has(resolvedMapId)) {
      return this.collisionWorlds.get(resolvedMapId);
    }

    const collisionMap = createCollisionMapForMapId(resolvedMapId);
    if (!collisionMap) {
      return null;
    }

    const collisionWorld = new CollisionWorld({
      groundHeight: collisionMap.groundHeight,
      collisionGeometry: collisionMap.collisionGeometry,
    });
    this.collisionWorlds.set(resolvedMapId, collisionWorld);
    return collisionWorld;
  }
}
