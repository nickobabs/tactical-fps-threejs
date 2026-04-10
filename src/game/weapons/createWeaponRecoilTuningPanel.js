import {
  resetRecoilTuning,
  setRecoilConfigValue,
  WEAPON_CONFIGS,
} from './weaponConfigs.js';
import { DEBUG_MENU_EVENT_TOGGLE_RECOIL_TUNING } from '../../app/debugMenuEvents.js';

const RECOIL_SLIDER_GROUPS = [
  {
    key: 'root',
    label: 'General',
    sliders: [
      ['hipfireSpread', 'Hipfire Spread', 0, 0.08, 0.0005],
    ],
  },
  {
    key: 'visualRecoil',
    label: 'Visual Recoil',
    sliders: [
      ['warmupShots', 'Warmup Shots', 1, 8, 1],
      ['initialPitch', 'Initial Pitch', 0, 0.1, 0.001],
      ['maxPitch', 'Max Pitch', 0, 0.4, 0.001],
      ['shoulderShots', 'Shoulder Shots', 2, 12, 1],
      ['shoulderPitch', 'Shoulder Pitch', 0, 0.2, 0.001],
      ['riseSharpness', 'Rise Sharpness', 0.25, 8, 0.01],
      ['shotResetDelay', 'Reset Delay', 0.01, 1, 0.01],
      ['sprayResetDelay', 'Spray Reset Add', 0, 1, 0.01],
      ['recoveryFast', 'Recovery Fast', 0.01, 40, 0.01],
      ['recoverySlow', 'Recovery Slow', 0.01, 20, 0.01],
      ['maxShots', 'Max Visual Shots', 2, 30, 1],
      ['recoveryShotPenaltyShots', 'Penalty Shots', 2, 30, 1],
      ['recoveryShotPenaltyFactor', 'Penalty Factor', 0.01, 1, 0.01],
      ['aimPullStartShots', 'Aim Pull Start', 1, 20, 1],
      ['aimPullYawMax', 'Aim Pull Yaw', 0, 0.05, 0.0005],
    ],
  },
  {
    key: 'sprayRecoil',
    label: 'Actual Spray',
    sliders: [
      ['warmupShots', 'Warmup Shots', 1, 8, 1],
      ['maxShots', 'Max Spray Shots', 2, 40, 1],
      ['initialOffsetY', 'Initial Y', 0, 0.05, 0.0005],
      ['maxOffsetY', 'Max Y', 0, 0.15, 0.0005],
      ['shoulderShots', 'Shoulder Shots', 2, 16, 1],
      ['shoulderOffsetY', 'Shoulder Y', 0, 0.08, 0.0005],
      ['riseSharpness', 'Rise Sharpness', 0.25, 8, 0.01],
      ['horizontalStartShots', 'Horizontal Start', 1, 20, 1],
      ['maxOffsetX', 'Max X', 0, 0.08, 0.0005],
      ['horizontalExponent', 'Horizontal Exp', 0.25, 4, 0.01],
      ['shotResetDelay', 'Reset Delay', 0.01, 1, 0.01],
      ['sprayResetDelay', 'Spray Reset Add', 0, 1, 0.01],
    ],
  },
];

function formatValue(value, step) {
  if (step >= 1) {
    return String(Math.round(value));
  }

  const decimals = String(step).includes('.') ? String(step).split('.')[1].length : 0;
  return Number(value).toFixed(decimals);
}

function buildWeaponRecoilExport(weaponKey) {
  const weapon = WEAPON_CONFIGS[weaponKey];
  if (!weapon) {
    return '';
  }

  return JSON.stringify({
    weaponKey,
    hipfireSpread: Number(weapon.hipfireSpread ?? 0),
    visualRecoil: structuredClone(weapon.visualRecoil ?? null),
    sprayRecoil: structuredClone(weapon.sprayRecoil ?? null),
  }, null, 2);
}

