# Tactical FPS Three.js Prototype

Three.js tactical FPS prototype with first-person movement, procedural viewmodels, imported-map support, additive Colyseus multiplayer, and an active remote third-person playermodel pipeline.

## Current Scope

- Counter-Strike-like first-person movement with walk, sprint, crouch, jump, fly-mode debug, and shared client/server movement logic
- Procedural first-person weapon presentation for rifle, sniper, and knife
- Imported-map workflow with separate visual and collision glTF assets plus baked navmesh support
- Additive multiplayer through Colyseus with prediction, replay/reconciliation, remote players, and a first server-authoritative PvP slice
- Experimental remote third-person character system using `newtest.glb` plus standalone FBX locomotion clips exported from 3ds Max

## Current State

Implemented and actively used:

- `Training Ground`
- `Desert Compound`
- `Dust2 Import Test`
- local prediction + server authority for movement
- server-authoritative player hits, damage, death, and respawn
- remote player third-person presentation with weapon attachment, crouch/jump state, fire layering, and legacy fallback

Current active remote character content:

- character mesh: `public/models/players/newtest.glb`
- standalone animation clips: `public/models/players/animations/`
- rifle asset: `public/models/weapons/ak-47-fixed.glb`

## Local Development

Install dependencies:

```bash
npm install
npm --prefix server install
```

Run the Vite client:

```bash
npm run dev
```

Run the Colyseus server in a second terminal:

```bash
npm run server:start
```

Local browser builds default to:

```text
ws://localhost:2567
```

Useful scripts:

```bash
npm run build
npm run preview
npm run build:navmesh
npm run server:dev
```

## Deployment

The current deploy path is a single Railway service that hosts both:

- the built Vite frontend from `dist/`
- the Colyseus server from `server/`

Railway settings:

```bash
Build Command: npm install && npm --prefix server install && npm run build
Start Command: npm --prefix server start
```

Notes:

- server entrypoint: `server/src/index.js`
- the server serves the built frontend with SPA fallback
- the server also exposes `/health`
- deployed browser builds default websocket connections to the current host, so a separate `VITE_COLYSEUS_SERVER_URL` is not required for the one-service Railway setup

## Project Layout

```text
src/
  app/
  core/
    input/
    loop/
    physics/
    three/
  game/
    ai/
    audio/
    maps/
    networking/
    player/
      controllers/
      state/
    rounds/
    skyboxes/
    targets/
    ui/
    utility/
    weapons/
  shared/
  styles/
server/
  src/
docs/
public/
```

## Key Files

- `src/app/GameApp.js`: composition root, map lifecycle, HUD, networking ownership, debug controls
- `src/game/networking/RemotePlayerPresenter.js`: remote third-person presentation, external animation clip loading, weapon attachment, IK experiment
- `src/shared/playerMovement.js`: shared movement simulation used by client and server
- `src/core/physics/CollisionWorld.js`: static collision, ground sampling, and LOS
- `src/game/maps/mapAssetLoader.js`: imported-map and manifest-driven map assembly
- `src/shared/maps/mapManifest.js`: map registry and asset metadata
- `server/src/rooms/TacticalRoom.js`: authoritative multiplayer room

## Docs

Start here for maintained project context:

- `docs/MASTER_CONTEXT.md`
- `docs/systems/app.md`
- `docs/systems/networking.md`
- `docs/remote-weapon-asset-contract.md`

## Notes

- Multiplayer is additive. If the server is unavailable, the browser runtime should still work locally.
- The legacy remote placeholder/model path is still preserved as fallback while the new remote character pipeline is under active iteration.
- The current locomotion-quality conclusion is that standalone exported clips from the source DCC are preferred over runtime subclips from one long strip.
