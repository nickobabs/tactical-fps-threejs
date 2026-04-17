export const GAMEMODES = {
  DEBUG: 'debug',
  COMPETITIVE: 'competitive',
};

export const COMPETITIVE_GAMEMODE_MAP_ID = 'dust2-map-test';

export const GAMEMODE_OPTIONS = [
  { id: GAMEMODES.DEBUG, label: 'Debug' },
  { id: GAMEMODES.COMPETITIVE, label: 'Competitive' },
];

export function normalizeGamemode(gamemode) {
  return String(gamemode ?? '').trim().toLowerCase() === GAMEMODES.COMPETITIVE
    ? GAMEMODES.COMPETITIVE
    : GAMEMODES.DEBUG;
}

export function isCompetitiveGamemodeSupported(mapId) {
  return String(mapId ?? '') === COMPETITIVE_GAMEMODE_MAP_ID;
}

export function sanitizeGamemodeForMap(gamemode, mapId) {
  const normalized = normalizeGamemode(gamemode);
  if (normalized === GAMEMODES.COMPETITIVE && isCompetitiveGamemodeSupported(mapId)) {
    return GAMEMODES.COMPETITIVE;
  }

  return GAMEMODES.DEBUG;
}

export function getGamemodeLabel(gamemode) {
  return GAMEMODE_OPTIONS.find((option) => option.id === normalizeGamemode(gamemode))?.label ?? 'Debug';
}

export function isCompetitiveGamemode(gamemode) {
  return normalizeGamemode(gamemode) === GAMEMODES.COMPETITIVE;
}
