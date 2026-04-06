# Remote Weapon Asset Contract

This note captures the current asset/runtime contract for remote third-person weapons so future imports do not repeat the AK debugging pass.

## Runtime Contract

Remote character weapon attachment currently works like this:

- Character asset exports a right-hand helper named `weapon_socket_r`
- Weapon asset exports:
  - `grip_socket`
  - `muzzle_socket`
- Runtime attaches the weapon to the character by aligning weapon `grip_socket` to character `weapon_socket_r`
- Runtime places muzzle flash from weapon `muzzle_socket`

Current implementation lives in:

- [RemotePlayerPresenter.js](/C:/Users/nicko/tactical-fps-threejs/src/game/networking/RemotePlayerPresenter.js)

## Character Requirements

For remote character models:

- Keep the remote character as a skinned `.glb`
- Export a helper bone named `weapon_socket_r`
- Parent `weapon_socket_r` under the right hand bone
- `weapon_socket_r` should be short and non-deforming
- Place the socket origin in the right-hand grip area
- Orient it so its forward direction points along the intended weapon-forward direction

Important:

- The current runtime assumes the server-replicated actor transform is authoritative
- Character animation root motion is stripped in code
- Character scale is normalized in runtime, then multiplied by a live remote-model scale setting
- The current remote character experiment now mixes asset sources:
  - the character mesh still comes from `newtest.glb`
  - the first clean locomotion proof came from a standalone Max-exported `newtest_run.fbx` clip
  - this confirmed that standalone exported clips are the preferred path for locomotion quality, while long-strip runtime subclips remain only a temporary bridge

## Weapon Requirements

For remote weapon models:

- Export a clean `.glb` with applied transforms
- Object/world export state should be clean:
  - `Location = 0, 0, 0`
  - `Rotation = 0, 0, 0`
  - `Scale = 1, 1, 1`
- Keep the weapon visually sized correctly in Blender before applying transforms
- Add two exported helpers:
  - `grip_socket`
  - `muzzle_socket`
- Parent both helpers to the weapon object so they export with it

Socket placement:

- `grip_socket`
  - place at the pistol grip / right-hand attach point
  - orient its forward axis down the barrel direction
- `muzzle_socket`
  - place at the barrel tip
  - use the same forward convention as `grip_socket`

## Blender Workflow

Recommended workflow for a new weapon asset:

1. Import the weapon and the player model into Blender.
2. Size/orient the weapon visually relative to the player.
3. Make sure the weapon transform is clean before export:
   - place the final weapon object at world origin
   - apply `Rotation`
   - apply `Scale`
4. Add `grip_socket` and `muzzle_socket` as empties.
5. Parent those empties to the final weapon object.
6. Export only the cleaned weapon asset.

Important:

- Do not rely on Sketchfab/import container empties as gameplay sockets.
- Do not rely on a messy imported hierarchy if you cannot clearly explain what the runtime should attach to.
- A cleaned weapon asset with explicit sockets is preferred over guessing offsets from arbitrary imported roots.

## Runtime Notes

Current remote rifle path has one important runtime detail:

- The weapon is attached under a skinned character/socket chain, so runtime compensates for inherited world scale before applying the imported weapon scale.

That means future weapon imports should not reintroduce old ad-hoc normalization hacks unless a specific asset proves it needs them.

## Live Tuning

Current dev tools:

- `F7`: remote weapon pose tuning
- `F6`: remote model scale plus temporary remote aim-debug tuning

Current status:

- `F7` is the active tool for weapon hold tuning
- `F6` now also exposes temporary weapon/proxy/bone axis and strength controls for remote aim debugging
- Left-arm IK is now an active experiment, but the current rifle still does not have a proper left-hand helper, so the runtime grip target is only approximate

## What Worked

These choices turned out to be correct:

- socket-to-socket alignment
- explicit `grip_socket` and `muzzle_socket`
- keeping the character-side `weapon_socket_r`
- cleaning the weapon asset transform before export
- using a live tuning panel instead of hardcoding every adjustment blindly

## What Did Not Work

These approaches caused churn or instability:

- guessed root-to-socket alignment
- relying on dirty imported weapon hierarchies
- broad runtime compensation for unknown asset transforms
- naive runtime upper-body bone offsets on top of the live animation rig

## Recommended Next Weapon Import

For the next real remote weapon model:

1. Clean the asset in Blender first
2. Add `grip_socket` and `muzzle_socket`
3. Export with clean transforms
4. Plug it into the existing remote weapon path
5. Use `F7` for final placement tuning

That should be significantly cleaner than the first AK pass.

## Current Follow-Up

- The next clean asset step for the rifle is to add a dedicated left-hand helper/socket.
- Once that exists, the current runtime guessed IK target should be replaced by the authored helper.
- That should make the left-arm IK experiment materially more trustworthy than the current provisional setup.
