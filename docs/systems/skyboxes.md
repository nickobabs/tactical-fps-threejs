# Skybox System

## Summary

`SkyboxManager` owns HDR skybox loading, PMREM environment generation, runtime swapping, and cleanup for the current set of selectable skyboxes.

## Inputs

- Active Three.js `Scene`
- Active `WebGLRenderer`
- Selected skybox path

## Outputs

- Scene background texture
- Scene environment texture
- Runtime skybox switching

## Dependencies

- `three`
- `RGBELoader`
- `public/skyboxes/*`

## Key Design Decisions

- Skybox option metadata is defined separately in `skyboxOptions.js`.
- HDR loading and texture disposal are isolated from `GameApp`.
- Runtime switching is supported from the pause menu, so the system handles async replacement and disposes the previous environment textures.

## Current Status

- Implemented and active
- Supports at least `Qwantani Sunset` and `Rooftop Night`
- Used both as visible background and reflection/environment lighting source

## Limitations

- No persistent save for selected skybox yet
- No per-skybox exposure presets or fog tuning
