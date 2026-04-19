import * as THREE from 'three';
import { computePlayerHitboxLayout, createPlayerHitboxLayout } from '../../shared/playerHitboxes.js';
import {
  buildRemoteHitboxSnapshotFromPoints,
  createRemoteHitboxPointCache,
  createRemoteHitboxSnapshot,
  interpolateRemoteHitboxPoints,
  REMOTE_HITBOX_HEAD_OFFSET,
} from '../../shared/remoteHitboxes.js';
import { REMOTE_CHARACTER_HITBOX_SETTINGS } from '../../shared/remoteCharacterConfig.js';
import {
  getLagCompensationRewindMs,
  getSnapshotPairAtTime,
  getTimelineNow,
  interpolateRemotePlayerSnapshotAtTime,
} from '../../shared/remoteTimeline.js';

export const DEFAULT_REMOTE_HITBOX_DEBUG_SETTINGS = {
  enabled: false,
  showLatestHitboxes: true,
  showLatestMarkers: true,
  showRewoundHitboxes: false,
  showRewoundMarkers: false,
};

const REMOTE_HITBOX_LAYOUT = createPlayerHitboxLayout();
const REMOTE_HITBOX_SEGMENT_START = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_END = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_CENTER = new THREE.Vector3();
const REMOTE_HITBOX_SEGMENT_DIRECTION = new THREE.Vector3();
const REMOTE_HITBOX_UP_AXIS = new THREE.Vector3(0, 1, 0);
const REMOTE_HITBOX_WORLD_POINT = new THREE.Vector3();
const REMOTE_DEBUG_RENDERED_POSITION = new THREE.Vector3();
const REMOTE_DEBUG_AUTHORITATIVE_POSITION = new THREE.Vector3();
const REMOTE_DEBUG_POSITION_DELTA = new THREE.Vector3();
const REMOTE_LOCAL_HITBOX_POINTS = createRemoteHitboxPointCache();
const REMOTE_LOCAL_HITBOX_SNAPSHOT = createRemoteHitboxSnapshot();
const REMOTE_REWOUND_HITBOX_POINTS = createRemoteHitboxPointCache();
const REMOTE_REWOUND_HITBOX_SNAPSHOT = createRemoteHitboxSnapshot();
const DEBUG_BASIS_RIGHT = new THREE.Vector3();
const DEBUG_BASIS_UP = new THREE.Vector3();
const DEBUG_BASIS_FORWARD = new THREE.Vector3();
const DEBUG_HEAD_POINT = new THREE.Vector3();
const DEBUG_NECK_POINT = new THREE.Vector3();
const DEBUG_SPINE_POINT = new THREE.Vector3();
const DEBUG_CENTER_POINT = new THREE.Vector3();

function cloneVector3Like(value) {
  if (!value) {
    return null;
  }
  return {
    x: Number(value.x ?? 0),
    y: Number(value.y ?? 0),
    z: Number(value.z ?? 0),
  };
}

function getHitboxCenter(hitbox) {
  if (!hitbox) {
    return null;
  }
  if (hitbox.center) {
    return cloneVector3Like(hitbox.center);
  }
  if (hitbox.start && hitbox.end) {
    return {
      x: (Number(hitbox.start.x ?? 0) + Number(hitbox.end.x ?? 0)) * 0.5,
      y: (Number(hitbox.start.y ?? 0) + Number(hitbox.end.y ?? 0)) * 0.5,
      z: (Number(hitbox.start.z ?? 0) + Number(hitbox.end.z ?? 0)) * 0.5,
    };
  }
  return null;
}

function getPoseError(a, b) {
  if (!a || !b) {
    return null;
  }
  const dx = Number(b.x ?? 0) - Number(a.x ?? 0);
  const dy = Number(b.y ?? 0) - Number(a.y ?? 0);
  const dz = Number(b.z ?? 0) - Number(a.z ?? 0);
  return {
    delta: { x: dx, y: dy, z: dz },
    distance: Math.hypot(dx, dy, dz),
    horizontalDistance: Math.hypot(dx, dz),
  };
}

function getSegmentVector(start, end) {
  if (!start || !end) {
    return null;
  }
  return {
    x: Number(end.x ?? 0) - Number(start.x ?? 0),
    y: Number(end.y ?? 0) - Number(start.y ?? 0),
    z: Number(end.z ?? 0) - Number(start.z ?? 0),
  };
}

function getVectorLength(vector) {
  if (!vector) {
    return 0;
  }
  return Math.hypot(Number(vector.x ?? 0), Number(vector.y ?? 0), Number(vector.z ?? 0));
}

function getSegmentComparison(localStart, localEnd, authoritativeStart, authoritativeEnd) {
  const localVector = getSegmentVector(localStart, localEnd);
  const authoritativeVector = getSegmentVector(authoritativeStart, authoritativeEnd);
  if (!localVector || !authoritativeVector) {
    return null;
  }

  const localLength = getVectorLength(localVector);
  const authoritativeLength = getVectorLength(authoritativeVector);
  if (localLength <= 1e-6 || authoritativeLength <= 1e-6) {
    return null;
  }

  const dot = (
    (localVector.x * authoritativeVector.x)
    + (localVector.y * authoritativeVector.y)
    + (localVector.z * authoritativeVector.z)
  ) / (localLength * authoritativeLength);
  const clampedDot = Math.max(-1, Math.min(1, dot));
  return {
    angleDegrees: THREE.MathUtils.radToDeg(Math.acos(clampedDot)),
    lengthDelta: authoritativeLength - localLength,
    localLength,
    authoritativeLength,
  };
}

