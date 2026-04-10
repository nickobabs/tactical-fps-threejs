import { setTextIfChanged } from './hudText.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getScoreboardRowMarkup(players = [], localPlayerId) {
  if (players.length === 0) {
    return '<div class="hud__scoreboard-empty">No players</div>';
  }

  return players.map((player) => {
    const playerName = escapeHtml(player.displayName ?? player.playerId ?? 'Player');
    const kills = Number(player.kills ?? 0);
    const deaths = Number(player.deaths ?? 0);
    const ping = Math.max(0, Math.round(Number(player.pingMs ?? 0)));
    const aliveClass = player.isAlive === false ? ' hud__scoreboard-row--dead' : '';
    const localClass = player.playerId === localPlayerId ? ' hud__scoreboard-row--local' : '';
    return `<div class="hud__scoreboard-row${aliveClass}${localClass}">
      <span class="hud__scoreboard-name">${playerName}</span>
      <span>${kills}</span>
      <span>${deaths}</span>
      <span>${ping}</span>
    </div>`;
  }).join('');
}

export function createHudScoreboardController({ scoreboardEl, scoreboardSubtitleEl, scoreboardTeamEls }) {
  let lastScoreboardHidden = null;
  let lastScoreboardSubtitle = '';
  const lastScoreboardTeamMarkup = new Map();

  return {
    update({ visible, subtitle, scoreboardState, roundManager, localPlayerId }) {
      if (visible !== lastScoreboardHidden) {
        scoreboardEl.classList.toggle('hud__scoreboard--active', visible);
        lastScoreboardHidden = visible;
      }

      lastScoreboardSubtitle = setTextIfChanged(
        scoreboardSubtitleEl,
        subtitle,
        lastScoreboardSubtitle,
      );

      scoreboardTeamEls.forEach((teamEl, index) => {
        const teamState = scoreboardState.teams?.[index] ?? {
          label: index === 0 ? 'Attackers' : 'Defenders',
          roundsWon: 0,
          players: [],
        };
        const teamNameEl = teamEl.querySelector('.hud__scoreboard-teamname');
        const teamScoreEl = teamEl.querySelector('.hud__scoreboard-teamscore');
        const teamRowsEl = teamEl.querySelector('.hud__scoreboard-rows');
        teamNameEl.textContent = teamState.label;
        teamScoreEl.textContent = String(roundManager?.teamScores?.[teamState.key] ?? teamState.roundsWon ?? 0);
        const nextMarkup = getScoreboardRowMarkup(teamState.players, localPlayerId ?? null);
        if (lastScoreboardTeamMarkup.get(index) !== nextMarkup) {
          teamRowsEl.innerHTML = nextMarkup;
          lastScoreboardTeamMarkup.set(index, nextMarkup);
        }
      });
    },
  };
}
