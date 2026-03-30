import { init as initRecast, NavMeshQuery } from 'recast-navigation';
import { generateSoloNavMesh } from 'recast-navigation/generators';

let recastInitPromise = null;

function ensureRecastInit() {
  if (!recastInitPromise) {
    recastInitPromise = initRecast();
  }

  return recastInitPromise;
}

function getGeometryArrays(geometry) {
  const positions = geometry.getAttribute('position');
  const indices = geometry.index;

  if (!positions) {
    return { positions: [], indices: [] };
  }

  const positionArray = Array.from(positions.array);
  const indexArray = indices
    ? Array.from(indices.array)
    : Array.from({ length: positions.count }, (_, index) => index);

  return {
    positions: positionArray,
    indices: indexArray,
  };
}

export class NavigationManager {
  constructor() {
    this.ready = false;
    this.navMesh = null;
    this.query = null;
    this.buildToken = 0;
  }

  async initialize(collisionGeometry) {
    this.destroy();
    this.buildToken += 1;
    const token = this.buildToken;

    if (!collisionGeometry) {
      return false;
    }

    await ensureRecastInit();
    if (token !== this.buildToken) {
      return false;
    }

    const { positions, indices } = getGeometryArrays(collisionGeometry);
    if (positions.length === 0 || indices.length === 0) {
      return false;
    }

    const { success, navMesh } = generateSoloNavMesh(positions, indices, {
      cs: 0.2,
      ch: 0.2,
      walkableSlopeAngle: 55,
      walkableHeight: 10,
      walkableClimb: 4,
      walkableRadius: 2,
      maxEdgeLen: 20,
      maxSimplificationError: 1.15,
      minRegionArea: 12,
      mergeRegionArea: 24,
      maxVertsPerPoly: 6,
      detailSampleDist: 4,
      detailSampleMaxError: 0.8,
    });

    if (!success || token !== this.buildToken) {
      navMesh?.destroy?.();
      return false;
    }

    this.navMesh = navMesh;
    this.query = new NavMeshQuery(navMesh);
    this.query.defaultQueryHalfExtents = { x: 4, y: 6, z: 4 };
    this.ready = true;
    return true;
  }

  projectPoint(point) {
    if (!this.ready || !this.query) {
      return null;
    }

    const result = this.query.findClosestPoint(point);
    return result.success ? result.point : null;
  }

  getRandomPointAround(point, radius) {
    if (!this.ready || !this.query) {
      return null;
    }

    const result = this.query.findRandomPointAroundCircle(point, radius);
    return result.success ? result.randomPoint : null;
  }

  getRandomPoint() {
    if (!this.ready || !this.query) {
      return null;
    }

    const result = this.query.findRandomPoint();
    return result.success ? result.randomPoint : null;
  }

  computePath(start, end) {
    if (!this.ready || !this.query) {
      return [];
    }

    const result = this.query.computePath(start, end, {
      maxPathPolys: 512,
      maxStraightPathPoints: 512,
    });

    return result.success ? result.path : [];
  }

  destroy() {
    this.ready = false;
    this.query?.destroy?.();
    this.navMesh?.destroy?.();
    this.query = null;
    this.navMesh = null;
  }
}
