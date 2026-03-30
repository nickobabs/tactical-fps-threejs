import { PAUSE_MENU_BINDINGS } from './pauseMenuBindings.js';

export function createPauseMenu({
  parent,
  onResume,
  onSelectMap,
  maps = [],
  onSelectSkybox,
  skyboxes = [],
  onSensitivityChange,
  onVolumeChange,
  getMasterVolume,
  getMouseSensitivity,
}) {
  let lastSelectedMapId = null;
  let lastSelectedSkyboxId = null;
  let lastVolume = null;
  let lastSensitivity = null;
  const pause = document.createElement('div');
  pause.className = 'hud__pause';
  const sensitivityToPercent = () => Math.round(((getMouseSensitivity?.() ?? 0.0011) / 0.0022) * 100);
  pause.innerHTML = `
    <div class="hud__pause-panel">
      <div class="hud__pause-title">Paused</div>
      <button class="hud__pause-button" type="button" data-action="resume">Resume</button>
      <label class="hud__volume">
        <span class="hud__volume-label">Volume</span>
        <input class="hud__volume-slider" type="range" min="0" max="100" step="1" value="${Math.round((getMasterVolume?.() ?? 0.6) * 100)}" />
      </label>
      <label class="hud__volume">
        <span class="hud__slider-header">
          <span class="hud__volume-label">Sensitivity</span>
          <span class="hud__slider-value">${sensitivityToPercent()}</span>
        </span>
        <input class="hud__sensitivity-slider" type="range" min="1" max="100" step="1" value="${sensitivityToPercent()}" />
      </label>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="bindings">Key Bindings</button>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="maps">Maps</button>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="skyboxes">Skyboxes</button>
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
  `;

  parent.appendChild(pause);

  const bindingsEl = pause.querySelector('.hud__bindings');
  const mapsEl = pause.querySelector('.hud__maps');
  const skyboxesEl = pause.querySelector('.hud__skyboxes');
  const resumeButton = pause.querySelector('[data-action="resume"]');
  const volumeSlider = pause.querySelector('.hud__volume-slider');
  const sensitivitySlider = pause.querySelector('.hud__sensitivity-slider');
  const sensitivityValueEl = pause.querySelector('.hud__slider-value');
  const bindingsButton = pause.querySelector('[data-action="bindings"]');
  const mapsButton = pause.querySelector('[data-action="maps"]');
  const skyboxesButton = pause.querySelector('[data-action="skyboxes"]');
  const mapButtons = [...pause.querySelectorAll('[data-map-id]')];
  const skyboxButtons = [...pause.querySelectorAll('[data-skybox-id]')];

  const handleResume = () => onResume?.();
  const handleVolume = (event) => {
    onVolumeChange?.(Number(event.currentTarget.value) / 100);
  };
  const handleSensitivity = (event) => {
    const percent = Number(event.currentTarget.value);
    sensitivityValueEl.textContent = String(percent);
    onSensitivityChange?.((percent / 100) * 0.0022);
  };
  const handleBindings = () => {
    bindingsEl.classList.toggle('hud__bindings--visible');
    mapsEl.classList.remove('hud__maps--visible');
    skyboxesEl.classList.remove('hud__skyboxes--visible');
  };
  const handleMaps = () => {
    mapsEl.classList.toggle('hud__maps--visible');
    bindingsEl.classList.remove('hud__bindings--visible');
    skyboxesEl.classList.remove('hud__skyboxes--visible');
  };
  const handleSkyboxes = () => {
    skyboxesEl.classList.toggle('hud__skyboxes--visible');
    bindingsEl.classList.remove('hud__bindings--visible');
    mapsEl.classList.remove('hud__maps--visible');
  };
  const handleMapSelect = (event) => {
    onSelectMap?.(event.currentTarget.dataset.mapId);
  };
  const handleSkyboxSelect = (event) => {
    onSelectSkybox?.(event.currentTarget.dataset.skyboxId);
  };

  resumeButton.addEventListener('click', handleResume);
  volumeSlider.addEventListener('input', handleVolume);
  sensitivitySlider.addEventListener('input', handleSensitivity);
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
      bindingsButton.removeEventListener('click', handleBindings);
      mapsButton.removeEventListener('click', handleMaps);
      skyboxesButton.removeEventListener('click', handleSkyboxes);
      mapButtons.forEach((button) => button.removeEventListener('click', handleMapSelect));
      skyboxButtons.forEach((button) => button.removeEventListener('click', handleSkyboxSelect));
      pause.remove();
    },
    setPaused(paused) {
      pause.classList.toggle('hud__pause--active', paused);
      if (!paused) {
        bindingsEl.classList.remove('hud__bindings--visible');
        mapsEl.classList.remove('hud__maps--visible');
        skyboxesEl.classList.remove('hud__skyboxes--visible');
      }
    },
    updateSelections({ selectedMapId, selectedSkyboxId }) {
      if (selectedMapId !== lastSelectedMapId) {
        mapButtons.forEach((button) => {
          button.classList.toggle('hud__map-option--active', button.dataset.mapId === selectedMapId);
        });
        lastSelectedMapId = selectedMapId;
      }

      if (selectedSkyboxId !== lastSelectedSkyboxId) {
        skyboxButtons.forEach((button) => {
          button.classList.toggle('hud__skybox-option--active', button.dataset.skyboxId === selectedSkyboxId);
        });
        lastSelectedSkyboxId = selectedSkyboxId;
      }

      const volume = Math.round((getMasterVolume?.() ?? 0.6) * 100);
      if (volume !== lastVolume) {
        volumeSlider.value = String(volume);
        lastVolume = volume;
      }

      const sensitivity = sensitivityToPercent();
      if (sensitivity !== lastSensitivity) {
        sensitivitySlider.value = String(sensitivity);
        sensitivityValueEl.textContent = String(sensitivity);
        lastSensitivity = sensitivity;
      }
    },
  };
}
