import { PAUSE_MENU_BINDINGS } from './pauseMenuBindings.js';

const PANEL_KEYS = {
  bindings: 'bindings',
  maps: 'maps',
  skyboxes: 'skyboxes',
};

function findLabelById(options, id) {
  return options.find((option) => option.id === id)?.label ?? 'Unknown';
}

export function createPauseMenu({
  parent,
  onResume,
  onSelectMap,
  maps = [],
  onSelectSkybox,
  skyboxes = [],
  onSensitivityChange,
  onFovChange,
  onVolumeChange,
  getMasterVolume,
  getMouseSensitivity,
  getHorizontalFov,
}) {
  let lastSelectedMapId = null;
  let lastSelectedSkyboxId = null;
  let lastVolume = null;
  let lastSensitivity = null;
  let lastFov = null;
  let activePanel = null;
  const pause = document.createElement('div');
  pause.className = 'hud__pause';
  const sensitivityToPercent = () => Math.round(((getMouseSensitivity?.() ?? 0.0011) / 0.0022) * 100);
  const currentFov = () => Math.round(getHorizontalFov?.() ?? 103);
  const currentVolume = () => Math.round((getMasterVolume?.() ?? 0.6) * 100);
  pause.innerHTML = `
    <div class="hud__pause-panel">
      <div class="hud__pause-header">
        <div>
          <div class="hud__pause-kicker">Session Menu</div>
          <div class="hud__pause-title">Paused</div>
          <div class="hud__pause-copy">Tune the match, switch environment presets, or get back in immediately.</div>
        </div>
        <button class="hud__pause-button hud__pause-button--primary" type="button" data-action="resume">Resume Match</button>
      </div>
      <div class="hud__pause-summary">
        <div class="hud__pause-summary-card">
          <span class="hud__pause-summary-label">Map</span>
          <span class="hud__pause-summary-value" data-role="selected-map">${findLabelById(maps, maps[0]?.id ?? null)}</span>
        </div>
        <div class="hud__pause-summary-card">
          <span class="hud__pause-summary-label">Skybox</span>
          <span class="hud__pause-summary-value" data-role="selected-skybox">${findLabelById(skyboxes, skyboxes[0]?.id ?? null)}</span>
        </div>
        <div class="hud__pause-summary-card">
          <span class="hud__pause-summary-label">Mouse</span>
          <span class="hud__pause-summary-value" data-role="current-sensitivity">${sensitivityToPercent()}%</span>
        </div>
      </div>
      <div class="hud__pause-controls">
        <label class="hud__volume">
          <span class="hud__slider-header">
            <span class="hud__volume-label">Volume</span>
            <span class="hud__volume-value hud__slider-value">${currentVolume()}%</span>
          </span>
          <input class="hud__volume-slider" type="range" min="0" max="100" step="1" value="${currentVolume()}" />
        </label>
        <label class="hud__volume">
          <span class="hud__slider-header">
            <span class="hud__volume-label">Sensitivity</span>
            <span class="hud__slider-value">${sensitivityToPercent()}</span>
          </span>
          <input class="hud__sensitivity-slider" type="range" min="1" max="100" step="1" value="${sensitivityToPercent()}" />
        </label>
        <label class="hud__volume">
          <span class="hud__slider-header">
            <span class="hud__volume-label">FOV (H)</span>
            <span class="hud__fov-value hud__slider-value">${currentFov()}</span>
          </span>
          <input class="hud__fov-slider" type="range" min="80" max="120" step="1" value="${currentFov()}" />
        </label>
      </div>
      <div class="hud__pause-tabs">
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="bindings">Key Bindings</button>
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="maps">Maps</button>
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="skyboxes">Skyboxes</button>
      </div>
      <div class="hud__pause-detail">
        <div class="hud__pause-panel-copy">Open a panel for controls or environment options.</div>
        <div class="hud__bindings">
          ${PAUSE_MENU_BINDINGS.map((binding) => `<div><strong>${binding.label}</strong>: ${binding.value}</div>`).join('')}
        </div>
        <div class="hud__maps">
          ${maps.map((map) => `
            <button
              class="hud__map-option"
              type="button"
              data-map-id="${map.id}"
            >${map.label}</button>
          `).join('')}
        </div>
        <div class="hud__skyboxes">
          ${skyboxes.map((skybox) => `
            <button
              class="hud__skybox-option"
              type="button"
              data-skybox-id="${skybox.id}"
            >${skybox.label}</button>
          `).join('')}
        </div>
      </div>
      <div class="hud__pause-footer">\`Esc\` closes the menu and returns to the round.</div>
    </div>
  `;

  parent.appendChild(pause);

  const bindingsEl = pause.querySelector('.hud__bindings');
  const mapsEl = pause.querySelector('.hud__maps');
  const skyboxesEl = pause.querySelector('.hud__skyboxes');
  const pauseDetailCopyEl = pause.querySelector('.hud__pause-panel-copy');
  const selectedMapValueEl = pause.querySelector('[data-role="selected-map"]');
  const selectedSkyboxValueEl = pause.querySelector('[data-role="selected-skybox"]');
  const currentSensitivityValueEl = pause.querySelector('[data-role="current-sensitivity"]');
  const resumeButton = pause.querySelector('[data-action="resume"]');
  const volumeSlider = pause.querySelector('.hud__volume-slider');
  const volumeValueEl = pause.querySelector('.hud__volume-value');
  const sensitivitySlider = pause.querySelector('.hud__sensitivity-slider');
  const sensitivityValueEl = pause.querySelector('.hud__sensitivity-slider')?.previousElementSibling?.querySelector('.hud__slider-value');
  const fovSlider = pause.querySelector('.hud__fov-slider');
  const fovValueEl = pause.querySelector('.hud__fov-value');
  const bindingsButton = pause.querySelector('[data-action="bindings"]');
  const mapsButton = pause.querySelector('[data-action="maps"]');
  const skyboxesButton = pause.querySelector('[data-action="skyboxes"]');
  const mapButtons = [...pause.querySelectorAll('[data-map-id]')];
  const skyboxButtons = [...pause.querySelectorAll('[data-skybox-id]')];

  function setActivePanel(nextPanel) {
    activePanel = activePanel === nextPanel ? null : nextPanel;
    bindingsEl.classList.toggle('hud__bindings--visible', activePanel === PANEL_KEYS.bindings);
    mapsEl.classList.toggle('hud__maps--visible', activePanel === PANEL_KEYS.maps);
    skyboxesEl.classList.toggle('hud__skyboxes--visible', activePanel === PANEL_KEYS.skyboxes);
    bindingsButton.classList.toggle('hud__pause-button--active', activePanel === PANEL_KEYS.bindings);
    mapsButton.classList.toggle('hud__pause-button--active', activePanel === PANEL_KEYS.maps);
    skyboxesButton.classList.toggle('hud__pause-button--active', activePanel === PANEL_KEYS.skyboxes);

    const panelCopy = activePanel === PANEL_KEYS.bindings
      ? 'Current controls and debug toggles.'
      : activePanel === PANEL_KEYS.maps
        ? 'Switch the active playspace runtime.'
        : activePanel === PANEL_KEYS.skyboxes
          ? 'Swap the environment lighting preset.'
          : 'Open a panel for controls or environment options.';
    pauseDetailCopyEl.textContent = panelCopy;
  }

  const handleResume = () => onResume?.();
  const handleVolume = (event) => {
    const volume = Number(event.currentTarget.value);
    volumeValueEl.textContent = `${volume}%`;
    onVolumeChange?.(volume / 100);
  };
  const handleSensitivity = (event) => {
    const percent = Number(event.currentTarget.value);
    if (sensitivityValueEl) {
      sensitivityValueEl.textContent = String(percent);
    }
    currentSensitivityValueEl.textContent = `${percent}%`;
    onSensitivityChange?.((percent / 100) * 0.0022);
  };
  const handleFov = (event) => {
    const horizontalFov = Number(event.currentTarget.value);
    fovValueEl.textContent = String(horizontalFov);
    onFovChange?.(horizontalFov);
  };
  const handleBindings = () => setActivePanel(PANEL_KEYS.bindings);
  const handleMaps = () => setActivePanel(PANEL_KEYS.maps);
  const handleSkyboxes = () => setActivePanel(PANEL_KEYS.skyboxes);
  const handleMapSelect = (event) => {
    onSelectMap?.(event.currentTarget.dataset.mapId);
  };
  const handleSkyboxSelect = (event) => {
    onSelectSkybox?.(event.currentTarget.dataset.skyboxId);
  };

  resumeButton.addEventListener('click', handleResume);
  volumeSlider.addEventListener('input', handleVolume);
  sensitivitySlider.addEventListener('input', handleSensitivity);
  fovSlider.addEventListener('input', handleFov);
  bindingsButton.addEventListener('click', handleBindings);
  mapsButton.addEventListener('click', handleMaps);
  skyboxesButton.addEventListener('click', handleSkyboxes);
  mapButtons.forEach((button) => button.addEventListener('click', handleMapSelect));
  skyboxButtons.forEach((button) => button.addEventListener('click', handleSkyboxSelect));

  return {
    destroy() {
      resumeButton.removeEventListener('click', handleResume);
      volumeSlider.removeEventListener('input', handleVolume);
      sensitivitySlider.removeEventListener('input', handleSensitivity);
      fovSlider.removeEventListener('input', handleFov);
      bindingsButton.removeEventListener('click', handleBindings);
      mapsButton.removeEventListener('click', handleMaps);
      skyboxesButton.removeEventListener('click', handleSkyboxes);
      mapButtons.forEach((button) => button.removeEventListener('click', handleMapSelect));
      skyboxButtons.forEach((button) => button.removeEventListener('click', handleSkyboxSelect));
      pause.remove();
    },
    setVisible(visible) {
      pause.classList.toggle('hud__pause--active', visible);
      if (!visible) {
        setActivePanel(null);
      }
    },
    updateSelections({ selectedMapId, selectedSkyboxId }) {
      if (selectedMapId !== lastSelectedMapId) {
        mapButtons.forEach((button) => {
          button.classList.toggle('hud__map-option--active', button.dataset.mapId === selectedMapId);
        });
        selectedMapValueEl.textContent = findLabelById(maps, selectedMapId);
        lastSelectedMapId = selectedMapId;
      }

      if (selectedSkyboxId !== lastSelectedSkyboxId) {
        skyboxButtons.forEach((button) => {
          button.classList.toggle('hud__skybox-option--active', button.dataset.skyboxId === selectedSkyboxId);
        });
        selectedSkyboxValueEl.textContent = findLabelById(skyboxes, selectedSkyboxId);
        lastSelectedSkyboxId = selectedSkyboxId;
      }

      const volume = currentVolume();
      if (volume !== lastVolume) {
        volumeSlider.value = String(volume);
        volumeValueEl.textContent = `${volume}%`;
        lastVolume = volume;
      }

      const sensitivity = sensitivityToPercent();
      if (sensitivity !== lastSensitivity) {
        sensitivitySlider.value = String(sensitivity);
        if (sensitivityValueEl) {
          sensitivityValueEl.textContent = String(sensitivity);
        }
        currentSensitivityValueEl.textContent = `${sensitivity}%`;
        lastSensitivity = sensitivity;
      }

      const horizontalFov = currentFov();
      if (horizontalFov !== lastFov) {
        fovSlider.value = String(horizontalFov);
        fovValueEl.textContent = String(horizontalFov);
        lastFov = horizontalFov;
      }
    },
  };
}
