import fs from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import {
  DEFAULT_REMOTE_SOCKET_POSES,
  REMOTE_CHARACTER_AIM_SETTINGS,
  REMOTE_CHARACTER_MODEL_SCALE,
  REMOTE_AIM_BONE_SIGN,
  REMOTE_AIM_BONE_SPECS,
  REMOTE_AIM_CLIP_FACTORS,
  REMOTE_AIM_PITCH_MAX,
  REMOTE_AIM_PITCH_MIN,
  REMOTE_AIM_STATE_FACTORS,
  REMOTE_EXPERIMENTAL_SKELETON,
  getRemoteSocketPoseKey,
} from '../../src/shared/remoteCharacterConfig.js';
import {
  createRemoteHitboxPointCache,
} from '../../src/shared/remoteHitboxes.js';

const REMOTE_PLAYER_STAND_HEIGHT = 1.72;
const REMOTE_MODEL_URL = new URL('../../public/models/players/newtest.glb', import.meta.url);
const REMOTE_ANIMATION_ROOT_URL = new URL('../../public/models/players/animations/', import.meta.url);
const REMOTE_RIFLE_MODEL_URL = new URL('../../public/models/weapons/newak.glb', import.meta.url);
const REMOTE_FIRE_ACTION_DURATION = 0.18;
const MOVEMENT_DIRECTION_EPSILON = 0.08;
const REMOTE_AIM_BONE_AXIS = new THREE.Vector3(0, 0, 1);
const REMOTE_AIM_BONE_QUATERNION = new THREE.Quaternion();
const TMP_CAPTURE_POINT = new THREE.Vector3();
const REMOTE_WEAPON_ROTATION_ORDER = 'XZY';
const REMOTE_JUMP_TIME_SCALE = 0.76;
const REMOTE_JUMP_END_HOLD_RATIO = 0.58;
const REMOTE_USE_LEFT_HAND_IK = false;

