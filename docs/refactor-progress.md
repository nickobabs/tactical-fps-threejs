# Refactor Progress

## Current Read

The refactor pass has already moved a lot of the old runtime pressure out of the biggest top-level classes. The codebase is no longer in the earlier “everything important lives in one giant file” state.

At this point, the highest-value work is no longer broad refactoring for its own sake. The remaining useful refactor targets are the dense hotspots that still combine simulation, authority, presentation, or animation responsibilities in ways that make changes risky.

See also:

- [session-note-2026-04-18-networking-refactor-guardrails.md](/C:/Users/nicko/tactical-fps-threejs/docs/session-notes/session-note-2026-04-18-networking-refactor-guardrails.md)
  - shared timeline math extraction was a good win
  - but networking lifecycle refactors must preserve explicit active-room ownership and stale-callback guards

## What Is Already In Better Shape

- App layer
  - [GameApp.js](/C:/Users/nicko/tactical-fps-threejs/src/app/GameApp.js) is now mostly the composition root and frame-phase orchestrator
  - pause, debug, gameplay-network, and session lifecycle concerns are split into dedicated app-layer modules
- Weapons
  - [WeaponManager.js](/C:/Users/nicko/tactical-fps-threejs/src/game/weapons/WeaponManager.js) is now a runtime shell rather than the full weapon system
  - weapon actions, policy/state, selection, firing, presentation, recoil tuning, and viewmodel tuning now live in separate modules
- Player controller
  - input snapshotting
  - fly-mode helpers
  - presentation math
  - collision-safe movement helpers
  - buffered correction helpers
  - reconciliation helpers
  - movement tuning now also lives outside the controller core
- HUD / objective flow
  - planted-bomb visual and objective state are extracted
  - HUD pieces are split across classic/debug/scoreboard/objective/helper modules
- Shared gameplay helpers
  - bomb helpers/constants are shared
  - plant-zone helpers are shared
  - movement simulation is shared between client and server in [playerMovement.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/playerMovement.js)
  - remote interpolation / rewind helpers are now shared in [remoteTimeline.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteTimeline.js)
- Audio / tuning surfaces
  - shared audio registration lives in [createGameAudioManager.js](/C:/Users/nicko/tactical-fps-threejs/src/app/createGameAudioManager.js)
  - movement tuning and recoil tuning are now separate runtime tools instead of being hidden inside larger gameplay classes
- Server room broadcast flow
  - authoritative room broadcast behavior now uses the dirtied/end-of-tick flush model rather than scattered immediate broadcasts

## Main Remaining Hotspots

- [FirstPersonController.js](/C:/Users/nicko/tactical-fps-threejs/src/game/player/controllers/FirstPersonController.js)
  - still the most sensitive gameplay hotspot on the client
  - the remaining dense areas are:
    - `simulateMovementStep`
    - `applyBufferedCanonicalCorrection`
    - `reconcileAuthoritativeState`
    - footstep/bob/recoil interaction points around the simulation/presentation boundary
  - this file is much better than before, but it is still where movement, reconciliation, and first-person feel can collide
- [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)
  - still the largest concentrated runtime hotspot in the repo
  - stable enough for current multiplayer use
  - recent low-risk extractions moved character definition/selection, character asset loading, and animation-clip construction into dedicated networking modules
  - it still owns the higher-risk runtime behavior:
    - active visual updates
    - live animation action switching/playback
    - pose/aim application
    - socket attachment at runtime
    - hit-volume debug and tuning workflow
  - any further extraction should stay smaller and narrower than the earlier reverted hit-volume-debug attempt
- Server-side authoritative room / hitbox runtime
  - [TacticalRoom.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js)
  - [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)
  - these are functionally important and still fairly dense
  - they should only be refactored when there is a clear ownership win, not just because they are large
- Connection lifecycle in [NetworkClient.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/NetworkClient.js)
  - future cleanup here must preserve explicit active-room ownership
  - stale async room callbacks are now a known regression risk
  - room-token style guards should be treated as structural, not temporary

## Things That Are Important But Not Refactor Targets

- Dust2 grounding/support investigation
  - older debug investigation notes still exist
  - documented in [session-note-2026-04-09-dust2-grounding.md](/C:/Users/nicko/tactical-fps-threejs/docs/session-notes/session-note-2026-04-09-dust2-grounding.md)
  - this is primarily a movement/collision investigation, not a structural refactor task
- Current movement-feel tuning
  - grounded accel/decel/reversal work is already live
  - the recent counter-strafe/wall oscillation fix came from correcting grounded presentation behavior, not from another big refactor
  - future tuning should not be confused with a need to reorganize files again
- Recoil / footsteps / movement tuning tools
  - these are active gameplay iteration tools
  - they may eventually deserve polish, but they are not current refactor debt

## Working Rule For The Next Pass

- Only refactor when the ownership boundary is clear and the outcome reduces risk
- Prefer small, verified slices over broad rewrites
- Keep behavior-preserving extraction separate from gameplay tuning whenever possible
- Be especially careful around:
  - reconciliation
  - collision resolution
  - server authority handoff
  - remote presentation / hitbox parity
  - connection lifecycle ownership and stale async callbacks
- Rebuild after each code refactor slice

## Practical Next Refactor Order

1. Leave `FirstPersonController` alone unless there is a concrete need around one of the remaining dense methods.
2. If remote presentation work resumes, take the next slice out of `RemotePlayerPresenter` in a very narrow module boundary.
3. Only touch server room/hitbox structure when gameplay authority work forces it.
4. Treat Dust2 grounding notes and movement-feel tuning as debugging/tuning concerns, not refactor tasks.
