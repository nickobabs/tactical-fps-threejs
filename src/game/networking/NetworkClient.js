import { Client } from 'colyseus.js';
import {
  NETCODE_MAX_REMOTE_SNAPSHOTS,
  NETCODE_REMOTE_INTERPOLATION_DELAY_MS,
  NETCODE_SIMULATION_STEP,
} from '../../shared/netcode.js';
import {
  getTimelineNow,
  interpolateRemotePlayerSnapshotAtTime,
} from '../../shared/remoteTimeline.js';
import {
  createBombDropMessage,
  createBombDefuseMessage,
  createBombPlantMessage,
  createBuyRequestMessage,
  createChatMessage,
  createDebugRoundControlMessage,
  createGamemodeChangeMessage,
  createPlayerFireMessage,
  createPlayerInputMessage,
  createPlayerReadyMessage,
  createSmokeBloomMessage,
  createSmokeThrowMessage,
  createPlayerStatusMessage,
  normalizeAuthoritativePlayerState,
} from '../../shared/netcodeProtocol.js';
import { createRemoteAudioEvent } from '../../shared/audioEvents.js';

const ROOM_NAME = 'TacticalRoom';
const SCOREBOARD_TEAMS = ['attackers', 'defenders'];
const TEAM_LABELS = {
  attackers: 'Attackers',
  defenders: 'Defenders',
};
const PING_INTERVAL_MS = 2000;
const PING_TIMEOUT_MS = 10000;
const MAX_REPORTED_PING_MS = 999;
const RECONNECT_BASE_DELAY_MS = 1000;
const RECONNECT_MAX_DELAY_MS = 8000;
const MAX_CONNECTION_EVENT_HISTORY = 40;
let NEXT_NETWORK_CLIENT_INSTANCE_ID = 1;

function formatAudioDebugEntry(entry, now) {
  if (!entry) {
    return null;
  }

  return {
    eventType: entry.eventType ?? 'unknown',
    soundKey: entry.soundKey ?? 'unknown',
    distance: Number(entry.distance ?? 0),
    baseVolume: Number(entry.baseVolume ?? 0),
    manualVolume: Number(entry.manualVolume ?? 0),
    spatialVolumeMultiplier: Number(entry.spatialVolumeMultiplier ?? 0),
    finalVolume: Number(entry.finalVolume ?? 0),
    minDistance: Number(entry.minDistance ?? 0),
    maxDistance: Number(entry.maxDistance ?? 0),
    rolloffFactor: Number(entry.rolloffFactor ?? 0),
    panningModel: String(entry.panningModel ?? 'unknown'),
    ageMs: Number(now - Number(entry.recordedAt ?? now)),
  };
}

function hasSamePoint(a, b) {
  return a && b && a.x === b.x && a.y === b.y && a.z === b.z;
}

function hasSameSegment(a, b) {
  return a && b
    && hasSamePoint(a.start, b.start)
    && hasSamePoint(a.end, b.end)
    && a.radius === b.radius;
}

function hasSameSphere(a, b) {
  return a && b && hasSamePoint(a.center, b.center) && a.radius === b.radius;
}

function hasSameVector(a, b) {
  return a && b && a.x === b.x && a.y === b.y && a.z === b.z;
}

function hasSameHead(a, b) {
  return a && b
    && hasSamePoint(a.center, b.center)
    && a.radius === b.radius
    && hasSameVector(a.size, b.size)
    && hasSameVector(a.right, b.right)
    && hasSameVector(a.up, b.up)
    && hasSameVector(a.forward, b.forward);
}

