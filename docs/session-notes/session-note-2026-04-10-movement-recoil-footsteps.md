# Session Note: 2026-04-10 Movement / Recoil / Footsteps

This note captures the current gameplay checkpoint after the recoil pass, movement-feel pass, debug-panel expansion, and first local footstep pass.

## Main Outcomes

- Rifle recoil was moved toward a Counter-Strike-style spray feel:
  - visual recoil and actual bullet recoil now both exist for the rifle
  - the active rifle defaults were tuned live through the new recoil panel and then written back into `src/shared/weaponData.js`
  - pistol recoil/spread tuning is now also exposed through the same panel
- A general debug menu was added on backquote `` ` ``:
  - recoil tuning
  - movement tuning
  - viewmodel tuning
  - remote body tuning
  - remote weapon tuning
- A new movement tuning panel was added:
  - footstep cadence
  - footstep trim duration
  - footstep pitch
  - bob attack / damp
  - bob axis amounts
  - movement pull-back on the viewmodel
- First local footsteps are now active:
  - local player only
  - current surface pool is the `concrete` set under `/audio/players/footsteps/`
  - samples are chosen randomly with a simple non-repeat guard
- Grounded walk was reintroduced on `Shift`:
  - default walk speed is `50%` of the current weapon speed
  - knife walk speed is `60%`
  - walking is intentionally silent
- Grounded shared movement now has explicit accel/decel shaping instead of the earlier simpler feel:
  - slower initial ramp-in
  - separate deceleration
  - stronger reversal braking
- The remaining "server pullback" feel during counter-strafe was traced to local presentation, not a large correction event:
  - grounded presentation had been using desired/input velocity instead of actual simulated velocity
  - switching grounded presentation to actual simulated velocity fixed both:
    - counter-strafe pullback feel
    - the funny oscillation when pushing into walls

## Important Technical Takeaway

The current important movement lesson is:

- canonical/predicted movement should be driven by the shared simulation
- local first-person presentation can add polish, but it should not lead core grounded locomotion using desired input velocity

Using desired velocity for grounded presentation looked responsive in the happy path, but it created false motion whenever the real sim disagreed:

- collision blocking
- braking
- reversal
- small authority cadence gaps

That was the source of multiple misleading “reconciliation” feelings even when the trace showed:

- `reconciliationAction: ignore`
- no buffered correction active
- disagreement almost entirely along movement direction

## Current Gameplay Rules

### Recoil

- Rifle:
  - active live-tuned `visualRecoil` and `sprayRecoil` defaults are now stored in `src/shared/weaponData.js`
  - actual recoil now affects bullet direction, not just the viewmodel
- Pistol:
  - `hipfireSpread` is tunable from the recoil panel
  - pistol now also has tunable `visualRecoil` and `sprayRecoil`
- Recoil panel:
  - opened from the debug menu
  - can export current weapon recoil JSON with `Copy Weapon JSON`

### Footsteps / Bob

- ADS has no bob
- crouch has no bob
- shift-walk has no bob
- footsteps do not play:
  - while walking with `Shift`
  - while crouched
  - whenever actual movement speed is below rifle-walk speed (`2.46`)
- the first audible footstep now comes in earlier after crossing the silent-to-audible threshold so players cannot easily abuse release/repress timing for silent full-speed movement

### Walk / Movement

- `Shift` grounded walking is serialized through the actual multiplayer input path
- `walkSpeedFactor` is also serialized, so weapon-specific walk speed is consistent across:
  - local prediction
  - replay
  - server authority
- current shared grounded movement values in `src/shared/playerMovement.js`:
  - `acceleration: 18`
  - `deceleration: 14`
  - grounded acceleration ramp starts soft and scales up with current speed
  - reversal braking scales up to `2.4x` deceleration

## Debug / Validation Workflow

- Backquote `` ` `` opens the debug menu
- `F4` still opens viewmodel tuning directly
- `F6` still opens remote body tuning directly
- `F7` still opens remote weapon tuning directly
- `F8` still opens live net debug
- `F10` still records movement traces

Movement traces are still written to:

- browser `localStorage` under `tactical-fps-threejs-movement-trace`
- `debug/movement-traces/` through the local/server debug write path

For movement/auth work, restart the server after shared movement or input-protocol changes. Several earlier “maybe fixed / maybe not” outcomes were simply stale server code.

## Next Likely Follow-Ups

- add proper surface-based step selection instead of always using the current concrete pool
- add recoil import/paste support to complement current recoil export
- keep tuning grounded movement now that the misleading grounded presentation lead has been removed
