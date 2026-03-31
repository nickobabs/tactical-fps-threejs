# Networking System

## Summary

`NetworkClient` is now an active additive multiplayer bridge that connects the browser game to a standalone Colyseus server in `server/`.

The current networking slice supports:

- Joining a shared `TacticalRoom`
- Server-assigned player identity through Colyseus session IDs
- Client-to-server input snapshots at roughly 20 Hz
- Server-authoritative player positions derived from those inputs
- A fixed-rate authoritative room simulation on the server
- Client-side local movement prediction with simple snap reconciliation
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

## Key Design Decisions

- Multiplayer remains additive. Failure to connect must never block local single-player runtime.
- The first authoritative movement pass sends inputs, not positions.
- Clients seed the server with their initial spawn state once, then switch over to input snapshots for ongoing movement.
- Movement simulation is factored into a shared module so client and server can evolve toward a common movement model instead of duplicating magic numbers.
- The client still moves immediately for responsiveness, then reconciles to server authority using the server's last processed input sequence.
- Reconciliation is intentionally simple for now: if the local player drifts far enough from the authoritative position, the controller snaps to the server state.
- Remote players are currently rendered as simple placeholders rather than full replicated first-person rigs.
- The server-side simulation is intentionally simpler than the client at this stage: it runs a fixed-step flat-ground authoritative movement pass and does not yet share authored collision geometry with the browser runtime.

## Current Status

- Implemented and active
- Two local browser tabs can join the same `TacticalRoom`
- Remote players appear as simple blue box proxies
- Connection state and remote-player count are visible in the HUD
- Server authority and reconciliation are wired end-to-end for player movement

## Limitations

- Server-side authoritative movement currently assumes flat ground and does not yet use map collision, ramps, catwalks, or step-up logic
- Because server collision is not yet map-aware, reconciliation quality is best in open flat areas and can diverge near authored geometry
- Bots, rounds, weapons, damage, and world interactions are still local-only and are not yet synchronized
- Remote players use raw authoritative transforms without interpolation/smoothing yet

## Near-Term Plans

- Share authored map collision or a simplified collision representation with the server so authoritative movement matches client traversal more closely
- Add interpolation/smoothing for remote-player proxies
- Move additional gameplay state, starting with round state and combat-relevant actors, toward server authority as needed