const CLIPS = {
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

const CLIP_DEFS = {
  idle: { type: 'external', path: 'newtest_idle.fbx' },
  run: { type: 'external', path: 'newtest_run.fbx', playbackSpeed: 1.05 },
  'run back': { type: 'external', path: 'newtest_run_back.fbx', playbackSpeed: 1.9 },
  'strafe left': { type: 'external', path: 'newtest_strafe_left.fbx', playbackSpeed: 1.8 },
  'strafe right': { type: 'external', path: 'newtest_strafe_right.fbx', playbackSpeed: 1.8 },
  'crouch walk': { type: 'external', path: 'newtest_crouch_walk.fbx', playbackSpeed: 1.55 },
  'crouch idle': { type: 'external', path: 'newtest_crouch_idle.fbx' },
  'crouch back': { type: 'external', path: 'newtest_crouch_walk.fbx', playbackSpeed: 1.55, reverse: true },
  jump: { type: 'external', path: 'newtest_jump.fbx' },
  fire: { type: 'external', path: 'newtest_fire.fbx' },
};

const TMP_BOX = new THREE.Box3();
const TMP_SIZE = new THREE.Vector3();
const TMP_ROOT_WORLD = new THREE.Vector3();
const MOVE_VECTOR = new THREE.Vector3();
const FORWARD = new THREE.Vector3();
const RIGHT = new THREE.Vector3();
const REMOTE_ROOT_MOTION_BONE_NAMES = ['mixamorighips', 'hips', 'root', '_rootjoint', 'armature', 'bip01'];

let remoteRigAssetPromise = null;
const externalClipCache = new Map();
let remoteIkSolverPromise = null;

function ensureNodeLoaderShims() {
  globalThis.self ??= globalThis;
  globalThis.window ??= globalThis;
  globalThis.URL ??= {};
  globalThis.URL.createObjectURL ??= () => 'blob:stub';
  globalThis.URL.revokeObjectURL ??= () => {};
  globalThis.document ??= {
    createElementNS() {
      return {
        style: {},
        set src(_value) {},
        addEventListener(type, callback) {
          if (type === 'load') {
            queueMicrotask(callback);
          }
        },
        removeEventListener() {},
      };
    },
  };
}

async function loadRemoteIkSolver() {
  if (!remoteIkSolverPromise) {
    remoteIkSolverPromise = import('three/examples/jsm/animation/CCDIKSolver.js')
      .then((module) => module.CCDIKSolver);
  }
  return remoteIkSolverPromise;
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
  const nextTracks = clip.tracks.map((track) => reverseAnimationTrack(track, duration));
  return new THREE.AnimationClip(clip.name, duration, nextTracks, clip.blendMode);
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

function stripRootMotionFromClip(clip) {
  const nextTracks = clip.tracks.map((track) => {
    if (!track?.name?.endsWith('.position')) {
      return track.clone();
    }

    const trackTarget = String(track.name.replace(/\.position$/i, '')).toLowerCase();
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

async function loadExternalClip(path) {
  const key = String(path);
  if (!externalClipCache.has(key)) {
    externalClipCache.set(key, (async () => {
      const loader = new FBXLoader();
      const buffer = await fs.readFile(new URL(path, REMOTE_ANIMATION_ROOT_URL));
      const object = loader.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), '');
      const clip = object.animations?.[0] ?? null;
      if (!clip) {
        throw new Error(`No animation clip found in ${path}`);
      }
      return stripRootMotionFromClip(normalizeClipStartTime(clip));
    })());
  }
  return externalClipCache.get(key);
}

async function buildClipMap() {
  const clips = new Map();
  for (const [clipName, def] of Object.entries(CLIP_DEFS)) {
    let clip = (await loadExternalClip(def.path)).clone();
    clip.name = clipName;
    if (def.reverse) {
      clip = reverseAnimationClip(clip);
    }
    clips.set(clipName, { clip, playbackSpeed: def.playbackSpeed ?? 1 });
  }
  return clips;
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

async function loadRemoteRifleAsset() {
  ensureNodeLoaderShims();
  const loader = new GLTFLoader();
  const buffer = await fs.readFile(REMOTE_RIFLE_MODEL_URL);
  const gltf = await new Promise((resolve, reject) => {
    loader.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), '', resolve, reject);
  });
  return {
    scene: gltf.scene,
  };
}

async function loadRemoteRigAsset() {
  if (!remoteRigAssetPromise) {
    remoteRigAssetPromise = (async () => {
      ensureNodeLoaderShims();
      const loader = new GLTFLoader();
      const [buffer, rifleAsset] = await Promise.all([
        fs.readFile(REMOTE_MODEL_URL),
        loadRemoteRifleAsset(),
      ]);
      const gltf = await new Promise((resolve, reject) => {
        loader.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), '', resolve, reject);
      });

      const template = gltf.scene;
      TMP_BOX.setFromObject(template);
      TMP_BOX.getSize(TMP_SIZE);
      const baseHeight = Math.max(TMP_SIZE.y, 1e-3);
      const scale = (REMOTE_PLAYER_STAND_HEIGHT * REMOTE_CHARACTER_MODEL_SCALE) / baseHeight;
      template.scale.setScalar(scale);
      template.updateMatrixWorld(true);
      TMP_BOX.setFromObject(template);
      const rootJoint = template.getObjectByName('Bip01');
      if (rootJoint) {
        rootJoint.getWorldPosition(TMP_ROOT_WORLD);
        template.position.set(-TMP_ROOT_WORLD.x, -TMP_BOX.min.y, -TMP_ROOT_WORLD.z);
      } else {
        const center = TMP_BOX.getCenter(new THREE.Vector3());
        template.position.set(-center.x, -TMP_BOX.min.y, -center.z);
      }
      template.updateMatrixWorld(true);

      return {
        template,
        clips: await buildClipMap(),
        cloneSkinned,
        rifleScene: rifleAsset.scene,
      };
    })();
  }

  return remoteRigAssetPromise;
}

function findRigBones(root) {
  return {
    head: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.head),
    neck: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.neck),
    spine: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.spine),
    pelvis: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.pelvis),
    leftClavicle: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.leftClavicle),
    leftUpperArm: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.leftUpperArm),
    leftForearm: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.leftForearm),
    leftHand: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.leftHand),
    rightClavicle: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.rightClavicle),
    rightUpperArm: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.rightUpperArm),
    rightForearm: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.rightForearm),
    rightHand: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.rightHand),
    leftThigh: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.leftThigh),
    leftCalf: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.leftCalf),
    leftFoot: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.leftFoot),
    rightThigh: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.rightThigh),
    rightCalf: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.rightCalf),
    rightFoot: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.rightFoot),
    weaponSocket: root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.weaponSocket),
  };
}

