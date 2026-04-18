import * as THREE from 'three';
import {
  REMOTE_AIM_CLIP_FACTORS,
  REMOTE_AIM_BONE_SIGN,
  REMOTE_AIM_PITCH_MAX,
  REMOTE_AIM_PITCH_MIN,
  REMOTE_AIM_STATE_FACTORS,
  getRemoteSocketPoseKey,
} from '../../shared/remoteCharacterConfig.js';

const REMOTE_AIM_WEAPON_FACTOR = 0.9;
const REMOTE_AIM_PROXY_WEAPON_FACTOR = 0.75;
const REMOTE_WORLD_SCALE = new THREE.Vector3();
const REMOTE_AIM_BONE_LOCAL_AXIS = new THREE.Vector3(0, 0, 1);
const REMOTE_AIM_BONE_QUATERNION = new THREE.Quaternion();

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

function getRemoteAimPitch(value) {
  return THREE.MathUtils.clamp(Number(value ?? 0), REMOTE_AIM_PITCH_MIN, REMOTE_AIM_PITCH_MAX);
}

export function applyRemoteAimPitch(
  visual,
  pitch,
  {
    presentationState = 'idle',
    targetClip = null,
    getRemoteAimSettings,
  } = {},
) {
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

export function applyRemoteCharacterPresentation(visual, { isAlive, getRemoteCharacterModelScale } = {}) {
  if (!visual.characterRoot) {
    return;
  }

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

function getSocketWeaponPose(weaponKey, isScoped, { ensureRemoteWeaponTuning } = {}) {
  const tuning = ensureRemoteWeaponTuning();
  return tuning.weaponPoses[getRemoteSocketPoseKey(weaponKey, isScoped)];
}

export function applyRemoteWeaponPresentation(
  visual,
  {
    isScopedStance,
    rifleTargetLength,
    ensureRemoteWeaponTuning,
  } = {},
) {
  if (!visual.weaponMesh) {
    return;
  }

  visual.weaponMesh.visible = true;
  if (visual.characterWeaponSocket) {
    const pose = getSocketWeaponPose(visual.weaponKey, isScopedStance, { ensureRemoteWeaponTuning });
    visual.characterWeaponAnchor.getWorldScale(REMOTE_WORLD_SCALE);
    const inheritedAnchorScale = Math.max(
      Math.abs(REMOTE_WORLD_SCALE.x),
      Math.abs(REMOTE_WORLD_SCALE.y),
      Math.abs(REMOTE_WORLD_SCALE.z),
      1e-6,
    );
    const normalizedRifleScale = (rifleTargetLength
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
    return;
  }

  const pose = getCharacterWeaponPose(visual.weaponKey, isScopedStance);
  visual.weaponMesh.position.set(...pose.position);
  visual.weaponMesh.rotation.set(...pose.rotation);
  visual.weaponMesh.scale.setScalar(pose.scale);
}
