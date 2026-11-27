# INDEX / OpenMosh integration candidate
Baseline 0.22.1 (2ee9fbdffea5aff05937cb2fede78edfcd50d62b). Upstream PR #16, 9d4f76e5974728eee17dbcc2040de2e51ec1cb9f. No production publication or release. No changes to the exporter or generator HTML.

## Design
- Separate generator and FX editorial catalogues; stable FX IDs use the exported moduleId, not filenames. Technical source is the original JSON manifest in each FX HTML. The catalogue contains references/summary metadata only, validated against source.
- Homepage keeps generator-only hero. FX use a single shared 320×180 compositor and favicon on opaque cream; progressive intersection-triggered WebP stills, only one animated hover at a time (30 Hz cap), released FX instance when idle. Static snapshots are created locally on demand, not prebuilt assets. Touch/reduced-motion uses static previews. If WebGL2 fails, a labelled favicon fallback is shown.
- Detail preview uses a fixed 960×540 favicon source, same WebGL2 compositor, one instance, no generator draw/resize assumptions. Switch/choice state remains numeric. FX links retain stable slug URL and standalone setup snapshot; individual download is the unmodified HTML.
- Playground uses the existing five-layer engine with grouped selector and native optional numeric UI. No two FX per layer. Legacy numeric fallbacks remain.
- Download All remains generator-only; FX have separate MIT licence and individual downloads. Sitemap production changes deferred until an approved publication; canonical links on candidate pages use the existing URL convention. Build metadata remains 0.22.1 pending release decision.

## Preview / rollback
Download the branch ZIP from GitHub, extract into a fresh directory, run `python3 -m http.server 8765 --bind 127.0.0.1` from its root and open http://127.0.0.1:8765/. Do not use file:// for catalogue pages. Individual exports remain standalone offline. No changes to GitHub Pages or main. Rollback: stop the server, remove candidate directory, return to release 0.22.1. Do not merge either PR before explicit approval.

## Reproducible integration tests
Existing regression workflow plus tests/index-fx-catalogue.mjs, tests/index-fx-integration.html, tests/index-generator-library-smoke.html, tests/index-home-comparison.html. Chromium software WebGL2 is not native GPU performance evidence. Baseline comparison is descriptive; random card ordering and caching affect results. Manual checks: desktop/mobile filters, hero unchanged, hover/rest state, real favicon appearance, category navigation/back/forward, Grain switch/choice, Feedback history, Blur multipass, generator + FX in Playground, local rejected upload and CLEAR. Verify no context accumulation and native hardware performance before promotion.

## Next phase (not run)
- Freeze matrix 38 effects × defaults / range extremes / discrete modes / colors; compare representative input and output with original OpenMosh; history reset, pause/resume, opacity/wet and resize. Include asymmetric orientation test and real video/generator sources.
- Benchmark 720p/1080p and target 4K where feasible; 30/60 FPS frame budgets, CPU vs GPU time (EXT_disjoint_timer_query_webgl2 if available; discard disjoint samples), p50/p95/p99, dropped frames; distinguish compile/warmup from sustained execution. Measure on M5/Intel and report actual browser/OS/GPU. No inference from parameter count.
- Record pass count, render-target allocation, history textures, peak memory estimate, resize/resource lifetime, per-pass GPU cost; serial FX pair combinations chosen from measured light/heavy buckets.
- Evaluate two consecutive FX in a single layer only after serial-cost evidence, independent instance IDs/history, wet semantics, UI/control limits, bypass and recall decisions.
- Datamosh and Motion Mask: study persistent private state, access to original FX input per pass, per-pass history and four-pass support. Tracking requires CPU Canvas2D runtime study. None is added now; contract changes require separate review. No claims of Bridge compatibility.

## Maintainer UI feedback — 2026-11-27
Search mode hides category and tag filters while preserving their values; close or Escape clears the query and restores the filters. Tool category selector matches the existing tool selector typography and fits its selected label. Playground has separate category and tool selectors with per-layer choices; category changes never load anything until LOAD is pressed. About includes explicit zivavu/OpenMosh collaboration credit. FX hover choreography and detailed editorial copy remain deferred.