function getSegmentLength(start, end) {
  return getVectorLength(getSegmentVector(start, end));
}

function buildPointComparisonState(localPoints, latestAuthoritativePoints, rewoundAuthoritativePoints) {
  return {
    local: {
      head: cloneVector3Like(localPoints?.head),
      neck: cloneVector3Like(localPoints?.neck),
      spine: cloneVector3Like(localPoints?.spine),
      pelvis: cloneVector3Like(localPoints?.pelvis),
      leftClavicle: cloneVector3Like(localPoints?.leftClavicle),
      rightClavicle: cloneVector3Like(localPoints?.rightClavicle),
    },
    latest: {
      head: cloneVector3Like(latestAuthoritativePoints?.head),
      neck: cloneVector3Like(latestAuthoritativePoints?.neck),
      spine: cloneVector3Like(latestAuthoritativePoints?.spine),
      pelvis: cloneVector3Like(latestAuthoritativePoints?.pelvis),
      leftClavicle: cloneVector3Like(latestAuthoritativePoints?.leftClavicle),
      rightClavicle: cloneVector3Like(latestAuthoritativePoints?.rightClavicle),
    },
    rewound: {
      head: cloneVector3Like(rewoundAuthoritativePoints?.head),
      neck: cloneVector3Like(rewoundAuthoritativePoints?.neck),
      spine: cloneVector3Like(rewoundAuthoritativePoints?.spine),
      pelvis: cloneVector3Like(rewoundAuthoritativePoints?.pelvis),
      leftClavicle: cloneVector3Like(rewoundAuthoritativePoints?.leftClavicle),
      rightClavicle: cloneVector3Like(rewoundAuthoritativePoints?.rightClavicle),
    },
    latestError: {
      head: getPoseError(localPoints?.head, latestAuthoritativePoints?.head),
      neck: getPoseError(localPoints?.neck, latestAuthoritativePoints?.neck),
      spine: getPoseError(localPoints?.spine, latestAuthoritativePoints?.spine),
      pelvis: getPoseError(localPoints?.pelvis, latestAuthoritativePoints?.pelvis),
      leftClavicle: getPoseError(localPoints?.leftClavicle, latestAuthoritativePoints?.leftClavicle),
      rightClavicle: getPoseError(localPoints?.rightClavicle, latestAuthoritativePoints?.rightClavicle),
    },
    rewoundError: {
      head: getPoseError(localPoints?.head, rewoundAuthoritativePoints?.head),
      neck: getPoseError(localPoints?.neck, rewoundAuthoritativePoints?.neck),
      spine: getPoseError(localPoints?.spine, rewoundAuthoritativePoints?.spine),
      pelvis: getPoseError(localPoints?.pelvis, rewoundAuthoritativePoints?.pelvis),
      leftClavicle: getPoseError(localPoints?.leftClavicle, rewoundAuthoritativePoints?.leftClavicle),
      rightClavicle: getPoseError(localPoints?.rightClavicle, rewoundAuthoritativePoints?.rightClavicle),
    },
    latestChain: {
      spineToNeck: getSegmentComparison(
        localPoints?.spine,
        localPoints?.neck,
        latestAuthoritativePoints?.spine,
        latestAuthoritativePoints?.neck,
      ),
      neckToHead: getSegmentComparison(
        localPoints?.neck,
        localPoints?.head,
        latestAuthoritativePoints?.neck,
        latestAuthoritativePoints?.head,
      ),
      clavicleSpan: getSegmentComparison(
        localPoints?.leftClavicle,
        localPoints?.rightClavicle,
        latestAuthoritativePoints?.leftClavicle,
        latestAuthoritativePoints?.rightClavicle,
      ),
    },
    rewoundChain: {
      spineToNeck: getSegmentComparison(
        localPoints?.spine,
        localPoints?.neck,
        rewoundAuthoritativePoints?.spine,
        rewoundAuthoritativePoints?.neck,
      ),
      neckToHead: getSegmentComparison(
        localPoints?.neck,
        localPoints?.head,
        rewoundAuthoritativePoints?.neck,
        rewoundAuthoritativePoints?.head,
      ),
      clavicleSpan: getSegmentComparison(
        localPoints?.leftClavicle,
        localPoints?.rightClavicle,
        rewoundAuthoritativePoints?.leftClavicle,
        rewoundAuthoritativePoints?.rightClavicle,
      ),
    },
    construction: {
      local: {
        neckToHeadLength: getSegmentLength(localPoints?.neck, localPoints?.head),
      },
      latest: {
        neckToHeadLength: getSegmentLength(latestAuthoritativePoints?.neck, latestAuthoritativePoints?.head),
      },
      rewound: {
        neckToHeadLength: getSegmentLength(rewoundAuthoritativePoints?.neck, rewoundAuthoritativePoints?.head),
      },
    },
  };
}

