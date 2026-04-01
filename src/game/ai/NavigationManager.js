let recastCoreModulePromise = null;

async function loadRecastCoreModules() {
  if (!recastCoreModulePromise) {
    recastCoreModulePromise = import('recast-navigation').then(async (recastNavigation) => {
      await recastNavigation.init();
      return {
        NavMeshQuery: recastNavigation.NavMeshQuery,
        importNavMesh: recastNavigation.importNavMesh,
        exportNavMesh: recastNavigation.exportNavMesh,
      };
    });
  }

  return recastCoreModulePromise;
}

export function preloadNavigationModules() {
  return loadRecastCoreModules();
}

function normalizeNavMeshExport(navMeshExport) {
  if (navMeshExport instanceof Uint8Array) {
    return navMeshExport;
  }

  if (navMeshExport instanceof ArrayBuffer) {
    return new Uint8Array(navMeshExport);
  }

  return null;
}

export class NavigationManager {
  constructor() {
    this.ready = false;
    this.navMesh = null;
    this.query = null;
    this.buildToken = 0;
  }

  async initialize(_collisionGeometry, options = {}) {
    this.destroy();
    this.buildToken += 1;

    const normalizedNavMeshExport = normalizeNavMeshExport(options.navMeshExport);
    return normalizedNavMeshExport
      ? this.initializeFromNavMeshExport(normalizedNavMeshExport, this.buildToken)
      : false;
  }

  async initializeFromNavMeshExport(navMeshExport, token = this.buildToken) {
    const { NavMeshQuery, importNavMesh } = await loadRecastCoreModules();
    if (token !== this.buildToken) {
      return false;
    }

    const { navMesh } = importNavMesh(navMeshExport);
    if (!navMesh || token !== this.buildToken) {
      navMesh?.destroy?.();
      return false;
    }

    this.navMesh = navMesh;
    this.query = new NavMeshQuery(navMesh);
    this.query.defaultQueryHalfExtents = { x: 4, y: 6, z: 4 };
    this.ready = true;
    return true;
  }

  async exportNavMesh() {
    if (!this.navMesh) {
      return null;
    }

    const { exportNavMesh } = await loadRecastCoreModules();
    return exportNavMesh(this.navMesh);
  }

  async exportNavMeshFromRuntime(navMesh) {
    if (!navMesh) {
      return null;
    }

    const { exportNavMesh } = await loadRecastCoreModules();
    return exportNavMesh(navMesh);
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
