export const REMOTE_HITBOX_BONE_KEYS = [
  'head',
  'neck',
  'spine',
  'pelvis',
  'leftClavicle',
  'leftUpperArm',
  'leftForearm',
  'leftHand',
  'rightClavicle',
  'rightUpperArm',
  'rightForearm',
  'rightHand',
  'leftThigh',
  'leftCalf',
  'leftFoot',
  'rightThigh',
  'rightCalf',
  'rightFoot',
];

export const REMOTE_HITBOX_RADII = {
  head: 0.15,
  torso: 0.17,
  pelvis: 0.19,
  arm: 0.1,
  hand: 0.09,
  leg: 0.12,
};

export const REMOTE_HITBOX_HEAD_OFFSET = {
  x: 0,
  y: 0.035,
  z: -0.005,
};
export const REMOTE_HITBOX_HEAD_PIVOT_COMPENSATION = 1.1;

const HEAD_UP = { x: 0, y: 1, z: 0 };
const HEAD_RIGHT = { x: 1, y: 0, z: 0 };
const HEAD_FORWARD = { x: 0, y: 0, z: -1 };

function createPoint() {
  return { x: 0, y: 0, z: 0 };
}

function ensurePoint(point) {
  return point ?? createPoint();
}

function ensureSegment(segment, radius) {
  return {
    start: ensurePoint(segment?.start),
    end: ensurePoint(segment?.end),
    radius: Number.isFinite(Number(segment?.radius)) ? Number(segment.radius) : radius,
  };
}

function ensureSphere(sphere, radius) {
  return {
    center: ensurePoint(sphere?.center),
    radius: Number.isFinite(Number(sphere?.radius)) ? Number(sphere.radius) : radius,
  };
}

function ensureVector3(vector, fallback) {
  return {
    x: Number.isFinite(Number(vector?.x)) ? Number(vector.x) : Number(fallback?.x ?? 0),
    y: Number.isFinite(Number(vector?.y)) ? Number(vector.y) : Number(fallback?.y ?? 0),
    z: Number.isFinite(Number(vector?.z)) ? Number(vector.z) : Number(fallback?.z ?? 0),
  };
}

function ensureHead(head, radius) {
  return {
    center: ensurePoint(head?.center),
    radius: Number.isFinite(Number(head?.radius)) ? Number(head.radius) : radius,
    size: ensureVector3(head?.size, {
      x: radius * 2,
      y: radius * 2,
      z: radius * 2,
    }),
    right: ensureVector3(head?.right, HEAD_RIGHT),
    up: ensureVector3(head?.up, HEAD_UP),
    forward: ensureVector3(head?.forward, HEAD_FORWARD),
  };
}

function ensureRemoteHitboxSnapshotShape(target) {
  return {
    head: ensureHead(target?.head, REMOTE_HITBOX_RADII.head),
    torso: ensureSegment(target?.torso, REMOTE_HITBOX_RADII.torso),
    pelvis: ensureSegment(target?.pelvis, REMOTE_HITBOX_RADII.pelvis),
    arms: Array.from({ length: 6 }, (_, index) => ensureSegment(target?.arms?.[index], REMOTE_HITBOX_RADII.arm)),
    hands: Array.from({ length: 2 }, (_, index) => ensureSphere(target?.hands?.[index], REMOTE_HITBOX_RADII.hand)),
    legs: Array.from({ length: 4 }, (_, index) => ensureSegment(target?.legs?.[index], REMOTE_HITBOX_RADII.leg)),
  };
}

function setPoint(target, x, y, z) {
  target.x = x;
  target.y = y;
  target.z = z;
}

function copyPoint(target, source) {
  target.x = Number(source?.x ?? 0);
  target.y = Number(source?.y ?? 0);
  target.z = Number(source?.z ?? 0);
}

function translatePoint(target, source, offset) {
  target.x = Number(source?.x ?? 0) + Number(offset?.x ?? 0);
  target.y = Number(source?.y ?? 0) + Number(offset?.y ?? 0);
  target.z = Number(source?.z ?? 0) + Number(offset?.z ?? 0);
}

function normalizeVector(target, fallback) {
  const length = Math.hypot(target.x, target.y, target.z);
  if (length <= 1e-6) {
    target.x = fallback.x;
    target.y = fallback.y;
    target.z = fallback.z;
    return target;
  }

  target.x /= length;
  target.y /= length;
  target.z /= length;
  return target;
}

function crossVectors(target, a, b) {
  const x = a.y * b.z - a.z * b.y;
  const y = a.z * b.x - a.x * b.z;
  const z = a.x * b.y - a.y * b.x;
  target.x = x;
  target.y = y;
  target.z = z;
  return target;
}

