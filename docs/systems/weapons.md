# Weapon System

## Summary

`WeaponManager` owns equipped weapon state, first-person viewmodels, shot timing, hitscan raycasts, recoil response, zoom state, movement-speed modifiers, muzzle flash, tracers, and temporary impact markers.

## Inputs

- Camera
- Scene
- Shootable mesh list from the map
- Shared frame input
- Frame delta time

## Outputs

- Camera-attached weapon model
- Visual shot feedback
- Raycast hit results expressed as impact markers and tracers
- Current weapon label
- Scoped state and ADS reticle state exposed to HUD
- Current movement-speed multiplier exposed to the player controller

## Dependencies

- `three`
- `InputManager` frame data
- Shootable meshes from the map factory

## Key Design Decisions

- Weapon is procedurally assembled from simple primitives instead of imported art
- Viewmodel is rendered on a separate camera layer to avoid self-hits during raycasts
- Weapon behavior is split between a runtime manager, config data, viewmodel builder helpers, shot-resolution helpers, presentation helpers, and temporary shot-effect helpers
- The rifle is automatic and supports ADS with a centered sight picture
- The sniper is semi-auto and supports scoped zoom with a full overlay
- The knife is a faster-movement melee slot with a simple forward thrust attack and short-range center-screen hit test
- Recoil affects the viewmodel only, not camera aim; ADS recoil can be damped per weapon to preserve sight alignment
- Shot feedback is intentionally lightweight and readable: flash, tracer, and impact marker rather than full decal or particle systems
- Weapon swapping is slot-driven through config data, so adding new number-key weapons does not require another hardcoded branch in `WeaponManager`
- Slot lookup now comes from config data rather than a per-frame scan across all weapons, which keeps input handling simpler as the arsenal grows
- `WeaponManager` now coordinates weapon runtime state while delegating hitscan/melee resolution and viewmodel presentation math to smaller helpers, which lowers the cost of adding more weapons or expanding animation logic later

## Current Status

- Implemented and active
- Includes `Rifle`, `Sniper`, and `Knife` slots, weapon swapping on number keys, scoped FOV transitions, sniper hipfire spread, per-weapon damage values, weapon-dependent movement speed, and a basic knife thrust attack with dedicated audio

## Limitations

- No ammo, reload, reload cancel, weapon-specific animation system, or camera kick
- Knife melee is still intentionally lightweight: there is no separate swing trace, combo chain, inspect, or animation rig
