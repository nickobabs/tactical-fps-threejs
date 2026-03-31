import { Client } from 'colyseus.js';

const ROOM_NAME = 'TacticalRoom';
const SEND_INTERVAL_SECONDS = 1 / 20;

function getDefaultServerUrl() {
  if (typeof window === 'undefined') {
    return 'ws://localhost:2567';
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.hostname}:2567`;
}

export class NetworkClient {
  constructor(options = {}) {
    this.serverUrl = options.serverUrl ?? import.meta.env.VITE_COLYSEUS_SERVER_URL ?? getDefaultServerUrl();
    this.roomName = options.roomName ?? ROOM_NAME;
    this.client = null;
    this.room = null;
    this.playerId = null;
    this.connectionState = 'idle';
    this.destroyed = false;
    this.remotePlayers = new Map();
    this.sendAccumulator = 0;
    this.lastError = null;
    this.nextInputSequence = 1;
    this.lastReconciledSequence = 0;
    this.pendingLocalCorrection = null;
    this.pendingInitializationState = null;

    void this.connect();
  }

  async connect() {
    if (this.destroyed || this.connectionState === 'connecting' || this.connectionState === 'connected') {
      return;
    }

    this.connectionState = 'connecting';
    this.lastError = null;
    console.info(`[NetworkClient] Connecting to ${this.serverUrl}/${this.roomName}`);

    try {
      this.client = new Client(this.serverUrl);
      const room = await this.client.joinOrCreate(this.roomName);

      if (this.destroyed) {
        await room.leave();
        return;
      }

      this.room = room;
      this.connectionState = 'connected';
      this.playerId = room.sessionId;
      console.info(`[NetworkClient] Connected to room "${room.name}" with session ${room.sessionId}`);
      console.info(`[NetworkClient] Assigned player ID: ${this.playerId}`);

      room.onMessage('player-joined', (message) => {
        console.info('[NetworkClient] Player joined:', message);
      });

      room.onMessage('player-left', (message) => {
        this.remotePlayers.delete(message?.playerId);
        console.info('[NetworkClient] Player left:', message);
      });

      room.onMessage('player-state', (message) => {
        this.applyPlayerState(message?.players ?? {});
      });

      room.onLeave((code) => {
        this.room = null;
        this.remotePlayers.clear();
        this.connectionState = this.destroyed ? 'closed' : 'disconnected';
        console.info(`[NetworkClient] Room closed with code ${code}`);
      });

      room.onError((code, message) => {
        this.lastError = `${code}: ${message}`;
        console.error(`[NetworkClient] Room error ${code}: ${message}`);
      });

      if (this.pendingInitializationState) {
        room.send('player-ready', this.pendingInitializationState);
      }

      room.send('request-player-state');
    } catch (error) {
      this.client = null;
      this.room = null;
      this.remotePlayers.clear();
      this.connectionState = 'offline';
      this.lastError = error instanceof Error ? error.message : String(error);
      console.warn(
        `[NetworkClient] Multiplayer unavailable at ${this.serverUrl}. Continuing in single-player mode.`,
        error,
      );
    }
  }

  applyPlayerState(players) {
    const nextRemotePlayers = new Map();

    for (const [playerId, playerState] of Object.entries(players)) {
      const normalizedState = {
        playerId,
        position: {
          x: Number(playerState?.position?.x ?? 0),
          y: Number(playerState?.position?.y ?? 0),
          z: Number(playerState?.position?.z ?? 0),
        },
        yaw: Number(playerState?.yaw ?? 0),
        sequence: Number(playerState?.lastProcessedSequence ?? 0),
        timestamp: Number(playerState?.lastProcessedTimestamp ?? 0),
        isGrounded: Boolean(playerState?.isGrounded),
        isCrouched: Boolean(playerState?.isCrouched),
        currentHeight: Number(playerState?.currentHeight ?? 1.72),
      };

      if (playerId === this.playerId) {
        if (normalizedState.sequence > this.lastReconciledSequence) {
          this.lastReconciledSequence = normalizedState.sequence;
          this.pendingLocalCorrection = normalizedState;
        }
        continue;
      }

      nextRemotePlayers.set(playerId, normalizedState);
    }

    this.remotePlayers = nextRemotePlayers;
  }

  initializeLocalPlayer(initialState) {
    this.pendingInitializationState = initialState;

    if (this.room) {
      this.room.send('player-ready', initialState);
    }
  }

  update(delta, localInputSnapshot = null) {
    if (!this.room || !localInputSnapshot) {
      return;
    }

    this.sendAccumulator += delta;
    if (this.sendAccumulator < SEND_INTERVAL_SECONDS) {
      return;
    }

    this.sendAccumulator = 0;
    this.room.send('player-input', {
      ...localInputSnapshot,
      sequence: this.nextInputSequence,
      timestamp: Date.now(),
    });
    this.nextInputSequence += 1;
  }

  consumeLocalCorrection() {
    const correction = this.pendingLocalCorrection;
    this.pendingLocalCorrection = null;
    return correction;
  }

  getRemotePlayers() {
    return Array.from(this.remotePlayers.values());
  }

  destroy() {
    this.destroyed = true;
    this.remotePlayers.clear();
    this.pendingLocalCorrection = null;
    this.pendingInitializationState = null;

    if (this.room) {
      void this.room.leave().catch((error) => {
        console.warn('[NetworkClient] Failed to leave room cleanly.', error);
      });
    }

    this.room = null;
    this.client = null;
    this.connectionState = 'closed';
  }
}
