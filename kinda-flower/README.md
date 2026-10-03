# Kinda Flower
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Kinda_Flower-v1.0.html`  
**Version:** v1.0  
**Tool ID:** `IDX-012`  
**Tool type:** `generator`  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `lines`, `flow`

> "Flowers are blooming everywhere"

## What it does

Generates a layered radial system of dashed trajectories that behaves like a synthetic flowerish shape.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Rays | `rays` | 6–180 | 1 | 48 | Yes |
| Size | `size` | 20–180 | 1 | 100 | Yes |
| Ragged | `ragged` | 0–200 | 1 | 62 | Yes |
| Center X | `center_x` | -200–200 | 1 | 0 | No |
| Center Y | `center_y` | -200–200 | 1 | 0 | No |
| Width | `width` | 0.5–50 | 0.1 | 3 | Yes |
| Dash | `dash` | 1–80 | 1 | 18 | Yes |
| Gap | `gap` | 0–80 | 1 | 12 | Yes |
| Bend | `bend` | -200–200 | 1 | 42 | Yes |
| Beads | `beads` | 0–100 | 1 | 28 | Yes |
| Layer Spread | `layer_spread` | 0–200 | 1 | 42 | Yes |
| Motion BPM | `motion_bpm` | 0–260 | 1 | 72 | No |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Line Color | `line_color` | `#E8DDC8` | No |
| Accent Color | `accent_color` | `#EC6B2D` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport.

Inside Sketch, the host controls the output size through `sketchResize()`.

INDEX Browser Host may additionally pass `hostContext.colorOpacity` to control each declared color independently without consuming numeric Sketch parameters.

## Inspiration / lineage

- **inspired-by — [PLAYGRND](https://www.playgrnd.tools/dahlia)**: Inspired by the Dahlia generator on PLAYGRND. Kinda Flower is an independently implemented standalone Canvas2D radial system focused on segmented lines, layered spread and bead accents.

## Development notes

Canvas2D; deterministic three-layer radial field; curved multi-sample ray paths; segmented dash/gap stroke system; per-ray irregularity; moving accent beads fixed at 125% of line width; extended off-axis center positioning; full-range layer spread up to a 360° relationship; transparent output.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
