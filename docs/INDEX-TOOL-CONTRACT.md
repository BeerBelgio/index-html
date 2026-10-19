# INDEX HTML — Native Tool Contract v1.0 (generator contract)

**Status:** **Generator contract v1.0 frozen and published** with INDEX HTML 0.21.0 (2026-10-12), including required `capabilities`, native manifest and generator entrypoints. Fragment FX descriptors remain **provisional** until dedicated compatibility testing; two-source compositor and direct audio-input APIs are not defined. The Bridge follows its own release cycle.  
**Basis:** consolidates the earlier native-manifest and host-control prototypes, preserved in Git history and the `0.21.0` release tag. The development and FREEZE practices previously held in Submission Contract v0.2 are consolidated below in this same document.

## 1. Purpose and boundaries

`window.INDEX_TOOL` is the **canonical** description of an INDEX HTML visual tool. The format is host-independent: an INDEX tool must run as a self-contained, offline HTML document. A host may add controls/compositing/audio modulation but must not impose creative or algorithmic limits on the INDEX source.

**Documented runtime roles:** `generator` (**stable v1.0**) and `effect` (fragment FX, **provisional**). `compositor` with A/B visual sources, `source`, direct audio input/waveform/FFT, and audio-driven runtime contracts are **not specified** here. They require independent proposals and compatibility tests. Do not label a tool as a supported v1 compositor just because a host can stack layers.

**Technical role** (`role`) is separate from **public catalogue family** (GENERATOR / FX / COMPOSITOR / AUDIO-DRIVEN) and **input requirements** (visual/audio). A tool modulated by audio is *not automatically* AUDIO-DRIVEN. Public classification stays in repository metadata (`data/tools.json`) until a versioned metadata agreement says otherwise.

## 2. Manifest (v1.0)

Inside a script in the HTML, before the host-ready point:

```js
window.INDEX_TOOL = {
  schemaVersion: 1,
  name: 'Example Generator',
  role: 'generator',
  capabilities: {
    requires: { renderer: 'canvas2d', visualInput: 'none', audioInput: 'none' },
    supports: { colorOpacity: true }
  },
  params: [
    { key: 'size', label: 'Size', min: 0, max: 200, step: 1, default: 80 }
  ],
  colors: [
    { key: 'main_color', label: 'Main Color', default: '#EC6B2D' }
  ],
  audio: ['size'] // optional modulation eligibility; NOT direct audio samples
};
```

Required:

| Field | Type | Rules |
| --- | --- | --- |
| `schemaVersion` | integer | Exactly `1` for this revision. No fallback to a different version. |
| `name` | nonempty string | Human-readable display name. |
| `role` | string | `generator` or `effect` (v1). No implicit role in new tools. |
| `capabilities` | object | Required in the stable generator v1.0 contract. Explicit rendering/input requirements and optional features; see §2A. |
| `params` | array | Required, may be empty. Unique stable keys. |
| `colors` | array | Required, may be empty. Keys unique across both arrays. |

Each numeric `params` item has `key`, `label`, finite `min`, `max`, positive `step`, finite `default`; `min <= default <= max`. The `default` must respect the declared step grid (within floating-point tolerance). The state value is a number. An INDEX algorithm can contain unlimited internal variables; only exposed controls belong in this array. No arbitrary INDEX limit of 12 parameters.

Each `colors` item has `key`, `label`, `default` as six-digit HEX `#RRGGBB`; the state value is a HEX string. No arbitrary INDEX limit of 4 colors.

Control keys use `[A-Za-z_][A-Za-z0-9_]*`, cannot be `time`, cannot repeat, and become uniform suffixes for fragment FX. Do not silently rename existing control keys: hosts/automations can identify them by key.

Optional `audio: string[]` lists existing control keys eligible for *host modulation*, as in current legacy tools. These keys can refer to numeric parameters **or colors** (the published Cellular Field legacy manifest lists `core_color` and `edge`). Keep this membership unchanged in migration. Host-specific handling of modulation for colors is host-defined; do not silently drop or recast keys. This does not define direct audio data streaming, PCM, FFT, MIDI routing or automation semantics. Optional `toolId: 'IDX-001'` may mirror the immutable ID in `data/tools.json` for published INDEX catalogue entries; for migrated canonical tools, use the existing catalogue ID. New local experiments need not claim an IDX ID. The catalogue retains the stable identity/filename relationship; no ID reallocation during migration.

