# Nodal Morph
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Nodal_Morph-v1.8.html`  
**Version:** v1.8  
**Renderer:** WebGL  
**Provenance:** `original · inspired-by`  
**Concept tags:** `field`, `stripes`

> Chladni figures with variable morphing and warped motion.

## What it does

Generates Chladni-like nodal figures on the GPU, morphing between modal states and rendering through an adaptive supersampled WebGL pass.

## Behavior

Mode X and Mode Y select the modal pair; Morph blends toward the neighbouring pair; Line Width defines the visible nodal band; Warp and Rotation deform/reorient the pattern; Motion BPM controls temporal motion. BG Opacity plus Line, Accent and BG colors control the final WebGL composition.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Mode X | `mode_x` | 1–12 | 1 | 4 | Yes |
| Mode Y | `mode_y` | 1–12 | 1 | 7 | Yes |
| Morph | `morph` | 0–100 | 1 | 18 | Yes |
| Line Width | `line_width` | 1–100 | 1 | 26 | Yes |
| Warp | `warp` | 0–100 | 1 | 14 | Yes |
| Rotation | `rotation` | 0–360 | 1 | 0 | Yes |
| Motion BPM | `motion_bpm` | 30–240 | 1 | 120 | Yes |
| BG Opacity | `bg_opacity` | 0–100 | 1 | 100 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Line Color | `line_color` | `#6A9E5D` | No |
| Accent Color | `accent_color` | `#E8DDC8` | No |
| BG Color | `bg_color` | `#1C1713` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Fluid](https://github.com/enonforetsam/fluid)**: Inspired by the Chladni / nodal field work in enonforetsam's Fluid and by standard Chladni plate mathematics. The current WebGL implementation is independently built.

## Development notes

The renderer has moved from the earlier CPU/Canvas2D implementation to a GPU WebGL pipeline with adaptive supersampling and a render-budget cap, retaining the same Chladni mathematics and visual behaviour while reducing high-resolution CPU cost.

## Known limitations

The visual system is mathematically inspired by Chladni figures but is not intended as a scientific simulator.

## Next ideas

- explore a genuinely audio-derived nodal response rather than only mapping controls onto a mathematical Chladni construction

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.