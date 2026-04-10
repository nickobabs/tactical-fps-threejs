# Session Note: 2026-04-09 Dust2 Grounding Investigation

## Summary

Current active blocker: grounded movement on the imported Dust2 map can still leave the player hovering on an invisible support surface in some places after falling/jumping from height.

This is not solved yet. The current state is better instrumented, but the final cause is still under investigation.

## Current Symptoms

- The issue reproduces in multiple places on Dust2, not just one ledge.
- The player can appear to land in the air and walk briefly on that invisible support.
- When the player gets close enough to real nearby ground, they then drop down.
- After one fix attempt, the player could also get stuck in a loop of falling and being pulled back upward. That specific clamp/fallback behavior has since been addressed.

## Important Findings

- Earlier `groundHeight` fallback behavior in runtime ground queries was a real bug.
  - `CollisionWorld.getGroundHeightAt()` used to fall back to map `groundHeight` on ray miss.
  - That effectively created an invisible horizontal support plane on imported maps.
  - Runtime movement/support queries now return `null` on miss by default instead.
- Y clamping around `groundHeight` was also too aggressive for tall imported maps.
  - Shared movement Y clamp was widened to avoid acting like a hidden floor.
- Support sampling had a real bug in one pass:
  - footprint offsets were accidentally scaled by capsule radius
  - that made the multi-sample support test too center-biased
  - this has been corrected
- Live debug during reproduction showed:
  - `gd` switching between `Infinity` and a number
  - `support` switching between `1` and `0`
  - `floor` switching between `--` and `1118.2`
- After the fallback-plane fix, those values strongly suggest the controller is still sometimes seeing a real upward-facing support hit at `1118.2`, but the exact source is still unclear.

## Current Debugging Instrumentation

The debug HUD now shows:

- `support`: support ratio across the footprint samples
- `gd`: distance to ground
- `floor`: resolved support height

Movement tracing is also available:

- `F10`: movement trace capture on/off
- trace is stored in browser `localStorage`
- trace is also written to `debug/movement-traces/`

## Most Useful Next Repro Workflow

Do not continue guessing with movement heuristics first.

Use this order:

1. Restart client and server on the current code
2. Go to a Dust2 spot where the hover reproduces
3. Start `F10`
4. Reproduce the hover / invisible support
5. Stop `F10`
6. Inspect:
   - support ratio changes
   - `gd`
   - `floor`
   - reconciliation/correction behavior
7. If needed, combine this with collision wireframe and local marker dumping

## Current Read

- The fake global floor fallback was real and is gone.
- The remaining bug is more likely:
  - imported collision/support geometry
  - a specific upward-facing triangle/query result
  - or a remaining support-resolution edge case
- It no longer looks like a plain “gravity is broken” problem.

That is the most efficient next step if the movement trace alone is not enough.