The host must reject unknown `schemaVersion` and unsupported `role` with a readable error rather than silently executing a different contract. Manifest content is data: no required functions, remote imports or nonserializable members within `INDEX_TOOL`.

## 2A. Capability declarations (required in v1.0)

A **required**, JSON-serializable `capabilities` object describes what a compatible host must provide, and what the tool optionally understands. The declaration belongs **only** in canonical `INDEX_TOOL`: do not add it to the legacy Sketch mirror. For all 20 current generator tools:

```js
capabilities: {
  requires: {
    renderer: 'canvas2d',    // alternatively 'webgl1' for a WebGL generator
    visualInput: 'none',     // no upstream image/composite required
    audioInput: 'none'       // NOT the legacy 'audio' array of modulatable controls
  },
  supports: {
    colorOpacity: true      // understands hostContext.colorOpacity; optional host feature
  }
}
```

**v1 capability values and validation:** Generator fields and values are frozen; fragment-FX requirements remain provisional.

| Path | Required type | Allowed v1 values | Meaning |
| --- | --- | --- | --- |
| `capabilities.requires.renderer` | string | `canvas2d`, `webgl1`, `fragment-webgl1` | Required runtime/processor. WebGL1 refers to WebGL 1.0, not WebGL2. |
| `capabilities.requires.visualInput` | string | `none`, `lower-composite` | Does this role need upstream visual pixels? |
| `capabilities.requires.audioInput` | string | `none` | No direct PCM/waveform/FFT protocol exists in v1; control modulation remains separately declared by `audio[]`. |
| `capabilities.supports.colorOpacity` | boolean | `true`, `false` | Whether the tool reads per-color `hostContext.colorOpacity`. **Not** a prerequisite for execution: if the host omits it, the tool uses its canonical full-opacity defaults. |

**Role consistency:** v1 `generator` requires `(renderer: canvas2d|webgl1, visualInput: none)`. v1 `effect` requires `(renderer: fragment-webgl1, visualInput: lower-composite)`. Both currently require `audioInput: none`. Reject mismatched combinations or unknown required values, without optimistic fallback. A generator can be written using an internal WebGL engine but still needs the existing canvas output contract. The renderer is a **required host execution capability**; `colorOpacity` is an **optional feature supported by the tool**, not a reason to reject a host that does not provide an opacity UI.

**Host compatibility algorithm (necessary conditions, not a certification of runtime correctness):**

1. Validate `schemaVersion`, `role`, `capabilities` shape, and role-consistency.
2. Require the host to support the declared renderer and visual input source, plus any declared mandatory audio input protocol.
3. Confirm required entrypoints and render contract separately (generator: `indexResize` + `indexDraw`; FX: `effect` fragment API).
4. Report `supported`, `unsupported` with specific missing capability, or `supported with reduced controls` if an *optional* feature such as per-color opacity cannot be exposed. Omitted optional host controls must preserve native defaults.
5. Actual Sketch compatibility further requires the Sketch adapter, Sketch import constraints and **runtime tests**. Capabilities are not a whitelist of specific apps and cannot guarantee compatibility solely from a manifest.

**Example host declaration (illustrative host-side data, not part of the tool):**

```js
const host = {
  renderers: ['canvas2d', 'webgl1', 'fragment-webgl1'],
  visualInputs: ['none', 'lower-composite'],
  audioInputs: ['none'],
  colorOpacity: true
};
// Compare capabilities.requires against the corresponding host arrays.
// Check supports.colorOpacity separately as an optional UI/host feature.
```

A future compositor with 2 visual sources or a direct FFT/audio tool will introduce new **explicitly specified** capability values and runtime contracts. Do not claim those future values are available under the stable generator v1.0 contract. Reserve no arbitrary "12 params / 4 colors" limit in capabilities. Adding a new host requires implementing the host-side reader and renderer: **the 20 tool manifest declarations do not need to change.**

Compatibility with pre-v1 experimental `INDEX_TOOL` fixtures lacking `capabilities` is a separate **opt-in compatibility mode**, never a silent claim of complete v1 support. If provided, hosts must label the missing declaration as `legacy INDEX draft / capabilities unknown` and independently check the rendering paths; canonical v1 files must always include it.

