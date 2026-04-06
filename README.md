# Tactical FPS Prototype

`Tactical FPS Prototype` is a browser-based tactical shooter built with `Three.js`, `Vite`, and `Colyseus`.

The project is aiming for a Counter-Strike-like feel:

- grounded first-person movement
- low time-to-kill hitscan combat
- readable lanes and long sightlines
- authored map spaces instead of only procedural grayboxes
- server-authoritative multiplayer instead of cosmetic peer-state sync

This repo should be read as a playable game-tech showcase, not just a rendering demo.

## What The Game Is

The current prototype is a multiplayer-capable tactical FPS foundation with:

- first-person weapons and combat
- imported maps with separate visual and collision assets
- baked navmesh support
- local prediction plus server authority
- remote third-person player presentation
- authoritative PvP hit validation
- segmented server-authoritative remote hit volumes

It already supports real play loops:

- spawn into a map
- move, sprint, crouch, jump, and fight
- switch weapons
- shoot through a server-authoritative PvP path
- die and respawn
- inspect and tune systems live with in-browser debug tooling

## Showroom

### Core Gameplay

- Tactical first-person movement with walk, sprint, crouch, jump, and fly/debug mode
- Hitscan rifle, pistol, sniper, and knife slots
- ADS / scoped state
- Weapon-dependent movement speed
- World-geometry shot blocking
- Replicated damage, death, and respawn

### Multiplayer

- Colyseus authoritative room simulation
- Client-side prediction
- Replay-based reconciliation
- Remote player interpolation
- Server-authoritative fire requests and hit validation
- Replicated health, alive state, respawn timing, pitch, stance, weapon, and presentation state

### Remote Character Tech

- Third-person remote playermodels driven from authoritative state
- Full-body locomotion clips with imported FBX overrides
- Remote weapon sockets and authored rifle helpers
- Remote pitch readability through weapon plus narrow neck/head aiming
- Server-authoritative segmented hit volumes for head, torso, pelvis, arms, hands, and legs
- `F3` hit volume debug and `F6` local hitbox debug workflow

### World / Map Tech

- Runtime map switching
- Imported visual `.glb` map scenes
- Separate imported collision `.glb` scenes
- Baked navmesh binaries
- Shared manifest-driven map metadata
- HDR skybox switching
- Collision debug overlays and traversal debugging tools

### UI / Feedback

- HUD with round state, FPS, weapon, utility, movement state, pointer lock state, and position
- Scope overlay and reticle handling
- Pause menu for map/skybox/sensitivity/volume/FOV
- Damage feedback, damage numbers, death overlay, respawn countdown
- Multiplayer debug instrumentation in the active HUD workflow

### Tooling / Live Tuning

- `F4` first-person weapon/viewmodel tuning
- `F6` remote body and hitbox tuning
- `F7` remote weapon/socket tuning
- `F8` network debug toggle
- `F9` ignore-local-corrections toggle
- `F10` debug snapshot dump
- Offline navmesh generation script

## Technology Stack

### Rendering And App Runtime

- `Three.js`
- `Vite`
- ES module JavaScript

### Multiplayer And Authority

- `Colyseus`
- Shared client/server movement and netcode protocol modules

### Collision And Spatial Queries

- `three-mesh-bvh`
- Custom `CollisionWorld` capsule-vs-triangle movement resolution
- Server-side world raycasts for shot blocking

### Navigation

- `recast-navigation`
- Baked navmesh workflow with offline generation

### Assets And Content

- glTF map and character assets
- FBX locomotion/action clip imports
- Authored helper sockets for remote weapon attachment and remote pose tuning

## How The Systems Work

### 1. Game Composition

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

### 2. Movement

Movement is not a purely local controller.

The project uses shared movement logic in [`playerMovement.js`](src/shared/playerMovement.js), so the browser and the server evolve around the same locomotion rules.

The current movement stack:

- local fixed-step prediction for immediate feel
- authoritative server simulation for truth
- replay-based reconciliation rather than direct hard replacement
- deadzone/hysteresis correction policy so tiny disagreement is not constantly visible