function buildPoseComparisonState(
  meshSnapshot,
  latestHitboxes,
  rewoundHitboxes,
  localPoints,
  latestAuthoritativePoints,
  rewoundAuthoritativePoints,
) {
  const meshHead = getHitboxCenter(meshSnapshot?.head);
  const meshTorso = getHitboxCenter(meshSnapshot?.torso);
  const meshPelvis = getHitboxCenter(meshSnapshot?.pelvis);
  const latestHead = getHitboxCenter(latestHitboxes?.head);
  const latestTorso = getHitboxCenter(latestHitboxes?.torso);
  const latestPelvis = getHitboxCenter(latestHitboxes?.pelvis);
  const rewoundHead = getHitboxCenter(rewoundHitboxes?.head);
  const rewoundTorso = getHitboxCenter(rewoundHitboxes?.torso);
  const rewoundPelvis = getHitboxCenter(rewoundHitboxes?.pelvis);

  return {
    mesh: {
      head: meshHead,
      torso: meshTorso,
      pelvis: meshPelvis,
    },
    latest: {
      head: latestHead,
      torso: latestTorso,
      pelvis: latestPelvis,
    },
    rewound: {
      head: rewoundHead,
      torso: rewoundTorso,
      pelvis: rewoundPelvis,
    },
    latestError: {
      head: getPoseError(meshHead, latestHead),
      torso: getPoseError(meshTorso, latestTorso),
      pelvis: getPoseError(meshPelvis, latestPelvis),
    },
    rewoundError: {
      head: getPoseError(meshHead, rewoundHead),
      torso: getPoseError(meshTorso, rewoundTorso),
      pelvis: getPoseError(meshPelvis, rewoundPelvis),
    },
    points: buildPointComparisonState(localPoints, latestAuthoritativePoints, rewoundAuthoritativePoints),
    headConstruction: {
      local: {
        headPointToCenter: getPoseError(localPoints?.head, meshHead),
      },
      latest: {
        headPointToCenter: getPoseError(latestAuthoritativePoints?.head, latestHead),
      },
      rewound: {
        headPointToCenter: getPoseError(rewoundAuthoritativePoints?.head, rewoundHead),
      },
    },
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
  return new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), material);
}

function createRemoteHeadConstructionDebugGroup(colors = {}) {
  const group = new THREE.Group();
  group.renderOrder = 1300;

  const pointMaterial = (color) => new THREE.MeshBasicMaterial({
    color,
    depthTest: false,
    transparent: true,
    opacity: 0.95,
  });
  const axisMaterial = (color) => new THREE.LineBasicMaterial({
    color,
    depthTest: false,
    transparent: true,
    opacity: 0.95,
  });
  const pointGeometry = new THREE.SphereGeometry(0.028, 10, 8);
  const headPoint = new THREE.Mesh(pointGeometry, pointMaterial(colors.headPoint ?? 0xff6b6b));
  const neckPoint = new THREE.Mesh(pointGeometry, pointMaterial(colors.neckPoint ?? 0x58d1ff));
  const spinePoint = new THREE.Mesh(pointGeometry, pointMaterial(colors.spinePoint ?? 0x9cff7a));
  const centerPoint = new THREE.Mesh(pointGeometry, pointMaterial(colors.centerPoint ?? 0xfff27a));

  const createAxis = (color) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6), 3));
    const line = new THREE.Line(geometry, axisMaterial(color));
    line.renderOrder = 1301;
    return line;
  };

  const rightAxis = createAxis(colors.rightAxis ?? 0xff5d5d);
  const upAxis = createAxis(colors.upAxis ?? 0x5dff8f);
  const forwardAxis = createAxis(colors.forwardAxis ?? 0x67a6ff);

  group.add(headPoint, neckPoint, spinePoint, centerPoint, rightAxis, upAxis, forwardAxis);
  return {
    group,
    headPoint,
    neckPoint,
    spinePoint,
    centerPoint,
    rightAxis,
    upAxis,
    forwardAxis,
  };
}

function createPointDebugMesh(color, radius = 0.024) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 10, 8),
    new THREE.MeshBasicMaterial({
      color,
      depthTest: false,
      transparent: true,
      opacity: 0.95,
    }),
  );
}

function createSegmentDebugLine(color) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6), 3));
  const line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
      color,
      depthTest: false,
      transparent: true,
      opacity: 0.95,
    }),
  );
  line.renderOrder = 1301;
  return line;
}

function createRemoteUpperBodyChainDebugGroup(colors = {}) {
  const group = new THREE.Group();
  group.renderOrder = 1300;

  const spinePoint = createPointDebugMesh(colors.spinePoint ?? 0x6bff95);
  const neckPoint = createPointDebugMesh(colors.neckPoint ?? 0x58d1ff);
  const headPoint = createPointDebugMesh(colors.headPoint ?? 0xff6b6b);
  const leftClaviclePoint = createPointDebugMesh(colors.leftClaviclePoint ?? 0xffd166, 0.02);
  const rightClaviclePoint = createPointDebugMesh(colors.rightClaviclePoint ?? 0xffd166, 0.02);
  const spineToNeck = createSegmentDebugLine(colors.spineToNeck ?? 0x7cf7a3);
  const neckToHead = createSegmentDebugLine(colors.neckToHead ?? 0x74d8ff);
  const clavicleSpan = createSegmentDebugLine(colors.clavicleSpan ?? 0xffd166);

  group.add(
    spinePoint,
    neckPoint,
    headPoint,
    leftClaviclePoint,
    rightClaviclePoint,
    spineToNeck,
    neckToHead,
    clavicleSpan,
  );

  return {
    group,
    spinePoint,
    neckPoint,
    headPoint,
    leftClaviclePoint,
    rightClaviclePoint,
    spineToNeck,
    neckToHead,
    clavicleSpan,
  };
}

function updateDebugLine(line, start, end) {
  const positions = line.geometry.attributes.position.array;
  positions[0] = start.x;
  positions[1] = start.y;
  positions[2] = start.z;
  positions[3] = end.x;
  positions[4] = end.y;
  positions[5] = end.z;
  line.geometry.attributes.position.needsUpdate = true;
  line.geometry.computeBoundingSphere();
}

