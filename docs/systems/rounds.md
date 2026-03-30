# Round System

## Summary

`RoundManager` tracks a minimal round lifecycle with `freeze` and `live` phases and advances round count over time.

## Inputs

- Frame delta time

## Outputs

- `roundNumber`
- Current phase string
- Internal phase timer

## Dependencies

- None

## Key Design Decisions

- Time-driven prototype logic instead of event-driven win conditions
- Designed as a placeholder for later objective and team-state integration

## Current Status

- Implemented and active
- Suitable for HUD verification only

## Limitations

- No round win conditions
- No player spawns by team
- No economy reset or purchase phase logic
