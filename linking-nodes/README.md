# Linking Nodes
Part of **[Visual Lab](../README.md)** — a standalone HTML visual tool.

**Current file:** `Linking_Nodes-v2.0.html`  
**Version:** v2.0  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `particles`, `lines`

> Blobs wandering around, with live links forming between them.

## What it does

Generates a population of soft moving blobs/nodes that wander through the frame, create proximity links and deform into motion-driven melted forms.

## Behavior

Amount is the actual blob count (2–200); Size sets blob radius; Wandering BPM controls motion speed; Wandering changes path irregularity without changing playback speed; Spread changes the roaming envelope; Linking and Link Width control connections; Center Size shapes the blob core; Melt deforms blobs according to motion/turning; Fill Opacity controls blob fill; Blob Color and Link Color set the two visual layers.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Amount | `amount` | 2–200 | 2 | 62 | Yes |
| Size | `size` | 0–100 | 1 | 25 | Yes |
| Wandering BPM | `wandering_bpm` | 30–240 | 1 | 120 | Yes |
| Wandering | `wandering` | 0–200 | 1 | 96 | Yes |
| Spread | `spread` | 0–200 | 1 | 110 | Yes |
| Linking | `linking` | 0–200 | 1 | 70 | Yes |
| Link Width | `link_width` | 0–200 | 1 | 80 | Yes |
| Center Size | `center_size` | 0–100 | 1 | 18 | Yes |
| Melt | `melt` | 0–500 | 1 | 0 | Yes |
| Fill Opacity | `fill_opacity` | 0–100 | 1 | 16 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Blob Color | `blob_color` | `#EC6B2D` | No |
| Link Color | `link_color` | `#E8DDC8` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Canvas UI](https://github.com/DavidHDev/canvas-ui)**: Inspired by DavidHDev's Canvas UI Bubble component. Linking Nodes was independently rebuilt as a standalone Canvas2D tool for this project.

## Development notes

Independent Canvas2D implementation. The current engine adds deterministic multi-force linking and motion-driven Melt while remaining a generated field rather than a refractive post-process.

## Known limitations

No underlying image refraction is performed; the current tool is a generated flat-blob field.

## Next ideas

- add an optional BG color/opacity control while preserving transparent output

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.