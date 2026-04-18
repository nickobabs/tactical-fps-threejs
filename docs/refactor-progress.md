# Refactor Progress

## Current Read

The refactor pass has already moved a lot of the old runtime pressure out of the biggest top-level classes. The codebase is no longer in the earlier “everything important lives in one giant file” state.

At this point, the highest-value work is no longer broad refactoring for its own sake. The remaining useful refactor targets are the dense hotspots that still combine simulation, authority, presentation, or animation responsibilities in ways that make changes risky.

See also:

- [session-note-2026-04-18-networking-refactor-guardrails.md](/C:/Users/nicko/tactical-fps-threejs/docs/session-notes/session-note-2026-04-18-networking-refactor-guardrails.md)
  - shared timeline math extraction was a good win
  - but networking lifecycle refactors must preserve explicit active-room ownership and stale-callback guards
- [session-note-2026-04-18-server-combat-refactor.md](/C:/Users/nicko/tactical-fps-threejs/docs/session-notes/session-note-2026-04-18-server-combat-refactor.md)
  - server combat extraction is now underway in narrow, ownership-driven slices
  - the room still owns side effects and broadcast sequencing
- [session-note-2026-04-18-remote-animation-refactor.md](/C:/Users/nicko/tactical-fps-threejs/docs/session-notes/session-note-2026-04-18-remote-animation-refactor.md)
  - remote presenter debug, audit, policy, and playback responsibilities are now split into dedicated helper modules
  - client/server idle-entry dwell is now mirrored to preserve visible mesh vs authoritative hitbox parity during fast strafe reversals
- [session-note-2026-04-18-remote-networking-refactor-checkpoint.md](/C:/Users/nicko/tactical-fps-threejs/docs/session-notes/session-note-2026-04-18-remote-networking-refactor-checkpoint.md)
  - `RemotePlayerPresenter` now delegates fire/death/presentation helpers more cleanly
  - `NetworkClient` now delegates snapshot bookkeeping and queue/reset helpers while keeping reconnect ownership local
- [session-note-2026-04-18-tactical-room-payload-refactor.md](/C:/Users/nicko/tactical-fps-threejs/docs/session-notes/session-note-2026-04-18-tactical-room-payload-refactor.md)
  - `TacticalRoom` now delegates event/snapshot payload shaping more cleanly
  - server authority, validation, and broadcast sequencing still remain local to the room
- [session-note-2026-04-18-shared-pose-parity-plan.md](/C:/Users/nicko/tactical-fps-threejs/docs/session-notes/session-note-2026-04-18-shared-pose-parity-plan.md)
  - next meaningful multiplayer-quality step is shared pose/blend evaluation between visible remote presentation and the authoritative hitbox rig
  - crouch-fatigue, ADAD, and transition hitbox pops are now considered pose-parity problems more than simple threshold problems
  - latest traces now show rewound root timing is effectively solved, while head/torso/pelvis pose parity still lags during transitions

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
  - remote fire/clip transition timing now has an explicit shared contract in [remotePosePlayback.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remotePosePlayback.js)
- Audio / tuning surfaces
  - shared audio registration lives in [createGameAudioManager.js](/C:/Users/nicko/tactical-fps-threejs/src/app/createGameAudioManager.js)
  - movement tuning and recoil tuning are now separate runtime tools instead of being hidden inside larger gameplay classes
- Server room broadcast flow
  - authoritative room broadcast behavior now uses the dirtied/end-of-tick flush model rather than scattered immediate broadcasts
- Server combat helpers
  - server lag-comp / hitbox-history logic now lives in [lagCompensation.js](/C:/Users/nicko/tactical-fps-threejs/server/src/combat/lagCompensation.js)
  - server shot/hit geometry now lives in [shotValidation.js](/C:/Users/nicko/tactical-fps-threejs/server/src/combat/shotValidation.js)
  - server shot target resolution now lives in [fireResolution.js](/C:/Users/nicko/tactical-fps-threejs/server/src/combat/fireResolution.js)
  - [TacticalRoom.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js) is now more of an authoritative combat orchestrator than a geometry helper dump
