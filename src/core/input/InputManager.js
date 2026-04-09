const MOVEMENT_KEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD']);
const PREVENT_DEFAULT_KEYS = new Set(['F3', 'F6', 'F7', 'F9', 'F10', 'Tab']);
const GAMEPLAY_SHORTCUT_BLOCK_KEYS = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyC',
  'Space',
  'ShiftLeft',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
]);

export class InputManager {
  constructor(domElement) {
    this.domElement = domElement;
    this.keys = new Set();
    this.justPressed = new Set();
    this.mouseButtons = new Set();
    this.mouseButtonsJustPressed = new Set();
    this.pointerLocked = false;
    this.lookDelta = { x: 0, y: 0 };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerLockChange = this.handlePointerLockChange.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handlePointerUp);
    window.addEventListener('contextmenu', this.handleContextMenu);
    document.addEventListener('pointerlockchange', this.handlePointerLockChange);
    this.domElement.addEventListener('pointerdown', this.handlePointerDown);
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handlePointerUp);
    window.removeEventListener('contextmenu', this.handleContextMenu);
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
    this.domElement.removeEventListener('pointerdown', this.handlePointerDown);
  }

  isEditableTarget(target) {
    if (!(target instanceof HTMLElement)) {
      return false;
    }
    const tagName = target.tagName;
    return target.isContentEditable || tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
  }

  clearGameplayState() {
    this.keys.clear();
    this.justPressed.clear();
    this.mouseButtons.clear();
    this.mouseButtonsJustPressed.clear();
    this.lookDelta.x = 0;
    this.lookDelta.y = 0;
  }

  handleKeyDown(event) {
    if (this.isEditableTarget(event.target)) {
      return;
    }

    if (this.pointerLocked && GAMEPLAY_SHORTCUT_BLOCK_KEYS.has(event.code) && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
    }

    if (PREVENT_DEFAULT_KEYS.has(event.code)) {
      event.preventDefault();
    }

    if (!this.keys.has(event.code)) {
      this.justPressed.add(event.code);
    }

    this.keys.add(event.code);

    if (MOVEMENT_KEYS.has(event.code) || event.code === 'Space' || event.code === 'ShiftLeft') {
      event.preventDefault();
    }
  }

  handleKeyUp(event) {
    if (this.isEditableTarget(event.target)) {
      return;
    }

    this.keys.delete(event.code);
  }

  handlePointerMove(event) {
    if (!this.pointerLocked) {
      return;
    }

    this.lookDelta.x += event.movementX;
    this.lookDelta.y += event.movementY;
  }

  handlePointerLockChange() {
    this.pointerLocked = document.pointerLockElement === this.domElement;
    if (!this.pointerLocked) {
      this.mouseButtons.clear();
      this.mouseButtonsJustPressed.clear();
    }
  }

  handlePointerDown(event) {
    if (!this.pointerLocked) {
      this.domElement.requestPointerLock();
      return;
    }

    this.registerMouseButton(event);
  }

  handleMouseDown(event) {
    if (!this.pointerLocked) {
      return;
    }

    this.registerMouseButton(event);
  }

  registerMouseButton(event) {
    if (!this.mouseButtons.has(event.button)) {
      this.mouseButtonsJustPressed.add(event.button);
    }

    this.mouseButtons.add(event.button);
    event.preventDefault();
  }

  handlePointerUp(event) {
    this.mouseButtons.delete(event.button);
  }

  handleContextMenu(event) {
    if (this.pointerLocked) {
      event.preventDefault();
    }
  }

  isPressed(code) {
    return this.keys.has(code);
  }

  wasPressed(code) {
    return this.justPressed.has(code);
  }

  isMouseButtonPressed(button) {
    return this.mouseButtons.has(button);
  }

  consumeFrameState() {
    const frame = {
      lookDelta: { ...this.lookDelta },
      mouseButtons: new Set(this.mouseButtons),
      justPressed: new Set(this.justPressed),
      mouseButtonsJustPressed: new Set(this.mouseButtonsJustPressed),
    };

    this.lookDelta.x = 0;
    this.lookDelta.y = 0;
    this.justPressed.clear();
    this.mouseButtonsJustPressed.clear();

    return frame;
  }
}
