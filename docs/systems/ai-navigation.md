# AI Navigation System

## Summary

`NavigationManager` owns runtime navmesh generation and path queries for bots using `recast-navigation`.

## Inputs

- Static map collision geometry
- Bot start and target positions

## Outputs

- Closest-point projection onto the navmesh
- Random reachable wander targets
- Straight path point lists for chase and patrol movement

## Dependencies

- `recast-navigation`
- `recast-navigation/generators`
- Map collision geometry

## Key Design Decisions

- Navigation is isolated from bot actor logic so path generation can evolve independently from combat behavior.
- The current implementation generates a solo navmesh at runtime from the map's merged collision geometry.
- Navmesh generation is expected to happen during map load, not after the map is already active, so runtime bot updates never need to wait for navigation setup.
- Bots use navmesh path queries, but still move with game-side transform updates rather than crowd simulation for now.
- This keeps the first AI pass simple while preserving a path toward more advanced behaviors later.

## Current Status

- Implemented and active
- Navmesh builds per loaded map during the loading phase
- Bots can pick random reachable wander targets and compute chase paths toward the player

## Limitations

- No crowd simulation or local avoidance yet
- No offline navmesh baking pipeline yet
- No debug navmesh visualization yet
