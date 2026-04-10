export const MAP_MANIFEST = [
  {
    id: 'training-ground',
    label: 'Training Ground',
    layoutId: 'training-ground',
    networking: {
      authoritativeMovement: true,
    },
    gameplay: {
      source: 'shared-layout',
      plantZones: [
        {
          name: 'training-default',
          center: { x: 0, y: 0, z: -1 },
          halfExtents: { x: 4.5, z: 4.5 },
        },
      ],
    },
    assets: {
      navigation: {
        format: 'recast-navmesh-binary',
        path: '/navmeshes/training-ground.bin',
        buildSource: 'shared-layout',
      },
      collision: {
        source: 'shared-layout',
      },
      render: {
        source: 'runtime-factory',
        runtimeId: 'training-ground',
      },
    },
  },
  {
    id: 'desert-compound',
    label: 'Desert Compound',
    layoutId: 'desert-compound',
    networking: {
      authoritativeMovement: true,
    },
    gameplay: {
      source: 'shared-layout',
      plantZones: [
        {
          name: 'site-a',
          center: { x: -24, y: 0, z: -22 },
          halfExtents: { x: 5.5, z: 5.5 },
        },
        {
          name: 'site-b',
          center: { x: 24, y: 0, z: -22 },
          halfExtents: { x: 5.5, z: 5.5 },
        },
      ],
    },
    assets: {
      navigation: {
        format: 'recast-navmesh-binary',
        path: '/navmeshes/desert-compound.bin',
        buildSource: 'shared-layout',
      },
      collision: {
        source: 'shared-layout',
      },
      render: {
        source: 'runtime-factory',
        runtimeId: 'desert-compound',
      },
    },
  },
  {
    id: 'dust2-import-test',
    label: 'Dust2 Legacy Import',
    networking: {
      authoritativeMovement: true,
    },
    gameplay: {
      source: 'defaults',
      movementMode: 'grounded',
      allowGroundedMode: true,
      spawnPoint: {
        x: -16.871,
        y: 1122,
        z: 1388.2
      },
      groundHeight: 1115,
    },
    assets: {
      navigation: {
        format: 'recast-navmesh-binary',
        path: '/navmeshes/dust2-import-test.bin',
        buildSource: 'gltf-scene',
      },
      collision: {
        source: 'gltf-scene',
        path: '/maps/de_dust2_collision.glb',
      },
      render: {
        source: 'gltf-scene',
        path: '/maps/de_dust2_-_cs_map.glb',
      },
    },
  },
  {
    id: 'dust2-map-test',
    label: 'Dust2 Test',
    networking: {
      authoritativeMovement: true,
    },
    gameplay: {
      source: 'defaults',
      movementMode: 'grounded',
      allowGroundedMode: true,
      spawnMarkers: [
        'spawn_01',
        'spawn_02',
        'spawn_03',
        'spawn_04',
        'spawn_05',
        'spawn_06',
        'spawn_07',
        'spawn_08',
        'spawn_09',
        'spawn_10',
      ],
      teamSpawnMarkers: {
        attackers: [
          'spawn_01',
          'spawn_02',
          'spawn_03',
          'spawn_04',
          'spawn_05',
        ],
        defenders: [
          'spawn_06',
          'spawn_07',
          'spawn_08',
          'spawn_09',
          'spawn_10',
        ],
      },
      plantableMarkerPrefix: 'plantable_',
    },
    assets: {
      navigation: {
        format: 'recast-navmesh-binary',
        path: '/navmeshes/dust2-import-test.bin',
        buildSource: 'gltf-scene',
      },
      collision: {
        source: 'gltf-scene',
        path: '/maps/d2colltest.glb',
      },
      render: {
        source: 'gltf-scene',
        path: '/maps/d2maptestv3.glb',
      },
    },
  },
];

export function getMapManifestEntry(mapId) {
  return MAP_MANIFEST.find((entry) => entry.id === mapId) ?? null;
}