## 3. Generator entrypoints

```js
window.indexResize = function(width, height) { /* resize output backing store */ };
window.indexDraw = function(state, hostContext) { /* draw exactly one frame */ };
```

Both are **required** for a generator. `width,height` are positive integers in output pixels. The host owns stage dimensions/DPR selection. The tool may use Canvas2D or WebGL, but must provide a primary canvas with `id="sketch-canvas"` (legacy-compatible) so the current Playground and hosts can capture it. No additional remote dependencies are allowed.

`indexDraw` draws one frame synchronously (no Promise required/allowed for the v1 Bridge compatibility target). `state` provides the manifest control keys and `state.time` as elapsed **seconds** on the host timeline. A host may pause, seek/reset its timeline or change frame rate; tools must not assume fixed frame intervals or start a second host animation loop. Stateful/accumulative visuals may retain explicit per-tool state; no implicit hard reset every frame.

**Standalone:** in a top-level browser the HTML sets its own local size/animation clock with its *canonical* defaults. **Hosted:** it must not start a parallel autonomous loop, timer or frame scheduler competing with host `indexDraw` calls. Distinguish host mode intentionally (e.g. only start standalone loop when `window.parent === window`), but don't infer host capabilities solely from user-agent strings.

## 4. Host context, colors and transparency

The optional second argument is additive:

```js
hostContext = {
  colorOpacity: { main_color: 0.5 }
};
```

`colorOpacity[colorKey]` is normalized `0..1` and corresponds to a `colors[]` key. Missing `hostContext`, missing `colorOpacity`, or a missing color key means **1.0**. Clamp finite values to `0..1`; invalid values use `1.0`. At zero opacity, changing that color's HEX must not change the rendered pixels (*zero-opacity color leak test*). Color opacity is distinct from host **layer opacity** and host blend mode, which are not tool parameters.

In Canvas2D reset `globalAlpha`/composite styles after drawing; in WebGL include alpha in actual compositing. Do not replace a disabled color with an opaque background in ways that violate opacity independence. The previous 20-tool appearance/defaults must not change as a migration side effect.

## 5. Fragment effect (FX) entrypoint

An FX does **not** render from `indexDraw` and does **not** need its own `sketch-canvas`. The host executes its fragment processor against the composite of **lower** layers. The v1 manifest shape is:

```js
window.INDEX_TOOL = {
  schemaVersion: 1,
  name: 'Example FX',
  role: 'effect',
  capabilities: {
    requires: { renderer: 'fragment-webgl1', visualInput: 'lower-composite', audioInput: 'none' },
    supports: { colorOpacity: false }
  },
  params: [{ key: 'strength', label: 'Strength', min: 0, max: 1, step: 0.01, default: 1 }],
  colors: [],
  effect: {
    apiVersion: 1,
    type: 'fragment',
    fragment: `precision mediump float;
      varying vec2 vUV;
      uniform sampler2D uInput;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform float u_strength;
      void main(){
        vec4 source = texture2D(uInput, vUV);
        gl_FragColor = vec4(mix(source.rgb, vec3(1.0)-source.rgb, u_strength), source.a);
      }`
  }
};
```

`effect.apiVersion:1`, `effect.type:'fragment'` and GLSL ES 1.00/WebGL1-compatible `effect.fragment` are mandatory. Current host uniforms: `uInput` (`sampler2D`, lower composite), `uResolution` (`vec2`, output pixel dimensions), `uTime` (`float`, seconds), `u_<paramKey>` (`float`), and `u_<colorKey>` (`vec4` normalized RGB + color opacity alpha). UV coordinate `vUV` is provided by host. Do not use WebGL2-only shader features.

Output alpha must be deliberate; opacity and blend are controlled by the layer host. There is no generic A/B source interface yet. A standalone FX document should explain or demonstrate its effect without pretending to process a non-existent lower layer; actual FX validation happens in a compatible host.