- Server room payload helpers
  - combat/audio payload shaping now lives in [tacticalRoomEventPayloads.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/tacticalRoomEventPayloads.js)
  - objective/world-state payload shaping now lives in [tacticalRoomStatePayloads.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/tacticalRoomStatePayloads.js)
  - `TacticalRoom` still owns the authoritative timing of those messages
- Remote animation / debug helpers
  - remote hitbox debug now lives in [remoteHitboxDebug.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteHitboxDebug.js)
  - remote hitbox audit now lives in [remoteHitboxAudit.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteHitboxAudit.js)
  - remote clip-selection policy now lives in [remoteAnimationPolicy.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteAnimationPolicy.js)
  - low-level mixer/action helpers now live in [remoteAnimationPlayback.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteAnimationPlayback.js)
  - fire/hit orchestration now lives in [remoteAnimationEffects.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteAnimationEffects.js)
  - death playback/reset helpers now live in [remoteAnimationDeath.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteAnimationDeath.js)
  - aim/weapon/character-root presentation helpers now live in [remoteAnimationPresentation.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteAnimationPresentation.js)
  - [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js) is now more of a remote-animation/runtime orchestrator than a single-file implementation dump
- Network client state helpers
  - remote snapshot dedupe/pruning now lives in [networkRemoteState.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/networkRemoteState.js)
  - pending event queue and gameplay-state helpers now live in [networkClientState.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/networkClientState.js)
  - [NetworkClient.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/NetworkClient.js) now keeps reconnect lifecycle local while delegating lower-risk state bookkeeping

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
  - this pass also moved:
    - hitbox debug
    - hitbox audit
    - clip-selection policy
    - low-level playback/mixer helpers
    - fire/hit orchestration
    - death playback/reset helpers
    - aim/weapon/character-root presentation helpers
  - it still owns the higher-risk runtime behavior:
    - active visual updates
    - per-player runtime update orchestration
    - socket attachment at runtime
    - runtime presentation-state integration
  - any further extraction should stay smaller and narrower than the earlier reverted hit-volume-debug attempt
- [NetworkClient.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/NetworkClient.js)
  - reconnect lifecycle is now the main sensitive hotspot there
  - recent safe extractions moved:
    - remote snapshot dedupe/pruning
    - event queue helpers
    - gameplay-state apply/reset helpers
  - the remaining rule is important:
    - keep room-token guards and reconnect ownership local unless there is a very strong boundary
- Server-side authoritative room / hitbox runtime
  - [TacticalRoom.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js)
  - [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)
  - these are functionally important and still fairly dense
  - they should only be refactored when there is a clear ownership win, not just because they are large
  - the first useful server combat and payload extractions are now done, so future slices should target state-application or event-construction boundaries only if they are equally clear
  - the next clear structural win is likely not another small threshold tweak, but a shared pose/blend-state layer consumed by both `RemotePlayerPresenter` and `remoteHitboxRig`
  - that work is now partially underway: both sides share clip-transition state, but authoritative pose parity still needs more than shared fade duration/state alone
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
- For remote multiplayer polish, prefer shared pose-state extraction over piling on more one-off crouch / transition heuristics
- Treat rewound root alignment as mostly solved for now; focus next on pose-transition parity, not rewind timing
- Rebuild after each code refactor slice

## Practical Next Refactor Order

1. Leave `FirstPersonController` alone unless there is a concrete need around one of the remaining dense methods.
2. Prefer low-risk `NetworkClient` cleanup next, such as ping/diagnostics helpers, while leaving reconnect ownership local.
3. If remote presentation work resumes, only take another `RemotePlayerPresenter` slice if it is still clearly a mixed-responsibility boundary rather than orchestration for its own sake.
4. If server combat work continues, keep extracting only narrow authority-adjacent helpers from `TacticalRoom` without moving state mutation/broadcast sequencing prematurely.
5. Treat server payload shaping as mostly “done enough” unless a similarly clear serialization boundary appears.
6. Treat Dust2 grounding notes and movement-feel tuning as debugging/tuning concerns, not refactor tasks.
7. For the next substantial multiplayer-quality pass, prefer a shared remote pose/blend-state module used by both visible presentation and authoritative hitbox evaluation.
