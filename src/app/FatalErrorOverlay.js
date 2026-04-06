export class FatalErrorOverlay {
  constructor(root) {
    this.root = root;
    this.element = null;
  }

  show(error) {
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);

    if (!this.element) {
      this.element = document.createElement('div');
      this.element.style.position = 'fixed';
      this.element.style.inset = '0';
      this.element.style.zIndex = '9999';
      this.element.style.display = 'grid';
      this.element.style.placeItems = 'center';
      this.element.style.background = 'rgba(8, 12, 18, 0.92)';
      this.element.style.color = '#f4f7fb';
      this.element.style.fontFamily = 'monospace';
      this.element.style.padding = '24px';
      this.element.style.whiteSpace = 'pre-wrap';
      this.root.appendChild(this.element);
    }

    this.element.textContent = `Runtime Error\n\n${message}`;
  }

  destroy() {
    this.element?.remove();
    this.element = null;
  }
}