**Important compatibility distinction:** the existing test FX in Bridge may use `SKETCH_TOOL.index.effect`; the native canonical path is **top-level** `INDEX_TOOL.effect`. Bridge 0.23.6 was tested with the native generator reader; the Bridge remains independently versioned and is not declared stable by this document. Older experimental diagnostics may omit `apiVersion`; such fixtures are *not* the final v1 template. INDEX-only generator/FX diagnostics include capabilities and `effect.apiVersion:1`; this does not constitute a freeze of the FX runtime contract.

## 6. Sketch compatibility adapter (generators)

**Policy: every generator whose controls and rendering fit the actual Sketch host must remain Sketch-compatible.** The existing 20 generators are published INDEX-native tools, not disposable legacy code. Native `INDEX_TOOL` is the sole authoring source of truth; Sketch is a supported export/profile, not a ceiling for INDEX algorithm design.

For Sketch-compatible generators, the **same single HTML** additionally exposes:

```js
// Generated *static literal mirror* of the INDEX manifest's Sketch-visible fields.
// DO NOT maintain these defaults by hand.
window.SKETCH_TOOL = {
  schemaVersion: 1,
  name: 'Example Generator',
  params: [{ key: 'size', label: 'Size', min: 0, max: 200, step: 1, default: 80 }],
  colors: [{ key: 'main_color', label: 'Main Color', default: '#EC6B2D' }],
  audio: ['size']
};
window.sketchResize = (...args) => window.indexResize(...args);
window.sketchDraw = (state, hostContext) => window.indexDraw(state, hostContext);
```

The generated Sketch mirror deliberately **omits `capabilities`** (a native INDEX declaration, not a Sketch field). The static literal is a **generated compatibility artifact**, not a second independently editable manifest. A static literal is required for conservative compatibility with the **existing Bridge parser**, which extracts `window.SKETCH_TOOL = { ... }` as source; direct aliases such as `window.SKETCH_TOOL = window.INDEX_TOOL` cannot be assumed parseable there. Whether Sketch itself requires literal or accepts runtime aliases is not yet verified: Sketch import/runtime acceptance must be tested on the actual service. The generated mirror must have exact parity for names, parameter order/keys/ranges/steps/defaults, colors/order/defaults, and `audio` key membership. Compatibility wrappers must not alter the rendering implementation.

Sketch's supported number/types of controls are a host concern, not an INDEX contract limit. If a future INDEX generator exposes features Sketch cannot support, mark Sketch compatibility partial/unsupported explicitly; do not silently hide parameters, substitute defaults or degrade its INDEX version to satisfy Sketch. Any subsequent change to a published tool requires regression checks of its behaviour and Sketch integration.

FX tools are **not asserted Sketch-compatible** until Sketch provides an upstream visual-input contract suitable for such processing.

## 7. Compatibility and regression acceptance

INDEX HTML 0.21.0 publishes 20 generator tools with canonical `INDEX_TOOL`, required capability declarations and a derived `SKETCH_TOOL` adapter. The project maintainer reports testing the migrated tools in Chrome, Sketch, INDEX Playground and INDEX-HTML Bridge 0.23.6 on Intel and Apple Silicon (M5) Macs. These manual results do not certify every browser, GPU or future Bridge version.

| Environment | Native INDEX support | Legacy Sketch support | Release observations |
| --- | --- | --- | --- |
| Standalone Chrome | Generator self-preview included in each HTML | Same underlying creative code | Tested; CF-001 remains open for Cellular Field on Intel. |
| Sketch | Through the bundled Sketch adapter for generators | Supported | All 20 generator imports reported working by the maintainer. |
| INDEX Playground 0.20.1+ | Generator supported; fragment FX pathway available but provisional | Supported | All migrated generators reported working. |
| INDEX-HTML Bridge 0.23.6 (testing candidate) | Generator supported | Supported | Migrated generators reported working; Bridge state recall remains a separate blocking issue. |

For subsequent edits and releases, check:

1. Canonical manifest validity, stable tool identity, generated Sketch adapter parity, syntax and self-containment.
2. Standalone browser: visual defaults, resize, animation, GPU behaviour and transparent outputs where applicable.
3. Playground: controls, 100→50→0→100 color opacity, pause/reset, multiple layers, fast tool replacement and FX/layer compositing.
4. Sketch: import, controls/defaults, audio modulation and resize on supported generator tools.
5. Bridge: host-capability detection, five-layer rendering, state recall, automation/MIDI, FX and offline export as appropriate; the Bridge has an independent release gate.

