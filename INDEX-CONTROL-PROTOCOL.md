# INDEX HTML — Control Protocol

Status: **staging / host contract v0.1** — additive INDEX-native research, without changing the current Bridge interface

This document describes the host-facing metadata and runtime contract used by INDEX HTML without changing the existing Sketch Custom HTML manifest.

## Stable tool identity

Every catalogue entry in `data/tools.json` exposes:

- `toolId` — immutable INDEX identity (`IDX-001`, `IDX-002`, ...). Names and versions may change; the ID does not.
- `toolType` — structural role used by compatible hosts.

The current 20-tool collection uses `toolType: "generator"` for every tool.

**Visible catalogue family is separate from renderer role:** `generator`, `FX`, `compositor`, `audio-driven` are proposed equally prominent filters. `audio-driven` identifies an audio-native creative family; the runtime still needs to know if its tool generates pixels, processes an upstream image, or combines sources. None of the 20 legacy manifests are changed by this classification proposal.

## Tool type vocabulary

- `generator` — creates its own visual output. This is the only active role in the current collection.
- `effect` — active in the Bridge experimental processor contract: its GLSL fragment processes the composite of all lower layers. The public INDEX catalogue has not yet shipped an effect.
- `compositor` — reserved for a future HTML tool that receives two or more visual sources and combines them. This is distinct from host-level layer compositing, which INDEX Browser Host can already perform outside an HTML tool.
- `source` — reserved for future media/input sources such as image, video, camera or other host-provided visual media.

These values are deliberately separate from public concept tags such as `field`, `lines`, `transition` or `mask-cut`.

## Current runtime contract

The existing portable call remains:

```js
sketchDraw(state)
```

Compatible INDEX hosts may optionally call:

```js
sketchDraw(state, hostContext)
```

`hostContext` is optional. Omitting it must preserve standalone/Sketch behaviour.

### Native color opacity

A compatible host may provide normalized per-color opacity without consuming numeric parameter slots:

```js
hostContext.colorOpacity = {
  line_color: 0.35,
  accent_color: 1.0
};
```

Missing host context, missing opacity data or a missing key resolves to `1.0`.

## Future visual-input contract

The Bridge already supports an effect fragment shader via `window.SKETCH_TOOL.index.effect` with `apiVersion: 1`, `type: "fragment"`, `fragment: GLSL source`. Uniforms are `uInput`, `uResolution`, `uTime`, plus numeric `u_<key>` floats and color `u_<key>` vec4. The Playground follows this contract for experimental effect previews. A general compositor A/B input contract remains **UNDEFINED** and must be proven before enabling compositor tools.

The goal is to keep each HTML independently portable while the host owns routing:

```text
SOURCE / GENERATOR → EFFECT → COMPOSITOR → OUTPUT
```

Host-level composition and HTML `compositor` tools are separate concepts. A host may combine multiple generator layers today without any tool being classified as `compositor`.

## Local collections / Download All

The website-generated bundle exposes a flat `tools/` directory containing the current canonical HTML files. A compact `INDEX-HTML-MANIFEST.json` maps stable IDs, names, versions, types and local filenames. This layout is intentionally suitable for future local-host cache/update workflows.

## INDEX-native migration plan (research, not a released Bridge API)

The Playground accepts the legacy `window.SKETCH_TOOL` manifest and can experiment with an `window.INDEX_TOOL` manifest, but the **current Bridge does not read INDEX_TOOL**. Do not remove any legacy export.

1. Define and test the INDEX-native manifest and browser runtime in the public Playground. Keep the 20 existing tools unchanged.
2. After Bridge 0.23 stabilizes, add an additive reader/adapter for `window.INDEX_TOOL` with unchanged legacy behaviour, Native Live parameter identities, 12 parameter and 4 color exposed slots per layer. Validate separately in Max/Ableton.
3. Only then migrate legacy tools incrementally, with pixel/behaviour regression and optional Sketch compatibility.

The INDEX-native manifest shape shown by the Playground is a **prototype**, not yet a frozen specification. The independent Submission Contract v0.2 remains a development/FREEZE checklist, not a replacement for this runtime integration document.

Tool artifacts remain self-contained offline single HTML files, with no required remote dependencies. Host-supplied time is authoritative; no autonomous animation clock in hosted mode.
