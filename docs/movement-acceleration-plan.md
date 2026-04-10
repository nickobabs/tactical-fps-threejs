# Movement Acceleration Plan

This note started as the planned next movement pass. Parts of it are now live, so it should be read as a checkpoint plus remaining follow-up notes rather than a purely future plan.

## Status Update 2026-04-10

The first real movement-feel pass is now partially implemented in `src/shared/playerMovement.js`.

Current live behavior now includes:

- softer grounded ramp-in at low speed
- explicit grounded deceleration
- stronger braking when reversing direction
- weapon-relative grounded walk speed through shared input/network simulation

Important follow-up finding:

- the remaining bad counter-strafe / wall-oscillation feel was not primarily caused by the new accel/decel math
- traces still showed `reconciliationAction: ignore` with no buffered correction active
- the misleading feel came from grounded presentation extrapolating desired/input velocity instead of actual simulated velocity
- grounded presentation now follows actual simulated velocity, which resolved both:
  - the fake counter-strafe pullback feel
  - the funny oscillation when pressing into walls

So the next movement pass should tune the current shared model from this cleaner baseline instead of reopening presentation-leading behavior.

## Status Update 2026-04-07

This plan is still relevant, but the latest slowdown investigation showed that the obvious "hang around `4.1-4.5` after direction changes" symptom is not explained solely by the simple acceleration model.

What changed before this finding:

- grounded sprint was removed
- grounded base speed was raised to `4.92`
- crouch speed was raised to `2.64`
- knife movement multiplier is now `1.25`, for an effective knife top speed of `6.15`

What the trace showed:

- `targetSpeed` stayed at `4.92` during the repro
- input flags were clean single-direction `W` / `S`
- actual horizontal speed repeatedly snapped to discrete stale values like:
  - `4.10`
  - `4.5373`
- that is more consistent with stale/replayed horizontal velocity than with intended target-speed logic

Current interpretation:

- the visible slowdown during some direction changes is most likely a reconciliation / replay artifact
- do not treat it as proof that `acceleration: 32` is the primary blocker
- before another broader acceleration/braking redesign, verify whether small grounded corrections are overwriting local horizontal velocity too aggressively

## Goal

Replace the current simple planar velocity lerp in `src/shared/playerMovement.js` with a more deliberate acceleration / braking model that still feels clean and tactical.

Target feel:

- fast acceleration to intended max speed
- visible deceleration instead of instant stops
- meaningful direction-change cost
- counter-strafe works naturally
- no stamina, leaning, crouch-slide, or exaggerated inertia
- rifles remain broadly usable while moving, with the strongest gameplay relevance expected for sniper movement timing

## Current Baseline

Current shared movement uses:

- direct target planar velocity from input
- a single `acceleration` scalar
- planar velocity lerped toward the target every simulation step
- `airControl` as a simple multiplier on that same blend

This is simple and deterministic, but it makes starts, stops, and direction flips too uniform. It does not create a distinct braking phase or a meaningful opposition-input response.

## Planned Implementation

Parts of this section are now implemented conceptually, even though the exact final math differs from the original sketch.

Implement the first pass in `src/shared/playerMovement.js` so both browser prediction and server authority stay aligned.

### 1. Replace planar velocity lerp with more explicit grounded accel/brake behavior

Original intent:

- `velocity = lerp(velocity, targetVelocity, blend)`

Current live interpretation:

- keep deterministic target-velocity movement, but modulate it with:
  - grounded acceleration ramp-in
  - grounded deceleration
  - stronger reversal braking

This gives more control over:

- start acceleration
- braking
- direction change
- air handling

### 2. Split ground movement into explicit behaviors

Add separate tuning values for:

- `groundAcceleration`
- `groundDeceleration`
- `groundOppositionBrake`
- `airAcceleration`
- `airDeceleration` or light air drag

Intended behavior:

- input in same direction as motion: accelerate toward target quickly
- no input: decelerate toward zero
- input against current motion: apply stronger braking before building speed in the new direction

### 3. Keep existing speed caps and movement-state multipliers

Retain the current max-speed model unless intentionally revised again:

- walk
- crouch
- weapon speed multiplier

Current live values:

- walk: `4.92`
- crouch: `2.64`
- knife multiplier: `1.25`
- walk factor:
  - most weapons: `0.5`
  - knife: `0.6`

The new system should change how velocity approaches the cap, not the cap logic itself.

### 4. Preserve clean multiplayer behavior

Requirements:

- deterministic and replay-friendly
- same shared simulation on client and server
- no hidden client-only momentum hacks
- avoid adding new correction noise through unstable movement math

### 5. Keep air movement intentionally limited

Air movement should remain readable and tactical:

- modest air acceleration only
- no Quake-style air movement
- jumping should still feel responsive, but not allow strong mid-air redirection

## Suggested First-Pass Config

The exact numbers will need tuning, but the first implementation should probably expose something close to:

- `groundAcceleration`
- `groundDeceleration`
- `groundOppositionBrake`
- `airAcceleration`
- `airControl`

Likely tuning direction:

- high ground acceleration
- strong but slightly slower no-input deceleration
- strongest braking on opposite input
- light air influence only

## Implementation Order

1. Update `PLAYER_MOVEMENT_DEFAULTS` with new planar movement tuning fields.
2. Replace the planar lerp block in `simulatePlayerMovement()` with an explicit accelerate/brake step.
3. Keep vertical movement, jump, gravity, and ground support behavior unchanged for the first pass.
4. Validate local single-player feel first.
5. Validate local multiplayer correction behavior after that.
6. Treat any new “server pullback” report carefully:
   - check trace data first
   - verify whether it is true correction activity or just presentation leading intent again
7. Only then tune numbers for sniper-feel / counter-strafe behavior.

## Out Of Scope For This Pass

- stamina
- leaning
- crouch-slide
- camera recoil transfer
- weapon accuracy system changes
- animation-driven movement changes
- wall/slope contact jitter fix

## Success Criteria

The first pass is good enough if:

- starting movement still feels responsive
- stopping is no longer instant
- reversing direction is no longer instant
- counter-strafe is readable and controllable
- multiplayer correction does not get noticeably worse
- the system still feels clean rather than slippery
