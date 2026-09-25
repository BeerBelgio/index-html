# INDEX HTML

**Creative code for visual systems.**

A growing **source-available** collection of standalone HTML visual tools built by **BeerBelgio / Matteo Belgiovine**.

The tools began inside BeerBelgio's audio/MIDI-reactive workflow and are currently compatible with **[Sketch Design Tools](https://tools.sketchdesign.club/)**, while remaining self-contained browser files designed to evolve beyond a single host.

**Project → INDEX HTML**  
**Current host compatibility → [Sketch Design Tools](https://tools.sketchdesign.club/) + standalone browser**  
**Creative lineage → credited per tool and in `THIRD_PARTY_NOTICES.md`**

In this repository, **BG** is shorthand for **background**. After this note, documentation uses **BG** consistently.

## Project status

**Current staging UI build → V0.12.3**  

**Live staging site → [beerbelgio.github.io/index-html/](https://beerbelgio.github.io/index-html/)**  

**V0.12.3 desktop freeze candidate:** icon-only GitHub navigation, full-hierarchy privacy update text, uppercase homepage hero statement, current user-supplied `wordmark-claim.svg`, 5 px privacy spacing, and unified secondary surfaces using the homepage overview-card hover tone (`#F4F4F0`).

**V0.12.2 desktop UI refinement:** optical alignment and icon sizing in navigation, looser Barlow display typography, single-column privacy, simplified tool header, refined development CTA, and a unified neutral secondary surface.

**INDEX HTML is currently in active staging.** The 11 standalone tool HTML files are the stable code baseline; the GitHub Pages interface, catalogue copy and supporting metadata are being reorganised and may change frequently while the public structure is being tested.

The current `tool.html` page is intentionally marked `noindex` during this phase. `data/tools.json` is the staging editorial/catalogue layer, while each tool's `window.SKETCH_TOOL` manifest remains the technical source of truth for controls, ranges, defaults, colors and host exposure.

The staging homepage queues real tool previews as they approach the viewport, initialises at most two in parallel, retries a failed runtime once, then keeps previews frozen by default and animates them only while hovered on pointer devices. The catalogue can be filtered by tool name or concept tag. Search stays collapsed until requested; catalogue cards and overview cards use the current INDEX HTML hover language, while the tool detail page now includes inline numeric ranges, progress-filled sliders and an email fallback for bug / implementation feedback.

V0.8 is a desktop UI refinement build: optical-black site ink, revised catalogue surfaces and filters, updated INDEX HTML header branding, GitHub marks, control-range hints, modulation-tip iconography and a direct development-contact CTA on each tool page.

**M PLUS Rounded 1c** remains the body/UI typeface. **Barlow Condensed** is the display typeface for headings and strong signals, using Medium for claims and ExtraBold for titles. Both are self-hosted under `assets/fonts/` under their respective SIL Open Font License terms.

## What lives here

INDEX HTML is a collection of visual generators, masks, transitions and procedural systems. Each distributed HTML file is:

- standalone and inspectable;
- usable directly in a modern browser;
- compatible with [Sketch Design Tools](https://tools.sketchdesign.club/) through its exposed manifest;
- built without a project-wide build system or external runtime dependency;
- documented with its own controls, lineage and licence notes.

Sketch is a supported host, not the identity of the project. The longer-term architecture is intended to remain portable enough for future browser, MIDI, Max/Ableton and compositing workflows.

## Repository structure

```text
index-html/
├── .gitignore
├── .gitattributes
├── .nojekyll
├── README.md
├── LICENSE.md
├── THIRD_PARTY_NOTICES.md
├── index.html
├── about.html
├── tool.html
├── assets/
│   ├── branding/
│   │   ├── favicon.svg
│   │   ├── wordmark.svg
│   │   ├── wordmark-claim.svg
│   │   └── about.svg
│   ├── css/
│   │   ├── home-page.css
│   │   └── tool-page.css
│   ├── fonts/
│   │   └── barlow-condensed/
│   └── js/
│       ├── home-page.js
│       └── tool-page.js
├── data/
│   └── tools.json
├── linking-nodes/
├── cassini-flow/
├── caustic-stitch/
├── cellular-field/
├── nodal-morph/
├── form-cutter/
├── fractured-mask/
├── scatter-front/
├── topographic/
├── topographic-mask/
└── formshift/
```

Each tool folder contains the current standalone HTML file and its tool-specific `README.md`. The staging Pages layer now includes a catalogue homepage (`index.html`), an `about.html` page and one generic `tool.html` page. The homepage builds the 11 catalogue cards from `data/tools.json`: each actual tool is rendered once as a frozen preview, then runs only while a fine-pointer user hovers that card. The detail URL selects a tool, `data/tools.json` supplies editorial content, and the selected tool's own manifest supplies the technical controls.

## How to use a tool

### In [Sketch Design Tools](https://tools.sketchdesign.club/)

1. Import the HTML file as a Custom HTML Tool.
2. Use the controls exposed by its manifest.
3. Map the controls exposed to Audio Sync where useful.
4. Combine the tool with other layers as part of a larger visual workflow.

### In a browser

Open the same HTML file directly. Its local preview follows the browser viewport; inside Sketch, the host controls render size through `sketchResize()`.

## Provenance labels

- **original** — no meaningful third-party implementation code or structure is retained in the current tool. A tool may still have explicit creative lineage.
- **inspired-by** — another public project influenced the concept, visual language or interaction, while the current implementation was independently built.
- **derived-from** — meaningful implementation is inherited from another INDEX HTML tool.
- **adapted-from** — reserved for a future case where meaningful third-party implementation code or structure is retained and its licence obligations must be carried through.

The current set contains **no `adapted-from` tools**. Topographic Mask is the only confirmed internal `derived-from` tool.

## Current tool set

| Tool | Version | Renderer | Concept tags | Current file |
|---|---:|---|---|---|
| [Linking Nodes](linking-nodes/) | v2.0 | Canvas 2D | particles · lines | `Linking_Nodes-v2.0.html` |
| [Cassini Flow](cassini-flow/) | v1.6 | Canvas 2D | field · stripes | `Cassini_Flow-v1.6.html` |
| [Caustic Stitch](caustic-stitch/) | v1.7 | Canvas 2D | lines · shapes | `Caustic_Stitch-v1.7.html` |
| [Cellular Field](cellular-field/) | v1.4 | WebGL | field · shapes | `Cellular_Field-v1.4.html` |
| [Nodal Morph](nodal-morph/) | v1.8 | WebGL | field · stripes | `Nodal_Morph-v1.8.html` |
| [FormCutter](form-cutter/) | v1.3 | Canvas 2D | mask-cut · transition | `FormCutter-v1.3.html` |
| [Fractured Mask](fractured-mask/) | v1.4 | Canvas 2D | mask-cut | `Fractured_Mask-v1.4.html` |
| [Scatter Front](scatter-front/) | v1.5 | Canvas 2D | particles · transition | `Scatter_Front-v1.5.html` |
| [Topographic](topographic/) | v1.3 | Canvas 2D | field · lines | `Topographic-v1.3.html` |
| [Topographic Mask](topographic-mask/) | v1.9 | Canvas 2D | field · shapes | `Topographic_Mask-v1.9.html` |
| [FormShift](formshift/) | v1.7 | Canvas 2D | transition · shapes | `FormShift-v1.7.html` |

## Validation

The current 11-tool set has been checked for:

- JavaScript syntax;
- manifest limits and key integrity;
- missing runtime helpers/references through Canvas/WebGL smoke testing;
- host-style execution and standalone-preview execution;
- viewport-responsive local previews;
- consistent tool name, version, manifest name, `<title>` and filename;
- the standard project licence notice in every distributed HTML file.

Real Sketch remains the authoritative host/performance test, especially for WebGL and high-resolution output.

## Credits and lineage

External projects that influenced INDEX HTML are credited in each tool README and in `THIRD_PARTY_NOTICES.md`.

The current audit found no meaningful third-party implementation code retained in the distributed HTML tools. External relationships are therefore documented as creative/conceptual lineage unless explicitly stated otherwise.

## Licence

Original code is published under the **PolyForm Noncommercial License 1.0.0**. Original documentation and creative material are published under **CC BY-NC 4.0**, to the extent the project owns the applicable rights.

Commercial or monetised use is not automatically granted and requires a separate agreement.

See `LICENSE.md`, `THIRD_PARTY_NOTICES.md` and the staging [About / licensing page](https://beerbelgio.github.io/index-html/about.html#licensing).

---

**INDEX HTML**  
Matteo Belgiovine / BeerBelgio  
https://beerbelgio.github.io/
