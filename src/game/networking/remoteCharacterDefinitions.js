import { TEAMS } from '../../shared/constants.js';

const REMOTE_CHARACTER_ENV = typeof import.meta !== 'undefined'
  && import.meta?.env
  ? import.meta.env
  : {};

const REMOTE_LEGACY_CHARACTER_MODEL_PATH = '/models/players/tester3.glb';
const REMOTE_DEFAULT_CHARACTER_MODEL_PATH = '/models/players/newtest.glb';
const REMOTE_DEFENDER_CHARACTER_MODEL_PATH = '/models/players/defender.glb';
const REMOTE_EXPERIMENTAL_ANIMATION_ROOT = '/models/players/animations';
const REMOTE_CHARACTER_VARIANT = REMOTE_CHARACTER_ENV.VITE_REMOTE_CHARACTER_VARIANT ?? 'experimental';

const REMOTE_EXPERIMENTAL_LOWER_BODY_PATTERNS = [
  /bip01$/i,
  /bip01 pelvis/i,
  /bip01 l thigh/i,
  /bip01 l calf/i,
  /bip01 l foot/i,
  /bip01 l toe/i,
  /bip01 r thigh/i,
  /bip01 r calf/i,
  /bip01 r foot/i,
  /bip01 r toe/i,
];

