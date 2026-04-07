import { REMOTE_HITBOX_BONE_KEYS } from './remoteHitboxes.js';

const REMOTE_ROOT_NAME_CANDIDATES = [
  '_rootJoint',
  'Bip01',
  'belly_01',
  'mixamorigHips',
];

const REMOTE_HIT_BONE_SPECS = {
  head: {
    names: ['Bip01 Head', 'Bip01_Head'],
    fallbackPattern: /head/i,
  },
  neck: {
    names: ['Bip01 Neck', 'Bip01_Neck'],
    fallbackPattern: /neck/i,
  },
  spine: {
    names: ['Bip01 Spine', 'Bip01_Spine'],
    fallbackPattern: /^bip01[\s_]?spine$/i,
  },
  pelvis: {
    names: ['Bip01 Pelvis', 'Bip01_Pelvis'],
    fallbackPattern: /pelvis|hips|^bip01$/i,
  },
  leftClavicle: {
    names: ['Bip01 L Clavicle', 'Bip01_L_Clavicle'],
    fallbackPattern: /(left|l).*clavicle|clavicle.*(left|l)/i,
  },
  leftUpperArm: {
    names: ['Bip01 L UpperArm', 'Bip01_L_UpperArm'],
    fallbackPattern: /(left|l).*upper.*arm|upper.*arm.*(left|l)/i,
  },
  leftForearm: {
    names: ['Bip01 L Forearm', 'Bip01_L_Forearm'],
    fallbackPattern: /(left|l).*forearm|forearm.*(left|l)/i,
  },
  leftHand: {
    names: ['Bip01 L Hand', 'Bip01_L_Hand'],
    fallbackPattern: /(left|l).*hand|hand.*(left|l)/i,
  },
  rightClavicle: {
    names: ['Bip01 R Clavicle', 'Bip01_R_Clavicle'],
    fallbackPattern: /(right|r).*clavicle|clavicle.*(right|r)/i,
  },
  rightUpperArm: {
    names: ['Bip01 R UpperArm', 'Bip01_R_UpperArm'],
    fallbackPattern: /(right|r).*upper.*arm|upper.*arm.*(right|r)/i,
  },
  rightForearm: {
    names: ['Bip01 R Forearm', 'Bip01_R_Forearm'],
    fallbackPattern: /(right|r).*forearm|forearm.*(right|r)/i,
  },
  rightHand: {
    names: ['Bip01 R Hand', 'Bip01_R_Hand'],
    fallbackPattern: /(right|r).*hand|hand.*(right|r)/i,
  },
  leftThigh: {
    names: ['Bip01 L Thigh', 'Bip01_L_Thigh'],
    fallbackPattern: /(left|l).*(thigh|upleg)|(thigh|upleg).*(left|l)/i,
  },
  leftCalf: {
    names: ['Bip01 L Calf', 'Bip01_L_Calf'],
    fallbackPattern: /(left|l).*calf|calf.*(left|l)/i,
  },
  leftFoot: {
    names: ['Bip01 L Foot', 'Bip01_L_Foot'],
    fallbackPattern: /(left|l).*foot|foot.*(left|l)/i,
  },
  rightThigh: {
    names: ['Bip01 R Thigh', 'Bip01_R_Thigh'],
    fallbackPattern: /(right|r).*(thigh|upleg)|(thigh|upleg).*(right|r)/i,
  },
  rightCalf: {
    names: ['Bip01 R Calf', 'Bip01_R_Calf'],
    fallbackPattern: /(right|r).*calf|calf.*(right|r)/i,
  },
  rightFoot: {
    names: ['Bip01 R Foot', 'Bip01_R_Foot'],
    fallbackPattern: /(right|r).*foot|foot.*(right|r)/i,
  },
};

function findBoneByHints(root, names = [], fallbackPattern = null) {
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

export function resolveRemoteRootJoint(root, skeleton = {}) {
  const candidateNames = [
    ...REMOTE_ROOT_NAME_CANDIDATES,
    skeleton.rootJoint,
  ].filter(Boolean);

  for (const candidateName of candidateNames) {
    const candidate = root.getObjectByName(candidateName);
    if (candidate) {
      return candidate;
    }
  }

  return null;
}

export function resolveRemoteHitBones(root, skeleton = {}) {
  return Object.fromEntries(
    Object.entries(REMOTE_HIT_BONE_SPECS).map(([key, spec]) => {
      const names = [...spec.names, skeleton[key], key === 'pelvis' ? skeleton.rootJoint : null].filter(Boolean);
      return [key, findBoneByHints(root, names, spec.fallbackPattern)];
    }),
  );
}

export function getMissingRemoteHitBoneKeys(bones) {
  return REMOTE_HITBOX_BONE_KEYS.filter((key) => !bones?.[key]?.isBone);
}

export function describeRemoteHitboxAudit({ root = null, bones = null } = {}) {
  const resolvedBoneNames = Object.fromEntries(
    REMOTE_HITBOX_BONE_KEYS.map((key) => [key, bones?.[key]?.name ?? null]),
  );

  return {
    rootJoint: root?.name ?? null,
    missingBoneKeys: getMissingRemoteHitBoneKeys(bones),
    resolvedBoneNames,
  };
}
