import * as THREE from 'three';
import { getLagCompensationRewindMs } from '../../../src/shared/remoteTimeline.js';
import { getLagCompensatedHitboxes } from './lagCompensation.js';
import {
  getAuthoritativeHitboxSnapshotResult,
  getPlayerHitResult,
} from './shotValidation.js';

const SHOT_ORIGIN = new THREE.Vector3();
const SHOT_DIRECTION = new THREE.Vector3();
const SHOT_TRACE_END = new THREE.Vector3();
const PLAYER_EYE = new THREE.Vector3();
const SHOT_RAY = new THREE.Ray();

export function resolvePlayerFire({
  player,
  fireRequest,
  weapon,
  now,
  players,
  collisionWorld,
}) {
  if (!player || !fireRequest || !weapon) {
    return null;
  }

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
    return null;
  }

  if (SHOT_ORIGIN.distanceTo(PLAYER_EYE) > 1.25) {
    SHOT_ORIGIN.copy(PLAYER_EYE);
  }

  if (SHOT_DIRECTION.lengthSq() <= 1e-6) {
    return null;
  }

  SHOT_DIRECTION.normalize();
  SHOT_RAY.origin.copy(SHOT_ORIGIN);
  SHOT_RAY.direction.copy(SHOT_DIRECTION);

  const rewindMs = getLagCompensationRewindMs(player?.pingMs);
  const rewindTimestamp = now - rewindMs;
  const maxDistance = weapon.meleeRange ?? 512;
  const worldHit = collisionWorld?.raycast(SHOT_ORIGIN, SHOT_DIRECTION, maxDistance) ?? null;
  const worldHitDistance = worldHit ? worldHit.point.distanceTo(SHOT_ORIGIN) : Infinity;

  let bestTarget = null;
  let bestDistance = Math.min(maxDistance, worldHitDistance);
  let bestHitZone = null;

  for (const target of players) {
    if (
      target.playerId === player.playerId
      || !target.isAlive
      || target.mapId !== player.mapId
      || target.team === player.team
    ) {
      continue;
    }

    const lagCompensatedHitboxes = getLagCompensatedHitboxes(target, rewindTimestamp);
    const authoritativeHitResult = getAuthoritativeHitboxSnapshotResult(
      SHOT_RAY,
      lagCompensatedHitboxes,
      maxDistance,
      bestDistance,
    );
    const hitResult = Number.isFinite(authoritativeHitResult.distance)
      ? authoritativeHitResult
      : getPlayerHitResult(SHOT_RAY, target, maxDistance, bestDistance);
    const hitDistance = Number(hitResult?.distance ?? Infinity);
    if (!Number.isFinite(hitDistance) || hitDistance >= bestDistance) {
      continue;
    }

    bestDistance = hitDistance;
    bestTarget = target;
    bestHitZone = hitResult?.hitZone ?? 'body';
  }

  const traceEnd = bestTarget
    ? SHOT_TRACE_END.copy(SHOT_ORIGIN).addScaledVector(SHOT_DIRECTION, bestDistance)
    : (worldHit?.point
      ? worldHit.point
      : SHOT_TRACE_END.copy(SHOT_ORIGIN).addScaledVector(SHOT_DIRECTION, maxDistance));

  return {
    origin: {
      x: SHOT_ORIGIN.x,
      y: SHOT_ORIGIN.y,
      z: SHOT_ORIGIN.z,
    },
    direction: {
      x: SHOT_DIRECTION.x,
      y: SHOT_DIRECTION.y,
      z: SHOT_DIRECTION.z,
    },
    traceEnd: {
      x: Number(traceEnd.x ?? 0),
      y: Number(traceEnd.y ?? 0),
      z: Number(traceEnd.z ?? 0),
    },
    maxDistance,
    rewindMs,
    rewindTimestamp,
    impact: bestTarget ? true : Boolean(worldHit),
    hit: Boolean(bestTarget),
    bestTarget,
    bestDistance,
    bestHitZone,
  };
}
