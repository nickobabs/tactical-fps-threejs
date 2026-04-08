import * as THREE from 'three';
import { InputManager } from '../core/input/InputManager.js';
import { MAP_OPTIONS, preloadMapOptions } from '../game/maps/mapOptions.js';
import { createHud } from '../game/ui/Hud.js';
import { SKYBOX_OPTIONS, getSkyboxOption } from '../game/skyboxes/skyboxOptions.js';
import { SkyboxManager, preloadSkyboxModules } from '../game/skyboxes/SkyboxManager.js';
import { NetworkClient } from '../game/networking/NetworkClient.js';
import { RemotePlayerPresenter } from '../game/networking/RemotePlayerPresenter.js';
import { preloadNavigationModules } from '../game/ai/NavigationManager.js';
import { FixedStepLoop } from '../core/loop/FixedStepLoop.js';
import { NETCODE_SIMULATION_STEP } from '../shared/netcode.js';
import { createGameAudioManager } from './createGameAudioManager.js';
import { createGameLighting } from './createGameLighting.js';
import { scheduleAppWarmup } from './scheduleAppWarmup.js';
import { FatalErrorOverlay } from './FatalErrorOverlay.js';
import { GameplayNetworkingCoordinator } from './GameplayNetworkingCoordinator.js';
import { GamePauseController } from './GamePauseController.js';
import { GameDebugController } from './GameDebugController.js';
import { GameSessionController } from './GameSessionController.js';

const DEFAULT_HORIZONTAL_FOV = 103;
const MOVEMENT_TRACE_STORAGE_KEY = 'tactical-fps-threejs-movement-trace';

