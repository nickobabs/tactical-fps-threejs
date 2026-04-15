import {
  DEBUG_MENU_EVENT_TOGGLE_MOVEMENT_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_REMOTE_AUDIO_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_RECOIL_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_REMOTE_BODY_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_REMOTE_WEAPON_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_VIEWMODEL_TUNING,
  dispatchDebugMenuEvent,
} from './debugMenuEvents.js';

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return target.isContentEditable || tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
}

export function createDebugMenu({
  container,
  onToggleHudMode,
}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.top = '16px';
  panel.style.left = '50%';
  panel.style.transform = 'translateX(-50%)';
  panel.style.zIndex = '10001';
  panel.style.width = '280px';
  panel.style.padding = '12px';
  panel.style.border = '1px solid rgba(174, 211, 255, 0.2)';
  panel.style.borderRadius = '10px';
  panel.style.background = 'rgba(10, 14, 20, 0.92)';
  panel.style.color = '#eef5ff';
  panel.style.fontFamily = 'monospace';
  panel.style.fontSize = '12px';
  panel.style.display = 'none';
  panel.style.backdropFilter = 'blur(10px)';
  container.appendChild(panel);

  const title = document.createElement('div');
  title.textContent = 'Debug Menu';
  title.style.fontWeight = '700';
  title.style.marginBottom = '8px';
  panel.appendChild(title);

  const help = document.createElement('div');
  help.textContent = '` toggle';
  help.style.marginBottom = '10px';
  help.style.color = 'rgba(174, 211, 255, 0.9)';
  panel.appendChild(help);

  const actions = [
    {
      label: 'Toggle HUD Mode',
      description: 'Switch between classic HUD and debug HUD.',
      onClick: () => onToggleHudMode?.(),
    },
    {
      label: 'Viewmodel Tuning',
      description: 'Adjust first-person weapon pose and muzzle offsets.',
      onClick: () => dispatchDebugMenuEvent(DEBUG_MENU_EVENT_TOGGLE_VIEWMODEL_TUNING),
    },
    {
      label: 'Recoil Tuning',
      description: 'Tune visual recoil, spray recoil, and export current values.',
      onClick: () => dispatchDebugMenuEvent(DEBUG_MENU_EVENT_TOGGLE_RECOIL_TUNING),
    },
    {
      label: 'Movement Tuning',
      description: 'Tune first-person movement bob and footstep timing, pitch, and trim.',
      onClick: () => dispatchDebugMenuEvent(DEBUG_MENU_EVENT_TOGGLE_MOVEMENT_TUNING),
    },
    {
      label: 'Remote Audio Tuning',
      description: 'Tune remote footstep attenuation live on the client and read back exact values.',
      onClick: () => dispatchDebugMenuEvent(DEBUG_MENU_EVENT_TOGGLE_REMOTE_AUDIO_TUNING),
    },
    {
      label: 'Remote Body Tuning',
      description: 'Tune remote player body scale, aim axes, and hitbox helpers.',
      onClick: () => dispatchDebugMenuEvent(DEBUG_MENU_EVENT_TOGGLE_REMOTE_BODY_TUNING),
    },
    {
      label: 'Remote Weapon Tuning',
      description: 'Tune third-person weapon socket poses and animation freeze state.',
      onClick: () => dispatchDebugMenuEvent(DEBUG_MENU_EVENT_TOGGLE_REMOTE_WEAPON_TUNING),
    },
  ];

  for (const action of actions) {
    const card = document.createElement('button');
    card.type = 'button';
    card.style.display = 'block';
    card.style.width = '100%';
    card.style.marginBottom = '8px';
    card.style.padding = '10px';
    card.style.border = '1px solid rgba(174, 211, 255, 0.22)';
    card.style.borderRadius = '8px';
    card.style.background = 'rgba(255,255,255,0.06)';
    card.style.color = '#eef5ff';
    card.style.cursor = 'pointer';
    card.style.textAlign = 'left';

    const label = document.createElement('div');
    label.textContent = action.label;
    label.style.fontWeight = '700';
    label.style.marginBottom = '4px';
    card.appendChild(label);

    const description = document.createElement('div');
    description.textContent = action.description;
    description.style.fontSize = '11px';
    description.style.lineHeight = '1.35';
    description.style.color = 'rgba(174, 211, 255, 0.82)';
    card.appendChild(description);

    card.addEventListener('click', action.onClick);
    panel.appendChild(card);
  }

  function togglePanel() {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  function handleKeyDown(event) {
    if (event.code !== 'Backquote' || isEditableTarget(event.target)) {
      return;
    }

    togglePanel();
    event.preventDefault();
  }

  window.addEventListener('keydown', handleKeyDown);

  return {
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      panel.remove();
    },
  };
}
