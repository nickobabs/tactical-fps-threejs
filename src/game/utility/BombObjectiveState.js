import { TEAMS } from '../../shared/constants.js';
import {
  BOMB_UTILITY_KEY,
  DEFAULT_BOMB_DURATION,
  DEFAULT_PLANT_DURATION,
  DEFAULT_UTILITY_KEY,
  formatBombSeconds,
  getActiveUtilityLabel,
  isLocalBombCarrier,
  selectBombCarrierPlayerId,
} from '../../shared/bombObjective.js';

export class BombObjectiveState {
  constructor({ plantDuration = DEFAULT_PLANT_DURATION, bombDuration = DEFAULT_BOMB_DURATION } = {}) {
    this.plantDuration = plantDuration;
    this.bombDuration = bombDuration;
    this.lastRoundNumber = 0;
    this.lastRoundPhase = null;
    this.bombCarrierPlayerId = null;
    this.localPlayerHasBomb = false;
    this.plantProgress = 0;
    this.bombState = 'idle';
    this.bombTimeRemaining = 0;
    this.plantedZoneName = null;
    this.statusText = '';
    this.interactionText = '';
    this.selectedUtilityKey = DEFAULT_UTILITY_KEY;
    this.pendingPlantRequest = false;
  }

  resetRoundState() {
    this.bombCarrierPlayerId = null;
    this.localPlayerHasBomb = false;
    this.plantProgress = 0;
    this.bombState = 'idle';
    this.bombTimeRemaining = 0;
    this.plantedZoneName = null;
    this.statusText = '';
    this.interactionText = '';
    this.selectedUtilityKey = DEFAULT_UTILITY_KEY;
    this.pendingPlantRequest = false;
  }

  collectAttackerPlayerIds({ networkClient, localPlayerId, selectedTeam }) {
    const scoreboardPlayers = networkClient?.getScoreboardState?.()?.teams
      ?.find?.((team) => team.key === TEAMS.ATTACKERS)
      ?.players ?? [];
    const attackerIds = scoreboardPlayers.map((player) => player.playerId).filter(Boolean);
    if (attackerIds.length === 0 && selectedTeam === TEAMS.ATTACKERS) {
      attackerIds.push(localPlayerId);
    }
    return [...new Set(attackerIds)].sort();
  }

  assignLocalBombCarrier({ roundNumber, networkClient, selectedTeam }) {
    const localPlayerId = networkClient?.playerId ?? 'local-player';
    const attackerIds = this.collectAttackerPlayerIds({
      networkClient,
      localPlayerId,
      selectedTeam,
    });
    if (attackerIds.length === 0) {
      this.bombCarrierPlayerId = null;
      this.localPlayerHasBomb = false;
      this.selectedUtilityKey = DEFAULT_UTILITY_KEY;
      return;
    }

    this.bombCarrierPlayerId = selectBombCarrierPlayerId({
      roundNumber,
      attackerPlayerIds: attackerIds,
    });
    this.localPlayerHasBomb = isLocalBombCarrier({
      selectedTeam,
      bombCarrierPlayerId: this.bombCarrierPlayerId,
      localPlayerId,
    });
    this.selectedUtilityKey = this.localPlayerHasBomb ? BOMB_UTILITY_KEY : DEFAULT_UTILITY_KEY;
    this.statusText = this.localPlayerHasBomb ? 'Bomb carrier' : '';
  }

  handleRoundTransition({ roundManager, authoritativeObjective, networkClient, selectedTeam }) {
    if (roundManager.roundNumber === this.lastRoundNumber && roundManager.phase === this.lastRoundPhase) {
      return;
    }

    if (roundManager.phase === 'freeze') {
      this.resetRoundState();
    } else if (roundManager.phase === 'live' && !authoritativeObjective) {
      this.assignLocalBombCarrier({
        roundNumber: roundManager.roundNumber,
        networkClient,
        selectedTeam,
      });
    }

    this.lastRoundNumber = roundManager.roundNumber;
    this.lastRoundPhase = roundManager.phase;
  }

  syncEquippedUtility(input) {
    this.interactionText = '';
    if (input?.justPressed?.has?.('Digit5') && this.localPlayerHasBomb) {
      this.selectedUtilityKey = BOMB_UTILITY_KEY;
    } else if (input?.justPressed?.has?.('Digit6')) {
      this.selectedUtilityKey = DEFAULT_UTILITY_KEY;
    }
  }

  applyAuthoritativeObjective({ objectiveState, networkClient, selectedTeam }) {
    this.bombCarrierPlayerId = objectiveState?.bombCarrierPlayerId ?? null;
    this.localPlayerHasBomb = isLocalBombCarrier({
      selectedTeam,
      bombCarrierPlayerId: this.bombCarrierPlayerId,
      localPlayerId: networkClient?.playerId ?? 'local-player',
    });
    this.bombState = String(objectiveState?.bombState ?? 'idle');
    this.bombTimeRemaining = Math.max(0, Number(objectiveState?.bombTimeRemaining ?? 0));
    this.plantedZoneName = objectiveState?.plantedZoneName ?? null;
    if (!this.localPlayerHasBomb && this.selectedUtilityKey === BOMB_UTILITY_KEY) {
      this.selectedUtilityKey = DEFAULT_UTILITY_KEY;
    }
  }

  getActiveUtilityLabel() {
    return getActiveUtilityLabel({
      selectedUtilityKey: this.selectedUtilityKey,
      localPlayerHasBomb: this.localPlayerHasBomb,
    });
  }

  getHudState(plantZones) {
    return {
      activeUtility: this.getActiveUtilityLabel(),
      selectedUtilityKey: this.selectedUtilityKey,
      bombCarrierPlayerId: this.bombCarrierPlayerId,
      localPlayerHasBomb: this.localPlayerHasBomb,
      plantProgress: this.plantProgress,
      plantDuration: this.plantDuration,
      bombState: this.bombState,
      bombTimeRemaining: this.bombTimeRemaining,
      interactionText: this.interactionText,
      statusText: this.statusText,
      plantZones,
    };
  }
}
