# Master Context

## What This Game Is

This project is a Counter-Strike-like tactical first-person shooter focused on grounded movement, tight lanes, readable cover, low time-to-kill combat, and round-based play. It is being built in Three.js with Vite and JavaScript, with the goal of growing this prototype directly into the main game rather than treating it as a throwaway experiment.

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
      maps/
        DesertCompound.js
        MapRuntime.js
        TrainingGround.js
        mapBuilder.js
        mapOptions.js
      networking/
        NetworkClient.js
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
      audio/
        AudioManager.js
      ai/
        NavigationManager.js
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
- Files are currently JavaScript ES modules with one primary responsibility per file.

## Key Architectural Decisions

- The game is being built directly in Three.js. Architecture and naming should continue to support incremental expansion of this codebase rather than a later engine swap.
- `GameApp` is the composition root. It creates the renderer, scene, camera, systems, map, and main animation loop.
- Input is consumed once per rendered frame and passed into systems that need it, rather than letting each system poll and clear input independently.
- The player controller owns movement and look state, while `CollisionWorld` owns static mesh-based world collision resolution and downward ground sampling.
- Weapons are runtime-built viewmodels attached directly to the camera rather than imported assets at this stage.
- Shooting is hitscan-based through `THREE.Raycaster`, using map meshes as shoot targets.
- Weapon definitions now live in a lightweight config layer under `src/game/weapons/weaponConfigs.js`, while procedural viewmodel building lives in `src/game/weapons/viewModels.js`.
- HUD is DOM/CSS, not world-space UI.
- The pause menu and skybox selection UI live inside the HUD layer rather than as separate app-level DOM systems.
- Maps are selected through a small registry in `src/game/maps/mapOptions.js`, and `GameApp` now delegates staged map creation to `src/game/maps/MapRuntime.js` so map creation, navmesh generation, and map-bound system wiring are isolated from the top-level app loop.
- Graybox map factories share common assembly helpers through `src/game/maps/mapBuilder.js`, which reduces duplication in mesh registration, collision extraction, and target wiring.
- Bot navigation is isolated in `src/game/ai/NavigationManager.js`, which builds a navmesh from each loaded map's collision geometry during that loading stage rather than opportunistically after activation.
- HUD shell, pause-menu interactions, and static pause-menu content are now split across smaller UI files instead of one large DOM module.
- HDR environment loading and swapping is now isolated in `SkyboxManager`.
- Disposable Three.js scene trees are cleaned up through `src/core/three/disposeObject3D.js` so map swaps do not accumulate old geometry, materials, or textures.
- Multiplayer now uses a separate Colyseus server under `server/`, while the browser runtime keeps networking additive so the prototype remains usable without a live backend.
- Shared player locomotion math now lives in `src/shared/playerMovement.js`, which is used by both the browser controller and the Colyseus room's first authoritative movement pass.
- Shared multiplayer timing/protocol helpers now live in `src/shared/netcode.js` and `src/shared/netcodeProtocol.js`, which keeps message shape and tick assumptions aligned between browser and server.
- Shared authoritative map layout/collision helpers now live under `src/shared/maps/`, which the Colyseus room uses to build map-aware collision for server movement.
- Events currently flow through direct method calls and shared frame data. There is no event bus, no UnityEvent equivalent, and no message broker yet.

## What Is Already Built And Confirmed Working

