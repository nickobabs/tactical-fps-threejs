# Networking System

## Summary

`NetworkClient` is now an active additive multiplayer bridge that connects the browser game to a standalone Colyseus server in `server/`.

The current networking slice supports:

- Joining a shared `TacticalRoom`
- Server-assigned player identity through Colyseus session IDs
- Client-to-server per-step input snapshots
- Server-authoritative player positions derived from those inputs
- A fixed-rate authoritative room simulation on the server
- Client-side local movement prediction with replay-based reconciliation and a separate local presentation layer
- Remote-player placeholder rendering through replicated authoritative state

Multiplayer is still optional. If no Colyseus server is reachable, the game continues to run fully in single-player mode.

## Inputs

- Frame delta time
- Local player input snapshots
- Colyseus room lifecycle events
- Server-authenticated player-state snapshots

## Outputs

- Connection-state visibility for HUD/debugging
- Remote player authoritative transforms for rendering
- Local authoritative corrections for reconciliation

## Dependencies

- `colyseus.js`
- Standalone Colyseus Node server in `server/`
- Shared movement simulation in `src/shared/playerMovement.js`
- Shared netcode timing constants in `src/shared/netcode.js`
- Shared protocol normalization/helpers in `src/shared/netcodeProtocol.js`
- Shared authoritative map collision layouts in `src/shared/maps/`

## Key Design Decisions

- Multiplayer remains additive. Failure to connect must never block local single-player runtime.
- The first authoritative movement pass sends inputs, not positions.
- Clients seed the server with their initial spawn state once, then switch over to input snapshots for ongoing movement.
- Movement simulation is factored into a shared module so client and server can evolve toward a common movement model instead of duplicating magic numbers.
- Timing constants and message-shape normalization are also shared so the room and browser client do not drift on protocol assumptions.
- The earlier "send latest input at 20 Hz while the server reuses it at 60 Hz" model has been removed because it caused stale-input drift, most visibly as a small forward correction after sprint release.
- The room now queues received inputs and consumes each one once in order instead of repeatedly simulating a single latest input across multiple server ticks.
- The client still moves immediately for responsiveness, then reconciles to server authority using the server's last processed input sequence.
- Reconciliation now updates predicted simulation state directly, while the presented local rig absorbs moderate correction error over time instead of applying every correction straight to the camera.
- Small local drift is intentionally ignored. Local correction now uses a deadzone and hysteresis model so the client only starts converging once divergence is meaningfully above threshold, and stops once it has settled back into a smaller band.
- Remote players are currently rendered as simple placeholders rather than full replicated first-person rigs.
- The server-side simulation now uses shared authored collision primitives for map-aware authoritative movement, but it still does not share the browser's full rendered map assembly path.

## Current Status

- Implemented and active
- Two local browser tabs can join the same `TacticalRoom`
- Remote players appear as simple blue box proxies
- Connection state and remote-player count are visible in the HUD
- Server authority and reconciliation are wired end-to-end for player movement
- Server authority now uses shared map collision for `Training Ground` and `Desert Compound`
- Server authority also loads imported collision glTF data for `Dust2 Import Test`
- `NETDEBUG` instrumentation exists in the HUD/devtools path for local multiplayer diagnosis and is intentionally being kept available while multiplayer expands

## Limitations

- Server/client movement can still diverge intermittently because the browser map runtime and the server collision runtime are not yet driven from one single source of truth
- Bots, rounds, weapons, damage, and world interactions are still local-only and are not yet synchronized
- Local movement feel is now materially improved by correction deadzone/hysteresis, but this still needs validation across more cases like ramps, jump arcs, and future combat-driven correction
- A current blocker remains: with corrections enabled, players can still eventually phase through walls after sustained pressure against blockers
- The earlier sprint-release forward nudge was improved by changing input transport, but wall phasing is still unresolved and now appears to be primarily a collision/authoritative-state problem rather than a simple stale-input problem

## Investigation Notes

