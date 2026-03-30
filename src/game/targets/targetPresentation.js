import {
  BROW_COLOR,
  BODY_COLOR,
  EYE_COLOR,
  EYE_IDLE_COLOR,
  HEAD_COLOR,
  DOWNED_BODY_COLOR,
  DOWNED_HEAD_COLOR,
} from './targetView.js';

export function updateTargetPresentation(target, delta) {
  target.hitFlash = Math.max(0, target.hitFlash - delta);
  const flashStrength = target.respawnTimer > 0 ? 0 : target.hitFlash * 8;
  target.bodyMaterial.emissiveIntensity = flashStrength;
  target.headMaterial.emissiveIntensity = flashStrength * 0.8;
  const isAggro = target.respawnTimer <= 0 && target.isAggro;
  target.eyeMaterial.color.setHex(isAggro ? EYE_COLOR : EYE_IDLE_COLOR);
  target.eyeMaterial.emissiveIntensity = target.respawnTimer > 0 ? 0.04 : isAggro ? 3.4 : 0.18;
  target.browMaterial?.color.setHex(BROW_COLOR);
  target.browMaterial.emissiveIntensity = 0;

  if (target.expressionGroup) {
    target.expressionGroup.visible = isAggro;
  }
}

export function setTargetDownedPresentation(target) {
  target.bodyMaterial.color.setHex(DOWNED_BODY_COLOR);
  target.headMaterial.color.setHex(DOWNED_HEAD_COLOR);
  if (target.expressionGroup) {
    target.expressionGroup.visible = false;
  }
}

export function resetTargetPresentation(target) {
  target.bodyMaterial.color.setHex(BODY_COLOR);
  target.headMaterial.color.setHex(HEAD_COLOR);
  target.bodyMaterial.emissiveIntensity = 0;
  target.headMaterial.emissiveIntensity = 0;
  target.eyeMaterial.color.setHex(EYE_IDLE_COLOR);
  target.eyeMaterial.emissiveIntensity = 0.18;
  target.browMaterial.emissiveIntensity = 0;
  if (target.expressionGroup) {
    target.expressionGroup.visible = false;
  }
}
