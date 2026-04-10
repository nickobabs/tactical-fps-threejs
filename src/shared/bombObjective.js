import { TEAMS } from './constants.js';

export const DEFAULT_UTILITY_LABEL = 'Flashbang';
export const BOMB_UTILITY_KEY = 'bomb';
export const DEFAULT_UTILITY_KEY = 'flashbang';
export const DEFAULT_BOMB_DURATION = 40;
export const DEFAULT_PLANT_DURATION = 3;

function hashString(value) {
  let hash = 0;
  const text = String(value ?? '');
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function formatBombSeconds(value) {
  return Math.max(0, value).toFixed(1);
}

export function createBombObjectiveSnapshot() {
  return {
    bombCarrierPlayerId: null,
    bombState: 'idle',
    bombTimeRemaining: 0,
    plantedZoneName: null,
    plantedPosition: null,
  };
}

export function selectBombCarrierPlayerId({ roundNumber, attackerPlayerIds }) {
  const attackerIds = Array.isArray(attackerPlayerIds)
    ? [...new Set(attackerPlayerIds.filter(Boolean))].sort()
    : [];
  if (attackerIds.length === 0) {
    return null;
  }

  const selectionSeed = `${roundNumber}:${attackerIds.join('|')}`;
  const carrierIndex = hashString(selectionSeed) % attackerIds.length;
  return attackerIds[carrierIndex];
}

export function isLocalBombCarrier({ selectedTeam, bombCarrierPlayerId, localPlayerId }) {
  return selectedTeam === TEAMS.ATTACKERS
    && Boolean(bombCarrierPlayerId)
    && bombCarrierPlayerId === (localPlayerId ?? 'local-player');
}

export function getActiveUtilityLabel({ selectedUtilityKey, localPlayerHasBomb }) {
  return selectedUtilityKey === BOMB_UTILITY_KEY && localPlayerHasBomb
    ? 'C4 Explosive'
    : DEFAULT_UTILITY_LABEL;
}
