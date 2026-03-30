# Player Controller System

## Summary

`FirstPersonController` owns camera look, movement velocity, grounded state, crouch interpolation, jump behavior, and collision-aware locomotion.

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

## Current Status

- Implemented and active
- Supports look, walk, sprint, crouch, jump, collision blocking, and walking onto authored raised surfaces
- Supports weapon-dependent movement speed modifiers through a callback passed from `GameApp`
- Default base sensitivity is lower than the original prototype tuning and can be adjusted from the pause menu
- Jump descent no longer snaps early back to the floor from the apex

## Limitations

- No leaning
- No ladder or vault logic
- No recoil transfer into camera yet
