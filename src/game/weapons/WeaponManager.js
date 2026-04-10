import * as THREE from 'three';
import { WEAPON_CONFIGS, setViewModelTransformValue } from './weaponConfigs.js';
import { createWeaponViewModels, VIEWMODEL_LAYER } from './viewModels.js';
import { updateTemporaryEffects } from './weaponEffects.js';
import { updateWeaponPresentation } from './weaponPresentation.js';
import { createViewModelTuningPanel } from './createViewModelTuningPanel.js';
import { createWeaponRecoilTuningPanel } from './createWeaponRecoilTuningPanel.js';
import { executeKnifeAttack, executeWeaponShot } from './weaponActions.js';
import { canWeaponFire, getScopeState, getWeaponSwapSelection, shouldPlayScopeSound } from './weaponState.js';
import { applyActiveViewModelSelection, getWeaponSelectionState } from './weaponSelection.js';

const MUZZLE_WORLD = new THREE.Vector3();
const FIRE_DIRECTION = new THREE.Vector3();

export class WeaponManager {
  constructor({ camera, scene, shootables = [], audioManager = null, canEquipWeapon = null }) {
    this.camera = camera;
    this.scene = scene;
    this.shootables = shootables;
    this.audioManager = audioManager;
    this.canEquipWeapon = typeof canEquipWeapon === 'function' ? canEquipWeapon : null;

    this.cooldown = 0;
    this.recoil = 0;
    this.flashTime = 0;
    this.shotCount = 0;
    this.timeSinceLastShot = Infinity;
    this.baseFov = camera.fov;
    this.zoomFov = camera.fov;
    this.isScoped = false;
    this.showScopeOverlay = false;
    this.showAdsReticle = false;
    this.activeWeaponKey = null;
    this.activeWeapon = '';
    this.currentWeapon = null;
    this.wasScoped = false;
    this.knifeAttackTime = 0;
    this.knifeAttackDuration = 0.18;
    this.authoritativeCombatEnabled = false;
    this.onFireRequest = null;
    this.onWeaponChanged = null;
    this.debugForceAdsPreview = false;
    this.debugShowMuzzlePreview = false;
    this.debugInfiniteAmmo = true;
    this.playerController = null;
    this.weaponAmmoStates = new Map();
    this.reloadTimeRemaining = 0;
    this.queuedSemiAutoShotTime = 0;

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
    this.recoilTuningPanel = createWeaponRecoilTuningPanel(() => this.activeWeaponKey);

    Object.values(this.viewModels).forEach((viewModel) => {
      viewModel.group.visible = false;
      this.camera.add(viewModel.group);
    });

    this.camera.layers.enable(VIEWMODEL_LAYER);
    this.camera.fov = this.baseFov;
    this.camera.updateProjectionMatrix();

    this.initializeAmmoState();
    this.equipWeapon('rifle');
  }

  initializeAmmoState() {
    this.weaponAmmoStates.clear();
    for (const [weaponKey, weaponConfig] of Object.entries(WEAPON_CONFIGS)) {
      this.weaponAmmoStates.set(weaponKey, {
        ammoInMagazine: Math.max(0, Number(weaponConfig.magazineSize ?? 0)),
        reserveAmmo: Math.max(0, Number(weaponConfig.reserveAmmo ?? 0)),
      });
    }
  }

  getMovementSpeedMultiplier() {
    return this.currentWeapon?.movementSpeedMultiplier ?? 1;
  }

