import {
  getBindingForAction,
  getDefaultKeyBindings,
  isActionId,
  loadStoredKeyBindings,
  persistKeyBindings,
  sanitizeBindingValue,
} from './keyBindings.js';

const PREVENT_DEFAULT_KEYS = new Set(['F3', 'F6', 'F7', 'F9', 'F10', 'Tab']);
const CTRL_META_BLOCK_ACTIONS = [
  'moveForward',
  'moveBackward',
  'moveLeft',
  'moveRight',
  'crouch',
  'walk',
  'jump',
  'weaponRifle',
  'weaponPistol',
  'weaponKnife',
  'weaponSniper',
  'weaponBomb',
  'weaponSmoke',
];
const PREVENT_DEFAULT_ACTIONS = [
  'moveForward',
  'moveBackward',
  'moveLeft',
  'moveRight',
  'jump',
  'walk',
  'crouch',
];

export class InputManager {
  constructor(domElement) {
    this.domElement = domElement;
    this.bindings = loadStoredKeyBindings();
    this.keys = new Set();
    this.justPressed = new Set();
    this.mouseButtons = new Set();
    this.mouseButtonsJustPressed = new Set();
    this.pointerLocked = false;
    this.lookDelta = { x: 0, y: 0 };
    this.rebuildBindingCaches();

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

  rebuildBindingCaches() {
    this.keyboardBindingsByAction = new Map();
    this.mouseBindingsByAction = new Map();
    this.actionsByBinding = new Map();
    this.preventDefaultBindings = new Set();
    this.ctrlMetaBlockBindings = new Set();

    for (const [actionId, binding] of Object.entries(this.bindings)) {
      const normalized = sanitizeBindingValue(binding);
      if (!normalized) {
        continue;
      }

      this.actionsByBinding.set(normalized, actionId);
      if (normalized.startsWith('Mouse')) {
        this.mouseBindingsByAction.set(actionId, Number(normalized.slice(5)));
      } else {
        this.keyboardBindingsByAction.set(actionId, normalized);
      }
    }

    for (const actionId of PREVENT_DEFAULT_ACTIONS) {
      const binding = this.keyboardBindingsByAction.get(actionId);
      if (binding) {
        this.preventDefaultBindings.add(binding);
      }
    }

    for (const actionId of CTRL_META_BLOCK_ACTIONS) {
      const binding = this.keyboardBindingsByAction.get(actionId);
      if (binding) {
        this.ctrlMetaBlockBindings.add(binding);
      }
    }
  }

  getBindings() {
    return { ...this.bindings };
  }

  getBinding(actionId) {
    return getBindingForAction(this.bindings, actionId);
  }

  setBinding(actionId, binding) {
    if (!isActionId(actionId)) {
      return false;
    }

    const normalized = sanitizeBindingValue(binding);
    if (!normalized) {
      return false;
    }

    const nextBindings = getDefaultKeyBindings();
    Object.assign(nextBindings, this.bindings);
    nextBindings[actionId] = normalized;
    this.bindings = nextBindings;
    this.rebuildBindingCaches();
    persistKeyBindings(this.bindings);
    return true;
  }

  resetBindings() {
    this.bindings = getDefaultKeyBindings();
    this.rebuildBindingCaches();
    persistKeyBindings(this.bindings);
  }

  isActionPressed(actionId) {
    const mouseButton = this.mouseBindingsByAction.get(actionId);
    if (mouseButton != null) {
      return this.mouseButtons.has(mouseButton);
    }
    const keyCode = this.keyboardBindingsByAction.get(actionId);
    return keyCode ? this.keys.has(keyCode) : false;
  }

  wasActionPressed(actionId) {
    const mouseButton = this.mouseBindingsByAction.get(actionId);
    if (mouseButton != null) {
      return this.mouseButtonsJustPressed.has(mouseButton);
    }
    const keyCode = this.keyboardBindingsByAction.get(actionId);
    return keyCode ? this.justPressed.has(keyCode) : false;
  }

  handleKeyDown(event) {
    if (this.isEditableTarget(event.target)) {
      return;
    }

    if (this.pointerLocked && this.ctrlMetaBlockBindings.has(event.code) && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
    }

    if (PREVENT_DEFAULT_KEYS.has(event.code)) {
      event.preventDefault();
    }

    if (!this.keys.has(event.code)) {
      this.justPressed.add(event.code);
    }

    this.keys.add(event.code);

    if (this.preventDefaultBindings.has(event.code)) {
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
    if (isActionId(code)) {
      return this.isActionPressed(code);
    }
    return this.keys.has(code);
  }

  wasPressed(code) {
    if (isActionId(code)) {
      return this.wasActionPressed(code);
    }
    return this.justPressed.has(code);
  }

  isMouseButtonPressed(button) {
    return this.mouseButtons.has(button);
  }

  consumeFrameState() {
    const actionPressed = new Set();
    const actionJustPressed = new Set();
    for (const actionId of Object.keys(this.bindings)) {
      if (this.isActionPressed(actionId)) {
        actionPressed.add(actionId);
      }
      if (this.wasActionPressed(actionId)) {
        actionJustPressed.add(actionId);
      }
    }

    const frame = {
      lookDelta: { ...this.lookDelta },
      mouseButtons: new Set(this.mouseButtons),
      justPressed: new Set(this.justPressed),
      mouseButtonsJustPressed: new Set(this.mouseButtonsJustPressed),
      actionPressed,
      actionJustPressed,
    };

    this.lookDelta.x = 0;
    this.lookDelta.y = 0;
    this.justPressed.clear();
    this.mouseButtonsJustPressed.clear();

    return frame;
  }
}
