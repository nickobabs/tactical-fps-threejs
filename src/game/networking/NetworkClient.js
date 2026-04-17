import { Client } from 'colyseus.js';
import {
  NETCODE_MAX_REMOTE_SNAPSHOTS,
  NETCODE_REMOTE_INTERPOLATION_DELAY_MS,
  NETCODE_SIMULATION_STEP,
} from '../../shared/netcode.js';
import {
  createBombDropMessage,
  createBombDefuseMessage,
  createBombPlantMessage,
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

function getNow() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }

  return Date.now();
}

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
        this.scoreboardPlayers.delete(message?.playerId);
        console.info('[NetworkClient] Player left:', message);
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

      room.onMessage('pong', (message) => {
        this.handlePong(message);
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
      this.lastPingSentAt = 0;
      this.pendingPingId = 0;
      this.pendingPingSentAt = 0;
      this.lastPingRoundTripMs = 0;
      this.lastPingServerTurnaroundMs = 0;
      this.lastPingEstimatedNetworkMs = 0;
      this.lastPingReceivedAt = 0;
      this.sendPingProbe(true);
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

  applyWorldState(message) {
    this.roundState = message?.round ?? null;
    this.objectiveState = message?.objective ?? null;
    this.gameplaySettings = message?.gameplay ?? null;
    this.applyPlayerState(message?.players ?? {});
  }

  applyPlayerState(players) {
    const nextRemotePlayerIds = new Set();
    const receivedAt = getNow();
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

    const now = getNow();
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

    const now = getNow();
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
          pitch: snapshot.pitch,
          currentHeight: snapshot.currentHeight,
          isCrouched: snapshot.isCrouched,
          displayName: snapshot.displayName,
          team: snapshot.team,
          activeWeaponKey: snapshot.activeWeaponKey,
          isScoped: snapshot.isScoped,
          presentationState: snapshot.presentationState,
          deathClip: snapshot.deathClip,
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
          pitch: nextSnapshot.pitch,
          currentHeight: nextSnapshot.currentHeight,
          isCrouched: nextSnapshot.isCrouched,
          displayName: nextSnapshot.displayName,
          team: nextSnapshot.team,
          activeWeaponKey: nextSnapshot.activeWeaponKey,
          isScoped: nextSnapshot.isScoped,
          presentationState: nextSnapshot.presentationState,
          deathClip: nextSnapshot.deathClip,
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
        pitch: lerp(previousSnapshot.pitch, nextSnapshot.pitch, alpha),
        currentHeight: lerp(previousSnapshot.currentHeight, nextSnapshot.currentHeight, alpha),
        isCrouched: nextSnapshot.isCrouched,
        displayName: nextSnapshot.displayName,
        team: nextSnapshot.team,
        activeWeaponKey: nextSnapshot.activeWeaponKey,
        isScoped: nextSnapshot.isScoped,
        presentationState: nextSnapshot.presentationState,
        deathClip: nextSnapshot.deathClip,
        isAlive: nextSnapshot.isAlive,
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
    const now = getNow();
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
    this.remotePlayerBuffers.clear();
    this.pendingLocalCorrection = null;
    this.pendingInitializationState = null;
    this.pendingInputs.length = 0;
    this.latestSampledInput = null;
    this.pendingJumpSend = false;
    this.authoritativeEvents.length = 0;
    this.localPlayerState = null;
    this.pendingCombatEvents = [];
    this.pendingAudioEvents = [];
    this.lastReceivedPlayerStateCount = 0;
    this.lastSameMapRemoteStateCount = 0;
    this.lastFilteredRemoteStateCount = 0;
    this.lastReceivedRemoteMaps = [];
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
