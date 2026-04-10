import { createPauseMenu } from './createPauseMenu.js';
import { createHudDebugPanelsController } from './hudDebugPanels.js';
import { createTeamSelectOverlay } from './createTeamSelectOverlay.js';
import { createHudClassicController } from './hudClassic.js';
import { createHudObjectiveWidgetsController } from './hudObjectiveWidgets.js';
import { createHudScoreboardController } from './hudScoreboard.js';

export function createHud({
  container,
  input,
  roundManager,
  weaponManager,
  utilityManager,
  networkClient,
  playerController,
  getDamageVignette,
  getHitDamagePopups,
  getFps,
  getMasterVolume,
  getMouseSensitivity,
  getHorizontalFov,
  onResume,
  onSelectTeam,
  onToggleHudMode,
  onSelectMap,
  onSensitivityChange,
  onFovChange,
  onVolumeChange,
  maps = [],
  getSelectedMapId,
  getSelectedTeam,
  getSelectedPlayerName,
  getHudMode,
  getIsLoading,
  getLoadingStatus,
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
    <div class="hud__top">
      <div class="hud__round"></div>
      <div class="hud__fps"></div>
    </div>
    <div class="hud__crosshair" aria-hidden="true"></div>
    <div class="hud__dead-overlay" aria-hidden="true"></div>
    <div class="hud__damage-vignette" aria-hidden="true"></div>
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
    onSelectSkybox,
    skyboxes,
    onSensitivityChange,
    onFovChange,
    onVolumeChange,
    getMasterVolume,
    getMouseSensitivity,
    getHorizontalFov,
  });
  const teamSelectOverlay = createTeamSelectOverlay({
    parent: hud,
    onSelectTeam,
  });

  const roundEl = hud.querySelector('.hud__round');
  const fpsEl = hud.querySelector('.hud__fps');
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
  const hitDamageEl = hud.querySelector('.hud__hit-damage');
  const respawnEl = hud.querySelector('.hud__respawn');
  const adsReticleEl = hud.querySelector('.hud__ads-reticle');
  const scopeEl = hud.querySelector('.hud__scope');
  const loadingEl = hud.querySelector('.hud__loading');
  const loadingStatusEl = hud.querySelector('.hud__loading-status');
  const topClusterEl = hud.querySelector('.hud__top');
  const bottomClusterEl = hud.querySelector('.hud__bottom');
  const scoreboardEl = hud.querySelector('.hud__scoreboard');
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
  let lastDeadOverlay = null;
  let lastHitDamageHtml = '';
  let lastRespawnText = '';

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
        ? roundManager.roundEnded && roundManager.winnerTeam
          ? `Round ${roundManager.roundNumber} - ${roundManager.winnerTeam} win (${roundManager.winReason}) - reset ${Math.ceil(roundManager.roundEndCountdown)}s`
          : `Round ${roundManager.roundNumber} - ${roundManager.phase}`
        : 'Round --';
      const fpsText = `FPS: ${getFps?.() ?? '--'}`;
      const localPlayerState = networkClient?.getLocalPlayerState?.() ?? null;
      const scoreboardState = networkClient?.getScoreboardState?.() ?? {
        playerCount: 0,
        teams: [],
      };
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
      const scoreboardVisible = showScoreboard && !paused;
      const hudMode = getHudMode?.() ?? 'debug';
      const classicVisible = hudMode === 'classic' && !paused;
      scoreboardController.update({
        visible: scoreboardVisible,
        subtitle: `Players: ${scoreboardState.playerCount}`,
        scoreboardState,
        roundManager,
        localPlayerId: networkClient?.playerId ?? null,
      });
      objectiveWidgetsController.update({
        paused,
        utilityHudState,
      });
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
        selectedSkyboxId: getSelectedSkyboxId?.(),
      });
      teamSelectOverlay.updateSelection(getSelectedTeam?.() ?? null);
    },
  };
}
