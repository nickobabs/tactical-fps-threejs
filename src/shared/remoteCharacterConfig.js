import { PLAYER_MOVEMENT_DEFAULTS } from './playerMovement.js';
import { getSharedWeaponData } from './weaponData.js';

export const REMOTE_CLIPS = {
  idle: 'idle',
  walkForward: 'walk',
  walkBackward: 'walk back',
  runForward: 'run',
  runBackward: 'run back',
  strafeLeft: 'strafe left',
  strafeRight: 'strafe right',
  crouchIdle: 'crouch idle',
  crouchWalk: 'crouch walk',
  crouchBackward: 'crouch back',
  meleeIdle: 'melee idle',
  meleeWalkForward: 'melee walk',
  meleeWalkBackward: 'melee walk back',
  meleeRunForward: 'melee run',
  meleeStrafeLeft: 'melee strafe left',
  meleeStrafeRight: 'melee strafe right',
  meleeCrouchIdle: 'melee crouch idle',
  meleeCrouchWalk: 'melee crouch walk',
  meleeJump: 'melee jump',
  jump: 'jump',
  fire: 'fire',
  dieForward: 'die forward',
  dieBackward: 'die backward',
};

export const REMOTE_PRIMARY_CHARACTER_SKELETON = {
  rootJoint: 'Bip01',
  pelvis: 'Bip01_Pelvis',
  spine: 'Bip01_Spine',
  neck: 'Bip01_Neck',
  head: 'Bip01_Head',
  weaponSocket: 'weapon_socket_r',
  leftClavicle: 'Bip01_L_Clavicle',
  leftUpperArm: 'Bip01_L_UpperArm',
  leftForearm: 'Bip01_L_Forearm',
  leftHand: 'Bip01_L_Hand',
  rightClavicle: 'Bip01_R_Clavicle',
  rightUpperArm: 'Bip01_R_UpperArm',
  rightForearm: 'Bip01_R_Forearm',
  rightHand: 'Bip01_R_Hand',
  leftThigh: 'Bip01_L_Thigh',
  leftCalf: 'Bip01_L_Calf',
  leftFoot: 'Bip01_L_Foot',
  rightThigh: 'Bip01_R_Thigh',
  rightCalf: 'Bip01_R_Calf',
  rightFoot: 'Bip01_R_Foot',
};

// Backward-compatible alias while older docs/code paths are being retired.
export const REMOTE_EXPERIMENTAL_SKELETON = REMOTE_PRIMARY_CHARACTER_SKELETON;

export const DEFAULT_REMOTE_SOCKET_POSES = {
  pistolScoped: { position: [0.004, 0.085, -0.016], rotation: [0.3, 3.03, -1.47], scale: 2.5 },
  pistolHip: { position: [0.004, 0.085, -0.016], rotation: [0.3, 3.03, -1.47], scale: 2.5 },
  sniperScoped: { position: [-0.035, -0.025, 0.005], rotation: [1.5, 0.08, -1.5], scale: 0.92 },
  sniperHip: { position: [-0.03, -0.03, 0.01], rotation: [1.44, 0.12, -1.38], scale: 0.96 },
  knife: { position: [0.028, 0.008, -0.01], rotation: [0.17, 2.59, -1.82], scale: 2.5 },
  rifleScoped: { position: [-0.035, -0.025, 0.005], rotation: [1.5, 0.08, -1.5], scale: 1.08 },
  rifleHip: { position: [0.011, -0.002, -0.027], rotation: [-2.85, 1.67, 3.01], scale: 1.26 },
};

export const REMOTE_CHARACTER_MODEL_SCALE = 1.12;

export const REMOTE_CHARACTER_AIM_SETTINGS = {
  weaponAxis: 'z',
  proxyWeaponAxis: 'z',
  boneAxis: 'z',
  boneStrength: 0.75,
  weaponStrength: 0.30,
};

export const REMOTE_CHARACTER_HITBOX_SETTINGS = {
  headOffset: { x: 0, y: 0.035, z: -0.005 },
  headRadius: 0.15,
  headSize: { x: 0.24, y: 0.3, z: 0.255 },
  torsoRadius: 0.17,
  torsoTopOffset: { x: 0, y: 0, z: 0.035 },
  torsoLengthPadding: -0.085,
  pelvisRadius: 0.2,
  pelvisLengthPadding: -0.12,
  armRadius: 0.08,
  armLengthPadding: 0,
  handRadius: 0.09,
  legRadius: 0.11,
  legLengthPadding: 0,
};

export function getRemoteSocketPoseKey(weaponKey, isScoped) {
  if (weaponKey === 'pistol') {
    return isScoped ? 'pistolScoped' : 'pistolHip';
  }
  if (weaponKey === 'sniper') {
    return 'sniperHip';
  }
  if (weaponKey === 'knife') {
    return 'knife';
  }
  return 'rifleHip';
}

