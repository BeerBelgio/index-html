# INDEX HTML

**Creative code for visual systems.**

A growing **source-available** collection of standalone HTML visual tools built by **BeerBelgio**.

The tools began inside BeerBelgio's audio/MIDI-reactive workflow and are compatible with **[Sketch](https://tools.sketchdesign.club/)**, standalone modern browsers and the native **INDEX Browser Host** contract, while remaining self-contained HTML files rather than belonging to a single host.

**Project → INDEX HTML**  
**Current host compatibility → [Sketch](https://tools.sketchdesign.club/) + standalone browser + INDEX Browser Host**  
**Creative lineage → credited per tool and in `THIRD_PARTY_NOTICES.md`**

In this repository, **BG** is shorthand for **background**. After this note, documentation uses **BG** consistently.

## Project status

**Current staging UI build → V0.18.1**

**V0.17 catalogue + host-compatibility expansion:** INDEX HTML grows from **11 to 20 tools**. Nine new Canvas2D tools are added with final public naming, V9.1 editorial metadata, per-tool lineage and the same native Browser Host color-opacity contract already used by the original set. Catalogue and hero continue to share one motion recipe per tool.

**V0.17.1 motion-recipe sync:** the shared catalogue / hero recipes are synchronized to the current V9 master after the catalogue pass. Recipes marked **Advance time** now run directly from each tool's manifest defaults while the shared preview clock advances; explicit recipes remain targeted parameter overrides. The values remain provisional until the live hero pass is complete.

**V0.17.2 default sync:** HTML defaults are synchronized to the current V9.1 master after the catalogue pass. Scan Accumulator, Orbital Geometry, Lava Lamp, Electrostatic Field, Homer's Hair and Sticky Plants receive updated starting values; ranges, steps, Audio Sync exposure, color contracts and rendering logic are unchanged. The affected tool versions remain unchanged while these new v1.0 tools are still being tuned in staging.

**V0.18 distribution + host-readiness pass:** the project now carries stable `toolId` and `toolType` metadata from the V9.2 master, adds a responsive two-line homepage hero title, documents the in-development Max for Live host on the About page, and adds a browser-generated **Download All** bundle that always resolves the current tool files from `data/tools.json`. Every canonical HTML source now carries a standardized INDEX HTML header/footer identity block. Topographic's Line Width default is synchronized to **50**.


**V0.18.1 responsive + distribution polish:** the homepage hero title returns to natural responsive wrapping, the homepage Download All control is removed while catalogue spacing is restored, About interaction states are aligned with the rest of the site, and the generated collection bundle now ships one combined `LEGAL.md` plus the unified `INDEX-HTML_BEERBELGIO.svg` identity asset. The flat `tools/` directory remains the intended local-cache direction for the future Max host workflow.
The V0.15 vector-masked hero architecture remains unchanged: one eligible real tool is selected randomly, rendered on the fixed **831 × 211 px** logical surface, and kept in motion while visible. V0.17.1 resynchronized preview motion behaviour; V0.17.2 synchronizes the selected manifest defaults from V9.1 without changing rendering algorithms.

**Live staging site → [beerbelgio.github.io/index-html/](https://beerbelgio.github.io/index-html/)**

**INDEX HTML is currently in active staging.** The 20 standalone tool HTML files are the current code baseline; the GitHub Pages interface, catalogue copy and host contracts may continue to evolve while the public system is tested.

The current `tool.html` page is intentionally marked `noindex` during this phase. `data/tools.json` is the staging editorial/catalogue layer and now also carries each tool's stable `toolId` and structural `toolType`, while each tool's `window.SKETCH_TOOL` manifest remains the technical source of truth for controls, ranges, defaults, colors and Sketch Audio Sync exposure. The optional second `sketchDraw(state, hostContext)` argument extends the same files with host-only context without changing the Sketch/standalone contract.

For INDEX Browser Host, declared manifest colors can receive independent normalized opacity through `hostContext.colorOpacity`. Missing host context, missing opacity data or missing color keys resolve to full opacity, so legacy `sketchDraw(state)` calls remain unchanged. This host-side opacity does **not** consume any of the numeric Sketch parameter slots.

The homepage queues real tool previews as they approach the viewport, initialises at most two catalogue previews in parallel, retries a failed runtime once, keeps catalogue previews frozen by default and animates them only while hovered on fine-pointer devices. The homepage hero loads one random eligible real tool and animates it continuously whenever the hero is on screen. Both surfaces use the same per-tool motion recipe. The catalogue can be filtered by tool name or concept tag.

**M PLUS Rounded 1c** remains the body/UI typeface. **Barlow Condensed** is the display typeface for headings and strong signals, using Medium for claims and ExtraBold for titles. Both are self-hosted under `assets/fonts/` under their respective SIL Open Font License terms.

## What lives here

INDEX HTML is a collection of visual generators, masks, transitions and procedural systems. Each distributed HTML file is:

- standalone and inspectable;
- usable directly in a modern browser;
- compatible with [Sketch](https://tools.sketchdesign.club/) through its exposed manifest;
- compatible with INDEX Browser Host through an optional host-context layer;
- built without a project-wide build system or external runtime dependency;
- documented with its own controls, lineage and licence notes.

Sketch is a supported host, not the identity of the project. INDEX Browser Host follows the same principle: the HTML visual engine stays portable while Max/Ableton, browser, MIDI, OSC or other systems can supply control data through a host layer.

## Repository structure

```text
index-html/
├── .gitignore
├── .gitattributes
├── .nojekyll
├── README.md
├── LICENSE.md
├── THIRD_PARTY_NOTICES.md
├── INDEX-CONTROL-PROTOCOL.md
├── index.html
├── about.html
├── tool.html
├── assets/
│   ├── branding/
│   ├── css/
│   ├── fonts/
│   └── js/
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
├── formshift/
├── kinda-flower/
├── syn-division/
├── dna-filament/
├── scan-accumulator/
├── orbital-geometry/
├── lava-lamp/
├── electrostatic-field/
├── homers-hair/
└── sticky-plants/
```

Each tool folder contains the current standalone HTML file and its tool-specific `README.md`. Every tool also has a stable `IDX-###` identity and a structural `toolType` in `data/tools.json`; all current tools are `generator`. The Pages layer includes the catalogue homepage (`index.html`), the `about.html` page and one generic `tool.html` page. The homepage builds all **20** catalogue cards from `data/tools.json`: each actual tool is rendered once as a frozen preview, then runs only while a fine-pointer user hovers that card. The hero independently selects one eligible real tool at random on each page load and renders it continuously through the vector wordmark + claim mask on an 831 × 211 logical surface. The detail URL selects a tool, `data/tools.json` supplies editorial content, and the selected tool's own manifest supplies the technical controls.

## How to use a tool

### In [Sketch](https://tools.sketchdesign.club/)

1. Import the HTML file as a Custom HTML Tool.
2. Use the controls exposed by its manifest.
3. Map the controls exposed to Audio Sync where useful.
4. Combine the tool with other layers as part of a larger visual workflow.

### In a browser

Open the same HTML file directly. Its local preview follows the browser viewport; inside a compatible host, render size can be supplied through `sketchResize()`.

### In INDEX Browser Host

Call the same visual contract with `sketchDraw(state, hostContext)`. The optional `hostContext.colorOpacity` object can control the alpha of each color declared in `window.SKETCH_TOOL.colors` independently. Omitting `hostContext` preserves the normal standalone/Sketch rendering.

### Download the current collection

The Pages interface can build a ZIP directly in the browser from the current `data/tools.json` catalogue. The bundle contains the current canonical HTML files in a flat `tools/` directory plus a combined `LEGAL.md`, a compact local manifest and one INDEX HTML / BeerBelgio identity SVG. It is generated on demand rather than maintained as a separate static release asset.

### Tool roles

`toolType` is structural host metadata rather than a concept tag. The current vocabulary is `generator`, with `effect`, `compositor` and `source` reserved for future host-aware tools. These future roles do not change the current Sketch manifest contract. See `INDEX-CONTROL-PROTOCOL.md`.

## Provenance labels

- **original** — no meaningful third-party implementation code or structure is retained in the current tool. A tool may still have explicit creative lineage.
- **inspired-by** — another public project influenced the concept, visual language or interaction, while the current implementation was independently built.
- **derived-from** — meaningful implementation is inherited from another INDEX HTML tool.
- **adapted-from** — reserved for a future case where meaningful third-party implementation code or structure is retained and its licence obligations must be carried through.

The current set contains **no `adapted-from` tools**. Topographic Mask is the only confirmed internal `derived-from` tool.

## Current tool set

| Tool | Version | Renderer | Concept tags | Current file |
|---|---:|---|---|---|
| [Linking Nodes](linking-nodes/) | v2.1 | Canvas 2D | particles · lines | `Linking_Nodes-v2.1.html` |
| [Cassini Flow](cassini-flow/) | v1.7 | Canvas 2D | field · stripes | `Cassini_Flow-v1.7.html` |
| [Caustic Stitch](caustic-stitch/) | v1.9 | Canvas 2D | lines · shapes | `Caustic_Stitch-v1.9.html` |
| [Cellular Field](cellular-field/) | v1.5 | WebGL | field · shapes | `Cellular_Field-v1.5.html` |
| [Nodal Morph](nodal-morph/) | v1.9 | WebGL | field · stripes | `Nodal_Morph-v1.9.html` |
| [FormCutter](form-cutter/) | v1.4 | Canvas 2D | mask-cut · transition | `FormCutter-v1.4.html` |
| [Fractured Mask](fractured-mask/) | v1.7 | Canvas 2D | mask-cut | `Fractured_Mask-v1.7.html` |
| [Scatter Front](scatter-front/) | v1.7 | Canvas 2D | particles · transition | `Scatter_Front-v1.7.html` |
| [Topographic](topographic/) | v1.4 | Canvas 2D | field · lines | `Topographic-v1.4.html` |
| [Topographic Mask](topographic-mask/) | v1.11 | Canvas 2D | field · shapes | `Topographic_Mask-v1.11.html` |
| [FormShift](formshift/) | v1.8 | Canvas 2D | transition · shapes | `FormShift-v1.8.html` |
| [Kinda Flower](kinda-flower/) | v1.0 | Canvas 2D | lines · flow | `Kinda_Flower-v1.0.html` |
| [Syn Division](syn-division/) | v1.0 | Canvas 2D | lines · field | `Syn_Division-v1.0.html` |
| [DNA Filament](dna-filament/) | v1.0 | Canvas 2D | lines · field | `DNA_Filament-v1.0.html` |
| [Scan Accumulator](scan-accumulator/) | v1.0 | Canvas 2D | lines · transition | `Scan_Accumulator-v1.0.html` |
| [Orbital Geometry](orbital-geometry/) | v1.0 | Canvas 2D | lines · shapes | `Orbital_Geometry-v1.0.html` |
| [Lava Lamp](lava-lamp/) | v1.0 | Canvas 2D | field · shapes | `Lava_Lamp-v1.0.html` |
| [Electrostatic Field](electrostatic-field/) | v1.0 | Canvas 2D | flow · lines | `Electrostatic_Field-v1.0.html` |
| [Homer's Hair](homers-hair/) | v1.0 | Canvas 2D | lines · flow | `Homers_Hair-v1.0.html` |
| [Sticky Plants](sticky-plants/) | v1.0 | Canvas 2D | lines · field | `Sticky_Plants-v1.0.html` |


## Validation

The current 20-tool set is checked for:

- JavaScript syntax;
- manifest limits and key integrity;
- consistent tool name, version, manifest name, `<title>` and filename;
- standard project licence notice in every distributed HTML file;
- numeric defaults inside declared ranges;
- Audio Sync destinations that resolve to existing numeric parameter keys;
- native host color-opacity coverage for every declared manifest color;
- preservation of the existing 11 rendering/default behaviour and motion recipes while integrating the new nine;
- coherent catalogue metadata, lineage and file references in `data/tools.json`.

Static contract and syntax checks are included in this RC. **Real Sketch and the INDEX Browser Host / Max device remain the authoritative runtime/integration tests**, especially for multilayer composition, WebGL and high-resolution output.

## Credits and lineage

External projects that influenced INDEX HTML are credited in each tool README and in `THIRD_PARTY_NOTICES.md`.

The current audit found no meaningful third-party implementation code retained in the distributed HTML tools. External relationships are therefore documented as creative/conceptual lineage unless explicitly stated otherwise.

## Licence

Original code is published under the **PolyForm Noncommercial License 1.0.0**. Original documentation and creative material are published under **CC BY-NC 4.0**, to the extent the project owns the applicable rights.

Commercial or monetised use is not automatically granted and requires a separate agreement.

See `LICENSE.md`, `THIRD_PARTY_NOTICES.md` and the staging [About / licensing page](https://beerbelgio.github.io/index-html/about.html#licensing).

---

**INDEX HTML**  
BeerBelgio  
https://beerbelgio.github.io/
