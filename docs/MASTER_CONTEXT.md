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
- First-person weapons now use a mixed camera-attached presentation path:
  - rifle, pistol, and knife currently use a borrowed animated prototype viewmodel pack
  - sniper still uses the older procedural fallback path
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
- Four weapon slots are available:
  - `1`: Rifle
  - `2`: Pistol
  - `3`: Knife
  - `4`: Sniper
- Rifle, pistol, sniper, and knife all have functioning presentation/effects/audio paths.
- A simple smoke grenade utility is now playable on `6` with authoritative throw replication, CS-style smoke bloom, and round-reset inventory refill.
- A first-pass bomb explosion visual now plays at the planted bomb position when the bomb detonates.
- Remote weapon-fire, smoke bloom, footstep, defuse-start, and short-range sniper scope-in audio now replicate from authoritative state with spatial playback on other clients.
- Local audio feedback now also uses dedicated being-hit and headshot-kill stingers, and confirmed enemy hits can reuse the same hit-thud for stronger feedback.
- The sniper scope overlay works and is still HUD-driven.
- Bottom-left replicated chat is now active with `[ALL]` / `[TEAM]` send modes, timed fadeout, passive/open history limits, and full-history reveal while composing.
- HDR skyboxes can be swapped at runtime.
- Additive multiplayer still works locally through Colyseus:
  - multiple tabs can join
  - remote placeholders render
  - local prediction and replay-based reconciliation are active
  - authoritative movement now covers `Training Ground`, `Desert Compound`, `Dust2 Legacy Import`, and `Dust2 Test`
- The current Railway deployment path also works as a one-service setup:
  - build the client at repo root
  - start the Colyseus server from `server/`
  - serve the built frontend and multiplayer backend from the same Railway domain
  - current RTT-based ping readings against Railway EU West (Amsterdam) have tested in a believable `15-20 ms` range from Copenhagen
- The browser client now also has a first reconnect/backoff pass plus richer disconnect diagnostics in the console for room-close investigation.
- A first server-authoritative PvP combat slice is now live:
  - clients send fire requests to the server
  - the server now validates player hits against lag-compensated authoritative hitbox history instead of only the latest live pose
  - health, death, and respawn replicate back to clients
  - world geometry can block shots
  - HUD feedback now covers local health, damage taken/dealt, and respawn countdown
  - replicated hit position/direction now also drive blood-hit feedback on remote players
- Multiplayer correction now uses a deadzone/hysteresis policy and remains the current baseline.
- HUD shows round state, FPS, weapon, utility, pointer-lock state, movement state, and current position/movement mode.
- HUD now also includes:
  - a hold-`Tab` scoreboard with kills, deaths, ping, and live team scores
  - a team-select overlay with player-name entry
  - a toggleable classic HUD mode inspired by Source
  - plant-progress and bomb-planted timer/state feedback
  - a top-right killfeed with team-colored names, weapon icons, and headshot markers
  - a post-death spectate banner plus teammate spectate target label/cycling hints
  - spectate-side first-person weapon/scoped-state mirroring for the current teammate target
  - a HUD layout tuning workflow with draggable panels, live element outlines, and killfeed preview variants
- Debug controls are now part of the active workflow:
  - `F8`: toggle `NETDEBUG`
    - includes a `Copy` button for exact clipboard export of the live panel
  - `F9`: ignore local corrections
  - `F10`: toggle local movement-trace capture
  - `V`: toggle fly mode
  - `J`: log current position
  - `K`: save a debug marker
  - `L`: dump saved markers
  - collision wireframe toggle now lives in the backquote debug menu under `Live Debugging`
- Baked navmesh generation exists through `npm run build:navmesh`.
- Imported map support is working through the current Dust2 imported-map path:
  - visual `.glb`
  - separate collision `.glb`
  - baked navmesh binary
  - manifest-defined spawn/gameplay defaults
- First team-based round flow is active:
  - players pick attackers or defenders on initial load
  - player names are chosen during team select
  - team-based spawns are active
  - friendly fire is disabled
- Pause-menu gamemode selection is active:
  - `Debug`
  - `Competitive`
  - `Competitive` is currently only intended for `Dust2 Test`; other maps sanitize back to `Debug`
