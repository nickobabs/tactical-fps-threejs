import * as THREE from 'three';

export const VIEWMODEL_LAYER = 1;

const BORROWED_VIEWMODEL_PATH = '/models/viewmodels/cube-gunman/hand_base.glb';
const BORROWED_ARM_TEXTURE_PATH = '/models/viewmodels/cube-gunman/textures/role.TF2.heavy.png';
const BORROWED_WEAPON_TEXTURES = {
  rifle: '/models/viewmodels/cube-gunman/textures/weapon.AK47.jpg',
  knife: '/models/viewmodels/cube-gunman/textures/weapon.M9.jpg',
};

let borrowedViewModelAssetPromise = null;
const texturePromiseCache = new Map();

function setLayerRecursive(object, layer) {
  object.layers.set(layer);
  object.children.forEach((child) => setLayerRecursive(child, layer));
}

function createPart(geometry, material, position, rotation = null) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  if (rotation) {
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);
  }
  return mesh;
}

function createCommonMaterials() {
  return {
    dark: new THREE.MeshStandardMaterial({
      color: 0x24282d,
      roughness: 0.68,
      metalness: 0.24,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: 0x7a5b37,
      roughness: 0.94,
      metalness: 0.03,
    }),
    detail: new THREE.MeshStandardMaterial({
      color: 0x171a1f,
      roughness: 0.62,
      metalness: 0.3,
    }),
  };
}

function createMuzzleFlash(muzzle) {
  const flash = new THREE.Mesh(
    new THREE.ConeGeometry(0.07, 0.22, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffd18c,
      transparent: true,
      opacity: 0,
    }),
  );
  flash.rotation.x = Math.PI / 2;
  flash.position.set(0, 0, -0.06);
  return flash;
}

function createHiddenFlash() {
  const flash = new THREE.Mesh(
    new THREE.SphereGeometry(0.001, 4, 4),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    }),
  );
  flash.visible = false;
  return flash;
}

function loadTextureCached(path, configure = null) {
  if (!texturePromiseCache.has(path)) {
    const loader = new THREE.TextureLoader();
    texturePromiseCache.set(path, loader.loadAsync(path).then((texture) => {
      configure?.(texture);
      return texture;
    }));
  }
  return texturePromiseCache.get(path);
}

async function loadBorrowedViewModelAsset() {
  if (!borrowedViewModelAssetPromise) {
    borrowedViewModelAssetPromise = (async () => {
      const [{ GLTFLoader }, SkeletonUtils] = await Promise.all([
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/utils/SkeletonUtils.js'),
      ]);
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(BORROWED_VIEWMODEL_PATH);
      return { gltf, clone: SkeletonUtils.clone };
    })();
  }
  return borrowedViewModelAssetPromise;
}

function configureBorrowedMaterials(root, meshName, weaponKey, armTexture, weaponTexture) {
  const armMaterial = new THREE.MeshBasicMaterial({ map: armTexture });
  const weaponMaterial = new THREE.MeshBasicMaterial({ map: weaponTexture, side: THREE.DoubleSide });

  root.traverse((object) => {
    if (!object.isSkinnedMesh) {
      return;
    }
    object.frustumCulled = false;

    if (object.name === 'Arms') {
      object.visible = true;
      object.material = armMaterial;
      return;
    }

    if (object.name === meshName) {
      object.visible = true;
      object.material = weaponMaterial;
      return;
    }

    object.visible = false;
  });

  root.userData.weaponKey = weaponKey;
}