function updateRemoteHeadConstructionDebugGroup(debugGroup, points, headHitbox, axisScale = 0.16) {
  if (!debugGroup) {
    return false;
  }
  const headPoint = points?.head ?? null;
  const neckPoint = points?.neck ?? null;
  const spinePoint = points?.spine ?? null;
  const center = headHitbox?.center ?? null;
  const right = headHitbox?.right ?? null;
  const up = headHitbox?.up ?? null;
  const forward = headHitbox?.forward ?? null;
  const visible = Boolean(headPoint && neckPoint && spinePoint && center && right && up && forward);
  debugGroup.group.visible = visible;
  if (!visible) {
    return false;
  }

  debugGroup.headPoint.position.set(Number(headPoint.x ?? 0), Number(headPoint.y ?? 0), Number(headPoint.z ?? 0));
  debugGroup.neckPoint.position.set(Number(neckPoint.x ?? 0), Number(neckPoint.y ?? 0), Number(neckPoint.z ?? 0));
  debugGroup.spinePoint.position.set(Number(spinePoint.x ?? 0), Number(spinePoint.y ?? 0), Number(spinePoint.z ?? 0));
  debugGroup.centerPoint.position.set(Number(center.x ?? 0), Number(center.y ?? 0), Number(center.z ?? 0));

  DEBUG_CENTER_POINT.set(Number(center.x ?? 0), Number(center.y ?? 0), Number(center.z ?? 0));
  updateDebugLine(
    debugGroup.rightAxis,
    DEBUG_CENTER_POINT,
    DEBUG_HEAD_POINT.set(Number(center.x ?? 0), Number(center.y ?? 0), Number(center.z ?? 0))
      .addScaledVector(DEBUG_BASIS_RIGHT.set(Number(right.x ?? 0), Number(right.y ?? 0), Number(right.z ?? 0)), axisScale),
  );
  updateDebugLine(
    debugGroup.upAxis,
    DEBUG_CENTER_POINT,
    DEBUG_NECK_POINT.set(Number(center.x ?? 0), Number(center.y ?? 0), Number(center.z ?? 0))
      .addScaledVector(DEBUG_BASIS_UP.set(Number(up.x ?? 0), Number(up.y ?? 0), Number(up.z ?? 0)), axisScale),
  );
  updateDebugLine(
    debugGroup.forwardAxis,
    DEBUG_CENTER_POINT,
    DEBUG_SPINE_POINT.set(Number(center.x ?? 0), Number(center.y ?? 0), Number(center.z ?? 0))
      .addScaledVector(DEBUG_BASIS_FORWARD.set(Number(forward.x ?? 0), Number(forward.y ?? 0), Number(forward.z ?? 0)), axisScale),
  );
  return true;
}

function updateRemoteUpperBodyChainDebugGroup(debugGroup, points) {
  if (!debugGroup) {
    return false;
  }

  const spine = points?.spine ?? null;
  const neck = points?.neck ?? null;
  const head = points?.head ?? null;
  const leftClavicle = points?.leftClavicle ?? null;
  const rightClavicle = points?.rightClavicle ?? null;
  const visible = Boolean(spine && neck && head && leftClavicle && rightClavicle);
  debugGroup.group.visible = visible;
  if (!visible) {
    return false;
  }

  debugGroup.spinePoint.position.set(Number(spine.x ?? 0), Number(spine.y ?? 0), Number(spine.z ?? 0));
  debugGroup.neckPoint.position.set(Number(neck.x ?? 0), Number(neck.y ?? 0), Number(neck.z ?? 0));
  debugGroup.headPoint.position.set(Number(head.x ?? 0), Number(head.y ?? 0), Number(head.z ?? 0));
  debugGroup.leftClaviclePoint.position.set(
    Number(leftClavicle.x ?? 0),
    Number(leftClavicle.y ?? 0),
    Number(leftClavicle.z ?? 0),
  );
  debugGroup.rightClaviclePoint.position.set(
    Number(rightClavicle.x ?? 0),
    Number(rightClavicle.y ?? 0),
    Number(rightClavicle.z ?? 0),
  );

  updateDebugLine(debugGroup.spineToNeck, spine, neck);
  updateDebugLine(debugGroup.neckToHead, neck, head);
  updateDebugLine(debugGroup.clavicleSpan, leftClavicle, rightClavicle);
  return true;
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
      DEBUG_BASIS_RIGHT.set(ellipsoid.right.x, ellipsoid.right.y, ellipsoid.right.z),
      DEBUG_BASIS_UP.set(ellipsoid.up.x, ellipsoid.up.y, ellipsoid.up.z),
      DEBUG_BASIS_FORWARD.set(ellipsoid.forward.x, ellipsoid.forward.y, ellipsoid.forward.z),
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

function createRemoteHitVolumeDebugGroup(colors = {}) {
  const group = new THREE.Group();
  group.renderOrder = 1200;

  const head = createRemoteHitSphereDebugMesh(colors.head ?? 0xff5d5d);
  const torso = createRemoteHitCapsuleDebugMesh(colors.torso ?? 0x6bd3ff);
  const pelvis = createRemoteHitCapsuleDebugMesh(colors.pelvis ?? 0x8cff7a);
  const arms = Array.from({ length: 6 }, () => createRemoteHitCapsuleDebugMesh(colors.arms ?? 0xffd166));
  const hands = [
    createRemoteHitSphereDebugMesh(colors.hands ?? colors.arms ?? 0xffd166),
    createRemoteHitSphereDebugMesh(colors.hands ?? colors.arms ?? 0xffd166),
  ];
  const legs = Array.from({ length: 4 }, () => createRemoteHitCapsuleDebugMesh(colors.legs ?? 0xc792ff));
  const headConstruction = createRemoteHeadConstructionDebugGroup(colors.headConstruction ?? {});
  const upperBodyChain = createRemoteUpperBodyChainDebugGroup(colors.upperBodyChain ?? {});

  group.add(
    head,
    torso.group,
    pelvis.group,
    ...arms.map((entry) => entry.group),
    ...hands,
    ...legs.map((entry) => entry.group),
    headConstruction.group,
    upperBodyChain.group,
  );

  return {
    group,
    head,
    torso,
    pelvis,
    arms,
    hands,
    legs,
    headConstruction,
    upperBodyChain,
  };
}

function createRemotePositionDebugGroup() {
  const group = new THREE.Group();
  const renderedMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0x32d17c, depthTest: false, transparent: true, opacity: 0.95 }),
  );
  const authoritativeMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0xff5b5b, depthTest: false, transparent: true, opacity: 0.95 }),
  );
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6), 3));
  const connector = new THREE.Line(
    lineGeometry,
    new THREE.LineBasicMaterial({ color: 0xffd54d, depthTest: false, transparent: true, opacity: 0.9 }),
  );
  connector.renderOrder = 999;
  renderedMarker.renderOrder = 999;
  authoritativeMarker.renderOrder = 999;
  group.add(connector, renderedMarker, authoritativeMarker);
  return {
    group,
    renderedMarker,
    authoritativeMarker,
    connector,
  };
}

