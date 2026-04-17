import * as THREE from 'three';
import { computePlayerHitboxLayout, createPlayerHitboxLayout } from '../../shared/playerHitboxes.js';
import {
  buildRemoteHitboxSnapshotFromPoints,
  createRemoteHitboxPointCache,
  createRemoteHitboxSnapshot,
  REMOTE_HITBOX_HEAD_OFFSET,
} from '../../shared/remoteHitboxes.js';
import {
  describeRemoteHitboxAudit,
  resolveRemoteHitBones,
  resolveRemoteRootJoint,
} from '../../shared/remoteSkeleton.js';
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
  getRemoteMovementClipBaselineSpeeds,
  getRemoteSocketPoseKey,
  shouldUseRemoteWalkClip,
  usesRemoteMeleeClipSet,
} from '../../shared/remoteCharacterConfig.js';
import {
  getDefaultRemoteCharacterDefinition,
  getFallbackRemoteCharacterDefinition,
  getRemoteCharacterDefinition,
  getRequestedRemoteCharacterDefinition,
} from './remoteCharacterDefinitions.js';
import { buildRemoteCharacterAnimations } from './remoteCharacterAnimationBuilder.js';
import { createRemoteCharacterAssetLoader } from './remoteCharacterAssetLoader.js';
import { createRemoteTuningStore } from './remoteTuningStore.js';
import {
  createRemoteCharacterTuningPanelUi,
  createRemoteWeaponTuningPanelUi,
} from './remoteTuningPanels.js';

const REMOTE_PLAYER_STAND_HEIGHT = 1.72;
const REMOTE_PLAYER_BODY_RADIUS = 0.35;
const REMOTE_PLAYER_WEAPON_SIDE_X = 0.44;
const REMOTE_PLAYER_WEAPON_FORWARD_Z = -0.1;
const REMOTE_FIRE_FLASH_DURATION = 0.06;
const REMOTE_HIT_REACTION_DURATION = 0.18;
const REMOTE_DEATH_TRANSITION_DURATION = 0.26;
const REMOTE_RIFLE_MODEL_PATH = '/models/weapons/newak.glb';
const REMOTE_BORROWED_WEAPON_MODEL_PATH = '/models/viewmodels/cube-gunman/hand_base.glb';
const REMOTE_BORROWED_WEAPON_TEXTURES = {
  pistol: '/models/viewmodels/cube-gunman/textures/weapon.USP.jpg',
  knife: '/models/viewmodels/cube-gunman/textures/weapon.M9.jpg',
};
const REMOTE_BORROWED_WEAPON_DEFINITIONS = {
  pistol: {
    meshName: 'USP_1',
    rootNodeName: 'USP',
    muzzlePosition: [0.72, 0.1, -0.86],
    targetLength: 0.34,
    hideFlash: false,
  },
  knife: {
    meshName: 'M9_1',
    rootNodeName: 'M9',
    muzzlePosition: [0, 0, 0],
    targetLength: 0.42,
    hideFlash: true,
  },
};
const MOVEMENT_DIRECTION_EPSILON = 0.08;
const REMOTE_JUMP_TIME_SCALE = 0.76;
const REMOTE_JUMP_END_HOLD_RATIO = 0.58;
const REMOTE_RIFLE_TARGET_LENGTH = 0.82;
const REMOTE_WEAPON_TUNING_STORAGE_KEY = 'remoteWeaponTuning.v3';
const REMOTE_UPPER_BODY_FADE_DURATION = 0.08;
const REMOTE_UPPER_BODY_ACTION_DURATION = 0.22;
const REMOTE_FULL_BODY_FIRE_ACTION_DURATION = 0.18;
const REMOTE_PERSISTENT_ACTION_TIME = Number.POSITIVE_INFINITY;
const REMOTE_IK_BLEND_FACTOR = 0.9;
const REMOTE_IK_ITERATIONS = 2;
const REMOTE_WEAPON_ROTATION_ORDER = 'XZY';
const REMOTE_AIM_WEAPON_FACTOR = 0.9;
const REMOTE_AIM_PROXY_WEAPON_FACTOR = 0.75;
const REMOTE_AIM_WEAPON_AXIS = 'y';
const REMOTE_AIM_PROXY_WEAPON_AXIS = 'y';
const REMOTE_AIM_BONE_LOCAL_AXIS = new THREE.Vector3(0, 0, 1);
const REMOTE_MIN_MOVEMENT_PLAYBACK_SCALE = 0.55;
const REMOTE_MAX_MOVEMENT_PLAYBACK_SCALE = 1.45;
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
let REMOTE_RIFLE_ASSET_PROMISE = null;
let REMOTE_BORROWED_WEAPON_ASSET_PROMISE = null;
let REMOTE_CCDIK_SOLVER_PROMISE = null;
const REMOTE_WEAPON_TEXTURE_PROMISES = new Map();
const REMOTE_ROOT_MOTION_BONE_NAMES = ['mixamorighips', 'hips', 'root', '_rootjoint', 'armature', 'bip01'];
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
const remoteTuningStore = createRemoteTuningStore({
  storageKey: REMOTE_WEAPON_TUNING_STORAGE_KEY,
  defaultSocketPoses: DEFAULT_REMOTE_SOCKET_POSES,
  defaultCharacterSettings: DEFAULT_REMOTE_CHARACTER_SETTINGS,
  defaultDebugSettings: DEFAULT_REMOTE_DEBUG_SETTINGS,
});
const { loadRemoteCharacterAsset } = createRemoteCharacterAssetLoader({
  buildRemoteCharacterAnimations: (gltfAnimations, definition, externalClipOverrides) => buildRemoteCharacterAnimations(
    gltfAnimations,
    definition,
    externalClipOverrides,
    {
      normalizeRemoteClipName,
      stripRootMotionFromClip,
      remoteFireClipName: REMOTE_CLIPS.fire,
    },
  ),
  normalizeClipStartTime,
  stripRootMotionFromClip,
});

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

