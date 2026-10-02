# Lava Lamp
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Lava_Lamp-v1.0.html`  
**Version:** v1.0  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `field`, `shapes`

> I've loved them for as long as I can remember; there's something sloth-like and peaceful about them.

## What it does

Generates a bounded population of morphing zero-gravity blobs. Viscosity and Wandering shape their motion; Merge moves same-color families from separation toward shared liquid masses; Turbulence warps the field; up to three controllable color groups interact and create mixed-color zones only where different blobs genuinely overlap.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Amount | `amount` | 2–18 | 1 | 13 | Yes |
| Size | `size` | 20–180 | 1 | 92 | Yes |
| Viscosity | `viscosity` | 0–200 | 1 | 112 | Yes |
| Merge | `merge` | 0–200 | 1 | 112 | Yes |
| Wandering | `wandering` | 0–200 | 1 | 62 | Yes |
| Turbulence | `turbulence` | 0–200 | 1 | 34 | Yes |
| Color Groups | `color_groups` | 1–3 | 1 | 3 | No |
| Seed | `seed` | 0–999 | 1 | 137 | No |
| Motion BPM | `motion_bpm` | 0–260 | 1 | 72 | No |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Color A | `color_a` | `#EC6B2D` | No |
| Color B | `color_b` | `#E8DDC8` | No |
| Color C | `color_c` | `#6A9E5D` | No |
| BG Color | `bg_color` | `#1C1713` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport.

Inside Sketch, the host controls the output size through `sketchResize()`.

INDEX Browser Host may additionally pass `hostContext.colorOpacity` to control each declared color independently without consuming numeric Sketch parameters.

## Inspiration / lineage

- **inspired-by — [BeerBelgio Lava Engine / beerbelgio.github.io](https://github.com/BeerBelgio/beerbelgio.github.io)**: Inspired by BeerBelgio's own interactive Lava Engine used on beerbelgio.github.io. Lava Lamp is an independently implemented standalone Canvas2D tool with Sketch-compatible controls, zero-gravity roaming, merge / fusion and local cross-color blending.

## Development notes

Canvas2D; deterministic bounded blob pool; continuously morphing implicit masses; zero-gravity 2D wandering; soft containment; same-color merge / exclusion physics; transient cross-color pass-through; local mixed-color contact rendering; progressive multi-scale turbulence; smooth high-Merge family seal underlay; optional transparent background.

## Known limitations

No shader/gradient-like coloring where blobs overlap. I'll stick with the '70s vibe.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
