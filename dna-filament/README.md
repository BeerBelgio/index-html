# DNA Filament
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `DNA_Filament-v1.0.html`  
**Version:** v1.0  
**Tool ID:** `IDX-014`  
**Tool type:** `generator`  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `lines`, `field`

> Angel hair is a type of pasta. I loved it as a child.

## What it does

Generates a colony of line filaments traced through a multi-scale vector field. Four structural modes reorganize the whole system, while Bundle groups strands into shared cohorts and Curl, Twist and DNA Maker push them from smooth streams toward dense fibrous or rope-like forms.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Mode | `mode` | 0–3 | 1 | 2 | No |
| Lines | `lines` | 4–180 | 1 | 56 | Yes |
| Length | `length` | 10–240 | 1 | 122 | Yes |
| Spread | `spread` | 0–200 | 1 | 74 | Yes |
| Bundle | `bundle` | 0–200 | 1 | 128 | Yes |
| Field | `field` | 0–200 | 1 | 96 | Yes |
| Curl | `curl` | -200–200 | 1 | 38 | Yes |
| Twist | `twist` | -200–200 | 1 | 26 | Yes |
| DNA Maker | `weave` | -200–200 | 1 | 0 | Yes |
| Width | `width` | 0.5–20 | 0.1 | 2.4 | Yes |
| Drift | `drift` | 0–200 | 1 | 42 | Yes |
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

- **inspired-by — [PLAYGRND](https://www.playgrnd.tools/filament)**: Inspired by the Filament generator on PLAYGRND. DNA Filament is an independently implemented standalone Canvas2D system focused on bundled streamlines, structural flow modes and braided fiber behavior.

## Development notes

Canvas2D; deterministic grouped streamlines; four structural modes; multi-scale trigonometric vector field; cohort-based Bundle system with shared trajectory identity; accumulated bipolar Curl; harmonic bipolar Twist; normal-offset bipolar DNA Maker around the underlying trajectory; per-bundle accent strands; transparent output.

## Next ideas

> A future branch could explore attraction/repulsion between bundles driven by input frequencies

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
