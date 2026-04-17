import * as THREE from 'three';
import { PlantedBombVisual } from './PlantedBombVisual.js';
import { BombObjectiveState } from './BombObjectiveState.js';
import { SmokeGrenadeManager } from './SmokeGrenadeManager.js';
import { TEAMS } from '../../shared/constants.js';
import { isCompetitiveGamemode } from '../../shared/gamemodes.js';
import {
  BOMB_UTILITY_KEY,
  SMOKE_UTILITY_KEY,
  getActiveUtilityLabel,
  formatBombSeconds,
} from '../../shared/bombObjective.js';
import { getPlantZoneAtPosition } from '../../shared/maps/mapPlantZones.js';
import { VIEWMODEL_LAYER } from '../weapons/viewModels.js';
import { DEFAULT_SMOKE_GRENADES } from './utilityLoadout.js';

const DEFUSE_MAX_DISTANCE = 2.4;
const DEFUSE_AIM_DOT_THRESHOLD = 0.96;
const SMOKE_THROW_DIRECTION = new THREE.Vector3();
const SMOKE_THROW_ORIGIN = new THREE.Vector3();
const SMOKE_INHERITED_VELOCITY = new THREE.Vector3();
const REMOTE_SMOKE_THROW_ORIGIN = new THREE.Vector3();
const REMOTE_SMOKE_THROW_DIRECTION = new THREE.Vector3();
const REMOTE_SMOKE_INHERITED_VELOCITY = new THREE.Vector3();

function disposeObject3D(root) {
  root?.removeFromParent?.();
  root?.traverse?.((child) => {
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material?.dispose?.());
      return;
    }
    child.material?.dispose?.();
  });
}

function createSmokeViewModel() {
  const group = new THREE.Group();
  group.position.set(0.22, -0.22, -0.42);
  group.rotation.set(0.18, -0.22, -0.16);
  group.layers.set(VIEWMODEL_LAYER);

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 18, 18),
    new THREE.MeshStandardMaterial({
      color: 0x4d5863,
      roughness: 0.82,
      metalness: 0.08,
    }),
  );
  group.add(body);

  const lever = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.09, 0.015),
    new THREE.MeshStandardMaterial({
      color: 0x78838b,
      roughness: 0.62,
      metalness: 0.22,
    }),
  );
  lever.position.set(0.02, 0.095, 0);
  lever.rotation.z = -0.42;
  group.add(lever);

  const pin = new THREE.Mesh(
    new THREE.TorusGeometry(0.024, 0.006, 8, 16),
    new THREE.MeshStandardMaterial({
      color: 0xc6c1a8,
      roughness: 0.54,
      metalness: 0.2,
    }),
  );
  pin.position.set(0.048, 0.085, 0);
  pin.rotation.y = Math.PI * 0.5;
  group.add(pin);

  return group;
}

export class UtilityManager {
  constructor() {
    this.plantZones = [];
    this.state = new BombObjectiveState();
    this.plantedBombVisual = null;
    this.smokeGrenadeManager = null;
    this.camera = null;
    this.smokeViewModel = null;
    this.smokeCharges = DEFAULT_SMOKE_GRENADES;
    this.equippedUtilityKey = null;
    this.lastNonBombWeaponKey = 'rifle';
    this.lastRoundNumber = 0;
    this.lastRoundPhase = null;
    this.lastKnownBombPosition = null;
    this.lastBombExplosionRound = 0;
  }

  setPlantMovementLock(playerController, active) {
    playerController?.setPlantInteractionLock?.(Boolean(active));
  }

  setDefuseMovementLock(playerController, active) {
    playerController?.setDefuseInteractionLock?.(Boolean(active));
  }

  configureMap({
    plantZones = [],
    scene = null,
    collisionWorld = null,
    camera = null,
    effectsManager = null,
    audioManager = null,
  } = {}) {
    this.plantZones = Array.isArray(plantZones) ? plantZones : [];
    this.plantedBombVisual = new PlantedBombVisual(scene ?? null);
    this.smokeGrenadeManager = new SmokeGrenadeManager(
      scene ?? null,
      collisionWorld ?? null,
      effectsManager ?? null,
      audioManager ?? null,
    );
    this.camera = camera ?? null;
    if (this.camera && !this.smokeViewModel) {
      this.smokeViewModel = createSmokeViewModel();
      this.smokeViewModel.visible = false;
      this.camera.add(this.smokeViewModel);
    }
  }

