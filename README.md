# Tactical FPS Prototype

`Tactical FPS Prototype` is a browser-based tactical shooter built with `Three.js`, `Vite`, and `Colyseus`. The project is aiming for grounded Counter-Strike-like handling rather than arcade movement: fast first-person response, low time-to-kill hitscan combat, readable spaces, and multiplayer that is increasingly authoritative instead of purely cosmetic.

This repository is not a tech demo in the narrow sense. It is a playable game foundation with active work across movement, weapons, imported maps, navigation, remote player presentation, and multiplayer combat authority.

## What The Project Is Trying To Be

The current design direction is:

- grounded first-person movement with walk, sprint, crouch, jump, and tactical pacing
- hitscan weapons with readable feedback and clear lane control
- imported map support instead of only hardcoded graybox scenes
- server-authoritative multiplayer for movement, combat, damage, death, and respawn
- a game structure that can keep evolving in-place instead of being thrown away after prototyping

## Current Playable Feature Set

### Weapons

- `Rifle`
  - automatic fire
  - ADS
  - imported animated first-person prototype viewmodel
- `Sniper`
  - scoped overlay
  - high-damage hitscan
  - hipfire spread
  - procedural first-person fallback viewmodel
- `Knife`
  - faster movement slot
  - melee thrust
  - imported animated first-person prototype viewmodel

### Movement And Combat

- shared client/server movement simulation
- local prediction with replay/reconciliation
- server-authoritative fire requests and hit validation
- replicated health, death, and respawn
- world geometry shot blocking
- movement-speed differences by weapon slot

### Maps And World Systems

- runtime map switching
- imported glTF visual scenes
- separate glTF collision scenes
- baked navmesh support
- runtime skybox switching
- collision debug and traversal debugging workflows

### Multiplayer Presentation

- remote player labels and alive/dead state
- remote character presentation with placeholder fallback
- remote weapon attachment and locomotion playback
- replicated remote posture, pitch, weapon, and presentation state
- current remote aim readability using weapon pitch plus a modest neck/head pass

### UI And Debugging

- pause menu with map, skybox, sensitivity, volume, and horizontal FOV controls
- HUD reticles, scope overlay, FPS, and combat state
- map loading overlay
- multiplayer debug controls and correction inspection
- live first-person viewmodel tuning panel
- live remote model / weapon tuning panels

## Architecture Overview

### Client

The browser client is organized around a few strong ownership boundaries:

- [`GameApp.js`](/C:/Users/nicko/tactical-fps-threejs/src/app/GameApp.js)
  - app composition root
  - owns renderer, scene, camera, HUD, pause flow, map lifecycle, skybox state, and top-level networking
- [`MapRuntime.js`](/C:/Users/nicko/tactical-fps-threejs/src/game/maps/MapRuntime.js)
  - creates and owns map-bound systems
  - collision, navigation, player controller, weapons, rounds, utility, and targets
- [`FirstPersonController.js`](/C:/Users/nicko/tactical-fps-threejs/src/game/player/controllers/FirstPersonController.js)
  - local movement, look, prediction, movement state, and first-person presentation state
- [`WeaponManager.js`](/C:/Users/nicko/tactical-fps-threejs/src/game/weapons/WeaponManager.js)
  - weapon slot state, scope/fire input handling, viewmodel updates, and shot orchestration
- [`RemotePlayerPresenter.js`](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)
  - remote characters, remote animation choice, remote weapon placement, and remote combat presentation
- [`Hud.js`](/C:/Users/nicko/tactical-fps-threejs/src/game/ui/Hud.js)
  - DOM HUD shell, pause menu integration, scope/reticle states, and dev-facing overlays

### Shared Simulation

Shared logic is intentionally kept in `src/shared/` so the browser and server stay aligned:

- [`playerMovement.js`](/C:/Users/nicko/tactical-fps-threejs/src/shared/playerMovement.js)
  - locomotion math and shared movement rules
- [`netcodeProtocol.js`](/C:/Users/nicko/tactical-fps-threejs/src/shared/netcodeProtocol.js)
  - multiplayer message/state protocol helpers
- [`mapManifest.js`](/C:/Users/nicko/tactical-fps-threejs/src/shared/maps/mapManifest.js)
  - map registry, metadata, imported-asset paths, navmesh metadata, and gameplay defaults

