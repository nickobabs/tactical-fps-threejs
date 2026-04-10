# Audio System

## Summary

`AudioManager` owns short one-shot game audio playback, decoded sound buffers, master volume, playback policies, and browser audio-context lifecycle.

## Inputs

- Registered sound keys and asset paths
- Play requests from gameplay systems
- Master volume changes from the pause menu
- Browser user gestures that allow the audio context to resume

## Outputs

- Low-latency one-shot playback for weapon and UI-adjacent sounds
- Low-latency one-shot playback for weapon and local footstep sounds
- Centralized master gain control
- Per-sound interruption or overlap behavior

## Dependencies

- Browser `AudioContext`
- `fetch` for loading audio files
- `GameApp` for registration and lifecycle

## Key Design Decisions

- Audio uses the Web Audio API rather than restarting `HTMLAudioElement` instances on each shot.
- Sounds are registered once, decoded into buffers, and played through short-lived source nodes.
- Playback policy is data-driven per sound, with support for behaviors such as `interrupt`, `overlap`, and `skip`.
- Master volume is handled through a dedicated gain node so future sound categories can branch from the same graph.
- Audio context unlock is explicit, so pointer-lock resume and other user-gesture flows can reliably enable playback.
- The audio path is asset-layout driven from a small registration helper:
  - weapon audio currently loads from `/audio/guns/`
  - player-local footstep audio currently loads from `/audio/players/footsteps/`
- One-shot playback now supports an optional `duration` cap with a short fade-out, which is used by movement tuning to tighten footstep clips without pitch-shifting them.

## Current Status

- Implemented and active
- Rifle fire, pistol fire, sniper fire, sniper zoom, and knife slash are registered through the shared manager
- Local concrete footstep variants are also registered through the shared manager
- Pause-menu master volume feeds directly into the master gain node

## Limitations

- No separate mix buses yet for weapons, UI, ambience, or footsteps
- No positional audio yet
- No voice pooling or concurrency limits beyond simple per-sound playback policy
- Footsteps are currently local-only and do not yet switch by detected material/surface type
