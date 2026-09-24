# Caustic Stitch
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Caustic_Stitch-v1.7.html`  
**Version:** v1.7  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `lines`, `shapes`

> Points, two-color lines and basic forms. Then a multi-force warp makes the lines move fluidly and unpredictably.

## What it does

Creates string-art style line fields across several geometric boundary families, with an independently controlled accent group and optional multi-force line warping.

## Behavior

Mode selects one of nine boundary families; Points and Multiplier define the stitch network; Scale and Spread set its spatial envelope; Line Width controls the base network; Accent, Accent Width and Accent Variations define the highlighted line group; Rotation rotates the construction; Warp bends the stitch lines through the internal multi-force deformation system.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Mode | `mode` | 0–8 | 1 | 0 | No |
| Points | `points` | 12–240 | 1 | 96 | Yes |
| Multiplier | `multiplier` | 1–24 | 0.1 | 2.4 | Yes |
| Scale | `scale` | 0–100 | 1 | 74 | Yes |
| Spread | `spread` | 0–200 | 1 | 22 | Yes |
| Line Width | `line_width` | 1–100 | 1 | 18 | Yes |
| Accent | `accent` | 0–100 | 1 | 46 | Yes |
| Accent Width | `accent_width` | 0–100 | 1 | 32 | Yes |
| Accent Variations | `accent_variations` | 0–100 | 1 | 0 | Yes |
| Rotation | `rotation` | 0–360 | 1 | 0 | Yes |
| Warp | `warp` | 0–100 | 1 | 0 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Line Color | `line_color` | `#f2eee6` | No |
| Accent Color | `accent_color` | `#EC6B2D` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Fluid](https://github.com/enonforetsam/fluid)**: Inspired by the Stitch / string-art caustic concept in enonforetsam's Fluid. The current line engine is independently implemented.

## Development notes

Fluid Stitch remains the conceptual starting point, but the current Canvas2D renderer uses its own geometry families, accent system and an internal multi-force Warp derived from the Linking Nodes deformation logic.

## Known limitations

Generated line construction only; it does not trace an underlying image.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.