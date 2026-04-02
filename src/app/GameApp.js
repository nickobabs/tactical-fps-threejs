import * as THREE from 'three';
import { InputManager } from '../core/input/InputManager.js';
import { MAP_OPTIONS, getMapOption, preloadMapOptions } from '../game/maps/mapOptions.js';
import { MapRuntime } from '../game/maps/MapRuntime.js';
import { createHud } from '../game/ui/Hud.js';
import { SKYBOX_OPTIONS, getSkyboxOption } from '../game/skyboxes/skyboxOptions.js';
import { SkyboxManager, preloadSkyboxModules } from '../game/skyboxes/SkyboxManager.js';
import { AudioManager } from '../game/audio/AudioManager.js';
import { NetworkClient } from '../game/networking/NetworkClient.js';
import { preloadNavigationModules } from '../game/ai/NavigationManager.js';
import { FixedStepLoop } from '../core/loop/FixedStepLoop.js';
import { NETCODE_SIMULATION_STEP } from '../shared/netcode.js';

const REMOTE_PLAYER_STAND_HEIGHT = 1.72;
const REMOTE_PLAYER_CROUCH_HEIGHT = 1.16;
const REMOTE_PLAYER_BODY_RADIUS = 0.35;
const REMOTE_PLAYER_WEAPON_SIDE_X = 0.44;
const REMOTE_PLAYER_WEAPON_FORWARD_Z = -0.1;
const REMOTE_FIRE_FLASH_DURATION = 0.06;
const REMOTE_HIT_REACTION_DURATION = 0.18;
const REMOTE_DEATH_TRANSITION_DURATION = 0.26;
const REMOTE_CHARACTER_MODEL_PATH = '/models/players/free_animated_low_poly_cartoon_skeleton.glb';
const REMOTE_CHARACTER_IDLE_CLIP = 'idle';
const REMOTE_CHARACTER_RUN_CLIP = 'run';

const REMOTE_CHARACTER_BOX = new THREE.Box3();
const REMOTE_CHARACTER_SIZE = new THREE.Vector3();
const REMOTE_CHARACTER_CENTER = new THREE.Vector3();
const REMOTE_CHARACTER_ROOT_WORLD = new THREE.Vector3();
let REMOTE_CHARACTER_ASSET_PROMISE = null;

async function loadRemoteCharacterAsset() {
  if (!REMOTE_CHARACTER_ASSET_PROMISE) {
    REMOTE_CHARACTER_ASSET_PROMISE = (async () => {
      const [{ GLTFLoader }, SkeletonUtils] = await Promise.all([
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/utils/SkeletonUtils.js'),
      ]);
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(REMOTE_CHARACTER_MODEL_PATH);
      return {
        scene: gltf.scene,
        animations: gltf.animations ?? [],
        cloneSkinned: SkeletonUtils.clone,
      };
    })();
  }

  return REMOTE_CHARACTER_ASSET_PROMISE;
}

function normalizeRemoteClipName(name) {
  return String(name ?? '')
    .split(/[|/\\]/)
    .pop()
    .trim()
    .toLowerCase();
}

function createLabelTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(8, 12, 18, 0.78)';
  context.fillRect(12, 10, canvas.width - 24, canvas.height - 20);
  context.strokeStyle = 'rgba(149, 196, 255, 0.7)';
  context.lineWidth = 2;
  context.strokeRect(12, 10, canvas.width - 24, canvas.height - 20);
  context.fillStyle = '#f3f8ff';
  context.font = '600 24px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRemoteWeaponMesh(weaponKey) {
  const group = new THREE.Group();
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b2128,
    roughness: 0.62,
    metalness: 0.2,
  });
  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x76614a,
    roughness: 0.82,
    metalness: 0.06,
  });

  const addMesh = (geometry, material, position, rotation = null) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.copy(position);
    if (rotation) {
      mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    group.add(mesh);
  };

  if (weaponKey === 'sniper') {
    addMesh(new THREE.BoxGeometry(0.08, 0.08, 0.72), darkMaterial, new THREE.Vector3(0, 0, 0));
    addMesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.54, 10),
      darkMaterial,
      new THREE.Vector3(0, 0.012, -0.58),
      new THREE.Vector3(Math.PI / 2, 0, 0),
    );
    addMesh(
      new THREE.CylinderGeometry(0.036, 0.036, 0.24, 12),
      darkMaterial,
      new THREE.Vector3(0, 0.065, -0.04),
      new THREE.Vector3(Math.PI / 2, 0, 0),
    );
    addMesh(new THREE.BoxGeometry(0.06, 0.1, 0.24), accentMaterial, new THREE.Vector3(0, -0.01, 0.34));
    group.position.set(0, -0.03, -0.34);
  } else if (weaponKey === 'knife') {
    addMesh(
      new THREE.CylinderGeometry(0.014, 0.016, 0.16, 10),
      darkMaterial,
      new THREE.Vector3(0, -0.03, 0.04),
      new THREE.Vector3(Math.PI / 2, 0, 0),
    );
    addMesh(new THREE.BoxGeometry(0.024, 0.05, 0.018), darkMaterial, new THREE.Vector3(0, -0.03, -0.05));
    addMesh(
      new THREE.ConeGeometry(0.028, 0.34, 4),
      accentMaterial,
      new THREE.Vector3(0, -0.02, -0.25),
      new THREE.Vector3(-Math.PI / 2, Math.PI / 4, 0),
    );
    group.position.set(0, -0.05, -0.12);
  } else {
    addMesh(new THREE.BoxGeometry(0.09, 0.09, 0.54), darkMaterial, new THREE.Vector3(0, 0, 0));
    addMesh(new THREE.BoxGeometry(0.07, 0.07, 0.32), accentMaterial, new THREE.Vector3(0, -0.01, -0.34));
    addMesh(
      new THREE.CylinderGeometry(0.016, 0.016, 0.44, 10),
      darkMaterial,
      new THREE.Vector3(0, 0.01, -0.66),
      new THREE.Vector3(Math.PI / 2, 0, 0),
    );
    addMesh(new THREE.BoxGeometry(0.05, 0.12, 0.08), darkMaterial, new THREE.Vector3(0, -0.1, -0.05));
    group.position.set(0, -0.02, -0.28);
  }

  const flash = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({
      color: 0xffd08a,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  );
  flash.position.set(0, 0, -0.9);
  flash.visible = false;
  group.add(flash);
  group.userData.flash = flash;

  group.userData.dispose = () => {
    for (const child of group.children) {
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    }
  };
  return group;
}