function ensureRemoteWeaponTuning() {
  return remoteTuningStore.ensure();
}

function createRemoteWeaponTuningPanel() {
  return createRemoteWeaponTuningPanelUi({
    defaultSocketPoses: DEFAULT_REMOTE_SOCKET_POSES,
    defaultDebugSettings: DEFAULT_REMOTE_DEBUG_SETTINGS,
    remoteClips: REMOTE_CLIPS,
    ensureRemoteWeaponTuning,
  });
}

function getRemoteCharacterModelScale() {
  return remoteTuningStore.getCharacterModelScale();
}

function getRemoteAimSettings() {
  return remoteTuningStore.getAimSettings();
}

function getRemoteHitboxSettings() {
  return remoteTuningStore.getHitboxSettings();
}

function getRemoteDebugSettings() {
  return remoteTuningStore.getDebugSettings();
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
  return createRemoteCharacterTuningPanelUi({
    getRemoteCharacterModelScale,
    getRemoteAimSettings,
    getRemoteHitboxSettings,
    getRemoteDebugSettings,
    ensureRemoteWeaponTuning,
  });
}

async function loadRemoteIkSolver() {
  if (!REMOTE_CCDIK_SOLVER_PROMISE) {
    REMOTE_CCDIK_SOLVER_PROMISE = import('three/examples/jsm/animation/CCDIKSolver.js')
      .then((module) => module.CCDIKSolver);
  }

  return REMOTE_CCDIK_SOLVER_PROMISE;
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

function loadRemoteWeaponTexture(path) {
  if (!REMOTE_WEAPON_TEXTURE_PROMISES.has(path)) {
    const loader = new THREE.TextureLoader();
    REMOTE_WEAPON_TEXTURE_PROMISES.set(path, loader.loadAsync(path).then((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false;
      return texture;
    }));
  }
  return REMOTE_WEAPON_TEXTURE_PROMISES.get(path);
}

async function loadRemoteBorrowedWeaponAsset() {
  if (!REMOTE_BORROWED_WEAPON_ASSET_PROMISE) {
    REMOTE_BORROWED_WEAPON_ASSET_PROMISE = (async () => {
      const [{ GLTFLoader }, SkeletonUtils] = await Promise.all([
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/utils/SkeletonUtils.js'),
      ]);
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(REMOTE_BORROWED_WEAPON_MODEL_PATH);
      const textures = Object.fromEntries(await Promise.all(
        Object.entries(REMOTE_BORROWED_WEAPON_TEXTURES).map(async ([weaponKey, path]) => (
          [weaponKey, await loadRemoteWeaponTexture(path)]
        )),
      ));
      return {
        scene: gltf.scene,
        cloneSkinned: SkeletonUtils.clone,
        textures,
      };
    })();
  }

  return REMOTE_BORROWED_WEAPON_ASSET_PROMISE;
}

async function loadRemoteWeaponAsset(weaponKey) {
  if (weaponKey === 'rifle') {
    return loadRemoteRifleAsset();
  }
  if (REMOTE_BORROWED_WEAPON_DEFINITIONS[weaponKey]) {
    const baseAsset = await loadRemoteBorrowedWeaponAsset();
    return {
      ...baseAsset,
      borrowedWeaponDefinition: REMOTE_BORROWED_WEAPON_DEFINITIONS[weaponKey],
      weaponKey,
    };
  }
  return null;
}

function normalizeRemoteClipName(name) {
  return String(name ?? '')
    .split(/[|/\\]/)
    .pop()
    .trim()
    .toLowerCase();
}

function stripRootMotionFromClip(clip, options = null) {
  const preserveY = Boolean(options?.preserveY);
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
      nextValues[index + 1] = preserveY ? nextValues[index + 1] : baseY;
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

function configureRemoteBorrowedWeaponMaterials(root, weaponDefinition, weaponTexture) {
  const weaponMaterial = new THREE.MeshBasicMaterial({
    map: weaponTexture,
    side: THREE.DoubleSide,
  });

  root.traverse((object) => {
    if (!object.isSkinnedMesh) {
      return;
    }
    object.castShadow = true;
    object.receiveShadow = true;
    object.frustumCulled = false;
    object.visible = object.name === weaponDefinition.meshName;
    if (object.visible) {
      object.material = weaponMaterial;
    }
  });
}

function createRemoteBorrowedWeaponModelGroup(asset) {
  const weaponDefinition = asset.borrowedWeaponDefinition;
  const group = createRemoteWeaponGroup();
  const root = asset.cloneSkinned(asset.scene);
  const flash = group.userData.flash;
  const runtimeLeftHandGrip = group.userData.leftHandGrip;

  configureRemoteBorrowedWeaponMaterials(root, weaponDefinition, asset.textures[asset.weaponKey]);
  const rootNode = root.getObjectByName(weaponDefinition.rootNodeName);
  if (rootNode) {
    alignNodeToOrigin(root, rootNode);
  }

  root.updateMatrixWorld(true);
  REMOTE_WEAPON_BOX.setFromObject(root);
  REMOTE_WEAPON_BOX.getSize(REMOTE_WEAPON_SIZE);
  const longestDimension = Math.max(REMOTE_WEAPON_SIZE.x, REMOTE_WEAPON_SIZE.y, REMOTE_WEAPON_SIZE.z, 1e-3);
  group.userData.weaponLongestDimension = longestDimension;
  group.userData.targetLength = weaponDefinition.targetLength;
  group.add(root);

  if (weaponDefinition.hideFlash) {
    flash.visible = false;
  } else {
    flash.position.set(...weaponDefinition.muzzlePosition);
    flash.visible = false;
  }

  runtimeLeftHandGrip.visible = false;
  group.userData.leftHandGrip = runtimeLeftHandGrip;
  return group;
}

function createRemoteWeaponModelGroup(asset) {
  if (asset.borrowedWeaponDefinition) {
    return createRemoteBorrowedWeaponModelGroup(asset);
  }
  return createRemoteRifleModelGroup(asset);
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

function updateRemoteHitEllipsoidDebugMesh(debugMesh, ellipsoid) {
  if (!debugMesh || !ellipsoid?.center) {
    return;
  }

  debugMesh.position.set(
    Number(ellipsoid.center.x ?? 0),
    Number(ellipsoid.center.y ?? 0),
    Number(ellipsoid.center.z ?? 0),
  );
  debugMesh.scale.set(
    Math.max(0.001, Number(ellipsoid.size?.x ?? Number(ellipsoid.radius ?? 0.15) * 2) * 0.5),
    Math.max(0.001, Number(ellipsoid.size?.y ?? Number(ellipsoid.radius ?? 0.15) * 2) * 0.5),
    Math.max(0.001, Number(ellipsoid.size?.z ?? Number(ellipsoid.radius ?? 0.15) * 2) * 0.5),
  );

  if (ellipsoid.right && ellipsoid.up && ellipsoid.forward) {
    const basis = new THREE.Matrix4().makeBasis(
      REMOTE_FORWARD.set(ellipsoid.right.x, ellipsoid.right.y, ellipsoid.right.z),
      REMOTE_RIGHT.set(ellipsoid.up.x, ellipsoid.up.y, ellipsoid.up.z),
      REMOTE_MOVE_VECTOR.set(ellipsoid.forward.x, ellipsoid.forward.y, ellipsoid.forward.z),
    );
    debugMesh.quaternion.setFromRotationMatrix(basis);
  } else {
    debugMesh.quaternion.identity();
  }
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

function findRemoteHitBones(root, definition) {
  const skeleton = definition?.skeleton ?? {};
  return resolveRemoteHitBones(root, skeleton);
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

  updateRemoteHitEllipsoidDebugMesh(debugGroup.head, {
    center: layout.head.center,
    radius: layout.head.radius,
    size: {
      x: layout.head.radius * 2,
      y: layout.head.radius * 2,
      z: layout.head.radius * 2,
    },
  });
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

  updateRemoteHitEllipsoidDebugMesh(debugGroup.head, hitboxes.head);
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
    headSize: hitboxSettings.headSize,
    torsoRadius: hitboxSettings.torsoRadius,
    torsoLengthPadding: hitboxSettings.torsoLengthPadding,
    pelvisRadius: hitboxSettings.pelvisRadius,
    pelvisLengthPadding: hitboxSettings.pelvisLengthPadding,
    armRadius: hitboxSettings.armRadius,
    armLengthPadding: hitboxSettings.armLengthPadding,
    handRadius: hitboxSettings.handRadius,
    legRadius: hitboxSettings.legRadius,
    legLengthPadding: hitboxSettings.legLengthPadding,
  }, REMOTE_LOCAL_HITBOX_SNAPSHOT);

  return updateRemoteAuthoritativeHitVolumeDebugGroup(debugGroup, localSnapshot);
}

function pickAuditCoreSnapshot(snapshot) {
  if (!snapshot) {
    return null;
  }

  return {
    head: snapshot.head ?? null,
    torso: snapshot.torso ?? null,
    pelvis: snapshot.pelvis ?? null,
  };
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

  const hitVolumeDebugGroup = createRemoteHitVolumeDebugGroup();
  hitVolumeDebugGroup.group.visible = false;

  return {
    root,
    displayName,
    body,
    bodyCylinder,
    bodyTop,
    bodyBottom,
    weaponAnchor,
    weaponMesh: null,
    weaponKey: null,
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
    requestedCharacterDefinitionId: null,
    characterLoadRequestId: 0,
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
    team: null,
  };
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
  visual.weaponMesh = createRemoteWeaponFallback(nextWeaponKey);
  attachRemoteWeapon(visual, visual.weaponMesh);
  void loadRemoteWeaponAsset(nextWeaponKey)
    .then((asset) => {
      if (!asset || !visual.weaponMesh || visual.weaponKey !== nextWeaponKey) {
        return;
      }

      visual.weaponMesh.parent?.remove(visual.weaponMesh);
      visual.weaponMesh.userData.dispose?.();
      visual.weaponMesh = createRemoteWeaponModelGroup(asset);
      attachRemoteWeapon(visual, visual.weaponMesh);
    })
    .catch((error) => {
      console.warn(`[RemotePlayerPresenter] Failed to load remote ${nextWeaponKey} model. Keeping fallback proxy.`, error);
    });
}

function triggerRemotePlayerFireFlash(visual) {
  if (!visual) {
    return;
  }

  visual.flashTime = REMOTE_FIRE_FLASH_DURATION;
  if (visual.characterDefinition?.prefersFullBodyRifleFire && visual.weaponKey === 'rifle') {
    if (visual.presentationState === 'idle' || visual.presentationState === 'scoped-idle') {
      visual.fullBodyActionClip = REMOTE_CLIPS.fire;
      visual.fullBodyActionTime = REMOTE_FULL_BODY_FIRE_ACTION_DURATION;
      return;
    }
    return;
  }
  if (visual.characterDefinition?.prefersFullBodyPistolFire && visual.weaponKey === 'pistol') {
    if (visual.presentationState === 'idle' || visual.presentationState === 'scoped-idle') {
      visual.fullBodyActionClip = REMOTE_CLIPS.fire;
      visual.fullBodyActionTime = REMOTE_FULL_BODY_FIRE_ACTION_DURATION;
      return;
    }
  }
  playRemoteUpperBodyClip(visual, REMOTE_CLIPS.fire);
}

function stopRemoteUpperBodyActions(visual) {
  for (const action of visual.characterUpperBodyActions.values()) {
    action.stop();
    action.paused = false;
    action.setEffectiveWeight(0);
  }
  visual.activeUpperBodyClip = null;
  visual.activeUpperBodyWeight = 1;
  visual.upperBodyActionTime = 0;
}

function resetRemoteDeathPresentation(visual) {
  if (!visual) {
    return;
  }

  visual.fullBodyActionClip = null;
  visual.fullBodyActionTime = 0;
  visual.deathTransitionTime = 0;
}

function getRequestedRemoteDeathClip(player, authoritativeState) {
  const deathClip = authoritativeState?.deathClip ?? player?.deathClip ?? null;
  if (deathClip) {
    return deathClip;
  }
  return REMOTE_CLIPS.dieBackward;
}

function resolveRemoteDeathClip(visual, player, authoritativeState) {
  const preferredClip = getRequestedRemoteDeathClip(player, authoritativeState);
  if (findRemoteClipAction(visual, preferredClip)) {
    return preferredClip;
  }
  if (preferredClip !== REMOTE_CLIPS.dieBackward && findRemoteClipAction(visual, REMOTE_CLIPS.dieBackward)) {
    return REMOTE_CLIPS.dieBackward;
  }
  if (preferredClip !== REMOTE_CLIPS.dieForward && findRemoteClipAction(visual, REMOTE_CLIPS.dieForward)) {
    return REMOTE_CLIPS.dieForward;
  }
  return null;
}

function playRemoteDeathClip(visual, player, authoritativeState) {
  if (!visual) {
    return false;
  }

  const deathClip = resolveRemoteDeathClip(visual, player, authoritativeState);
  if (!deathClip) {
    return false;
  }

  stopRemoteUpperBodyActions(visual);
  visual.fullBodyActionClip = deathClip;
  visual.fullBodyActionTime = REMOTE_PERSISTENT_ACTION_TIME;
  setRemoteCharacterClip(visual, deathClip);
  return true;
}

function triggerRemotePlayerHitReaction(visual, { killed = false, player = null, authoritativeState = null } = {}) {
  if (!visual) {
    return;
  }

  visual.hitReactionTime = REMOTE_HIT_REACTION_DURATION;
  if (killed) {
    visual.deathTransitionTime = REMOTE_DEATH_TRANSITION_DURATION;
    playRemoteDeathClip(visual, player, authoritativeState);
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

  const definition = asset.definition ?? getRemoteCharacterDefinition('legacy') ?? getDefaultRemoteCharacterDefinition();
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
  const rootJoint = resolveRemoteRootJoint(characterRoot, definition.skeleton);
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
  if (!visual.hitboxAuditLogged) {
    const audit = describeRemoteHitboxAudit({
      root: rootJoint,
      bones: visual.characterHitBones,
    });
    console.info('[RemotePlayerPresenter] Hitbox audit:', audit);
    visual.hitboxAuditLogged = true;
  }
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
    if (
      normalizedName === normalizeRemoteClipName(REMOTE_CLIPS.jump)
      || normalizedName === normalizeRemoteClipName(REMOTE_CLIPS.dieForward)
      || normalizedName === normalizeRemoteClipName(REMOTE_CLIPS.dieBackward)
    ) {
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
  if (!visual) {
    return;
  }

  const requestedDefinition = getRequestedRemoteCharacterDefinition(visual.team);
  if (
    visual.characterLoadState === 'loading'
    && visual.requestedCharacterDefinitionId === requestedDefinition.id
  ) {
    return;
  }

  if (
    visual.characterLoadState === 'ready'
    && visual.characterDefinition?.id === requestedDefinition.id
  ) {
    return;
  }

  if (visual.characterLoadState === 'ready' && visual.characterDefinition?.id !== requestedDefinition.id) {
    disposeRemoteCharacterModel(visual);
  }

  const requestId = visual.characterLoadRequestId + 1;
  visual.characterLoadRequestId = requestId;
  visual.requestedCharacterDefinitionId = requestedDefinition.id;
  visual.characterLoadState = 'loading';
  void loadRemoteCharacterAsset(requestedDefinition)
    .then((asset) => {
      if (visual.characterLoadRequestId !== requestId) {
        return;
      }
      attachRemoteCharacterModel(visual, asset);
    })
    .catch((error) => {
      if (visual.characterLoadRequestId !== requestId) {
        return;
      }
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
          if (visual.characterLoadRequestId !== requestId) {
            return;
          }
          attachRemoteCharacterModel(visual, fallbackAsset);
        })
        .catch((fallbackError) => {
          if (visual.characterLoadRequestId !== requestId) {
            return;
          }
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
  const horizontalSpeed = REMOTE_MOVE_VECTOR.length();
  const weaponKey = String(authoritativeState?.activeWeaponKey ?? 'rifle');
  if (horizontalSpeed <= MOVEMENT_DIRECTION_EPSILON) {
    if (isCrouched) {
      return usesRemoteMeleeClipSet(weaponKey) ? REMOTE_CLIPS.meleeCrouchIdle : REMOTE_CLIPS.crouchIdle;
    }
    return usesRemoteMeleeClipSet(weaponKey) ? REMOTE_CLIPS.meleeIdle : REMOTE_CLIPS.idle;
  }

  const yaw = Number(authoritativeState?.yaw ?? 0);
  REMOTE_FORWARD.set(-Math.sin(yaw), 0, -Math.cos(yaw));
  REMOTE_RIGHT.set(Math.cos(yaw), 0, -Math.sin(yaw));

  const forwardAmount = REMOTE_MOVE_VECTOR.dot(REMOTE_FORWARD);
  const strafeAmount = REMOTE_MOVE_VECTOR.dot(REMOTE_RIGHT);

  if (isCrouched) {
    if (usesRemoteMeleeClipSet(weaponKey)) {
      return REMOTE_CLIPS.meleeCrouchWalk;
    }
    if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
      return forwardAmount >= 0 ? REMOTE_CLIPS.crouchWalk : REMOTE_CLIPS.crouchBackward;
    }

    return REMOTE_CLIPS.crouchWalk;
  }

  if (usesRemoteMeleeClipSet(weaponKey)) {
    if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
      if (forwardAmount >= 0) {
        return shouldUseRemoteWalkClip(weaponKey, horizontalSpeed)
          ? REMOTE_CLIPS.meleeWalkForward
          : REMOTE_CLIPS.meleeRunForward;
      }
      return REMOTE_CLIPS.meleeWalkBackward;
    }

    return strafeAmount >= 0 ? REMOTE_CLIPS.meleeStrafeRight : REMOTE_CLIPS.meleeStrafeLeft;
  }

  if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
    if (shouldUseRemoteWalkClip(weaponKey, horizontalSpeed)) {
      return forwardAmount >= 0 ? REMOTE_CLIPS.walkForward : REMOTE_CLIPS.walkBackward;
    }
    return forwardAmount >= 0 ? REMOTE_CLIPS.runForward : REMOTE_CLIPS.runBackward;
  }

  return strafeAmount >= 0 ? REMOTE_CLIPS.strafeRight : REMOTE_CLIPS.strafeLeft;
}

function getCharacterWeaponPose(weaponKey, isScoped) {
  if (weaponKey === 'pistol') {
    return isScoped
      ? { position: [0.01, 0.18, -0.08], rotation: [0.02, -0.18, -0.02], scale: 0.88 }
      : { position: [0.04, 0.14, -0.04], rotation: [0.08, -0.12, -0.08], scale: 0.9 };
  }

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
  const weaponKey = String(authoritativeState?.activeWeaponKey ?? 'rifle');
  return presentationState === 'air'
    ? (usesRemoteMeleeClipSet(weaponKey) ? REMOTE_CLIPS.meleeJump : REMOTE_CLIPS.jump)
    : selectMovementClip(authoritativeState, presentationState);
}

function getRemoteMovementPlaybackScale(authoritativeState, targetClip) {
  const velocity = authoritativeState?.velocity ?? null;
  if (!velocity) {
    return 1;
  }

  const horizontalSpeed = Math.hypot(
    Number(velocity.x ?? 0),
    Number(velocity.z ?? 0),
  );
  if (horizontalSpeed <= MOVEMENT_DIRECTION_EPSILON) {
    return 1;
  }

  const weaponKey = String(authoritativeState?.activeWeaponKey ?? 'rifle');
  const baselineSpeeds = getRemoteMovementClipBaselineSpeeds(weaponKey);
  const crouchClip = [
    REMOTE_CLIPS.crouchWalk,
    REMOTE_CLIPS.crouchBackward,
    REMOTE_CLIPS.meleeCrouchWalk,
  ].includes(targetClip);
  const walkClip = [
    REMOTE_CLIPS.walkForward,
    REMOTE_CLIPS.walkBackward,
    REMOTE_CLIPS.meleeWalkForward,
    REMOTE_CLIPS.meleeWalkBackward,
  ].includes(targetClip);
  const baselineSpeed = crouchClip
    ? baselineSpeeds.crouchSpeed
    : (walkClip ? baselineSpeeds.walkSpeed : baselineSpeeds.fullSpeed);
  if (!Number.isFinite(baselineSpeed) || baselineSpeed <= 0) {
    return 1;
  }

  return THREE.MathUtils.clamp(
    horizontalSpeed / baselineSpeed,
    REMOTE_MIN_MOVEMENT_PLAYBACK_SCALE,
    REMOTE_MAX_MOVEMENT_PLAYBACK_SCALE,
  );
}

function updateClipPlaybackParameters(visual, authoritativeState, targetClip) {
  const clipSettings = visual.characterDefinition?.clips ?? null;
  for (const action of visual.characterActions.values()) {
    action.paused = false;
    action.setEffectiveTimeScale(1);
  }

  const targetClipSettings = clipSettings?.[targetClip] ?? null;
  const targetAction = findRemoteClipAction(visual, targetClip);
  const movementPlaybackScale = getRemoteMovementPlaybackScale(authoritativeState, targetClip);
  if (targetAction && Number.isFinite(targetClipSettings?.playbackSpeed)) {
    targetAction.setEffectiveTimeScale(targetClipSettings.playbackSpeed * movementPlaybackScale);
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
  if (!previousAlive && isAlive) {
    resetRemoteDeathPresentation(visual);
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
  const deathClip = !isAlive ? resolveRemoteDeathClip(visual, player, authoritativeState) : null;
  if (!isAlive && deathClip && visual.fullBodyActionClip !== normalizeRemoteClipName(deathClip)) {
    playRemoteDeathClip(visual, player, authoritativeState);
  }
  const deathAlpha = isAlive
    ? 0
    : 1 - Math.max(0, Math.min(1, visual.deathTransitionTime / REMOTE_DEATH_TRANSITION_DURATION));
  const forwardFlinch = hitAlpha * 0.045;
  const sideFlinch = hitAlpha * 0.02;
  const deathLean = deathClip ? 0 : deathAlpha * 0.92;

  visual.root.rotation.set(
    -forwardFlinch + deathLean * 0.28,
    player.yaw,
    -sideFlinch + deathLean,
  );
  visual.root.position.y += hitAlpha * 0.01;

  visual.body.position.y = height * 0.5;
  visual.bodyCylinder.scale.y = cylinderHeight;
  visual.bodyTop.position.y = cylinderHeight * 0.5;
  visual.bodyBottom.position.y = -cylinderHeight * 0.5;
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
  visual.weaponAnchor.visible = true;
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
      updateClipPlaybackParameters(visual, authoritativeState, targetClip);
      updateRemoteUpperBodyAction(visual, delta);
      visual.characterMixer.update(delta);
      captureRemoteAimBoneBasePose(visual);
    }
    if (visual.characterRoot) {
      const currentModelScaleSetting = getRemoteCharacterModelScale();
      const modelScale = visual.characterScaleBase * currentModelScaleSetting;
      const positionScaleRatio = currentModelScaleSetting / Math.max(visual.characterModelScaleAtAttach, 1e-6);
      visual.characterRoot.visible = true;
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
    visual.weaponMesh.visible = true;
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
      const targetLength = Number(visual.weaponMesh.userData.targetLength ?? 0);
      const normalizedWeaponScale = targetLength > 0
        ? (targetLength / Math.max(visual.weaponMesh.userData.weaponLongestDimension ?? 1, 1e-3)) / inheritedAnchorScale
        : null;
      const weaponScale = visual.weaponKey === 'rifle'
        ? normalizedRifleScale * Math.max(0.001, Number(pose.scale ?? 1))
        : normalizedWeaponScale
          ? normalizedWeaponScale * Math.max(0.001, Number(pose.scale ?? 1))
          : pose.scale;
      visual.weaponMesh.position.set(...pose.position);
      visual.weaponMesh.rotation.set(...pose.rotation);
      visual.weaponMesh.scale.setScalar(weaponScale);
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
}

export class RemotePlayerPresenter {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.effectsManager = options.effectsManager ?? null;
    this.localPlayerId = options.localPlayerId ?? null;
    this.sendHitboxAudit = typeof options.sendHitboxAudit === 'function'
      ? options.sendHitboxAudit
      : null;
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
      if (this.effectsManager && event?.playerId !== this.localPlayerId && event?.origin && event?.tracerEnd) {
        const origin = new THREE.Vector3(
          Number(event.origin.x ?? 0),
          Number(event.origin.y ?? 0),
          Number(event.origin.z ?? 0),
        );
        const tracerEnd = new THREE.Vector3(
          Number(event.tracerEnd.x ?? 0),
          Number(event.tracerEnd.y ?? 0),
          Number(event.tracerEnd.z ?? 0),
        );
        if (Boolean(event.impact)) {
          this.effectsManager.addTracerImpact(origin, tracerEnd);
        } else {
          this.effectsManager.addMissTracer(origin, tracerEnd);
        }
      }
      return;
    }

    if (event?.type === 'player-hit') {
      const victimVisual = this.remotePlayerMeshes.get(event.victimPlayerId);
      if (victimVisual) {
        triggerRemotePlayerHitReaction(victimVisual, {
          killed: Boolean(event.killed),
          authoritativeState: event.killed ? { deathClip: event.deathClip } : null,
        });
      }
      return;
    }

    if (event?.type === 'player-respawned') {
      const visual = this.remotePlayerMeshes.get(event.playerId);
      if (visual) {
        resetRemoteDeathPresentation(visual);
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
          team: authoritativeState.team,
          activeWeaponKey: authoritativeState.activeWeaponKey,
          isScoped: authoritativeState.isScoped,
          presentationState: authoritativeState.presentationState,
          isAlive: authoritativeState.isAlive,
        }
        : player;
      visual.team = renderPlayer.team ?? authoritativeState?.team ?? null;
      ensureRemoteCharacterModel(visual);
      setRemotePlayerWeapon(visual, authoritativeState?.activeWeaponKey ?? renderPlayer.activeWeaponKey);
      updateRemotePlayerVisual(visual, renderPlayer, delta, authoritativeState, {
        alive: this.remotePlayerMaterial,
        dead: this.remotePlayerDeadMaterial,
      });
      this.maybeSendHitboxAudit(visual, renderPlayer, authoritativeState);
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

  setEffectsManager(effectsManager) {
    this.effectsManager = effectsManager ?? null;
  }

  setLocalPlayerId(playerId) {
    this.localPlayerId = playerId ? String(playerId) : null;
  }

  maybeSendHitboxAudit(visual, renderPlayer, authoritativeState) {
    if (!this.showHitVolumeDebug || !this.sendHitboxAudit || !visual?.characterHitBones || !authoritativeState?.hitboxDebug) {
      return;
    }

    const now = Date.now();
    if (now - (visual.lastSentHitboxAuditAt ?? 0) < 750) {
      return;
    }

    for (const [key, point] of Object.entries(REMOTE_LOCAL_HITBOX_POINTS)) {
      const bone = visual.characterHitBones[key];
      if (!bone?.getWorldPosition) {
        continue;
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
      headSize: hitboxSettings.headSize,
      torsoRadius: hitboxSettings.torsoRadius,
      torsoLengthPadding: hitboxSettings.torsoLengthPadding,
      pelvisRadius: hitboxSettings.pelvisRadius,
      pelvisLengthPadding: hitboxSettings.pelvisLengthPadding,
      armRadius: hitboxSettings.armRadius,
      armLengthPadding: hitboxSettings.armLengthPadding,
      handRadius: hitboxSettings.handRadius,
      legRadius: hitboxSettings.legRadius,
      legLengthPadding: hitboxSettings.legLengthPadding,
    }, createRemoteHitboxSnapshot());

    const signature = JSON.stringify({
      playerId: renderPlayer?.playerId,
      activeClip: authoritativeState.hitboxDebug.activeClip,
      clipTime: Number(authoritativeState.hitboxDebug.clipTime ?? 0).toFixed(3),
      position: authoritativeState.position,
      localHead: localSnapshot?.head?.center ?? null,
      serverHead: authoritativeState.hitboxes?.head?.center ?? null,
    });
    if (visual.lastSentHitboxAuditSignature === signature) {
      return;
    }
    visual.lastSentHitboxAuditAt = now;
    visual.lastSentHitboxAuditSignature = signature;

    const visiblePoints = {};
    for (const [key, bone] of Object.entries(visual.characterHitBones)) {
      if (!bone?.getWorldPosition) {
        visiblePoints[key] = null;
        continue;
      }
      bone.getWorldPosition(REMOTE_HITBOX_WORLD_POINT_A);
      visiblePoints[key] = {
        x: REMOTE_HITBOX_WORLD_POINT_A.x,
        y: REMOTE_HITBOX_WORLD_POINT_A.y,
        z: REMOTE_HITBOX_WORLD_POINT_A.z,
      };
    }

    const activeClientAction = visual.activeCharacterClip
      ? findRemoteClipAction(visual, visual.activeCharacterClip)
      : null;

    this.sendHitboxAudit({
      capturedAt: Date.now(),
      playerId: renderPlayer?.playerId ?? authoritativeState.playerId ?? null,
      renderPlayer: {
        position: renderPlayer?.position ?? null,
        yaw: renderPlayer?.yaw ?? null,
        pitch: renderPlayer?.pitch ?? null,
        currentHeight: renderPlayer?.currentHeight ?? null,
        presentationState: renderPlayer?.presentationState ?? null,
      },
      authoritativeState: {
        position: authoritativeState.position,
        yaw: authoritativeState.yaw,
        pitch: authoritativeState.pitch,
        currentHeight: authoritativeState.currentHeight,
        presentationState: authoritativeState.presentationState,
        hitboxes: authoritativeState.hitboxes ?? null,
        hitboxDebug: authoritativeState.hitboxDebug ?? null,
      },
      clientAnimationDebug: {
        activeClip: visual.activeCharacterClip ?? null,
        clipTime: activeClientAction ? Number(activeClientAction.time ?? 0) : null,
        clipPlaybackSpeed: activeClientAction
          ? Number(activeClientAction.getEffectiveTimeScale?.() ?? 1)
          : null,
      },
      clientVisibleBones: {
        head: visiblePoints.head ?? null,
        neck: visiblePoints.neck ?? null,
        spine: visiblePoints.spine ?? null,
        pelvis: visiblePoints.pelvis ?? null,
      },
      clientLocalSnapshot: pickAuditCoreSnapshot(localSnapshot),
    });
  }
}
