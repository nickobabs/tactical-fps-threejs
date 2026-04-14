const AudioContextCtor = typeof window !== 'undefined'
  ? (window.AudioContext ?? window.webkitAudioContext)
  : null;

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function getDistance(a, b) {
  if (!a || !b) {
    return Infinity;
  }

  const dx = Number(a.x ?? 0) - Number(b.x ?? 0);
  const dy = Number(a.y ?? 0) - Number(b.y ?? 0);
  const dz = Number(a.z ?? 0) - Number(b.z ?? 0);
  return Math.hypot(dx, dy, dz);
}

function clampPan(value) {
  return Math.max(-1, Math.min(1, value));
}

function clampSignedUnit(value) {
  return Math.max(-1, Math.min(1, value));
}

function setAudioParam(param, value) {
  if (!param) {
    return;
  }

  try {
    param.value = value;
  } catch {}
}

export class AudioManager {
  constructor({ masterVolume = 0.6 } = {}) {
    this.masterVolume = clamp01(masterVolume);
    this.sounds = new Map();
    this.context = AudioContextCtor ? new AudioContextCtor() : null;
    this.masterGain = this.context ? this.context.createGain() : null;

    if (this.masterGain) {
      this.masterGain.gain.value = this.masterVolume;
      this.masterGain.connect(this.context.destination);
    }
  }

  supportsSpatialPanner() {
    return Boolean(this.context && typeof this.context.createPanner === 'function');
  }

  registerSound(key, path, options = {}) {
    if (this.sounds.has(key)) {
      return;
    }

    const sound = {
      key,
      path,
      playback: options.playback ?? 'interrupt',
      minIntervalMs: options.minIntervalMs ?? 0,
      buffer: null,
      bufferPromise: null,
      activeSource: null,
      activeGain: null,
      lastPlayTime: -Infinity,
    };

    this.sounds.set(key, sound);

    if (options.preload !== false) {
      void this.loadBuffer(sound);
    }
  }

  async unlock() {
    if (!this.context || this.context.state === 'running') {
      return;
    }

    try {
      await this.context.resume();
    } catch {}
  }

