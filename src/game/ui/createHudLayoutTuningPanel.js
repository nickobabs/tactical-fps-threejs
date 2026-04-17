import { DEBUG_MENU_EVENT_TOGGLE_HUD_LAYOUT_TUNING } from '../../app/debugMenuEvents.js';
import { makeDebugPanelDraggable } from '../../app/makeDebugPanelDraggable.js';
import {
  HUD_LAYOUT_TUNING,
  applyHudLayoutTuningToRoot,
  resetHudLayoutTuning,
  setHudLayoutTuningValue,
} from './hudLayoutTuning.js';

const HUD_LAYOUT_ELEMENTS = [
  {
    key: 'roundWin',
    label: 'Round Win',
    description: 'Tune the round win banner block and its internal spacing.',
    selector: '.hud__round-win',
    controls: [
      ['roundWinTop', 'Top', -200, 480, 1],
      ['roundWinGap', 'Gap', -80, 160, 1],
    ],
  },
  {
    key: 'matchRestart',
    label: 'Transition Banner',
    description: 'Tune the match restart / side swap / overtime banner positions.',
    selector: '.hud__match-restart',
    controls: [
      ['matchRestartTop', 'Match End Top', -200, 640, 1],
      ['matchRestartTransitionTop', 'Transition Top', -200, 900, 1],
    ],
  },
  {
    key: 'roundRoster',
    label: 'Round Roster',
    description: 'Tune the top-center roster block and planted-bomb icon.',
    selector: '.hud__round-roster',
    controls: [
      ['roundRosterTop', 'Roster Top', -200, 240, 1],
      ['roundRosterHeight', 'Roster Height', -200, 320, 1],
      ['roundRosterCenterTop', 'Timer Top', -200, 200, 1],
      ['roundRosterTeamTop', 'Icons Top', -200, 200, 1],
      ['roundRosterScoreTop', 'Score Top', -200, 200, 1],
      ['bombIconSize', 'Bomb Size', -64, 192, 1],
      ['bombIconOffsetX', 'Bomb Offset X', -160, 160, 1],
      ['bombIconOffsetY', 'Bomb Offset Y', -160, 160, 1],
      ['bombPulseMinScale', 'Pulse Min', -2, 4, 0.01],
      ['bombPulseMaxScale', 'Pulse Max', -2, 5, 0.01],
    ],
  },
  {
    key: 'killfeed',
    label: 'Killfeed',
    description: 'Show a dummy killfeed card, outline its true bounds, and tune its internal spacing.',
    selector: '.hud__killfeed',
    controls: [
      ['killfeedTop', 'Top', -240, 240, 1],
      ['killfeedRight', 'Right', -240, 240, 1],
      ['killfeedWidth', 'Feed Width', -200, 960, 1],
      ['killfeedEntryMinWidth', 'Card Min Width', -200, 960, 1],
      ['killfeedPaddingX', 'Padding X', -80, 120, 1],
      ['killfeedPaddingY', 'Padding Y', -80, 120, 1],
      ['killfeedBodyItemGap', 'Body Gap', -80, 120, 1],
      ['killfeedHeadshotItemGap', 'Headshot Gap', -80, 120, 1],
      ['killfeedNameSize', 'Name Size', -40, 120, 1],
      ['killfeedNameOffsetY', 'Name Offset Y', -160, 160, 1],
      ['killfeedWeaponGap', 'Icon Gap', -80, 120, 1],
      ['killfeedRifleBodyWeaponIconSize', 'Rifle Body Size', -64, 192, 1],
      ['killfeedRifleBodyWeaponOffsetY', 'Rifle Body Offset Y', -160, 160, 1],
      ['killfeedRifleHeadshotWeaponSlotWidth', 'Rifle HS Lane', -200, 320, 1],
      ['killfeedRifleHeadshotWeaponIconSize', 'Rifle HS Size', -64, 192, 1],
      ['killfeedRifleHeadshotWeaponOffsetY', 'Rifle HS Offset Y', -160, 160, 1],
      ['killfeedRifleHeadshotWeaponGap', 'Rifle HS Icon Gap', -80, 120, 1],
      ['killfeedSniperBodyWeaponIconSize', 'Sniper Body Size', -64, 192, 1],
      ['killfeedSniperBodyWeaponOffsetY', 'Sniper Body Offset Y', -160, 160, 1],
      ['killfeedSniperHeadshotWeaponSlotWidth', 'Sniper HS Lane', -200, 320, 1],
      ['killfeedSniperHeadshotWeaponIconSize', 'Sniper HS Size', -64, 192, 1],
      ['killfeedSniperHeadshotWeaponOffsetY', 'Sniper HS Offset Y', -160, 160, 1],
      ['killfeedSniperHeadshotWeaponGap', 'Sniper HS Icon Gap', -80, 120, 1],
      ['killfeedPistolBodyWeaponIconSize', 'Pistol Body Size', -64, 192, 1],
      ['killfeedPistolBodyWeaponOffsetY', 'Pistol Body Offset Y', -160, 160, 1],
      ['killfeedPistolHeadshotWeaponSlotWidth', 'Pistol HS Lane', -200, 320, 1],
      ['killfeedPistolHeadshotWeaponIconSize', 'Pistol HS Size', -64, 192, 1],
      ['killfeedPistolHeadshotWeaponOffsetY', 'Pistol HS Offset Y', -160, 160, 1],
      ['killfeedHeadshotIconSize', 'Headshot Size', -64, 160, 1],
      ['killfeedHeadshotOffsetY', 'Headshot Offset Y', -160, 160, 1],
      ['killfeedBorderWidth', 'Border Width', -20, 40, 1],
      ['killfeedBorderRadius', 'Border Radius', -80, 160, 1],
    ],
  },
];

