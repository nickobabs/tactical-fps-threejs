import { CollisionWorld } from '../../core/physics/CollisionWorld.js';
import { FirstPersonController } from '../player/controllers/FirstPersonController.js';
import { RoundManager } from '../rounds/RoundManager.js';
import { WeaponManager } from '../weapons/WeaponManager.js';
import { UtilityManager } from '../utility/UtilityManager.js';
import { NetworkClient } from '../networking/NetworkClient.js';
import { TargetManager } from '../targets/TargetManager.js';
import { NavigationManager } from '../ai/NavigationManager.js';
import { disposeObject3D } from '../../core/three/disposeObject3D.js';

function waitForNextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export class MapRuntime {
  constructor({
    map,
    mapId,
    collisionWorld,
    navigationManager,
    playerController,
    roundManager,
    weaponManager,
    utilityManager,
    networkClient,
    targetManager,
  }) {
    this.map = map;
    this.mapId = mapId;
    this.collisionWorld = collisionWorld;
    this.navigationManager = navigationManager;
    this.playerController = playerController;
    this.roundManager = roundManager;
    this.weaponManager = weaponManager;
    this.utilityManager = utilityManager;
    this.networkClient = networkClient;
    this.targetManager = targetManager;
  }

  static async create({
    mapOption,
    camera,
    input,
    scene,
    audioManager,
    mouseSensitivity,
    onStatusChange,
  }) {
    onStatusChange?.(`Loading ${mapOption.label}...`);
    await waitForNextFrame();

    const map = mapOption.create();

    try {
      onStatusChange?.(`Generating navmesh for ${mapOption.label}...`);
      await waitForNextFrame();

      const navigationManager = new NavigationManager();
      await navigationManager.initialize(map.collisionGeometry);

      const collisionWorld = new CollisionWorld({
        groundHeight: map.groundHeight,
        collisionGeometry: map.collisionGeometry,
      });

      const runtime = new MapRuntime({
        map,
        mapId: mapOption.id,
        collisionWorld,
        navigationManager,
        playerController: null,
        roundManager: new RoundManager(),
        weaponManager: null,
        utilityManager: new UtilityManager(),
        networkClient: new NetworkClient(),
        targetManager: new TargetManager(map.targets),
      });

      runtime.weaponManager = new WeaponManager({
        camera,
        scene,
        shootables: map.shootables,
        audioManager,
      });

      runtime.playerController = new FirstPersonController(camera, input, {
        position: map.spawnPoint,
        groundHeight: map.groundHeight,
        collisionWorld,
        mouseSensitivity,
        getSpeedMultiplier: () => runtime.weaponManager?.getMovementSpeedMultiplier() ?? 1,
      });
      runtime.networkClient.initializeLocalPlayer({
        mapId: mapOption.id,
        position: {
          x: map.spawnPoint.x,
          y: map.spawnPoint.y,
          z: map.spawnPoint.z,
        },
        velocity: {
          x: runtime.playerController.velocity.x,
          y: runtime.playerController.velocity.y,
          z: runtime.playerController.velocity.z,
        },
        yaw: runtime.playerController.yawAngle,
        isGrounded: runtime.playerController.isGrounded,
        isCrouched: runtime.playerController.isCrouched,
        currentHeight: runtime.playerController.currentHeight,
      });

      return runtime;
    } catch (error) {
      map.dispose?.();
      map.collisionGeometry?.dispose?.();
      disposeObject3D(map.scene);
      throw error;
    }
  }

  attachToScene(scene) {
    scene.add(this.map.scene);
    scene.add(this.playerController.getObject());
  }

  detachFromScene(scene) {
    scene.remove(this.map.scene);
    scene.remove(this.playerController.getObject());
  }

  destroy(scene) {
    this.weaponManager?.destroy();
    this.targetManager?.destroy?.();
    this.networkClient?.destroy?.();
    this.detachFromScene(scene);
    this.navigationManager?.destroy();
    this.map.dispose?.();
    this.map.collisionGeometry?.dispose?.();
    disposeObject3D(this.map.scene);
  }
}
