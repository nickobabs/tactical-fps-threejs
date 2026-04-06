import {
  copyViewModelPose,
  WEAPON_CONFIGS,
  resetViewModelTuning,
  setViewModelTransformValue,
} from './weaponConfigs.js';

export function createViewModelTuningPanel(getWeaponKey, options = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '16px';
  overlay.style.right = '16px';
  overlay.style.zIndex = '10000';
  overlay.style.width = '260px';
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
  title.textContent = 'Viewmodel Tuning';
  title.style.fontWeight = '700';
  title.style.marginBottom = '8px';
  overlay.appendChild(title);

  const help = document.createElement('div');
  help.textContent = 'F4 toggle â€¢ saves automatically';
  help.style.marginBottom = '8px';
  help.style.color = 'rgba(174, 211, 255, 0.9)';
  overlay.appendChild(help);

  const weaponRow = document.createElement('div');
  weaponRow.style.marginBottom = '8px';
  weaponRow.textContent = 'Weapon: ';
  const weaponValue = document.createElement('strong');
  weaponRow.appendChild(weaponValue);
  overlay.appendChild(weaponRow);

  const poseLabel = document.createElement('label');
  poseLabel.style.display = 'block';
  poseLabel.style.marginBottom = '8px';
  poseLabel.textContent = 'Pose';
  const poseSelect = document.createElement('select');
  poseSelect.style.width = '100%';
  poseSelect.style.marginTop = '4px';
  poseSelect.innerHTML = `
    <option value="viewModel">Hip</option>
    <option value="aimViewModel">ADS</option>
  `;
  poseLabel.appendChild(poseSelect);
  overlay.appendChild(poseLabel);

  const adsPreviewLabel = document.createElement('label');
  adsPreviewLabel.style.display = 'flex';
  adsPreviewLabel.style.alignItems = 'center';
  adsPreviewLabel.style.gap = '8px';
  adsPreviewLabel.style.marginBottom = '10px';
  const adsPreviewCheckbox = document.createElement('input');
  adsPreviewCheckbox.type = 'checkbox';
  adsPreviewCheckbox.addEventListener('change', () => {
    options.onForceAdsChange?.(adsPreviewCheckbox.checked);
  });
  const adsPreviewText = document.createElement('span');
  adsPreviewText.textContent = 'Force ADS Preview';
  adsPreviewLabel.append(adsPreviewCheckbox, adsPreviewText);
  overlay.appendChild(adsPreviewLabel);

  const muzzlePreviewLabel = document.createElement('label');
  muzzlePreviewLabel.style.display = 'flex';
  muzzlePreviewLabel.style.alignItems = 'center';
  muzzlePreviewLabel.style.gap = '8px';
  muzzlePreviewLabel.style.marginBottom = '10px';
  const muzzlePreviewCheckbox = document.createElement('input');
  muzzlePreviewCheckbox.type = 'checkbox';
  muzzlePreviewCheckbox.addEventListener('change', () => {
    options.onShowMuzzleChange?.(muzzlePreviewCheckbox.checked);
  });
  const muzzlePreviewText = document.createElement('span');
  muzzlePreviewText.textContent = 'Show Muzzle Preview';
  muzzlePreviewLabel.append(muzzlePreviewCheckbox, muzzlePreviewText);
  overlay.appendChild(muzzlePreviewLabel);

  const sliderState = new Map();
  const createSlider = (labelText, kind, axis, min, max, step) => {
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
    numberInput.style.width = '70px';
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
      valueEl.textContent = nextValue.toFixed(3);
      slider.value = String(nextValue);
      numberInput.value = String(nextValue);
      if (kind === 'muzzle') {
        options.onMuzzleChange?.(weaponKey, poseSelect.value, axis, nextValue);
        return;
      }
      setViewModelTransformValue(weaponKey, poseSelect.value, kind, axis, nextValue);
    };

    slider.addEventListener('input', () => {
      applyValue(Number(slider.value));
    });
    numberInput.addEventListener('input', () => {
      applyValue(Number(numberInput.value));
    });

    row.append(slider, numberInput);
    wrapper.append(header, row);
    overlay.appendChild(wrapper);
    sliderState.set(`${kind}.${axis}`, { slider, valueEl, numberInput });
  };

  createSlider('Pos X', 'position', 'x', -1.5, 1.5, 0.001);
  createSlider('Pos Y', 'position', 'y', -1.5, 1.5, 0.001);
  createSlider('Pos Z', 'position', 'z', -1.5, 1.5, 0.001);
  createSlider('Rot X', 'rotation', 'x', -3.14, 3.14, 0.005);
  createSlider('Rot Y', 'rotation', 'y', -3.14, 3.14, 0.005);
  createSlider('Rot Z', 'rotation', 'z', -3.14, 3.14, 0.005);

  const muzzleTitle = document.createElement('div');
  muzzleTitle.textContent = 'Muzzle';
  muzzleTitle.style.margin = '10px 0 6px';
  muzzleTitle.style.fontWeight = '700';
  overlay.appendChild(muzzleTitle);
  createSlider('Muzzle X', 'muzzle', 'x', -2, 2, 0.001);
  createSlider('Muzzle Y', 'muzzle', 'y', -2, 2, 0.001);
  createSlider('Muzzle Z', 'muzzle', 'z', -2, 2, 0.001);

  const buttons = document.createElement('div');
  buttons.style.display = 'flex';
  buttons.style.gap = '8px';
  buttons.style.marginTop = '8px';

  const resetWeaponButton = document.createElement('button');
  resetWeaponButton.type = 'button';
  resetWeaponButton.textContent = 'Reset Weapon';
  const resetAllButton = document.createElement('button');
  resetAllButton.type = 'button';
  resetAllButton.textContent = 'Reset All';
  const copyHipToAdsButton = document.createElement('button');
  copyHipToAdsButton.type = 'button';
  copyHipToAdsButton.textContent = 'Copy Hip -> ADS';
  for (const button of [resetWeaponButton, resetAllButton, copyHipToAdsButton]) {
    button.style.flex = '1';
    button.style.padding = '8px 10px';
    button.style.border = '1px solid rgba(174, 211, 255, 0.22)';
    button.style.borderRadius = '8px';
    button.style.background = 'rgba(255,255,255,0.06)';
    button.style.color = '#eef5ff';
    button.style.cursor = 'pointer';
  }
  buttons.style.flexWrap = 'wrap';
  copyHipToAdsButton.style.flexBasis = '100%';
  buttons.append(resetWeaponButton, resetAllButton, copyHipToAdsButton);
  overlay.appendChild(buttons);

  const sync = () => {
    const weaponKey = getWeaponKey();
    weaponValue.textContent = weaponKey ?? '--';
    const pose = WEAPON_CONFIGS[weaponKey]?.[poseSelect.value];
    if (!pose) {
      return;
    }
    for (const [key, controls] of sliderState.entries()) {
      const [kind, axis] = key.split('.');
      const value = kind === 'muzzle'
        ? (WEAPON_CONFIGS[weaponKey]?.[poseSelect.value]?.muzzle?.[axis] ?? 0)
        : pose[kind][axis];
      controls.slider.value = String(value);
      controls.numberInput.value = String(value);
      controls.valueEl.textContent = Number(value).toFixed(3);
    }
  };

  poseSelect.addEventListener('change', sync);
  resetWeaponButton.addEventListener('click', () => {
    const weaponKey = getWeaponKey();
    if (!weaponKey) {
      return;
    }
    resetViewModelTuning(weaponKey);
    sync();
  });
  resetAllButton.addEventListener('click', () => {
    resetViewModelTuning();
    sync();
  });
  copyHipToAdsButton.addEventListener('click', () => {
    const weaponKey = getWeaponKey();
    if (!weaponKey) {
      return;
    }
    copyViewModelPose(weaponKey, 'viewModel', 'aimViewModel');
    poseSelect.value = 'aimViewModel';
    sync();
  });

  const handleKeyDown = (event) => {
    if (event.code !== 'F4') {
      return;
    }
    const nextVisible = overlay.style.display === 'none';
    overlay.style.display = nextVisible ? 'block' : 'none';
    if (nextVisible) {
      sync();
    }
    event.preventDefault();
  };
  window.addEventListener('keydown', handleKeyDown);

  sync();

  return {
    sync,
    setForceAdsPreview(value) {
      adsPreviewCheckbox.checked = Boolean(value);
    },
    setShowMuzzlePreview(value) {
      muzzlePreviewCheckbox.checked = Boolean(value);
    },
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      overlay.remove();
    },
  };
}
