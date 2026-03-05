# Project Documentation

## 1) What this repository is

`matroid-modem` is a semantic runtime composed of:

- A **Node gateway** (`src/server.js`) for HTTP/WS/SSE/MQTT transport bridging.
- A **browser portal** (React app under `web/`) for visualization, ingestion, and diagnostics.
- A **strict NDJSON wire contract** for protocol records (`tx_frame`, `rx_frame`, `commit`).
- Supporting tools for template manifests, civic compilation, and demo ingestion.

This repo is currently aligned to **Modem Protocol v0.1** (`7→8→64→240` mapping).

---

## 2) Current protocol baseline (v0.1)

Normative RFC:

- `docs/RFC-0040-modem-protocol-v0.1.md`

Locked assumptions:

- Canonical path: `fano_line_id + register_state + hexagram_index -> hexagram_bits[6] -> shell[240]`
- Wire records: `tx_frame`, `rx_frame`, `commit`
- Validation: strict; invalid records are quarantined
- Hashing/chaining: deterministic and mandatory
- Signatures: optional in v0.1 (`sig`, `sig_scheme`, `signer` validated if present)

---

## 3) Repository layout

### Runtime

- `src/server.js` — gateway runtime (Express + WS + SSE + MQTT)
- `src/stream.js` — stream processing utilities
- `src/entrain.js` — entrainment/scheduling utilities
- `src/semantic-multigraph-builder.js` — basis graph tooling

### Web app (React + TypeScript + Vite)

- `web/src/App.tsx` — app entry layout switch
- `web/src/components/portal/*` — portal UI panels
- `web/src/engine/types.ts` — canonical record types
- `web/src/engine/semanticMerkle.ts` — canonical mapping + hash/chaining utilities
- `web/src/engine/validateRecord.ts` — strict validator
- `web/src/engine/quarantine.ts` — quarantine buffer and reason tracking
- `web/src/engine/useCommitStream.ts` — ingest funnel + protocol emission
- `web/src/engine/useWesiriEngine.ts` — simulation/engine state integration
- `web/src/engine/__tests__/*` — conformance tests and golden vectors

### Public/static assets

- `public/react/` — built React output (`npm run build:web`)
- `public/wesiri-*.html` — legacy/static modem variants
- `public/manifest.json`, `public/sw.js` — PWA assets
- `public/docs/narrative-series/*` — shipped bootstrap templates

### Tooling/scripts

- `scripts/generate-templates-manifest.js`
- `scripts/civic-compiler.js`
- `scripts/demo-founding-compile.js`
- `scripts/demo-ingest.js`

---

## 4) Runtime architecture

### Plane A — Gateway (optional but recommended)

Responsibilities:

- Serve static portal assets
- Receive NDJSON via HTTP endpoints
- Bridge records over WebSocket/SSE
- Subscribe and forward MQTT traffic

### Plane B — Browser portal (sovereign semantic node)

Responsibilities:

- Ingest NDJSON (`ingestRecord`, `ingestNdjsonText`)
- Strict validation and quarantine
- Protocol event simulation (`tx_frame -> rx_frame -> commit`)
- Visual diagnostics (stream, schema, quarantine, SAB view)

### Plane C — Data/template layer

Responsibilities:

- Narrative templates and civic sources
- Deterministic template manifest/hash provenance
- Demo compilation into NDJSON

---

## 5) Ingestion and validation pipeline

Canonical flow:

1. Raw text line arrives (UI paste, WS, SSE, MQTT-forwarded, HTTP ingest, simulation).
2. Parse JSON line-by-line (NDJSON atoms).
3. Validate against v0.1 contract (`validateRecord`).
4. If valid:
   - append to accepted stream
   - update schema preview
   - allow downstream projection/state updates
5. If invalid:
   - quarantine entry is created with:
     - `reason_code`
     - `reason_detail`
     - `raw_line`
     - `received_at`
     - `source`

No invalid record should mutate accepted runtime state.

---

## 6) Deterministic mapping and chain rules

`web/src/engine/semanticMerkle.ts` provides:

- `toHexagramBits(index)` — 6-bit index mapping
- `projectHexagramToShell(bits)` — 6 sectors × 40 cells
- `hashShell(shell)` — deterministic shell leaf hash
- `hashCanonicalRecord(record)` — deterministic record hash
- `buildTxFrame`, `buildRxFrame`, `buildCommitFromEvent` — canonical constructors
- `verifyLeafHash`, `verifyCanonicalHash` — integrity checks

Hash canonicalization excludes:

- `self_hash`
- `sig`
- any `undefined` values

---

## 7) Conformance harness

Tests live in:

- `web/src/engine/__tests__/semanticMerkle.test.ts`
- `web/src/engine/__tests__/validateRecord.test.ts`
- `web/src/engine/__tests__/conformanceChain.test.ts`

They cover:

- Golden vectors (`register_state` × selected hexagrams)
- Validation reject paths (missing/out-of-range/hash mismatch)
- Chain linking (`prev_hash` semantics)
- Round-trip tx/rx consistency
- Quarantine reason determinism

---

## 8) Development workflow

### Install

```bash
npm install
```

### Run gateway

```bash
npm start
```

### Web app development

```bash
npm run dev:web
```

### Build React bundle to `public/react`

```bash
npm run build:web
```

### Run conformance tests

```bash
npm run test:web
```

### Repo build checks

```bash
npm run build
```

---

## 9) Release and packaging notes

- Package metadata and publish settings are in `package.json`.
- Template provenance should be regenerated before release:

```bash
npm run templates:manifest
```

- Dry-run package content:

```bash
npm pack --dry-run
```

For release process details, see:

- `docs/RELEASE.md`
- `CHANGELOG.md`

---

## 10) Known constraints (v0.1)

- Only one canonical mapping path is supported.
- Signature enforcement is optional; hash/chaining is required.
- Legacy static runtime exists for compatibility but the React engine is authoritative for current development.

---

## 11) Recommended next milestones (v0.2+)

- Signature verification policy levels (warn/strict).
- Basis negotiation for multi-basis federation.
- Transport provenance normalization across WS/SSE/MQTT.
- Additional ingest adapters (serial/camera/WebRTC) wired to the same strict funnel.