function getRemoteAimPitch(pitch) {
  return THREE.MathUtils.clamp(Number(pitch ?? 0), REMOTE_AIM_PITCH_MIN, REMOTE_AIM_PITCH_MAX);
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

function createAimBoneEntries(bones) {
  return REMOTE_AIM_BONE_SPECS
    .map((spec) => {
      const bone = bones?.[spec.key] ?? null;
      if (!bone?.isBone) {
        return null;
      }
      return {
        bone,
        weight: spec.weight,
        baseQuaternion: bone.quaternion.clone(),
      };
    })
    .filter(Boolean);
}

function captureHitboxPoints(target, bones) {
  if (!target || !bones) {
    return;
  }
  for (const [key, point] of Object.entries(target)) {
    const bone = bones[key];
    if (!bone?.getWorldPosition) {
      continue;
    }
    bone.getWorldPosition(TMP_CAPTURE_POINT);
    point.x = TMP_CAPTURE_POINT.x;
    point.y = TMP_CAPTURE_POINT.y;
    point.z = TMP_CAPTURE_POINT.z;
  }
}

function captureAimBoneBasePose(rig) {
  for (const entry of rig.aimBones ?? []) {
    entry.baseQuaternion.copy(entry.bone.quaternion);
  }
}

function restoreAimBoneBasePose(rig) {
  for (const entry of rig.aimBones ?? []) {
    entry.bone.quaternion.copy(entry.baseQuaternion);
  }
}

function applyRigAimPitch(rig, player) {
  const aimFactors = getRemoteAimStateFactors(String(player?.presentationState ?? 'idle'));
  const clipFactor = REMOTE_AIM_CLIP_FACTORS[rig.activeClip] ?? 1;
  const boneFactor = aimFactors.bones * REMOTE_CHARACTER_AIM_SETTINGS.boneStrength * clipFactor;
  if (boneFactor <= 0) {
    return;
  }

  const aimPitch = getRemoteAimPitch(player?.pitch ?? 0);
  for (const entry of rig.aimBones ?? []) {
    entry.bone.quaternion.copy(entry.baseQuaternion);
    entry.bone.quaternion.premultiply(
      REMOTE_AIM_BONE_QUATERNION.setFromAxisAngle(
        REMOTE_AIM_BONE_AXIS,
        aimPitch * entry.weight * boneFactor * REMOTE_AIM_BONE_SIGN,
      ),
    );
  }
}

function selectMovementClip(player) {
  const presentationState = String(player.presentationState ?? 'idle');
  if (!player?.isAlive) {
    return CLIPS.idle;
  }

  if (presentationState === 'air') {
    return CLIPS.jump;
  }

  const velocity = player.motionState?.velocity ?? null;
  const isCrouched = Boolean(player.motionState?.isCrouched);
  if (!velocity) {
    return isCrouched ? CLIPS.crouchIdle : CLIPS.idle;
  }

  MOVE_VECTOR.set(Number(velocity.x ?? 0), 0, Number(velocity.z ?? 0));
  if (MOVE_VECTOR.lengthSq() <= MOVEMENT_DIRECTION_EPSILON * MOVEMENT_DIRECTION_EPSILON) {
    return isCrouched ? CLIPS.crouchIdle : CLIPS.idle;
  }

  const yaw = Number(player.motionState?.yaw ?? 0);
  FORWARD.set(-Math.sin(yaw), 0, -Math.cos(yaw));
  RIGHT.set(Math.cos(yaw), 0, -Math.sin(yaw));
  const forwardAmount = MOVE_VECTOR.dot(FORWARD);
  const strafeAmount = MOVE_VECTOR.dot(RIGHT);

  if (isCrouched) {
    if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
      return forwardAmount >= 0 ? CLIPS.crouchWalk : CLIPS.crouchBackward;
    }
    return CLIPS.crouchWalk;
  }

  if (Math.abs(forwardAmount) >= Math.abs(strafeAmount)) {
    return forwardAmount >= 0 ? CLIPS.runForward : CLIPS.runBackward;
  }

  return strafeAmount >= 0 ? CLIPS.strafeRight : CLIPS.strafeLeft;
}

