import { NavigationManager } from './NavigationManager.js';

function getGeometryArrays(geometry) {
  const positions = geometry.getAttribute('position');
  const indices = geometry.index;

  if (!positions) {
    return { positions: [], indices: [] };
  }

  return {
    positions: Array.from(positions.array),
    indices: indices
      ? Array.from(indices.array)
      : Array.from({ length: positions.count }, (_, index) => index),
  };
}

export async function buildNavigationManagerFromCollisionGeometry(collisionGeometry) {
  if (!collisionGeometry) {
    return { success: false, navigationManager: new NavigationManager() };
  }

  const [{ generateSoloNavMesh }, navigationManager] = await Promise.all([
    import('recast-navigation/generators'),
    Promise.resolve(new NavigationManager()),
  ]);

  const { positions, indices } = getGeometryArrays(collisionGeometry);
  if (positions.length === 0 || indices.length === 0) {
    return { success: false, navigationManager };
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

  if (!success) {
    navMesh?.destroy?.();
    return { success: false, navigationManager };
  }

  const navMeshExport = await navigationManager.exportNavMeshFromRuntime(navMesh);
  navMesh.destroy?.();
  if (!navMeshExport) {
    return { success: false, navigationManager };
  }

  const initialized = await navigationManager.initialize(null, { navMeshExport });
  if (!initialized) {
    navigationManager.destroy();
    return { success: false, navigationManager };
  }

  return { success: true, navigationManager };
}
