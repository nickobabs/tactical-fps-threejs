# Session Note - 2026-04-17 Dust2 Ledge Support Investigation

## Context

While testing `Dust2 Test`, narrow stone ledges showed inconsistent support values in the HUD debug readout such as:

- `0.67`
- `0.78`
- `0.89`

The player could stand on the ledge, but would sometimes slide or feel unstable even though the geometry was authored as fully solid in Blender.

Reference screenshot:

- `debug/usnZ3Cm.jpg`

## What We Investigated

The issue was not a missing face or obviously broken collision export. The main cause was the shared grounding logic in [`src/shared/playerMovement.js`](../../src/shared/playerMovement.js).

Current grounding is not binary. It computes floor support from multiple downward samples under the player footprint:

- one center sample
- four axial samples
- four diagonal samples

Those samples are compared against the center hit height and converted into a `supportRatio`.

Important consequence:

- thin ledges can be perfectly solid in the mesh
- but still produce partial support because some outer samples hang over empty space

That partial support can then make grounding feel inconsistent on narrow lips, corners, and decorative edges.

## Implementation Change Made

A small mitigation was added in `playerMovement.js`:

- support probe offsets are now scaled from player radius instead of using fixed world-space offsets
- grounded, near-stationary players can prefer the center support height on thin ledges
- grounded, near-stationary players also get a slightly more forgiving minimum support ratio

This was intended as a narrow ledge-standing improvement, not a final grounding model redesign.

## Result

The change improved thin-ledge standing, but introduced a visible side effect:

- if a player lands slightly off-center on a narrow ledge, they can be pulled toward the ledge center

That behavior is not necessarily catastrophic for current testing, but it is not a principled long-term solution.

## Current Read

Single-ray grounding is probably too blunt:

- it would make tiny lips and corners overly sticky
- it would allow too much of the capsule footprint to hang off unsupported space

The better long-term direction is likely:

- keep multi-sample support
- revisit probe footprint design
- treat stationary ledge support separately from normal movement support
- possibly use center support as a stronger hint, but not as a hard replacement for footprint support

## Follow-Up

When revisiting this area, inspect:

- `GROUND_SUPPORT_OFFSETS`
- `supportRatio` thresholds for grounded stickiness vs airborne landing
- whether ledge standing should use a dedicated low-speed rule path
- whether narrow ledges need a more explicit footprint or capsule-overlap style support test instead of only ray samples
