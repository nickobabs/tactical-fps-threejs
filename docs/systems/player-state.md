# Player State System

## Summary

`PlayerState` is a lightweight data holder for player meta-state such as health, armor, team, and starting money.

## Inputs

- Constructor defaults only

## Outputs

- A plain gameplay state object

## Dependencies

- None

## Key Design Decisions

- Kept intentionally minimal while gameplay scaffolding is still forming
- Separate from movement controller so simulation state can evolve independently later

## Current Status

- Implemented but not yet integrated into the active runtime
