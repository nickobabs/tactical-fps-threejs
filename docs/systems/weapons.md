# Weapon System

## Summary

`WeaponManager` now acts as the runtime shell for weapon state and per-frame orchestration, while smaller weapon modules own tuning UI, action execution, policy/state helpers, selection/application helpers, shot resolution, presentation math, and temporary shot effects.

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

- First-person viewmodels now use a mixed path:
  - rifle, pistol, and knife use a borrowed animated prototype asset pack
  - sniper still uses a procedural fallback viewmodel
- Viewmodel is rendered on a separate camera layer to avoid self-hits during raycasts
- Weapon behavior is split between a runtime manager, config data, viewmodel builder helpers, shot-resolution helpers, presentation helpers, and temporary shot-effect helpers
- `WeaponManager` has been explicitly decomposed so future weapon work does not accumulate back into one large class:
  - `createViewModelTuningPanel.js` owns the temporary `F4` tuning UI
  - `weaponActions.js` owns shot / knife execution wiring around the lower-level firing helpers
  - `weaponState.js` owns swap selection, scope-state derivation, scope-sound decisions, and fire eligibility policy
  - `weaponSelection.js` owns active-weapon state payload derivation and active viewmodel selection/application
  - `weaponFiring.js` still owns hit resolution and fire audio primitives
  - `weaponPresentation.js` still owns viewmodel presentation math
  - `weaponEffects.js` still owns temporary shot effects
- The rifle is automatic and supports ADS with a centered sight picture
- The pistol is a semi-auto sidearm with a lighter ADS profile than the rifle
- The sniper is semi-auto and supports scoped zoom with a full overlay
- The knife is a faster-movement melee slot with a simple forward thrust attack and short-range center-screen hit test
- Recoil affects the viewmodel only, not camera aim; ADS recoil can be damped per weapon to preserve sight alignment
- Shot feedback is intentionally lightweight and readable: flash, tracer, and impact marker rather than full decal or particle systems
- Weapon swapping is slot-driven through config data, so adding new number-key weapons does not require another hardcoded branch in `WeaponManager`
- Slot lookup now comes from config data rather than a per-frame scan across all weapons, which keeps input handling simpler as the arsenal grows
- `WeaponManager` now coordinates weapon runtime state while delegating hitscan/melee resolution, viewmodel presentation math, weapon policy, and active-viewmodel selection to smaller helpers, which lowers the cost of adding more weapons or expanding animation logic later
- The active base FOV is now exposed to the player as horizontal FOV and is configurable from the pause menu
- The current first-person prototype path includes a temporary `F4` live-tuning panel for viewmodel and muzzle alignment
- Borrowed animated viewmodel weapons are now prevented from firing until their equip animation has completed

## Current Status

- Implemented and active
- Includes `Rifle`, `Pistol`, `Knife`, and `Sniper` slots, weapon swapping on number keys, scoped FOV transitions, sniper hipfire spread, per-weapon damage values, weapon-dependent movement speed, and a basic knife thrust attack with dedicated audio
- Rifle, pistol, and knife now play imported equip / hold / fire clips from the borrowed prototype viewmodel pack
- Knife equip now uses the authored full draw animation instead of only the earlier procedural stab-style presentation
- Rifle, pistol, and knife now respect equip completion before they can fire
- The manager itself is now significantly smaller and is primarily responsible for owned mutable weapon state plus update sequencing

## Limitations

- No ammo, reload authority, reload cancel, inspect flow, or camera kick
- The current rifle/pistol/knife animation baseline is still explicitly a prototype content path using borrowed assets, not a final production asset pipeline
- Knife melee is still intentionally lightweight on the gameplay side: there is no separate swing trace, combo chain, or deeper melee state machine