function createBorrowedAnimatedViewModel({
  weaponKey,
  meshName,
  animationPrefix,
  muzzlePosition,
  muzzleFlashFactory,
  rootOffset = null,
}) {
  const group = new THREE.Group();
  const content = new THREE.Group();
  const muzzle = new THREE.Object3D();
  muzzle.position.copy(muzzlePosition);
  const muzzleFlash = muzzleFlashFactory(muzzle);
  muzzle.add(muzzleFlash);

  group.add(content);
  group.add(muzzle);
  setLayerRecursive(group, VIEWMODEL_LAYER);

  let mixer = null;
  let actions = null;
  let equipFinishedHandlerAttached = false;

  const ensureActions = () => {
    if (!actions) {
      return null;
    }
    return actions;
  };

  const playStaticPose = (action) => {
    if (!action) {
      return;
    }
    action.enabled = true;
    action.reset();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    action.paused = true;
    action.getMixer?.()?.update(0);
  };

  const playLoop = (action) => {
    if (!action) {
      return;
    }
    if ((action.getClip?.().duration ?? 0) <= 0.0001) {
      playStaticPose(action);
      return;
    }
    action.enabled = true;
    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.clampWhenFinished = false;
    action.fadeIn(0.05);
    action.play();
  };

  const playOneShot = (action) => {
    if (!action) {
      return;
    }
    action.enabled = true;
    action.reset();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = false;
    action.fadeIn(0.02);
    action.play();
    action.getMixer?.()?.update(0);
  };

  const playEquipSequence = () => {
    const liveActions = ensureActions();
    if (!liveActions) {
      return;
    }

    liveActions.hold?.stop();
    liveActions.fire?.stop();

    if (!liveActions.equip) {
      playLoop(liveActions.hold);
      return;
    }

    playOneShot(liveActions.equip);
  };

  loadBorrowedViewModelAsset()
    .then(async ({ gltf, clone }) => {
      const [armTexture, weaponTexture] = await Promise.all([
        loadTextureCached(BORROWED_ARM_TEXTURE_PATH, (texture) => {
          texture.generateMipmaps = false;
          texture.magFilter = THREE.NearestFilter;
          texture.minFilter = THREE.NearestFilter;
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.flipY = false;
        }),
        loadTextureCached(BORROWED_WEAPON_TEXTURES[weaponKey], (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.flipY = false;
        }),
      ]);

      const root = clone(gltf.scene);
      if (rootOffset) {
        root.position.copy(rootOffset.position ?? new THREE.Vector3());
        root.rotation.set(
          rootOffset.rotation?.x ?? 0,
          rootOffset.rotation?.y ?? 0,
          rootOffset.rotation?.z ?? 0,
        );
        root.scale.setScalar(rootOffset.scale ?? 1);
      }

      configureBorrowedMaterials(root, meshName, weaponKey, armTexture, weaponTexture);
      setLayerRecursive(root, VIEWMODEL_LAYER);
      content.add(root);

      mixer = new THREE.AnimationMixer(root);
      actions = {
        hold: null,
        equip: null,
        fire: null,
      };

      for (const clip of gltf.animations) {
        if (!clip.name.startsWith(`${animationPrefix}_`)) {
          continue;
        }
        const suffix = clip.name.slice(animationPrefix.length + 1);
        if (suffix === 'hold' || suffix === 'equip' || suffix === 'fire') {
          actions[suffix] = mixer.clipAction(clip, root);
        }
      }

      if (!equipFinishedHandlerAttached) {
        mixer.addEventListener('finished', (event) => {
          if (event.action !== actions?.equip) {
            return;
          }
          if ((actions?.hold?.getClip?.().duration ?? 0) <= 0.0001) {
            actions?.equip?.stop();
            playLoop(actions?.hold);
          } else if (actions?.hold) {
            actions.hold.enabled = true;
            actions.hold.reset();
            actions.hold.setLoop(THREE.LoopRepeat, Infinity);
            actions.hold.clampWhenFinished = false;
            actions.hold.play();
            actions.hold.crossFadeFrom(actions.equip, 0.06, false);
          } else {
            playLoop(actions?.hold);
          }
        });
        equipFinishedHandlerAttached = true;
      }

      if (group.visible) {
        content.visible = false;
        playEquipSequence();
        mixer.update(1 / 120);
        content.visible = true;
      }
    })
    .catch((error) => {
      console.warn(`[viewModels] Failed to load borrowed ${weaponKey} viewmodel`, error);
    });

  return {
    group,
    muzzle,
    muzzleFlash,
    update(delta) {
      if (mixer && group.visible) {
        mixer.update(delta);
      }
    },
    onSelected() {
      content.visible = false;
      playEquipSequence();
      mixer?.update(1 / 120);
      content.visible = true;
    },
    playFire() {
      const liveActions = ensureActions();
      if (!liveActions) {
        return;
      }
      playOneShot(liveActions.fire);
    },
    getMuzzleOffset() {
      return {
        x: muzzle.position.x,
        y: muzzle.position.y,
        z: muzzle.position.z,
      };
    },
    setMuzzleOffset(nextOffset) {
      muzzle.position.set(
        nextOffset?.x ?? muzzle.position.x,
        nextOffset?.y ?? muzzle.position.y,
        nextOffset?.z ?? muzzle.position.z,
      );
    },
  };
}

