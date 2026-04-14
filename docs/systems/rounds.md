# Round System

## Summary

`RoundManager` now owns the shared round lifecycle used by both client and server. The authoritative server snapshot is the source of truth in multiplayer.

## Inputs

- Frame delta time
- Explicit round-end calls from gameplay/objective logic
- Server snapshot application on clients

## Outputs

- `roundNumber`
- Current phase string
- Internal phase timer
- Team scores
- Round-ended state
- Winner team and win reason
- Reset countdown after round end

## Dependencies

- None

## Key Design Decisions

- Shared round-state implementation is reused on both client and server
- Multiplayer clients consume authoritative room snapshots instead of advancing rounds locally
- A dedicated `waiting` phase prevents rounds from starting until connected players have chosen teams and sent ready state
- Ended rounds currently stay in `live` while a short reset countdown runs, instead of switching to a separate post-round phase

## Current Status

- Implemented and active
- Current phase flow is:
  - `waiting`
  - `freeze`
  - `live`
- Team scores are tracked
- Bomb explosion can end the round for attackers
- Bomb defuse can end the round for defenders
- Server-authoritative round timing is active in multiplayer
- The HUD consumes real round number/phase/timer/win state
- Round-end UI now includes a winner banner plus a simple winning-team MVP line derived from scoreboard kills

## Limitations

- No economy or buy phase
- No elimination-based win logic yet
- Round rules are still narrow and currently centered on freeze/live timing plus the first bomb objective slice
