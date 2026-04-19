export const KEYBIND_STORAGE_KEY = 'tactical-fps-threejs-keybinds';

export const ACTION_DEFINITIONS = [
  { id: 'moveForward', label: 'Move Forward', defaultBinding: 'KeyW' },
  { id: 'moveBackward', label: 'Move Backward', defaultBinding: 'KeyS' },
  { id: 'moveLeft', label: 'Move Left', defaultBinding: 'KeyA' },
  { id: 'moveRight', label: 'Move Right', defaultBinding: 'KeyD' },
  { id: 'jump', label: 'Jump', defaultBinding: 'Space' },
  { id: 'walk', label: 'Walk', defaultBinding: 'ShiftLeft' },
  { id: 'crouch', label: 'Crouch', defaultBinding: 'KeyC' },
  { id: 'reload', label: 'Reload', defaultBinding: 'KeyR' },
  { id: 'fire', label: 'Fire', defaultBinding: 'Mouse0' },
  { id: 'scope', label: 'Scope / ADS', defaultBinding: 'Mouse2' },
  { id: 'weaponRifle', label: 'Equip Rifle', defaultBinding: 'Digit1' },
  { id: 'weaponPistol', label: 'Equip Pistol', defaultBinding: 'Digit2' },
  { id: 'weaponKnife', label: 'Equip Knife', defaultBinding: 'Digit3' },
  { id: 'weaponSniper', label: 'Equip Sniper', defaultBinding: 'Digit4' },
  { id: 'weaponBomb', label: 'Equip Bomb', defaultBinding: 'Digit5' },
  { id: 'weaponSmoke', label: 'Equip Smoke', defaultBinding: 'Digit6' },
  { id: 'spray', label: 'Spray', defaultBinding: 'KeyT' },
  { id: 'openBuyMenu', label: 'Open Buy Menu', defaultBinding: 'KeyB' },
];

export const DEFAULT_KEY_BINDINGS = Object.freeze(Object.fromEntries(
  ACTION_DEFINITIONS.map((definition) => [definition.id, definition.defaultBinding]),
));

const ACTION_IDS = new Set(ACTION_DEFINITIONS.map((definition) => definition.id));

export function isActionId(value) {
  return ACTION_IDS.has(String(value ?? ''));
}

export function getDefaultKeyBindings() {
  return { ...DEFAULT_KEY_BINDINGS };
}

export function sanitizeBindingValue(value) {
  const normalized = String(value ?? '').trim();
  if (/^Mouse[0-4]$/.test(normalized)) {
    return normalized;
  }
  if (/^[A-Za-z0-9]+$/.test(normalized)) {
    return normalized;
  }
  return '';
}

export function sanitizeKeyBindings(bindings = {}) {
  const next = getDefaultKeyBindings();
  for (const actionId of Object.keys(next)) {
    const candidate = sanitizeBindingValue(bindings?.[actionId]);
    if (candidate) {
      next[actionId] = candidate;
    }
  }
  return next;
}

export function loadStoredKeyBindings() {
  if (typeof window === 'undefined') {
    return getDefaultKeyBindings();
  }
  try {
    const raw = window.localStorage.getItem(KEYBIND_STORAGE_KEY);
    if (!raw) {
      return getDefaultKeyBindings();
    }
    return sanitizeKeyBindings(JSON.parse(raw));
  } catch {
    return getDefaultKeyBindings();
  }
}

export function persistKeyBindings(bindings) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(KEYBIND_STORAGE_KEY, JSON.stringify(sanitizeKeyBindings(bindings)));
  } catch {
    // Ignore localStorage write failures.
  }
}

export function getBindingLabel(binding) {
  const value = sanitizeBindingValue(binding);
  if (!value) {
    return 'Unbound';
  }

  if (value === 'Space') {
    return 'Space';
  }
  if (value === 'ShiftLeft' || value === 'ShiftRight') {
    return 'Shift';
  }
  if (value === 'ControlLeft' || value === 'ControlRight') {
    return 'Ctrl';
  }
  if (value === 'AltLeft' || value === 'AltRight') {
    return 'Alt';
  }
  if (value === 'Mouse0') {
    return 'Left Click';
  }
  if (value === 'Mouse1') {
    return 'Middle Click';
  }
  if (value === 'Mouse2') {
    return 'Right Click';
  }
  if (value.startsWith('Key')) {
    return value.slice(3);
  }
  if (value.startsWith('Digit')) {
    return value.slice(5);
  }
  if (value.startsWith('Arrow')) {
    return value.slice(5);
  }
  return value;
}

export function getBindingForAction(bindings, actionId) {
  return sanitizeBindingValue(bindings?.[actionId]) || DEFAULT_KEY_BINDINGS[actionId] || '';
}
