import { TEAMS } from '../../shared/constants.js';
import { ACTION_DEFINITIONS, getBindingLabel } from '../../core/input/keyBindings.js';

const PANEL_KEYS = {
  profile: 'profile',
  settings: 'settings',
  maps: 'maps',
  gamemodes: 'gamemodes',
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
  onSelectGamemode,
  gamemodes = [],
  onSelectSkybox,
  skyboxes = [],
  onSensitivityChange,
  onFovChange,
  onVolumeChange,
  onSelectTeam,
  onChangePlayerName,
  getMasterVolume,
  getMouseSensitivity,
  getHorizontalFov,
  getSelectedPlayerName,
  getKeyBindings,
  onRebindKeybind,
  onResetKeybinds,
  onUploadAvatar,
  onUploadSpray,
  getProfileAvatarUrl,
  getProfileSprayUrl,
  isGamemodeEnabled = null,
}) {
  let lastSelectedMapId = null;
  let lastSelectedGamemodeId = null;
  let lastSelectedSkyboxId = null;
  let lastSelectedTeam = null;
  let lastProfileAvatarUrl = null;
  let lastProfileSprayUrl = null;
  let lastSelectedPlayerName = null;
  let lastVolume = null;
  let lastSensitivity = null;
  let lastFov = null;
  let activePanel = null;
  let listeningActionId = null;
  let avatarUploadPending = false;

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
          <div class="hud__pause-copy">Manage your profile, tune settings, or switch the current session setup.</div>
        </div>
        <button class="hud__pause-button hud__pause-button--primary" type="button" data-action="resume">Resume Match</button>
      </div>
      <div class="hud__pause-summary">
        <div class="hud__pause-summary-card">
          <span class="hud__pause-summary-label">Map</span>
          <span class="hud__pause-summary-value" data-role="selected-map">${findLabelById(maps, maps[0]?.id ?? null)}</span>
        </div>
        <div class="hud__pause-summary-card">
          <span class="hud__pause-summary-label">Mode</span>
          <span class="hud__pause-summary-value" data-role="selected-gamemode">${findLabelById(gamemodes, gamemodes[0]?.id ?? null)}</span>
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
      <div class="hud__pause-tabs hud__pause-tabs--session">
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-team-id="${TEAMS.ATTACKERS}">Join Attackers</button>
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-team-id="${TEAMS.DEFENDERS}">Join Defenders</button>
      </div>
      <div class="hud__pause-tabs hud__pause-tabs--panels">
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="profile">Profile</button>
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="settings">Settings</button>
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="maps">Maps</button>
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="gamemodes">Gamemode</button>
        <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="skyboxes">Skyboxes</button>
      </div>
      <div class="hud__pause-detail">
        <div class="hud__pause-panel-copy" data-role="panel-copy"></div>
        <section class="hud__pause-panel-body" data-panel="profile">
          <div class="hud__pause-profile-grid">
            <div class="hud__pause-card">
              <div class="hud__pause-card-title">Identity</div>
              <div class="hud__pause-card-copy">Stored against your persistent local profile ID and reused across sessions on this browser.</div>
              <label class="hud__pause-field">
                <span class="hud__pause-field-label">Player Name</span>
                <input class="hud__pause-text-input" type="text" maxlength="24" autocomplete="nickname" spellcheck="false" data-role="profile-name-input" />
              </label>
              <div class="hud__pause-inline-actions">
                <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="save-profile-name">Save Name</button>
              </div>
            </div>
            <div class="hud__pause-card">
              <div class="hud__pause-card-title">Profile Picture</div>
              <div class="hud__pause-avatar">
                <div class="hud__pause-avatar-preview-shell">
                  <img class="hud__pause-avatar-preview" data-role="profile-avatar-preview" alt="" />
                </div>
                <div class="hud__pause-avatar-copy">
                  <div class="hud__pause-summary-label">Replicated Avatar</div>
                  <div class="hud__pause-panel-copy">Shown in the top HUD for all players.</div>
                </div>
                <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="upload-avatar">Upload Avatar</button>
                <input class="hud__pause-avatar-input" type="file" accept="image/png,image/jpeg,image/webp" hidden />
              </div>
            </div>
            <div class="hud__pause-card">
              <div class="hud__pause-card-title">Spray</div>
              <div class="hud__pause-card-copy">Upload the decal image this profile can place in the world.</div>
              <div class="hud__pause-avatar">
                <div class="hud__pause-avatar-preview-shell hud__pause-avatar-preview-shell--spray">
                  <img class="hud__pause-avatar-preview" data-role="profile-spray-preview" alt="" />
                </div>
                <div class="hud__pause-avatar-copy">
                  <div class="hud__pause-summary-label">Spray Image</div>
                  <div class="hud__pause-panel-copy">Placed onto surfaces with the spray keybind.</div>
                </div>
                <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="upload-spray">Upload Spray</button>
                <input class="hud__pause-spray-input" type="file" accept="image/png,image/jpeg,image/webp" hidden />
              </div>
            </div>
          </div>
        </section>
        <section class="hud__pause-panel-body" data-panel="settings">
          <div class="hud__pause-settings-grid">
            <div class="hud__pause-card">
              <div class="hud__pause-card-title">Look Settings</div>
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
                    <span class="hud__slider-value" data-role="sensitivity-value">${sensitivityToPercent()}</span>
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
            </div>
            <div class="hud__pause-card">
              <div class="hud__pause-card-title">Key Bindings</div>
              <div class="hud__bindings-toolbar">
                <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="reset-keybinds">Reset to Default</button>
              </div>
              <div class="hud__binding-list">
                ${ACTION_DEFINITIONS.map((binding) => `
                  <button class="hud__binding-row" type="button" data-bind-action="${binding.id}">
                    <span class="hud__binding-label">${binding.label}</span>
                    <span class="hud__binding-value" data-role="binding-value-${binding.id}">${getBindingLabel(getKeyBindings?.()?.[binding.id] ?? binding.defaultBinding)}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </section>
        <section class="hud__pause-panel-body" data-panel="maps">
          <div class="hud__maps">
            ${maps.map((map) => `
              <button class="hud__map-option" type="button" data-map-id="${map.id}">${map.label}</button>
            `).join('')}
          </div>
        </section>
        <section class="hud__pause-panel-body" data-panel="gamemodes">
          <div class="hud__gamemodes">
            ${gamemodes.map((gamemode) => `
              <button class="hud__gamemode-option" type="button" data-gamemode-id="${gamemode.id}">${gamemode.label}</button>
            `).join('')}
          </div>
        </section>
        <section class="hud__pause-panel-body" data-panel="skyboxes">
          <div class="hud__skyboxes">
            ${skyboxes.map((skybox) => `
              <button class="hud__skybox-option" type="button" data-skybox-id="${skybox.id}">${skybox.label}</button>
            `).join('')}
          </div>
        </section>
      </div>
      <div class="hud__pause-footer">\`Esc\` closes the menu and returns to the round.</div>
    </div>
  `;

  parent.appendChild(pause);

  const panelCopyEl = pause.querySelector('[data-role="panel-copy"]');
  const panelBodies = [...pause.querySelectorAll('.hud__pause-panel-body')];
  const panelButtons = {
    [PANEL_KEYS.profile]: pause.querySelector('[data-action="profile"]'),
    [PANEL_KEYS.settings]: pause.querySelector('[data-action="settings"]'),
    [PANEL_KEYS.maps]: pause.querySelector('[data-action="maps"]'),
    [PANEL_KEYS.gamemodes]: pause.querySelector('[data-action="gamemodes"]'),
    [PANEL_KEYS.skyboxes]: pause.querySelector('[data-action="skyboxes"]'),
  };
  const panelButtonHandlers = Object.fromEntries(
    Object.keys(panelButtons).map((panelKey) => [panelKey, () => setActivePanel(panelKey)]),
  );
  const selectedMapValueEl = pause.querySelector('[data-role="selected-map"]');
  const selectedGamemodeValueEl = pause.querySelector('[data-role="selected-gamemode"]');
  const selectedSkyboxValueEl = pause.querySelector('[data-role="selected-skybox"]');
  const currentSensitivityValueEl = pause.querySelector('[data-role="current-sensitivity"]');
  const resumeButton = pause.querySelector('[data-action="resume"]');
  const volumeSlider = pause.querySelector('.hud__volume-slider');
  const volumeValueEl = pause.querySelector('.hud__volume-value');
  const sensitivitySlider = pause.querySelector('.hud__sensitivity-slider');
  const sensitivityValueEl = pause.querySelector('[data-role="sensitivity-value"]');
  const fovSlider = pause.querySelector('.hud__fov-slider');
  const fovValueEl = pause.querySelector('.hud__fov-value');
  const mapButtons = [...pause.querySelectorAll('[data-map-id]')];
  const gamemodeButtons = [...pause.querySelectorAll('[data-gamemode-id]')];
  const skyboxButtons = [...pause.querySelectorAll('[data-skybox-id]')];
  const teamButtons = [...pause.querySelectorAll('[data-team-id]')];
  const resetKeybindsButton = pause.querySelector('[data-action="reset-keybinds"]');
  const bindingButtons = [...pause.querySelectorAll('[data-bind-action]')];
  const avatarUploadButton = pause.querySelector('[data-action="upload-avatar"]');
  const avatarInput = pause.querySelector('.hud__pause-avatar-input');
  const avatarPreview = pause.querySelector('[data-role="profile-avatar-preview"]');
  const sprayUploadButton = pause.querySelector('[data-action="upload-spray"]');
  const sprayInput = pause.querySelector('.hud__pause-spray-input');
  const sprayPreview = pause.querySelector('[data-role="profile-spray-preview"]');
  const profileNameInput = pause.querySelector('[data-role="profile-name-input"]');
  const saveProfileNameButton = pause.querySelector('[data-action="save-profile-name"]');

  function setActivePanel(nextPanel) {
    activePanel = activePanel === nextPanel ? null : nextPanel;
    listeningActionId = null;

    for (const body of panelBodies) {
      body.classList.toggle('hud__pause-panel-body--active', body.dataset.panel === activePanel);
    }
    for (const [panelKey, button] of Object.entries(panelButtons)) {
      button?.classList.toggle('hud__pause-button--active', panelKey === activePanel);
    }

    const panelCopy = activePanel === PANEL_KEYS.profile
      ? 'Set the player identity tied to this local profile. Spray upload will live here too.'
      : activePanel === PANEL_KEYS.settings
        ? 'Tune local controls and bindings.'
        : activePanel === PANEL_KEYS.maps
          ? 'Switch the active playspace runtime.'
          : activePanel === PANEL_KEYS.gamemodes
            ? 'Switch the current round ruleset. Competitive is available on Dust2 Test only.'
            : activePanel === PANEL_KEYS.skyboxes
              ? 'Swap the environment lighting preset.'
              : 'Choose a panel to edit profile, settings, or session options.';
    if (panelCopyEl) {
      panelCopyEl.textContent = panelCopy;
    }
    syncBindingValues();
  }

  const handleResume = () => onResume?.();
  const handleVolume = (event) => {
    const volume = Number(event.currentTarget.value);
    volumeValueEl.textContent = `${volume}%`;
    onVolumeChange?.(volume / 100);
  };
  const handleSensitivity = (event) => {
    const percent = Number(event.currentTarget.value);
    sensitivityValueEl.textContent = String(percent);
    currentSensitivityValueEl.textContent = `${percent}%`;
    onSensitivityChange?.((percent / 100) * 0.0022);
  };
  const handleFov = (event) => {
    const horizontalFov = Number(event.currentTarget.value);
    fovValueEl.textContent = String(horizontalFov);
    onFovChange?.(horizontalFov);
  };
  const handleMapSelect = (event) => onSelectMap?.(event.currentTarget.dataset.mapId);
  const handleSkyboxSelect = (event) => onSelectSkybox?.(event.currentTarget.dataset.skyboxId);
  const handleGamemodeSelect = (event) => onSelectGamemode?.(event.currentTarget.dataset.gamemodeId);
  const handleTeamSelect = (event) => onSelectTeam?.(event.currentTarget.dataset.teamId, getSelectedPlayerName?.());
  const handleResetKeybinds = () => {
    onResetKeybinds?.();
    listeningActionId = null;
    syncBindingValues();
  };
  const handleBindingButtonClick = (event) => {
    listeningActionId = String(event.currentTarget.dataset.bindAction ?? '');
    syncBindingValues();
  };
  const handleAvatarButtonClick = () => {
    if (!avatarUploadPending) {
      avatarInput?.click();
    }
  };
  const handleAvatarInput = async (event) => {
    const file = event.currentTarget.files?.[0] ?? null;
    event.currentTarget.value = '';
    if (!file || typeof onUploadAvatar !== 'function') {
      return;
    }

    avatarUploadPending = true;
    if (avatarUploadButton) {
      avatarUploadButton.textContent = 'Uploading...';
      avatarUploadButton.disabled = true;
    }

    try {
      await onUploadAvatar(file);
    } catch (error) {
      console.warn('[PauseMenu] Failed to upload avatar.', error);
    } finally {
      avatarUploadPending = false;
      if (avatarUploadButton) {
        avatarUploadButton.textContent = 'Upload Avatar';
        avatarUploadButton.disabled = false;
      }
    }
  };
  const handleSprayButtonClick = () => {
    if (!avatarUploadPending) {
      sprayInput?.click();
    }
  };
  const handleSprayInput = async (event) => {
    const file = event.currentTarget.files?.[0] ?? null;
    event.currentTarget.value = '';
    if (!file || typeof onUploadSpray !== 'function') {
      return;
    }

    avatarUploadPending = true;
    if (sprayUploadButton) {
      sprayUploadButton.textContent = 'Uploading...';
      sprayUploadButton.disabled = true;
    }

    try {
      await onUploadSpray(file);
    } catch (error) {
      console.warn('[PauseMenu] Failed to upload spray.', error);
    } finally {
      avatarUploadPending = false;
      if (sprayUploadButton) {
        sprayUploadButton.textContent = 'Upload Spray';
        sprayUploadButton.disabled = false;
      }
    }
  };
  const commitProfileName = () => {
    const nextName = String(profileNameInput?.value ?? '').trim();
    if (!nextName) {
      return;
    }
    onChangePlayerName?.(nextName);
  };
  const handleProfileNameKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();
    commitProfileName();
  };

  function syncBindingValues() {
    const bindings = getKeyBindings?.() ?? {};
    for (const button of bindingButtons) {
      const actionId = String(button.dataset.bindAction ?? '');
      const valueEl = button.querySelector(`[data-role="binding-value-${actionId}"]`);
      if (!valueEl) {
        continue;
      }
      valueEl.textContent = listeningActionId === actionId
        ? 'Press a key...'
        : getBindingLabel(bindings[actionId]);
      button.classList.toggle('hud__binding-row--listening', listeningActionId === actionId);
    }
  }

  function handleBindingCapture(event) {
    if (!listeningActionId) {
      return;
    }

    const target = event.target;
    if (target instanceof HTMLElement && target.closest('.hud__pause-panel') == null) {
      return;
    }

    if (event instanceof KeyboardEvent) {
      if (event.code === 'Escape') {
        listeningActionId = null;
        syncBindingValues();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (!event.code) {
        return;
      }
      onRebindKeybind?.(listeningActionId, event.code);
    } else if (event instanceof MouseEvent) {
      onRebindKeybind?.(listeningActionId, `Mouse${event.button}`);
    } else {
      return;
    }

    listeningActionId = null;
    syncBindingValues();
    event.preventDefault();
    event.stopPropagation();
  }

  resumeButton.addEventListener('click', handleResume);
  volumeSlider.addEventListener('input', handleVolume);
  sensitivitySlider.addEventListener('input', handleSensitivity);
  fovSlider.addEventListener('input', handleFov);
  mapButtons.forEach((button) => button.addEventListener('click', handleMapSelect));
  gamemodeButtons.forEach((button) => button.addEventListener('click', handleGamemodeSelect));
  skyboxButtons.forEach((button) => button.addEventListener('click', handleSkyboxSelect));
  teamButtons.forEach((button) => button.addEventListener('click', handleTeamSelect));
  resetKeybindsButton?.addEventListener('click', handleResetKeybinds);
  bindingButtons.forEach((button) => button.addEventListener('click', handleBindingButtonClick));
  avatarUploadButton?.addEventListener('click', handleAvatarButtonClick);
  avatarInput?.addEventListener('change', handleAvatarInput);
  sprayUploadButton?.addEventListener('click', handleSprayButtonClick);
  sprayInput?.addEventListener('change', handleSprayInput);
  saveProfileNameButton?.addEventListener('click', commitProfileName);
  profileNameInput?.addEventListener('keydown', handleProfileNameKeyDown);
  Object.entries(panelButtons).forEach(([panelKey, button]) => {
    button?.addEventListener('click', panelButtonHandlers[panelKey]);
  });
  window.addEventListener('keydown', handleBindingCapture, true);
  window.addEventListener('mousedown', handleBindingCapture, true);
  setActivePanel(null);

  return {
    destroy() {
      resumeButton.removeEventListener('click', handleResume);
      volumeSlider.removeEventListener('input', handleVolume);
      sensitivitySlider.removeEventListener('input', handleSensitivity);
      fovSlider.removeEventListener('input', handleFov);
      mapButtons.forEach((button) => button.removeEventListener('click', handleMapSelect));
      gamemodeButtons.forEach((button) => button.removeEventListener('click', handleGamemodeSelect));
      skyboxButtons.forEach((button) => button.removeEventListener('click', handleSkyboxSelect));
      teamButtons.forEach((button) => button.removeEventListener('click', handleTeamSelect));
      resetKeybindsButton?.removeEventListener('click', handleResetKeybinds);
      bindingButtons.forEach((button) => button.removeEventListener('click', handleBindingButtonClick));
      avatarUploadButton?.removeEventListener('click', handleAvatarButtonClick);
      avatarInput?.removeEventListener('change', handleAvatarInput);
      sprayUploadButton?.removeEventListener('click', handleSprayButtonClick);
      sprayInput?.removeEventListener('change', handleSprayInput);
      saveProfileNameButton?.removeEventListener('click', commitProfileName);
      profileNameInput?.removeEventListener('keydown', handleProfileNameKeyDown);
      Object.entries(panelButtons).forEach(([panelKey, button]) => {
        button?.removeEventListener('click', panelButtonHandlers[panelKey]);
      });
      window.removeEventListener('keydown', handleBindingCapture, true);
      window.removeEventListener('mousedown', handleBindingCapture, true);
      pause.remove();
    },
    setVisible(visible) {
      pause.classList.toggle('hud__pause--active', visible);
      if (!visible) {
        listeningActionId = null;
        syncBindingValues();
      }
    },
    updateSelections({
      selectedMapId,
      selectedGamemodeId,
      selectedSkyboxId,
      selectedTeam,
      selectedPlayerName,
      profileAvatarUrl,
      profileSprayUrl,
    }) {
      if (selectedMapId !== lastSelectedMapId) {
        mapButtons.forEach((button) => {
          button.classList.toggle('hud__map-option--active', button.dataset.mapId === selectedMapId);
        });
        selectedMapValueEl.textContent = findLabelById(maps, selectedMapId);
        lastSelectedMapId = selectedMapId;
      }

      if (selectedGamemodeId !== lastSelectedGamemodeId) {
        gamemodeButtons.forEach((button) => {
          button.classList.toggle('hud__gamemode-option--active', button.dataset.gamemodeId === selectedGamemodeId);
        });
        selectedGamemodeValueEl.textContent = findLabelById(gamemodes, selectedGamemodeId);
        lastSelectedGamemodeId = selectedGamemodeId;
      }

      gamemodeButtons.forEach((button) => {
        const enabled = isGamemodeEnabled ? isGamemodeEnabled(button.dataset.gamemodeId, selectedMapId) : true;
        button.disabled = !enabled;
      });

      if (selectedSkyboxId !== lastSelectedSkyboxId) {
        skyboxButtons.forEach((button) => {
          button.classList.toggle('hud__skybox-option--active', button.dataset.skyboxId === selectedSkyboxId);
        });
        selectedSkyboxValueEl.textContent = findLabelById(skyboxes, selectedSkyboxId);
        lastSelectedSkyboxId = selectedSkyboxId;
      }

      if (selectedTeam !== lastSelectedTeam) {
        teamButtons.forEach((button) => {
          button.classList.toggle('hud__pause-button--active', button.dataset.teamId === selectedTeam);
        });
        lastSelectedTeam = selectedTeam;
      }

      if (selectedPlayerName !== lastSelectedPlayerName) {
        if (profileNameInput && document.activeElement !== profileNameInput) {
          profileNameInput.value = String(selectedPlayerName ?? '');
        }
        lastSelectedPlayerName = selectedPlayerName;
      }

      if (profileAvatarUrl !== lastProfileAvatarUrl) {
        if (avatarPreview) {
          if (profileAvatarUrl) {
            avatarPreview.src = profileAvatarUrl;
          } else {
            avatarPreview.removeAttribute('src');
          }
          avatarPreview.classList.toggle('hud__pause-avatar-preview--empty', !profileAvatarUrl);
        }
        lastProfileAvatarUrl = profileAvatarUrl;
      }

      if (profileSprayUrl !== lastProfileSprayUrl) {
        if (sprayPreview) {
          if (profileSprayUrl) {
            sprayPreview.src = profileSprayUrl;
          } else {
            sprayPreview.removeAttribute('src');
          }
          sprayPreview.classList.toggle('hud__pause-avatar-preview--empty', !profileSprayUrl);
        }
        lastProfileSprayUrl = profileSprayUrl;
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
        sensitivityValueEl.textContent = String(sensitivity);
        currentSensitivityValueEl.textContent = `${sensitivity}%`;
        lastSensitivity = sensitivity;
      }

      const horizontalFov = currentFov();
      if (horizontalFov !== lastFov) {
        fovSlider.value = String(horizontalFov);
        fovValueEl.textContent = String(horizontalFov);
        lastFov = horizontalFov;
      }

      syncBindingValues();
    },
  };
}