- Competitive now also has a simple freeze-time buy flow:
  - players begin without sniper by default
  - `B` opens a buy menu during freeze
  - players choose between `Rifle` and `Sniper`
  - only one player per team can own sniper
  - owning sniper makes the primary-slot action resolve to sniper instead of rifle
- First bomb-objective slice is active:
  - attacker bomb carrier assigned after freeze
  - bomb is equipable with `5`
  - bomb can now be dropped with `G`
  - dropped bombs persist in the world and can be recovered by alive attackers
  - planting requires holding left click in a valid plant zone
  - planted bomb counts down 40 seconds
  - defenders can defuse the planted bomb
  - only one defender can own the defuse at a time; active defuse ownership is now server-side
  - crouch input no longer breaks defuse once the interaction is active
  - explosion awards the round to attackers
  - imported maps can define sites with `plantable_*` markers
  - server-authoritative imported-map bomb-site validation is now implemented
- Competitive Dust2 match flow is now materially built out:
  - 10-second competitive freeze with real movement/combat lockout
  - elimination win logic
  - no mid-round respawns
  - round-start respawn/reset for all ready players
  - unique team-spawn assignment when enough markers exist
  - MR24 regulation with halftime side swap
  - infinite overtime in six-round sets with side swap after three rounds
  - match end scoreboard force-open plus 15-second automatic restart
  - side-swap / overtime intermissions with forced scoreboard and HUD messaging
  - dead players now auto-spectate alive teammates after `2` seconds if a valid teammate exists
  - competitive now defaults room-wide infinite ammo to `off`
  - freeze-time buy flow now allows `Rifle` vs one team-limited `Sniper`

## Current Gameplay Snapshot

- Maps:
  - `Training Ground`
  - `Desert Compound`
  - `Dust2 Legacy Import`
  - `Dust2 Test`
- Weapons:
  - `Rifle`: full auto, ADS, low damage hitscan
  - `Pistol`: semi-auto sidearm, ADS, lighter recoil/spread profile than the sniper, now inaccurate in air
  - `Sniper`: semi-auto, instant 3-stage scope toggle, `100` damage to body/head/arms/legs, inaccurate above `1.5 m/s`, readiness-gated scope-in, front-loaded quickscope inaccuracy that now applies on the actual shot frame, and scope-overlay blur feedback for current inaccuracy
  - `Knife`: fast movement, melee thrust
- Bots:
  - wander on navmesh
  - chase on sight
  - use simple line-of-sight driven behavior
- Menus:
  - pause menu
  - team select with name entry
  - key bindings
  - map selection
  - skybox selection
  - volume slider
  - sensitivity slider
  - horizontal FOV slider
  - runtime key rebinding with local browser persistence
- Multiplayer:
  - Colyseus room
  - attacker/defender team selection
  - replicated display names
  - remote players use a remote third-person presentation path with placeholder fallback
  - `RemotePlayerPresenter` now uses `public/models/players/newtest.glb` as the default remote baseline and `public/models/players/defender.glb` for defender-team visuals
  - the older `public/models/players/tester3.glb` path remains as a fallback if a requested remote model fails to load
  - the active authored remote locomotion set now includes:
    - `newtest_walk.fbx`
    - `newtest_walk_back.fbx`
    - `newtest_run.fbx`
    - `newtest_run_back.fbx`
    - `newtest_strafe_left.fbx`
    - `newtest_strafe_right.fbx`
    - multiple `newtest_melee_*` clips for knife locomotion, crouch, idle, and jump
  - remote rifle presentation uses authored socket helpers and the current stable full-body locomotion path
  - remote locomotion playback now scales from actual replicated movement speed on both the visible client presenter and the authoritative server hitbox rig
  - rifle and pistol now switch between authored walk and run clips from replicated movement speed
  - knife now switches into its dedicated melee locomotion set instead of reusing the rifle/pistol baseline
  - standing fire uses the full-body `newtest_fire.fbx` clip
  - remote vertical-aim readability currently comes from weapon/socket pitch plus a narrow neck/head procedural layer
  - client prediction with replay/reconciliation
  - first server-authoritative PvP combat slice for hits, health, death, and respawn
  - server-authoritative round state and first bomb-objective slice
  - first server-authoritative remote audio slice for weapon fire, smoke bloom, and audible footsteps
  - server-authoritative segmented remote hitboxes are active and now track the visible remote mesh closely enough for current PvP use
  - the head volume now supports shaped width/height/depth tuning instead of a perfect sphere
  - `F3` shows authoritative remote hit volumes and `F6` includes `Local Hitbox Debug` plus live remote-body tuning for safe visual iteration
  - debug workflow still active