## 8. Contract versioning and scope

The `schemaVersion: 1` generator interface and mandatory `capabilities` are stable from INDEX HTML 0.21.0. This number is **not** the INDEX site version, a tool's creative version or a Bridge device version.

Development and FREEZE requirements are consolidated in §§10–17 below. Host communication transports, message envelopes and discovery/synchronization workflows are **not** standardized by the generator v1.0 API; they belong to host integration specifications. The earlier experimental Control Protocol and Tool Contract Proposal were retired from the active repository in documentation patch 0.21.1; both remain recoverable from the `0.21.0` tag and Git history.

Fragment FX remains provisionally specified and will require its own explicit acceptance/freeze. Two-input compositors, native PCM/FFT audio and future renderer types must be introduced through reviewed extensions, not silently interpreted as already supported in generator v1.0. Incompatible changes to frozen generator semantics require a new schema revision.

### Existing host and distribution conventions (informative)

- `toolId` is the immutable INDEX identity in `data/tools.json` and must not be reassigned when filenames or creative versions change. Catalogue `toolType` and visible category are distinct from the rendering runtime's declared `role`.
- Hosts own timing, scheduling and routing. In hosted mode, `state.time` is authoritative in seconds; a tool must not run a competing animation clock. Optional `hostContext.colorOpacity` follows §4.
- A downloaded local tool collection may use a flat `tools/` directory plus an inventory such as `INDEX-HTML-MANIFEST.json` to map IDs and filenames. This is a **packaging convention**, not a required manifest field or a finalized host-control wire protocol.
- A host may combine generator layers independently of a tool's `compositor` role. Two-input compositor messages and native audio sample transfer remain undefined until separately specified.

## 9. v1.0 release note

Twenty INDEX-native generator manifests with capabilities are published, alongside the generated Sketch adapters. Generator algorithms, identifiers, creative filenames and parameter ranges remain those of the migrated tools; the approved Orbital Geometry `Scale` default changes to 100. Known issue CF-001 documents an Intel standalone rendering difference reproduced in Chrome and Safari; no shader fix is asserted. This contract was frozen following maintainer testing on 2026-10-12.

---

# INDEX — Development guidelines and FREEZE workflow

**Internal guidelines revision:** 0.3-draft (derived from the former Submission Contract v0.2).  
**Technical API authority:** §§1–6 and §8 above, stable generator schema v1.0, **unchanged by this draft**.  
**Scope:** BeerBelgio's own INDEX tools. No external submissions, contribution terms or public intake workflow are defined here.

These guidelines define how we develop, review and freeze tools. They do not add required runtime API fields or force Sketch/Bridge-specific control limits. When this section refers to an API, follow the technical sections above; when it refers to catalogue data, follow `../data/tools.json` (path relative to this document after relocation).

## 10. Purpose and tool development principles

INDEX is the canonical creative system. A tool should stay portable, standalone, offline-capable and independent of any particular host when practicable. Existing generators that Sketch can technically support retain a Sketch adapter, but Sketch does not determine INDEX's future algorithmic or control limits.

- Prioritize meaningful creative possibilities over control count or mechanical feature parity.
- A visible control must have a useful, understandable effect. Internal algorithm variables do not need to become UI controls.
- Choose default behaviour intentionally; the approved defaults are those in the canonical INDEX manifest, never in a second preview-only or Bridge-specific preset.
- Keep the tool usable without MIDI, audio modulation, Ableton automation or host-specific extensions.
- Make dependencies or missing host capabilities explicit instead of introducing silent fallbacks.

**Development phases:** BUILD → TEST → FREEZE → PACKAGE → PUBLISH. These are practical checkpoints, not five forms or approval ceremonies. Only FREEZE and PUBLICATION need an explicit project-owner decision.

## 11. Controls, semantics and defaults

Preserve and apply these quality criteria from the original Submission Contract v0.2:

