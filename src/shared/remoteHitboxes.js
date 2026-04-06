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

function buildHeadCenter(target, points, headOffset) {
  const head = points?.head ?? null;
  const neck = points?.neck ?? null;
  if (!head || !neck) {
    translatePoint(target, head, headOffset);
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

function writeSegment(target, start, end, radius) {
  copyPoint(target.start, start);
  copyPoint(target.end, end);
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
    head: { center: createPoint(), radius: REMOTE_HITBOX_RADII.head },
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
}, target = createRemoteHitboxSnapshot()) {
  const finalPoints = points ?? postAimPoints ?? preAimPoints ?? null;
  const stablePoints = preAimPoints ?? points ?? postAimPoints ?? null;
  if (!finalPoints || !stablePoints) {
    return null;
  }

  buildHeadCenter(target.head.center, finalPoints, headOffset);
  target.head.radius = Number.isFinite(Number(headRadius)) ? Number(headRadius) : REMOTE_HITBOX_RADII.head;

  writeSegment(target.torso, finalPoints.spine, finalPoints.neck, REMOTE_HITBOX_RADII.torso);
  writeSegment(target.pelvis, stablePoints.pelvis, stablePoints.spine, REMOTE_HITBOX_RADII.pelvis);

  writeSegment(target.arms[0], finalPoints.leftClavicle, finalPoints.leftUpperArm, REMOTE_HITBOX_RADII.arm);
  writeSegment(target.arms[1], finalPoints.leftUpperArm, finalPoints.leftForearm, REMOTE_HITBOX_RADII.arm);
  writeSegment(target.arms[2], finalPoints.leftForearm, finalPoints.leftHand, REMOTE_HITBOX_RADII.arm);
  writeSegment(target.arms[3], finalPoints.rightClavicle, finalPoints.rightUpperArm, REMOTE_HITBOX_RADII.arm);
  writeSegment(target.arms[4], finalPoints.rightUpperArm, finalPoints.rightForearm, REMOTE_HITBOX_RADII.arm);
  writeSegment(target.arms[5], finalPoints.rightForearm, finalPoints.rightHand, REMOTE_HITBOX_RADII.arm);

  writeSphere(target.hands[0], finalPoints.leftHand, REMOTE_HITBOX_RADII.hand);
  writeSphere(target.hands[1], finalPoints.rightHand, REMOTE_HITBOX_RADII.hand);

  writeSegment(target.legs[0], finalPoints.leftThigh, finalPoints.leftCalf, REMOTE_HITBOX_RADII.leg);
  writeSegment(target.legs[1], finalPoints.leftCalf, finalPoints.leftFoot, REMOTE_HITBOX_RADII.leg);
  writeSegment(target.legs[2], finalPoints.rightThigh, finalPoints.rightCalf, REMOTE_HITBOX_RADII.leg);
  writeSegment(target.legs[3], finalPoints.rightCalf, finalPoints.rightFoot, REMOTE_HITBOX_RADII.leg);

  return target;
}
