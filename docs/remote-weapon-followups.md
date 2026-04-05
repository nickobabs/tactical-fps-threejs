# Remote Weapon Follow-Ups

This is the current follow-up list for the remote weapon/model path after the AK socket pass landed.

See also:

- [remote-weapon-asset-contract.md](/C:/Users/nicko/tactical-fps-threejs/docs/remote-weapon-asset-contract.md)

## Already Landed

- Remote rifle alignment is now socket-to-socket:
  - character-side `weapon_socket_r`
  - weapon-side `grip_socket`
- Remote muzzle flash now uses weapon-side `muzzle_socket` when present.
- Permanent orange/debug material overrides are out of the normal render path.
- Permanent directional debug helpers are out of the normal render path.
- The active remote rifle asset is now `public/models/weapons/newak.glb`.
- `newak.glb` now exports authored `grip_socket`, `muzzle_socket`, and `left_hand_grip` helpers.
- The runtime now uses the authored left-hand helper for remote rifle IK when present.
- The runtime grip/muzzle fallback preset is still kept as a safety net, but the authored-helper contract remains the preferred path.

## Still Worth Doing

- Continue cleaning `RemotePlayerPresenter` churn residue from the iterative debugging pass.
- Keep runtime debug/tuning tools clearly separated from the normal weapon render path.
- Keep per-weapon pose data small and explicit.
- Keep the imported weapon path deterministic and easy to inspect.
- Audit whether the current fallback proxy path is still shaped the way we want now that the rifle model path is working.
- Decide whether the `F7` tuning panel should stay as a dev tool, move behind a debug flag, or be removed after values are baked.
- If a later pose-correction pass is attempted again, treat it as a separate focused feature rather than piggybacking on the weapon import path.

## Not Active Anymore

- Verifying the original `ak-47.glb` for authored helper nodes is no longer an active task.
- Adding `grip_socket` / `muzzle_socket` is done.
- Moving back to guessed root-to-socket alignment is explicitly not the plan.
