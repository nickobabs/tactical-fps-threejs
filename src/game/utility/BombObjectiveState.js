import { TEAMS } from '../../shared/constants.js';
import {
  DEFAULT_BOMB_DURATION,
  DEFAULT_DEFUSE_DURATION,
  DEFAULT_PLANT_DURATION,
  formatBombSeconds,
  isLocalBombCarrier,
  selectBombCarrierPlayerId,
} from '../../shared/bombObjective.js';

export class BombObjectiveState {
  constructor({
    plantDuration = DEFAULT_PLANT_DURATION,
    defuseDuration = DEFAULT_DEFUSE_DURATION,
    bombDuration = DEFAULT_BOMB_DURATION,
  } = {}) {
    this.plantDuration = plantDuration;
    this.defuseDuration = defuseDuration;
    this.bombDuration = bombDuration;
    this.lastRoundNumber = 0;
    this.lastRoundPhase = null;
    this.bombCarrierPlayerId = null;
    this.localPlayerHasBomb = false;
    this.plantProgress = 0;
    this.bombState = 'idle';
    this.bombTimeRemaining = 0;
    this.plantedZoneName = null;
    this.defuserPlayerId = null;
    this.statusText = '';
    this.interactionText = '';
    this.pendingPlantRequest = false;
    this.defuseProgress = 0;
    this.pendingDefuseRequest = false;
  }

  resetRoundState() {
    this.bombCarrierPlayerId = null;
    this.localPlayerHasBomb = false;
    this.plantProgress = 0;
    this.bombState = 'idle';
    this.bombTimeRemaining = 0;
    this.plantedZoneName = null;
    this.defuserPlayerId = null;
    this.statusText = '';
    this.interactionText = '';
    this.pendingPlantRequest = false;
    this.defuseProgress = 0;
    this.pendingDefuseRequest = false;
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
    this.defuserPlayerId = objectiveState?.defuserPlayerId ?? null;
  }
}