function getMovementTraceUploadUrl(serverUrl) {
  if (!serverUrl) {
    return null;
  }

  try {
    const url = new URL(serverUrl);
    url.protocol = url.protocol === 'wss:' ? 'https:' : 'http:';
    url.pathname = '/debug/movement-trace';
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

function getSafeRate(value, divisor) {
  if (!Number.isFinite(value) || !Number.isFinite(divisor) || divisor <= 0) {
    return 0;
  }

  return value / divisor;
}

export class GameApp {
  constructor(root) {
    this.root = root;
    this.clock = new THREE.Clock();
    this.currentFps = 0;
    this.mouseSensitivity = 0.0011;
    this.baseHorizontalFov = DEFAULT_HORIZONTAL_FOV;
    this.networkJumpQueued = false;
    this.lastMovementTraceSampleAt = 0;
    this.movementTraceSamples = [];
    this.fatalErrorOverlay = new FatalErrorOverlay(this.root);
    this.localSimulationLoop = new FixedStepLoop(NETCODE_SIMULATION_STEP);
    this.audioManager = createGameAudioManager();
    this.networkClient = new NetworkClient();
    this.gameplayNetworking = new GameplayNetworkingCoordinator(this.networkClient);
    this.damageVignette = 0;
    this.hitDamagePopups = [];

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c1218);
    this.scene.fog = new THREE.Fog(0x0c1218, 120, 320);
    this.debugController = new GameDebugController(this.scene);
    this.remotePlayerPresenter = new RemotePlayerPresenter(this.scene);
    const initialMapId = MAP_OPTIONS[0].id;
    this.selectedSkyboxId = SKYBOX_OPTIONS[0].id;

    const initialAspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(
      this.horizontalToVerticalFov(this.baseHorizontalFov, initialAspect),
      initialAspect,
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
    this.pauseController = new GamePauseController({
      renderer: this.renderer,
      audioManager: this.audioManager,
    });
    this.sessionController = new GameSessionController({
      scene: this.scene,
      camera: this.camera,
      input: null,
      audioManager: this.audioManager,
      pauseController: this.pauseController,
      debugController: this.debugController,
      gameplayNetworking: this.gameplayNetworking,
      networkClient: this.networkClient,
    });
    this.selectedMapId = initialMapId;
    this.skyboxManager = new SkyboxManager(this.scene, this.renderer);
    this.setSkybox(this.selectedSkyboxId);

    this.input = new InputManager(this.renderer.domElement);
    this.sessionController.input = this.input;

    this.scene.add(createGameLighting());
    this.rebuildHud();
    void this.loadMap(this.selectedMapId);
    scheduleAppWarmup({
      preloadMapOptions,
      preloadNavigationModules,
      preloadSkyboxModules,
    });

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

  get runtime() {
    return this.sessionController.runtime;
  }

  get selectedMapId() {
    return this.sessionController.selectedMapId;
  }

  set selectedMapId(value) {
    this.sessionController.selectedMapId = value;
  }

  get authoritativeNetworkingEnabled() {
    return this.sessionController.authoritativeNetworkingEnabled;
  }

  get isLoadingMap() {
    return this.sessionController.isLoadingMap;
  }

  get loadingStatus() {
    return this.sessionController.loadingStatus;
  }

  destroy() {
    this.stop();
    this.input.destroy();
    this.hud.destroy();
    this.fatalErrorOverlay.destroy();
    this.remotePlayerPresenter.destroy();
    this.unloadMap();
    this.skyboxManager.dispose();
    this.networkClient.destroy();
    this.audioManager.destroy();
    this.debugController.destroy();
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
      getHorizontalFov: () => this.baseHorizontalFov,
      onResume: () => this.resumeGame(),
      onSelectMap: (mapId) => this.loadMap(mapId),
      onSensitivityChange: (value) => this.setMouseSensitivity(value),
      onFovChange: (value) => this.setHorizontalFov(value),
      onVolumeChange: (volume) => this.audioManager.setMasterVolume(volume),
      maps: MAP_OPTIONS,
      getSelectedMapId: () => this.selectedMapId,
      getIsLoading: () => this.isLoadingMap,
      getLoadingStatus: () => this.loadingStatus,
      getIgnoreLocalCorrections: () => this.debugController.getIgnoreLocalCorrections(),
      getIsMovementTraceRecording: () => this.debugController.isMovementTraceRecording(),
      consumeMarkDebugSnapshotRequested: () => this.debugController.consumeMarkDebugSnapshotRequested(),
      onSelectSkybox: (skyboxId) => this.setSkybox(skyboxId),
      skyboxes: SKYBOX_OPTIONS,
      getSelectedSkyboxId: () => this.selectedSkyboxId,
    });
    this.pauseController.attachHud(this.hud);
  }

  unloadMap() {
    this.sessionController.unloadCurrentRuntime({
      remotePlayerPresenter: this.remotePlayerPresenter,
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
      this.gameplayNetworking.syncCombatNetworkingMode({
        authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
        playerController: this.runtime.playerController,
        weaponManager: this.runtime.weaponManager,
      });
      this.networkClient.suspendGameplaySync({ preserveRemotePlayers: true });
      return;
    }

    if (this.authoritativeNetworkingEnabled) {
      this.gameplayNetworking.syncLocalPlayer({
        authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
        mapId: this.selectedMapId,
        playerController: this.runtime.playerController,
        weaponManager: this.runtime.weaponManager,
      });
    }
    this.gameplayNetworking.syncCombatNetworkingMode({
      authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
      playerController: this.runtime.playerController,
      weaponManager: this.runtime.weaponManager,
    });
  }

  getCurrentPlayerPosition() {
    return this.debugController.getCurrentPlayerPosition(
      this.runtime?.playerController ?? null,
      this.selectedMapId,
    );
  }

  logCurrentPosition() {
    this.debugController.logCurrentPosition(this.runtime?.playerController ?? null, this.selectedMapId);
  }

  saveDebugMarker() {
    this.debugController.saveDebugMarker(this.runtime?.playerController ?? null, this.selectedMapId);
  }

  dumpDebugMarkers() {
    this.debugController.dumpDebugMarkers();
  }

  async loadMap(mapId) {
    this.networkJumpQueued = false;
    await this.sessionController.loadMap(mapId, {
      mouseSensitivity: this.mouseSensitivity,
      localSimulationLoop: this.localSimulationLoop,
      remotePlayerPresenter: this.remotePlayerPresenter,
      onRuntimeCleared: () => {
        this.networkJumpQueued = false;
      },
      onRuntimeActivated: () => {
        this.networkJumpQueued = false;
      },
      onLoadStateChanged: () => {
        this.rebuildHud();
      },
    });
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

  horizontalToVerticalFov(horizontalDegrees, aspect = this.camera?.aspect ?? (window.innerWidth / window.innerHeight)) {
    const horizontalRadians = THREE.MathUtils.degToRad(horizontalDegrees);
    const verticalRadians = 2 * Math.atan(Math.tan(horizontalRadians / 2) / Math.max(aspect, 0.0001));
    return THREE.MathUtils.radToDeg(verticalRadians);
  }

  setHorizontalFov(horizontalDegrees) {
    this.baseHorizontalFov = THREE.MathUtils.clamp(horizontalDegrees, 80, 120);
    const verticalFov = this.horizontalToVerticalFov(this.baseHorizontalFov);
    this.camera.fov = verticalFov;
    this.camera.updateProjectionMatrix();
    this.runtime?.weaponManager?.setBaseFov(verticalFov);
    this.runtime?.playerController?.setBaseFov(verticalFov);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.fov = this.horizontalToVerticalFov(this.baseHorizontalFov, this.camera.aspect);
    this.camera.updateProjectionMatrix();
    this.runtime?.weaponManager?.setBaseFov(this.camera.fov);
    this.runtime?.playerController?.setBaseFov(this.camera.fov);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  updateFrameStats(delta) {
    this.damageVignette = Math.max(0, this.damageVignette - delta * 1.8);
    this.hitDamagePopups = this.hitDamagePopups
      .map((popup) => ({
        ...popup,
        life: popup.life - delta,
      }))
      .filter((popup) => popup.life > 0);
    this.currentFps = delta > 0 ? Math.round(1 / delta) : 0;
  }

  handleGlobalHotkeys(frameInput) {
    if (frameInput.justPressed.has('Escape')) {
      void this.pauseController.toggle({
        isLoadingMap: this.isLoadingMap,
        localSimulationLoop: this.localSimulationLoop,
      });
    }

    if (frameInput.justPressed.has('F9')) {
      this.debugController.toggleIgnoreLocalCorrections();
    }

    if (frameInput.justPressed.has('F10')) {
      const recording = this.debugController.toggleMovementTraceRecording();
      if (recording) {
        this.movementTraceSamples = [];
      } else {
        this.flushMovementTrace();
      }
      this.lastMovementTraceSampleAt = 0;
    }

    if (frameInput.justPressed.has('F3')) {
      this.remotePlayerPresenter.toggleHitVolumeDebug();
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
      this.debugController.toggleCollisionDebug(this.runtime?.map?.collisionGeometry ?? null);
    }
  }

  hasActiveRuntime() {
    return !this.isLoadingMap && Boolean(this.runtime?.playerController);
  }

  getGameplaySyncEnabled() {
    return this.gameplayNetworking.isGameplaySyncEnabled({
      authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
      playerController: this.runtime?.playerController ?? null,
    });
  }

  syncCombatNetworkingMode() {
    this.gameplayNetworking.syncCombatNetworkingMode({
      authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
      playerController: this.runtime?.playerController ?? null,
      weaponManager: this.runtime?.weaponManager ?? null,
    });
  }

  queueJumpIfRequested(frameInput) {
    if (frameInput.justPressed.has('Space')) {
      this.networkJumpQueued = true;
    }
  }

  runLocalSimulation(delta, frameInput, localPlayerAlive) {
    if (this.pauseController.isPaused) {
      return;
    }

    this.syncCombatNetworkingMode();
    this.runtime.playerController.updateLook(frameInput.lookDelta);

    if (!localPlayerAlive) {
      this.localSimulationLoop.accumulator = 0;
      this.networkJumpQueued = false;
      return;
    }

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
    this.gameplayNetworking.syncWeaponStatusIfNeeded({
      authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
      playerController: this.runtime.playerController,
      weaponManager: this.runtime.weaponManager,
    });
  }

  updateWorldSimulation(delta) {
    this.runtime.roundManager.update(delta);
    this.runtime.utilityManager.update(delta);
  }

  updateNetworkState(delta) {
    if (this.getGameplaySyncEnabled()) {
      this.networkClient.update(delta);
      this.gameplayNetworking.handleCombatEvents({
        remotePlayerPresenter: this.remotePlayerPresenter,
        getPopupId: () => `${performance.now()}-${Math.random()}`,
        onLocalPlayerDamageDealt: (popup) => {
          this.hitDamagePopups.push(popup);
        },
        onLocalPlayerHit: () => {
          this.damageVignette = Math.min(1, this.damageVignette + 0.35);
        },
      });

      const authoritativeCorrection = this.networkClient.consumeLocalCorrection();
      if (authoritativeCorrection && !this.debugController.getIgnoreLocalCorrections()) {
        this.runtime.playerController.reconcileAuthoritativeState(authoritativeCorrection);
      }
      return;
    }

    this.networkClient.suspendGameplaySync({
      preserveRemotePlayers: this.runtime.playerController.getMovementMode?.() === 'fly',
    });
  }

  updatePlayerPresentation(delta) {
    this.runtime.playerController.updatePresentation(
      delta,
      this.localSimulationLoop.accumulator / NETCODE_SIMULATION_STEP,
    );
  }

  updateTargets(delta) {
    this.runtime.targetManager.update(delta, {
      playerPosition: this.runtime.playerController.position,
      playerEyePosition: this.runtime.playerController.getEyePosition(),
      collisionWorld: this.runtime.collisionWorld,
      navigationManager: this.runtime.navigationManager,
    });
  }

  updateRemotePlayers(delta) {
    if (this.authoritativeNetworkingEnabled) {
      this.remotePlayerPresenter.syncPlayers(
        this.networkClient.getRemotePlayers(),
        this.networkClient.remotePlayerBuffers,
        delta,
      );
      return;
    }

    this.remotePlayerPresenter.clear();
  }

  updateGameplayFrame(delta, frameInput) {
    const localCombatState = this.networkClient.getLocalPlayerState?.();
    const localPlayerAlive = localCombatState?.isAlive !== false;

    this.queueJumpIfRequested(frameInput);
    this.runLocalSimulation(delta, frameInput, localPlayerAlive);
    this.updateWorldSimulation(delta);
    this.updateNetworkState(delta);
    this.updatePlayerPresentation(delta);
    this.updateTargets(delta);
    this.updateRemotePlayers(delta);
    this.recordMovementTraceIfNeeded();
  }

  recordMovementTraceIfNeeded() {
    if (!this.debugController.isMovementTraceRecording()) {
      return;
    }

    if (!this.runtime?.playerController) {
      return;
    }

    const now = performance.now();
    if (now - this.lastMovementTraceSampleAt < 100) {
      return;
    }
    this.lastMovementTraceSampleAt = now;

    const movement = this.runtime.playerController.getDebugState();
    const network = this.networkClient.getDebugState();
    const correctionXZPerSnapshotMs = getSafeRate(
      movement.correctionDistanceXZ ?? 0,
      Math.max(0, network.snapshotAgeMs),
    );
    const correctionAlongVelocityPerSnapshotMs = getSafeRate(
      Math.abs(movement.correctionAlongVelocity ?? 0),
      Math.max(0, network.snapshotAgeMs),
    );
    this.movementTraceSamples.push({
      recordedAt: Date.now(),
      perfNow: now,
      mapId: this.selectedMapId,
      movement: {
        ...movement,
        correctionXZPerSnapshotMs,
        correctionAlongVelocityPerSnapshotMs,
      },
      network: {
        connectionState: network.connectionState,
        localMapId: network.localMapId,
        latestSequence: network.latestSequence,
        acknowledgedSequence: network.acknowledgedSequence,
        sequenceGap: network.sequenceGap,
        pendingInputCount: network.pendingInputCount,
        snapshotAgeMs: network.snapshotAgeMs,
        lastPredictedDriftDistance: network.lastPredictedDriftDistance,
        authoritativeUpdatesPerSecond: network.authoritativeUpdatesPerSecond,
      },
    });
  }

  flushMovementTrace() {
    const payload = {
      recordedAt: Date.now(),
      mapId: this.selectedMapId,
      samples: this.movementTraceSamples,
    };

    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.setItem(MOVEMENT_TRACE_STORAGE_KEY, JSON.stringify(payload));
      console.info(`[GameApp] Saved movement trace samples=${this.movementTraceSamples.length} to localStorage key "${MOVEMENT_TRACE_STORAGE_KEY}".`);
    } catch (error) {
      console.warn('[GameApp] Failed to persist movement trace.', error);
    }

    const uploadUrl = getMovementTraceUploadUrl(this.networkClient?.serverUrl);
    if (!uploadUrl || typeof fetch !== 'function') {
      return;
    }

    void fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `HTTP ${response.status}`);
        }

        const result = await response.json();
        console.info(`[GameApp] Wrote movement trace to ${result.filePath ?? 'debug file'}.`);
      })
      .catch((error) => {
        console.warn('[GameApp] Failed to write movement trace file.', error);
      });
  }

  animate() {
    try {
      const delta = Math.min(this.clock.getDelta(), 0.05);
      this.updateFrameStats(delta);
      const frameInput = this.input.consumeFrameState();
      this.handleGlobalHotkeys(frameInput);

      if (this.hasActiveRuntime()) {
        this.updateGameplayFrame(delta, frameInput);
      } else {
        this.remotePlayerPresenter.clear();
      }

      this.hud.update();

      this.renderer.render(this.scene, this.camera);
    } catch (error) {
      this.stop();
      this.fatalErrorOverlay.show(error);
      console.error('Fatal runtime error in GameApp.animate()', error);
    }
  }

  pauseGame() {
    this.pauseController.pause(this.localSimulationLoop);
  }

  async resumeGame() {
    try {
      await this.pauseController.resume({
        isLoadingMap: this.isLoadingMap,
        localSimulationLoop: this.localSimulationLoop,
      });
    } catch (error) {
      console.error('Failed to resume pointer lock.', error);
    }
  }
}
