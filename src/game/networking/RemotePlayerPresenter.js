import * as THREE from 'three';
import {
  interpolateRemoteHitboxSnapshots,
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
  REMOTE_AIM_BONE_SPECS,
  REMOTE_CLIPS,
  usesRemoteMeleeClipSet,
} from '../../shared/remoteCharacterConfig.js';
import {
  getTimelineNow,
} from '../../shared/remoteTimeline.js';
import { isPlayerPresentationCrouched } from '../../shared/playerMovement.js';
import {
  clearRemoteIdleEntryState,
  resolveRemoteIdleEntryTarget,
} from '../../shared/remotePoseState.js';
import {
  createRemoteClipTransitionState,
  REMOTE_FULL_BODY_FIRE_ACTION_DURATION,
  REMOTE_PERSISTENT_ACTION_TIME,
  REMOTE_UPPER_BODY_ACTION_DURATION,
  shouldLockRemoteFireBaseClip,
  stepRemoteClipTransitionState,
} from '../../shared/remotePosePlayback.js';
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
import {
  collectRemoteHitboxDebugState,
  createRemoteDebugAttachments,
  DEFAULT_REMOTE_HITBOX_DEBUG_SETTINGS,
  syncRemoteHitboxDebug,
} from './remoteHitboxDebug.js';
import { maybeSendRemoteHitboxAudit } from './remoteHitboxAudit.js';
import {
  getRemoteMovementPlaybackScale,
  resolveRemoteDeathClip as resolveRemoteDeathClipPolicy,
  selectTargetClip,
} from './remoteAnimationPolicy.js';
import {
  findRemoteClipAction,
  freezeRemoteCharacterClip,
  normalizeRemoteClipName,
  setRemoteCharacterClip,
  updateRemoteFullBodyAction,
  updateRemoteUpperBodyAction,
} from './remoteAnimationPlayback.js';
import {
  triggerRemotePlayerFireFlash,
  triggerRemotePlayerHitReaction,
} from './remoteAnimationEffects.js';
import {
  playRemoteDeathClip,
  resetRemoteDeathPresentation,
} from './remoteAnimationDeath.js';
import {
  applyRemoteAimPitch,
  applyRemoteCharacterPresentation,
  applyRemoteWeaponPresentation,
} from './remoteAnimationPresentation.js';

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
const NORMALIZED_REMOTE_CLIPS = Object.fromEntries(
  Object.entries(REMOTE_CLIPS).map(([key, value]) => [key, normalizeRemoteClipName(value)]),
);
const REMOTE_JUMP_TIME_SCALE = 0.76;
const REMOTE_JUMP_END_HOLD_RATIO = 0.58;
const REMOTE_RIFLE_TARGET_LENGTH = 0.82;
const REMOTE_WEAPON_TUNING_STORAGE_KEY = 'remoteWeaponTuning.v3';
const REMOTE_IDLE_ENTRY_DELAY = 0.1;
const REMOTE_IK_BLEND_FACTOR = 0.9;
const REMOTE_IK_ITERATIONS = 2;
const REMOTE_WEAPON_ROTATION_ORDER = 'XZY';
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
const REMOTE_IK_TARGET_WORLD = new THREE.Vector3();
const REMOTE_IK_TARGET_LOCAL = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_START = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_END = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_CENTER = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_DIRECTION = new THREE.Vector3();
const REMOTE_HITBOX_UP_AXIS = new THREE.Vector3(0, 1, 0);
const REMOTE_HITBOX_WORLD_POINT_B = new THREE.Vector3();
const REMOTE_TRACER_ORIGIN = new THREE.Vector3();
const REMOTE_BLOOD_ORIGIN = new THREE.Vector3();
const REMOTE_BLOOD_OUTWARD = new THREE.Vector3();
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

