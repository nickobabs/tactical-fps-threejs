# HUD System

## Summary

`createHud()` builds the main DOM overlay shell. The HUD now coordinates the pause menu, team-select overlay, debug HUD, classic HUD, scoreboard, objective widgets, and multiplayer debug surfaces through smaller controllers.

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
- Team-select overlay DOM and interaction handlers
- Scoped overlay and rifle ADS reticle state
- Map-loading overlay state
- Top-center round roster, score, and timer/icon state
- Optional live multiplayer debug overlay and console summaries
- Classic HUD / debug HUD mode switching
- Scoreboard rendering
- Objective widgets such as plant/defuse progress
- Round-win banner and MVP copy
- Killfeed rendering with weapon/headshot icons
- HUD layout tuning/debug overlays

## Dependencies

- Browser DOM APIs
- CSS in `src/styles/main.css`
- `createPauseMenu`
- `createTeamSelectOverlay`
- `hudClassic`
- `hudScoreboard`
- `hudObjectiveWidgets`
- `hudDebugPanels`
- `pauseMenuBindings`

## Key Design Decisions

- DOM UI is faster to iterate than world-space UI for a prototype
- HUD reads runtime state from systems directly during `update()`
- Crosshair is pure CSS
- The pause menu is part of the HUD tree so it can share styling and be toggled without mounting a separate UI root
- Team selection is also HUD-driven and currently blocks normal pause-menu resume flow on initial map load
- Pause-menu option lists for maps and skyboxes are data-driven so new entries do not require hardcoded UI branches
- The sniper scope overlay and rifle ADS reticle are distinct UI states
- The sniper scope overlay now also acts as an accuracy readout by blurring/fading while sniper accuracy is degraded
- Static pause-menu binding text is isolated from HUD runtime code so future menu changes do not require editing the whole HUD module
- HUD text and toggle updates now only touch the DOM when displayed values actually change, rather than rewriting every element every frame
- Multiplayer debug tooling is intentionally kept in the HUD path for now because it is the fastest way to compare local feel against network/correction state during active development
- HUD responsibilities are now split by controller instead of keeping all rendering logic in one file
- Pause-menu settings now use real runtime values and persist locally in browser `localStorage`
- The top-center round HUD is now the primary round timer surface:
  - player icons are team-colored and fade/greyscale on death
  - the round score stays center-anchored between the two teams
  - planted-bomb state swaps the timer text to a red C4 icon
- HUD layout tuning is intentionally CSS-variable-driven so live slider changes can update the DOM immediately without rebuilding the HUD
- Killfeed preview tuning is intentionally part of the HUD debug flow so bodyshot/headshot and rifle/pistol variants can be matched against the real live feed

## Current Status

- Implemented and active
- Includes:
  - pause/resume flow
  - team-select flow with player-name input
  - key bindings view
  - map selection view
  - skybox selection view
  - volume control
  - sensitivity control with numeric feedback
  - horizontal FOV control
  - FPS display
  - scoped reticles
  - centered map-loading overlay
- Includes hold-`Tab` scoreboard overlay with two team panels, player name/kills/deaths/ping columns, and live team score display
- Includes a toggleable classic HUD mode inspired by Source plus the older debug HUD mode
- Includes planted-bomb timer/state and plant-progress feedback
- Includes defender defuse progress feedback through the same objective widget path
- Includes a CS-style top-center round strip with:
  - defender/attacker player icons
  - dead-state greyscale/fade
  - center-anchored round score
  - top round timer that swaps to a C4 icon while the bomb is planted
- Includes a centered round-win banner with win-reason subtitle and a simple winning-team MVP line
- Includes timed transition banners for side swap, overtime start, and match restart
- Includes a top-right killfeed with:
  - team-colored killer/victim names
  - rifle and pistol SVG weapon icons
  - headshot marker support
  - content-width cards capped by a tunable max width
- Includes 4-way directional damage indicators around the crosshair
- HUD structure is now split across smaller files for scoreboard, classic HUD, objective widgets, and debug panels
- Pause-menu values for volume, sensitivity, and horizontal FOV now persist locally per browser
- Includes draggable HUD tuning/debug panels so tuning workflows do not have to overlap the live HUD they are inspecting
- Includes HUD layout tuning for:
  - top-center round roster offsets
  - round-win banner position
  - transition-banner position for side swap / overtime and match restart variants
  - planted bomb icon sizing/offsets/pulse scale
  - killfeed position, border, spacing, and per-variant icon tuning
  - dummy killfeed preview variants for rifle/pistol and headshot/bodyshot
  - dummy round-win and transition-banner previews for HUD positioning
  - variant-specific killfeed tuning now follows the actual live branches:
    - rifle body
    - rifle headshot
    - pistol body
    - pistol headshot
  - the panel now hides irrelevant rifle/pistol and body/headshot controls based on the current preview selection
- Includes multiplayer diagnostics:
  - `F8` toggles `NETDEBUG`
    - live panel now includes a `Copy` button so the exact text can be pasted without screenshots
    - ping/network fields now include:
      - `server_url`
      - `ping_rtt_ms`
      - `ping_avg_ms`
      - `ping_server_turn_ms`
      - `ping_net_est_ms`
      - `ping_age_ms`
      - `ping_pending`
  - `F9` state is shown in the HUD network line
  - `F10` toggles a local movement trace capture
    - active capture is shown in the movement line as `TRACE(F10)`
    - trace data is stored in browser `localStorage` under `tactical-fps-threejs-movement-trace`
    - the same payload is also written through the Node/Colyseus server to `debug/movement-traces/`
    - current trace/debug fields now include:
      - correction action
      - replay input count
      - authoritative/current/replay positions
      - horizontal vs vertical correction split
      - correction projected along velocity/input direction
      - cadence-normalized drift fields for later analysis
    - `F8` copy exports the live panel text, while `F10` remains the trace/file workflow
    - `localStorage` export helper:
      - `copy(localStorage.getItem('tactical-fps-threejs-movement-trace'))`
- Current local movement line now also exposes support debugging fields:
  - `support`
  - `gd`
  - `floor`

## Near-Term Direction

- Keep the current multiplayer debug surface available while movement, jumps, ramps, and future combat authority are validated
- Revisit whether some of the debug dump logic should move out of the HUD once multiplayer behavior is more settled
