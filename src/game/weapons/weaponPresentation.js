import * as THREE from 'three';

const SWAY_OFFSET = new THREE.Vector3();

export function updateWeaponPresentation({
  viewModel,
  muzzleFlash,
  currentWeapon,
  isScoped,
  recoil,
  flashTime,
  knifeAttackTime,
  knifeAttackDuration,
  delta,
  lookDelta,
}) {
  if (!viewModel || !currentWeapon) {
    return;
  }

  const swayX = THREE.MathUtils.clamp(
    -lookDelta.x * 0.00055 * currentWeapon.swayScale,
    -0.03,
    0.03,
  );
  const swayY = THREE.MathUtils.clamp(
    lookDelta.y * 0.00045 * currentWeapon.swayScale,
    -0.025,
    0.025,
  );
  SWAY_OFFSET.set(swayX, swayY, 0);

  const { position, rotation, recoilY, recoilZ } = currentWeapon.viewModel;
  const aimViewModel = currentWeapon.aimViewModel ?? currentWeapon.viewModel;
  const scopeBlend = isScoped ? 1 : 0;
  const swayBlend = 1 - scopeBlend;
  const recoilFactor = THREE.MathUtils.lerp(1, currentWeapon.aimRecoilFactor ?? 1, scopeBlend);
  const knifeAttackBlend = knifeAttackTime > 0
    ? Math.sin((1 - knifeAttackTime / knifeAttackDuration) * Math.PI)
    : 0;
  const targetX = THREE.MathUtils.lerp(position.x, aimViewModel.position.x, scopeBlend);
  const targetY = THREE.MathUtils.lerp(position.y, aimViewModel.position.y, scopeBlend);
  const targetZ = THREE.MathUtils.lerp(position.z, aimViewModel.position.z, scopeBlend);
  const targetRotX = THREE.MathUtils.lerp(rotation.x, aimViewModel.rotation.x, scopeBlend);
  const targetRotY = THREE.MathUtils.lerp(rotation.y, aimViewModel.rotation.y, scopeBlend);
  const targetRotZ = THREE.MathUtils.lerp(rotation.z, aimViewModel.rotation.z, scopeBlend);

  viewModel.position.x = THREE.MathUtils.damp(
    viewModel.position.x,
    targetX + SWAY_OFFSET.x * swayBlend - knifeAttackBlend * 0.04,
    18,
    delta,
  );
  viewModel.position.y = THREE.MathUtils.damp(
    viewModel.position.y,
    targetY + SWAY_OFFSET.y * swayBlend + recoil * recoilY * recoilFactor - knifeAttackBlend * 0.05,
    18,
    delta,
  );
  viewModel.position.z = THREE.MathUtils.damp(
    viewModel.position.z,
    targetZ + recoil * recoilZ * recoilFactor - knifeAttackBlend * 0.42,
    22,
    delta,
  );

  viewModel.rotation.x = THREE.MathUtils.damp(
    viewModel.rotation.x,
    targetRotX - recoil * 0.08 * recoilFactor - knifeAttackBlend * 0.32,
    16,
    delta,
  );
  viewModel.rotation.y = THREE.MathUtils.damp(
    viewModel.rotation.y,
    targetRotY - SWAY_OFFSET.x * 0.6 * swayBlend + knifeAttackBlend * 0.16,
    16,
    delta,
  );
  viewModel.rotation.z = THREE.MathUtils.damp(
    viewModel.rotation.z,
    targetRotZ - SWAY_OFFSET.x * 0.8 * swayBlend - knifeAttackBlend * 0.08,
    16,
    delta,
  );

  viewModel.visible = !(isScoped && currentWeapon.hideViewModelWhenScoped);
  muzzleFlash.material.opacity = flashTime > 0 ? flashTime / 0.04 : 0;
  muzzleFlash.scale.setScalar(1 + recoil * 0.35);
}
