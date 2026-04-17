# Tactical FPS Prototype

`Tactical FPS Prototype` is a browser-based tactical shooter built with `Three.js`, `Vite`, and `Colyseus`.

The project is aiming for a Counter-Strike-like feel:

- grounded, readable first-person movement
- low time-to-kill hitscan combat
- authored maps instead of only graybox spaces
- server-authoritative multiplayer
- visible remote players backed by authoritative hit validation
- round-based attacker/defender play with a first bomb-objective slice

This repo should be read as a playable multiplayer game-tech prototype, not just a rendering demo.

## Current State

The current build is a real multiplayer-capable tactical FPS foundation with:

- shared client/server movement simulation
- local prediction plus server reconciliation
- grounded accel/decel/reversal tuning in shared movement
- imported maps with separate visual and collision assets
- baked navmesh support
- first-person rifle, pistol, knife, sniper, smoke, and bomb gameplay slices
- shared transient effects for weapon impacts, smoke, and bomb explosion presentation
- remote third-person player presentation with authored skinned-character locomotion
- server-authoritative PvP hit validation
- server-authoritative segmented remote hit volumes
- server-authoritative round state and first bomb-objective flow
- first authoritative remote-audio slice for weapon fire, smoke bloom, and audible footsteps
- live in-browser debug tooling for movement, networking, recoil, remote audio, footsteps/bob, hitboxes, and weapon/model tuning

It already supports real play loops:

- choose a team and player name
- choose a gamemode
- spawn into a map
- move, walk, crouch, jump, and fight
- switch weapons
- equip and throw a smoke grenade
- carry, drop, recover, and plant the bomb
- play through freeze, live, planted, intermission, and match-restart states
- inspect network/movement state live
- validate remote pose/hitbox parity with debug overlays

## Feature Snapshot

### Core Gameplay

- Tactical first-person movement with walk, crouch, jump, and fly/debug mode
- Shared movement rules between client and server
- Grounded movement now uses a softer ramp-in, explicit deceleration, and stronger reversal braking
- Weapon-dependent movement speed and weapon-dependent walk speed factor
- Utility slot with a simple smoke grenade equip/throw baseline
- Smoke grenade now uses replicated projectile throws with bounce, settle-based bloom timing, and a heavier CS-style smoke cloud
- Hitscan rifle, pistol, sniper, knife, and bomb slot
- ADS / scoped state
- Rifle visual recoil plus actual gameplay spray recoil
- Pistol semi-auto input buffering and tunable spread/recoil
- Rifle and pistol now lose accuracy while airborne
- Sniper now does `100` damage to body, head, arms, and legs
- Sniper now becomes inaccurate while moving above `1.5 m/s`
- Sniper scope is now an instant 3-stage toggle: unscoped -> first zoom -> second zoom -> unscoped
- Sniper now has a short post-scope accuracy-settle window and scope-overlay blur feedback that reflects both movement and scope-settle inaccuracy
- World geometry shot blocking
- Replicated damage, death, and respawn
- Attacker/defender teams with `Debug` and `Competitive` gamemode scaffolding
- Competitive mode currently scoped to `Dust2 Test`
- Bomb equip, carry, drop, pickup, plant, countdown, defuse, and explosion baseline
- First-pass bomb explosion visual at the planted position
- Top-right killfeed with team-colored names, weapon icons, and headshot marker support

### Multiplayer

- Colyseus authoritative room simulation
- Client-side prediction
- Replay-based reconciliation
- Deadzone/hysteresis correction policy for local feel
- Remote player interpolation
- RTT-based scoreboard ping
- Server-authoritative fire requests and hit validation
- Replicated health, alive state, respawn timing, pitch, stance, weapon, presentation state, team, and display name
- Server-authoritative round/objective snapshots for HUD and gameplay flow
- Competitive MR24, halftime side swap, overtime, and match restart flow
- Server-authoritative remote audio events for weapon fire, smoke bloom, and audible footsteps
- Shared movement now preserves takeoff speed while airborne, so weapon swaps or walk changes midair do not change velocity until landing
- Landing now emits a single footstep on real air-to-ground transitions to close silent bunnyhop movement
- Spatial remote audio playback with listener updates and gameplay attenuation/cutoff

