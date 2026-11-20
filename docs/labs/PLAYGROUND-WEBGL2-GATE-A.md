# INDEX Playground — WebGL2 Laboratory / Gate A

**Status:** EXPERIMENTAL / NOT PROMOTED. Branch-only study based on `main` commit `9fc0c78e28c5fd30122c06f6919deebc2e5ce657` (2026-11-20). No release or Bridge update authorized.

## Baseline and authority

- Read: `README.md`, `docs/INDEX-TOOL-CONTRACT.md`, `docs/ROADMAP.md`, `docs/RELEASE_POLICY.md`, `docs/KNOWN_ISSUES.md`, `CHANGELOG.md`, `playground.html`, `assets/js/playground.js`.
- No `AGENTS.md` files in the repository tree at the baseline SHA.
- Published generators: 20 HTML documents, `INDEX_TOOL` generator contract v1.0 frozen, Sketch adapters unchanged.
- Playground: five ordered layers, sandboxed `srcdoc` tool frames with CSP (no remote connections), `createImageBitmap` capture, Canvas2D compositor with Normal/Add/Multiply/Screen, optional provisional WebGL1 fragment FX created per instance.
- Renderer paths, tool defaults, catalogue and visual UI must not change in normal mode.

## Gate A design: isolated opt-in

- Normal URL: `playground.html` remains Canvas2D, unchanged.
- Lab URL: `playground.html?renderer=webgl2-lab` uses one WebGL2 context for compositing and synthetic FX. Legacy Canvas2D is retained under the GPU canvas for instant fallback.
- Existing hosted generators stay in their sandboxed tool frames. The GPU compositor receives only already-captured `ImageBitmap` frames. Generator WebGL1 contexts are independent producer contexts, **not** FX/compositor contexts.
- Stage: two RGBA8 composite ping-pong textures/FBOs, one uploaded generator texture, one synthetic FX intermediate; a final blit to the default framebuffer. The compositor and synthetic FX use the **same** WebGL2 context.
- Shader policy: GLSL ES 3.00 only, explicit source/destination alpha, one output per pass; no automatic WebGL1 shader transpilation. Existing fragment-webgl1 FX are **unsupported in lab mode** with a visible error; use the normal URL for them.
- Four compositing modes, five slots and their ordering remain sourced from existing Playground layer state. Lab synthetic `Channel Relay` is original and stateless, with adjustable pixel shift and strength. This is **not** proof of numerical parity with Bridge Channel Relay.
- GPU lab preview resolution capped to 2048 pixels on the longest side; source capture remains at existing Playground resolution. Each RGBA8 full-size texture costs `width*height*4` bytes; baseline four textures cost ~16 bytes/pixel excluding browser staging and source canvases.
- Renderer creation/shader errors, unsupported contexts and context loss must leave legacy canvas available and report a readable diagnostic. Do not silently claim FX rendering succeeds after fallback.

## Gate A approval requires

- [ ] Automated fixture and pixel oracle for normal/add/multiply/screen including non-opaque source & 100→50→0→100.
- [ ] Browser screenshots M5 Chromium and legacy-vs-GPU comparisons (including mixed Canvas2D/WebGL1 generator sources).
- [ ] Five layers, show/hide, reorder semantics (unchanged slot order), replacement, CLEAR, play/pause and resizing.
- [ ] Shader-error, unsupported legacy FX and context-loss behavior observed.
- [ ] Manual source isolation/local HTML/offline tests; no changes to any generator.
- [ ] Verification that legacy URL remains visually and functionally invariant.
- [ ] Explicit maintainer approval before promotion. Gate B remains BLOCKED while any required Gate A evidence is missing.

## Later gated work (not yet authorized for promotion)

**Gate B:** distinct instance IDs, private ping-pong history, controlled multipass, one advance per committed frame, deterministic seed, wet/dry, pause/hide, independent clear/reset, resize/context-loss and pixel/temporal oracle. No localStorage/IndexedDB texture persistence.

**Gate C:** separately versioned provisional FX module contract, e.g. `fragment-webgl2`, lifecycle, inputs, time/delta, parameters, history, multipass, provenance and license notices. Do not change/freeze generator v1.0 or infer cross-repo engine sharing.

## Rollback

1. Disable the experiment by removing `?renderer=webgl2-lab` from the URL.
2. For complete code rollback, revert only this laboratory branch / PR; `main` is untouched.
3. No generator, Bridge, site release or third-party licensing changes are included.

## Evidence standard

Automated static checks are not equivalent to Chromium/M5 visual tests. An FX compiled successfully is not proof of correct alpha/blend pixels, GPU time, independent history or Bridge parity. All unexecuted tests remain `NOT_RUN`.
