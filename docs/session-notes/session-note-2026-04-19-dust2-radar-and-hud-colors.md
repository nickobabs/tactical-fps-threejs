# Session Note: Dust2 Radar And HUD Colors

## What Changed

- Added a first real minimap/radar pass for `Dust2 Test` using the authored `public/minimap/dust2.jpg` image.
- Replaced the early scene-bounds guess with a fitted affine `world x/z -> radar u/v` transform derived from in-game calibration samples.
- Added a temporary radar calibration workflow behind the debug menu:
  - `Gameplay Debugging -> Radar Calibration`
  - `U` add sample
  - `I` clear samples/targets
  - `O` / `P` cycle selected sample
  - `L` enter/exit click mode
  - click minimap to place target point
- Rotated the Dust2 radar presentation visually instead of rotating the fitted mapping itself.

## HUD / Radar Presentation

- Added a shared 5-color competitive player palette reused by both teams.
- Top roster avatar borders now use per-player colors instead of only team-color framing.
- Minimap local/teammate markers now use:
  - colored dots
  - a small white aim-direction arrow
- Minimap size is now a local settings value exposed in the pause-menu `Settings` panel and persisted in browser storage.

## Bomb Marker Rules

- Bomb markers were reduced in size for better radar readability.
- Dropped bomb now pulses on the minimap.
- The dropped-bomb pulse phase is preserved across minimap rerenders, so movement updates do not visually restart the pulse.
- Attackers always get bomb radar info.
- Defenders only see ground bomb on radar while they have local line of sight to it.
  - carried bomb is still hidden from defenders
  - dropped bomb is visible to defenders only while locally visible
  - planted bomb is visible to defenders only while locally visible

## Follow-Up Notes

- The Dust2 radar image is usable for now, but it is still more of a captured top-down texture than a clean production radar. It can be replaced later without changing the fitted transform approach.
- The calibration workflow should stay debug-gated; it is a map-authoring/tuning tool, not a normal gameplay feature.
