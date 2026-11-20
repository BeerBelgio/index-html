# INDEX WebGL2 Laboratory — Bridge parity assessment

**Status:** PRELIMINARY / NO COMPATIBILITY CLAIM. This report compares the Gate A INDEX implementation with the stated Bridge Testing/C0 evidence, not with Bridge source code. Bridge code and AMXD were **not imported, changed or examined** in this repository.

| Dimension | INDEX Gate A | Bridge/C0 evidence available | Parity |
|---|---|---|---|
| WebGL2 API | One explicit WebGL2 context for compositor + synthetic FX; tested on GitHub-hosted Chromium software backend | User-reported Channel Relay WebGL2 on M5 | Architecture comparable, **not proven identical** |
| Algorithm | New original RGB channel-displacement/relay shader | Channel Relay reference not supplied here | **UNKNOWN**, do not claim same algorithm |
| Parameters | `shift_px` [0..24], `strength` [0..1] | No authoritative current Bridge mapping supplied | **UNKNOWN** |
| Composite source | GPU lower-layer composite texture; five ordered slots | Channel Relay target described as lower composite | Semantic intent comparable; blend numeric parity **NOT_RUN** |
| Colors/alpha | Straight-alpha GPU FBO, conversion for premultiplied `ImageBitmap`; automated Canvas2D pixel oracle PASS | No matched-format/reference frames received | **NOT_RUN** |
| History | Gate B lab has private per-instance ping-pong, manual reset and pause/hide rules (synthetic Chromium oracle PASS) | C0 synthetic harness reportedly validated independent history | Semantics appear aligned, **cross-host numerical parity NOT_RUN** |
| Multipass | 1–3 original GLSL ES 3.00 passes per local FX instance, synthetic two-pass feedback oracle PASS | C0 single-pass and multipass synthetic PASS per user's baseline | Structural capability now comparable; **not independently tested across hosts** |
| Layer CLEAR | Existing Playground clearing and renderer snapshots, tested in integration smoke | Bridge A+B+C CLEAR reportedly DONE | Semantics broadly similar; cross-host parity **NOT_RUN** |
| Resize/cleanup | RGBA8 reallocations, independent disposal, context loss/restore rebuild and history reset (synthetic PASS) | Bridge evidence not directly provided | **CROSS-HOST UNKNOWN** |
| GPU performance | Synthetic Chromium CI only; CPU+GPU preview both active in opt-in | M5 lab hardware test reports not reproduced here | **NOT RUN/COMPARABLE** |

## Cross-host parity gate to execute later

Use a reproducible fixture: same 1200x630 or other *explicit* pixel grid, fixed RGBA source frames and corner/center alpha probes, fixed layer order, blend, opacity, FX parameters and timeline. Capture output from the **actual Bridge host** and the **actual INDEX GPU Lab**, including pixels at transparent edges. Report per-channel absolute/max error and histogram with input hashes. Record WebGL renderer/OS and shader versions. Do not label results equivalent merely because both screenshots look similar.

## Shared engine and rights

- A reusable JS/WebGL2 engine is a possible future **separate proposal**, not an existing shared codebase.
- Ownership boundaries: INDEX public platform and FX under its documented repository license; Bridge private/product packaging under its own governance; original FX contributions require author attribution/license decision.
- OpenMosh has not been imported or adapted in this lab. No OpenMosh shader, history algorithm or third-party code is included.
- Reuse across repos, dual licensing, publishability and notices require explicit written approval before code movement.
- No WebGL2 FX contract freeze or claim of OpenMosh compatibility is authorized by Gate A.