function buildHeadCenter(target, points, headOffset, basis = null) {
  const head = points?.head ?? null;
  const neck = points?.neck ?? null;
  if (!head || !neck) {
    translatePoint(target, head, headOffset);
    if (basis) {
      copyPoint(basis.right, HEAD_RIGHT);
      copyPoint(basis.up, HEAD_UP);
      copyPoint(basis.forward, HEAD_FORWARD);
    }
    return;
  }

  const up = {
    x: Number(head.x ?? 0) - Number(neck.x ?? 0),
    y: Number(head.y ?? 0) - Number(neck.y ?? 0),
    z: Number(head.z ?? 0) - Number(neck.z ?? 0),
  };
  const headNeckLength = Math.hypot(up.x, up.y, up.z);
  normalizeVector(up, HEAD_UP);

  const shoulderSpan = {
    x: Number(points?.rightClavicle?.x ?? 0) - Number(points?.leftClavicle?.x ?? 0),
    y: Number(points?.rightClavicle?.y ?? 0) - Number(points?.leftClavicle?.y ?? 0),
    z: Number(points?.rightClavicle?.z ?? 0) - Number(points?.leftClavicle?.z ?? 0),
  };
  const right = normalizeVector(shoulderSpan, HEAD_RIGHT);
  const forward = normalizeVector(crossVectors({ x: 0, y: 0, z: 0 }, right, up), HEAD_FORWARD);
  if (basis) {
    copyPoint(basis.right, right);
    copyPoint(basis.up, up);
    copyPoint(basis.forward, forward);
  }

  const offsetX = Number(headOffset?.x ?? 0);
  const offsetY = Number(headOffset?.y ?? 0);
  const offsetZ = Number(headOffset?.z ?? 0);
  const anchorExtension = headNeckLength * REMOTE_HITBOX_HEAD_PIVOT_COMPENSATION;
  setPoint(
    target,
    Number(head.x ?? 0) + right.x * offsetX + up.x * (offsetY + anchorExtension) + forward.x * offsetZ,
    Number(head.y ?? 0) + right.y * offsetX + up.y * (offsetY + anchorExtension) + forward.y * offsetZ,
    Number(head.z ?? 0) + right.z * offsetX + up.z * (offsetY + anchorExtension) + forward.z * offsetZ,
  );
}

function writeSegment(target, start, end, radius, lengthPadding = 0, anchor = 'center') {
  const startX = Number(start?.x ?? 0);
  const startY = Number(start?.y ?? 0);
  const startZ = Number(start?.z ?? 0);
  const endX = Number(end?.x ?? 0);
  const endY = Number(end?.y ?? 0);
  const endZ = Number(end?.z ?? 0);
  const padding = Number(lengthPadding ?? 0);
  const dirX = endX - startX;
  const dirY = endY - startY;
  const dirZ = endZ - startZ;
  const length = Math.hypot(dirX, dirY, dirZ);
  if (Math.abs(padding) > 1e-6 && length > 1e-6) {
    const clampedPadding = Math.max(-length + 0.001, padding);
    if (anchor === 'start') {
      const expand = clampedPadding / length;
      copyPoint(target.start, start);
      setPoint(target.end, endX + (dirX * expand), endY + (dirY * expand), endZ + (dirZ * expand));
    } else if (anchor === 'end') {
      const expand = clampedPadding / length;
      setPoint(target.start, startX - (dirX * expand), startY - (dirY * expand), startZ - (dirZ * expand));
      copyPoint(target.end, end);
    } else {
      const expand = clampedPadding * 0.5 / length;
      setPoint(target.start, startX - (dirX * expand), startY - (dirY * expand), startZ - (dirZ * expand));
      setPoint(target.end, endX + (dirX * expand), endY + (dirY * expand), endZ + (dirZ * expand));
    }
  } else {
    copyPoint(target.start, start);
    copyPoint(target.end, end);
  }
  target.radius = radius;
}

function writeSphere(target, center, radius) {
  copyPoint(target.center, center);
  target.radius = radius;
}

export function createRemoteHitboxPointCache() {
  return Object.fromEntries(REMOTE_HITBOX_BONE_KEYS.map((key) => [key, createPoint()]));
}

export function createRemoteHitboxSnapshot() {
  return {
    head: {
      center: createPoint(),
      radius: REMOTE_HITBOX_RADII.head,
      size: {
        x: REMOTE_HITBOX_RADII.head * 2,
        y: REMOTE_HITBOX_RADII.head * 2,
        z: REMOTE_HITBOX_RADII.head * 2,
      },
      right: { ...HEAD_RIGHT },
      up: { ...HEAD_UP },
      forward: { ...HEAD_FORWARD },
    },
    torso: { start: createPoint(), end: createPoint(), radius: REMOTE_HITBOX_RADII.torso },
    pelvis: { start: createPoint(), end: createPoint(), radius: REMOTE_HITBOX_RADII.pelvis },
    arms: Array.from({ length: 6 }, () => ({
      start: createPoint(),
      end: createPoint(),
      radius: REMOTE_HITBOX_RADII.arm,
    })),
    hands: Array.from({ length: 2 }, () => ({
      center: createPoint(),
      radius: REMOTE_HITBOX_RADII.hand,
    })),
    legs: Array.from({ length: 4 }, () => ({
      start: createPoint(),
      end: createPoint(),
      radius: REMOTE_HITBOX_RADII.leg,
    })),
  };
}

