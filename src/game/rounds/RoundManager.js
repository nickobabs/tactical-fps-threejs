import { TEAMS } from '../../shared/constants.js';
import { GAMEMODES, normalizeGamemode } from '../../shared/gamemodes.js';

const DEBUG_FREEZE_DURATION = 5;
const COMPETITIVE_FREEZE_DURATION = 10;
const MATCH_RESTART_DURATION = 15;
const ROUND_INTERMISSION_DURATION = 10;
const REGULATION_MAX_ROUNDS = 24;
const REGULATION_HALF_ROUNDS = 12;
const OVERTIME_HALF_ROUNDS = 3;
const OVERTIME_SET_ROUNDS = 6;
const TEAM_COHORTS = {
  ALPHA: 'alpha',
  BRAVO: 'bravo',
};

function createInitialSideOwnership() {
  return {
    [TEAMS.ATTACKERS]: TEAM_COHORTS.ALPHA,
    [TEAMS.DEFENDERS]: TEAM_COHORTS.BRAVO,
  };
}

function createEmptyPersistentScores() {
  return {
    [TEAM_COHORTS.ALPHA]: 0,
    [TEAM_COHORTS.BRAVO]: 0,
  };
}

export class RoundManager {
  constructor() {
    this.gamemode = normalizeGamemode('debug');
    this.roundNumber = 1;
    this.phase = 'waiting';
    this.phaseTime = 0;
    this.freezeDuration = 5;
    this.liveDuration = 115;
    this.roundResetDuration = 5;
    this.matchRestartDuration = MATCH_RESTART_DURATION;
    this.intermissionDuration = ROUND_INTERMISSION_DURATION;
    this.winnerTeam = null;
    this.winReason = null;
    this.roundEnded = false;
    this.roundEndCountdown = 0;
    this.intermissionReason = null;
    this.teamScores = {
      [TEAMS.ATTACKERS]: 0,
      [TEAMS.DEFENDERS]: 0,
    };
    this.sideOwnership = createInitialSideOwnership();
    this.persistentTeamScores = createEmptyPersistentScores();
    this.matchEnded = false;
    this.matchWinnerTeam = null;
    this.completedRounds = 0;
    this.isOvertime = false;
    this.overtimeSetNumber = 0;
    this.overtimeRoundInSet = 0;
    this.overtimeSetStartScores = createEmptyPersistentScores();
    this.refreshDisplayedTeamScores();
  }

  startWaiting() {
    this.phase = 'waiting';
    this.phaseTime = 0;
    this.resetRoundOutcome();
  }

  setGamemode(gamemode) {
    this.gamemode = normalizeGamemode(gamemode);
    this.freezeDuration = this.gamemode === GAMEMODES.COMPETITIVE
      ? COMPETITIVE_FREEZE_DURATION
      : DEBUG_FREEZE_DURATION;
    return this.gamemode;
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
    this.intermissionReason = null;
  }

  resetMatchState() {
    this.matchEnded = false;
    this.matchWinnerTeam = null;
    this.completedRounds = 0;
    this.isOvertime = false;
    this.overtimeSetNumber = 0;
    this.overtimeRoundInSet = 0;
    this.sideOwnership = createInitialSideOwnership();
    this.persistentTeamScores = createEmptyPersistentScores();
    this.overtimeSetStartScores = createEmptyPersistentScores();
    this.refreshDisplayedTeamScores();
  }

  beginFreeze() {
    this.resetRoundOutcome();
    this.startPhase('freeze');
  }

  beginLive() {
    this.resetRoundOutcome();
    this.startPhase('live');
  }

  beginIntermission(reason) {
    this.phase = 'intermission';
    this.phaseTime = 0;
    this.intermissionReason = String(reason ?? '').trim() || null;
    this.roundEndCountdown = this.intermissionDuration;
  }

  startDebugSideSwapIntermission() {
    this.resetRoundOutcome();
    this.swapSideOwnership();
    this.roundNumber += 1;
    this.beginIntermission('side-swap');
  }

  resetForNextRound() {
    this.roundNumber += 1;
    this.beginFreeze();
  }

  resetMatch(gamemode = this.gamemode) {
    this.setGamemode(gamemode);
    this.roundNumber = 1;
    this.resetMatchState();
    this.beginFreeze();
  }