- Avoid redundant controls, debug-only controls and discrete modes with almost indistinguishable output.
- Prefer perceptual labels (what changes visually) over names of implementation variables.
- Prefer independent perceptual dimensions; document intentional coupling when it is intrinsic to the tool.
- Bipolar controls should have a meaningful neutral value at zero. The positive and negative sides should deliver meaningfully different/opposite behaviour when their semantics promise it.
- Expose a Seed control only if reseeding offers a genuine creative action; otherwise deterministic variation can remain internal.
- A control labelled in seconds, frames, degrees or counts should correspond to the observed outcome as closely as the implementation permits.
- Avoid unexplained jumps, plateaus or counterintuitive discontinuities in control mappings. Document meaningful exceptions (including resolution or FPS limits).
- Prefer manual-only control for discrete modes, triggers and master BPM when modulation would be incoherent. An available host mapping slot is not a reason to expose a parameter to audio.
- Use a background only when it is part of the work. Otherwise prefer transparent output so the tool can be composited.
- Assess default, minimum, maximum, useful midpoint and representative combinations; do not test parameters only one at a time.

The exact manifest fields, allowable key format, ranges, defaults, role/capability syntax and `audio[]` mapping semantics are defined exclusively by the technical contract above; do **not** duplicate or override them here.

## 12. Rendering, time and statefulness

- Preserve visual coherence during resize, across common aspect ratios and at sensible output resolutions.
- Avoid unintended seams, clipping, ghost geometry, missing shapes, invalid numbers and frame-to-frame randomness.
- Use deterministic variation when the intention is stable randomness.
- Use sufficient overscan when motion, deformation, panning, scrolling or rotation would otherwise expose geometry edges.
- Keep output geometry finite over declared parameter ranges, including heavy combinations.
- Restore/reset Canvas2D or WebGL state explicitly when changes could contaminate later draws or layers.
- Test alpha and background independently, including color-opacity transitions and HEX changes while a color is fully transparent where that feature applies.
- Distinguish speed/tempo, amplitude/amount, variation/randomness and trigger/envelope behaviour when the concept warrants those controls.

**For accumulative/feedback tools (conditional):** bound state lifetime and memory; clear/recreate buffers safely on resize; provide a reset/trigger when creative clearing is necessary; remove expired content without residual pixels. Durations should reflect elapsed time or actual region/object age rather than merely approximating time through a fixed count of frames.

The technical host clock and standalone lifecycle rules are specified in §3; the guidelines above assess **observed quality**, not an alternative time API.

## 13. Performance and dependencies

The design target is real-time creative use, not merely a still image at defaults:

- Avoid unbounded history, buffers, allocations and unnecessary expensive work in the hot path.
- Exercise high resolutions, worst-case individual controls **and** combined heavy settings.
- Test sustained running and rapid resize/tool replacement where the concept stores or allocates GPU resources.
- Record significant device, browser, GPU or engine limitations rather than claiming universal performance.
- Do not establish universal FPS budgets or arbitrary control ceilings before repeatable benchmark evidence exists.

**Dependencies:** prefer a self-contained HTML without required remote assets or network access. If unavoidable, identify each external dependency, its source, license, role and offline consequence before approval. Silent runtime reliance on CDNs, remote fonts, images, APIs or remote code is unacceptable for standalone distribution.

## 14. Provenance, creative lineage and editorial handoff

Record two distinct relationships:

- **Code provenance:** whether the implementation is original, a port, adapted or derived from another implementation; identify source and applicable license if third-party code is involved.
- **Creative lineage:** conceptual, visual, algorithmic or interaction references that informed the work without supplying code.

Do not assume visual inspiration grants reuse rights for code, pattern files, node graphs, fonts or assets. If reuse permission is unclear, treat the reference as research only until the license or authorization is established. Keep required third-party credits and notices alongside the appropriate release materials. The legal policies remain authoritative in [`../LICENSE.md`](../LICENSE.md) and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) after the proposed move; this section does not create new grants of rights.

**Editorial source of truth:** The HTML `INDEX_TOOL` manifest owns technical controls and defaults. `data/tools.json` owns published catalogue metadata, identity and descriptions. The content-inventory spreadsheet is an **internal editorial workspace**, not another technical manifest; it may be used to prepare and synchronize copy for the catalogue. Do not independently maintain numeric defaults inside a workbook.

When a tool is ready for inclusion, provide a metadata draft with name, slug, version, family/tags, summary/about copy, brief control explanations, dependencies/known limits and attribution or lineage. The final published `toolId` and catalogue entry are assigned or confirmed during integration; never casually reuse an existing identity.

