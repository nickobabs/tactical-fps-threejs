import { AudioManager } from '../game/audio/AudioManager.js';

const FLOOR_FOOTSTEP_FILES = [
  'concrete1.wav',
  'concrete2.wav',
  'concrete3.wav',
  'concrete4.wav',
  'concrete5.wav',
  'concrete6.wav',
  'concrete7.wav',
  'concrete8.wav',
  'concrete9.wav',
  'concrete10.wav',
  'concrete11.wav',
  'concrete12.wav',
  'concrete13.wav',
  'concrete14.wav',
  'concrete15.wav',
  'concrete16.wav',
];

const GAME_AUDIO_REGISTRATIONS = [
  ['rifle-fire', '/audio/guns/m4a1_silencer_01.mp3', { playback: 'interrupt' }],
  ['sniper-fire', '/audio/guns/awp-shoot-sound-effect-cs_go.mp3', { playback: 'interrupt' }],
  [
    'sniper-zoom',
    '/audio/guns/awp-zoom-sound-effect-cs-go.mp3',
    { playback: 'interrupt', minIntervalMs: 80 },
  ],
  ['knife-slash', '/audio/guns/sword-slash-4.mp3', { playback: 'interrupt' }],
  ['smoke-bloom', '/audio/utility/smokebloom.mp3', { playback: 'overlap', minIntervalMs: 80 }],
  ['bomb-beep', '/audio/game/bomb beep.mp3', { playback: 'interrupt', minIntervalMs: 0 }],
  ['bomb-planted', '/audio/game/bomb planted.mp3', { playback: 'interrupt' }],
  ['bomb-defused', '/audio/game/bomb defused.mp3', { playback: 'interrupt' }],
  ...FLOOR_FOOTSTEP_FILES.map((fileName, index) => {
    const sampleNumber = String(index + 1).padStart(3, '0');
    return [
      `footstep-floor-${sampleNumber}`,
      `/audio/players/footsteps/${fileName}`,
      { playback: 'overlap', minIntervalMs: 24 },
    ];
  }),
];

export function createGameAudioManager() {
  const audioManager = new AudioManager({ masterVolume: 0.6 });

  for (const [soundId, path, options] of GAME_AUDIO_REGISTRATIONS) {
    audioManager.registerSound(soundId, path, options);
  }

  return audioManager;
}