  canEquipWeapon(weaponKey) {
    if (weaponKey === BOMB_UTILITY_KEY) {
      return this.state.localPlayerHasBomb;
    }

    return true;
  }

  get activeUtility() {
    return this.getActiveUtilityLabel();
  }

  resetRoundState() {
    this.state.resetRoundState();
    this.smokeCharges = DEFAULT_SMOKE_GRENADES;
    this.equippedUtilityKey = null;
    this.lastNonBombWeaponKey = 'rifle';
    this.lastKnownBombPosition = null;
    this.updateBombVisual(null);
  }

  syncFrameInput(frameInput, weaponManager = null) {
    this.state.interactionText = '';

    if (
      frameInput?.justPressed?.has?.('Digit1')
      || frameInput?.justPressed?.has?.('Digit2')
      || frameInput?.justPressed?.has?.('Digit3')
      || frameInput?.justPressed?.has?.('Digit4')
      || frameInput?.justPressed?.has?.('Digit5')
    ) {
      this.equippedUtilityKey = null;
      return;
    }

    if (frameInput?.justPressed?.has?.('Digit6') && this.smokeCharges > 0) {
      this.equippedUtilityKey = SMOKE_UTILITY_KEY;
      if (weaponManager?.activeWeaponKey === BOMB_UTILITY_KEY) {
        weaponManager.equipWeapon(this.lastNonBombWeaponKey || 'rifle');
      }
    }
  }

  updateBombVisual(position, { trackExplosionAnchor = false } = {}) {
    if (position && trackExplosionAnchor) {
      this.lastKnownBombPosition = new THREE.Vector3(
        Number(position.x ?? 0),
        Number(position.y ?? 0),
        Number(position.z ?? 0),
      );
    }
    this.plantedBombVisual?.setVisiblePosition(position ?? null);
  }

  triggerBombExplosion(roundManager) {
    if (!this.lastKnownBombPosition || this.lastBombExplosionRound === roundManager?.roundNumber) {
      return;
    }

    this.smokeGrenadeManager?.effectsManager?.addBombExplosion?.(this.lastKnownBombPosition);
    this.lastBombExplosionRound = roundManager?.roundNumber ?? this.lastBombExplosionRound;
    this.lastKnownBombPosition = null;
    this.updateBombVisual(null);
  }

  canAttemptDefuse(playerController, plantedPosition) {
    if (!playerController || !plantedPosition) {
      return false;
    }

    const eyePosition = playerController.getEyePosition();
    const toBombX = Number(plantedPosition.x ?? 0) - eyePosition.x;
    const toBombY = (Number(plantedPosition.y ?? 0) + 0.08) - eyePosition.y;
    const toBombZ = Number(plantedPosition.z ?? 0) - eyePosition.z;
    const distance = Math.hypot(toBombX, toBombY, toBombZ);
    if (distance <= 1e-6 || distance > DEFUSE_MAX_DISTANCE) {
      return false;
    }

    const direction = playerController.camera?.getWorldDirection?.(playerController.getEyePosition().clone()) ?? null;
    if (!direction) {
      return false;
    }

    const aimDot = ((toBombX / distance) * direction.x)
      + ((toBombY / distance) * direction.y)
      + ((toBombZ / distance) * direction.z);
    return aimDot >= DEFUSE_AIM_DOT_THRESHOLD;
  }

  canUseSmokeGrenade(roundManager, localPlayerAlive) {
    return this.equippedUtilityKey === SMOKE_UTILITY_KEY
      && this.smokeCharges > 0
      && localPlayerAlive
      && !roundManager?.roundEnded
      && roundManager?.phase === 'live';
  }

