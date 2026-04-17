export const HUD_LAYOUT_TUNING_STORAGE_KEY = 'tactical-fps-threejs-hud-layout-tuning';

export const HUD_LAYOUT_TUNING = {
  roundWinTop: 120,
  roundWinGap: 10,
  matchRestartTop: 124,
  matchRestartTransitionTop: 201,
  roundRosterTop: 21,
  roundRosterHeight: 72,
  roundRosterCenterTop: 7,
  roundRosterTeamTop: 8,
  roundRosterScoreTop: 40,
  bombIconSize: 33,
  bombIconOffsetX: 0,
  bombIconOffsetY: -6,
  bombPulseMinScale: 1,
  bombPulseMaxScale: 1.22,
  killfeedTop: 89,
  killfeedRight: 87,
  killfeedWidth: 528,
  killfeedEntryMinWidth: 13,
  killfeedPaddingX: 14,
  killfeedPaddingY: 4,
  killfeedBodyItemGap: 0,
  killfeedHeadshotItemGap: 15,
  killfeedNameSize: 18,
  killfeedNameOffsetY: 0,
  killfeedWeaponGap: -9,
  killfeedRifleBodyWeaponIconSize: 113,
  killfeedRifleBodyWeaponOffsetY: 13,
  killfeedRifleHeadshotWeaponSlotWidth: 117,
  killfeedRifleHeadshotWeaponIconSize: 113,
  killfeedRifleHeadshotWeaponOffsetY: 13,
  killfeedPistolBodyWeaponIconSize: 100,
  killfeedPistolBodyWeaponOffsetY: 11,
  killfeedPistolHeadshotWeaponSlotWidth: 107,
  killfeedPistolHeadshotWeaponIconSize: 100,
  killfeedPistolHeadshotWeaponOffsetY: 11,
  killfeedHeadshotIconSize: 22,
  killfeedHeadshotOffsetY: 0,
  killfeedBorderWidth: 2,
  killfeedBorderRadius: 0,
};

function parseStoredValue(source, key, fallback) {
  const value = Number(source?.[key]);
  return Number.isFinite(value) ? value : fallback;
}

