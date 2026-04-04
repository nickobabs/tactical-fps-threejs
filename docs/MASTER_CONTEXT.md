# Master Context

## What This Game Is

This project is a Counter-Strike-like tactical first-person shooter focused on grounded movement, readable lanes, low time-to-kill hitscan combat, and round-based play. It is built in Three.js with Vite and JavaScript, and the working assumption is still that this prototype will evolve in place into the real game rather than being thrown away.

## Folder Structure

```text
/
  docs/
    MASTER_CONTEXT.md
    systems/
      app.md
      input.md
      physics.md
      player-controller.md
      player-state.md
      ai-navigation.md
      map-desert-compound.md
      map-training-ground.md
      ui-hud.md
      targets.md
      skyboxes.md
      audio.md
      rounds.md
      weapons.md
      utility.md
      networking.md
      fixed-step-loop.md
  public/
    maps/
    navmeshes/
  scripts/
    build-navmeshes.mjs
  server/
    package.json
    src/
      index.js
      rooms/
        TacticalRoom.js
  src/
    app/
      GameApp.js
    core/
      input/
        InputManager.js
      loop/
        FixedStepLoop.js
      physics/
        CollisionWorld.js
      three/
        disposeObject3D.js
    game/
      ai/
        NavigationManager.js
        navigationGeneration.js
      audio/
        AudioManager.js
      maps/
        DesertCompound.js
        MapRuntime.js
        TrainingGround.js
        mapAssetLoader.js
        mapBuilder.js
        mapOptions.js
      networking/
        NetworkClient.js
        RemotePlayerPresenter.js
      player/
        controllers/
          FirstPersonController.js
        state/
          PlayerState.js
      rounds/
        RoundManager.js
      skyboxes/
        SkyboxManager.js
        skyboxOptions.js
      targets/
        TargetDummy.js
        TargetManager.js
        targetFeedback.js
        targetPresentation.js
        targetView.js
      ui/
        Hud.js
        createPauseMenu.js
        pauseMenuBindings.js
      utility/
        UtilityManager.js
      weapons/
        WeaponManager.js
        weaponEffects.js
        weaponFiring.js
        weaponPresentation.js
        weaponConfigs.js
        viewModels.js
    shared/
      constants.js
      maps/
        mapCollision.js
        mapLayouts.js
        mapManifest.js
      netcode.js
      netcodeProtocol.js
      playerMovement.js
    styles/
      main.css
    main.js
  index.html
  package.json
  README.md
```

## Naming Conventions Established

- Feature-first folders under `src/game/` and capability-first folders under `src/core/`.
- Classes use PascalCase filenames and exports, for example `GameApp`, `InputManager`, and `WeaponManager`.
- Factory-style scene builders use verb-style exports such as `createTrainingGround` and `createHud`.
- Shared constants use uppercase keys, for example `TEAMS.ATTACKERS`.
- Files are JavaScript ES modules with one primary responsibility per file.

## Key Architectural Decisions

- `GameApp` is the composition root. It owns the renderer, scene, camera, HUD, pause state, skybox state, app-level networking, map lifecycle, and frame loop.
- Input is consumed once per render frame and distributed to systems instead of being polled/cleared independently by each feature.
- `MapRuntime` owns map-bound systems only: collision, navigation, player controller, weapons, rounds, utility, and targets.
- `NetworkClient` now lives at the app/session layer in `GameApp`, not inside `MapRuntime`, so map swaps no longer imply reconnect churn.
- The player controller owns look, movement state, prediction/reconciliation, movement mode, and the split between canonical gameplay state and presented first-person state.
- `CollisionWorld` owns static mesh-based collision resolution, downward ground sampling, and line-of-sight checks using `three-mesh-bvh`.
- Weapons remain procedural viewmodels attached directly to the camera.
- HUD and pause menu are DOM/CSS, not world-space UI.
- Shared locomotion math lives in `src/shared/playerMovement.js` and is used by both the browser controller and the Colyseus room.
- Shared map metadata now has an explicit manifest in `src/shared/maps/mapManifest.js`.
- Map assembly has a real asset boundary in `src/game/maps/mapAssetLoader.js`. The runtime no longer assumes every map must be “one JS factory that returns everything.”
- Graybox maps still render through runtime factories, but imported maps can render from glTF scenes, collide against separate glTF collision scenes, and load baked navmesh assets from the manifest.
- Navigation prefers baked navmesh binaries at runtime. Runtime nav generation still exists as a dev/fallback path.
- Imported map support is now a real workflow, not a future placeholder.
- The Colyseus server in `server/src/index.js` now also serves the built Vite client from `dist/`, so one Railway service can host both the frontend and multiplayer backend on one public URL.

