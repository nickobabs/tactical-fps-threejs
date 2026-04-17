# Player Controller System

## Summary

`FirstPersonController` owns camera look, movement velocity, grounded state, crouch interpolation, jump behavior, collision-aware locomotion, movement mode, and the split between predicted simulation state and presented local camera state. The controller is now partially decomposed so smaller modules own input snapshots, fly-mode landing helpers, presentation smoothing, and collision-safe movement helpers.

## Inputs

- Shared frame input from `InputManager`
- Frame delta time
- Optional `CollisionWorld`
- Spawn position and ground height
- Optional movement-speed multiplier callback from higher-level gameplay systems
- Configurable base mouse sensitivity
- Optional landing surfaces for imported-map landing checks

## Outputs

- Updated player position
- Updated camera yaw and pitch
- Debug state for HUD
- Local movement input snapshots for networking
- Authoritative reconciliation of predicted simulation state
- Smoothed presented camera/world transform for the local player
- Fly-mode toggling and landing attempts

## Dependencies

- `three`
- `InputManager`
- `CollisionWorld`

## Key Design Decisions

- Yaw and pitch are split into separate scene nodes.
- Camera height is adjusted through stance interpolation instead of instant snapping.
- Crouch transition speed is now shared-stateful rather than stateless:
  - crouch toggles contribute to a small fatigue meter
  - the first `2` quick toggles are free
  - further quick toggles slow the crouch/stand interpolation speed
  - the fatigue window fully clears after `1.0s` without a crouch toggle
  - holding crouch does not build fatigue
- Horizontal motion is still shared through `src/shared/playerMovement.js`, but the grounded feel is no longer just a flat target-velocity lerp:
  - grounded acceleration now ramps in more softly at low speed
  - grounded deceleration is explicit
  - grounded reversal applies stronger braking than ordinary slowdown
- Vertical motion uses simple gravity and jump impulse logic.
- Ground snapping uses sampled floor height plus a small step threshold so authored ramps and raised surfaces can be traversed.
- Mouse sensitivity scales with current camera FOV, so scoped views feel proportionally slower without a separate sensitivity path.
- Base mouse sensitivity is user-adjustable, and scoped sensitivity remains relative to the current FOV on top of that base value.
- Look input is gathered from browser pointer-lock movement events and applied once per render frame, which keeps aiming tied to the same timing as camera/render updates.
- Movement speed can be scaled externally without changing controller internals, which is now used for weapon-dependent mobility such as the knife.
- Core locomotion math is now shared with the multiplayer server through `src/shared/playerMovement.js`, while the browser controller still layers local collision queries on top of that shared simulation.
- Shared movement now latches the player's effective max speed when they leave the ground and preserves that airborne speed cap until landing.
- Grounded sprint has been removed from the current live ruleset. Grounded locomotion now uses walk/crouch speeds plus weapon speed multipliers, while fly mode still keeps its own sprint behavior.
- `FirstPersonController` is being refactored by responsibility instead of rewritten wholesale:
  - `playerInputState.js` owns movement input snapshotting and immediate presentation-velocity calculation
  - `playerFlyMode.js` owns landing-height probing and fly-mode transition decisions
  - `playerPresentation.js` owns presentation smoothing / target-position math
  - `playerCollisionMotion.js` owns substepped collision-safe movement and corrected-state application helpers
- The controller now separates predicted gameplay state from the rendered local rig, so reconciliation can correct simulation without directly jolting the camera every time authoritative state arrives.
- Local reconciliation now uses a deadzone/hysteresis policy for ordinary movement drift, so tiny disagreement is ignored and only meaningful divergence is allowed to influence the live local path.
- Local look now stays under client control during ordinary reconciliation. Earlier authoritative yaw application made mouse look oscillate and feel slowed while correction was active.
- Grounded presentation now follows actual simulated velocity rather than desired input velocity.
  - that removed a misleading local presentation lead during reversal, braking, and wall contact
  - the same fix also cleaned up the funny wall-adjacent oscillation that looked like a correction bug
- A general fly mode exists for debugging and imported-map exploration, and grounded mode can be disallowed per map if a map is not ready for full gameplay collision yet.
- Landing-from-height behavior now probes ground from a safer height window, which was required once imported maps stopped living near `y = 0`.

## Current Status

- Implemented and active
- Supports look, walk, crouch, jump, collision blocking, and walking onto authored raised surfaces
- Supports fly mode for debugging/imported-map exploration
- Supports weapon-dependent movement speed modifiers through a callback passed from `GameApp`
- Supports per-weapon grounded walk speed factors through the shared input/simulation/network path
- Preserves takeoff momentum while airborne, so weapon swaps or walk changes in the air do not change horizontal speed until landing
- Default base sensitivity is lower than the original prototype tuning and can be adjusted from the pause menu
- Jump descent no longer snaps early back to the floor from the apex
- Exposes compact movement input snapshots for server-authoritative multiplayer
- Reconciles authoritative server state into the predicted simulation path, while presentation follows that simulation through correction-offset handling and bounded local responsiveness
- Current local footsteps and viewmodel bob are also driven from the controller:
  - ordinary stride footsteps are still locally triggered from the controller
  - landing now emits one synthetic footstep on real air-to-ground transitions
  - ADS, crouch, and shift-walk currently suppress bob
