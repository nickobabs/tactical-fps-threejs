import { TEAMS } from './constants.js';

import { DEFAULT_SMOKE_GRENADES } from '../game/utility/utilityLoadout.js';

export const DEFAULT_UTILITY_LABEL = 'Smoke Grenade';
export const BOMB_UTILITY_KEY = 'bomb';
export const SMOKE_UTILITY_KEY = 'smoke';
export const DEFAULT_UTILITY_KEY = SMOKE_UTILITY_KEY;
export const DEFAULT_BOMB_DURATION = 40;
export const DEFAULT_PLANT_DURATION = 3.5;
export const DEFAULT_DEFUSE_DURATION = 6;

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

export function getBombPulseIntervalSeconds(secondsRemaining) {
  const safeSeconds = Math.max(0, Number(secondsRemaining ?? 0));
  if (safeSeconds > 25) {
    return 1;
  }
  if (safeSeconds > 15) {
    return 0.75;
  }
  if (safeSeconds > 8) {
    return 0.5;
  }

  const normalized = Math.min(1, Math.max(0, safeSeconds / 8));
  const eased = normalized * normalized;
  return 0.1 + (0.5 - 0.1) * eased;
}

export function createBombObjectiveSnapshot() {
  return {
    bombCarrierPlayerId: null,
    bombState: 'idle',
    bombTimeRemaining: 0,
    droppedPosition: null,
    droppedMapId: null,
    plantedZoneName: null,
    plantedPosition: null,
    plantedMapId: null,
    defuserPlayerId: null,
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

export function getActiveUtilityLabel({ selectedUtilityKey, localPlayerHasBomb, smokeCharges = DEFAULT_SMOKE_GRENADES }) {
  return selectedUtilityKey === BOMB_UTILITY_KEY && localPlayerHasBomb
    ? 'C4 Explosive'
    : `${DEFAULT_UTILITY_LABEL} x${Math.max(0, Number(smokeCharges ?? 0))}`;
}
