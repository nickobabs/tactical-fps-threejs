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
  getHorizontalFov,
  onResume,
  onSelectMap,
  onSensitivityChange,
  onFovChange,
  onVolumeChange,
  maps = [],
  getSelectedMapId,
  getIsLoading,
  getLoadingStatus,
  getIgnoreLocalCorrections,
  getIsMovementTraceRecording,
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
  const scoreboardEl = hud.querySelector('.hud__scoreboard');
  const scoreboardSubtitleEl = hud.querySelector('.hud__scoreboard-subtitle');
  const scoreboardTeamEls = [...hud.querySelectorAll('.hud__scoreboard-team')];
  const netDebugCopyEl = hud.querySelector('.hud__netdebug-copy');
  const netDebugEl = hud.querySelector('.hud__netdebug');
  let paused = false;
  let showNetDebug = false;
  let showScoreboard = false;
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
  let lastScoreboardHidden = null;
  let lastScoreboardSubtitle = '';
  const lastScoreboardTeamMarkup = new Map();
  let lastNetDebugText = '';
  let lastNetDebugCopyHidden = true;
  let currentNetDebugText = '';
  let copyFeedbackTimeoutId = 0;
  let lastCopyButtonLabel = 'Copy';
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

  function getSafeRate(value, divisor) {
    if (!Number.isFinite(value) || !Number.isFinite(divisor) || divisor <= 0) {
      return 0;
    }

    return value / divisor;
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
      `corr_dist_xz(min/avg/max)=${summarizeMetric(debugHistory, 'correctionDistanceXZ')}`,
      `corr_delta_y(min/avg/max)=${summarizeMetric(debugHistory, 'correctionDeltaY')}`,
      `corr_along_vel(min/avg/max)=${summarizeMetric(debugHistory, 'correctionAlongVelocity')}`,
      `corr_perp_vel(min/avg/max)=${summarizeMetric(debugHistory, 'correctionPerpendicularVelocity')}`,
      `corr_along_input(min/avg/max)=${summarizeMetric(debugHistory, 'correctionAlongInput')}`,
      `corr_perp_input(min/avg/max)=${summarizeMetric(debugHistory, 'correctionPerpendicularInput')}`,
      `corr_xz_per_snapshot_ms(min/avg/max)=${summarizeMetric(debugHistory, 'correctionXZPerSnapshotMs')}`,
      `corr_along_vel_per_snapshot_ms(min/avg/max)=${summarizeMetric(debugHistory, 'correctionAlongVelocityPerSnapshotMs')}`,
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
    const correctionXZPerSnapshotMs = getSafeRate(
      movement.correctionDistanceXZ ?? 0,
      Math.max(0, networkDebug.snapshotAgeMs),
    );
    const correctionAlongVelocityPerSnapshotMs = getSafeRate(
      Math.abs(movement.correctionAlongVelocity ?? 0),
      Math.max(0, networkDebug.snapshotAgeMs),
    );
    return [
      'NETDEBUG',
      `ignore_local_corrections=${Boolean(getIgnoreLocalCorrections?.())}`,
      `state=${networkDebug.connectionState}`,
      `server_url=${networkDebug.serverUrl ?? 'unknown'}`,
      `map_id=${networkDebug.localMapId ?? 'unknown'}`,
      `player_state_count=${networkDebug.receivedPlayerStateCount ?? 0} same_map_remote=${networkDebug.sameMapRemoteStateCount ?? 0} filtered_remote=${networkDebug.filteredRemoteStateCount ?? 0}`,
      `remote_maps=${(networkDebug.receivedRemoteMaps ?? []).join(',') || 'none'}`,
      `seq_local=${networkDebug.latestSequence} seq_ack=${networkDebug.acknowledgedSequence} seq_gap=${networkDebug.sequenceGap}`,
      `pending_inputs=${networkDebug.pendingInputCount} jump_latched=${networkDebug.pendingJumpSend}`,
      `ping_rtt_ms=${networkDebug.pingRoundTripMs ?? 0} ping_avg_ms=${networkDebug.pingAverageMs ?? 0} ping_age_ms=${networkDebug.pingAgeMs ?? -1} ping_pending=${networkDebug.pingPending ? 'yes' : 'no'}`,
      `ping_server_turn_ms=${networkDebug.pingServerTurnaroundMs ?? 0} ping_net_est_ms=${networkDebug.pingEstimatedNetworkMs ?? 0}`,
      `snapshot_age_ms=${networkDebug.snapshotAgeMs} auth_per_sec=${networkDebug.authoritativeUpdatesPerSecond}`,
      `predicted_drift=${networkDebug.lastPredictedDriftDistance.toFixed(3)} corr_per_sec=${movement.correctionRatePerSecond}`,
      `corr_dist=${movement.lastCorrectionDistance.toFixed(3)} present_offset=${movement.correctionOffsetMagnitude.toFixed(3)}`,
      `corr_dist_xz=${(movement.correctionDistanceXZ ?? 0).toFixed(3)} corr_delta_y=${(movement.correctionDeltaY ?? 0).toFixed(3)}`,
      `corr_along_vel=${(movement.correctionAlongVelocity ?? 0).toFixed(3)} corr_perp_vel=${(movement.correctionPerpendicularVelocity ?? 0).toFixed(3)}`,
      `corr_along_input=${(movement.correctionAlongInput ?? 0).toFixed(3)} corr_perp_input=${(movement.correctionPerpendicularInput ?? 0).toFixed(3)}`,
      `corr_xz_per_snapshot_ms=${correctionXZPerSnapshotMs.toFixed(5)} corr_along_vel_per_snapshot_ms=${correctionAlongVelocityPerSnapshotMs.toFixed(5)}`,
      `buffered_corr=${(movement.bufferedCanonicalCorrectionMagnitude ?? 0).toFixed(3)} responsive_offset=${(movement.responsiveOffsetMagnitude ?? 0).toFixed(3)}`,
      `corr_enqueue_per_sec=${(movement.correctionEnqueueRatePerSecond ?? 0).toFixed(3)} corr_active=${movement.correctionActive ? 'yes' : 'no'}`,
      `corr_action=${movement.reconciliationAction ?? 'none'} replay_inputs=${movement.replayInputCount ?? 0} corr_delta_xz=${movement.correctionDeltaText ?? '0.00, 0.00'}`,
      `auth_vel_xz=${movement.authoritativeVelocityText ?? '0.00, 0.00'} replay_vel_xz=${movement.replayVelocityText ?? '0.00, 0.00'}`,
      `cur_pos=${movement.currentPositionDetailText ?? '0.00, 0.00, 0.00'}`,
      `auth_pos=${movement.authoritativePositionText ?? '0.00, 0.00, 0.00'}`,
      `replay_pos=${movement.replayPositionText ?? '0.00, 0.00, 0.00'}`,
      `input=${movement.inputFlags ?? '-'} target_speed=${(movement.targetSpeed ?? 0).toFixed(3)} speed_ratio=${(movement.speedRatio ?? 0).toFixed(3)}`,
      `target_xz=${movement.targetVectorText ?? '0.00, 0.00'} vel_xz=${movement.velocityVectorText ?? '0.00, 0.00'}`,
      `sim_step_move=${movement.simulationDeltaMagnitude.toFixed(3)} speed=${movement.speed.toFixed(3)}`,
      `mode=${movement.movementMode ?? 'grounded'} pos=${movement.positionText ?? 'n/a'}`,
    ].join('\n');
  }

  function handleKeyDown(event) {
    if (event.code === 'F8') {
      showNetDebug = !showNetDebug;
      netDebugEl.hidden = !showNetDebug;
      netDebugCopyEl.hidden = !showNetDebug;
      if (currentNetDebugText) {
        console.log(buildDebugSummary());
      }
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

  async function copyNetDebugToClipboard() {
    const debugText = netDebugEl.textContent?.trim() || currentNetDebugText?.trim() || '';
    if (!debugText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(debugText);
      netDebugCopyEl.textContent = 'Copied';
    } catch (error) {
      console.warn('[Hud] Failed to copy net debug to clipboard.', error);
      netDebugCopyEl.textContent = 'Copy failed';
    }

    if (copyFeedbackTimeoutId > 0) {
      window.clearTimeout(copyFeedbackTimeoutId);
    }

    copyFeedbackTimeoutId = window.setTimeout(() => {
      netDebugCopyEl.textContent = lastCopyButtonLabel;
      copyFeedbackTimeoutId = 0;
    }, 1500);
  }

  netDebugCopyEl.addEventListener('click', () => {
    void copyNetDebugToClipboard();
  });

  function setTextIfChanged(element, nextText, lastText) {
    if (lastText !== nextText) {
      element.textContent = nextText;
      return nextText;
    }

    return lastText;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function getScoreboardRowMarkup(players = [], localPlayerId) {
    if (players.length === 0) {
      return '<div class="hud__scoreboard-empty">No players</div>';
    }

    return players.map((player) => {
      const playerName = escapeHtml(player.displayName ?? player.playerId ?? 'Player');
      const kills = Number(player.kills ?? 0);
      const deaths = Number(player.deaths ?? 0);
      const ping = Math.max(0, Math.round(Number(player.pingMs ?? 0)));
      const aliveClass = player.isAlive === false ? ' hud__scoreboard-row--dead' : '';
      const localClass = player.playerId === localPlayerId ? ' hud__scoreboard-row--local' : '';
      return `<div class="hud__scoreboard-row${aliveClass}${localClass}">
        <span class="hud__scoreboard-name">${playerName}</span>
        <span>${kills}</span>
        <span>${deaths}</span>
        <span>${ping}</span>
      </div>`;
    }).join('');
  }

  return {
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (copyFeedbackTimeoutId > 0) {
        window.clearTimeout(copyFeedbackTimeoutId);
      }
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
          correctionDistanceXZ: movement.correctionDistanceXZ ?? 0,
          correctionDeltaY: movement.correctionDeltaY ?? 0,
          correctionAlongVelocity: movement.correctionAlongVelocity ?? 0,
          correctionPerpendicularVelocity: movement.correctionPerpendicularVelocity ?? 0,
          correctionAlongInput: movement.correctionAlongInput ?? 0,
          correctionPerpendicularInput: movement.correctionPerpendicularInput ?? 0,
          correctionXZPerSnapshotMs: getSafeRate(
            movement.correctionDistanceXZ ?? 0,
            Math.max(0, networkDebug.snapshotAgeMs),
          ),
          correctionAlongVelocityPerSnapshotMs: getSafeRate(
            Math.abs(movement.correctionAlongVelocity ?? 0),
            Math.max(0, networkDebug.snapshotAgeMs),
          ),
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
      const scoreboardState = networkClient?.getScoreboardState?.() ?? {
        playerCount: 0,
        teams: [],
      };
      const healthText = `Health: ${localPlayerState?.health ?? '--'}/${localPlayerState?.maxHealth ?? '--'}${localPlayerState?.isAlive === false ? ' - DOWN' : ''}`;
      const weaponText = `Weapon: ${weaponManager?.activeWeapon ?? '--'}`;
      const utilityText = `Utility: ${utilityManager?.activeUtility ?? '--'}`;
      const remotePlayerCount = networkClient?.getRemotePlayerCount?.() ?? 0;
      const networkText = `Network: ${networkClient?.connectionState ?? 'offline'} - Remote players: ${remotePlayerCount} - Corr: ${getIgnoreLocalCorrections?.() ? 'OFF(F9)' : 'ON(F9)'}`;
      const movementText = `State: ${movement.grounded ? 'Grounded' : 'Air'} - ${movement.crouched ? 'Crouched' : 'Standing'} - raw ${movement.speed.toFixed(1)} m/s - disp ${displaySpeed.toFixed(1)} m/s${movement.traceRecording ? ' - TRACE(F10)' : ''}`;
      const positionText = `Pos: ${movement.positionText ?? '0.00, 0.00, 0.00'} - ${movement.movementMode ?? 'grounded'}`;
      const pointerText = paused
        ? 'Paused'
        : input.pointerLocked
          ? 'Pointer locked'
          : 'Click to capture mouse';
      const scoreboardVisible = showScoreboard && !paused;
      if (scoreboardVisible !== lastScoreboardHidden) {
        scoreboardEl.classList.toggle('hud__scoreboard--active', scoreboardVisible);
        lastScoreboardHidden = scoreboardVisible;
      }
      const scoreboardSubtitle = `Players: ${scoreboardState.playerCount}`;
      lastScoreboardSubtitle = setTextIfChanged(
        scoreboardSubtitleEl,
        scoreboardSubtitle,
        lastScoreboardSubtitle,
      );
      scoreboardTeamEls.forEach((teamEl, index) => {
        const teamState = scoreboardState.teams?.[index] ?? {
          label: index === 0 ? 'Attackers' : 'Defenders',
          roundsWon: 0,
          players: [],
        };
        const teamNameEl = teamEl.querySelector('.hud__scoreboard-teamname');
        const teamScoreEl = teamEl.querySelector('.hud__scoreboard-teamscore');
        const teamRowsEl = teamEl.querySelector('.hud__scoreboard-rows');
        teamNameEl.textContent = teamState.label;
        teamScoreEl.textContent = String(teamState.roundsWon ?? 0);
        const nextMarkup = getScoreboardRowMarkup(teamState.players, networkClient?.playerId ?? null);
        if (lastScoreboardTeamMarkup.get(index) !== nextMarkup) {
          teamRowsEl.innerHTML = nextMarkup;
          lastScoreboardTeamMarkup.set(index, nextMarkup);
        }
      });
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

      const netDebugCopyHidden = !showNetDebug;
      if (netDebugCopyHidden !== lastNetDebugCopyHidden) {
        netDebugCopyEl.hidden = netDebugCopyHidden;
        lastNetDebugCopyHidden = netDebugCopyHidden;
      }

      pauseMenu.updateSelections({
        selectedMapId: getSelectedMapId?.(),
        selectedSkyboxId: getSelectedSkyboxId?.(),
      });
    },
  };
}