function createRemotePlayerVisual(displayName, bodyMaterial) {
  const root = new THREE.Group();

  const body = new THREE.Group();
  const bodyCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(REMOTE_PLAYER_BODY_RADIUS, REMOTE_PLAYER_BODY_RADIUS, 1, 18),
    bodyMaterial,
  );
  bodyCylinder.castShadow = true;
  bodyCylinder.receiveShadow = true;
  body.add(bodyCylinder);

  const bodyTop = new THREE.Mesh(
    new THREE.SphereGeometry(REMOTE_PLAYER_BODY_RADIUS, 18, 12),
    bodyMaterial,
  );
  bodyTop.castShadow = true;
  bodyTop.receiveShadow = true;
  body.add(bodyTop);

  const bodyBottom = new THREE.Mesh(
    new THREE.SphereGeometry(REMOTE_PLAYER_BODY_RADIUS, 18, 12),
    bodyMaterial,
  );
  bodyBottom.castShadow = true;
  bodyBottom.receiveShadow = true;
  body.add(bodyBottom);
  root.add(body);

  const weaponAnchor = new THREE.Group();
  weaponAnchor.position.set(REMOTE_PLAYER_WEAPON_SIDE_X, 0.9, REMOTE_PLAYER_WEAPON_FORWARD_Z);
  weaponAnchor.rotation.set(0.12, 0, -0.18);
  root.add(weaponAnchor);

  const labelSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createLabelTexture(displayName),
      transparent: true,
      depthWrite: false,
    }),
  );
  labelSprite.position.set(0, 2.15, 0);
  labelSprite.scale.set(1.6, 0.4, 1);
  root.add(labelSprite);

  return {
    root,
    body,
    bodyCylinder,
    bodyTop,
    bodyBottom,
    weaponAnchor,
    weaponMesh: null,
    weaponKey: null,
    labelSprite,
    flashTime: 0,
    hitReactionTime: 0,
    deathTransitionTime: 0,
    lastAlive: true,
    characterRoot: null,
    characterMixer: null,
    characterActions: new Map(),
    activeCharacterClip: null,
    characterLoadState: 'idle',
    characterWeaponBone: null,
    characterBasePosition: new THREE.Vector3(),
  };
}

function setRemotePlayerWeapon(visual, weaponKey) {
  const nextWeaponKey = weaponKey || 'rifle';
  if (visual.weaponKey === nextWeaponKey) {
    return;
  }

  if (visual.weaponMesh) {
    visual.weaponMesh.parent?.remove(visual.weaponMesh);
    visual.weaponMesh.userData.dispose?.();
  }

  visual.weaponMesh = createRemoteWeaponMesh(nextWeaponKey);
  visual.weaponKey = nextWeaponKey;
  (visual.characterWeaponBone ?? visual.weaponAnchor).add(visual.weaponMesh);
}

function triggerRemotePlayerFireFlash(visual) {
  if (!visual) {
    return;
  }

  visual.flashTime = REMOTE_FIRE_FLASH_DURATION;
}

function triggerRemotePlayerHitReaction(visual, { killed = false } = {}) {
  if (!visual) {
    return;
  }

  visual.hitReactionTime = REMOTE_HIT_REACTION_DURATION;
  if (killed) {
    visual.deathTransitionTime = REMOTE_DEATH_TRANSITION_DURATION;
  }
}

function setRemoteCharacterClip(visual, clipName) {
  if (!visual.characterMixer || !visual.characterActions?.size || visual.activeCharacterClip === clipName) {
    return;
  }

  const normalizedClipName = normalizeRemoteClipName(clipName);
  let nextAction = visual.characterActions.get(normalizedClipName) ?? null;
  if (!nextAction) {
    const fallbackEntry = [...visual.characterActions.entries()].find(([name]) => name.includes(normalizedClipName));
    nextAction = fallbackEntry?.[1] ?? null;
  }
  if (!nextAction) {
    return;
  }

  const previousAction = visual.activeCharacterClip
    ? visual.characterActions.get(visual.activeCharacterClip) ?? null
    : null;

  if (previousAction && previousAction !== nextAction) {
    previousAction.fadeOut(0.12);
  }

  nextAction.reset().fadeIn(0.12).play();
  visual.activeCharacterClip = clipName;
}

