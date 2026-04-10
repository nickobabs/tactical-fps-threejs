import { PlantedBombVisual } from './PlantedBombVisual.js';
import { BombObjectiveState } from './BombObjectiveState.js';
import { TEAMS } from '../../shared/constants.js';
import { BOMB_UTILITY_KEY, DEFAULT_UTILITY_KEY, formatBombSeconds } from '../../shared/bombObjective.js';
import { getPlantZoneAtPosition } from '../../shared/maps/mapPlantZones.js';

export class UtilityManager {
  constructor() {
    this.plantZones = [];
    this.state = new BombObjectiveState();
    this.plantedBombVisual = null;
  }

  configureMap({ plantZones = [], scene = null } = {}) {
    this.plantZones = Array.isArray(plantZones) ? plantZones : [];
    this.plantedBombVisual = new PlantedBombVisual(scene ?? null);
  }

  canEquipWeapon(weaponKey) {
    if (weaponKey === BOMB_UTILITY_KEY) {
      return this.state.localPlayerHasBomb;
    }

    return true;
  }

  resetRoundState() {
    this.state.resetRoundState();
    this.updatePlantedBombVisual(null);
  }

  updatePlantedBombVisual(position) {
    this.plantedBombVisual?.setVisiblePosition(position ?? null);
  }

  update(delta, {
    input,
    playerController,
    roundManager,
    networkClient,
    selectedTeam,
    weaponManager,
  } = {}) {
    if (!roundManager) {
      return;
    }

    const objectiveState = networkClient?.getObjectiveState?.() ?? null;
    const authoritativeObjective = Boolean(objectiveState);
    this.state.handleRoundTransition({
      roundManager,
      authoritativeObjective,
      networkClient,
      selectedTeam,
    });
    this.state.syncEquippedUtility(input);

    if (authoritativeObjective) {
      this.state.applyAuthoritativeObjective({
        objectiveState,
        networkClient,
        selectedTeam,
      });
      this.updatePlantedBombVisual(
        this.state.bombState === 'planted' ? objectiveState?.plantedPosition ?? null : null,
      );
    }

    if (!this.state.localPlayerHasBomb && weaponManager?.activeWeaponKey === BOMB_UTILITY_KEY) {
      weaponManager.equipWeapon('rifle');
    }

    if (weaponManager?.activeWeaponKey === BOMB_UTILITY_KEY && this.state.localPlayerHasBomb) {
      this.state.selectedUtilityKey = BOMB_UTILITY_KEY;
    } else if (this.state.selectedUtilityKey === BOMB_UTILITY_KEY && !this.state.localPlayerHasBomb) {
      this.state.selectedUtilityKey = DEFAULT_UTILITY_KEY;
    }

    if (roundManager.roundEnded) {
      if (this.state.bombState === 'planted') {
        this.state.statusText = `Bomb planted - ${formatBombSeconds(this.state.bombTimeRemaining)}s`;
      } else if (roundManager.winnerTeam === TEAMS.ATTACKERS && roundManager.winReason === 'bomb-exploded') {
        this.state.statusText = 'Bomb exploded';
      } else if (roundManager.winnerTeam) {
        this.state.statusText = `${roundManager.winnerTeam} win - ${formatBombSeconds(roundManager.roundEndCountdown)}s`;
      } else {
        this.state.statusText = '';
      }
      return;
    }

    if (this.state.bombState === 'planted') {
      if (authoritativeObjective) {
        this.state.statusText = `Bomb planted - ${formatBombSeconds(this.state.bombTimeRemaining)}s`;
        this.state.plantProgress = 0;
        this.state.pendingPlantRequest = false;
        return;
      }

      this.state.bombTimeRemaining = Math.max(0, this.state.bombTimeRemaining - delta);
      this.state.statusText = `Bomb planted - ${formatBombSeconds(this.state.bombTimeRemaining)}s`;
      if (this.state.bombTimeRemaining === 0) {
        this.state.bombState = 'exploded';
        roundManager.endRound(TEAMS.ATTACKERS, 'bomb-exploded');
      }
      return;
    }

    if (!this.state.localPlayerHasBomb || this.state.selectedUtilityKey !== BOMB_UTILITY_KEY || selectedTeam !== TEAMS.ATTACKERS || roundManager.phase !== 'live') {
      this.state.statusText = this.state.localPlayerHasBomb ? 'Bomb carrier' : '';
      this.state.plantProgress = 0;
      this.state.pendingPlantRequest = false;
      return;
    }

    if (weaponManager?.activeWeaponKey !== BOMB_UTILITY_KEY) {
      this.state.statusText = 'Bomb carrier';
      this.state.interactionText = 'Equip C4 with 5';
      this.state.plantProgress = 0;
      this.state.pendingPlantRequest = false;
      return;
    }

    const plantZone = getPlantZoneAtPosition(this.plantZones, playerController?.position);
    this.state.statusText = 'Bomb carrier';
    if (!plantZone) {
      this.state.plantProgress = 0;
      this.state.pendingPlantRequest = false;
      return;
    }

    this.state.interactionText = `Hold left click to plant (${plantZone.name})`;
    if (input?.isMouseButtonPressed?.(0) && playerController?.isGrounded) {
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
        this.state.selectedUtilityKey = DEFAULT_UTILITY_KEY;
        this.state.bombState = 'planted';
        this.state.bombTimeRemaining = this.state.bombDuration;
        this.state.plantedZoneName = plantZone.name;
        this.updatePlantedBombVisual(playerController?.position ?? null);
        this.state.plantProgress = 0;
        this.state.statusText = `Bomb planted - ${formatBombSeconds(this.state.bombTimeRemaining)}s`;
      }
      return;
    }

    this.state.plantProgress = 0;
    this.state.pendingPlantRequest = false;
  }

  getHudState() {
    return this.state.getHudState(this.plantZones);
  }

  destroy() {
    this.plantedBombVisual?.destroy();
    this.plantedBombVisual = null;
  }
}
