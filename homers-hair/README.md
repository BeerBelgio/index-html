# Homer's Hair
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Homers_Hair-v1.0.html`  
**Version:** v1.0  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `lines`, `flow`

> The first time I tried it, it just looked like Homer Simpson's two lonely hairs.

## What it does

Builds a repeated family from one source curve then transforms each copy through spacing, displacement, phase offset, scale, rotation, warp and travelling propagation.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Base Curve | `system` | 0–3 | 1 | 3 | No |
| Repetitions | `repetitions` | 2–100 | 1 | 24 | Yes |
| Spacing | `spacing` | 0–200 | 1 | 58 | Yes |
| Displacement | `displacement` | 0–200 | 1 | 54 | Yes |
| Phase Offset | `phase_offset` | 0–360 | 1 | 18 | Yes |
| Scale Step | `scale_step` | -8–8 | 0.1 | 0.8 | Yes |
| Rotation Step | `rotation_step` | -30–30 | 0.1 | 2.2 | Yes |
| Curve Tension | `curve_tension` | 0–400 | 1 | 168 | Yes |
| Warp | `warp` | 0–200 | 1 | 34 | Yes |
| Propagation | `propagation` | 0–200 | 1 | 70 | Yes |
| Line Width | `line_width` | 0.5–6 | 0.1 | 1.2 | Yes |
| Motion BPM | `motion_bpm` | 0–260 | 1 | 72 | No |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Line Color | `line_color` | `#E8DDC8` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport.

Inside Sketch, the host controls the output size through `sketchResize()`.

INDEX Browser Host may additionally pass `hostContext.colorOpacity` to control each declared color independently without consuming numeric Sketch parameters.

## Inspiration / lineage

- **inspired-by — [Brand Assets Generator](https://brand-generator.stoyanov.works/)**: Inspired by selected curve-repetition studies in Yordan Stoyanov's Brand Assets Generator. Homer's Hair is an independently implemented standalone Canvas2D tool for this project.

## Development notes

Canvas2D; four base-curve systems; progressive repetition engine; normal-based displacement; secondary warp layer; scale and rotation steps; propagation-based cascading deformation with speed decoupled from playback BPM; transparent output.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
