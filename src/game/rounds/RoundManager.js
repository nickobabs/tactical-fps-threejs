import { TEAMS } from '../../shared/constants.js';

export class RoundManager {
  constructor() {
    this.roundNumber = 1;
    this.phase = 'waiting';
    this.phaseTime = 0;
    this.freezeDuration = 5;
    this.liveDuration = 115;
    this.roundResetDuration = 5;
    this.winnerTeam = null;
    this.winReason = null;
    this.roundEnded = false;
    this.roundEndCountdown = 0;
    this.teamScores = {
      [TEAMS.ATTACKERS]: 0,
      [TEAMS.DEFENDERS]: 0,
    };
  }

  startWaiting() {
    this.phase = 'waiting';
    this.phaseTime = 0;
    this.resetRoundOutcome();
  }

  startPhase(phase) {
    this.phase = phase;
    this.phaseTime = 0;
  }

  resetRoundOutcome() {
    this.winnerTeam = null;
    this.winReason = null;
    this.roundEnded = false;
    this.roundEndCountdown = 0;
  }

  beginFreeze() {
    this.resetRoundOutcome();
    this.startPhase('freeze');
  }

  beginLive() {
    this.resetRoundOutcome();
    this.startPhase('live');
  }

  resetForNextRound() {
    this.roundNumber += 1;
    this.beginFreeze();
  }

  endRound(winnerTeam, reason = 'objective') {
    if (this.roundEnded || this.phase !== 'live') {
      return false;
    }

    const resolvedWinner = winnerTeam === TEAMS.DEFENDERS ? TEAMS.DEFENDERS : TEAMS.ATTACKERS;
    this.teamScores[resolvedWinner] = (this.teamScores[resolvedWinner] ?? 0) + 1;
    this.winnerTeam = resolvedWinner;
    this.winReason = String(reason ?? 'objective');
    this.roundEnded = true;
    this.roundEndCountdown = this.roundResetDuration;
    return true;
  }

  update(delta) {
    if (this.phase === 'waiting') {
      return null;
    }

    if (this.phase === 'freeze') {
      this.phaseTime += delta;
      if (this.phaseTime >= this.freezeDuration) {
        this.beginLive();
        return { type: 'phase-changed', phase: 'live' };
      }
      return null;
    }

    if (this.phase === 'live') {
      if (!this.roundEnded) {
        this.phaseTime += delta;
        if (this.phaseTime >= this.liveDuration) {
          this.endRound(TEAMS.DEFENDERS, 'time-expired');
          return { type: 'round-ended', winnerTeam: this.winnerTeam, reason: this.winReason };
        }
        return null;
      }

      this.roundEndCountdown = Math.max(0, this.roundEndCountdown - delta);
      if (this.roundEndCountdown === 0) {
        this.resetForNextRound();
        return { type: 'phase-changed', phase: 'freeze' };
      }
    }

    return null;
  }

  getSnapshot() {
    return {
      roundNumber: this.roundNumber,
      phase: this.phase,
      phaseTime: this.phaseTime,
      freezeDuration: this.freezeDuration,
      liveDuration: this.liveDuration,
      roundResetDuration: this.roundResetDuration,
      winnerTeam: this.winnerTeam,
      winReason: this.winReason,
      roundEnded: this.roundEnded,
      roundEndCountdown: this.roundEndCountdown,
      teamScores: {
        [TEAMS.ATTACKERS]: Number(this.teamScores?.[TEAMS.ATTACKERS] ?? 0),
        [TEAMS.DEFENDERS]: Number(this.teamScores?.[TEAMS.DEFENDERS] ?? 0),
      },
    };
  }

  applySnapshot(snapshot = null) {
    if (!snapshot || typeof snapshot !== 'object') {
      return;
    }

    this.roundNumber = Math.max(1, Number(snapshot.roundNumber ?? this.roundNumber ?? 1));
    this.phase = String(snapshot.phase ?? this.phase ?? 'waiting');
    this.phaseTime = Math.max(0, Number(snapshot.phaseTime ?? this.phaseTime ?? 0));
    this.freezeDuration = Math.max(0, Number(snapshot.freezeDuration ?? this.freezeDuration ?? 5));
    this.liveDuration = Math.max(0, Number(snapshot.liveDuration ?? this.liveDuration ?? 115));
    this.roundResetDuration = Math.max(0, Number(snapshot.roundResetDuration ?? this.roundResetDuration ?? 5));
    this.winnerTeam = snapshot.winnerTeam ? String(snapshot.winnerTeam) : null;
    this.winReason = snapshot.winReason ? String(snapshot.winReason) : null;
    this.roundEnded = Boolean(snapshot.roundEnded);
    this.roundEndCountdown = Math.max(0, Number(snapshot.roundEndCountdown ?? this.roundEndCountdown ?? 0));
    this.teamScores = {
      [TEAMS.ATTACKERS]: Math.max(0, Number(snapshot.teamScores?.[TEAMS.ATTACKERS] ?? this.teamScores?.[TEAMS.ATTACKERS] ?? 0)),
      [TEAMS.DEFENDERS]: Math.max(0, Number(snapshot.teamScores?.[TEAMS.DEFENDERS] ?? this.teamScores?.[TEAMS.DEFENDERS] ?? 0)),
    };
  }
}
