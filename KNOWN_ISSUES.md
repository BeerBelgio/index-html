# Known issues — INDEX HTML

## CF-001 — Cellular Field: discontinuities in standalone Chrome on Intel

**Status:** Open, reproducible via supplied 2026-10-12 screenshots  
**Area:** `Cellular Field v1.5`, direct `file://` launch  
**Observed:** On the Intel Mac mini, some membrane lines and cell cores are abruptly cut, offset or fragmented; the M5 screenshot from Chrome shows a continuous cellular field.  
**Other hosts:** User reports normal results in Sketch, INDEX Playground and INDEX-HTML Bridge; these are observations, not a driver-level diagnosis.  
**Expected:** Continuous procedural cell boundaries and cores.  
**Suspected causes:** WebGL1/GLSL execution and GPU/driver differences are candidates, **not confirmed**. Native migration kept the shader intact.

**Impact:** Medium for standalone output quality of this tool, not an INDEX platform-wide load failure.

**Suggested comparisons:** Check Chrome hardware acceleration and `chrome://gpu`; retest at similar window sizes and identical defaults; compare another Chrome rendering mode or Safari on the same Intel Mac. Capture renderer/ANGLE string, browser version and macOS version; check console shader warnings. Avoid changing shader mathematics without controlled pixel comparisons with M5/Sketch/Playground.

**Workaround:** Use INDEX Playground or Bridge on affected hardware when they render correctly. No algorithm fix is claimed.
