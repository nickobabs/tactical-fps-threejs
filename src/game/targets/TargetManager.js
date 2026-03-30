export class TargetManager {
  constructor(targets = []) {
    this.targets = [...targets];
  }

  update(delta, context = {}) {
    for (const target of this.targets) {
      target.update(delta, context);
    }
  }

  destroy() {
    for (const target of this.targets) {
      target.destroy?.();
    }

    this.targets.length = 0;
  }
}
