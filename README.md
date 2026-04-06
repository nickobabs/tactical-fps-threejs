# Tactical FPS Prototype

Three.js tactical FPS prototype focused on readable lanes, fast first-person handling, low time-to-kill hitscan combat, imported map support, and additive server-authoritative multiplayer.

## Highlights

- Counter-Strike-inspired grounded movement with walk, sprint, crouch, jump, and shared client/server locomotion logic
- First-person rifle, sniper, and knife with procedural viewmodel presentation
- Server-authoritative multiplayer hits, damage, death, and respawn over Colyseus
- Remote third-person players with skinned characters, weapon attachment, locomotion clips, and active aiming/pose iteration
- Imported map workflow with separate visual and collision glTF assets plus baked navmesh support
- Runtime map switching, skybox switching, pause menu, HUD, debug overlays, and multiplayer diagnostics

## Current Game Features

### Maps

- `Training Ground`
- `Desert Compound`
- `Dust2 Import Test`

### Weapons

- `Rifle`
  - automatic fire
  - ADS
  - remote third-person weapon model path
- `Sniper`
  - scoped overlay
  - high-damage hitscan
  - hipfire spread
- `Knife`
  - faster movement slot
  - melee thrust attack

### Movement And Combat

- Shared movement simulation on client and server
- Local prediction with replay/reconciliation
- Deadzone/hysteresis correction for better local multiplayer feel
- Server-authoritative PvP hit validation
- Replicated health, death, and respawn
- World geometry shot blocking

### Multiplayer Presentation

- Remote player labels and alive/dead state
- Remote crouch, jump, and locomotion presentation
- Experimental skinned remote character pipeline using `newtest.glb`
- External standalone locomotion clips loaded from `public/models/players/animations/`
- Authored remote rifle sockets on `newak.glb`:
  - `grip_socket`
  - `muzzle_socket`
  - `left_hand_grip`

### Tools And Workflow

- Map loading overlay and staged map initialization
- Collision debug overlay
- Fly mode and position markers for imported-map inspection
- `F6` remote model tuning panel
- `F7` remote weapon tuning panel with freeze-pose debug support
- `F8`/`F9`/`F10` multiplayer debug workflow

## Project Direction

This prototype is being treated as the live game foundation rather than a throwaway experiment. The current direction is:

- keep the Counter-Strike-like tactical feel
- keep imported maps and baked navmesh as the main content path
- keep multiplayer additive but increasingly authoritative
- improve remote third-person readability so aiming, posture, and combat intent are easy to read
- continue moving from temporary animation experiments toward a stronger layered character presentation stack

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

Local browser builds default to:

```text
ws://localhost:2567
```

## Deployment

The current deployment path is a single Railway service that hosts both the built frontend and the Colyseus server.

Railway settings:

```bash
Build Command: npm install && npm --prefix server install && npm run build
Start Command: npm --prefix server start
```

The server:

- serves the built frontend from `dist/`
- exposes `/health`
- uses the current host for deployed websocket connections

## Project Layout

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
```

## Key Files

- `src/app/GameApp.js`
- `src/game/networking/RemotePlayerPresenter.js`
- `src/shared/playerMovement.js`
- `src/core/physics/CollisionWorld.js`
- `src/game/maps/mapAssetLoader.js`
- `src/shared/maps/mapManifest.js`
- `server/src/rooms/TacticalRoom.js`

## Docs

Maintained project docs live in:

- `docs/MASTER_CONTEXT.md`
- `docs/systems/app.md`
- `docs/systems/networking.md`
- `docs/remote-weapon-asset-contract.md`