function copyText(text) {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    return Promise.reject(new Error('Clipboard unavailable'));
  }
  return navigator.clipboard.writeText(text);
}

function getElementDefinition(key) {
  return HUD_LAYOUT_ELEMENTS.find((entry) => entry.key === key) ?? HUD_LAYOUT_ELEMENTS[0];
}

function shouldRenderControl(entryKey, selectedElementKey, previewWeapon, previewHeadshot) {
  if (selectedElementKey !== 'killfeed') {
    return true;
  }
  if (entryKey.startsWith('killfeedRifle') && previewWeapon !== 'rifle') {
    return false;
  }
  if (entryKey.startsWith('killfeedSniper') && previewWeapon !== 'sniper') {
    return false;
  }
  if (entryKey.startsWith('killfeedPistol') && previewWeapon !== 'pistol') {
    return false;
  }
  if (!previewHeadshot && (
    entryKey === 'killfeedHeadshotItemGap' ||
    entryKey === 'killfeedWeaponGap' ||
    entryKey === 'killfeedHeadshotIconSize' ||
    entryKey === 'killfeedHeadshotOffsetY' ||
    entryKey.includes('Headshot')
  )) {
    return false;
  }
  if (previewHeadshot && (
    entryKey === 'killfeedBodyItemGap' ||
    entryKey.includes('BodyWeapon')
  )) {
    return false;
  }
  return true;
}