  setMasterVolume(volume) {
    this.masterVolume = clamp01(volume);

    if (this.masterGain && this.context) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.context.currentTime);
    }
  }

  getMasterVolume() {
    return this.masterVolume;
  }

  setListenerTransform({
    position = null,
    yaw = 0,
    pitch = 0,
  } = {}) {
    if (!this.context?.listener || !position) {
      return;
    }

    const listener = this.context.listener;
    const px = Number(position.x ?? 0);
    const py = Number(position.y ?? 0);
    const pz = Number(position.z ?? 0);
    const yawValue = Number(yaw ?? 0);
    const pitchValue = Number(pitch ?? 0);
    const forwardX = -Math.sin(yawValue) * Math.cos(pitchValue);
    const forwardY = Math.sin(pitchValue);
    const forwardZ = -Math.cos(yawValue) * Math.cos(pitchValue);

    if ('positionX' in listener) {
      setAudioParam(listener.positionX, px);
      setAudioParam(listener.positionY, py);
      setAudioParam(listener.positionZ, pz);
    } else {
      listener.setPosition?.(px, py, pz);
    }

    if ('forwardX' in listener) {
      setAudioParam(listener.forwardX, forwardX);
      setAudioParam(listener.forwardY, forwardY);
      setAudioParam(listener.forwardZ, forwardZ);
      setAudioParam(listener.upX, 0);
      setAudioParam(listener.upY, 1);
      setAudioParam(listener.upZ, 0);
    } else {
      listener.setOrientation?.(forwardX, forwardY, forwardZ, 0, 1, 0);
    }
  }

  getAttenuatedVolume({
    baseVolume = 1,
    listenerPosition = null,
    emitterPosition = null,
    minDistance = 1.5,
    maxDistance = 24,
    rolloffExponent = 1.6,
  } = {}) {
    if (!listenerPosition || !emitterPosition) {
      return clamp01(baseVolume);
    }

    const distance = getDistance(listenerPosition, emitterPosition);
    if (!Number.isFinite(distance)) {
      return 0;
    }
    if (distance <= minDistance) {
      return clamp01(baseVolume);
    }
    if (distance >= maxDistance) {
      return 0;
    }

    const normalized = (distance - minDistance) / Math.max(maxDistance - minDistance, 0.001);
    const attenuation = Math.pow(1 - clamp01(normalized), Math.max(0.01, rolloffExponent));
    return clamp01(baseVolume * attenuation);
  }

  getStereoPan({
    listenerPosition = null,
    listenerYaw = 0,
    emitterPosition = null,
  } = {}) {
    if (!listenerPosition || !emitterPosition) {
      return 0;
    }

    const dx = Number(emitterPosition.x ?? 0) - Number(listenerPosition.x ?? 0);
    const dz = Number(emitterPosition.z ?? 0) - Number(listenerPosition.z ?? 0);
    const planarLength = Math.hypot(dx, dz);
    if (planarLength <= 1e-4) {
      return 0;
    }

    const rightX = Math.cos(Number(listenerYaw ?? 0));
    const rightZ = -Math.sin(Number(listenerYaw ?? 0));
    const localRightDot = ((dx / planarLength) * rightX) + ((dz / planarLength) * rightZ);
    return clampPan(localRightDot);
  }

  getSpatialMix({
    listenerPosition = null,
    listenerYaw = 0,
    emitterPosition = null,
  } = {}) {
    if (!listenerPosition || !emitterPosition) {
      return {
        pan: 0,
        volumeMultiplier: 1,
        lowpassFrequency: null,
      };
    }

    const dx = Number(emitterPosition.x ?? 0) - Number(listenerPosition.x ?? 0);
    const dz = Number(emitterPosition.z ?? 0) - Number(listenerPosition.z ?? 0);
    const planarLength = Math.hypot(dx, dz);
    if (planarLength <= 1e-4) {
      return {
        pan: 0,
        volumeMultiplier: 1,
        lowpassFrequency: null,
      };
    }

    const normalizedX = dx / planarLength;
    const normalizedZ = dz / planarLength;
    const rightX = Math.cos(Number(listenerYaw ?? 0));
    const rightZ = -Math.sin(Number(listenerYaw ?? 0));
    const forwardX = -Math.sin(Number(listenerYaw ?? 0));
    const forwardZ = -Math.cos(Number(listenerYaw ?? 0));
    const sideDot = clampSignedUnit((normalizedX * rightX) + (normalizedZ * rightZ));
    const frontDot = clampSignedUnit((normalizedX * forwardX) + (normalizedZ * forwardZ));
    const rearAlpha = Math.max(0, -frontDot);

    return {
      pan: clampPan(sideDot * (1 + (rearAlpha * 0.12))),
      volumeMultiplier: 1 - (rearAlpha * 0.08),
      lowpassFrequency: rearAlpha > 0.001
        ? (18000 - (rearAlpha * 7000))
        : null,
    };
  }

  async play(key, options = {}) {
    const sound = this.sounds.get(key);
    if (!sound || !this.context || !this.masterGain) {
      return;
    }

    const {
      baseVolume = 1,
      pitchMin = 1,
      pitchMax = 1,
      duration = null,
      playback = sound.playback,
      minIntervalMs = sound.minIntervalMs,
    } = options;

    const nowMs = performance.now();
    if (nowMs - sound.lastPlayTime < minIntervalMs) {
      return;
    }
    sound.lastPlayTime = nowMs;

    await this.unlock();

    const buffer = await this.loadBuffer(sound);
    if (!buffer) {
      return;
    }

    const contextNow = this.context.currentTime;
    if (playback === 'interrupt') {
      this.stopActiveSound(sound, contextNow);
    } else if (playback === 'skip' && sound.activeSource) {
      return;
    }

    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = pitchMin + Math.random() * (pitchMax - pitchMin);
    const lowpassFrequency = Number(options.lowpassFrequency ?? 0);
    const filterNode = Number.isFinite(lowpassFrequency) && lowpassFrequency > 0 && lowpassFrequency < 19000
      ? this.context.createBiquadFilter()
      : null;
    if (filterNode) {
      filterNode.type = 'lowpass';
      filterNode.frequency.value = lowpassFrequency;
      filterNode.Q.value = 0.5;
    }

    const gainNode = this.context.createGain();
    gainNode.gain.value = clamp01(baseVolume);
    const spatialPanner = options.emitterPosition && this.supportsSpatialPanner()
      ? this.context.createPanner()
      : null;
    const stereoPanner = typeof this.context.createStereoPanner === 'function'
      ? this.context.createStereoPanner()
      : null;
    if (spatialPanner) {
      spatialPanner.panningModel = options.panningModel ?? 'HRTF';
      spatialPanner.distanceModel = options.distanceModel ?? 'inverse';
      spatialPanner.refDistance = Math.max(0.01, Number(options.minDistance ?? 1.5));
      spatialPanner.maxDistance = Math.max(spatialPanner.refDistance, Number(options.maxDistance ?? 24));
      spatialPanner.rolloffFactor = Math.max(0.01, Number(options.rolloffFactor ?? options.rolloffExponent ?? 1));
      spatialPanner.coneInnerAngle = 360;
      spatialPanner.coneOuterAngle = 360;
      const ex = Number(options.emitterPosition.x ?? 0);
      const ey = Number(options.emitterPosition.y ?? 0);
      const ez = Number(options.emitterPosition.z ?? 0);
      if ('positionX' in spatialPanner) {
        setAudioParam(spatialPanner.positionX, ex);
        setAudioParam(spatialPanner.positionY, ey);
        setAudioParam(spatialPanner.positionZ, ez);
      } else {
        spatialPanner.setPosition?.(ex, ey, ez);
      }
    } else if (stereoPanner) {
      stereoPanner.pan.value = clampPan(Number(options.pan ?? 0));
    }

    if (filterNode) {
      source.connect(filterNode);
      if (spatialPanner) {
        filterNode.connect(spatialPanner);
        spatialPanner.connect(gainNode);
      } else {
        filterNode.connect(gainNode);
      }
    } else if (spatialPanner) {
      source.connect(spatialPanner);
      spatialPanner.connect(gainNode);
    } else {
      source.connect(gainNode);
    }
    if (stereoPanner) {
      gainNode.connect(stereoPanner);
      stereoPanner.connect(this.masterGain);
    } else {
      gainNode.connect(this.masterGain);
    }
    source.start(contextNow);
    if (Number.isFinite(duration) && duration > 0) {
      const stopAt = contextNow + duration;
      try {
        gainNode.gain.setValueAtTime(gainNode.gain.value, Math.max(contextNow, stopAt - 0.01));
        gainNode.gain.linearRampToValueAtTime(0, stopAt);
        source.stop(stopAt);
      } catch {}
    }

    if (playback !== 'overlap') {
      sound.activeSource = source;
      sound.activeGain = gainNode;
    }

    source.onended = () => {
      source.disconnect();
      filterNode?.disconnect?.();
      spatialPanner?.disconnect?.();
      gainNode.disconnect();
      stereoPanner?.disconnect?.();

      if (sound.activeSource === source) {
        sound.activeSource = null;
        sound.activeGain = null;
      }
    };
  }

  async playAtPosition(key, options = {}) {
    const volume = this.getAttenuatedVolume(options);
    if (volume <= 0.001) {
      return;
    }
    const useSpatialPanner = this.supportsSpatialPanner() && Boolean(options.emitterPosition);
    const spatialMix = this.getSpatialMix(options);
    const finalVolume = volume * spatialMix.volumeMultiplier;
    if (finalVolume <= 0.001) {
      return;
    }

    return this.play(key, {
      ...options,
      baseVolume: finalVolume,
      pan: useSpatialPanner ? 0 : spatialMix.pan,
      lowpassFrequency: useSpatialPanner ? null : spatialMix.lowpassFrequency,
      rolloffFactor: Number(options.rolloffFactor ?? options.rolloffExponent ?? 1),
    });
  }

  async loadBuffer(soundOrKey) {
    const sound = typeof soundOrKey === 'string' ? this.sounds.get(soundOrKey) : soundOrKey;
    if (!sound || !this.context) {
      return null;
    }

    if (sound.buffer) {
      return sound.buffer;
    }

    if (!sound.bufferPromise) {
      sound.bufferPromise = fetch(sound.path)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load audio: ${sound.path}`);
          }

          return response.arrayBuffer();
        })
        .then((arrayBuffer) => this.context.decodeAudioData(arrayBuffer.slice(0)))
        .then((buffer) => {
          sound.buffer = buffer;
          return buffer;
        })
        .catch((error) => {
          console.error(error);
          sound.bufferPromise = null;
          return null;
        });
    }

    return sound.bufferPromise;
  }

  stopActiveSound(sound, now = this.context?.currentTime ?? 0) {
    if (!sound.activeSource || !sound.activeGain) {
      return;
    }

    try {
      sound.activeGain.gain.cancelScheduledValues(now);
      sound.activeGain.gain.setValueAtTime(sound.activeGain.gain.value, now);
      sound.activeGain.gain.linearRampToValueAtTime(0, now + 0.012);
      sound.activeSource.stop(now + 0.014);
    } catch {}

    sound.activeSource = null;
    sound.activeGain = null;
  }

  destroy() {
    for (const sound of this.sounds.values()) {
      this.stopActiveSound(sound);
    }

    this.sounds.clear();

    if (this.context) {
      void this.context.close();
      this.context = null;
      this.masterGain = null;
    }
  }
}
