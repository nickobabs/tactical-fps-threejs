# Session Note: Tactical Room Payload Refactor

## Summary

This pass continued the server-side refactor in `TacticalRoom` by extracting pure payload construction without moving authority logic, sequencing, or state mutation.

The goal was to reduce inline event/snapshot shaping inside the room while preserving the important rule:

- `TacticalRoom` still decides when state changes happen
- `TacticalRoom` still decides when messages are sent
- helper modules only shape payloads

## Extracted Modules

- Combat/audio payload helpers:
  - `server/src/rooms/tacticalRoomEventPayloads.js`
- Objective/world-state payload helpers:
  - `server/src/rooms/tacticalRoomStatePayloads.js`

## What Moved

Into `tacticalRoomEventPayloads.js`:

- `player-respawned` event payload shaping
- `player-fired` event payload shaping
- `player-hit` event payload shaping
- shared positional audio-event shaping
- defuse-start audio payload shaping
- bomb-beep audio payload shaping

Into `tacticalRoomStatePayloads.js`:

- objective snapshot shaping
- `smoke-thrown` event payload shaping
- round snapshot shaping
- gameplay snapshot shaping
- full `player-state` payload shaping

## What Stayed In TacticalRoom

- damage / death / respawn authority
- bomb / defuse / round sequencing
- validation rules
- broadcast timing
- side effects and state mutation

That boundary is the important part. It keeps the server room authoritative while removing repeated shape-building noise.

## Practical Result

- `TacticalRoom` is easier to scan because event payload literals are no longer mixed into every gameplay branch.
- Server combat/objective refactor now has a clearer shape:
  - combat math in `server/src/combat/`
  - payload shaping in `server/src/rooms/*Payloads.js`
  - authority and sequencing still in `TacticalRoom`

## Guardrails

- Do not move round/bomb/defuse state mutation into payload helpers.
- Do not move broadcast sequencing into payload helpers.
- Prefer extracting only:
  - pure event payload builders
  - pure snapshot builders
  - serialization helpers

## Current Stable Checkpoint

- Fire/hit/kill/respawn still behaved correctly after the payload extraction.
- Smoke replication still behaved correctly.
- Bomb beep and defuse-start audio still behaved correctly.
- Objective/round HUD state still appeared correct after the state payload extraction.