export function createHudLayoutTuningPanel() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '16px';
  overlay.style.right = '352px';
  overlay.style.zIndex = '10000';
  overlay.style.width = '320px';
  overlay.style.maxHeight = 'calc(100vh - 32px)';
  overlay.style.overflowY = 'auto';
  overlay.style.padding = '12px';
  overlay.style.border = '1px solid rgba(174, 211, 255, 0.2)';
  overlay.style.borderRadius = '10px';
  overlay.style.background = 'rgba(10, 14, 20, 0.92)';
  overlay.style.color = '#eef5ff';
  overlay.style.fontFamily = 'monospace';
  overlay.style.fontSize = '12px';
  overlay.style.display = 'none';
  overlay.style.backdropFilter = 'blur(10px)';
  document.body.appendChild(overlay);

  const highlightBox = document.createElement('div');
  highlightBox.style.position = 'fixed';
  highlightBox.style.zIndex = '9999';
  highlightBox.style.pointerEvents = 'none';
  highlightBox.style.border = '1px solid rgba(255, 89, 89, 0.95)';
  highlightBox.style.boxShadow = '0 0 0 1px rgba(255, 179, 179, 0.35) inset, 0 0 14px rgba(255, 34, 34, 0.2)';
  highlightBox.style.background = 'rgba(255, 34, 34, 0.06)';
  highlightBox.style.display = 'none';
  document.body.appendChild(highlightBox);

  const title = document.createElement('div');
  title.textContent = 'HUD Layout Tuning';
  title.style.fontWeight = '700';
  title.style.marginBottom = '8px';
  overlay.appendChild(title);
  const dragController = makeDebugPanelDraggable(overlay, title);

  const help = document.createElement('div');
  help.textContent = 'Pick a HUD element, outline it on-screen, then tune only the relevant values.';
  help.style.marginBottom = '8px';
  help.style.color = 'rgba(174, 211, 255, 0.9)';
  overlay.appendChild(help);

  const selectLabel = document.createElement('label');
  selectLabel.style.display = 'block';
  selectLabel.style.marginBottom = '10px';
  overlay.appendChild(selectLabel);

  const selectHeader = document.createElement('div');
  selectHeader.textContent = 'HUD Element';
  selectHeader.style.marginBottom = '4px';
  selectLabel.appendChild(selectHeader);

  const elementSelect = document.createElement('select');
  elementSelect.style.width = '100%';
  elementSelect.style.padding = '6px 8px';
  elementSelect.style.background = 'rgba(255,255,255,0.06)';
  elementSelect.style.color = '#eef5ff';
  elementSelect.style.border = '1px solid rgba(174, 211, 255, 0.22)';
  elementSelect.style.borderRadius = '6px';
  for (const entry of HUD_LAYOUT_ELEMENTS) {
    const option = document.createElement('option');
    option.value = entry.key;
    option.textContent = entry.label;
    elementSelect.appendChild(option);
  }
  selectLabel.appendChild(elementSelect);

  const elementHelp = document.createElement('div');
  elementHelp.style.marginBottom = '8px';
  elementHelp.style.color = 'rgba(174, 211, 255, 0.8)';
  overlay.appendChild(elementHelp);

  const previewHost = document.createElement('div');
  previewHost.style.display = 'none';
  previewHost.style.marginBottom = '10px';
  previewHost.style.padding = '8px';
  previewHost.style.border = '1px solid rgba(174, 211, 255, 0.16)';
  previewHost.style.borderRadius = '8px';
  previewHost.style.background = 'rgba(255,255,255,0.03)';
  overlay.appendChild(previewHost);

  const previewTitle = document.createElement('div');
  previewTitle.textContent = 'Killfeed Preview';
  previewTitle.style.fontWeight = '700';
  previewTitle.style.marginBottom = '8px';
  previewHost.appendChild(previewTitle);

  const previewWeaponLabel = document.createElement('label');
  previewWeaponLabel.style.display = 'block';
  previewWeaponLabel.style.marginBottom = '8px';
  previewHost.appendChild(previewWeaponLabel);

  const previewWeaponHeader = document.createElement('div');
  previewWeaponHeader.textContent = 'Weapon';
  previewWeaponHeader.style.marginBottom = '4px';
  previewWeaponLabel.appendChild(previewWeaponHeader);

  const previewWeaponSelect = document.createElement('select');
  previewWeaponSelect.style.width = '100%';
  previewWeaponSelect.style.padding = '6px 8px';
  previewWeaponSelect.style.background = 'rgba(255,255,255,0.06)';
  previewWeaponSelect.style.color = '#eef5ff';
  previewWeaponSelect.style.border = '1px solid rgba(174, 211, 255, 0.22)';
  previewWeaponSelect.style.borderRadius = '6px';
  for (const [value, label] of [['rifle', 'Rifle'], ['sniper', 'Sniper'], ['pistol', 'Pistol']]) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    previewWeaponSelect.appendChild(option);
  }
  previewWeaponLabel.appendChild(previewWeaponSelect);

  const previewHeadshotRow = document.createElement('label');
  previewHeadshotRow.style.display = 'flex';
  previewHeadshotRow.style.alignItems = 'center';
  previewHeadshotRow.style.gap = '8px';
  previewHeadshotRow.style.cursor = 'pointer';
  previewHost.appendChild(previewHeadshotRow);

  const previewHeadshotCheckbox = document.createElement('input');
  previewHeadshotCheckbox.type = 'checkbox';
  previewHeadshotCheckbox.checked = true;
  previewHeadshotRow.appendChild(previewHeadshotCheckbox);

  const previewHeadshotText = document.createElement('span');
  previewHeadshotText.textContent = 'Headshot';
  previewHeadshotRow.appendChild(previewHeadshotText);

  const transitionPreviewLabel = document.createElement('label');
  transitionPreviewLabel.style.display = 'none';
  transitionPreviewLabel.style.marginBottom = '8px';
  previewHost.appendChild(transitionPreviewLabel);

  const transitionPreviewHeader = document.createElement('div');
  transitionPreviewHeader.textContent = 'Preview Mode';
  transitionPreviewHeader.style.marginBottom = '4px';
  transitionPreviewLabel.appendChild(transitionPreviewHeader);

  const transitionPreviewSelect = document.createElement('select');
  transitionPreviewSelect.style.width = '100%';
  transitionPreviewSelect.style.padding = '6px 8px';
  transitionPreviewSelect.style.background = 'rgba(255,255,255,0.06)';
  transitionPreviewSelect.style.color = '#eef5ff';
  transitionPreviewSelect.style.border = '1px solid rgba(174, 211, 255, 0.22)';
  transitionPreviewSelect.style.borderRadius = '6px';
  for (const [value, label] of [['transition', 'Side Swap / OT'], ['match-end', 'Match End']]) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    transitionPreviewSelect.appendChild(option);
  }
  transitionPreviewLabel.appendChild(transitionPreviewSelect);

  const controlsHost = document.createElement('div');
  overlay.appendChild(controlsHost);

  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.textContent = 'Copy HUD Values';
  copyButton.style.width = '100%';
  copyButton.style.marginTop = '8px';
  copyButton.style.padding = '8px 10px';
  copyButton.style.border = '1px solid rgba(174, 211, 255, 0.22)';
  copyButton.style.borderRadius = '8px';
  copyButton.style.background = 'rgba(255,255,255,0.06)';
  copyButton.style.color = '#eef5ff';
  copyButton.style.cursor = 'pointer';
  overlay.appendChild(copyButton);

  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.textContent = 'Reset HUD Values';
  resetButton.style.width = '100%';
  resetButton.style.marginTop = '8px';
  resetButton.style.padding = '8px 10px';
  resetButton.style.border = '1px solid rgba(174, 211, 255, 0.22)';
  resetButton.style.borderRadius = '8px';
  resetButton.style.background = 'rgba(255,255,255,0.06)';
  resetButton.style.color = '#eef5ff';
  resetButton.style.cursor = 'pointer';
  overlay.appendChild(resetButton);

  const status = document.createElement('div');
  status.style.marginTop = '8px';
  status.style.color = 'rgba(174, 211, 255, 0.8)';
  overlay.appendChild(status);

  const sliderState = new Map();
  let selectedElementKey = HUD_LAYOUT_ELEMENTS[0].key;
  let frameHandle = 0;

  const buildExportText = () => `HUD_LAYOUT_TUNING = ${JSON.stringify(HUD_LAYOUT_TUNING, null, 2)}`;

  const updateDebugSelection = () => {
    if (overlay.style.display === 'none') {
      delete document.documentElement.dataset.hudDebugElement;
      delete document.documentElement.dataset.hudDebugKillfeedWeapon;
      delete document.documentElement.dataset.hudDebugKillfeedHeadshot;
      delete document.documentElement.dataset.hudDebugTransitionBannerMode;
      return;
    }
    document.documentElement.dataset.hudDebugElement = selectedElementKey;
    if (selectedElementKey === 'killfeed') {
      document.documentElement.dataset.hudDebugKillfeedWeapon = previewWeaponSelect.value;
      document.documentElement.dataset.hudDebugKillfeedHeadshot = String(previewHeadshotCheckbox.checked);
      delete document.documentElement.dataset.hudDebugTransitionBannerMode;
    } else if (selectedElementKey === 'matchRestart') {
      document.documentElement.dataset.hudDebugTransitionBannerMode = transitionPreviewSelect.value;
      delete document.documentElement.dataset.hudDebugKillfeedWeapon;
      delete document.documentElement.dataset.hudDebugKillfeedHeadshot;
    } else {
      delete document.documentElement.dataset.hudDebugKillfeedWeapon;
      delete document.documentElement.dataset.hudDebugKillfeedHeadshot;
      delete document.documentElement.dataset.hudDebugTransitionBannerMode;
    }
  };

  const syncControls = (entryKey, value) => {
    const controls = sliderState.get(entryKey);
    if (!controls) {
      return;
    }
    controls.slider.value = String(value);
    controls.numberInput.value = String(value);
    controls.valueEl.textContent = String(value);
  };

  const applyValue = (entryKey, nextValue) => {
    if (!Number.isFinite(nextValue)) {
      return;
    }

    setHudLayoutTuningValue(entryKey, nextValue);
    applyHudLayoutTuningToRoot();
    syncControls(entryKey, nextValue);
  };

  const createSlider = (entryKey, labelText, min, max, step) => {
    const wrapper = document.createElement('label');
    wrapper.style.display = 'block';
    wrapper.style.marginBottom = '8px';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.gap = '8px';

    const label = document.createElement('span');
    label.textContent = labelText;
    const valueEl = document.createElement('span');
    valueEl.style.color = 'rgba(174, 211, 255, 0.95)';
    header.append(label, valueEl);

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '8px';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = String(min);
    slider.max = String(max);
    slider.step = String(step);
    slider.style.flex = '1';
    slider.style.accentColor = '#aed3ff';

    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.min = String(min);
    numberInput.max = String(max);
    numberInput.step = String(step);
    numberInput.style.width = '82px';
    numberInput.style.padding = '2px 4px';
    numberInput.style.background = 'rgba(255,255,255,0.06)';
    numberInput.style.color = '#eef5ff';
    numberInput.style.border = '1px solid rgba(174, 211, 255, 0.22)';
    numberInput.style.borderRadius = '6px';

    slider.addEventListener('input', () => applyValue(entryKey, Number(slider.value)));
    numberInput.addEventListener('input', () => applyValue(entryKey, Number(numberInput.value)));

    row.append(slider, numberInput);
    wrapper.append(header, row);
    controlsHost.appendChild(wrapper);
    sliderState.set(entryKey, { slider, numberInput, valueEl });
  };

  const renderControls = () => {
    controlsHost.innerHTML = '';
    sliderState.clear();
    const definition = getElementDefinition(selectedElementKey);
    elementSelect.value = definition.key;
    elementHelp.textContent = definition.description;
    previewHost.style.display = (selectedElementKey === 'killfeed' || selectedElementKey === 'matchRestart') ? 'block' : 'none';
    previewTitle.textContent = selectedElementKey === 'matchRestart' ? 'Transition Banner Preview' : 'Killfeed Preview';
    previewWeaponLabel.style.display = selectedElementKey === 'killfeed' ? 'block' : 'none';
    previewHeadshotRow.style.display = selectedElementKey === 'killfeed' ? 'flex' : 'none';
    transitionPreviewLabel.style.display = selectedElementKey === 'matchRestart' ? 'block' : 'none';
    const previewWeapon = previewWeaponSelect.value;
    const previewHeadshot = previewHeadshotCheckbox.checked;
    for (const [entryKey, labelText, min, max, step] of definition.controls) {
      if (!shouldRenderControl(entryKey, selectedElementKey, previewWeapon, previewHeadshot)) {
        continue;
      }
      createSlider(entryKey, labelText, min, max, step);
      syncControls(entryKey, Number(HUD_LAYOUT_TUNING[entryKey] ?? 0));
    }
    updateDebugSelection();
  };

  const syncAll = () => {
    for (const [entryKey, controls] of sliderState.entries()) {
      const value = Number(HUD_LAYOUT_TUNING[entryKey] ?? 0);
      controls.slider.value = String(value);
      controls.numberInput.value = String(value);
      controls.valueEl.textContent = String(value);
    }
    applyHudLayoutTuningToRoot();
    updateDebugSelection();
  };

  const updateHighlightBox = () => {
    if (overlay.style.display === 'none') {
      highlightBox.style.display = 'none';
      frameHandle = window.requestAnimationFrame(updateHighlightBox);
      return;
    }

    const selector = getElementDefinition(selectedElementKey).selector;
    const target = document.querySelector(selector);
    const rect = target?.getBoundingClientRect?.();
    if (rect && rect.width > 0 && rect.height > 0) {
      highlightBox.style.display = 'block';
      highlightBox.style.left = `${rect.left}px`;
      highlightBox.style.top = `${rect.top}px`;
      highlightBox.style.width = `${rect.width}px`;
      highlightBox.style.height = `${rect.height}px`;
    } else {
      highlightBox.style.display = 'none';
    }

    frameHandle = window.requestAnimationFrame(updateHighlightBox);
  };

  copyButton.addEventListener('click', async () => {
    try {
      await copyText(buildExportText());
      status.textContent = 'Copied current HUD values.';
    } catch (error) {
      status.textContent = 'Copy failed. Values are still visible in the panel.';
      console.warn('[createHudLayoutTuningPanel] Failed to copy HUD tuning.', error);
    }
  });

  resetButton.addEventListener('click', () => {
    resetHudLayoutTuning();
    syncAll();
    status.textContent = 'Reset to current defaults.';
  });

  elementSelect.addEventListener('input', () => {
    selectedElementKey = elementSelect.value;
    renderControls();
    status.textContent = '';
  });

  previewWeaponSelect.addEventListener('input', () => {
    renderControls();
    updateDebugSelection();
  });

  previewHeadshotCheckbox.addEventListener('input', () => {
    renderControls();
    updateDebugSelection();
  });

  transitionPreviewSelect.addEventListener('input', () => {
    updateDebugSelection();
  });

  const handleToggle = () => {
    const nextVisible = overlay.style.display === 'none';
    overlay.style.display = nextVisible ? 'block' : 'none';
    if (nextVisible) {
      renderControls();
      syncAll();
      status.textContent = '';
    } else {
      updateDebugSelection();
      highlightBox.style.display = 'none';
    }
  };

  window.addEventListener(DEBUG_MENU_EVENT_TOGGLE_HUD_LAYOUT_TUNING, handleToggle);

  renderControls();
  syncAll();
  frameHandle = window.requestAnimationFrame(updateHighlightBox);

  return {
    sync() {
      syncAll();
    },
    destroy() {
      if (frameHandle) {
        window.cancelAnimationFrame(frameHandle);
      }
      delete document.documentElement.dataset.hudDebugElement;
      delete document.documentElement.dataset.hudDebugKillfeedWeapon;
      delete document.documentElement.dataset.hudDebugKillfeedHeadshot;
      delete document.documentElement.dataset.hudDebugTransitionBannerMode;
      window.removeEventListener(DEBUG_MENU_EVENT_TOGGLE_HUD_LAYOUT_TUNING, handleToggle);
      dragController.destroy();
      highlightBox.remove();
      overlay.remove();
    },
  };
}
