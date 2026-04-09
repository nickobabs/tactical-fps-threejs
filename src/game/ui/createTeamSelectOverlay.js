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
  const overlay = document.createElement('div');
  overlay.className = 'hud__team-select';
  overlay.innerHTML = `
    <div class="hud__team-select-panel">
      <div class="hud__team-select-kicker">Match Setup</div>
      <div class="hud__team-select-title">Choose Team</div>
      <div class="hud__team-select-copy">Pick a side and lock in your callsign before the round starts.</div>
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
      <div class="hud__team-select-options">
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
    </div>
  `;

  parent.appendChild(overlay);

  const nameInput = overlay.querySelector('.hud__team-select-input');
  const teamButtons = [...overlay.querySelectorAll('[data-team]')];
  const syncButtonState = () => {
    const hasName = String(nameInput?.value ?? '').trim().length > 0;
    teamButtons.forEach((button) => {
      button.disabled = !hasName;
      button.setAttribute('aria-disabled', String(!hasName));
    });
  };
  const handleTeamSelect = (event) => {
    const playerName = String(nameInput?.value ?? '').trim();
    if (!playerName) {
      nameInput?.focus();
      syncButtonState();
      return;
    }
    onSelectTeam?.(event.currentTarget.dataset.team, playerName);
  };
  const handleNameInput = () => {
    syncButtonState();
  };

  teamButtons.forEach((button) => button.addEventListener('click', handleTeamSelect));
  nameInput?.addEventListener('input', handleNameInput);
  syncButtonState();

  return {
    destroy() {
      teamButtons.forEach((button) => button.removeEventListener('click', handleTeamSelect));
      nameInput?.removeEventListener('input', handleNameInput);
      overlay.remove();
    },
    setActive(active) {
      overlay.classList.toggle('hud__team-select--active', Boolean(active));
      if (active) {
        syncButtonState();
        if (!String(nameInput?.value ?? '').trim()) {
          nameInput?.focus();
          nameInput?.select?.();
        }
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
      syncButtonState();
    },
  };
}
