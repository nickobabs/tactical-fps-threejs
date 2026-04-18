import { getTimelineNow } from '../../shared/remoteTimeline.js';

export const PING_INTERVAL_MS = 2000;
export const PING_TIMEOUT_MS = 10000;
export const MAX_REPORTED_PING_MS = 999;

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

export function resetPingState(client) {
  client.lastPingSentAt = 0;
  client.pendingPingId = 0;
  client.pendingPingSentAt = 0;
  client.averagePingMs = 0;
  client.lastPingRoundTripMs = 0;
  client.lastPingServerTurnaroundMs = 0;
  client.lastPingEstimatedNetworkMs = 0;
  client.lastPingReceivedAt = 0;
}

export function buildConnectionDiagnostics(client) {
  const now = getTimelineNow();
  return {
    serverUrl: client.serverUrl,
    roomName: client.roomName,
    instanceId: client.instanceId,
    playerId: client.playerId,
    connectionState: client.connectionState,
    lastError: client.lastError,
    pingAgeMs: client.lastPingReceivedAt > 0 ? Math.round(now - client.lastPingReceivedAt) : -1,
    pingPending: client.pendingPingId > 0,
    visibilityState: typeof document !== 'undefined' ? document.visibilityState : 'unknown',
    online: typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : 'unknown',
    activeRoomToken: client.activeRoomToken,
    connectAttemptCount: client.connectAttemptCount,
    reconnectAttemptCount: client.reconnectAttemptCount,
    recentConnectionEvents: client.connectionEvents.slice(-10),
  };
}

export function handlePongMessage(client, message) {
  const pongId = Number(message?.id ?? 0);
  if (pongId <= 0 || pongId !== client.pendingPingId || client.pendingPingSentAt <= 0) {
    return;
  }

  const now = getTimelineNow();
  const roundTripMs = Math.max(0, Math.round(now - client.pendingPingSentAt));
  const serverReceivedAt = Number(message?.serverReceivedAt ?? 0);
  const serverSentAt = Number(message?.serverSentAt ?? serverReceivedAt);
  const serverTurnaroundMs = serverSentAt >= serverReceivedAt
    ? Math.max(0, Math.round(serverSentAt - serverReceivedAt))
    : 0;
  const estimatedNetworkMs = Math.max(0, Math.round(roundTripMs - serverTurnaroundMs));
  client.pendingPingId = 0;
  client.pendingPingSentAt = 0;
  client.lastPingRoundTripMs = roundTripMs;
  client.lastPingServerTurnaroundMs = serverTurnaroundMs;
  client.lastPingEstimatedNetworkMs = estimatedNetworkMs;
  client.lastPingReceivedAt = now;
  client.averagePingMs = client.averagePingMs > 0
    ? Math.round((client.averagePingMs * 0.7) + (roundTripMs * 0.3))
    : roundTripMs;

  if (client.room) {
    client.room.send('player-ping', {
      pingMs: Math.max(0, Math.min(MAX_REPORTED_PING_MS, client.averagePingMs)),
    });
  }
}

export function sendPingProbe(client, force = false) {
  if (!client.room) {
    return;
  }

  const now = getTimelineNow();
  if (client.pendingPingId > 0 && now - client.pendingPingSentAt >= PING_TIMEOUT_MS) {
    client.pendingPingId = 0;
    client.pendingPingSentAt = 0;
  }

  if (!force && (client.pendingPingId > 0 || now - client.lastPingSentAt < PING_INTERVAL_MS)) {
    return;
  }

  const pingId = client.nextPingId;
  client.nextPingId += 1;
  client.pendingPingId = pingId;
  client.pendingPingSentAt = now;
  client.lastPingSentAt = now;
  client.room.send('ping', { id: pingId });
}

export function buildNetworkDebugState(client) {
  const now = getTimelineNow();
  return {
    connectionState: client.connectionState,
    localMapId: client.localMapId,
    receivedPlayerStateCount: client.lastReceivedPlayerStateCount,
    sameMapRemoteStateCount: client.lastSameMapRemoteStateCount,
    filteredRemoteStateCount: client.lastFilteredRemoteStateCount,
    receivedRemoteMaps: [...client.lastReceivedRemoteMaps],
    latestSequence: Math.max(0, client.nextInputSequence - 1),
    acknowledgedSequence: client.lastAuthoritativeSequence,
    pendingInputCount: client.pendingInputs.length,
    sequenceGap: Math.max(0, (client.nextInputSequence - 1) - client.lastAuthoritativeSequence),
    snapshotAgeMs: client.lastAuthoritativeStateAt > 0 ? Math.round(now - client.lastAuthoritativeStateAt) : -1,
    lastPredictedDriftDistance: client.lastCorrectionDistance,
    authoritativeUpdatesPerSecond: client.authoritativeEvents.length,
    pendingJumpSend: client.pendingJumpSend,
    serverUrl: client.serverUrl,
    pingRoundTripMs: client.lastPingRoundTripMs,
    pingAverageMs: client.averagePingMs,
    pingServerTurnaroundMs: client.lastPingServerTurnaroundMs,
    pingEstimatedNetworkMs: client.lastPingEstimatedNetworkMs,
    pingAgeMs: client.lastPingReceivedAt > 0 ? Math.round(now - client.lastPingReceivedAt) : -1,
    pingPending: client.pendingPingId > 0,
    audioDebug: client.audioDebugState
      ? {
        lastFootstep: formatAudioDebugEntry(client.audioDebugState.lastFootstep, now),
        lastWeapon: formatAudioDebugEntry(client.audioDebugState.lastWeapon, now),
      }
      : null,
  };
}