function disposeRemoteCharacterModel(visual) {
  if (visual.characterRoot) {
    visual.root.remove(visual.characterRoot);
    visual.characterRoot.traverse((child) => {
      child.geometry?.dispose?.();
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material?.dispose?.());
      } else {
        child.material?.dispose?.();
      }
    });
  }

  visual.characterMixer?.stopAllAction?.();
  visual.characterRoot = null;
  visual.characterMixer = null;
  visual.characterActions.clear();
  visual.activeCharacterClip = null;
  visual.characterWeaponBone = null;
  visual.characterBasePosition.set(0, 0, 0);
}

function attachRemoteCharacterModel(visual, asset) {
  if (!visual || visual.characterLoadState === 'ready') {
    return;
  }

  const characterRoot = asset.cloneSkinned(asset.scene);
  characterRoot.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;
    }
  });

  characterRoot.updateMatrixWorld(true);
  REMOTE_CHARACTER_BOX.setFromObject(characterRoot);
  REMOTE_CHARACTER_BOX.getSize(REMOTE_CHARACTER_SIZE);
  const baseHeight = Math.max(REMOTE_CHARACTER_SIZE.y, 1e-3);
  const scale = REMOTE_PLAYER_STAND_HEIGHT / baseHeight;
  characterRoot.scale.setScalar(scale);

  characterRoot.updateMatrixWorld(true);
  REMOTE_CHARACTER_BOX.setFromObject(characterRoot);
  const rootJoint = characterRoot.getObjectByName('_rootJoint') ?? characterRoot.getObjectByName('belly_01') ?? null;
  if (rootJoint) {
    rootJoint.getWorldPosition(REMOTE_CHARACTER_ROOT_WORLD);
    characterRoot.position.set(-REMOTE_CHARACTER_ROOT_WORLD.x, -REMOTE_CHARACTER_BOX.min.y, -REMOTE_CHARACTER_ROOT_WORLD.z);
  } else {
    REMOTE_CHARACTER_BOX.getCenter(REMOTE_CHARACTER_CENTER);
    characterRoot.position.set(-REMOTE_CHARACTER_CENTER.x, -REMOTE_CHARACTER_BOX.min.y, -REMOTE_CHARACTER_CENTER.z);
  }

  visual.root.add(characterRoot);
  visual.characterRoot = characterRoot;
  visual.characterMixer = new THREE.AnimationMixer(characterRoot);
  visual.characterBasePosition.copy(characterRoot.position);
  visual.characterWeaponBone = characterRoot.getObjectByName('hand.R_013')
    ?? characterRoot.getObjectByName('hand.R')
    ?? characterRoot.getObjectByName('hand_r')
    ?? (() => {
      let match = null;
      characterRoot.traverse((child) => {
        if (!match && child.isBone && /hand[\._ ]?r/i.test(child.name)) {
          match = child;
        }
      });
      return match;
    })();
  visual.characterActions.clear();

  for (const clip of asset.animations) {
    const action = visual.characterMixer.clipAction(clip);
    action.enabled = true;
    action.setLoop(THREE.LoopRepeat, Infinity);
    visual.characterActions.set(normalizeRemoteClipName(clip.name), action);
  }

  visual.characterLoadState = 'ready';
  visual.body.visible = false;
  if (visual.weaponMesh) {
    visual.weaponMesh.parent?.remove(visual.weaponMesh);
    (visual.characterWeaponBone ?? visual.weaponAnchor).add(visual.weaponMesh);
  }
  setRemoteCharacterClip(visual, REMOTE_CHARACTER_IDLE_CLIP);
}

function ensureRemoteCharacterModel(visual) {
  if (!visual || visual.characterLoadState === 'loading' || visual.characterLoadState === 'ready') {
    return;
  }

  visual.characterLoadState = 'loading';
  void loadRemoteCharacterAsset()
    .then((asset) => {
      attachRemoteCharacterModel(visual, asset);
    })
    .catch((error) => {
      visual.characterLoadState = 'failed';
      console.warn('[GameApp] Failed to load remote character model. Falling back to proxy body.', error);
    });
}

