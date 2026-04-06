# Networking System

## Summary

`NetworkClient` is now an active additive multiplayer bridge that connects the browser game to a standalone Colyseus server in `server/`.

The current networking slice supports:

- Joining a shared `TacticalRoom`
- Server-assigned player identity through Colyseus session IDs
- Client-to-server per-step input snapshots
- Client-to-server fire requests for PvP combat
- Server-authoritative player positions derived from those inputs
- Server-authoritative player health / alive state for PvP
- Server-broadcast combat events for hit / death / respawn feedback
- A fixed-rate authoritative room simulation on the server
- Client-side local movement prediction with replay-based reconciliation and a separate local presentation layer
- Remote-player placeholder rendering through replicated authoritative state, now including visible weapon and simple labels
- Remote-player placeholder rendering now also uses replicated crouch / current-height state plus lightweight remote fire events for readability
- A server-authoritative remote-hitbox snapshot path now exists for PvP debug and hit validation work

Multiplayer is still optional. If no Colyseus server is reachable, the game continues to run fully in single-player mode.

## Inputs

- Frame delta time
- Local player input snapshots
- Colyseus room lifecycle events
- Server-authenticated player-state snapshots

## Outputs

- Connection-state visibility for HUD/debugging
- Remote player authoritative transforms for rendering
- Local authoritative corrections for reconciliation
- Replicated local-player health / respawn timing
- Combat event stream for local hit / damage feedback

## Dependencies

- `colyseus.js`
- Standalone Colyseus Node server in `server/`
- Shared movement simulation in `src/shared/playerMovement.js`
- Shared netcode timing constants in `src/shared/netcode.js`
- Shared protocol normalization/helpers in `src/shared/netcodeProtocol.js`
- Shared authoritative map collision layouts in `src/shared/maps/`

## Key Design Decisions

- Multiplayer remains additive. Failure to connect must never block local single-player runtime.
- The first authoritative movement pass sends inputs, not positions.
- Clients seed the server with their initial spawn state once, then switch over to input snapshots for ongoing movement.
- Movement simulation is factored into a shared module so client and server can evolve toward a common movement model instead of duplicating magic numbers.
- Timing constants and message-shape normalization are also shared so the room and browser client do not drift on protocol assumptions.
- The earlier "send latest input at 20 Hz while the server reuses it at 60 Hz" model has been removed because it caused stale-input drift, most visibly as a small forward correction after sprint release.
- The room now queues received inputs and consumes each one once in order instead of repeatedly simulating a single latest input across multiple server ticks.
- The client still moves immediately for responsiveness, then reconciles to server authority using the server's last processed input sequence.
- Reconciliation now updates predicted simulation state directly, while the presented local rig absorbs moderate correction error over time instead of applying every correction straight to the camera.
- Small local drift is intentionally ignored. Local correction now uses a deadzone and hysteresis model so the client only starts converging once divergence is meaningfully above threshold, and stops once it has settled back into a smaller band.
- Replicated state already carries `displayName`, `activeWeaponKey`, and a small `presentationState` enum, and the active remote third-person playermodel path now consumes that data directly.
- Remote player presentation is now split between network state in `NetworkClient` and runtime rendering in `RemotePlayerPresenter`.
- The server-side simulation now uses shared authored collision primitives for map-aware authoritative movement, but it still does not share the browser's full rendered map assembly path.
- The current combat slice is intentionally narrow:
  - local weapon presentation stays immediate
  - the server owns PvP hit validation, damage, death, and respawn timing
  - the client consumes replicated combat state and feedback events
- The current remote-hitbox path has moved from coarse fallback gameplay capsules to server-authoritative bone-driven segmented hit volumes.

## Current Status

- Implemented and active
- Two local browser tabs can join the same `TacticalRoom`
- Remote players appear as readable placeholders with:
  - blue box body
  - visible equipped weapon proxy
  - simple name label
  - crouch-height posture changes
  - remote muzzle flash / firing feedback
  - air-state tilt/readability
  - scoped/sniper stance hint through weapon posture
  - remote hit flinch / flash readability
  - clearer remote death lean / fall transition
- Remote presentation now has an active experimental skinned-character path in `RemotePlayerPresenter`, with the older capsule/weapon proxy kept as a fallback if asset loading fails
  - the current character asset is `public/models/players/newtest.glb`
  - the source strip clip is `Take 001`, which is still used for several temporary runtime subclips
  - imported root-motion translation is stripped in code so the replicated actor transform stays authoritative
  - current airborne behavior still freezes the jump clip in a tucked-leg pose until landing rather than replaying the tail
  - remote model visibility restores correctly after respawn
  - remote rifle presentation still uses `weapon_socket_r` on the character and authored helpers on the rifle asset
  - the current rifle asset is `public/models/weapons/newak.glb`
  - the active rifle helpers are:
    - `grip_socket`
    - `muzzle_socket`
    - `left_hand_grip`
  - remote rifle world scale still compensates for inherited scale from the skinned character/socket chain
  - live rifle pose tuning still exists through an `F7` panel in the browser and persists via `localStorage`
  - `F6` now also exposes temporary remote aim-debug controls:
    - model scale
    - weapon / proxy / bone axis selection
    - bone and weapon strength
  - left-arm CCD IK still exists only as an experimental runtime path and is not yet a solved production system
  - runtime subclips from the long strip proved visibly jittery for locomotion loops
  - the first standalone exported locomotion proof, `public/models/players/newtest_run.fbx`, now overrides the experimental `run` clip and plays cleanly in-engine
  - current direction is to export the rest of the locomotion set as standalone clips from the original 3ds Max source instead of continuing to rely on runtime subclips for loop-critical motions
  - remote pitch is now replicated
  - a new authored rifle upper-body base clip still exists for the experimental remote path:
    - `public/models/players/animations/newtest_rifle_upper_idle.fbx`
  - that broader upper/lower-body locomotion layering path is currently paused and is not the active runtime baseline
