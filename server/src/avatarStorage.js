import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const avatarStorageDir = path.resolve(__dirname, '../uploads/avatars');
export const sprayStorageDir = path.resolve(__dirname, '../uploads/sprays');
const AVATAR_FILE_EXTENSIONS = ['jpg', 'png'];
const PROFILE_ID_PATTERN = /^[a-z0-9_-]{8,64}$/;
const IMAGE_DATA_URL_PATTERN = /^data:image\/(jpeg|jpg|png);base64,([a-z0-9+/=\s]+)$/i;
const MAX_AVATAR_BYTES = 256 * 1024;

export function sanitizeProfileId(profileId) {
  const normalized = String(profileId ?? '').trim().toLowerCase();
  return PROFILE_ID_PATTERN.test(normalized) ? normalized : null;
}

export function getAvatarFilePath(profileId, extension = 'jpg') {
  const normalizedProfileId = sanitizeProfileId(profileId);
  if (!normalizedProfileId) {
    return null;
  }
  return path.join(avatarStorageDir, `${normalizedProfileId}.${String(extension ?? 'jpg').toLowerCase()}`);
}

export function buildProfileAvatarPublicUrl(profileId, version = null, extension = 'jpg') {
  const normalizedProfileId = sanitizeProfileId(profileId);
  if (!normalizedProfileId) {
    return null;
  }

  const safeVersion = Number.isFinite(version) ? Math.max(0, Math.floor(Number(version))) : 0;
  const query = safeVersion > 0 ? `?v=${safeVersion}` : '';
  return `/uploads/avatars/${normalizedProfileId}.${String(extension ?? 'jpg').toLowerCase()}${query}`;
}

export async function resolveStoredProfileAvatarUrl(profileId) {
  return resolveStoredProfileMediaUrl({
    profileId,
    storageDir: avatarStorageDir,
    publicBasePath: '/uploads/avatars',
  });
}

export async function saveProfileAvatarDataUrl(profileId, imageDataUrl) {
  return saveProfileImageDataUrl({
    profileId,
    imageDataUrl,
    storageDir: avatarStorageDir,
    publicBasePath: '/uploads/avatars',
  });
}

export async function resolveStoredProfileSprayUrl(profileId) {
  return resolveStoredProfileMediaUrl({
    profileId,
    storageDir: sprayStorageDir,
    publicBasePath: '/uploads/sprays',
  });
}

export async function saveProfileSprayDataUrl(profileId, imageDataUrl) {
  return saveProfileImageDataUrl({
    profileId,
    imageDataUrl,
    storageDir: sprayStorageDir,
    publicBasePath: '/uploads/sprays',
  });
}

async function resolveStoredProfileMediaUrl({ profileId, storageDir, publicBasePath }) {
  for (const extension of AVATAR_FILE_EXTENSIONS) {
    const filePath = getProfileMediaFilePath(profileId, storageDir, extension);
    if (!filePath) {
      return null;
    }

    try {
      const stats = await fs.stat(filePath);
      return buildProfileMediaPublicUrl(profileId, publicBasePath, stats.mtimeMs, extension);
    } catch {
      // Try next extension.
    }
  }

  return null;
}

async function saveProfileImageDataUrl({ profileId, imageDataUrl, storageDir, publicBasePath }) {
  const normalizedProfileId = sanitizeProfileId(profileId);
  if (!normalizedProfileId) {
    throw new Error('Invalid profile ID.');
  }

  const match = IMAGE_DATA_URL_PATTERN.exec(String(imageDataUrl ?? ''));
  if (!match) {
    throw new Error('Avatar upload must be a JPEG or PNG data URL.');
  }

  const mimeSubtype = String(match[1] ?? '').toLowerCase();
  const extension = mimeSubtype === 'png' ? 'png' : 'jpg';
  const buffer = Buffer.from(match[2].replace(/\s+/g, ''), 'base64');
  if (buffer.length <= 0 || buffer.length > MAX_AVATAR_BYTES) {
    throw new Error('Avatar payload size is invalid.');
  }

  await fs.mkdir(storageDir, { recursive: true });
  const filePath = getProfileMediaFilePath(normalizedProfileId, storageDir, extension);
  await fs.writeFile(filePath, buffer);
  await Promise.all(
    AVATAR_FILE_EXTENSIONS
      .filter((candidateExtension) => candidateExtension !== extension)
      .map(async (candidateExtension) => {
        try {
          await fs.unlink(getProfileMediaFilePath(normalizedProfileId, storageDir, candidateExtension));
        } catch {
          // Ignore missing old avatar files.
        }
      }),
  );
  const version = Date.now();

  return {
    profileId: normalizedProfileId,
    avatarVersion: version,
    avatarUrl: buildProfileMediaPublicUrl(normalizedProfileId, publicBasePath, version, extension),
  };
}

function getProfileMediaFilePath(profileId, storageDir, extension = 'jpg') {
  const normalizedProfileId = sanitizeProfileId(profileId);
  if (!normalizedProfileId) {
    return null;
  }
  return path.join(storageDir, `${normalizedProfileId}.${String(extension ?? 'jpg').toLowerCase()}`);
}

function buildProfileMediaPublicUrl(profileId, publicBasePath, version = null, extension = 'jpg') {
  const normalizedProfileId = sanitizeProfileId(profileId);
  if (!normalizedProfileId) {
    return null;
  }

  const safeVersion = Number.isFinite(version) ? Math.max(0, Math.floor(Number(version))) : 0;
  const query = safeVersion > 0 ? `?v=${safeVersion}` : '';
  return `${publicBasePath}/${normalizedProfileId}.${String(extension ?? 'jpg').toLowerCase()}${query}`;
}
