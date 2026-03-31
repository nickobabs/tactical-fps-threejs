import { Room } from '@colyseus/core';
import {
  createPlayerMovementState,
  simulatePlayerMovement,
} from '../../../src/shared/playerMovement.js';

const SERVER_TICK_RATE = 60;
const SERVER_TICK_DELTA = 1 / SERVER_TICK_RATE;

export class TacticalRoom extends Room {
  onCreate() {
    this.setPrivate(false);
    this.players = {};
    this.setSimulationInterval(() => {
      let hasSimulationChanges = false;

      for (const player of Object.values(this.players)) {
        if (!player.latestInput) {
          continue;
        }

        player.motionState = simulatePlayerMovement(player.motionState, player.latestInput, SERVER_TICK_DELTA, {
          groundHeight: 0,
        });
        player.lastProcessedSequence = player.latestInput.sequence;
        player.lastProcessedTimestamp = player.latestInput.timestamp;
        hasSimulationChanges = true;
      }

      if (hasSimulationChanges) {
        this.broadcastPlayerState();
      }
    }, 1000 / SERVER_TICK_RATE);

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

      player.latestInput = {
        forward: Boolean(message?.forward),
        backward: Boolean(message?.backward),
        left: Boolean(message?.left),
        right: Boolean(message?.right),
        sprint: Boolean(message?.sprint),
        crouch: Boolean(message?.crouch),
        jump: Boolean(message?.jump),
        yaw: Number(message?.yaw ?? player.motionState.yaw),
        sequence,
        timestamp: Number(message?.timestamp ?? Date.now()),
      };
    });

    this.onMessage('player-ready', (client, message) => {
      const player = this.players[client.sessionId];
      if (!player) {
        return;
      }

      player.motionState = createPlayerMovementState({
        position: {
          x: Number(message?.position?.x ?? 0),
          y: Number(message?.position?.y ?? 0),
          z: Number(message?.position?.z ?? 0),
        },
        yaw: Number(message?.yaw ?? 0),
        isGrounded: Boolean(message?.isGrounded ?? true),
        isCrouched: Boolean(message?.isCrouched ?? false),
        currentHeight: Number(message?.currentHeight ?? 1.72),
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

  getSerializablePlayers() {
    return Object.fromEntries(
      Object.entries(this.players).map(([playerId, player]) => [
        playerId,
        {
          playerId,
          position: {
            x: player.motionState.position.x,
            y: player.motionState.position.y,
            z: player.motionState.position.z,
          },
          yaw: player.motionState.yaw,
          isGrounded: player.motionState.isGrounded,
          isCrouched: player.motionState.isCrouched,
          currentHeight: player.motionState.currentHeight,
          lastProcessedSequence: player.lastProcessedSequence,
          lastProcessedTimestamp: player.lastProcessedTimestamp,
        },
      ]),
    );
  }

  broadcastPlayerState() {
    this.broadcast('player-state', {
      players: this.getSerializablePlayers(),
    });
  }
}
