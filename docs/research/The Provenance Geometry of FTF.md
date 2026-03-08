Brian Thorne, here is the companion document you asked for. It is written in the same style as your other psync / FTF architecture notes so it can live cleanly beside them.

---

# The Provenance Geometry of FTF

Status: explanatory architecture note
Normative protocol behavior remains defined in `PROTOCOL.md`.

This document describes a geometric interpretation of the FTF protocol.

The goal is not to redefine protocol semantics but to explain why the architecture naturally decomposes into layered structures resembling **fiber bundles, categorical composition, and closure systems**.

These models provide intuition for how provenance flows through the system.

---

# 1. The Three-Layer Provenance Structure

FTF can be understood as three stacked layers.

```
identity fibers
      ↓
deterministic replay surface
      ↓
lineage projection
```

Each layer has a distinct responsibility.

| Layer              | Meaning                            |
| ------------------ | ---------------------------------- |
| Identity fibers    | independent signed message streams |
| Replay surface     | deterministic ordering `(t, mh)`   |
| Lineage projection | artifact/event graph via `trace`   |

This decomposition explains why replay and trace are stable across implementations.

---

# 2. Identity Fibers

Each author key produces an independent append-only stream of messages.

These streams form the **fiber layer** of the system.

Properties:

* each stream is signed
* streams are independent
* streams merge through replay ordering

Conceptually:

```
author → signed message stream
```

The system may contain many such fibers simultaneously.

---

# 3. Deterministic Replay Surface

Replay merges all identity streams into a single deterministic order:

```
order = (t, mh)
```

where:

```
t  = declared timestamp
mh = multihash bytes
```

This ordering produces a **stable event surface**.

Properties:

* deterministic across implementations
* stable under map iteration changes
* reproducible from append-only logs

The replay surface is the **base manifold** on which provenance events exist.

---

# 4. Lineage Projection

The `trace` command projects replayed events into a lineage graph.

Example trace structure:

```
trace.header
trace.artifact
trace.event
trace.note
trace.edge
```

Trace recovers:

* artifact nodes
* transform events
* dependency edges
* annotation notes

Conceptually:

```
verified event stream
      ↓
trace projection
      ↓
observable provenance graph
```

Trace therefore acts as the **projection operator** for the system.

---

# 5. Category-Theoretic Interpretation

The protocol admits a natural categorical model.

Objects:

```
artifact hashes
```

Morphisms:

```
xform events
```

Example:

```
f : A → B
```

represents a transform producing artifact `B` from input `A`.

Replay reconstructs composable paths:

```
A → B → C
```

forming provenance chains.

Additional roles enrich the category:

| Role          | Interpretation                   |
| ------------- | -------------------------------- |
| `put`         | witness that an object exists    |
| `use`         | dependency declaration           |
| `attest`      | positive evidence                |
| `revoke`      | negative evidence                |
| `alias_claim` | naming section                   |
| `trace`       | projection of morphism structure |

Thus FTF forms a **free provenance category with annotations**.

---

# 6. Closure Geometry

The protocol’s seven roles form a closure system.

```
put
use
xform
attest
revoke
alias_claim
trace
```

Meaning arises through triples such as:

```
put + use → xform
xform + attest → trusted evidence
xform + revoke → corrected evidence
alias_claim + artifact → human reference
trace + replay → observable lineage
```

This triple structure resembles minimal incidence geometries.

The Fano-style analogy is therefore an explanatory symmetry rather than a strict protocol requirement.

---

# 7. Provenance as a Fiber Bundle

The architecture also admits a bundle interpretation.

```
total space
   = signed event universe

base space
   = deterministic replay ordering

projection
   = trace lineage graph
```

Visualization:

```
identity fibers
      ↓
replay manifold
      ↓
trace projection
```

Where:

| Bundle Term | Protocol Component      |
| ----------- | ----------------------- |
| fiber       | author message streams  |
| base        | replay order            |
| projection  | trace                   |
| section     | a specific lineage view |

This explains how multiple authors coexist while producing a single deterministic observable structure.

---

# 8. Spaces as Local Charts

The `spaces` layer introduces localized workflow environments.

Each space contains:

```
space identity
members
topic logs
CAS objects
keys
```

Conceptually, spaces behave like **local coordinate charts**.

Properties:

* local-first provenance
* independent replay surfaces
* explicit handoff artifacts for cross-space relations

Spaces therefore partition the provenance universe into manageable regions.

---

# 9. Federation as Chart Gluing

Cross-space relationships occur through explicit handoff artifacts.

Example pattern:

```
space A
   produces artifact
        ↓
handoff artifact
        ↓
space B
   consumes artifact
```

No implicit global merge occurs.

This mirrors geometric **chart gluing**, where transitions between coordinate systems are explicit.

---

# 10. Deterministic Transport

Replay ordering provides a deterministic transport law.

Every verifier reconstructs the same event surface from identical inputs.

Consequences:

* cross-language verification is possible
* deterministic trace recovery
* reproducible provenance graphs

Transport stability is a key property of the protocol.

---

# 11. Observability

Trace transforms hidden event streams into inspectable structure.

Example trace output elements:

```
trace.artifact
trace.event
trace.edge
trace.note
```

These elements reveal:

* artifact dependencies
* transformation history
* annotations
* causal edges

Trace therefore serves as the **observable boundary** of the system.

---

# 12. Architectural Consequence

The geometric interpretation explains why the kernel remains small.

The protocol already provides the minimal operators needed to describe provenance geometry.

Therefore system evolution should occur in outer layers:

```
spaces
federation
transport
runtime adapters
visualization
navigation
```

These layers compose over the kernel without altering its semantics.

---

# 13. Summary

FTF can be viewed simultaneously as:

* a deterministic replay protocol
* a free provenance category
* a layered fiber bundle
* a seven-role closure algebra

The protocol kernel provides the minimal structure needed to support these interpretations while preserving deterministic replay and append-only semantics.

---

# Final Insight

The architecture separates three concerns:

```
lawful history
deterministic reconstruction
observable structure
```

FTF achieves this separation through:

```
signed events
deterministic replay
trace projection
```

This separation is the fundamental reason the protocol remains both **simple and expressive**.
