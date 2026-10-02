# Sticky Plants
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Sticky_Plants-v1.0.html`  
**Version:** v1.0  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `lines`, `field`

> They do seem like sticky plants, but they were actually a branching coral system.

## What it does

Generates a family of coral-like line structures that branch, fork and build ribbed fan patterns across the canvas. The system can grow inward from each edge or appear at random in-canvas origins, shifting between tidy formations and more irregular, asymmetrical growth.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Mode | `mode` | 0–4 | 1 | 4 | No |
| Branches | `branches` | 2–72 | 1 | 6 | Yes |
| Forking | `forking` | 0–300 | 1 | 112 | Yes |
| Spacing | `spacing` | 0–300 | 1 | 78 | Yes |
| Spread | `spread` | 0–200 | 1 | 118 | Yes |
| Width | `width` | 0.5–25 | 0.1 | 4.2 | Yes |
| Wobble | `wobble` | 0–200 | 1 | 54 | Yes |
| Growth | `growth` | 0–100 | 1 | 100 | Yes |
| Rib Density | `rib_density` | 0–100 | 1 | 56 | Yes |
| Rib Length | `rib_length` | 0–200 | 1 | 72 | Yes |
| Seed | `seed` | 0–999 | 1 | 137 | Yes |
| Asymmetry | `asymmetry` | 0–200 | 1 | 68 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Branch Color | `branch_color` | `#E8DDC8` | No |
| Rib Color | `rib_color` | `#EC6B2D` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport.

Inside Sketch, the host controls the output size through `sketchResize()`.

INDEX Browser Host may additionally pass `hostContext.colorOpacity` to control each declared color independently without consuming numeric Sketch parameters.

## Inspiration / lineage

- **inspired-by — [PLAYGRND](https://www.playgrnd.tools/coral)**: Inspired by the Coral generator on PLAYGRND. Sticky Plants is an independently implemented standalone Canvas2D branching system focused on coral-like growth, ribs and colony distribution.

## Development notes

Canvas2D; deterministic procedural branching system; inward edge-growth and in-canvas random modes; rib generation tied to main branches; spread used as spatial dispersion rather than bouquet opening; asymmetry influences both growth path and origin placement; transparent output.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
