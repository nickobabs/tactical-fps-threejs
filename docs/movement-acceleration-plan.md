# Movement Acceleration Plan

This note captures the planned next movement pass so work can resume cleanly without reconstructing design intent.

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

Implement the first pass in `src/shared/playerMovement.js` so both browser prediction and server authority stay aligned.

### 1. Replace planar velocity lerp with capped accelerate-toward logic

Move from:

- `velocity = lerp(velocity, targetVelocity, blend)`

To:

- compute desired planar velocity from input
- compute current planar velocity
- move planar velocity toward desired velocity by a capped delta per step

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

Retain the current max-speed model:

- walk
- sprint
- crouch
- weapon speed multiplier

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
6. Only then tune numbers for sniper-feel / counter-strafe behavior.

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
