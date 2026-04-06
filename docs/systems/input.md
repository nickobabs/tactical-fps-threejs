# Input System

## Summary

`InputManager` translates browser keyboard and mouse events into a stable per-frame input snapshot for gameplay systems.

## Inputs

- `keydown` and `keyup`
- `mousemove`
- `pointerdown`
- `mousedown`
- `mouseup`
- `pointerlockchange`
- `contextmenu`

## Outputs

- Key pressed state
- Key just-pressed state
- Mouse look delta
- Mouse button just-pressed state
- Mouse button held state
- Pointer lock state

## Dependencies

- Browser DOM event APIs

## Key Design Decisions

- Pointer lock is requested on first canvas click.
- Mouse look is only accumulated while pointer lock is active.
- Mouse fire input is only registered after pointer lock has been acquired.
- General mouse-down handling is mirrored onto the frame state so multi-button combinations such as hold-right-click plus left-click fire work reliably.
- Browser context menu is suppressed while pointer lock is active.
- Input buffers are cleared only when `consumeFrameState()` is called.
- Frame input is intentionally lightweight and synchronous.

## Current Status

- Implemented and active
- Supports movement keys, jump, sprint, crouch, look, left/right mouse buttons, weapon swapping, pause detection via `Escape`, and pointer lock state tracking
- Current gameplay slot bindings are:
  - `1` rifle
  - `2` pistol
  - `3` knife
  - `4` sniper
