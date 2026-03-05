# Architecture Diagram

This document captures the current runtime data paths and control boundaries for `matroid-modem` v0.1.

## 1) End-to-end ingest path

```mermaid
flowchart LR
  A[Device / Peer / Script] -->|NDJSON| B[Gateway: src/server.js]
  B -->|WS/SSE| C[React Portal: web/src]
  C --> D[ingestNdjsonText]
  D --> E[validateRecord]
  E -->|ok| F[Accepted Stream]
  E -->|error| G[Quarantine Buffer]
  F --> H[SAB/Portal Projection]
  F --> I[Schema Preview + Logs]
  G --> J[Diagnostics Panel]
```

## 2) Protocol construction path

```mermaid
flowchart LR
  A[Fano line id] --> M[semanticMerkle.ts]
  B[register_state 0..7] --> M
  C[hexagram_index 0..63] --> M
  M --> D[hexagram_bits[6]]
  D --> E[shell[240] = 6x40]
  E --> F[leaf_hash]
  F --> G[self_hash]
  G --> H[tx_frame / rx_frame / commit]
```

## 3) Gateway transport boundary

```mermaid
flowchart TB
  subgraph Gateway
    A[HTTP /ingest]
    B[MQTT subscribe]
    C[WS /ws]
    D[SSE /sse]
    E[broadcast NDJSON]
    A --> E
    B --> E
    E --> C
    E --> D
  end
```

## 4) Browser runtime boundary

```mermaid
flowchart TB
  subgraph Browser Portal
    A[useWesiriEngine]
    B[useCommitStream]
    C[validateRecord]
    D[quarantineRecord]
    E[accepted records]
    F[quarantined records]
    A --> B
    B --> C
    C -->|ok| E
    C -->|error| D
    D --> F
  end
```

## 5) Current source-of-truth modules

- Protocol contract: `docs/RFC-0040-modem-protocol-v0.1.md`
- Mapping + hashing: `web/src/engine/semanticMerkle.ts`
- Validation: `web/src/engine/validateRecord.ts`
- Quarantine: `web/src/engine/quarantine.ts`
- Ingest funnel: `web/src/engine/useCommitStream.ts`
