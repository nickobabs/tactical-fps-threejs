# Desert Compound Map System

## Summary

`createDesertCompound()` builds a medium-sized desert-graybox map with two site-like end spaces and a central mid route that connects into both sides through tighter, more enclosed lanes.

It is exposed through the shared map registry in `src/game/maps/mapOptions.js`, so it can be selected from the pause-menu map list and loaded through `GameApp.loadMap()`.

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

- The layout is intentionally Dust2-inspired only at a high level: left site, right site, and a central middle route, but the spaces are kept denser and more enclosed than the original first draft.
- The visual language stays within the current prototype style, but shifts into warmer desert tones with contrasting site accents.
- Real map solids are baked into merged collision geometry, so bridges, ramps, cover, and raised site areas use the same runtime collision path as the training ground.
- Multiple target dummies are placed across the map to support weapon testing at site and mid distances.
- Shared assembly helpers from `mapBuilder` keep primitive-map authoring consistent with the training ground instead of duplicating collision and target wiring logic.

## Current Status

- Implemented and active
- Available in the pause-menu map selector as `Desert Compound`
- Includes three target enemies for traversal and combat testing across the larger layout

## Limitations

- Graybox only
- No objective logic despite the site-like structure
- Still manually authored from primitive geometry rather than imported environment art