  getWeaponInputBlockState({ roundManager, localPlayerAlive } = {}) {
    const competitiveActionLocked = isCompetitiveGamemode(roundManager?.gamemode) && roundManager?.phase !== 'live';
    const smokeSelected = this.equippedUtilityKey === SMOKE_UTILITY_KEY
      && localPlayerAlive
      && !roundManager?.roundEnded;
    const smokeEquipped = smokeSelected
      && localPlayerAlive
      && !roundManager?.roundEnded
      && roundManager?.phase === 'live';
    return {
      blockPrimaryAction: smokeEquipped || competitiveActionLocked,
      blockSecondaryAction: smokeEquipped || competitiveActionLocked,
      hideViewModel: smokeSelected,
    };
  }

  tryThrowSmoke(frameInput, playerController, roundManager, localPlayerAlive, networkClient = null) {
    if (!this.canUseSmokeGrenade(roundManager, localPlayerAlive)) {
      return false;
    }

    if (!frameInput?.mouseButtonsJustPressed?.has?.(0) || !playerController) {
      return false;
    }

    playerController.getEyePosition(SMOKE_THROW_ORIGIN);
    playerController.camera?.getWorldDirection?.(SMOKE_THROW_DIRECTION);
    if (SMOKE_THROW_DIRECTION.lengthSq() <= 1e-6) {
      SMOKE_THROW_DIRECTION.set(0, 0.12, -1);
    }
    SMOKE_THROW_DIRECTION.y += 0.18;
    SMOKE_THROW_DIRECTION.normalize();
    SMOKE_THROW_ORIGIN.addScaledVector(SMOKE_THROW_DIRECTION, 0.42);
    SMOKE_THROW_ORIGIN.y -= 0.12;
    SMOKE_INHERITED_VELOCITY.copy(playerController.velocity ?? { x: 0, y: 0, z: 0 });

    const spawned = this.smokeGrenadeManager?.spawn?.({
      origin: SMOKE_THROW_ORIGIN,
      direction: SMOKE_THROW_DIRECTION,
      inheritedVelocity: SMOKE_INHERITED_VELOCITY,
      speed: 15.2,
    }) ?? false;
    if (!spawned) {
      return false;
    }

    networkClient?.sendSmokeThrow?.({
      origin: SMOKE_THROW_ORIGIN,
      direction: SMOKE_THROW_DIRECTION,
      inheritedVelocity: SMOKE_INHERITED_VELOCITY,
      speed: 15.2,
    });

    this.smokeCharges = Math.max(0, this.smokeCharges - 1);
    this.equippedUtilityKey = null;
    return true;
  }

  handleSmokeThrown(weaponManager) {
    weaponManager?.replayActiveWeaponEquip?.();
    return true;
  }

  handleCombatEvent(event, {
    localPlayerId = null,
    localMapId = null,
  } = {}) {
    if (event?.type !== 'smoke-thrown' || !this.smokeGrenadeManager) {
      return;
    }
    if (event.playerId && localPlayerId && event.playerId === localPlayerId) {
      return;
    }
    if (localMapId && event.mapId && event.mapId !== localMapId) {
      return;
    }

    REMOTE_SMOKE_THROW_ORIGIN.set(
      Number(event.origin?.x ?? 0),
      Number(event.origin?.y ?? 0),
      Number(event.origin?.z ?? 0),
    );
    REMOTE_SMOKE_THROW_DIRECTION.set(
      Number(event.direction?.x ?? 0),
      Number(event.direction?.y ?? 0),
      Number(event.direction?.z ?? -1),
    );
    REMOTE_SMOKE_INHERITED_VELOCITY.set(
      Number(event.inheritedVelocity?.x ?? 0),
      Number(event.inheritedVelocity?.y ?? 0),
      Number(event.inheritedVelocity?.z ?? 0),
    );

    this.smokeGrenadeManager.spawn({
      origin: REMOTE_SMOKE_THROW_ORIGIN,
      direction: REMOTE_SMOKE_THROW_DIRECTION,
      inheritedVelocity: REMOTE_SMOKE_INHERITED_VELOCITY,
      speed: Number(event.speed ?? 15.2),
      playBloomAudio: false,
      emitBloomMessage: false,
    });
  }

