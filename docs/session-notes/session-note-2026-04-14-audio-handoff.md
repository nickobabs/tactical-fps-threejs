# Session Note: 2026-04-14 Audio Handoff

This note was originally captured in local Codex memory and is copied here so the project has a durable in-repo record.

## Current Checkpoint

- Smoke grenade baseline is in a decent place for now:
  - equip on `6`
  - stronger throw speed
  - heavier bounce with more friction
  - minimum fuse `1.6s`
  - bloom requires settle plus `0.75s` delay
  - smoke lasts `14s` after bloom
- `EffectsManager` now owns shared transient FX, including:
  - weapon tracers / impact markers
  - smoke cloud rendering
  - first-pass bomb explosion effect
- Bomb explosion visual is wired and visible at the planted bomb position.

## Remote Audio Checkpoint

- Server now emits authoritative `audio-event` messages for:
  - weapon fire
  - audible footsteps
- Client now consumes those events through `NetworkClient` and plays them through `AudioManager`.
- `AudioManager` now:
  - updates listener transform every frame
  - uses `PannerNode` with `HRTF` when available
  - still applies manual attenuation/cutoff on top of the panner
  - keeps a non-panner fallback path
- Crouch movement is now silent both locally and remotely.
- Shift-walk is also silent for footsteps.

## Most Recent User Feedback

- HRTF made front/back much easier to hear.
- Footsteps had been carrying too far and sounding somewhat muffled/deep.
- Latest fixes were:
  - restore hard manual attenuation/cutoff on top of spatial audio
  - make crouch silent locally and remotely
  - flatten footstep emitter height toward listener ear height for playback

## Next Session Should Verify Live In Multiplayer

1. Whether footstep range is now acceptable after a real server restart and client refresh.
2. Whether nearby footsteps are still too quiet.
3. Whether footsteps should stay on `HRTF` or switch to a lighter spatial mode like `equalpower` while gunshots keep `HRTF`.

## Primary Files For Next Audio Pass

- `src/game/audio/AudioManager.js`
- `src/app/GameApp.js`
- `src/shared/audioEvents.js`
- `server/src/rooms/TacticalRoom.js`
- `src/game/player/controllers/FirstPersonController.js`