function updateRemotePositionDebugGroup(debugGroup, renderedPosition, authoritativePosition) {
  if (!debugGroup || !renderedPosition || !authoritativePosition) {
    return;
  }

  debugGroup.renderedMarker.position.set(renderedPosition.x, renderedPosition.y + 0.05, renderedPosition.z);
  debugGroup.authoritativeMarker.position.set(authoritativePosition.x, authoritativePosition.y + 0.05, authoritativePosition.z);

  const positions = debugGroup.connector.geometry.attributes.position.array;
  positions[0] = renderedPosition.x;
  positions[1] = renderedPosition.y + 0.05;
  positions[2] = renderedPosition.z;
  positions[3] = authoritativePosition.x;
  positions[4] = authoritativePosition.y + 0.05;
  positions[5] = authoritativePosition.z;
  debugGroup.connector.geometry.attributes.position.needsUpdate = true;
  debugGroup.connector.geometry.computeBoundingSphere();
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

function updateRemoteHitVolumeDebugGroup(debugGroup, player, standHeight) {
  if (!debugGroup) {
    return;
  }

  const layout = computePlayerHitboxLayout({
    position: player.position,
    yaw: player.yaw ?? 0,
    currentHeight: player.currentHeight ?? standHeight,
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

function updateRemoteBoneDrivenHitVolumeDebugGroup(debugGroup, bones, localHitboxSettings) {
  if (!debugGroup) {
    return false;
  }
  const localSnapshot = captureRemoteBoneDrivenSnapshot(bones, localHitboxSettings);
  if (!localSnapshot) {
    return false;
  }

  return updateRemoteAuthoritativeHitVolumeDebugGroup(debugGroup, localSnapshot);
}

function captureRemoteBoneDrivenSnapshot(bones, localHitboxSettings) {
  if (!hasCompleteRemoteHitBones(bones)) {
    return null;
  }

  for (const [key, point] of Object.entries(REMOTE_LOCAL_HITBOX_POINTS)) {
    const bone = bones[key];
    if (!bone?.getWorldPosition) {
      return null;
    }
    bone.getWorldPosition(REMOTE_HITBOX_WORLD_POINT);
    point.x = REMOTE_HITBOX_WORLD_POINT.x;
    point.y = REMOTE_HITBOX_WORLD_POINT.y;
    point.z = REMOTE_HITBOX_WORLD_POINT.z;
  }

  return buildRemoteHitboxSnapshotFromPoints({
    points: REMOTE_LOCAL_HITBOX_POINTS,
    headOffset: localHitboxSettings.headOffset,
    headRadius: localHitboxSettings.headRadius,
    headSize: localHitboxSettings.headSize,
    torsoRadius: localHitboxSettings.torsoRadius,
    torsoTopOffset: localHitboxSettings.torsoTopOffset,
    torsoLengthPadding: localHitboxSettings.torsoLengthPadding,
    pelvisRadius: localHitboxSettings.pelvisRadius,
    pelvisLengthPadding: localHitboxSettings.pelvisLengthPadding,
    armRadius: localHitboxSettings.armRadius,
    armLengthPadding: localHitboxSettings.armLengthPadding,
    handRadius: localHitboxSettings.handRadius,
    legRadius: localHitboxSettings.legRadius,
    legLengthPadding: localHitboxSettings.legLengthPadding,
  }, REMOTE_LOCAL_HITBOX_SNAPSHOT);
}

export function createRemoteDebugAttachments() {
  const hitVolumeDebugGroup = createRemoteHitVolumeDebugGroup();
  hitVolumeDebugGroup.group.visible = false;
  const positionDebugGroup = createRemotePositionDebugGroup();
  positionDebugGroup.group.visible = false;
  const rewoundHitVolumeDebugGroup = createRemoteHitVolumeDebugGroup({
    head: 0xffb36b,
    torso: 0xffc874,
    pelvis: 0xffdf8b,
    arms: 0xffcf76,
    hands: 0xffcf76,
    legs: 0xe1a95f,
  });
  rewoundHitVolumeDebugGroup.group.visible = false;
  const rewoundPositionDebugGroup = createRemotePositionDebugGroup();
  rewoundPositionDebugGroup.renderedMarker.material.color.setHex(0x67d7ff);
  rewoundPositionDebugGroup.authoritativeMarker.material.color.setHex(0xffb347);
  rewoundPositionDebugGroup.connector.material.color.setHex(0xffb347);
  rewoundPositionDebugGroup.group.visible = false;

  return {
    hitVolumeDebugGroup,
    positionDebugGroup,
    rewoundHitVolumeDebugGroup,
    rewoundPositionDebugGroup,
    showHitVolumeDebug: false,
    latestDebugState: null,
  };
}

export function syncRemoteHitboxDebug({
  visual,
  player,
  authoritativeSnapshots,
  authoritativeState,
  showHitVolumeDebug,
  hitboxDebugSettings,
  hideForSpectator,
  debugPingRoundTripMs,
  localHitboxDebugEnabled,
  localHitboxSettings,
  standHeight,
}) {
  const rewindMs = getLagCompensationRewindMs(debugPingRoundTripMs);
  const rewoundTargetTime = getTimelineNow() - rewindMs;
  const rewoundPair = getSnapshotPairAtTime(authoritativeSnapshots, rewoundTargetTime, { timeKey: 'receivedAt' });
  const rewoundState = interpolateRemotePlayerSnapshotAtTime(authoritativeSnapshots, rewoundTargetTime);
  const debugEnabled = showHitVolumeDebug && !hideForSpectator;
  const localBoneDrivenSnapshot = captureRemoteBoneDrivenSnapshot(visual.characterHitBones, localHitboxSettings);
  let rewoundDebugPoints = rewoundState?.hitboxDebug?.points ?? null;
  let rewoundDebugHitboxes = rewoundState?.hitboxes ?? null;
  if (rewoundPair?.kind === 'between') {
    const previousPoints = rewoundPair.previousSnapshot?.hitboxDebug?.points ?? null;
    const nextPoints = rewoundPair.nextSnapshot?.hitboxDebug?.points ?? null;
    if (previousPoints && nextPoints) {
      rewoundDebugPoints = interpolateRemoteHitboxPoints(
        previousPoints,
        nextPoints,
        rewoundPair.alpha,
        REMOTE_REWOUND_HITBOX_POINTS,
      );
      rewoundDebugHitboxes = buildRemoteHitboxSnapshotFromPoints({
        points: rewoundDebugPoints,
        headOffset: REMOTE_CHARACTER_HITBOX_SETTINGS.headOffset,
        headRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.headRadius,
        headSize: REMOTE_CHARACTER_HITBOX_SETTINGS.headSize,
        torsoRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoRadius,
        torsoTopOffset: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoTopOffset,
        torsoLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.torsoLengthPadding,
        pelvisRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.pelvisRadius,
        pelvisLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.pelvisLengthPadding,
        armRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.armRadius,
        armLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.armLengthPadding,
        handRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.handRadius,
        legRadius: REMOTE_CHARACTER_HITBOX_SETTINGS.legRadius,
        legLengthPadding: REMOTE_CHARACTER_HITBOX_SETTINGS.legLengthPadding,
      }, REMOTE_REWOUND_HITBOX_SNAPSHOT);
    }
  }

  visual.hitVolumeDebugGroup.group.visible = debugEnabled && hitboxDebugSettings.showLatestHitboxes;
  visual.positionDebugGroup.group.visible = debugEnabled && hitboxDebugSettings.showLatestMarkers && Boolean(authoritativeState?.position);
  visual.rewoundHitVolumeDebugGroup.group.visible = debugEnabled && hitboxDebugSettings.showRewoundHitboxes;
  visual.rewoundPositionDebugGroup.group.visible = debugEnabled && hitboxDebugSettings.showRewoundMarkers && Boolean(rewoundState?.position);

  if (showHitVolumeDebug && !hideForSpectator && authoritativeState?.position) {
    REMOTE_DEBUG_RENDERED_POSITION.copy(visual.root.position);
    REMOTE_DEBUG_AUTHORITATIVE_POSITION.set(
      Number(authoritativeState.position.x ?? 0),
      Number(authoritativeState.position.y ?? 0),
      Number(authoritativeState.position.z ?? 0),
    );
    REMOTE_DEBUG_POSITION_DELTA.subVectors(REMOTE_DEBUG_AUTHORITATIVE_POSITION, REMOTE_DEBUG_RENDERED_POSITION);
    updateRemotePositionDebugGroup(
      visual.positionDebugGroup,
      REMOTE_DEBUG_RENDERED_POSITION,
      REMOTE_DEBUG_AUTHORITATIVE_POSITION,
    );
    visual.latestDebugState = {
      playerId: player.playerId,
      displayName: player.displayName ?? authoritativeState.displayName ?? player.playerId,
      renderedPosition: {
        x: REMOTE_DEBUG_RENDERED_POSITION.x,
        y: REMOTE_DEBUG_RENDERED_POSITION.y,
        z: REMOTE_DEBUG_RENDERED_POSITION.z,
      },
      authoritativePosition: {
        x: REMOTE_DEBUG_AUTHORITATIVE_POSITION.x,
        y: REMOTE_DEBUG_AUTHORITATIVE_POSITION.y,
        z: REMOTE_DEBUG_AUTHORITATIVE_POSITION.z,
      },
      delta: {
        x: REMOTE_DEBUG_POSITION_DELTA.x,
        y: REMOTE_DEBUG_POSITION_DELTA.y,
        z: REMOTE_DEBUG_POSITION_DELTA.z,
      },
      distance: REMOTE_DEBUG_POSITION_DELTA.length(),
      horizontalDistance: Math.hypot(REMOTE_DEBUG_POSITION_DELTA.x, REMOTE_DEBUG_POSITION_DELTA.z),
      snapshotAgeMs: Number.isFinite(authoritativeState.receivedAt) ? Math.max(0, getTimelineNow() - authoritativeState.receivedAt) : null,
      animation: visual.animationDebugState
        ? {
          presentationState: visual.animationDebugState.presentationState ?? null,
          targetClip: visual.animationDebugState.targetClip ?? null,
          delayedBaseTargetClip: visual.animationDebugState.delayedBaseTargetClip ?? null,
          baseClip: visual.animationDebugState.baseClip ?? null,
          presentationClip: visual.animationDebugState.presentationClip ?? null,
          activeCharacterClip: visual.animationDebugState.activeCharacterClip ?? null,
          activeUpperBodyClip: visual.animationDebugState.activeUpperBodyClip ?? null,
          fullBodyActionClip: visual.animationDebugState.fullBodyActionClip ?? null,
          upperBodyActionTime: Number(visual.animationDebugState.upperBodyActionTime ?? 0),
          fullBodyActionTime: Number(visual.animationDebugState.fullBodyActionTime ?? 0),
          fireBaseLocked: Boolean(visual.animationDebugState.fireBaseLocked),
          authoritativeTargetClip: authoritativeState?.hitboxDebug?.targetClip ?? null,
          authoritativeDelayedBaseTargetClip: authoritativeState?.hitboxDebug?.delayedBaseTargetClip ?? null,
          authoritativeBaseClip: authoritativeState?.hitboxDebug?.baseClip ?? null,
          authoritativePresentationClip: authoritativeState?.hitboxDebug?.presentationClip ?? null,
          authoritativeActiveClip: authoritativeState?.hitboxDebug?.activeClip ?? null,
          authoritativeFireBaseLocked: Boolean(authoritativeState?.hitboxDebug?.fireBaseLocked),
          clipTransition: visual.animationDebugState.clipTransition
            ? { ...visual.animationDebugState.clipTransition }
            : null,
          authoritativeClipTransition: authoritativeState?.hitboxDebug?.clipTransition
            ? { ...authoritativeState.hitboxDebug.clipTransition }
            : null,
          freezePose: Boolean(visual.animationDebugState.freezePose),
        }
        : null,
      playerState: {
        currentHeight: Number(player.currentHeight ?? authoritativeState?.currentHeight ?? 0),
        isCrouched: Boolean(player.isCrouched ?? authoritativeState?.isCrouched),
        pitch: Number(player.pitch ?? authoritativeState?.pitch ?? 0),
        crouchFatigue: Number(authoritativeState?.crouchFatigue ?? 0),
        crouchToggleCount: Number(authoritativeState?.crouchToggleCount ?? 0),
        timeSinceCrouchToggle: authoritativeState?.timeSinceCrouchToggle == null
          ? null
          : Number(authoritativeState.timeSinceCrouchToggle),
        activeWeaponKey: String(authoritativeState?.activeWeaponKey ?? player.activeWeaponKey ?? 'rifle'),
        presentationState: String(player.presentationState ?? authoritativeState?.presentationState ?? 'idle'),
      },
      pose: buildPoseComparisonState(
        localBoneDrivenSnapshot,
        authoritativeState?.hitboxes,
        rewoundDebugHitboxes,
        REMOTE_LOCAL_HITBOX_POINTS,
        authoritativeState?.hitboxDebug?.points,
        rewoundDebugPoints,
      ),
    };
  } else {
    visual.latestDebugState = null;
  }

  if (debugEnabled && hitboxDebugSettings.showLatestHitboxes) {
    const usedAuthoritativeHitboxes = !localHitboxDebugEnabled && updateRemoteAuthoritativeHitVolumeDebugGroup(
      visual.hitVolumeDebugGroup,
      authoritativeState?.hitboxes,
    );
    if (!usedAuthoritativeHitboxes) {
      const usedBoneDrivenHitboxes = updateRemoteBoneDrivenHitVolumeDebugGroup(
        visual.hitVolumeDebugGroup,
        visual.characterHitBones,
        localHitboxSettings,
      );
      if (!usedBoneDrivenHitboxes) {
        updateRemoteHitVolumeDebugGroup(visual.hitVolumeDebugGroup, {
          position: player.position,
          yaw: player.yaw,
          currentHeight: player.currentHeight ?? authoritativeState?.currentHeight,
          isCrouched: player.isCrouched ?? authoritativeState?.isCrouched,
          activeWeaponKey: authoritativeState?.activeWeaponKey ?? player.activeWeaponKey,
        }, standHeight);
      }
    }
    updateRemoteHeadConstructionDebugGroup(
      visual.hitVolumeDebugGroup.headConstruction,
      localHitboxDebugEnabled ? REMOTE_LOCAL_HITBOX_POINTS : authoritativeState?.hitboxDebug?.points,
      localHitboxDebugEnabled ? localBoneDrivenSnapshot?.head : authoritativeState?.hitboxes?.head,
    );
    updateRemoteUpperBodyChainDebugGroup(
      visual.hitVolumeDebugGroup.upperBodyChain,
      localHitboxDebugEnabled ? REMOTE_LOCAL_HITBOX_POINTS : authoritativeState?.hitboxDebug?.points,
    );
  }

  if (debugEnabled && hitboxDebugSettings.showRewoundHitboxes) {
    updateRemoteAuthoritativeHitVolumeDebugGroup(
      visual.rewoundHitVolumeDebugGroup,
      rewoundDebugHitboxes,
    );
    updateRemoteHeadConstructionDebugGroup(
      visual.rewoundHitVolumeDebugGroup.headConstruction,
      rewoundDebugPoints,
      rewoundDebugHitboxes?.head,
    );
    updateRemoteUpperBodyChainDebugGroup(
      visual.rewoundHitVolumeDebugGroup.upperBodyChain,
      rewoundDebugPoints,
    );
  }

  if (debugEnabled && hitboxDebugSettings.showRewoundMarkers && rewoundState?.position) {
    REMOTE_DEBUG_RENDERED_POSITION.copy(visual.root.position);
    REMOTE_DEBUG_AUTHORITATIVE_POSITION.set(
      Number(rewoundState.position.x ?? 0),
      Number(rewoundState.position.y ?? 0),
      Number(rewoundState.position.z ?? 0),
    );
    updateRemotePositionDebugGroup(
      visual.rewoundPositionDebugGroup,
      REMOTE_DEBUG_RENDERED_POSITION,
      REMOTE_DEBUG_AUTHORITATIVE_POSITION,
    );
  }

  if (visual.latestDebugState) {
    if (rewoundState?.position) {
      REMOTE_DEBUG_RENDERED_POSITION.copy(visual.root.position);
      REMOTE_DEBUG_AUTHORITATIVE_POSITION.set(
        Number(rewoundState.position.x ?? 0),
        Number(rewoundState.position.y ?? 0),
        Number(rewoundState.position.z ?? 0),
      );
      REMOTE_DEBUG_POSITION_DELTA.subVectors(REMOTE_DEBUG_AUTHORITATIVE_POSITION, REMOTE_DEBUG_RENDERED_POSITION);
      visual.latestDebugState.rewoundPosition = {
        x: REMOTE_DEBUG_AUTHORITATIVE_POSITION.x,
        y: REMOTE_DEBUG_AUTHORITATIVE_POSITION.y,
        z: REMOTE_DEBUG_AUTHORITATIVE_POSITION.z,
      };
      visual.latestDebugState.rewoundDelta = {
        x: REMOTE_DEBUG_POSITION_DELTA.x,
        y: REMOTE_DEBUG_POSITION_DELTA.y,
        z: REMOTE_DEBUG_POSITION_DELTA.z,
      };
      visual.latestDebugState.rewoundDistance = REMOTE_DEBUG_POSITION_DELTA.length();
      visual.latestDebugState.rewoundHorizontalDistance = Math.hypot(REMOTE_DEBUG_POSITION_DELTA.x, REMOTE_DEBUG_POSITION_DELTA.z);
      visual.latestDebugState.rewindMs = rewindMs;
      visual.latestDebugState.rewoundSnapshotAgeMs = Number.isFinite(rewoundState.receivedAt)
        ? Math.max(0, getTimelineNow() - rewoundState.receivedAt)
        : null;
    } else {
      visual.latestDebugState.rewoundPosition = null;
      visual.latestDebugState.rewoundDelta = null;
      visual.latestDebugState.rewoundDistance = 0;
      visual.latestDebugState.rewoundHorizontalDistance = 0;
      visual.latestDebugState.rewindMs = rewindMs;
      visual.latestDebugState.rewoundSnapshotAgeMs = null;
    }
  }
}

export function collectRemoteHitboxDebugState(remotePlayerMeshes, showHitVolumeDebug, hitboxDebugSettings) {
  let focus = null;
  for (const visual of remotePlayerMeshes.values()) {
    if (!visual?.latestDebugState) {
      continue;
    }
    if (!focus || Number(visual.latestDebugState.horizontalDistance ?? 0) > Number(focus.horizontalDistance ?? 0)) {
      focus = visual.latestDebugState;
    }
  }

  return {
    showHitVolumeDebug,
    trackedRemoteCount: remotePlayerMeshes.size,
    focusPlayerId: focus?.playerId ?? null,
    focusDisplayName: focus?.displayName ?? null,
    renderedPosition: focus?.renderedPosition ?? null,
    authoritativePosition: focus?.authoritativePosition ?? null,
    delta: focus?.delta ?? null,
    distance: focus?.distance ?? 0,
    horizontalDistance: focus?.horizontalDistance ?? 0,
    snapshotAgeMs: focus?.snapshotAgeMs ?? null,
    rewoundPosition: focus?.rewoundPosition ?? null,
    rewoundDelta: focus?.rewoundDelta ?? null,
    rewoundDistance: focus?.rewoundDistance ?? 0,
    rewoundHorizontalDistance: focus?.rewoundHorizontalDistance ?? 0,
    rewoundSnapshotAgeMs: focus?.rewoundSnapshotAgeMs ?? null,
    rewindMs: focus?.rewindMs ?? 0,
    animation: focus?.animation ?? null,
    playerState: focus?.playerState ?? null,
    pose: focus?.pose ?? null,
    settings: { ...hitboxDebugSettings },
  };
}