- Vite project bootstraps and builds successfully.
- A playable first-person prototype launches in browser and can swap between multiple graybox maps at runtime.
- The active map can be swapped from the pause menu through a map-selection list.
- Map swaps now show an explicit loading state and build navigation before the new map goes live, favoring runtime stability over swap speed.
- `Training Ground` remains the compact systems sandbox, while `Desert Compound` is a larger two-site / mid-style layout for broader traversal and sightline testing.
- Mouse look, WASD movement, sprint, crouch, and jump work.
- The player is blocked by a merged static collision mesh and can traverse solids such as the current ramp and catwalk through the same collision path.
- Pointer lock flow works from the game canvas.
- Three weapon slots are available: `Rifle` on `1`, `Sniper` on `2`, and `Knife` on `3`.
- Left click fires hitscan shots with recoil, muzzle flash, tracers, and temporary impact markers.
- The rifle supports ADS with an aligned viewmodel sight and FOV-based sensitivity scaling.
- The sniper supports scoped zoom with a circular overlay, reduced FOV, and FOV-based sensitivity scaling.
- The knife is available on `3`, increases movement speed, and uses a short-range thrust attack with its own slash sound.
- The HUD renders movement state, round state, pointer lock state, weapon name, utility name, and FPS.
- `Escape` opens a pause menu with resume, key bindings, map selection, skybox selection, master volume, and mouse sensitivity.
- Map loading now shows a centered loading overlay while the next map and its navmesh are prepared.
- Multiple HDR skyboxes can be swapped at runtime from the pause menu.
- Basic weapon audio is live: rifle fire, sniper fire, sniper scope zoom, and knife slash all route through a Web Audio-based `AudioManager` with decoded buffers, playback policies, and master volume control.
- A simple moving target enemy exists in the map with body/head hit zones, 100 HP, damage feedback numbers, respawn, navmesh-backed wandering, line-of-sight chase behavior, red idle/aggro eye feedback, and angry eyebrows while aggroed.
- A simple round timer/state loop runs between `freeze` and `live`.
- Basic additive multiplayer works locally through Colyseus: multiple tabs can join the same room, see remote-player placeholders, and exchange authoritative movement state.
- The local player now runs through a fixed-step prediction loop with replay-based reconciliation and a separate rendered presentation path layered on top of predicted gameplay state.
- Multiplayer correction now uses a deadzone/hysteresis policy so tiny drift does not constantly tug on local movement.
- Temporary multiplayer debug instrumentation exists to inspect sequence gap, authoritative update cadence, predicted drift, correction rate, buffered correction, and presentation offset during local testing, and it is intentionally being kept available.

## Current Gameplay Snapshot

- Maps:
  - `Training Ground`
  - `Desert Compound`
- Weapons:
  - `Rifle`: full auto, ADS, low damage hitscan
  - `Sniper`: semi-auto, scoped overlay, high damage hitscan, hipfire spread
  - `Knife`: fast movement, melee thrust
- Bots:
  - Wander on navmesh
  - Chase on sight
  - Face movement direction while roaming/pathing
  - Show aggro through eyes + eyebrows
- Menus:
  - Pause menu
  - Key bindings
  - Map selection
  - Skybox selection
  - Volume slider
  - Sensitivity slider
- Multiplayer:
  - Shared `TacticalRoom` via Colyseus
  - Remote players rendered as simple placeholder boxes
  - Client-side prediction with replay-based reconciliation and a separate local presentation path
  - Local movement feel is now materially improved by correction deadzone/hysteresis and currently passes the eye test for flat-ground movement
  - Debug workflow remains active:
    - `F8`: toggle `NETDEBUG`
    - `F9`: disable local correction application for A/B testing
    - `F10`: force an immediate debug summary dump

## Main Runtime Flow

- `GameApp` owns renderer, camera, skybox state, HUD state, pause state, and the animation loop.
- `MapRuntime` builds and owns map-bound systems: collision, navigation, player controller, weapons, targets, rounds, utility, and the additive multiplayer client.
- `InputManager` gathers browser input and exposes one shared frame snapshot per render frame.
- `FirstPersonController` consumes that snapshot for look, runs local fixed-step movement prediction, reconciles only predicted gameplay state, and exposes a separate presented rig for local rendering.
- `NetworkClient` packages movement input snapshots, sends them to Colyseus, receives authoritative player state, and exposes remote/local correction data back to the runtime.
- `WeaponManager` consumes the same frame snapshot for swap / scope / fire logic and delegates shot resolution and viewmodel presentation to helper files.
- `TargetManager` updates target actors using `CollisionWorld` and `NavigationManager`.

## High-Value Files

