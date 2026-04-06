export const REMOTE_CLIPS = {
  idle: 'idle',
  runForward: 'run',
  runBackward: 'run back',
  strafeLeft: 'strafe left',
  strafeRight: 'strafe right',
  crouchIdle: 'crouch idle',
  crouchWalk: 'crouch walk',
  crouchBackward: 'crouch back',
  jump: 'jump',
  fire: 'fire',
};

export const REMOTE_EXPERIMENTAL_SKELETON = {
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

export const DEFAULT_REMOTE_SOCKET_POSES = {
  sniperScoped: { position: [-0.035, -0.025, 0.005], rotation: [1.5, 0.08, -1.5], scale: 0.92 },
  sniperHip: { position: [-0.03, -0.03, 0.01], rotation: [1.44, 0.12, -1.38], scale: 0.96 },
  knife: { position: [0.01, -0.01, -0.01], rotation: [0.2, -1.2, 0.5], scale: 0.95 },
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
};

export function getRemoteSocketPoseKey(weaponKey, isScoped) {
  if (weaponKey === 'sniper') {
    return isScoped ? 'sniperScoped' : 'sniperHip';
  }
  if (weaponKey === 'knife') {
    return 'knife';
  }
  return isScoped ? 'rifleScoped' : 'rifleHip';
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
    names: ['Bip01_Neck', 'Bip01 Neck'],
    fallbackPattern: /neck/i,
    weight: 0.42,
  },
  {
    key: 'head',
    names: ['Bip01_Head', 'Bip01 Head'],
    fallbackPattern: /head/i,
    weight: 0.2,
  },
];

export const REMOTE_AIM_CLIP_FACTORS = {
  [REMOTE_CLIPS.idle]: 1,
  [REMOTE_CLIPS.runForward]: 0.7,
  [REMOTE_CLIPS.runBackward]: 0.7,
  [REMOTE_CLIPS.strafeLeft]: 0.5,
  [REMOTE_CLIPS.strafeRight]: 0.5,
  [REMOTE_CLIPS.crouchIdle]: 0,
  [REMOTE_CLIPS.crouchWalk]: 0,
  [REMOTE_CLIPS.crouchBackward]: 0,
  [REMOTE_CLIPS.jump]: 0,
  [REMOTE_CLIPS.fire]: 1,
};
