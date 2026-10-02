# Syn Division
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Syn_Division-v1.0.html`  
**Version:** v1.0  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `lines`, `field`

> A [syn] approach to Joy Division

## What it does

Generates a repeated interlocking line field built from synchronized rows. Row count, spacing, tooth geometry and stagger define the base system, while bipolar Warp and Ripple engines can reinforce, counter or aggressively cross-couple through three vector modes.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Stripes | `stripes` | 3–80 | 1 | 18 | Yes |
| Spacing | `spacing` | 0–200 | 1 | 70 | Yes |
| Weight | `weight` | 5–100 | 1 | 58 | Yes |
| Tooth Depth | `tooth_depth` | 0–200 | 1 | 86 | Yes |
| Tooth Length | `tooth_length` | 10–240 | 1 | 92 | Yes |
| Stagger | `stagger` | 0–200 | 1 | 72 | Yes |
| Warp | `warp` | -200–200 | 1 | 26 | Yes |
| Ripple | `ripple` | -200–200 | 1 | 42 | Yes |
| Vector Mode | `vector_mode` | 0–2 | 1 | 0 | No |
| Phase | `phase` | 0–360 | 1 | 0 | Yes |
| Motion BPM | `motion_bpm` | 0–260 | 1 | 72 | No |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Primary Color | `primary_color` | `#E8DDC8` | No |
| Secondary Color | `secondary_color` | `#EC6B2D` | No |
| Third Color | `accent_color` | `#6A9E5D` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport.

Inside Sketch, the host controls the output size through `sketchResize()`.

INDEX Browser Host may additionally pass `hostContext.colorOpacity` to control each declared color independently without consuming numeric Sketch parameters.

## Inspiration / lineage

- **inspired-by — [PLAYGRND](https://www.playgrnd.tools/zig)**: Inspired by the Zig generator on PLAYGRND. Syn Division is an independently implemented standalone Canvas2D interlocking-line system focused on bipolar deformation and vector relationships.

## Development notes

Canvas2D; interlock-only line motor; permanently rounded joins/caps; independent row count and row spacing; horizontally overscanned lines for effectively infinite continuation; bipolar Warp and Ripple engines; three discrete vector relationships (Flow, Counter, Clash); deterministic row variation; transparent output.

## Next ideas

> Let the lines be driven directly by the audio input.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
