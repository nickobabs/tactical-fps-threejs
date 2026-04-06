import * as THREE from 'three';
import { computePlayerHitboxLayout, createPlayerHitboxLayout } from '../../shared/playerHitboxes.js';
import {
  buildRemoteHitboxSnapshotFromPoints,
  createRemoteHitboxPointCache,
  createRemoteHitboxSnapshot,
  REMOTE_HITBOX_HEAD_OFFSET,
} from '../../shared/remoteHitboxes.js';
import {
  DEFAULT_REMOTE_SOCKET_POSES,
  REMOTE_CHARACTER_AIM_SETTINGS,
  REMOTE_CHARACTER_HITBOX_SETTINGS,
  REMOTE_CHARACTER_MODEL_SCALE,
  REMOTE_AIM_BONE_SIGN,
  REMOTE_AIM_BONE_SPECS,
  REMOTE_AIM_CLIP_FACTORS,
  REMOTE_AIM_PITCH_MAX,
  REMOTE_AIM_PITCH_MIN,
  REMOTE_AIM_STATE_FACTORS,
  REMOTE_CLIPS,
  getRemoteSocketPoseKey,
} from '../../shared/remoteCharacterConfig.js';

const REMOTE_PLAYER_STAND_HEIGHT = 1.72;
const REMOTE_PLAYER_BODY_RADIUS = 0.35;
const REMOTE_PLAYER_WEAPON_SIDE_X = 0.44;
const REMOTE_PLAYER_WEAPON_FORWARD_Z = -0.1;
const REMOTE_FIRE_FLASH_DURATION = 0.06;
const REMOTE_HIT_REACTION_DURATION = 0.18;
const REMOTE_DEATH_TRANSITION_DURATION = 0.26;
const REMOTE_CHARACTER_MODEL_PATH = '/models/players/tester3.glb';
const REMOTE_EXPERIMENTAL_CHARACTER_MODEL_PATH = '/models/players/newtest.glb';
const REMOTE_EXPERIMENTAL_ANIMATION_ROOT = '/models/players/animations';
const REMOTE_RIFLE_MODEL_PATH = '/models/weapons/newak.glb';
const MOVEMENT_DIRECTION_EPSILON = 0.08;
const REMOTE_JUMP_TIME_SCALE = 0.76;
const REMOTE_JUMP_END_HOLD_RATIO = 0.58;
const REMOTE_RIFLE_TARGET_LENGTH = 0.82;
const REMOTE_WEAPON_TUNING_STORAGE_KEY = 'remoteWeaponTuning.v2';
const REMOTE_UPPER_BODY_FADE_DURATION = 0.08;
const REMOTE_UPPER_BODY_ACTION_DURATION = 0.22;
const REMOTE_FULL_BODY_FIRE_ACTION_DURATION = 0.18;
const REMOTE_IK_BLEND_FACTOR = 0.9;
const REMOTE_IK_ITERATIONS = 2;
const REMOTE_WEAPON_ROTATION_ORDER = 'XZY';
const REMOTE_CHARACTER_VARIANT = import.meta.env.VITE_REMOTE_CHARACTER_VARIANT ?? 'experimental';
const REMOTE_AIM_WEAPON_FACTOR = 0.9;
const REMOTE_AIM_PROXY_WEAPON_FACTOR = 0.75;
const REMOTE_AIM_WEAPON_AXIS = 'y';
const REMOTE_AIM_PROXY_WEAPON_AXIS = 'y';
const REMOTE_AIM_BONE_LOCAL_AXIS = new THREE.Vector3(0, 0, 1);
const DEFAULT_REMOTE_DEBUG_SETTINGS = {
  freezePose: false,
  freezeClip: REMOTE_CLIPS.idle,
  localHitboxDebug: false,
};

