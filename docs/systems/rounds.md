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
- Persistent cohort scores plus current side ownership
- Round-ended state
- Winner team and win reason
- Reset countdown after round end
- Intermission reason/countdown
- Match-ended state and match winner

## Dependencies

- None

## Key Design Decisions

- Shared round-state implementation is reused on both client and server
- Multiplayer clients consume authoritative room snapshots instead of advancing rounds locally
- A dedicated `waiting` phase prevents rounds from starting until connected players have chosen teams and sent ready state
- Ended rounds stay in `live` while the round-end countdown runs, and use a separate `intermission` phase for side-swap / overtime pauses
- Score now persists by team cohort instead of current side label, so halftime and overtime swaps preserve the correct match score
- Competitive rules are currently intended only for `Dust2 Test`; other maps fall back to `Debug`

## Current Status

- Implemented and active
- Current phase flow is:
  - `waiting`
  - `freeze`
  - `live`
- `intermission`
- `Debug` and `Competitive` gamemodes exist in the pause menu
- Team scores are tracked from persistent team cohorts and then projected onto current attacker/defender sides
- Competitive freeze is 10 seconds on `Dust2 Test`
- Competitive freeze locks movement, firing, bomb use, and smoke, but still allows looking around
- Bomb explosion can end the round for attackers
- Bomb defuse can end the round for defenders
- Elimination win logic is active in competitive:
  - all defenders dead means attackers win immediately
  - all attackers dead before plant means defenders win immediately
  - if the bomb is planted and attackers all die, defenders still need to defuse
  - defuse wins for defenders even if attackers are alive
- Competitive rounds do not use mid-round respawns
- New rounds reset all ready players back onto team spawn markers, including alive survivors from the previous round
- Team spawns are assigned uniquely per round when enough markers exist
- Competitive match flow now uses MR24:
  - side swap after 12 completed rounds
  - first to 13 wins regulation
  - `12-12` starts overtime
- Overtime is active:
  - six-round sets
  - side swap after three rounds
  - first team to four wins in the current OT set wins the match
  - tied `3-3` OT sets roll into another OT set automatically
- Match win now forces the scoreboard open, shows a `Restarting match in 15 seconds` HUD banner, and resets the match after the countdown
- Side swap and overtime start now use a 10-second forced-scoreboard intermission with HUD messaging
- Server-authoritative round timing is active in multiplayer
- The HUD consumes real round number/phase/timer/win state
- Round-end UI now includes a winner banner plus a simple winning-team MVP line derived from scoreboard kills

## Limitations

- No economy or buy phase
- No spectate / post-death competitive observer flow yet
- No competitive buy/loadout rules yet
- Competitive intermissions still allow movement for pacing; only combat/objective actions are locked
