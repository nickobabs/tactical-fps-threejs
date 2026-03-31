# App System

## Summary

`GameApp` is the top-level runtime composition root. It builds the Three.js scene, camera, renderer, map runtime, gameplay systems, HUD, skybox system, and update loop, and it distributes one shared frame input snapshot to the systems that need it.

## Inputs

- Root DOM element from `main.js`
- Browser resize events
- Per-frame delta time from `THREE.Clock`
- Shared frame input from `InputManager`
- HUD callbacks for resume, map selection, skybox selection, and master volume changes
- Asynchronous map-load requests and navmesh generation stages

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
- Remote-player placeholder rendering from authoritative network state

## Dependencies

- `three`
- `InputManager`
- `mapOptions`
- `MapRuntime`
- `createHud`
- `SkyboxManager`
- `AudioManager`
- `NetworkClient`

## Key Design Decisions

- `GameApp` owns composition, not gameplay details.
- Input is consumed once per frame in `GameApp` and handed to systems that need it.
- Map data returns both render geometry and gameplay metadata such as spawn point and collision volumes.
- Map loading is registry-driven, but activation is now staged through `MapRuntime`: `GameApp` requests a map by ID, the runtime builder creates the map payload and navmesh, and only then is the active runtime swapped.
- Navigation is initialized per loaded map from that map's collision geometry before the new map is activated, so bot pathfinding cost is paid at load time instead of during live play.
- The render loop currently updates player movement before weapon presentation and HUD refresh.
- Pause is coordinated at the app layer by suspending gameplay updates while continuing HUD and render output.
- In the current multiplayer pass, pause is local UI/input state only. It no longer freezes the broader world simulation or remote-player updates.
- Skybox selection is delegated to `SkyboxManager`, keeping HDR loading and disposal out of the rest of the runtime.
- Audio registration and browser audio-context lifecycle are coordinated in `GameApp`, while playback remains encapsulated in `AudioManager`.
- `GameApp` now owns composition and high-level state, while map-bound systems such as collision, targets, navigation, and player spawn live inside `MapRuntime`.
- Old map scene trees are explicitly disposed during unload to avoid leaking geometry, materials, and textures across repeated map swaps.
- `GameApp` renders remote multiplayer placeholders directly for now rather than introducing a dedicated replicated-actor layer before the protocol settles.

## Current Status

- Implemented and active
- HDR skyboxes, pause menu flow, staged map swapping, navmesh-backed target updates, weapon swapping, sensitivity/volume controls, shared audio registration, and additive multiplayer placeholder rendering are all integrated into the active runtime