- Current crouch-fatigue tuning in shared movement:
  - grace toggles: `2`
  - fatigue per extra quick toggle: `0.45`
  - max fatigue: `1.0`
  - decay: `1.0 / second`
  - full reset delay: `1.0s`
  - minimum crouch-transition multiplier at max fatigue: `0.45`
- The controller refactor is partially complete:
  - low-risk helper boundaries have been extracted
  - the remaining dense core is now concentrated around simulation stepping, buffered correction, and authoritative reconciliation
- Crouch is `C` only. `Ctrl` crouch was removed to avoid accidental browser shortcut conflicts.
- Latest stable checkpoint:
  - the controller now predicts movement through a full BVH capsule move path shared with server authority
  - grounded walk on `Shift` is back and is serialized through the multiplayer input path
  - walking is weapon-relative:
    - most weapons use `50%` walk speed
    - knife currently uses `60%`
  - ordinary walking now feels correct again and sustained wall pressure no longer phases through geometry
  - the earlier fake pullback / oscillation feel during grounded reversals was resolved by making grounded presentation follow actual simulated velocity instead of desired input velocity
  - auto-pausing on pointer-lock loss was removed during current multiplayer testing so inactive local tabs do not constantly interrupt PvP tests

## Investigation Notes

- The controller has gone through multiple multiplayer-oriented presentation experiments:
  - direct reconciliation on the live local transform
  - softened correction smoothing
  - presentation offset decay
  - interpolation between fixed local simulation ticks
  - removal of interpolation
  - velocity-based extrapolation from the latest predicted state
  - a temporary local-only `120 Hz` prediction-step experiment
  - preserving local yaw/pitch during reconciliation
- Those experiments improved specific symptoms at different times, and the important outcome was that local deadzone/hysteresis correction produced the first movement baseline that passed the eye test in local multiplayer.
- Current debugging suggests the biggest remaining risk is no longer the obvious local wall-oscillation / fake pullback symptom. That particular symptom turned out to be presentation-leading-intent rather than a large correction path.
- Latest movement tracing on 2026-04-07 narrowed a separate feel issue:
  - direction-change slowdown was reproduced even when `targetSpeed` stayed at the full grounded cap
  - repeated observed speeds such as `4.10` and `4.5373` point to stale/replayed horizontal velocity rather than simple acceleration limits
  - the next likely fix is in reconciliation behavior for small grounded corrections, not another blind max-speed tweak
- Follow-up trace work clarified the newer baseline:
  - current traces showed reconciliation action staying at `ignore`
  - buffered correction was inactive during the sampled counter-strafe cases
  - residual disagreement was typically a stable horizontal offset of about `0.082`
  - that offset projected almost entirely along movement direction rather than sideways
  - `0.082` is effectively one `60 Hz` movement step at `4.92 m/s`
  - the remaining bad feel came from grounded presentation extrapolating desired velocity rather than using actual simulated velocity
- The next scheduled movement pass is acceleration / deceleration / momentum tuning in shared movement:
  - softer initial ramp-in
  - explicit deceleration and opposition braking
  - no stamina, leaning, or crouch-slide
  - keep the feel clean and tactical rather than slippery

## Reset Plan

- The active design target remains:
  - the local camera should feel immediate like single-player
  - the predicted gameplay state should remain deterministic/replayable
  - reconciliation should update canonical gameplay state first, not drag the camera along as a matter of routine
- The current baseline is now consistent with that direction:
  - predicted gameplay state remains the canonical local simulation
  - presentation is explicit rather than implicit
  - local correction is gated by deadzone/hysteresis instead of being treated as a default response

## Limitations

- No leaning
- No ladder or vault logic
- No recoil transfer into camera yet
- Server authority still does not share the full client map assembly path, so some client/server divergence can remain
- Local first-person feel in multiplayer is now substantially closer to single-player on flat-ground movement, but it still needs broader validation before the model should be treated as final
- Wall-contact oscillation from grounded presentation leading desired velocity is no longer the active problem
- Some wall/slope contact jitter can still remain because the server and browser do not yet share one identical map-assembly source of truth
- The remaining controller core is the highest-risk refactor target currently left in the gameplay runtime:
  - `simulateMovementStep`
  - `applyBufferedCanonicalCorrection`
  - `reconcileAuthoritativeState`

## Near-Term Direction

- Validate the current correction policy against more than flat-ground strafing
- Keep prediction deterministic and replay-friendly while expanding authoritative gameplay
- Avoid stacking more ad hoc local smoothing unless instrumentation shows a specific need
- Keep grounded presentation tied to resolved/simulated movement instead of desired intent
- Preserve the current max-speed model while continuing to tune starts, stops, and direction changes
- Keep counter-strafe behavior meaningful, especially for future sniper use, without making rifles or general movement feel gimmicky
- Expect more tuning on crouch fatigue after live playtesting; the current pass is meant to stop spam-crouch abuse, not to lock down final crouch feel
- See `docs/movement-acceleration-plan.md` for the next-pass implementation outline
