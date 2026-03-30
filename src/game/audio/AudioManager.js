const AudioContextCtor = typeof window !== 'undefined'
  ? (window.AudioContext ?? window.webkitAudioContext)
  : null;

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
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

  async play(key, options = {}) {
    const sound = this.sounds.get(key);
    if (!sound || !this.context || !this.masterGain) {
      return;
    }

    const {
      baseVolume = 1,
      pitchMin = 1,
      pitchMax = 1,
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

    const gainNode = this.context.createGain();
    gainNode.gain.value = clamp01(baseVolume);

    source.connect(gainNode);
    gainNode.connect(this.masterGain);
    source.start(contextNow);

    if (playback !== 'overlap') {
      sound.activeSource = source;
      sound.activeGain = gainNode;
    }

    source.onended = () => {
      source.disconnect();
      gainNode.disconnect();

      if (sound.activeSource === source) {
        sound.activeSource = null;
        sound.activeGain = null;
      }
    };
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
