# Fixed Step Loop Utility

## Summary

`FixedStepLoop` is a small helper for advancing simulation work at a stable fixed timestep regardless of render delta.

## Inputs

- Variable frame delta time
- Callback to execute each fixed step

## Outputs

- Repeated callback execution at the configured step size

## Dependencies

- None

## Key Design Decisions

- Separated from the render loop so deterministic simulation can be introduced later without rewriting the helper

## Current Status

- Implemented but not currently wired into `GameApp`