  updateSmokeViewModelVisibility({
    roundManager,
    localPlayerAlive,
  } = {}) {
    if (!this.smokeViewModel) {
      return;
    }

    this.smokeViewModel.visible = this.equippedUtilityKey === SMOKE_UTILITY_KEY
      && this.smokeCharges > 0
      && localPlayerAlive
      && !roundManager?.roundEnded;
  }

  getActiveUtilityLabel() {
    return getActiveUtilityLabel({
      selectedUtilityKey: this.equippedUtilityKey ?? SMOKE_UTILITY_KEY,
      localPlayerHasBomb: false,
      smokeCharges: this.smokeCharges,
    });
  }

  tryDropBomb(frameInput, roundManager, networkClient, selectedTeam, weaponManager) {
    if (
      !frameInput?.justPressed?.has?.('KeyG')
      || selectedTeam !== TEAMS.ATTACKERS
      || roundManager?.phase !== 'live'
      || roundManager?.roundEnded
      || !this.state.localPlayerHasBomb
    ) {
      return false;
    }

    networkClient?.sendBombDrop?.();
    if (weaponManager?.activeWeaponKey === BOMB_UTILITY_KEY) {
      weaponManager.equipWeapon(this.lastNonBombWeaponKey || 'rifle');
    }
    return true;
  }