function findRemoteHitBones(root, definition) {
  const skeleton = definition?.skeleton ?? {};
  return resolveRemoteHitBones(root, skeleton);
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

  const debugAttachments = createRemoteDebugAttachments();

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
    ...debugAttachments,
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
    clipTransition: createRemoteClipTransitionState(),
    idleEntryCandidateClip: null,
    idleEntryElapsed: 0,
    lastNonIdleBaseClip: null,
    lastRawCrouchState: null,
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

function clearRemoteIdleEntryCarryover(visual) {
  const resetState = clearRemoteIdleEntryState();
  visual.idleEntryCandidateClip = resetState.idleEntryCandidateClip;
  visual.idleEntryElapsed = resetState.idleEntryElapsed;
  visual.lastNonIdleBaseClip = resetState.lastNonIdleClip;
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

  const previousWeaponKey = visual.weaponKey || 'rifle';
  const crossesMeleeLocomotionBoundary = usesRemoteMeleeClipSet(previousWeaponKey)
    !== usesRemoteMeleeClipSet(nextWeaponKey);
  if (crossesMeleeLocomotionBoundary) {
    clearRemoteIdleEntryCarryover(visual);
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

function resolveBaseClipWithIdleEntryDelay(visual, targetClip, delta) {
  const resolved = resolveRemoteIdleEntryTarget({
    targetClip: normalizeRemoteClipName(targetClip),
    idleEntryCandidateClip: visual.idleEntryCandidateClip,
    idleEntryElapsed: visual.idleEntryElapsed,
    lastNonIdleClip: visual.lastNonIdleBaseClip,
    delta,
    idleEntryDelay: REMOTE_IDLE_ENTRY_DELAY,
    clips: NORMALIZED_REMOTE_CLIPS,
  });
  visual.idleEntryCandidateClip = resolved.idleEntryCandidateClip;
  visual.idleEntryElapsed = resolved.idleEntryElapsed;
  visual.lastNonIdleBaseClip = resolved.lastNonIdleClip;
  return resolved.resolvedClip;
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
  visual.clipTransition = createRemoteClipTransitionState();
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

function updateRemoteDamageTimers(visual, delta) {
  if (visual.hitReactionTime > 0) {
    visual.hitReactionTime = Math.max(0, visual.hitReactionTime - delta);
  }
  if (visual.deathTransitionTime > 0) {
    visual.deathTransitionTime = Math.max(0, visual.deathTransitionTime - delta);
  }
}

function updateRemoteBodyAndAnchorPresentation(visual, {
  height,
  cylinderHeight,
  isScopedStance,
  isCrouched,
} = {}) {
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
}

function updateRemoteAnimationPresentation(visual, {
  delta,
  authoritativeState,
  presentationState,
  isAlive,
} = {}) {
  if (!visual.characterMixer) {
    return;
  }

  const debugSettings = getRemoteDebugSettings();
  const rawCrouchState = Boolean(authoritativeState?.isCrouched);
  if (visual.lastRawCrouchState !== null && visual.lastRawCrouchState !== rawCrouchState) {
    clearRemoteIdleEntryCarryover(visual);
  }
  visual.lastRawCrouchState = rawCrouchState;
  const targetClip = debugSettings.freezePose
    ? debugSettings.freezeClip
    : selectTargetClip(authoritativeState, presentationState);
  if (debugSettings.freezePose) {
    stepRemoteClipTransitionState(visual.clipTransition, {
      nextClip: normalizeRemoteClipName(targetClip),
      currentClip: visual.activeCharacterClip,
      delta: 0,
    });
    visual.animationDebugState = {
      presentationState,
      targetClip,
      baseClip: targetClip,
      activeCharacterClip: visual.activeCharacterClip ?? null,
      activeUpperBodyClip: visual.activeUpperBodyClip ?? null,
      fullBodyActionClip: visual.fullBodyActionClip ?? null,
      upperBodyActionTime: Number(visual.upperBodyActionTime ?? 0),
      fullBodyActionTime: Number(visual.fullBodyActionTime ?? 0),
      fireBaseLocked: false,
      clipTransition: {
        ...visual.clipTransition,
      },
      freezePose: true,
    };
    freezeRemoteCharacterClip(visual, targetClip, {
      captureAimBoneBasePose: captureRemoteAimBoneBasePose,
    });
  } else {
    const fullBodyActionClip = updateRemoteFullBodyAction(visual, delta);
    const delayedBaseTargetClip = resolveBaseClipWithIdleEntryDelay(visual, targetClip, delta);
    const fireBaseLocked = shouldLockRemoteFireBaseClip({
      characterDefinition: visual.characterDefinition,
      weaponKey: visual.weaponKey,
      targetClip: delayedBaseTargetClip,
      activeUpperBodyClip: visual.activeUpperBodyClip,
      upperBodyActionTime: visual.upperBodyActionTime,
      clips: REMOTE_CLIPS,
    });
    const baseClip = fireBaseLocked
      ? REMOTE_CLIPS.fire
      : delayedBaseTargetClip;
    const resolvedPresentationClip = fullBodyActionClip ?? baseClip;
    stepRemoteClipTransitionState(visual.clipTransition, {
      nextClip: normalizeRemoteClipName(resolvedPresentationClip),
      currentClip: visual.activeCharacterClip,
      delta,
    });
    setRemoteCharacterClip(visual, resolvedPresentationClip, {
      clipFadeDuration: visual.clipTransition.duration,
    });
    updateClipPlaybackParameters(visual, authoritativeState, targetClip);
    updateRemoteUpperBodyAction(visual, delta);
    visual.characterMixer.update(delta);
    captureRemoteAimBoneBasePose(visual);
    visual.animationDebugState = {
      presentationState,
      targetClip,
      baseClip,
      activeCharacterClip: visual.activeCharacterClip ?? null,
      activeUpperBodyClip: visual.activeUpperBodyClip ?? null,
      fullBodyActionClip: visual.fullBodyActionClip ?? null,
      upperBodyActionTime: Number(visual.upperBodyActionTime ?? 0),
      fullBodyActionTime: Number(visual.fullBodyActionTime ?? 0),
      fireBaseLocked,
      clipTransition: {
        ...visual.clipTransition,
      },
      freezePose: false,
    };
  }

  applyRemoteCharacterPresentation(visual, {
    isAlive,
    getRemoteCharacterModelScale,
  });
}

function updateRemoteFireFlashPresentation(visual, delta) {
  if (visual.flashTime > 0) {
    visual.flashTime = Math.max(0, visual.flashTime - delta);
  }
  const flash = visual.weaponMesh?.userData?.flash ?? null;
  if (!flash) {
    return;
  }

  const normalizedFlash = Math.max(0, Math.min(1, visual.flashTime / REMOTE_FIRE_FLASH_DURATION));
  flash.visible = normalizedFlash > 0.01;
  flash.material.opacity = normalizedFlash * 0.95;
  flash.scale.setScalar(0.6 + (1 - normalizedFlash) * 0.65);
}

function updateRemotePlayerVisual(visual, player, delta, authoritativeState, bodyMaterials) {
  const height = Math.max(
    0.8,
    Number(player.currentHeight ?? authoritativeState?.currentHeight ?? REMOTE_PLAYER_STAND_HEIGHT),
  );
  const isAlive = authoritativeState?.isAlive !== false;
  const isCrouched = isPlayerPresentationCrouched({
    currentHeight: player.currentHeight ?? authoritativeState?.currentHeight,
  });
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
  updateRemoteDamageTimers(visual, delta);

  const hitAlpha = Math.max(0, Math.min(1, visual.hitReactionTime / REMOTE_HIT_REACTION_DURATION));
  const deathClip = !isAlive
    ? resolveRemoteDeathClipPolicy(visual, player, authoritativeState, findRemoteClipAction)
    : null;
  if (!isAlive && deathClip && visual.fullBodyActionClip !== normalizeRemoteClipName(deathClip)) {
    playRemoteDeathClip(visual, player, authoritativeState, {
      persistentActionTime: REMOTE_PERSISTENT_ACTION_TIME,
      resolveRemoteDeathClip: (deathVisual, deathPlayer, deathAuthoritativeState) => resolveRemoteDeathClipPolicy(
        deathVisual,
        deathPlayer,
        deathAuthoritativeState,
        findRemoteClipAction,
      ),
    });
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

  updateRemoteBodyAndAnchorPresentation(visual, {
    height,
    cylinderHeight,
    isScopedStance,
    isCrouched,
  });
  updateRemoteAnimationPresentation(visual, {
    delta,
    authoritativeState,
    presentationState,
    isAlive,
  });

  applyRemoteAimPitch(visual, aimPitch, {
    presentationState,
    targetClip: visual.activeCharacterClip,
    getRemoteAimSettings,
  });
  applyRemoteWeaponPresentation(visual, {
    isScopedStance,
    rifleTargetLength: REMOTE_RIFLE_TARGET_LENGTH,
    ensureRemoteWeaponTuning,
  });

  updateRemoteLeftHandIk(visual);
  updateRemoteFireFlashPresentation(visual, delta);
}

function disposeRemotePlayerVisual(visual) {
  visual.weaponMesh?.parent?.remove(visual.weaponMesh);
  visual.weaponMesh?.userData.dispose?.();
  disposeRemoteCharacterModel(visual);
  visual.hitVolumeDebugGroup?.group?.traverse((child) => {
    child.geometry?.dispose?.();
    child.material?.dispose?.();
  });
  visual.positionDebugGroup?.group?.traverse((child) => {
    child.geometry?.dispose?.();
    child.material?.dispose?.();
  });
  visual.rewoundHitVolumeDebugGroup?.group?.traverse((child) => {
    child.geometry?.dispose?.();
    child.material?.dispose?.();
  });
  visual.rewoundPositionDebugGroup?.group?.traverse((child) => {
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
    this.hitboxDebugSettings = { ...DEFAULT_REMOTE_HITBOX_DEBUG_SETTINGS };
    this.showHitVolumeDebug = this.hitboxDebugSettings.enabled;
    this.spectatorTargetPlayerId = null;
    this.debugPingRoundTripMs = 0;
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
        triggerRemotePlayerFireFlash(visual, {
          fireFlashDuration: REMOTE_FIRE_FLASH_DURATION,
          fullBodyFireActionDuration: REMOTE_FULL_BODY_FIRE_ACTION_DURATION,
          captureAimBoneBasePose: captureRemoteAimBoneBasePose,
        });
      }
      if (this.effectsManager && event?.playerId !== this.localPlayerId && event?.origin && event?.tracerEnd) {
        const flash = visual?.weaponMesh?.userData?.flash ?? null;
        const preferAuthoritativeOrigin = this.spectatorTargetPlayerId != null
          && String(event.playerId ?? '') === String(this.spectatorTargetPlayerId);
        const origin = !preferAuthoritativeOrigin && flash
          ? flash.getWorldPosition(REMOTE_TRACER_ORIGIN).clone()
          : new THREE.Vector3(
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
          hitReactionDuration: REMOTE_HIT_REACTION_DURATION,
          deathTransitionDuration: REMOTE_DEATH_TRANSITION_DURATION,
          playRemoteDeathClip,
          authoritativeState: event.killed ? { deathClip: event.deathClip } : null,
        });
        if (this.effectsManager) {
          const hitPosition = event?.hitPosition;
          REMOTE_BLOOD_ORIGIN.set(
            hitPosition ? Number(hitPosition.x ?? 0) : Number(victimVisual.root?.position.x ?? 0),
            hitPosition ? Number(hitPosition.y ?? 0) : (Number(victimVisual.root?.position.y ?? 0) + Number(victimVisual.currentHeight ?? 1.72) * 0.62),
            hitPosition ? Number(hitPosition.z ?? 0) : Number(victimVisual.root?.position.z ?? 0),
          );

          const hitDirection = event?.hitDirection;
          REMOTE_BLOOD_OUTWARD.set(
            hitDirection ? -Number(hitDirection.x ?? 0) : 0,
            hitDirection ? -Number(hitDirection.y ?? 0) : 0.08,
            hitDirection ? -Number(hitDirection.z ?? 0) : 0.18,
          );
          if (REMOTE_BLOOD_OUTWARD.lengthSq() <= 1e-6) {
            REMOTE_BLOOD_OUTWARD.set(0, 0.12, 0.18);
          } else {
            REMOTE_BLOOD_OUTWARD.normalize();
          }
          REMOTE_BLOOD_ORIGIN.addScaledVector(REMOTE_BLOOD_OUTWARD, 0.16);
          this.effectsManager.addBloodBurst(REMOTE_BLOOD_ORIGIN, REMOTE_BLOOD_OUTWARD);
        }
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
    this.hitboxDebugSettings.enabled = this.showHitVolumeDebug;
    for (const visual of this.remotePlayerMeshes.values()) {
      visual.showHitVolumeDebug = this.showHitVolumeDebug;
      visual.hitVolumeDebugGroup.group.visible = this.showHitVolumeDebug;
      visual.positionDebugGroup.group.visible = this.showHitVolumeDebug;
      visual.rewoundHitVolumeDebugGroup.group.visible = this.showHitVolumeDebug;
      visual.rewoundPositionDebugGroup.group.visible = this.showHitVolumeDebug;
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
        this.scene.add(visual.positionDebugGroup.group);
        this.scene.add(visual.rewoundHitVolumeDebugGroup.group);
        this.scene.add(visual.rewoundPositionDebugGroup.group);
        visual.showHitVolumeDebug = this.showHitVolumeDebug;
        visual.hitVolumeDebugGroup.group.visible = this.showHitVolumeDebug;
        visual.positionDebugGroup.group.visible = this.showHitVolumeDebug;
        visual.rewoundHitVolumeDebugGroup.group.visible = this.showHitVolumeDebug;
        visual.rewoundPositionDebugGroup.group.visible = this.showHitVolumeDebug;
        ensureRemoteCharacterModel(visual);
      }

      const authoritativeSnapshots = authoritativeBuffers.get(player.playerId) ?? [];
      const authoritativeState = authoritativeSnapshots.at?.(-1) ?? null;
      const renderPlayer = player;
      visual.team = renderPlayer.team ?? authoritativeState?.team ?? null;
      ensureRemoteCharacterModel(visual);
      setRemotePlayerWeapon(visual, authoritativeState?.activeWeaponKey ?? renderPlayer.activeWeaponKey);
      updateRemotePlayerVisual(visual, renderPlayer, delta, authoritativeState, {
        alive: this.remotePlayerMaterial,
        dead: this.remotePlayerDeadMaterial,
      });
      const hideForSpectator = this.spectatorTargetPlayerId != null && player.playerId === this.spectatorTargetPlayerId;
      visual.root.visible = !hideForSpectator;
      const debugSettings = getRemoteDebugSettings();
      const hitboxSettings = getRemoteHitboxSettings();
      syncRemoteHitboxDebug({
        visual,
        player,
        authoritativeSnapshots,
        authoritativeState,
        showHitVolumeDebug: this.showHitVolumeDebug,
        hitboxDebugSettings: this.hitboxDebugSettings,
        hideForSpectator,
        debugPingRoundTripMs: this.debugPingRoundTripMs,
        localHitboxDebugEnabled: Boolean(debugSettings.localHitboxDebug),
        localHitboxSettings: {
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
        },
        standHeight: REMOTE_PLAYER_STAND_HEIGHT,
      });
      maybeSendRemoteHitboxAudit({
        showHitVolumeDebug: this.showHitVolumeDebug,
        sendHitboxAudit: this.sendHitboxAudit,
        visual,
        renderPlayer,
        authoritativeState,
        hitboxSettings,
        findClipAction: findRemoteClipAction,
      });
    }

    for (const [playerId, visual] of this.remotePlayerMeshes) {
      if (activeIds.has(playerId)) {
        continue;
      }

      this.scene.remove(visual.root);
      this.scene.remove(visual.hitVolumeDebugGroup.group);
      this.scene.remove(visual.positionDebugGroup.group);
      this.scene.remove(visual.rewoundHitVolumeDebugGroup.group);
      this.scene.remove(visual.rewoundPositionDebugGroup.group);
      disposeRemotePlayerVisual(visual);
      this.remotePlayerMeshes.delete(playerId);
    }
  }

  clear() {
    for (const visual of this.remotePlayerMeshes.values()) {
      this.scene.remove(visual.root);
      this.scene.remove(visual.hitVolumeDebugGroup.group);
      this.scene.remove(visual.positionDebugGroup.group);
      this.scene.remove(visual.rewoundHitVolumeDebugGroup.group);
      this.scene.remove(visual.rewoundPositionDebugGroup.group);
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

  setSpectatorTargetPlayerId(playerId) {
    this.spectatorTargetPlayerId = playerId ? String(playerId) : null;
  }

  setLagCompensationDebug({ pingRoundTripMs = 0 } = {}) {
    this.debugPingRoundTripMs = Math.max(0, Number(pingRoundTripMs ?? 0));
  }

  getHitboxDebugSettings() {
    return { ...this.hitboxDebugSettings };
  }

  setHitboxDebugEnabled(enabled) {
    this.showHitVolumeDebug = Boolean(enabled);
    this.hitboxDebugSettings.enabled = this.showHitVolumeDebug;
  }

  setHitboxDebugSetting(key, value) {
    if (!(key in this.hitboxDebugSettings)) {
      return;
    }
    this.hitboxDebugSettings[key] = Boolean(value);
    if (key === 'enabled') {
      this.showHitVolumeDebug = this.hitboxDebugSettings.enabled;
    }
  }

  getDebugState() {
    return collectRemoteHitboxDebugState(
      this.remotePlayerMeshes,
      this.showHitVolumeDebug,
      this.hitboxDebugSettings,
    );
  }
}
