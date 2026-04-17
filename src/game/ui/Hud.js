import { createPauseMenu } from './createPauseMenu.js';
import { createHudDebugPanelsController } from './hudDebugPanels.js';
import { createTeamSelectOverlay } from './createTeamSelectOverlay.js';
import { createHudClassicController } from './hudClassic.js';
import { createHudObjectiveWidgetsController } from './hudObjectiveWidgets.js';
import { createHudScoreboardController } from './hudScoreboard.js';
import { getBombPulseIntervalSeconds } from '../../shared/bombObjective.js';

const ATTACKER_ROSTER_ICON = '/icons/k3FcN65.png';
const DEFENDER_ROSTER_ICON = '/icons/zcqziFR.png';
const C4_ROSTER_ICON = '/icons/c4.png';
const KILLFEED_WEAPON_ICONS = {
  pistol: '/icons/pistol.svg',
  rifle: '/icons/ak47.svg',
};
const KILLFEED_HEADSHOT_ICON = '/icons/headshot.png';

function formatClock(seconds, { ceil = false } = {}) {
  const safeSeconds = Math.max(0, Number(seconds ?? 0));
  const wholeSeconds = ceil ? Math.ceil(safeSeconds) : Math.floor(safeSeconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function restartBombFlash(iconEl, flashDurationSeconds) {
  if (!iconEl) {
    return;
  }

  iconEl.style.setProperty('--hud-bomb-flash-duration', `${flashDurationSeconds.toFixed(3)}s`);
  iconEl.classList.remove('hud__round-roster-timer-icon--bomb-flash');
  void iconEl.offsetWidth;
  iconEl.classList.add('hud__round-roster-timer-icon--bomb-flash');
}

export function createHud({
  container,
  input,
  roundManager,
  weaponManager,
  utilityManager,
  networkClient,
  playerController,
  getDamageVignette,
  getDamageIndicators,
  getHitDamagePopups,
  getFps,
  getMasterVolume,
  getMouseSensitivity,
  getHorizontalFov,
  onResume,
  onSelectTeam,
  onToggleHudMode,
  onSelectMap,
  onSelectGamemode,
  onSensitivityChange,
  onFovChange,
  onVolumeChange,
  maps = [],
  gamemodes = [],
  getSelectedMapId,
  getSelectedGamemodeId,
  getSelectedTeam,
  getSelectedPlayerName,
  getHudMode,
  getIsLoading,
  getLoadingStatus,
  getKillfeedEntries,
  getIgnoreLocalCorrections,
  getIsMovementTraceRecording,
  consumeMarkDebugSnapshotRequested,
  onSelectSkybox,
  skyboxes = [],
  getSelectedSkyboxId,
}) {
  const hud = document.createElement('div');
  hud.className = 'hud';
  hud.innerHTML = `
    <div class="hud__round-win">
      <div class="hud__round-win-banner">
        <span class="hud__round-win-chevron hud__round-win-chevron--left">»</span>
        <div class="hud__round-win-text">
          <div class="hud__round-win-title"></div>
          <div class="hud__round-win-subtitle"></div>
        </div>
        <span class="hud__round-win-chevron hud__round-win-chevron--right">«</span>
      </div>
      <div class="hud__round-win-mvp">
        <div class="hud__round-win-mvp-star">★</div>
        <div class="hud__round-win-mvp-copy"></div>
      </div>
      <div class="hud__round-win-footer"></div>
    </div>
    <div class="hud__match-restart"></div>
    <div class="hud__top">
      <div class="hud__round"></div>
      <div class="hud__fps"></div>
    </div>
    <div class="hud__round-roster" aria-hidden="true">
      <div class="hud__round-roster-team hud__round-roster-team--defenders"></div>
      <div class="hud__round-roster-center">
        <div class="hud__round-roster-timer"></div>
      </div>
      <div class="hud__round-roster-score">
        <span class="hud__round-roster-score-value hud__round-roster-score-value--defenders">0</span>
        <span class="hud__round-roster-score-separator">|</span>
        <span class="hud__round-roster-score-value hud__round-roster-score-value--attackers">0</span>
      </div>
      <div class="hud__round-roster-team hud__round-roster-team--attackers"></div>
    </div>
    <div class="hud__crosshair" aria-hidden="true"></div>
    <div class="hud__dead-overlay" aria-hidden="true"></div>
    <div class="hud__damage-vignette" aria-hidden="true"></div>
    <div class="hud__damage-indicators" aria-hidden="true">
      <div class="hud__damage-indicator hud__damage-indicator--front"></div>
      <div class="hud__damage-indicator hud__damage-indicator--right"></div>
      <div class="hud__damage-indicator hud__damage-indicator--back"></div>
      <div class="hud__damage-indicator hud__damage-indicator--left"></div>
    </div>
    <div class="hud__hit-damage" aria-hidden="true"></div>
    <div class="hud__respawn" aria-hidden="true"></div>
    <div class="hud__ads-reticle" aria-hidden="true"></div>
    <div class="hud__scope ${weaponManager?.showScopeOverlay ? 'hud__scope--active' : ''}" aria-hidden="true">
      <div class="hud__scope-lens">
        <div class="hud__scope-crosshair">
          <div class="hud__scope-line hud__scope-line--vertical"></div>
          <div class="hud__scope-line hud__scope-line--horizontal"></div>
        </div>
      </div>
    </div>
    <div class="hud__loading">
      <div class="hud__loading-card">
        <div class="hud__loading-title">Loading</div>
        <div class="hud__loading-status"></div>
      </div>
    </div>
    <div class="hud__scoreboard">
      <div class="hud__scoreboard-panel">
        <div class="hud__scoreboard-head">
          <div class="hud__scoreboard-title"></div>
          <div class="hud__scoreboard-subtitle"></div>
        </div>
        <div class="hud__scoreboard-teams">
          <section class="hud__scoreboard-team hud__scoreboard-team--attackers">
            <div class="hud__scoreboard-teambar">
              <div class="hud__scoreboard-teamname"></div>
              <div class="hud__scoreboard-teamscore"></div>
            </div>
            <div class="hud__scoreboard-columns">
              <span>Name</span>
              <span>K</span>
              <span>D</span>
              <span>Ping</span>
            </div>
            <div class="hud__scoreboard-rows"></div>
          </section>
          <section class="hud__scoreboard-team hud__scoreboard-team--defenders">
            <div class="hud__scoreboard-teambar">
              <div class="hud__scoreboard-teamname"></div>
              <div class="hud__scoreboard-teamscore"></div>
            </div>
            <div class="hud__scoreboard-columns">
              <span>Name</span>
              <span>K</span>
              <span>D</span>
              <span>Ping</span>
            </div>
            <div class="hud__scoreboard-rows"></div>
          </section>
        </div>
      </div>
    </div>
    <div class="hud__killfeed" aria-hidden="true"></div>
    <div class="hud__plant-progress">
      <div class="hud__plant-progress-label"></div>
      <div class="hud__plant-progress-track">
        <div class="hud__plant-progress-fill"></div>
      </div>
    </div>
    <div class="hud__classic">
      <div class="hud__classic-left">
        <div class="hud__classic-stat">
          <span class="hud__classic-icon">+</span>
          <span class="hud__classic-value hud__classic-health"></span>
        </div>
        <div class="hud__classic-stat">
          <span class="hud__classic-icon">O</span>
          <span class="hud__classic-value hud__classic-armor"></span>
        </div>
      </div>
      <div class="hud__classic-center">
        <div class="hud__classic-time"></div>
        <div class="hud__classic-phase"></div>
      </div>
      <div class="hud__classic-right">
        <div class="hud__classic-ammo">
          <span class="hud__classic-ammo-mag"></span>
          <span class="hud__classic-ammo-sep">|</span>
          <span class="hud__classic-ammo-reserve"></span>
        </div>
        <div class="hud__classic-weapon"></div>
      </div>
    </div>
    <div class="hud__bottom">
      <div class="hud__health"></div>
      <div class="hud__weapon"></div>
      <div class="hud__utility"></div>
      <div class="hud__network"></div>
      <div class="hud__movement"></div>
      <div class="hud__position"></div>
      <div class="hud__pointer"></div>
    </div>
    <button class="hud__netdebug-copy" type="button" hidden>Copy</button>
    <pre class="hud__netdebug" hidden></pre>
  `;

  container.appendChild(hud);

  const pauseMenu = createPauseMenu({
    parent: hud,
    onResume,
    onSelectMap,
    maps,
    onSelectGamemode,
    gamemodes,
    onSelectSkybox,
    skyboxes,
    onSensitivityChange,
    onFovChange,
    onVolumeChange,
    getMasterVolume,
    getMouseSensitivity,
    getHorizontalFov,
    isGamemodeEnabled: (gamemodeId, mapId) => (
      gamemodeId !== 'competitive' || mapId === 'dust2-map-test'
    ),
  });
  const teamSelectOverlay = createTeamSelectOverlay({
    parent: hud,
    onSelectTeam,
  });

  const roundEl = hud.querySelector('.hud__round');
  const fpsEl = hud.querySelector('.hud__fps');
  const roundRosterDefendersEl = hud.querySelector('.hud__round-roster-team--defenders');
  const roundRosterAttackersEl = hud.querySelector('.hud__round-roster-team--attackers');
  const roundRosterTimerEl = hud.querySelector('.hud__round-roster-timer');
  const roundRosterDefendersScoreEl = hud.querySelector('.hud__round-roster-score-value--defenders');
  const roundRosterAttackersScoreEl = hud.querySelector('.hud__round-roster-score-value--attackers');
  const roundWinEl = hud.querySelector('.hud__round-win');
  const roundWinTitleEl = hud.querySelector('.hud__round-win-title');
  const roundWinSubtitleEl = hud.querySelector('.hud__round-win-subtitle');
  const roundWinMvpCopyEl = hud.querySelector('.hud__round-win-mvp-copy');
  const roundWinFooterEl = hud.querySelector('.hud__round-win-footer');
  const matchRestartEl = hud.querySelector('.hud__match-restart');
  const weaponEl = hud.querySelector('.hud__weapon');
  const healthEl = hud.querySelector('.hud__health');
  const utilityEl = hud.querySelector('.hud__utility');
  const networkEl = hud.querySelector('.hud__network');
  const movementEl = hud.querySelector('.hud__movement');
  const positionEl = hud.querySelector('.hud__position');
  const pointerEl = hud.querySelector('.hud__pointer');
  const crosshairEl = hud.querySelector('.hud__crosshair');
  const deadOverlayEl = hud.querySelector('.hud__dead-overlay');
  const damageVignetteEl = hud.querySelector('.hud__damage-vignette');
  const damageIndicatorsEl = hud.querySelector('.hud__damage-indicators');
  const damageIndicatorFrontEl = hud.querySelector('.hud__damage-indicator--front');
  const damageIndicatorRightEl = hud.querySelector('.hud__damage-indicator--right');
  const damageIndicatorBackEl = hud.querySelector('.hud__damage-indicator--back');
  const damageIndicatorLeftEl = hud.querySelector('.hud__damage-indicator--left');
  const hitDamageEl = hud.querySelector('.hud__hit-damage');
  const respawnEl = hud.querySelector('.hud__respawn');
  const adsReticleEl = hud.querySelector('.hud__ads-reticle');
  const scopeEl = hud.querySelector('.hud__scope');
  const loadingEl = hud.querySelector('.hud__loading');
  const loadingStatusEl = hud.querySelector('.hud__loading-status');
  const topClusterEl = hud.querySelector('.hud__top');
  const bottomClusterEl = hud.querySelector('.hud__bottom');
  const scoreboardEl = hud.querySelector('.hud__scoreboard');
  const killfeedEl = hud.querySelector('.hud__killfeed');
  const plantProgressEl = hud.querySelector('.hud__plant-progress');
  const plantProgressLabelEl = hud.querySelector('.hud__plant-progress-label');
  const plantProgressFillEl = hud.querySelector('.hud__plant-progress-fill');
  const classicEl = hud.querySelector('.hud__classic');
  const classicHealthEl = hud.querySelector('.hud__classic-health');
  const classicArmorEl = hud.querySelector('.hud__classic-armor');
  const classicTimeEl = hud.querySelector('.hud__classic-time');
  const classicPhaseEl = hud.querySelector('.hud__classic-phase');
  const classicAmmoMagEl = hud.querySelector('.hud__classic-ammo-mag');
  const classicAmmoReserveEl = hud.querySelector('.hud__classic-ammo-reserve');
  const classicWeaponEl = hud.querySelector('.hud__classic-weapon');
  const scoreboardSubtitleEl = hud.querySelector('.hud__scoreboard-subtitle');
  const scoreboardTeamEls = [...hud.querySelectorAll('.hud__scoreboard-team')];
  const netDebugCopyEl = hud.querySelector('.hud__netdebug-copy');
  const netDebugEl = hud.querySelector('.hud__netdebug');

  let paused = false;
  let pauseMode = null;
  let showNetDebug = false;
  let showScoreboard = false;
  let displaySpeed = 0;
  let lastLoadingText = '';
  let lastCrosshairHidden = null;
  let lastAdsReticle = null;
  let lastScopeOverlay = null;
  let lastLoading = null;
  let lastDamageVignette = -1;
  let lastDamageIndicatorFront = -1;
  let lastDamageIndicatorRight = -1;
  let lastDamageIndicatorBack = -1;
  let lastDamageIndicatorLeft = -1;
  let lastDeadOverlay = null;
  let lastHitDamageHtml = '';
  let lastRespawnText = '';
  let lastRoundWinVisible = null;
  let lastRoundWinTitle = '';
  let lastRoundWinSubtitle = '';
  let lastRoundWinMvp = '';
  let lastRoundWinFooter = '';
  let lastMatchRestartVisible = null;
  let lastMatchRestartText = '';
  let lastRoundRosterDefendersHtml = '';
  let lastRoundRosterAttackersHtml = '';
  let lastRoundRosterTimerHtml = '';
  let lastRoundRosterDefendersScore = '';
  let lastRoundRosterAttackersScore = '';
  let lastKillfeedHtml = '';
  let lastHudUpdateAt = typeof performance !== 'undefined' ? performance.now() : Date.now();
  let bombPulseCountdown = null;
  let lastBombPlanted = false;

  function renderRoundRosterTeam(teamState, iconPath) {
    const players = [...(teamState?.players ?? [])]
      .sort((left, right) => String(left.displayName ?? left.playerId).localeCompare(String(right.displayName ?? right.playerId)));
    return players.map((player) => {
      const deadClass = player?.isAlive === false ? ' hud__round-roster-slot--dead' : '';
      const title = String(player?.displayName ?? player?.playerId ?? '');
      return `<div class="hud__round-roster-slot${deadClass}" title="${title}"><img class="hud__round-roster-icon" src="${iconPath}" alt="" /></div>`;
    }).join('');
  }

  function formatWinReason(reason) {
    const normalizedReason = String(reason ?? '').trim();
    if (normalizedReason === 'bomb-defused') {
      return 'BOMB DEFUSED';
    }
    if (normalizedReason === 'bomb-exploded') {
      return 'BOMB EXPLODED';
    }
    if (normalizedReason === 'time-expired') {
      return 'TIME EXPIRED';
    }
    if (!normalizedReason) {
      return '';
    }
    return normalizedReason.replace(/-/g, ' ').toUpperCase();
  }

  function getRoundWinTitle(winnerTeam) {
    if (winnerTeam === 'attackers') {
      return 'ATTACKERS WIN';
    }
    if (winnerTeam === 'defenders') {
      return 'DEFENDERS WIN';
    }
    return 'ROUND WON';
  }

  function getRoundWinFooter() {
    // Reserved for future round-fact / stat lines.
    return '';
  }

  function getRoundWinMvpText(roundManager, scoreboardState) {
    const winnerTeam = String(roundManager?.winnerTeam ?? '');
    if (!winnerTeam) {
      return '';
    }

    const winningTeam = scoreboardState?.teams?.find?.((team) => team.key === winnerTeam) ?? null;
    const players = winningTeam?.players ?? [];
    if (players.length === 0) {
      return '';
    }

    const mvp = [...players].sort((left, right) => {
      const killDelta = Number(right.kills ?? 0) - Number(left.kills ?? 0);
      if (killDelta !== 0) {
        return killDelta;
      }
      const deathDelta = Number(left.deaths ?? 0) - Number(right.deaths ?? 0);
      if (deathDelta !== 0) {
        return deathDelta;
      }
      return String(left.displayName ?? left.playerId).localeCompare(String(right.displayName ?? right.playerId));
    })[0];
    if (!mvp) {
      return '';
    }

    return `MVP: ${String(mvp.displayName ?? mvp.playerId)} for most kills`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function getKillfeedNameClass(teamKey) {
    if (teamKey === 'attackers') {
      return 'hud__killfeed-name--attackers';
    }
    if (teamKey === 'defenders') {
      return 'hud__killfeed-name--defenders';
    }
    return '';
  }

  function isKillfeedDebugPreviewEnabled() {
    return document?.documentElement?.dataset?.hudDebugElement === 'killfeed';
  }

  function isRoundWinDebugPreviewEnabled() {
    return document?.documentElement?.dataset?.hudDebugElement === 'roundWin';
  }

  function isTransitionBannerDebugPreviewEnabled() {
    return document?.documentElement?.dataset?.hudDebugElement === 'matchRestart';
  }

  function getTransitionBannerDebugPreviewMode() {
    return document?.documentElement?.dataset?.hudDebugTransitionBannerMode === 'match-end'
      ? 'match-end'
      : 'transition';
  }

  function getKillfeedDebugPreviewEntry() {
    const rootDataset = document?.documentElement?.dataset ?? {};
    return {
      attackerName: 'storste mand',
      attackerTeam: 'attackers',
      victimName: 'storste mand',
      victimTeam: 'defenders',
      weaponKey: rootDataset.hudDebugKillfeedWeapon === 'pistol' ? 'pistol' : 'rifle',
      headshot: rootDataset.hudDebugKillfeedHeadshot !== 'false',
    };
  }

  function buildKillfeedMarkup(entries = []) {
    const nextEntries = entries.length ? entries : (isKillfeedDebugPreviewEnabled() ? [getKillfeedDebugPreviewEntry()] : []);
    if (!nextEntries.length) {
      return '';
    }

    return nextEntries.map((entry) => {
      const attackerClass = getKillfeedNameClass(entry.attackerTeam);
      const victimClass = getKillfeedNameClass(entry.victimTeam);
      const weaponIcon = KILLFEED_WEAPON_ICONS[entry.weaponKey] ?? KILLFEED_WEAPON_ICONS.rifle;
      const weaponLayoutClass = entry.headshot ? 'hud__killfeed-weapon--headshot' : 'hud__killfeed-weapon--single';
      const weaponTypeClass = entry.weaponKey === 'rifle'
        ? 'hud__killfeed-weapon--rifle'
        : 'hud__killfeed-weapon--pistol';
      const weaponIconClass = entry.weaponKey === 'rifle'
        ? 'hud__killfeed-weapon-icon--rifle'
        : 'hud__killfeed-weapon-icon--pistol';
      const headshotIcon = entry.headshot
        ? `<img class="hud__killfeed-headshot-icon" src="${KILLFEED_HEADSHOT_ICON}" alt="" />`
        : '';
      return `<div class="hud__killfeed-entry">
        <span class="hud__killfeed-name ${attackerClass}">${escapeHtml(entry.attackerName)}</span>
        <span class="hud__killfeed-weapon ${weaponLayoutClass} ${weaponTypeClass}">
          <img class="hud__killfeed-weapon-icon ${weaponIconClass}" src="${weaponIcon}" alt="" />
          ${headshotIcon}
        </span>
        <span class="hud__killfeed-name ${victimClass}">${escapeHtml(entry.victimName)}</span>
      </div>`;
    }).join('');
  }

  function handleKeyDown(event) {
    if (event.code === 'F8') {
      showNetDebug = !showNetDebug;
      netDebugEl.hidden = !showNetDebug;
      netDebugCopyEl.hidden = !showNetDebug;
      debugPanelsController.logCurrentSummary();
      event.preventDefault();
      return;
    }

    if (event.code === 'F2') {
      onToggleHudMode?.();
      event.preventDefault();
      return;
    }

    if (event.code === 'Tab') {
      showScoreboard = true;
      event.preventDefault();
    }
  }

  function handleKeyUp(event) {
    if (event.code !== 'Tab') {
      return;
    }

    showScoreboard = false;
    event.preventDefault();
  }

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  const scoreboardController = createHudScoreboardController({
    scoreboardEl,
    scoreboardSubtitleEl,
    scoreboardTeamEls,
  });
  const debugPanelsController = createHudDebugPanelsController({
    roundEl,
    fpsEl,
    weaponEl,
    healthEl,
    utilityEl,
    networkEl,
    movementEl,
    positionEl,
    pointerEl,
    netDebugEl,
    netDebugCopyEl,
  });
  const classicController = createHudClassicController({
    classicEl,
    topClusterEl,
    bottomClusterEl,
    classicHealthEl,
    classicArmorEl,
    classicTimeEl,
    classicPhaseEl,
    classicAmmoMagEl,
    classicAmmoReserveEl,
    classicWeaponEl,
  });
  const objectiveWidgetsController = createHudObjectiveWidgetsController({
    plantProgressEl,
    plantProgressLabelEl,
    plantProgressFillEl,
  });

  return {
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      debugPanelsController.destroy();
      pauseMenu.destroy();
      teamSelectOverlay.destroy();
      hud.remove();
    },
    setPauseState({ paused: nextPaused, mode = null }) {
      paused = nextPaused;
      pauseMode = mode;
      pauseMenu.setVisible(paused && pauseMode === 'menu');
      teamSelectOverlay.setActive(paused && pauseMode === 'team-select');
      teamSelectOverlay.setPlayerName(getSelectedPlayerName?.() ?? '');
    },
    update() {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const deltaSeconds = Math.min(0.25, Math.max(0, (now - lastHudUpdateAt) / 1000));
      lastHudUpdateAt = now;
      const markDebugSnapshotRequested = Boolean(consumeMarkDebugSnapshotRequested?.());
      const movement = playerController?.getDebugState?.() ?? {
        grounded: true,
        crouched: false,
        speed: 0,
        traceRecording: false,
        correctionOffsetMagnitude: 0,
        simulationDeltaMagnitude: 0,
        movementMode: 'grounded',
        positionText: '0.00, 0.00, 0.00',
      };
      movement.traceRecording = Boolean(getIsMovementTraceRecording?.());
      const networkDebug = networkClient?.getDebugState?.() ?? {
        connectionState: 'offline',
        localMapId: null,
        receivedPlayerStateCount: 0,
        sameMapRemoteStateCount: 0,
        filteredRemoteStateCount: 0,
        receivedRemoteMaps: [],
        latestSequence: 0,
        acknowledgedSequence: 0,
        pendingInputCount: 0,
        sequenceGap: 0,
        snapshotAgeMs: -1,
        lastPredictedDriftDistance: 0,
        authoritativeUpdatesPerSecond: 0,
        pendingJumpSend: false,
      };
      displaySpeed += (movement.speed - displaySpeed) * 0.18;
      const utilityHudState = utilityManager?.getHudState?.() ?? null;
      const objectiveState = networkClient?.getObjectiveState?.() ?? null;
      const roundText = roundManager
        ? roundManager.phase === 'intermission'
          ? `Round ${roundManager.roundNumber} - ${roundManager.intermissionReason ?? 'intermission'} - ${Math.ceil(roundManager.roundEndCountdown)}s`
          : roundManager.roundEnded && roundManager.winnerTeam
            ? `Round ${roundManager.roundNumber} - ${roundManager.winnerTeam} win (${roundManager.winReason}) - reset ${Math.ceil(roundManager.roundEndCountdown)}s`
            : `Round ${roundManager.roundNumber} - ${roundManager.phase}`
        : 'Round --';
      const fpsText = `FPS: ${getFps?.() ?? '--'}`;
      const localPlayerState = networkClient?.getLocalPlayerState?.() ?? null;
      const scoreboardState = networkClient?.getScoreboardState?.() ?? {
        playerCount: 0,
        teams: [],
      };
      const defendersTeam = scoreboardState.teams?.find?.((team) => team.key === 'defenders') ?? null;
      const attackersTeam = scoreboardState.teams?.find?.((team) => team.key === 'attackers') ?? null;
      const healthText = `Health: ${localPlayerState?.health ?? '--'}/${localPlayerState?.maxHealth ?? '--'}${localPlayerState?.isAlive === false ? ' - DOWN' : ''}`;
      const weaponHudState = weaponManager?.getHudState?.() ?? null;
      const ammoLabel = weaponHudState && weaponHudState.magazineSize > 0
        ? ` - ${weaponHudState.ammoInMagazine}/${weaponHudState.reserveAmmo}${weaponHudState.isReloading ? ' RELOAD' : ''}`
        : '';
      const weaponText = `Weapon: ${weaponManager?.activeWeapon ?? '--'}${ammoLabel}`;
      const utilityStatusSuffix = utilityHudState?.statusText ? ` - ${utilityHudState.statusText}` : '';
      const utilityText = `Utility: ${utilityManager?.activeUtility ?? '--'}${utilityStatusSuffix}`;
      const remotePlayerCount = networkClient?.getRemotePlayerCount?.() ?? 0;
      const networkText = `Network: ${networkClient?.connectionState ?? 'offline'} - Remote players: ${remotePlayerCount} - Corr: ${getIgnoreLocalCorrections?.() ? 'OFF(F9)' : 'ON(F9)'}`;
      const supportText = ` - support ${Number(movement.supportRatio ?? 0).toFixed(2)} - gd ${Number(movement.groundDistance ?? 0).toFixed(2)}`;
      const movementText = `State: ${movement.grounded ? 'Grounded' : 'Air'} - ${movement.crouched ? 'Crouched' : 'Standing'} - raw ${movement.speed.toFixed(1)} m/s - disp ${displaySpeed.toFixed(1)} m/s${supportText}${movement.traceRecording ? ' - TRACE(F10)' : ''}`;
      const supportHeightText = Number.isFinite(movement.supportHeight) ? Number(movement.supportHeight).toFixed(2) : '--';
      const positionText = `Pos: ${movement.positionText ?? '0.00, 0.00, 0.00'} - ${movement.movementMode ?? 'grounded'} - floor ${supportHeightText}`;
      const pointerText = paused
        ? pauseMode === 'team-select'
          ? 'Choose a team'
          : 'Paused'
        : utilityHudState?.interactionText
          ? utilityHudState.interactionText
        : input.pointerLocked
          ? 'Pointer locked'
          : 'Click to capture mouse';
      const forcedScoreboard = Boolean(roundManager?.matchEnded || roundManager?.phase === 'intermission');
      const scoreboardVisible = (showScoreboard || forcedScoreboard) && !paused;
      const killfeedEntries = getKillfeedEntries?.() ?? [];
      const hudMode = getHudMode?.() ?? 'debug';
      const classicVisible = hudMode === 'classic' && !paused;
      const roundWinDebugPreview = isRoundWinDebugPreviewEnabled();
      const transitionBannerDebugPreview = isTransitionBannerDebugPreviewEnabled();
      const transitionBannerDebugPreviewMode = getTransitionBannerDebugPreviewMode();
      const roundWinVisible = Boolean(!paused && ((roundManager?.roundEnded && roundManager?.winnerTeam) || roundWinDebugPreview));
      const phaseDuration = roundManager
        ? (
          roundManager.phase === 'freeze'
            ? roundManager.freezeDuration
            : roundManager.phase === 'live'
              ? roundManager.liveDuration
              : 0
        )
        : 0;
      const timeLeft = roundManager?.roundEnded
        ? Math.max(0, Number(roundManager.roundEndCountdown ?? 0))
        : objectiveState?.bombState === 'planted'
          ? Math.max(0, Number(objectiveState?.bombTimeRemaining ?? 0))
          : Math.max(0, phaseDuration - Number(roundManager?.phaseTime ?? 0));
      const bombPlanted = objectiveState?.bombState === 'planted';
      const roundRosterTimerHtml = bombPlanted
        ? `<span class="hud__round-roster-bomb-shell"><img class="hud__round-roster-timer-icon hud__round-roster-timer-icon--bomb" src="${C4_ROSTER_ICON}" alt="" /></span>`
        : formatClock(timeLeft, { ceil: Boolean(roundManager?.roundEnded) });
      let triggerBombFlash = false;
      let bombFlashDuration = 0.16;
      if (bombPlanted) {
        if (!lastBombPlanted || bombPulseCountdown == null) {
          bombPulseCountdown = getBombPulseIntervalSeconds(timeLeft);
        } else {
          bombPulseCountdown -= deltaSeconds;
          while (bombPulseCountdown <= 0 && timeLeft > 0) {
            triggerBombFlash = true;
            const pulseInterval = getBombPulseIntervalSeconds(timeLeft);
            bombFlashDuration = Math.min(0.18, Math.max(0.08, pulseInterval * 0.42));
            bombPulseCountdown += pulseInterval;
          }
        }
      } else {
        bombPulseCountdown = null;
      }
      lastBombPlanted = bombPlanted;
      const roundWinTitle = roundWinDebugPreview
        ? 'ATTACKERS WIN'
        : (roundWinVisible ? getRoundWinTitle(roundManager?.winnerTeam) : '');
      const roundWinSubtitle = roundWinDebugPreview
        ? 'BOMB EXPLODED'
        : (roundWinVisible ? formatWinReason(roundManager?.winReason) : '');
      const roundWinMvp = roundWinDebugPreview
        ? 'MVP: storste mand for most kills'
        : (roundWinVisible ? getRoundWinMvpText(roundManager, scoreboardState) : '');
      const roundWinFooter = roundWinDebugPreview
        ? 'Round win preview'
        : (roundWinVisible ? getRoundWinFooter() : '');
      const intermissionVisible = Boolean(!paused && (roundManager?.matchEnded || roundManager?.phase === 'intermission' || transitionBannerDebugPreview));
      const intermissionText = transitionBannerDebugPreview
        ? (
          transitionBannerDebugPreviewMode === 'match-end'
            ? 'Restarting match in 15 seconds'
            : 'Swapping sides... 10 seconds'
        )
        : roundManager?.matchEnded
        ? `Restarting match in ${Math.ceil(Math.max(0, Number(roundManager?.roundEndCountdown ?? 0)))} seconds`
        : roundManager?.intermissionReason === 'side-swap'
          ? `Swapping sides... ${Math.ceil(Math.max(0, Number(roundManager?.roundEndCountdown ?? 0)))} seconds`
          : roundManager?.intermissionReason === 'overtime'
            ? `Overtime commencing... ${Math.ceil(Math.max(0, Number(roundManager?.roundEndCountdown ?? 0)))} seconds`
            : '';
      scoreboardController.update({
        visible: scoreboardVisible,
        subtitle: `Players: ${scoreboardState.playerCount}`,
        scoreboardState,
        roundManager,
        localPlayerId: networkClient?.playerId ?? null,
      });
      const killfeedHtml = buildKillfeedMarkup(killfeedEntries);
      if (killfeedHtml !== lastKillfeedHtml) {
        killfeedEl.innerHTML = killfeedHtml;
        lastKillfeedHtml = killfeedHtml;
      }
      objectiveWidgetsController.update({
        paused,
        utilityHudState,
      });
      if (roundWinVisible !== lastRoundWinVisible) {
        roundWinEl.classList.toggle('hud__round-win--active', roundWinVisible);
        lastRoundWinVisible = roundWinVisible;
      }
      roundWinEl.classList.toggle('hud__round-win--defenders', roundManager?.winnerTeam === 'defenders');
      if (roundWinTitle !== lastRoundWinTitle) {
        roundWinTitleEl.textContent = roundWinTitle;
        lastRoundWinTitle = roundWinTitle;
      }
      if (roundWinSubtitle !== lastRoundWinSubtitle) {
        roundWinSubtitleEl.textContent = roundWinSubtitle;
        lastRoundWinSubtitle = roundWinSubtitle;
      }
      if (roundWinMvp !== lastRoundWinMvp) {
        roundWinMvpCopyEl.textContent = roundWinMvp;
        lastRoundWinMvp = roundWinMvp;
      }
      if (roundWinFooter !== lastRoundWinFooter) {
        roundWinFooterEl.textContent = roundWinFooter;
        roundWinFooterEl.classList.toggle('hud__round-win-footer--active', Boolean(roundWinFooter));
        lastRoundWinFooter = roundWinFooter;
      }
      if (intermissionVisible !== lastMatchRestartVisible) {
        matchRestartEl.classList.toggle('hud__match-restart--active', intermissionVisible);
        lastMatchRestartVisible = intermissionVisible;
      }
      matchRestartEl.classList.toggle(
        'hud__match-restart--match-end',
        Boolean(roundManager?.matchEnded || (transitionBannerDebugPreview && transitionBannerDebugPreviewMode === 'match-end')),
      );
      matchRestartEl.classList.toggle(
        'hud__match-restart--transition',
        Boolean(
          (transitionBannerDebugPreview && transitionBannerDebugPreviewMode !== 'match-end')
          || (!roundManager?.matchEnded && roundManager?.phase === 'intermission'),
        ),
      );
      if (intermissionText !== lastMatchRestartText) {
        matchRestartEl.textContent = intermissionText;
        lastMatchRestartText = intermissionText;
      }
      debugPanelsController.updateDebugText({
        roundText,
        fpsText,
        healthText,
        weaponText,
        utilityText,
        networkText,
        movementText,
        positionText,
        pointerText,
      });
      const defendersRosterHtml = renderRoundRosterTeam(defendersTeam, DEFENDER_ROSTER_ICON);
      const attackersRosterHtml = renderRoundRosterTeam(attackersTeam, ATTACKER_ROSTER_ICON);
      if (defendersRosterHtml !== lastRoundRosterDefendersHtml) {
        roundRosterDefendersEl.innerHTML = defendersRosterHtml;
        lastRoundRosterDefendersHtml = defendersRosterHtml;
      }
      if (attackersRosterHtml !== lastRoundRosterAttackersHtml) {
        roundRosterAttackersEl.innerHTML = attackersRosterHtml;
        lastRoundRosterAttackersHtml = attackersRosterHtml;
      }
      if (roundRosterTimerHtml !== lastRoundRosterTimerHtml) {
        roundRosterTimerEl.innerHTML = roundRosterTimerHtml;
        lastRoundRosterTimerHtml = roundRosterTimerHtml;
      }
      const bombTimerFlashEl = roundRosterTimerEl.querySelector('.hud__round-roster-bomb-shell');
      if (bombTimerFlashEl && triggerBombFlash) {
        restartBombFlash(bombTimerFlashEl, bombFlashDuration);
      }
      const defendersScoreText = String(defendersTeam?.roundsWon ?? 0);
      const attackersScoreText = String(attackersTeam?.roundsWon ?? 0);
      if (defendersScoreText !== lastRoundRosterDefendersScore) {
        roundRosterDefendersScoreEl.textContent = defendersScoreText;
        lastRoundRosterDefendersScore = defendersScoreText;
      }
      if (attackersScoreText !== lastRoundRosterAttackersScore) {
        roundRosterAttackersScoreEl.textContent = attackersScoreText;
        lastRoundRosterAttackersScore = attackersScoreText;
      }
      classicController.update({
        visible: classicVisible,
        roundManager,
        objectiveState,
        localPlayerState,
        weaponHudState,
      });

      const damageVignette = Math.max(0, Math.min(1, Number(getDamageVignette?.() ?? 0)));
      if (Math.abs(damageVignette - lastDamageVignette) > 0.01) {
        damageVignetteEl.style.opacity = String(damageVignette * 0.75);
        lastDamageVignette = damageVignette;
      }
      const damageIndicators = getDamageIndicators?.() ?? {};
      const frontIndicator = Math.max(0, Math.min(1, Number(damageIndicators.front ?? 0)));
      const rightIndicator = Math.max(0, Math.min(1, Number(damageIndicators.right ?? 0)));
      const backIndicator = Math.max(0, Math.min(1, Number(damageIndicators.back ?? 0)));
      const leftIndicator = Math.max(0, Math.min(1, Number(damageIndicators.left ?? 0)));
      const indicatorsActive = frontIndicator > 0.01 || rightIndicator > 0.01 || backIndicator > 0.01 || leftIndicator > 0.01;
      damageIndicatorsEl.classList.toggle('hud__damage-indicators--active', indicatorsActive);
      if (Math.abs(frontIndicator - lastDamageIndicatorFront) > 0.01) {
        damageIndicatorFrontEl.style.opacity = String(frontIndicator * 0.95);
        lastDamageIndicatorFront = frontIndicator;
      }
      if (Math.abs(rightIndicator - lastDamageIndicatorRight) > 0.01) {
        damageIndicatorRightEl.style.opacity = String(rightIndicator * 0.95);
        lastDamageIndicatorRight = rightIndicator;
      }
      if (Math.abs(backIndicator - lastDamageIndicatorBack) > 0.01) {
        damageIndicatorBackEl.style.opacity = String(backIndicator * 0.95);
        lastDamageIndicatorBack = backIndicator;
      }
      if (Math.abs(leftIndicator - lastDamageIndicatorLeft) > 0.01) {
        damageIndicatorLeftEl.style.opacity = String(leftIndicator * 0.95);
        lastDamageIndicatorLeft = leftIndicator;
      }

      const deadOverlayActive = Boolean(localPlayerState?.isAlive === false);
      if (deadOverlayActive !== lastDeadOverlay) {
        deadOverlayEl.classList.toggle('hud__dead-overlay--active', deadOverlayActive);
        lastDeadOverlay = deadOverlayActive;
      }

      const hitDamagePopups = getHitDamagePopups?.() ?? [];
      const hitDamageHtml = hitDamagePopups.map((popup, index) => {
        const normalizedLife = Math.max(0, Math.min(1, popup.life / 0.7));
        const y = index * 28 + (1 - normalizedLife) * -18;
        return `<div class="hud__hit-damage-popup" style="opacity:${normalizedLife.toFixed(3)}; transform:translate(-50%, ${y.toFixed(1)}px);">${popup.text}</div>`;
      }).join('');
      if (hitDamageHtml !== lastHitDamageHtml) {
        hitDamageEl.innerHTML = hitDamageHtml;
        lastHitDamageHtml = hitDamageHtml;
      }

      const respawnSeconds = localPlayerState?.isAlive === false && localPlayerState?.respawnAt > 0
        ? Math.max(0, (localPlayerState.respawnAt - Date.now()) / 1000)
        : 0;
      const respawnText = respawnSeconds > 0
        ? `Respawning in: ${respawnSeconds.toFixed(1)}`
        : '';
      if (respawnText !== lastRespawnText) {
        respawnEl.textContent = respawnText;
        respawnEl.classList.toggle('hud__respawn--active', Boolean(respawnText));
        lastRespawnText = respawnText;
      }

      const crosshairHidden = Boolean(weaponManager?.isScoped || paused);
      if (crosshairHidden !== lastCrosshairHidden) {
        crosshairEl.classList.toggle('hud__crosshair--hidden', crosshairHidden);
        lastCrosshairHidden = crosshairHidden;
      }

      const adsReticleActive = Boolean(weaponManager?.showAdsReticle && !paused);
      if (adsReticleActive !== lastAdsReticle) {
        adsReticleEl.classList.toggle('hud__ads-reticle--active', adsReticleActive);
        lastAdsReticle = adsReticleActive;
      }

      const scopeActive = Boolean(weaponManager?.showScopeOverlay);
      if (scopeActive !== lastScopeOverlay) {
        scopeEl.classList.toggle('hud__scope--active', scopeActive);
        lastScopeOverlay = scopeActive;
      }

      const isLoading = Boolean(getIsLoading?.());
      if (isLoading !== lastLoading) {
        loadingEl.classList.toggle('hud__loading--active', isLoading);
        lastLoading = isLoading;
      }

      const loadingText = getLoadingStatus?.() ?? '';
      if (loadingText !== lastLoadingText) {
        loadingStatusEl.textContent = loadingText;
        lastLoadingText = loadingText;
      }

      debugPanelsController.updateNetDebug({
        visible: showNetDebug,
        networkDebug,
        movement,
        markDebugSnapshotRequested,
        fps: getFps?.() ?? 0,
        ignoreLocalCorrections: Boolean(getIgnoreLocalCorrections?.()),
      });

      pauseMenu.updateSelections({
        selectedMapId: getSelectedMapId?.(),
        selectedGamemodeId: getSelectedGamemodeId?.(),
        selectedSkyboxId: getSelectedSkyboxId?.(),
      });
      teamSelectOverlay.updateSelection(getSelectedTeam?.() ?? null);
    },
  };
}
