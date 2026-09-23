# Topographic
Part of **[BeerBelgio Visual Lab](../README.md)** — a standalone HTML visual tool.

**Current file:** `Topographic-v1.3.html`  
**Version:** v1.3  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `field`, `lines`

> Not like a pirate map, but if you look hard enough, maybe you'll find a treasure here too.

## What it does

Generates animated topographic contour lines from a procedural scalar field. Several field families can produce soft terrain, ridges, rings, waves and warped contours.

## Behavior

Terrain Mode selects the procedural field family; Seed changes the pattern; Levels sets contour count; Scale and Roughness control spatial scale/detail; Height Shift moves the contour thresholds; Drift animates the field continuously; Line Width controls contour thickness; Accent runs from no highlighted lines at 0 to all highlighted at 10; Rotation controls orientation. Line Color and Accent Color set the palette.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Terrain Mode | `mode` | 0–5 | 1 | 0 | Yes |
| Seed | `seed` | 0–100 | 1 | 13 | Yes |
| Levels | `levels` | 2–40 | 1 | 18 | Yes |
| Scale | `scale` | 0–100 | 1 | 42 | Yes |
| Roughness | `ruggedness` | 0–100 | 1 | 34 | Yes |
| Height Shift | `height_shift` | 0–100 | 1 | 0 | Yes |
| Drift | `drift` | 0–100 | 1 | 0 | Yes |
| Line Width | `line_width` | 1–100 | 1 | 18 | Yes |
| Accent | `accent` | 0–10 | 0.1 | 5 | Yes |
| Rotation | `rotation` | 0–360 | 1 | 0 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Line Color | `line_color` | `#E8DDC8` | No |
| Accent Color | `accent_color` | `#EC6B2D` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Fluid](https://github.com/enonforetsam/fluid)**: Inspired by the topographic / contour-field concept in enonforetsam's Fluid. The current contour engine is independently implemented.

## Development notes

Base topographic generator using explicit contour extraction. The current version adds continuous Drift, a 0–10 Accent amount and the updated Terrain Mode / Roughness control language.

## Known limitations

Procedural contour generator, not terrain data visualization.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.