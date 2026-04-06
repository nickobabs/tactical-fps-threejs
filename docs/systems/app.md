# App System

## Summary

`GameApp` is the top-level runtime composition root. It builds the Three.js scene, camera, renderer, HUD, skybox system, app-level networking, and update loop, and it delegates specialized app responsibilities to smaller app-layer controllers.

## Inputs

- Root DOM element from `main.js`
- Browser resize events
- Per-frame delta time from `THREE.Clock`
- Shared frame input from `InputManager`
- HUD callbacks for resume, map selection, skybox selection, and master volume changes
- Asynchronous map-load requests and navmesh generation stages
- Fixed-step local simulation steps for multiplayer prediction
- Local debug toggles for multiplayer correction diagnosis
- Imported-map debug toggles for fly mode, markers, and collision overlay

## Outputs

- A rendered scene each animation frame
- Constructed subsystem instances
- A running browser-based game loop
- Shared per-frame input flow between controller and weapons
- Pause/resume state transitions
- Active map selection and map-runtime rebuilds
- A staged map-loading state with visible loading feedback
- Active HDR skybox selection
- Shared audio registration and lifecycle
- Remote-player rendering from authoritative network state, with placeholder fallback and an active remote playermodel experiment
- Local correction toggles and debug snapshot requests for multiplayer diagnosis
- Collision debug wireframe overlay

## Dependencies

- `three`
- `InputManager`
- `mapOptions`
- `MapRuntime`
- `createHud`
- `SkyboxManager`
- `AudioManager`
- `NetworkClient`
- `RemotePlayerPresenter`
- `FixedStepLoop`
- `GamePauseController`
- `GameDebugController`
- `GameplayNetworkingCoordinator`
- `GameSessionController`

## Key Design Decisions

- `GameApp` owns composition, not gameplay details.
- Input is consumed once per frame in `GameApp` and handed to systems that need it.
- `GameApp` is now intentionally split into app-layer helpers instead of accumulating all orchestration internally:
  - `GamePauseController` owns pause state, pointer-lock resume, and HUD pause synchronization
  - `GameDebugController` owns imported-map debug tools, correction toggles, marker logging, and collision debug overlay state
  - `GameplayNetworkingCoordinator` owns gameplay-sync enablement, local-player network initialization, weapon status sync, and combat-event fanout
  - `GameSessionController` owns map loading state, runtime swap sequencing, and runtime activation / teardown
- Map data now comes through the manifest/asset-loader pipeline and can be assembled from runtime factories or imported assets.
- Map loading is registry-driven, but activation is now staged through `GameSessionController` and `MapRuntime`: `GameApp` requests a map by ID, the runtime builder creates the map payload and navmesh, and only then is the active runtime swapped.
- Navigation is initialized per loaded map before activation and now prefers baked navmesh data, with runtime generation remaining only as a fallback path.
- The render loop is now intentionally split into named phases inside `GameApp` rather than remaining as one large `animate()` body.
- Local multiplayer prediction now runs through a fixed-step loop owned by `GameApp`, while look input and rendering remain frame-rate driven.
- Pause is coordinated at the app layer by suspending gameplay updates while continuing HUD and render output.
- In the current multiplayer pass, pause is local UI/input state only. It no longer freezes the broader world simulation or remote-player updates.
- Skybox selection is delegated to `SkyboxManager`, keeping HDR loading and disposal out of the rest of the runtime.
- Audio registration and browser audio-context lifecycle are coordinated through a small app helper, while playback remains encapsulated in `AudioManager`.
- `GameApp` now owns composition and high-level state, while map-bound systems such as collision, targets, navigation, and player spawn live inside `MapRuntime`.
- `NetworkClient` now lives at the app layer instead of being recreated inside `MapRuntime` on every map swap.
- Old map scene trees are explicitly disposed during unload to avoid leaking geometry, materials, and textures across repeated map swaps.
- `GameApp` owns app-level multiplayer composition, but remote-player rendering is delegated to `RemotePlayerPresenter` and gameplay-network wiring is delegated to `GameplayNetworkingCoordinator`.
- Temporary multiplayer diagnostics are also coordinated here:
  - `F3` toggles remote hit-volume debug
  - `F9` toggles local correction application for A/B testing
  - `F10` requests an immediate debug summary dump
- Additional imported-map diagnostics are also coordinated here:
  - `V` toggles fly mode
  - `J`, `K`, `L` support coordinate/marker dumping
  - `B` toggles collision wireframe overlay
- Additional runtime tuning panels are also reachable from the active app flow:
  - `F4` first-person viewmodel and muzzle tuning
  - `F6` remote body/aim/hitbox tuning
  - `F7` remote weapon/socket tuning

## Current Status

- Implemented and active
- HDR skyboxes, pause menu flow, staged map swapping, baked-nav-first map initialization, weapon swapping, sensitivity/volume controls, shared audio registration, imported-map debugging, and additive multiplayer remote-player rendering are all integrated into the active runtime
- Local multiplayer prediction, reconciliation handoff, and remote presentation are all wired through the active app loop
- The current app-layer split is:
  - `GameApp` owns composition and frame-phase ordering
  - `GamePauseController` owns pause/resume state transitions
  - `GameDebugController` owns imported-map and correction debug tools
  - `GameplayNetworkingCoordinator` owns gameplay networking orchestration
  - `GameSessionController` owns map/session lifecycle
- The current remote presentation split is:
  - `GameApp` owns the `NetworkClient` and forwards authoritative snapshots / combat events
  - `RemotePlayerPresenter` owns remote placeholder fallback, remote model loading, animation selection, external clip loading, and socket-based weapon attachment
  - `RemotePlayerPresenter` also owns the temporary `F3`/`F6`/`F7` remote debug and tuning surfaces used during current animation/hitbox work
  - `RemotePlayerPresenter` currently supports both a legacy remote character path (`tester3.glb`) and an experimental path (`newtest.glb` plus standalone FBX overrides such as `newtest_run.fbx`)
  - the remote hitbox branch is now functionally resolved enough for live authoritative PvP use and documented in `docs/remote-hitbox-audit.md`

## Near-Term Direction

- Keep `GameApp` as the composition root, not the long-term home for deeper replicated-actor presentation logic
- Keep the app-layer controller split stable while deeper gameplay systems continue to be refactored beneath it
- Retain the current debug toggles until jumping, ramps, and combat authority have been validated under multiplayer
- Keep the imported-map debug controls available until the asset/export pipeline stops being manual
- Eventually move remote-player rendering and multiplayer-specific presentation responsibilities behind a more dedicated replicated-runtime layer once the protocol stabilizes
