# Refactor Progress

## Current State

The refactor has been proceeding in small verified slices with a production build after each step. The goal has been to improve ownership boundaries and reduce coordination pressure inside the largest runtime classes without changing behavior wholesale.

## Completed

- App layer
  - `GameApp` is now the composition root plus frame-phase orchestrator
  - pause, debug, gameplay-network, and session lifecycle responsibilities are split into dedicated app-layer modules
- Weapons
  - `WeaponManager` has been decomposed into separate modules for tuning UI, action execution, policy/state, and selection/application
- Player controller
  - input snapshotting
  - fly-mode and landing helpers
  - presentation smoothing math
  - collision-safe movement helpers

## Remaining High-Risk Areas

- `FirstPersonController`
  - `simulateMovementStep`
  - `applyBufferedCanonicalCorrection`
  - `reconcileAuthoritativeState`
- `RemotePlayerPresenter`
  - still the largest concentrated runtime hotspot in the repo
- Server-side authoritative room / remote hitbox runtime
  - still relatively large and not yet refactored in this pass
  - confirmed separate multiplayer bug: airborne remote authoritative hitboxes can sit below the visible mesh while local hitbox debug remains accurate (see `debug/Siufbpy.png`)

## Working Rules For The Next Pass

- Keep refactors sequential and behavior-preserving
- Rebuild after every slice
- Prefer extracting pure calculations and helper boundaries before moving state ownership
- Be cautious around reconciliation, collision resolution, and multiplayer authority handoff