### Server

The multiplayer backend is a Colyseus room hosted from the same repository:

- [`server/src/index.js`](/C:/Users/nicko/tactical-fps-threejs/server/src/index.js)
  - boots the Colyseus server
  - serves the built frontend in deployed mode
- [`TacticalRoom.js`](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js)
  - authoritative room simulation
  - player state, inputs, movement, fire requests, hit validation, damage, death, and respawn

## Core Systems

### Movement

Movement is designed around deterministic shared simulation instead of a purely client-only controller. The browser predicts immediately for responsiveness, while the server remains authoritative. Reconciliation uses replay instead of hard replacement, which keeps local control snappy while still allowing correction.

The current feel target is tactical responsiveness, not heavy inertia. Walk, sprint, crouch, jump, and fly/debug modes all live in the same broader controller stack.

### Weapons

The weapon system is split between manager, config, presentation, firing, and effects modules so weapon behavior is not trapped in a single monolith. Rifle and knife currently use a borrowed animated first-person prototype pack, while sniper still uses the older procedural fallback. Viewmodels render on a separate layer to avoid self-hits during shot tests.

There is also an `F4` live tuning panel for first-person weapon placement and muzzle alignment. It supports hip/ADS transforms, per-pose muzzle offsets, forced ADS preview, and a muzzle preview toggle, with values stored in `localStorage` during iteration.

### Maps, Collision, And Navigation

The project supports both runtime-built graybox maps and imported maps. Imported maps use:

- one visual `.glb`
- one collision `.glb`
- one baked navmesh binary
- one manifest entry tying those assets to gameplay defaults

Collision is handled through static mesh queries backed by `three-mesh-bvh`. Navigation prefers baked navmesh data through `recast-navigation`, with runtime generation left as a fallback/dev path rather than the default.

### Multiplayer

Multiplayer is no longer treated as a thin add-on. The active baseline includes:

- Colyseus room-based authority
- local prediction
- replay/reconciliation
- authoritative player hits
- replicated health/death/respawn
- remote character presentation instead of only capsules/placeholders

The active correctness pressure point is no longer basic hit replication. It is controller/contact quality under authority and correction, especially around wall and slope contact.

### Remote Character Presentation

Remote third-person presentation is an active workstream. The current baseline favors stable full-body locomotion and modest readability cues over more ambitious layered animation experiments. Pitch replication is wired through the multiplayer path, and remote aiming currently reads through weapon pitch plus a narrower neck/head pass where it behaves safely.

The repo also contains work-in-progress character/weapon asset experiments, authored sockets, standalone locomotion clips, and debug panels for in-browser tuning.

## Maps In The Project

Current playable/test maps:

- `Training Ground`
- `Desert Compound`
- `Dust2 Import Test`

`Dust2 Import Test` is the clearest example of the imported-map workflow. It exists as a real traversal, scale, collision, navmesh, and multiplayer test environment rather than a cosmetic environment import.

## Tech Stack

- `Three.js`
- `Vite`
- `Colyseus`
- `three-mesh-bvh`
- `recast-navigation`

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

The current deployment model is a single service hosting both frontend and backend. The server serves the built Vite client from `dist/` and exposes the Colyseus endpoint on the same public host.

Current Railway-style configuration:

```text
Build Command: npm install && npm --prefix server install && npm run build
Start Command: npm --prefix server start
```

## Repository Structure

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

## Where To Read Next

For a deeper walkthrough of the live systems, the maintained docs are:

- [`docs/MASTER_CONTEXT.md`](/C:/Users/nicko/tactical-fps-threejs/docs/MASTER_CONTEXT.md)
- [`docs/systems/app.md`](/C:/Users/nicko/tactical-fps-threejs/docs/systems/app.md)
- [`docs/systems/networking.md`](/C:/Users/nicko/tactical-fps-threejs/docs/systems/networking.md)
- [`docs/systems/weapons.md`](/C:/Users/nicko/tactical-fps-threejs/docs/systems/weapons.md)
- [`docs/systems/ui-hud.md`](/C:/Users/nicko/tactical-fps-threejs/docs/systems/ui-hud.md)
- [`docs/remote-weapon-asset-contract.md`](/C:/Users/nicko/tactical-fps-threejs/docs/remote-weapon-asset-contract.md)
