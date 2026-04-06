import * as THREE from 'three';
import { WEAPON_CONFIGS, setViewModelTransformValue } from './weaponConfigs.js';
import { createWeaponViewModels, VIEWMODEL_LAYER } from './viewModels.js';
import { updateTemporaryEffects } from './weaponEffects.js';
import { updateWeaponPresentation } from './weaponPresentation.js';
import { createViewModelTuningPanel } from './createViewModelTuningPanel.js';
import { executeKnifeAttack, executeWeaponShot } from './weaponActions.js';
import { canWeaponFire, getScopeState, getWeaponSwapSelection, shouldPlayScopeSound } from './weaponState.js';
import { applyActiveViewModelSelection, getWeaponSelectionState } from './weaponSelection.js';

const MUZZLE_WORLD = new THREE.Vector3();
const FIRE_DIRECTION = new THREE.Vector3();

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
    const nextSelectionState = getWeaponSelectionState(this.activeWeaponKey, weaponKey);
    if (!nextSelectionState) {
      return;
    }

    Object.assign(this, nextSelectionState);
    Object.assign(this, applyActiveViewModelSelection({
      currentViewModel: this.viewModel,
      currentViewModelController: this.viewModelController,
      viewModels: this.viewModels,
      weaponKey,
      currentWeapon: this.currentWeapon,
    }));
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
    const shouldFire = canWeaponFire({
      currentWeapon: this.currentWeapon,
      canViewModelFire,
      leftHeld,
      triggerHeld: this.triggerHeld,
      cooldown: this.cooldown,
    });

    if (shouldFire) {
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
    const nextWeaponKey = getWeaponSwapSelection(justPressed);
    if (nextWeaponKey) {
      this.equipWeapon(nextWeaponKey);
    }
  }

  handleScope(mouseButtons) {
    const scopeState = getScopeState(this.currentWeapon, mouseButtons, this.debugForceAdsPreview);
    this.isScoped = scopeState.isScoped;
    this.showScopeOverlay = scopeState.showScopeOverlay;
    this.showAdsReticle = scopeState.showAdsReticle;

    if (shouldPlayScopeSound({
      activeWeaponKey: this.activeWeaponKey,
      isScoped: this.isScoped,
      wasScoped: this.wasScoped,
      currentWeapon: this.currentWeapon,
    })) {
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
    executeWeaponShot({
      activeWeaponKey: this.activeWeaponKey,
      currentWeapon: this.currentWeapon,
      audioManager: this.audioManager,
      camera: this.camera,
      scene: this.scene,
      shootables: this.shootables,
      raycaster: this.raycaster,
      temporaryObjects: this.temporaryObjects,
      muzzleWorld: MUZZLE_WORLD,
      muzzle: this.muzzle,
      isScoped: this.isScoped,
      authoritativeCombatEnabled: this.authoritativeCombatEnabled,
      onFireRequest: this.onFireRequest,
      viewModelController: this.viewModelController,
    });
  }

  performKnifeAttack() {
    this.cooldown = this.currentWeapon.fireInterval;
    this.knifeAttackTime = this.knifeAttackDuration;
    executeKnifeAttack({
      activeWeaponKey: this.activeWeaponKey,
      currentWeapon: this.currentWeapon,
      audioManager: this.audioManager,
      camera: this.camera,
      shootables: this.shootables,
      raycaster: this.raycaster,
      muzzle: this.muzzle,
      muzzleWorld: MUZZLE_WORLD,
      fireDirection: FIRE_DIRECTION,
      authoritativeCombatEnabled: this.authoritativeCombatEnabled,
      onFireRequest: this.onFireRequest,
      viewModelController: this.viewModelController,
    });
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
