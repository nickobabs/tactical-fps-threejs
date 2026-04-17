import {
  DEBUG_MENU_EVENT_TOGGLE_HUD_LAYOUT_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_MOVEMENT_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_REMOTE_AUDIO_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_RECOIL_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_REMOTE_BODY_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_REMOTE_WEAPON_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_VIEWMODEL_TUNING,
  dispatchDebugMenuEvent,
} from './debugMenuEvents.js';
import { makeDebugPanelDraggable } from './makeDebugPanelDraggable.js';

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
  onForceSideSwap,
  onToggleCrouchFatigueDebug,
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
  panel.style.width = '440px';
  panel.style.maxWidth = 'min(440px, calc(100vw - 32px))';
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
  const dragController = makeDebugPanelDraggable(panel, title);

  const help = document.createElement('div');
  help.textContent = '` toggle';
  help.style.marginBottom = '10px';
  help.style.color = 'rgba(174, 211, 255, 0.9)';
  panel.appendChild(help);

  const categories = [
    {
      id: 'live-debugging',
      title: 'Live Debugging',
      description: 'Round controls and other live-match actions.',
      actions: [
        {
          label: 'Force Side Swap',
          description: 'Trigger the competitive side-swap intermission immediately.',
          onClick: () => onForceSideSwap?.(),
        },
        {
          label: 'Crouch Fatigue Debug',
          description: 'Toggle crouch-fatigue values on the movement HUD line.',
          onClick: () => onToggleCrouchFatigueDebug?.(),
        },
      ],
    },
    {
      id: 'gameplay-debugging',
      title: 'Gameplay Debugging',
      description: 'Tuning panels for gameplay, HUD, audio, and presentation.',
      actions: [
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
          label: 'HUD Layout Tuning',
          description: 'Pick a HUD element, outline it on-screen, and tune its live layout values.',
          onClick: () => dispatchDebugMenuEvent(DEBUG_MENU_EVENT_TOGGLE_HUD_LAYOUT_TUNING),
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
      ],
    },
  ];

  let selectedCategoryId = categories[0]?.id ?? null;

  const categoryPicker = document.createElement('div');
  categoryPicker.style.display = 'grid';
  categoryPicker.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
  categoryPicker.style.gap = '8px';
  categoryPicker.style.marginBottom = '12px';
  panel.appendChild(categoryPicker);

  const categoryTitle = document.createElement('div');
  categoryTitle.style.margin = '0 0 8px';
  categoryTitle.style.fontWeight = '700';
  categoryTitle.style.color = 'rgba(174, 211, 255, 0.95)';
  panel.appendChild(categoryTitle);

  const categoryDescription = document.createElement('div');
  categoryDescription.style.marginBottom = '10px';
  categoryDescription.style.fontSize = '11px';
  categoryDescription.style.lineHeight = '1.35';
  categoryDescription.style.color = 'rgba(174, 211, 255, 0.82)';
  panel.appendChild(categoryDescription);

  const actionsGrid = document.createElement('div');
  actionsGrid.style.display = 'grid';
  actionsGrid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
  actionsGrid.style.gap = '8px';
  panel.appendChild(actionsGrid);

  const categoryButtons = new Map();

  function createActionCard(action) {
    const card = document.createElement('button');
    card.type = 'button';
    card.style.display = 'block';
    card.style.width = '100%';
    card.style.minHeight = '88px';
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
    return card;
  }

  function renderSelectedCategory() {
    const selectedCategory = categories.find((category) => category.id === selectedCategoryId) ?? categories[0] ?? null;
    selectedCategoryId = selectedCategory?.id ?? null;
    categoryTitle.textContent = selectedCategory?.title ?? 'Debugging';
    categoryDescription.textContent = selectedCategory?.description ?? '';

    for (const [categoryId, button] of categoryButtons.entries()) {
      const active = categoryId === selectedCategoryId;
      button.style.borderColor = active ? 'rgba(174, 211, 255, 0.7)' : 'rgba(174, 211, 255, 0.22)';
      button.style.background = active ? 'rgba(174, 211, 255, 0.16)' : 'rgba(255,255,255,0.06)';
    }

    actionsGrid.replaceChildren();
    for (const action of selectedCategory?.actions ?? []) {
      actionsGrid.appendChild(createActionCard(action));
    }
  }

  for (const category of categories) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = category.title;
    button.style.padding = '10px';
    button.style.border = '1px solid rgba(174, 211, 255, 0.22)';
    button.style.borderRadius = '8px';
    button.style.background = 'rgba(255,255,255,0.06)';
    button.style.color = '#eef5ff';
    button.style.cursor = 'pointer';
    button.style.textAlign = 'center';
    button.style.fontWeight = '700';
    button.addEventListener('click', () => {
      selectedCategoryId = category.id;
      renderSelectedCategory();
    });
    categoryButtons.set(category.id, button);
    categoryPicker.appendChild(button);
  }

  renderSelectedCategory();

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
      dragController.destroy();
      panel.remove();
    },
  };
}
