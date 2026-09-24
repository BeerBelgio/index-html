# FormShift
Part of **[Visual Lab](../README.md)** — a standalone HTML visual tool.

**Current file:** `FormShift-v1.7.html`  
**Version:** v1.7  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `transition`, `shapes`

> Basic shapes, photography concepts and middle-school geometry: can something go wrong?

## What it does

Generates a basic geometric source and applies trigger-driven Flash-style cuts, slotting, wedge splits, echoes and radial copy movements. The current engine is shape-based rather than typographic.

## Behavior

FX Type selects one of six transition families; Shape selects one of six generated sources; Trigger is the direct FX envelope with no internal decay; Impact controls displacement strength; Scale sets source size; Horizontal Stretch and Vertical Stretch deform the source independently; Rotation, Split and Shutter shape the transition; Shape Color and Accent Color define the palette.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| FX Type | `scene` | 0–5 | 1 | 0 | Yes |
| Shape | `shape` | 0–5 | 1 | 0 | Yes |
| Trigger | `trigger` | 0–100 | 1 | 0 | Yes |
| Impact | `impact` | 0–100 | 1 | 70 | Yes |
| Scale | `scale` | 0–100 | 1 | 70 | Yes |
| Horizontal Stretch | `stretch_x` | 0–100 | 1 | 20 | Yes |
| Vertical Stretch | `stretch_y` | 0–100 | 1 | 0 | Yes |
| Rotation | `rotation` | 0–100 | 1 | 50 | Yes |
| Split | `split` | 0–100 | 1 | 62 | Yes |
| Shutter | `shutter` | 0–100 | 1 | 62 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Shape Color | `shape_color` | `#f2eee6` | No |
| Accent Color | `accent_color` | `#ec6b2d` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Typoman](https://github.com/markdo27/typoman)**: Inspired by markdo27's Typoman and its kinetic Flash-style transition grammar. FormShift is an independent shape-based implementation.

## Development notes

The current shape-based engine keeps the external Typoman project as visual/interaction lineage only. Transition was replaced by a direct Trigger envelope, internal Decay was removed, and stretch is now independent on X/Y.

## Known limitations

Like FormCutter, the current implementation transforms its own generated source canvas; it does not decompose the actual lower Sketch layer without an exposed source texture/canvas.

## Next ideas

- add optional BG color/opacity while preserving transparent output

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.