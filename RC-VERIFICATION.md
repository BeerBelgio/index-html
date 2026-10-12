# INDEX HTML 0.21.0 RC1 — Verification and release gate

**Source:** GitHub main V0.20.1 RC3 checked for key file hashes; local `index-html-main.zip` + matching RC2 and RC3 overlays.

## PASS (static)

- 20 canonical `INDEX_TOOL` and matching `SKETCH_TOOL` literal mirrors retained, along with dual draw/resize entrypoints.
- 20 inline tool JavaScript syntax checks (`node --check`).
- 20 manifest parity checks, with **only** Orbital Geometry Scale changing from 150 to 100 in both manifests (and the tool README).
- Manifest role + declared capabilities present; known original color/audio metadata preserved.
- 4 browser-facing HTML pages have their staging `noindex` flags removed in the candidate, and the version build label is consistent.
- Homepage and tool detail JS parse with Node; both prefer INDEX entrypoints with Sketch fallback.
- `data/tools.json` parses and references 20 present tool files.

## NOT TESTED / BLOCKED

- Automated Chromium smoke: the environment launches Chromium, but navigation to loopback HTTP, `file://` and `data:` URLs is blocked with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. **Do not report browser tests as PASS.**
- GitHub Pages deployment smoke (homepage hero, catalog, individual tool, multi-layer Playground and responsive) awaits upload.
- Real-world GPU/WebGL on Intel and M5 for this combined candidate has not been rerun. Earlier user tests of the RC2 tool package in Sketch, browser, Playground and Bridge 0.23.6 were reported working except CF-001 in Intel standalone.

## Open issues / release decision

- **CF-001** Cellular Field direct Chrome file-open on Intel has fragmented cell boundaries; M5 image comparison is clean. Root cause not proven; document as known issue, not fixed.
- **Bridge Set recall issue:** separate product and release lifecycle, does not block INDEX HTML website release. User and Codex must resolve before Bridge is promoted.
- The 0.21.0 RC remains **NOT PROMOTED** until user approval and smoke tests.

## Minimal acceptance checks after upload to a test branch

1. Homepage loads all 20 catalog entries and animated hero (try reload 3×).
2. Orbital Geometry on tool page starts Scale=100, renders closed enough at the approved defaults and resets back to 100.
3. Playground loads Orbital Geometry and Cellular Field from catalog, handles layer replacement, Play/Pause and blend/opacity.
4. Test one Canvas2D generator and one WebGL generator directly from file plus via Sketch.
5. Verify source download and standalone links; test mobile layout and no missing assets.
6. On Intel test `Cellular Field` standalone and document CF-001 as still present/resolved; do not hide bug on Release notes.
7. Only after passing: version label `0.21.0`, update CHANGELOG status, numeric tag `0.21.0`, GitHub Release notes.
