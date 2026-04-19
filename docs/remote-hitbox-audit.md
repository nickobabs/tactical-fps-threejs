# Remote Hitbox Audit

## Status

This branch is now in a usable checkpoint state for authoritative PvP hit validation.

Current result:

- server-authoritative segmented hit volumes are active
- the `F3` rewound overlay follows the visible remote mesh closely enough to trust during normal play
- the original high-value bug, rewound hitboxes visibly falling behind the remote mesh during direction changes and crouch transitions, is functionally resolved

This document records the current best understanding of what actually fixed the branch and what remains open.

## What Actually Fixed The Main Problem

The main visible rewind mismatch was not primarily:

- rewind timestamp selection
- clip-selection disagreement
- or final-volume interpolation alone

The decisive fix path was:

1. shared clip-intent evaluation between client presentation and server authoritative rig
2. client visible remote animation switching to render-time interpolated remote state instead of the newest authoritative snapshot
3. rewound debug hitboxes rebuilding from authoritative-derived raw points instead of only lerping final hit volumes
4. server hitbox history also carrying raw points for better rewind reconstruction

In practice, the biggest real bug was that the visible remote mesh and the rewind/debug view were evaluating from different temporal slices of remote state.

Once remote animation playback used the same render-time interpolated state as the visible root, the rewound overlay tightened up dramatically.

## Supporting Fixes That Matter

### Shared Client/Server Pose Intent

Shared clip-intent evaluation now lives in:

- [remotePoseEvaluation.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remotePoseEvaluation.js)

Consumers:

- [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)
- [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)

This reduced policy drift in:

- target clip
- delayed idle-entry behavior
- base clip vs presentation clip
- fire-base lock behavior

### Render-Time Remote Snapshot Consistency

Shared interpolation now includes transition-driving state, not only root transform:

- [remoteTimeline.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteTimeline.js)

Remote snapshot dedupe now also respects transition-driving data:

- [networkRemoteState.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/networkRemoteState.js)

This matters because animation parity can still break even when coarse position changes are tiny.

### Authoritative-Derived Rewind Debug

Relevant files:

- [remoteHitboxDebug.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteHitboxDebug.js)
- [lagCompensation.js](/C:/Users/nicko/tactical-fps-threejs/server/src/combat/lagCompensation.js)
- [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)

The rewound debug path now:

- rewinds against replicated authoritative snapshots
- interpolates authoritative raw points when available
- rebuilds hit volumes from those points

Important nuance:

- this is still a client-side reconstruction of authoritative state
- it is not a literal render of server process memory
- but it is authoritative-derived, not a disguised local fallback path

### Team-Specific Authoritative Rig Selection

The server authoritative rig is no longer hardcoded to one player model.

Relevant files:

- [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)
- [TacticalRoom.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js)

This was the correct architectural fix even though it did not end up being the main remaining head-fit issue.

### Idle Weapon-Switch Carryover Parity

The client presenter and server rig now share the same melee/non-melee locomotion-boundary carryover reset rule for idle weapon switches.

Relevant files:

- [remoteCharacterConfig.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteCharacterConfig.js)
- [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)
- [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)

That removes another small but real client/server drift risk.

## Final Tuned Shared Defaults

Current baked defaults in [remoteCharacterConfig.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteCharacterConfig.js):

- `headOffset = { x: 0, y: 0.035, z: -0.005 }`
- `headRadius = 0.15`
- `headSize = { x: 0.24, y: 0.3, z: 0.255 }`
- `torsoTopOffset = { x: 0, y: 0, z: 0.035 }`
- `pelvisRadius = 0.2`
- `pelvisLengthPadding = -0.12`

The torso-top offset is applied in torso-local axes, not raw world `x/z`, so it rotates correctly with the mesh.

## Current Remaining Caveat

One issue remains intentionally unresolved for now:

- the head hit volume still does not perfectly match the visible mesh at the most extreme pitch angles

What we learned:

- this is no longer mainly a rewind problem
- it is also not mainly a torso-offset problem
- the remaining issue is head-fit and head-orientation inference at pitch extremes

Recent work improved correctness here:

- head basis is orthonormalized
- extreme-pitch turning now has a degeneracy/sign guard to reduce morphing and snapping

But the head volume still does not follow the visible skull perfectly in the hardest edge cases.

## Debug / Tuning Workflow

### F3

`F3` remains the main remote hitbox visualizer.

Current behavior:

- latest view prefers authoritative hitboxes unless local hitbox debug is enabled
- rewound view is authoritative-derived from replicated snapshots/raw points

### F6

`F6` remains the local tuning surface.

Useful current controls:

- head offset / head size tuning
- pelvis radius / length tuning
- torso top offset tuning
- local hitbox debug toggle

This exists for tuning only. Real hitreg remains server authoritative.

## Later Revisit Idea

If the max-pitch head-fit issue is revisited later, a promising direction is to add helper sockets or marker bones on the character model rather than continuing to infer head orientation only from `head` / `neck` / clavicle points.

For example:

- `head_center`
- `head_front`
- `head_top`
- optionally `head_back`

Why this is attractive:

- it reduces inference
- it gives the hitbox builder stable authored anchors
- it is easier to reason about than stacking more basis heuristics on top of a small set of moving points

Main tradeoff:

- it requires asset work and consistent support across remote character models

## Best Current Interpretation

The correct architecture for this project still looks like:

- authoritative server hit validation
- segmented bone-driven hit volumes
- shared snapshot construction rules
- shared pose-intent policy
- authoritative-derived rewind debug

The key lesson from this branch is:

- matching the visible remote mesh temporally and structurally matters more than piling on more ad hoc heuristics

## Short Summary

The remote hitbox branch is now in a strong checkpoint state. The major rewind-parity problem was solved by aligning visible remote animation with render-time interpolated remote state and by rebuilding rewound debug hitboxes from authoritative-derived raw points. Additional parity fixes around team-specific server rigs, snapshot state consistency, local-axis torso tuning, and shared weapon-switch carryover rules hardened the system further. The remaining known caveat is head-fit at extreme pitch angles, which is better understood now but intentionally left for later work.
