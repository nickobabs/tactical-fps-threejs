import * as THREE from 'three';

function getTrackTargetName(trackName, normalizeRemoteClipName) {
  return normalizeRemoteClipName(String(trackName ?? '').replace(/\.(position|quaternion|scale)$/i, ''));
}

function createPoseClipFromFrame(sourceClip, clipName, frame, fps) {
  const frameTime = 1 / Math.max(1, fps);
  const startTime = frame / Math.max(1, fps);
  const duration = frameTime;
  const nextTracks = sourceClip.tracks.map((track) => {
    const valueSize = track.getValueSize();
    let sampleIndex = 0;
    for (let index = 0; index < track.times.length; index += 1) {
      if (track.times[index] <= startTime) {
        sampleIndex = index;
      } else {
        break;
      }
    }
    const start = sampleIndex * valueSize;
    const values = track.values.slice(start, start + valueSize);
    const heldValues = [...values, ...values];
    const times = [0, duration];
    return new track.constructor(track.name, times, heldValues, track.getInterpolation());
  });

  return new THREE.AnimationClip(clipName, duration, nextTracks, sourceClip.blendMode);
}

function createUpperBodyOnlyClip(clip, lowerBodyPatterns = [], normalizeRemoteClipName) {
  const nextTracks = clip.tracks
    .filter((track) => {
      const targetName = getTrackTargetName(track.name, normalizeRemoteClipName);
      return !lowerBodyPatterns.some((pattern) => pattern.test(targetName));
    })
    .map((track) => track.clone());

  return new THREE.AnimationClip(clip.name, clip.duration, nextTracks, clip.blendMode);
}

function reverseAnimationTrack(track, duration) {
  const sampleCount = track.times.length;
  const valueSize = track.getValueSize();
  if (sampleCount <= 1 || valueSize <= 0) {
    return track.clone();
  }

  const nextTimes = new track.times.constructor(sampleCount);
  const nextValues = new track.values.constructor(track.values.length);
  for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
    const sourceSampleIndex = sampleCount - 1 - sampleIndex;
    nextTimes[sampleIndex] = duration - track.times[sourceSampleIndex];
    const targetOffset = sampleIndex * valueSize;
    const sourceOffset = sourceSampleIndex * valueSize;
    for (let componentIndex = 0; componentIndex < valueSize; componentIndex += 1) {
      nextValues[targetOffset + componentIndex] = track.values[sourceOffset + componentIndex];
    }
  }

  return new track.constructor(track.name, nextTimes, nextValues, track.getInterpolation());
}

function reverseAnimationClip(clip) {
  const duration = Math.max(0, Number(clip.duration ?? 0));
  if (duration <= 0) {
    return clip.clone();
  }

  const nextTracks = clip.tracks.map((track) => reverseAnimationTrack(track, duration));
  return new THREE.AnimationClip(clip.name, duration, nextTracks, clip.blendMode);
}

function smoothLoopingTrack(track, blendFrames) {
  const sampleCount = track.times.length;
  const valueSize = track.getValueSize();
  const blendCount = Math.max(0, Math.min(blendFrames, Math.floor(sampleCount / 2) - 1));
  if (blendCount < 1 || valueSize < 1) {
    return track.clone();
  }

  const nextTrack = track.clone();
  const isQuaternionTrack = /\.quaternion$/i.test(track.name) && valueSize === 4;
  if (isQuaternionTrack) {
    const startQuat = new THREE.Quaternion();
    const endQuat = new THREE.Quaternion();
    const blendedQuat = new THREE.Quaternion();
    for (let index = 0; index < blendCount; index += 1) {
      const alpha = (index + 1) / (blendCount + 1);
      const startOffset = index * valueSize;
      const endOffset = (sampleCount - blendCount + index) * valueSize;
      startQuat.fromArray(track.values, startOffset);
      endQuat.fromArray(track.values, endOffset);
      blendedQuat.copy(endQuat).slerp(startQuat, alpha);
      nextTrack.values.set(
        [blendedQuat.x, blendedQuat.y, blendedQuat.z, blendedQuat.w],
        endOffset,
      );
    }
    return nextTrack;
  }

  for (let index = 0; index < blendCount; index += 1) {
    const alpha = (index + 1) / (blendCount + 1);
    const startOffset = index * valueSize;
    const endOffset = (sampleCount - blendCount + index) * valueSize;
    for (let component = 0; component < valueSize; component += 1) {
      const startValue = track.values[startOffset + component];
      const endValue = track.values[endOffset + component];
      nextTrack.values[endOffset + component] = THREE.MathUtils.lerp(endValue, startValue, alpha);
    }
  }

  return nextTrack;
}

