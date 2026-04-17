import * as THREE from 'three';
import { InputManager } from '../core/input/InputManager.js';
import { MAP_OPTIONS, preloadMapOptions } from '../game/maps/mapOptions.js';
import { createHud } from '../game/ui/Hud.js';
import { SKYBOX_OPTIONS, getSkyboxOption } from '../game/skyboxes/skyboxOptions.js';
import { SkyboxManager, preloadSkyboxModules } from '../game/skyboxes/SkyboxManager.js';
import { NetworkClient } from '../game/networking/NetworkClient.js';
import { RemotePlayerPresenter } from '../game/networking/RemotePlayerPresenter.js';
import { preloadNavigationModules } from '../game/ai/NavigationManager.js';
import { FixedStepLoop } from '../core/loop/FixedStepLoop.js';
import { NETCODE_SIMULATION_STEP } from '../shared/netcode.js';
import { createGameAudioManager } from './createGameAudioManager.js';
import { createGameLighting } from './createGameLighting.js';
import { scheduleAppWarmup } from './scheduleAppWarmup.js';
import { FatalErrorOverlay } from './FatalErrorOverlay.js';
import { GameplayNetworkingCoordinator } from './GameplayNetworkingCoordinator.js';
import { GamePauseController } from './GamePauseController.js';
import { GameDebugController } from './GameDebugController.js';
import { GameSessionController } from './GameSessionController.js';
import { createDebugMenu } from './createDebugMenu.js';
import { createMovementTuningPanel } from '../game/player/createMovementTuningPanel.js';
import { createRemoteAudioTuningPanel } from '../game/audio/createRemoteAudioTuningPanel.js';
import { REMOTE_AUDIO_TUNING } from '../game/audio/remoteAudioTuning.js';
import { createHudLayoutTuningPanel } from '../game/ui/createHudLayoutTuningPanel.js';
import { HUD_LAYOUT_TUNING, applyHudLayoutTuningToRoot, loadHudLayoutTuning } from '../game/ui/hudLayoutTuning.js';
import { TEAMS } from '../shared/constants.js';
import { GAMEMODE_OPTIONS, GAMEMODES, isCompetitiveGamemode, sanitizeGamemodeForMap } from '../shared/gamemodes.js';
import { VIEWMODEL_LAYER } from '../game/weapons/viewModels.js';

const DEFAULT_HORIZONTAL_FOV = 103;
const DEFAULT_MOUSE_SENSITIVITY = 0.0011;
const DEFAULT_MASTER_VOLUME = 0.6;
const MOVEMENT_TRACE_STORAGE_KEY = 'tactical-fps-threejs-movement-trace';
const PLAYER_NAME_STORAGE_KEY = 'tactical-fps-threejs-player-name';
const HUD_MODE_STORAGE_KEY = 'tactical-fps-threejs-hud-mode';
const SETTINGS_STORAGE_KEY = 'tactical-fps-threejs-settings';
const MAX_PLAYER_NAME_LENGTH = 24;
const KILLFEED_ENTRY_LIFETIME_MS = 4500;
const SPECTATE_DELAY_MS = 2000;
const BOMB_CARRIER_ANNOUNCEMENT_MS = 3000;

function sanitizePlayerName(value, fallback = 'Player') {
  const normalized = String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_PLAYER_NAME_LENGTH);
  return normalized || fallback;
}

function loadStoredPlayerName() {
  if (typeof window === 'undefined') {
    return 'Player';
  }
  try {
    return sanitizePlayerName(window.localStorage.getItem(PLAYER_NAME_STORAGE_KEY), 'Player');
  } catch {
    return 'Player';
  }
}

function persistPlayerName(playerName) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(PLAYER_NAME_STORAGE_KEY, sanitizePlayerName(playerName, 'Player'));
  } catch {
    // Ignore localStorage write failures.
  }
}

function loadStoredHudMode() {
  if (typeof window === 'undefined') {
    return 'debug';
  }
  try {
    return window.localStorage.getItem(HUD_MODE_STORAGE_KEY) === 'classic' ? 'classic' : 'debug';
  } catch {
    return 'debug';
  }
}

function persistHudMode(hudMode) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(HUD_MODE_STORAGE_KEY, hudMode === 'classic' ? 'classic' : 'debug');
  } catch {
    // Ignore localStorage write failures.
  }
}

function loadStoredSettings() {
  if (typeof window === 'undefined') {
    return {
      mouseSensitivity: DEFAULT_MOUSE_SENSITIVITY,
      horizontalFov: DEFAULT_HORIZONTAL_FOV,
      masterVolume: DEFAULT_MASTER_VOLUME,
    };
  }

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      return {
        mouseSensitivity: DEFAULT_MOUSE_SENSITIVITY,
        horizontalFov: DEFAULT_HORIZONTAL_FOV,
        masterVolume: DEFAULT_MASTER_VOLUME,
      };
    }

    const parsed = JSON.parse(raw);
    return {
      mouseSensitivity: Number.isFinite(parsed?.mouseSensitivity)
        ? Math.max(0.0001, Number(parsed.mouseSensitivity))
        : DEFAULT_MOUSE_SENSITIVITY,
      horizontalFov: Number.isFinite(parsed?.horizontalFov)
        ? THREE.MathUtils.clamp(Number(parsed.horizontalFov), 80, 120)
        : DEFAULT_HORIZONTAL_FOV,
      masterVolume: Number.isFinite(parsed?.masterVolume)
        ? THREE.MathUtils.clamp(Number(parsed.masterVolume), 0, 1)
        : DEFAULT_MASTER_VOLUME,
    };
  } catch {
    return {
      mouseSensitivity: DEFAULT_MOUSE_SENSITIVITY,
      horizontalFov: DEFAULT_HORIZONTAL_FOV,
      masterVolume: DEFAULT_MASTER_VOLUME,
    };
  }
}

function persistSettings({ mouseSensitivity, horizontalFov, masterVolume }) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
      mouseSensitivity: Math.max(0.0001, Number(mouseSensitivity ?? DEFAULT_MOUSE_SENSITIVITY)),
      horizontalFov: THREE.MathUtils.clamp(Number(horizontalFov ?? DEFAULT_HORIZONTAL_FOV), 80, 120),
      masterVolume: THREE.MathUtils.clamp(Number(masterVolume ?? DEFAULT_MASTER_VOLUME), 0, 1),
    }));
  } catch {
    // Ignore localStorage write failures.
  }
}

