# INDEX Playground WebGL2 — Gate A/B/C laboratory receipt

**Status: EXPERIMENTAL PUBLIC OPT-IN CANDIDATE / NATIVE HARDWARE QA OPEN.** Updated 2026-11-20. This report describes the code currently in PR #9 and the required outstanding hardware/release gate. It supersedes the initial Gate A-only receipt; the frozen generator v1.0 contract is unchanged.

## Baseline and scope

- Baseline `BeerBelgio/index-html` `main` SHA `9fc0c78e28c5fd30122c06f6919deebc2e5ce657`, published INDEX 0.21.3.
- Existing 20 generator HTML documents, catalogue, manifests, Sketch adapters, creative defaults and Bridge repository/AMXD are **not modified**.
- Default `playground.html`: original five-layer interface, existing file picker and catalogue, no demo CTA or preloaded tools. The WebGL2 composer initializes automatically if supported. `?renderer=canvas2d` forces the classic Canvas2D path, and unsupported WebGL2 environments use the fallback automatically.
- One WebGL2 compositor and FX **host** context; independent generator iframe contexts and captured ImageBitmaps remain as before.
- No OpenMosh shader, private Bridge code, remote catalogue, CDN, auto-update or history persistence.

## Gate A — WebGL2 composer (implemented in branch)

- Five ordered layers, Canvas2D/WebGL1 generator sources imported as ImageBitmap, RGBA8 compositing with Normal/Add/Multiply/Screen, host opacity and alpha.
- Premultiplication conversion for captured ImageBitmap source verified in Chromium; GLSL ES 3.00 shaders.
- Original synthetic stateless Channel Relay-like FX with two numeric parameters. **Not** asserted identical to Bridge Channel Relay.
- One GPU composer, source upload texture, two composer ping-pong FBOs and per-FX pass targets; no global FX scratch FBO.
- Preview max dimension 2048px, resize, explicitly rejected legacy WebGL1 FX and unavailable WebGL2 fallback, cleanup and context loss/restoration.
- Default Playground remains a baseline available without URL parameters.

## Gate B — GPU history and multipass (implemented in branch, not promoted)

- Each imported FX layer gets a distinct instance ID, independently compiled shader programs, 1–3 private pass targets and (when required) two private history ping-pong targets.
- An original reference FX remains available at `assets/fx/original-feedback-history.html` but is **not** loaded automatically. The existing file picker imports a trusted FX `.html` into any selected layer; no Max or Ableton required.
- One GPU-history advancement per distinct committed host composite frame; first valid lower composite seeds history.
- Wet=0 (FX layer opacity zero) maintains history advancement while output remains dry. Hide/pause suspend history, first resumed frame has zero delta.
- CLEAR or layer replacement disposes only that instance. **RESET HISTORY** affects only selected FX, separate from parameter RESET.
- Resize recreates textures and resets history; context restoration recreates GPU objects and resets histories. Diagnostics/error pass-through remain explicit.
- Estimated GPU texture budget capped at 128 MiB, excluding browser staging, iframe canvases and driver memory.

## Gate C — provisional FX module contract (documented, NOT frozen)

See [FX-WEBGL2-PROVISIONAL-API.md](FX-WEBGL2-PROVISIONAL-API.md). The local FX describes `fragment-webgl2`, `effect.apiVersion:2`, stable `moduleId` and `moduleVersion`, passes, optional history, numeric/color uniforms, provenance fields and license/notice. No generator v1.0 schema changes. No Bridge shared engine claim.

The original synthetic local demonstration is `tests/fixtures/original-feedback-history.html`, with two passes and private history. It is not an OpenMosh adaptation.

## Automated testing evidence

- GitHub Actions workflow `.github/workflows/lab-webgl2-gate-a.yml`: JavaScript static syntax/invariants plus headless Chromium (Ubuntu, software WebGL).
- **Gate A compositor:** pixel/alpha oracle including 100→50→0→100, four blends, five mixed sources, hide/show/clear, context loss and WebGL2-unavailable fallback.
- **Playground integration:** local generator import, real local external FX import, two concurrent instances, RESET HISTORY, pause/show/hide/clear, query-free legacy, and original color opacity tests.
- **Gate B history:** independent instances, duplicate-frame suppression, seed, wet0 dry output, delta on resume, selective reset/clear, two-pass pixel feedback, invalid shader isolation, memory cap, context loss/restore.
- The latest approved CI result should be linked from the PR; a passing GitHub-hosted software backend does **not** establish native M5/Intel or all 20 generator parity.
- Archived failures during development included alpha premultiplication, strict shader validation, and timing-sensitive UI fixture assertions. Current receipt must refer to the *latest successful commit* rather than concealing earlier failures.

## Outstanding promotion tests — NOT_RUN

1. **M5 Chromium native**, full Playground and screenshot review, 20 canonical tools, five mixed live tools, Opacity + blend + colorOpacity + zero-opacity color change, CLEAR/replacement, resize, PAUSE/PLAY.
2. M5 GPU FX with imported `tests/fixtures/original-feedback-history.html`, two instances, wet0, RESET HISTORY, context loss where possible and performance under target preview dimensions.
3. Intel and Safari/Firefox compatibility; GPU hardware performance/presentation timing and memory observations.
4. Matched-input numerical comparisons with actual Bridge Channel Relay and Bridge/C0 data. No Bridge source/read receipts available in this repository.
5. At least one real external collaborator FX authored/adapted by zivavu and checked for rights/license before any claim of OpenMosh compatibility.

## Rollback and release rules

- Immediate: use `?renderer=canvas2d` to force the legacy renderer. Without a query, WebGL2 initializes automatically where supported; complete rollback is a PR revert.
- Full: discard/revert PR #9; no generator modifications and no Bridge dependencies.
- **Corrective deployment requires maintainer approval**; automatic WebGL2 initialization is not proof of M5/Intel or Bridge numerical parity. GitHub Pages serves the repository `main` after merge; no automatic version bump, tag, release or changes to Bridge/DES.
- Merging under maintainer approval is necessary before zivavu can access this feature through the normal public INDEX Playground URL. Until then the branch can be run locally in a browser with a static server.
