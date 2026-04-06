export class GamePauseController {
  constructor({ renderer, audioManager }) {
    this.renderer = renderer;
    this.audioManager = audioManager;
    this.hud = null;
    this.isPaused = false;
  }

  attachHud(hud) {
    this.hud = hud;
    this.hud?.setPaused(this.isPaused);
  }

  pause(localSimulationLoop) {
    this.isPaused = true;
    localSimulationLoop.accumulator = 0;
    this.hud?.setPaused(true);
    if (document.pointerLockElement === this.renderer.domElement) {
      document.exitPointerLock();
    }
  }

  async resume({ isLoadingMap, localSimulationLoop }) {
    if (isLoadingMap) {
      return;
    }

    await this.renderer.domElement.requestPointerLock();
    await this.audioManager.unlock();
    localSimulationLoop.accumulator = 0;
    this.isPaused = false;
    this.hud?.setPaused(false);
  }

  async toggle({ isLoadingMap, localSimulationLoop }) {
    if (this.isPaused) {
      await this.resume({ isLoadingMap, localSimulationLoop });
      return;
    }

    this.pause(localSimulationLoop);
  }
}
