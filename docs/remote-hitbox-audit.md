# Remote Hitbox Audit

## Status

This feature is now functionally resolved enough to use for authoritative PvP hit validation.

The current result:

- server-authoritative segmented hit volumes are active
- `F3` authoritative debug now follows the visible remote mesh closely enough to trust during normal play
- head, torso, pelvis, arms, hands, and legs are all driven from the remote skeleton snapshot path

This document is now a record of what actually fixed the branch, not an open handoff for an unsolved system.

## Final Outcome

The branch did not fail because segmented bone-driven hit volumes were a bad idea.

It failed because the authoritative server rig was still evaluating an upper-body pose that did not match the visible client remote mesh.

The decisive fix was:

- removing left-hand IK from the authoritative hitbox rig

That was the major upper-body parity bug.

In practice:

- the visible remote mesh was not consistently using the same left-arm rifle-grip pose that the server rig was solving
- the authoritative left arm and nearby upper-body hit volumes were therefore being pulled into the wrong place
- once authoritative left-hand IK was disabled, the hit volumes snapped back onto the real visible pose

## What Else Was Needed

Several supporting fixes were still required around that core change.

### Server Rig Parity

Important server-side corrections:

- switched the rig clone path to `SkeletonUtils.clone(...)`
- normalized external FBX clip start times
- stripped root motion from imported clips
- matched jump clip behavior more closely with the client baseline
- captured one explicit final post-pose hitbox point set for authoritative use

Relevant file:

- [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)

### Snapshot / Protocol Consistency

- remote snapshot dedupe in the client now includes serialized `hitboxes`
- authoritative hitreg consumes authoritative hitbox snapshots directly

Relevant files:

- [NetworkClient.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/NetworkClient.js)
- [TacticalRoom.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js)

### Head Hitbox Follow

The original head sphere logic was too naive.

The final head solution now:

- builds the head center from a pose-relative basis instead of a fixed world-space offset
- uses neck-to-head direction as the main local up axis
- compensates for the head pivot being too close to the neck by extending farther along that direction

Relevant file:

- [remoteHitboxes.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteHitboxes.js)

## Final Tuned Head Values

The baked shared defaults that matched the visible mesh during the final tuning pass are:

- `headOffset.x = 0`
- `headOffset.y = 0.035`
- `headOffset.z = -0.005`
- `headRadius = 0.15`

These are now reflected in:

- [remoteCharacterConfig.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteCharacterConfig.js)
- [remoteHitboxes.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteHitboxes.js)

## Debug Workflow

### F3

`F3` still shows remote hit volumes.

By default:

- it prefers the authoritative server hitbox snapshot

### F6 Local Hitbox Debug

For tuning, `F6` now includes a `Local Hitbox Debug` toggle.

When enabled:

- `F3` stops preferring the server snapshot
- it rebuilds hitboxes locally from the current visual remote bones
- head offset and head radius tuning in `F6` affect the debug overlay directly

This exists for tuning only.
Real hitreg remains server authoritative.

Relevant file:

- [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)

## Important Files

### Client

- [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)
- [NetworkClient.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/NetworkClient.js)

### Server

- [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)
- [TacticalRoom.js](/C:/Users/nicko/tactical-fps-threejs/server/src/rooms/TacticalRoom.js)

### Shared

- [remoteCharacterConfig.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteCharacterConfig.js)
- [remoteHitboxes.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteHitboxes.js)

## Current Best Interpretation

The correct architecture for this project is:

- authoritative server hit validation
- segmented bone-driven hit volumes
- shared snapshot construction
- a simplified authoritative pose contract rather than trying to mirror every experimental client-side post-process step

The key lesson from this branch is:

- matching the visible remote mesh matters more than adding more complex pose processing
- extra pose stages, especially left-hand IK, are only acceptable if the server and visible client mesh truly share them

## Short Summary

The remote hitbox branch is now in a usable state. The main breakthrough was removing left-hand IK from the authoritative hitbox rig, which was the primary cause of upper-body pose drift relative to the visible remote mesh. Additional server rig fixes, shared hitbox snapshot logic, and a pose-relative head sphere anchor completed the system. Final head tuning values were baked into shared defaults, and `F6` now includes a local hitbox debug mode so future visual tuning can be done safely without changing real server-authoritative hitreg.