## 15. Lightweight development and FREEZE workflow

### BUILD

Implement and iterate on the HTML. Keep local experiments local. During this phase, a working HTML and short notes are sufficient; the complete publication package is not required.

### TEST

Run checks that match the actual tool role and renderer. Record PASS, FAIL, PENDING or N/A, with a brief note for important failures. Automated syntax/manifest checks do not substitute for manual visual/runtime tests.

### FREEZE

The approved tool behaviour, visible defaults and control semantics become the baseline. FREEZE does **not** imply a mandatory creative version number such as `v1.0`; a tool's own version history stays independent from INDEX site releases and from the manifest `schemaVersion`. Any later behavioural/default change requires renewed verification and an appropriate tool-version change before promotion.

### PACKAGE

The practical internal handoff is: checked standalone HTML, brief verification notes, draft catalogue metadata, and the updated editorial workbook when that workflow is in use. Preserve the structure and formatting of the existing `@Preset_newHTML` workbook if using it. Optional assets should be included only when needed.

### PUBLISH

Integrate the approved tool into INDEX and follow `RELEASE_POLICY.md` for an INDEX platform release. Editorial copy may still be adjusted after FREEZE without invalidating the tool behaviour. Never silently change frozen algorithms or defaults as part of packaging or publication.

## 16. FREEZE checklist — use only applicable checks

The checklist below combines the v0.2 quality tests with the current INDEX workflow. Each row may be PASS, FAIL, PENDING or N/A. Store brief test evidence with the tool's development materials; a separate permanent report in the public repository is not mandatory.

**Manifest & package**
- [ ] Manifest/JS syntax valid against the current role-specific INDEX Tool Contract; no duplicate keys; derived Sketch adapter consistent **when applicable**.
- [ ] Correct canonical defaults, visible names, tool identity and creative version; no hidden preview/host preset.
- [ ] File opens standalone and contains all required local dependencies; any exceptions reviewed.

**Visual behaviour**
- [ ] Defaults, representative parameter extremes, important midpoints and one heavy combined case are visually checked.
- [ ] Discrete selectors show meaningful distinct modes; bipolar controls have an appropriate zero; time/count claims are plausible.
- [ ] Resize and common aspect ratios tested, including deformation/overscan and clipping.
- [ ] Alpha/background and all relevant per-color opacity transitions tested, including 100→50→0→100 and HEX change at zero where supported.
- [ ] No unintended seams, residual pixels, invalid geometry or broken rendering under approved ranges.

**Motion & state (conditional)**
- [ ] Host timeline and pause/reset show coherent behaviour; standalone preview does not fight host time.
- [ ] Trigger/reset, persistent memory, expiry, cleanup and buffer reinitialization tested where present.

**Performance & hosts**
- [ ] Realtime behaviour checked at practical resolution and representative worst-case settings; significant limits noted.
- [ ] Playground load, replacement, multiple-layer combination and FX processing tested as applicable.
- [ ] Sketch import and parameter/default mapping tested for supported generators; not imposed on unsupported FX/compositor designs.
- [ ] Bridge/other host tested only when supported and relevant; a host's unrelated release blockers do not automatically prevent INDEX tool FREEZE.

**Provenance & handoff**
- [ ] Code provenance and creative lineage recorded independently, with relevant URLs and license review.
- [ ] Required third-party notices and permissions accounted for; unknown license status resolved or the reference remains reference-only.
- [ ] Approved HTML, short verification record, metadata draft and editorial workbook (if used) ready for PACKAGE.
- [ ] Creative FREEZE explicitly accepted before publishing; any post-FREEZE behavioural edits return to TEST.

## 17. Guideline maintenance

Update these development guidelines only when experience across tools reveals a reusable rule. Keep experimental FX, two-source compositor and audio-native input requirements clearly marked as provisional until their separate runtime contracts have passed real host tests.

Revisions to these guidelines can change their own revision number without changing the frozen generator v1.0 schema. Any proposal that alters technical requirements in §§1–6 must be reviewed separately, explicitly versioned and regression-tested against current tools and hosts. Avoid unnecessary paperwork, parallel manifests and new documents for one-off issues.