function getMovementTraceUploadUrl(serverUrl) {
  if (!serverUrl) {
    return null;
  }

  try {
    const url = new URL(serverUrl);
    url.protocol = url.protocol === 'wss:' ? 'https:' : 'http:';
    url.pathname = '/debug/movement-trace';
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

function getSafeRate(value, divisor) {
  if (!Number.isFinite(value) || !Number.isFinite(divisor) || divisor <= 0) {
    return 0;
  }

  return value / divisor;
}

export class GameApp {
  constructor(root) {
    this.root = root;
    this.clock = new THREE.Clock();
    this.currentFps = 0;
    const storedSettings = loadStoredSettings();
    this.mouseSensitivity = storedSettings.mouseSensitivity;
    this.baseHorizontalFov = storedSettings.horizontalFov;
    this.networkJumpQueued = false;
    this.lastMovementTraceSampleAt = 0;
    this.movementTraceSamples = [];
    this.fatalErrorOverlay = new FatalErrorOverlay(this.root);
    this.localSimulationLoop = new FixedStepLoop(NETCODE_SIMULATION_STEP);
    this.audioManager = createGameAudioManager();
    this.audioManager.setMasterVolume(storedSettings.masterVolume);
    this.networkClient = new NetworkClient();
    this.gameplayNetworking = new GameplayNetworkingCoordinator(this.networkClient);
    this.damageVignette = 0;
    this.damageIndicators = {
      front: 0,
      right: 0,
      back: 0,
      left: 0,
    };
    this.hitDamagePopups = [];
    this.killfeedEntries = [];
    this.roundKillCounts = new Map();
    this.selectedTeam = null;
    this.selectedPlayerName = loadStoredPlayerName();
    this.selectedGamemode = GAMEMODES.DEBUG;
    this.hudMode = loadStoredHudMode();
    this.lastLocalPlayerAlive = true;
    this.lastObjectiveBombState = null;
    this.lastRoundWinReason = null;
    this.lastFreezeCountdownCue = null;
    this.lastFreezeTimeLeft = null;
    this.lastAmmoResetRoundKey = null;
    this.lastObservedRoundPhaseKey = null;
    this.lastLocalPlayerHasBomb = false;
    this.bombCarrierAnnouncementText = '';
    this.bombCarrierAnnouncementExpiresAt = 0;
    this.audioDebugState = {
      lastFootstep: null,
      lastWeapon: null,
    };
    Object.assign(HUD_LAYOUT_TUNING, loadHudLayoutTuning());

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c1218);
    this.scene.fog = new THREE.Fog(0x0c1218, 120, 320);
    this.debugController = new GameDebugController(this.scene);
    this.showCrouchFatigueDebug = false;
    this.showDamageNumbers = false;
    this.spectatorMode = 'none';
    this.spectatorTargetPlayerId = null;
    this.spectatorActivateAt = 0;
    this.activeSpectatorTargetState = null;
    this.remotePlayerPresenter = new RemotePlayerPresenter(this.scene);
    const initialMapId = MAP_OPTIONS[0].id;
    this.selectedSkyboxId = SKYBOX_OPTIONS[0].id;

    const initialAspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(
      this.horizontalToVerticalFov(this.baseHorizontalFov, initialAspect),
      initialAspect,
      0.1,
      500,
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.92;
    this.root.appendChild(this.renderer.domElement);
    this.debugMenu = createDebugMenu({
      container: this.root,
      onToggleHudMode: () => this.toggleHudMode(),
      onForceSideSwap: () => this.forceDebugSideSwap(),
      onToggleCrouchFatigueDebug: () => this.toggleCrouchFatigueDebug(),
      onToggleInfiniteAmmo: () => this.toggleInfiniteAmmoDebug(),
      getInfiniteAmmoEnabled: () => this.getInfiniteAmmoEnabled(),
      onToggleDamageNumbers: () => this.toggleDamageNumbers(),
      getDamageNumbersEnabled: () => this.showDamageNumbers,
    });
    applyHudLayoutTuningToRoot();
    this.hudLayoutTuningPanel = createHudLayoutTuningPanel();
    this.movementTuningPanel = createMovementTuningPanel();
    this.remoteAudioTuningPanel = createRemoteAudioTuningPanel();
    this.pauseController = new GamePauseController({
      renderer: this.renderer,
      audioManager: this.audioManager,
    });
    this.sessionController = new GameSessionController({
      scene: this.scene,
      camera: this.camera,
      input: null,
      audioManager: this.audioManager,
      pauseController: this.pauseController,
      debugController: this.debugController,
      gameplayNetworking: this.gameplayNetworking,
      networkClient: this.networkClient,
    });
    this.selectedMapId = initialMapId;
    this.skyboxManager = new SkyboxManager(this.scene, this.renderer);
    this.setSkybox(this.selectedSkyboxId);

    this.input = new InputManager(this.renderer.domElement);
    this.sessionController.input = this.input;

    this.scene.add(createGameLighting());
    this.rebuildHud();
    void this.loadMap(this.selectedMapId);
    scheduleAppWarmup({
      preloadMapOptions,
      preloadNavigationModules,
      preloadSkyboxModules,
    });

    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
  }

  start() {
    window.addEventListener('resize', this.onResize);
    this.renderer.setAnimationLoop(this.animate);
  }

  stop() {
    window.removeEventListener('resize', this.onResize);
    this.renderer.setAnimationLoop(null);
  }

  get runtime() {
    return this.sessionController.runtime;
  }

  get selectedMapId() {
    return this.sessionController.selectedMapId;
  }

  set selectedMapId(value) {
    this.sessionController.selectedMapId = value;
  }

  get authoritativeNetworkingEnabled() {
    return this.sessionController.authoritativeNetworkingEnabled;
  }

  get isLoadingMap() {
    return this.sessionController.isLoadingMap;
  }

  get loadingStatus() {
    return this.sessionController.loadingStatus;
  }

  destroy() {
    this.stop();
    this.input.destroy();
    this.hud.destroy();
    this.fatalErrorOverlay.destroy();
    this.remotePlayerPresenter.destroy();
    this.unloadMap();
    this.skyboxManager.dispose();
    this.networkClient.destroy();
    this.audioManager.destroy();
    this.debugController.destroy();
    this.debugMenu?.destroy?.();
    this.hudLayoutTuningPanel?.destroy?.();
    this.movementTuningPanel?.destroy?.();
    this.remoteAudioTuningPanel?.destroy?.();
    this.renderer.dispose();
  }

  rebuildHud() {
    this.hud?.destroy();
    this.hud = createHud({
      container: this.root,
      input: this.input,
      roundManager: this.runtime?.roundManager ?? null,
      weaponManager: this.runtime?.weaponManager ?? null,
      utilityManager: this.runtime?.utilityManager ?? null,
      networkClient: this.networkClient,
      playerController: this.runtime?.playerController ?? null,
      getDamageVignette: () => this.damageVignette,
      getDamageIndicators: () => this.damageIndicators,
      getHitDamagePopups: () => this.hitDamagePopups,
      getRoundMvpText: () => this.getRoundMvpText(),
      getFps: () => this.currentFps,
      getMasterVolume: () => this.audioManager.getMasterVolume(),
      getMouseSensitivity: () => this.mouseSensitivity,
      getHorizontalFov: () => this.baseHorizontalFov,
      onResume: () => this.resumeGame(),
      onSelectTeam: (team, playerName) => void this.selectTeam(team, playerName),
      onToggleHudMode: () => this.toggleHudMode(),
      onSelectMap: (mapId) => this.loadMap(mapId),
      onSelectGamemode: (gamemodeId) => this.selectGamemode(gamemodeId),
      onSensitivityChange: (value) => this.setMouseSensitivity(value),
      onFovChange: (value) => this.setHorizontalFov(value),
      onVolumeChange: (volume) => this.setMasterVolume(volume),
      maps: MAP_OPTIONS,
      gamemodes: GAMEMODE_OPTIONS,
      getSelectedMapId: () => this.selectedMapId,
      getSelectedGamemodeId: () => this.getActiveGamemode(),
      getSelectedTeam: () => this.selectedTeam,
      getSelectedPlayerName: () => this.selectedPlayerName,
      getHudMode: () => this.hudMode,
      getIsLoading: () => this.isLoadingMap,
      getLoadingStatus: () => this.loadingStatus,
      getKillfeedEntries: () => this.killfeedEntries,
      getIgnoreLocalCorrections: () => this.debugController.getIgnoreLocalCorrections(),
      getIsMovementTraceRecording: () => this.debugController.isMovementTraceRecording(),
      getShowCrouchFatigueDebug: () => this.showCrouchFatigueDebug,
      getSpectatorState: () => this.getSpectatorUiState(),
      getAnnouncementText: () => this.getHudAnnouncementText(),
      consumeMarkDebugSnapshotRequested: () => this.debugController.consumeMarkDebugSnapshotRequested(),
      onSelectSkybox: (skyboxId) => this.setSkybox(skyboxId),
      skyboxes: SKYBOX_OPTIONS,
      getSelectedSkyboxId: () => this.selectedSkyboxId,
    });
    this.pauseController.attachHud(this.hud);
  }

  unloadMap() {
    this.lastObjectiveBombState = null;
    this.lastRoundWinReason = null;
    this.lastAmmoResetRoundKey = null;
    this.lastObservedRoundPhaseKey = null;
    this.roundKillCounts.clear();
    this.lastLocalPlayerHasBomb = false;
    this.bombCarrierAnnouncementText = '';
    this.bombCarrierAnnouncementExpiresAt = 0;
    this.sessionController.unloadCurrentRuntime({
      remotePlayerPresenter: this.remotePlayerPresenter,
    });
  }

  updateRoundStartResets() {
    const roundState = this.networkClient.getRoundState?.() ?? this.runtime?.roundManager ?? null;
    if (!roundState) {
      this.lastAmmoResetRoundKey = null;
      return;
    }

    if (String(roundState.phase ?? '') !== 'freeze') {
      return;
    }

    const roundKey = `${Number(roundState.roundNumber ?? 0)}:${String(roundState.phase ?? '')}`;
    if (this.lastAmmoResetRoundKey === roundKey) {
      return;
    }

    this.lastAmmoResetRoundKey = roundKey;
    this.roundKillCounts.clear();
    this.runtime?.weaponManager?.refillAllAmmo?.();
  }

  getRoundMvpText() {
    const roundState = this.networkClient.getRoundState?.() ?? this.runtime?.roundManager ?? null;
    const winnerTeam = String(roundState?.winnerTeam ?? '');
    if (!winnerTeam || this.roundKillCounts.size === 0) {
      return '';
    }

    let bestPlayerId = null;
    let bestKills = -1;
    let bestDeaths = Infinity;
    let bestName = '';
    for (const [playerId, kills] of this.roundKillCounts.entries()) {
      const scoreboardPlayer = this.networkClient.getScoreboardPlayer?.(playerId) ?? null;
      if (!scoreboardPlayer || String(scoreboardPlayer.team ?? '') !== winnerTeam) {
        continue;
      }
      const resolvedKills = Number(kills ?? 0);
      const resolvedDeaths = Number(scoreboardPlayer.deaths ?? 0);
      const resolvedName = String(scoreboardPlayer.displayName ?? playerId);
      if (
        resolvedKills > bestKills
        || (resolvedKills === bestKills && resolvedDeaths < bestDeaths)
        || (resolvedKills === bestKills && resolvedDeaths === bestDeaths && resolvedName.localeCompare(bestName) < 0)
      ) {
        bestPlayerId = playerId;
        bestKills = resolvedKills;
        bestDeaths = resolvedDeaths;
        bestName = resolvedName;
      }
    }

    if (!bestPlayerId || bestKills <= 0) {
      return '';
    }

    return `MVP: ${bestName} for most kills`;
  }

  updateRoundTransitionAnnouncements() {
    const roundState = this.networkClient.getRoundState?.() ?? this.runtime?.roundManager ?? null;
    const localPlayerHasBomb = Boolean(this.runtime?.utilityManager?.getHudState?.()?.localPlayerHasBomb);
    if (!roundState) {
      this.lastObservedRoundPhaseKey = null;
      this.lastLocalPlayerHasBomb = localPlayerHasBomb;
      return;
    }

    const roundNumber = Number(roundState.roundNumber ?? 0);
    const phase = String(roundState.phase ?? '');
    const phaseKey = `${roundNumber}:${phase}`;
    const previousPhaseKey = this.lastObservedRoundPhaseKey;
    this.lastObservedRoundPhaseKey = phaseKey;

    if (previousPhaseKey === `${roundNumber}:freeze` && phase === 'live') {
      if (localPlayerHasBomb) {
        this.bombCarrierAnnouncementText = 'You have the bomb';
        this.bombCarrierAnnouncementExpiresAt = performance.now() + BOMB_CARRIER_ANNOUNCEMENT_MS;
      }
    }
    if (!this.lastLocalPlayerHasBomb && localPlayerHasBomb) {
      this.bombCarrierAnnouncementText = 'You have the bomb';
      this.bombCarrierAnnouncementExpiresAt = performance.now() + BOMB_CARRIER_ANNOUNCEMENT_MS;
    }
    this.lastLocalPlayerHasBomb = localPlayerHasBomb;
  }

  getHudAnnouncementText() {
    if (
      !this.bombCarrierAnnouncementText
      || performance.now() >= Number(this.bombCarrierAnnouncementExpiresAt ?? 0)
    ) {
      return '';
    }

    return this.bombCarrierAnnouncementText;
  }

  updateObjectiveAudioCues() {
    const objectiveState = this.networkClient.getObjectiveState?.() ?? null;
    const nextBombState = String(objectiveState?.bombState ?? '');
    if (this.lastObjectiveBombState && this.lastObjectiveBombState !== 'planted' && nextBombState === 'planted') {
      void this.audioManager.play('bomb-planted', {
        baseVolume: 0.85,
      });
    }
    this.lastObjectiveBombState = nextBombState || null;
  }

  updateRoundResultAudioCues() {
    const roundState = this.networkClient.getRoundState?.() ?? null;
    const nextWinReason = roundState?.roundEnded ? String(roundState?.winReason ?? '') : null;
    if (this.lastRoundWinReason !== 'bomb-defused' && nextWinReason === 'bomb-defused') {
      void this.audioManager.play('bomb-defused', {
        baseVolume: 0.85,
      });
    }
    this.lastRoundWinReason = nextWinReason;
  }

  updateFreezeCountdownAudioCues() {
    const roundState = this.networkClient.getRoundState?.() ?? this.runtime?.roundManager ?? null;
    if (!roundState || !isCompetitiveGamemode(roundState.gamemode) || roundState.phase !== 'freeze') {
      this.lastFreezeCountdownCue = null;
      this.lastFreezeTimeLeft = null;
      return;
    }

    const timeLeft = Math.max(0, Number(roundState.freezeDuration ?? 0) - Number(roundState.phaseTime ?? 0));
    const previousTimeLeft = Number(this.lastFreezeTimeLeft ?? (timeLeft + 1));
    let cueSecond = 0;
    for (const [displaySecond, threshold] of [[3, 3], [2, 2], [1, 1]]) {
      if (previousTimeLeft > threshold && timeLeft <= threshold) {
        cueSecond = displaySecond;
        break;
      }
    }
    this.lastFreezeTimeLeft = timeLeft;
    if (cueSecond < 1 || this.lastFreezeCountdownCue === cueSecond) {
      return;
    }

    this.lastFreezeCountdownCue = cueSecond;
    void this.audioManager.play('round-freeze-clock', {
      baseVolume: 0.72,
    });
  }

  playReplicatedAudioEvents() {
    const listenerTransform = this.getActiveViewTransform();
    const listenerPosition = listenerTransform?.position ?? null;
    const listenerYaw = Number(listenerTransform?.yaw ?? 0);
    const localMapId = this.networkClient.getLocalPlayerState?.()?.mapId ?? this.selectedMapId ?? null;

    for (const event of this.networkClient.consumeAudioEvents?.() ?? []) {
      if (!event?.soundKey) {
        continue;
      }
      if (event.sourcePlayerId && event.sourcePlayerId === this.networkClient.playerId) {
        continue;
      }
      if (localMapId && event.mapId && event.mapId !== localMapId) {
        continue;
      }

      const emitterPosition = event?.type === 'footstep' && listenerPosition
        ? {
          x: Number(event.position?.x ?? 0),
          y: Number(listenerPosition.y ?? 0),
          z: Number(event.position?.z ?? 0),
        }
        : event.position;
      const footstepTuning = REMOTE_AUDIO_TUNING.footstep;
      const baseVolume = event?.type === 'footstep'
        ? Number(footstepTuning.baseVolume ?? event.baseVolume ?? 1)
        : Number(event.baseVolume ?? 1);
      const minDistance = event?.type === 'footstep'
        ? Number(footstepTuning.minDistance ?? event.minDistance ?? 1.5)
        : Number(event.minDistance ?? 1.5);
      const maxDistance = event?.type === 'footstep'
        ? Number(footstepTuning.maxDistance ?? event.maxDistance ?? 24)
        : Number(event.maxDistance ?? 24);
      const attenuationHoldExponent = event?.type === 'footstep'
        ? Number(footstepTuning.attenuationHoldExponent ?? event.attenuationHoldExponent ?? 0.6)
        : (event.attenuationHoldExponent == null ? undefined : Number(event.attenuationHoldExponent));
      const attenuationCutoffStart = event?.type === 'footstep'
        ? Number(footstepTuning.attenuationCutoffStart ?? event.attenuationCutoffStart ?? 0.82)
        : (event.attenuationCutoffStart == null ? undefined : Number(event.attenuationCutoffStart));
      const attenuationCutoffExponent = event?.type === 'footstep'
        ? Number(footstepTuning.attenuationCutoffExponent ?? event.attenuationCutoffExponent ?? 3.2)
        : (event.attenuationCutoffExponent == null ? undefined : Number(event.attenuationCutoffExponent));
      const panningModel = event?.type === 'footstep' ? 'HRTF' : 'HRTF';
      const rolloffFactor = event?.type === 'footstep'
        ? Number(event.rolloffFactor ?? 0.03)
        : Number(event.rolloffFactor ?? event.rolloffExponent ?? 1);
      const manualVolume = this.audioManager.getAttenuatedVolume({
        baseVolume,
        listenerPosition,
        emitterPosition,
        minDistance,
        maxDistance,
        rolloffExponent: Number(event.rolloffExponent ?? 1.6),
        attenuationHoldExponent,
        attenuationCutoffStart,
        attenuationCutoffExponent,
      });
      const spatialMix = this.audioManager.getSpatialMix({
        listenerPosition,
        listenerYaw,
        emitterPosition,
      });
      const distance = listenerPosition && emitterPosition
        ? Math.hypot(
          Number(emitterPosition.x ?? 0) - Number(listenerPosition.x ?? 0),
          Number(emitterPosition.y ?? 0) - Number(listenerPosition.y ?? 0),
          Number(emitterPosition.z ?? 0) - Number(listenerPosition.z ?? 0),
        )
        : 0;
      const audioDebugEntry = {
        eventType: String(event?.type ?? 'unknown'),
        soundKey: String(event?.soundKey ?? 'unknown'),
        distance,
        baseVolume,
        manualVolume,
        spatialVolumeMultiplier: Number(spatialMix.volumeMultiplier ?? 1),
        finalVolume: manualVolume * Number(spatialMix.volumeMultiplier ?? 1),
        minDistance,
        maxDistance,
        rolloffFactor,
        panningModel,
        recordedAt: performance.now(),
      };
      if (event?.type === 'footstep') {
        this.audioDebugState.lastFootstep = audioDebugEntry;
      } else if (event?.type === 'weapon-fire') {
        this.audioDebugState.lastWeapon = audioDebugEntry;
      }
      this.networkClient.setAudioDebugState(this.audioDebugState);

      void this.audioManager.playAtPosition(event.soundKey, {
        baseVolume,
        listenerPosition,
        listenerYaw,
        emitterPosition,
        minDistance,
        maxDistance,
        rolloffExponent: Number(event.rolloffExponent ?? 1.6),
        attenuationHoldExponent,
        attenuationCutoffStart,
        attenuationCutoffExponent,
        playback: event.playback ?? undefined,
        minIntervalMs: Number(event.minIntervalMs ?? 0),
        pitchMin: Number(event.pitchMin ?? 1),
        pitchMax: Number(event.pitchMax ?? 1),
        duration: event.duration,
        panningModel,
        rolloffFactor,
      });
    }
  }

  updateAudioListener() {
    const listenerTransform = this.getActiveViewTransform();
    const listenerPosition = listenerTransform?.position
      ?? this.runtime?.playerController?.position
      ?? null;
    this.audioManager.setListenerTransform({
      position: listenerPosition,
      yaw: Number(listenerTransform?.yaw ?? this.runtime?.playerController?.yawAngle ?? 0),
      pitch: Number(listenerTransform?.pitch ?? this.runtime?.playerController?.pitchAngle ?? 0),
    });
  }

  toggleHudMode() {
    this.hudMode = this.hudMode === 'classic' ? 'debug' : 'classic';
    persistHudMode(this.hudMode);
    this.rebuildHud();
  }

  getActiveGamemode() {
    return this.networkClient.getRoundState?.()?.gamemode ?? this.selectedGamemode;
  }

  syncGamemodeSelection({ resetMatch = false } = {}) {
    const nextGamemode = sanitizeGamemodeForMap(this.selectedGamemode, this.selectedMapId);
    this.selectedGamemode = nextGamemode;

    if (!this.runtime?.playerController) {
      return false;
    }

    if (this.getGameplaySyncEnabled()) {
      return this.networkClient.sendGamemodeChange({
        gamemode: nextGamemode,
        mapId: this.selectedMapId,
        resetMatch,
      });
    }

    this.runtime.roundManager.resetMatch(nextGamemode);
    this.runtime.utilityManager?.resetRoundState?.();
    this.runtime.weaponManager?.refillAllAmmo?.();
    if (this.selectedTeam) {
      this.runtime.playerController.spawnAt(this.runtime.getSpawnStateForTeam(this.selectedTeam));
    }
    this.networkJumpQueued = false;
    this.localSimulationLoop.accumulator = 0;
    this.rebuildHud();
    return true;
  }

  selectGamemode(gamemodeId) {
    this.selectedGamemode = sanitizeGamemodeForMap(gamemodeId, this.selectedMapId);
    this.syncGamemodeSelection({ resetMatch: true });
    this.rebuildHud();
  }

  toggleFlyMode() {
    if (!this.runtime?.playerController) {
      return;
    }

    const nextMode = this.runtime.playerController.toggleFlyMode();
    this.networkJumpQueued = false;
    this.localSimulationLoop.accumulator = 0;

    if (nextMode === 'fly') {
      this.gameplayNetworking.syncCombatNetworkingMode({
        authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
        playerController: this.runtime.playerController,
        weaponManager: this.runtime.weaponManager,
      });
      this.networkClient.suspendGameplaySync({ preserveRemotePlayers: true });
      return;
    }

    if (this.authoritativeNetworkingEnabled) {
      this.gameplayNetworking.syncLocalPlayer({
        authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
        mapId: this.selectedMapId,
        team: this.selectedTeam ?? TEAMS.ATTACKERS,
        displayName: this.selectedPlayerName,
        playerController: this.runtime.playerController,
        weaponManager: this.runtime.weaponManager,
      });
    }
    this.gameplayNetworking.syncCombatNetworkingMode({
      authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
      playerController: this.runtime.playerController,
      weaponManager: this.runtime.weaponManager,
    });
  }

  getCurrentPlayerPosition() {
    return this.debugController.getCurrentPlayerPosition(
      this.runtime?.playerController ?? null,
      this.selectedMapId,
    );
  }

  logCurrentPosition() {
    this.debugController.logCurrentPosition(this.runtime?.playerController ?? null, this.selectedMapId);
  }

  saveDebugMarker() {
    this.debugController.saveDebugMarker(this.runtime?.playerController ?? null, this.selectedMapId);
  }

  dumpDebugMarkers() {
    this.debugController.dumpDebugMarkers();
  }

  async loadMap(mapId) {
    this.networkJumpQueued = false;
    this.selectedTeam = null;
    this.selectedGamemode = sanitizeGamemodeForMap(this.selectedGamemode, mapId);
    await this.sessionController.loadMap(mapId, {
      mouseSensitivity: this.mouseSensitivity,
      localSimulationLoop: this.localSimulationLoop,
      remotePlayerPresenter: this.remotePlayerPresenter,
      onRuntimeCleared: () => {
        this.networkJumpQueued = false;
      },
      onRuntimeActivated: () => {
        this.networkJumpQueued = false;
        this.input.clearGameplayState();
        this.runtime?.weaponManager?.refillAllAmmo?.();
        this.pauseController.pause(this.localSimulationLoop, {
          mode: 'team-select',
          canResume: false,
        });
        this.rebuildHud();
      },
      onLoadStateChanged: () => {
        this.rebuildHud();
      },
    });
  }

  async setSkybox(skyboxId) {
    const skybox = getSkyboxOption(skyboxId);
    if (!skybox) {
      return;
    }

    this.selectedSkyboxId = skybox.id;
    await this.skyboxManager.setSkybox(skybox.path, {
      backgroundIntensity: 0.92,
      environmentIntensity: 0.65,
    });
  }

  setMouseSensitivity(value) {
    this.mouseSensitivity = Math.max(0.0001, value);
    this.runtime?.playerController?.setMouseSensitivity(this.mouseSensitivity);
    this.persistRuntimeSettings();
  }

  setMasterVolume(volume) {
    this.audioManager.setMasterVolume(volume);
    this.persistRuntimeSettings();
  }

  horizontalToVerticalFov(horizontalDegrees, aspect = this.camera?.aspect ?? (window.innerWidth / window.innerHeight)) {
    const horizontalRadians = THREE.MathUtils.degToRad(horizontalDegrees);
    const verticalRadians = 2 * Math.atan(Math.tan(horizontalRadians / 2) / Math.max(aspect, 0.0001));
    return THREE.MathUtils.radToDeg(verticalRadians);
  }

  setHorizontalFov(horizontalDegrees) {
    this.baseHorizontalFov = THREE.MathUtils.clamp(horizontalDegrees, 80, 120);
    const verticalFov = this.horizontalToVerticalFov(this.baseHorizontalFov);
    this.camera.fov = verticalFov;
    this.camera.updateProjectionMatrix();
    this.runtime?.weaponManager?.setBaseFov(verticalFov);
    this.runtime?.playerController?.setBaseFov(verticalFov);
    this.persistRuntimeSettings();
  }

  persistRuntimeSettings() {
    persistSettings({
      mouseSensitivity: this.mouseSensitivity,
      horizontalFov: this.baseHorizontalFov,
      masterVolume: this.audioManager.getMasterVolume(),
    });
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.fov = this.horizontalToVerticalFov(this.baseHorizontalFov, this.camera.aspect);
    this.camera.updateProjectionMatrix();
    this.runtime?.weaponManager?.setBaseFov(this.camera.fov);
    this.runtime?.playerController?.setBaseFov(this.camera.fov);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  updateFrameStats(delta) {
    this.damageVignette = Math.max(0, this.damageVignette - delta * 1.8);
    this.damageIndicators.front = Math.max(0, this.damageIndicators.front - delta * 2.8);
    this.damageIndicators.right = Math.max(0, this.damageIndicators.right - delta * 2.8);
    this.damageIndicators.back = Math.max(0, this.damageIndicators.back - delta * 2.8);
    this.damageIndicators.left = Math.max(0, this.damageIndicators.left - delta * 2.8);
    this.hitDamagePopups = this.hitDamagePopups
      .map((popup) => ({
        ...popup,
        life: popup.life - delta,
      }))
      .filter((popup) => popup.life > 0);
    this.currentFps = delta > 0 ? Math.round(1 / delta) : 0;
  }

  handleGlobalHotkeys(frameInput) {
    const teamSelectActive = this.pauseController.isInMode('team-select');

    if (frameInput.justPressed.has('Escape')) {
      void this.pauseController.toggle({
        isLoadingMap: this.isLoadingMap,
        localSimulationLoop: this.localSimulationLoop,
      });
    }

    if (teamSelectActive) {
      return;
    }

    if (frameInput.justPressed.has('F9')) {
      this.debugController.toggleIgnoreLocalCorrections();
    }

    if (frameInput.justPressed.has('F10')) {
      const recording = this.debugController.toggleMovementTraceRecording();
      if (recording) {
        this.movementTraceSamples = [];
      } else {
        this.flushMovementTrace();
      }
      this.lastMovementTraceSampleAt = 0;
    }

    if (frameInput.justPressed.has('F3')) {
      this.remotePlayerPresenter.toggleHitVolumeDebug();
    }

    if (frameInput.justPressed.has('KeyV')) {
      this.toggleFlyMode();
    }

    if (frameInput.justPressed.has('KeyJ')) {
      this.logCurrentPosition();
    }

    if (frameInput.justPressed.has('KeyK')) {
      this.saveDebugMarker();
    }

    if (frameInput.justPressed.has('KeyL')) {
      this.dumpDebugMarkers();
    }

    if (frameInput.justPressed.has('KeyB')) {
      this.debugController.toggleCollisionDebug(this.runtime?.map?.collisionGeometry ?? null);
    }
  }

  hasActiveRuntime() {
    return !this.isLoadingMap && Boolean(this.runtime?.playerController);
  }

  getGameplaySyncEnabled() {
    return this.gameplayNetworking.isGameplaySyncEnabled({
      authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
      playerController: this.runtime?.playerController ?? null,
    });
  }

  forceDebugSideSwap() {
    if (!this.runtime?.roundManager) {
      return false;
    }

    if (this.getGameplaySyncEnabled()) {
      return this.networkClient.sendDebugRoundControl({
        action: 'force-side-swap',
      });
    }

    this.runtime.roundManager.startDebugSideSwapIntermission();
    this.rebuildHud();
    return true;
  }

  syncCombatNetworkingMode() {
    this.gameplayNetworking.syncCombatNetworkingMode({
      authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
      playerController: this.runtime?.playerController ?? null,
      weaponManager: this.runtime?.weaponManager ?? null,
    });
  }

  queueJumpIfRequested(frameInput) {
    if (frameInput.justPressed.has('Space')) {
      this.networkJumpQueued = true;
    }
  }

  getFreezeLockedMovementInput(movementInput) {
    return {
      ...movementInput,
      forward: false,
      backward: false,
      left: false,
      right: false,
      sprint: false,
      walk: false,
      crouch: false,
      jump: false,
    };
  }

  runLocalSimulation(delta, frameInput, localPlayerAlive) {
    if (this.pauseController.isPaused) {
      return;
    }

    this.syncCombatNetworkingMode();
    this.runtime.playerController.updateLook(frameInput.lookDelta);
    this.runtime.utilityManager.syncFrameInput(frameInput, this.runtime.weaponManager);

    if (!localPlayerAlive) {
      this.localSimulationLoop.accumulator = 0;
      this.networkJumpQueued = false;
      return;
    }

    this.localSimulationLoop.advance(delta, (simulationStep) => {
      const rawMovementInput = this.runtime.playerController.getMovementInputSnapshot({
        jumpPressed: this.networkJumpQueued,
      });
      const freezeLocked = isCompetitiveGamemode(this.runtime.roundManager?.gamemode)
        && this.runtime.roundManager?.phase === 'freeze';
      const movementInput = freezeLocked
        ? this.getFreezeLockedMovementInput(rawMovementInput)
        : rawMovementInput;
      const speedMultiplier = this.runtime.playerController.getCurrentSpeedMultiplier();

      this.runtime.playerController.stepSimulation(simulationStep, movementInput, speedMultiplier);
      if (this.getGameplaySyncEnabled()) {
        this.networkClient.sampleLocalInput(movementInput, {
          simulationStep,
          speedMultiplier,
          predictedPosition: this.runtime.playerController.position,
          activeWeaponKey: this.runtime.weaponManager.activeWeaponKey,
        });
      }

      this.networkJumpQueued = false;
    });

    const weaponInputBlockState = this.runtime.utilityManager.getWeaponInputBlockState({
      roundManager: this.runtime.roundManager,
      localPlayerAlive,
    });
    this.runtime.weaponManager.update(delta, frameInput, weaponInputBlockState);
    this.gameplayNetworking.syncWeaponStatusIfNeeded({
      authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
      playerController: this.runtime.playerController,
      weaponManager: this.runtime.weaponManager,
    });
  }

  updateWorldSimulation(delta, frameInput) {
    this.runtime?.weaponManager?.setInfiniteAmmoEnabled?.(this.getInfiniteAmmoEnabled());
    if (this.authoritativeNetworkingEnabled) {
      const authoritativeRoundState = this.networkClient.getRoundState?.();
      if (authoritativeRoundState) {
        this.runtime.roundManager.applySnapshot(authoritativeRoundState);
      }
    } else {
      this.runtime.roundManager.update(delta);
    }

    this.runtime.utilityManager.update(delta, {
      input: this.input,
      frameInput,
      playerController: this.runtime.playerController,
      roundManager: this.runtime.roundManager,
      networkClient: this.networkClient,
      selectedTeam: this.selectedTeam,
      weaponManager: this.runtime.weaponManager,
    });
    this.updateFreezeCountdownAudioCues();
    this.updateObjectiveAudioCues();
    this.updateRoundResultAudioCues();
  }

  updateNetworkState(delta) {
    this.pruneKillfeedEntries();
    if (this.getGameplaySyncEnabled()) {
      this.networkClient.update(delta);
      this.playReplicatedAudioEvents();
      this.gameplayNetworking.handleCombatEvents({
        remotePlayerPresenter: this.remotePlayerPresenter,
        utilityManager: this.runtime?.utilityManager ?? null,
        getPopupId: () => `${performance.now()}-${Math.random()}`,
        onCombatEvent: (event) => {
          this.handleCombatEventForUi(event);
        },
        onLocalPlayerDamageDealt: (popup) => {
          if (this.showDamageNumbers) {
            this.hitDamagePopups.push(popup);
          }
        },
        onLocalPlayerHit: () => {
          this.damageVignette = Math.min(1, this.damageVignette + 0.55);
        },
        onLocalPlayerDamageTaken: (event) => {
          this.registerDamageIndicator(event);
        },
      });

      const authoritativeCorrection = this.networkClient.consumeLocalCorrection();
      if (authoritativeCorrection && !this.debugController.getIgnoreLocalCorrections()) {
        this.runtime.playerController.reconcileAuthoritativeState(authoritativeCorrection);
      }
      return;
    }

    this.networkClient.suspendGameplaySync({
      preserveRemotePlayers: this.runtime.playerController.getMovementMode?.() === 'fly',
    });
  }

  handleCombatEventForUi(event) {
    if (event?.type !== 'player-hit' || !event?.killed) {
      return;
    }

    const attackerPlayerId = String(event.attackerPlayerId ?? '');
    if (attackerPlayerId) {
      this.roundKillCounts.set(
        attackerPlayerId,
        Number(this.roundKillCounts.get(attackerPlayerId) ?? 0) + 1,
      );
    }

    const attacker = this.networkClient.getScoreboardPlayer?.(event.attackerPlayerId) ?? null;
    const victim = this.networkClient.getScoreboardPlayer?.(event.victimPlayerId) ?? null;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const localPlayerId = String(this.networkClient.playerId ?? '');
    const entry = {
      id: `${now}-${Math.random()}`,
      attackerName: String(attacker?.displayName ?? event.attackerPlayerId ?? 'Player'),
      attackerTeam: String(attacker?.team ?? ''),
      victimName: String(victim?.displayName ?? event.victimPlayerId ?? 'Player'),
      victimTeam: String(victim?.team ?? ''),
      weaponKey: String(event.weaponKey ?? 'rifle'),
      headshot: String(event.hitZone ?? '') === 'head',
      isLocalKill: localPlayerId.length > 0 && String(event.attackerPlayerId ?? '') === localPlayerId,
      isLocalDeath: localPlayerId.length > 0 && String(event.victimPlayerId ?? '') === localPlayerId,
      expiresAt: now + KILLFEED_ENTRY_LIFETIME_MS,
    };

    this.killfeedEntries = [entry, ...this.killfeedEntries].slice(0, 5);
  }

  pruneKillfeedEntries() {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this.killfeedEntries = this.killfeedEntries.filter((entry) => Number(entry?.expiresAt ?? 0) > now);
  }

  registerDamageIndicator(event) {
    const direction = this.getDamageIndicatorDirection(event);
    if (!direction) {
      return;
    }

    this.damageIndicators[direction] = Math.max(
      Number(this.damageIndicators[direction] ?? 0),
      1,
    );
  }

  getDamageIndicatorDirection(event) {
    const attackerPlayerId = String(event?.attackerPlayerId ?? '');
    if (!attackerPlayerId) {
      return null;
    }

    const playerController = this.runtime?.playerController;
    if (!playerController) {
      return null;
    }

    const attacker = this.networkClient.getRemotePlayers()
      .find((candidate) => candidate?.playerId === attackerPlayerId);
    const attackerPosition = attacker?.position;
    if (!attackerPosition) {
      return null;
    }

    const deltaX = Number(attackerPosition.x ?? 0) - Number(playerController.position.x ?? 0);
    const deltaZ = Number(attackerPosition.z ?? 0) - Number(playerController.position.z ?? 0);
    const length = Math.hypot(deltaX, deltaZ);
    if (length <= 1e-5) {
      return null;
    }

    const dirX = deltaX / length;
    const dirZ = deltaZ / length;
    const yaw = Number(playerController.yawAngle ?? 0);
    const forwardX = -Math.sin(yaw);
    const forwardZ = -Math.cos(yaw);
    const rightX = Math.cos(yaw);
    const rightZ = -Math.sin(yaw);
    const forwardDot = (dirX * forwardX) + (dirZ * forwardZ);
    const rightDot = (dirX * rightX) + (dirZ * rightZ);

    if (Math.abs(forwardDot) >= Math.abs(rightDot)) {
      return forwardDot >= 0 ? 'front' : 'back';
    }

    return rightDot >= 0 ? 'right' : 'left';
  }

  updatePlayerPresentation(delta) {
    this.runtime.playerController.updatePresentation(
      delta,
      this.localSimulationLoop.accumulator / NETCODE_SIMULATION_STEP,
    );
  }

  updateTargets(delta) {
    this.runtime.targetManager.update(delta, {
      playerPosition: this.runtime.playerController.position,
      playerEyePosition: this.runtime.playerController.getEyePosition(),
      collisionWorld: this.runtime.collisionWorld,
      navigationManager: this.runtime.navigationManager,
    });
  }

  updateEffects(delta) {
    this.runtime.effectsManager?.update?.(delta);
  }

  updateRemotePlayers(delta) {
    this.remotePlayerPresenter.setEffectsManager(this.runtime?.effectsManager ?? null);
    this.remotePlayerPresenter.setLocalPlayerId(this.networkClient.playerId ?? null);
    this.remotePlayerPresenter.setSpectatorTargetPlayerId(this.spectatorMode === 'teammate' ? this.spectatorTargetPlayerId : null);
    if (this.authoritativeNetworkingEnabled) {
      this.remotePlayerPresenter.syncPlayers(
        this.networkClient.getRemotePlayers(),
        this.networkClient.remotePlayerBuffers,
        delta,
      );
      return;
    }

    this.remotePlayerPresenter.clear();
  }

  updateGameplayFrame(delta, frameInput) {
    this.updateRoundStartResets();
    const localCombatState = this.networkClient.getLocalPlayerState?.();
    const authoritativeLocalTeam = localCombatState?.team;
    if (authoritativeLocalTeam === TEAMS.ATTACKERS || authoritativeLocalTeam === TEAMS.DEFENDERS) {
      this.selectedTeam = authoritativeLocalTeam;
    }
    const localPlayerAlive = localCombatState?.isAlive !== false;
    this.updateSpectatorState(frameInput, localPlayerAlive);
    if (!this.lastLocalPlayerAlive && localPlayerAlive) {
      this.runtime?.weaponManager?.refillAllAmmo?.();
    }
    this.lastLocalPlayerAlive = localPlayerAlive;

    if (this.pauseController.isPaused) {
      this.updateAudioListener();
      this.updateNetworkState(delta);
      this.updateEffects(delta);
      this.updatePlayerPresentation(delta);
      this.updateRemotePlayers(delta);
      this.applySpectatorView();
      return;
    }

    this.queueJumpIfRequested(frameInput);
    this.runLocalSimulation(delta, frameInput, localPlayerAlive);
    this.updateWorldSimulation(delta, frameInput);
    this.updateRoundTransitionAnnouncements();
    this.updateAudioListener();
    this.updateNetworkState(delta);
    this.updateEffects(delta);
    this.updatePlayerPresentation(delta);
    this.updateTargets(delta);
    this.updateRemotePlayers(delta);
    this.applySpectatorView();
    this.recordMovementTraceIfNeeded();
  }

  recordMovementTraceIfNeeded() {
    if (!this.debugController.isMovementTraceRecording()) {
      return;
    }

    if (!this.runtime?.playerController) {
      return;
    }

    const now = performance.now();
    if (now - this.lastMovementTraceSampleAt < 100) {
      return;
    }
    this.lastMovementTraceSampleAt = now;

    const movement = this.runtime.playerController.getDebugState();
    const network = this.networkClient.getDebugState();
    const correctionXZPerSnapshotMs = getSafeRate(
      movement.correctionDistanceXZ ?? 0,
      Math.max(0, network.snapshotAgeMs),
    );
    const correctionAlongVelocityPerSnapshotMs = getSafeRate(
      Math.abs(movement.correctionAlongVelocity ?? 0),
      Math.max(0, network.snapshotAgeMs),
    );
    this.movementTraceSamples.push({
      recordedAt: Date.now(),
      perfNow: now,
      mapId: this.selectedMapId,
      movement: {
        ...movement,
        correctionXZPerSnapshotMs,
        correctionAlongVelocityPerSnapshotMs,
      },
      network: {
        connectionState: network.connectionState,
        localMapId: network.localMapId,
        latestSequence: network.latestSequence,
        acknowledgedSequence: network.acknowledgedSequence,
        sequenceGap: network.sequenceGap,
        pendingInputCount: network.pendingInputCount,
        snapshotAgeMs: network.snapshotAgeMs,
        lastPredictedDriftDistance: network.lastPredictedDriftDistance,
        authoritativeUpdatesPerSecond: network.authoritativeUpdatesPerSecond,
      },
    });
  }

  flushMovementTrace() {
    const payload = {
      recordedAt: Date.now(),
      mapId: this.selectedMapId,
      samples: this.movementTraceSamples,
    };

    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.setItem(MOVEMENT_TRACE_STORAGE_KEY, JSON.stringify(payload));
      console.info(`[GameApp] Saved movement trace samples=${this.movementTraceSamples.length} to localStorage key "${MOVEMENT_TRACE_STORAGE_KEY}".`);
    } catch (error) {
      console.warn('[GameApp] Failed to persist movement trace.', error);
    }

    const uploadUrl = getMovementTraceUploadUrl(this.networkClient?.serverUrl);
    if (!uploadUrl || typeof fetch !== 'function') {
      return;
    }

    void fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `HTTP ${response.status}`);
        }

        const result = await response.json();
        console.info(`[GameApp] Wrote movement trace to ${result.filePath ?? 'debug file'}.`);
      })
      .catch((error) => {
        console.warn('[GameApp] Failed to write movement trace file.', error);
      });
  }

  animate() {
    try {
      const delta = Math.min(this.clock.getDelta(), 0.05);
      this.updateFrameStats(delta);
      const frameInput = this.input.consumeFrameState();
      this.handleGlobalHotkeys(frameInput);

      if (this.hasActiveRuntime()) {
        this.updateGameplayFrame(delta, frameInput);
      } else {
        this.remotePlayerPresenter.clear();
      }

      this.hud.update();
      const originalCameraMask = this.camera.layers.mask;
      const originalBackground = this.scene.background;
      this.renderer.clear();
      this.camera.layers.disable(VIEWMODEL_LAYER);
      this.renderer.render(this.scene, this.camera);
      this.renderer.clearDepth();
      this.scene.background = null;
      this.camera.layers.set(VIEWMODEL_LAYER);
      this.renderer.render(this.scene, this.camera);
      this.scene.background = originalBackground;
      this.camera.layers.mask = originalCameraMask;
    } catch (error) {
      this.stop();
      this.fatalErrorOverlay.show(error);
      console.error('Fatal runtime error in GameApp.animate()', error);
    }
  }

  pauseGame() {
    this.pauseController.pause(this.localSimulationLoop);
  }

  toggleCrouchFatigueDebug() {
    this.showCrouchFatigueDebug = !this.showCrouchFatigueDebug;
  }

  toggleDamageNumbers() {
    this.showDamageNumbers = !this.showDamageNumbers;
    if (!this.showDamageNumbers) {
      this.hitDamagePopups = [];
    }
  }

  getInfiniteAmmoEnabled() {
    return Boolean(this.networkClient.getGameplaySettings?.()?.infiniteAmmoEnabled ?? true);
  }

  toggleInfiniteAmmoDebug() {
    const nextEnabled = !this.getInfiniteAmmoEnabled();
    if (this.getGameplaySyncEnabled()) {
      this.networkClient.sendDebugRoundControl({
        action: 'set-infinite-ammo',
        enabled: nextEnabled,
      });
    }
    this.runtime?.weaponManager?.setInfiniteAmmoEnabled?.(nextEnabled);
  }

  clearSpectatorState() {
    this.spectatorMode = 'none';
    this.spectatorTargetPlayerId = null;
    this.spectatorActivateAt = 0;
    this.activeSpectatorTargetState = null;
  }

  getAliveTeammateSpectateCandidates() {
    const localTeam = String(this.networkClient.getLocalPlayerState?.()?.team ?? this.selectedTeam ?? '');
    return (this.networkClient.getRemotePlayers?.() ?? [])
      .filter((player) => player?.isAlive !== false && String(player?.team ?? '') === localTeam);
  }

  cycleSpectatorTarget(direction = 1) {
    const candidates = this.getAliveTeammateSpectateCandidates();
    if (candidates.length === 0) {
      this.spectatorTargetPlayerId = null;
      return;
    }

    const currentIndex = candidates.findIndex((candidate) => candidate.playerId === this.spectatorTargetPlayerId);
    const normalizedDirection = direction < 0 ? -1 : 1;
    const nextIndex = currentIndex >= 0
      ? (currentIndex + normalizedDirection + candidates.length) % candidates.length
      : 0;
    this.spectatorTargetPlayerId = candidates[nextIndex]?.playerId ?? null;
  }

  updateSpectatorState(frameInput, localPlayerAlive) {
    const now = performance.now();
    if (localPlayerAlive) {
      this.clearSpectatorState();
      return;
    }

    if (this.lastLocalPlayerAlive) {
      this.spectatorMode = 'pending';
      this.spectatorTargetPlayerId = null;
      this.spectatorActivateAt = now + SPECTATE_DELAY_MS;
      this.activeSpectatorTargetState = null;
    }

    if (this.spectatorMode === 'pending' && now < this.spectatorActivateAt) {
      this.activeSpectatorTargetState = null;
      return;
    }

    const candidates = this.getAliveTeammateSpectateCandidates();
    if (candidates.length === 0) {
      this.spectatorMode = 'waiting';
      this.spectatorTargetPlayerId = null;
      this.activeSpectatorTargetState = null;
      return;
    }

    this.spectatorMode = 'teammate';
    if (!candidates.some((candidate) => candidate.playerId === this.spectatorTargetPlayerId)) {
      this.spectatorTargetPlayerId = candidates[0]?.playerId ?? null;
    }

    if (frameInput.justPressed.has('ArrowLeft') || frameInput.mouseButtonsJustPressed.has(0)) {
      this.cycleSpectatorTarget(-1);
    } else if (frameInput.justPressed.has('ArrowRight') || frameInput.mouseButtonsJustPressed.has(2)) {
      this.cycleSpectatorTarget(1);
    }

    this.activeSpectatorTargetState = candidates.find((candidate) => candidate.playerId === this.spectatorTargetPlayerId) ?? null;
  }

  applySpectatorView() {
    const playerController = this.runtime?.playerController;
    if (!playerController || this.spectatorMode !== 'teammate' || !this.activeSpectatorTargetState) {
      this.remotePlayerPresenter.setSpectatorTargetPlayerId(null);
      return;
    }

    const target = this.activeSpectatorTargetState;
    playerController.yaw.position.set(
      Number(target.position?.x ?? 0),
      Number(target.position?.y ?? 0),
      Number(target.position?.z ?? 0),
    );
    playerController.yaw.rotation.y = Number(target.yaw ?? 0);
    playerController.pitch.position.y = Number(target.currentHeight ?? playerController.currentHeight ?? 1.72);
    playerController.pitch.rotation.x = Number(target.pitch ?? 0);
    playerController.viewAnchor.position.set(0, 0, 0);
    playerController.camera.position.set(0, 0, 0);
    if (this.runtime?.weaponManager?.viewModel) {
      this.runtime.weaponManager.viewModel.visible = false;
    }
    if (this.runtime?.weaponManager) {
      this.runtime.weaponManager.showScopeOverlay = false;
      this.runtime.weaponManager.showAdsReticle = false;
    }
    this.remotePlayerPresenter.setSpectatorTargetPlayerId(target.playerId);
  }

  getActiveViewTransform() {
    if (this.spectatorMode === 'teammate' && this.activeSpectatorTargetState) {
      const target = this.activeSpectatorTargetState;
      return {
        position: {
          x: Number(target.position?.x ?? 0),
          y: Number(target.position?.y ?? 0) + Number(target.currentHeight ?? 0),
          z: Number(target.position?.z ?? 0),
        },
        yaw: Number(target.yaw ?? 0),
        pitch: Number(target.pitch ?? 0),
      };
    }

    const playerController = this.runtime?.playerController;
    const eyePosition = playerController?.getEyePosition?.();
    return {
      position: eyePosition ?? playerController?.position ?? null,
      yaw: Number(playerController?.yawAngle ?? 0),
      pitch: Number(playerController?.pitchAngle ?? 0),
    };
  }

  getSpectatorUiState() {
    const now = performance.now();
    if (this.spectatorMode === 'pending') {
      return {
        mode: 'pending',
        secondsRemaining: Math.max(0, (this.spectatorActivateAt - now) / 1000),
        targetName: '',
      };
    }
    if (this.spectatorMode === 'teammate' && this.activeSpectatorTargetState) {
      return {
        mode: 'teammate',
        secondsRemaining: 0,
        targetName: String(this.activeSpectatorTargetState.displayName ?? this.activeSpectatorTargetState.playerId ?? 'Teammate'),
      };
    }
    if (this.spectatorMode === 'waiting') {
      return {
        mode: 'waiting',
        secondsRemaining: 0,
        targetName: '',
      };
    }

    return {
      mode: 'none',
      secondsRemaining: 0,
      targetName: '',
    };
  }

  async resumeGame() {
    try {
      await this.pauseController.resume({
        isLoadingMap: this.isLoadingMap,
        localSimulationLoop: this.localSimulationLoop,
      });
    } catch (error) {
      console.error('Failed to resume pointer lock.', error);
    }
  }

  async selectTeam(teamKey, playerName = this.selectedPlayerName) {
    if (!this.runtime?.playerController) {
      return;
    }

    const resolvedTeam = teamKey === TEAMS.DEFENDERS ? TEAMS.DEFENDERS : TEAMS.ATTACKERS;
    const resolvedPlayerName = sanitizePlayerName(playerName, this.selectedPlayerName);
    const spawnState = this.runtime.getSpawnStateForTeam(resolvedTeam);
    this.selectedTeam = resolvedTeam;
    this.selectedPlayerName = resolvedPlayerName;
    persistPlayerName(resolvedPlayerName);
    this.networkJumpQueued = false;
    this.localSimulationLoop.accumulator = 0;
    this.runtime.playerController.spawnAt(spawnState);

    if (this.getGameplaySyncEnabled()) {
      this.gameplayNetworking.syncLocalPlayer({
        authoritativeNetworkingEnabled: this.authoritativeNetworkingEnabled,
        mapId: this.selectedMapId,
        team: this.selectedTeam,
        displayName: this.selectedPlayerName,
        playerController: this.runtime.playerController,
        weaponManager: this.runtime.weaponManager,
      });
      this.syncGamemodeSelection({ resetMatch: false });
    } else {
      this.networkClient.suspendGameplaySync();
    }

    this.syncCombatNetworkingMode();
    this.rebuildHud();

    try {
      await this.pauseController.resume({
        isLoadingMap: this.isLoadingMap,
        localSimulationLoop: this.localSimulationLoop,
        force: true,
      });
    } catch (error) {
      console.error('Failed to resume pointer lock after team selection.', error);
    }
  }
}
