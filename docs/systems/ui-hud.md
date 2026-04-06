# HUD System

## Summary

`createHud()` builds the main DOM overlay shell, while `createPauseMenu()` owns the pause menu subtree and interactions.

## Inputs

- Root DOM container
- `InputManager`
- `RoundManager`
- `WeaponManager`
- `UtilityManager`
- `FirstPersonController`
- FPS getter callback
- Resume callback
- Map selection callback plus map option data
- Skybox selection callback plus skybox option data
- Sensitivity getter and change callback
- Network/correction debug getters and snapshot callbacks

## Outputs

- HUD DOM elements appended to the app root
- Per-frame text updates
- Pause menu DOM and interaction handlers
- Scoped overlay and rifle ADS reticle state
- Map-loading overlay state
- Optional live multiplayer debug overlay and console summaries

## Dependencies

- Browser DOM APIs
- CSS in `src/styles/main.css`
- `createPauseMenu`
- `pauseMenuBindings`

## Key Design Decisions

- DOM UI is faster to iterate than world-space UI for a prototype
- HUD reads runtime state from systems directly during `update()`
- Crosshair is pure CSS
- The pause menu is part of the HUD tree so it can share styling and be toggled without mounting a separate UI root
- Pause-menu option lists for maps and skyboxes are data-driven so new entries do not require hardcoded UI branches
- The sniper scope overlay and rifle ADS reticle are distinct UI states
- Static pause-menu binding text is isolated from HUD runtime code so future menu changes do not require editing the whole HUD module
- HUD text and toggle updates now only touch the DOM when displayed values actually change, rather than rewriting every element every frame
- Multiplayer debug tooling is intentionally kept in the HUD path for now because it is the fastest way to compare local feel against network/correction state during active development

## Current Status

- Implemented and active
- Includes pause/resume flow, key bindings view, map selection view, skybox selection view, volume control, sensitivity control with numeric feedback, horizontal FOV control, FPS display, scoped reticles, and a centered map-loading overlay
- The file structure is now split so HUD shell logic and pause-menu construction are no longer in one file
- Includes multiplayer diagnostics:
  - `F8` toggles `NETDEBUG`
  - `F9` state is shown in the HUD network line
  - `F10` can trigger an immediate debug summary dump for stutter/correction capture

## Near-Term Direction

- Keep the current multiplayer debug surface available while movement, jumps, ramps, and future combat authority are validated
- Revisit whether some of the debug dump logic should move out of the HUD once multiplayer behavior is more settled