function updateRemotePlayerVisual(visual, player, delta, authoritativeState, bodyMaterials) {
  const height = Math.max(
    0.8,
    Number(player.currentHeight ?? authoritativeState?.currentHeight ?? REMOTE_PLAYER_STAND_HEIGHT),
  );
  const isAlive = authoritativeState?.isAlive !== false;
  const isCrouched = Boolean(player.isCrouched ?? authoritativeState?.isCrouched);
  const cylinderHeight = Math.max(0.05, height - REMOTE_PLAYER_BODY_RADIUS * 2);
  const presentationState = String(player.presentationState ?? authoritativeState?.presentationState ?? 'idle');
  const isAir = presentationState === 'air';
  const isScoped = Boolean(player.isScoped ?? authoritativeState?.isScoped);
  const isScopedStance = isScoped || presentationState === 'scoped-idle' || presentationState === 'scoped-move';
  const previousAlive = visual.lastAlive !== false;
  if (previousAlive && !isAlive) {
    visual.deathTransitionTime = REMOTE_DEATH_TRANSITION_DURATION;
  }
  visual.lastAlive = isAlive;

  visual.bodyCylinder.material = isAlive ? bodyMaterials.alive : bodyMaterials.dead;
  visual.bodyTop.material = isAlive ? bodyMaterials.alive : bodyMaterials.dead;
  visual.bodyBottom.material = isAlive ? bodyMaterials.alive : bodyMaterials.dead;
  visual.body.visible = visual.characterLoadState !== 'ready';
  visual.root.position.set(player.position.x, player.position.y, player.position.z);
  if (visual.hitReactionTime > 0) {
    visual.hitReactionTime = Math.max(0, visual.hitReactionTime - delta);
  }
  if (visual.deathTransitionTime > 0) {
    visual.deathTransitionTime = Math.max(0, visual.deathTransitionTime - delta);
  }

  const hitAlpha = Math.max(0, Math.min(1, visual.hitReactionTime / REMOTE_HIT_REACTION_DURATION));
  const deathAlpha = isAlive
    ? 0
    : 1 - Math.max(0, Math.min(1, visual.deathTransitionTime / REMOTE_DEATH_TRANSITION_DURATION));
  const forwardFlinch = hitAlpha * 0.08;
  const sideFlinch = hitAlpha * 0.04;
  const deathLean = deathAlpha * 0.92;

  visual.root.rotation.set(
    (isAir ? -0.16 : 0) - forwardFlinch + deathLean * 0.28,
    player.yaw,
    (isAir ? 0.08 : 0) - sideFlinch + deathLean,
  );
  visual.root.position.y += hitAlpha * 0.02;

  visual.body.position.y = height * 0.5;
  visual.bodyCylinder.scale.y = cylinderHeight;
  visual.bodyTop.position.y = cylinderHeight * 0.5;
  visual.bodyBottom.position.y = -cylinderHeight * 0.5;
  visual.labelSprite.position.y = height + 0.43;
  visual.labelSprite.material.opacity = isAlive ? 1 : 0.82;
  visual.weaponAnchor.position.set(
    isScopedStance ? REMOTE_PLAYER_WEAPON_SIDE_X * 0.72 : REMOTE_PLAYER_WEAPON_SIDE_X,
    Math.max(0.58, height * (isCrouched ? 0.64 : (isScopedStance ? 0.6 : 0.52))),
    isScopedStance ? REMOTE_PLAYER_WEAPON_FORWARD_Z - 0.22 : REMOTE_PLAYER_WEAPON_FORWARD_Z,
  );
  visual.weaponAnchor.rotation.set(
    isScopedStance ? 0.04 : 0.12,
    0,
    isScopedStance ? -0.08 : -0.18,
  );
  visual.weaponAnchor.visible = isAlive && !visual.characterWeaponBone;

  if (visual.characterMixer) {
    visual.characterMixer.update(delta);
    const targetClip = presentationState.includes('move')
      ? REMOTE_CHARACTER_RUN_CLIP
      : REMOTE_CHARACTER_IDLE_CLIP;
    setRemoteCharacterClip(visual, targetClip);
    if (visual.characterRoot) {
      visual.characterRoot.visible = isAlive;
      visual.characterRoot.rotation.set(0, Math.PI, 0);
      visual.characterRoot.position.copy(visual.characterBasePosition);
      visual.characterRoot.position.y += isAlive ? 0 : -0.04;
    }
  }

  if (visual.weaponMesh) {
    visual.weaponMesh.visible = isAlive;
    if (visual.characterWeaponBone) {
      visual.weaponMesh.position.set(0.02, 0.02, 0.02);
      visual.weaponMesh.rotation.set(Math.PI, -Math.PI / 2, 0.12);
      visual.weaponMesh.scale.setScalar(isScopedStance ? 0.9 : 1);
    }
  }

  if (visual.flashTime > 0) {
    visual.flashTime = Math.max(0, visual.flashTime - delta);
  }
  const flash = visual.weaponMesh?.userData?.flash ?? null;
  if (flash) {
    const normalizedFlash = Math.max(0, Math.min(1, visual.flashTime / REMOTE_FIRE_FLASH_DURATION));
    flash.visible = normalizedFlash > 0.01;
    flash.material.opacity = normalizedFlash * 0.95;
    flash.scale.setScalar(0.6 + (1 - normalizedFlash) * 0.65);
  }
}

function disposeRemotePlayerVisual(visual) {
  visual.weaponAnchor.remove(visual.weaponMesh);
  visual.weaponMesh?.userData.dispose?.();
  disposeRemoteCharacterModel(visual);
  visual.bodyCylinder.geometry.dispose();
  visual.bodyTop.geometry.dispose();
  visual.bodyBottom.geometry.dispose();
  visual.labelSprite.material.map?.dispose?.();
  visual.labelSprite.material.dispose();
}

