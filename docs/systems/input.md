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
- Browser default actions are also suppressed for the main debug hotkeys (`F3`, `F6`, `F7`, `F9`, `F10`) so they behave as reliable in-game toggles.
- Input buffers are cleared only when `consumeFrameState()` is called.
- Frame input is intentionally lightweight and synchronous.
- Chat is still HUD-owned rather than `InputManager`-owned:
  - `Enter` opens the chat input
  - `Enter` sends
  - `Escape` cancels
  - `Tab` swaps `[ALL]` / `[TEAM]` while typing

## Current Status

- Implemented and active
- Supports movement keys, jump, sprint, crouch, look, left/right mouse buttons, weapon swapping, pause detection via `Escape`, and pointer lock state tracking
- Also supports HUD-driven chat entry with pointer-lock release/restore around typing
- Current gameplay slot bindings are:
  - `1` rifle
  - `2` pistol
  - `3` knife
  - `4` sniper
- Current movement bindings of note are:
  - `Shift` grounded walk
  - `C` crouch
- Current debug bindings of note are:
  - backquote `` ` `` general debug menu
  - `F4` viewmodel tuning
  - `F6` remote body tuning
  - `F7` remote weapon tuning
  - `F8` net debug
  - `F9` correction toggle
  - `F10` movement trace capture
