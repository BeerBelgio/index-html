# Fractured Mask
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Fractured_Mask-v1.4.html`  
**Version:** v1.4  
**Renderer:** Canvas 2D  
**Provenance:** `original`  
**Concept tags:** `mask-cut`

> Random, irregular and warped fragments for multilayer masking.

## What it does

Builds a grid of irregular polygonal fragments and controls which cells are visible, how much of each cell is filled and how opaque the result is. The result behaves as a generated fracture/mask layer rather than a displaced copy of another image.

## Behavior

Layout selects balanced, horizontal or vertical bias; Seed changes the fracture; Density sets subdivision count; Cut Asymmetry controls the size imbalance of neighbouring fragments; Coverage Distribution chooses which cells are active; Fragment Fill controls per-fragment area; Fill Opacity and Fill Color control the rendered mask.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Layout | `layout` | 0–2 | 1 | 0 | Yes |
| Seed | `seed` | 0–100 | 1 | 18 | Yes |
| Density | `density` | 0–100 | 1 | 46 | Yes |
| Cut Asymmetry | `cut_asymmetry` | 0–100 | 1 | 42 | Yes |
| Coverage Distribution | `coverage_distribution` | 0–100 | 1 | 74 | Yes |
| Fragment Fill | `fragment_fill` | 0–100 | 1 | 100 | Yes |
| Fill Opacity | `fill_opacity` | 0–100 | 1 | 100 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Fill Color | `fill_color` | `#1c1713` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **internal sibling — FormCutter / shared Flash exploration**: Developed alongside FormCutter from the same internal masking/cutting exploration; it is a sibling idea, not a code derivative.

## Development notes

The current grid uses ordered weighted cuts for stronger asymmetry without self-intersecting cells; a small geometric overlap closes antialiasing seams at full Fragment Fill.

## Known limitations

It generates its own mask polygons; it does not fracture the pixels of the layer below by itself.

## Next ideas

- use the generated fracture as a true interactive mask between upstream/downstream visual layers once the browser host can expose source content

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.