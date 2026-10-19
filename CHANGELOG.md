# Changelog — INDEX HTML

Changes to the INDEX HTML site, Playground, public contract and tool collection. Versions here are **independent** from INDEX-HTML Bridge and from each individual tool's creative version.

## [Unreleased]

No changes recorded since 0.21.2.

## [0.21.2] — 2026-10-19 (documentation and Download All maintenance)

### Fixed
- DOWNLOAD ALL now reads `project.releaseBuild` (instead of retired `stagingBuild`) consistently for the ZIP filename, bundled `README.txt` and bundled `INDEX-HTML-MANIFEST.json`.

### Documentation
- Consolidated the previous internal Submission Contract v0.2 into the frozen generator Tool Contract document, adding practical creative-quality, testing, provenance, packaging and FREEZE guidelines without changing the generator v1.0 runtime API.
- Moved Tool Contract, Release Policy, Known Issues and Third-Party Notices into `docs/`; updated README, website legal references, Download All legal-file path and the 20 tool READMEs.
- Retired the obsolete `RC-VERIFICATION.md` (recoverable from Git history).
- Kept `LICENSE.md` at the repository root for license discoverability.

Updated the site build labels and catalogue `project.releaseBuild` to 0.21.2 for consistent ZIP naming and release identification. Tool entries, creative defaults, frozen generator APIs and the Bridge device are unchanged.

## [0.21.1] — 2026-10-12 (documentation-only maintenance)

### Changed
- Consolidated still-relevant host integration and local-bundle conventions in `INDEX-TOOL-CONTRACT.md` without changing the frozen generator v1.0 API.
- Updated README and documentation references to reflect the current release and remove obsolete links.
- Expanded known issue `CF-001`: Cellular Field standalone discontinuities were also reproduced in Safari on the Intel Mac mini; the underlying cause remains unconfirmed.
- Clarified that documentation-only maintenance qualifies as a PATCH release.

### Removed
- Retired `INDEX-CONTROL-PROTOCOL.md` (staging-era host research) and `INDEX-TOOL-CONTRACT-PROPOSAL.md` (superseded prototype) from the active root. Both remain available from the immutable `0.21.0` tag and Git history.

### Compatibility
- Documentation changes only. No changes to tool HTML, manifest schemas, algorithms, defaults, Playground, website runtime, or INDEX-HTML Bridge.


## [0.21.0] — 2026-10-12 (first promoted release)

### Added
- Frozen INDEX Tool Contract v1.0 for generators, with technical capability declarations for 20 tools; fragment FX remains provisional.
- INDEX-native canonical manifests with retained Sketch-compatible adapters.
- Release policy, known issues and concise project changelog.

### Changed
- Browser homepage previews and tool detail page prefer INDEX-native entrypoints, with Sketch fallback.
- Catalog technical source of truth moved to `INDEX_TOOL` while editorial metadata stays in `data/tools.json`.
- Orbital Geometry `Scale` default: 150 → 100 (both manifests).
- README reorganized to reflect current features rather than serving as a development diary.
- Removed the staging `noindex` metadata from the main public pages.

### Compatibility
- Tested by the project maintainer on Intel and M5 in standalone Chrome, Sketch, INDEX Playground and Bridge 0.23.6; cross-platform/browser end-to-end certification is not claimed.
- Sketch generator support preserved; Bridge maintains its own independent release cycle.

### Known issues
- `CF-001`: Cellular Field has visible standalone Chrome geometry discontinuities on the Intel machine; M5 is unaffected in the supplied comparison. See `KNOWN_ISSUES.md`.

## Previous development milestones (reconstructed summary, not retroactive GitHub Releases)

- **0.20.x — September–October 2026:** INDEX Playground, multilayer compositing (five layers), manifest compatibility and performance controls; RC UI and copy iterations.
- **0.17.x — September–October 2026:** tool catalog grew from 11 to 20 generators, with host opacity support and editorial metadata consolidation.

Historical items summarize development rather than claim a completed formal release or retroactively verified tests.
