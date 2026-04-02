import * as THREE from 'three';
import { BASE_FOV, WEAPON_CONFIGS, getWeaponConfigBySlot } from './weaponConfigs.js';
import { createWeaponViewModels, VIEWMODEL_LAYER } from './viewModels.js';
import { updateTemporaryEffects } from './weaponEffects.js';
import { fireHitscan, performKnifeHit, playWeaponAudio } from './weaponFiring.js';
import { updateWeaponPresentation } from './weaponPresentation.js';

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
    this.baseFov = BASE_FOV;
    this.zoomFov = BASE_FOV;
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

    this.raycaster = new THREE.Raycaster();
    this.temporaryObjects = [];
    this.viewModels = createWeaponViewModels();

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
    this.muzzle = activeViewModel.muzzle;
    this.muzzleFlash = activeViewModel.muzzleFlash;
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
    const shouldFire = this.currentWeapon.canFire !== false && (this.currentWeapon.automatic
      ? leftHeld
      : leftHeld && !this.triggerHeld);

    if (shouldFire && this.cooldown === 0) {
      this.fire();
    }

    this.triggerHeld = leftHeld;

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
    this.isScoped = this.currentWeapon.canScope !== false && mouseButtons.has(2);
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
  }

  updateViewModel(delta, lookDelta) {
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
  }

  updateTemporaryObjects(delta) {
    updateTemporaryEffects(this.scene, this.temporaryObjects, delta);
  }

  destroy() {
    this.updateTemporaryObjects(Infinity);
    Object.values(this.viewModels).forEach((viewModel) => {
      this.camera.remove(viewModel.group);
    });
  }
}