## Main Runtime Flow

- `GameApp` owns renderer, HUD, pause/resume, map selection, skybox selection, app-level networking, and the main animation loop.
- `MapRuntime.create()` builds the selected map, initializes navigation, creates `CollisionWorld`, creates the player controller, and assembles map-bound systems.
- `InputManager` gathers browser input and exposes one shared frame snapshot per rendered frame.
- `FirstPersonController` consumes look input, runs fixed-step movement simulation, and exposes local presentation separately from canonical simulation state.
- `NetworkClient` samples local inputs, receives authoritative state, and exposes corrections.
- `RemotePlayerPresenter` renders remote placeholders / remote character models from authoritative state and combat events, and is now the active remote playermodel testbed.
- `WeaponManager` consumes frame input for swap/scope/fire logic, including weapon-config driven equip audio.
- `UtilityManager` now coordinates bomb objective state, smoke utility flow, bomb equip policy, planting interaction, and planted-bomb visualization.
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
- [`server/src/remoteHitboxRig.js`](C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js): authoritative remote skeleton evaluation for segmented remote hitboxes.
- [`src/shared/remoteHitboxes.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/remoteHitboxes.js): shared hitbox snapshot construction from named remote bones.
- [`src/shared/remoteCharacterConfig.js`](C:/Users/nicko/tactical-fps-threejs/src/shared/remoteCharacterConfig.js): shared remote clip/aim/skeleton constants used by both client and server.
- [`docs/remote-character-asset-contract.md`](C:/Users/nicko/tactical-fps-threejs/docs/remote-character-asset-contract.md): current swap contract for replacing the active remote character/hitbox rig without reworking unrelated systems.

## Imported Map Workflow Snapshot

- Current imported maps under active test:
  - `Dust2 Legacy Import`
  - `Dust2 Test`
- Current runtime asset paths:
  - legacy visual scene: `public/maps/de_dust2_-_cs_map.glb`
  - legacy collision scene: `public/maps/de_dust2_collision.glb`
  - current Dust2 Test visual scene: `public/maps/d2maptestv3.glb`
  - current Dust2 Test collision scene: `public/maps/d2colltest.glb`
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
- `Dust2 Legacy Import` was made playable enough for real-scale environment testing and remains useful as a legacy imported-map checkpoint beside `Dust2 Test`.
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
  - the current remote presentation path uses `public/models/players/newtest.glb` as the default baseline, `public/models/players/defender.glb` for defender-team visuals, and `public/models/players/tester3.glb` as the legacy fallback
  - root-motion translation is stripped in code so the server-replicated actor transform stays authoritative
  - current jump handling still uses the tucked airborne hold behavior
  - remote death presentation now prefers `newtest_die_forward.fbx` / `newtest_die_backward.fbx` and leaves corpses visible until respawn
  - remote rifle presentation still attaches through `weapon_socket_r` on the character plus `grip_socket` / `muzzle_socket` on `public/models/weapons/newak.glb`
  - remote rifle scaling still compensates for inherited world scale from the socket/bone chain
  - remote scoped weapon transform offsets currently reuse the hip socket-pose values until a real separate remote ADS pose exists
  - `F6` still tunes remote model scale and `F7` still tunes socket-relative weapon pose values in-browser through `localStorage`
  - left-arm CCD IK still exists as a client-side experiment, but it is intentionally disabled in the authoritative hitbox rig because it caused upper-body pose drift
  - runtime subclips from the long `Take 001` strip are usable for many motions, but loop quality was not good enough for locomotion
  - the first standalone Max-exported run clip, `public/models/players/newtest_run.fbx`, now plays cleanly in-engine and overrides the experimental `run` clip
  - current conclusion: standalone exported clips from the source DCC are the preferred path for locomotion quality, while the long-strip subclip path remains a temporary bridge
  - additional animation FBXs now exist in `public/models/players/animations/`, including:
    - `newtest_walk.fbx`
    - `newtest_walk_back.fbx`
    - multiple `newtest_melee_*` clips for knife locomotion/idle/jump/strafe
  - those walk/melee clips are now wired into the active remote clip selection logic:
    - rifle and pistol can now use authored forward/back walk clips before transitioning into run clips
    - knife now uses a dedicated melee idle/walk/run/strafe/crouch/jump set
    - the authoritative server hitbox rig mirrors the same selection rules so visible mesh and `F3` hitboxes stay aligned
  - later parity work aligned client/server root-motion stripping on `Bip01.position`, which removed the remaining locomotion and jump mismatch; see `docs/remote-hitbox-audit.md` for the full debugging record
  - later playback follow-up aligned client and authoritative hitbox locomotion speed scaling against the shared movement baselines, and excluded jump playback from that scaling on the server rig
  - shared skeleton resolution now explicitly includes both the current Bip-style names and common Mixamo-style names so a future rig swap is less invasive
- The project README was updated from scaffold-level notes to a current project overview with actual runtime/deploy/architecture context.
- Local combat HUD feedback was added:
  - stronger damage vignette
  - hit damage numbers
  - dark dead overlay
  - respawn countdown
- Remote rifle presentation and tuning moved forward again:
  - active remote rifle asset is now `public/models/weapons/newak.glb`
  - `newak.glb` now exports authored `grip_socket`, `muzzle_socket`, and `left_hand_grip`
  - remote rifle scale tuning in `F7` now affects the normalized rifle path correctly
  - current baked `rifleHip` pose values now come from live in-engine tuning
  - `F7` now includes freeze-pose support for steadier weapon tuning
  - fly mode no longer clears remote players, so remote pose tuning can continue from free camera
- First remote vertical-aim readability pass landed:
  - player pitch now replicates through the multiplayer protocol
  - remote weapon pitch and experimental body-aim runtime pass were wired end to end
- Remote hitbox authority was completed:
  - server-authoritative segmented remote hitboxes now drive live PvP validation
  - removing authoritative left-hand IK solved the major upper-body parity issue
  - head follow was finished with a pose-relative anchor, pivot compensation, and baked tuned head defaults
  - `F6` local hitbox debug now exists for future safe tuning
- First-person weapon presentation moved off the all-procedural baseline:
  - active rifle, pistol, and knife now use the borrowed animated `public/models/viewmodels/cube-gunman/hand_base.glb` prototype pack
  - current borrowed prototype textures live under `public/models/viewmodels/cube-gunman/textures/`
  - sniper still uses the procedural fallback path
  - the pause menu now includes a horizontal FOV slider, with the active baseline set to `103` horizontal
  - `F4` now opens a temporary first-person viewmodel tuning panel:
    - hip / ADS position and rotation
    - per-pose muzzle offsets
    - forced ADS preview
    - live muzzle preview
    - values persist through `localStorage`
- First authored remote rifle upper-body base layer landed:
  - new file is `public/models/players/animations/newtest_rifle_upper_idle.fbx`
  - this proved useful as a content experiment, but the broad upper/lower-body layering direction was not stable enough to keep as the active runtime path
- Repo hygiene was improved:
  - `.gitignore` now ignores `debug/`
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
- Audio awareness is now materially better than before, but remote footstep range/loudness tuning is still active work.
- Multiplayer authority is still the biggest correctness pressure point:
  - graybox maps use shared movement/shared collision primitives
  - imported maps like Dust2 now load authoritative collision from manifest-defined glTF assets on the server, but the broader client/server map assembly path is still not one single source of truth
- Imported-map support is good enough for iteration, but the export pipeline is still manual and Blender-driven.
- Older imported-map Dust2 grounding/support investigation notes remain useful historical context, but should not be treated as the current highest-value blocker without a fresh repro on the latest build
- `GameApp` still owns some temporary debug/presentation responsibilities because that is the fastest path while broader runtime boundaries are still settling.
- Remote character presentation is now out of `GameApp`, but the current weapon/model workflow is still a prototype content pipeline:
  - remote character presentation now uses the `newtest.glb` baseline plus a `defender.glb` defender-team variant, while still retaining the legacy `tester3.glb` fallback
  - remote rifle now uses `newak.glb`
  - the character/weapon export path currently depends on a hand-authored `weapon_socket_r` helper on the character and `grip_socket` / `muzzle_socket` / `left_hand_grip` helpers on the rifle
  - the main animation-quality blocker is now the long-strip export/subclip path rather than the source run motion itself
  - first clean proof for locomotion came from a standalone FBX clip exported from the original 3ds Max source file
  - current practical remote-aim compromise is lighter:
    - keep stable full-body locomotion as the base
    - keep weapon/socket pitch visible
    - use only a narrow neck/head procedural aim-readability pass
    - avoid broad runtime upper/lower-body clip layering for locomotion states
- The top active multiplayer movement blocker after the latest pass is wall/slope contact jitter under authority/correction.
- Narrow ledge support on `Dust2 Test` is also still imperfect:
  - shared grounding currently uses multi-sample floor support rather than binary floor contact
  - thin ledges can therefore report partial support ratios even when the Blender geometry is solid
  - a small stationary-ledge mitigation was added on 2026-04-17, but it can pull players toward ledge center on landing
  - this should be treated as a temporary compromise, not a final ledge solution
- Shared movement feel is still intentionally simple on the planar-velocity side:
  - current starts, stops, and direction changes still use a target-velocity lerp in `src/shared/playerMovement.js`
  - the next planned movement pass is explicit acceleration / deceleration / opposition braking
  - goal is cleaner tactical momentum, not slippery inertia systems
- Current movement tuning state as of 2026-04-07:
  - grounded sprint has been removed
  - grounded base speed is now `4.92`
  - crouch speed is now `2.64`
  - knife movement multiplier is now `1.25`, for an effective knife top speed of `6.15`

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
  - narrow ledge support improved, but stationary ledge correction can still feel center-seeking
- `Dust2 Legacy Import` is currently best treated as:
  - traversal testbed
  - collision/scale/lighting/fog validation map
  - early multiplayer weapon-feel test space
- `Dust2 Legacy Import` is not yet a fully production-ready gameplay map:
  - collision is manually authored
  - server-side authoritative movement now uses the imported collision glTF, but broader gameplay authority is still incomplete
  - export workflow is manual
- The current PvP combat slice is intentionally thin:
  - first server-side lag compensation now exists for player-hit validation
  - current rewind uses recent authoritative hitbox history plus shooter RTT estimate, not full clock-synced rollback
  - no head/body hit zones
  - no ammo/reload authority
  - no spectate flow yet
- Round authority and killfeed are now active:
  - waiting, freeze, live, intermission, planted, and round-end flow are authoritative
  - bomb planting/countdown/explosion are authoritative
  - bomb defuse, bomb drop, and bomb pickup are authoritative
  - killfeed UI renders replicated kills with weapon and headshot markers
- Competitive weapon/utility restrictions now also include:
  - real competitive freeze lockout
  - no mid-round respawn
  - intermission lockout for fire, smoke, and bomb actions while still allowing movement
- Runtime nav generation still exists as a fallback and still runs on the main thread when used.
- `RoundManager` and `UtilityManager` are no longer stubs, but they are still early gameplay systems with narrow rule coverage.
- Competitive rules are now much broader than the first objective slice, but economy and buy flow are still missing.
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
  - a newer movement-feel issue observed during direction changes is probably not a target-speed problem:
    - movement traces showed clean `W` / `S` input and `targetSpeed = 4.92`
    - actual horizontal speed repeatedly landed on discrete stale values such as `4.10` and `4.5373`
    - that points more strongly to reconciliation replaying slightly older horizontal velocity than to pure acceleration tuning
    - next likely fix should be in grounded reconciliation / replay policy, not another blind speed-cap change
  - follow-up trace instrumentation on 2026-04-08 narrowed the current accepted baseline further:
    - the stop/reversal nudge no longer reproduced in the latest clean traces
    - reconciliation action stayed at `ignore`
    - the remaining ordinary disagreement was usually about `0.082` meters in XZ
    - that offset projected almost entirely along movement direction
    - `0.082` is effectively one `60 Hz` simulation step at `4.92 m/s`
    - current read is that the residual drift is an accepted one-tick authority gap rather than an active visible correction bug
  - later RTT ping diagnostics on the deployed Railway build showed a sane sample:
    - `ping_rtt_ms=16`
    - `ping_server_turn_ms=0`
    - `ping_net_est_ms=16`
    - `snapshot_age_ms=15`
    - `auth_per_sec=61`
  - current read is that the deployed path is not showing suspicious server turnaround under normal conditions

## Local Multiplayer Feel Baseline

- Keep the current additive multiplayer foundation:
  - Colyseus room
  - input-authoritative protocol
  - replay/reconciliation
  - remote interpolation
  - shared movement logic
- Current remote smoothing / hitreg baseline:
  - remote interpolation delay is now `67 ms`, down from `100 ms`
  - the server now keeps a short rolling history of authoritative hitboxes
  - PvP hit validation rewinds against that history using interpolation delay plus estimated one-way network latency
  - this rewind is hit-validation-only and does not rewind victim movement
- Active design target remains:
  - local camera should feel immediate like single-player
  - predicted gameplay state should remain deterministic/replayable
  - authoritative correction should be exceptional, not routine
- Current working baseline:
  - deadzone/hysteresis correction
  - debug controls still available during development
  - app-layer `NetworkClient` lifetime
  - live `F8` debug panel now includes server URL plus RTT/turnaround ping diagnostics
  - temporary local movement-trace capture via `F10`
    - capture is stored in browser `localStorage` under `tactical-fps-threejs-movement-trace`
    - the same payload is also written through the server to `debug/movement-traces/`
    - current trace payload includes correction action, replay counts, current/authoritative/replay positions, horizontal-vs-vertical correction split, directional correction projection, and cadence-normalized drift fields
    - browser export helper remains:
      - `copy(localStorage.getItem('tactical-fps-threejs-movement-trace'))`
- Latest grounded movement takeaway:
  - the remaining counter-strafe / wall-oscillation feel was not a large correction-path failure
  - traces still showed `reconciliationAction: ignore` with no buffered correction active
  - the bad feel came from grounded presentation extrapolating desired/input velocity instead of actual simulated velocity
  - grounded presentation now follows actual simulated velocity
  - that change also fixed the funny oscillation when pressing into walls

## Current Gameplay Checkpoint

- Recoil:
  - rifle now uses both visual recoil and actual gameplay spray recoil
  - pistol recoil/spread is also tunable through the same recoil panel
  - the active rifle and pistol defaults in `src/shared/weaponData.js` now reflect live-tuned values exported from the debug recoil panel
- Debug surfaces:
  - backquote `` ` `` opens a general debug menu
  - the menu is now grouped into:
    - `Live Debugging`
    - `Gameplay Debugging`
  - current live round-control tooling includes:
    - force side swap
    - room-wide infinite ammo toggle
    - collision wireframe toggle
    - crouch-fatigue debug toggle for the movement HUD line
  - the menu can also open:
    - recoil tuning
    - movement tuning
    - viewmodel tuning
    - remote body tuning
    - remote weapon tuning
    - HUD layout tuning with draggable panels, live outlines, and killfeed preview toggles for weapon/headshot state
- HUD / local settings:
  - the top-center round HUD now shows defender/attacker player icons plus a center-anchored round score
  - dead players in that strip now render greyscaled/faded
  - the top timer is now the primary round timer surface and swaps to a red C4 icon while the bomb is planted
  - the planted bomb now also has a synced HUD pulse plus a replicated world beep from the planted position
  - dead players now get a delayed teammate-spectate HUD banner with left/right cycling prompts while spectating
  - side swap and overtime now force the scoreboard open and show a timed transition banner
  - match win now force-opens the scoreboard and shows a timed restart banner
  - the top-right killfeed now uses SVG rifle/pistol icons and variant-specific tuning for:
    - rifle body
    - rifle headshot
    - pistol body
    - pistol headshot
  - directional 4-way damage indicators now render around the crosshair
  - the sniper scope overlay now blurs/fades based on current sniper inaccuracy, including movement and post-scope settle
  - pause-menu volume, sensitivity, and horizontal FOV now persist locally in browser storage
  - the escape menu now also allows direct attacker/defender team switching
- Movement tuning:
  - a dedicated movement panel now controls footstep cadence, trim, pitch, bob attack/damp, bob axes, and movement pull-back
  - local settings persist in browser storage until reset
- Footsteps:
  - current local step audio is registered from `/audio/players/footsteps/`
  - weapon audio is registered from `/audio/guns/`
  - rifle and knife now also use dedicated equip sounds from `/audio/guns/`
  - current local step pool is the concrete set with random non-repeat selection
  - footsteps are currently silent while shift-walking, crouched, or moving below the audible-speed threshold
  - landing now emits one synthetic footstep on real air-to-ground transitions so bunnyhops are still audible
- Remote audio:
  - weapon fire, smoke bloom, audible footsteps, defuse start, and short-range sniper scope-in now replicate from authoritative state as `audio-event` messages
  - remote playback now uses Web Audio spatial panning with listener transforms updated from the live first-person view
  - a manual attenuation/cutoff layer still sits on top of the spatial panner so sounds do not leak faintly cross-map
  - footsteps currently keep `HRTF` plus manual attenuation/cutoff as the live baseline
  - the debug menu now includes a remote-audio tuning panel for live footstep range/curve iteration
- Chat:
  - `Enter` opens the bottom-left chat input
  - `Tab` swaps `[ALL]` / `[TEAM]` while typing
  - the server routes `team` chat only to teammates and `all` chat to the whole room
  - passive chat shows up to `6` lines, open chat shows up to `10`, lines stay solid for `10s` then fade, and opening chat forces stored recent history visible at full opacity
  - all-chat feed lines render as `Name: message`, while team chat keeps `[TEAM] Name: message`
- Walking:
  - `Shift` grounded walk is back
  - most weapons use `50%` walk speed
  - knife uses `60%`
  - walk intent and `walkSpeedFactor` are now serialized through the real network input path, so client prediction, replay, and server authority all use the same rule
- Shared movement feel:
  - grounded movement now uses a softer ramp-in, explicit deceleration, and stronger reversal braking
  - the local presentation layer no longer gets to lead grounded motion with desired velocity
  - airborne movement now preserves takeoff speed until landing, so weapon swaps or walk changes midair do not change horizontal velocity
  - crouch now uses a small anti-spam fatigue system in shared simulation:
    - the first `2` quick crouch toggles are free
    - the `3rd` and later quick toggles slow crouch/uncrouch transition speed
    - holding crouch does not build fatigue
    - stopping crouch toggles for `1.0s` fully clears the fatigue window

## Near-Term Direction

- Current refactor checkpoint:
  - shared remote timeline math now lives in `src/shared/remoteTimeline.js`
  - `NetworkClient` now guards active-room ownership with room tokens to prevent stale reconnect/join churn
  - server combat extraction is underway in narrow slices:
    - `server/src/combat/lagCompensation.js`
    - `server/src/combat/shotValidation.js`
    - `server/src/combat/fireResolution.js`
  - `server/src/rooms/TacticalRoom.js` still owns authoritative side effects and broadcast sequencing
  - remote presenter extraction has continued in narrow client-side slices:
    - `src/game/networking/remoteHitboxDebug.js`
    - `src/game/networking/remoteHitboxAudit.js`
    - `src/game/networking/remoteAnimationPolicy.js`
    - `src/game/networking/remoteAnimationPlayback.js`
    - `src/game/networking/remoteAnimationEffects.js`
    - `src/game/networking/remoteAnimationDeath.js`
    - `src/game/networking/remoteAnimationPresentation.js`
  - `NetworkClient` extraction has also continued in low-risk state-shape slices:
    - `src/game/networking/networkRemoteState.js`
    - `src/game/networking/networkClientState.js`
  - immediate review after each slice has already caught real issues, including:
    - stale room callback reconnect churn
    - a lag-comp RTT argument regression
    - fallback hitbox aliasing in the coarse path
    - a stale remote death-clip call after the policy extraction
- Keep building on the imported-map pipeline instead of reverting to graybox-only assumptions.
- Formalize gameplay metadata export for imported maps later, likely from Blender or a similar DCC path.
- Keep baked navmesh as the preferred runtime model.
- Treat the old wall-contact oscillation issue as resolved at the presentation layer for the current baseline. Any future wall/jitter issue should now be investigated as collision/contact behavior rather than immediately blamed on reconciliation feel.
- Continue the new remote aiming/presentation direction:
  - keep pitch replicated through the authoritative multiplayer path
  - keep the current stable full-body locomotion path as the active remote baseline
  - keep weapon pitch as the main always-on vertical-aim readability cue
  - keep the current neck/head-only procedural aim-readability pass as a small additive polish layer where it behaves well
  - treat broad upper/lower-body locomotion layering as paused until a more formal animation-state-machine approach exists
  - treat remote left-hand IK as still experimental
- Next movement-feel pass:
  - keep the new shared accel/decel/reversal baseline
  - continue tuning starts/stops/direction changes now that grounded presentation is tied to actual simulated motion
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
  - round-state / respawn-rule authority
  - better remote player presentation, staged as:
      - maintain placeholder fallback
      - continue iterating on the `newtest.glb` baseline while retaining the defender-team `defender.glb` path and the legacy fallback
      - replace long-strip runtime subclips with standalone exported locomotion clips from Max
      - build on the new authored rifle helpers and the new rifle upper-body base clip
      - continue socket-relative rifle pose tuning and per-weapon hand offsets / pose adjustments
- Movement implementation notes for the next pass now live in `docs/movement-acceleration-plan.md`
- Ledge-support investigation notes now also live in `docs/session-notes/session-note-2026-04-17-dust2-ledge-support.md`
- Refactor/session checkpoints for the latest networking/combat work now also live in:
  - `docs/session-notes/session-note-2026-04-18-networking-refactor-guardrails.md`
  - `docs/session-notes/session-note-2026-04-18-server-combat-refactor.md`
  - `docs/session-notes/session-note-2026-04-18-remote-animation-refactor.md`
  - `docs/session-notes/session-note-2026-04-18-remote-networking-refactor-checkpoint.md`

## Current Remote Aim / Animation Checkpoint

- Pitch is now replicated through the multiplayer path:
  - `src/shared/netcodeProtocol.js`
  - `src/game/networking/NetworkClient.js`
  - `server/src/rooms/TacticalRoom.js`
  - `src/game/player/controllers/FirstPersonController.js`
  - `src/app/GameApp.js`
- The first remote vertical-aim pass is no longer just "procedural offsets on top of full-body locomotion."
- Current layered remote rifle stack is:
  - stable full-body locomotion from authored clips
  - weapon/socket pitch for remote vertical-aim readability
  - a narrow neck/head-only procedural aim-readability pass
- Current current-state notes:
  - the broader upper/lower-body layering experiment was rolled back because it produced unstable locomotion transitions and incompatible state combinations
  - standing fire now uses the full-body `newtest_fire.fbx` clip again instead of the old broken experimental overlay path
  - rifle and pistol now use authored walk / walk-back clips before the authored run set when replicated speed falls into the slow-walk range
  - knife now uses a dedicated authored melee locomotion set for idle, forward walk, back walk, run, strafe, crouch, and jump
  - remote locomotion now also has a narrow idle-entry dwell on both:
    - the visible client presenter
    - the authoritative server hitbox rig
  - this keeps fast strafe-direction reversals from flashing briefly through idle on either the mesh or latest hitbox debug
  - `F3` now also exposes remote animation clip/layer state for transition debugging
  - `RemotePlayerPresenter` now delegates:
    - fire/hit orchestration
    - death playback/reset
    - aim/weapon/character-root presentation
  - current remote body aiming is intentionally modest:
    - neck/head-only procedural pitch remains active
    - crouch body aiming is disabled
    - weapon pitch remains the main universal cue
  - the remote left-hand IK path still exists only as an experimental runtime CCD setup and should not be treated as a finished system
- Likely next steps if we continue this branch:
  - tune the current neck/head aim-readability defaults after more playtesting
  - decide whether a tiny authored standing-only aim-pose set is worth trying later
  - revisit reliable remote left-hand IK only if the broader remote presentation pass becomes important enough to justify it
