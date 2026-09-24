# Cellular Field
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Cellular_Field-v1.4.html`  
**Version:** v1.4  
**Renderer:** WebGL  
**Provenance:** `original · inspired-by`  
**Concept tags:** `field`, `shapes`

> A digital cellular ecosystem. Did you pay attention in biology class?

## What it does

Generates a living cellular field with separate cores, inner gaps and membranes, then deforms the field with animated warp. The target is an organic/tissue-like system that can move from stable cells into more distorted morphologies without becoming illustrative.

## Behavior

Drift BPM sets the base temporal clock; Cell Count changes field density; Core Size, Inner Gap and Membrane shape the cell anatomy; Warp controls deformation amount, Warp Scale its spatial frequency, Warp Drift its motion speed and Warp Complexity the number/intensity of secondary folds. Core and Membrane colors control the transparent composition.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Drift BPM | `drift_bpm` | 20–240 | 1 | 120 | No |
| Cell Count | `cell_count` | 0–50 | 0.1 | 10 | Yes |
| Core Size | `core` | 0–3 | 0.01 | 1 | Yes |
| Inner Gap | `inner_gap` | 0–100 | 0.1 | 8 | Yes |
| Membrane | `membrane` | 0–200 | 0.1 | 10 | Yes |
| Warp | `warp` | 0–100 | 1 | 15 | Yes |
| Warp Scale | `warp_scale` | 0–100 | 1 | 35 | Yes |
| Warp Drift | `warp_drift` | 0–100 | 1 | 30 | Yes |
| Warp Complexity | `warp_complexity` | 0–100 | 1 | 35 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Core | `core_color` | `#88b774` | Yes |
| Membrane | `edge` | `#ec6b2d` | Yes |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Fluid](https://github.com/enonforetsam/fluid)**: Inspired by the Cellular / Worley–Voronoi language in enonforetsam's Fluid. The current WebGL implementation is independently built.

## Development notes

Independent WebGL reinterpretation of Cellular/Worley–Voronoi language. Warp Drift uses an accumulated phase so mapped speed changes do not jump the field; the renderer stays transparent outside the generated core/membrane structure.

## Known limitations

Current file generates its own field; it does not sample the layer below it.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.