# Rumsfeldian Analysis: Past, Present, Direction

This analysis frames project maturity using the `KK / KU / UK / UU` lens.

## 1) Where we came from

### Unknown Unknowns (UU) that dominated early work

- Multiple competing semantic narratives and mappings were mixed together.
- Ingestion was permissive, so invalid records looked valid in UI behavior.
- Runtime authority was split between legacy static pages and newer React modules.
- Hash/chaining behavior existed but was not fully enforced as a hard boundary.

### Unknown Knowns (UK) that were present but implicit

- You already had strong primitives (NDJSON atomicity, basis discipline, projection logic).
- Operational constraints (single ingestion funnel, deterministic transforms) were known intuitively but not fully codified.
- The architecture was already trending toward browser sovereignty + optional gateway, but this was not yet uniformly expressed in code contracts.

## 2) Where we are now

### Known Knowns (KK) now locked

- Canonical protocol path: `7→8→64→240`.
- Canonical wire types: `tx_frame`, `rx_frame`, `commit`.
- Strict ingest validation + quarantine on failure.
- Deterministic canonical hashing/chaining rules.
- Conformance harness with golden vectors and chain tests.
- Normative spec exists: `docs/RFC-0040-modem-protocol-v0.1.md`.

### Known Unknowns (KU) that remain explicit

- Signature policy is optional in v0.1; enforcement posture is a conscious decision for v0.2+.
- Multi-basis federation and basis negotiation are not yet formalized.
- Transport provenance normalization across WS/SSE/MQTT still has room for stronger contract guarantees.
- Legacy runtime compatibility remains, but final deprecation strategy is pending.

## 3) Where we are going

### Convert current KUs into KKs

1. **Signature policy levels**  
   Introduce strict/warn/disabled modes and make verification behavior deterministic.

2. **Basis negotiation contract**  
   Add explicit handshake semantics for multi-node, multi-basis sessions.

3. **Transport provenance hardening**  
   Normalize `_hop`/source lineage rules and add conformance tests for loop prevention and re-ingest safety.

4. **Legacy convergence**  
   Keep legacy static pages as compatibility artifacts, but treat React engine path as the sole normative runtime.

### Strategic target state

- Protocol behavior is fully test-driven and spec-first.
- Gateway remains optional infrastructure.
- Browser runtime remains semantic authority.
- Every accepted record is reproducible, hash-verifiable, and explainable.

## 4) Executive summary

- **Past:** high conceptual power, low contract rigidity.
- **Present:** contract-centered v0.1 runtime with strict validation and testable invariants.
- **Next:** complete the remaining policy contracts (signature, basis negotiation, provenance) and remove ambiguity between compatibility paths and normative paths.
