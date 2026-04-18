# Session Note - 2026-04-18 Server Combat Refactor Checkpoint

## Context

After the remote timeline extraction and the reconnect guard fix, the next useful refactor target stayed on the server combat side.

The goal was not to redesign combat behavior.

The goal was to reduce the amount of combat-specific logic still living directly inside [`server/src/rooms/TacticalRoom.js`](../../server/src/rooms/TacticalRoom.js), while keeping the room responsible for:

- room message flow
- player lifecycle
- authoritative state mutation
- broadcast/event sequencing

## Refactor Slices Completed

### 1. Lag-compensation / hitbox-history extraction

A new module now exists at [`server/src/combat/lagCompensation.js`](../../server/src/combat/lagCompensation.js).

It owns:

- authoritative hitbox construction
- hitbox snapshot cloning
- rolling hitbox-history recording
- lag-compensated hitbox lookup
- hitbox-history clearing on respawn

`TacticalRoom` now calls those helpers instead of owning their implementation directly.

### 2. Shot-validation geometry extraction

A new module now exists at [`server/src/combat/shotValidation.js`](../../server/src/combat/shotValidation.js).

It owns:

- coarse fallback hit tests
- authoritative hitbox snapshot hit tests
- hit-zone damage lookup
- death-clip selection from shot direction

This removed a large amount of geometry/hit-resolution detail from `TacticalRoom` without changing the higher-level combat flow.

### 3. Fire-resolution extraction

A new module now exists at [`server/src/combat/fireResolution.js`](../../server/src/combat/fireResolution.js).

It owns:

- shot origin/direction sanitization
- eye-position clamping
- lag-comp rewind timing for the shot
- world trace / target selection
- final structured shot result data

Important boundary:

- it does **not** apply damage
- it does **not** increment kills
- it does **not** broadcast combat events
- it does **not** own room/gameplay side effects

Those still remain in `TacticalRoom`.

## Important Follow-Up Fixes During Review

Two review catches were important in this pass:

### 1. RTT rewind argument regression

During the earlier shared timeline extraction, the server had briefly started passing the whole `player` object into `getLagCompensationRewindMs(...)` instead of `player.pingMs`.

That silently dropped the ping-derived rewind component.

This was fixed before continuing.

### 2. Fallback hitbox aliasing risk

The first lag-comp extraction reused one shared mutable fallback hitbox layout object.

That could have aliased fallback hitboxes across players/ticks if the coarse fallback path ever ran.

This was corrected by restoring per-call layout allocation in the fallback path.

## Current Ownership Shape

Current server combat ownership now looks healthier:

- `TacticalRoom`
  - room lifecycle
  - authoritative player/objective state changes
  - message handling
  - combat-event broadcast sequencing
  - damage / kill / respawn side effects
- `combat/lagCompensation.js`
  - authoritative hitbox history and rewind lookup
- `combat/shotValidation.js`
  - geometry/hit-resolution helpers
- `combat/fireResolution.js`
  - shot sanitization and target selection

This is the right direction because it reduces risk without trying to force a fake “small file” outcome.

## Lessons Reinforced

### 1. Review immediately after each slice

This pass again justified the habit of reviewing after extraction instead of waiting.

The review caught:

- a real RTT rewind bug
- a subtle fallback aliasing bug
- several stale imports after ownership moved

### 2. Keep `TacticalRoom` as an orchestrator, not a geometry dump

The room is still dense, but the density is now more about authoritative orchestration than low-level geometric helpers.

That is much healthier than mixing:

- room lifecycle
- shot geometry
- hitbox rewind history
- damage/broadcast flow

all in one local block.

### 3. Do not over-extract side effects yet

It would be easy to keep going and move damage application or combat-event payload construction too aggressively.

That should only happen if the next ownership boundary is clear.

For now, keeping state mutation and broadcast sequencing in `TacticalRoom` is still the safer baseline.

## Good Next Directions

If server combat refactoring continues later, the most reasonable next slices are:

1. combat-event payload builders
2. damage / kill outcome application helpers
3. possibly a narrower server combat coordinator if the flow becomes obviously reusable

But none of those should be forced if they blur room authority semantics.

## Relevant Files

- [`server/src/rooms/TacticalRoom.js`](../../server/src/rooms/TacticalRoom.js)
- [`server/src/combat/lagCompensation.js`](../../server/src/combat/lagCompensation.js)
- [`server/src/combat/shotValidation.js`](../../server/src/combat/shotValidation.js)
- [`server/src/combat/fireResolution.js`](../../server/src/combat/fireResolution.js)
- [`docs/refactor-progress.md`](../refactor-progress.md)
- [`docs/systems/networking.md`](../systems/networking.md)
