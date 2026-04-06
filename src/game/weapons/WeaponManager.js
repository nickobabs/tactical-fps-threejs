import * as THREE from 'three';
import {
  copyViewModelPose,
  WEAPON_CONFIGS,
  getWeaponConfigBySlot,
  resetViewModelTuning,
  setViewModelTransformValue,
} from './weaponConfigs.js';
import { createWeaponViewModels, VIEWMODEL_LAYER } from './viewModels.js';
import { updateTemporaryEffects } from './weaponEffects.js';
import { fireHitscan, performKnifeHit, playWeaponAudio } from './weaponFiring.js';
import { updateWeaponPresentation } from './weaponPresentation.js';

const MUZZLE_WORLD = new THREE.Vector3();
const FIRE_DIRECTION = new THREE.Vector3();

function createViewModelTuningPanel(getWeaponKey, options = {}) {
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
  help.textContent = 'F4 toggle • saves automatically';
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

export class WeaponManager {
  constructor({ camera, scene, shootables = [], audioManager = null }) {
    this.camera = camera;
    this.scene = scene;
    this.shootables = shootables;
    this.audioManager = audioManager;

    this.cooldown = 0;
    this.recoil = 0;
    this.flashTime = 0;
    this.shotCount = 0;
    this.baseFov = camera.fov;
    this.zoomFov = camera.fov;
    this.isScoped = false;
    this.showScopeOverlay = false;
    this.showAdsReticle = false;
    this.activeWeaponKey = null;
    this.activeWeapon = '';
    this.currentWeapon = null;
    this.triggerHeld = false;
    this.wasScoped = false;
    this.knifeAttackTime = 0;
    this.knifeAttackDuration = 0.18;
    this.authoritativeCombatEnabled = false;
    this.onFireRequest = null;
    this.onWeaponChanged = null;
    this.debugForceAdsPreview = false;
    this.debugShowMuzzlePreview = false;

    this.raycaster = new THREE.Raycaster();
    this.temporaryObjects = [];
    this.viewModels = createWeaponViewModels();
    this.viewModelTuningPanel = createViewModelTuningPanel(() => this.activeWeaponKey, {
      onForceAdsChange: (value) => {
        this.debugForceAdsPreview = Boolean(value);
      },
      onShowMuzzleChange: (value) => {
        this.debugShowMuzzlePreview = Boolean(value);
      },
      onMuzzleChange: (weaponKey, poseKey, axis, value) => {
        setViewModelTransformValue(weaponKey, poseKey, 'muzzle', axis, value);
        if (weaponKey === this.activeWeaponKey) {
          this.viewModelController?.setMuzzleOffset?.(WEAPON_CONFIGS[weaponKey]?.[poseKey]?.muzzle);
        }
      },
    });

    Object.values(this.viewModels).forEach((viewModel) => {
      viewModel.group.visible = false;
      this.camera.add(viewModel.group);
    });

    this.camera.layers.enable(VIEWMODEL_LAYER);
    this.camera.fov = this.baseFov;
    this.camera.updateProjectionMatrix();

    this.equipWeapon('rifle');
  }

  getMovementSpeedMultiplier() {
    return this.currentWeapon?.movementSpeedMultiplier ?? 1;
  }

  setBaseFov(value) {
    this.baseFov = Math.max(1, value);
    if (!this.isScoped) {
      this.zoomFov = this.baseFov;
      this.camera.fov = this.baseFov;
      this.camera.updateProjectionMatrix();
    }
  }

  setCombatNetworking({ authoritativeCombatEnabled = false, onFireRequest = null, onWeaponChanged = null } = {}) {
    this.authoritativeCombatEnabled = authoritativeCombatEnabled;
    this.onFireRequest = onFireRequest;
    this.onWeaponChanged = onWeaponChanged;
  }

  equipWeapon(weaponKey) {
    const nextWeapon = WEAPON_CONFIGS[weaponKey];
    if (!nextWeapon || this.activeWeaponKey === weaponKey) {
      return;
    }

    if (this.viewModel) {
      this.viewModel.visible = false;
    }

    this.viewModelController?.group && (this.viewModelController.group.visible = false);

    this.activeWeaponKey = weaponKey;
    this.currentWeapon = nextWeapon;
    this.activeWeapon = nextWeapon.label;
    this.isScoped = false;
    this.showScopeOverlay = false;
    this.showAdsReticle = false;
    this.cooldown = 0;
    this.recoil = 0;
    this.triggerHeld = false;
    this.wasScoped = false;

    const activeViewModel = this.viewModels[weaponKey];
    activeViewModel.group.visible = true;
    this.viewModel = activeViewModel.group;
    this.viewModelController = activeViewModel;
    this.muzzle = activeViewModel.muzzle;
    this.muzzleFlash = activeViewModel.muzzleFlash;
    activeViewModel.setMuzzleOffset?.(this.currentWeapon.viewModel.muzzle);
    activeViewModel.onSelected?.();
    this.viewModelTuningPanel?.sync?.();
    this.viewModelTuningPanel?.setForceAdsPreview?.(this.debugForceAdsPreview);
    this.viewModelTuningPanel?.setShowMuzzlePreview?.(this.debugShowMuzzlePreview);
    this.onWeaponChanged?.(weaponKey);
  }

  update(delta, frameInput) {
    this.handleWeaponSwap(frameInput.justPressed);
    this.handleScope(frameInput.mouseButtons);

    this.cooldown = Math.max(0, this.cooldown - delta);
    this.flashTime = Math.max(0, this.flashTime - delta);
    this.recoil = THREE.MathUtils.damp(this.recoil, 0, 16, delta);
    this.knifeAttackTime = Math.max(0, this.knifeAttackTime - delta);
    this.zoomFov = THREE.MathUtils.damp(
      this.zoomFov,
      this.isScoped ? this.currentWeapon.zoomFov : this.baseFov,
      14,
      delta,
    );
    this.camera.fov = this.zoomFov;
    this.camera.updateProjectionMatrix();

    const leftHeld = frameInput.mouseButtons.has(0);
    const canViewModelFire = this.viewModelController?.canFire?.() ?? true;
    const shouldFire = this.currentWeapon.canFire !== false && canViewModelFire && (this.currentWeapon.automatic
      ? leftHeld
      : leftHeld && !this.triggerHeld);

    if (shouldFire && this.cooldown === 0) {
      this.fire();
    }

    this.triggerHeld = leftHeld;

    Object.values(this.viewModels).forEach((viewModel) => {
      viewModel.update?.(delta);
    });

    this.updateViewModel(delta, frameInput.lookDelta);
    this.updateTemporaryObjects(delta);
  }

  handleWeaponSwap(justPressed) {
    for (const key of justPressed) {
      const weapon = getWeaponConfigBySlot(key);
      if (weapon) {
        this.equipWeapon(weapon.key);
        return;
      }
    }
  }

  handleScope(mouseButtons) {
    this.isScoped = this.currentWeapon.canScope !== false && (mouseButtons.has(2) || this.debugForceAdsPreview);
    this.showScopeOverlay = this.isScoped && this.currentWeapon.hasScopeOverlay;
    this.showAdsReticle = this.isScoped && this.currentWeapon.hasAdsReticle;

    if (this.activeWeaponKey === 'sniper' && this.isScoped !== this.wasScoped && this.currentWeapon.zoomSound) {
      this.audioManager?.play(this.currentWeapon.zoomSound, {
        baseVolume: 0.45,
        pitchMin: 0.995,
        pitchMax: 1.005,
      });
    }

    this.wasScoped = this.isScoped;
  }

  fire() {
    if (this.currentWeapon.canFire === false) {
      return;
    }

    if (this.activeWeaponKey === 'knife') {
      this.performKnifeAttack();
      return;
    }

    this.cooldown = this.currentWeapon.fireInterval;
    this.flashTime = 0.04;
    this.recoil = Math.min(this.recoil + (this.activeWeaponKey === 'sniper' ? 1.25 : 1), 1.5);
    this.shotCount += 1;
    playWeaponAudio(this.audioManager, this.activeWeaponKey, this.currentWeapon);

    this.muzzle.getWorldPosition(MUZZLE_WORLD);
    fireHitscan({
      camera: this.camera,
      scene: this.scene,
      shootables: this.shootables,
      raycaster: this.raycaster,
      temporaryObjects: this.temporaryObjects,
      muzzleWorld: MUZZLE_WORLD,
      weapon: this.currentWeapon,
      isScoped: this.isScoped,
      applyDamage: !this.authoritativeCombatEnabled,
    });
    this.onFireRequest?.({
      weaponKey: this.activeWeaponKey,
      origin: MUZZLE_WORLD,
      direction: this.raycaster.ray.direction,
    });
    this.viewModelController?.playFire?.();
  }

  performKnifeAttack() {
    this.cooldown = this.currentWeapon.fireInterval;
    this.knifeAttackTime = this.knifeAttackDuration;
    playWeaponAudio(this.audioManager, this.activeWeaponKey, this.currentWeapon);
    this.muzzle?.getWorldPosition?.(MUZZLE_WORLD);
    performKnifeHit({
      camera: this.camera,
      shootables: this.shootables,
      raycaster: this.raycaster,
      weapon: this.currentWeapon,
      applyDamage: !this.authoritativeCombatEnabled,
    });
    this.onFireRequest?.({
      weaponKey: this.activeWeaponKey,
      origin: MUZZLE_WORLD,
      direction: this.camera.getWorldDirection(FIRE_DIRECTION),
    });
    this.viewModelController?.playFire?.();
  }

  updateViewModel(delta, lookDelta) {
    const poseKey = this.isScoped ? 'aimViewModel' : 'viewModel';
    this.viewModelController?.setMuzzleOffset?.(this.currentWeapon?.[poseKey]?.muzzle);
    updateWeaponPresentation({
      viewModel: this.viewModel,
      muzzleFlash: this.muzzleFlash,
      currentWeapon: this.currentWeapon,
      isScoped: this.isScoped,
      recoil: this.recoil,
      flashTime: this.flashTime,
      knifeAttackTime: this.knifeAttackTime,
      knifeAttackDuration: this.knifeAttackDuration,
      delta,
      lookDelta,
    });

    if (this.debugShowMuzzlePreview && this.muzzleFlash?.material) {
      this.muzzleFlash.material.opacity = 0.9;
      this.muzzleFlash.visible = true;
      this.muzzleFlash.scale.setScalar(1);
    }
  }

  updateTemporaryObjects(delta) {
    updateTemporaryEffects(this.scene, this.temporaryObjects, delta);
  }

  destroy() {
    this.updateTemporaryObjects(Infinity);
    this.viewModelTuningPanel?.destroy?.();
    Object.values(this.viewModels).forEach((viewModel) => {
      this.camera.remove(viewModel.group);
    });
  }
}
