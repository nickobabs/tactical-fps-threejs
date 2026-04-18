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

function formatPoint(point) {
  if (!point) {
    return 'n/a';
  }

  return `${Number(point.x ?? 0).toFixed(2)}, ${Number(point.y ?? 0).toFixed(2)}, ${Number(point.z ?? 0).toFixed(2)}`;
}

function formatFixedWidthNumber(value, decimals, width) {
  const resolved = Number(value ?? 0);
  const text = Number.isFinite(resolved) ? resolved.toFixed(decimals) : '0'.padStart(width, ' ');
  return text.padStart(width, ' ');
}

function formatFixedWidthInteger(value, width) {
  const resolved = Number(value ?? 0);
  const text = Number.isFinite(resolved) ? String(Math.round(resolved)) : '0';
  return text.padStart(width, ' ');
}

export function buildHudNetDebugText(networkDebug, movement, { ignoreLocalCorrections = false, remoteDebug = null } = {}) {
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
    `ping_rtt_ms=${formatFixedWidthInteger(networkDebug.pingRoundTripMs ?? 0, 4)} ping_avg_ms=${formatFixedWidthInteger(networkDebug.pingAverageMs ?? 0, 4)} ping_age_ms=${formatFixedWidthInteger(networkDebug.pingAgeMs ?? -1, 4)} ping_pending=${networkDebug.pingPending ? 'yes' : 'no'}`,
    `ping_server_turn_ms=${formatFixedWidthInteger(networkDebug.pingServerTurnaroundMs ?? 0, 4)} ping_net_est_ms=${formatFixedWidthInteger(networkDebug.pingEstimatedNetworkMs ?? 0, 4)}`,
    `snapshot_age_ms=${formatFixedWidthInteger(networkDebug.snapshotAgeMs, 4)} auth_per_sec=${formatFixedWidthInteger(networkDebug.authoritativeUpdatesPerSecond, 3)}`,
    `predicted_drift=${formatFixedWidthNumber(networkDebug.lastPredictedDriftDistance, 3, 7)} corr_per_sec=${formatFixedWidthNumber(movement.correctionRatePerSecond, 3, 7)}`,
    `corr_dist=${formatFixedWidthNumber(movement.lastCorrectionDistance, 3, 7)} present_offset=${formatFixedWidthNumber(movement.correctionOffsetMagnitude, 3, 7)}`,
    `corr_dist_xz=${formatFixedWidthNumber(movement.correctionDistanceXZ ?? 0, 3, 7)} corr_delta_y=${formatFixedWidthNumber(movement.correctionDeltaY ?? 0, 3, 7)}`,
    `corr_along_vel=${formatFixedWidthNumber(movement.correctionAlongVelocity ?? 0, 3, 7)} corr_perp_vel=${formatFixedWidthNumber(movement.correctionPerpendicularVelocity ?? 0, 3, 7)}`,
    `corr_along_input=${formatFixedWidthNumber(movement.correctionAlongInput ?? 0, 3, 7)} corr_perp_input=${formatFixedWidthNumber(movement.correctionPerpendicularInput ?? 0, 3, 7)}`,
    `corr_xz_per_snapshot_ms=${formatFixedWidthNumber(correctionXZPerSnapshotMs, 5, 9)} corr_along_vel_per_snapshot_ms=${formatFixedWidthNumber(correctionAlongVelocityPerSnapshotMs, 5, 9)}`,
    `buffered_corr=${formatFixedWidthNumber(movement.bufferedCanonicalCorrectionMagnitude ?? 0, 3, 7)} responsive_offset=${formatFixedWidthNumber(movement.responsiveOffsetMagnitude ?? 0, 3, 7)}`,
    `corr_enqueue_per_sec=${formatFixedWidthNumber(movement.correctionEnqueueRatePerSecond ?? 0, 3, 7)} corr_active=${movement.correctionActive ? 'yes' : 'no'}`,
    `corr_action=${movement.reconciliationAction ?? 'none'} replay_inputs=${movement.replayInputCount ?? 0} corr_delta_xz=${movement.correctionDeltaText ?? '0.00, 0.00'}`,
    `auth_vel_xz=${movement.authoritativeVelocityText ?? '0.00, 0.00'} replay_vel_xz=${movement.replayVelocityText ?? '0.00, 0.00'}`,
    `cur_pos=${movement.currentPositionDetailText ?? '0.00, 0.00, 0.00'}`,
    `auth_pos=${movement.authoritativePositionText ?? '0.00, 0.00, 0.00'}`,
    `replay_pos=${movement.replayPositionText ?? '0.00, 0.00, 0.00'}`,
    `remote_dbg=${remoteDebug?.showHitVolumeDebug ? 'on' : 'off'} tracked=${remoteDebug?.trackedRemoteCount ?? 0} focus=${remoteDebug?.focusDisplayName ?? remoteDebug?.focusPlayerId ?? 'none'}`,
    `remote_render_pos=${formatPoint(remoteDebug?.renderedPosition)}`,
    `remote_latest_pos=${formatPoint(remoteDebug?.authoritativePosition)}`,
    `remote_latest_delta=${formatPoint(remoteDebug?.delta)} remote_latest_dist=${formatFixedWidthNumber(remoteDebug?.distance ?? 0, 3, 7)} remote_latest_xz=${formatFixedWidthNumber(remoteDebug?.horizontalDistance ?? 0, 3, 7)} remote_latest_age_ms=${formatFixedWidthInteger(remoteDebug?.snapshotAgeMs ?? -1, 4)}`,
    `remote_rewind_pos=${formatPoint(remoteDebug?.rewoundPosition)}`,
    `remote_rewind_delta=${formatPoint(remoteDebug?.rewoundDelta)} remote_rewind_dist=${formatFixedWidthNumber(remoteDebug?.rewoundDistance ?? 0, 3, 7)} remote_rewind_xz=${formatFixedWidthNumber(remoteDebug?.rewoundHorizontalDistance ?? 0, 3, 7)} remote_rewind_age_ms=${formatFixedWidthInteger(remoteDebug?.rewoundSnapshotAgeMs ?? -1, 4)} rewind_ms=${formatFixedWidthNumber(remoteDebug?.rewindMs ?? 0, 1, 6)}`,
    `remote_anim_state=${remoteDebug?.animation?.presentationState ?? 'none'} target=${remoteDebug?.animation?.targetClip ?? 'none'} base=${remoteDebug?.animation?.baseClip ?? 'none'} active=${remoteDebug?.animation?.activeCharacterClip ?? 'none'}`,
    `remote_anim_upper=${remoteDebug?.animation?.activeUpperBodyClip ?? 'none'} upper_t=${formatFixedWidthNumber(remoteDebug?.animation?.upperBodyActionTime ?? 0, 3, 7)} full=${remoteDebug?.animation?.fullBodyActionClip ?? 'none'} full_t=${formatFixedWidthNumber(remoteDebug?.animation?.fullBodyActionTime ?? 0, 3, 7)} fire_lock=${remoteDebug?.animation?.fireBaseLocked ? 'yes' : 'no'}`,
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

export function pushHudDebugHistory(debugHistory, { networkDebug, movement, fps = 0 } = {}) {
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

export function buildHudDebugSummary(debugHistory, currentNetDebugText) {
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
