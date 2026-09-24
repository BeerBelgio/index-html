# Cassini Flow
Part of **[Visual Lab](../README.md)** — a standalone HTML visual tool.

**Current file:** `Cassini_Flow-v1.6.html`  
**Version:** v1.6  
**Renderer:** Canvas 2D  
**Provenance:** `original · inspired-by`  
**Concept tags:** `field`, `stripes`

> Cassini-like shapes, two cores and a whole lot of membrane-like layers.

## What it does

Builds filled orbital slices from Cassini-oval / lemniscate-like fields. The result moves between nested loops, stretched orbits and more unstable warped orbital structures.

## Behavior

Mode changes the orbital family; Seed changes the field variation; Core Separation controls the distance between the two focal cores; Slices and Slice Width define the band structure; Scale and Warp reshape the field; Drift changes continuous motion speed without reposition jumps; Accent controls how many slices are highlighted; Rotation rotates the field.

## Current controls

| Control | Key | Range | Step | Default | Audio Sync |
|---|---|---:|---:|---:|---|
| Mode | `mode` | 0–5 | 1 | 0 | Yes |
| Seed | `seed` | 0–100 | 1 | 17 | Yes |
| Core Separation | `core_separation` | 0–100 | 1 | 58 | Yes |
| Slices | `slices` | 2–36 | 1 | 14 | Yes |
| Scale | `scale` | 0–100 | 1 | 46 | Yes |
| Warp | `warp` | 0–100 | 1 | 22 | Yes |
| Drift | `drift` | 0–100 | 1 | 25 | Yes |
| Slice Width | `slice_width` | 5–100 | 1 | 62 | Yes |
| Accent | `accent` | 0–100 | 1 | 32 | Yes |
| Rotation | `rotation` | 0–360 | 1 | 0 | Yes |

### Colors

| Control | Key | Default | Audio Sync |
|---|---|---|---|
| Slice Color | `slice_color` | `#E8DDC8` | No |
| Accent Color | `accent_color` | `#6A9E5D` | No |

## Standalone preview

Open the HTML file directly in a browser to run its local preview. The canvas follows the current browser viewport rather than forcing a square frame.

Inside Sketch, the host controls the output size through `sketchResize()`.

## Inspiration / lineage

- **inspired-by — [Fluid](https://github.com/enonforetsam/fluid)**: Inspired by the Cassini / lemniscate field in enonforetsam's Fluid. The current tool is an independent Canvas2D implementation.

## Development notes

Independent Canvas2D Cassini-style field. Drift integrates speed continuously so mapped changes alter velocity without retriggering or repositioning the field.

## Known limitations

Standalone generated field; no external image/source sampling.

## Licensing

The tool's original code is covered by the repository-level PolyForm Noncommercial 1.0.0 policy. See `../LICENSE.md` and `../THIRD_PARTY_NOTICES.md` for the full project policy and source references.