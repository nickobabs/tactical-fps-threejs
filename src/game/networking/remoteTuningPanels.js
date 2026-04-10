import {
  DEBUG_MENU_EVENT_TOGGLE_REMOTE_BODY_TUNING,
  DEBUG_MENU_EVENT_TOGGLE_REMOTE_WEAPON_TUNING,
} from '../../app/debugMenuEvents.js';

function clonePose(pose) {
  return {
    position: [...pose.position],
    rotation: [...pose.rotation],
    scale: pose.scale,
  };
}

function createBasePanel({ titleText, helpText, side, width }) {
  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.top = '72px';
  panel.style[side] = '16px';
  panel.style.zIndex = '1200';
  panel.style.width = width;
  panel.style.maxHeight = 'calc(100vh - 96px)';
  panel.style.overflow = 'auto';
  panel.style.padding = '12px';
  panel.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  panel.style.background = 'rgba(10, 14, 20, 0.92)';
  panel.style.color = '#e5edf7';
  panel.style.fontFamily = 'monospace';
  panel.style.fontSize = '12px';
  panel.style.borderRadius = '10px';
  panel.style.display = 'none';
  panel.style.backdropFilter = 'blur(8px)';

  const title = document.createElement('div');
  title.textContent = titleText;
  title.style.fontWeight = '700';
  title.style.marginBottom = '10px';
  panel.appendChild(title);

  const help = document.createElement('div');
  help.textContent = helpText;
  help.style.opacity = '0.72';
  help.style.marginBottom = '10px';
  panel.appendChild(help);

  return panel;
}

