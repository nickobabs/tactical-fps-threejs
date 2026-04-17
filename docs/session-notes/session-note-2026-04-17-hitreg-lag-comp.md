# Session Note - 2026-04-17 Hitreg Lag Compensation Pass

## Context

PvP hitreg had a clear timeline mismatch during strafing tests.

Observed behavior:

- shooters had to lead ahead of visible remote players to land hits
- shooting directly at the visible head of a strafing player often missed
- both players could disagree on who was visually ahead or behind during the same strafe exchange

Representative repro:

- player 1 and player 2 strafed in front of each other at similar pace
- player 1 aimed directly at the visible head of player 2 and got no hits
- from player 2's view, player 1 appeared behind the position player 1 was actually aiming against

## Root Cause

The main problem was not remote hitbox/mesh parity.

The main problem was client/server timeline mismatch:

- remote players were rendered from delayed snapshots on the client for smoother interpolation
- the interpolation delay had been a hard `100 ms`
- the server still validated shots against the latest live authoritative hitboxes when `player-fire` arrived

Practical result:

- the shooter aimed at a target rendered in the past
- the server tested the shot against a newer target pose
- strafing targets therefore required visible lead even at modest ping

At the grounded movement cap of `4.92 m/s`, `100 ms` of built-in interpolation delay alone is roughly `0.49 m` of target displacement before adding network travel time.

## Implementation Change Made

The fix was intentionally narrow and server-side.

### 1. Server-side lag compensation for hit validation

In [`server/src/rooms/TacticalRoom.js`](../../server/src/rooms/TacticalRoom.js):

- each player now keeps a short rolling history of authoritative hitbox snapshots
- on `player-fire`, the room computes a rewind window from:
  - current remote interpolation delay
  - estimated one-way latency from the shooter's reported RTT
- hit validation now tests against the best historical hitbox snapshot at or before that rewind time

Important boundary:

- this rewind is used for hit validation only
- victim movement is not rewound
- victim movement is not snapped or corrected because of being shot

### 2. Reduced client remote interpolation delay

In [`src/shared/netcode.js`](../../src/shared/netcode.js):

- `NETCODE_REMOTE_INTERPOLATION_DELAY_MS` was reduced from `100` to `67`

Additional shared constants added:

- `NETCODE_LAG_COMPENSATION_MAX_REWIND_MS = 250`
- `NETCODE_SERVER_HITBOX_HISTORY_MS = 300`

## Why This Is The Right Shape

This preserves the current architecture:

- local player remains immediate through prediction
- remote players still get smoothed interpolation
- the server remains authoritative for hit validation

Most importantly, it avoids the wrong fix:

- this is not victim rollback/correction
- it does not drag players backward when they are shot
- it only chooses the correct historical target hitbox for validation

## Current Result

Current read after implementation:

- the visible "shoot ahead of strafing targets" failure mode is materially improved
- current result is good enough to keep moving

The implementation is intentionally simple:

- rewind chooses the latest stored historical snapshot at or before the rewind time
- it does not yet interpolate between two historical hitbox snapshots
- rewind timing is based on reported RTT estimate plus interpolation delay, not a full clock-synced shot timestamp model

## Important Debug Note

`F3` hit-volume debugging can hide the original problem if used carelessly.

Reason:

- hit-volume debug can force remote visuals onto the latest authoritative state for inspection
- that is useful for hitbox parity checks
- but it is not the same timeline the shooter normally sees during ordinary interpolated play

So:

- use ordinary gameplay view to judge whether visible lead is required
- use `F3` primarily to judge hitbox/pose parity, not timeline fairness

## Follow-Up

If this area needs more work later, investigate in this order:

1. Validate whether `67 ms` is still too conservative or too aggressive for current snapshot cadence.
2. Decide whether historical hitbox lookup should interpolate between stored snapshots instead of using nearest-at-or-before.
3. Consider whether player-fire should eventually carry a stronger shared-time reference instead of relying only on RTT-derived rewind.
4. Re-test rifle, pistol, and sniper separately, especially:
   - lateral strafes
   - crossing targets at close range
   - crouch-strafing
   - jump landings into immediate shots
5. Re-check hitreg after any major remote animation or hitbox-rig changes, because better/worse pose parity can be mistaken for timeline bugs.

## Relevant Files

- [`src/shared/netcode.js`](../../src/shared/netcode.js)
- [`src/game/networking/NetworkClient.js`](../../src/game/networking/NetworkClient.js)
- [`src/game/networking/RemotePlayerPresenter.js`](../../src/game/networking/RemotePlayerPresenter.js)
- [`server/src/rooms/TacticalRoom.js`](../../server/src/rooms/TacticalRoom.js)
- [`server/src/remoteHitboxRig.js`](../../server/src/remoteHitboxRig.js)
- [`docs/systems/networking.md`](../systems/networking.md)
