import * as THREE from 'three';

const POPUP_OFFSET = new THREE.Vector3(0, 0.35, 0);
const POPUP_DRIFT = new THREE.Vector3(0, 1.2, 0);
const DEFAULT_HIT_POINT = new THREE.Vector3();

function createPopupSprite(value, { isHeadshot = false } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;

  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = 'bold 34px "Segoe UI"';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.lineWidth = 8;
  context.strokeStyle = isHeadshot ? 'rgba(52, 8, 8, 0.92)' : 'rgba(20, 24, 30, 0.85)';
  context.fillStyle = isHeadshot ? '#ff6b6b' : '#ffd37a';
  context.strokeText(String(value), canvas.width / 2, canvas.height / 2);
  context.fillText(String(value), canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.85, 0.42, 1);
  sprite.userData.life = 0.6;
  return sprite;
}

export function createDamagePopup(amount, hitPoint, { isHeadshot = false } = {}) {
  const popup = createPopupSprite(amount, { isHeadshot });
  popup.position.copy(hitPoint ?? DEFAULT_HIT_POINT.set(0, 1.9, 0));
  popup.position.add(POPUP_OFFSET);
  return popup;
}

export function updateDamagePopups(group, popups, delta) {
  return popups.filter((popup) => {
    popup.userData.life -= delta;
    popup.position.addScaledVector(POPUP_DRIFT, delta);
    popup.material.opacity = Math.min(1, popup.userData.life / 0.6);

    if (popup.userData.life > 0) {
      return true;
    }

    popup.material.map.dispose();
    popup.material.dispose();
    group.remove(popup);
    return false;
  });
}
