# Audio System

## Summary

`AudioManager` owns short one-shot game audio playback, decoded sound buffers, master volume, playback policies, browser audio-context lifecycle, and the current client-side spatial playback path for replicated remote sounds.

## Inputs

- Registered sound keys and asset paths
- Play requests from gameplay systems
- Replicated `audio-event` messages from authoritative multiplayer state
- Local listener position/orientation from the active first-person player
- Master volume changes from the pause menu
- Browser user gestures that allow the audio context to resume

## Outputs

- Low-latency one-shot playback for weapon and UI-adjacent sounds
- Low-latency one-shot playback for weapon and local footstep sounds
- Spatialized playback for replicated remote weapon, smoke bloom, and footstep sounds
- Centralized master gain control
- Per-sound interruption or overlap behavior

## Dependencies

- Browser `AudioContext`
- Browser `PannerNode` / `StereoPannerNode` support when available
- `fetch` for loading audio files
- `GameApp` for registration, listener updates, and replicated-audio consumption
- Shared remote-audio config in `src/shared/audioEvents.js`

## Key Design Decisions

- Audio uses the Web Audio API rather than restarting `HTMLAudioElement` instances on each shot.
- Sounds are registered once, decoded into buffers, and played through short-lived source nodes.
- Registered per-sound `baseVolume` now persists into playback correctly, so sound-level tuning in the registration table is actually authoritative unless a caller overrides it at play time.
- Playback policy is data-driven per sound, with support for behaviors such as `interrupt`, `overlap`, and `skip`.
- Master volume is handled through a dedicated gain node so future sound categories can branch from the same graph.
- Audio context unlock is explicit, so pointer-lock resume and other user-gesture flows can reliably enable playback.
- The audio path is asset-layout driven from a small registration helper:
  - weapon audio currently loads from `/audio/guns/`
  - player-local footstep audio currently loads from `/audio/players/footsteps/`
- One-shot playback now supports an optional `duration` cap with a short fade-out, which is used by movement tuning to tighten footstep clips without pitch-shifting them.
- Remote audio is now server-driven for gameplay-critical noise:
  - `TacticalRoom` emits authoritative `audio-event` messages for weapon fire, smoke bloom, and audible footsteps
  - `NetworkClient` queues those events separately from combat events
  - `GameApp` consumes them and asks `AudioManager` to play them at replicated world positions
- Spatial remote playback now prefers `PannerNode` with `HRTF` when available, but still keeps a manual gameplay attenuation/cutoff layer on top so sounds do not leak faintly across the whole map.
- Crouch movement and shift-walk are intentionally silent for footsteps. Only normal audible grounded movement emits footstep events.
- Landing now also emits a single synthetic footstep on real air-to-ground transitions so bunnyhops are still audible before a dedicated land sound exists.
- The debug menu now includes a client-side remote-audio tuning panel for live footstep attenuation/range iteration without restarting the server.

## Current Status

- Implemented and active
- Rifle fire, pistol fire, sniper fire, sniper zoom, and knife slash are registered through the shared manager
- Rifle equip, knife draw, local being-hit, and local headshot-kill sounds are now also registered through the shared manager
- Local confirmed enemy hits now also play the same hit-thud feedback used for taking damage, so landed shots have a stronger confirmation cue
- Bomb planted and bomb defused announcement stingers are also registered through the shared manager
- Local concrete footstep variants are also registered through the shared manager
- Pause-menu master volume feeds directly into the master gain node
- Remote weapon-fire sounds are now replicated from authoritative server state and played spatially on other clients
- Remote footstep sounds are now replicated from authoritative server movement state and played spatially on other clients
- Remote smoke bloom sounds are now replicated from authoritative utility state and played spatially on other clients
- Planted bomb beeps are now replicated from authoritative bomb state, emitted from the planted world position, and follow the same cadence helper used by the HUD bomb pulse
- Defuse-start and short-range sniper scope-in now also replicate as authoritative spatial audio events
- `GameApp` now updates the Web Audio listener transform each frame from the active first-person player so remote sound direction follows live head/camera orientation
- Footstep playback currently flattens emitter height toward the listener ear plane to avoid odd HRTF coloration from ground-level emitters
- Footsteps currently use `HRTF` plus manual gameplay attenuation/cutoff as the live baseline, rather than a separate `equalpower` footstep mode

## Limitations

- No separate mix buses yet for weapons, UI, ambience, or footsteps
- No wall occlusion, material-based propagation, reflections, or reverb
- No dedicated sound-class mix buses yet for tuning local and replicated sounds independently
- No voice pooling or concurrency limits beyond simple per-sound playback policy
- Footsteps do not yet switch by detected material/surface type
- Remote-audio tuning is still in progress:
  - footstep hearing range and nearby loudness still need live multiplayer tuning
  - smoke bloom and weapon ranges are still hand-tuned event profiles rather than a more formal propagation model
