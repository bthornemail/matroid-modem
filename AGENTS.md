# AGENTS.md

This file defines repository-specific guidance for coding agents and contributors.

## 1) Project intent

This repository implements a semantic modem runtime with a strict NDJSON wire protocol.

Current protocol baseline:

- `docs/RFC-0040-modem-protocol-v0.1.md`

Do not introduce alternate protocol semantics in parallel paths without explicit migration notes.

## 2) Primary code areas

- Gateway runtime: `src/server.js`
- React app: `web/src/*`
- Protocol engine:
  - `web/src/engine/types.ts`
  - `web/src/engine/semanticMerkle.ts`
  - `web/src/engine/validateRecord.ts`
  - `web/src/engine/quarantine.ts`
  - `web/src/engine/useCommitStream.ts`
- Tests: `web/src/engine/__tests__/*`
- Public build output: `public/react/*`

## 3) Required invariants

1. Canonical mapping remains `7→8→64→240`.
2. Accepted wire record types are `tx_frame`, `rx_frame`, `commit`.
3. Ingest path is strict:
   - parse NDJSON
   - validate
   - accept OR quarantine
4. Invalid records must never mutate accepted state.
5. Hash/chaining behavior must remain deterministic.

## 4) Commands to run before handoff

```bash
npm run test:web
npm run build:web
npm run build
```

If changing package dependencies, run:

```bash
npm install
```

## 5) Documentation policy

When protocol/runtime behavior changes, update:

- `docs/RFC-0040-modem-protocol-v0.1.md` (if normative contract changes)
- `docs/PROJECT_DOCUMENTATION.md` (architecture/behavior updates)
- `README.md` (operator-facing quickstart/commands)

## 6) Style and change constraints

- Keep changes surgical and local.
- Reuse existing module patterns in `web/src/engine`.
- Avoid introducing duplicate record type definitions outside `types.ts`.
- Prefer deterministic logic over implicit inference.
- Preserve compatibility with current scripts in `package.json`.
