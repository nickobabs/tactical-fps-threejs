import * as THREE from 'three';
import { InputManager } from '../core/input/InputManager.js';
import { MAP_OPTIONS, getMapOption } from '../game/maps/mapOptions.js';
import { MapRuntime } from '../game/maps/MapRuntime.js';
import { createHud } from '../game/ui/Hud.js';
import { SKYBOX_OPTIONS, getSkyboxOption } from '../game/skyboxes/skyboxOptions.js';
import { SkyboxManager } from '../game/skyboxes/SkyboxManager.js';
import { AudioManager } from '../game/audio/AudioManager.js';
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
    this.networkJumpQueued = false;
    this.ignoreLocalCorrections = false;
    this.markDebugSnapshotRequested = false;
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
    this.remotePlayerMeshes = new Map();
    this.remotePlayerGeometry = new THREE.BoxGeometry(0.7, 1.72, 0.7);
    this.remotePlayerMaterial = new THREE.MeshStandardMaterial({
      color: 0x54c7f2,
      roughness: 0.55,
      metalness: 0.08,
    });

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c1218);
    this.scene.fog = new THREE.Fog(0x0c1218, 24, 90);
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
    this.audioManager.destroy();
    this.remotePlayerGeometry.dispose();
    this.remotePlayerMaterial.dispose();
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
      networkClient: this.runtime?.networkClient ?? null,
      playerController: this.runtime?.playerController ?? null,
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
    this.runtime?.destroy(this.scene);
    this.runtime = null;
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
      this.runtime = runtime;
      this.networkJumpQueued = false;
      this.localSimulationLoop.accumulator = 0;
      this.runtime.attachToScene(this.scene);
      runtime = null;

      this.loadingStatus = '';
      this.isLoadingMap = false;
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

  animate() {
    try {
      const delta = Math.min(this.clock.getDelta(), 0.05);
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

      if (!this.isLoadingMap && this.runtime?.playerController) {
        if (frameInput.justPressed.has('Space')) {
          this.networkJumpQueued = true;
        }

        if (!this.isPaused) {
          this.runtime.playerController.updateLook(frameInput.lookDelta);
          this.localSimulationLoop.advance(delta, (simulationStep) => {
            const movementInput = this.runtime.playerController.getMovementInputSnapshot({
              jumpPressed: this.networkJumpQueued,
            });
            const speedMultiplier = this.runtime.playerController.getCurrentSpeedMultiplier();

            this.runtime.playerController.stepSimulation(simulationStep, movementInput, speedMultiplier);
            this.runtime.networkClient.sampleLocalInput(movementInput, {
              simulationStep,
              speedMultiplier,
              predictedPosition: this.runtime.playerController.position,
            });

            this.networkJumpQueued = false;
          });
          this.runtime.weaponManager.update(delta, frameInput);
        }

        this.runtime.roundManager.update(delta);
        this.runtime.utilityManager.update(delta);
        this.runtime.networkClient.update(delta);

        const authoritativeCorrection = this.runtime.networkClient.consumeLocalCorrection();
        if (authoritativeCorrection && !this.ignoreLocalCorrections) {
          this.runtime.playerController.reconcileAuthoritativeState(authoritativeCorrection);
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
        this.syncRemotePlayers(this.runtime.networkClient.getRemotePlayers());
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

  syncRemotePlayers(remotePlayers) {
    const activeIds = new Set();

    for (const player of remotePlayers) {
      activeIds.add(player.playerId);
      let mesh = this.remotePlayerMeshes.get(player.playerId);

      if (!mesh) {
        mesh = new THREE.Mesh(this.remotePlayerGeometry, this.remotePlayerMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.remotePlayerMeshes.set(player.playerId, mesh);
        this.scene.add(mesh);
      }

      mesh.position.set(
        player.position.x,
        player.position.y + 0.86,
        player.position.z,
      );
      mesh.rotation.set(0, player.yaw, 0);
    }

    for (const [playerId, mesh] of this.remotePlayerMeshes) {
      if (activeIds.has(playerId)) {
        continue;
      }

      this.scene.remove(mesh);
      this.remotePlayerMeshes.delete(playerId);
    }
  }

  clearRemotePlayers() {
    for (const mesh of this.remotePlayerMeshes.values()) {
      this.scene.remove(mesh);
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
