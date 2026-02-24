# Changelog

## v0.1.1 — CLI Entry + Metadata Cleanup (2026-02-24)

### Added
- `bin/wesiri-gateway.js` executable CLI entry for `npx wesiri-gateway`.
- Package metadata: `description`, `keywords`, and `bin` mapping.

### Changed
- Version bumped to `0.1.1`.

## v0.1.0 — Sovereign Portal + Gateway + Founding Templates (2026-02-24)

### Highlights
- **Browser-sovereign semantic portal** (PWA-first) with protocol handlers.
- **Single ingestion funnel**: all transports converge on NDJSON atoms -> consistent validation/projection.
- **Gateway runtime (Node)**: Express + WebSocket + SSE + MQTT bridge + probe domain.
- **Template bootstrap corpus (minimal, shipped)** with deterministic provenance:
  - `templates.manifest.json` includes `templatesVersion`, per-file SHA256, `templatesMerkleRoot`, `generatedAt`.
  - Demo pipeline injects a stream header record carrying provenance + `templateCount`.
- **Reproducible demo path**: compile founding templates -> ingest -> observe SynsetRPC -> SAB/whiteboard projection.

### Added
- `src/server.js`: gateway endpoints and transports (`/ws`, `/sse`, `/ingest`, `/probe`) + MQTT bridge.
- `public/wesiri-modem-full-calibrated-autoqr.html`: portal console with:
  - ingestion funnel,
  - basis discipline + quarantine UI,
  - SynsetRPC -> SAB UU/meta projection,
  - protocol-handler URL support.
- `scripts/`: template manifest generator + demo compile/ingest scripts.
- `public/docs/narrative-series/*`: shipped template series (minimal bootstrap sets).
- `public/docs/narrative-series/templates.manifest.json`: generated provenance manifest.
- Demo scripts: `demo:compile`, `demo:ingest`, `demo:founding`.

### Changed
- Packaging is now deterministic via `files` whitelist:
  - ships runtime + portal + minimal template corpora + scripts + bin companions only.
- Gateway serves **only `public/`** assets (hygiene).
- Hop-stamping and provenance metadata hardened to prevent re-looping across transports.

### Security / Safety
- Basis mismatch quarantining surfaced in UI (visual marker + reason in schema panel).
- Hop-based loop prevention for WS<->MQTT paths.

### Known Limitations
- WebRTC signaling remains demo-grade (no turnkey signaling server).
- Probe verification is "best effort" (no required device signatures in v0.1.0).

### Upgrade Notes
- Node >= 18 required.
- If publishing publicly, verify `publishConfig.access` and package contents via `npm pack --dry-run`.