function createServerRifleGroup(asset) {
  const group = new THREE.Group();
  group.rotation.order = REMOTE_WEAPON_ROTATION_ORDER;
  const rifleRoot = asset.scene.clone(true);
  const gripSocket = rifleRoot.getObjectByName('grip_socket');
  if (gripSocket) {
    alignNodeToOrigin(rifleRoot, gripSocket);
  }
  const leftHandGrip = rifleRoot.getObjectByName('left_hand_grip');
  group.add(rifleRoot);
  group.userData.leftHandGrip = leftHandGrip ?? null;
  return group;
}

function updateRiflePose(rig, player) {
  if (!rig.weaponAnchor || !rig.weaponRoot) {
    return;
  }
  const isScoped = Boolean(player?.isScoped);
  const weaponKey = String(player?.activeWeaponKey ?? 'rifle');
  const pose = DEFAULT_REMOTE_SOCKET_POSES[getRemoteSocketPoseKey(weaponKey, isScoped)]
    ?? DEFAULT_REMOTE_SOCKET_POSES.rifleHip;
  rig.weaponRoot.visible = weaponKey === 'rifle' || weaponKey === 'sniper';
  rig.weaponRoot.position.set(...pose.position);
  rig.weaponRoot.rotation.set(...pose.rotation);
  rig.weaponRoot.scale.setScalar(Number(pose.scale ?? 1));
}

async function ensureLeftHandIk(rig) {
  if (!REMOTE_USE_LEFT_HAND_IK) {
    return;
  }
  if (rig.leftHandIkSolver || !rig.skinnedMesh || !rig.root) {
    return;
  }

  const skeleton = rig.skinnedMesh.skeleton;
  const findBoneIndex = (boneName) => skeleton.bones.findIndex((bone) => bone?.name === boneName);
  const upperArmIndex = findBoneIndex(REMOTE_EXPERIMENTAL_SKELETON.leftUpperArm);
  const forearmIndex = findBoneIndex(REMOTE_EXPERIMENTAL_SKELETON.leftForearm);
  const handIndex = findBoneIndex(REMOTE_EXPERIMENTAL_SKELETON.leftHand);
  if (upperArmIndex < 0 || forearmIndex < 0 || handIndex < 0) {
    return;
  }

  const targetBone = new THREE.Bone();
  targetBone.name = 'runtime_left_hand_ik_target';
  rig.root.add(targetBone);
  rig.leftHandIkTargetBone = targetBone;
  skeleton.bones.push(targetBone);
  const targetIndex = skeleton.bones.length - 1;
  const CCDIKSolver = await loadRemoteIkSolver();
  if (!rig.root || !rig.skinnedMesh) {
    return;
  }

  rig.leftHandIkSolver = new CCDIKSolver(rig.skinnedMesh, [{
    target: targetIndex,
    effector: handIndex,
    iteration: 2,
    links: [
      { index: forearmIndex },
      { index: upperArmIndex },
    ],
    maxAngle: Math.PI / 4,
    blendFactor: 0.9,
  }]);
}

function updateLeftHandIk(rig, player) {
  if (!REMOTE_USE_LEFT_HAND_IK) {
    return;
  }
  if (!rig.leftHandIkSolver || !rig.leftHandIkTargetBone) {
    return;
  }
  const weaponKey = String(player?.activeWeaponKey ?? 'rifle');
  if (weaponKey !== 'rifle' && weaponKey !== 'sniper') {
    return;
  }
  const gripTarget = rig.weaponRoot?.userData?.leftHandGrip ?? null;
  if (!gripTarget?.getWorldPosition) {
    return;
  }
  gripTarget.updateWorldMatrix(true, false);
  gripTarget.getWorldPosition(TMP_CAPTURE_POINT);
  rig.root.worldToLocal(TMP_CAPTURE_POINT);
  rig.leftHandIkTargetBone.position.copy(TMP_CAPTURE_POINT);
  rig.leftHandIkTargetBone.updateMatrixWorld(true);
  rig.leftHandIkSolver.update();
}