- [`src/app/GameApp.js`](C:/Users/nicko/tactical-fps-threejs/src/app/GameApp.js): top-level runtime composition and frame loop.
- [`src/game/maps/MapRuntime.js`](C:/Users/nicko/tactical-fps-threejs/src/game/maps/MapRuntime.js): map-bound system assembly and lifecycle.
- [`src/core/physics/CollisionWorld.js`](C:/Users/nicko/tactical-fps-threejs/src/core/physics/CollisionWorld.js): static world collision, grounding, and LOS.
- [`src/game/ai/NavigationManager.js`](C:/Users/nicko/tactical-fps-threejs/src/game/ai/NavigationManager.js): runtime navmesh generation and path queries.
- [`src/game/weapons/WeaponManager.js`](C:/Users/nicko/tactical-fps-threejs/src/game/weapons/WeaponManager.js): weapon runtime state coordination.
- [`src/game/targets/TargetDummy.js`](C:/Users/nicko/tactical-fps-threejs/src/game/targets/TargetDummy.js): current bot actor behavior.
- [`src/game/ui/Hud.js`](C:/Users/nicko/tactical-fps-threejs/src/game/ui/Hud.js): HUD shell and loading/pause integration.
- [`src/shared/playerMovement.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/playerMovement.js): shared locomotion math for client prediction and server authority.
- [`src/shared/maps/mapLayouts.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/maps/mapLayouts.js): shared collision-critical map primitive definitions for server authority.
- [`src/shared/maps/mapCollision.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/maps/mapCollision.js): server-side collision-geometry assembly from shared map layouts.
- [`src/shared/netcode.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/netcode.js): shared networking tick/snapshot constants.
- [`src/shared/netcodeProtocol.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/netcodeProtocol.js): shared message normalization and serialization helpers.
- [`server/src/rooms/TacticalRoom.js`](C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js): current Colyseus authoritative room.

## Current Pressure Points

- Bundle size is still the biggest technical pressure point because `recast-navigation` and its WASM chunk are large.
- AI is still intentionally simple. `TargetDummy` is cleaner than before, but more advanced combat behavior will likely want another split between perception, navigation, and combat decision logic.
- Weapons are in better shape after the recent helper splits, but reloads/ammo/equip behavior will probably justify another structure pass when those systems land.
- Multiplayer authority is still the biggest architectural correctness pressure point: movement now uses shared logic and shared collision primitives, but the client and server still do not generate gameplay collision from one fully unified source of truth.
- Multiplayer correctness still needs continued validation around jumps, ramps, and future combat authority, but the worst flat-ground local feel issue has been materially improved by the current correction model.
- Another architectural pressure point is code organization around multiplayer presentation. `GameApp` currently still owns remote placeholder rendering and some debug plumbing because that is the fastest path while the protocol is settling.

## Known Issues Or Deliberate Compromises

- Collision is now mesh-based through `three-mesh-bvh`, but it is still static-world only. There is no dynamic body interaction, moving-platform support, or full stair-step / ledge system yet.
- The map is a graybox. Layout readability is acceptable for testing but not art-complete or competitively tuned.
- Weapon models are simple procedural placeholders intended to establish framing and feel, not final art.
- Only the sniper currently has hipfire spread. There is still no ammo, reload, weapon sway tied to locomotion, reload cancel, or ballistic simulation.
- Knife attack logic is intentionally simple: a short forward thrust with a close-range center-screen hit check rather than a full melee trace or animation system.
- The target enemy moves and takes damage, but it still does not shoot, use cover, coordinate with other bots, or use any animation system.
- Navigation meshes are currently generated at runtime from collision geometry rather than baked offline.
- Runtime navmesh generation still happens on the main thread, so load-time cost grows with map complexity even though gameplay frames no longer share that work.
- `RoundManager` and `UtilityManager` are still early stubs outside their currently visible features.
- `NetworkClient` is no longer a stub, but multiplayer still only covers player presence and movement.
- Server-authoritative movement now uses shared map collision primitives, but client/server movement can still diverge because the client map factories and the server collision layout are not yet fully unified.
- `FixedStepLoop` is now integrated into the active local prediction path, while `PlayerState` remains unused.
- Several local multiplayer presentation experiments have already been tried, including interpolation, removal of interpolation, velocity-based extrapolation, weapon speed-multiplier sync, a temporary local-only `120 Hz` prediction-step test, and buffered correction. The current working baseline is the deadzone/hysteresis correction model plus retained debug tooling.

## Local Multiplayer Feel Baseline

- Keep the existing additive multiplayer foundation:
  - Colyseus room
  - input-authoritative protocol
  - replay/reconciliation
  - remote interpolation
  - shared collision primitives on the server
- The local-player feel work was reset around a cleaner architectural baseline:
  - `Immediate Local Presentation State`
    - what the player feels in first person
    - should track local input/render cadence
  - `Predicted Canonical State`
    - fixed-step client prediction used for networking and replay
  - `Authoritative Server State`
    - correction/validation truth
- Working assumption going forward:
  - ordinary locomotion should feel single-player
  - server refresh should not be routinely visible while just moving around
  - visible correction should be exceptional, not the default movement experience
- Current implementation choice:
  - tiny local drift is ignored
  - correction begins only after a meaningful divergence threshold
  - correction stops again after falling back below a smaller threshold
  - debug controls remain available during development:
    - `F8`: net debug overlay / summary
    - `F9`: ignore local corrections
    - `F10`: immediate burst dump
- Current next direction:
  - validate this baseline across jumps, ramps, weapon switching, and later damage/combat authority
  - continue unifying client and server collision/layout generation
  - only revisit deeper local-presentation refactors if instrumentation shows the current baseline breaking down in those broader scenarios
- There is no save/load, replay, bots, replication, buy phase economy, or win-condition system yet.
