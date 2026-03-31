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

- Separated from the render loop so deterministic simulation can be introduced without rewriting app-level rendering code
- Exposes accumulator state so render-time presentation can still interpolate or extrapolate around the fixed simulation cadence when needed

## Current Status

- Implemented and active
- Currently used by `GameApp` for the local predicted multiplayer movement loop

## Current Role

- Advances local predicted movement at the shared netcode simulation step
- Keeps the browser prediction cadence aligned with the server-authoritative movement cadence
- Leaves render-rate look input, HUD updates, and rendering outside the fixed-step path

## Limitations

- It is currently used for local player prediction only, not for the entire gameplay stack
- If more systems become authoritative later, the ownership boundary around fixed-step simulation will need another pass