- Connection state and remote-player count are visible in the HUD
- Server authority and reconciliation are wired end-to-end for player movement
- Server authority now uses shared map collision for `Training Ground` and `Desert Compound`
- Server authority also loads imported collision glTF data for `Dust2 Import Test`
- A first server-authoritative PvP combat slice is now live:
  - clients send fire requests
  - the server validates hits against authoritative player state
  - player health / death / respawn are replicated
  - remote placeholders now reflect alive vs dead state
  - HUD feedback exists for local damage taken, damage dealt, and respawn countdown
- A server-authoritative bone-driven hitbox path is now active:
  - shared constants now exist in `src/shared/remoteCharacterConfig.js`
  - shared hitbox snapshot construction now exists in `src/shared/remoteHitboxes.js`
  - the server owns a dedicated remote skeleton evaluator in `server/src/remoteHitboxRig.js`
  - `F3` can render remote hit volumes for inspection
  - hit validation now prefers the authoritative segmented hitbox snapshot path
  - left-hand IK is intentionally disabled in the authoritative rig because it caused upper-body pose drift relative to the visible remote mesh
  - `F6` includes a local hitbox debug mode for visual tuning without changing authoritative hitreg
  - the baked shared head tuning baseline is:
    - `headOffset = { x: 0, y: 0.035, z: -0.005 }`
    - `headRadius = 0.15`
- `NETDEBUG` instrumentation exists in the HUD/devtools path for local multiplayer diagnosis and is intentionally being kept available while multiplayer expands

## Limitations

- Server/client movement can still diverge intermittently because the browser map runtime and the server collision runtime are not yet driven from one single source of truth
- Bots, rounds, utility, and most world interactions are still local-only and are not yet synchronized
- Local movement feel is now materially improved by correction deadzone/hysteresis, but this still needs validation across more cases like ramps, jump arcs, and future combat-driven correction
- PvP shot validation is intentionally simple for now:
  - player hit detection is currently split between:
    - older coarse fallback volumes
    - newer server-authoritative segmented bone-driven hit volumes
  - no lag compensation yet
  - no ammo/reload state yet
  - no full killfeed or spectate flow yet
- Local target dummies are now disabled by default for PvP testing unless explicitly re-enabled through `VITE_DISABLE_LOCAL_TARGETS_FOR_PVP=false`
- The long-strip subclip path is still a temporary bridge for some motions, but it is no longer the preferred quality path for locomotion
- Remote aim presentation is still under active iteration:
  - pitch replication is wired
  - weapon/socket pitch is the main always-on readability cue
  - a narrow neck/head-only procedural aim-readability pass is the current active body layer
  - crouch body aiming is intentionally disabled because it conflicted with the authored crouch set
  - standing fire now uses the full-body `newtest_fire.fbx` clip again
  - stable left-hand IK is still not solved
- Remote hitboxes are now in a usable state, but still deserve normal gameplay validation over time:
  - the authoritative path now follows the visible remote mesh closely enough for current PvP use
  - head placement depends on the shared tuned defaults and should be revalidated if the playermodel, skeleton, or aim-readability pass changes
  - `F3` remains an important diagnostic tool, and `F6` local hitbox debug should be used for future visual tuning before baking new shared defaults

## Investigation Notes

- Input-authoritative movement, replay-based reconciliation, remote interpolation, shared map collision primitives, and weapon speed-multiplier sync are all in place.
- Instrumentation showed that the worst earlier issue, constant server correction on every authoritative update, was real and was substantially reduced after syncing weapon speed multipliers through the protocol.
- Later instrumentation showed the remaining choppy feel was still tied to frequent tiny local corrections rather than render frametime or major drift.
- Current `NETDEBUG` captures indicate that local flat-ground movement no longer suffers from severe network backlog or large authoritative drift. Typical values have shown:
  - sequence gap around `1-2`
  - authoritative update cadence around `20 Hz`
  - predicted drift and correction distance typically around `0.02-0.03`, with small occasional spikes
  - presentation offset usually small as well
- The most useful A/B check was toggling local correction off entirely. With correction disabled, local movement felt effectively correct, which confirmed that the remaining issue was correction policy rather than render cadence.
- The current working baseline is to trust local prediction for tiny drift and only begin convergence once the correction clears a meaningful threshold.
- For hitboxes, the important lesson is:
  - building useful authoritative volumes from the remote skeleton is possible
  - parity improved once the authoritative rig was simplified instead of trying to preserve every experimental upper-body post-process
  - left-hand IK was the major pose-parity failure in this branch