## What Is Already Built And Confirmed Working

- Vite project bootstraps and builds successfully.
- A playable first-person prototype launches in browser.
- Runtime map swapping works from the pause menu.
- Map loading is staged and shows a loading overlay while the next map and navmesh are prepared.
- Pointer lock works from the game canvas.
- `Escape` now reliably opens the pause menu when pointer lock is lost instead of only releasing the mouse.
- `Ctrl` is no longer used for crouch. Crouch is `C` only, specifically to avoid accidental browser shortcut conflicts such as `Ctrl+W`.
- Mouse look, walk, sprint, crouch, and jump work.
- The player is blocked by merged static collision meshes.
- Three weapon slots are available:
  - `1`: Rifle
  - `2`: Sniper
  - `3`: Knife
- Rifle, sniper, and knife all have functioning presentation/effects/audio paths.
- The sniper scope overlay works and is still HUD-driven.
- HDR skyboxes can be swapped at runtime.
- Additive multiplayer still works locally through Colyseus:
  - multiple tabs can join
  - remote placeholders render
  - local prediction and replay-based reconciliation are active
  - authoritative movement now covers `Training Ground`, `Desert Compound`, and `Dust2 Import Test`
- The current Railway deployment path also works as a one-service setup:
  - build the client at repo root
  - start the Colyseus server from `server/`
  - serve the built frontend and multiplayer backend from the same Railway domain
- A first server-authoritative PvP combat slice is now live:
  - clients send fire requests to the server
  - the server validates simple player hits from authoritative state
  - health, death, and respawn replicate back to clients
  - world geometry can block shots
  - HUD feedback now covers local health, damage taken/dealt, and respawn countdown
- Multiplayer correction now uses a deadzone/hysteresis policy and remains the current baseline.
- HUD shows round state, FPS, weapon, utility, pointer-lock state, movement state, and current position/movement mode.
- Debug controls are now part of the active workflow:
  - `F8`: toggle `NETDEBUG`
  - `F9`: ignore local corrections
  - `F10`: dump a debug snapshot
  - `V`: toggle fly mode
  - `J`: log current position
  - `K`: save a debug marker
  - `L`: dump saved markers
  - `B`: toggle collision wireframe overlay
- Baked navmesh generation exists through `npm run build:navmesh`.
- Imported map support is working through `Dust2 Import Test`:
  - visual `.glb`
  - separate collision `.glb`
  - baked navmesh binary
  - manifest-defined spawn/gameplay defaults

## Current Gameplay Snapshot

- Maps:
  - `Training Ground`
  - `Desert Compound`
  - `Dust2 Import Test`
- Weapons:
  - `Rifle`: full auto, ADS, low damage hitscan
  - `Sniper`: semi-auto, scoped overlay, high damage hitscan, hipfire spread
  - `Knife`: fast movement, melee thrust
- Bots:
  - wander on navmesh
  - chase on sight
  - use simple line-of-sight driven behavior
- Menus:
  - pause menu
  - key bindings
  - map selection
  - skybox selection
  - volume slider
  - sensitivity slider
- Multiplayer:
  - Colyseus room
  - remote players use a remote third-person presentation path with placeholder fallback
  - the active character-model experiment uses `public/models/players/newtest.glb`
  - the active clean locomotion proof uses a standalone `public/models/players/newtest_run.fbx` clip for `run`
  - crouch, jump, weapon attachment, and fire layering are active in the experimental path
  - client prediction with replay/reconciliation
  - first server-authoritative PvP combat slice for hits, health, death, and respawn
  - debug workflow still active

## Main Runtime Flow

- `GameApp` owns renderer, HUD, pause/resume, map selection, skybox selection, app-level networking, and the main animation loop.
- `MapRuntime.create()` builds the selected map, initializes navigation, creates `CollisionWorld`, creates the player controller, and assembles map-bound systems.
- `InputManager` gathers browser input and exposes one shared frame snapshot per rendered frame.
- `FirstPersonController` consumes look input, runs fixed-step movement simulation, and exposes local presentation separately from canonical simulation state.
- `NetworkClient` samples local inputs, receives authoritative state, and exposes corrections.
- `RemotePlayerPresenter` renders remote placeholders / remote character models from authoritative state and combat events, and is now the active remote playermodel testbed.
- `WeaponManager` consumes frame input for swap/scope/fire logic.
- `TargetManager` updates bots using `CollisionWorld` and `NavigationManager`.

## High-Value Files

