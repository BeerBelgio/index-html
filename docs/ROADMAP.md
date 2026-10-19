# INDEX HTML — Development roadmap

**Status:** Active working reference · **Last reviewed:** 2026-10-19  
**Current published platform:** `0.21.2`  
**Scope:** INDEX HTML website, Playground and standalone tool ecosystem; **not** the separately versioned INDEX-HTML Bridge.

This roadmap records approved directions and open technical questions. It is **not** a release promise, schedule, frozen feature specification or change to the [INDEX Tool Contract](INDEX-TOOL-CONTRACT.md). Priorities may change after experimentation and maintainer review.

## Current baseline — published

- 20 standalone, INDEX-native HTML generators, with canonical `INDEX_TOOL` and derived Sketch-compatible adapters.
- Frozen **generator** Tool Contract v1.0; manifest identity, creative defaults and per-tool versions remain authoritative.
- Public catalogue, tool pages, multi-layer Playground and Download All; site releases follow [Release Policy](RELEASE_POLICY.md).
- Fragment FX execution is experimental/provisional; native compositor and direct audio-input interfaces are **not frozen**.

## Next work — candidates, scope not yet frozen

- **INDEX-native FX:** create and test new standalone FX; evaluate the current fragment-processing proposal in the Playground and other compatible hosts before considering an FX contract freeze. A future `0.22.x` milestone is a candidate, **not an assigned or guaranteed release scope**.
- **Tool development:** continue generator/FX experiments under the existing [development and FREEZE guidelines](INDEX-TOOL-CONTRACT.md), preserving quality and host-independent creative controls.
- **Host compatibility:** validate new capabilities per host without inheriting Sketch/Bridge parameter-bank limits as native INDEX architecture.

## Subsequent research — requires separate decisions

- **Two-input compositor (A/B):** design and validate source input handling, state, execution and host behaviour before proposing a stable API; distinct from ordinary multi-layer blending.
- **Audio-driven native tools:** research direct audio/waveform/FFT input and its transport/ownership; distinct from the existing `audio[]` control-modulation eligibility.
- **Catalogue evolution:** maintain tool metadata, creative lineage, documentation and packaging as new roles become sufficiently tested.

## Maintenance and quality

- **[CF-001](KNOWN_ISSUES.md):** Cellular Field standalone WebGL rendering discontinuities on Intel remain open. Diagnose and verify a targeted fix separately; do not assume the current suspected shader defect proves root cause.
- Continue browser and hardware checks for new features, and keep documentation and download assets consistent with the actual released catalogue.
- Search discovery can be evaluated using Search Console after publication of `sitemap.xml`; discovery and indexing are not guaranteed by the sitemap.

## How this roadmap is maintained

- Update this file when a development priority is approved, blocked or completed, not for every experiment or brainstorming session.
- Track confirmed defects in [Known Issues](KNOWN_ISSUES.md), technical runtime requirements in the [Tool Contract](INDEX-TOOL-CONTRACT.md), and published changes in [CHANGELOG](../CHANGELOG.md).
- The **next version number and its feature scope** are set only during the normal release process. INDEX-HTML Bridge maintains its own independent development and release decisions.
