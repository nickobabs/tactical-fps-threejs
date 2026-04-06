function clonePose(pose) {
  return {
    position: [...pose.position],
    rotation: [...pose.rotation],
    scale: pose.scale,
  };
}

export function createRemoteTuningStore({
  storageKey,
  defaultSocketPoses,
  defaultCharacterSettings,
  defaultDebugSettings,
}) {
  let cache = null;

  function cloneRemoteDebugSettings(settings = defaultDebugSettings) {
    return {
      freezePose: Boolean(settings.freezePose),
      freezeClip: String(settings.freezeClip ?? defaultDebugSettings.freezeClip),
      localHitboxDebug: Boolean(settings.localHitboxDebug),
    };
  }

  function cloneRemoteAimSettings(settings = defaultCharacterSettings.aim) {
    const normalizeAxis = (value, fallback) => {
      const nextValue = String(value ?? fallback).toLowerCase();
      return nextValue === 'x' || nextValue === 'y' || nextValue === 'z' ? nextValue : fallback;
    };

    return {
      weaponAxis: normalizeAxis(settings.weaponAxis, defaultCharacterSettings.aim.weaponAxis),
      proxyWeaponAxis: normalizeAxis(settings.proxyWeaponAxis, defaultCharacterSettings.aim.proxyWeaponAxis),
      boneAxis: normalizeAxis(settings.boneAxis, defaultCharacterSettings.aim.boneAxis),
      boneStrength: Number.isFinite(Number(settings.boneStrength))
        ? Number(settings.boneStrength)
        : defaultCharacterSettings.aim.boneStrength,
      weaponStrength: Number.isFinite(Number(settings.weaponStrength))
        ? Number(settings.weaponStrength)
        : defaultCharacterSettings.aim.weaponStrength,
    };
  }

  function cloneRemoteHitboxSettings(settings = defaultCharacterSettings.hitboxes) {
    const headOffset = settings?.headOffset ?? defaultCharacterSettings.hitboxes.headOffset;
    return {
      headOffset: {
        x: Number.isFinite(Number(headOffset.x)) ? Number(headOffset.x) : defaultCharacterSettings.hitboxes.headOffset.x,
        y: Number.isFinite(Number(headOffset.y)) ? Number(headOffset.y) : defaultCharacterSettings.hitboxes.headOffset.y,
        z: Number.isFinite(Number(headOffset.z)) ? Number(headOffset.z) : defaultCharacterSettings.hitboxes.headOffset.z,
      },
      headRadius: Number.isFinite(Number(settings?.headRadius))
        ? Number(settings.headRadius)
        : defaultCharacterSettings.hitboxes.headRadius,
    };
  }

  function persist() {
    if (typeof window === 'undefined' || !cache) {
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify(cache));
  }

  function registerWindowApi() {
    if (typeof window === 'undefined') {
      return;
    }

    window.__remoteWeaponTuning = {
      get poses() {
        return JSON.parse(JSON.stringify(cache.weaponPoses));
      },
      get character() {
        return JSON.parse(JSON.stringify(cache.character));
      },
      get debug() {
        return JSON.parse(JSON.stringify(cache.debug));
      },
      setPose(key, patch) {
        if (!cache?.weaponPoses?.[key]) {
          throw new Error(`Unknown remote weapon pose key: ${key}`);
        }
        if (Array.isArray(patch?.position) && patch.position.length === 3) {
          cache.weaponPoses[key].position = patch.position.map((value) => Number(value ?? 0));
        }
        if (Array.isArray(patch?.rotation) && patch.rotation.length === 3) {
          cache.weaponPoses[key].rotation = patch.rotation.map((value) => Number(value ?? 0));
        }
        if (Number.isFinite(Number(patch?.scale))) {
          cache.weaponPoses[key].scale = Number(patch.scale);
        }
        persist();
        return JSON.parse(JSON.stringify(cache.weaponPoses[key]));
      },
      setModelScale(value) {
        if (!Number.isFinite(Number(value))) {
          throw new Error('Model scale must be finite.');
        }
        cache.character.modelScale = Number(value);
        persist();
        return cache.character.modelScale;
      },
      setAim(patch) {
        cache.character.aim = cloneRemoteAimSettings({
          ...cache.character.aim,
          ...patch,
        });
        persist();
        return JSON.parse(JSON.stringify(cache.character.aim));
      },
      setHitboxes(patch) {
        cache.character.hitboxes = cloneRemoteHitboxSettings({
          ...cache.character.hitboxes,
          ...patch,
        });
        persist();
        return JSON.parse(JSON.stringify(cache.character.hitboxes));
      },
      setDebug(patch) {
        cache.debug = cloneRemoteDebugSettings({
          ...cache.debug,
          ...patch,
        });
        persist();
        return JSON.parse(JSON.stringify(cache.debug));
      },
      reset() {
        window.localStorage.removeItem(storageKey);
        cache = null;
        return ensure();
      },
      save() {
        persist();
      },
    };
  }

  function ensure() {
    if (cache) {
      return cache;
    }

    const nextCache = {
      weaponPoses: {},
      character: {
        modelScale: defaultCharacterSettings.modelScale,
        aim: cloneRemoteAimSettings(),
        hitboxes: cloneRemoteHitboxSettings(),
      },
      debug: cloneRemoteDebugSettings(),
    };

    for (const [key, pose] of Object.entries(defaultSocketPoses)) {
      nextCache.weaponPoses[key] = clonePose(pose);
    }

    if (typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          const parsedWeaponPoses = parsed.weaponPoses ?? parsed;
          for (const [key, pose] of Object.entries(parsedWeaponPoses)) {
            if (!nextCache.weaponPoses[key]) {
              continue;
            }
            if (Array.isArray(pose?.position) && pose.position.length === 3) {
              nextCache.weaponPoses[key].position = pose.position.map((value) => Number(value ?? 0));
            }
            if (Array.isArray(pose?.rotation) && pose.rotation.length === 3) {
              nextCache.weaponPoses[key].rotation = pose.rotation.map((value) => Number(value ?? 0));
            }
            if (Number.isFinite(Number(pose?.scale))) {
              nextCache.weaponPoses[key].scale = Number(pose.scale);
            }
          }
          if (Number.isFinite(Number(parsed.character?.modelScale))) {
            nextCache.character.modelScale = Number(parsed.character.modelScale);
          } else if (Number.isFinite(Number(parsed.modelScale))) {
            nextCache.character.modelScale = Number(parsed.modelScale);
          }
          if (parsed.character?.aim) {
            nextCache.character.aim = cloneRemoteAimSettings(parsed.character.aim);
          }
          if (parsed.character?.hitboxes) {
            nextCache.character.hitboxes = cloneRemoteHitboxSettings(parsed.character.hitboxes);
          }
          if (parsed.debug) {
            nextCache.debug = cloneRemoteDebugSettings(parsed.debug);
          }
        }
      } catch (error) {
        console.warn('[RemotePlayerPresenter] Failed to load remote weapon tuning from localStorage.', error);
      }
    }

    cache = nextCache;
    registerWindowApi();
    return cache;
  }

  return {
    ensure,
    getCharacterModelScale() {
      return ensure().character.modelScale;
    },
    getAimSettings() {
      return ensure().character.aim;
    },
    getHitboxSettings() {
      return ensure().character.hitboxes;
    },
    getDebugSettings() {
      return ensure().debug;
    },
  };
}
