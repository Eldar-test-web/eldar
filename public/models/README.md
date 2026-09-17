# /public/models — optional real 3D scans

The 3D Design Lab works WITHOUT these files (procedural concepts render instead).
To upgrade a study to the real geometry, drop an optimized GLB here:

- airo-speedboat.glb — competition-inspired hull (concept unless the real build is scanned)
- manly-balzer.glb — reconstructed 1903 radial study
- aqua-fly.glb — hexagonal rescue-drone airframe

Rules:
- GLB/GLTF only, Draco-compressed, ideally < 5 MB each.
- Paths are edited in `src/data/models.ts` → `modelPath`.
- Never commit a copyrighted asset you do not own — reconstruct from references.
