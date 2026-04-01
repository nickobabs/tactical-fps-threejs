import { MAP_MANIFEST, getMapManifestEntry } from '../../shared/maps/mapManifest.js';
import { createMapFromManifest, preloadMapAssets } from './mapAssetLoader.js';

function createCachedBinaryLoader(path) {
  let promise = null;

  return async () => {
    if (!promise) {
      promise = fetch(path).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
        }

        return new Uint8Array(await response.arrayBuffer());
      });
    }

    const data = await promise;
    return data.slice();
  };
}

function createMapPreloader(entry) {
  return () => preloadMapAssets(entry);
}

export const MAP_OPTIONS = MAP_MANIFEST.map((entry) => ({
  id: entry.id,
  label: entry.label,
  preload: createMapPreloader(entry),
  loadNavigationData: entry.assets?.navigation?.path
    ? createCachedBinaryLoader(entry.assets.navigation.path)
    : null,
  create: () => createMapFromManifest(entry),
  supportsAuthoritativeNetworking: entry.networking?.authoritativeMovement !== false,
  manifest: entry,
}));

export function getMapOption(mapId) {
  return MAP_OPTIONS.find((option) => option.id === mapId) ?? null;
}

export async function preloadMapOptions(mapIds = MAP_OPTIONS.map((option) => option.id)) {
  const preloadPromises = mapIds.flatMap((mapId) => {
    const option = getMapOption(mapId);
    return [option?.preload?.(), option?.loadNavigationData?.()].filter(Boolean);
  });
  await Promise.allSettled(preloadPromises);
}

export function getMapManifest(mapId) {
  return getMapManifestEntry(mapId);
}
