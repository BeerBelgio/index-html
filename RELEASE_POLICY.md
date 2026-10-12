# Release policy — INDEX HTML

- Platform and Bridge versions are **independent**.
- Adopt semantic-ish `MAJOR.MINOR.PATCH`: PATCH = bugfix/small UI-copy/default changes; MINOR = features/capabilities/compatible structural changes; MAJOR = deliberately approved architectural milestone.
- Candidate labels: e.g. `0.22.0-rc.1`, `0.22.0-rc.2`, etc. Internal RCs are **not** GitHub tags or GitHub Releases.
- Promotion requires passed checks appropriate to the affected features, known issues disclosed, README/CHANGELOG/release notes synchronized, and explicit maintainer approval.
- Only then create immutable numeric Git tags without a `v` prefix (e.g. `0.21.0`) and an official GitHub Release.
- `README.md` describes the current product. `CHANGELOG.md` records short changes newest first. GitHub Release notes give the full approved change set, compatibility, known issues, tests and migration instructions.
- Do not invent older tags or rewrite historical commits. Summarize verifiable milestones in the changelog instead.
- Tool-specific versions and INDEX Tool Contract versions are independent of the platform version.

## Release notes template

**Title:** INDEX HTML {version}  
**Status:** Stable / Beta (only after approval)  
**Date:** YYYY-MM-DD

### Added
- …

### Changed
- …

### Fixed
- …

### Compatibility
- Supported runtimes/hosts and validation details

### Breaking changes
- None, or explicit migration guide

### Known issues
- IDs and workarounds, where possible

### Testing notes
- Automated: PASS/FAIL; manual by host/OS: PASS/FAIL/PENDING

### Upgrade / Notes
- Changes needed by consumers; links to contract/changelog
