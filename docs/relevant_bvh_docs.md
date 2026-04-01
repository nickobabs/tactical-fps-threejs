# Relevant `three-mesh-bvh` Files

This is a curated reference list of `three-mesh-bvh` files that are worth revisiting when working on:

- player collision
- movement feel
- wall / slope contact response
- scene-wide BVH queries
- debug visualization
- static collision asset prep

Local source snapshot used here:

- `three-mesh-bvh-0.9.9/`

Current note for this project:

- The most useful direct inspiration already applied was the move toward a full-capsule BVH solve instead of a split "horizontal collision plus separate floor collision" model.
- The remaining wall-pressure oscillation and slope jitter are not solved by blindly copying the examples.
- If revisiting this area later, use these files as comparison points rather than starting from memory.

## Highest Priority

### `three-mesh-bvh-0.9.9/example/characterMovement.js`

Why it matters:

- This is the clearest baseline example for player movement against a merged static collision mesh.
- It shows the simplest capsule-segment collision loop using `closestPointToSegment`.
- It derives grounded state from the net displacement after collision resolution.
- It projects velocity off the collision correction direction when not grounded.

Most relevant ideas:

- move a capsule in world space
- transform capsule to collider-local space for shapecast
- resolve penetration by pushing along the segment-to-triangle closest-point direction
- compute `deltaVector` after solve and use that for ground detection and velocity response

Maps most directly to our code:

- `src/core/physics/CollisionWorld.js`
- `src/shared/playerMovement.js`
- `src/game/player/controllers/FirstPersonController.js`

### `three-mesh-bvh-0.9.9/example/objectbvh_characterMovement.js`

Why it matters:

- Same controller idea as `characterMovement.js`, but for a scene / object hierarchy instead of one merged collider.
- Useful if we later want more direct collision against imported scene hierarchies or selectively query visible / enabled objects.
- Shows how to use `ObjectBVH` plus per-object local transforms.

Most relevant ideas:

- scene-wide shapecast over object hierarchy
- per-object local capsule transforms
- skipping objects by visibility / transparency
- keeping the controller logic mostly the same while changing the collision query backend

Maps most directly to future work if:

- we stop merging all collision into one geometry
- we want more selective imported-map collision authoring
- we want object-level filtering or tags

### `three-mesh-bvh-0.9.9/example/physics.js`

Why it matters:

- Not a character controller, but useful for contact-response patterns.
- Shows a clean "move shape, detect overlap, push out, then update velocity from contact normal" loop.
- Good comparison point for tuning damping / bounce / projection ideas in our wall-contact response.

Most relevant ideas:

- contact normal from post-resolve displacement
- velocity reflection / projection after collision
- multiple substeps per frame
- prioritizing stable contact response over one-shot penetration fixes

Useful for:

- wall oscillation investigation
- slope jitter investigation
- future grenade / physics-style props

## Core Source Files

### `three-mesh-bvh-0.9.9/src/math/ExtendedTriangle.js`

Why it matters:

- This is where geometric helper behavior like `closestPointToSegment` lives.
- If collision behavior ever seems surprising, this is one of the first places to verify assumptions.

Most relevant APIs:

- `closestPointToSegment`
- `distanceToPoint`
- `intersectsSphere`

Useful when:

- checking how closest points are computed for capsule-vs-triangle contact
- debugging degenerate push directions
- verifying whether a weird response is from our controller logic or the triangle helper itself

### `three-mesh-bvh-0.9.9/src/core/cast/shapecast.js`

Why it matters:

- Core traversal behavior for custom shape queries.
- Useful when performance or traversal ordering becomes important.

Most relevant ideas:

- how bounds callbacks and triangle callbacks are ordered
- what early-out behavior is possible
- what "contained" means in traversal

Useful when:

- optimizing collision checks
- experimenting with query order / pruning
- investigating whether certain triangles are visited more often than expected

### `three-mesh-bvh-0.9.9/src/core/ObjectBVH.js`

Why it matters:

- Scene-wide BVH support.
- Important reference if we later want collision queries over object hierarchies rather than merged geometry.

Useful when:

- imported maps need object-level collision control
- we want per-object filtering without baking everything together
- we want to compare merged-geometry and hierarchy-BVH tradeoffs

### `three-mesh-bvh-0.9.9/src/core/MeshBVH.js`

Why it matters:

