# Known issues — INDEX HTML

## CF-001 — Cellular Field: discontinuities in standalone Chrome on Intel

**Status:** Open, reproducible via supplied 2026-10-12 screenshots  
**Area:** `Cellular Field v1.5`, direct `file://` launch  
**Observed:** On the Intel Mac mini, some membrane lines and cell cores are abruptly cut, offset or fragmented; the M5 screenshot from Chrome shows a continuous cellular field.  
**Other hosts:** User reports normal results in Sketch, INDEX Playground and INDEX-HTML Bridge; these are observations, not a driver-level diagnosis.  
**Expected:** Continuous procedural cell boundaries and cores.  
**Suspected causes:** WebGL1/GLSL execution and GPU/driver differences are candidates, **not confirmed**. Native migration kept the shader intact.

**Source-code finding (not yet causal proof):** The Cellular Field fragment shader includes a reversed-edge call `smoothstep(1.25, 0.20, ...)` in its vignette calculation. GLSL ES specifies undefined results when `edge0 >= edge1`; different GPU/backend implementations may diverge. This is a concrete portability defect to isolate in a separate tool bugfix, not evidence that it alone explains the observed membrane/core discontinuities.

**Impact:** Medium for standalone output quality of this tool, not an INDEX platform-wide load failure.

**GPU diagnostic (2026-10-12):** Chrome 155.0.8059.40 on macOS 15.7.5 reports Intel UHD Graphics 630 via ANGLE Metal; WebGL is hardware accelerated, with GPU process crash count 0. The report also logs repeated `SharedImageManager::ProduceOverlay` / `Invalid mailbox` events and Intel-specific rendering workarounds. No causal connection to the Cellular Field geometry defect has been established.

**Suggested comparisons:** Retest with identical defaults and similar viewport sizes; compare Safari and Chrome on the same Intel Mac, and inspect shader compiler/log warnings. If the error is browser/backend-dependent, narrow it down before changing the canonical shader. Avoid changing shader mathematics without controlled pixel comparisons with M5/Sketch/Playground.

**Workaround:** Use INDEX Playground or Bridge on affected hardware when they render correctly. No algorithm fix is claimed.
