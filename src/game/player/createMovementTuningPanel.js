import {
  MOVEMENT_TUNING,
  resetMovementTuning,
  setMovementTuningValue,
} from './movementTuning.js';
import { DEBUG_MENU_EVENT_TOGGLE_MOVEMENT_TUNING } from '../../app/debugMenuEvents.js';
import { makeDebugPanelDraggable } from '../../app/makeDebugPanelDraggable.js';

const MOVEMENT_TUNING_GROUPS = [
  {
    label: 'Footsteps',
    sliders: [
      ['footstepStrideDistanceWalk', 'Walk Stride', 0.5, 4, 0.01],
      ['footstepStrideDistanceCrouch', 'Crouch Stride', 0.5, 4.5, 0.01],
      ['footstepMinHorizontalSpeed', 'Min Speed', 0.05, 2, 0.01],
      ['footstepVolumeWalk', 'Walk Volume', 0, 1, 0.01],
      ['footstepVolumeCrouch', 'Crouch Volume', 0, 1, 0.01],
      ['footstepPitchMinWalk', 'Walk Pitch Min', 0.7, 1.4, 0.01],
      ['footstepPitchMaxWalk', 'Walk Pitch Max', 0.7, 1.4, 0.01],
      ['footstepPitchMinCrouch', 'Crouch Pitch Min', 0.7, 1.4, 0.01],
      ['footstepPitchMaxCrouch', 'Crouch Pitch Max', 0.7, 1.4, 0.01],
      ['footstepDurationWalk', 'Walk Duration', 0.03, 0.3, 0.005],
      ['footstepDurationCrouch', 'Crouch Duration', 0.03, 0.3, 0.005],
      ['footstepMinIntervalWalkMs', 'Walk Min Ms', 0, 200, 1],
      ['footstepMinIntervalCrouchMs', 'Crouch Min Ms', 0, 240, 1],
    ],
  },
  {
    label: 'Bob',
    sliders: [
      ['bobAttack', 'Bob Attack', 0.5, 20, 0.1],
      ['bobDamp', 'Bob Damp', 1, 20, 0.1],
      ['bobOffsetX', 'Offset X', 0, 0.05, 0.0005],
      ['bobOffsetY', 'Offset Y', -0.02, 0.02, 0.0005],
      ['bobRotationX', 'Rot X', -0.03, 0.03, 0.0005],
      ['bobRotationY', 'Rot Y', -0.04, 0.04, 0.0005],
      ['bobRotationZ', 'Rot Z', -0.06, 0.06, 0.0005],
      ['movePullBack', 'Move Pull Back', 0, 0.15, 0.0005],
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

export function createMovementTuningPanel() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '16px';
  overlay.style.right = '16px';
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

  const title = document.createElement('div');
  title.textContent = 'Movement Tuning';
  title.style.fontWeight = '700';
  title.style.marginBottom = '8px';
  overlay.appendChild(title);
  const dragController = makeDebugPanelDraggable(overlay, title);

  const help = document.createElement('div');
  help.textContent = 'Tune movement bob and footstep feel.';
  help.style.marginBottom = '8px';
  help.style.color = 'rgba(174, 211, 255, 0.9)';
  overlay.appendChild(help);

  const sliderState = new Map();

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

    const applyValue = (nextValue) => {
      if (!Number.isFinite(nextValue)) {
        return;
      }

      setMovementTuningValue(entryKey, nextValue);
      valueEl.textContent = formatValue(nextValue, step);
      slider.value = String(nextValue);
      numberInput.value = String(nextValue);
    };

    slider.addEventListener('input', () => applyValue(Number(slider.value)));
    numberInput.addEventListener('input', () => applyValue(Number(numberInput.value)));

    row.append(slider, numberInput);
    wrapper.append(header, row);
    overlay.appendChild(wrapper);
    sliderState.set(entryKey, { slider, numberInput, valueEl, step });
  };

  for (const group of MOVEMENT_TUNING_GROUPS) {
    const sectionTitle = document.createElement('div');
    sectionTitle.textContent = group.label;
    sectionTitle.style.margin = '10px 0 6px';
    sectionTitle.style.fontWeight = '700';
    overlay.appendChild(sectionTitle);

    for (const [entryKey, labelText, min, max, step] of group.sliders) {
      createSlider(entryKey, labelText, min, max, step);
    }
  }

  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.textContent = 'Reset Movement';
  resetButton.style.width = '100%';
  resetButton.style.marginTop = '8px';
  resetButton.style.padding = '8px 10px';
  resetButton.style.border = '1px solid rgba(174, 211, 255, 0.22)';
  resetButton.style.borderRadius = '8px';
  resetButton.style.background = 'rgba(255,255,255,0.06)';
  resetButton.style.color = '#eef5ff';
  resetButton.style.cursor = 'pointer';
  overlay.appendChild(resetButton);

  const sync = () => {
    for (const [entryKey, controls] of sliderState.entries()) {
      const value = Number(MOVEMENT_TUNING[entryKey] ?? 0);
      controls.slider.value = String(value);
      controls.numberInput.value = String(value);
      controls.valueEl.textContent = formatValue(value, controls.step);
    }
  };

  resetButton.addEventListener('click', () => {
    resetMovementTuning();
    sync();
  });

  const handleDebugMenuToggle = () => {
    const nextVisible = overlay.style.display === 'none';
    overlay.style.display = nextVisible ? 'block' : 'none';
    if (nextVisible) {
      sync();
    }
  };
  window.addEventListener(DEBUG_MENU_EVENT_TOGGLE_MOVEMENT_TUNING, handleDebugMenuToggle);

  sync();

  return {
    sync,
    destroy() {
      window.removeEventListener(DEBUG_MENU_EVENT_TOGGLE_MOVEMENT_TUNING, handleDebugMenuToggle);
      dragController.destroy();
      overlay.remove();
    },
  };
}
