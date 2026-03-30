export class FixedStepLoop {
  constructor(step = 1 / 60) {
    this.step = step;
    this.accumulator = 0;
  }

  advance(delta, callback) {
    this.accumulator += delta;

    while (this.accumulator >= this.step) {
      callback(this.step);
      this.accumulator -= this.step;
    }
  }
}
