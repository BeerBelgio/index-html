# FormCutter
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `FormCutter-v1.4.html`  
**Version:** v1.4  
**Tool ID:** `IDX-006`  
**Tool type:** `generator`  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `mask-cut`, `transition`

> Basic forms, cut into slices. Main composition object or just layering mask is up to you, go wild.

## What it does

Generates a simple source shape, keeps a stable base copy visible, then fragments and displaces a second copy when Trigger fires. It is a shape-decomposition tool built for punchy, event-like cuts.

## Behavior

Source chooses filled/outlined circles and rectangles or stripe sources; Cut Mode selects horizontal bands, vertical bands, grid scatter, radial grid burst, wedges or repeated echoes; Trigger drives the event directly; Scale, Stroke Width, Cut Density, Cut Size, Displacement and Rotation define the cut; Main Color and Base Color define the two source layers.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Cut Mode | `cut_mode` | 0–5 | 1 | 0 | Yes |
| Source | `source` | 0–5 | 1 | 2 | Yes |
| Trigger | `trigger` | 0–100 | 1 | 0 | Yes |
| Scale | `scale` | 0–100 | 1 | 30 | Yes |
| Stroke Width | `stroke_width` | 0–100 | 1 | 35 | Yes |
| Cut Density | `cut_density` | 0–100 | 1 | 80 | Yes |
| Cut Size | `cut_size` | 0–100 | 1 | 60 | Yes |
| Displacement | `displacement` | 0–100 | 1 | 74 | Yes |
| Rotation | `rotation` | 0–100 | 1 | 40 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Main Color | `main_color` | `#EC6B2D` | No |
| Base Color | `base_color` | `#F2EEE6` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Typoman](https://github.com/markdo27/typoman)**: FormCutter grew from a broader study of markdo27's previous version of Typoman and Flash-style kinetic visual grammar. The implementation was independently built for this project.

## Development notes

Canvas2D; internally generated circles/rectangles/stripes, stable base plus fragmented copy, six cut modes using rectangle/wedge clipping, displacement, rotation and echoes.

## Known limitations

It cannot cut/rearrange the actual layer below. The current implementation only fragments its own generated source.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