export class GameApp {
  constructor(root) {
    this.root = root;
    this.clock = new THREE.Clock();
    this.isPaused = false;
    this.isLoadingMap = false;
    this.loadingStatus = '';
    this.currentFps = 0;
    this.mouseSensitivity = 0.0011;
    this.mapLoadToken = 0;
    this.authoritativeNetworkingEnabled = true;
    this.networkJumpQueued = false;
    this.ignoreLocalCorrections = false;
    this.lastSentWeaponKey = null;
    this.lastSentScopedState = false;
    this.markDebugSnapshotRequested = false;
    this.debugMarkers = [];
    this.nextDebugMarkerId = 1;
    this.showCollisionDebug = false;
    this.collisionDebugMesh = null;
    this.fatalErrorEl = null;
    this.localSimulationLoop = new FixedStepLoop(NETCODE_SIMULATION_STEP);
    this.audioManager = new AudioManager({ masterVolume: 0.6 });
    this.audioManager.registerSound('rifle-fire', '/audio/m4a1_silencer_01.mp3', {
      playback: 'interrupt',
    });
    this.audioManager.registerSound('sniper-fire', '/audio/awp-shoot-sound-effect-cs_go.mp3', {
      playback: 'interrupt',
    });
    this.audioManager.registerSound('sniper-zoom', '/audio/awp-zoom-sound-effect-cs-go.mp3', {
      playback: 'interrupt',
      minIntervalMs: 80,
    });
    this.audioManager.registerSound('knife-slash', '/audio/sword-slash-4.mp3', {
      playback: 'interrupt',
    });
    this.networkClient = new NetworkClient();
    this.remotePlayerMeshes = new Map();
    this.remotePlayerMaterial = new THREE.MeshStandardMaterial({
      color: 0x54c7f2,
      roughness: 0.55,
      metalness: 0.08,
    });
    this.remotePlayerDeadMaterial = new THREE.MeshStandardMaterial({
      color: 0x6f2a2a,
      roughness: 0.7,
      metalness: 0.05,
    });
    this.damageVignette = 0;
    this.hitDamagePopups = [];

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c1218);
    this.scene.fog = new THREE.Fog(0x0c1218, 120, 320);
    this.selectedMapId = MAP_OPTIONS[0].id;
    this.selectedSkyboxId = SKYBOX_OPTIONS[0].id;

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      500,
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.92;
    this.root.appendChild(this.renderer.domElement);
    this.skyboxManager = new SkyboxManager(this.scene, this.renderer);
    this.setSkybox(this.selectedSkyboxId);

    this.input = new InputManager(this.renderer.domElement);
    this.runtime = null;