### Remote Character / Hitbox Tech

- Active remote skinned-character baseline uses `public/models/players/newtest.glb`
- Defender-team remote visuals now use `public/models/players/defender.glb`
- Legacy fallback path still available if the requested model path fails
- Full-body locomotion clips with imported FBX overrides
- Rifle and pistol now use authored `walk` / `walk back` clips before transitioning into the faster run clips
- Knife now uses its dedicated authored melee locomotion set for idle, walk, run, strafe, crouch, and jump
- Remote weapon attachment through authored sockets/helpers
- Remote pitch readability through weapon/socket pitch plus narrow neck/head aiming
- Server-authoritative segmented hit volumes for head, torso, pelvis, arms, hands, and legs
- Authoritative head volume now supports tuned width/height/depth instead of only a perfect sphere
- `F3` authoritative hit-volume debug
- `F6` local hitbox/model debug workflow

### World / Content Tech

- Runtime map switching
- Imported visual `.glb` map scenes
- Separate imported collision `.glb` scenes
- Shared manifest-driven map metadata
- Baked navmesh binaries
- HDR skybox switching
- Collision and traversal debugging tools

### UI / Feedback

- HUD with round state, FPS, weapon, utility, movement state, pointer state, and position
- Top-center round HUD with team player icons, live round score, and planted-bomb icon/timer state
- Hold-`Tab` scoreboard with team panels, player names, kills, deaths, and ping
- Team-select overlay with player-name entry
- Scope overlay and ADS reticle handling
- Sniper scope overlay now also blurs/fades to represent current sniper inaccuracy
- Bomb-planted state and planted-bomb timer feedback
- Planted-bomb HUD pulse synced to authoritative bomb beep cadence
- Plant progress feedback
- Utility HUD feedback for smoke availability and throw prompt
- Pause menu for map, skybox, sensitivity, volume, and FOV
- Pause menu gamemode selector
- Forced-scoreboard match/intermission messaging for side swap, overtime, and match restart
- Top-right killfeed with rifle/pistol icon support and headshot marker
- Damage vignette, 4-way directional damage indicators, hit damage numbers, dead overlay, and respawn countdown
- Live `NETDEBUG` panel with clipboard copy support
- Local browser persistence for player name, HUD mode, volume, sensitivity, and horizontal FOV

### Audio / Effects

- Shared `EffectsManager` path for weapon tracers/impacts, smoke clouds, and bomb explosion presentation
- Bomb planted and bomb defused announcement stingers
- Bomb planted now also emits a world-positioned replicated beep that follows the planted countdown cadence
- Local footstep pool with movement-tuned duration trimming
- Replicated remote weapon, smoke bloom, and footstep sounds driven from authoritative state
- Web Audio spatial playback now prefers `PannerNode` with `HRTF` when available
- Manual hearing-range attenuation/cutoff still applies on top of the spatial path for gameplay consistency

### Tooling / Live Tuning