export function buildRemoteHitboxSnapshotFromPoints({
  points = null,
  preAimPoints,
  postAimPoints = preAimPoints,
  headOffset = REMOTE_HITBOX_HEAD_OFFSET,
  headRadius = REMOTE_HITBOX_RADII.head,
  headSize = null,
  torsoRadius = REMOTE_HITBOX_RADII.torso,
  torsoLengthPadding = 0,
  pelvisRadius = REMOTE_HITBOX_RADII.pelvis,
  pelvisLengthPadding = 0,
  armRadius = REMOTE_HITBOX_RADII.arm,
  armLengthPadding = 0,
  handRadius = REMOTE_HITBOX_RADII.hand,
  legRadius = REMOTE_HITBOX_RADII.leg,
  legLengthPadding = 0,
}, target = createRemoteHitboxSnapshot()) {
  const finalPoints = points ?? postAimPoints ?? preAimPoints ?? null;
  const stablePoints = preAimPoints ?? points ?? postAimPoints ?? null;
  if (!finalPoints || !stablePoints) {
    return null;
  }

  const snapshot = ensureRemoteHitboxSnapshotShape(target);
  const resolvedTorsoRadius = Number.isFinite(Number(torsoRadius)) ? Number(torsoRadius) : REMOTE_HITBOX_RADII.torso;
  const resolvedPelvisRadius = Number.isFinite(Number(pelvisRadius)) ? Number(pelvisRadius) : REMOTE_HITBOX_RADII.pelvis;
  const resolvedArmRadius = Number.isFinite(Number(armRadius)) ? Number(armRadius) : REMOTE_HITBOX_RADII.arm;
  const resolvedHandRadius = Number.isFinite(Number(handRadius)) ? Number(handRadius) : REMOTE_HITBOX_RADII.hand;
  const resolvedLegRadius = Number.isFinite(Number(legRadius)) ? Number(legRadius) : REMOTE_HITBOX_RADII.leg;
  const resolvedHeadSize = {
    x: Number.isFinite(Number(headSize?.x)) ? Number(headSize.x) : (Number.isFinite(Number(headRadius)) ? Number(headRadius) * 2 : REMOTE_HITBOX_RADII.head * 2),
    y: Number.isFinite(Number(headSize?.y)) ? Number(headSize.y) : (Number.isFinite(Number(headRadius)) ? Number(headRadius) * 2 : REMOTE_HITBOX_RADII.head * 2),
    z: Number.isFinite(Number(headSize?.z)) ? Number(headSize.z) : (Number.isFinite(Number(headRadius)) ? Number(headRadius) * 2 : REMOTE_HITBOX_RADII.head * 2),
  };

  buildHeadCenter(snapshot.head.center, finalPoints, headOffset, snapshot.head);
  snapshot.head.radius = Number.isFinite(Number(headRadius))
    ? Number(headRadius)
    : Math.max(resolvedHeadSize.x, resolvedHeadSize.y, resolvedHeadSize.z) * 0.5;
  snapshot.head.size.x = resolvedHeadSize.x;
  snapshot.head.size.y = resolvedHeadSize.y;
  snapshot.head.size.z = resolvedHeadSize.z;

  writeSegment(snapshot.torso, finalPoints.spine, finalPoints.neck, resolvedTorsoRadius, torsoLengthPadding, 'start');
  writeSegment(snapshot.pelvis, stablePoints.pelvis, stablePoints.spine, resolvedPelvisRadius, pelvisLengthPadding);

  writeSegment(snapshot.arms[0], finalPoints.leftClavicle, finalPoints.leftUpperArm, resolvedArmRadius, armLengthPadding);
  writeSegment(snapshot.arms[1], finalPoints.leftUpperArm, finalPoints.leftForearm, resolvedArmRadius, armLengthPadding);
  writeSegment(snapshot.arms[2], finalPoints.leftForearm, finalPoints.leftHand, resolvedArmRadius, armLengthPadding);
  writeSegment(snapshot.arms[3], finalPoints.rightClavicle, finalPoints.rightUpperArm, resolvedArmRadius, armLengthPadding);
  writeSegment(snapshot.arms[4], finalPoints.rightUpperArm, finalPoints.rightForearm, resolvedArmRadius, armLengthPadding);
  writeSegment(snapshot.arms[5], finalPoints.rightForearm, finalPoints.rightHand, resolvedArmRadius, armLengthPadding);

  writeSphere(snapshot.hands[0], finalPoints.leftHand, resolvedHandRadius);
  writeSphere(snapshot.hands[1], finalPoints.rightHand, resolvedHandRadius);

  writeSegment(snapshot.legs[0], finalPoints.leftThigh, finalPoints.leftCalf, resolvedLegRadius, legLengthPadding);
  writeSegment(snapshot.legs[1], finalPoints.leftCalf, finalPoints.leftFoot, resolvedLegRadius, legLengthPadding);
  writeSegment(snapshot.legs[2], finalPoints.rightThigh, finalPoints.rightCalf, resolvedLegRadius, legLengthPadding);
  writeSegment(snapshot.legs[3], finalPoints.rightCalf, finalPoints.rightFoot, resolvedLegRadius, legLengthPadding);

  return snapshot;
}