export const REMOTE_CHARACTER_DEFINITIONS = {
  legacy: {
    id: 'legacy',
    modelPath: REMOTE_LEGACY_CHARACTER_MODEL_PATH,
    animationMode: 'named-clips',
    supportsUpperBodyOverlay: false,
    supportsLeftHandIk: false,
  },
  experimental: {
    id: 'experimental',
    modelPath: REMOTE_DEFAULT_CHARACTER_MODEL_PATH,
    animationMode: 'subclips',
    sourceClipName: 'Take 001',
    fps: 30,
    modelYawOffset: 0,
    supportsUpperBodyOverlay: true,
    supportsLeftHandIk: true,
    prefersFullBodyRifleFire: true,
    prefersFullBodyPistolFire: true,
    externalClips: {
      idle: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_idle.fbx` },
      walk: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_walk.fbx` },
      'walk back': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_walk_back.fbx` },
      run: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_run.fbx`, playbackSpeed: 1.05 },
      'run back': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_run_back.fbx`, playbackSpeed: 1.9 },
      'strafe left': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_strafe_left.fbx`, playbackSpeed: 1.8 },
      'strafe right': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_strafe_right.fbx`, playbackSpeed: 1.8 },
      'crouch walk': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_crouch_walk.fbx`, playbackSpeed: 1.55 },
      'crouch idle': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_crouch_idle.fbx` },
      'crouch back': {
        path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_crouch_walk.fbx`,
        playbackSpeed: 1.55,
        reverse: true,
      },
      jump: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_jump.fbx` },
      'melee idle': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_idle.fbx` },
      'melee walk': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_walk.fbx` },
      'melee walk back': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_walk_back.fbx` },
      'melee run': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_run.fbx` },
      'melee strafe left': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_strafe_left.fbx` },
      'melee strafe right': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_strafe_right.fbx` },
      'melee crouch walk': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_crouch_walk.fbx` },
      'melee crouch idle': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_crouch_idle.fbx` },
      'melee jump': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_jump.fbx` },
      fire: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_fire.fbx` },
      'die forward': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_die_forward.fbx` },
      'die backward': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_die_backward.fbx` },
    },
    skeleton: {
      rootJoint: 'Bip01',
      rightHand: 'Bip01 R Hand',
      weaponSocket: 'weapon_socket_r',
      leftUpperArm: 'Bip01 L UpperArm',
      leftForearm: 'Bip01 L Forearm',
      leftHand: 'Bip01 L Hand',
    },
    clips: {
      idle: { type: 'pose', frame: 1280 },
      walk: { type: 'external', playbackSpeed: 1 },
      'walk back': { type: 'external', playbackSpeed: 1 },
      run: { type: 'subclip', startFrame: 2050, endFrame: 2080, playbackSpeed: 1.05, loopBlendFrames: 5 },
      'run back': { type: 'subclip', startFrame: 2005, endFrame: 2045, playbackSpeed: 1.9, loopBlendFrames: 6 },
      'strafe left': { type: 'subclip', startFrame: 2190, endFrame: 2220, playbackSpeed: 1.8, loopBlendFrames: 5 },
      'strafe right': { type: 'subclip', startFrame: 2225, endFrame: 2255, playbackSpeed: 1.8, loopBlendFrames: 5 },
      'crouch walk': { type: 'subclip', startFrame: 2260, endFrame: 2300, playbackSpeed: 1.55, loopBlendFrames: 8 },
      'crouch idle': { type: 'subclip', startFrame: 2300, endFrame: 2400 },
      'crouch back': { type: 'subclip', startFrame: 2260, endFrame: 2300, playbackSpeed: 1.55, loopBlendFrames: 8, reverse: true },
      jump: { type: 'subclip', startFrame: 2085, endFrame: 2110 },
      'melee idle': { type: 'external' },
      'melee walk': { type: 'external', playbackSpeed: 1 },
      'melee walk back': { type: 'external', playbackSpeed: 1 },
      'melee run': { type: 'external', playbackSpeed: 1 },
      'melee strafe left': { type: 'external', playbackSpeed: 1 },
      'melee strafe right': { type: 'external', playbackSpeed: 1 },
      'melee crouch walk': { type: 'external', playbackSpeed: 1 },
      'melee crouch idle': { type: 'external' },
      'melee jump': { type: 'external' },
      fire: {
        type: 'upper-body-subclip',
        startFrame: 2425,
        endFrame: 2435,
        lowerBodyPatterns: REMOTE_EXPERIMENTAL_LOWER_BODY_PATTERNS,
      },
      'die forward': { type: 'external', rootMotion: { preserveY: true } },
      'die backward': { type: 'external', rootMotion: { preserveY: true } },
    },
  },
  defender: {
    id: 'defender',
    modelPath: REMOTE_DEFENDER_CHARACTER_MODEL_PATH,
    animationMode: 'subclips',
    sourceClipName: 'Take 001',
    fps: 30,
    modelYawOffset: 0,
    supportsUpperBodyOverlay: true,
    supportsLeftHandIk: true,
    prefersFullBodyRifleFire: true,
    prefersFullBodyPistolFire: true,
    externalClips: {
      idle: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_idle.fbx` },
      walk: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_walk.fbx` },
      'walk back': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_walk_back.fbx` },
      run: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_run.fbx`, playbackSpeed: 1.05 },
      'run back': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_run_back.fbx`, playbackSpeed: 1.9 },
      'strafe left': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_strafe_left.fbx`, playbackSpeed: 1.8 },
      'strafe right': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_strafe_right.fbx`, playbackSpeed: 1.8 },
      'crouch walk': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_crouch_walk.fbx`, playbackSpeed: 1.55 },
      'crouch idle': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_crouch_idle.fbx` },
      'crouch back': {
        path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_crouch_walk.fbx`,
        playbackSpeed: 1.55,
        reverse: true,
      },
      jump: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_jump.fbx` },
      'melee idle': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_idle.fbx` },
      'melee walk': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_walk.fbx` },
      'melee walk back': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_walk_back.fbx` },
      'melee run': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_run.fbx` },
      'melee strafe left': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_strafe_left.fbx` },
      'melee strafe right': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_strafe_right.fbx` },
      'melee crouch walk': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_crouch_walk.fbx` },
      'melee crouch idle': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_crouch_idle.fbx` },
      'melee jump': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_melee_jump.fbx` },
      fire: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_fire.fbx` },
      'die forward': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_die_forward.fbx` },
      'die backward': { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_die_backward.fbx` },
    },
    skeleton: {
      rootJoint: 'Bip01',
      rightHand: 'Bip01 R Hand',
      weaponSocket: 'weapon_socket_r',
      leftUpperArm: 'Bip01 L UpperArm',
      leftForearm: 'Bip01 L Forearm',
      leftHand: 'Bip01 L Hand',
    },
    clips: {
      idle: { type: 'pose', frame: 1280 },
      walk: { type: 'external', playbackSpeed: 1 },
      'walk back': { type: 'external', playbackSpeed: 1 },
      run: { type: 'subclip', startFrame: 2050, endFrame: 2080, playbackSpeed: 1.05, loopBlendFrames: 5 },
      'run back': { type: 'subclip', startFrame: 2005, endFrame: 2045, playbackSpeed: 1.9, loopBlendFrames: 6 },
      'strafe left': { type: 'subclip', startFrame: 2190, endFrame: 2220, playbackSpeed: 1.8, loopBlendFrames: 5 },
      'strafe right': { type: 'subclip', startFrame: 2225, endFrame: 2255, playbackSpeed: 1.8, loopBlendFrames: 5 },
      'crouch walk': { type: 'subclip', startFrame: 2260, endFrame: 2300, playbackSpeed: 1.55, loopBlendFrames: 8 },
      'crouch idle': { type: 'subclip', startFrame: 2300, endFrame: 2400 },
      'crouch back': { type: 'subclip', startFrame: 2260, endFrame: 2300, playbackSpeed: 1.55, loopBlendFrames: 8, reverse: true },
      jump: { type: 'subclip', startFrame: 2085, endFrame: 2110 },
      'melee idle': { type: 'external' },
      'melee walk': { type: 'external', playbackSpeed: 1 },
      'melee walk back': { type: 'external', playbackSpeed: 1 },
      'melee run': { type: 'external', playbackSpeed: 1 },
      'melee strafe left': { type: 'external', playbackSpeed: 1 },
      'melee strafe right': { type: 'external', playbackSpeed: 1 },
      'melee crouch walk': { type: 'external', playbackSpeed: 1 },
      'melee crouch idle': { type: 'external' },
      'melee jump': { type: 'external' },
      fire: {
        type: 'upper-body-subclip',
        startFrame: 2425,
        endFrame: 2435,
        lowerBodyPatterns: REMOTE_EXPERIMENTAL_LOWER_BODY_PATTERNS,
      },
      'die forward': { type: 'external', rootMotion: { preserveY: true } },
      'die backward': { type: 'external', rootMotion: { preserveY: true } },
    },
  },
};

export function getRemoteCharacterDefinition(definitionId) {
  return REMOTE_CHARACTER_DEFINITIONS[definitionId] ?? null;
}

export function getDefaultRemoteCharacterDefinition() {
  return getRemoteCharacterDefinition(REMOTE_CHARACTER_VARIANT) ?? REMOTE_CHARACTER_DEFINITIONS.legacy;
}

export function getRequestedRemoteCharacterDefinition(teamKey = null) {
  if (teamKey === TEAMS.DEFENDERS) {
    return REMOTE_CHARACTER_DEFINITIONS.defender ?? getDefaultRemoteCharacterDefinition();
  }

  return getDefaultRemoteCharacterDefinition();
}

export function getFallbackRemoteCharacterDefinition(definition) {
  if (!definition || definition.id === 'legacy') {
    return null;
  }

  return REMOTE_CHARACTER_DEFINITIONS.legacy;
}
