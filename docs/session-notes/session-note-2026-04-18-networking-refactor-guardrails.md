# Session Note - 2026-04-18 Networking Refactor Guardrails

## Context

This session started as the first new refactor slice for the current multiplayer/hitreg work.

The main goal was not broad cleanup. The goal was to remove duplicated remote-timeline logic from the places that currently matter most:

- client remote interpolation in `NetworkClient`
- client rewind debug in `RemotePlayerPresenter`
- server lag-compensation rewind in `TacticalRoom`

That extraction was valuable, but it also exposed an important networking failure mode that needs to be treated as a standing refactor rule going forward.

## Refactor Slice Completed

A new shared timeline module now exists in [`src/shared/remoteTimeline.js`](../../src/shared/remoteTimeline.js).

It owns:

- monotonic timeline time through `getTimelineNow()`
- numeric interpolation through `lerpNumber()`
- yaw interpolation through `interpolateAngle()`
- lag-comp rewind window calculation through `getLagCompensationRewindMs()`
- snapshot-pair lookup through `getSnapshotPairAtTime()`
- remote snapshot interpolation through `interpolateRemotePlayerSnapshotAtTime()`
- hitbox-history interpolation through `interpolateRemoteHitboxHistoryAtTime()`

It is now used by:

- [`src/game/networking/NetworkClient.js`](../../src/game/networking/NetworkClient.js)
- [`src/game/networking/RemotePlayerPresenter.js`](../../src/game/networking/RemotePlayerPresenter.js)
- [`server/src/rooms/TacticalRoom.js`](../../server/src/rooms/TacticalRoom.js)

This was the right first extraction because it removed duplicated timeline math from client render, client debug, and server authority paths.

## Regression Introduced

After the refactor, joining the server could cause repeated new Colyseus sessions to appear.

Observed behavior:

- the server filled with real new players
- the extra players were clones of the joining user
- the issue only happened once a real browser client joined
- Colyseus reported actual joins with different session IDs
- if no browser client joined, the server stayed stable

This was not a fake remote-visual duplication problem.

It was a real reconnect/join churn problem.

## Root Cause

The most plausible and now effectively confirmed cause was stale room lifecycle callbacks.

Practical failure shape:

1. a browser client joined successfully
2. an older room lifecycle callback fired later
3. the client treated that stale callback as if it belonged to the active room
4. the client reset live room state and scheduled reconnect
5. reconnect created a fresh Colyseus session
6. the cycle repeated

This is exactly the kind of bug that can appear after a refactor even when the extracted math is correct, because networking failures are often about ownership and lifecycle rather than the extracted utility itself.

## Fix Applied

[`src/game/networking/NetworkClient.js`](../../src/game/networking/NetworkClient.js) now tracks room ownership explicitly.

Key changes:

- each `NetworkClient` instance now has an `instanceId`
- each connect attempt advances an `activeRoomToken`
- room callbacks ignore events that do not belong to the current active room/token
- connection lifecycle events are recorded for diagnostics
- the recent event history is exposed through diagnostics and browser globals

Important behavioral change:

- stale `onLeave` and `onError` callbacks can no longer tear down a newer active connection

This resolved the observed clone/join spam in local testing.

## Important Lessons

### 1. Shared math extraction is not enough

Refactoring timeline logic out of three systems was still correct.

But the regression came from connection ownership assumptions, not interpolation behavior.

So future networking refactors need to audit:

- who owns the active room
- who is allowed to mutate connection state
- which callbacks are still valid when they fire

### 2. Networking refactors need explicit stale-callback guards

Any async room/client callback should be treated as potentially stale.

That includes:

- `connect()` completion
- `onLeave`
- `onError`
- delayed reconnect timers
- any future reconnect/resume flow

The rule is:

- do not let an older connection callback mutate the currently active connection state unless it has been positively verified as current

### 3. Real-time systems now have multiple timelines and multiple lifetimes

The gameplay discussion earlier focused on multiple timelines:

- latest authority
- rendered remote time
- rewound hitreg time

This session added a second important distinction:

- connection lifetime is separate from gameplay timeline

Those two concerns should not be blurred together in future refactors.

### 4. Instrumentation should stay in place during active networking refactors

The added connection diagnostics were not just for debugging convenience.

They made it possible to distinguish:

- fake remote duplication
- multiple live client instances
- one client repeatedly reconnecting
- stale callbacks from superseded rooms

That instrumentation is worth keeping while multiplayer structure is still evolving.

## Working Guardrails For Future Refactor Slices

Use these rules for future networking/combat refactors:

1. Preserve explicit ownership of the active room/client connection.
2. Treat every async room callback as stale until proven current.
3. Keep shared timeline math separate from connection lifecycle logic.
4. Prefer narrow extractions that reduce duplicated rules without changing lifecycle semantics at the same time.
5. Leave connection diagnostics in place until multiplayer lifecycle feels boring and predictable.
6. Rebuild after every slice and validate actual join/leave behavior, not just gameplay behavior.

## Practical Next Refactor Direction

The timeline extraction was still the right first step.

The next good refactor targets remain narrow and ownership-driven:

1. keep `remoteTimeline.js` as the single home for shared render/rewind interpolation rules
2. continue avoiding broad rewrites in `RemotePlayerPresenter`
3. only extract more server hitreg/lag-comp code from `TacticalRoom` when the new ownership boundary is obvious
4. when touching `NetworkClient` again, preserve the room-token ownership pattern as a non-negotiable rule

## Relevant Files

- [`src/shared/remoteTimeline.js`](../../src/shared/remoteTimeline.js)
- [`src/game/networking/NetworkClient.js`](../../src/game/networking/NetworkClient.js)
- [`src/game/networking/RemotePlayerPresenter.js`](../../src/game/networking/RemotePlayerPresenter.js)
- [`server/src/rooms/TacticalRoom.js`](../../server/src/rooms/TacticalRoom.js)
- [`docs/refactor-progress.md`](../refactor-progress.md)
- [`docs/systems/networking.md`](../systems/networking.md)
- [`docs/session-notes/session-note-2026-04-17-hitreg-lag-comp.md`](./session-note-2026-04-17-hitreg-lag-comp.md)