export function loadHudLayoutTuning() {
  if (typeof window === 'undefined') {
    return { ...HUD_LAYOUT_TUNING };
  }

  try {
    const raw = window.localStorage.getItem(HUD_LAYOUT_TUNING_STORAGE_KEY);
    if (!raw) {
      return { ...HUD_LAYOUT_TUNING };
    }

    const parsed = JSON.parse(raw);
    return {
      roundWinTop: parseStoredValue(parsed, 'roundWinTop', HUD_LAYOUT_TUNING.roundWinTop),
      roundWinGap: parseStoredValue(parsed, 'roundWinGap', HUD_LAYOUT_TUNING.roundWinGap),
      matchRestartTop: parseStoredValue(parsed, 'matchRestartTop', HUD_LAYOUT_TUNING.matchRestartTop),
      matchRestartTransitionTop: parseStoredValue(parsed, 'matchRestartTransitionTop', HUD_LAYOUT_TUNING.matchRestartTransitionTop),
      roundRosterTop: parseStoredValue(parsed, 'roundRosterTop', HUD_LAYOUT_TUNING.roundRosterTop),
      roundRosterHeight: parseStoredValue(parsed, 'roundRosterHeight', HUD_LAYOUT_TUNING.roundRosterHeight),
      roundRosterCenterTop: parseStoredValue(parsed, 'roundRosterCenterTop', HUD_LAYOUT_TUNING.roundRosterCenterTop),
      roundRosterTeamTop: parseStoredValue(parsed, 'roundRosterTeamTop', HUD_LAYOUT_TUNING.roundRosterTeamTop),
      roundRosterScoreTop: parseStoredValue(parsed, 'roundRosterScoreTop', HUD_LAYOUT_TUNING.roundRosterScoreTop),
      bombIconSize: parseStoredValue(parsed, 'bombIconSize', HUD_LAYOUT_TUNING.bombIconSize),
      bombIconOffsetX: parseStoredValue(parsed, 'bombIconOffsetX', HUD_LAYOUT_TUNING.bombIconOffsetX),
      bombIconOffsetY: parseStoredValue(parsed, 'bombIconOffsetY', HUD_LAYOUT_TUNING.bombIconOffsetY),
      bombPulseMinScale: parseStoredValue(parsed, 'bombPulseMinScale', HUD_LAYOUT_TUNING.bombPulseMinScale),
      bombPulseMaxScale: parseStoredValue(parsed, 'bombPulseMaxScale', HUD_LAYOUT_TUNING.bombPulseMaxScale),
      killfeedTop: parseStoredValue(parsed, 'killfeedTop', HUD_LAYOUT_TUNING.killfeedTop),
      killfeedRight: parseStoredValue(parsed, 'killfeedRight', HUD_LAYOUT_TUNING.killfeedRight),
      killfeedWidth: parseStoredValue(parsed, 'killfeedWidth', HUD_LAYOUT_TUNING.killfeedWidth),
      killfeedEntryMinWidth: parseStoredValue(parsed, 'killfeedEntryMinWidth', HUD_LAYOUT_TUNING.killfeedEntryMinWidth),
      killfeedPaddingX: parseStoredValue(parsed, 'killfeedPaddingX', HUD_LAYOUT_TUNING.killfeedPaddingX),
      killfeedPaddingY: parseStoredValue(parsed, 'killfeedPaddingY', HUD_LAYOUT_TUNING.killfeedPaddingY),
      killfeedBodyItemGap: parseStoredValue(parsed, 'killfeedBodyItemGap', HUD_LAYOUT_TUNING.killfeedBodyItemGap),
      killfeedHeadshotItemGap: parseStoredValue(parsed, 'killfeedHeadshotItemGap', HUD_LAYOUT_TUNING.killfeedHeadshotItemGap),
      killfeedNameSize: parseStoredValue(parsed, 'killfeedNameSize', HUD_LAYOUT_TUNING.killfeedNameSize),
      killfeedNameOffsetY: parseStoredValue(parsed, 'killfeedNameOffsetY', HUD_LAYOUT_TUNING.killfeedNameOffsetY),
      killfeedWeaponGap: parseStoredValue(parsed, 'killfeedWeaponGap', HUD_LAYOUT_TUNING.killfeedWeaponGap),
      killfeedRifleBodyWeaponIconSize: parseStoredValue(parsed, 'killfeedRifleBodyWeaponIconSize', HUD_LAYOUT_TUNING.killfeedRifleBodyWeaponIconSize),
      killfeedRifleBodyWeaponOffsetY: parseStoredValue(parsed, 'killfeedRifleBodyWeaponOffsetY', HUD_LAYOUT_TUNING.killfeedRifleBodyWeaponOffsetY),
      killfeedRifleHeadshotWeaponSlotWidth: parseStoredValue(parsed, 'killfeedRifleHeadshotWeaponSlotWidth', HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponSlotWidth),
      killfeedRifleHeadshotWeaponIconSize: parseStoredValue(parsed, 'killfeedRifleHeadshotWeaponIconSize', HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponIconSize),
      killfeedRifleHeadshotWeaponOffsetY: parseStoredValue(parsed, 'killfeedRifleHeadshotWeaponOffsetY', HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponOffsetY),
      killfeedPistolBodyWeaponIconSize: parseStoredValue(parsed, 'killfeedPistolBodyWeaponIconSize', HUD_LAYOUT_TUNING.killfeedPistolBodyWeaponIconSize),
      killfeedPistolBodyWeaponOffsetY: parseStoredValue(parsed, 'killfeedPistolBodyWeaponOffsetY', HUD_LAYOUT_TUNING.killfeedPistolBodyWeaponOffsetY),
      killfeedPistolHeadshotWeaponSlotWidth: parseStoredValue(parsed, 'killfeedPistolHeadshotWeaponSlotWidth', HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponSlotWidth),
      killfeedPistolHeadshotWeaponIconSize: parseStoredValue(parsed, 'killfeedPistolHeadshotWeaponIconSize', HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponIconSize),
      killfeedPistolHeadshotWeaponOffsetY: parseStoredValue(parsed, 'killfeedPistolHeadshotWeaponOffsetY', HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponOffsetY),
      killfeedHeadshotIconSize: parseStoredValue(parsed, 'killfeedHeadshotIconSize', HUD_LAYOUT_TUNING.killfeedHeadshotIconSize),
      killfeedHeadshotOffsetY: parseStoredValue(parsed, 'killfeedHeadshotOffsetY', HUD_LAYOUT_TUNING.killfeedHeadshotOffsetY),
      killfeedBorderWidth: parseStoredValue(parsed, 'killfeedBorderWidth', HUD_LAYOUT_TUNING.killfeedBorderWidth),
      killfeedBorderRadius: parseStoredValue(parsed, 'killfeedBorderRadius', HUD_LAYOUT_TUNING.killfeedBorderRadius),
    };
  } catch {
    return { ...HUD_LAYOUT_TUNING };
  }
}