const REMOTE_CHARACTER_BOX = new THREE.Box3();
const REMOTE_CHARACTER_SIZE = new THREE.Vector3();
const REMOTE_CHARACTER_CENTER = new THREE.Vector3();
const REMOTE_CHARACTER_ROOT_WORLD = new THREE.Vector3();
const REMOTE_WEAPON_BOX = new THREE.Box3();
const REMOTE_WEAPON_SIZE = new THREE.Vector3();
const REMOTE_WEAPON_CENTER = new THREE.Vector3();
const REMOTE_MOVE_VECTOR = new THREE.Vector3();
const REMOTE_FORWARD = new THREE.Vector3();
const REMOTE_RIGHT = new THREE.Vector3();
const REMOTE_WORLD_SCALE = new THREE.Vector3();
const REMOTE_IK_TARGET_WORLD = new THREE.Vector3();
const REMOTE_IK_TARGET_LOCAL = new THREE.Vector3();
const REMOTE_AIM_BONE_QUATERNION = new THREE.Quaternion();
const REMOTE_HITBOX_SEGMENT_START = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_END = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_CENTER = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_DIRECTION = new THREE.Vector3();
const REMOTE_HITBOX_UP_AXIS = new THREE.Vector3(0, 1, 0);
const REMOTE_HITBOX_LAYOUT = createPlayerHitboxLayout();
const REMOTE_HITBOX_WORLD_POINT_A = new THREE.Vector3();
const REMOTE_HITBOX_WORLD_POINT_B = new THREE.Vector3();
const REMOTE_LOCAL_HITBOX_POINTS = createRemoteHitboxPointCache();
const REMOTE_LOCAL_HITBOX_SNAPSHOT = createRemoteHitboxSnapshot();
const REMOTE_CHARACTER_ASSET_PROMISES = new Map();
let REMOTE_RIFLE_ASSET_PROMISE = null;
let REMOTE_WEAPON_TUNING_CACHE = null;
let REMOTE_CCDIK_SOLVER_PROMISE = null;
const REMOTE_EXPERIMENTAL_CLIP_PROMISES = new Map();
const REMOTE_ROOT_MOTION_BONE_NAMES = ['mixamorighips', 'hips', 'root', '_rootjoint', 'armature'];
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
const REMOTE_CHARACTER_DEFINITIONS = {
  legacy: {
    id: 'legacy',
    modelPath: REMOTE_CHARACTER_MODEL_PATH,
    animationMode: 'named-clips',
    supportsUpperBodyOverlay: false,
    supportsLeftHandIk: false,
  },
  experimental: {
    id: 'experimental',
    modelPath: REMOTE_EXPERIMENTAL_CHARACTER_MODEL_PATH,
    animationMode: 'subclips',
    sourceClipName: 'Take 001',
    fps: 30,
    modelYawOffset: 0,
    supportsUpperBodyOverlay: true,
    supportsLeftHandIk: true,
    externalClips: {
      idle: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_idle.fbx` },
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
      fire: { path: `${REMOTE_EXPERIMENTAL_ANIMATION_ROOT}/newtest_fire.fbx` },
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
      run: { type: 'subclip', startFrame: 2050, endFrame: 2080, playbackSpeed: 1.05, loopBlendFrames: 5 },
      'run back': { type: 'subclip', startFrame: 2005, endFrame: 2045, playbackSpeed: 1.9, loopBlendFrames: 6 },
      'strafe left': { type: 'subclip', startFrame: 2190, endFrame: 2220, playbackSpeed: 1.8, loopBlendFrames: 5 },
      'strafe right': { type: 'subclip', startFrame: 2225, endFrame: 2255, playbackSpeed: 1.8, loopBlendFrames: 5 },
      'crouch walk': { type: 'subclip', startFrame: 2260, endFrame: 2300, playbackSpeed: 1.55, loopBlendFrames: 8 },
      'crouch idle': { type: 'subclip', startFrame: 2300, endFrame: 2400 },
      'crouch back': { type: 'subclip', startFrame: 2260, endFrame: 2300, playbackSpeed: 1.55, loopBlendFrames: 8, reverse: true },
      jump: { type: 'subclip', startFrame: 2085, endFrame: 2110 },
      fire: {
        type: 'upper-body-subclip',
        startFrame: 2425,
        endFrame: 2435,
        lowerBodyPatterns: REMOTE_EXPERIMENTAL_LOWER_BODY_PATTERNS,
      },
    },
  },
};
const REMOTE_RIFLE_FALLBACK_SOCKET_ROTATION = new THREE.Euler(Math.PI / 2, 0, 0);
const REMOTE_RIFLE_FALLBACK_SOCKET_PRESETS = {
  '/models/weapons/newak.glb': {
    grip: { x: -0.006, y: -0.012, z: 0.02 },
    muzzle: { x: -0.01, y: 0.052, z: -0.618 },
  },
};

const DEFAULT_REMOTE_CHARACTER_SETTINGS = {
  modelScale: REMOTE_CHARACTER_MODEL_SCALE,
  aim: REMOTE_CHARACTER_AIM_SETTINGS,
  hitboxes: REMOTE_CHARACTER_HITBOX_SETTINGS,
};

function clonePose(pose) {
  return {
    position: [...pose.position],
    rotation: [...pose.rotation],
    scale: pose.scale,
  };
}

function cloneRemoteDebugSettings(settings = DEFAULT_REMOTE_DEBUG_SETTINGS) {
  return {
    freezePose: Boolean(settings.freezePose),
    freezeClip: String(settings.freezeClip ?? DEFAULT_REMOTE_DEBUG_SETTINGS.freezeClip),
    localHitboxDebug: Boolean(settings.localHitboxDebug),
  };
}

function cloneRemoteAimSettings(settings = DEFAULT_REMOTE_CHARACTER_SETTINGS.aim) {
  const normalizeAxis = (value, fallback) => {
    const nextValue = String(value ?? fallback).toLowerCase();
    return nextValue === 'x' || nextValue === 'y' || nextValue === 'z' ? nextValue : fallback;
  };

  return {
    weaponAxis: normalizeAxis(settings.weaponAxis, DEFAULT_REMOTE_CHARACTER_SETTINGS.aim.weaponAxis),
    proxyWeaponAxis: normalizeAxis(settings.proxyWeaponAxis, DEFAULT_REMOTE_CHARACTER_SETTINGS.aim.proxyWeaponAxis),
    boneAxis: normalizeAxis(settings.boneAxis, DEFAULT_REMOTE_CHARACTER_SETTINGS.aim.boneAxis),
    boneStrength: Number.isFinite(Number(settings.boneStrength)) ? Number(settings.boneStrength) : DEFAULT_REMOTE_CHARACTER_SETTINGS.aim.boneStrength,
    weaponStrength: Number.isFinite(Number(settings.weaponStrength)) ? Number(settings.weaponStrength) : DEFAULT_REMOTE_CHARACTER_SETTINGS.aim.weaponStrength,
  };
}

function cloneRemoteHitboxSettings(settings = DEFAULT_REMOTE_CHARACTER_SETTINGS.hitboxes) {
  const headOffset = settings?.headOffset ?? DEFAULT_REMOTE_CHARACTER_SETTINGS.hitboxes.headOffset;
  return {
    headOffset: {
      x: Number.isFinite(Number(headOffset.x)) ? Number(headOffset.x) : DEFAULT_REMOTE_CHARACTER_SETTINGS.hitboxes.headOffset.x,
      y: Number.isFinite(Number(headOffset.y)) ? Number(headOffset.y) : DEFAULT_REMOTE_CHARACTER_SETTINGS.hitboxes.headOffset.y,
      z: Number.isFinite(Number(headOffset.z)) ? Number(headOffset.z) : DEFAULT_REMOTE_CHARACTER_SETTINGS.hitboxes.headOffset.z,
    },
    headRadius: Number.isFinite(Number(settings?.headRadius))
      ? Number(settings.headRadius)
      : DEFAULT_REMOTE_CHARACTER_SETTINGS.hitboxes.headRadius,
  };
}

function getRequestedRemoteCharacterDefinition() {
  return REMOTE_CHARACTER_DEFINITIONS[REMOTE_CHARACTER_VARIANT] ?? REMOTE_CHARACTER_DEFINITIONS.legacy;
}

function getFallbackRemoteCharacterDefinition(definition) {
  if (!definition || definition.id === 'legacy') {
    return null;
  }
  return REMOTE_CHARACTER_DEFINITIONS.legacy;
}

function getRemoteRifleFallbackSocketPreset() {
  return REMOTE_RIFLE_FALLBACK_SOCKET_PRESETS[REMOTE_RIFLE_MODEL_PATH] ?? null;
}

function ensureRemoteWeaponSocket(root, socketName, fallbackPosition) {
  const existingSocket = root.getObjectByName(socketName);
  if (existingSocket) {
    return existingSocket;
  }

  if (!fallbackPosition) {
    return null;
  }

  const fallbackSocket = new THREE.Object3D();
  fallbackSocket.name = socketName;
  fallbackSocket.position.set(
    fallbackPosition.x,
    fallbackPosition.y,
    fallbackPosition.z,
  );
  fallbackSocket.rotation.copy(REMOTE_RIFLE_FALLBACK_SOCKET_ROTATION);
  root.add(fallbackSocket);
  return fallbackSocket;
}

function getTrackTargetName(trackName) {
  return normalizeRemoteClipName(String(trackName ?? '').replace(/\.(position|quaternion|scale)$/i, ''));
}

function createPoseClipFromFrame(sourceClip, clipName, frame, fps) {
  const frameTime = 1 / Math.max(1, fps);
  const startTime = frame / Math.max(1, fps);
  const duration = frameTime;
  const nextTracks = sourceClip.tracks.map((track) => {
    const valueSize = track.getValueSize();
    let sampleIndex = 0;
    for (let index = 0; index < track.times.length; index += 1) {
      if (track.times[index] <= startTime) {
        sampleIndex = index;
      } else {
        break;
      }
    }
    const start = sampleIndex * valueSize;
    const values = track.values.slice(start, start + valueSize);
    const heldValues = [...values, ...values];
    const times = [0, duration];
    return new track.constructor(track.name, times, heldValues, track.getInterpolation());
  });

  return new THREE.AnimationClip(clipName, duration, nextTracks, sourceClip.blendMode);
}

function createUpperBodyOnlyClip(clip, lowerBodyPatterns = []) {
  const nextTracks = clip.tracks
    .filter((track) => {
      const targetName = getTrackTargetName(track.name);
      return !lowerBodyPatterns.some((pattern) => pattern.test(targetName));
    })
    .map((track) => track.clone());

  return new THREE.AnimationClip(clip.name, clip.duration, nextTracks, clip.blendMode);
}

function reverseAnimationTrack(track, duration) {
  const sampleCount = track.times.length;
  const valueSize = track.getValueSize();
  if (sampleCount <= 1 || valueSize <= 0) {
    return track.clone();
  }

  const nextTimes = new track.times.constructor(sampleCount);
  const nextValues = new track.values.constructor(track.values.length);
  for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
    const sourceSampleIndex = sampleCount - 1 - sampleIndex;
    nextTimes[sampleIndex] = duration - track.times[sourceSampleIndex];
    const targetOffset = sampleIndex * valueSize;
    const sourceOffset = sourceSampleIndex * valueSize;
    for (let componentIndex = 0; componentIndex < valueSize; componentIndex += 1) {
      nextValues[targetOffset + componentIndex] = track.values[sourceOffset + componentIndex];
    }
  }

  return new track.constructor(track.name, nextTimes, nextValues, track.getInterpolation());
}

function reverseAnimationClip(clip) {
  const duration = Math.max(0, Number(clip.duration ?? 0));
  if (duration <= 0) {
    return clip.clone();
  }

  const nextTracks = clip.tracks.map((track) => reverseAnimationTrack(track, duration));
  return new THREE.AnimationClip(clip.name, duration, nextTracks, clip.blendMode);
}

function smoothLoopingTrack(track, blendFrames) {
  const sampleCount = track.times.length;
  const valueSize = track.getValueSize();
  const blendCount = Math.max(0, Math.min(blendFrames, Math.floor(sampleCount / 2) - 1));
  if (blendCount < 1 || valueSize < 1) {
    return track.clone();
  }

  const nextTrack = track.clone();
  const isQuaternionTrack = /\.quaternion$/i.test(track.name) && valueSize === 4;
  if (isQuaternionTrack) {
    const startQuat = new THREE.Quaternion();
    const endQuat = new THREE.Quaternion();
    const blendedQuat = new THREE.Quaternion();
    for (let index = 0; index < blendCount; index += 1) {
      const alpha = (index + 1) / (blendCount + 1);
      const startOffset = index * valueSize;
      const endOffset = (sampleCount - blendCount + index) * valueSize;
      startQuat.fromArray(track.values, startOffset);
      endQuat.fromArray(track.values, endOffset);
      blendedQuat.copy(endQuat).slerp(startQuat, alpha);
      nextTrack.values.set(
        [blendedQuat.x, blendedQuat.y, blendedQuat.z, blendedQuat.w],
        endOffset,
      );
    }
    return nextTrack;
  }

  for (let index = 0; index < blendCount; index += 1) {
    const alpha = (index + 1) / (blendCount + 1);
    const startOffset = index * valueSize;
    const endOffset = (sampleCount - blendCount + index) * valueSize;
    for (let component = 0; component < valueSize; component += 1) {
      const startValue = track.values[startOffset + component];
      const endValue = track.values[endOffset + component];
      nextTrack.values[endOffset + component] = THREE.MathUtils.lerp(endValue, startValue, alpha);
    }
  }

  return nextTrack;
}

function smoothLoopingClip(clip, blendFrames = 0) {
  if (!Number.isFinite(blendFrames) || blendFrames <= 0) {
    return clip;
  }

  const nextTracks = clip.tracks.map((track) => smoothLoopingTrack(track, blendFrames));
  return new THREE.AnimationClip(clip.name, clip.duration, nextTracks, clip.blendMode);
}

function buildRemoteCharacterAnimations(gltfAnimations, definition, externalClipOverrides = {}) {
  if (definition.animationMode !== 'subclips') {
    return {
      baseClips: gltfAnimations.map((clip) => stripRootMotionFromClip(clip)),
      upperBodyClips: [],
    };
  }

  const sourceClip = gltfAnimations.find(
    (clip) => normalizeRemoteClipName(clip.name) === normalizeRemoteClipName(definition.sourceClipName),
  ) ?? gltfAnimations[0];

  if (!sourceClip) {
    throw new Error(`Remote character definition "${definition.id}" has no source animation clip.`);
  }

  const baseClips = [];
  const upperBodyClips = [];
  for (const [clipName, clipDefinition] of Object.entries(definition.clips ?? {})) {
    let clip = null;
    const externalOverride = externalClipOverrides[clipName] ?? null;
    if (externalOverride) {
      clip = externalOverride.clone();
      clip.name = clipName;
      if (clipDefinition.reverse) {
        clip = reverseAnimationClip(clip);
      }
      if (clipDefinition.type === 'upper-body-subclip') {
        if (normalizeRemoteClipName(clipName) === normalizeRemoteClipName(REMOTE_CLIPS.fire)) {
          baseClips.push(stripRootMotionFromClip(clip.clone()));
        }
        upperBodyClips.push(createUpperBodyOnlyClip(clip, clipDefinition.lowerBodyPatterns));
      } else {
        baseClips.push(stripRootMotionFromClip(clip));
      }
      continue;
    }

    if (clipDefinition.type === 'pose') {
      clip = createPoseClipFromFrame(sourceClip, clipName, clipDefinition.frame, definition.fps ?? 30);
      baseClips.push(stripRootMotionFromClip(clip));
      continue;
    }

    clip = THREE.AnimationUtils.subclip(
      sourceClip,
      clipName,
      clipDefinition.startFrame,
      clipDefinition.endFrame,
      definition.fps ?? 30,
    );
    if (clipDefinition.reverse) {
      clip = reverseAnimationClip(clip);
    }
    clip = smoothLoopingClip(clip, clipDefinition.loopBlendFrames ?? 0);
    if (clipDefinition.type === 'upper-body-subclip') {
      upperBodyClips.push(createUpperBodyOnlyClip(clip, clipDefinition.lowerBodyPatterns));
    } else {
      baseClips.push(stripRootMotionFromClip(clip));
    }
  }

  return { baseClips, upperBodyClips };
}

function persistRemoteWeaponTuning() {
  if (typeof window === 'undefined' || !REMOTE_WEAPON_TUNING_CACHE) {
    return;
  }
  window.localStorage.setItem(REMOTE_WEAPON_TUNING_STORAGE_KEY, JSON.stringify(REMOTE_WEAPON_TUNING_CACHE));
}

function ensureRemoteWeaponTuning() {
  if (REMOTE_WEAPON_TUNING_CACHE) {
    return REMOTE_WEAPON_TUNING_CACHE;
  }

  const nextCache = {
    weaponPoses: {},
    character: {
      modelScale: DEFAULT_REMOTE_CHARACTER_SETTINGS.modelScale,
      aim: cloneRemoteAimSettings(),
      hitboxes: cloneRemoteHitboxSettings(),
    },
    debug: cloneRemoteDebugSettings(),
  };
  for (const [key, pose] of Object.entries(DEFAULT_REMOTE_SOCKET_POSES)) {
    nextCache.weaponPoses[key] = clonePose(pose);
  }

  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(REMOTE_WEAPON_TUNING_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const parsedWeaponPoses = parsed.weaponPoses ?? parsed;
        for (const [key, pose] of Object.entries(parsedWeaponPoses)) {
          if (!nextCache.weaponPoses[key]) {
            continue;
          }
          if (Array.isArray(pose?.position) && pose.position.length === 3) {
            nextCache.weaponPoses[key].position = pose.position.map((value) => Number(value ?? 0));
          }
          if (Array.isArray(pose?.rotation) && pose.rotation.length === 3) {
            nextCache.weaponPoses[key].rotation = pose.rotation.map((value) => Number(value ?? 0));
          }
          if (Number.isFinite(Number(pose?.scale))) {
            nextCache.weaponPoses[key].scale = Number(pose.scale);
          }
        }
        if (Number.isFinite(Number(parsed.character?.modelScale))) {
          nextCache.character.modelScale = Number(parsed.character.modelScale);
        } else if (Number.isFinite(Number(parsed.modelScale))) {
          nextCache.character.modelScale = Number(parsed.modelScale);
        }
        if (parsed.character?.aim) {
          nextCache.character.aim = cloneRemoteAimSettings(parsed.character.aim);
        }
        if (parsed.character?.hitboxes) {
          nextCache.character.hitboxes = cloneRemoteHitboxSettings(parsed.character.hitboxes);
        }
        if (parsed.debug) {
          nextCache.debug = cloneRemoteDebugSettings(parsed.debug);
        }
      }
    } catch (error) {
      console.warn('[RemotePlayerPresenter] Failed to load remote weapon tuning from localStorage.', error);
    }
  }

  REMOTE_WEAPON_TUNING_CACHE = nextCache;

  if (typeof window !== 'undefined') {
    window.__remoteWeaponTuning = {
      get poses() {
        return JSON.parse(JSON.stringify(REMOTE_WEAPON_TUNING_CACHE.weaponPoses));
      },
      get character() {
        return JSON.parse(JSON.stringify(REMOTE_WEAPON_TUNING_CACHE.character));
      },
      get debug() {
        return JSON.parse(JSON.stringify(REMOTE_WEAPON_TUNING_CACHE.debug));
      },
      setPose(key, patch) {
        if (!REMOTE_WEAPON_TUNING_CACHE?.weaponPoses?.[key]) {
          throw new Error(`Unknown remote weapon pose key: ${key}`);
        }
        if (Array.isArray(patch?.position) && patch.position.length === 3) {
          REMOTE_WEAPON_TUNING_CACHE.weaponPoses[key].position = patch.position.map((value) => Number(value ?? 0));
        }
        if (Array.isArray(patch?.rotation) && patch.rotation.length === 3) {
          REMOTE_WEAPON_TUNING_CACHE.weaponPoses[key].rotation = patch.rotation.map((value) => Number(value ?? 0));
        }
        if (Number.isFinite(Number(patch?.scale))) {
          REMOTE_WEAPON_TUNING_CACHE.weaponPoses[key].scale = Number(patch.scale);
        }
        persistRemoteWeaponTuning();
        return JSON.parse(JSON.stringify(REMOTE_WEAPON_TUNING_CACHE.weaponPoses[key]));
      },
      setModelScale(value) {
        if (!Number.isFinite(Number(value))) {
          throw new Error('Model scale must be finite.');
        }
        REMOTE_WEAPON_TUNING_CACHE.character.modelScale = Number(value);
        persistRemoteWeaponTuning();
        return REMOTE_WEAPON_TUNING_CACHE.character.modelScale;
      },
      setAim(patch) {
        REMOTE_WEAPON_TUNING_CACHE.character.aim = cloneRemoteAimSettings({
          ...REMOTE_WEAPON_TUNING_CACHE.character.aim,
          ...patch,
        });
        persistRemoteWeaponTuning();
        return JSON.parse(JSON.stringify(REMOTE_WEAPON_TUNING_CACHE.character.aim));
      },
      setHitboxes(patch) {
        REMOTE_WEAPON_TUNING_CACHE.character.hitboxes = cloneRemoteHitboxSettings({
          ...REMOTE_WEAPON_TUNING_CACHE.character.hitboxes,
          ...patch,
        });
        persistRemoteWeaponTuning();
        return JSON.parse(JSON.stringify(REMOTE_WEAPON_TUNING_CACHE.character.hitboxes));
      },
      setDebug(patch) {
        REMOTE_WEAPON_TUNING_CACHE.debug = cloneRemoteDebugSettings({
          ...REMOTE_WEAPON_TUNING_CACHE.debug,
          ...patch,
        });
        persistRemoteWeaponTuning();
        return JSON.parse(JSON.stringify(REMOTE_WEAPON_TUNING_CACHE.debug));
      },
      reset() {
        window.localStorage.removeItem(REMOTE_WEAPON_TUNING_STORAGE_KEY);
        REMOTE_WEAPON_TUNING_CACHE = null;
        return ensureRemoteWeaponTuning();
      },
      save() {
        persistRemoteWeaponTuning();
      },
    };
  }

  return REMOTE_WEAPON_TUNING_CACHE;
}

function createRemoteWeaponTuningPanel() {
  if (typeof document === 'undefined') {
    return {
      destroy() {},
    };
  }

  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.top = '72px';
  panel.style.right = '16px';
  panel.style.zIndex = '1200';
  panel.style.width = '320px';
  panel.style.maxHeight = 'calc(100vh - 96px)';
  panel.style.overflow = 'auto';
  panel.style.padding = '12px';
  panel.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  panel.style.background = 'rgba(10, 14, 20, 0.92)';
  panel.style.color = '#e5edf7';
  panel.style.fontFamily = 'monospace';
  panel.style.fontSize = '12px';
  panel.style.borderRadius = '10px';
  panel.style.display = 'none';
  panel.style.backdropFilter = 'blur(8px)';

  const title = document.createElement('div');
  title.textContent = 'Remote Weapon Tuning';
  title.style.fontWeight = '700';
  title.style.marginBottom = '10px';
  panel.appendChild(title);

  const help = document.createElement('div');
  help.textContent = 'F7 toggle • values save automatically';
  help.style.opacity = '0.72';
  help.style.marginBottom = '10px';
  panel.appendChild(help);

  const poseSelect = document.createElement('select');
  poseSelect.style.width = '100%';
  poseSelect.style.marginBottom = '12px';
  poseSelect.style.background = '#0f1720';
  poseSelect.style.color = '#e5edf7';
  poseSelect.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  poseSelect.style.borderRadius = '6px';
  poseSelect.style.padding = '6px';
  for (const key of Object.keys(DEFAULT_REMOTE_SOCKET_POSES)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    poseSelect.appendChild(option);
  }
  panel.appendChild(poseSelect);

  const controlsHost = document.createElement('div');
  panel.appendChild(controlsHost);

  const freezeRow = document.createElement('label');
  freezeRow.style.display = 'grid';
  freezeRow.style.gridTemplateColumns = '1fr auto';
  freezeRow.style.alignItems = 'center';
  freezeRow.style.gap = '8px';
  freezeRow.style.marginBottom = '8px';

  const freezeLabel = document.createElement('span');
  freezeLabel.textContent = 'Freeze Pose';
  freezeRow.appendChild(freezeLabel);

  const freezeToggle = document.createElement('input');
  freezeToggle.type = 'checkbox';
  freezeRow.appendChild(freezeToggle);
  panel.appendChild(freezeRow);

  const freezeClipSelect = document.createElement('select');
  freezeClipSelect.style.width = '100%';
  freezeClipSelect.style.marginBottom = '12px';
  freezeClipSelect.style.background = '#0f1720';
  freezeClipSelect.style.color = '#e5edf7';
  freezeClipSelect.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  freezeClipSelect.style.borderRadius = '6px';
  freezeClipSelect.style.padding = '6px';
  for (const [label, value] of [
    ['idle', REMOTE_CLIPS.idle],
    ['run', REMOTE_CLIPS.runForward],
    ['run back', REMOTE_CLIPS.runBackward],
    ['strafe left', REMOTE_CLIPS.strafeLeft],
    ['strafe right', REMOTE_CLIPS.strafeRight],
    ['crouch idle', REMOTE_CLIPS.crouchIdle],
    ['crouch walk', REMOTE_CLIPS.crouchWalk],
    ['jump', REMOTE_CLIPS.jump],
  ]) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    freezeClipSelect.appendChild(option);
  }
  panel.appendChild(freezeClipSelect);

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset All';
  resetButton.style.marginTop = '12px';
  resetButton.style.width = '100%';
  resetButton.style.padding = '8px';
  resetButton.style.background = '#1f2937';
  resetButton.style.color = '#e5edf7';
  resetButton.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  resetButton.style.borderRadius = '6px';
  resetButton.style.cursor = 'pointer';
  panel.appendChild(resetButton);

  document.body.appendChild(panel);

  const controlSpecs = [
    { id: 'posX', label: 'Pos X', kind: 'position', index: 0, min: -0.3, max: 0.3, step: 0.001 },
    { id: 'posY', label: 'Pos Y', kind: 'position', index: 1, min: -0.3, max: 0.3, step: 0.001 },
    { id: 'posZ', label: 'Pos Z', kind: 'position', index: 2, min: -0.3, max: 0.3, step: 0.001 },
    { id: 'rotX', label: 'Rot X', kind: 'rotation', index: 0, min: -3.2, max: 3.2, step: 0.01 },
    { id: 'rotY', label: 'Rot Y', kind: 'rotation', index: 1, min: -3.2, max: 3.2, step: 0.01 },
    { id: 'rotZ', label: 'Rot Z', kind: 'rotation', index: 2, min: -3.2, max: 3.2, step: 0.01 },
    { id: 'scale', label: 'Scale', kind: 'scale', min: 0.2, max: 2.5, step: 0.01 },
  ];

  const controls = new Map();
  for (const spec of controlSpecs) {
    const row = document.createElement('label');
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '52px 1fr 58px';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.marginBottom = '8px';

    const label = document.createElement('span');
    label.textContent = spec.label;
    row.appendChild(label);

    const range = document.createElement('input');
    range.type = 'range';
    range.min = String(spec.min);
    range.max = String(spec.max);
    range.step = String(spec.step);
    row.appendChild(range);

    const number = document.createElement('input');
    number.type = 'number';
    number.min = String(spec.min);
    number.max = String(spec.max);
    number.step = String(spec.step);
    number.style.width = '58px';
    number.style.background = '#0f1720';
    number.style.color = '#e5edf7';
    number.style.border = '1px solid rgba(148, 163, 184, 0.35)';
    number.style.borderRadius = '4px';
    number.style.padding = '4px';
    row.appendChild(number);

    controlsHost.appendChild(row);
    controls.set(spec.id, { spec, range, number });
  }

  function getCurrentPoseKey() {
    return poseSelect.value;
  }

  function syncInputsFromPose() {
    const pose = ensureRemoteWeaponTuning().weaponPoses[getCurrentPoseKey()];
    const debug = ensureRemoteWeaponTuning().debug;
    freezeToggle.checked = Boolean(debug.freezePose);
    freezeClipSelect.value = debug.freezeClip ?? DEFAULT_REMOTE_DEBUG_SETTINGS.freezeClip;
    freezeClipSelect.disabled = !freezeToggle.checked;
    for (const { spec, range, number } of controls.values()) {
      const value = spec.kind === 'scale'
        ? pose.scale
        : pose[spec.kind][spec.index];
      const text = String(Number(value).toFixed(spec.kind === 'rotation' ? 2 : 3));
      range.value = text;
      number.value = text;
    }
  }

  function writePoseValue(spec, nextValue) {
    const pose = clonePose(ensureRemoteWeaponTuning().weaponPoses[getCurrentPoseKey()]);
    if (spec.kind === 'scale') {
      pose.scale = nextValue;
    } else {
      pose[spec.kind][spec.index] = nextValue;
    }
    window.__remoteWeaponTuning.setPose(getCurrentPoseKey(), pose);
  }

  for (const { spec, range, number } of controls.values()) {
    const applyValue = (rawValue) => {
      const nextValue = Number(rawValue);
      if (!Number.isFinite(nextValue)) {
        return;
      }
      writePoseValue(spec, nextValue);
      const text = String(Number(nextValue).toFixed(spec.kind === 'rotation' ? 2 : 3));
      range.value = text;
      number.value = text;
    };
    range.addEventListener('input', (event) => applyValue(event.target.value));
    number.addEventListener('input', (event) => applyValue(event.target.value));
  }

  poseSelect.addEventListener('change', () => syncInputsFromPose());
  freezeToggle.addEventListener('change', () => {
    window.__remoteWeaponTuning.setDebug({
      freezePose: freezeToggle.checked,
    });
    freezeClipSelect.disabled = !freezeToggle.checked;
  });
  freezeClipSelect.addEventListener('change', () => {
    window.__remoteWeaponTuning.setDebug({
      freezeClip: freezeClipSelect.value,
    });
  });
  resetButton.addEventListener('click', () => {
    window.__remoteWeaponTuning.reset();
    syncInputsFromPose();
  });

  function togglePanel() {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display !== 'none') {
      syncInputsFromPose();
    }
  }

  function handleKeyDown(event) {
    if (event.code !== 'F7') {
      return;
    }
    togglePanel();
    event.preventDefault();
  }

  window.addEventListener('keydown', handleKeyDown);
  ensureRemoteWeaponTuning();
  syncInputsFromPose();

  return {
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      panel.remove();
    },
  };
}

function getRemoteCharacterModelScale() {
  return ensureRemoteWeaponTuning().character.modelScale;
}

function getRemoteAimSettings() {
  return ensureRemoteWeaponTuning().character.aim;
}

function getRemoteHitboxSettings() {
  return ensureRemoteWeaponTuning().character.hitboxes;
}

function getRemoteDebugSettings() {
  return ensureRemoteWeaponTuning().debug;
}

function getRemoteAimPitch(value) {
  return THREE.MathUtils.clamp(Number(value ?? 0), REMOTE_AIM_PITCH_MIN, REMOTE_AIM_PITCH_MAX);
}

function findRemoteAimBones(characterRoot) {
  const resolvedBones = [];
  const usedBoneNames = new Set();
  const availableBones = [];
  characterRoot.traverse((child) => {
    if (child?.isBone) {
      availableBones.push(child.name);
    }
  });

  for (const spec of REMOTE_AIM_BONE_SPECS) {
    let bone = null;
    for (const candidateName of spec.names) {
      const exact = characterRoot.getObjectByName(candidateName);
      if (exact?.isBone && !usedBoneNames.has(exact.name)) {
        bone = exact;
        break;
      }
    }
    if (!bone?.isBone) {
      const fallbackName = availableBones.find(
        (boneName) => spec.fallbackPattern.test(boneName) && !usedBoneNames.has(boneName),
      );
      bone = fallbackName ? characterRoot.getObjectByName(fallbackName) : null;
    }
    if (!bone?.isBone) {
      continue;
    }
    usedBoneNames.add(bone.name);
    resolvedBones.push({
      bone,
      weight: spec.weight,
      baseQuaternion: bone.quaternion.clone(),
    });
  }

  console.info('[RemotePlayerPresenter] Aim bones resolved:', resolvedBones.map((entry) => entry.bone.name));
  return resolvedBones;
}

function captureRemoteAimBoneBasePose(visual) {
  for (const entry of visual.characterAimBones ?? []) {
    entry.baseQuaternion.copy(entry.bone.quaternion);
  }
}

function getRemoteAimStateFactors(presentationState) {
  if (presentationState === 'dead') {
    return REMOTE_AIM_STATE_FACTORS.dead;
  }
  if (presentationState === 'air') {
    return REMOTE_AIM_STATE_FACTORS.air;
  }
  if (presentationState === 'scoped-idle') {
    return REMOTE_AIM_STATE_FACTORS.scopedIdle;
  }
  if (presentationState === 'scoped-move') {
    return REMOTE_AIM_STATE_FACTORS.scopedMove;
  }
  if (presentationState === 'move') {
    return REMOTE_AIM_STATE_FACTORS.move;
  }
  if (String(presentationState ?? '').startsWith('crouch')) {
    return REMOTE_AIM_STATE_FACTORS.crouch;
  }
  return REMOTE_AIM_STATE_FACTORS.idle;
}

function applyRemoteAimPitch(visual, pitch, presentationState = 'idle', targetClip = null) {
  const aimPitch = getRemoteAimPitch(pitch);
  const aimFactors = getRemoteAimStateFactors(presentationState);
  const aimSettings = getRemoteAimSettings();
  const clipFactor = REMOTE_AIM_CLIP_FACTORS[targetClip] ?? 1;
  const weaponFactor = aimFactors.weapon * aimSettings.weaponStrength;
  const boneFactor = aimFactors.bones * aimSettings.boneStrength * clipFactor;

  if (visual.characterWeaponAnchor) {
    visual.characterWeaponAnchor.rotation[aimSettings.weaponAxis] = aimPitch * REMOTE_AIM_WEAPON_FACTOR * weaponFactor;
  } else {
    visual.weaponAnchor.rotation[aimSettings.proxyWeaponAxis] = (visual.weaponAnchor.userData[`baseRotation${aimSettings.proxyWeaponAxis.toUpperCase()}`] ?? 0)
      + aimPitch * REMOTE_AIM_PROXY_WEAPON_FACTOR * weaponFactor;
  }

  if (!visual.characterRoot || boneFactor <= 0) {
    return;
  }

  REMOTE_AIM_BONE_LOCAL_AXIS.set(
    aimSettings.boneAxis === 'x' ? 1 : 0,
    aimSettings.boneAxis === 'y' ? 1 : 0,
    aimSettings.boneAxis === 'z' ? 1 : 0,
  );

  for (const entry of visual.characterAimBones ?? []) {
    entry.bone.quaternion.copy(entry.baseQuaternion);
    entry.bone.quaternion.premultiply(
      REMOTE_AIM_BONE_QUATERNION.setFromAxisAngle(
        REMOTE_AIM_BONE_LOCAL_AXIS,
        aimPitch * entry.weight * boneFactor * REMOTE_AIM_BONE_SIGN,
      ),
    );
  }
}

function createRemoteCharacterTuningPanel() {
  if (typeof document === 'undefined') {
    return {
      destroy() {},
    };
  }

  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.top = '72px';
  panel.style.left = '16px';
  panel.style.zIndex = '1200';
  panel.style.width = '340px';
  panel.style.maxHeight = 'calc(100vh - 96px)';
  panel.style.overflow = 'auto';
  panel.style.padding = '12px';
  panel.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  panel.style.background = 'rgba(10, 14, 20, 0.92)';
  panel.style.color = '#e5edf7';
  panel.style.fontFamily = 'monospace';
  panel.style.fontSize = '12px';
  panel.style.borderRadius = '10px';
  panel.style.display = 'none';
  panel.style.backdropFilter = 'blur(8px)';

  const title = document.createElement('div');
  title.textContent = 'Remote Body Tuning';
  title.style.fontWeight = '700';
  title.style.marginBottom = '10px';
  panel.appendChild(title);

  const help = document.createElement('div');
  help.textContent = 'F6 toggle • model scale + aim axes';
  help.style.opacity = '0.72';
  help.style.marginBottom = '10px';
  panel.appendChild(help);

  const createRow = (spec) => {
    const row = document.createElement('label');
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '92px 1fr 58px';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.marginBottom = '8px';

    const label = document.createElement('span');
    label.textContent = spec.label;
    row.appendChild(label);

    const range = document.createElement('input');
    range.type = 'range';
    range.min = String(spec.min);
    range.max = String(spec.max);
    range.step = String(spec.step);
    row.appendChild(range);

    const number = document.createElement('input');
    number.type = 'number';
    number.min = String(spec.min);
    number.max = String(spec.max);
    number.step = String(spec.step);
    number.style.width = '58px';
    number.style.background = '#0f1720';
    number.style.color = '#e5edf7';
    number.style.border = '1px solid rgba(148, 163, 184, 0.35)';
    number.style.borderRadius = '4px';
    number.style.padding = '4px';
    row.appendChild(number);

    panel.appendChild(row);
    return { spec, range, number };
  };

  const modelScaleControl = createRow({ label: 'Model Scale', min: 0.9, max: 1.35, step: 0.005 });

  const createSelectRow = (labelText, options) => {
    const row = document.createElement('label');
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '92px 1fr';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.marginBottom = '8px';

    const label = document.createElement('span');
    label.textContent = labelText;
    row.appendChild(label);

    const select = document.createElement('select');
    select.style.background = '#0f1720';
    select.style.color = '#e5edf7';
    select.style.border = '1px solid rgba(148, 163, 184, 0.35)';
    select.style.borderRadius = '4px';
    select.style.padding = '4px';
    for (const optionValue of options) {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionValue.toUpperCase();
      select.appendChild(option);
    }
    panel.appendChild(row);
    row.appendChild(select);
    return select;
  };

  const weaponAxisSelect = createSelectRow('Weapon Axis', ['x', 'y', 'z']);
  const proxyWeaponAxisSelect = createSelectRow('Proxy Axis', ['x', 'y', 'z']);
  const boneAxisSelect = createSelectRow('Bone Axis', ['x', 'y', 'z']);
  const boneStrengthControl = createRow({ label: 'Bone Str', min: 0, max: 4, step: 0.05 });
  const weaponStrengthControl = createRow({ label: 'Weap Str', min: 0, max: 3, step: 0.05 });
  const headOffsetXControl = createRow({ label: 'Head X', min: -0.3, max: 0.3, step: 0.005 });
  const headOffsetYControl = createRow({ label: 'Head Y', min: -0.3, max: 0.3, step: 0.005 });
  const headOffsetZControl = createRow({ label: 'Head Z', min: -0.3, max: 0.3, step: 0.005 });
  const headRadiusControl = createRow({ label: 'Head Rad', min: 0.04, max: 0.25, step: 0.005 });

  const localHitboxDebugRow = document.createElement('label');
  localHitboxDebugRow.style.display = 'flex';
  localHitboxDebugRow.style.alignItems = 'center';
  localHitboxDebugRow.style.gap = '8px';
  localHitboxDebugRow.style.marginTop = '12px';
  localHitboxDebugRow.style.marginBottom = '8px';
  const localHitboxDebugToggle = document.createElement('input');
  localHitboxDebugToggle.type = 'checkbox';
  const localHitboxDebugLabel = document.createElement('span');
  localHitboxDebugLabel.textContent = 'Local Hitbox Debug';
  localHitboxDebugRow.appendChild(localHitboxDebugToggle);
  localHitboxDebugRow.appendChild(localHitboxDebugLabel);
  panel.appendChild(localHitboxDebugRow);

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset All';
  resetButton.style.marginTop = '12px';
  resetButton.style.width = '100%';
  resetButton.style.padding = '8px';
  resetButton.style.background = '#1f2937';
  resetButton.style.color = '#e5edf7';
  resetButton.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  resetButton.style.borderRadius = '6px';
  resetButton.style.cursor = 'pointer';
  panel.appendChild(resetButton);

  document.body.appendChild(panel);

  function syncModelScale() {
    const value = getRemoteCharacterModelScale();
    const text = String(Number(value).toFixed(3));
    modelScaleControl.range.value = text;
    modelScaleControl.number.value = text;
    const aim = getRemoteAimSettings();
    weaponAxisSelect.value = aim.weaponAxis;
    proxyWeaponAxisSelect.value = aim.proxyWeaponAxis;
    boneAxisSelect.value = aim.boneAxis;
    const boneStrengthText = String(Number(aim.boneStrength).toFixed(2));
    boneStrengthControl.range.value = boneStrengthText;
    boneStrengthControl.number.value = boneStrengthText;
    const weaponStrengthText = String(Number(aim.weaponStrength).toFixed(2));
    weaponStrengthControl.range.value = weaponStrengthText;
    weaponStrengthControl.number.value = weaponStrengthText;
    const hitboxes = getRemoteHitboxSettings();
    const headOffsetXText = String(Number(hitboxes.headOffset.x).toFixed(3));
    headOffsetXControl.range.value = headOffsetXText;
    headOffsetXControl.number.value = headOffsetXText;
    const headOffsetYText = String(Number(hitboxes.headOffset.y).toFixed(3));
    headOffsetYControl.range.value = headOffsetYText;
    headOffsetYControl.number.value = headOffsetYText;
    const headOffsetZText = String(Number(hitboxes.headOffset.z).toFixed(3));
    headOffsetZControl.range.value = headOffsetZText;
    headOffsetZControl.number.value = headOffsetZText;
    const headRadiusText = String(Number(hitboxes.headRadius).toFixed(3));
    headRadiusControl.range.value = headRadiusText;
    headRadiusControl.number.value = headRadiusText;
    const debug = getRemoteDebugSettings();
    localHitboxDebugToggle.checked = Boolean(debug.localHitboxDebug);
  }

  const applyModelScale = (rawValue) => {
    const nextValue = Number(rawValue);
    if (!Number.isFinite(nextValue)) {
      return;
    }
    window.__remoteWeaponTuning.setModelScale(nextValue);
    const text = String(Number(nextValue).toFixed(3));
    modelScaleControl.range.value = text;
    modelScaleControl.number.value = text;
  };
  modelScaleControl.range.addEventListener('input', (event) => applyModelScale(event.target.value));
  modelScaleControl.number.addEventListener('input', (event) => applyModelScale(event.target.value));
  weaponAxisSelect.addEventListener('change', () => window.__remoteWeaponTuning.setAim({ weaponAxis: weaponAxisSelect.value }));
  proxyWeaponAxisSelect.addEventListener('change', () => window.__remoteWeaponTuning.setAim({ proxyWeaponAxis: proxyWeaponAxisSelect.value }));
  boneAxisSelect.addEventListener('change', () => window.__remoteWeaponTuning.setAim({ boneAxis: boneAxisSelect.value }));

  const bindAimStrength = (control, key) => {
    const applyValue = (rawValue) => {
      const nextValue = Number(rawValue);
      if (!Number.isFinite(nextValue)) {
        return;
      }
      window.__remoteWeaponTuning.setAim({ [key]: nextValue });
      const text = String(Number(nextValue).toFixed(2));
      control.range.value = text;
      control.number.value = text;
    };
    control.range.addEventListener('input', (event) => applyValue(event.target.value));
    control.number.addEventListener('input', (event) => applyValue(event.target.value));
  };

  bindAimStrength(boneStrengthControl, 'boneStrength');
  bindAimStrength(weaponStrengthControl, 'weaponStrength');

  const bindHeadOffset = (control, axis) => {
    const applyValue = (rawValue) => {
      const nextValue = Number(rawValue);
      if (!Number.isFinite(nextValue)) {
        return;
      }
      const current = getRemoteHitboxSettings();
      window.__remoteWeaponTuning.setHitboxes({
        headOffset: {
          ...current.headOffset,
          [axis]: nextValue,
        },
      });
      const text = String(Number(nextValue).toFixed(3));
      control.range.value = text;
      control.number.value = text;
    };
    control.range.addEventListener('input', (event) => applyValue(event.target.value));
    control.number.addEventListener('input', (event) => applyValue(event.target.value));
  };

  bindHeadOffset(headOffsetXControl, 'x');
  bindHeadOffset(headOffsetYControl, 'y');
  bindHeadOffset(headOffsetZControl, 'z');

  const applyHeadRadius = (rawValue) => {
    const nextValue = Number(rawValue);
    if (!Number.isFinite(nextValue)) {
      return;
    }
    const current = getRemoteHitboxSettings();
    window.__remoteWeaponTuning.setHitboxes({
      ...current,
      headRadius: nextValue,
    });
    const text = String(Number(nextValue).toFixed(3));
    headRadiusControl.range.value = text;
    headRadiusControl.number.value = text;
  };
  headRadiusControl.range.addEventListener('input', (event) => applyHeadRadius(event.target.value));
  headRadiusControl.number.addEventListener('input', (event) => applyHeadRadius(event.target.value));
  localHitboxDebugToggle.addEventListener('change', () => {
    window.__remoteWeaponTuning.setDebug({
      localHitboxDebug: localHitboxDebugToggle.checked,
    });
  });

  resetButton.addEventListener('click', () => {
    window.__remoteWeaponTuning.reset();
    syncModelScale();
  });

  function togglePanel() {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display !== 'none') {
      syncModelScale();
    }
  }

  function handleKeyDown(event) {
    if (event.code !== 'F6') {
      return;
    }
    togglePanel();
    event.preventDefault();
  }

  window.addEventListener('keydown', handleKeyDown);
  ensureRemoteWeaponTuning();
  syncModelScale();

  return {
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      panel.remove();
    },
  };
}

async function loadRemoteIkSolver() {
  if (!REMOTE_CCDIK_SOLVER_PROMISE) {
    REMOTE_CCDIK_SOLVER_PROMISE = import('three/examples/jsm/animation/CCDIKSolver.js')
      .then((module) => module.CCDIKSolver);
  }

  return REMOTE_CCDIK_SOLVER_PROMISE;
}

async function loadExternalRemoteClip(path) {
  if (!REMOTE_EXPERIMENTAL_CLIP_PROMISES.has(path)) {
    REMOTE_EXPERIMENTAL_CLIP_PROMISES.set(path, (async () => {
      const [{ FBXLoader }] = await Promise.all([
        import('three/examples/jsm/loaders/FBXLoader.js'),
      ]);
      const loader = new FBXLoader();
      const object = await loader.loadAsync(path);
      const sourceClip = object.animations?.[0] ?? null;
      if (!sourceClip) {
        throw new Error(`Missing animation clip in external FBX: ${path}`);
      }

      return stripRootMotionFromClip(normalizeClipStartTime(sourceClip));
    })());
  }

  return REMOTE_EXPERIMENTAL_CLIP_PROMISES.get(path);
}

async function loadRemoteCharacterAsset(definition = getRequestedRemoteCharacterDefinition()) {
  if (!REMOTE_CHARACTER_ASSET_PROMISES.has(definition.id)) {
    REMOTE_CHARACTER_ASSET_PROMISES.set(definition.id, (async () => {
      const [{ GLTFLoader }, SkeletonUtils] = await Promise.all([
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/utils/SkeletonUtils.js'),
      ]);
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(definition.modelPath);
      const externalClipEntries = await Promise.all(
        Object.entries(definition.externalClips ?? {}).map(async ([clipName, clipConfig]) => {
          if (!clipConfig?.path) {
            return [clipName, null];
          }

          const clip = await loadExternalRemoteClip(clipConfig.path).catch((error) => {
            console.warn(
              `[RemotePlayerPresenter] Failed to load external experimental clip "${clipName}". Falling back to GLB clip.`,
              error,
            );
            return null;
          });
          return [clipName, clip];
        }),
      );
      const externalClipOverrides = Object.fromEntries(externalClipEntries.filter(([, clip]) => Boolean(clip)));
      const { baseClips, upperBodyClips } = buildRemoteCharacterAnimations(
        gltf.animations ?? [],
        definition,
        externalClipOverrides,
      );
      return {
        scene: gltf.scene,
        animations: baseClips,
        upperBodyAnimations: upperBodyClips,
        cloneSkinned: SkeletonUtils.clone,
        definition,
      };
    })());
  }

  return REMOTE_CHARACTER_ASSET_PROMISES.get(definition.id);
}

async function loadRemoteRifleAsset() {
  if (!REMOTE_RIFLE_ASSET_PROMISE) {
    REMOTE_RIFLE_ASSET_PROMISE = (async () => {
      const [{ GLTFLoader }] = await Promise.all([
        import('three/examples/jsm/loaders/GLTFLoader.js'),
      ]);
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(REMOTE_RIFLE_MODEL_PATH);
      return {
        scene: gltf.scene,
      };
    })();
  }

  return REMOTE_RIFLE_ASSET_PROMISE;
}

function normalizeRemoteClipName(name) {
  return String(name ?? '')
    .split(/[|/\\]/)
    .pop()
    .trim()
    .toLowerCase();
}

function stripRootMotionFromClip(clip) {
  const nextTracks = clip.tracks.map((track) => {
    if (!track?.name?.endsWith('.position')) {
      return track.clone();
    }

    const trackTarget = normalizeRemoteClipName(track.name.replace(/\.position$/i, ''));
    const isRootMotionTrack = REMOTE_ROOT_MOTION_BONE_NAMES.some((name) => trackTarget.includes(name));
    if (!isRootMotionTrack) {
      return track.clone();
    }

    const nextValues = track.values.slice();
    const baseX = Number(nextValues[0] ?? 0);
    const baseY = Number(nextValues[1] ?? 0);
    const baseZ = Number(nextValues[2] ?? 0);
    for (let index = 0; index < nextValues.length; index += 3) {
      nextValues[index] = baseX;
      nextValues[index + 1] = baseY;
      nextValues[index + 2] = baseZ;
    }

    return new track.constructor(track.name, track.times.slice(), nextValues, track.getInterpolation());
  });

  return new THREE.AnimationClip(clip.name, clip.duration, nextTracks, clip.blendMode);
}

function normalizeClipStartTime(clip) {
  let minTime = Infinity;
  for (const track of clip.tracks) {
    const firstTime = Number(track.times?.[0]);
    if (Number.isFinite(firstTime)) {
      minTime = Math.min(minTime, firstTime);
    }
  }

  if (!Number.isFinite(minTime) || Math.abs(minTime) <= 1e-6) {
    return clip;
  }

  const nextTracks = clip.tracks.map((track) => {
    const nextTrack = track.clone();
    for (let index = 0; index < nextTrack.times.length; index += 1) {
      nextTrack.times[index] -= minTime;
    }
    return nextTrack;
  });

  const maxTime = nextTracks.reduce((accumulator, track) => {
    const lastTime = Number(track.times?.[track.times.length - 1] ?? 0);
    return Math.max(accumulator, lastTime);
  }, 0);
  return new THREE.AnimationClip(clip.name, maxTime, nextTracks, clip.blendMode);
}

function createLabelTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(8, 12, 18, 0.78)';
  context.fillRect(12, 10, canvas.width - 24, canvas.height - 20);
  context.strokeStyle = 'rgba(149, 196, 255, 0.7)';
  context.lineWidth = 2;
  context.strokeRect(12, 10, canvas.width - 24, canvas.height - 20);
  context.fillStyle = '#f3f8ff';
  context.font = '600 24px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRemoteWeaponMesh(weaponKey) {
  const group = new THREE.Group();
  group.rotation.order = REMOTE_WEAPON_ROTATION_ORDER;
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b2128,
    roughness: 0.62,
    metalness: 0.2,
  });
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x76614a,
    roughness: 0.82,
    metalness: 0.06,
  });

  const addMesh = (geometry, material, position, rotation = null) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.copy(position);
    if (rotation) {
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    group.add(mesh);
  };

  if (weaponKey === 'sniper') {
    addMesh(new THREE.BoxGeometry(0.08, 0.08, 0.72), darkMaterial, new THREE.Vector3(0, 0, 0));
    addMesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.54, 10),
      darkMaterial,
      new THREE.Vector3(0, 0.012, -0.58),
      new THREE.Vector3(Math.PI / 2, 0, 0),
    );
    addMesh(
      new THREE.CylinderGeometry(0.036, 0.036, 0.24, 12),
      darkMaterial,
      new THREE.Vector3(0, 0.065, -0.04),
      new THREE.Vector3(Math.PI / 2, 0, 0),
    );
    addMesh(new THREE.BoxGeometry(0.06, 0.1, 0.24), accentMaterial, new THREE.Vector3(0, -0.01, 0.34));
    group.position.set(0, -0.03, -0.34);
  } else if (weaponKey === 'knife') {
    addMesh(
      new THREE.CylinderGeometry(0.014, 0.016, 0.16, 10),
      darkMaterial,
      new THREE.Vector3(0, -0.03, 0.04),
      new THREE.Vector3(Math.PI / 2, 0, 0),
    );
    addMesh(new THREE.BoxGeometry(0.024, 0.05, 0.018), darkMaterial, new THREE.Vector3(0, -0.03, -0.05));
    addMesh(
      new THREE.ConeGeometry(0.028, 0.34, 4),
      accentMaterial,
      new THREE.Vector3(0, -0.02, -0.25),
      new THREE.Vector3(-Math.PI / 2, Math.PI / 4, 0),
    );
    group.position.set(0, -0.05, -0.12);
  } else {
    addMesh(new THREE.BoxGeometry(0.09, 0.09, 0.54), darkMaterial, new THREE.Vector3(0, 0, 0));
    addMesh(new THREE.BoxGeometry(0.07, 0.07, 0.32), accentMaterial, new THREE.Vector3(0, -0.01, -0.34));
    addMesh(
      new THREE.CylinderGeometry(0.016, 0.016, 0.44, 10),
      darkMaterial,
      new THREE.Vector3(0, 0.01, -0.66),
      new THREE.Vector3(Math.PI / 2, 0, 0),
    );
    addMesh(new THREE.BoxGeometry(0.05, 0.12, 0.08), darkMaterial, new THREE.Vector3(0, -0.1, -0.05));
    group.position.set(0, -0.02, -0.28);
  }

  const flash = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffd08a,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  );
  flash.position.set(0, 0, -0.9);
  flash.visible = false;
  group.add(flash);
  group.userData.flash = flash;
  const leftHandGrip = new THREE.Object3D();
  leftHandGrip.name = 'leftHandGrip_runtime';
  group.add(leftHandGrip);
  group.userData.leftHandGrip = leftHandGrip;

  if (weaponKey === 'sniper') {
    leftHandGrip.position.set(0, 0.02, -0.42);
  } else if (weaponKey === 'rifle') {
    leftHandGrip.position.set(0, 0.02, -0.36);
  } else {
    leftHandGrip.visible = false;
  }

  group.userData.dispose = () => {
    for (const child of group.children) {
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    }
  };
  return group;
}

function createRemoteFlashMesh() {
  const flash = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffd08a,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  );
  flash.position.set(0, 0, -0.9);
  flash.visible = false;
  return flash;
}

function createRemoteWeaponGroup() {
  const group = new THREE.Group();
  group.rotation.order = REMOTE_WEAPON_ROTATION_ORDER;
  const flash = createRemoteFlashMesh();
  group.add(flash);
  group.userData.flash = flash;
  const leftHandGrip = new THREE.Object3D();
  leftHandGrip.name = 'leftHandGrip_runtime';
  group.add(leftHandGrip);
  group.userData.leftHandGrip = leftHandGrip;
  group.userData.dispose = () => {
    flash.geometry?.dispose?.();
    flash.material?.dispose?.();
    for (const child of group.children) {
      if (child === flash) {
        continue;
      }
      child.traverse?.((descendant) => {
        descendant.geometry?.dispose?.();
        if (Array.isArray(descendant.material)) {
          descendant.material.forEach((material) => material?.dispose?.());
        } else {
          descendant.material?.dispose?.();
        }
      });
    }
  };
  return group;
}

function createRemoteWeaponFallback(weaponKey) {
  return createRemoteWeaponMesh(weaponKey);
}

function alignNodeToOrigin(root, node) {
  root.updateMatrixWorld(true);
  node.updateMatrixWorld(true);

  const rootWorldInverse = root.matrixWorld.clone().invert();
  const nodeLocalMatrix = node.matrixWorld.clone().premultiply(rootWorldInverse);
  const rootAdjustment = nodeLocalMatrix.invert();
  root.applyMatrix4(rootAdjustment);
  root.updateMatrixWorld(true);
}

function createRemoteRifleModelGroup(asset) {
  const group = createRemoteWeaponGroup();
  const rifleRoot = asset.scene.clone(true);
  const flash = group.userData.flash;
  const runtimeLeftHandGrip = group.userData.leftHandGrip;
  const fallbackSocketPreset = getRemoteRifleFallbackSocketPreset();
  rifleRoot.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
    }
  });

  const gripSocket = ensureRemoteWeaponSocket(
    rifleRoot,
    'grip_socket',
    fallbackSocketPreset?.grip,
  );
  const muzzleSocket = ensureRemoteWeaponSocket(
    rifleRoot,
    'muzzle_socket',
    fallbackSocketPreset?.muzzle,
  );
  const authoredLeftHandGrip = rifleRoot.getObjectByName('left_hand_grip');
  if (gripSocket) {
    alignNodeToOrigin(rifleRoot, gripSocket);
  }

  rifleRoot.updateMatrixWorld(true);
  REMOTE_WEAPON_BOX.setFromObject(rifleRoot);
  REMOTE_WEAPON_BOX.getSize(REMOTE_WEAPON_SIZE);
  const longestDimension = Math.max(REMOTE_WEAPON_SIZE.x, REMOTE_WEAPON_SIZE.y, REMOTE_WEAPON_SIZE.z, 1e-3);
  group.userData.rifleLongestDimension = longestDimension;
  group.add(rifleRoot);
  if (muzzleSocket) {
    muzzleSocket.add(flash);
    flash.position.set(0, 0, 0);
  } else {
    flash.position.set(0.46, 0.02, 0);
  }
  if (authoredLeftHandGrip) {
    runtimeLeftHandGrip.visible = false;
    group.userData.leftHandGrip = authoredLeftHandGrip;
  } else {
    runtimeLeftHandGrip.visible = true;
    runtimeLeftHandGrip.position.set(-0.08, -0.005, -0.42);
    group.userData.leftHandGrip = runtimeLeftHandGrip;
  }
  return group;
}

function createRemotePlayerVisual(displayName, bodyMaterial) {
  const root = new THREE.Group();

  const body = new THREE.Group();
  const bodyCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(REMOTE_PLAYER_BODY_RADIUS, REMOTE_PLAYER_BODY_RADIUS, 1, 18),
    bodyMaterial,
  );
  bodyCylinder.castShadow = true;
  bodyCylinder.receiveShadow = true;
  body.add(bodyCylinder);

  const bodyTop = new THREE.Mesh(
    new THREE.SphereGeometry(REMOTE_PLAYER_BODY_RADIUS, 18, 12),
    bodyMaterial,
  );
  bodyTop.castShadow = true;
  bodyTop.receiveShadow = true;
  body.add(bodyTop);

  const bodyBottom = new THREE.Mesh(
    new THREE.SphereGeometry(REMOTE_PLAYER_BODY_RADIUS, 18, 12),
    bodyMaterial,
  );
  bodyBottom.castShadow = true;
  bodyBottom.receiveShadow = true;
  body.add(bodyBottom);
  root.add(body);

  const weaponAnchor = new THREE.Group();
  weaponAnchor.position.set(REMOTE_PLAYER_WEAPON_SIDE_X, 0.9, REMOTE_PLAYER_WEAPON_FORWARD_Z);
  weaponAnchor.rotation.set(0.12, 0, -0.18);
  weaponAnchor.userData.baseRotationX = weaponAnchor.rotation.x;
  weaponAnchor.userData.baseRotationY = weaponAnchor.rotation.y;
  weaponAnchor.userData.baseRotationZ = weaponAnchor.rotation.z;
  root.add(weaponAnchor);

  const labelSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createLabelTexture(displayName),
      transparent: true,
      depthWrite: false,
    }),
  );
  labelSprite.position.set(0, 2.15, 0);
  labelSprite.scale.set(1.6, 0.4, 1);
  root.add(labelSprite);

  const hitVolumeDebugGroup = createRemoteHitVolumeDebugGroup();
  hitVolumeDebugGroup.visible = false;

  return {
    root,
    body,
    bodyCylinder,
    bodyTop,
    bodyBottom,
    weaponAnchor,
    weaponMesh: null,
    weaponKey: null,
    labelSprite,
    hitVolumeDebugGroup,
    showHitVolumeDebug: false,
    flashTime: 0,
    hitReactionTime: 0,
    deathTransitionTime: 0,
    lastAlive: true,
    characterRoot: null,
    characterDefinition: null,
    characterMixer: null,
    characterActions: new Map(),
    characterUpperBodyActions: new Map(),
    activeCharacterClip: null,
    activeUpperBodyClip: null,
    activeUpperBodyWeight: 1,
    upperBodyActionTime: 0,
    fullBodyActionClip: null,
    fullBodyActionTime: 0,
    characterLoadState: 'idle',
    characterWeaponBone: null,
    characterWeaponSocket: null,
    characterWeaponAnchor: null,
    characterSkinnedMesh: null,
    leftHandIkSolver: null,
    leftHandIkTargetBone: null,
    characterAimBones: [],
    characterHitBones: null,
    characterScaleBase: 1,
    characterModelScaleAtAttach: 1,
    characterBasePosition: new THREE.Vector3(),
  };
}

function createRemoteHitCapsuleDebugMesh(color) {
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });
  const group = new THREE.Group();
  const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 12, 1, true), material);
  const top = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), material);
  const bottom = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), material);
  group.add(cylinder, top, bottom);
  return { group, cylinder, top, bottom };
}

function createRemoteHitSphereDebugMesh(color) {
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), material);
  return mesh;
}

function updateRemoteHitCapsuleDebugMesh(debugMesh, segment) {
  REMOTE_HITBOX_SEGMENT_START.set(segment.start.x, segment.start.y, segment.start.z);
  REMOTE_HITBOX_SEGMENT_END.set(segment.end.x, segment.end.y, segment.end.z);
  REMOTE_HITBOX_SEGMENT_CENTER.copy(REMOTE_HITBOX_SEGMENT_START).add(REMOTE_HITBOX_SEGMENT_END).multiplyScalar(0.5);
  REMOTE_HITBOX_SEGMENT_DIRECTION.copy(REMOTE_HITBOX_SEGMENT_END).sub(REMOTE_HITBOX_SEGMENT_START);
  const length = Math.max(0.001, REMOTE_HITBOX_SEGMENT_DIRECTION.length());
  REMOTE_HITBOX_SEGMENT_DIRECTION.normalize();

  debugMesh.group.position.copy(REMOTE_HITBOX_SEGMENT_CENTER);
  debugMesh.group.quaternion.setFromUnitVectors(REMOTE_HITBOX_UP_AXIS, REMOTE_HITBOX_SEGMENT_DIRECTION);
  debugMesh.cylinder.scale.set(segment.radius, length, segment.radius);
  debugMesh.top.position.set(0, length * 0.5, 0);
  debugMesh.bottom.position.set(0, -length * 0.5, 0);
  debugMesh.top.scale.setScalar(segment.radius);
  debugMesh.bottom.scale.setScalar(segment.radius);
}

function createRemoteHitVolumeDebugGroup() {
  const group = new THREE.Group();
  group.renderOrder = 1200;

  const head = createRemoteHitSphereDebugMesh(0xff5d5d);
  const torso = createRemoteHitCapsuleDebugMesh(0x6bd3ff);
  const pelvis = createRemoteHitCapsuleDebugMesh(0x8cff7a);
  const arms = [
    createRemoteHitCapsuleDebugMesh(0xffd166),
    createRemoteHitCapsuleDebugMesh(0xffd166),
    createRemoteHitCapsuleDebugMesh(0xffd166),
    createRemoteHitCapsuleDebugMesh(0xffd166),
    createRemoteHitCapsuleDebugMesh(0xffd166),
    createRemoteHitCapsuleDebugMesh(0xffd166),
  ];
  const hands = [
    createRemoteHitSphereDebugMesh(0xffd166),
    createRemoteHitSphereDebugMesh(0xffd166),
  ];
  const legs = [
    createRemoteHitCapsuleDebugMesh(0xc792ff),
    createRemoteHitCapsuleDebugMesh(0xc792ff),
    createRemoteHitCapsuleDebugMesh(0xc792ff),
    createRemoteHitCapsuleDebugMesh(0xc792ff),
  ];

  group.add(
    head,
    torso.group,
    pelvis.group,
    arms[0].group,
    arms[1].group,
    arms[2].group,
    arms[3].group,
    arms[4].group,
    arms[5].group,
    hands[0],
    hands[1],
    legs[0].group,
    legs[1].group,
    legs[2].group,
    legs[3].group,
  );
  return { group, head, torso, pelvis, arms, hands, legs };
}

function findRemoteBoneByHints(root, names = [], fallbackPattern = null) {
  for (const name of names) {
    const match = root.getObjectByName(name);
    if (match?.isBone) {
      return match;
    }
  }

  if (!fallbackPattern) {
    return null;
  }

  let resolved = null;
  root.traverse((child) => {
    if (!resolved && child.isBone && fallbackPattern.test(child.name)) {
      resolved = child;
    }
  });
  return resolved;
}

function findRemoteHitBones(root, definition) {
  const skeleton = definition?.skeleton ?? {};
  return {
    head: findRemoteBoneByHints(root, ['Bip01 Head', 'Bip01_Head', skeleton.head].filter(Boolean), /head/i),
    neck: findRemoteBoneByHints(root, ['Bip01 Neck', 'Bip01_Neck', skeleton.neck].filter(Boolean), /neck/i),
    spine: findRemoteBoneByHints(root, ['Bip01 Spine', 'Bip01_Spine', skeleton.spine].filter(Boolean), /^bip01[\s_]?spine$/i),
    pelvis: findRemoteBoneByHints(root, ['Bip01 Pelvis', 'Bip01_Pelvis', skeleton.pelvis, skeleton.rootJoint].filter(Boolean), /pelvis|hips|^bip01$/i),
    leftClavicle: findRemoteBoneByHints(root, ['Bip01 L Clavicle', 'Bip01_L_Clavicle', skeleton.leftClavicle].filter(Boolean), /(left|l).*clavicle|clavicle.*(left|l)/i),
    leftUpperArm: findRemoteBoneByHints(root, ['Bip01 L UpperArm', 'Bip01_L_UpperArm', skeleton.leftUpperArm].filter(Boolean), /(left|l).*upper.*arm|upper.*arm.*(left|l)/i),
    leftForearm: findRemoteBoneByHints(root, ['Bip01 L Forearm', 'Bip01_L_Forearm', skeleton.leftForearm].filter(Boolean), /(left|l).*forearm|forearm.*(left|l)/i),
    leftHand: findRemoteBoneByHints(root, ['Bip01 L Hand', 'Bip01_L_Hand', skeleton.leftHand].filter(Boolean), /(left|l).*hand|hand.*(left|l)/i),
    rightClavicle: findRemoteBoneByHints(root, ['Bip01 R Clavicle', 'Bip01_R_Clavicle', skeleton.rightClavicle].filter(Boolean), /(right|r).*clavicle|clavicle.*(right|r)/i),
    rightUpperArm: findRemoteBoneByHints(root, ['Bip01 R UpperArm', 'Bip01_R_UpperArm', skeleton.rightUpperArm].filter(Boolean), /(right|r).*upper.*arm|upper.*arm.*(right|r)/i),
    rightForearm: findRemoteBoneByHints(root, ['Bip01 R Forearm', 'Bip01_R_Forearm', skeleton.rightForearm].filter(Boolean), /(right|r).*forearm|forearm.*(right|r)/i),
    rightHand: findRemoteBoneByHints(root, ['Bip01 R Hand', 'Bip01_R_Hand', skeleton.rightHand].filter(Boolean), /(right|r).*hand|hand.*(right|r)/i),
    leftThigh: findRemoteBoneByHints(root, ['Bip01 L Thigh', 'Bip01_L_Thigh', skeleton.leftThigh].filter(Boolean), /(left|l).*(thigh|upleg)|(thigh|upleg).*(left|l)/i),
    leftCalf: findRemoteBoneByHints(root, ['Bip01 L Calf', 'Bip01_L_Calf', skeleton.leftCalf].filter(Boolean), /(left|l).*calf|calf.*(left|l)/i),
    leftFoot: findRemoteBoneByHints(root, ['Bip01 L Foot', 'Bip01_L_Foot', skeleton.leftFoot].filter(Boolean), /(left|l).*foot|foot.*(left|l)/i),
    rightThigh: findRemoteBoneByHints(root, ['Bip01 R Thigh', 'Bip01_R_Thigh', skeleton.rightThigh].filter(Boolean), /(right|r).*(thigh|upleg)|(thigh|upleg).*(right|r)/i),
    rightCalf: findRemoteBoneByHints(root, ['Bip01 R Calf', 'Bip01_R_Calf', skeleton.rightCalf].filter(Boolean), /(right|r).*calf|calf.*(right|r)/i),
    rightFoot: findRemoteBoneByHints(root, ['Bip01 R Foot', 'Bip01_R_Foot', skeleton.rightFoot].filter(Boolean), /(right|r).*foot|foot.*(right|r)/i),
  };
}

function hasCompleteRemoteHitBones(bones) {
  return Boolean(
    bones?.head
    && bones?.neck
    && bones?.spine
    && bones?.pelvis
    && bones?.leftClavicle
    && bones?.leftUpperArm
    && bones?.leftForearm
    && bones?.leftHand
    && bones?.rightClavicle
    && bones?.rightUpperArm
    && bones?.rightForearm
    && bones?.rightHand
    && bones?.leftThigh
    && bones?.leftCalf
    && bones?.leftFoot
    && bones?.rightThigh
    && bones?.rightCalf
    && bones?.rightFoot
  );
}

function updateRemoteHitVolumeDebugGroup(debugGroup, player) {
  if (!debugGroup) {
    return;
  }

  const layout = computePlayerHitboxLayout({
    position: player.position,
    yaw: player.yaw ?? 0,
    currentHeight: player.currentHeight ?? REMOTE_PLAYER_STAND_HEIGHT,
    isCrouched: player.isCrouched ?? false,
    activeWeaponKey: player.activeWeaponKey ?? 'rifle',
  }, REMOTE_HITBOX_LAYOUT);

  debugGroup.head.position.set(layout.head.center.x, layout.head.center.y, layout.head.center.z);
  debugGroup.head.scale.setScalar(layout.head.radius);
  updateRemoteHitCapsuleDebugMesh(debugGroup.torso, layout.torso);
  updateRemoteHitCapsuleDebugMesh(debugGroup.pelvis, layout.pelvis);
  updateRemoteHitCapsuleDebugMesh(debugGroup.arms[0], layout.arms[0]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.arms[1], layout.arms[1]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.arms[2], layout.arms[2]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.arms[3], layout.arms[3]);
  debugGroup.arms[4].group.visible = false;
  debugGroup.arms[5].group.visible = false;
  debugGroup.hands[0].visible = false;
  debugGroup.hands[1].visible = false;
  updateRemoteHitCapsuleDebugMesh(debugGroup.legs[0], layout.legs[0]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.legs[1], layout.legs[1]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.legs[2], layout.legs[2]);
  updateRemoteHitCapsuleDebugMesh(debugGroup.legs[3], layout.legs[3]);
}

function updateRemoteAuthoritativeHitVolumeDebugGroup(debugGroup, hitboxes) {
  if (!debugGroup || !hitboxes?.head || !hitboxes?.torso || !hitboxes?.pelvis) {
    return false;
  }

  debugGroup.head.position.set(hitboxes.head.center.x, hitboxes.head.center.y, hitboxes.head.center.z);
  debugGroup.head.scale.setScalar(hitboxes.head.radius);
  updateRemoteHitCapsuleDebugMesh(debugGroup.torso, hitboxes.torso);
  updateRemoteHitCapsuleDebugMesh(debugGroup.pelvis, hitboxes.pelvis);

  for (let index = 0; index < debugGroup.arms.length; index += 1) {
    const arm = hitboxes.arms?.[index] ?? null;
    debugGroup.arms[index].group.visible = Boolean(arm);
    if (arm) {
      updateRemoteHitCapsuleDebugMesh(debugGroup.arms[index], arm);
    }
  }

  for (let index = 0; index < debugGroup.hands.length; index += 1) {
    const hand = hitboxes.hands?.[index] ?? null;
    debugGroup.hands[index].visible = Boolean(hand);
    if (hand) {
      debugGroup.hands[index].position.set(hand.center.x, hand.center.y, hand.center.z);
      debugGroup.hands[index].scale.setScalar(hand.radius);
    }
  }

  for (let index = 0; index < debugGroup.legs.length; index += 1) {
    const leg = hitboxes.legs?.[index] ?? null;
    debugGroup.legs[index].group.visible = Boolean(leg);
    if (leg) {
      updateRemoteHitCapsuleDebugMesh(debugGroup.legs[index], leg);
    }
  }

  return true;
}

function updateRemoteBoneDrivenHitVolumeDebugGroup(debugGroup, bones) {
  if (!debugGroup || !hasCompleteRemoteHitBones(bones)) {
    return false;
  }

  for (const [key, point] of Object.entries(REMOTE_LOCAL_HITBOX_POINTS)) {
    const bone = bones[key];
    if (!bone?.getWorldPosition) {
      return false;
    }
    bone.getWorldPosition(REMOTE_HITBOX_WORLD_POINT_A);
    point.x = REMOTE_HITBOX_WORLD_POINT_A.x;
    point.y = REMOTE_HITBOX_WORLD_POINT_A.y;
    point.z = REMOTE_HITBOX_WORLD_POINT_A.z;
  }

  const hitboxSettings = getRemoteHitboxSettings();
  const localSnapshot = buildRemoteHitboxSnapshotFromPoints({
    points: REMOTE_LOCAL_HITBOX_POINTS,
    headOffset: hitboxSettings.headOffset,
    headRadius: hitboxSettings.headRadius,
  }, REMOTE_LOCAL_HITBOX_SNAPSHOT);

  return updateRemoteAuthoritativeHitVolumeDebugGroup(debugGroup, localSnapshot);
}

function getRemoteWeaponParent(visual) {
  return visual.characterWeaponAnchor ?? visual.weaponAnchor;
}

function attachRemoteWeapon(visual, weaponMesh) {
  getRemoteWeaponParent(visual).add(weaponMesh);
}

function setRemotePlayerWeapon(visual, weaponKey) {
  const nextWeaponKey = weaponKey || 'rifle';
  if (visual.weaponKey === nextWeaponKey) {
    return;
  }

  if (visual.weaponMesh) {
    visual.weaponMesh.parent?.remove(visual.weaponMesh);
    visual.weaponMesh.userData.dispose?.();
  }

  visual.weaponKey = nextWeaponKey;
  if (nextWeaponKey !== 'rifle') {
    visual.weaponMesh = createRemoteWeaponFallback(nextWeaponKey);
    attachRemoteWeapon(visual, visual.weaponMesh);
    return;
  }

  visual.weaponMesh = createRemoteWeaponFallback(nextWeaponKey);
  attachRemoteWeapon(visual, visual.weaponMesh);
  void loadRemoteRifleAsset()
    .then((asset) => {
      if (!visual.weaponMesh || visual.weaponKey !== nextWeaponKey) {
        return;
      }

      visual.weaponMesh.parent?.remove(visual.weaponMesh);
      visual.weaponMesh.userData.dispose?.();
      visual.weaponMesh = createRemoteRifleModelGroup(asset);
      attachRemoteWeapon(visual, visual.weaponMesh);
    })
    .catch((error) => {
      console.warn('[RemotePlayerPresenter] Failed to load remote rifle model. Keeping fallback proxy.', error);
    });
}

function triggerRemotePlayerFireFlash(visual) {
  if (!visual) {
    return;
  }

  visual.flashTime = REMOTE_FIRE_FLASH_DURATION;
  if (visual.characterDefinition?.id === 'experimental' && visual.weaponKey === 'rifle') {
    if (visual.presentationState === 'idle' || visual.presentationState === 'scoped-idle') {
      visual.fullBodyActionClip = REMOTE_CLIPS.fire;
      visual.fullBodyActionTime = REMOTE_FULL_BODY_FIRE_ACTION_DURATION;
      return;
    }
    return;
  }
  playRemoteUpperBodyClip(visual, REMOTE_CLIPS.fire);
}

function triggerRemotePlayerHitReaction(visual, { killed = false } = {}) {
  if (!visual) {
    return;
  }

  visual.hitReactionTime = REMOTE_HIT_REACTION_DURATION;
  if (killed) {
    visual.deathTransitionTime = REMOTE_DEATH_TRANSITION_DURATION;
  }
}

function findRemoteClipAction(visual, clipName) {
  const normalizedClipName = normalizeRemoteClipName(clipName);
  return visual.characterActions.get(normalizedClipName)
    ?? [...visual.characterActions.entries()].find(([name]) => name.includes(normalizedClipName))?.[1]
    ?? null;
}

function findRemoteUpperBodyAction(visual, clipName) {
  const normalizedClipName = normalizeRemoteClipName(clipName);
  return visual.characterUpperBodyActions.get(normalizedClipName)
    ?? [...visual.characterUpperBodyActions.entries()].find(([name]) => name.includes(normalizedClipName))?.[1]
    ?? null;
}

function setRemoteCharacterClip(visual, clipName) {
  if (!visual.characterMixer || !visual.characterActions?.size) {
    return;
  }

  const normalizedClipName = normalizeRemoteClipName(clipName);
  const nextAction = findRemoteClipAction(visual, normalizedClipName);
  if (!nextAction) {
    return;
  }
  const isImmediateFireTransition = normalizedClipName === normalizeRemoteClipName(REMOTE_CLIPS.fire);

  const previousAction = visual.activeCharacterClip
    ? findRemoteClipAction(visual, visual.activeCharacterClip)
    : null;

  if (visual.activeCharacterClip === normalizedClipName) {
    return;
  }

  if (previousAction && previousAction !== nextAction) {
    if (isImmediateFireTransition) {
      previousAction.stop();
    } else {
      previousAction.fadeOut(0.12);
    }
  }

  nextAction.reset();
  if (isImmediateFireTransition) {
    nextAction.setEffectiveWeight(1).setEffectiveTimeScale(1).play();
  } else {
    nextAction.fadeIn(0.12).play();
  }
  visual.activeCharacterClip = normalizedClipName;
}

function freezeRemoteCharacterClip(visual, clipName) {
  if (!visual.characterMixer || !visual.characterActions?.size) {
    return;
  }

  const normalizedClipName = normalizeRemoteClipName(clipName);
  setRemoteCharacterClip(visual, normalizedClipName);
  const targetAction = findRemoteClipAction(visual, normalizedClipName);
  if (!targetAction) {
    return;
  }

  for (const action of visual.characterActions.values()) {
    if (action === targetAction) {
      action.enabled = true;
      action.play();
      action.time = 0;
      action.paused = true;
      action.setEffectiveTimeScale(0);
      action.setEffectiveWeight(1);
    } else {
      action.stop();
      action.paused = true;
    }
  }
  for (const action of visual.characterUpperBodyActions.values()) {
    action.stop();
    action.paused = true;
    action.setEffectiveWeight(0);
  }
  visual.activeUpperBodyClip = null;
  visual.upperBodyActionTime = 0;
  visual.characterMixer.update(0);
  captureRemoteAimBoneBasePose(visual);
}

function playRemoteUpperBodyClip(visual, clipName) {
  if (!visual.characterMixer || !visual.characterUpperBodyActions?.size) {
    return;
  }

  const normalizedClipName = normalizeRemoteClipName(clipName);
  const nextAction = findRemoteUpperBodyAction(visual, normalizedClipName);
  if (!nextAction) {
    return;
  }

  const previousAction = visual.activeUpperBodyClip
    ? findRemoteUpperBodyAction(visual, visual.activeUpperBodyClip)
    : null;
  if (previousAction && previousAction !== nextAction) {
    previousAction.fadeOut(REMOTE_UPPER_BODY_FADE_DURATION);
  }

  nextAction
    .reset()
    .setEffectiveWeight(1)
    .setEffectiveTimeScale(1)
    .fadeIn(REMOTE_UPPER_BODY_FADE_DURATION)
    .play();
  visual.activeUpperBodyClip = normalizedClipName;
  visual.activeUpperBodyWeight = 1;
  visual.upperBodyActionTime = REMOTE_UPPER_BODY_ACTION_DURATION;
}

function updateRemoteUpperBodyAction(visual, delta) {
  if (!visual.activeUpperBodyClip) {
    return;
  }

  const action = findRemoteUpperBodyAction(visual, visual.activeUpperBodyClip);
  if (!action) {
    visual.activeUpperBodyClip = null;
    visual.upperBodyActionTime = 0;
    return;
  }

  visual.upperBodyActionTime = Math.max(0, visual.upperBodyActionTime - delta);
  if (visual.upperBodyActionTime > 0) {
    action.setEffectiveWeight(visual.activeUpperBodyWeight ?? 1);
    return;
  }

  action.fadeOut(REMOTE_UPPER_BODY_FADE_DURATION);
  visual.activeUpperBodyClip = null;
  visual.activeUpperBodyWeight = 1;
}

function updateRemoteFullBodyAction(visual, delta) {
  if (!visual.fullBodyActionClip) {
    return null;
  }

  const activeClip = visual.fullBodyActionClip;
  visual.fullBodyActionTime = Math.max(0, visual.fullBodyActionTime - delta);
  if (visual.fullBodyActionTime <= 0) {
    visual.fullBodyActionClip = null;
    visual.fullBodyActionTime = 0;
  }
  return activeClip;
}

function findFirstSkinnedMesh(root) {
  let match = null;
  root.traverse((child) => {
    if (!match && child.isSkinnedMesh) {
      match = child;
    }
  });
  return match;
}

async function ensureRemoteLeftHandIk(visual) {
  const definition = visual.characterDefinition;
  if (!definition?.supportsLeftHandIk || visual.leftHandIkSolver || !visual.characterSkinnedMesh) {
    return;
  }

  const skeleton = visual.characterSkinnedMesh.skeleton;
  const findBoneIndex = (boneName) => skeleton.bones.findIndex((bone) => bone?.name === boneName);
  const upperArmIndex = findBoneIndex(definition.skeleton?.leftUpperArm);
  const forearmIndex = findBoneIndex(definition.skeleton?.leftForearm);
  const handIndex = findBoneIndex(definition.skeleton?.leftHand);
  if (upperArmIndex < 0 || forearmIndex < 0 || handIndex < 0) {
    return;
  }

  const targetBone = new THREE.Bone();
  targetBone.name = 'runtime_left_hand_ik_target';
  visual.characterRoot.add(targetBone);
  visual.leftHandIkTargetBone = targetBone;
  skeleton.bones.push(targetBone);
  const targetIndex = skeleton.bones.length - 1;
  const CCDIKSolver = await loadRemoteIkSolver();
  if (!visual.characterRoot || !visual.characterSkinnedMesh) {
    return;
  }

  visual.leftHandIkSolver = new CCDIKSolver(visual.characterSkinnedMesh, [{
    target: targetIndex,
    effector: handIndex,
    iteration: REMOTE_IK_ITERATIONS,
    links: [
      { index: forearmIndex },
      { index: upperArmIndex },
    ],
    maxAngle: Math.PI / 4,
    blendFactor: REMOTE_IK_BLEND_FACTOR,
  }]);
}

function updateRemoteLeftHandIk(visual) {
  if (!visual.leftHandIkSolver || !visual.leftHandIkTargetBone) {
    return;
  }

  const gripTarget = visual.weaponMesh?.userData?.leftHandGrip ?? null;
  if (!gripTarget || gripTarget.visible === false) {
    return;
  }

  gripTarget.updateWorldMatrix(true, false);
  gripTarget.getWorldPosition(REMOTE_IK_TARGET_WORLD);
  visual.characterRoot.worldToLocal(REMOTE_IK_TARGET_LOCAL.copy(REMOTE_IK_TARGET_WORLD));
  visual.leftHandIkTargetBone.position.copy(REMOTE_IK_TARGET_LOCAL);
  visual.leftHandIkTargetBone.updateMatrixWorld(true);
  visual.leftHandIkSolver.update();
}

function disposeRemoteCharacterModel(visual) {
  if (visual.characterRoot) {
    visual.root.remove(visual.characterRoot);
    visual.characterRoot.traverse((child) => {
      child.geometry?.dispose?.();
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material?.dispose?.());
      } else {
        child.material?.dispose?.();
      }
    });
  }

  visual.characterMixer?.stopAllAction?.();
  visual.characterRoot = null;
  visual.characterDefinition = null;
  visual.characterMixer = null;
  visual.characterActions.clear();
  visual.characterUpperBodyActions.clear();
  visual.activeCharacterClip = null;
  visual.activeUpperBodyClip = null;
  visual.upperBodyActionTime = 0;
  visual.fullBodyActionClip = null;
  visual.fullBodyActionTime = 0;
  visual.characterWeaponBone = null;
  visual.characterWeaponSocket = null;
  visual.characterWeaponAnchor = null;
  visual.characterSkinnedMesh = null;
  visual.leftHandIkSolver = null;
  visual.leftHandIkTargetBone = null;
  visual.characterAimBones = [];
  visual.characterHitBones = null;
  visual.characterScaleBase = 1;
  visual.characterModelScaleAtAttach = 1;
  visual.characterBasePosition.set(0, 0, 0);
}

function attachRemoteCharacterModel(visual, asset) {
  if (!visual || visual.characterLoadState === 'ready') {
    return;
  }

  const definition = asset.definition ?? REMOTE_CHARACTER_DEFINITIONS.legacy;
  const characterRoot = asset.cloneSkinned(asset.scene);
  characterRoot.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
    }
  });

  characterRoot.updateMatrixWorld(true);
  REMOTE_CHARACTER_BOX.setFromObject(characterRoot);
  REMOTE_CHARACTER_BOX.getSize(REMOTE_CHARACTER_SIZE);
  const baseHeight = Math.max(REMOTE_CHARACTER_SIZE.y, 1e-3);
  const scale = (REMOTE_PLAYER_STAND_HEIGHT * getRemoteCharacterModelScale()) / baseHeight;
  characterRoot.scale.setScalar(scale);

  characterRoot.updateMatrixWorld(true);
  REMOTE_CHARACTER_BOX.setFromObject(characterRoot);
  const rootJoint = characterRoot.getObjectByName('_rootJoint')
    ?? characterRoot.getObjectByName(definition.skeleton?.rootJoint ?? '')
    ?? characterRoot.getObjectByName('belly_01')
    ?? characterRoot.getObjectByName('mixamorigHips')
    ?? null;
  if (rootJoint) {
    rootJoint.getWorldPosition(REMOTE_CHARACTER_ROOT_WORLD);
    characterRoot.position.set(-REMOTE_CHARACTER_ROOT_WORLD.x, -REMOTE_CHARACTER_BOX.min.y, -REMOTE_CHARACTER_ROOT_WORLD.z);
  } else {
    REMOTE_CHARACTER_BOX.getCenter(REMOTE_CHARACTER_CENTER);
    characterRoot.position.set(-REMOTE_CHARACTER_CENTER.x, -REMOTE_CHARACTER_BOX.min.y, -REMOTE_CHARACTER_CENTER.z);
  }

  visual.root.add(characterRoot);
  visual.characterRoot = characterRoot;
  visual.characterDefinition = definition;
  visual.characterAimBones = findRemoteAimBones(characterRoot);
  visual.characterHitBones = findRemoteHitBones(characterRoot, definition);
  visual.characterScaleBase = REMOTE_PLAYER_STAND_HEIGHT / baseHeight;
  visual.characterModelScaleAtAttach = getRemoteCharacterModelScale();
  visual.characterMixer = new THREE.AnimationMixer(characterRoot);
  visual.characterBasePosition.copy(characterRoot.position);
  visual.characterSkinnedMesh = findFirstSkinnedMesh(characterRoot);
  visual.characterWeaponBone = characterRoot.getObjectByName(definition.skeleton?.rightHand ?? '')
    ?? characterRoot.getObjectByName('hand.R_013')
    ?? characterRoot.getObjectByName('hand.R')
    ?? characterRoot.getObjectByName('hand_r')
    ?? characterRoot.getObjectByName('mixamorigRightHand')
    ?? (() => {
      let match = null;
      characterRoot.traverse((child) => {
        if (!match && child.isBone && /(right.*hand|hand.*right|hand[\._ ]?r)/i.test(child.name)) {
          match = child;
        }
      });
      return match;
    })();
  visual.characterWeaponSocket = characterRoot.getObjectByName(definition.skeleton?.weaponSocket ?? '')
    ?? characterRoot.getObjectByName('weapon_socket_r')
    ?? (() => {
      let match = null;
      characterRoot.traverse((child) => {
        if (!match && /(weapon[_ ]?socket[_ ]?r)/i.test(child.name)) {
          match = child;
        }
      });
      return match;
    })();
  visual.characterWeaponAnchor = new THREE.Group();
  visual.characterWeaponAnchor.scale.setScalar(1 / Math.max(scale, 1e-6));
  if (visual.characterWeaponSocket) {
    visual.characterWeaponSocket.add(visual.characterWeaponAnchor);
  } else {
    getRemoteWeaponParent(visual).add(visual.characterWeaponAnchor);
  }
  visual.characterActions.clear();
  visual.characterUpperBodyActions.clear();
  for (const clip of asset.animations) {
    const action = visual.characterMixer.clipAction(clip);
    const normalizedName = normalizeRemoteClipName(clip.name);
    action.enabled = true;
    if (normalizedName === normalizeRemoteClipName(REMOTE_CLIPS.jump)) {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    } else {
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
    }
    visual.characterActions.set(normalizedName, action);
  }
  for (const clip of asset.upperBodyAnimations ?? []) {
    const action = visual.characterMixer.clipAction(clip);
    const normalizedName = normalizeRemoteClipName(clip.name);
    action.enabled = true;
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = false;
    action.setEffectiveWeight(0);
    visual.characterUpperBodyActions.set(normalizedName, action);
  }

  visual.characterLoadState = 'ready';
  visual.body.visible = false;
  if (visual.weaponMesh) {
    visual.weaponMesh.parent?.remove(visual.weaponMesh);
    attachRemoteWeapon(visual, visual.weaponMesh);
  }
  void ensureRemoteLeftHandIk(visual);
  setRemoteCharacterClip(visual, REMOTE_CLIPS.idle);
}

function ensureRemoteCharacterModel(visual) {
  if (!visual || visual.characterLoadState === 'loading' || visual.characterLoadState === 'ready') {
    return;
  }

  const requestedDefinition = getRequestedRemoteCharacterDefinition();
  visual.characterLoadState = 'loading';
  void loadRemoteCharacterAsset(requestedDefinition)
    .then((asset) => {
      attachRemoteCharacterModel(visual, asset);
    })
    .catch((error) => {
      const fallbackDefinition = getFallbackRemoteCharacterDefinition(requestedDefinition);
      if (!fallbackDefinition) {
        visual.characterLoadState = 'failed';
        console.warn('[RemotePlayerPresenter] Failed to load remote character model. Falling back to proxy body.', error);
        return;
      }

      console.warn(
        `[RemotePlayerPresenter] Failed to load remote character definition "${requestedDefinition.id}". Falling back to legacy model.`,
        error,
      );
      return loadRemoteCharacterAsset(fallbackDefinition)
        .then((fallbackAsset) => {
          attachRemoteCharacterModel(visual, fallbackAsset);
        })
        .catch((fallbackError) => {
          visual.characterLoadState = 'failed';
          console.warn('[RemotePlayerPresenter] Failed to load fallback remote character model. Falling back to proxy body.', fallbackError);
        });
    });
}

function selectMovementClip(authoritativeState, presentationState) {
  if (presentationState === 'dead') {
    return REMOTE_CLIPS.idle;
  }

  if (presentationState === 'air') {
    return REMOTE_CLIPS.jump;
  }

  const velocity = authoritativeState?.velocity ?? null;
  const isCrouched = Boolean(authoritativeState?.isCrouched);
  if (!velocity) {
    return isCrouched ? REMOTE_CLIPS.crouchIdle : REMOTE_CLIPS.idle;
  }

  REMOTE_MOVE_VECTOR.set(Number(velocity.x ?? 0), 0, Number(velocity.z ?? 0));
  if (REMOTE_MOVE_VECTOR.lengthSq() <= MOVEMENT_DIRECTION_EPSILON * MOVEMENT_DIRECTION_EPSILON) {
    return isCrouched ? REMOTE_CLIPS.crouchIdle : REMOTE_CLIPS.idle;
  }

  const yaw = Number(authoritativeState?.yaw ?? 0);
  REMOTE_FORWARD.set(-Math.sin(yaw), 0, -Math.cos(yaw));
  REMOTE_RIGHT.set(Math.cos(yaw), 0, -Math.sin(yaw));

  const forwardAmount = REMOTE_MOVE_VECTOR.dot(REMOTE_FORWARD);
  const strafeAmount = REMOTE_MOVE_VECTOR.dot(REMOTE_RIGHT);

  if (isCrouched) {
    if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
      return forwardAmount >= 0 ? REMOTE_CLIPS.crouchWalk : REMOTE_CLIPS.crouchBackward;
    }

    return REMOTE_CLIPS.crouchWalk;
  }

  if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
    return forwardAmount >= 0 ? REMOTE_CLIPS.runForward : REMOTE_CLIPS.runBackward;
  }

  return strafeAmount >= 0 ? REMOTE_CLIPS.strafeRight : REMOTE_CLIPS.strafeLeft;
}

function getCharacterWeaponPose(weaponKey, isScoped) {
  if (weaponKey === 'sniper') {
    return isScoped
      ? { position: [-0.02, -0.02, -0.38], rotation: [0.08, -0.24, -0.08], scale: 1.15 }
      : { position: [0.02, -0.04, -0.26], rotation: [0.12, -0.14, -0.18], scale: 1.1 };
  }

  if (weaponKey === 'knife') {
    return { position: [-0.03, -0.08, -0.14], rotation: [0.22, 0.2, -0.52], scale: 1.05 };
  }

  return isScoped
    ? { position: [0.02, 0.2, -0.12], rotation: [-0.02, -0.3, -0.02], scale: 0.88 }
    : { position: [0.05, 0.16, -0.08], rotation: [0.06, -0.18, -0.12], scale: 0.84 };
}

function getSocketWeaponPose(weaponKey, isScoped) {
  const tuning = ensureRemoteWeaponTuning();
  return tuning.weaponPoses[getRemoteSocketPoseKey(weaponKey, isScoped)];
}

function selectTargetClip(authoritativeState, presentationState) {
  return presentationState === 'air'
    ? REMOTE_CLIPS.jump
    : selectMovementClip(authoritativeState, presentationState);
}

function updateClipPlaybackParameters(visual, targetClip) {
  const clipSettings = visual.characterDefinition?.clips ?? null;
  for (const action of visual.characterActions.values()) {
    action.paused = false;
    action.setEffectiveTimeScale(1);
  }

  const targetClipSettings = clipSettings?.[targetClip] ?? null;
  const targetAction = findRemoteClipAction(visual, targetClip);
  if (targetAction && Number.isFinite(targetClipSettings?.playbackSpeed)) {
    targetAction.setEffectiveTimeScale(targetClipSettings.playbackSpeed);
  }

  const jumpAction = findRemoteClipAction(visual, REMOTE_CLIPS.jump);
  if (!jumpAction) {
    return;
  }

  if (targetClip !== REMOTE_CLIPS.jump) {
    jumpAction.paused = false;
    jumpAction.setEffectiveTimeScale(1);
    return;
  }

  const jumpDuration = Math.max(0.001, jumpAction.getClip().duration);
  const holdTime = jumpDuration * REMOTE_JUMP_END_HOLD_RATIO;
  jumpAction.setEffectiveTimeScale(REMOTE_JUMP_TIME_SCALE);
  if (jumpAction.time >= holdTime) {
    jumpAction.time = holdTime;
    jumpAction.paused = true;
  }
}

function updateRemotePlayerVisual(visual, player, delta, authoritativeState, bodyMaterials) {
  const height = Math.max(
    0.8,
    Number(player.currentHeight ?? authoritativeState?.currentHeight ?? REMOTE_PLAYER_STAND_HEIGHT),
  );
  const isAlive = authoritativeState?.isAlive !== false;
  const isCrouched = Boolean(player.isCrouched ?? authoritativeState?.isCrouched);
  const cylinderHeight = Math.max(0.05, height - REMOTE_PLAYER_BODY_RADIUS * 2);
  const presentationState = String(player.presentationState ?? authoritativeState?.presentationState ?? 'idle');
  const isAir = presentationState === 'air';
  const isScoped = Boolean(player.isScoped ?? authoritativeState?.isScoped);
  const aimPitch = Number(player.pitch ?? authoritativeState?.pitch ?? 0);
  const isScopedStance = isScoped || presentationState === 'scoped-idle' || presentationState === 'scoped-move';
  visual.presentationState = presentationState;
  const previousAlive = visual.lastAlive !== false;
  if (previousAlive && !isAlive) {
    visual.deathTransitionTime = REMOTE_DEATH_TRANSITION_DURATION;
  }
  visual.lastAlive = isAlive;

  visual.bodyCylinder.material = isAlive ? bodyMaterials.alive : bodyMaterials.dead;
  visual.bodyTop.material = isAlive ? bodyMaterials.alive : bodyMaterials.dead;
  visual.bodyBottom.material = isAlive ? bodyMaterials.alive : bodyMaterials.dead;
  visual.body.visible = visual.characterLoadState !== 'ready';
  visual.root.position.set(player.position.x, player.position.y, player.position.z);
  if (visual.hitReactionTime > 0) {
    visual.hitReactionTime = Math.max(0, visual.hitReactionTime - delta);
  }
  if (visual.deathTransitionTime > 0) {
    visual.deathTransitionTime = Math.max(0, visual.deathTransitionTime - delta);
  }

  const hitAlpha = Math.max(0, Math.min(1, visual.hitReactionTime / REMOTE_HIT_REACTION_DURATION));
  const deathAlpha = isAlive
    ? 0
    : 1 - Math.max(0, Math.min(1, visual.deathTransitionTime / REMOTE_DEATH_TRANSITION_DURATION));
  const forwardFlinch = hitAlpha * 0.08;
  const sideFlinch = hitAlpha * 0.04;
  const deathLean = deathAlpha * 0.92;

  visual.root.rotation.set(
    -forwardFlinch + deathLean * 0.28,
    player.yaw,
    -sideFlinch + deathLean,
  );
  visual.root.position.y += hitAlpha * 0.02;

  visual.body.position.y = height * 0.5;
  visual.bodyCylinder.scale.y = cylinderHeight;
  visual.bodyTop.position.y = cylinderHeight * 0.5;
  visual.bodyBottom.position.y = -cylinderHeight * 0.5;
  visual.labelSprite.position.y = height + 0.43;
  visual.labelSprite.material.opacity = isAlive ? 1 : 0.82;
  visual.weaponAnchor.position.set(
    isScopedStance ? REMOTE_PLAYER_WEAPON_SIDE_X * 0.72 : REMOTE_PLAYER_WEAPON_SIDE_X,
    Math.max(0.58, height * (isCrouched ? 0.64 : (isScopedStance ? 0.6 : 0.52))),
    isScopedStance ? REMOTE_PLAYER_WEAPON_FORWARD_Z - 0.22 : REMOTE_PLAYER_WEAPON_FORWARD_Z,
  );
  visual.weaponAnchor.rotation.set(
    isScopedStance ? 0.04 : 0.12,
    0,
    isScopedStance ? -0.08 : -0.18,
  );
  visual.weaponAnchor.userData.baseRotationX = visual.weaponAnchor.rotation.x;
  visual.weaponAnchor.userData.baseRotationY = visual.weaponAnchor.rotation.y;
  visual.weaponAnchor.userData.baseRotationZ = visual.weaponAnchor.rotation.z;
  visual.weaponAnchor.visible = isAlive;
  if (visual.characterMixer) {
    const debugSettings = getRemoteDebugSettings();
    const targetClip = debugSettings.freezePose
      ? debugSettings.freezeClip
      : selectTargetClip(authoritativeState, presentationState);
    if (debugSettings.freezePose) {
      freezeRemoteCharacterClip(visual, targetClip);
    } else {
      const fullBodyActionClip = updateRemoteFullBodyAction(visual, delta);
      setRemoteCharacterClip(visual, fullBodyActionClip ?? targetClip);
      updateClipPlaybackParameters(visual, targetClip);
      updateRemoteUpperBodyAction(visual, delta);
      visual.characterMixer.update(delta);
      captureRemoteAimBoneBasePose(visual);
    }
    if (visual.characterRoot) {
      const currentModelScaleSetting = getRemoteCharacterModelScale();
      const modelScale = visual.characterScaleBase * currentModelScaleSetting;
      const positionScaleRatio = currentModelScaleSetting / Math.max(visual.characterModelScaleAtAttach, 1e-6);
      visual.characterRoot.visible = isAlive;
      visual.characterRoot.rotation.set(0, visual.characterDefinition?.modelYawOffset ?? Math.PI, 0);
      visual.characterRoot.position.copy(visual.characterBasePosition).multiplyScalar(positionScaleRatio);
      visual.characterRoot.position.y += isAlive ? 0 : -0.04;
      visual.characterRoot.scale.setScalar(modelScale);
      if (visual.characterWeaponAnchor) {
        visual.characterWeaponAnchor.scale.setScalar(1 / Math.max(modelScale, 1e-6));
      }
    }
  }

  applyRemoteAimPitch(visual, aimPitch, presentationState, visual.activeCharacterClip);

  if (visual.weaponMesh) {
    visual.weaponMesh.visible = isAlive;
    if (visual.characterWeaponSocket) {
      const pose = getSocketWeaponPose(visual.weaponKey, isScopedStance);
      visual.characterWeaponAnchor.getWorldScale(REMOTE_WORLD_SCALE);
      const inheritedAnchorScale = Math.max(
        Math.abs(REMOTE_WORLD_SCALE.x),
        Math.abs(REMOTE_WORLD_SCALE.y),
        Math.abs(REMOTE_WORLD_SCALE.z),
        1e-6,
      );
      const normalizedRifleScale = (REMOTE_RIFLE_TARGET_LENGTH
        / Math.max(visual.weaponMesh.userData.rifleLongestDimension ?? 1, 1e-3))
        / inheritedAnchorScale;
      const rifleScale = visual.weaponKey === 'rifle'
        ? normalizedRifleScale * Math.max(0.001, Number(pose.scale ?? 1))
        : pose.scale;
      visual.weaponMesh.position.set(...pose.position);
      visual.weaponMesh.rotation.set(...pose.rotation);
      visual.weaponMesh.scale.setScalar(rifleScale);
    } else {
      const pose = getCharacterWeaponPose(visual.weaponKey, isScopedStance);
      visual.weaponMesh.position.set(...pose.position);
      visual.weaponMesh.rotation.set(...pose.rotation);
      visual.weaponMesh.scale.setScalar(pose.scale);
    }
  }

  updateRemoteLeftHandIk(visual);

  visual.hitVolumeDebugGroup.group.visible = visual.showHitVolumeDebug === true;
  if (visual.showHitVolumeDebug) {
    const debugSettings = getRemoteDebugSettings();
    const preferLocalHitboxDebug = Boolean(debugSettings.localHitboxDebug);
    const usedAuthoritativeHitboxes = !preferLocalHitboxDebug && updateRemoteAuthoritativeHitVolumeDebugGroup(
      visual.hitVolumeDebugGroup,
      authoritativeState?.hitboxes,
    );
    if (!usedAuthoritativeHitboxes) {
      const usedBoneDrivenHitboxes = updateRemoteBoneDrivenHitVolumeDebugGroup(
        visual.hitVolumeDebugGroup,
        visual.characterHitBones,
      );
      if (!usedBoneDrivenHitboxes) {
        updateRemoteHitVolumeDebugGroup(visual.hitVolumeDebugGroup, {
          position: player.position,
          yaw: player.yaw,
          currentHeight: player.currentHeight ?? authoritativeState?.currentHeight,
          isCrouched: player.isCrouched ?? authoritativeState?.isCrouched,
          activeWeaponKey: authoritativeState?.activeWeaponKey ?? player.activeWeaponKey,
        });
      }
    }
  }

  if (visual.flashTime > 0) {
    visual.flashTime = Math.max(0, visual.flashTime - delta);
  }
  const flash = visual.weaponMesh?.userData?.flash ?? null;
  if (flash) {
    const normalizedFlash = Math.max(0, Math.min(1, visual.flashTime / REMOTE_FIRE_FLASH_DURATION));
    flash.visible = normalizedFlash > 0.01;
    flash.material.opacity = normalizedFlash * 0.95;
    flash.scale.setScalar(0.6 + (1 - normalizedFlash) * 0.65);
  }
}

function disposeRemotePlayerVisual(visual) {
  visual.weaponMesh?.parent?.remove(visual.weaponMesh);
  visual.weaponMesh?.userData.dispose?.();
  disposeRemoteCharacterModel(visual);
  visual.hitVolumeDebugGroup?.group?.traverse((child) => {
    child.geometry?.dispose?.();
    child.material?.dispose?.();
  });
  visual.bodyCylinder.geometry.dispose();
  visual.bodyTop.geometry.dispose();
  visual.bodyBottom.geometry.dispose();
  visual.labelSprite.material.map?.dispose?.();
  visual.labelSprite.material.dispose();
}

export class RemotePlayerPresenter {
  constructor(scene) {
    this.scene = scene;
    this.remotePlayerMeshes = new Map();
    this.showHitVolumeDebug = false;
    this.weaponTuningPanel = createRemoteWeaponTuningPanel();
    this.characterTuningPanel = createRemoteCharacterTuningPanel();
    this.remotePlayerMaterial = new THREE.MeshStandardMaterial({
      color: 0x54c7f2,
      roughness: 0.55,
      metalness: 0.08,
    });
    this.remotePlayerDeadMaterial = new THREE.MeshStandardMaterial({
      color: 0x6f2a2a,
      roughness: 0.7,
      metalness: 0.05,
    });
  }

  handleCombatEvent(event) {
    if (event?.type === 'player-fired') {
      const visual = this.remotePlayerMeshes.get(event.playerId);
      if (visual) {
        if (event.weaponKey && event.weaponKey !== visual.weaponKey) {
          setRemotePlayerWeapon(visual, event.weaponKey);
        }
        triggerRemotePlayerFireFlash(visual);
      }
      return;
    }

    if (event?.type === 'player-hit') {
      const victimVisual = this.remotePlayerMeshes.get(event.victimPlayerId);
      if (victimVisual) {
        triggerRemotePlayerHitReaction(victimVisual, { killed: Boolean(event.killed) });
      }
    }
  }

  toggleHitVolumeDebug() {
    this.showHitVolumeDebug = !this.showHitVolumeDebug;
    for (const visual of this.remotePlayerMeshes.values()) {
      visual.showHitVolumeDebug = this.showHitVolumeDebug;
      visual.hitVolumeDebugGroup.group.visible = this.showHitVolumeDebug;
    }
    return this.showHitVolumeDebug;
  }

  syncPlayers(remotePlayers, authoritativeBuffers, delta = 0) {
    const activeIds = new Set();

    for (const player of remotePlayers) {
      activeIds.add(player.playerId);
      let visual = this.remotePlayerMeshes.get(player.playerId);

      if (!visual) {
        visual = createRemotePlayerVisual(
          player.displayName ?? player.playerId,
          this.remotePlayerMaterial,
        );
        this.remotePlayerMeshes.set(player.playerId, visual);
        this.scene.add(visual.root);
        this.scene.add(visual.hitVolumeDebugGroup.group);
        visual.showHitVolumeDebug = this.showHitVolumeDebug;
        visual.hitVolumeDebugGroup.group.visible = this.showHitVolumeDebug;
        ensureRemoteCharacterModel(visual);
      }

      const authoritativeState = authoritativeBuffers.get(player.playerId)?.at?.(-1) ?? null;
      const renderPlayer = this.showHitVolumeDebug && authoritativeState
        ? {
          playerId: player.playerId,
          displayName: player.displayName ?? authoritativeState.displayName ?? player.playerId,
          position: { ...authoritativeState.position },
          yaw: authoritativeState.yaw,
          pitch: authoritativeState.pitch,
          currentHeight: authoritativeState.currentHeight,
          isCrouched: authoritativeState.isCrouched,
          activeWeaponKey: authoritativeState.activeWeaponKey,
          isScoped: authoritativeState.isScoped,
          presentationState: authoritativeState.presentationState,
          isAlive: authoritativeState.isAlive,
        }
        : player;
      setRemotePlayerWeapon(visual, authoritativeState?.activeWeaponKey ?? renderPlayer.activeWeaponKey);
      visual.labelSprite.visible = true;
      updateRemotePlayerVisual(visual, renderPlayer, delta, authoritativeState, {
        alive: this.remotePlayerMaterial,
        dead: this.remotePlayerDeadMaterial,
      });
    }

    for (const [playerId, visual] of this.remotePlayerMeshes) {
      if (activeIds.has(playerId)) {
        continue;
      }

      this.scene.remove(visual.root);
      this.scene.remove(visual.hitVolumeDebugGroup.group);
      disposeRemotePlayerVisual(visual);
      this.remotePlayerMeshes.delete(playerId);
    }
  }

  clear() {
    for (const visual of this.remotePlayerMeshes.values()) {
      this.scene.remove(visual.root);
      this.scene.remove(visual.hitVolumeDebugGroup.group);
      disposeRemotePlayerVisual(visual);
    }

    this.remotePlayerMeshes.clear();
  }

  destroy() {
    this.clear();
    this.weaponTuningPanel?.destroy?.();
    this.characterTuningPanel?.destroy?.();
    this.remotePlayerMaterial.dispose();
    this.remotePlayerDeadMaterial.dispose();
  }
}
