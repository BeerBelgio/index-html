# Known issues — INDEX HTML

## CF-001 — Cellular Field: standalone rendering discontinuities on Intel (Chrome and Safari)

**Status:** Open; reproduced in Chrome and Safari on the Intel Mac mini, 2026-10-12  
**Area:** `Cellular Field v1.5`, direct `file://` launch  
**Observed:** On the Intel Mac mini, some membrane lines and cell cores are abruptly cut, offset or fragmented when the HTML is opened directly in **both Chrome and Safari**. The M5 screenshot from Chrome shows a continuous cellular field.  
**Other hosts:** User reports normal results in Sketch, INDEX Playground and INDEX-HTML Bridge; these are observations, not a driver-level diagnosis.  
**Expected:** Continuous procedural cell boundaries and cores.  
**Suspected causes:** WebGL1/GLSL execution and hardware/driver differences are candidates, **not confirmed**. Reproduction in Safari makes a Chrome-only/ANGLE-only explanation less likely. Native migration kept the shader intact.

**Source-code finding (not yet causal proof):** The Cellular Field fragment shader includes a reversed-edge call `smoothstep(1.25, 0.20, ...)` in its vignette calculation. GLSL ES specifies undefined results when `edge0 >= edge1`; different GPU/backend implementations may diverge. This is a concrete portability defect to isolate in a separate tool bugfix, not evidence that it alone explains the observed membrane/core discontinuities.

**Impact:** Medium for standalone output quality of this tool, not an INDEX platform-wide load failure.

**GPU diagnostic (2026-10-12):** Chrome 155.0.8059.40 on macOS 15.7.5 reports Intel UHD Graphics 630 via ANGLE Metal; WebGL is hardware accelerated, with GPU process crash count 0. The report also logs repeated `SharedImageManager::ProduceOverlay` / `Invalid mailbox` events and Intel-specific rendering workarounds. No causal connection to the Cellular Field geometry defect has been established.

**Suggested next tests:** Compare Cellular Field v1.4 and v1.5 on the **same Intel Mac**, at identical defaults and similar viewport dimensions; capture shader compilation/log warnings where available. If isolating the reversed-edge `smoothstep`, change only that expression in a local diagnostic copy and compare output against the original on Intel and M5 before proposing a canonical shader fix.

**Workaround:** Use INDEX Playground or Bridge on affected hardware when they render correctly. No algorithm fix is claimed.
