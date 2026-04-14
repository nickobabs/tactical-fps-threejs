# Weapon System

## Summary

`WeaponManager` now acts as the runtime shell for weapon state and per-frame orchestration, while smaller weapon modules own tuning UI, action execution, policy/state helpers, selection/application helpers, shot resolution, presentation math, and shared-effects integration.

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
- Current grounded walk-speed factor exposed to the player controller

## Dependencies

- `three`
- `InputManager` frame data
- Shootable meshes from the map factory

## Key Design Decisions

- First-person viewmodels now use a mixed path:
  - rifle, pistol, and knife use a borrowed animated prototype asset pack
  - sniper still uses a procedural fallback viewmodel
- Viewmodel is rendered on a separate camera layer to avoid self-hits during raycasts
- Weapon behavior is split between a runtime manager, config data, viewmodel builder helpers, shot-resolution helpers, presentation helpers, and shared transient effect helpers
- `WeaponManager` has been explicitly decomposed so future weapon work does not accumulate back into one large class:
  - `createViewModelTuningPanel.js` owns the temporary `F4` tuning UI
  - `weaponActions.js` owns shot / knife execution wiring around the lower-level firing helpers
  - `weaponState.js` owns swap selection, scope-state derivation, scope-sound decisions, and fire eligibility policy
  - `weaponSelection.js` owns active-weapon state payload derivation and active viewmodel selection/application
  - `weaponFiring.js` still owns hit resolution and fire audio primitives
  - `weaponPresentation.js` still owns viewmodel presentation math
  - `EffectsManager` now owns transient tracers and impact markers used by weapon fire
- The rifle is automatic and supports ADS with a centered sight picture
- The pistol is a semi-auto sidearm with a lighter ADS profile than the rifle
- The sniper is semi-auto and supports scoped zoom with a full overlay
- The knife is a faster-movement melee slot with a simple forward thrust attack and short-range center-screen hit test
- Recoil is now split into two layers:
  - viewmodel / visual recoil for camera and weapon feel
  - actual spray recoil that can change bullet direction
- ADS recoil can still be damped per weapon to preserve sight alignment
- Shot feedback is intentionally lightweight and readable: flash, tracer, and impact marker rather than full decal or particle systems
- Weapon shot effects now render through the shared `EffectsManager`, which also provides the baseline path for smoke and bomb-objective effects
- Weapon swapping is slot-driven through config data, so adding new number-key weapons does not require another hardcoded branch in `WeaponManager`
- Slot lookup now comes from config data rather than a per-frame scan across all weapons, which keeps input handling simpler as the arsenal grows
- `WeaponManager` now coordinates weapon runtime state while delegating hitscan/melee resolution, viewmodel presentation math, weapon policy, and active-viewmodel selection to smaller helpers, which lowers the cost of adding more weapons or expanding animation logic later
- The active base FOV is now exposed to the player as horizontal FOV and is configurable from the pause menu
- The current first-person prototype path includes a temporary `F4` live-tuning panel for viewmodel and muzzle alignment
- A recoil tuning panel now exists and is opened from the general debug menu:
  - live tuning for `visualRecoil`
  - live tuning for `sprayRecoil`
  - live tuning for `hipfireSpread`
  - export of current weapon recoil JSON
- Borrowed animated viewmodel weapons are now prevented from firing until their equip animation has completed

## Current Status

- Implemented and active
- Includes `Rifle`, `Pistol`, `Knife`, and `Sniper` slots, weapon swapping on number keys, scoped FOV transitions, sniper hipfire spread, per-weapon damage values, weapon-dependent movement speed, and a basic knife thrust attack with dedicated audio
- Rifle damage is now hit-zone aware in the authoritative PvP path:
  - head shots are lethal
  - body shots use the main baseline damage
  - arms and legs use reduced damage
- Rifle and pistol now both expose recoil tuning through the debug recoil panel
- Rifle currently uses both visual recoil and actual gameplay spray recoil
- Pistol currently exposes `hipfireSpread`, `visualRecoil`, and `sprayRecoil` for live tuning
- Rifle, pistol, and knife now play imported equip / hold / fire clips from the borrowed prototype viewmodel pack
- Knife equip now uses the authored full draw animation instead of only the earlier procedural stab-style presentation
- Rifle, pistol, and knife now respect equip completion before they can fire
- Semi-auto weapons now use edge-triggered fire plus a short input buffer so fast pistol clicks do not feel randomly dropped near the cooldown limit
- The manager itself is now significantly smaller and is primarily responsible for owned mutable weapon state plus update sequencing

## Limitations

- No authoritative ammo/reload rules yet
- Only the rifle currently has explicit hit-zone damage overrides in shared weapon data
- The current rifle/pistol/knife animation baseline is still explicitly a prototype content path using borrowed assets, not a final production asset pipeline
- Knife melee is still intentionally lightweight on the gameplay side: there is no separate swing trace, combo chain, or deeper melee state machine
