import { Client } from 'colyseus.js';
import {
  NETCODE_MAX_REMOTE_SNAPSHOTS,
  NETCODE_REMOTE_INTERPOLATION_DELAY_MS,
  NETCODE_SIMULATION_STEP,
} from '../../shared/netcode.js';
import {
  createPlayerFireMessage,
  createPlayerInputMessage,
  createPlayerReadyMessage,
  createPlayerStatusMessage,
  normalizeAuthoritativePlayerState,
} from '../../shared/netcodeProtocol.js';

const ROOM_NAME = 'TacticalRoom';

function getNow() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }

  return Date.now();
}

function lerp(start, end, alpha) {
  return start + (end - start) * alpha;
}

function interpolateAngle(start, end, alpha) {
  let delta = end - start;

  while (delta > Math.PI) {
    delta -= Math.PI * 2;
  }

  while (delta < -Math.PI) {
    delta += Math.PI * 2;
  }

  return start + delta * alpha;
}

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
    this.remotePlayerBuffers = new Map();
    this.lastError = null;
    this.nextInputSequence = 1;
    this.lastReconciledSequence = 0;
    this.pendingLocalCorrection = null;
    this.pendingInitializationState = null;
    this.pendingInputs = [];
    this.latestSampledInput = null;
    this.pendingJumpSend = false;
    this.lastAuthoritativeStateAt = 0;
    this.lastAuthoritativeSequence = 0;
    this.lastCorrectionDistance = 0;
    this.authoritativeEvents = [];
    this.localPlayerState = null;
    this.pendingCombatEvents = [];

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
        this.remotePlayerBuffers.delete(message?.playerId);
        console.info('[NetworkClient] Player left:', message);
      });

      room.onMessage('player-state', (message) => {
        this.applyPlayerState(message?.players ?? {});
      });

      room.onMessage('combat-event', (message) => {
        this.pendingCombatEvents.push(message);
      });

      room.onLeave((code) => {
        this.room = null;
        this.remotePlayerBuffers.clear();
        this.connectionState = this.destroyed ? 'closed' : 'disconnected';
        console.info(`[NetworkClient] Room closed with code ${code}`);
      });

      room.onError((code, message) => {
        this.lastError = `${code}: ${message}`;
        console.error(`[NetworkClient] Room error ${code}: ${message}`);
      });

      if (this.pendingInitializationState) {
        room.send('player-ready', createPlayerReadyMessage(this.pendingInitializationState));
      }

      room.send('request-player-state');
    } catch (error) {
      this.client = null;
      this.room = null;
      this.remotePlayerBuffers.clear();
      this.connectionState = 'offline';
      this.lastError = error instanceof Error ? error.message : String(error);
      console.warn(
        `[NetworkClient] Multiplayer unavailable at ${this.serverUrl}. Continuing in single-player mode.`,
        error,
      );
    }
  }

  applyPlayerState(players) {
    const nextRemotePlayerIds = new Set();
    const receivedAt = getNow();

    for (const [playerId, playerState] of Object.entries(players)) {
      const normalizedState = normalizeAuthoritativePlayerState(playerId, playerState);

      if (playerId === this.playerId) {
        this.localPlayerState = normalizedState;
        if (normalizedState.sequence > this.lastReconciledSequence) {
          const localEntry = this.pendingInputs.find((entry) => entry.sequence === normalizedState.sequence);
          this.lastCorrectionDistance = localEntry
            ? Math.hypot(
              normalizedState.position.x - localEntry.predictedPosition.x,
              normalizedState.position.y - localEntry.predictedPosition.y,
              normalizedState.position.z - localEntry.predictedPosition.z,
            )
            : 0;
          this.authoritativeEvents.push(receivedAt);
          while (this.authoritativeEvents.length > 0 && receivedAt - this.authoritativeEvents[0] > 1000) {
            this.authoritativeEvents.shift();
          }
          this.lastReconciledSequence = normalizedState.sequence;
          this.lastAuthoritativeSequence = normalizedState.sequence;
          this.lastAuthoritativeStateAt = receivedAt;
          this.pendingInputs = this.pendingInputs.filter((entry) => entry.sequence > normalizedState.sequence);
          this.pendingLocalCorrection = {
            authoritativeState: normalizedState,
            replayInputs: this.pendingInputs.map((entry) => ({
              input: entry.input,
            })),
          };
        }
        continue;
      }

      nextRemotePlayerIds.add(playerId);
      const buffer = this.remotePlayerBuffers.get(playerId) ?? [];
      const previousSnapshot = buffer[buffer.length - 1];
      const isDuplicate = previousSnapshot
        && previousSnapshot.position.x === normalizedState.position.x
        && previousSnapshot.position.y === normalizedState.position.y
        && previousSnapshot.position.z === normalizedState.position.z
        && previousSnapshot.yaw === normalizedState.yaw
        && previousSnapshot.currentHeight === normalizedState.currentHeight
        && previousSnapshot.isCrouched === normalizedState.isCrouched
        && previousSnapshot.activeWeaponKey === normalizedState.activeWeaponKey
        && previousSnapshot.isScoped === normalizedState.isScoped
        && previousSnapshot.presentationState === normalizedState.presentationState
        && previousSnapshot.isAlive === normalizedState.isAlive;

      if (!isDuplicate) {
        buffer.push({
          ...normalizedState,
          receivedAt,
        });

        while (buffer.length > NETCODE_MAX_REMOTE_SNAPSHOTS) {
          buffer.shift();
        }
      }

      this.remotePlayerBuffers.set(playerId, buffer);
    }

    for (const playerId of this.remotePlayerBuffers.keys()) {
      if (!nextRemotePlayerIds.has(playerId)) {
        this.remotePlayerBuffers.delete(playerId);
      }
    }
  }

  initializeLocalPlayer(initialState) {
    this.pendingInitializationState = createPlayerReadyMessage(initialState);

    if (this.room) {
      this.room.send('player-ready', this.pendingInitializationState);
    }
  }

  sampleLocalInput(localInputSnapshot, options = {}) {
    if (!this.room || !localInputSnapshot) {
      return null;
    }

    const sequence = this.nextInputSequence;
    const packet = createPlayerInputMessage({
      ...localInputSnapshot,
      speedMultiplier: options.speedMultiplier ?? 1,
    }, sequence, Date.now());
    const entry = {
      sequence,
      input: packet,
      simulationStep: options.simulationStep ?? NETCODE_SIMULATION_STEP,
      predictedPosition: {
        x: Number(options.predictedPosition?.x ?? 0),
        y: Number(options.predictedPosition?.y ?? 0),
        z: Number(options.predictedPosition?.z ?? 0),
      },
    };

    this.pendingInputs.push(entry);
    this.latestSampledInput = packet;
    this.pendingJumpSend = this.pendingJumpSend || packet.jump;
    this.room.send('player-input', packet);
    if (packet.jump) {
      this.pendingJumpSend = false;
    }
    this.nextInputSequence += 1;
    return entry;
  }

  update() {
    return false;
  }

  sendFireRequest(fireRequest) {
    if (!this.room || !fireRequest) {
      return false;
    }

    this.room.send('player-fire', createPlayerFireMessage(fireRequest, Date.now()));
    return true;
  }

  sendPlayerStatus(status) {
    if (!this.room || !status) {
      return false;
    }

    this.room.send('player-status', createPlayerStatusMessage(status));
    return true;
  }

  consumeLocalCorrection() {
    const correction = this.pendingLocalCorrection;
    this.pendingLocalCorrection = null;
    return correction;
  }

  consumeCombatEvents() {
    const events = this.pendingCombatEvents;
    this.pendingCombatEvents = [];
    return events;
  }

  getLocalPlayerState() {
    return this.localPlayerState;
  }

  suspendGameplaySync() {
    this.remotePlayerBuffers.clear();
    this.pendingLocalCorrection = null;
    this.pendingInitializationState = null;
    this.pendingInputs.length = 0;
    this.latestSampledInput = null;
    this.pendingJumpSend = false;
    this.lastCorrectionDistance = 0;
    this.lastAuthoritativeSequence = 0;
    this.lastReconciledSequence = 0;
    this.lastAuthoritativeStateAt = 0;
    this.authoritativeEvents.length = 0;
    this.localPlayerState = null;
    this.pendingCombatEvents = [];
  }

  getRemotePlayers() {
    const renderTime = getNow() - NETCODE_REMOTE_INTERPOLATION_DELAY_MS;
    const interpolatedPlayers = [];

    for (const [playerId, snapshots] of this.remotePlayerBuffers) {
      if (snapshots.length === 0) {
        continue;
      }

      if (snapshots.length === 1 || renderTime <= snapshots[0].receivedAt) {
        const snapshot = snapshots[0];
        interpolatedPlayers.push({
          playerId,
          position: { ...snapshot.position },
          yaw: snapshot.yaw,
          currentHeight: snapshot.currentHeight,
          isCrouched: snapshot.isCrouched,
          displayName: snapshot.displayName,
          activeWeaponKey: snapshot.activeWeaponKey,
          isScoped: snapshot.isScoped,
          presentationState: snapshot.presentationState,
          isAlive: snapshot.isAlive,
        });
        continue;
      }

      let previousSnapshot = snapshots[0];
      let nextSnapshot = snapshots[snapshots.length - 1];

      for (let index = 1; index < snapshots.length; index += 1) {
        const candidate = snapshots[index];
        if (candidate.receivedAt >= renderTime) {
          nextSnapshot = candidate;
          previousSnapshot = snapshots[index - 1];
          break;
        }

        previousSnapshot = candidate;
      }

      if (nextSnapshot.receivedAt <= previousSnapshot.receivedAt || renderTime >= nextSnapshot.receivedAt) {
        interpolatedPlayers.push({
          playerId,
          position: { ...nextSnapshot.position },
          yaw: nextSnapshot.yaw,
          currentHeight: nextSnapshot.currentHeight,
          isCrouched: nextSnapshot.isCrouched,
          displayName: nextSnapshot.displayName,
          activeWeaponKey: nextSnapshot.activeWeaponKey,
          isScoped: nextSnapshot.isScoped,
          presentationState: nextSnapshot.presentationState,
          isAlive: nextSnapshot.isAlive,
        });
        continue;
      }

      const alpha = (renderTime - previousSnapshot.receivedAt)
        / (nextSnapshot.receivedAt - previousSnapshot.receivedAt);

      interpolatedPlayers.push({
        playerId,
        position: {
          x: lerp(previousSnapshot.position.x, nextSnapshot.position.x, alpha),
          y: lerp(previousSnapshot.position.y, nextSnapshot.position.y, alpha),
          z: lerp(previousSnapshot.position.z, nextSnapshot.position.z, alpha),
        },
        yaw: interpolateAngle(previousSnapshot.yaw, nextSnapshot.yaw, alpha),
        currentHeight: lerp(previousSnapshot.currentHeight, nextSnapshot.currentHeight, alpha),
        isCrouched: nextSnapshot.isCrouched,
        displayName: nextSnapshot.displayName,
        activeWeaponKey: nextSnapshot.activeWeaponKey,
        isScoped: nextSnapshot.isScoped,
        presentationState: nextSnapshot.presentationState,
        isAlive: nextSnapshot.isAlive,
      });
    }

    return interpolatedPlayers;
  }

  getRemotePlayerCount() {
    return this.remotePlayerBuffers.size;
  }

  getDebugState() {
    const now = getNow();
    return {
      connectionState: this.connectionState,
      latestSequence: Math.max(0, this.nextInputSequence - 1),
      acknowledgedSequence: this.lastAuthoritativeSequence,
      pendingInputCount: this.pendingInputs.length,
      sequenceGap: Math.max(0, (this.nextInputSequence - 1) - this.lastAuthoritativeSequence),
      snapshotAgeMs: this.lastAuthoritativeStateAt > 0 ? Math.round(now - this.lastAuthoritativeStateAt) : -1,
      lastPredictedDriftDistance: this.lastCorrectionDistance,
      authoritativeUpdatesPerSecond: this.authoritativeEvents.length,
      pendingJumpSend: this.pendingJumpSend,
    };
  }

  destroy() {
    this.destroyed = true;
    this.remotePlayerBuffers.clear();
    this.pendingLocalCorrection = null;
    this.pendingInitializationState = null;
    this.pendingInputs.length = 0;
    this.latestSampledInput = null;
    this.pendingJumpSend = false;
    this.authoritativeEvents.length = 0;
    this.localPlayerState = null;
    this.pendingCombatEvents = [];

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