export function createRemoteWeaponTuningPanelUi({
  defaultSocketPoses,
  defaultDebugSettings,
  remoteClips,
  ensureRemoteWeaponTuning,
}) {
  if (typeof document === 'undefined') {
    return {
      destroy() {},
    };
  }

  const panel = createBasePanel({
    titleText: 'Remote Weapon Tuning',
    helpText: 'F7 toggle • values save automatically',
    side: 'right',
    width: '320px',
  });

  const poseSelect = document.createElement('select');
  poseSelect.style.width = '100%';
  poseSelect.style.marginBottom = '12px';
  poseSelect.style.background = '#0f1720';
  poseSelect.style.color = '#e5edf7';
  poseSelect.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  poseSelect.style.borderRadius = '6px';
  poseSelect.style.padding = '6px';
  for (const key of Object.keys(defaultSocketPoses)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    poseSelect.appendChild(option);
  }
  panel.appendChild(poseSelect);

  const controlsHost = document.createElement('div');
  panel.appendChild(controlsHost);

  const freezeRow = document.createElement('label');
  freezeRow.style.display = 'grid';
  freezeRow.style.gridTemplateColumns = '1fr auto';
  freezeRow.style.alignItems = 'center';
  freezeRow.style.gap = '8px';
  freezeRow.style.marginBottom = '8px';

  const freezeLabel = document.createElement('span');
  freezeLabel.textContent = 'Freeze Pose';
  freezeRow.appendChild(freezeLabel);

  const freezeToggle = document.createElement('input');
  freezeToggle.type = 'checkbox';
  freezeRow.appendChild(freezeToggle);
  panel.appendChild(freezeRow);

  const freezeClipSelect = document.createElement('select');
  freezeClipSelect.style.width = '100%';
  freezeClipSelect.style.marginBottom = '12px';
  freezeClipSelect.style.background = '#0f1720';
  freezeClipSelect.style.color = '#e5edf7';
  freezeClipSelect.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  freezeClipSelect.style.borderRadius = '6px';
  freezeClipSelect.style.padding = '6px';
  for (const [label, value] of [
    ['idle', remoteClips.idle],
    ['run', remoteClips.runForward],
    ['run back', remoteClips.runBackward],
    ['strafe left', remoteClips.strafeLeft],
    ['strafe right', remoteClips.strafeRight],
    ['crouch idle', remoteClips.crouchIdle],
    ['crouch walk', remoteClips.crouchWalk],
    ['jump', remoteClips.jump],
  ]) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    freezeClipSelect.appendChild(option);
  }
  panel.appendChild(freezeClipSelect);

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset All';
  resetButton.style.marginTop = '12px';
  resetButton.style.width = '100%';
  resetButton.style.padding = '8px';
  resetButton.style.background = '#1f2937';
  resetButton.style.color = '#e5edf7';
  resetButton.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  resetButton.style.borderRadius = '6px';
  resetButton.style.cursor = 'pointer';
  panel.appendChild(resetButton);

  document.body.appendChild(panel);

  const controlSpecs = [
    { id: 'posX', label: 'Pos X', kind: 'position', index: 0, min: -0.3, max: 0.3, step: 0.001 },
    { id: 'posY', label: 'Pos Y', kind: 'position', index: 1, min: -0.3, max: 0.3, step: 0.001 },
    { id: 'posZ', label: 'Pos Z', kind: 'position', index: 2, min: -0.3, max: 0.3, step: 0.001 },
    { id: 'rotX', label: 'Rot X', kind: 'rotation', index: 0, min: -3.2, max: 3.2, step: 0.01 },
    { id: 'rotY', label: 'Rot Y', kind: 'rotation', index: 1, min: -3.2, max: 3.2, step: 0.01 },
    { id: 'rotZ', label: 'Rot Z', kind: 'rotation', index: 2, min: -3.2, max: 3.2, step: 0.01 },
    { id: 'scale', label: 'Scale', kind: 'scale', min: 0.2, max: 2.5, step: 0.01 },
  ];

  const controls = new Map();
  for (const spec of controlSpecs) {
    const row = document.createElement('label');
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '52px 1fr 58px';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.marginBottom = '8px';

    const label = document.createElement('span');
    label.textContent = spec.label;
    row.appendChild(label);

    const range = document.createElement('input');
    range.type = 'range';
    range.min = String(spec.min);
    range.max = String(spec.max);
    range.step = String(spec.step);
    row.appendChild(range);

    const number = document.createElement('input');
    number.type = 'number';
    number.min = String(spec.min);
    number.max = String(spec.max);
    number.step = String(spec.step);
    number.style.width = '58px';
    number.style.background = '#0f1720';
    number.style.color = '#e5edf7';
    number.style.border = '1px solid rgba(148, 163, 184, 0.35)';
    number.style.borderRadius = '4px';
    number.style.padding = '4px';
    row.appendChild(number);

    controlsHost.appendChild(row);
    controls.set(spec.id, { spec, range, number });
  }

  function getCurrentPoseKey() {
    return poseSelect.value;
  }

  function syncInputsFromPose() {
    const pose = ensureRemoteWeaponTuning().weaponPoses[getCurrentPoseKey()];
    const debug = ensureRemoteWeaponTuning().debug;
    freezeToggle.checked = Boolean(debug.freezePose);
    freezeClipSelect.value = debug.freezeClip ?? defaultDebugSettings.freezeClip;
    freezeClipSelect.disabled = !freezeToggle.checked;
    for (const { spec, range, number } of controls.values()) {
      const value = spec.kind === 'scale'
        ? pose.scale
        : pose[spec.kind][spec.index];
      const text = String(Number(value).toFixed(spec.kind === 'rotation' ? 2 : 3));
      range.value = text;
      number.value = text;
    }
  }

  function writePoseValue(spec, nextValue) {
    const pose = clonePose(ensureRemoteWeaponTuning().weaponPoses[getCurrentPoseKey()]);
    if (spec.kind === 'scale') {
      pose.scale = nextValue;
    } else {
      pose[spec.kind][spec.index] = nextValue;
    }
    window.__remoteWeaponTuning.setPose(getCurrentPoseKey(), pose);
  }

  for (const { spec, range, number } of controls.values()) {
    const applyValue = (rawValue) => {
      const nextValue = Number(rawValue);
      if (!Number.isFinite(nextValue)) {
        return;
      }
      writePoseValue(spec, nextValue);
      const text = String(Number(nextValue).toFixed(spec.kind === 'rotation' ? 2 : 3));
      range.value = text;
      number.value = text;
    };
    range.addEventListener('input', (event) => applyValue(event.target.value));
    number.addEventListener('input', (event) => applyValue(event.target.value));
  }

  poseSelect.addEventListener('change', () => syncInputsFromPose());
  freezeToggle.addEventListener('change', () => {
    window.__remoteWeaponTuning.setDebug({
      freezePose: freezeToggle.checked,
    });
    freezeClipSelect.disabled = !freezeToggle.checked;
  });
  freezeClipSelect.addEventListener('change', () => {
    window.__remoteWeaponTuning.setDebug({
      freezeClip: freezeClipSelect.value,
    });
  });
  resetButton.addEventListener('click', () => {
    window.__remoteWeaponTuning.reset();
    syncInputsFromPose();
  });

  function togglePanel() {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display !== 'none') {
      syncInputsFromPose();
    }
  }

  function handleKeyDown(event) {
    if (event.code !== 'F7') {
      return;
    }
    togglePanel();
    event.preventDefault();
  }
  function handleDebugMenuToggle() {
    togglePanel();
  }

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener(DEBUG_MENU_EVENT_TOGGLE_REMOTE_WEAPON_TUNING, handleDebugMenuToggle);
  ensureRemoteWeaponTuning();
  syncInputsFromPose();

  return {
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener(DEBUG_MENU_EVENT_TOGGLE_REMOTE_WEAPON_TUNING, handleDebugMenuToggle);
      panel.remove();
    },
  };
}

