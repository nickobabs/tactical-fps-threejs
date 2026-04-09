export class GamePauseController {
  constructor({ renderer, audioManager }) {
    this.renderer = renderer;
    this.audioManager = audioManager;
    this.hud = null;
    this.isPaused = false;
    this.pauseMode = null;
    this.canResume = true;
  }

  attachHud(hud) {
    this.hud = hud;
    this.hud?.setPauseState({
      paused: this.isPaused,
      mode: this.pauseMode,
      canResume: this.canResume,
    });
  }

  pause(localSimulationLoop, options = {}) {
    this.isPaused = true;
    this.pauseMode = options.mode ?? 'menu';
    this.canResume = options.canResume ?? (this.pauseMode === 'menu');
    localSimulationLoop.accumulator = 0;
    this.hud?.setPauseState({
      paused: true,
      mode: this.pauseMode,
      canResume: this.canResume,
    });
    if (document.pointerLockElement === this.renderer.domElement) {
      document.exitPointerLock();
    }
  }

  async resume({ isLoadingMap, localSimulationLoop, force = false }) {
    if (isLoadingMap || (!force && !this.canResume)) {
      return;
    }

    await this.renderer.domElement.requestPointerLock();
    await this.audioManager.unlock();
    localSimulationLoop.accumulator = 0;
    this.isPaused = false;
    this.pauseMode = null;
    this.canResume = true;
    this.hud?.setPauseState({
      paused: false,
      mode: null,
      canResume: true,
    });
  }

  async toggle({ isLoadingMap, localSimulationLoop }) {
    if (this.isPaused) {
      if (!this.canResume) {
        return;
      }
      await this.resume({ isLoadingMap, localSimulationLoop });
      return;
    }

    this.pause(localSimulationLoop, { mode: 'menu', canResume: true });
  }

  isInMode(mode) {
    return this.isPaused && this.pauseMode === mode;
  }
}
