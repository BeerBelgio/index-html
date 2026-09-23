# BeerBelgio Visual Lab — Third-Party Notices and Inspirations

BeerBelgio Visual Lab contains original HTML visual tools by BeerBelgio / Matteo Belgiovine. **Sketch Design Tools is a current compatibility target, not the identity or owner of the project.**

The current tool set has been audited against the sources listed below. No distributed tool is currently identified as retaining meaningful third-party implementation code or structure. The relationships below are therefore creative/conceptual references unless explicitly described as internal derivation.

## Fluid — enonforetsam/fluid

Source: https://github.com/enonforetsam/fluid  
Source licence: MIT

Conceptual / visual reference for:

- Cassini Flow — Cassini / lemniscate field concept
- Caustic Stitch — Stitch / string-art caustic concept
- Cellular Field — Cellular / Worley–Voronoi field language
- Nodal Morph — Chladni / nodal field concept
- Topographic — procedural topo / contour-field concept

Topographic Mask is derived internally from BeerBelgio Visual Lab's Topographic tool and inherits the Fluid conceptual lineage indirectly.

## Canvas UI — DavidHDev/canvas-ui

Source: https://github.com/DavidHDev/canvas-ui  
Source licence: MIT + Commons Clause, as published by the source project

Conceptual / visual reference for:

- Linking Nodes — Canvas UI Bubble / droplet language
- Scatter Front — Canvas UI ParticleReveal concept

The distributed BeerBelgio Visual Lab tools are standalone implementations and do not load Canvas UI as a runtime dependency.

## Typoman — markdo27/typoman

Source: https://github.com/markdo27/typoman  
Source licence: MIT, as recorded during the source audit

Visual / interaction reference for:

- FormShift — kinetic Flash-style transition grammar
- FormCutter — part of the wider Flash / cutter research round

The distributed BeerBelgio Visual Lab tools generate their own shapes and implement their own host-facing behavior rather than bundling Typoman as a dependency.

## Additional markdo27 research references

The following projects were reviewed during the wider FormCutter exploration:

- nuftext — https://github.com/markdo27/nuftext — MIT, as recorded during the source audit
- grad_text — https://github.com/markdo27/grad_text — MIT, as recorded during the source audit
- animtypo — https://github.com/markdo27/animtypo — no repository-wide software licence was identified during the audit

These are documented as research / visual references. No current BeerBelgio Visual Lab tool is identified as retaining their implementation code.

## Internal lineage

- Topographic Mask is an internal derivative of Topographic.
- Fractured Mask and FormCutter grew from the same internal masking / cutting exploration, but Fractured Mask is not treated as a code derivative of FormCutter.

## Trademarks and project names

Project names, repository names and product names are used for identification, compatibility and attribution only. No affiliation with or endorsement by the referenced authors, repositories or Sketch Design Tools is implied.
