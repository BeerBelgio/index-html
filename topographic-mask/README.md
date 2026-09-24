# Topographic Mask
Part of **[Visual Lab](../README.md)** — a standalone HTML visual tool.

**Current file:** `Topographic_Mask-v1.9.html`  
**Version:** v1.9  
**Renderer:** Canvas 2D  
**Provenance:** `derived-from · inspired-by`  
**Concept tags:** `field`, `shapes`

> High-school fluid dynamics, but fun.

## What it does

Uses the Topographic procedural field as a filled-mask engine: ranked contour bands are progressively activated, with independent BG opacity and color.

## Behavior

Mode, Seed, Levels and Scale define the underlying procedural field; Warp changes field detail/deformation; Band Shift offsets the filled contour bands; Drift animates the field continuously; Mask Fill controls how many ranked bands are active; BG Opacity controls the BG. Fill Color and BG Color define the two layers.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Mode | `mode` | 0–5 | 1 | 0 | Yes |
| Seed | `seed` | 0–100 | 1 | 13 | Yes |
| Levels | `levels` | 2–40 | 1 | 18 | Yes |
| Scale | `scale` | 0–100 | 1 | 42 | Yes |
| Warp | `ruggedness` | 0–100 | 1 | 34 | Yes |
| Band Shift | `height_shift` | 0–100 | 1 | 0 | Yes |
| Drift | `drift` | 0–100 | 1 | 18 | Yes |
| Mask Fill | `mask_fill` | 0–100 | 1 | 34 | Yes |
| BG Opacity | `bg_opacity` | 0–100 | 1 | 100 | No |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Fill Color | `fill_color` | `#EC6B2D` | No |
| BG Color | `bg_color` | `#1C1713` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **derived-from — Topographic**: Derived internally from Topographic, reworking the same procedural field into a filled-mask system.
- **inspired-by — [Fluid](https://github.com/enonforetsam/fluid)**: Topographic Mask inherits Fluid's conceptual lineage indirectly through its Topographic parent.

## Development notes

Internally derived from Topographic but increasingly specialized: filled ranked bands, adaptive native-resolution sampling, BG controls and a sub-pixel overlap pass to remove cell seams.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.