Collision comes from [`CollisionWorld.js`](src/core/physics/CollisionWorld.js), which uses `three-mesh-bvh` against authored static collision geometry.

### 3. Weapons

Weapons are split into smaller modules instead of one large weapon script:

- manager/state orchestration
- firing and shot resolution
- first-person presentation
- effects/audio
- weapon config data

The current weapon set:

- `Rifle`
- `Pistol`
- `Sniper`
- `Knife`

Rifle, pistol, and knife use imported animated prototype viewmodels. Sniper still uses a procedural fallback path.

### 4. Maps, Collision, And Navigation

The repo supports both graybox-style runtime maps and imported authored maps.

Imported maps are built around a clean asset contract:

- one visual `.glb`
- one collision `.glb`
- one baked navmesh binary
- one shared manifest entry

The clearest live example is `Dust2 Import Test`, which is not just a visual import. It is a real testbed for:

- traversal scale
- collision correctness
- navmesh queries
- multiplayer combat space

### 5. Multiplayer

Multiplayer is now a real gameplay system, not just replicated transforms.

The active baseline includes:

- authoritative room simulation in [`TacticalRoom.js`](server/src/rooms/TacticalRoom.js)
- shared protocol helpers in [`netcodeProtocol.js`](src/shared/netcodeProtocol.js)
- input snapshots from the browser
- authoritative movement/state on the server
- fire requests validated on the server
- replicated damage, death, and respawn

### 6. Remote Player Presentation

[`RemotePlayerPresenter.js`](src/game/networking/RemotePlayerPresenter.js) is the remote playermodel presentation layer.

It is doing real runtime work:

- loading the remote character asset
- choosing locomotion clips
- applying remote pitch readability
- attaching the remote weapon to authored sockets
- showing hit volume debug
- handling remote fire/hit/death presentation feedback

### 7. Authoritative Remote Hitboxes

The project now has a working server-authoritative segmented hitbox pipeline.

The important pieces are:

- shared skeleton/hitbox constants in [`remoteCharacterConfig.js`](src/shared/remoteCharacterConfig.js)
- shared hitbox snapshot construction in [`remoteHitboxes.js`](src/shared/remoteHitboxes.js)
- authoritative remote rig evaluation in [`remoteHitboxRig.js`](server/src/remoteHitboxRig.js)

The main lesson from that feature:

- the authoritative rig worked once it was simplified to match the visible remote pose
- left-hand IK was removed from the authoritative hitbox rig because it was the major upper-body parity bug

## What Is Already Implemented

### Playable Systems

- First-person controller
- Four-weapon loadout
- Multiplayer room connection
- Authoritative PvP combat
- Remote third-person player rendering
- Map switching
- Skybox switching
- HUD and pause menu
- AI/navmesh target sandbox
- Imported-map workflow
- Baked navmesh generation

### Remote Character / Animation Systems

- `newtest.glb` remote character path
- Standalone FBX locomotion clip support
- Authored rifle socket/grip/muzzle helpers
- Runtime remote weapon pose tuning
- Runtime remote body/hitbox tuning
- Authoritative segmented remote hit volumes

### Debug And Developer Workflow

- Collision wireframe overlay
- Position and marker logging
- Multiplayer correction inspection
- Freeze-pose remote tuning
- First-person muzzle/viewmodel tuning
- Remote hitbox visual tuning without affecting live hitreg

## Current Content Snapshot

### Maps

- `Training Ground`
- `Desert Compound`
- `Dust2 Import Test`

### Weapons

- `Rifle`
- `Pistol`
- `Sniper`
- `Knife`

### Multiplayer State

- Multiple local tabs can join the same room
- Remote players render with weapons and posture state
- Server validates hits and replicates combat state
- Respawn loop is active

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

If you want the deeper system writeups, start with:

- [MASTER_CONTEXT.md](docs/MASTER_CONTEXT.md)
- [networking.md](docs/systems/networking.md)
- [weapons.md](docs/systems/weapons.md)
- [physics.md](docs/systems/physics.md)
- [player-controller.md](docs/systems/player-controller.md)
- [ui-hud.md](docs/systems/ui-hud.md)
- [remote-hitbox-audit.md](docs/remote-hitbox-audit.md)
