# Utility System

## Summary

`UtilityManager` now coordinates the bomb-objective gameplay slice, smoke-grenade flow, utility/HUD integration, and bomb-objective world effects.

## Inputs

- Frame delta time
- `InputManager`
- `RoundManager`
- `FirstPersonController`
- `NetworkClient`
- `WeaponManager`
- Current selected team
- Map plant zones

## Outputs

- `activeUtility`
- HUD-facing status text
- HUD-facing interaction text
- Plant progress state
- Defuse progress state
- Bomb-carrier state for local inventory/equip rules
- Planted-bomb visual state in the scene
- Local and replicated smoke projectile/smoke-cloud effect state
- Local bomb-explosion effect state

## Dependencies

- `BombObjectiveState`
- `PlantedBombVisual`
- `EffectsManager`
- Shared bomb helpers in `src/shared/bombObjective.js`
- Shared plant-zone helpers in `src/shared/maps/mapPlantZones.js`

## Key Design Decisions

- Objective state and planted-bomb scene visuals are split into dedicated helpers instead of living directly inside one large class
- UtilityManager owns utility inventory/equip state directly instead of piggybacking on bomb-objective selection state
- The bomb is currently represented as a real weapon slot for equip purposes, while objective ownership still lives in the utility path
- The default utility slot is now a simple smoke grenade on `6`
- Smoke grenades currently live fully in the utility path rather than pretending to be a firearm inside `WeaponManager`
- Smoke projectile physics stay in `SmokeGrenadeManager`, while smoke bloom visuals and the bomb explosion effect render through `EffectsManager`
- In authoritative multiplayer, smoke throws are validated by the server and rebroadcast so remote clients spawn matching projectile/bloom visuals
- Planting is constrained by map-authored plant zones
- Defusing is constrained by both proximity and aim alignment against the planted bomb
- Plant/defuse interactions now temporarily lock local movement input through `FirstPersonController` while the hold action is active
- In authoritative multiplayer, objective state comes from the server and the client only sends plant/defuse requests

## Current Status

- Implemented and active
- Current bomb flow:
  - a random attacker gets the bomb after freeze ends
  - the carrier can equip the bomb with `5`
  - the carrier can press `G` to drop the bomb slightly in front of them
  - if the bomb carrier dies or disconnects, the bomb drops into the world instead of disappearing
  - alive attackers without the bomb can pick it up by running over it
  - the dropper is blocked from instantly re-picking it up for a short window so manual drops actually leave the bomb in the world
  - planting currently requires:
    - attacker team
    - bomb equipped
    - standing inside a valid plant zone
    - holding left click for 3.5 seconds
  - planted bomb counts down 40 seconds
  - bomb explosion ends the round for attackers
  - defenders can defuse the planted bomb by:
    - being on the defender team
    - staying within the short interaction radius
    - keeping the crosshair aimed at the bomb
    - holding `E` for 6 seconds
  - successful defuse ends the round for defenders
  - if all attackers die after plant, the defenders still need to complete the defuse to win
- Current smoke flow:
  - `6` selects the smoke utility
  - left click throws the grenade when smoke is selected
  - local throws send a `smoke-throw` request to the server
  - the server validates that request and rebroadcasts a `combat-event` of type `smoke-thrown`
  - remote clients spawn the same smoke projectile locally and let it fly/bloom through the existing smoke sim
  - after throwing, the utility immediately leaves smoke mode and replays the currently equipped weapon's normal equip lockout before firing is allowed again
  - the grenade uses local gravity plus collision bounce/roll damping against `CollisionWorld`
  - smoke bloom now requires both a minimum fuse and a post-settle delay, so it does not bloom instantly on first ground contact after a long arc
  - the smoke cloud is now a heavier CS-style layered sprite effect with a dense center, softer edge, wide footprint, and a 14-second duration after bloom
  - smoke bloom audio is also emitted as a replicated positional audio event so other players can hear it
  - the current round baseline gives the player one smoke grenade and restores it on round reset/freeze
  - competitive currently only allows smoke throws during the `live` round phase
- Current bomb explosion presentation:
  - when a planted bomb explodes, `UtilityManager` now triggers a local first-pass blast effect at the planted world position
  - the effect currently uses a bright flash, expanding ground ring, and large debris/dust plume
- Training Ground has a visible `A` marker for the current site
- Imported maps can define plant zones through `plantable_*` markers
- Server-authoritative imported-map plant-zone validation is now implemented for those marker-derived sites
- The HUD now reuses the same objective widget for planting and defusing progress

## Limitations

- Smoke is currently a visual cloud only; it does not yet block line of sight or gameplay traces
- Bomb explosion effect is currently local presentation only; it does not yet apply blast damage or other gameplay consequences beyond the round result
- No broader grenade inventory system yet beyond the single smoke baseline
- No dedicated first-person bomb animation set yet
- No direct teammate-to-teammate bomb transfer action beyond drop-and-pickup
