# INDEX Playground — provisional FX WebGL2 API (LAB / NOT FROZEN)

**Status:** experimental implementation in PR #9. This describes a **Playground-only adapter**, not the frozen `INDEX_TOOL` generator v1.0 API, a cross-host wire protocol, an OpenMosh implementation or a shared Bridge engine.

## Quick start for collaborators

1. Open the normal public INDEX Playground. When a tool is loaded and WebGL2 is available, the GPU compositor initializes automatically; no mode button, query parameter, download or local server is required. Developers can clone the repo and run a local server for code iteration.
2. Choose an INDEX generator or import a trusted standalone `.html` file into L1. The normal URL uses WebGL2 where available. To force the classic renderer for diagnosis or rollback, use `playground.html?renderer=canvas2d`.
3. Select L2 and import your FX `.html` through the existing **CHOOSE A FILE** control. No separate FX demo controls are added to the site.
4. For a reference FX file use `assets/fx/original-feedback-history.html` or `tests/fixtures/original-feedback-history.html`. The reference is not preloaded. Import additional FX into L3–L5; each instance has independent history.
5. Change the FX numeric parameters, layer opacity (the **Wet**/Dry blend), visibility, and **RESET HISTORY**. Use CLEAR to remove an instance.
6. To force the classic fallback, open `playground.html?renderer=canvas2d`. The normal URL uses WebGL2 when supported. This does not change generators or Bridge.

The normal Playground remains visually familiar and does not display a demo entry or auto-load any sample. Its existing HTML import can recognize and execute provisional `fragment-webgl2` FX on compatible browsers. The optional `?renderer=canvas2d` query forces a fallback that cannot execute WebGL2-only effects.

## Minimal local HTML module

The example at `tests/fixtures/original-feedback-history.html` is the executable reference. It declares `window.INDEX_TOOL` as a JSON-serializable object inside the local document:

- `schemaVersion:1` (manifest envelope; not a new generator revision).
- `role:'effect'`.
- `capabilities.requires.renderer:'fragment-webgl2'` (new, provisional FX-only capability); `visualInput:'lower-composite'`; `audioInput:'none'`.
- `params` and `colors` with unique stable keys, ranges/defaults and optional color alpha controls.
- `effect:{apiVersion:2,type:'fragment-webgl2',moduleId:'stable-id',moduleVersion:'0.0.1',history:true|false,passes:[{fragment:'...'}],provenance:{author,source,adaptation,license,notice}}`.

No `indexDraw`, `sketchDraw` or `sketch-canvas` is needed for FX. GLSL must be **`#version 300 es`** fragment code; a pass writes `out vec4 fragColor` and receives `in vec2 vUV`. The full-screen vertex stage is managed by the Playground. Each FX can use 1–3 passes, max 32768 source characters per pass.

### Available uniforms for each pass

| Uniform | Type | Meaning |
| --- | --- | --- |
| `uInput` | `sampler2D` | First pass: lower composite; later passes: previous pass output |
| `uHistory` | `sampler2D` | Previous **committed final FX output**, seeded with the first valid lower composite; when `history:false`, aliases the lower input |
| `uResolution` | `vec2` | GPU preview width and height (physical pixels) |
| `uTime` | `float` | Host simulation clock in seconds |
| `uDelta` | `float` | Committed frame delta in seconds, 0 after resumption from pause/hide, clamped 0–0.05 |
| `uFrame` | `int` | Number of previous committed FX frames (starts at 0) |
| `u_<paramKey>` | `float` | Numeric parameter with exact manifest key |
| `u_<colorKey>` | `vec4` | Normalized RGB plus color opacity alpha |

The shader must explicitly determine output alpha; the host blends the FX result using layer opacity and Normal/Add/Multiply/Screen. The shader is not responsible for host-level Wet.

## Runtime semantics

- One WebGL2 context for GPU compositing **and all FX instances**; hosted generators continue to draw in their own sandboxed Canvas2D/WebGL1 contexts and supply `ImageBitmap` frames. This is not one context across every tool.
- An **FX module ID is not the instance ID**. Each imported layer receives a unique token-derived instance ID and its own programs, pass textures and optional history ping-pong pair; there is no shared history between instances.
- One advancement per distinct committed host frame ID; additional paint calls with that same ID do not mutate history. No advancement while PAUSE. Hidden FX instances suspend; the first resumed committed frame receives `uDelta=0` (no idle time added).
- Wet=0 (FX **layer opacity 0**) still computes/advances history if the host is running and the lower visual composite exists. The rendered result is the unchanged dry lower composite.
- The first valid lower composite seeds both history textures deterministically. **RESET HISTORY** clears only the currently selected FX instance state/history, retaining all parameters. The existing **RESET** button restores parameter defaults and does not reset GPU history. CLEAR/replacement disposes only that layer's FX resources.
- The FX chain is a sequential lower-composite stack (not a two-source compositor contract). The last pass output is also copied to the alternate history texture on committed frames. No texture history is persisted in localStorage, IndexedDB, files or cloud services.
- Explicit errors: invalid manifest, unknown shader version, shader compilation errors or memory budget exhaustion are reported. A failed FX is bypassed without replacing the lower image; unsupported WebGL1 FX must be run on the legacy URL. Context loss switches to Canvas2D, with resource reallocation/history reset upon restoration.
- Hardware variation: RGBA8 textures, texture filtering, alpha premultiplication and shader precision can affect numerical results. Renderer parity is measured, not assumed.

## Resource limits

- Preview maximum dimension: 2048 px (the longer edge); other dimension scales proportionally.
- FX passes: 1–3 per instance; at most 5 layer positions total.
- At most **128 MiB estimated RGBA8 texture storage** for the compositor and imported FX combined. Static baseline allocation: 3 textures (two composite ping-pong, one generator upload); per instance: N pass output textures + (2 if `history:true`). Formula `W × H × 4 × (3 + sum(N + 2*history))` bytes.
- This estimate excludes browser backing store, GPU driver overhead, HTML iframe canvases, staging surfaces, transient transfers and other browser resources. Actual GPU memory can be higher.
- On resource errors, the correct behavior is explicit failure, not silent resolution drop or corruption.

## Provenance and licensing checklist

An external FX must identify author, original source, adaptation history, license and required notices. The fixture is original and synthetic, not copied or derived from OpenMosh/Bridge. Third-party adaptations require an explicit decision about whether the code is distributable in the public INDEX repository. **Do not publish** Bridge private code or third-party source without permission.

## Current compatibility

- Chromium software-WebGL CI is a technical integration test, **not** proof of M5/Intel hardware parity.
- No real OpenMosh effect has been adapted. Bridge Channel Relay parameter/output parity is not established.
- This API is **provisional and subject to compatibility review** before any freeze or cross-repository reuse.
