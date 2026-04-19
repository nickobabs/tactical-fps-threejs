const PROFILE_ID_STORAGE_KEY = 'tactical-fps-threejs.profile-id';
const PROFILE_AVATAR_URL_STORAGE_KEY = 'tactical-fps-threejs.profile-avatar-url';
const PROFILE_SPRAY_URL_STORAGE_KEY = 'tactical-fps-threejs.profile-spray-url';

function generateProfileId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `p_${crypto.randomUUID().replace(/-/g, '').toLowerCase()}`;
  }

  const randomPart = Math.random().toString(36).slice(2);
  return `p_${Date.now().toString(36)}${randomPart}`.slice(0, 40);
}

export function getOrCreateLocalProfileId() {
  if (typeof window === 'undefined') {
    return 'p_localdev';
  }

  const existing = String(window.localStorage.getItem(PROFILE_ID_STORAGE_KEY) ?? '').trim().toLowerCase();
  if (/^[a-z0-9_-]{8,64}$/.test(existing)) {
    return existing;
  }

  const nextProfileId = generateProfileId();
  window.localStorage.setItem(PROFILE_ID_STORAGE_KEY, nextProfileId);
  return nextProfileId;
}

export function getStoredProfileAvatarUrl() {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = String(window.localStorage.getItem(PROFILE_AVATAR_URL_STORAGE_KEY) ?? '').trim();
  return value || null;
}

export function setStoredProfileAvatarUrl(avatarUrl) {
  setStoredProfileAssetUrl(PROFILE_AVATAR_URL_STORAGE_KEY, avatarUrl);
}

export function getStoredProfileSprayUrl() {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = String(window.localStorage.getItem(PROFILE_SPRAY_URL_STORAGE_KEY) ?? '').trim();
  return value || null;
}

export function setStoredProfileSprayUrl(sprayUrl) {
  setStoredProfileAssetUrl(PROFILE_SPRAY_URL_STORAGE_KEY, sprayUrl);
}

function setStoredProfileAssetUrl(storageKey, assetUrl) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalized = String(assetUrl ?? '').trim();
  if (!normalized) {
    window.localStorage.removeItem(storageKey);
    return;
  }

  window.localStorage.setItem(storageKey, normalized);
}

async function loadImageFromFile(file) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = 'async';
    await new Promise((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Failed to load avatar image.'));
      image.src = objectUrl;
    });
    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function buildSquareImageDataUrl(file, {
  size = 64,
  quality = 0.76,
  mimeType = 'image/jpeg',
} = {}) {
  if (!(file instanceof File)) {
    throw new Error('Image upload requires an image file.');
  }

  const image = await loadImageFromFile(file);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to create avatar canvas.');
  }

  const sourceWidth = Number(image.naturalWidth ?? image.width ?? size);
  const sourceHeight = Number(image.naturalHeight ?? image.height ?? size);
  const sourceSide = Math.max(1, Math.min(sourceWidth, sourceHeight));
  const sourceX = (sourceWidth - sourceSide) * 0.5;
  const sourceY = (sourceHeight - sourceSide) * 0.5;

  context.clearRect(0, 0, size, size);
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceSide,
    sourceSide,
    0,
    0,
    size,
    size,
  );

  return canvas.toDataURL(mimeType, quality);
}

export async function buildAvatarUploadDataUrl(file, {
  size = 64,
  quality = 0.76,
} = {}) {
  return buildSquareImageDataUrl(file, {
    size,
    quality,
    mimeType: 'image/jpeg',
  });
}

export async function buildSprayUploadDataUrl(file, {
  size = 256,
} = {}) {
  return buildSquareImageDataUrl(file, {
    size,
    quality: 1,
    mimeType: 'image/png',
  });
}