export function createRemoteCharacterTuningPanelUi({
  getRemoteCharacterModelScale,
  getRemoteAimSettings,
  getRemoteHitboxSettings,
  getRemoteDebugSettings,
  ensureRemoteWeaponTuning,
}) {
  if (typeof document === 'undefined') {
    return {
      destroy() {},
    };
  }

  const panel = createBasePanel({
    titleText: 'Remote Body Tuning',
    helpText: 'F6 toggle • model scale + aim axes',
    side: 'left',
    width: '340px',
  });

  const createRow = (spec) => {
    const row = document.createElement('label');
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '92px 1fr 58px';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.marginBottom = '8px';

    const label = document.createElement('span');
    label.textContent = spec.label;
    row.appendChild(label);

    const range = document.createElement('input');
    range.type = 'range';
    range.min = String(spec.min);
    range.max = String(spec.max);
    range.step = String(spec.step);
    row.appendChild(range);

    const number = document.createElement('input');
    number.type = 'number';
    number.min = String(spec.min);
    number.max = String(spec.max);
    number.step = String(spec.step);
    number.style.width = '58px';
    number.style.background = '#0f1720';
    number.style.color = '#e5edf7';
    number.style.border = '1px solid rgba(148, 163, 184, 0.35)';
    number.style.borderRadius = '4px';
    number.style.padding = '4px';
    row.appendChild(number);

    panel.appendChild(row);
    return { spec, range, number };
  };

  const modelScaleControl = createRow({ label: 'Model Scale', min: 0.9, max: 1.35, step: 0.005 });

  const createSelectRow = (labelText, options) => {
    const row = document.createElement('label');
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '92px 1fr';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.marginBottom = '8px';

    const label = document.createElement('span');
    label.textContent = labelText;
    row.appendChild(label);

    const select = document.createElement('select');
    select.style.background = '#0f1720';
    select.style.color = '#e5edf7';
    select.style.border = '1px solid rgba(148, 163, 184, 0.35)';
    select.style.borderRadius = '4px';
    select.style.padding = '4px';
    for (const optionValue of options) {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = optionValue.toUpperCase();
      select.appendChild(option);
    }
    panel.appendChild(row);
    row.appendChild(select);
    return select;
  };

  const weaponAxisSelect = createSelectRow('Weapon Axis', ['x', 'y', 'z']);
  const proxyWeaponAxisSelect = createSelectRow('Proxy Axis', ['x', 'y', 'z']);
  const boneAxisSelect = createSelectRow('Bone Axis', ['x', 'y', 'z']);
  const boneStrengthControl = createRow({ label: 'Bone Str', min: 0, max: 4, step: 0.05 });
  const weaponStrengthControl = createRow({ label: 'Weap Str', min: 0, max: 3, step: 0.05 });
  const headOffsetXControl = createRow({ label: 'Head X', min: -0.3, max: 0.3, step: 0.005 });
  const headOffsetYControl = createRow({ label: 'Head Y', min: -0.3, max: 0.3, step: 0.005 });
  const headOffsetZControl = createRow({ label: 'Head Z', min: -0.3, max: 0.3, step: 0.005 });
  const headRadiusControl = createRow({ label: 'Head Rad', min: 0.04, max: 0.25, step: 0.005 });

  const localHitboxDebugRow = document.createElement('label');
  localHitboxDebugRow.style.display = 'flex';
  localHitboxDebugRow.style.alignItems = 'center';
  localHitboxDebugRow.style.gap = '8px';
  localHitboxDebugRow.style.marginTop = '12px';
  localHitboxDebugRow.style.marginBottom = '8px';
  const localHitboxDebugToggle = document.createElement('input');
  localHitboxDebugToggle.type = 'checkbox';
  const localHitboxDebugLabel = document.createElement('span');
  localHitboxDebugLabel.textContent = 'Local Hitbox Debug';
  localHitboxDebugRow.appendChild(localHitboxDebugToggle);
  localHitboxDebugRow.appendChild(localHitboxDebugLabel);
  panel.appendChild(localHitboxDebugRow);

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset All';
  resetButton.style.marginTop = '12px';
  resetButton.style.width = '100%';
  resetButton.style.padding = '8px';
  resetButton.style.background = '#1f2937';
  resetButton.style.color = '#e5edf7';
  resetButton.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  resetButton.style.borderRadius = '6px';
  resetButton.style.cursor = 'pointer';
  panel.appendChild(resetButton);

  document.body.appendChild(panel);

  function syncModelScale() {
    const value = getRemoteCharacterModelScale();
    const text = String(Number(value).toFixed(3));
    modelScaleControl.range.value = text;
    modelScaleControl.number.value = text;
    const aim = getRemoteAimSettings();
    weaponAxisSelect.value = aim.weaponAxis;
    proxyWeaponAxisSelect.value = aim.proxyWeaponAxis;
    boneAxisSelect.value = aim.boneAxis;
    const boneStrengthText = String(Number(aim.boneStrength).toFixed(2));
    boneStrengthControl.range.value = boneStrengthText;
    boneStrengthControl.number.value = boneStrengthText;
    const weaponStrengthText = String(Number(aim.weaponStrength).toFixed(2));
    weaponStrengthControl.range.value = weaponStrengthText;
    weaponStrengthControl.number.value = weaponStrengthText;
    const hitboxes = getRemoteHitboxSettings();
    const headOffsetXText = String(Number(hitboxes.headOffset.x).toFixed(3));
    headOffsetXControl.range.value = headOffsetXText;
    headOffsetXControl.number.value = headOffsetXText;
    const headOffsetYText = String(Number(hitboxes.headOffset.y).toFixed(3));
    headOffsetYControl.range.value = headOffsetYText;
    headOffsetYControl.number.value = headOffsetYText;
    const headOffsetZText = String(Number(hitboxes.headOffset.z).toFixed(3));
    headOffsetZControl.range.value = headOffsetZText;
    headOffsetZControl.number.value = headOffsetZText;
    const headRadiusText = String(Number(hitboxes.headRadius).toFixed(3));
    headRadiusControl.range.value = headRadiusText;
    headRadiusControl.number.value = headRadiusText;
    const debug = getRemoteDebugSettings();
    localHitboxDebugToggle.checked = Boolean(debug.localHitboxDebug);
  }

  const applyModelScale = (rawValue) => {
    const nextValue = Number(rawValue);
    if (!Number.isFinite(nextValue)) {
      return;
    }
    window.__remoteWeaponTuning.setModelScale(nextValue);
    const text = String(Number(nextValue).toFixed(3));
    modelScaleControl.range.value = text;
    modelScaleControl.number.value = text;
  };
  modelScaleControl.range.addEventListener('input', (event) => applyModelScale(event.target.value));
  modelScaleControl.number.addEventListener('input', (event) => applyModelScale(event.target.value));
  weaponAxisSelect.addEventListener('change', () => window.__remoteWeaponTuning.setAim({ weaponAxis: weaponAxisSelect.value }));
  proxyWeaponAxisSelect.addEventListener('change', () => window.__remoteWeaponTuning.setAim({ proxyWeaponAxis: proxyWeaponAxisSelect.value }));
  boneAxisSelect.addEventListener('change', () => window.__remoteWeaponTuning.setAim({ boneAxis: boneAxisSelect.value }));

  const bindAimStrength = (control, key) => {
    const applyValue = (rawValue) => {
      const nextValue = Number(rawValue);
      if (!Number.isFinite(nextValue)) {
        return;
      }
      window.__remoteWeaponTuning.setAim({ [key]: nextValue });
      const text = String(Number(nextValue).toFixed(2));
      control.range.value = text;
      control.number.value = text;
    };
    control.range.addEventListener('input', (event) => applyValue(event.target.value));
    control.number.addEventListener('input', (event) => applyValue(event.target.value));
  };

  bindAimStrength(boneStrengthControl, 'boneStrength');
  bindAimStrength(weaponStrengthControl, 'weaponStrength');

  const bindHeadOffset = (control, axis) => {
    const applyValue = (rawValue) => {
      const nextValue = Number(rawValue);
      if (!Number.isFinite(nextValue)) {
        return;
      }
      const current = getRemoteHitboxSettings();
      window.__remoteWeaponTuning.setHitboxes({
        headOffset: {
          ...current.headOffset,
          [axis]: nextValue,
        },
      });
      const text = String(Number(nextValue).toFixed(3));
      control.range.value = text;
      control.number.value = text;
    };
    control.range.addEventListener('input', (event) => applyValue(event.target.value));
    control.number.addEventListener('input', (event) => applyValue(event.target.value));
  };

  bindHeadOffset(headOffsetXControl, 'x');
  bindHeadOffset(headOffsetYControl, 'y');
  bindHeadOffset(headOffsetZControl, 'z');

  const applyHeadRadius = (rawValue) => {
    const nextValue = Number(rawValue);
    if (!Number.isFinite(nextValue)) {
      return;
    }
    const current = getRemoteHitboxSettings();
    window.__remoteWeaponTuning.setHitboxes({
      ...current,
      headRadius: nextValue,
    });
    const text = String(Number(nextValue).toFixed(3));
    headRadiusControl.range.value = text;
    headRadiusControl.number.value = text;
  };
  headRadiusControl.range.addEventListener('input', (event) => applyHeadRadius(event.target.value));
  headRadiusControl.number.addEventListener('input', (event) => applyHeadRadius(event.target.value));
  localHitboxDebugToggle.addEventListener('change', () => {
    window.__remoteWeaponTuning.setDebug({
      localHitboxDebug: localHitboxDebugToggle.checked,
    });
  });

  resetButton.addEventListener('click', () => {
    window.__remoteWeaponTuning.reset();
    syncModelScale();
  });

  function togglePanel() {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display !== 'none') {
      syncModelScale();
    }
  }

  function handleKeyDown(event) {
    if (event.code !== 'F6') {
      return;
    }
    togglePanel();
    event.preventDefault();
  }
  function handleDebugMenuToggle() {
    togglePanel();
  }

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener(DEBUG_MENU_EVENT_TOGGLE_REMOTE_BODY_TUNING, handleDebugMenuToggle);
  ensureRemoteWeaponTuning();
  syncModelScale();

  return {
    destroy() {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener(DEBUG_MENU_EVENT_TOGGLE_REMOTE_BODY_TUNING, handleDebugMenuToggle);
      panel.remove();
    },
  };
}
