# Tactical FPS Prototype

`Tactical FPS Prototype` is a browser-based tactical shooter built with `Three.js`, `Vite`, and `Colyseus`.

The project is aiming for a Counter-Strike-like feel:

- grounded, readable first-person movement
- low time-to-kill hitscan combat
- authored maps instead of only graybox spaces
- server-authoritative multiplayer
- visible remote players backed by authoritative hit validation
- round-based attacker/defender play with a first bomb-objective slice

This repo should be read as a playable game-tech prototype, not just a rendering demo.

## Current State

The current build is a real multiplayer-capable tactical FPS foundation with:

- shared client/server movement simulation
- local prediction plus server reconciliation
- grounded accel/decel/reversal tuning in shared movement
- imported maps with separate visual and collision assets
- baked navmesh support
- first-person weapons and damage feedback
- shared transient effects for weapon impacts, smoke, and bomb explosion presentation
- remote third-person player presentation
- server-authoritative PvP hit validation
- server-authoritative segmented remote hit volumes
- server-authoritative round state and first bomb-objective flow
- first authoritative remote-audio slice for weapon fire and audible footsteps
- live in-browser debug tooling for movement, networking, recoil, footsteps/bob, hitboxes, and weapon/model tuning

It already supports real play loops:

- choose a team and player name
- spawn into a map
- move, walk, crouch, jump, and fight
- switch weapons
- equip and throw a smoke grenade
- carry and plant the bomb
- kill and respawn
- play through freeze, live, planted, and round-end states
- inspect network/movement state live
- validate remote pose/hitbox parity with debug overlays

## Feature Snapshot

### Core Gameplay

- Tactical first-person movement with walk, crouch, jump, and fly/debug mode
- Shared movement rules between client and server
- Grounded movement now uses a softer ramp-in, explicit deceleration, and stronger reversal braking
- Weapon-dependent movement speed and weapon-dependent walk speed factor
- Utility slot with a simple smoke grenade equip/throw baseline
- Smoke grenade now uses local projectile physics with bounce, settle-based bloom timing, and a heavier CS-style smoke cloud
- Hitscan rifle, pistol, sniper, knife, and bomb slot
- ADS / scoped state
- Rifle visual recoil plus actual gameplay spray recoil
- Pistol semi-auto input buffering and tunable spread/recoil
- World geometry shot blocking
- Replicated damage, death, and respawn
- Attacker/defender teams with first round-state flow
- Bomb equip, carry, plant, countdown, and explosion baseline
- First-pass bomb explosion visual at the planted position

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
- Server-authoritative remote audio events for weapon fire and audible footsteps
- Spatial remote audio playback with listener updates and gameplay attenuation/cutoff

### Remote Character / Hitbox Tech

- Active remote skinned-character baseline uses `public/models/players/newtest.glb`
- Defender-team remote visuals now use `public/models/players/defender.glb`
- Legacy fallback path still available if the requested model path fails
- Full-body locomotion clips with imported FBX overrides
- Remote weapon attachment through authored sockets/helpers
- Remote pitch readability through weapon/socket pitch plus narrow neck/head aiming
- Server-authoritative segmented hit volumes for head, torso, pelvis, arms, hands, and legs
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
- Hold-`Tab` scoreboard with team panels, player names, kills, deaths, and ping
- Team-select overlay with player-name entry
- Scope overlay and ADS reticle handling
- Bomb-planted state and planted-bomb timer feedback
- Plant progress feedback
- Utility HUD feedback for smoke availability and throw prompt
- Pause menu for map, skybox, sensitivity, volume, and FOV
- Damage vignette, hit damage numbers, dead overlay, and respawn countdown
- Live `NETDEBUG` panel with clipboard copy support

### Audio / Effects

- Shared `EffectsManager` path for weapon tracers/impacts, smoke clouds, and bomb explosion presentation
- Bomb planted and bomb defused announcement stingers
- Local footstep pool with movement-tuned duration trimming
- Replicated remote weapon and footstep sounds driven from authoritative state
- Web Audio spatial playback now prefers `PannerNode` with `HRTF` when available
- Manual hearing-range attenuation/cutoff still applies on top of the spatial path for gameplay consistency

### Tooling / Live Tuning

- Backquote `` ` `` debug menu for grouped tuning/debug surfaces
- `F3` authoritative remote hit-volume debug
- `F4` first-person weapon/viewmodel tuning
- `F6` remote body / aim / local hitbox tuning
- `F7` remote weapon/socket tuning
- `F8` network debug toggle with copy-to-clipboard
- `F9` ignore-local-corrections toggle
- `F10` movement trace capture to `debug/movement-traces/`
- Recoil tuning panel with live sliders and weapon JSON export
- Movement tuning panel for footsteps, bob, and movement pull-back
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
- remote players render with weapon and posture state
- server validates hits and replicates combat state
- respawn loop is active
- freeze, live, planted, and round-end baseline is active
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

### Multiplayer

The active multiplayer baseline includes:

- authoritative room simulation in [`TacticalRoom.js`](server/src/rooms/TacticalRoom.js)
- shared protocol helpers in [`netcodeProtocol.js`](src/shared/netcodeProtocol.js)
- per-step input snapshots from the browser
- authoritative movement/state on the server
- fire requests validated on the server
- replicated damage, death, and respawn
- replicated round, team, and objective state
- replicated authoritative audio events for weapon fire and audible footsteps
- RTT ping probes for scoreboard/network diagnostics

### Remote Presentation

[`RemotePlayerPresenter.js`](src/game/networking/RemotePlayerPresenter.js) handles the visible remote playermodel path.

It is responsible for:

- loading the remote character asset
- selecting locomotion clips
- applying remote pitch readability
- attaching the remote weapon
- handling remote fire/hit/death presentation
- drawing authoritative/local hitbox debug views

Remote locomotion playback now scales from actual replicated movement speed, and the authoritative server hitbox rig mirrors that same locomotion-speed scaling so visible mesh and hit validation stay aligned.

### Authoritative Remote Hitboxes

The server-authoritative segmented hitbox pipeline is built around:

- [`remoteCharacterConfig.js`](src/shared/remoteCharacterConfig.js)
- [`remoteHitboxes.js`](src/shared/remoteHitboxes.js)
- [`remoteSkeleton.js`](src/shared/remoteSkeleton.js)
- [`remoteHitboxRig.js`](server/src/remoteHitboxRig.js)

The active foundation is no longer locked to one rig naming style. Shared skeleton resolution now supports both the current Bip-style names and common Mixamo-style names at the mapping layer, which makes future model swaps much less invasive.

## Current Character / Rig Baseline

The active remote model/animation path is the former experimental branch, now effectively the default baseline for the main remote rig:

- active attacker/default character: `public/models/players/newtest.glb`
- active defender visual character: `public/models/players/defender.glb`
- active rifle asset: `public/models/weapons/newak.glb`
- active locomotion proof clip: `public/models/players/newtest_run.fbx`

Important current notes:

- scoped remote weapon transform offsets currently reuse hip socket-pose values
- visible locomotion scales from actual movement speed
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
- Smoke and bomb explosion effects are currently local presentation only and are not yet replicated as shared world FX.
- The recoil and movement tuning panels are still active debug tooling rather than polished player-facing settings.

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
