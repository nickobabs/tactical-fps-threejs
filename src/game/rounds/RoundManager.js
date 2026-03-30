export class RoundManager {
  constructor() {
    this.roundNumber = 1;
    this.phase = 'freeze';
    this.phaseTime = 0;
    this.freezeDuration = 5;
    this.liveDuration = 115;
  }

  update(delta) {
    this.phaseTime += delta;

    if (this.phase === 'freeze' && this.phaseTime >= this.freezeDuration) {
      this.phase = 'live';
      this.phaseTime = 0;
      return;
    }

    if (this.phase === 'live' && this.phaseTime >= this.liveDuration) {
      this.roundNumber += 1;
      this.phase = 'freeze';
      this.phaseTime = 0;
    }
  }
}
