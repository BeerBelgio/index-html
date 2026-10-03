# Scan Accumulator
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Scan_Accumulator-v1.0.html`  
**Version:** v1.0  
**Tool ID:** `IDX-015`  
**Tool type:** `generator`  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `lines`, `transition`

> Try to scan something while someone messes with the time machine next to it.

## What it does

Generates an internal line source and reconstructs it progressively along vertical, horizontal or diagonal scan axes. Each acquired strip has its own age, allowing precise hold times, temporal offset, drift and smear to turn the reconstructed frame into a layered time-based image.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Scan Position | `scan_position` | 0–100 | 1 | 0 | Yes |
| Direction | `direction` | 0–3 | 1 | 1 | No |
| Scan Width | `scan_width` | 1–200 | 1 | 40 | Yes |
| Temporal Offset | `temporal_offset` | 0–200 | 1 | 80 | Yes |
| Drift | `drift` | 0–200 | 1 | 70 | Yes |
| Hold Time (0.01s) | `hold` | 0–500 | 1 | 75 | Yes |
| Smear | `smear` | 0–200 | 1 | 45 | Yes |
| HARD RESET | `trigger` | 0–1 | 1 | 0 | No |
| Source Type | `source_type` | 0–3 | 1 | 0 | No |
| Source Detail | `source_detail` | 3–48 | 1 | 18 | Yes |
| Source Scale | `source_scale` | 20–250 | 1 | 100 | Yes |
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

- **inspired-by — [Glitch Scanner / Scanner Simulator](https://github.com/stihilus/glitch-scanner)**: Inspired by the progressive scanner-acquisition principle of stihilus' Glitch Scanner / Scanner Simulator. Scan Accumulator replaces user-image input with internally generated procedural sources and adds temporal accumulation, age-based hold, smear and multi-axis scanning.

## Development notes

Canvas2D; offscreen procedural source buffer; offscreen accumulation buffer; generic clipped scan bands on four unique axes; temporal slit-scan sampling; per-strip age tracking with hard expiry; smear trail; rising-edge reset; transparent output.

## Known limitations

Hold values shorter than a display frame cannot be visually distinguished continuously at normal frame rates. Direction and Source Type are discrete manual switches.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
