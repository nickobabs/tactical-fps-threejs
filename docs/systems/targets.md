# Target System

## Summary

`TargetDummy` and `TargetManager` provide the current enemy-target sandbox, while `targetView.js`, `targetPresentation.js`, and `targetFeedback.js` own the target's procedural visuals, expression state, and floating damage-number helpers.

## Inputs

- Frame delta time
- Player position
- Optional `CollisionWorld`
- Optional `NavigationManager`
- Hitscan damage from `WeaponManager`

## Outputs

- Updated target transforms
- Damage feedback sprites
- Damage receiver callbacks on target hit meshes

## Dependencies

- `three`
- `CollisionWorld`
- `NavigationManager`
- `WeaponManager` hit data
- `targetView`
- `targetFeedback`

## Key Design Decisions

- The target remains intentionally lightweight and procedural; AI behavior is still simple even though navmesh pathing is now available.
- Body and head are separate shootable meshes so headshot multipliers are easy to author and test.
- Movement is simple chase/wander logic updated through `TargetManager`, with navmesh paths used when available rather than a full behavior tree or state machine.
- Target rotation now follows actual movement direction during wander and path traversal, so bots read as running forward instead of strafing sideways.
- Damage numbers are generated as canvas-backed sprites for rapid readability.
- Visual construction, expression state, and feedback helpers are split out so `TargetDummy` can stay focused on state, damage, and movement behavior
- The target has bright red forward-facing eyes to make orientation readable, and it now shows an angry eyebrow expression only while actually aggroed and charging the player.
- Frequently reused vectors such as the last seen player position are kept alive across frames to avoid avoidable update-time allocation churn.

## Current Status

- Implemented and active
- Targets can wander reachable space and charge the player when they have line of sight
- Headshots deal double damage
- The target respawns after a short delay
- `TargetManager` now owns cleanup as well as updates, so map unloads can tear target runtime state down cleanly
- Local target dummies are now disabled by default during PvP testing unless explicitly re-enabled

## Limitations

- No shooting, aiming, strafing, cover usage, or animation
- No faction logic, perception model, or team integration
