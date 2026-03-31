# Player Controller System

## Summary

`FirstPersonController` owns camera look, movement velocity, grounded state, crouch interpolation, jump behavior, collision-aware locomotion, and the split between predicted simulation state and presented local camera state.

## Inputs

- Shared frame input from `InputManager`
- Frame delta time
- Optional `CollisionWorld`
- Spawn position and ground height
- Optional movement-speed multiplier callback from higher-level gameplay systems
- Configurable base mouse sensitivity

## Outputs

- Updated player position
- Updated camera yaw and pitch
- Debug state for HUD
- Local movement input snapshots for networking
- Authoritative reconciliation of predicted simulation state
- Smoothed presented camera/world transform for the local player

## Dependencies

- `three`
- `InputManager`
- `CollisionWorld`

## Key Design Decisions

- Yaw and pitch are split into separate scene nodes.
- Camera height is adjusted through stance interpolation instead of instant snapping.
- Horizontal motion is smoothed using acceleration and lerp-based velocity targets.
- Vertical motion uses simple gravity and jump impulse logic.
- Ground snapping uses sampled floor height plus a small step threshold so authored ramps and raised surfaces can be traversed.
- Mouse sensitivity scales with current camera FOV, so scoped views feel proportionally slower without a separate sensitivity path.
- Base mouse sensitivity is user-adjustable, and scoped sensitivity remains relative to the current FOV on top of that base value.
- Look input is gathered from browser pointer-lock movement events and applied once per render frame, which keeps aiming tied to the same timing as camera/render updates.
- Movement speed can be scaled externally without changing controller internals, which is now used for weapon-dependent mobility such as the knife.
- Core locomotion math is now shared with the multiplayer server through `src/shared/playerMovement.js`, while the browser controller still layers local collision queries on top of that shared simulation.
- The controller now separates predicted gameplay state from the rendered local rig, so reconciliation can correct simulation without directly jolting the camera every time authoritative state arrives.
- Local reconciliation now uses a deadzone/hysteresis policy for ordinary movement drift, so tiny disagreement is ignored and only meaningful divergence is allowed to influence the live local path.

## Current Status

- Implemented and active
- Supports look, walk, sprint, crouch, jump, collision blocking, and walking onto authored raised surfaces
- Supports weapon-dependent movement speed modifiers through a callback passed from `GameApp`
- Default base sensitivity is lower than the original prototype tuning and can be adjusted from the pause menu
- Jump descent no longer snaps early back to the floor from the apex
- Exposes compact movement input snapshots for server-authoritative multiplayer
- Reconciles authoritative server state into the predicted simulation path, while presentation follows that simulation through correction-offset handling and bounded local responsiveness

## Investigation Notes

- The controller has gone through multiple multiplayer-oriented presentation experiments:
  - direct reconciliation on the live local transform
  - softened correction smoothing
  - presentation offset decay
  - interpolation between fixed local simulation ticks
  - removal of interpolation
  - velocity-based extrapolation from the latest predicted state
  - a temporary local-only `120 Hz` prediction-step experiment
- Those experiments improved specific symptoms at different times, and the important outcome was that local deadzone/hysteresis correction produced the first movement baseline that passed the eye test in local multiplayer.
- Current debugging suggests the biggest remaining risk is no longer flat-ground micro-stutter, but future divergence cases such as ramps, jumps, and combat-driven correction once more gameplay becomes authoritative.

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

## Near-Term Direction

- Validate the current correction policy against more than flat-ground strafing
- Keep prediction deterministic and replay-friendly while expanding authoritative gameplay
- Avoid stacking more ad hoc local smoothing unless instrumentation shows a specific need
