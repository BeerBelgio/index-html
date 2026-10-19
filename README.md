# INDEX HTML

**CREATIVE CODE FOR VISUAL SYSTEMS**  
An independently developed, source-available collection of 20 standalone HTML visual tools by BeerBelgio.

- **Website:** https://beerbelgio.github.io/index-html/
- **Playground:** https://beerbelgio.github.io/index-html/playground.html
- **Repository:** https://github.com/BeerBelgio/index-html
- **Current release:** `0.21.2` (documentation consolidation and Download All maintenance; generator contract v1.0 unchanged)

## What INDEX is

INDEX is the canonical platform for its tools. Every tool is a self-contained HTML file, designed to run directly in a modern browser and offline without mandatory remote runtime dependencies. The collection originated in an audio/MIDI-reactive workflow and supports host integrations, including Sketch and INDEX-HTML Bridge, without making either host the defining architecture.

INDEX Playground is a five-layer browser environment for loading catalog or local HTML tools, adjusting controls, and experimenting with blend modes and FX. Local files stay in the browser; they are not uploaded to INDEX's servers. Only load HTML you trust.

## Tool contract

The canonical manifest is `window.INDEX_TOOL`, with `indexDraw(state, hostContext)` and `indexResize(width, height)` for generator tools. Each manifest declares `role`, `toolId`, `capabilities`, controls and defaults. See [INDEX Tool Contract](docs/INDEX-TOOL-CONTRACT.md).

All 20 generators also expose a Sketch-compatible *derived mirror* (`SKETCH_TOOL`, `sketchDraw`, `sketchResize`) inside the same HTML. INDEX provides backwards compatibility for legacy Sketch manifests; new development uses INDEX as the source of truth. The current 20 generators require either Canvas2D or WebGL1; host capabilities determine support. A provisional FX fragment pathway exists in the Playground and Bridge; its contract is not yet frozen. Compositors with two inputs and direct audio-driven engines remain future work.

The tool's color `hostContext.colorOpacity` values range from 0 to 1 without consuming numeric parameter slots. The INDEX schema itself is not limited by the present 12-parameter/4-color Bridge UI.

## Get started

- Browse the site, open a tool page, or download an individual HTML from its catalog entry.
- Run HTML directly in a browser, or import generator files into Sketch.
- Load tools into [INDEX Playground](https://beerbelgio.github.io/index-html/playground.html) to test controls and combine up to five layers.
- Developers integrating a host should use the [INDEX Tool Contract](docs/INDEX-TOOL-CONTRACT.md) for manifests and rendering. Host communication transports remain integration-specific; no cross-host wire protocol is frozen yet.
- Tool paths, identifiers, categories, editorial copy and lineage are recorded in [`data/tools.json`](data/tools.json). Parameters and defaults must be read from the HTML manifest.

## Project structure

- `<tool-slug>/`: canonical current HTML, optional older version files, and tool-specific `README.md`.
- `data/tools.json`: editorial catalog, file paths and stable tool identity metadata.
- `assets/`: site UI, scripts, styles, artwork and bundled fonts.
- `docs/THIRD_PARTY_NOTICES.md`: creative lineage and third-party credits.
- `LICENSE.md`: repository-level licensing summary (kept at root for discoverability).
- `index.html`, `tool.html`, `about.html`, `playground.html`: public site pages.
- `docs/INDEX-TOOL-CONTRACT.md`: frozen generator runtime contract, creative development guidelines and FREEZE checklist.
- `CHANGELOG.md`: chronological release history.
- [`docs/ROADMAP.md`](docs/ROADMAP.md): current development priorities, research areas and open questions.
- `sitemap.xml`: public sitemap of the main INDEX pages and catalogue tools.
- `docs/RELEASE_POLICY.md`: versions, tags and promotion gates.
- `docs/KNOWN_ISSUES.md`: current reproducible limitations and workarounds.

## Development and compatibility

Version `0.21.0` aligned the browser catalog and tool pages with the INDEX-native manifest; the legacy adapter remains available for Sketch and existing host clients. Version `0.21.1` only consolidates documentation; no generator, Playground or site runtime code changed. The 20 generator algorithms and their creative parameter ranges have not been redesigned. Orbital Geometry's approved `Scale` default changes from 150 to 100.

The INDEX-native migration was based on successful user testing of 20 generators in Chrome, Sketch, Playground and Bridge on M5 and Intel machines. Those tests do not prove all hardware configurations or every standalone WebGL edge case. See [Known issues](docs/KNOWN_ISSUES.md) before relying on uniform GPU output. Do not confuse tests of Bridge 0.23.6 with approval of a future Bridge release; its Set recall defect remains tracked separately.

## License and provenance

All tool source and third-party lineage notices are in [LICENSE.md](LICENSE.md) and [THIRD_PARTY_NOTICES.md](docs/THIRD_PARTY_NOTICES.md). The project's original code is shared under PolyForm Noncommercial 1.0.0 as described in the license file. Source-available does not mean unrestricted commercial reuse.

BeerBelgio © 2026 · **Fun is a serious thing.**
