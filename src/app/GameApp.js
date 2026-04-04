import * as THREE from 'three';
import { InputManager } from '../core/input/InputManager.js';
import { MAP_OPTIONS, getMapOption, preloadMapOptions } from '../game/maps/mapOptions.js';
import { MapRuntime } from '../game/maps/MapRuntime.js';
import { createHud } from '../game/ui/Hud.js';
import { SKYBOX_OPTIONS, getSkyboxOption } from '../game/skyboxes/skyboxOptions.js';
import { SkyboxManager, preloadSkyboxModules } from '../game/skyboxes/SkyboxManager.js';
import { AudioManager } from '../game/audio/AudioManager.js';
import { NetworkClient } from '../game/networking/NetworkClient.js';
import { RemotePlayerPresenter } from '../game/networking/RemotePlayerPresenter.js';
import { preloadNavigationModules } from '../game/ai/NavigationManager.js';
import { FixedStepLoop } from '../core/loop/FixedStepLoop.js';
import { NETCODE_SIMULATION_STEP } from '../shared/netcode.js';

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
    this.damageVignette = 0;
    this.hitDamagePopups = [];

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c1218);
    this.scene.fog = new THREE.Fog(0x0c1218, 120, 320);
    this.remotePlayerPresenter = new RemotePlayerPresenter(this.scene);
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
    this.remotePlayerPresenter.destroy();
    this.unloadMap();
    this.skyboxManager.dispose();
    this.networkClient.destroy();
    this.audioManager.destroy();
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
    this.remotePlayerPresenter.clear();
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
      this.remotePlayerPresenter.clear();
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
            this.remotePlayerPresenter.handleCombatEvent(event);

            if (event?.type === 'player-hit') {
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
          this.remotePlayerPresenter.syncPlayers(
            this.networkClient.getRemotePlayers(),
            this.networkClient.remotePlayerBuffers,
            delta,
          );
        } else {
          this.remotePlayerPresenter.clear();
        }
      } else {
        this.remotePlayerPresenter.clear();
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
