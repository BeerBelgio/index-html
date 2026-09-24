# Scatter Front
Part of **[Visual Lab](../README.md)** — a standalone HTML visual tool.

**Current file:** `Scatter_Front-v1.5.html`  
**Version:** v1.5  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `particles`, `transition`

> A flow of particles in basic shapes, ready to be unleashed.

## What it does

Generates a dense moving particle front with directional progression, scatter, turbulence, trailing dust and grain. It translates the particle-reveal idea into a standalone generator rather than sampling underlying content.

## Behavior

Progress moves the active particle front; Direction selects ten directional/radial metrics; Amount sets density; Edge Width defines the active front; Scatter pushes particles along the selected direction; Turbulence adds organic displacement; Motion BPM drives temporal motion; Trail leaves dust behind the front; Grain adds positional/alpha irregularity. Particle Color and Accent Color define the palette.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Progress | `progress` | 0–100 | 1 | 42 | Yes |
| Direction | `direction` | 0–9 | 1 | 0 | Yes |
| Amount | `amount` | 0–100 | 1 | 70 | Yes |
| Edge Width | `edge_width` | 0–100 | 1 | 34 | Yes |
| Scatter | `scatter` | 0–200 | 1 | 95 | Yes |
| Turbulence | `turbulence` | 0–200 | 1 | 80 | Yes |
| Motion BPM | `motion_bpm` | 30–240 | 1 | 120 | Yes |
| Trail | `trail` | 0–100 | 1 | 30 | Yes |
| Grain | `grain` | 0–100 | 1 | 65 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Particle Color | `particle_color` | `#f2eee6` | No |
| Accent Color | `accent_color` | `#ec6b2d` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Canvas UI](https://github.com/DavidHDev/canvas-ui)**: Inspired by DavidHDev's Canvas UI ParticleReveal concept. Scatter Front was independently rebuilt as a standalone Canvas2D particle generator.

## Development notes

Canvas UI ParticleReveal remains the conceptual reference; the current file is an independent Canvas2D particle system. Progress is now the direct front-position control.

## Known limitations

Unlike Canvas UI ParticleReveal, this file does not capture or dissolve arbitrary HTML/image content underneath it; it generates the particle field itself.

## Next ideas

- allow the particle system to process an upstream visual source in the future browser pipeline

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.