  getTeamScore(teamKey) {
    return Math.max(0, Number(this.teamScores?.[teamKey] ?? 0));
  }

  getOwningCohortForSide(teamKey) {
    return this.sideOwnership?.[teamKey] === TEAM_COHORTS.BRAVO
      ? TEAM_COHORTS.BRAVO
      : TEAM_COHORTS.ALPHA;
  }

  getPersistentTeamScore(cohortKey) {
    return Math.max(0, Number(this.persistentTeamScores?.[cohortKey] ?? 0));
  }

  refreshDisplayedTeamScores() {
    this.teamScores = {
      [TEAMS.ATTACKERS]: this.getPersistentTeamScore(this.getOwningCohortForSide(TEAMS.ATTACKERS)),
      [TEAMS.DEFENDERS]: this.getPersistentTeamScore(this.getOwningCohortForSide(TEAMS.DEFENDERS)),
    };
  }

  swapSideOwnership() {
    const attackerOwner = this.getOwningCohortForSide(TEAMS.ATTACKERS);
    const defenderOwner = this.getOwningCohortForSide(TEAMS.DEFENDERS);
    this.sideOwnership = {
      [TEAMS.ATTACKERS]: defenderOwner,
      [TEAMS.DEFENDERS]: attackerOwner,
    };
    this.refreshDisplayedTeamScores();
  }

  isScoreTied() {
    return this.getPersistentTeamScore(TEAM_COHORTS.ALPHA) === this.getPersistentTeamScore(TEAM_COHORTS.BRAVO);
  }

  getOvertimeSetWins(cohortKey) {
    return this.getPersistentTeamScore(cohortKey) - Number(this.overtimeSetStartScores?.[cohortKey] ?? 0);
  }

  evaluateMatchEnd(winnerTeam) {
    const winningCohort = this.getOwningCohortForSide(winnerTeam);
    if (!this.isOvertime) {
      if (this.getPersistentTeamScore(winningCohort) >= 13) {
        this.matchEnded = true;
        this.matchWinnerTeam = winnerTeam;
        return true;
      }
      return false;
    }

    if (this.getOvertimeSetWins(winningCohort) >= 4) {
      this.matchEnded = true;
      this.matchWinnerTeam = winnerTeam;
      return true;
    }

    return false;
  }

  prepareNextRoundTransition() {
    this.completedRounds += 1;
    let sideSwap = false;
    let overtimeStarted = false;
    let overtimeSetAdvanced = false;

    if (!this.isOvertime) {
      if (this.completedRounds === REGULATION_HALF_ROUNDS) {
        sideSwap = true;
      }

      if (this.completedRounds >= REGULATION_MAX_ROUNDS && this.isScoreTied()) {
        this.isOvertime = true;
        this.overtimeSetNumber = 1;
        this.overtimeRoundInSet = 0;
        this.overtimeSetStartScores = {
          [TEAM_COHORTS.ALPHA]: this.getPersistentTeamScore(TEAM_COHORTS.ALPHA),
          [TEAM_COHORTS.BRAVO]: this.getPersistentTeamScore(TEAM_COHORTS.BRAVO),
        };
        overtimeStarted = true;
      }
    } else {
      this.overtimeRoundInSet += 1;
      if (this.overtimeRoundInSet === OVERTIME_HALF_ROUNDS) {
        sideSwap = true;
      }

      if (this.overtimeRoundInSet >= OVERTIME_SET_ROUNDS && this.isScoreTied()) {
        this.overtimeSetNumber += 1;
        this.overtimeRoundInSet = 0;
        this.overtimeSetStartScores = {
          [TEAM_COHORTS.ALPHA]: this.getPersistentTeamScore(TEAM_COHORTS.ALPHA),
          [TEAM_COHORTS.BRAVO]: this.getPersistentTeamScore(TEAM_COHORTS.BRAVO),
        };
        overtimeSetAdvanced = true;
      }
    }

    if (sideSwap) {
      this.swapSideOwnership();
    }

    this.roundNumber += 1;
    this.beginFreeze();

    return {
      sideSwap,
      overtimeStarted,
      overtimeSetAdvanced,
      intermissionReason: overtimeStarted
        ? 'overtime'
        : (sideSwap ? 'side-swap' : null),
    };
  }

