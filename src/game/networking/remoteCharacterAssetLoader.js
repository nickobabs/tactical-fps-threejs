export function createRemoteCharacterAssetLoader({
  buildRemoteCharacterAnimations,
  normalizeClipStartTime,
}) {
  const remoteCharacterAssetPromises = new Map();
  const remoteExternalClipPromises = new Map();

  async function loadExternalRemoteClip(path) {
    if (!remoteExternalClipPromises.has(path)) {
      remoteExternalClipPromises.set(path, (async () => {
        const [{ FBXLoader }] = await Promise.all([
          import('three/examples/jsm/loaders/FBXLoader.js'),
        ]);
        const loader = new FBXLoader();
        const object = await loader.loadAsync(path);
        const sourceClip = object.animations?.[0] ?? null;
        if (!sourceClip) {
          throw new Error(`Missing animation clip in external FBX: ${path}`);
        }

        return normalizeClipStartTime(sourceClip);
      })());
    }

    return remoteExternalClipPromises.get(path);
  }

  async function loadRemoteCharacterAsset(definition) {
    if (!definition) {
      throw new Error('Missing remote character definition.');
    }

    if (!remoteCharacterAssetPromises.has(definition.id)) {
      remoteCharacterAssetPromises.set(definition.id, (async () => {
        const [{ GLTFLoader }, SkeletonUtils] = await Promise.all([
          import('three/examples/jsm/loaders/GLTFLoader.js'),
          import('three/examples/jsm/utils/SkeletonUtils.js'),
        ]);
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(definition.modelPath);
        const externalClipEntries = await Promise.all(
          Object.entries(definition.externalClips ?? {}).map(async ([clipName, clipConfig]) => {
            if (!clipConfig?.path) {
              return [clipName, null];
            }

            const clip = await loadExternalRemoteClip(clipConfig.path).catch((error) => {
              console.warn(
                `[RemotePlayerPresenter] Failed to load external experimental clip "${clipName}". Falling back to GLB clip.`,
                error,
              );
              return null;
            });
            return [clipName, clip];
          }),
        );
        const externalClipOverrides = Object.fromEntries(externalClipEntries.filter(([, clip]) => Boolean(clip)));
        const { baseClips, upperBodyClips } = buildRemoteCharacterAnimations(
          gltf.animations ?? [],
          definition,
          externalClipOverrides,
        );
        return {
          scene: gltf.scene,
          animations: baseClips,
          upperBodyAnimations: upperBodyClips,
          cloneSkinned: SkeletonUtils.clone,
          definition,
        };
      })());
    }

    return remoteCharacterAssetPromises.get(definition.id);
  }

  return {
    loadRemoteCharacterAsset,
  };
}