export function persistHudLayoutTuning() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(HUD_LAYOUT_TUNING_STORAGE_KEY, JSON.stringify(HUD_LAYOUT_TUNING));
  } catch {
    // Ignore localStorage write failures.
  }
}

export function setHudLayoutTuningValue(key, value) {
  if (!(key in HUD_LAYOUT_TUNING) || !Number.isFinite(value)) {
    return;
  }

  HUD_LAYOUT_TUNING[key] = value;
  persistHudLayoutTuning();
}

export function resetHudLayoutTuning() {
  HUD_LAYOUT_TUNING.roundWinTop = 120;
  HUD_LAYOUT_TUNING.roundWinGap = 10;
  HUD_LAYOUT_TUNING.matchRestartTop = 124;
  HUD_LAYOUT_TUNING.matchRestartTransitionTop = 201;
  HUD_LAYOUT_TUNING.roundRosterTop = 21;
  HUD_LAYOUT_TUNING.roundRosterHeight = 72;
  HUD_LAYOUT_TUNING.roundRosterCenterTop = 7;
  HUD_LAYOUT_TUNING.roundRosterTeamTop = 8;
  HUD_LAYOUT_TUNING.roundRosterScoreTop = 40;
  HUD_LAYOUT_TUNING.bombIconSize = 33;
  HUD_LAYOUT_TUNING.bombIconOffsetX = 0;
  HUD_LAYOUT_TUNING.bombIconOffsetY = -6;
  HUD_LAYOUT_TUNING.bombPulseMinScale = 1;
  HUD_LAYOUT_TUNING.bombPulseMaxScale = 1.22;
  HUD_LAYOUT_TUNING.killfeedTop = 89;
  HUD_LAYOUT_TUNING.killfeedRight = 87;
  HUD_LAYOUT_TUNING.killfeedWidth = 528;
  HUD_LAYOUT_TUNING.killfeedEntryMinWidth = 13;
  HUD_LAYOUT_TUNING.killfeedPaddingX = 14;
  HUD_LAYOUT_TUNING.killfeedPaddingY = 4;
  HUD_LAYOUT_TUNING.killfeedBodyItemGap = 0;
  HUD_LAYOUT_TUNING.killfeedHeadshotItemGap = 15;
  HUD_LAYOUT_TUNING.killfeedNameSize = 18;
  HUD_LAYOUT_TUNING.killfeedNameOffsetY = 0;
  HUD_LAYOUT_TUNING.killfeedWeaponGap = -9;
  HUD_LAYOUT_TUNING.killfeedRifleBodyWeaponIconSize = 113;
  HUD_LAYOUT_TUNING.killfeedRifleBodyWeaponOffsetY = 13;
  HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponSlotWidth = 117;
  HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponIconSize = 113;
  HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponOffsetY = 13;
  HUD_LAYOUT_TUNING.killfeedPistolBodyWeaponIconSize = 100;
  HUD_LAYOUT_TUNING.killfeedPistolBodyWeaponOffsetY = 11;
  HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponSlotWidth = 107;
  HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponIconSize = 100;
  HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponOffsetY = 11;
  HUD_LAYOUT_TUNING.killfeedHeadshotIconSize = 22;
  HUD_LAYOUT_TUNING.killfeedHeadshotOffsetY = 0;
  HUD_LAYOUT_TUNING.killfeedBorderWidth = 2;
  HUD_LAYOUT_TUNING.killfeedBorderRadius = 0;
  persistHudLayoutTuning();
}