  getWalkSpeedFactor() {
    return this.currentWeapon?.walkSpeedFactor ?? 0.5;
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

  setPlayerController(playerController) {
    this.playerController = playerController ?? null;
  }

  getCurrentAmmoState() {
    return this.weaponAmmoStates.get(this.activeWeaponKey) ?? {
      ammoInMagazine: 0,
      reserveAmmo: 0,
    };
  }

  getHudState() {
    const ammoState = this.getCurrentAmmoState();
    return {
      activeWeaponKey: this.activeWeaponKey,
      activeWeaponLabel: this.activeWeapon,
      ammoInMagazine: ammoState.ammoInMagazine,
      reserveAmmo: ammoState.reserveAmmo,
      magazineSize: Math.max(0, Number(this.currentWeapon?.magazineSize ?? 0)),
      isReloading: this.reloadTimeRemaining > 0,
      reloadTimeRemaining: this.reloadTimeRemaining,
      infiniteAmmo: this.debugInfiniteAmmo,
    };
  }

  canCurrentWeaponReload() {
    const ammoState = this.getCurrentAmmoState();
    const magazineSize = Math.max(0, Number(this.currentWeapon?.magazineSize ?? 0));
    return magazineSize > 0
      && ammoState.ammoInMagazine < magazineSize
      && ammoState.reserveAmmo > 0;
  }

  startReload() {
    if (
      !this.currentWeapon
      || this.debugInfiniteAmmo
      || this.reloadTimeRemaining > 0
      || !this.canCurrentWeaponReload()
    ) {
      return false;
    }

    this.shotCount = 0;
    this.timeSinceLastShot = Infinity;
    this.reloadTimeRemaining = Math.max(0.01, Number(this.currentWeapon.reloadTime ?? 0.01));
    this.queuedSemiAutoShotTime = 0;
    this.isScoped = false;
    this.showScopeOverlay = false;
    this.showAdsReticle = false;
    this.wasScoped = false;
    this.viewModelController?.playReload?.();
    return true;
  }

  completeReload() {
    const ammoState = this.getCurrentAmmoState();
    const magazineSize = Math.max(0, Number(this.currentWeapon?.magazineSize ?? 0));
    if (magazineSize <= 0) {
      return;
    }

    const missingAmmo = Math.max(0, magazineSize - ammoState.ammoInMagazine);
    const transferredAmmo = Math.min(missingAmmo, ammoState.reserveAmmo);
    ammoState.ammoInMagazine += transferredAmmo;
    ammoState.reserveAmmo -= transferredAmmo;
  }

  refillAllAmmo() {
    this.initializeAmmoState();
    this.reloadTimeRemaining = 0;
  }

  equipWeapon(weaponKey) {
    if (this.canEquipWeapon && !this.canEquipWeapon(weaponKey)) {
      return;
    }

    const nextSelectionState = getWeaponSelectionState(this.activeWeaponKey, weaponKey);
    if (!nextSelectionState) {
      return;
    }

    this.shotCount = 0;
    this.timeSinceLastShot = Infinity;
    this.reloadTimeRemaining = 0;
    this.queuedSemiAutoShotTime = 0;
    Object.assign(this, nextSelectionState);
    Object.assign(this, applyActiveViewModelSelection({
      currentViewModel: this.viewModel,
      currentViewModelController: this.viewModelController,
      viewModels: this.viewModels,
      weaponKey,
      currentWeapon: this.currentWeapon,
    }));
    this.viewModelTuningPanel?.sync?.();
    this.recoilTuningPanel?.sync?.();
    this.viewModelTuningPanel?.setForceAdsPreview?.(this.debugForceAdsPreview);
    this.viewModelTuningPanel?.setShowMuzzlePreview?.(this.debugShowMuzzlePreview);
    this.onWeaponChanged?.(weaponKey);
  }

  update(delta, frameInput) {
    this.handleWeaponSwap(frameInput.justPressed);
    this.handleScope(frameInput.mouseButtons);

    this.cooldown = Math.max(0, this.cooldown - delta);
    const previousReloadTimeRemaining = this.reloadTimeRemaining;
    this.reloadTimeRemaining = Math.max(0, this.reloadTimeRemaining - delta);
    if (previousReloadTimeRemaining > 0 && this.reloadTimeRemaining === 0) {
      this.completeReload();
    }
    this.flashTime = Math.max(0, this.flashTime - delta);
    this.recoil = THREE.MathUtils.damp(this.recoil, 0, 16, delta);
    this.knifeAttackTime = Math.max(0, this.knifeAttackTime - delta);
    this.timeSinceLastShot += delta;
    this.queuedSemiAutoShotTime = Math.max(0, this.queuedSemiAutoShotTime - delta);
    this.updateSprayState();
    this.zoomFov = THREE.MathUtils.damp(
      this.zoomFov,
      this.isScoped ? this.currentWeapon.zoomFov : this.baseFov,
      14,
      delta,
    );
    this.camera.fov = this.zoomFov;
    this.camera.updateProjectionMatrix();

    const leftHeld = frameInput.mouseButtons.has(0);
    const leftJustPressed = frameInput.mouseButtonsJustPressed.has(0);
    if (!this.currentWeapon?.automatic && leftJustPressed) {
      this.queuedSemiAutoShotTime = this.getSemiAutoInputBuffer();
    }
    const canViewModelFire = this.viewModelController?.canFire?.() ?? true;
    if (frameInput.justPressed.has('KeyR')) {
      this.startReload();
    }
    const ammoState = this.getCurrentAmmoState();
    const hasMagazine = Number(this.currentWeapon?.magazineSize ?? 0) > 0;
    if (
      leftHeld
      && hasMagazine
      && ammoState.ammoInMagazine <= 0
      && this.reloadTimeRemaining <= 0
    ) {
      this.startReload();
    }
    const triggerRequested = this.currentWeapon?.automatic
      ? leftHeld
      : this.queuedSemiAutoShotTime > 0;
    const shouldFire = canWeaponFire({
      currentWeapon: this.currentWeapon,
      canViewModelFire,
      triggerRequested,
      cooldown: this.cooldown,
      isReloading: this.reloadTimeRemaining > 0,
      ammoInMagazine: ammoState.ammoInMagazine,
    });

    if (shouldFire) {
      this.fire();
      this.queuedSemiAutoShotTime = 0;
    }
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
    this.playerController?.applyVisualRecoil?.(this.currentWeapon.visualRecoil ?? null);
    const sprayShotCount = this.getNextSprayShotCount();
    const ammoState = this.getCurrentAmmoState();
    if (!this.debugInfiniteAmmo && Number(this.currentWeapon.magazineSize ?? 0) > 0) {
      ammoState.ammoInMagazine = Math.max(0, ammoState.ammoInMagazine - 1);
    }
    this.shotCount = sprayShotCount;
    this.timeSinceLastShot = 0;
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
      sprayShotCount,
    });
  }

  getSemiAutoInputBuffer() {
    if (this.currentWeapon?.automatic) {
      return 0;
    }

    return Math.max(
      0.02,
      Math.min(
        Number(this.currentWeapon?.semiAutoInputBuffer ?? 0.08),
        Number(this.currentWeapon?.fireInterval ?? 0.08),
      ),
    );
  }

  getCurrentSprayResetDelay() {
    const sprayRecoil = this.currentWeapon?.sprayRecoil;
    if (!sprayRecoil) {
      return 0;
    }

    const maxShots = Math.max(1, Number(sprayRecoil.maxShots ?? 1));
    const sprayAlpha = THREE.MathUtils.clamp(
      Math.max(this.shotCount - 1, 0) / maxShots,
      0,
      1,
    );
    return Math.max(
      0.01,
      Number(sprayRecoil.shotResetDelay ?? 0.15)
        + (Number(sprayRecoil.sprayResetDelay ?? 0) * sprayAlpha),
    );
  }

  updateSprayState() {
    if (!this.currentWeapon?.sprayRecoil) {
      this.shotCount = 0;
      return;
    }

    if (this.timeSinceLastShot > this.getCurrentSprayResetDelay()) {
      this.shotCount = 0;
    }
  }

  getNextSprayShotCount() {
    if (!this.currentWeapon?.sprayRecoil) {
      return 1;
    }

    this.updateSprayState();
    const maxShots = Math.max(1, Number(this.currentWeapon.sprayRecoil.maxShots ?? 1));
    return Math.min(this.shotCount + 1, maxShots);
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
    const viewModelBob = this.playerController?.getViewModelBobState?.() ?? null;
    updateWeaponPresentation({
      viewModel: this.viewModel,
      muzzleFlash: this.muzzleFlash,
      currentWeapon: this.currentWeapon,
      isScoped: this.isScoped,
      recoil: this.recoil,
      flashTime: this.flashTime,
      knifeAttackTime: this.knifeAttackTime,
      knifeAttackDuration: this.knifeAttackDuration,
      viewModelBob,
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
    this.recoilTuningPanel?.destroy?.();
    Object.values(this.viewModels).forEach((viewModel) => {
      this.camera.remove(viewModel.group);
    });
  }
}
