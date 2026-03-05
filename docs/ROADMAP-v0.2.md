# Roadmap v0.2

This roadmap converts current known-unknowns into implementation-complete, testable known-knowns.

## Scope

- Signature policy enforcement
- Basis negotiation contract
- Transport provenance hardening
- Legacy/runtime convergence

---

## Milestone 1: Signature Policy Levels

### Goal
Add deterministic signature verification modes for wire ingest.

### Deliverables
- Policy modes: `disabled | warn | strict`
- Validator integration for `sig`, `sig_scheme`, `signer`
- UI state showing verification status per accepted record

### Exit Criteria
- In `strict`, invalid signatures are quarantined.
- In `warn`, invalid signatures are accepted with explicit warning metadata.
- Conformance tests cover all three policy modes.

---

## Milestone 2: Basis Negotiation Contract

### Goal
Formalize cross-node basis handshake for federation sessions.

### Deliverables
- New handshake record(s): `basis_handshake_request`, `basis_handshake_ack`
- Deterministic basis mismatch behavior in gateway and browser ingest
- RFC update defining handshake sequencing and timeout semantics

### Exit Criteria
- Nodes can deterministically accept or reject session basis before data exchange.
- Mismatch behavior is test-covered and visible in diagnostics.

---

## Milestone 3: Transport Provenance Hardening

### Goal
Unify provenance metadata and loop prevention across WS/SSE/MQTT/HTTP.

### Deliverables
- Canonical `_hop` / `source` stamping rules
- Loop prevention rules tested end-to-end
- Gateway/brower parity for inbound/outbound provenance labels

### Exit Criteria
- Re-ingested records do not create loops.
- Provenance on accepted records is deterministic and queryable.
- Conformance tests include multi-transport replay scenarios.

---

## Milestone 4: Legacy Convergence

### Goal
Eliminate behavior drift between legacy static runtime and React runtime.

### Deliverables
- Legacy artifacts explicitly marked compatibility-only
- Shared protocol vocabulary and record typing across both paths
- Optional deprecation plan for legacy runtime execution path

### Exit Criteria
- No conflicting protocol semantics between legacy and React paths.
- Docs clearly define normative runtime path.

---

## Recommended Sequence

1. Signature policy
2. Basis negotiation
3. Transport provenance
4. Legacy convergence/deprecation

This order reduces risk by locking trust semantics before federation expansion.

---

## Tracking Template

For each milestone, track:

- Owner
- Start date
- Target date
- Current status (`not_started | in_progress | blocked | complete`)
- Risk notes
- Test coverage status
