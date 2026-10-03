# INDEX HTML — Control Protocol

Status: **staging / host contract v0.1**

This document describes the host-facing metadata and runtime contract used by INDEX HTML without changing the existing Sketch Custom HTML manifest.

## Stable tool identity

Every catalogue entry in `data/tools.json` exposes:

- `toolId` — immutable INDEX identity (`IDX-001`, `IDX-002`, ...). Names and versions may change; the ID does not.
- `toolType` — structural role used by compatible hosts.

The current 20-tool collection uses `toolType: "generator"` for every tool.

## Tool type vocabulary

- `generator` — creates its own visual output. This is the only active role in the current collection.
- `effect` — reserved for a future HTML tool that receives an upstream visual source and transforms it.
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

No public input-texture/canvas API is defined yet. `effect`, `compositor` and `source` are reserved metadata values only until the browser host POC defines how upstream visual surfaces are passed, synchronized and composed.

The goal is to keep each HTML independently portable while the host owns routing:

```text
SOURCE / GENERATOR → EFFECT → COMPOSITOR → OUTPUT
```

Host-level composition and HTML `compositor` tools are separate concepts. A host may combine multiple generator layers today without any tool being classified as `compositor`.

## Local collections / Download All

The website-generated bundle exposes a flat `tools/` directory containing the current canonical HTML files. A compact `INDEX-HTML-MANIFEST.json` maps stable IDs, names, versions, types and local filenames. This layout is intentionally suitable for future local-host cache/update workflows.
