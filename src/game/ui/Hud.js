import { createPauseMenu } from './createPauseMenu.js';

export function createHud({
  container,
  input,
  roundManager,
  weaponManager,
  utilityManager,
  playerController,
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
      <div class="hud__weapon"></div>
      <div class="hud__utility"></div>
      <div class="hud__movement"></div>
      <div class="hud__pointer"></div>
    </div>
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
  const utilityEl = hud.querySelector('.hud__utility');
  const movementEl = hud.querySelector('.hud__movement');
  const pointerEl = hud.querySelector('.hud__pointer');
  const crosshairEl = hud.querySelector('.hud__crosshair');
  const adsReticleEl = hud.querySelector('.hud__ads-reticle');
  const scopeEl = hud.querySelector('.hud__scope');
  const loadingEl = hud.querySelector('.hud__loading');
  const loadingStatusEl = hud.querySelector('.hud__loading-status');
  let paused = false;
  let lastRoundText = '';
  let lastFpsText = '';
  let lastWeaponText = '';
  let lastUtilityText = '';
  let lastMovementText = '';
  let lastPointerText = '';
  let lastLoadingText = '';
  let lastCrosshairHidden = null;
  let lastAdsReticle = null;
  let lastScopeOverlay = null;
  let lastLoading = null;

  function setTextIfChanged(element, nextText, lastText) {
    if (lastText !== nextText) {
      element.textContent = nextText;
      return nextText;
    }

    return lastText;
  }

  return {
    destroy() {
      pauseMenu.destroy();
      hud.remove();
    },
    setPaused(nextPaused) {
      paused = nextPaused;
      pauseMenu.setPaused(paused);
    },
    update() {
      const movement = playerController?.getDebugState?.() ?? {
        grounded: true,
        crouched: false,
        speed: 0,
      };
      const roundText = roundManager
        ? `Round ${roundManager.roundNumber} - ${roundManager.phase}`
        : 'Round --';
      const fpsText = `FPS: ${getFps?.() ?? '--'}`;
      const weaponText = `Weapon: ${weaponManager?.activeWeapon ?? '--'}`;
      const utilityText = `Utility: ${utilityManager?.activeUtility ?? '--'}`;
      const movementText = `State: ${movement.grounded ? 'Grounded' : 'Air'} - ${movement.crouched ? 'Crouched' : 'Standing'} - ${movement.speed.toFixed(1)} m/s`;
      const pointerText = paused
        ? 'Paused'
        : input.pointerLocked
          ? 'Pointer locked'
          : 'Click to capture mouse';

      lastRoundText = setTextIfChanged(roundEl, roundText, lastRoundText);
      lastFpsText = setTextIfChanged(fpsEl, fpsText, lastFpsText);
      lastWeaponText = setTextIfChanged(weaponEl, weaponText, lastWeaponText);
      lastUtilityText = setTextIfChanged(utilityEl, utilityText, lastUtilityText);
      lastMovementText = setTextIfChanged(movementEl, movementText, lastMovementText);
      lastPointerText = setTextIfChanged(pointerEl, pointerText, lastPointerText);

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

      pauseMenu.updateSelections({
        selectedMapId: getSelectedMapId?.(),
        selectedSkyboxId: getSelectedSkyboxId?.(),
      });
    },
  };
}
