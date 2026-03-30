# Training Ground Map System

## Summary

`createTrainingGround()` builds the current graybox arena and returns renderable map geometry plus gameplay metadata.

It is currently exposed through the shared map registry in `src/game/maps/mapOptions.js`, which is what the pause-menu map selector and `GameApp.loadMap()` consume.

## Inputs

- No external runtime inputs

## Outputs

- `scene` group for rendering
- `spawnPoint`
- `groundHeight`
- Merged static collision geometry
- Shootable mesh references
- Target actor instances

## Dependencies

- `three`
- `mapBuilder`

## Key Design Decisions

- Map factory returns both visuals and gameplay data instead of only a mesh
- Shared assembly helpers from `mapBuilder` handle repeated graybox tasks such as collision extraction and target registration
- Visual map solids are also baked into a merged static collision geometry for runtime traversal
- Ramps, platforms, and graybox cover use the same collision pipeline rather than separate authored floor metadata
- The layout is intentionally small and readable for movement and weapon testing
- The map factory can also return active gameplay actors, not just passive geometry, as shown by the current target enemy spawn

## Current Status

- Implemented and active
- Available in the pause-menu map selector as `Training Ground`
- Includes one moving target enemy for weapon and ADS testing

## Limitations

- Graybox only
- No bombsites, callouts, or objective logic
- Collision geometry is still manually assembled from map pieces rather than imported from a DCC pipeline yet
