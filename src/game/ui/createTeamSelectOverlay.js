import { TEAMS } from '../../shared/constants.js';

const TEAM_OPTIONS = [
  {
    key: TEAMS.ATTACKERS,
    title: 'Attackers',
    subtitle: 'Push into sites and take space.',
  },
  {
    key: TEAMS.DEFENDERS,
    title: 'Defenders',
    subtitle: 'Hold lanes and deny the take.',
  },
];

export function createTeamSelectOverlay({
  parent,
  onSelectTeam,
}) {
  let lastSelectedTeam = null;
  let lastPlayerName = '';
  let pendingTeam = null;
  const overlay = document.createElement('div');
  overlay.className = 'hud__team-select';
  overlay.innerHTML = `
    <div class="hud__team-select-panel">
      <div class="hud__team-select-kicker">Match Setup</div>
      <div class="hud__team-select-title" data-role="team-select-title">Choose Team</div>
      <div class="hud__team-select-copy" data-role="team-select-copy">Pick a side before the round starts.</div>
      <div class="hud__team-select-options" data-role="team-select-options">
        ${TEAM_OPTIONS.map((team) => `
          <button
            class="hud__team-option hud__team-option--${team.key}"
            type="button"
            data-team="${team.key}"
          >
            <span class="hud__team-option-title">${team.title}</span>
            <span class="hud__team-option-subtitle">${team.subtitle}</span>
          </button>
        `).join('')}
      </div>
      <div class="hud__team-select-name-step" data-role="name-step" hidden>
        <label class="hud__team-select-field">
          <span class="hud__team-select-label">Player Name</span>
          <input
            class="hud__team-select-input"
            type="text"
            maxlength="24"
            autocomplete="nickname"
            spellcheck="false"
            placeholder="Type your name"
          />
        </label>
        <div class="hud__team-select-actions">
          <button class="hud__team-select-action hud__team-select-action--back" type="button" data-action="back">Back</button>
          <button class="hud__team-select-action hud__team-select-action--confirm" type="button" data-action="confirm-name">Continue</button>
        </div>
      </div>
    </div>
  `;

  parent.appendChild(overlay);

  const titleEl = overlay.querySelector('[data-role="team-select-title"]');
  const copyEl = overlay.querySelector('[data-role="team-select-copy"]');
  const optionsEl = overlay.querySelector('[data-role="team-select-options"]');
  const nameStepEl = overlay.querySelector('[data-role="name-step"]');
  const nameInput = overlay.querySelector('.hud__team-select-input');
  const teamButtons = [...overlay.querySelectorAll('[data-team]')];
  const confirmNameButton = overlay.querySelector('[data-action="confirm-name"]');
  const backButton = overlay.querySelector('[data-action="back"]');
  const hasExistingName = () => String(lastPlayerName ?? '').trim().length > 0;
  const syncNameButtonState = () => {
    const hasName = String(nameInput?.value ?? '').trim().length > 0;
    if (confirmNameButton) {
      confirmNameButton.disabled = !hasName;
      confirmNameButton.setAttribute('aria-disabled', String(!hasName));
    }
  };
  const setStep = (step) => {
    const inNameStep = step === 'name';
    optionsEl.hidden = inNameStep;
    nameStepEl.hidden = !inNameStep;
    if (titleEl) {
      titleEl.textContent = inNameStep ? 'Choose Name' : 'Choose Team';
    }
    if (copyEl) {
      copyEl.textContent = inNameStep
        ? 'Set your callsign before joining the round.'
        : 'Pick a side before the round starts.';
    }
    if (inNameStep) {
      syncNameButtonState();
      nameInput?.focus();
      if (!String(nameInput?.value ?? '').trim()) {
        nameInput?.select?.();
      }
    }
  };
  const handleTeamSelect = (event) => {
    const selectedTeam = event.currentTarget.dataset.team;
    if (hasExistingName()) {
      onSelectTeam?.(selectedTeam, lastPlayerName);
      return;
    }
    pendingTeam = selectedTeam;
    setStep('name');
  };
  const handleConfirmName = () => {
    const playerName = String(nameInput?.value ?? '').trim();
    if (!playerName) {
      nameInput?.focus();
      syncNameButtonState();
      return;
    }
    onSelectTeam?.(pendingTeam, playerName);
  };
  const handleBack = () => {
    pendingTeam = null;
    setStep('team');
  };
  const handleNameInput = () => {
    syncNameButtonState();
  };
  const handleNameKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleConfirmName();
    }
  };

  teamButtons.forEach((button) => button.addEventListener('click', handleTeamSelect));
  nameInput?.addEventListener('input', handleNameInput);
  nameInput?.addEventListener('keydown', handleNameKeyDown);
  confirmNameButton?.addEventListener('click', handleConfirmName);
  backButton?.addEventListener('click', handleBack);
  setStep('team');

  return {
    destroy() {
      teamButtons.forEach((button) => button.removeEventListener('click', handleTeamSelect));
      nameInput?.removeEventListener('input', handleNameInput);
      nameInput?.removeEventListener('keydown', handleNameKeyDown);
      confirmNameButton?.removeEventListener('click', handleConfirmName);
      backButton?.removeEventListener('click', handleBack);
      overlay.remove();
    },
    setActive(active) {
      overlay.classList.toggle('hud__team-select--active', Boolean(active));
      if (active) {
        pendingTeam = null;
        setStep('team');
      }
    },
    updateSelection(selectedTeam) {
      if (selectedTeam === lastSelectedTeam) {
        return;
      }

      teamButtons.forEach((button) => {
        button.classList.toggle('hud__team-option--active', button.dataset.team === selectedTeam);
      });
      lastSelectedTeam = selectedTeam;
    },
    setPlayerName(playerName) {
      const normalizedName = String(playerName ?? '');
      if (normalizedName === lastPlayerName) {
        return;
      }
      if (nameInput) {
        nameInput.value = normalizedName;
      }
      lastPlayerName = normalizedName;
      syncNameButtonState();
    },
  };
}
