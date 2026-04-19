# Session Note: Remote Hitbox Rewind Parity

## Outcome

The remote rewound hitbox overlay is now visually tight to the remote mesh during fast rifle `A-D-A-D` direction changes and crouch transitions.

This pass closed the main visible "rewound hitbox falls behind, then catches up" problem.

## What Turned Out To Be Wrong

The remaining mismatch was not primarily:

- root rewind timing
- clip selection
- or simple hitbox-shape interpolation

The most important real bug was client-side state mismatch:

- the visible remote root already used the render-time interpolated remote snapshot
- but remote animation playback was still being driven from the newest authoritative snapshot

That meant the visible remote character could evaluate animation from newer state than the state implied by the client-side rewind/debug view.

## Main Changes

### Shared clip-intent evaluation

A shared clip-intent evaluator now exists in:

- [remotePoseEvaluation.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remotePoseEvaluation.js)

Consumers:

- [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)
- [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)

This unified:

- `targetClip`
- delayed base target handling
- base clip selection
- presentation clip selection
- fire-base lock behavior

### Remote animation playback now uses render-time interpolated state

In:

- [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)

The visible remote animation path now uses the render-time interpolated remote player state instead of the newest authoritative snapshot.

This was the decisive fix for the transition lag symptom.

### Interpolated render snapshots now carry interpolated velocity

In:

- [remoteTimeline.js](/C:/Users/nicko/tactical-fps-threejs/src/shared/remoteTimeline.js)
- [NetworkClient.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/NetworkClient.js)

Render-time remote snapshots now carry:

- interpolated `position`
- interpolated `velocity`
- interpolated `yaw`
- interpolated `pitch`
- interpolated `currentHeight`

This removed the earlier "remote player sliding around" regression and keeps transition playback driven by the same temporal slice as the rendered mesh root.

### Snapshot dedupe now respects transition-driving state

In:

- [networkRemoteState.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/networkRemoteState.js)

Remote snapshot dedupe now includes:

- `velocity`
- `hitboxDebug`

This matters because transition-driving state can change even when coarse root position appears nearly unchanged.

### Rewound debug hitboxes are authoritative-derived

Client debug path:

- [remoteHitboxDebug.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/remoteHitboxDebug.js)

Server authoritative sources:

- [remoteHitboxRig.js](/C:/Users/nicko/tactical-fps-threejs/server/src/remoteHitboxRig.js)
- [lagCompensation.js](/C:/Users/nicko/tactical-fps-threejs/server/src/combat/lagCompensation.js)

The rewound debug path now:

- rewinds using authoritative snapshots
- interpolates authoritative raw hitbox points when available
- rebuilds rewound hitboxes from those points

It is no longer just lerping final hitbox volumes, and it is not intended to be a disguised local-hitbox render path.

### Full debug raw-point payload now includes legs

The server debug payload now includes the full point set, including legs, so rewound leg volumes can be rebuilt correctly.

## What We Verified

Trace work across rifle and knife established:

- rewound root timing is effectively solved
- clip-intent mismatches are mostly gone
- the major visible rifle transition lag disappeared after the render-state animation fix

Manual visual verification now says:

- rewound hitboxes look tight on the remote player
- the result looks almost "too perfect," but the current path is still authoritative-derived

## Important Nuance

The `F3` rewound overlay is still a client-side approximation of server rewind, not a literal live render of the server process memory.

But it is now built from authoritative replicated snapshots and authoritative-derived raw points, not from the local fallback hitbox path.

The non-rewound latest debug view can still intentionally fall back to local bone-driven hitboxes when local hitbox debug is enabled.

That is a separate path from the rewound overlay.

## Current Restart Boundary

- client-only presentation/debug changes require a browser refresh
- server-side debug or authoritative hitbox changes require a server restart and browser refresh

At the end of this session, the most recent backend-side fix was the full raw-point debug payload for rewound leg reconstruction.

## Current Checkpoint

This area is in a materially better state:

- visible remote animation timing is aligned with render-time interpolation
- rewound hitbox debug is authoritative-derived and visually trustworthy
- the obvious transition-lag symptom appears fixed

If this area is revisited later, the next work should be validation and hardening, not another blind threshold-tweak pass.
