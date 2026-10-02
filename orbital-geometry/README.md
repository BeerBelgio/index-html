# Orbital Geometry
Part of **[INDEX HTML](../README.md)** — a standalone HTML visual tool.

**Current file:** `Orbital_Geometry-v1.0.html`  
**Version:** v1.0  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `lines`, `shapes`

> Looking at the stars above us is always amazing

## What it does

Generates three related geometric systems around a shared language of harmonic Ratio, Phase, Eccentricity and Drift. True path intersections can be detected and marked independently, turning crossings into a second graphic layer.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| System | `system` | 0–2 | 1 | 2 | No |
| Amount | `amount` | 2–24 | 1 | 9 | Yes |
| Scale | `scale` | 30–220 | 1 | 100 | Yes |
| Ratio | `ratio` | 0–8 | 1 | 3 | Yes |
| Phase | `phase` | 0–360 | 1 | 35 | Yes |
| Eccentricity | `eccentricity` | 0–100 | 1 | 28 | Yes |
| Arc Length | `arc_length` | 5–100 | 1 | 72 | Yes |
| Drift | `drift` | 0–100 | 1 | 36 | Yes |
| Intersection | `intersection` | 0–100 | 1 | 24 | Yes |
| Intersection Size | `intersection_size` | 0–300 | 1 | 28 | Yes |
| Line Width | `line_width` | 0.5–6 | 0.1 | 1.2 | Yes |
| Motion BPM | `motion_bpm` | 0–260 | 1 | 72 | No |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Line Color | `line_color` | `#E8DDC8` | No |
| Intersection Color | `intersection_color` | `#EC6B2D` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport.

Inside Sketch, the host controls the output size through `sketchResize()`.

INDEX Browser Host may additionally pass `hostContext.colorOpacity` to control each declared color independently without consuming numeric Sketch parameters.

## Inspiration / lineage

- **inspired-by — [Brand Assets Generator](https://brand-generator.stoyanov.works/)**: Inspired by selected geometry experiments in Yordan Stoyanov's Brand Assets Generator. Orbital Geometry is an independently implemented standalone Canvas2D tool for this project.

## Development notes

Canvas2D; three shared-parameter geometric systems; discrete harmonic-ratio table; orbital harmonic displacement; closed Lissajous cycles at full Arc Length; ratio-driven constellation links; exact segment intersection tests with centered circular markers; transparent output; independent marker radius and line/marker stroke width.

## Known limitations

Intersection detection is intentionally bounded for realtime use. High Amount with dense crossing structures can increase CPU cost. System is a discrete manual switch.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.
