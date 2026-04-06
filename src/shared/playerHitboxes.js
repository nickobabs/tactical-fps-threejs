export const PLAYER_HITBOX_RADII = {
  head: 0.16,
  torso: 0.23,
  pelvis: 0.2,
  arm: 0.11,
  leg: 0.13,
};

export function createPlayerHitboxLayout() {
  return {
    head: { center: { x: 0, y: 0, z: 0 }, radius: PLAYER_HITBOX_RADII.head },
    torso: {
      start: { x: 0, y: 0, z: 0 },
      end: { x: 0, y: 0, z: 0 },
      radius: PLAYER_HITBOX_RADII.torso,
    },
    pelvis: {
      start: { x: 0, y: 0, z: 0 },
      end: { x: 0, y: 0, z: 0 },
      radius: PLAYER_HITBOX_RADII.pelvis,
    },
    arms: [
      {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 },
        radius: PLAYER_HITBOX_RADII.arm,
      },
      {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 },
        radius: PLAYER_HITBOX_RADII.arm,
      },
      {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 },
        radius: PLAYER_HITBOX_RADII.arm,
      },
      {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 },
        radius: PLAYER_HITBOX_RADII.arm,
      },
    ],
    legs: [
      {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 },
        radius: PLAYER_HITBOX_RADII.leg,
      },
      {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 },
        radius: PLAYER_HITBOX_RADII.leg,
      },
      {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 },
        radius: PLAYER_HITBOX_RADII.leg,
      },
      {
        start: { x: 0, y: 0, z: 0 },
        end: { x: 0, y: 0, z: 0 },
        radius: PLAYER_HITBOX_RADII.leg,
      },
    ],
  };
}

export function computePlayerHitboxLayout({
  position,
  yaw = 0,
  currentHeight = 1.72,
  isCrouched = false,
  activeWeaponKey = 'rifle',
}, target = createPlayerHitboxLayout()) {
  const x = Number(position?.x ?? 0);
  const y = Number(position?.y ?? 0);
  const z = Number(position?.z ?? 0);
  const height = Math.max(0.8, Number(currentHeight ?? 1.72));
  const crouched = Boolean(isCrouched);
  const cosYaw = Math.cos(Number(yaw ?? 0));
  const sinYaw = Math.sin(Number(yaw ?? 0));
  const rightX = cosYaw;
  const rightZ = -sinYaw;
  const forwardX = -sinYaw;
  const forwardZ = -Math.cos(Number(yaw ?? 0));

  const shoulderY = y + (crouched ? height * 0.68 : height * 0.78);
  const pelvisTopY = y + (crouched ? height * 0.5 : height * 0.56);
  const pelvisBottomY = y + (crouched ? 0.22 : 0.3);
  const torsoTopY = y + Math.max(pelvisTopY + 0.1, height - 0.34);
  const headCenterY = y + Math.max(torsoTopY + 0.12, height - 0.16);
  const shoulderOffset = crouched ? 0.18 : 0.24;
  const armReach = crouched ? 0.18 : 0.24;
  const armForwardOffset = activeWeaponKey === 'knife' ? 0.06 : 0.12;
  const legOffset = crouched ? 0.1 : 0.12;
  const legTopY = y + (crouched ? height * 0.4 : height * 0.46);
  const legBottomY = y + 0.1;

  target.head.center.x = x + forwardX * 0.03;
  target.head.center.y = headCenterY;
  target.head.center.z = z + forwardZ * 0.03;

  target.torso.start.x = x;
  target.torso.start.y = pelvisTopY;
  target.torso.start.z = z;
  target.torso.end.x = x;
  target.torso.end.y = torsoTopY;
  target.torso.end.z = z;

  target.pelvis.start.x = x;
  target.pelvis.start.y = pelvisBottomY;
  target.pelvis.start.z = z;
  target.pelvis.end.x = x;
  target.pelvis.end.y = pelvisTopY;
  target.pelvis.end.z = z;

  const armDrop = crouched ? 0.02 : 0.06;
  for (let index = 0; index < 2; index += 1) {
    const side = index === 0 ? -1 : 1;
    const upperArm = target.arms[index * 2];
    const lowerArm = target.arms[index * 2 + 1];
    upperArm.start.x = x + rightX * shoulderOffset * side + forwardX * armForwardOffset;
    upperArm.start.y = shoulderY;
    upperArm.start.z = z + rightZ * shoulderOffset * side + forwardZ * armForwardOffset;
    upperArm.end.x = upperArm.start.x + forwardX * armReach * 0.45 + rightX * 0.02 * side;
    upperArm.end.y = shoulderY - armDrop * 0.45;
    upperArm.end.z = upperArm.start.z + forwardZ * armReach * 0.45 + rightZ * 0.02 * side;
    lowerArm.start.x = upperArm.end.x;
    lowerArm.start.y = upperArm.end.y;
    lowerArm.start.z = upperArm.end.z;
    lowerArm.end.x = upperArm.start.x + forwardX * armReach + rightX * 0.04 * side;
    lowerArm.end.y = shoulderY - armDrop;
    lowerArm.end.z = upperArm.start.z + forwardZ * armReach + rightZ * 0.04 * side;
  }

  for (let index = 0; index < 2; index += 1) {
    const side = index === 0 ? -1 : 1;
    const upperLeg = target.legs[index * 2];
    const lowerLeg = target.legs[index * 2 + 1];
    upperLeg.start.x = x + rightX * legOffset * side;
    upperLeg.start.y = legTopY;
    upperLeg.start.z = z + rightZ * legOffset * side;
    upperLeg.end.x = upperLeg.start.x;
    upperLeg.end.y = y + (legTopY - y) * 0.55;
    upperLeg.end.z = upperLeg.start.z;
    lowerLeg.start.x = upperLeg.end.x;
    lowerLeg.start.y = upperLeg.end.y;
    lowerLeg.start.z = upperLeg.end.z;
    lowerLeg.end.x = x + rightX * legOffset * side;
    lowerLeg.end.y = legBottomY;
    lowerLeg.end.z = z + rightZ * legOffset * side;
  }

  return target;
}