export function usesRemoteMeleeClipSet(weaponKey) {
  return String(weaponKey ?? 'rifle') === 'knife';
}

export function crossesRemoteMeleeLocomotionBoundary(previousWeaponKey, nextWeaponKey) {
  return usesRemoteMeleeClipSet(previousWeaponKey) !== usesRemoteMeleeClipSet(nextWeaponKey);
}

export function supportsRemoteWalkClips(weaponKey) {
  const normalizedWeaponKey = String(weaponKey ?? 'rifle');
  return normalizedWeaponKey === 'rifle' || normalizedWeaponKey === 'pistol' || normalizedWeaponKey === 'knife';
}

export function getRemoteMovementClipBaselineSpeeds(weaponKey) {
  const weaponData = getSharedWeaponData(weaponKey);
  const movementSpeedMultiplier = Math.max(0.01, Number(weaponData?.movementSpeedMultiplier ?? 1));
  const walkSpeedFactor = Math.max(0.1, Number(weaponData?.walkSpeedFactor ?? 0.5));
  const fullSpeed = PLAYER_MOVEMENT_DEFAULTS.walkSpeed * movementSpeedMultiplier;
  return {
    fullSpeed,
    walkSpeed: fullSpeed * walkSpeedFactor,
    crouchSpeed: PLAYER_MOVEMENT_DEFAULTS.crouchSpeed * movementSpeedMultiplier,
  };
}

export function shouldUseRemoteWalkClip(weaponKey, horizontalSpeed) {
  if (!supportsRemoteWalkClips(weaponKey) || !Number.isFinite(horizontalSpeed)) {
    return false;
  }

  const { fullSpeed, walkSpeed } = getRemoteMovementClipBaselineSpeeds(weaponKey);
  if (!Number.isFinite(fullSpeed) || !Number.isFinite(walkSpeed) || fullSpeed <= walkSpeed) {
    return false;
  }

  return horizontalSpeed <= (fullSpeed + walkSpeed) * 0.5;
}

export const REMOTE_AIM_PITCH_MIN = -0.9;
export const REMOTE_AIM_PITCH_MAX = 0.7;
export const REMOTE_AIM_BONE_SIGN = -1;

export const REMOTE_AIM_STATE_FACTORS = {
  idle: { bones: 2.4, weapon: 0.92 },
  scopedIdle: { bones: 2.8, weapon: 0.98 },
  move: { bones: 1.15, weapon: 0.62 },
  scopedMove: { bones: 1.35, weapon: 0.7 },
  crouch: { bones: 0.8, weapon: 0.44 },
  air: { bones: 0.45, weapon: 0.3 },
  dead: { bones: 0, weapon: 0 },
};

export const REMOTE_AIM_BONE_SPECS = [
  {
    key: 'neck',
    names: ['Bip01_Neck', 'Bip01 Neck', 'mixamorigNeck', 'Neck'],
    fallbackPattern: /neck/i,
    weight: 0.42,
  },
  {
    key: 'head',
    names: ['Bip01_Head', 'Bip01 Head', 'mixamorigHead', 'Head'],
    fallbackPattern: /head/i,
    weight: 0.2,
  },
];

export const REMOTE_AIM_CLIP_FACTORS = {
  [REMOTE_CLIPS.idle]: 1,
  [REMOTE_CLIPS.walkForward]: 0.7,
  [REMOTE_CLIPS.walkBackward]: 0.7,
  [REMOTE_CLIPS.runForward]: 0.7,
  [REMOTE_CLIPS.runBackward]: 0.7,
  [REMOTE_CLIPS.strafeLeft]: 0.5,
  [REMOTE_CLIPS.strafeRight]: 0.5,
  [REMOTE_CLIPS.crouchIdle]: 0,
  [REMOTE_CLIPS.crouchWalk]: 0,
  [REMOTE_CLIPS.crouchBackward]: 0,
  [REMOTE_CLIPS.meleeIdle]: 1,
  [REMOTE_CLIPS.meleeWalkForward]: 0.7,
  [REMOTE_CLIPS.meleeWalkBackward]: 0.7,
  [REMOTE_CLIPS.meleeRunForward]: 0.7,
  [REMOTE_CLIPS.meleeStrafeLeft]: 0.5,
  [REMOTE_CLIPS.meleeStrafeRight]: 0.5,
  [REMOTE_CLIPS.meleeCrouchIdle]: 0,
  [REMOTE_CLIPS.meleeCrouchWalk]: 0,
  [REMOTE_CLIPS.meleeJump]: 0,
  [REMOTE_CLIPS.jump]: 0,
  [REMOTE_CLIPS.fire]: 1,
  [REMOTE_CLIPS.dieForward]: 0,
  [REMOTE_CLIPS.dieBackward]: 0,
};