export function createWeaponRecoilTuningPanel(getWeaponKey) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '16px';
  overlay.style.left = '16px';
  overlay.style.zIndex = '10000';
  overlay.style.width = '300px';
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

  const title = document.createElement('div');
  title.textContent = 'Recoil Tuning';
  title.style.fontWeight = '700';
  title.style.marginBottom = '8px';
  overlay.appendChild(title);

  const help = document.createElement('div');
  help.textContent = 'F2 toggle • saves automatically';
  help.style.marginBottom = '8px';
  help.style.color = 'rgba(174, 211, 255, 0.9)';
  overlay.appendChild(help);

  const weaponRow = document.createElement('div');
  weaponRow.style.marginBottom = '10px';
  weaponRow.textContent = 'Weapon: ';
  const weaponValue = document.createElement('strong');
  weaponRow.appendChild(weaponValue);
  overlay.appendChild(weaponRow);

  const sliderState = new Map();

  const createSlider = (groupKey, entryKey, labelText, min, max, step) => {
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

    const applyValue = (nextValue) => {
      const weaponKey = getWeaponKey();
      if (!weaponKey || !Number.isFinite(nextValue)) {
        return;
      }

      setRecoilConfigValue(weaponKey, groupKey, entryKey, nextValue);
      valueEl.textContent = formatValue(nextValue, step);
      slider.value = String(nextValue);
      numberInput.value = String(nextValue);
    };

    slider.addEventListener('input', () => applyValue(Number(slider.value)));
    numberInput.addEventListener('input', () => applyValue(Number(numberInput.value)));

    row.append(slider, numberInput);
    wrapper.append(header, row);
    overlay.appendChild(wrapper);
    sliderState.set(`${groupKey}.${entryKey}`, { slider, numberInput, valueEl, step });
  };

  for (const group of RECOIL_SLIDER_GROUPS) {
    const sectionTitle = document.createElement('div');
    sectionTitle.textContent = group.label;
    sectionTitle.style.margin = '10px 0 6px';
    sectionTitle.style.fontWeight = '700';
    overlay.appendChild(sectionTitle);

    for (const [entryKey, labelText, min, max, step] of group.sliders) {
      createSlider(group.key, entryKey, labelText, min, max, step);
    }
  }

  const buttons = document.createElement('div');
  buttons.style.display = 'flex';
  buttons.style.gap = '8px';
  buttons.style.marginTop = '8px';
  buttons.style.flexWrap = 'wrap';

  const resetWeaponButton = document.createElement('button');
  resetWeaponButton.type = 'button';
  resetWeaponButton.textContent = 'Reset Weapon';
  const resetAllButton = document.createElement('button');
  resetAllButton.type = 'button';
  resetAllButton.textContent = 'Reset All';
  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.textContent = 'Copy Weapon JSON';
  for (const button of [resetWeaponButton, resetAllButton, copyButton]) {
    button.style.flex = '1';
    button.style.padding = '8px 10px';
    button.style.border = '1px solid rgba(174, 211, 255, 0.22)';
    button.style.borderRadius = '8px';
    button.style.background = 'rgba(255,255,255,0.06)';
    button.style.color = '#eef5ff';
    button.style.cursor = 'pointer';
  }
  copyButton.style.flexBasis = '100%';
  buttons.append(resetWeaponButton, resetAllButton, copyButton);
  overlay.appendChild(buttons);

  const copyStatus = document.createElement('div');
  copyStatus.style.marginTop = '8px';
  copyStatus.style.minHeight = '16px';
  copyStatus.style.color = 'rgba(174, 211, 255, 0.9)';
  overlay.appendChild(copyStatus);

  const sync = () => {
    const weaponKey = getWeaponKey();
    weaponValue.textContent = weaponKey ?? '--';
    const weapon = WEAPON_CONFIGS[weaponKey];
    if (!weapon) {
      return;
    }

    for (const [key, controls] of sliderState.entries()) {
      const [groupKey, entryKey] = key.split('.');
      const value = groupKey === 'root'
        ? Number(weapon?.[entryKey] ?? 0)
        : Number(weapon?.[groupKey]?.[entryKey] ?? 0);
      controls.slider.value = String(value);
      controls.numberInput.value = String(value);
      controls.valueEl.textContent = formatValue(value, controls.step);
    }
  };

  resetWeaponButton.addEventListener('click', () => {
    const weaponKey = getWeaponKey();
    if (!weaponKey) {
      return;
    }
    resetRecoilTuning(weaponKey);
    sync();
  });

  resetAllButton.addEventListener('click', () => {
    resetRecoilTuning();
    sync();
  });

  copyButton.addEventListener('click', async () => {
    const weaponKey = getWeaponKey();
    if (!weaponKey) {
      copyStatus.textContent = 'No active weapon to export.';
      return;
    }

    const exportText = buildWeaponRecoilExport(weaponKey);
    if (!exportText) {
      copyStatus.textContent = 'No recoil config to export.';
      return;
    }

    try {
      await navigator.clipboard.writeText(exportText);
      copyStatus.textContent = `Copied ${weaponKey} recoil JSON.`;
    } catch (error) {
      console.warn('[createWeaponRecoilTuningPanel] Failed to copy recoil tuning.', error);
      copyStatus.textContent = 'Copy failed. Check clipboard permissions.';
    }
  });

  const handleDebugMenuToggle = () => {
    const nextVisible = overlay.style.display === 'none';
    overlay.style.display = nextVisible ? 'block' : 'none';
    if (nextVisible) {
      sync();
    }
  };
  window.addEventListener(DEBUG_MENU_EVENT_TOGGLE_RECOIL_TUNING, handleDebugMenuToggle);

  sync();

  return {
    sync,
    destroy() {
      window.removeEventListener(DEBUG_MENU_EVENT_TOGGLE_RECOIL_TUNING, handleDebugMenuToggle);
      overlay.remove();
    },
  };
}
