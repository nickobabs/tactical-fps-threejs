# Utility System

## Summary

`UtilityManager` now coordinates the first bomb-objective gameplay slice plus utility/HUD integration.

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
- Bomb-carrier state for local inventory/equip rules
- Planted-bomb visual state in the scene

## Dependencies

- `BombObjectiveState`
- `PlantedBombVisual`
- Shared bomb helpers in `src/shared/bombObjective.js`
- Shared plant-zone helpers in `src/shared/maps/mapPlantZones.js`

## Key Design Decisions

- Objective state and planted-bomb scene visuals are split into dedicated helpers instead of living directly inside one large class
- The bomb is currently represented as a real weapon slot for equip purposes, while objective ownership still lives in the utility path
- Planting is constrained by map-authored plant zones
- In authoritative multiplayer, objective state comes from the server and the client only sends plant requests

## Current Status

- Implemented and active
- Current bomb flow:
  - a random attacker gets the bomb after freeze ends
  - the carrier can equip the bomb with `5`
  - planting currently requires:
    - attacker team
    - bomb equipped
    - standing inside a valid plant zone
    - holding left click for 3 seconds
  - planted bomb counts down 40 seconds
  - bomb explosion ends the round for attackers
- Training Ground has a visible `A` marker for the current site
- Imported maps can define plant zones through `plantable_*` markers
- Server-authoritative imported-map plant-zone validation is now implemented for those marker-derived sites

## Limitations

- No bomb drop/pickup flow yet
- No bomb defuse flow yet
- No grenade inventory/throw logic yet
- No dedicated first-person bomb animation set yet