## Tried And Observed

- Shared authoritative collision on the server:
  - Improved correctness around authored geometry, but did not resolve the local flat-ground feel issue.
- Local presentation interpolation:
  - Reduced visible stepping, but added noticeable local lag.
- Removing local interpolation:
  - Removed some lag but brought back visible frizz/step artifacts.
- Velocity-based local extrapolation:
  - Removed the worst visible frizzing from 60 Hz local stepping.
- Raising the local-only simulation cadence to `120 Hz`:
  - Helped somewhat, but did not fully restore single-player feel.
- Adding local correction deadzone and hysteresis:
  - This was the first change that clearly passed the eye test.
  - It removed the constant micro-correction feel by refusing to react to tiny disagreement every server update.
  - This is now the active baseline rather than an experiment.
- Switching from "latest input resent at 20 Hz" to immediate per-step input sends plus ordered server-side input queueing:
  - Removed the obvious post-sprint forward correction symptom.
  - Did not resolve the wall-phasing issue under sustained pressure.
- Preserving local yaw/pitch during reconciliation:
  - Fixed the earlier correction-induced mouse-look degradation.
  - Was not related to wall phasing itself.
- Making buffered and hard-snap corrections collision-aware:
  - Reduced obvious direct correction bypasses.
  - Did not fully eliminate wall phasing.
- First server-authoritative PvP combat pass:
  - Passed the basic local test:
    - two players can damage each other
    - death/respawn replicate
    - walls can block shots
  - Current local feedback includes:
    - center-screen damage numbers when you hit another player
    - a stronger red vignette when taking damage
    - a darkened dead-state overlay and respawn countdown while waiting to respawn
- Bone-driven hitbox follow-up:
  - splitting limbs into smaller segments improved shape quality
  - the original client-local bone-driven debug proved the concept
  - promoting that path to the server exposed deeper parity issues
  - the decisive fix was removing authoritative left-hand IK
  - head follow then needed a pose-relative anchor plus tuned shared head offset/radius values

## Current Conclusion

- The local-player path is now in a meaningfully better place.
- The current baseline is:
  - immediate local movement feel from client prediction
  - server authority retained for meaningful divergence
  - tiny correction ignored through deadzone/hysteresis
- The architecture still benefits from keeping local presentation, predicted canonical state, and authoritative server state separate, but that is now an evolution path from a working baseline rather than an unresolved crisis.
- Collision correctness under sustained wall pressure is still not solved yet. The active known issue is wall/slope contact jitter, not wall phasing.
- Multiplayer is now good enough for real friend-testing of:
  - movement
  - presence
  - basic PvP damage/death/respawn
- The bone-driven authoritative hitbox path is now the active baseline for PvP validation, though it should still be regression-checked when remote animation presentation changes.

## Reset Plan

- Target outcome:
  - local movement should feel effectively single-player under normal conditions
  - server authority should still own correction, validation, and future combat/gameplay truth
  - server cadence should not be directly visible in ordinary local locomotion
- New architecture goal:
  - `Immediate Local Presentation State`
    - first-person camera/viewmodel feel
    - render-rate responsive
    - should not inherit routine server refresh cadence
  - `Predicted Canonical State`
    - fixed-step local gameplay prediction
    - source of sent inputs and replay/reconciliation
  - `Authoritative Server State`
    - final truth for validation, correction, and later damage/combat authority
- Implementation direction:
  - simplify the current local presentation path first
  - separate first-person feel from predicted canonical movement explicitly
  - only let server correction become visible when divergence is significant
  - keep remote-player interpolation separate from local-player presentation concerns

## Near-Term Plans

- Consolidate map geometry so client visuals/collision and server authority are generated from the same shared layout source
- Validate the current correction model against more gameplay cases such as jumps, ramps, weapon swaps, and eventual damage/combat correction
  - Improve the new combat slice incrementally:
    - better hit validation
    - better combat feedback
    - round-state authority
  - staged remote-player presentation:
      - keep placeholder fallback
      - continue the `newtest.glb` remote character experiment
      - replace long-strip locomotion subclips with standalone exported clips from Max
      - keep the authored rifle helpers and the current stable full-body locomotion baseline
      - continue socket-relative rifle hold tuning and per-weapon pose offsets for rifle / sniper / knife and scoped state
- Keep the current debug instrumentation in place until those validation passes are done, since it is now part of the practical multiplayer workflow
- Continue the current remote-aim compromise until there is enough justification for a larger animation-state-machine pass:
  - stable full-body locomotion
  - weapon/socket pitch
  - narrow neck/head aim readability where it behaves well
  - later, revisit authored aim poses or stronger IK only if the remote playermodel path becomes important enough
- For hitboxes, the next session should start from a clean audit:
  - compare final client-presented remote pose vs authoritative server pose
  - verify exactly which post-processing steps affect the visible skeleton
  - preserve the simpler authoritative pose contract unless there is a clear need to add more post-processing to the server rig