- Backquote `` ` `` debug menu for grouped tuning/debug surfaces
- Debug menu now groups tools into `Live Debugging` and `Gameplay Debugging`
- `F3` authoritative remote hit-volume debug
- `F4` first-person weapon/viewmodel tuning
- `F6` remote body / aim / local hitbox tuning
- `F7` remote weapon/socket tuning
- `F8` network debug toggle with copy-to-clipboard
- Debug menu remote-audio tuning panel for live footstep attenuation/range tuning
- `F9` ignore-local-corrections toggle
- `F10` movement trace capture to `debug/movement-traces/`
- Recoil tuning panel with live sliders and weapon JSON export
- Movement tuning panel for footsteps, bob, and movement pull-back
- HUD layout tuning panel with live element outlines, killfeed preview controls, drag-to-move panels, and localStorage-backed export/reset workflow
- Collision wireframe and marker/position debug tools
- Offline navmesh generation script

## Current Gameplay Snapshot

### Maps

- `Training Ground`
- `Desert Compound`
- `Dust2 Legacy Import`
- `Dust2 Test`

### Weapons

- `Rifle`
- `Pistol`
- `Sniper`
- `Knife`
- `Bomb`

### Multiplayer Baseline

- multiple local tabs can join the same room
- players choose teams and names before the round starts
- players can choose `Debug` or `Competitive` from the pause menu
- remote players render with weapon and posture state
- server validates hits and replicates combat state
- `Debug` keeps the loose respawn/sandbox loop
- `Competitive` on `Dust2 Test` now supports freeze, elimination, bomb rounds, halftime side swap, overtime, and match restart
- competitive intermissions still allow movement but now lock fire, smoke, and bomb actions
- Railway deployment is working as a one-service frontend plus multiplayer backend setup

## Architecture Overview

### Game Composition

[`GameApp.js`](src/app/GameApp.js) is the composition root.

It owns:

- renderer, scene, and camera
- HUD and pause menu
- map lifecycle
- skybox lifecycle
- app-level networking
- remote player presentation
- top-level debug workflow

Map-bound systems are assembled under [`MapRuntime.js`](src/game/maps/MapRuntime.js), which keeps collision, navigation, controller, weapons, rounds, targets, and utility scoped to the active map.

### Movement

Shared locomotion math lives in [`playerMovement.js`](src/shared/playerMovement.js), so the browser and the server evolve around the same movement rules.

Current movement stack:

- local fixed-step prediction for immediate feel
- authoritative server simulation for truth
- replay-based reconciliation
- deadzone/hysteresis correction so tiny disagreement is not constantly visible
- grounded presentation now follows actual simulated velocity instead of desired input velocity, which removed a misleading local lead during reversals and wall contact

Collision comes from [`CollisionWorld.js`](src/core/physics/CollisionWorld.js), which uses `three-mesh-bvh` against authored static collision geometry.

The current live grounded baseline is:

- walk on `Shift`
- crouch on `C`
- no footsteps while shift-walking or crouched
- no bob while ADS, walking, or crouched
- current local footsteps use the concrete pool under `public/audio/players/footsteps/`
- airborne movement now latches the takeoff speed until landing, so swapping weapons or toggling walk midair does not change momentum
- landing emits one synthetic footstep on real air-to-ground transitions so bunnyhops are still audible

### Multiplayer

The active multiplayer baseline includes:

- authoritative room simulation in [`TacticalRoom.js`](server/src/rooms/TacticalRoom.js)
- shared protocol helpers in [`netcodeProtocol.js`](src/shared/netcodeProtocol.js)
- per-step input snapshots from the browser
- authoritative movement/state on the server
- fire requests validated on the server
- replicated damage, death, and respawn
- replicated round, team, and objective state
- replicated gamemode and match-flow state
- replicated authoritative audio events for weapon fire, smoke bloom, and audible footsteps
- replicated smoke throws now rebroadcast as shared combat events so remote clients spawn matching smoke projectiles/clouds
- RTT ping probes for scoreboard/network diagnostics

### Remote Presentation

[`RemotePlayerPresenter.js`](src/game/networking/RemotePlayerPresenter.js) handles the visible remote playermodel path.

It is responsible for:

- loading the remote character asset
- selecting locomotion clips
- switching between default and melee locomotion sets from replicated weapon/speed state
- applying remote pitch readability
- attaching the remote weapon
- handling remote fire/hit/death presentation
- drawing authoritative/local hitbox debug views

Remote locomotion playback now scales from actual replicated movement speed, and the authoritative server hitbox rig mirrors that same weapon-aware locomotion-speed scaling so visible mesh and hit validation stay aligned.

### Authoritative Remote Hitboxes

The server-authoritative segmented hitbox pipeline is built around:

- [`remoteCharacterConfig.js`](src/shared/remoteCharacterConfig.js)
- [`remoteHitboxes.js`](src/shared/remoteHitboxes.js)
- [`remoteSkeleton.js`](src/shared/remoteSkeleton.js)
- [`remoteHitboxRig.js`](server/src/remoteHitboxRig.js)

The active foundation is no longer locked to one rig naming style. Shared skeleton resolution now supports both the current Bip-style names and common Mixamo-style names at the mapping layer, which makes future model swaps much less invasive.

The current baked remote hit-volume defaults now include a shaped head volume plus tuned limb/torso values:

- `headSize = { x: 0.24, y: 0.3, z: 0.255 }`
- `armRadius = 0.08`
- `legRadius = 0.11`
- `torsoLengthPadding = -0.085`

## Current Character / Rig Baseline

The active remote model/animation path is the former experimental branch, now effectively the default baseline for the main remote rig:

- active attacker/default character: `public/models/players/newtest.glb`
- active defender visual character: `public/models/players/defender.glb`
- active rifle asset: `public/models/weapons/newak.glb`
- active authored locomotion set includes:
  - `public/models/players/animations/newtest_walk.fbx`
  - `public/models/players/animations/newtest_walk_back.fbx`
  - `public/models/players/animations/newtest_run.fbx`
  - `public/models/players/animations/newtest_run_back.fbx`
  - `public/models/players/animations/newtest_strafe_left.fbx`
  - `public/models/players/animations/newtest_strafe_right.fbx`
  - `public/models/players/animations/newtest_melee_*.fbx`

Important current notes:

- scoped remote weapon transform offsets currently reuse hip socket-pose values
- visible locomotion scales from actual movement speed
- visible locomotion now also switches between authored walk/run states for rifle and pistol, and a dedicated melee set for knife
- authoritative hitbox locomotion uses the same speed scaling
- jump playback on the authoritative rig is explicitly excluded from movement-speed scaling to keep `F3` aligned
- left-hand IK is still not part of the authoritative hitbox rig

## Local Development

Install dependencies:

```bash
npm install
npm --prefix server install
```

Run the client:

```bash
npm run dev
```

Run the multiplayer server:

```bash
npm run server:start
```

Useful scripts:

```bash
npm run build
npm run preview
npm run build:navmesh
npm run server:dev
```

Local multiplayer defaults to:

```text
ws://localhost:2567
```

## Deployment

The current deployment model is one service serving both:

- the built frontend
- the Colyseus multiplayer backend

Current deployment shape:

```text
Build Command: npm install && npm --prefix server install && npm run build
Start Command: npm --prefix server start
```

Recent RTT-based ping readings against Railway EU West (Amsterdam) have tested in a believable `15-20 ms` range from Copenhagen.

## Current Notes / Limitations

- Older imported-map Dust2 grounding/support investigation notes are kept under `docs/session-notes/` for reference, but should not be treated as the current top-level blocker without fresh repro.
- Remote-audio directionality is now in place, but footstep hearing range and loudness still need more multiplayer tuning.
- Footsteps do not yet switch by detected surface type.
- Audio does not yet have separate buses for weapons, footsteps, ambience, or UI.
- Smoke is currently a visual gameplay marker only and does not yet block line of sight or traces.
- Smoke visuals and smoke bloom audio now replicate through multiplayer, but bomb explosion presentation is still local-only.
- The recoil and movement tuning panels are still active debug tooling rather than polished player-facing settings.
- Competitive does not yet have economy, buy time, or spectate flow.

## Repo Structure

```text
src/
  app/
  core/
  game/
  shared/
  styles/
server/
  src/
public/
docs/
scripts/
```

## Docs

Start with:

- [MASTER_CONTEXT.md](docs/MASTER_CONTEXT.md)
- [session-notes/](docs/session-notes)
- [networking.md](docs/systems/networking.md)
- [player-controller.md](docs/systems/player-controller.md)
- [ui-hud.md](docs/systems/ui-hud.md)
- [weapons.md](docs/systems/weapons.md)
- [physics.md](docs/systems/physics.md)
- [remote-hitbox-audit.md](docs/remote-hitbox-audit.md)
- [remote-character-asset-contract.md](docs/remote-character-asset-contract.md)
