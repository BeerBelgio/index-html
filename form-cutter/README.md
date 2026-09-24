# FormCutter
Part of **[Visual Lab](../README.md)** — a standalone HTML visual tool.

**Current file:** `FormCutter-v1.3.html`  
**Version:** v1.3  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `mask-cut`, `transition`

> Basic forms, cut into slices. Kinda like a birthday cake...

## What it does

Generates a simple source shape, keeps a stable base copy visible, then fragments and displaces a second copy when Trigger fires. It is a shape-decomposition tool built for punchy, event-like cuts.

## Behavior

Source chooses filled/outlined circles and rectangles or stripe sources; Cut Mode selects horizontal bands, vertical bands, grid scatter, radial grid burst, wedges or repeated echoes; Trigger drives the event directly; Scale, Stroke Width, Cut Density, Cut Size, Displacement and Rotation define the cut; Main Color and Base Color define the two source layers.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Cut Mode | `cut_mode` | 0–5 | 1 | 0 | Yes |
| Source | `source` | 0–5 | 1 | 0 | Yes |
| Trigger | `trigger` | 0–100 | 1 | 0 | Yes |
| Scale | `scale` | 0–100 | 1 | 75 | Yes |
| Stroke Width | `stroke_width` | 0–100 | 1 | 35 | Yes |
| Cut Density | `cut_density` | 0–100 | 1 | 58 | Yes |
| Cut Size | `cut_size` | 0–100 | 1 | 60 | Yes |
| Displacement | `displacement` | 0–100 | 1 | 74 | Yes |
| Rotation | `rotation` | 0–100 | 1 | 40 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Main Color | `main_color` | `#f2eee6` | No |
| Base Color | `base_color` | `#ec6b2d` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Typoman](https://github.com/markdo27/typoman)**: FormCutter grew from a broader study of markdo27's Typoman and Flash-style kinetic visual grammar. Its cutter engine was independently built for this project.
- **inspired-by — [nuftext](https://github.com/markdo27/nuftext)**: Additional visual research reference during the FormCutter exploration: markdo27/nuftext.
- **inspired-by — [grad_text](https://github.com/markdo27/grad_text)**: Additional visual research reference during the FormCutter exploration: markdo27/grad_text.
- **inspired-by — [animtypo](https://github.com/markdo27/animtypo)**: Additional visual research reference during the FormCutter exploration: markdo27/animtypo.

## Development notes

The tool was built from internally generated geometry. Its public lineage documents only identified, verifiable reference projects. | Decay was intentionally omitted from this branch because Sketch automation can supply envelope/decay behavior.

## Known limitations

It cannot cut/rearrange the actual layer below unless Sketch exposes that layer as a texture/canvas/ImageData source. The current implementation only fragments its own generated source.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.