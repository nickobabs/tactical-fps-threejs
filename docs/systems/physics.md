# Physics System

## Summary

`CollisionWorld` provides static-world collision resolution against merged mesh-based collision geometry using `three-mesh-bvh`, plus downward ground sampling for grounding, step-up, and line-of-sight checks.

## Inputs

- Player position
- Player radius and height
- Desired movement delta
- Merged collision geometry provided by the map

## Outputs

- Corrected position after capsule-vs-world collision resolution
- Shared fallback ground height
- Local ground height lookup by X/Z position
- Line-of-sight answers for bots and later gameplay systems

## Dependencies

- `three`
- `three-mesh-bvh`
- Map-authored collision geometry

## Key Design Decisions

- Static map collision is represented by real solid geometry rather than a separate mix of AABB blockers and authored walkable regions
- BVH-backed capsule collision is used for movement resolution so ramps, catwalks, and rotated solids behave like ordinary world geometry
- Grounding is still handled by the controller, while `CollisionWorld` provides downward queries and solid-world resolution
- Ground sampling is reachability-aware by casting downward from the actor's current height plus allowed step-up distance, which prevents snapping onto overhead geometry
- Walkable upward-facing triangles are excluded from horizontal pushback so ramps behave like floors instead of slowly sliding the player downhill
- Ground height queries now return the actual sampled floor height instead of clamping upward to fallback `groundHeight`, which was important for larger imported maps with sloped surfaces
- `CollisionWorld` currently uses a custom capsule-vs-triangle shapecast response on top of `three-mesh-bvh`, rather than a stock controller package layered above the BVH

## Current Status

- Implemented and active
- Good enough for graybox lane movement
- Ramp and catwalk traversal are supported through the actual collision mesh geometry
- Rotated map solids such as the ramp now share one collision path with the rest of the map instead of requiring separate helper blockers
- Imported-map collision works through a dedicated collision `.glb` path, not just graybox-authored geometry
- Known good fixes from the latest imported-map pass:
  - high-altitude floor queries behave correctly
  - falling onto the ground from height no longer phases through the floor
  - ramp floating caused by fallback floor clamping is fixed
  - passive sliding on ramps is fixed
- Later multiplayer-oriented collision experiments also landed:
  - horizontal movement substepping inside `CollisionWorld.move()`
  - directional filtering to avoid resolving against the "exit" face of thin hollow blockers
  - these did not fully solve wall phasing under sustained pressure
- Latest stable checkpoint:
  - the active movement path now resolves a full capsule move through `CollisionWorld.move()` instead of splitting horizontal collision from vertical support
  - this removed the earlier wall-phasing failure under sustained authority/correction pressure
  - floor support is then re-established by a follow-up support probe in shared movement
  - remaining issue at this checkpoint is contact jitter against walls and sloped surfaces, not phasing

## Limitations

- Collision is still static-world only
- Step-up behavior is still simple and controller-driven rather than a full stair-step solver
- No moving bodies
- No trigger volumes
- Wall contact still has a known oscillation/shimmer issue when the player leans into solid geometry. Several low-risk mitigations were tried, but the issue is intentionally paused until a more principled contact/controller pass is worth doing.
- A more severe current blocker exists under multiplayer correction / authority pressure: players can still eventually phase through walls after pushing into blockers for a short time
- Hollow wall / thin shell collision authoring is now a prime suspect. The current response model is much safer with genuinely solid blocker volumes than with thin enclosed shells.
