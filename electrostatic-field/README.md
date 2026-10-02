# Electrostatic Field
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Electrostatic_Field-v1.0.html`  
**Version:** v1.0  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `flow`, `lines`

> Imagine seeing an electrostatic energy field in a couple of colors, maybe across a couple of materials too.

## What it does

Generates a field of animated trajectories driven by four structural modes. Lines respond to vector flow, local wave warp and attract/repel poles; increasing Pole Count disperses those deformation centres across the canvas and weakens their individual pull, while Spread lets paths peel away from the shared field.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| System Shape | `system_shape` | 0–3 | 1 | 3 | No |
| Density | `density` | 6–120 | 1 | 90 | Yes |
| Scale | `scale` | 40–300 | 1 | 275 | Yes |
| Flow | `flow` | 0–300 | 1 | 58 | Yes |
| Warp | `warp` | 0–100 | 1 | 42 | Yes |
| Pole Force | `pole_force` | 0–100 | 1 | 52 | Yes |
| Pole Count | `pole_count` | 3–96 | 1 | 24 | Yes |
| Path Length | `path_length` | 10–100 | 1 | 56 | Yes |
| Spread | `spread` | 0–200 | 1 | 44 | Yes |
| Line Width | `line_width` | 0.5–6 | 0.1 | 1.2 | Yes |
| Accent | `accent` | 0–100 | 1 | 18 | Yes |
| Motion BPM | `motion_bpm` | 30–180 | 1 | 76 | No |

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

- **inspired-by — [Book of Shapes](https://bookofshapes.com/)**: Inspired by selected flow / physics studies from Book of Shapes. Electrostatic Field is an independently implemented standalone Canvas2D field system for this project.

## Development notes

Canvas2D; deterministic emitter families; four vector-field topologies; localized attract/repel pole field with count-dependent spatial dispersion and force attenuation; per-line dual-frequency local warp; progressive per-line spread; deterministic accent subset; transparent output.

## Known limitations

High Density, Pole Count and Path Length combinations increase CPU cost. Poles are invisible force centres rather than rendered objects.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
