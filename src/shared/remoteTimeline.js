import {
  createRemoteHitboxSnapshot,
  interpolateRemoteHitboxSnapshots,
} from './remoteHitboxes.js';
import {
  NETCODE_LAG_COMPENSATION_MAX_REWIND_MS,
  NETCODE_REMOTE_INTERPOLATION_DELAY_MS,
} from './netcode.js';

const DEFAULT_MIN_ONE_WAY_NETWORK_MS = 0;

export function getTimelineNow() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }

  return Date.now();
}

export function lerpNumber(start, end, alpha) {
  return Number(start ?? 0) + ((Number(end ?? 0) - Number(start ?? 0)) * alpha);
}

export function interpolateAngle(start, end, alpha) {
  let delta = end - start;

  while (delta > Math.PI) {
    delta -= Math.PI * 2;
  }

  while (delta < -Math.PI) {
    delta += Math.PI * 2;
  }

  return start + (delta * alpha);
}

export function getLagCompensationRewindMs(
  roundTripMs,
  {
    minOneWayNetworkMs = DEFAULT_MIN_ONE_WAY_NETWORK_MS,
    interpolationDelayMs = NETCODE_REMOTE_INTERPOLATION_DELAY_MS,
    maxRewindMs = NETCODE_LAG_COMPENSATION_MAX_REWIND_MS,
  } = {},
) {
  const reportedRoundTripMs = Math.max(0, Number(roundTripMs ?? 0));
  const estimatedOneWayMs = Math.max(Number(minOneWayNetworkMs ?? 0), reportedRoundTripMs * 0.5);
  return Math.max(
    0,
    Math.min(
      Number(maxRewindMs ?? NETCODE_LAG_COMPENSATION_MAX_REWIND_MS),
      Number(interpolationDelayMs ?? NETCODE_REMOTE_INTERPOLATION_DELAY_MS) + estimatedOneWayMs,
    ),
  );
}

export function getSnapshotPairAtTime(snapshots, targetTime, { timeKey = 'receivedAt' } = {}) {
  if (!Array.isArray(snapshots) || snapshots.length === 0) {
    return null;
  }

  if (snapshots.length === 1) {
    return {
      kind: 'single',
      snapshot: snapshots[0] ?? null,
      alpha: 0,
    };
  }

  const firstTime = Number(snapshots[0]?.[timeKey] ?? 0);
  if (targetTime <= firstTime) {
    return {
      kind: 'before',
      snapshot: snapshots[0] ?? null,
      alpha: 0,
    };
  }

  const latestIndex = snapshots.length - 1;
  const latestTime = Number(snapshots[latestIndex]?.[timeKey] ?? 0);
  if (targetTime >= latestTime) {
    return {
      kind: 'after',
      snapshot: snapshots[latestIndex] ?? null,
      alpha: 1,
    };
  }

  for (let index = 1; index < snapshots.length; index += 1) {
    const previousSnapshot = snapshots[index - 1];
    const nextSnapshot = snapshots[index];
    const previousTime = Number(previousSnapshot?.[timeKey] ?? 0);
    const nextTime = Number(nextSnapshot?.[timeKey] ?? 0);
    if (targetTime <= nextTime) {
      const range = Math.max(nextTime - previousTime, 1e-6);
      return {
        kind: 'between',
        previousSnapshot,
        nextSnapshot,
        alpha: Math.max(0, Math.min(1, (targetTime - previousTime) / range)),
      };
    }
  }

  return {
    kind: 'after',
    snapshot: snapshots[latestIndex] ?? null,
    alpha: 1,
  };
}

export function interpolateRemotePlayerSnapshotAtTime(snapshots, targetTime) {
  const pair = getSnapshotPairAtTime(snapshots, targetTime, { timeKey: 'receivedAt' });
  if (!pair) {
    return null;
  }

  if (pair.kind !== 'between') {
    return pair.snapshot ?? null;
  }

  const { previousSnapshot, nextSnapshot, alpha } = pair;
  return {
    ...nextSnapshot,
    position: {
      x: lerpNumber(previousSnapshot?.position?.x, nextSnapshot?.position?.x, alpha),
      y: lerpNumber(previousSnapshot?.position?.y, nextSnapshot?.position?.y, alpha),
      z: lerpNumber(previousSnapshot?.position?.z, nextSnapshot?.position?.z, alpha),
    },
    velocity: {
      x: lerpNumber(previousSnapshot?.velocity?.x, nextSnapshot?.velocity?.x, alpha),
      y: lerpNumber(previousSnapshot?.velocity?.y, nextSnapshot?.velocity?.y, alpha),
      z: lerpNumber(previousSnapshot?.velocity?.z, nextSnapshot?.velocity?.z, alpha),
    },
    yaw: interpolateAngle(Number(previousSnapshot?.yaw ?? 0), Number(nextSnapshot?.yaw ?? 0), alpha),
    pitch: lerpNumber(previousSnapshot?.pitch, nextSnapshot?.pitch, alpha),
    currentHeight: lerpNumber(previousSnapshot?.currentHeight, nextSnapshot?.currentHeight, alpha),
    hitboxes: interpolateRemoteHitboxSnapshots(
      previousSnapshot?.hitboxes,
      nextSnapshot?.hitboxes,
      alpha,
      createRemoteHitboxSnapshot(),
    ),
    receivedAt: targetTime,
  };
}

export function interpolateRemoteHitboxHistoryAtTime(history, targetTime) {
  const pair = getSnapshotPairAtTime(history, targetTime, { timeKey: 'recordedAt' });
  if (!pair) {
    return null;
  }

  if (pair.kind !== 'between') {
    return pair.snapshot?.hitboxes ?? null;
  }

  return interpolateRemoteHitboxSnapshots(
    pair.previousSnapshot?.hitboxes,
    pair.nextSnapshot?.hitboxes,
    pair.alpha,
    createRemoteHitboxSnapshot(),
  );
}
