import { createPauseMenu } from './createPauseMenu.js';

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
  onResume,
  onSelectMap,
  onSensitivityChange,
  onVolumeChange,
  maps = [],
  getSelectedMapId,
  getIsLoading,
  getLoadingStatus,
  getIgnoreLocalCorrections,
  consumeMarkDebugSnapshotRequested,
  onSelectSkybox,
  skyboxes = [],
  getSelectedSkyboxId,
}) {
  const DEBUG_HISTORY_WINDOW_MS = 3000;
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
    <div class="hud__bottom">
      <div class="hud__health"></div>
      <div class="hud__weapon"></div>
      <div class="hud__utility"></div>
      <div class="hud__network"></div>
      <div class="hud__movement"></div>
      <div class="hud__position"></div>
      <div class="hud__pointer"></div>
    </div>
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
    onVolumeChange,
    getMasterVolume,
    getMouseSensitivity,
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
  const netDebugEl = hud.querySelector('.hud__netdebug');
  let paused = false;
  let showNetDebug = false;
  let displaySpeed = 0;
  let lastRoundText = '';
  let lastFpsText = '';
  let lastWeaponText = '';
  let lastHealthText = '';
  let lastUtilityText = '';
  let lastNetworkText = '';
  let lastMovementText = '';
  let lastPositionText = '';
  let lastPointerText = '';
  let lastLoadingText = '';
  let lastCrosshairHidden = null;
  let lastAdsReticle = null;
  let lastScopeOverlay = null;
  let lastLoading = null;
  let lastNetDebugText = '';
  let currentNetDebugText = '';
  let lastDamageVignette = -1;
  let lastDeadOverlay = null;
  let lastHitDamageHtml = '';
  let lastRespawnText = '';
  const debugHistory = [];

  function summarizeMetric(samples, key) {
    if (samples.length === 0) {
      return 'n/a';
    }

    let min = samples[0][key];
    let max = samples[0][key];
    let total = 0;

    for (const sample of samples) {
      const value = sample[key];
      min = Math.min(min, value);
      max = Math.max(max, value);
      total += value;
    }

    const avg = total / samples.length;
    return `${min.toFixed(3)}/${avg.toFixed(3)}/${max.toFixed(3)}`;
  }

  function buildDebugSummary() {
    if (debugHistory.length === 0) {
      return currentNetDebugText;
    }

    const latest = debugHistory[debugHistory.length - 1];
    return [
      currentNetDebugText,
      '',
      `window_ms=${DEBUG_HISTORY_WINDOW_MS} samples=${debugHistory.length}`,
      `seq_gap(min/avg/max)=${summarizeMetric(debugHistory, 'sequenceGap')}`,
      `snapshot_age_ms(min/avg/max)=${summarizeMetric(debugHistory, 'snapshotAgeMs')}`,
      `predicted_drift(min/avg/max)=${summarizeMetric(debugHistory, 'predictedDrift')}`,
      `corr_dist(min/avg/max)=${summarizeMetric(debugHistory, 'correctionDistance')}`,
      `present_offset(min/avg/max)=${summarizeMetric(debugHistory, 'presentationOffset')}`,
      `buffered_correction(min/avg/max)=${summarizeMetric(debugHistory, 'bufferedCorrection')}`,
      `corr_enqueue_per_sec(min/avg/max)=${summarizeMetric(debugHistory, 'correctionEnqueueRatePerSecond')}`,
      `corr_active(min/avg/max)=${summarizeMetric(debugHistory, 'correctionActive')}`,
      `responsive_offset(min/avg/max)=${summarizeMetric(debugHistory, 'responsiveOffset')}`,
      `frame_ms(min/avg/max)=${summarizeMetric(debugHistory, 'frameMs')}`,
      `corr_per_sec(min/avg/max)=${summarizeMetric(debugHistory, 'correctionRatePerSecond')}`,
      `speed(min/avg/max)=${summarizeMetric(debugHistory, 'speed')}`,
      `latest_state=${latest.connectionState} latest_seq_local=${latest.latestSequence} latest_seq_ack=${latest.acknowledgedSequence}`,
    ].join('\n');
  }

  function buildDebugText(networkDebug, movement) {
    return [
      'NETDEBUG',
      `ignore_local_corrections=${Boolean(getIgnoreLocalCorrections?.())}`,
      `state=${networkDebug.connectionState}`,
      `seq_local=${networkDebug.latestSequence} seq_ack=${networkDebug.acknowledgedSequence} seq_gap=${networkDebug.sequenceGap}`,
      `pending_inputs=${networkDebug.pendingInputCount} jump_latched=${networkDebug.pendingJumpSend}`,
      `snapshot_age_ms=${networkDebug.snapshotAgeMs} auth_per_sec=${networkDebug.authoritativeUpdatesPerSecond}`,
      `predicted_drift=${networkDebug.lastPredictedDriftDistance.toFixed(3)} corr_per_sec=${movement.correctionRatePerSecond}`,
      `corr_dist=${movement.lastCorrectionDistance.toFixed(3)} present_offset=${movement.correctionOffsetMagnitude.toFixed(3)}`,
      `buffered_corr=${(movement.bufferedCanonicalCorrectionMagnitude ?? 0).toFixed(3)} responsive_offset=${(movement.responsiveOffsetMagnitude ?? 0).toFixed(3)}`,
      `corr_enqueue_per_sec=${(movement.correctionEnqueueRatePerSecond ?? 0).toFixed(3)} corr_active=${movement.correctionActive ? 'yes' : 'no'}`,
      `sim_step_move=${movement.simulationDeltaMagnitude.toFixed(3)} speed=${movement.speed.toFixed(3)}`,
      `mode=${movement.movementMode ?? 'grounded'} pos=${movement.positionText ?? 'n/a'}`,
    ].join('\n');
  }

  function handleKeyDown(event) {
    if (event.code !== 'F8') {
      return;
    }

    showNetDebug = !showNetDebug;
    netDebugEl.hidden = !showNetDebug;
    if (currentNetDebugText) {
      console.log(buildDebugSummary());
    }
    event.preventDefault();
  }

  window.addEventListener('keydown', handleKeyDown);

  function setTextIfChanged(element, nextText, lastText) {
    if (lastText !== nextText) {
      element.textContent = nextText;
      return nextText;
    }

    return lastText;
  }

  return {
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      pauseMenu.destroy();
      hud.remove();
    },
    setPaused(nextPaused) {
      paused = nextPaused;
      pauseMenu.setPaused(paused);
    },
    update() {
      const markDebugSnapshotRequested = Boolean(consumeMarkDebugSnapshotRequested?.());
      const movement = playerController?.getDebugState?.() ?? {
        grounded: true,
        crouched: false,
        speed: 0,
        correctionOffsetMagnitude: 0,
        simulationDeltaMagnitude: 0,
        movementMode: 'grounded',
        positionText: '0.00, 0.00, 0.00',
      };
      const networkDebug = networkClient?.getDebugState?.() ?? {
        connectionState: 'offline',
        latestSequence: 0,
        acknowledgedSequence: 0,
        pendingInputCount: 0,
        sequenceGap: 0,
        snapshotAgeMs: -1,
        lastPredictedDriftDistance: 0,
        authoritativeUpdatesPerSecond: 0,
        pendingJumpSend: false,
      };
      if (showNetDebug || markDebugSnapshotRequested) {
        const now = performance.now();
        debugHistory.push({
          time: now,
          connectionState: networkDebug.connectionState,
          latestSequence: networkDebug.latestSequence,
          acknowledgedSequence: networkDebug.acknowledgedSequence,
          sequenceGap: networkDebug.sequenceGap,
          snapshotAgeMs: Math.max(0, networkDebug.snapshotAgeMs),
          predictedDrift: networkDebug.lastPredictedDriftDistance,
          correctionDistance: movement.lastCorrectionDistance ?? 0,
          presentationOffset: movement.correctionOffsetMagnitude ?? 0,
          bufferedCorrection: movement.bufferedCanonicalCorrectionMagnitude ?? 0,
          correctionEnqueueRatePerSecond: movement.correctionEnqueueRatePerSecond ?? 0,
          correctionActive: movement.correctionActive ? 1 : 0,
          responsiveOffset: movement.responsiveOffsetMagnitude ?? 0,
          frameMs: getFps?.() > 0 ? 1000 / getFps() : 0,
          correctionRatePerSecond: movement.correctionRatePerSecond ?? 0,
          speed: movement.speed ?? 0,
        });
        while (debugHistory.length > 0 && now - debugHistory[0].time > DEBUG_HISTORY_WINDOW_MS) {
          debugHistory.shift();
        }
      }
      displaySpeed += (movement.speed - displaySpeed) * 0.18;
      const roundText = roundManager
        ? `Round ${roundManager.roundNumber} - ${roundManager.phase}`
        : 'Round --';
      const fpsText = `FPS: ${getFps?.() ?? '--'}`;
      const localPlayerState = networkClient?.getLocalPlayerState?.() ?? null;
      const healthText = `Health: ${localPlayerState?.health ?? '--'}/${localPlayerState?.maxHealth ?? '--'}${localPlayerState?.isAlive === false ? ' - DOWN' : ''}`;
      const weaponText = `Weapon: ${weaponManager?.activeWeapon ?? '--'}`;
      const utilityText = `Utility: ${utilityManager?.activeUtility ?? '--'}`;
      const remotePlayerCount = networkClient?.getRemotePlayerCount?.() ?? 0;
      const networkText = `Network: ${networkClient?.connectionState ?? 'offline'} - Remote players: ${remotePlayerCount} - Corr: ${getIgnoreLocalCorrections?.() ? 'OFF(F9)' : 'ON(F9)'}`;
      const movementText = `State: ${movement.grounded ? 'Grounded' : 'Air'} - ${movement.crouched ? 'Crouched' : 'Standing'} - ${displaySpeed.toFixed(1)} m/s`;
      const positionText = `Pos: ${movement.positionText ?? '0.00, 0.00, 0.00'} - ${movement.movementMode ?? 'grounded'}`;
      const pointerText = paused
        ? 'Paused'
        : input.pointerLocked
          ? 'Pointer locked'
          : 'Click to capture mouse';
      lastRoundText = setTextIfChanged(roundEl, roundText, lastRoundText);
      lastFpsText = setTextIfChanged(fpsEl, fpsText, lastFpsText);
      lastHealthText = setTextIfChanged(healthEl, healthText, lastHealthText);
      lastWeaponText = setTextIfChanged(weaponEl, weaponText, lastWeaponText);
      lastUtilityText = setTextIfChanged(utilityEl, utilityText, lastUtilityText);
      lastNetworkText = setTextIfChanged(networkEl, networkText, lastNetworkText);
      lastMovementText = setTextIfChanged(movementEl, movementText, lastMovementText);
      lastPositionText = setTextIfChanged(positionEl, positionText, lastPositionText);
      lastPointerText = setTextIfChanged(pointerEl, pointerText, lastPointerText);

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

      if (showNetDebug) {
        const debugText = buildDebugText(networkDebug, movement);

        if (debugText !== lastNetDebugText) {
          netDebugEl.textContent = debugText;
          lastNetDebugText = debugText;
        }
        currentNetDebugText = debugText;
      } else if (currentNetDebugText) {
        currentNetDebugText = '';
      }

      if (markDebugSnapshotRequested) {
        currentNetDebugText = buildDebugText(networkDebug, movement);
        console.log(buildDebugSummary());
      }

      pauseMenu.updateSelections({
        selectedMapId: getSelectedMapId?.(),
        selectedSkyboxId: getSelectedSkyboxId?.(),
      });
    },
  };
}
