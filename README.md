# Tactical FPS Three.js Prototype

Starter scaffold for a Counter-Strike-style tactical FPS in three.js.

## Included

- Basic first-person controller with walk, run, crouch, and jump
- Minimal training ground map
- HUD overlay
- Feature-oriented folders for maps, networking, player, rounds, UI, utility, and weapons

## Local Run

```bash
npm install
cd server && npm install && cd ..
npm run dev
```

For local multiplayer server testing in a second terminal:

```bash
npm run server:start
```

Local browser builds still default to `ws://localhost:2567`.

## Railway Deploy

The current deploy path is a single Railway service that hosts both:

- the built Vite frontend from `dist/`
- the Colyseus websocket/matchmaker server from `server/`

Railway settings:

```bash
Build Command: npm install && npm --prefix server install && npm run build
Start Command: npm --prefix server start
```

The Railway public domain should target the internal port exposed by `process.env.PORT`. In current Railway deploy logs this appears as:

```text
[server] Colyseus listening on ws://0.0.0.0:8080
```

So the Railway public networking target should be `8080`.

Notes:

- The server entrypoint is `server/src/index.js`.
- The server now serves the built frontend with an SPA fallback and also exposes `/health`.
- Deployed browser builds default to the current host for websocket connections, so a separate `VITE_COLYSEUS_SERVER_URL` is not required for the one-service Railway setup.

## Structure

```text
src/
  app/
  core/
    input/
    loop/
    physics/
  game/
    maps/
    networking/
    player/
      controllers/
      state/
    rounds/
    ui/
    utility/
    weapons/
  shared/
  styles/
```
