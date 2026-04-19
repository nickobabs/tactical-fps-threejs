# Session Note: Profile Media, Pause Menu Panels, And Sprays

## Outcome

This pass added a real player-profile media flow and a first replicated spray system.

The game now supports:

- a persistent browser-local `profileId`
- replicated profile avatars stored on the server
- a pause-menu `Profile` panel for name/avatar/spray management
- a pause-menu `Settings` panel for runtime player settings
- replicated per-player world sprays placed with the `spray` action

## Main Changes

### Persistent profile identity

In:

- [playerProfile.js](/C:/Users/nicko/tactical-fps-threejs/src/app/playerProfile.js)

The client now creates and persists a local `profileId` in browser `localStorage`.

This is the current identity anchor for:

- uploaded avatar ownership
- uploaded spray ownership
- persistence across normal sessions on the same browser profile

It is intentionally not a true account/auth system yet.

### Server-backed avatar and spray storage

In:

- [avatarStorage.js](/C:/Users/nicko/tactical-fps-threejs/server/src/avatarStorage.js)
- [index.js](/C:/Users/nicko/tactical-fps-threejs/server/src/index.js)

The server now:

- accepts processed avatar and spray uploads
- stores them under `server/uploads/avatars/` and `server/uploads/sprays/`
- serves them back as normal static assets
- resolves both `.jpg` and `.png` variants

The browser currently preprocesses:

- avatars to small square `64x64` JPEGs
- sprays to square `256x256` PNGs

### Pause-menu profile/settings split

In:

- [createPauseMenu.js](/C:/Users/nicko/tactical-fps-threejs/src/game/ui/createPauseMenu.js)
- [Hud.js](/C:/Users/nicko/tactical-fps-threejs/src/game/ui/Hud.js)
- [main.css](/C:/Users/nicko/tactical-fps-threejs/src/styles/main.css)

The pause menu is now split into clearer panels:

- `Profile`
  - player name
  - avatar preview/upload
  - spray preview/upload
- `Settings`
  - sensitivity
  - FOV
  - volume
  - keybinds

No panel opens expanded by default anymore.

### Replicated sprays

In:

- [GameApp.js](/C:/Users/nicko/tactical-fps-threejs/src/app/GameApp.js)
- [NetworkClient.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/NetworkClient.js)
- [TacticalRoom.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js)
- [SprayManager.js](/C:/Users/nicko/tactical-fps-threejs/src/game/effects/SprayManager.js)

Players can now:

- upload a spray from the `Profile` panel
- look at a surface
- press the `spray` binding (`T` by default)
- place one replicated world spray

Current gameplay rules:

- max `1` active spray per player
- spraying again replaces your old spray
- sprays reset per round / match reset / debug side-swap intermission
- sprays are world-upright instead of inheriting arbitrary surface tilt

The render path is currently a stable surface-aligned textured plane, not a heavy decal projection system.

## Important Fixes During This Pass

- avatar/spray URLs are now resolved against the actual connected backend origin instead of assuming the Vite origin
- uploaded media routes now send permissive CORS headers so texture loading works in the browser/WebGL path
- the first-spray persistence bug was a client async race in [SprayManager.js](/C:/Users/nicko/tactical-fps-threejs/src/game/effects/SprayManager.js), not the room replacement rule
- spray replacement is now stable from the very first spray because stale async completions are discarded

## Sanity Review

This implementation is sane for the current project scope.

Why:

- profile media uses a narrow dedicated helper instead of being spread through HUD code
- server file storage is separated into [avatarStorage.js](/C:/Users/nicko/tactical-fps-threejs/server/src/avatarStorage.js) instead of being embedded in the room
- spray world rendering lives in a dedicated [SprayManager.js](/C:/Users/nicko/tactical-fps-threejs/src/game/effects/SprayManager.js)
- replicated spray state is small and reference-based; room state does not carry raw base64 image payloads

One practical cleanup was also added:

- `server/uploads/` is now treated as runtime data and should not be committed as normal source content

## Limitations

- profile identity is still browser-local, not account-backed
- clearing browser storage creates a new `profileId`, so the user must upload media again
- spray rendering is intentionally simple and does not yet do true projected decals, fade-outs, or material-aware blending
- there is no moderation/auth/rate-limit policy beyond the current small upload path

## Next Plausible Follow-Ups

- account-backed identity if media should persist across browsers/devices
- upload validation/rate limiting hardening if this moves beyond friend-testing
- a more sophisticated spray presentation path if world decals become an important cosmetic system