function createSniperViewModel() {
  const group = new THREE.Group();
  const materials = createCommonMaterials();
  const scopeMaterial = new THREE.MeshStandardMaterial({
    color: 0x111519,
    roughness: 0.58,
    metalness: 0.32,
  });

  const body = createPart(
    new THREE.BoxGeometry(0.18, 0.16, 1.05),
    materials.dark,
    new THREE.Vector3(0, -0.01, -0.12),
  );
  const stock = createPart(
    new THREE.BoxGeometry(0.11, 0.12, 0.46),
    materials.accent,
    new THREE.Vector3(0.01, -0.01, 0.62),
    new THREE.Vector3(-0.08, 0, -0.06),
  );
  const forearm = createPart(
    new THREE.BoxGeometry(0.14, 0.1, 0.42),
    materials.accent,
    new THREE.Vector3(0, -0.02, -0.78),
  );
  const barrel = createPart(
    new THREE.CylinderGeometry(0.022, 0.022, 1.05, 12),
    materials.detail,
    new THREE.Vector3(0, 0, -1.38),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const scopeBody = createPart(
    new THREE.CylinderGeometry(0.08, 0.08, 0.54, 16),
    scopeMaterial,
    new THREE.Vector3(0, 0.15, -0.26),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const scopeFront = createPart(
    new THREE.CylinderGeometry(0.095, 0.095, 0.08, 16),
    scopeMaterial,
    new THREE.Vector3(0, 0.15, -0.56),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );
  const scopeRear = createPart(
    new THREE.CylinderGeometry(0.085, 0.085, 0.08, 16),
    scopeMaterial,
    new THREE.Vector3(0, 0.15, 0.04),
    new THREE.Vector3(Math.PI / 2, 0, 0),
  );

  const muzzle = new THREE.Object3D();
  muzzle.position.set(0, 0, -1.93);
  const muzzleFlash = createMuzzleFlash(muzzle);
  muzzle.add(muzzleFlash);

  group.add(body, stock, forearm, barrel, scopeBody, scopeFront, scopeRear);
  group.add(muzzle);
  setLayerRecursive(group, VIEWMODEL_LAYER);

  return {
    group,
    muzzle,
    muzzleFlash,
    update() {},
    onSelected() {},
    playFire() {},
    getMuzzleOffset() {
      return {
        x: muzzle.position.x,
        y: muzzle.position.y,
        z: muzzle.position.z,
      };
    },
    setMuzzleOffset(nextOffset) {
      muzzle.position.set(
        nextOffset?.x ?? muzzle.position.x,
        nextOffset?.y ?? muzzle.position.y,
        nextOffset?.z ?? muzzle.position.z,
      );
    },
  };
}

function createRifleViewModel() {
  return createBorrowedAnimatedViewModel({
    weaponKey: 'rifle',
    meshName: 'AK47_1',
    animationPrefix: 'AK47',
    muzzlePosition: new THREE.Vector3(0.676, 0.048, -1.265),
    muzzleFlashFactory: createMuzzleFlash,
    rootOffset: {
      position: new THREE.Vector3(0.18, -1.02, -0.18),
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
      scale: 1,
    },
  });
}

function createKnifeViewModel() {
  return createBorrowedAnimatedViewModel({
    weaponKey: 'knife',
    meshName: 'M9_1',
    animationPrefix: 'M9',
    muzzlePosition: new THREE.Vector3(0.28, 0.04, -0.3),
    muzzleFlashFactory: createHiddenFlash,
    rootOffset: {
      position: new THREE.Vector3(0.16, -0.98, -0.08),
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
      scale: 1,
    },
  });
}

export function createWeaponViewModels() {
  return {
    rifle: createRifleViewModel(),
    sniper: createSniperViewModel(),
    knife: createKnifeViewModel(),
  };
}
