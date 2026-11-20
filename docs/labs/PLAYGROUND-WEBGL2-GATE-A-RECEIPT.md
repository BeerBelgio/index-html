# INDEX Playground WebGL2 — Gate A verification receipt

**State: CANDIDATE / NOT PROMOTED.** Updated 2026-11-20. Branch-only implementation; **do not merge or publish** until explicit maintainer approval and the outstanding M5/manual gate.

## Grounded baseline

- Repository: `BeerBelgio/index-html`; base `main` SHA `9fc0c78e28c5fd30122c06f6919deebc2e5ce657`.
- Published platform `0.21.3`; 20 generator documents and frozen generator contract v1.0.
- No `AGENTS.md` in the baseline repository tree. See `PLAYGROUND-WEBGL2-GATE-A.md` for governing docs and architecture.
- No imported Bridge/OpenMosh implementation, no changes to generator documents/manifests, no external runtime dependencies.

## Implementation received (Gate A only)

- Independent `assets/js/playground-webgl2-lab.js` module, **loaded only with** `playground.html?renderer=webgl2-lab`.
- One WebGL2 context for the GPU composer and synthetic stateless Channel Relay effect; GLSL ES 3.00 fragment programs.
- Capture current generator `ImageBitmap` without altering existing sandboxed frames.
- Five ordered slots, Normal/Add/Multiply/Screen, layer opacity and source alpha. Explicit unpremultiplication of uploaded ImageBitmap color channels verified against Canvas2D in Chromium; shader intermediate targets stay in straight-alpha representation.
- Two composite ping-pong FBOs + one FX scratch FBO + one generator upload texture, all RGBA8. Max GPU preview dimension 2048; four full-resolution texture allocations ~16 bytes/pixel, excluding temporary/browser/canvas memory.
- Existing WebGL1 fragment FX explicitly rejected in lab mode, with legible diagnostic. No automatic WebGL1-to-WebGL2 shader conversion.
- FX exposed through a LAB-only button and the standard existing parameter editor (`shift_px`, `strength`).
- Legacy Canvas2D path retained; lab errors/context loss use legacy fallback, not a silent fake GPU output.
- Unmodified HTML page and query-free legacy render path. The lab script is dynamically injected **only** when requested.

## Automated receipts

- **CI PASS**: [WebGL2 Gate A laboratory run #44787886849](https://github.com/BeerBelgio/index-html/actions/runs/44787886849) on GitHub-hosted Ubuntu Chromium (software WebGL backend).
- **21/21 PASS**: GPU pixel/alpha oracle, all four blend modes, 100→50→0→100 layer opacity, five mixed Canvas2D/WebGL1 producers, hide/show, simulated clear, original synthetic FX, rejection of legacy WebGL1 FX, target resize, resource disposal, simulated context loss and WebGL2-unavailable fallback.
- **23/23 PASS**: actual Playground integration smoke; five slots, local HTML sandbox import and first frame, lab FX and controls, host `colorOpacity` 100→50→0→100, visibility, pause/resume, CLEAR, and query-free Canvas2D path.
- JavaScript parse/static invariants PASS (`node --check` and CI static assertions).
- CI artifact: [browser result HTML and diagnostic screenshot](https://github.com/BeerBelgio/index-html/actions/runs/44787886849/artifacts/14655222248).
- Pixel oracle tolerance currently <= 6 of 255 per component; observed deterministic representative test errors 0–2. This does **not** establish pixel-perfect all-browser parity.
- Initial browser fixture failures were resolved (ImageBitmap premultiplication, WebGL1 fixture context semantics, FX layered-alpha oracle). History exists in branch CI runs; do not suppress or reinterpret as clean first-try validation.

## Outstanding tests and limitations

- **NOT_RUN**: Chromium on owner's M5, screenshots of the actual Playground, 20 canonical generator end-to-end regression, repeated loading of all five mixed live tools, exhaustive frame orientation/corner pixel checks, user-confirmed UI/resize.
- **NOT_RUN**: Intel/Safari/Firefox tests, native GPU timing/presentation measurements, cross-Bridge matched-input comparison, source WebGL1 alpha modes other than the tested fixture.
- GPU lab currently draws the legacy CPU composition as an immediate fallback underneath the GPU preview, increasing CPU cost while the lab is enabled. FPS metrics do **not** isolate GPU execution time or present latency.
- Channel Relay is an **original stateless research FX**. Exact Bridge algorithm/parameters and numerical parity: **UNVERIFIED**.
- Gate A does **not** provide independent per-instance history or multipass FX graphs. Gate B and Gate C remain **BLOCKED** until Gate A is promoted by the maintainer.
- No context restoration/reallocation after an actual lost context is claimed: the current behavior is diagnostic + safe fallback. Full restoration policy belongs to later integration work.

## Manual M5 checklist before Gate A promotion

1. Open the branch locally (not GitHub Pages main), host it over localhost and visit `playground.html` first. Record unchanged legacy UI and normal tool operation.
2. Visit `playground.html?renderer=webgl2-lab`, check GPU mode is present and status is clean.
3. Import Canvas2D and WebGL1 generator HTML tools into mixed layers; capture screenshots including transparent edges, four blend modes, opacity and 100→50→0→100 color opacity.
4. Load LAB Channel Relay above a valid lower visual composite. Move `shift_px` and `strength`; record resulting frames.
5. Test five layers, show/hide, CLEAR/replace, pause/resume, resize and unsupported legacy FX diagnostics.
6. Compare with legacy at matched dimensions, source state and target FPS; note FPS counters are not GPU-time measurements.
7. Submit screenshots and test receipts to the PR; only then consider promotion of Gate A.

## Rollback and scope

- Immediate: return to `playground.html` without the `renderer=webgl2-lab` parameter.
- Structural: discard/revert this branch/PR; `main`, generator assets, Bridge, releases and published URLs have not been changed.
- No GitHub release, tag, version bump or automatic cross-repository update.