function hasSameHitboxes(a, b) {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return !a && !b;
  }
  if (!hasSameHead(a.head, b.head) || !hasSameSegment(a.torso, b.torso) || !hasSameSegment(a.pelvis, b.pelvis)) {
    return false;
  }
  const armsA = a.arms ?? [];
  const armsB = b.arms ?? [];
  if (armsA.length !== armsB.length) {
    return false;
  }
  for (let index = 0; index < armsA.length; index += 1) {
    if (!hasSameSegment(armsA[index], armsB[index])) {
      return false;
    }
  }
  const handsA = a.hands ?? [];
  const handsB = b.hands ?? [];
  if (handsA.length !== handsB.length) {
    return false;
  }
  for (let index = 0; index < handsA.length; index += 1) {
    if (!hasSameSphere(handsA[index], handsB[index])) {
      return false;
    }
  }
  const legsA = a.legs ?? [];
  const legsB = b.legs ?? [];
  if (legsA.length !== legsB.length) {
    return false;
  }
  for (let index = 0; index < legsA.length; index += 1) {
    if (!hasSameSegment(legsA[index], legsB[index])) {
      return false;
    }
  }
  return true;
}

function getDefaultServerUrl() {
  if (typeof window === 'undefined') {
    return 'ws://localhost:2567';
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const hostname = window.location.hostname;
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';

  if (isLocalHost) {
    return `${protocol}//${hostname}:2567`;
  }

  return `${protocol}//${window.location.host}`;
}

export class NetworkClient {
  constructor(options = {}) {
    this.instanceId = NEXT_NETWORK_CLIENT_INSTANCE_ID;
    NEXT_NETWORK_CLIENT_INSTANCE_ID += 1;
    this.serverUrl = options.serverUrl ?? import.meta.env.VITE_COLYSEUS_SERVER_URL ?? getDefaultServerUrl();
    this.roomName = options.roomName ?? ROOM_NAME;
    this.client = null;
    this.room = null;
    this.playerId = null;
    this.localMapId = null;
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
    this.pendingAudioEvents = [];
    this.pendingChatEvents = [];
    this.lastReceivedPlayerStateCount = 0;
    this.lastSameMapRemoteStateCount = 0;
    this.lastFilteredRemoteStateCount = 0;
    this.lastReceivedRemoteMaps = [];
    this.scoreboardPlayers = new Map();
    this.nextPingId = 1;
    this.lastPingSentAt = 0;
    this.pendingPingId = 0;
    this.pendingPingSentAt = 0;
    this.averagePingMs = 0;
    this.lastPingRoundTripMs = 0;
    this.lastPingServerTurnaroundMs = 0;
    this.lastPingEstimatedNetworkMs = 0;
    this.lastPingReceivedAt = 0;
    this.roundState = null;
    this.objectiveState = null;
    this.gameplaySettings = null;
    this.audioDebugState = null;
    this.reconnectAttemptCount = 0;
    this.reconnectTimerId = null;
    this.lastDisconnectReason = null;
    this.connectAttemptCount = 0;
    this.activeRoomToken = 0;
    this.connectionEvents = [];

    if (typeof window !== 'undefined') {
      window.__TACTICAL_FPS_NETWORK_CLIENTS__ ??= new Map();
      window.__TACTICAL_FPS_NETWORK_CLIENTS__.set(this.instanceId, this);
    }

    this.recordConnectionEvent('created', {
      instanceId: this.instanceId,
      serverUrl: this.serverUrl,
      roomName: this.roomName,
    });

    void this.connect();
  }

  recordConnectionEvent(type, details = {}) {
    const entry = {
      at: Date.now(),
      performanceAt: getTimelineNow(),
      type: String(type ?? 'unknown'),
      instanceId: this.instanceId,
      connectionState: this.connectionState,
      playerId: this.playerId,
      roomSessionId: this.room?.sessionId ?? null,
      activeRoomToken: this.activeRoomToken,
      ...details,
    };
    this.connectionEvents.push(entry);
    while (this.connectionEvents.length > MAX_CONNECTION_EVENT_HISTORY) {
      this.connectionEvents.shift();
    }

    if (typeof window !== 'undefined') {
      window.__TACTICAL_FPS_NETWORK_CLIENT_EVENT_LOG__ ??= [];
      window.__TACTICAL_FPS_NETWORK_CLIENT_EVENT_LOG__.push(entry);
      while (window.__TACTICAL_FPS_NETWORK_CLIENT_EVENT_LOG__.length > 200) {
        window.__TACTICAL_FPS_NETWORK_CLIENT_EVENT_LOG__.shift();
      }
    }

    const logMethod = (
      type.includes('error')
      || type.includes('failed')
      || type.includes('stale')
      || type.includes('left')
      || type.includes('reconnect')
    )
      ? console.warn
      : console.info;
    logMethod('[NetworkClient]', entry);
  }

  resetRoomState() {
    this.room = null;
    this.playerId = null;
    this.localPlayerState = null;
    this.remotePlayerBuffers.clear();
    this.scoreboardPlayers.clear();
    this.pendingLocalCorrection = null;
    this.pendingInputs.length = 0;
    this.latestSampledInput = null;
    this.pendingJumpSend = false;
    this.lastAuthoritativeStateAt = 0;
    this.lastAuthoritativeSequence = 0;
    this.lastCorrectionDistance = 0;
    this.lastReconciledSequence = 0;
    this.authoritativeEvents.length = 0;
    this.lastReceivedPlayerStateCount = 0;
    this.lastSameMapRemoteStateCount = 0;
    this.lastFilteredRemoteStateCount = 0;
    this.lastReceivedRemoteMaps = [];
    this.pendingCombatEvents = [];
    this.pendingAudioEvents = [];
    this.pendingChatEvents = [];
    this.roundState = null;
    this.objectiveState = null;
    this.gameplaySettings = null;
  }

  getConnectionDiagnostics() {
    const now = getTimelineNow();
    return {
      serverUrl: this.serverUrl,
      roomName: this.roomName,
      instanceId: this.instanceId,
      playerId: this.playerId,
      connectionState: this.connectionState,
      lastError: this.lastError,
      pingAgeMs: this.lastPingReceivedAt > 0 ? Math.round(now - this.lastPingReceivedAt) : -1,
      pingPending: this.pendingPingId > 0,
      visibilityState: typeof document !== 'undefined' ? document.visibilityState : 'unknown',
      online: typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
        ? navigator.onLine
        : 'unknown',
      activeRoomToken: this.activeRoomToken,
      connectAttemptCount: this.connectAttemptCount,
      reconnectAttemptCount: this.reconnectAttemptCount,
      recentConnectionEvents: this.connectionEvents.slice(-10),
    };
  }

  clearReconnectTimer() {
    if (this.reconnectTimerId == null) {
      return;
    }

    clearTimeout(this.reconnectTimerId);
    this.reconnectTimerId = null;
  }

  scheduleReconnect(reason, extra = {}) {
    if (this.destroyed) {
      return;
    }

    if (this.connectionState === 'connected' || this.connectionState === 'connecting') {
      return;
    }

    if (this.reconnectTimerId != null) {
      return;
    }

    const delayMs = Math.min(
      RECONNECT_MAX_DELAY_MS,
      RECONNECT_BASE_DELAY_MS * (2 ** Math.max(0, this.reconnectAttemptCount)),
    );
    this.reconnectAttemptCount += 1;
    this.lastDisconnectReason = {
      reason: String(reason ?? 'unknown'),
      ...extra,
      scheduledAt: Date.now(),
      delayMs,
    };
    this.recordConnectionEvent('schedule-reconnect', {
      reason,
      delayMs,
      reconnectAttempt: this.reconnectAttemptCount,
      ...extra,
    });

    this.reconnectTimerId = setTimeout(() => {
      this.reconnectTimerId = null;
      void this.connect();
    }, delayMs);
  }

  async connect() {
    if (this.destroyed || this.connectionState === 'connecting' || this.connectionState === 'connected') {
      return;
    }

    this.clearReconnectTimer();
    this.connectionState = 'connecting';
    this.lastError = null;
    this.connectAttemptCount += 1;
    const roomToken = this.activeRoomToken + 1;
    this.activeRoomToken = roomToken;
    this.recordConnectionEvent('connect-start', {
      connectAttempt: this.connectAttemptCount,
      serverUrl: this.serverUrl,
      roomName: this.roomName,
      roomToken,
    });

    try {
      this.client = new Client(this.serverUrl);
      const room = await this.client.joinOrCreate(this.roomName);

      if (this.destroyed || this.activeRoomToken !== roomToken) {
        this.recordConnectionEvent('connect-stale-room-leave', {
          roomToken,
          staleSessionId: room.sessionId,
        });
        await room.leave();
        return;
      }

      this.room = room;
      this.connectionState = 'connected';
      this.reconnectAttemptCount = 0;
      this.playerId = room.sessionId;
      this.recordConnectionEvent('connect-success', {
        connectAttempt: this.connectAttemptCount,
        roomName: room.name,
        sessionId: room.sessionId,
        roomToken,
      });

      room.onMessage('player-joined', (message) => {
        this.recordConnectionEvent('player-joined-event', {
          message,
          roomToken,
        });
      });

      room.onMessage('player-left', (message) => {
        this.remotePlayerBuffers.delete(message?.playerId);
        this.scoreboardPlayers.delete(message?.playerId);
        this.recordConnectionEvent('player-left-event', {
          message,
          roomToken,
        });
      });

      room.onMessage('player-state', (message) => {
        this.applyWorldState(message ?? {});
      });

      room.onMessage('combat-event', (message) => {
        this.pendingCombatEvents.push(message);
      });

      room.onMessage('audio-event', (message) => {
        this.pendingAudioEvents.push(createRemoteAudioEvent(message));
      });

      room.onMessage('chat-event', (message) => {
        this.pendingChatEvents.push(message ?? null);
      });

      room.onMessage('pong', (message) => {
        this.handlePong(message);
      });

      room.onLeave((code) => {
        if (this.room !== room || this.activeRoomToken !== roomToken) {
          this.recordConnectionEvent('room-left-stale-ignored', {
            closeCode: code,
            callbackRoomSessionId: room.sessionId,
            callbackRoomToken: roomToken,
          });
          return;
        }

        this.recordConnectionEvent('room-left', {
          closeCode: code,
          sessionId: room.sessionId,
          roomToken,
          lastDisconnectReason: this.lastDisconnectReason,
        });
        this.resetRoomState();
        this.connectionState = this.destroyed ? 'closed' : 'disconnected';
        this.scheduleReconnect('room-onLeave', { closeCode: code });
      });

      room.onError((code, message) => {
        if (this.room !== room || this.activeRoomToken !== roomToken) {
          this.recordConnectionEvent('room-error-stale-ignored', {
            errorCode: code,
            errorMessage: message,
            callbackRoomSessionId: room.sessionId,
            callbackRoomToken: roomToken,
          });
          return;
        }

        this.lastError = `${code}: ${message}`;
        this.recordConnectionEvent('room-error', {
          errorCode: code,
          errorMessage: message,
        });
      });

      if (this.pendingInitializationState) {
        room.send('player-ready', createPlayerReadyMessage(this.pendingInitializationState));
      }

      room.send('request-player-state');
      this.lastPingSentAt = 0;
      this.pendingPingId = 0;
      this.pendingPingSentAt = 0;
      this.lastPingRoundTripMs = 0;
      this.lastPingServerTurnaroundMs = 0;
      this.lastPingEstimatedNetworkMs = 0;
      this.lastPingReceivedAt = 0;
      this.sendPingProbe(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (this.activeRoomToken !== roomToken) {
        this.recordConnectionEvent('connect-failed-stale-ignored', {
          error: errorMessage,
          roomToken,
        });
        return;
      }

      this.client = null;
      this.resetRoomState();
      this.connectionState = 'offline';
      this.lastError = errorMessage;
      this.recordConnectionEvent('connect-failed', {
        error: this.lastError,
        roomToken,
      });
      this.scheduleReconnect('connect-failed', { error: this.lastError });
    }
  }

  applyWorldState(message) {
    this.roundState = message?.round ?? null;
    this.objectiveState = message?.objective ?? null;
    this.gameplaySettings = message?.gameplay ?? null;
    this.applyPlayerState(message?.players ?? {});
  }

  applyPlayerState(players) {
    const nextRemotePlayerIds = new Set();
    const receivedAt = getTimelineNow();
    const activeMapId = this.pendingInitializationState?.mapId ?? this.localMapId;
    let receivedPlayerStateCount = 0;
    let sameMapRemoteStateCount = 0;
    let filteredRemoteStateCount = 0;
    const receivedRemoteMaps = new Set();

    for (const [playerId, playerState] of Object.entries(players)) {
      receivedPlayerStateCount += 1;
      const normalizedState = normalizeAuthoritativePlayerState(playerId, playerState);

      if (playerId === this.playerId) {
        if (activeMapId && normalizedState.mapId !== activeMapId) {
          this.scoreboardPlayers.delete(playerId);
          continue;
        }

        this.localMapId = normalizedState.mapId;
        this.localPlayerState = normalizedState;
        this.scoreboardPlayers.set(playerId, normalizedState);
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

      receivedRemoteMaps.add(normalizedState.mapId);
      if (activeMapId && normalizedState.mapId !== activeMapId) {
        filteredRemoteStateCount += 1;
        this.scoreboardPlayers.delete(playerId);
        continue;
      }

      sameMapRemoteStateCount += 1;
      nextRemotePlayerIds.add(playerId);
      this.scoreboardPlayers.set(playerId, normalizedState);
      const buffer = this.remotePlayerBuffers.get(playerId) ?? [];
      const previousSnapshot = buffer[buffer.length - 1];
      const isDuplicate = previousSnapshot
        && previousSnapshot.position.x === normalizedState.position.x
        && previousSnapshot.position.y === normalizedState.position.y
        && previousSnapshot.position.z === normalizedState.position.z
        && previousSnapshot.yaw === normalizedState.yaw
        && previousSnapshot.pitch === normalizedState.pitch
        && previousSnapshot.currentHeight === normalizedState.currentHeight
        && previousSnapshot.isCrouched === normalizedState.isCrouched
        && previousSnapshot.displayName === normalizedState.displayName
        && previousSnapshot.team === normalizedState.team
        && previousSnapshot.activeWeaponKey === normalizedState.activeWeaponKey
        && previousSnapshot.isScoped === normalizedState.isScoped
        && previousSnapshot.presentationState === normalizedState.presentationState
        && previousSnapshot.deathClip === normalizedState.deathClip
        && previousSnapshot.isAlive === normalizedState.isAlive
        && hasSameHitboxes(previousSnapshot.hitboxes, normalizedState.hitboxes);

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

    this.lastReceivedPlayerStateCount = receivedPlayerStateCount;
    this.lastSameMapRemoteStateCount = sameMapRemoteStateCount;
    this.lastFilteredRemoteStateCount = filteredRemoteStateCount;
    this.lastReceivedRemoteMaps = [...receivedRemoteMaps].sort();

    for (const playerId of this.remotePlayerBuffers.keys()) {
      if (!nextRemotePlayerIds.has(playerId)) {
        this.remotePlayerBuffers.delete(playerId);
      }
    }

    for (const playerId of [...this.scoreboardPlayers.keys()]) {
      if (playerId !== this.playerId && !nextRemotePlayerIds.has(playerId)) {
        this.scoreboardPlayers.delete(playerId);
      }
    }
  }

  initializeLocalPlayer(initialState) {
    this.pendingInitializationState = createPlayerReadyMessage(initialState);
    this.localMapId = this.pendingInitializationState.mapId;
    this.remotePlayerBuffers.clear();
    this.pendingLocalCorrection = null;
    this.pendingInputs.length = 0;
    this.latestSampledInput = null;
    this.pendingJumpSend = false;
    this.lastAuthoritativeStateAt = 0;
    this.lastAuthoritativeSequence = 0;
    this.lastCorrectionDistance = 0;
    this.lastReconciledSequence = 0;
    this.authoritativeEvents.length = 0;
    this.localPlayerState = null;
    this.pendingCombatEvents = [];
    this.pendingAudioEvents = [];
    this.pendingChatEvents = [];
    this.lastReceivedPlayerStateCount = 0;
    this.lastSameMapRemoteStateCount = 0;
    this.lastFilteredRemoteStateCount = 0;
    this.lastReceivedRemoteMaps = [];
    this.scoreboardPlayers.clear();

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
    this.sendPingProbe();
    return false;
  }

  handlePong(message) {
    const pongId = Number(message?.id ?? 0);
    if (pongId <= 0 || pongId !== this.pendingPingId || this.pendingPingSentAt <= 0) {
      return;
    }

    const now = getTimelineNow();
    const roundTripMs = Math.max(0, Math.round(now - this.pendingPingSentAt));
    const serverReceivedAt = Number(message?.serverReceivedAt ?? 0);
    const serverSentAt = Number(message?.serverSentAt ?? serverReceivedAt);
    const serverTurnaroundMs = serverSentAt >= serverReceivedAt
      ? Math.max(0, Math.round(serverSentAt - serverReceivedAt))
      : 0;
    const estimatedNetworkMs = Math.max(0, Math.round(roundTripMs - serverTurnaroundMs));
    this.pendingPingId = 0;
    this.pendingPingSentAt = 0;
    this.lastPingRoundTripMs = roundTripMs;
    this.lastPingServerTurnaroundMs = serverTurnaroundMs;
    this.lastPingEstimatedNetworkMs = estimatedNetworkMs;
    this.lastPingReceivedAt = now;
    this.averagePingMs = this.averagePingMs > 0
      ? Math.round((this.averagePingMs * 0.7) + (roundTripMs * 0.3))
      : roundTripMs;

    if (this.room) {
      this.room.send('player-ping', {
        pingMs: Math.max(0, Math.min(MAX_REPORTED_PING_MS, this.averagePingMs)),
      });
    }
  }

  sendPingProbe(force = false) {
    if (!this.room) {
      return;
    }

    const now = getTimelineNow();
    if (this.pendingPingId > 0 && now - this.pendingPingSentAt >= PING_TIMEOUT_MS) {
      this.pendingPingId = 0;
      this.pendingPingSentAt = 0;
    }

    if (!force && (this.pendingPingId > 0 || now - this.lastPingSentAt < PING_INTERVAL_MS)) {
      return;
    }

    const pingId = this.nextPingId;
    this.nextPingId += 1;
    this.pendingPingId = pingId;
    this.pendingPingSentAt = now;
    this.lastPingSentAt = now;
    this.room.send('ping', { id: pingId });
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

  sendGamemodeChange(state) {
    if (!this.room || !state) {
      return false;
    }

    this.room.send('set-gamemode', createGamemodeChangeMessage(state));
    return true;
  }

  sendBombPlant(state) {
    if (!this.room || !state) {
      return false;
    }

    this.room.send('bomb-plant', createBombPlantMessage(state));
    return true;
  }

  sendBombDrop() {
    if (!this.room) {
      return false;
    }

    this.room.send('bomb-drop', createBombDropMessage());
    return true;
  }

  sendBombDefuse(state) {
    if (!this.room || !state) {
      return false;
    }

    this.room.send('bomb-defuse', createBombDefuseMessage(state));
    return true;
  }

  sendSmokeBloom(state) {
    if (!this.room || !state) {
      return false;
    }

    this.room.send('smoke-bloom', createSmokeBloomMessage(state));
    return true;
  }

  sendSmokeThrow(state) {
    if (!this.room || !state) {
      return false;
    }

    this.room.send('smoke-throw', createSmokeThrowMessage(state));
    return true;
  }

  sendDebugRoundControl(state) {
    if (!this.room || !state) {
      return false;
    }

    this.room.send('debug-round-control', createDebugRoundControlMessage(state));
    return true;
  }

  sendChatMessage(state) {
    if (!this.room || !state) {
      return false;
    }

    this.room.send('chat-message', createChatMessage(state));
    return true;
  }

  sendBuyRequest(state) {
    if (!this.room || !state) {
      return false;
    }

    this.room.send('buy-request', createBuyRequestMessage(state));
    return true;
  }

  sendRemoteHitboxAudit(audit) {
    if (!this.room || !audit) {
      return false;
    }

    this.room.send('remote-hitbox-audit', audit);
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

  consumeAudioEvents() {
    const events = this.pendingAudioEvents;
    this.pendingAudioEvents = [];
    return events;
  }

  consumeChatEvents() {
    const events = this.pendingChatEvents;
    this.pendingChatEvents = [];
    return events;
  }

  getLocalPlayerState() {
    return this.localPlayerState;
  }

  suspendGameplaySync(options = {}) {
    if (!options.preserveRemotePlayers) {
      this.remotePlayerBuffers.clear();
    }
    this.localMapId = null;
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
    this.pendingAudioEvents = [];
    this.pendingChatEvents = [];
    this.lastReceivedPlayerStateCount = 0;
    this.lastSameMapRemoteStateCount = 0;
    this.lastFilteredRemoteStateCount = 0;
    this.lastReceivedRemoteMaps = [];
    this.scoreboardPlayers.clear();
    this.lastPingSentAt = 0;
    this.pendingPingId = 0;
    this.pendingPingSentAt = 0;
    this.averagePingMs = 0;
    this.lastPingRoundTripMs = 0;
    this.lastPingServerTurnaroundMs = 0;
    this.lastPingEstimatedNetworkMs = 0;
    this.lastPingReceivedAt = 0;
    this.roundState = null;
    this.objectiveState = null;
    this.gameplaySettings = null;
  }

  getScoreboardState() {
    const players = [...this.scoreboardPlayers.values()]
      .map((player) => (
        player.playerId === this.playerId && this.averagePingMs > 0
          ? {
            ...player,
            pingMs: this.averagePingMs,
          }
          : player
      ))
      .sort((left, right) => {
        const killDelta = Number(right.kills ?? 0) - Number(left.kills ?? 0);
        if (killDelta !== 0) {
          return killDelta;
        }

        const deathDelta = Number(left.deaths ?? 0) - Number(right.deaths ?? 0);
        if (deathDelta !== 0) {
          return deathDelta;
        }

        return String(left.displayName ?? left.playerId).localeCompare(String(right.displayName ?? right.playerId));
      });

    const teams = SCOREBOARD_TEAMS.map((teamKey) => ({
      key: teamKey,
      label: TEAM_LABELS[teamKey] ?? teamKey,
      roundsWon: Number(this.roundState?.teamScores?.[teamKey] ?? 0),
      players: players.filter((player) => String(player.team ?? 'attackers') === teamKey),
    }));

    return {
      playerCount: players.length,
      teams,
    };
  }

  getScoreboardPlayer(playerId) {
    if (!playerId) {
      return null;
    }

    const player = this.scoreboardPlayers.get(String(playerId));
    return player ? { ...player } : null;
  }

  getRemotePlayers() {
    const renderTime = getTimelineNow() - NETCODE_REMOTE_INTERPOLATION_DELAY_MS;
    const interpolatedPlayers = [];

    for (const [playerId, snapshots] of this.remotePlayerBuffers) {
      const snapshot = interpolateRemotePlayerSnapshotAtTime(snapshots, renderTime);
      if (!snapshot) {
        continue;
      }

      interpolatedPlayers.push({
        playerId,
        position: {
          x: Number(snapshot.position?.x ?? 0),
          y: Number(snapshot.position?.y ?? 0),
          z: Number(snapshot.position?.z ?? 0),
        },
        yaw: Number(snapshot.yaw ?? 0),
        pitch: Number(snapshot.pitch ?? 0),
        currentHeight: Number(snapshot.currentHeight ?? 0),
        isCrouched: Boolean(snapshot.isCrouched),
        displayName: snapshot.displayName,
        team: snapshot.team,
        activeWeaponKey: snapshot.activeWeaponKey,
        isScoped: snapshot.isScoped,
        presentationState: snapshot.presentationState,
        deathClip: snapshot.deathClip,
        isAlive: snapshot.isAlive,
      });
    }

    return interpolatedPlayers;
  }

  getRemotePlayerCount() {
    return this.remotePlayerBuffers.size;
  }

  getRoundState() {
    return this.roundState;
  }

  getObjectiveState() {
    return this.objectiveState;
  }

  getGameplaySettings() {
    return this.gameplaySettings;
  }

  getDebugState() {
    const now = getTimelineNow();
    return {
      connectionState: this.connectionState,
      localMapId: this.localMapId,
      receivedPlayerStateCount: this.lastReceivedPlayerStateCount,
      sameMapRemoteStateCount: this.lastSameMapRemoteStateCount,
      filteredRemoteStateCount: this.lastFilteredRemoteStateCount,
      receivedRemoteMaps: [...this.lastReceivedRemoteMaps],
      latestSequence: Math.max(0, this.nextInputSequence - 1),
      acknowledgedSequence: this.lastAuthoritativeSequence,
      pendingInputCount: this.pendingInputs.length,
      sequenceGap: Math.max(0, (this.nextInputSequence - 1) - this.lastAuthoritativeSequence),
      snapshotAgeMs: this.lastAuthoritativeStateAt > 0 ? Math.round(now - this.lastAuthoritativeStateAt) : -1,
      lastPredictedDriftDistance: this.lastCorrectionDistance,
      authoritativeUpdatesPerSecond: this.authoritativeEvents.length,
      pendingJumpSend: this.pendingJumpSend,
      serverUrl: this.serverUrl,
      pingRoundTripMs: this.lastPingRoundTripMs,
      pingAverageMs: this.averagePingMs,
      pingServerTurnaroundMs: this.lastPingServerTurnaroundMs,
      pingEstimatedNetworkMs: this.lastPingEstimatedNetworkMs,
      pingAgeMs: this.lastPingReceivedAt > 0 ? Math.round(now - this.lastPingReceivedAt) : -1,
      pingPending: this.pendingPingId > 0,
      audioDebug: this.audioDebugState
        ? {
          lastFootstep: formatAudioDebugEntry(this.audioDebugState.lastFootstep, now),
          lastWeapon: formatAudioDebugEntry(this.audioDebugState.lastWeapon, now),
        }
        : null,
    };
  }

  setAudioDebugState(audioDebugState) {
    this.audioDebugState = audioDebugState ?? null;
  }

  destroy() {
    this.destroyed = true;
    this.clearReconnectTimer();
    const activeRoom = this.room;
    const activeRoomSessionId = activeRoom?.sessionId ?? null;
    this.pendingInitializationState = null;
    this.resetRoomState();
    this.lastPingSentAt = 0;
    this.pendingPingId = 0;
    this.pendingPingSentAt = 0;
    this.averagePingMs = 0;
    this.lastPingRoundTripMs = 0;
    this.lastPingServerTurnaroundMs = 0;
    this.lastPingEstimatedNetworkMs = 0;
    this.lastPingReceivedAt = 0;
    this.roundState = null;
    this.objectiveState = null;
    this.audioDebugState = null;
    this.recordConnectionEvent('destroy', {
      activeRoomSessionId,
    });

    if (activeRoom) {
      void activeRoom.leave().catch((error) => {
        console.warn('[NetworkClient] Failed to leave room cleanly.', error);
      });
    }

    this.client = null;
    this.connectionState = 'closed';
    if (typeof window !== 'undefined') {
      window.__TACTICAL_FPS_NETWORK_CLIENTS__?.delete?.(this.instanceId);
    }
  }
}