- [`src/app/GameApp.js`](C:/Users/nicko/tactical-fps-threejs/src/app/GameApp.js): composition root, map lifecycle, pause flow, HUD wiring, debug controls, collision debug overlay, and app-level networking ownership.
- [`src/game/networking/RemotePlayerPresenter.js`](C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js): remote player placeholder/model presentation, remote animation selection, external clip loading, experimental IK, and remote weapon attachment.
- [`src/game/maps/MapRuntime.js`](C:/Users/nicko/tactical-fps-threejs/src/game/maps/MapRuntime.js): map-bound system assembly and lifecycle.
- [`src/game/maps/mapAssetLoader.js`](C:/Users/nicko/tactical-fps-threejs/src/game/maps/mapAssetLoader.js): manifest-driven map assembly for runtime-factory maps and imported glTF maps.
- [`src/shared/maps/mapManifest.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/maps/mapManifest.js): map registry including asset paths, spawn defaults, gameplay mode, and baked navmesh metadata.
- [`src/core/physics/CollisionWorld.js`](C:/Users/nicko/tactical-fps-threejs/src/core/physics/CollisionWorld.js): static collision, ground sampling, and LOS.
- [`src/shared/playerMovement.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/playerMovement.js): shared movement simulation used by both client and server.
- [`src/game/player/controllers/FirstPersonController.js`](C:/Users/nicko/tactical-fps-threejs/src/game/player/controllers/FirstPersonController.js): movement modes, prediction, presentation, fly mode, and landing logic.
- [`src/game/ai/NavigationManager.js`](C:/Users/nicko/tactical-fps-threejs/src/game/ai/NavigationManager.js): navmesh query runtime.
- [`scripts/build-navmeshes.mjs`](C:/Users/nicko/tactical-fps-threejs/scripts/build-navmeshes.mjs): offline navmesh builder for shared-layout and glTF collision maps.
- [`server/src/rooms/TacticalRoom.js`](C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js): current authoritative Colyseus room.

## Imported Map Workflow Snapshot

- Current imported map under active test: `Dust2 Import Test`.
- Current runtime asset paths:
  - visual scene: `public/maps/de_dust2_-_cs_map.glb`
  - collision scene: `public/maps/de_dust2_collision.glb`
  - baked navmesh: `public/navmeshes/dust2-import-test.bin`
- Current Blender-to-game coordinate mapping:
  - Blender `X -> game x`
  - Blender `Z -> game y`
  - Blender `Y -> game z` with sign flipped
- Current practical workflow:
  - import source `.glb` into Blender
  - create a collision-only collection / objects for gameplay collision
  - export one visual `.glb`
  - export one collision `.glb`
  - place/update `spawn_01` in Blender
  - copy the mapped spawn values into `mapManifest.js`
  - run `npm run build:navmesh`
  - test in browser and iterate
- This is a real usable iteration path, but not yet a production-quality content pipeline.

## Important Changes Landed In This Session

- `NetworkClient` ownership was moved to `GameApp`.
- `NetworkClient` default server URL logic now distinguishes local and deployed environments:
  - local pages still default to `ws://localhost:2567`
  - deployed pages default to the current host using `ws:` / `wss:`
- Graybox map collision authoring was pushed toward shared manifest/layout boundaries.
- Baked navmesh support was added and is now the preferred runtime path.
- `recast-navigation`, map modules, and loader-heavy pieces were split/lazy-loaded as part of bundle work.
- Imported map plumbing was added:
  - glTF render scenes
  - glTF collision scenes
  - manifest-driven gameplay defaults
  - baked navmesh generation from imported collision geometry
- `Dust2 Import Test` was made playable enough for real-scale environment testing.
- High-altitude floor clamping bug was fixed in shared movement:
  - old behavior effectively snapped high maps down to `groundHeight - 32`
  - current behavior clamps relative to `groundHeight` on both bounds
- Landing from height was fixed by probing ground from the higher of pre/post-step Y and using a dynamic drop distance.
- Ramp floating was fixed by returning actual hit height from `CollisionWorld.getGroundHeightAt()` instead of clamping upward to fallback `groundHeight`.
- Ramp sliding was fixed by excluding walkable upward-facing triangles from horizontal pushback.
- Fog range was expanded to fit larger imported maps.
- Global fly mode toggle was added.
- Position/marker debug tools were added.
- Collision wireframe overlay was added for imported-map debugging.
- A first server-authoritative PvP combat slice was added:
  - client fire requests
  - simple authoritative hit validation
  - replicated health/death/respawn
  - world shot blocking against server collision
