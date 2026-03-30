# Physics System

## Summary

`CollisionWorld` provides static-world collision resolution against a merged mesh-based collision geometry using `three-mesh-bvh`, plus downward ground sampling for grounding and step-up behavior.

## Inputs

- Player position
- Player radius and height
- Desired movement delta
- Merged collision geometry provided by the map

## Outputs

- Corrected position after capsule-vs-world collision resolution
- Shared fallback ground height
- Local ground height lookup by X/Z position

## Dependencies

- `three`
- `three-mesh-bvh`
- Map-authored collision geometry

## Key Design Decisions

- Static map collision is represented by real solid geometry rather than a separate mix of AABB blockers and authored walkable regions
- BVH-backed capsule collision is used for movement resolution so ramps, catwalks, and rotated solids behave like ordinary world geometry
- Grounding is still handled by the controller, while `CollisionWorld` provides downward queries and solid-world resolution
- Ground sampling is reachability-aware by casting downward from the actor's current height plus allowed step-up distance, which prevents snapping onto overhead geometry

## Current Status

- Implemented and active
- Good enough for graybox lane movement
- Ramp and catwalk traversal are supported through the actual collision mesh geometry
- Rotated map solids such as the ramp now share one collision path with the rest of the map instead of requiring separate helper blockers

## Limitations

- Collision is still static-world only
- Step-up behavior is still simple and controller-driven rather than a full stair-step solver
- No moving bodies
- No trigger volumes
