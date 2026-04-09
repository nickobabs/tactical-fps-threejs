import { CollisionWorld } from '../../core/physics/CollisionWorld.js';
import { FirstPersonController } from '../player/controllers/FirstPersonController.js';
import { RoundManager } from '../rounds/RoundManager.js';
import { WeaponManager } from '../weapons/WeaponManager.js';
import { UtilityManager } from '../utility/UtilityManager.js';
import { TargetManager } from '../targets/TargetManager.js';
import { NavigationManager } from '../ai/NavigationManager.js';
import { disposeObject3D } from '../../core/three/disposeObject3D.js';

const ALLOW_RUNTIME_NAV_GENERATION = import.meta.env.DEV
  || import.meta.env.VITE_ALLOW_RUNTIME_NAV_GENERATION === 'true';
const DISABLE_LOCAL_TARGETS_FOR_PVP_TESTING = import.meta.env.VITE_DISABLE_LOCAL_TARGETS_FOR_PVP !== 'false';

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
    this.targetManager = targetManager;
  }

  getSpawnStateForTeam(teamKey) {
    const teamSpawnPoints = this.map?.teamSpawnPoints?.[teamKey];
    if (Array.isArray(teamSpawnPoints) && teamSpawnPoints.length > 0) {
      const selectedSpawn = teamSpawnPoints[Math.floor(Math.random() * teamSpawnPoints.length)];
      return {
        position: selectedSpawn.position,
        yaw: Number(selectedSpawn.yaw ?? 0),
      };
    }

    return {
      position: this.map?.spawnPoint ?? { x: 0, y: 0, z: 0 },
      yaw: Number(this.map?.spawnYaw ?? 0),
    };
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

    const map = await mapOption.create();

    try {
      if (DISABLE_LOCAL_TARGETS_FOR_PVP_TESTING && map.targets?.length) {
        const targetShootables = new Set();
        for (const target of map.targets) {
          target.getObject?.().removeFromParent?.();
          for (const mesh of target.getShootables?.() ?? []) {
            targetShootables.add(mesh);
          }
        }

        map.targets = [];
        if (Array.isArray(map.shootables) && targetShootables.size > 0) {
          map.shootables = map.shootables.filter((mesh) => !targetShootables.has(mesh));
        }
      }

      let navigationManager = new NavigationManager();
      let initializedNavigation = false;

      if (mapOption.loadNavigationData) {
        onStatusChange?.(`Loading baked navmesh for ${mapOption.label}...`);
        await waitForNextFrame();

        try {
          const navMeshExport = await mapOption.loadNavigationData();
          initializedNavigation = await navigationManager.initialize(null, { navMeshExport });
        } catch (error) {
          console.warn(`Failed to load baked navmesh for "${mapOption.id}". Falling back to generation.`, error);
        }
      }

      if (!initializedNavigation && ALLOW_RUNTIME_NAV_GENERATION) {
        onStatusChange?.(`Generating navmesh for ${mapOption.label}...`);
        await waitForNextFrame();
        const { buildNavigationManagerFromCollisionGeometry } = await import('../ai/navigationGeneration.js');
        const generatedNavigation = await buildNavigationManagerFromCollisionGeometry(
          map.collisionGeometry,
        );
        navigationManager.destroy();
        navigationManager = generatedNavigation.navigationManager;
        initializedNavigation = generatedNavigation.success;
      }

      if (!initializedNavigation) {
        throw new Error(`Navigation initialization failed for map "${mapOption.id}".`);
      }

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
        movementMode: map.movementMode,
        allowGroundedMode: map.allowGroundedMode,
        collisionWorld,
        landingSurfaces: map.shootables,
        mouseSensitivity,
        getSpeedMultiplier: () => runtime.weaponManager?.getMovementSpeedMultiplier() ?? 1,
      });
      runtime.weaponManager.setPlayerController(runtime.playerController);

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
    this.detachFromScene(scene);
    this.navigationManager?.destroy();
    this.map.dispose?.();
    this.map.collisionGeometry?.dispose?.();
    disposeObject3D(this.map.scene);
  }
}
