# Session Note: Shared Pose Parity Plan

## Why This Matters

The remaining remote hitbox/presentation mismatches are no longer mainly about rewind timing.

The deeper issue is pose evaluation parity:

- visible remote presentation uses animation interpolation / fading / layer timing
- authoritative hitbox evaluation still uses mostly discrete state switches

That gap shows up in:

- crouch-fatigue transitions
- fast `A-D-A-D` direction changes
- crouch spam
- short state-boundary windows where the mesh and authoritative hitboxes are both "correct" by state name, but not by actual interpolated pose

## What We Confirmed Today

### Remote crouch traces

File-backed remote animation traces were added and written to:

- `debug/remote-animation-traces/`

These traces confirmed:

- the earlier stale locomotion carryover bug during crouch transitions was real
- the later carryover fix removed the worst `idle + walk/strafe memory` cases
- slower full crouches now mostly look correct
- medium-fast crouch toggles often remain in `idle` because the shared crouch-height threshold is not crossed deeply enough

That last behavior is not really the core bug. It is a symptom of the bigger architectural limitation:

- clip-family selection still depends on thresholding a continuous crouch transition
- authoritative hitbox pose still does not evaluate the same blend path as the visible presenter

## Agreed Direction

Do not keep stacking narrow threshold tweaks as the main long-term fix.

Instead, the next real-quality step is:

### Shared pose/blend evaluation

Build a shared pose-state layer that both consume:

- `src/game/networking/RemotePlayerPresenter.js`
- `server/src/remoteHitboxRig.js`

This shared layer should be driven by continuous inputs such as:

- `currentHeight`
- normalized crouch fraction
- velocity / horizontal speed
- yaw-relative movement direction
- fire/death action timers
- idle-entry / locomotion transition timing

The key goal is:

- what the crouching player sees
- what remote players see
- what the server validates

should all be much closer to the same pose over time, not just the same named animation state.

## Practical Shape Of The Next Pass

### Phase 1: shared pose-state evaluation

Extract a shared helper/module that computes:

- crouch fraction from `currentHeight`
- locomotion family
- stand vs crouch blend intent
- transition timing / fade intent
- action layer timing inputs

This module should not own Three.js mixer objects. It should only decide pose/blend state.

### Phase 2: client presenter consumption

Make `RemotePlayerPresenter` consume that shared pose/blend state rather than re-deciding the important state transitions locally.

### Phase 3: authoritative rig consumption

Make `remoteHitboxRig` consume the same shared pose/blend state so the authoritative hitbox rig follows the same transition model.

### Phase 4: only then revisit clip thresholds

After pose/blend parity exists, retune crouch thresholds or hysteresis only if needed.

## Working Rule

Do not treat "raw crouch boolean changed" or "target clip changed" as sufficient for hitbox parity.

The shared truth should move toward:

- continuous crouch fraction
- shared transition/blend timing
- shared pose-state evaluation before side-specific playback

## Current Checkpoint

Before this plan starts, the following are true:

- remote animation trace capture now exists on `F11`
- traces are stored in browser `localStorage` and written to `debug/remote-animation-traces/`
- stale crouch locomotion carryover was reduced
- current medium-fast crouch behavior is explainable from the trace, but not yet "true parity"

That makes this a good checkpoint for a new branch/pass aimed at shared pose parity rather than another isolated fix.