  update(delta, {
    input,
    frameInput,
    playerController,
    roundManager,
    networkClient,
    selectedTeam,
    weaponManager,
  } = {}) {
    this.setPlantMovementLock(playerController, false);
    this.setDefuseMovementLock(playerController, false);

    if (!roundManager) {
      return;
    }

    const roundTransitioned = roundManager.roundNumber !== this.lastRoundNumber
      || roundManager.phase !== this.lastRoundPhase;
    if (roundTransitioned && roundManager.phase === 'freeze') {
      this.resetRoundState();
    }

    const objectiveState = networkClient?.getObjectiveState?.() ?? null;
    const authoritativeObjective = Boolean(objectiveState);
    const localPlayerAlive = networkClient?.getLocalPlayerState?.()?.isAlive !== false;
    if (weaponManager?.activeWeaponKey && weaponManager.activeWeaponKey !== BOMB_UTILITY_KEY) {
      this.lastNonBombWeaponKey = weaponManager.activeWeaponKey;
    }
    this.state.handleRoundTransition({
      roundManager,
      authoritativeObjective,
      networkClient,
      selectedTeam,
    });
    this.lastRoundNumber = roundManager.roundNumber;
    this.lastRoundPhase = roundManager.phase;
    this.smokeGrenadeManager?.update?.(delta, {
      listenerPosition: playerController?.getEyePosition?.() ?? playerController?.position ?? null,
      listenerYaw: Number(playerController?.yawAngle ?? 0),
      onBloom: (position) => {
        networkClient?.sendSmokeBloom?.({
          position,
        });
      },
    });

    if (authoritativeObjective) {
      this.state.applyAuthoritativeObjective({
        objectiveState,
        networkClient,
        selectedTeam,
      });
      const worldBombPosition = this.state.bombState === 'planted'
        ? objectiveState?.plantedPosition ?? null
        : (this.state.bombState === 'dropped' ? objectiveState?.droppedPosition ?? null : null);
      this.updateBombVisual(worldBombPosition, {
        trackExplosionAnchor: this.state.bombState === 'planted',
      });
    }

    if (!this.state.localPlayerHasBomb && weaponManager?.activeWeaponKey === BOMB_UTILITY_KEY) {
      weaponManager.equipWeapon('rifle');
    }
    if (weaponManager?.activeWeaponKey === BOMB_UTILITY_KEY) {
      this.equippedUtilityKey = null;
    }
    if (this.equippedUtilityKey === SMOKE_UTILITY_KEY && this.smokeCharges <= 0) {
      this.equippedUtilityKey = null;
    }
    this.updateSmokeViewModelVisibility({ roundManager, localPlayerAlive });

    if (roundManager.roundEnded) {
      this.state.plantProgress = 0;
      this.state.pendingPlantRequest = false;
      this.state.defuseProgress = 0;
      this.state.pendingDefuseRequest = false;
      this.state.pendingDefuseComplete = false;
      if (roundManager.winnerTeam === TEAMS.ATTACKERS && roundManager.winReason === 'bomb-exploded') {
        this.triggerBombExplosion(roundManager);
      }
      this.state.interactionText = '';
      if (this.state.bombState === 'planted') {
        this.state.statusText = `Bomb planted - ${formatBombSeconds(this.state.bombTimeRemaining)}s`;
      } else if (roundManager.winnerTeam === TEAMS.ATTACKERS && roundManager.winReason === 'bomb-exploded') {
        this.state.statusText = 'Bomb exploded';
      } else if (roundManager.winnerTeam === TEAMS.DEFENDERS && roundManager.winReason === 'bomb-defused') {
        this.state.statusText = 'Bomb defused';
      } else if (roundManager.winnerTeam) {
        this.state.statusText = `${roundManager.winnerTeam} win - ${formatBombSeconds(roundManager.roundEndCountdown)}s`;
      } else {
        this.state.statusText = '';
      }
      return;
    }

    const smokeThrown = this.tryThrowSmoke(frameInput, playerController, roundManager, localPlayerAlive, networkClient);
    if (smokeThrown) {
      this.handleSmokeThrown(weaponManager);
    }
    this.updateSmokeViewModelVisibility({ roundManager, localPlayerAlive });

    if (this.state.bombState === 'planted') {
      const plantedPosition = objectiveState?.plantedPosition ?? null;
      const localPlayerId = networkClient?.playerId ?? null;
      const localDefuser = localPlayerId && this.state.defuserPlayerId === localPlayerId;
      const remoteDefuserActive = Boolean(this.state.defuserPlayerId) && !localDefuser;
      if (authoritativeObjective) {
        this.state.statusText = `Bomb planted - ${formatBombSeconds(this.state.bombTimeRemaining)}s`;
        this.state.plantProgress = 0;
        this.state.pendingPlantRequest = false;
      } else {
        this.state.bombTimeRemaining = Math.max(0, this.state.bombTimeRemaining - delta);
        this.state.statusText = `Bomb planted - ${formatBombSeconds(this.state.bombTimeRemaining)}s`;
        if (this.state.bombTimeRemaining === 0) {
          this.state.bombState = 'exploded';
          roundManager.endRound(TEAMS.ATTACKERS, 'bomb-exploded');
        }
      }

      if (selectedTeam !== TEAMS.DEFENDERS || roundManager.phase !== 'live') {
        this.state.defuseProgress = 0;
        this.state.pendingDefuseRequest = false;
        this.state.pendingDefuseComplete = false;
        this.state.interactionText = '';
        return;
      }

      if (authoritativeObjective && localDefuser && this.state.pendingDefuseComplete) {
        this.setDefuseMovementLock(playerController, true);
        this.state.defuseProgress = this.state.defuseDuration;
        this.state.statusText = 'Defusing C4 100%';
        this.state.interactionText = '';
        return;
      }

      const canAttemptDefuse = this.canAttemptDefuse(playerController, plantedPosition);
      const defuseHeld = Boolean(input?.isPressed?.('KeyE'));
      const shouldCancelDefuse = authoritativeObjective
        && (this.state.pendingDefuseRequest || this.state.pendingDefuseComplete || localDefuser)
        && (!defuseHeld || !canAttemptDefuse || remoteDefuserActive);
      if (shouldCancelDefuse) {
        networkClient?.sendBombDefuse?.({
          action: 'cancel',
          position: playerController?.position,
          eyePosition: playerController?.getEyePosition?.() ?? null,
          direction: playerController?.camera?.getWorldDirection?.(playerController.getEyePosition().clone()) ?? null,
        });
        this.state.defuseProgress = 0;
        this.state.pendingDefuseRequest = false;
        this.state.pendingDefuseComplete = false;
      }

      if (remoteDefuserActive) {
        this.state.defuseProgress = 0;
        this.state.pendingDefuseRequest = false;
        this.state.pendingDefuseComplete = false;
        this.state.interactionText = canAttemptDefuse ? 'Bomb is being defused' : '';
        return;
      }

      if (canAttemptDefuse) {
        this.state.interactionText = 'Hold E to defuse';
      } else if (localDefuser) {
        this.state.interactionText = 'Keep looking at the bomb';
      }

      if (defuseHeld && canAttemptDefuse) {
        if (authoritativeObjective && !localDefuser && !this.state.pendingDefuseRequest) {
          const eyePosition = playerController?.getEyePosition?.() ?? null;
          const direction = playerController?.camera?.getWorldDirection?.(playerController.getEyePosition().clone()) ?? null;
          networkClient?.sendBombDefuse?.({
            action: 'start',
            position: playerController?.position,
            eyePosition,
            direction,
          });
          this.state.pendingDefuseRequest = true;
        }
        this.setDefuseMovementLock(playerController, true);
        this.state.defuseProgress = Math.min(this.state.defuseDuration, this.state.defuseProgress + delta);
        const percent = Math.round((this.state.defuseProgress / this.state.defuseDuration) * 100);
        this.state.statusText = `Defusing C4 ${percent}%`;
        if (this.state.defuseProgress >= this.state.defuseDuration) {
          if (authoritativeObjective) {
            if (!this.state.pendingDefuseComplete) {
              const eyePosition = playerController?.getEyePosition?.() ?? null;
              const direction = playerController?.camera?.getWorldDirection?.(playerController.getEyePosition().clone()) ?? null;
              networkClient?.sendBombDefuse?.({
                action: 'complete',
                position: playerController?.position,
                eyePosition,
                direction,
              });
              this.state.pendingDefuseComplete = true;
            }
            this.state.pendingDefuseRequest = false;
            this.state.statusText = 'Defusing C4 100%';
            return;
          }

          this.state.bombState = 'idle';
          this.state.bombTimeRemaining = 0;
          this.state.plantedZoneName = null;
          this.state.defuseProgress = 0;
          this.state.statusText = 'Bomb defused';
          roundManager.endRound(TEAMS.DEFENDERS, 'bomb-defused');
        }
        return;
      }

      this.state.defuseProgress = 0;
      this.state.pendingDefuseRequest = false;
      this.state.pendingDefuseComplete = false;
      return;
    }

    if (authoritativeObjective && this.state.pendingPlantRequest) {
      this.setPlantMovementLock(playerController, true);
      this.state.statusText = 'Planting C4 100%';
      this.state.interactionText = '';
      this.state.defuseProgress = 0;
      this.state.pendingDefuseRequest = false;
      this.state.pendingDefuseComplete = false;
      return;
    }
    this.tryDropBomb(frameInput, roundManager, networkClient, selectedTeam, weaponManager);
    this.updateSmokeViewModelVisibility({ roundManager, localPlayerAlive });

    if (this.state.bombState === 'dropped') {
      this.state.plantProgress = 0;
      this.state.pendingPlantRequest = false;
      this.state.defuseProgress = 0;
      this.state.pendingDefuseRequest = false;
      this.state.pendingDefuseComplete = false;
      this.state.statusText = selectedTeam === TEAMS.ATTACKERS ? 'Bomb dropped' : '';
      this.state.interactionText = selectedTeam === TEAMS.ATTACKERS
        ? 'Move over C4 to pick up'
        : '';
      return;
    }

    const bombEquipped = weaponManager?.activeWeaponKey === BOMB_UTILITY_KEY;
    if (!this.state.localPlayerHasBomb || !bombEquipped || selectedTeam !== TEAMS.ATTACKERS || roundManager.phase !== 'live') {
      this.state.plantProgress = 0;
      this.state.pendingPlantRequest = false;
      this.state.defuseProgress = 0;
      this.state.pendingDefuseRequest = false;
      this.state.pendingDefuseComplete = false;
      this.state.statusText = this.state.localPlayerHasBomb ? 'Bomb carrier' : '';
      this.state.interactionText = '';
      if (this.equippedUtilityKey === SMOKE_UTILITY_KEY) {
        if (this.smokeCharges > 0 && localPlayerAlive && roundManager.phase !== 'waiting') {
          if (smokeThrown) {
            this.state.statusText = this.state.localPlayerHasBomb ? 'Bomb carrier' : 'Smoke deployed';
          }
          this.state.interactionText = 'Left click to throw smoke';
        } else if (this.smokeCharges <= 0) {
          this.state.interactionText = 'No smoke grenades remaining';
        } else {
          this.state.interactionText = '';
        }
      } else if (this.state.localPlayerHasBomb && !bombEquipped && selectedTeam === TEAMS.ATTACKERS && roundManager.phase === 'live') {
        this.state.interactionText = 'Equip C4 with 5';
      }
      return;
    }

    const plantZone = getPlantZoneAtPosition(this.plantZones, playerController?.position);
    this.state.statusText = 'Bomb carrier';
    if (!plantZone) {
      this.state.plantProgress = 0;
      this.state.pendingPlantRequest = false;
      this.state.defuseProgress = 0;
      this.state.pendingDefuseRequest = false;
      this.state.pendingDefuseComplete = false;
      return;
    }

    this.state.interactionText = `Hold left click to plant (${plantZone.name})`;
    if (input?.isMouseButtonPressed?.(0) && playerController?.isGrounded) {
      this.setPlantMovementLock(playerController, true);
      this.state.plantProgress = Math.min(this.state.plantDuration, this.state.plantProgress + delta);
      const percent = Math.round((this.state.plantProgress / this.state.plantDuration) * 100);
      this.state.statusText = `Planting C4 ${percent}%`;
      if (this.state.plantProgress >= this.state.plantDuration) {
        if (authoritativeObjective) {
          if (!this.state.pendingPlantRequest) {
            networkClient?.sendBombPlant?.({
              zoneName: plantZone.name,
              position: playerController?.position,
            });
            this.state.pendingPlantRequest = true;
          }
          this.state.statusText = 'Planting C4 100%';
          return;
        }

        this.state.localPlayerHasBomb = false;
        this.equippedUtilityKey = null;
        this.state.bombState = 'planted';
        this.state.bombTimeRemaining = this.state.bombDuration;
        this.state.plantedZoneName = plantZone.name;
        this.updateBombVisual(playerController?.position ?? null, { trackExplosionAnchor: true });
        this.state.plantProgress = 0;
        this.state.statusText = `Bomb planted - ${formatBombSeconds(this.state.bombTimeRemaining)}s`;
      }
      return;
    }

    this.state.plantProgress = 0;
    this.state.pendingPlantRequest = false;
    this.state.defuseProgress = 0;
    this.state.pendingDefuseRequest = false;
    this.state.pendingDefuseComplete = false;
  }

