import * as THREE from 'three';

const LANDING_RAYCASTER = new THREE.Raycaster();
const LANDING_WORLD_NORMAL_MATRIX = new THREE.Matrix3();
const LANDING_WORLD_NORMAL = new THREE.Vector3();
const LANDING_SAMPLE_OFFSETS = [
  [0, 0],
  [-0.22, 0],
  [0.22, 0],
  [0, -0.22],
  [0, 0.22],
  [-0.16, -0.16],
  [0.16, -0.16],
  [-0.16, 0.16],
  [0.16, 0.16],
];

export function findLandingHeightAtCurrentPosition({
  position,
  landingSurfaces,
  collisionWorld,
}) {
  if (landingSurfaces.length > 0) {
    let supportedSamples = 0;
    let accumulatedHeight = 0;

    for (const [offsetX, offsetZ] of LANDING_SAMPLE_OFFSETS) {
      const sampleX = position.x + offsetX;
      const sampleZ = position.z + offsetZ;

      LANDING_RAYCASTER.set(
        new THREE.Vector3(sampleX, position.y + 1.5, sampleZ),
        new THREE.Vector3(0, -1, 0),
      );

      const hit = LANDING_RAYCASTER.intersectObjects(landingSurfaces, false).find((candidate) => {
        const faceNormal = candidate.face?.normal;
        if (!faceNormal || !candidate.object) {
          return false;
        }

        LANDING_WORLD_NORMAL_MATRIX.getNormalMatrix(candidate.object.matrixWorld);
        LANDING_WORLD_NORMAL.copy(faceNormal)
          .applyMatrix3(LANDING_WORLD_NORMAL_MATRIX)
          .normalize();

        const dropDistance = position.y - candidate.point.y;
        return LANDING_WORLD_NORMAL.y > 0.35 && dropDistance >= -0.5 && dropDistance <= 256;
      });

      if (!hit) {
        continue;
      }

      supportedSamples += 1;
      accumulatedHeight += hit.point.y;
    }

    if (supportedSamples >= 5) {
      return accumulatedHeight / supportedSamples;
    }

    return null;
  }

  if (!collisionWorld) {
    return position.y;
  }

  let supportedSamples = 0;
  let accumulatedHeight = 0;

  for (const [offsetX, offsetZ] of LANDING_SAMPLE_OFFSETS) {
    const groundHeight = collisionWorld.getGroundHeightAt(
      position.x + offsetX,
      position.z + offsetZ,
      position.y,
      2,
      256,
    );
    if (!Number.isFinite(groundHeight)) {
      continue;
    }
    const dropDistance = position.y - groundHeight;

    if (dropDistance < -0.5 || dropDistance > 256) {
      continue;
    }

    supportedSamples += 1;
    accumulatedHeight += groundHeight;
  }

  if (supportedSamples < 5) {
    return null;
  }

  return accumulatedHeight / supportedSamples;
}

export function getNextFlyMode({
  movementMode,
  allowGroundedMode,
  findLandingHeight,
}) {
  if (movementMode !== 'fly') {
    return {
      nextMode: 'fly',
      landingHeight: null,
    };
  }

  if (!allowGroundedMode) {
    return {
      nextMode: 'fly',
      landingHeight: null,
    };
  }

  const landingHeight = findLandingHeight();
  if (landingHeight == null) {
    return {
      nextMode: 'fly',
      landingHeight: null,
    };
  }

  return {
    nextMode: 'grounded',
    landingHeight,
  };
}