export async function createRemoteHitboxRig() {
  const asset = await loadRemoteRigAsset();
  const container = new THREE.Group();
  const root = asset.cloneSkinned(asset.template);
  const basePosition = root.position.clone();
  const baseQuaternion = root.quaternion.clone();
  container.add(root);
  const mixer = new THREE.AnimationMixer(root);
  const actions = new Map();
  for (const [name, entry] of asset.clips.entries()) {
    const action = mixer.clipAction(entry.clip, root);
    action.enabled = false;
    if (name === CLIPS.jump) {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    } else {
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
    }
    action.play();
    action.paused = true;
    action.setEffectiveWeight(1);
    actions.set(name, { action, playbackSpeed: entry.playbackSpeed });
  }
  const weaponAnchor = new THREE.Group();
  const weaponSocket = root.getObjectByName(REMOTE_EXPERIMENTAL_SKELETON.weaponSocket);
  weaponAnchor.scale.setScalar(1 / Math.max(REMOTE_CHARACTER_MODEL_SCALE, 1e-6));
  if (weaponSocket) {
    weaponSocket.add(weaponAnchor);
  } else {
    root.add(weaponAnchor);
  }
  const weaponRoot = createServerRifleGroup({ scene: asset.rifleScene });
  weaponAnchor.add(weaponRoot);
  let skinnedMesh = null;
  root.traverse((child) => {
    if (!skinnedMesh && child.isSkinnedMesh) {
      skinnedMesh = child;
    }
  });
  const rig = {
    container,
    root,
    basePosition,
    baseQuaternion,
    mixer,
    actions,
    bones: findRigBones(root),
    aimBones: null,
    hitboxPoints: createRemoteHitboxPointCache(),
    activeClip: null,
    fireTime: 0,
    weaponAnchor,
    weaponRoot,
    skinnedMesh,
    leftHandIkSolver: null,
    leftHandIkTargetBone: null,
  };
  await ensureLeftHandIk(rig);
  return rig;
}

export function triggerRemoteHitboxRigFire(rig) {
  if (!rig) {
    return;
  }
  rig.fireTime = REMOTE_FIRE_ACTION_DURATION;
}

export function updateRemoteHitboxRig(rig, player, delta) {
  if (!rig || !player?.motionState) {
    return;
  }

  rig.fireTime = Math.max(0, rig.fireTime - delta);
  const targetClip = rig.fireTime > 0 && ['idle', 'scoped-idle'].includes(String(player.presentationState ?? 'idle'))
    ? CLIPS.fire
    : selectMovementClip(player);

  if (rig.activeClip !== targetClip) {
    for (const [name, entry] of rig.actions.entries()) {
      if (name === targetClip) {
        entry.action.enabled = true;
        entry.action.reset();
        entry.action.setEffectiveTimeScale(entry.playbackSpeed);
        entry.action.paused = false;
      } else {
        entry.action.enabled = false;
        entry.action.paused = true;
      }
    }
    rig.activeClip = targetClip;
  }

  const activeEntry = rig.actions.get(rig.activeClip);
  if (!activeEntry) {
    return;
  }
  activeEntry.action.enabled = true;
  activeEntry.action.paused = false;
  activeEntry.action.setEffectiveTimeScale(activeEntry.playbackSpeed);
  restoreAimBoneBasePose(rig);
  rig.container.position.set(
    player.motionState.position.x,
    player.motionState.position.y,
    player.motionState.position.z,
  );
  rig.container.rotation.set(0, player.motionState.yaw, 0);
  rig.root.position.copy(rig.basePosition);
  rig.root.quaternion.copy(rig.baseQuaternion);
  rig.mixer.update(delta);
  if (rig.activeClip === CLIPS.jump) {
    const jumpDuration = Math.max(0.001, activeEntry.action.getClip().duration);
    const holdTime = jumpDuration * REMOTE_JUMP_END_HOLD_RATIO;
    activeEntry.action.setEffectiveTimeScale(REMOTE_JUMP_TIME_SCALE);
    if (activeEntry.action.time >= holdTime) {
      activeEntry.action.time = holdTime;
      activeEntry.action.paused = true;
    }
  }
  if (!rig.aimBones) {
    rig.aimBones = createAimBoneEntries(rig.bones);
  }
  captureAimBoneBasePose(rig);
  applyRigAimPitch(rig, player);
  updateRiflePose(rig, player);
  updateLeftHandIk(rig, player);
  rig.container.updateMatrixWorld(true);
  captureHitboxPoints(rig.hitboxPoints, rig.bones);
  restoreAimBoneBasePose(rig);
  rig.container.updateMatrixWorld(true);
  activeEntry.action.paused = true;
}