  getHudState() {
    return {
      activeUtility: this.getActiveUtilityLabel(),
      selectedUtilityKey: SMOKE_UTILITY_KEY,
      equippedUtilityKey: this.equippedUtilityKey,
      bombCarrierPlayerId: this.state.bombCarrierPlayerId,
      localPlayerHasBomb: this.state.localPlayerHasBomb,
      plantProgress: this.state.plantProgress,
      plantDuration: this.state.plantDuration,
      defuseProgress: this.state.defuseProgress,
      defuseDuration: this.state.defuseDuration,
      bombState: this.state.bombState,
      bombTimeRemaining: this.state.bombTimeRemaining,
      defuserPlayerId: this.state.defuserPlayerId,
      smokeCharges: this.smokeCharges,
      progressLabel: this.state.defuseProgress > 0 ? 'DEFUSING' : 'PLANTING',
      interactionText: this.state.interactionText,
      statusText: this.state.statusText,
      plantZones: this.plantZones,
    };
  }

  destroy() {
    this.plantedBombVisual?.destroy();
    this.plantedBombVisual = null;
    this.smokeGrenadeManager?.destroy?.();
    this.smokeGrenadeManager = null;
    disposeObject3D(this.smokeViewModel);
    this.smokeViewModel = null;
  }
}
