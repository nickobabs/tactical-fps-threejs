# Remote Character Asset Contract

## Purpose

This note defines the contract for swapping the active remote playermodel and authoritative hitbox rig without rewriting the multiplayer stack around one specific DCC rig style.

The goal is not "drop in any model with zero work." The goal is to keep the integration work bounded to:

- character-definition config
- skeleton/socket mapping
- clip import mapping
- hitbox tuning validation

instead of reworking unrelated gameplay systems.

## Current Integration Boundary

The active runtime is already split into three main layers:

- shared config and skeleton resolution
  - `src/shared/remoteCharacterConfig.js`
  - `src/shared/remoteSkeleton.js`
  - `src/shared/remoteHitboxes.js`
- visible client presentation
  - `src/game/networking/RemotePlayerPresenter.js`
- authoritative server rig evaluation
  - `server/src/remoteHitboxRig.js`

Any future rig swap should stay mostly inside those boundaries.

## Required Character Inputs

A new character asset should provide:

- one skinned character scene
- one root joint or equivalent hips/root anchor
- a right-hand weapon attachment point or a named weapon socket
- a skeleton that can resolve the shared hitbox-driving bones
- a locomotion clip set that covers:
  - idle
  - forward run/walk
  - backward run/walk
  - strafe left
  - strafe right
  - crouch idle
  - crouch walk
  - jump
  - fire

## Bone Mapping Contract

The shared runtime expects these semantic bones:

- `rootJoint`
- `pelvis`
- `spine`
- `neck`
- `head`
- `leftClavicle`
- `leftUpperArm`
- `leftForearm`
- `leftHand`
- `rightClavicle`
- `rightUpperArm`
- `rightForearm`
- `rightHand`
- `leftThigh`
- `leftCalf`
- `leftFoot`
- `rightThigh`
- `rightCalf`
- `rightFoot`

These are semantic requirements, not a requirement to keep `Bip01` names.

`src/shared/remoteSkeleton.js` now resolves both the current Bip-style names and common Mixamo-style names such as:

- `mixamorigHips`
- `mixamorigSpine`
- `mixamorigNeck`
- `mixamorigHead`
- `mixamorigLeftArm`
- `mixamorigLeftForeArm`
- `mixamorigLeftHand`
- `mixamorigRightArm`
- `mixamorigRightForeArm`
- `mixamorigRightHand`
- `mixamorigLeftUpLeg`
- `mixamorigLeftLeg`
- `mixamorigLeftFoot`
- `mixamorigRightUpLeg`
- `mixamorigRightLeg`
- `mixamorigRightFoot`

If a future rig uses different names again, extend the shared mapping layer instead of scattering new name assumptions across client and server code.

## Weapon Attachment Contract

Preferred:

- provide a named right-hand socket such as `weapon_socket_r`

Fallback:

- provide a reliable right-hand bone mapping

The runtime should continue to treat the socket/bone selection as config, not hardcoded rig identity.

## Animation Contract

The remote runtime does not require one exact authoring pipeline, but it does require clips that can be mapped to the shared locomotion keys.

Important current rules:

- root-motion translation is stripped so actor transform remains authoritative
- visible client playback and authoritative server playback must use the same clip set semantics
- locomotion playback rate is scaled from actual replicated horizontal speed
  - standing baseline uses shared walk speed `4.92`
  - crouch baseline uses shared crouch speed `2.64`
- jump playback is not movement-speed scaled on the authoritative rig

That means any future rig swap must validate:

- idle parity
- forward/back/strafe parity
- crouch parity
- jump parity
- fire parity

## Hitbox Contract

The authoritative hitbox path is bone-driven.

A new rig must be validated for:

- head sphere placement
- spine/pelvis segment alignment
- arm segment alignment
- leg segment alignment
- pose parity between:
  - visible client character
  - authoritative server rig

Do not assume a new skeleton is correct just because the visible mesh looks fine. Validate it with `F3`.

## Integration Checklist

When swapping to a new rig:

1. Add or update the character definition/config instead of patching behavior inline.
2. Update shared bone/socket mappings in `src/shared/remoteCharacterConfig.js` and `src/shared/remoteSkeleton.js`.
3. Confirm root-motion stripping targets the new root/hips naming correctly.
4. Verify weapon attachment on the visible client model.
5. Verify `F3` authoritative hitboxes match idle, locomotion, crouch, jump, and fire.
6. Re-tune head offset/radius only after the structural mapping is correct.
7. Only then revisit optional polish layers like IK or authored ADS-specific poses.

## Current Recommendation

If the next rig returns to a Mixamo-style skeleton, that is now a reasonable direction.

The codebase is still not "plug any rig in" generic, but it is now structured well enough that a future swap should be an integration pass, not a rewrite.