function smoothLoopingClip(clip, blendFrames = 0) {
  if (!Number.isFinite(blendFrames) || blendFrames <= 0) {
    return clip;
  }

  const nextTracks = clip.tracks.map((track) => smoothLoopingTrack(track, blendFrames));
  return new THREE.AnimationClip(clip.name, clip.duration, nextTracks, clip.blendMode);
}

function applyRootMotionPolicy(clip, clipDefinition, stripRootMotionFromClip) {
  return stripRootMotionFromClip(clip, clipDefinition?.rootMotion ?? null);
}

export function buildRemoteCharacterAnimations(
  gltfAnimations,
  definition,
  externalClipOverrides = {},
  {
    normalizeRemoteClipName,
    stripRootMotionFromClip,
    remoteFireClipName,
  },
) {
  if (definition.animationMode !== 'subclips') {
    return {
      baseClips: gltfAnimations.map((clip) => stripRootMotionFromClip(clip)),
      upperBodyClips: [],
    };
  }

  const needsEmbeddedSourceClip = Object.entries(definition.clips ?? {}).some(([clipName, clipDefinition]) => {
    const externalOverride = externalClipOverrides[clipName] ?? null;
    return !externalOverride && (clipDefinition.type === 'pose' || clipDefinition.type?.includes('subclip'));
  });
  const sourceClip = gltfAnimations.find(
    (clip) => normalizeRemoteClipName(clip.name) === normalizeRemoteClipName(definition.sourceClipName),
  ) ?? gltfAnimations[0];

  if (needsEmbeddedSourceClip && !sourceClip) {
    throw new Error(`Remote character definition "${definition.id}" has no source animation clip.`);
  }

  const baseClips = [];
  const upperBodyClips = [];
  for (const [clipName, clipDefinition] of Object.entries(definition.clips ?? {})) {
    let clip = null;
    const externalOverride = externalClipOverrides[clipName] ?? null;
    if (externalOverride) {
      clip = externalOverride.clone();
      clip.name = clipName;
      if (clipDefinition.reverse) {
        clip = reverseAnimationClip(clip);
      }
      if (clipDefinition.type === 'upper-body-subclip') {
        if (normalizeRemoteClipName(clipName) === normalizeRemoteClipName(remoteFireClipName)) {
          baseClips.push(applyRootMotionPolicy(clip.clone(), clipDefinition, stripRootMotionFromClip));
        }
        upperBodyClips.push(createUpperBodyOnlyClip(clip, clipDefinition.lowerBodyPatterns, normalizeRemoteClipName));
      } else {
        baseClips.push(applyRootMotionPolicy(clip, clipDefinition, stripRootMotionFromClip));
      }
      continue;
    }

    if (clipDefinition.type === 'pose') {
      clip = createPoseClipFromFrame(sourceClip, clipName, clipDefinition.frame, definition.fps ?? 30);
      baseClips.push(applyRootMotionPolicy(clip, clipDefinition, stripRootMotionFromClip));
      continue;
    }

    clip = THREE.AnimationUtils.subclip(
      sourceClip,
      clipName,
      clipDefinition.startFrame,
      clipDefinition.endFrame,
      definition.fps ?? 30,
    );
    if (clipDefinition.reverse) {
      clip = reverseAnimationClip(clip);
    }
    clip = smoothLoopingClip(clip, clipDefinition.loopBlendFrames ?? 0);
    if (clipDefinition.type === 'upper-body-subclip') {
      upperBodyClips.push(createUpperBodyOnlyClip(clip, clipDefinition.lowerBodyPatterns, normalizeRemoteClipName));
    } else {
      baseClips.push(applyRootMotionPolicy(clip, clipDefinition, stripRootMotionFromClip));
    }
  }

  return { baseClips, upperBodyClips };
}
