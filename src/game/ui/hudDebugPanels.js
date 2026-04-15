import { setTextIfChanged } from './hudText.js';

const DEBUG_HISTORY_WINDOW_MS = 3000;

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

function buildDebugText(networkDebug, movement, { ignoreLocalCorrections = false } = {}) {
  const correctionXZPerSnapshotMs = getSafeRate(
    movement.correctionDistanceXZ ?? 0,
    Math.max(0, networkDebug.snapshotAgeMs),
  );
  const correctionAlongVelocityPerSnapshotMs = getSafeRate(
    Math.abs(movement.correctionAlongVelocity ?? 0),
    Math.max(0, networkDebug.snapshotAgeMs),
  );
  const footstepAudio = networkDebug.audioDebug?.lastFootstep ?? null;
  const weaponAudio = networkDebug.audioDebug?.lastWeapon ?? null;
  return [
    'NETDEBUG',
    `ignore_local_corrections=${Boolean(ignoreLocalCorrections)}`,
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
    footstepAudio
      ? `audio_footstep dist=${footstepAudio.distance.toFixed(2)} base=${footstepAudio.baseVolume.toFixed(3)} manual=${footstepAudio.manualVolume.toFixed(3)} spatial=${footstepAudio.spatialVolumeMultiplier.toFixed(3)} final=${footstepAudio.finalVolume.toFixed(3)} age_ms=${Math.round(footstepAudio.ageMs ?? 0)}`
      : 'audio_footstep none',
    footstepAudio
      ? `audio_footstep_range min=${footstepAudio.minDistance.toFixed(2)} max=${footstepAudio.maxDistance.toFixed(2)} panner=${footstepAudio.panningModel} rolloff=${footstepAudio.rolloffFactor.toFixed(3)}`
      : 'audio_footstep_range none',
    weaponAudio
      ? `audio_weapon dist=${weaponAudio.distance.toFixed(2)} base=${weaponAudio.baseVolume.toFixed(3)} manual=${weaponAudio.manualVolume.toFixed(3)} spatial=${weaponAudio.spatialVolumeMultiplier.toFixed(3)} final=${weaponAudio.finalVolume.toFixed(3)} age_ms=${Math.round(weaponAudio.ageMs ?? 0)}`
      : 'audio_weapon none',
    `input=${movement.inputFlags ?? '-'} target_speed=${(movement.targetSpeed ?? 0).toFixed(3)} speed_ratio=${(movement.speedRatio ?? 0).toFixed(3)}`,
    `target_xz=${movement.targetVectorText ?? '0.00, 0.00'} vel_xz=${movement.velocityVectorText ?? '0.00, 0.00'}`,
    `sim_step_move=${movement.simulationDeltaMagnitude.toFixed(3)} speed=${movement.speed.toFixed(3)}`,
    `mode=${movement.movementMode ?? 'grounded'} pos=${movement.positionText ?? 'n/a'}`,
  ].join('\n');
}

export function createHudDebugPanelsController({
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
}) {
  let lastRoundText = '';
  let lastFpsText = '';
  let lastWeaponText = '';
  let lastHealthText = '';
  let lastUtilityText = '';
  let lastNetworkText = '';
  let lastMovementText = '';
  let lastPositionText = '';
  let lastPointerText = '';
  let lastNetDebugText = '';
  let lastNetDebugCopyHidden = true;
  let currentNetDebugText = '';
  let copyFeedbackTimeoutId = 0;
  let lastCopyButtonLabel = 'Copy';
  const debugHistory = [];

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

  function handleCopyClick() {
    void copyNetDebugToClipboard();
  }

  netDebugCopyEl.addEventListener('click', handleCopyClick);

  return {
    updateDebugText({
      roundText,
      fpsText,
      healthText,
      weaponText,
      utilityText,
      networkText,
      movementText,
      positionText,
      pointerText,
    }) {
      lastRoundText = setTextIfChanged(roundEl, roundText, lastRoundText);
      lastFpsText = setTextIfChanged(fpsEl, fpsText, lastFpsText);
      lastHealthText = setTextIfChanged(healthEl, healthText, lastHealthText);
      lastWeaponText = setTextIfChanged(weaponEl, weaponText, lastWeaponText);
      lastUtilityText = setTextIfChanged(utilityEl, utilityText, lastUtilityText);
      lastNetworkText = setTextIfChanged(networkEl, networkText, lastNetworkText);
      lastMovementText = setTextIfChanged(movementEl, movementText, lastMovementText);
      lastPositionText = setTextIfChanged(positionEl, positionText, lastPositionText);
      lastPointerText = setTextIfChanged(pointerEl, pointerText, lastPointerText);
    },
    updateNetDebug({
      visible,
      networkDebug,
      movement,
      markDebugSnapshotRequested = false,
      fps = 0,
      ignoreLocalCorrections = false,
    }) {
      if (visible || markDebugSnapshotRequested) {
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
          frameMs: fps > 0 ? 1000 / fps : 0,
          correctionRatePerSecond: movement.correctionRatePerSecond ?? 0,
          speed: movement.speed ?? 0,
        });
        while (debugHistory.length > 0 && now - debugHistory[0].time > DEBUG_HISTORY_WINDOW_MS) {
          debugHistory.shift();
        }
      }

      if (visible) {
        const debugText = buildDebugText(networkDebug, movement, { ignoreLocalCorrections });

        if (debugText !== lastNetDebugText) {
          netDebugEl.textContent = debugText;
          lastNetDebugText = debugText;
        }
        currentNetDebugText = debugText;
      } else if (currentNetDebugText) {
        currentNetDebugText = '';
      }

      if (markDebugSnapshotRequested) {
        currentNetDebugText = buildDebugText(networkDebug, movement, { ignoreLocalCorrections });
        console.log(buildDebugSummary());
      }

      const netDebugCopyHidden = !visible;
      if (netDebugCopyHidden !== lastNetDebugCopyHidden) {
        netDebugCopyEl.hidden = netDebugCopyHidden;
        lastNetDebugCopyHidden = netDebugCopyHidden;
      }
    },
    logCurrentSummary() {
      if (currentNetDebugText) {
        console.log(buildDebugSummary());
      }
    },
    destroy() {
      netDebugCopyEl.removeEventListener('click', handleCopyClick);
      if (copyFeedbackTimeoutId > 0) {
        window.clearTimeout(copyFeedbackTimeoutId);
      }
    },
  };
}
