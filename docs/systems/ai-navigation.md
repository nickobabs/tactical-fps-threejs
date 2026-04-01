# AI Navigation System

## Summary

`NavigationManager` owns navmesh query runtime for bots using `recast-navigation`. Runtime generation still exists, but baked navmesh import is now the preferred path.

## Inputs

- Static map collision geometry
- Bot start and target positions

## Outputs

- Closest-point projection onto the navmesh
- Random reachable wander targets
- Straight path point lists for chase and patrol movement

## Dependencies

- `recast-navigation`
- Map collision geometry

## Key Design Decisions

- Navigation is isolated from bot actor logic so path generation can evolve independently from combat behavior.
- The preferred runtime path is now to load a baked navmesh export during map load.
- Runtime navmesh generation still exists as a fallback and is expected to happen during map load, not after the map is already active.
- Bots use navmesh path queries, but still move with game-side transform updates rather than crowd simulation for now.
- This keeps the first AI pass simple while preserving a path toward more advanced behaviors later.

## Current Status

- Implemented and active
- Baked navmesh binaries load per map during the loading phase when available
- Runtime navmesh generation still works as a dev/fallback path
- Bots can pick random reachable wander targets and compute chase paths toward the player

## Limitations

- No crowd simulation or local avoidance yet
- Browser runtime still carries `recast-navigation` and its WASM because both baked-nav import and runtime fallback still depend on it
- No debug navmesh visualization yet