  endRound(winnerTeam, reason = 'objective') {
    if (this.roundEnded || this.phase !== 'live') {
      return false;
    }

    const resolvedWinner = winnerTeam === TEAMS.DEFENDERS ? TEAMS.DEFENDERS : TEAMS.ATTACKERS;
    const winningCohort = this.getOwningCohortForSide(resolvedWinner);
    this.persistentTeamScores[winningCohort] = this.getPersistentTeamScore(winningCohort) + 1;
    this.refreshDisplayedTeamScores();
    this.winnerTeam = resolvedWinner;
    this.winReason = String(reason ?? 'objective');
    this.roundEnded = true;
    this.evaluateMatchEnd(resolvedWinner);
    this.roundEndCountdown = this.matchEnded ? this.matchRestartDuration : this.roundResetDuration;
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
        if (this.matchEnded) {
          return { type: 'match-ended', winnerTeam: this.matchWinnerTeam, reason: this.winReason };
        }

        const transition = this.prepareNextRoundTransition();
        if (transition.intermissionReason) {
          this.beginIntermission(transition.intermissionReason);
          return {
            type: 'intermission-started',
            reason: transition.intermissionReason,
            sideSwap: transition.sideSwap,
            overtimeStarted: transition.overtimeStarted,
            overtimeSetAdvanced: transition.overtimeSetAdvanced,
          };
        }
        return {
          type: 'phase-changed',
          phase: 'freeze',
          sideSwap: transition.sideSwap,
          overtimeStarted: transition.overtimeStarted,
          overtimeSetAdvanced: transition.overtimeSetAdvanced,
        };
      }
    }

    if (this.phase === 'intermission') {
      this.phaseTime += delta;
      this.roundEndCountdown = Math.max(0, this.roundEndCountdown - delta);
      if (this.roundEndCountdown === 0) {
        this.beginFreeze();
        return { type: 'phase-changed', phase: 'freeze' };
      }
    }

    return null;
  }

  getSnapshot() {
    return {
      gamemode: this.gamemode,
      roundNumber: this.roundNumber,
      phase: this.phase,
      phaseTime: this.phaseTime,
      freezeDuration: this.freezeDuration,
      liveDuration: this.liveDuration,
      roundResetDuration: this.roundResetDuration,
      matchRestartDuration: this.matchRestartDuration,
      intermissionDuration: this.intermissionDuration,
      winnerTeam: this.winnerTeam,
      winReason: this.winReason,
      roundEnded: this.roundEnded,
      roundEndCountdown: this.roundEndCountdown,
      intermissionReason: this.intermissionReason,
      teamScores: {
        [TEAMS.ATTACKERS]: Number(this.teamScores?.[TEAMS.ATTACKERS] ?? 0),
        [TEAMS.DEFENDERS]: Number(this.teamScores?.[TEAMS.DEFENDERS] ?? 0),
      },
      sideOwnership: {
        [TEAMS.ATTACKERS]: this.getOwningCohortForSide(TEAMS.ATTACKERS),
        [TEAMS.DEFENDERS]: this.getOwningCohortForSide(TEAMS.DEFENDERS),
      },
      persistentTeamScores: {
        [TEAM_COHORTS.ALPHA]: this.getPersistentTeamScore(TEAM_COHORTS.ALPHA),
        [TEAM_COHORTS.BRAVO]: this.getPersistentTeamScore(TEAM_COHORTS.BRAVO),
      },
      matchEnded: this.matchEnded,
      matchWinnerTeam: this.matchWinnerTeam,
      completedRounds: this.completedRounds,
      isOvertime: this.isOvertime,
      overtimeSetNumber: this.overtimeSetNumber,
      overtimeRoundInSet: this.overtimeRoundInSet,
      overtimeSetStartScores: {
        [TEAM_COHORTS.ALPHA]: Number(this.overtimeSetStartScores?.[TEAM_COHORTS.ALPHA] ?? 0),
        [TEAM_COHORTS.BRAVO]: Number(this.overtimeSetStartScores?.[TEAM_COHORTS.BRAVO] ?? 0),
      },
    };
  }

  applySnapshot(snapshot = null) {
    if (!snapshot || typeof snapshot !== 'object') {
      return;
    }

    this.gamemode = normalizeGamemode(snapshot.gamemode ?? this.gamemode);
    this.roundNumber = Math.max(1, Number(snapshot.roundNumber ?? this.roundNumber ?? 1));
    this.phase = String(snapshot.phase ?? this.phase ?? 'waiting');
    this.phaseTime = Math.max(0, Number(snapshot.phaseTime ?? this.phaseTime ?? 0));
    this.freezeDuration = Math.max(0, Number(snapshot.freezeDuration ?? this.freezeDuration ?? 5));
    this.liveDuration = Math.max(0, Number(snapshot.liveDuration ?? this.liveDuration ?? 115));
    this.roundResetDuration = Math.max(0, Number(snapshot.roundResetDuration ?? this.roundResetDuration ?? 5));
    this.matchRestartDuration = Math.max(0, Number(snapshot.matchRestartDuration ?? this.matchRestartDuration ?? MATCH_RESTART_DURATION));
    this.intermissionDuration = Math.max(0, Number(snapshot.intermissionDuration ?? this.intermissionDuration ?? ROUND_INTERMISSION_DURATION));
    this.winnerTeam = snapshot.winnerTeam ? String(snapshot.winnerTeam) : null;
    this.winReason = snapshot.winReason ? String(snapshot.winReason) : null;
    this.roundEnded = Boolean(snapshot.roundEnded);
    this.roundEndCountdown = Math.max(0, Number(snapshot.roundEndCountdown ?? this.roundEndCountdown ?? 0));
    this.intermissionReason = snapshot.intermissionReason ? String(snapshot.intermissionReason) : null;
    this.sideOwnership = {
      [TEAMS.ATTACKERS]: snapshot.sideOwnership?.[TEAMS.ATTACKERS] === TEAM_COHORTS.BRAVO
        ? TEAM_COHORTS.BRAVO
        : TEAM_COHORTS.ALPHA,
      [TEAMS.DEFENDERS]: snapshot.sideOwnership?.[TEAMS.DEFENDERS] === TEAM_COHORTS.ALPHA
        ? TEAM_COHORTS.ALPHA
        : TEAM_COHORTS.BRAVO,
    };
    this.persistentTeamScores = {
      [TEAM_COHORTS.ALPHA]: Math.max(0, Number(snapshot.persistentTeamScores?.[TEAM_COHORTS.ALPHA] ?? this.persistentTeamScores?.[TEAM_COHORTS.ALPHA] ?? 0)),
      [TEAM_COHORTS.BRAVO]: Math.max(0, Number(snapshot.persistentTeamScores?.[TEAM_COHORTS.BRAVO] ?? this.persistentTeamScores?.[TEAM_COHORTS.BRAVO] ?? 0)),
    };
    this.refreshDisplayedTeamScores();
    this.matchEnded = Boolean(snapshot.matchEnded);
    this.matchWinnerTeam = snapshot.matchWinnerTeam ? String(snapshot.matchWinnerTeam) : null;
    this.completedRounds = Math.max(0, Number(snapshot.completedRounds ?? this.completedRounds ?? 0));
    this.isOvertime = Boolean(snapshot.isOvertime);
    this.overtimeSetNumber = Math.max(0, Number(snapshot.overtimeSetNumber ?? this.overtimeSetNumber ?? 0));
    this.overtimeRoundInSet = Math.max(0, Number(snapshot.overtimeRoundInSet ?? this.overtimeRoundInSet ?? 0));
    this.overtimeSetStartScores = {
      [TEAM_COHORTS.ALPHA]: Math.max(0, Number(snapshot.overtimeSetStartScores?.[TEAM_COHORTS.ALPHA] ?? this.overtimeSetStartScores?.[TEAM_COHORTS.ALPHA] ?? 0)),
      [TEAM_COHORTS.BRAVO]: Math.max(0, Number(snapshot.overtimeSetStartScores?.[TEAM_COHORTS.BRAVO] ?? this.overtimeSetStartScores?.[TEAM_COHORTS.BRAVO] ?? 0)),
    };
  }
}