- Input-authoritative movement, replay-based reconciliation, remote interpolation, shared map collision primitives, and weapon speed-multiplier sync are all in place.
- Instrumentation showed that the worst earlier issue, constant server correction on every authoritative update, was real and was substantially reduced after syncing weapon speed multipliers through the protocol.
- Later instrumentation showed the remaining choppy feel was still tied to frequent tiny local corrections rather than render frametime or major drift.
- Current `NETDEBUG` captures indicate that local flat-ground movement no longer suffers from severe network backlog or large authoritative drift. Typical values have shown:
  - sequence gap around `1-2`
  - authoritative update cadence around `20 Hz`
  - predicted drift and correction distance typically around `0.02-0.03`, with small occasional spikes
  - presentation offset usually small as well
- The most useful A/B check was toggling local correction off entirely. With correction disabled, local movement felt effectively correct, which confirmed that the remaining issue was correction policy rather than render cadence.
- The current working baseline is to trust local prediction for tiny drift and only begin convergence once the correction clears a meaningful threshold.

## Tried And Observed

- Shared authoritative collision on the server:
  - Improved correctness around authored geometry, but did not resolve the local flat-ground feel issue.
- Local presentation interpolation:
  - Reduced visible stepping, but added noticeable local lag.
- Removing local interpolation:
  - Removed some lag but brought back visible frizz/step artifacts.
- Velocity-based local extrapolation:
  - Removed the worst visible frizzing from 60 Hz local stepping.
- Raising the local-only simulation cadence to `120 Hz`:
  - Helped somewhat, but did not fully restore single-player feel.
- Adding local correction deadzone and hysteresis:
  - This was the first change that clearly passed the eye test.
  - It removed the constant micro-correction feel by refusing to react to tiny disagreement every server update.
  - This is now the active baseline rather than an experiment.
- Switching from "latest input resent at 20 Hz" to immediate per-step input sends plus ordered server-side input queueing:
  - Removed the obvious post-sprint forward correction symptom.
  - Did not resolve the wall-phasing issue under sustained pressure.
- Preserving local yaw/pitch during reconciliation:
  - Fixed the earlier correction-induced mouse-look degradation.
  - Was not related to wall phasing itself.
- Making buffered and hard-snap corrections collision-aware:
  - Reduced obvious direct correction bypasses.
  - Did not fully eliminate wall phasing.

## Current Conclusion

- The local-player path is now in a meaningfully better place.
- The current baseline is:
  - immediate local movement feel from client prediction
  - server authority retained for meaningful divergence
  - tiny correction ignored through deadzone/hysteresis
- The architecture still benefits from keeping local presentation, predicted canonical state, and authoritative server state separate, but that is now an evolution path from a working baseline rather than an unresolved crisis.
- However, collision correctness under sustained wall pressure is not solved yet. The most likely remaining issue is the current hollow-shell blocker model plus the custom capsule response in `CollisionWorld`, not basic input cadence or local camera reconciliation.

## Reset Plan

- Target outcome:
  - local movement should feel effectively single-player under normal conditions
  - server authority should still own correction, validation, and future combat/gameplay truth
  - server cadence should not be directly visible in ordinary local locomotion
- New architecture goal:
  - `Immediate Local Presentation State`
    - first-person camera/viewmodel feel
    - render-rate responsive
    - should not inherit routine server refresh cadence
  - `Predicted Canonical State`
    - fixed-step local gameplay prediction
    - source of sent inputs and replay/reconciliation
  - `Authoritative Server State`
    - final truth for validation, correction, and later damage/combat authority
- Implementation direction:
  - simplify the current local presentation path first
  - separate first-person feel from predicted canonical movement explicitly
  - only let server correction become visible when divergence is significant
  - keep remote-player interpolation separate from local-player presentation concerns

## Near-Term Plans

- Consolidate map geometry so client visuals/collision and server authority are generated from the same shared layout source
- Validate the current correction model against more gameplay cases such as jumps, ramps, weapon swaps, and eventual damage/combat correction
- Move additional gameplay state, starting with round state and combat-relevant actors, toward server authority as needed
- Keep the current debug instrumentation in place until those validation passes are done, since it is now part of the practical multiplayer workflow