- Remote-player presentation was upgraded into an active remote playermodel workflow:
  - replicated display name, equipped weapon key, posture, and presentation state all now drive remote visuals
  - `RemotePlayerPresenter` still falls back to the older capsule proxy if the character model fails to load
  - the current remote character experiment uses `public/models/players/newtest.glb`
  - root-motion translation is stripped in code so the server-replicated actor transform stays authoritative
  - current jump handling still uses the tucked airborne hold behavior
  - remote rifle presentation still attaches through `weapon_socket_r` on the character plus `grip_socket` / `muzzle_socket` on `public/models/weapons/ak-47-fixed.glb`
  - remote rifle scaling still compensates for inherited world scale from the socket/bone chain
  - `F6` still tunes remote model scale and `F7` still tunes socket-relative weapon pose values in-browser through `localStorage`
  - left-arm CCD IK is now an active experiment, but it still uses a guessed runtime grip target until the rifle gets a proper left-hand helper
  - runtime subclips from the long `Take 001` strip are usable for many motions, but loop quality was not good enough for locomotion
  - the first standalone Max-exported run clip, `public/models/players/newtest_run.fbx`, now plays cleanly in-engine and overrides the experimental `run` clip
  - current conclusion: standalone exported clips from the source DCC are the preferred path for locomotion quality, while the long-strip subclip path remains a temporary bridge
- The project README was updated from scaffold-level notes to a current project overview with actual runtime/deploy/architecture context.
- Local combat HUD feedback was added:
  - stronger damage vignette
  - hit damage numbers
  - dark dead overlay
  - respawn countdown
- Auto-pause on pointer-lock loss was removed so inactive multiplayer test tabs do not keep interrupting sessions.
- Local target dummies are now disabled by default for PvP testing unless `VITE_DISABLE_LOCAL_TARGETS_FOR_PVP=false`.
- Railway deployment support was added:
  - Express now answers `/health`
  - the server binds on `0.0.0.0`
  - the built frontend is served from `dist/`
  - the SPA fallback route was updated to an Express 5 compatible wildcard

## Current Pressure Points

- Bundle size is still a major pressure point because `recast-navigation` and its WASM payload are still large.
- AI is still intentionally simple.
- Weapons are in better shape, but reload/ammo/equip behaviors will need another structure pass later.
- Multiplayer authority is still the biggest correctness pressure point:
  - graybox maps use shared movement/shared collision primitives
  - imported maps like Dust2 now load authoritative collision from manifest-defined glTF assets on the server, but the broader client/server map assembly path is still not one single source of truth
- Imported-map support is good enough for iteration, but the export pipeline is still manual and Blender-driven.
- `GameApp` still owns some temporary debug/presentation responsibilities because that is the fastest path while broader runtime boundaries are still settling.
- Remote character presentation is now out of `GameApp`, but the current weapon/model workflow is still a prototype content pipeline:
  - remote character experiment uses `newtest.glb`, with the older legacy path still available as a fallback
  - remote rifle uses `ak-47-fixed.glb`
  - the character/weapon export path currently depends on a hand-authored `weapon_socket_r` helper on the character and `grip_socket` / `muzzle_socket` helpers on the rifle
  - the main animation-quality blocker is now the long-strip export/subclip path rather than the source run motion itself
  - first clean proof for locomotion came from a standalone FBX clip exported from the original 3ds Max source file
- The top active multiplayer movement blocker after the latest pass is wall/slope contact jitter under authority/correction.
- Shared movement feel is still intentionally simple on the planar-velocity side:
  - current starts, stops, and direction changes still use a target-velocity lerp in `src/shared/playerMovement.js`
  - the next planned movement pass is explicit acceleration / deceleration / opposition braking
  - goal is cleaner tactical momentum, not slippery inertia systems

## Known Issues Or Deliberate Compromises

- Collision is static-world only.
- No moving platforms, trigger volumes, or dynamic rigid-body interaction.
- Wall contact still has a known oscillation/shimmer problem when the player leans into solid geometry. Several small mitigations were tried; the issue was not solved cleanly and is intentionally paused for now.
- The latest safe state keeps:
  - ramp sliding fixed
  - ramp floating fixed
  - landing/fall-through fixed
  - wall phasing fixed
  - wall/slope contact jitter unresolved
- `Dust2 Import Test` is currently best treated as:
  - traversal testbed
  - collision/scale/lighting/fog validation map
  - early multiplayer weapon-feel test space
- `Dust2 Import Test` is not yet a fully production-ready gameplay map:
  - collision is manually authored
  - server-side authoritative movement now uses the imported collision glTF, but broader gameplay authority is still incomplete
  - export workflow is manual
- The current PvP combat slice is intentionally thin:
  - no lag compensation yet
  - no head/body hit zones
  - no ammo/reload authority
  - no killfeed, spectate flow, or round authority yet