- Main BVH implementation and public query surface.
- Good source of truth for supported query APIs and options.

Useful areas:

- constructor options like `maxLeafSize`, `strategy`, `indirect`
- `raycastFirst`
- query expectations about local space

Useful when:

- tuning BVH build quality
- checking local-space assumptions
- deciding whether another query type is available before writing custom logic

## Utility / Asset Pipeline Files

### `three-mesh-bvh-0.9.9/src/utils/StaticGeometryGenerator.js`

Why it matters:

- This is the reference for baking object hierarchies into one static collision geometry.
- We already use this pattern conceptually for imported-map collision assembly.

Useful when:

- improving collision mesh baking
- deciding how to merge imported collision sources
- supporting skinned / transformed / grouped source meshes later

### `three-mesh-bvh-0.9.9/example/inspector.js`

Why it matters:

- Good reference for debugging BVH structure and visual quality.

Useful when:

- checking whether a bad collision case is related to BVH construction quality
- comparing build settings like leaf sizes or strategies

### `three-mesh-bvh-0.9.9/example/shapecast.js`

Why it matters:

- General-purpose shapecast reference, smaller than the movement examples.
- Useful if we want to prototype a custom contact query without controller noise.

Useful when:

- learning traversal behavior
- testing a shape query in isolation
- reducing a movement bug to a smaller geometry query

## Debug / Visualization Files

### `three-mesh-bvh-0.9.9/src/objects/BVHHelper.js`

Why it matters:

- The debug helper we can use as a model for better BVH visualization if collision debugging gets harder.

Useful when:

- expanding our collision debug overlay
- visualizing tree depth or local problem areas

### `three-mesh-bvh-0.9.9/README.md`

Why it matters:

- Best top-level index for examples and public APIs.
- Good first stop before digging into source.

Most useful sections:

- examples list
- `shapecast`
- `closestPointToSegment`
- `ObjectBVH`
- `StaticGeometryGenerator`
- gotchas about local space and geometry centering

## Lower Priority But Potentially Useful Later

### `three-mesh-bvh-0.9.9/src/math/OrientedBox.js`

Useful for:

- future non-capsule collision experiments
- box-based trigger / overlap tools
- editor/debug tooling

### `three-mesh-bvh-0.9.9/src/utils/ExtensionUtilities.js`

Useful for:

- understanding extension helpers like `computeBoundsTree`
- checking how library helpers are attached to Three.js objects

### `three-mesh-bvh-0.9.9/src/workers/GenerateMeshBVHWorker.js`

Useful for:

- future async BVH generation if we ever want editor-time or runtime worker-based BVH building

### `three-mesh-bvh-0.9.9/example/asyncGenerate.js`

Useful for:

- practical worker-generation reference

## Practical Takeaways For Our Project

### What already proved useful

- `characterMovement.js` and `objectbvh_characterMovement.js` were the right references for moving from the old split collision model toward a full capsule solve.
- `physics.js` is a good reference for post-contact velocity handling.

### What did *not* transfer cleanly

- Simply letting the collision solve push against walkable triangles the same way as walls did not fix our jitter.
- The examples are simpler than our controller:
  - no reconciliation
  - no shared client/server movement layer
  - no crouch interpolation
  - no custom floor-support rules
  - no imported-map authority concerns

### Best files to revisit if we return to wall/slope jitter later

1. `three-mesh-bvh-0.9.9/example/characterMovement.js`
2. `three-mesh-bvh-0.9.9/example/physics.js`
3. `three-mesh-bvh-0.9.9/src/math/ExtendedTriangle.js`
4. `three-mesh-bvh-0.9.9/src/core/cast/shapecast.js`
5. `three-mesh-bvh-0.9.9/example/objectbvh_characterMovement.js`

### Best files to revisit if we want a more scene-native imported-map collision path

1. `three-mesh-bvh-0.9.9/example/objectbvh_characterMovement.js`
2. `three-mesh-bvh-0.9.9/src/core/ObjectBVH.js`
3. `three-mesh-bvh-0.9.9/src/utils/StaticGeometryGenerator.js`

### Best files to revisit for better debug tooling

1. `three-mesh-bvh-0.9.9/src/objects/BVHHelper.js`
2. `three-mesh-bvh-0.9.9/example/inspector.js`
3. `three-mesh-bvh-0.9.9/README.md`
