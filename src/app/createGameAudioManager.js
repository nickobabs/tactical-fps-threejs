import { AudioManager } from '../game/audio/AudioManager.js';

const GAME_AUDIO_REGISTRATIONS = [
  ['rifle-fire', '/audio/m4a1_silencer_01.mp3', { playback: 'interrupt' }],
  ['sniper-fire', '/audio/awp-shoot-sound-effect-cs_go.mp3', { playback: 'interrupt' }],
  [
    'sniper-zoom',
    '/audio/awp-zoom-sound-effect-cs-go.mp3',
    { playback: 'interrupt', minIntervalMs: 80 },
  ],
  ['knife-slash', '/audio/sword-slash-4.mp3', { playback: 'interrupt' }],
];

export function createGameAudioManager() {
  const audioManager = new AudioManager({ masterVolume: 0.6 });

  for (const [soundId, path, options] of GAME_AUDIO_REGISTRATIONS) {
    audioManager.registerSound(soundId, path, options);
  }

  return audioManager;
}