- Runtime nav generation still exists as a fallback and still runs on the main thread when used.
- `RoundManager` and `UtilityManager` remain early stubs.
- `PlayerState` still exists but remains unused.

## Latest Multiplayer Investigation

- Current rollback checkpoint before the next wall-contact pass:
  - full-capsule BVH movement path is active on both client and server
  - sustained wall pressure no longer phases the player through geometry
  - flat-ground walk/run/stop behavior is stable again
  - floor sink / `air`-`grounded` flicker was fixed by restoring a floor-support probe on top of the full-capsule move path
  - remaining issue at this checkpoint is contact jitter:
    - oscillation when pushing into walls
    - jitter on sloped surfaces
- Current multiplayer testing checkpoint after the combat pass:
  - movement is good enough for friend-testing online
  - wall phasing is no longer the active blocker
  - first server-authoritative PvP combat slice is working locally
  - local targets are disabled by default for cleaner PvP testing
  - current combat feedback includes:
    - damage numbers when hitting another player
    - stronger red vignette when taking damage
    - dark dead overlay plus respawn countdown while waiting to respawn
- If a later pass regresses movement, the checkpoint implementation lives primarily in:
  - `src/core/physics/CollisionWorld.js`
  - `src/shared/playerMovement.js`
  - `src/game/player/controllers/FirstPersonController.js`
  - `server/src/rooms/TacticalRoom.js`
  - `src/game/networking/NetworkClient.js`
  - `src/app/GameApp.js`
  - `src/game/weapons/WeaponManager.js`
  - `src/shared/netcodeProtocol.js`
  - `src/shared/weaponData.js`
- Recent confirmed improvements:
  - server-side imported-map collision now loads from manifest-defined glTF assets
  - immediate per-step input sending replaced the older "latest input resent at 20 Hz" model
  - ordered server-side input queueing removed the obvious forward correction after releasing sprint
  - local yaw/pitch preservation during reconciliation fixed correction-induced mouse-look slowdown/oscillation
- Recent attempted fixes that did not solve wall phasing:
  - making buffered corrections collision-aware
  - making hard-snap corrections collision-aware
  - substepping correction motion
  - substepping `CollisionWorld.move()`
  - directional filtering to avoid resolving against the exit face of hollow blockers
- Current best hypothesis:
  - the remaining movement issue is in contact response, not wall phasing
  - a more principled future pass likely means better wall/slope contact response tuning, more instrumentation, or both

## Local Multiplayer Feel Baseline

- Keep the current additive multiplayer foundation:
  - Colyseus room
  - input-authoritative protocol
  - replay/reconciliation
  - remote interpolation
  - shared movement logic
- Active design target remains:
  - local camera should feel immediate like single-player
  - predicted gameplay state should remain deterministic/replayable
  - authoritative correction should be exceptional, not routine
- Current working baseline:
  - deadzone/hysteresis correction
  - debug controls still available during development
  - app-layer `NetworkClient` lifetime

## Near-Term Direction

- Keep building on the imported-map pipeline instead of reverting to graybox-only assumptions.
- Formalize gameplay metadata export for imported maps later, likely from Blender or a similar DCC path.
- Keep baked navmesh as the preferred runtime model.
- Leave wall-contact oscillation paused until it is worth doing a more principled controller/contact pass.
- Next movement-feel pass:
  - replace the current planar velocity lerp with a more explicit acceleration / braking model in `src/shared/playerMovement.js`
  - keep high responsiveness while preventing instant direction flips
  - preserve deterministic shared simulation for client prediction and server authority
  - keep counter-strafe meaningful, mainly for sniper timing rather than rifle-spread gimmicks
  - do not add stamina, leaning, or crouch-slide
- Validate the current online multiplayer baseline with a friend using:
  - authoritative movement
  - basic PvP hits/health/death/respawn
  - current HUD combat feedback
- For the current Railway deploy path use:
  - build command: `npm install && npm --prefix server install && npm run build`
  - start command: `npm --prefix server start`
  - public networking target: the Railway `PORT` shown in logs, currently `8080`
- Next likely multiplayer expansions are:
  - better combat feedback polish
  - better player hit validation
  - round-state / respawn-rule authority
  - better remote player presentation, staged as:
      - maintain placeholder fallback
      - continue the `newtest.glb` remote character experiment
      - replace long-strip runtime subclips with standalone exported locomotion clips from Max
      - add a proper left-hand helper to the rifle and replace the guessed IK target
      - continue socket-relative rifle pose tuning and per-weapon hand offsets / pose adjustments
- Movement implementation notes for the next pass now live in `docs/movement-acceleration-plan.md`