    this.scene.add(this.createLighting());
    this.rebuildHud();
    void this.loadMap(this.selectedMapId);
    this.scheduleAsyncWarmup();

    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
  }

  start() {
    window.addEventListener('resize', this.onResize);
    this.renderer.setAnimationLoop(this.animate);
  }

  stop() {
    window.removeEventListener('resize', this.onResize);
    this.renderer.setAnimationLoop(null);
  }

  destroy() {
    this.stop();
    this.input.destroy();
    this.hud.destroy();
    this.fatalErrorEl?.remove();
    this.clearRemotePlayers();
    this.unloadMap();
    this.skyboxManager.dispose();
    this.networkClient.destroy();
    this.audioManager.destroy();
    this.remotePlayerMaterial.dispose();
    this.remotePlayerDeadMaterial.dispose();
    this.disposeCollisionDebugMesh();
    this.renderer.dispose();
  }

  rebuildHud() {
    this.hud?.destroy();
    this.hud = createHud({
      container: this.root,
      input: this.input,
      roundManager: this.runtime?.roundManager ?? null,
      weaponManager: this.runtime?.weaponManager ?? null,
      utilityManager: this.runtime?.utilityManager ?? null,
      networkClient: this.networkClient,
      playerController: this.runtime?.playerController ?? null,
      getDamageVignette: () => this.damageVignette,
      getHitDamagePopups: () => this.hitDamagePopups,
      getFps: () => this.currentFps,
      getMasterVolume: () => this.audioManager.getMasterVolume(),
      getMouseSensitivity: () => this.mouseSensitivity,
      onResume: () => this.resumeGame(),
      onSelectMap: (mapId) => this.loadMap(mapId),
      onSensitivityChange: (value) => this.setMouseSensitivity(value),
      onVolumeChange: (volume) => this.audioManager.setMasterVolume(volume),
      maps: MAP_OPTIONS,
      getSelectedMapId: () => this.selectedMapId,
      getIsLoading: () => this.isLoadingMap,
      getLoadingStatus: () => this.loadingStatus,
      getIgnoreLocalCorrections: () => this.ignoreLocalCorrections,
      consumeMarkDebugSnapshotRequested: () => {
        const requested = this.markDebugSnapshotRequested;
        this.markDebugSnapshotRequested = false;
        return requested;
      },
      onSelectSkybox: (skyboxId) => this.setSkybox(skyboxId),
      skyboxes: SKYBOX_OPTIONS,
      getSelectedSkyboxId: () => this.selectedSkyboxId,
    });
    this.hud.setPaused(this.isPaused);
  }

  unloadMap() {
    this.clearRemotePlayers();
    this.disposeCollisionDebugMesh();
    this.runtime?.destroy(this.scene);
    this.runtime = null;
  }

  createCollisionDebugMesh(collisionGeometry) {
    if (!collisionGeometry) {
      return null;
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(collisionGeometry, material);
    mesh.frustumCulled = false;
    mesh.renderOrder = 1000;
    return mesh;
  }

  disposeCollisionDebugMesh() {
    if (!this.collisionDebugMesh) {
      return;
    }

    this.scene.remove(this.collisionDebugMesh);
    this.collisionDebugMesh.material.dispose();
    this.collisionDebugMesh = null;
  }

  syncCollisionDebugMesh() {
    this.disposeCollisionDebugMesh();

    if (!this.showCollisionDebug || !this.runtime?.map?.collisionGeometry) {
      return;
    }

    this.collisionDebugMesh = this.createCollisionDebugMesh(this.runtime.map.collisionGeometry);
    if (this.collisionDebugMesh) {
      this.scene.add(this.collisionDebugMesh);
    }
  }

  toggleCollisionDebug() {
    this.showCollisionDebug = !this.showCollisionDebug;
    this.syncCollisionDebugMesh();
  }

  getGameplaySyncEnabled() {
    return this.authoritativeNetworkingEnabled
      && this.runtime?.playerController?.getMovementMode?.() !== 'fly';
  }

  syncLocalPlayerToNetwork() {
    if (!this.runtime?.playerController || !this.authoritativeNetworkingEnabled) {
      return;
    }

    this.networkClient.initializeLocalPlayer({
      mapId: this.selectedMapId,
      position: {
        x: this.runtime.playerController.position.x,
        y: this.runtime.playerController.position.y,
        z: this.runtime.playerController.position.z,
      },
      velocity: {
        x: this.runtime.playerController.velocity.x,
        y: this.runtime.playerController.velocity.y,
        z: this.runtime.playerController.velocity.z,
      },
      yaw: this.runtime.playerController.yawAngle,
      isGrounded: this.runtime.playerController.isGrounded,
      isCrouched: this.runtime.playerController.isCrouched,
      currentHeight: this.runtime.playerController.currentHeight,
      activeWeaponKey: this.runtime.weaponManager?.activeWeaponKey ?? 'rifle',
    });
    this.lastSentWeaponKey = this.runtime.weaponManager?.activeWeaponKey ?? 'rifle';
    this.lastSentScopedState = Boolean(this.runtime.weaponManager?.isScoped);
  }

  syncCombatNetworkingMode() {
    this.runtime?.weaponManager?.setCombatNetworking({
      authoritativeCombatEnabled: this.getGameplaySyncEnabled(),
        onFireRequest: (fireRequest) => {
          if (!this.getGameplaySyncEnabled()) {
            return;
          }

          this.networkClient.sendFireRequest(fireRequest);
        },
        onWeaponChanged: (activeWeaponKey) => {
          if (!this.getGameplaySyncEnabled()) {
            return;
          }

          this.networkClient.sendPlayerStatus({
            activeWeaponKey,
            isScoped: Boolean(this.runtime?.weaponManager?.isScoped),
          });
          this.lastSentWeaponKey = activeWeaponKey;
          this.lastSentScopedState = Boolean(this.runtime?.weaponManager?.isScoped);
        },
      });
  }

  toggleFlyMode() {
    if (!this.runtime?.playerController) {
      return;
    }

    const nextMode = this.runtime.playerController.toggleFlyMode();
    this.networkJumpQueued = false;
    this.localSimulationLoop.accumulator = 0;

    if (nextMode === 'fly') {
      this.syncCombatNetworkingMode();
      this.networkClient.suspendGameplaySync();
      this.clearRemotePlayers();
      return;
    }

    if (this.authoritativeNetworkingEnabled) {
      this.syncLocalPlayerToNetwork();
    }
    this.syncCombatNetworkingMode();
  }

  getCurrentPlayerPosition() {
    if (!this.runtime?.playerController) {
      return null;
    }

    return {
      x: Number(this.runtime.playerController.position.x.toFixed(3)),
      y: Number(this.runtime.playerController.position.y.toFixed(3)),
      z: Number(this.runtime.playerController.position.z.toFixed(3)),
      mode: this.runtime.playerController.getMovementMode?.() ?? 'grounded',
      mapId: this.selectedMapId,
    };
  }

  logCurrentPosition() {
    const position = this.getCurrentPlayerPosition();
    if (!position) {
      return;
    }

    console.log('[MapDebug] position', position);
  }

  saveDebugMarker() {
    const position = this.getCurrentPlayerPosition();
    if (!position) {
      return;
    }

    const marker = {
      id: `marker-${this.nextDebugMarkerId}`,
      ...position,
    };
    this.nextDebugMarkerId += 1;
    this.debugMarkers.push(marker);
    console.log('[MapDebug] saved marker', marker);
  }

  dumpDebugMarkers() {
    console.log('[MapDebug] markers', JSON.stringify(this.debugMarkers, null, 2));
  }

  async loadMap(mapId) {
    const mapOption = getMapOption(mapId);
    if (!mapOption) {
      return;
    }

    const loadToken = ++this.mapLoadToken;
    this.isLoadingMap = true;
    this.isPaused = true;
    this.hud?.setPaused(true);
    let runtime = null;

    try {
      runtime = await MapRuntime.create({
        mapOption,
        camera: this.camera,
        input: this.input,
        scene: this.scene,
        audioManager: this.audioManager,
        mouseSensitivity: this.mouseSensitivity,
        onStatusChange: (status) => {
          this.loadingStatus = status;
        },
      });
      if (loadToken !== this.mapLoadToken) {
        return;
      }

      this.unloadMap();
      this.selectedMapId = mapOption.id;
      this.authoritativeNetworkingEnabled = mapOption.supportsAuthoritativeNetworking !== false;
      this.runtime = runtime;
      this.networkJumpQueued = false;
      this.lastSentWeaponKey = null;
      this.lastSentScopedState = false;
      this.localSimulationLoop.accumulator = 0;
      this.runtime.attachToScene(this.scene);
      this.syncCollisionDebugMesh();
      if (this.getGameplaySyncEnabled()) {
        this.syncLocalPlayerToNetwork();
      } else {
        this.networkClient.suspendGameplaySync();
      }
      runtime = null;

      this.loadingStatus = '';
      this.isLoadingMap = false;
      this.syncCombatNetworkingMode();
      this.rebuildHud();
    } catch (error) {
      console.error(`Failed to load map "${mapOption.id}".`, error);

      if (loadToken === this.mapLoadToken) {
        this.loadingStatus = '';
        this.isLoadingMap = false;
        this.rebuildHud();
      }
    } finally {
      runtime?.destroy(this.scene);
    }
  }

  async setSkybox(skyboxId) {
    const skybox = getSkyboxOption(skyboxId);
    if (!skybox) {
      return;
    }

    this.selectedSkyboxId = skybox.id;
    await this.skyboxManager.setSkybox(skybox.path, {
      backgroundIntensity: 0.92,
      environmentIntensity: 0.65,
    });
  }

  setMouseSensitivity(value) {
    this.mouseSensitivity = Math.max(0.0001, value);
    this.runtime?.playerController?.setMouseSensitivity(this.mouseSensitivity);
  }

  createLighting() {
    const group = new THREE.Group();

    const hemi = new THREE.HemisphereLight(0xb8d7ff, 0x162027, 1.9);
    group.add(hemi);

    const sun = new THREE.DirectionalLight(0xfff2db, 1.5);
    sun.position.set(18, 30, 12);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 90;
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40;
    sun.shadow.camera.bottom = -40;
    group.add(sun);

    return group;
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  scheduleAsyncWarmup() {
    const warmup = () => {
      void Promise.allSettled([
        preloadMapOptions(),
        preloadNavigationModules(),
        preloadSkyboxModules(),
      ]);
    };

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => warmup(), { timeout: 2000 });
      return;
    }

    window.setTimeout(warmup, 250);
  }

  animate() {
    try {
      const delta = Math.min(this.clock.getDelta(), 0.05);
      this.damageVignette = Math.max(0, this.damageVignette - delta * 1.8);
      this.hitDamagePopups = this.hitDamagePopups
        .map((popup) => ({
          ...popup,
          life: popup.life - delta,
        }))
        .filter((popup) => popup.life > 0);
      this.currentFps = delta > 0 ? Math.round(1 / delta) : 0;
      const frameInput = this.input.consumeFrameState();

      if (frameInput.justPressed.has('Escape')) {
        this.isPaused ? this.resumeGame() : this.pauseGame();
      }

      if (frameInput.justPressed.has('F9')) {
        this.ignoreLocalCorrections = !this.ignoreLocalCorrections;
      }

      if (frameInput.justPressed.has('F10')) {
        this.markDebugSnapshotRequested = true;
      }

      if (frameInput.justPressed.has('KeyV')) {
        this.toggleFlyMode();
      }

      if (frameInput.justPressed.has('KeyJ')) {
        this.logCurrentPosition();
      }

      if (frameInput.justPressed.has('KeyK')) {
        this.saveDebugMarker();
      }

      if (frameInput.justPressed.has('KeyL')) {
        this.dumpDebugMarkers();
      }

      if (frameInput.justPressed.has('KeyB')) {
        this.toggleCollisionDebug();
      }

      if (!this.isLoadingMap && this.runtime?.playerController) {
        const localCombatState = this.networkClient.getLocalPlayerState?.();
        const localPlayerAlive = localCombatState?.isAlive !== false;
        if (frameInput.justPressed.has('Space')) {
          this.networkJumpQueued = true;
        }

        if (!this.isPaused) {
          this.syncCombatNetworkingMode();
          this.runtime.playerController.updateLook(frameInput.lookDelta);
          if (localPlayerAlive) {
            this.localSimulationLoop.advance(delta, (simulationStep) => {
              const movementInput = this.runtime.playerController.getMovementInputSnapshot({
                jumpPressed: this.networkJumpQueued,
              });
              const speedMultiplier = this.runtime.playerController.getCurrentSpeedMultiplier();

              this.runtime.playerController.stepSimulation(simulationStep, movementInput, speedMultiplier);
              if (this.getGameplaySyncEnabled()) {
                this.networkClient.sampleLocalInput(movementInput, {
                  simulationStep,
                  speedMultiplier,
                  predictedPosition: this.runtime.playerController.position,
                  activeWeaponKey: this.runtime.weaponManager.activeWeaponKey,
                });
              }

              this.networkJumpQueued = false;
            });
            this.runtime.weaponManager.update(delta, frameInput);
            const activeWeaponKey = this.runtime.weaponManager.activeWeaponKey ?? 'rifle';
            const isScoped = Boolean(this.runtime.weaponManager.isScoped);
            if (
              this.getGameplaySyncEnabled()
              && (activeWeaponKey !== this.lastSentWeaponKey || isScoped !== this.lastSentScopedState)
            ) {
              this.networkClient.sendPlayerStatus({ activeWeaponKey, isScoped });
              this.lastSentWeaponKey = activeWeaponKey;
              this.lastSentScopedState = isScoped;
            }
          } else {
            this.localSimulationLoop.accumulator = 0;
            this.networkJumpQueued = false;
          }
        }

        this.runtime.roundManager.update(delta);
        this.runtime.utilityManager.update(delta);
        if (this.getGameplaySyncEnabled()) {
          this.networkClient.update(delta);
          for (const event of this.networkClient.consumeCombatEvents()) {
            if (event?.type === 'player-fired') {
              const visual = this.remotePlayerMeshes.get(event.playerId);
              if (visual) {
                if (event.weaponKey && event.weaponKey !== visual.weaponKey) {
                  setRemotePlayerWeapon(visual, event.weaponKey);
                }
                triggerRemotePlayerFireFlash(visual);
              }
            }

            if (event?.type === 'player-hit') {
              const victimVisual = this.remotePlayerMeshes.get(event.victimPlayerId);
              if (victimVisual) {
                triggerRemotePlayerHitReaction(victimVisual, { killed: Boolean(event.killed) });
              }

              if (event.attackerPlayerId === this.networkClient.playerId) {
                this.hitDamagePopups.push({
                  id: `${performance.now()}-${Math.random()}`,
                  text: String(event.damage ?? 0),
                  life: 0.7,
                });
              }

              if (event.victimPlayerId === this.networkClient.playerId) {
                this.damageVignette = Math.min(1, this.damageVignette + 0.35);
              }
            }
          }

          const authoritativeCorrection = this.networkClient.consumeLocalCorrection();
          if (authoritativeCorrection && !this.ignoreLocalCorrections) {
            this.runtime.playerController.reconcileAuthoritativeState(authoritativeCorrection);
          }
        } else {
          this.networkClient.suspendGameplaySync();
        }
        this.runtime.playerController.updatePresentation(
          delta,
          this.localSimulationLoop.accumulator / NETCODE_SIMULATION_STEP,
        );

        this.runtime.targetManager.update(delta, {
          playerPosition: this.runtime.playerController.position,
          playerEyePosition: this.runtime.playerController.getEyePosition(),
          collisionWorld: this.runtime.collisionWorld,
          navigationManager: this.runtime.navigationManager,
        });
        if (this.getGameplaySyncEnabled()) {
          this.syncRemotePlayers(this.networkClient.getRemotePlayers(), delta);
        } else {
          this.clearRemotePlayers();
        }
      } else {
        this.clearRemotePlayers();
      }

      this.hud.update();

      this.renderer.render(this.scene, this.camera);
    } catch (error) {
      this.stop();
      this.showFatalError(error);
      console.error('Fatal runtime error in GameApp.animate()', error);
    }
  }

  pauseGame() {
    this.isPaused = true;
    this.localSimulationLoop.accumulator = 0;
    this.hud?.setPaused(true);
    if (document.pointerLockElement === this.renderer.domElement) {
      document.exitPointerLock();
    }
  }

  async resumeGame() {
    if (this.isLoadingMap) {
      return;
    }

    try {
      await this.renderer.domElement.requestPointerLock();
      await this.audioManager.unlock();
      this.localSimulationLoop.accumulator = 0;
      this.isPaused = false;
      this.hud?.setPaused(false);
    } catch (error) {
      console.error('Failed to resume pointer lock.', error);
    }
  }

  syncRemotePlayers(remotePlayers, delta = 0) {
    const activeIds = new Set();

    for (const player of remotePlayers) {
      activeIds.add(player.playerId);
      let visual = this.remotePlayerMeshes.get(player.playerId);

      if (!visual) {
        visual = createRemotePlayerVisual(
          player.displayName ?? player.playerId,
          this.remotePlayerMaterial,
        );
        this.remotePlayerMeshes.set(player.playerId, visual);
        this.scene.add(visual.root);
        ensureRemoteCharacterModel(visual);
      }

      const authoritativeState = this.networkClient.remotePlayerBuffers.get(player.playerId)?.at?.(-1) ?? null;
      setRemotePlayerWeapon(visual, authoritativeState?.activeWeaponKey ?? player.activeWeaponKey);
      visual.labelSprite.visible = true;
      updateRemotePlayerVisual(visual, player, delta, authoritativeState, {
        alive: this.remotePlayerMaterial,
        dead: this.remotePlayerDeadMaterial,
      });
    }

    for (const [playerId, visual] of this.remotePlayerMeshes) {
      if (activeIds.has(playerId)) {
        continue;
      }

      this.scene.remove(visual.root);
      disposeRemotePlayerVisual(visual);
      this.remotePlayerMeshes.delete(playerId);
    }
  }

  clearRemotePlayers() {
    for (const visual of this.remotePlayerMeshes.values()) {
      this.scene.remove(visual.root);
      disposeRemotePlayerVisual(visual);
    }

    this.remotePlayerMeshes.clear();
  }

  showFatalError(error) {
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);

    if (!this.fatalErrorEl) {
      this.fatalErrorEl = document.createElement('div');
      this.fatalErrorEl.style.position = 'fixed';
      this.fatalErrorEl.style.inset = '0';
      this.fatalErrorEl.style.zIndex = '9999';
      this.fatalErrorEl.style.display = 'grid';
      this.fatalErrorEl.style.placeItems = 'center';
      this.fatalErrorEl.style.background = 'rgba(8, 12, 18, 0.92)';
      this.fatalErrorEl.style.color = '#f4f7fb';
      this.fatalErrorEl.style.fontFamily = 'monospace';
      this.fatalErrorEl.style.padding = '24px';
      this.fatalErrorEl.style.whiteSpace = 'pre-wrap';
      this.root.appendChild(this.fatalErrorEl);
    }

    this.fatalErrorEl.textContent = `Runtime Error\n\n${message}`;
  }
}
