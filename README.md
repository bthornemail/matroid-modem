# matroid-modem

PWA-first semantic runtime with a strict NDJSON protocol, optional gateway transport bridge, and a deterministic 7→8→64→240 modem mapping.

## Status

- Protocol baseline: **v0.1**
- Normative spec: `docs/RFC-0040-modem-protocol-v0.1.md`
- Full technical docs: `docs/PROJECT_DOCUMENTATION.md`
- Architecture diagrams: `docs/ARCHITECTURE_DIAGRAM.md`
- Rumsfeldian roadmap analysis: `docs/RUMSFELDIAN_ANALYSIS.md`
- v0.2 implementation roadmap: `docs/ROADMAP-v0.2.md`

## Core Architecture

- **Gateway plane (Node)**: `src/server.js` (Express + WS + SSE + MQTT bridge)
- **Semantic plane (Browser/React)**: `web/src/*` (strict ingest, validation, quarantine, projection)
- **Template/data plane**: `public/docs/narrative-series/*`, scripts under `scripts/*`

## Canonical wire records (v0.1)

- `tx_frame`
- `rx_frame`
- `commit`

All records are validated strictly. Invalid records are quarantined with explicit reason codes.

## Quick Start

### 1) Install

```bash
npm install
```

### 2) Run gateway

```bash
npm start
```

### 3) Run React portal in dev mode

```bash
npm run dev:web
```

### 4) Build React portal to `public/react`

```bash
npm run build:web
```

### 5) Run conformance tests

```bash
npm run test:web
```

### 6) Run build checks

```bash
npm run build
```

## Important Paths

- `src/server.js` — gateway runtime
- `web/src/engine/semanticMerkle.ts` — canonical mapping + hashing
- `web/src/engine/validateRecord.ts` — strict validator
- `web/src/engine/quarantine.ts` — quarantine buffer
- `web/src/engine/useCommitStream.ts` — ingest funnel integration
- `web/src/engine/__tests__/*` — conformance harness
- `docs/RFC-0040-modem-protocol-v0.1.md` — protocol contract
- `docs/PROJECT_DOCUMENTATION.md` — full implementation documentation

## Demo and Template Tooling

- Generate template manifest:

```bash
npm run templates:manifest
```

- Compile and ingest demo:

```bash
npm run demo:founding
```

## License

Apache-2.0 (`LICENSE`)
