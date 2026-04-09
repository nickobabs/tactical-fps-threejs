import { getMapOption } from '../game/maps/mapOptions.js';
import { MapRuntime } from '../game/maps/MapRuntime.js';

export class GameSessionController {
  constructor({
    scene,
    camera,
    input,
    audioManager,
    pauseController,
    debugController,
    gameplayNetworking,
    networkClient,
  }) {
    this.scene = scene;
    this.camera = camera;
    this.input = input;
    this.audioManager = audioManager;
    this.pauseController = pauseController;
    this.debugController = debugController;
    this.gameplayNetworking = gameplayNetworking;
    this.networkClient = networkClient;
    this.mapLoadToken = 0;
    this.runtime = null;
    this.selectedMapId = null;
    this.authoritativeNetworkingEnabled = true;
    this.isLoadingMap = false;
    this.loadingStatus = '';
  }

  unloadCurrentRuntime({ remotePlayerPresenter }) {
    remotePlayerPresenter.clear();
    this.debugController.disposeCollisionDebugMesh();
    this.runtime?.destroy(this.scene);
    this.runtime = null;
  }

  async loadMap(mapId, {
    mouseSensitivity,
    localSimulationLoop,
    remotePlayerPresenter,
    onRuntimeActivated,
    onRuntimeCleared,
    onLoadStateChanged,
  }) {
    const mapOption = getMapOption(mapId);
    if (!mapOption) {
      return false;
    }

    const loadToken = ++this.mapLoadToken;
    this.isLoadingMap = true;
    onLoadStateChanged?.();
    this.pauseController.pause(localSimulationLoop);
    let runtime = null;

    try {
      runtime = await MapRuntime.create({
        mapOption,
        camera: this.camera,
        input: this.input,
        scene: this.scene,
        audioManager: this.audioManager,
        mouseSensitivity,
        onStatusChange: (status) => {
          this.loadingStatus = status;
          onLoadStateChanged?.();
        },
      });
      if (loadToken !== this.mapLoadToken) {
        return false;
      }

      this.unloadCurrentRuntime({ remotePlayerPresenter });
      onRuntimeCleared?.();

      this.selectedMapId = mapOption.id;
      this.authoritativeNetworkingEnabled = mapOption.supportsAuthoritativeNetworking !== false;
      this.runtime = runtime;
      this.gameplayNetworking.resetTrackedStatus();
      localSimulationLoop.accumulator = 0;
      this.runtime.attachToScene(this.scene);
      this.runtime.weaponManager?.setBaseFov(this.camera.fov);
      this.runtime.playerController?.setBaseFov(this.camera.fov);
      this.debugController.syncCollisionDebugMesh(this.runtime.map?.collisionGeometry);
      this.networkClient.suspendGameplaySync();
      runtime = null;

      this.loadingStatus = '';
      this.isLoadingMap = false;
      onRuntimeActivated?.(this.runtime);
      this.gameplayNetworking.syncCombatNetworkingMode({
        authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
        playerController: this.runtime.playerController,
        weaponManager: this.runtime.weaponManager,
      });
      onLoadStateChanged?.();
      return true;
    } catch (error) {
      console.error(`Failed to load map "${mapOption.id}".`, error);

      if (loadToken === this.mapLoadToken) {
        this.loadingStatus = '';
        this.isLoadingMap = false;
        onLoadStateChanged?.();
      }
      return false;
    } finally {
      runtime?.destroy(this.scene);
    }
  }
}