export function applyHudLayoutTuningToRoot(root = document?.documentElement) {
  if (!root) {
    return;
  }

  root.style.setProperty('--hud-round-win-top', `${HUD_LAYOUT_TUNING.roundWinTop}px`);
  root.style.setProperty('--hud-round-win-gap', `${HUD_LAYOUT_TUNING.roundWinGap}px`);
  root.style.setProperty('--hud-match-restart-top', `${HUD_LAYOUT_TUNING.matchRestartTop}px`);
  root.style.setProperty('--hud-match-restart-transition-top', `${HUD_LAYOUT_TUNING.matchRestartTransitionTop}px`);
  root.style.setProperty('--hud-round-roster-top', `${HUD_LAYOUT_TUNING.roundRosterTop}px`);
  root.style.setProperty('--hud-round-roster-height', `${HUD_LAYOUT_TUNING.roundRosterHeight}px`);
  root.style.setProperty('--hud-round-roster-center-top', `${HUD_LAYOUT_TUNING.roundRosterCenterTop}px`);
  root.style.setProperty('--hud-round-roster-team-top', `${HUD_LAYOUT_TUNING.roundRosterTeamTop}px`);
  root.style.setProperty('--hud-round-roster-score-top', `${HUD_LAYOUT_TUNING.roundRosterScoreTop}px`);
  root.style.setProperty('--hud-bomb-icon-size', `${HUD_LAYOUT_TUNING.bombIconSize}px`);
  root.style.setProperty('--hud-bomb-icon-offset-x', `${HUD_LAYOUT_TUNING.bombIconOffsetX}px`);
  root.style.setProperty('--hud-bomb-icon-offset-y', `${HUD_LAYOUT_TUNING.bombIconOffsetY}px`);
  root.style.setProperty('--hud-bomb-pulse-min-scale', String(HUD_LAYOUT_TUNING.bombPulseMinScale));
  root.style.setProperty('--hud-bomb-pulse-max-scale', String(HUD_LAYOUT_TUNING.bombPulseMaxScale));
  root.style.setProperty('--hud-killfeed-top', `${HUD_LAYOUT_TUNING.killfeedTop}px`);
  root.style.setProperty('--hud-killfeed-right', `${HUD_LAYOUT_TUNING.killfeedRight}px`);
  root.style.setProperty('--hud-killfeed-width', `${HUD_LAYOUT_TUNING.killfeedWidth}px`);
  root.style.setProperty('--hud-killfeed-entry-min-width', `${HUD_LAYOUT_TUNING.killfeedEntryMinWidth}px`);
  root.style.setProperty('--hud-killfeed-padding-x', `${HUD_LAYOUT_TUNING.killfeedPaddingX}px`);
  root.style.setProperty('--hud-killfeed-padding-y', `${HUD_LAYOUT_TUNING.killfeedPaddingY}px`);
  root.style.setProperty('--hud-killfeed-body-item-gap', `${HUD_LAYOUT_TUNING.killfeedBodyItemGap}px`);
  root.style.setProperty('--hud-killfeed-headshot-item-gap', `${HUD_LAYOUT_TUNING.killfeedHeadshotItemGap}px`);
  root.style.setProperty('--hud-killfeed-name-size', `${HUD_LAYOUT_TUNING.killfeedNameSize}px`);
  root.style.setProperty('--hud-killfeed-name-offset-y', `${HUD_LAYOUT_TUNING.killfeedNameOffsetY}px`);
  root.style.setProperty('--hud-killfeed-weapon-gap', `${HUD_LAYOUT_TUNING.killfeedWeaponGap}px`);
  root.style.setProperty('--hud-killfeed-rifle-body-weapon-icon-size', `${HUD_LAYOUT_TUNING.killfeedRifleBodyWeaponIconSize}px`);
  root.style.setProperty('--hud-killfeed-rifle-body-weapon-offset-y', `${HUD_LAYOUT_TUNING.killfeedRifleBodyWeaponOffsetY}px`);
  root.style.setProperty('--hud-killfeed-rifle-headshot-weapon-slot-width', `${HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponSlotWidth}px`);
  root.style.setProperty('--hud-killfeed-rifle-headshot-weapon-icon-size', `${HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponIconSize}px`);
  root.style.setProperty('--hud-killfeed-rifle-headshot-weapon-offset-y', `${HUD_LAYOUT_TUNING.killfeedRifleHeadshotWeaponOffsetY}px`);
  root.style.setProperty('--hud-killfeed-pistol-body-weapon-icon-size', `${HUD_LAYOUT_TUNING.killfeedPistolBodyWeaponIconSize}px`);
  root.style.setProperty('--hud-killfeed-pistol-body-weapon-offset-y', `${HUD_LAYOUT_TUNING.killfeedPistolBodyWeaponOffsetY}px`);
  root.style.setProperty('--hud-killfeed-pistol-headshot-weapon-slot-width', `${HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponSlotWidth}px`);
  root.style.setProperty('--hud-killfeed-pistol-headshot-weapon-icon-size', `${HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponIconSize}px`);
  root.style.setProperty('--hud-killfeed-pistol-headshot-weapon-offset-y', `${HUD_LAYOUT_TUNING.killfeedPistolHeadshotWeaponOffsetY}px`);
  root.style.setProperty('--hud-killfeed-headshot-icon-size', `${HUD_LAYOUT_TUNING.killfeedHeadshotIconSize}px`);
  root.style.setProperty('--hud-killfeed-headshot-offset-y', `${HUD_LAYOUT_TUNING.killfeedHeadshotOffsetY}px`);
  root.style.setProperty('--hud-killfeed-border-width', `${HUD_LAYOUT_TUNING.killfeedBorderWidth}px`);
  root.style.setProperty('--hud-killfeed-border-radius', `${HUD_LAYOUT_TUNING.killfeedBorderRadius}px`);
}
