# Incidence Geometry of the FTF Kernel

Status: explanatory architecture note
Normative protocol behavior remains defined in `PROTOCOL.md`.

This note explains how the Frozen Trace Fabric (FTF) kernel can be interpreted as a **discrete incidence structure**. The goal is to show how the seven-role kernel naturally forms a minimal combinatorial geometry governing provenance relationships.

This model is descriptive rather than normative. It provides intuition for the structure already present in the protocol.

---

# 1. Incidence Geometry Overview

An incidence geometry describes relationships between entities such as:

* points
* lines
* planes

where the central question is:

```
which objects are incident with which relations
```

In provenance systems, the analogous entities are:

* artifacts
* transformations
* evidence
* naming relations

FTF organizes these into a deterministic structure recoverable through replay and projection.

---

# 2. Provenance Incidence Elements

The FTF system contains three primary structural elements.

| Geometric Role | Protocol Element     |
| -------------- | -------------------- |
| Point          | artifact hash        |
| Line           | transformation event |
| Annotation     | evidence note        |

Example mapping:

```
artifact A
artifact B

xform(A → B)
```

The transform acts like a line connecting two points.

---

# 3. Artifact–Event Incidence

A transformation event establishes incidence relationships between artifacts.

Example:

```
put(A)
xform(A → B)
```

Produces two edges in the lineage graph:

```
A ──consumed_by──► xform
xform ──produces──► B
```

These edges are deterministic outputs of `trace`.

Thus the provenance graph becomes an **incidence structure between artifacts and events**.

---

# 4. Dependency Incidence

Dependencies extend the incidence relation.

Example:

```
xform(A, U → B)
```

Where:

* `A` is locally materialized
* `U` may be referenced but not present locally

Trace exposes this relationship:

```
A status: ok
U status: pending_fetch
```

The system therefore distinguishes between:

* structural dependency
* local materialization state

Both are part of the incidence geometry.

---

# 5. Annotation Incidence

Evidence attaches to either artifacts or events.

Example:

```
attest(about = B)
revoke(target = xform_event)
```

Trace output:

```
trace.note (attest)
trace.note (revoke)
```

Annotations therefore form a second-order incidence relation:

```
note ──about──► artifact
note ──about──► event
```

Importantly, these notes do **not modify existing incidence relations**.

They add interpretation without altering structure.

---

# 6. Naming Incidence

Alias claims create a separate mapping:

```
alias : Name → ArtifactHash
```

This relationship forms a nominal layer above the structural graph.

Example:

```
alias_claim model/latest → B
```

The naming layer allows human references without changing canonical identity.

---

# 7. Observable Incidence via Trace

The `trace` command projects the verified event stream into explicit incidence data.

Trace records:

```
trace.artifact
trace.event
trace.edge
trace.note
```

Edges represent structural incidence.

Example:

```
artifact → event
event → artifact
```

These edges encode causal structure recovered through deterministic replay.

---

# 8. Closure Properties

The kernel roles form a closure system over the incidence structure.

Common closure relations include:

```
put + use → xform
xform + attest → trusted evidence
xform + revoke → corrected evidence
alias_claim + artifact → human reference
trace + replay → observable incidence
```

Each role contributes to completing the structure.

Without all seven roles, the incidence geometry becomes incomplete.

---

# 9. Deterministic Reconstruction

Incidence structures are recovered through replay ordering.

Replay rule:

```
(t, mh_bytes)
```

This rule ensures:

* deterministic event ordering
* consistent graph reconstruction
* cross-language verification stability

Thus the incidence geometry is not stored directly.

It is **reconstructed deterministically from append-only logs**.

---

# 10. Provenance Hypergraph

The resulting structure is not merely a graph.

Transformations may have multiple inputs and outputs:

```
xform(A, B → C, D)
```

This creates hyperedges connecting sets of artifacts.

The provenance structure therefore behaves as a **directed hypergraph**.

Trace decomposes these hyperedges into pairwise edges for inspection.

---

# 11. Incidence and Evidence Layers

The provenance system separates structural and epistemic layers.

Structural relations:

```
put
use
xform
```

Epistemic relations:

```
attest
revoke
```

This separation ensures that evidence does not mutate causal structure.

Instead, it overlays interpretation onto the incidence geometry.

---

# 12. Spaces as Local Incidence Regions

Spaces introduce locality to the provenance structure.

Each space contains:

```
local CAS
local topic logs
local replay surface
local trace views
```

Thus a space forms a **local region of the global provenance geometry**.

Artifacts may move between spaces only through explicit handoff artifacts.

---

# 13. Federation as Incidence Bridging

Cross-space relationships are expressed explicitly.

Example:

```
space alpha
    produces artifact

handoff artifact

space beta
    consumes artifact
```

The handoff artifact acts as a bridge between two incidence regions.

This design prevents implicit global merges.

---

# 14. Why Incidence Geometry Fits

Incidence geometry explains several architectural properties:

### Deterministic replay

Recovering the same incidence structure everywhere.

### Append-only history

Edges are never removed.

### Annotation layering

Evidence overlays structure without mutation.

### Explicit federation

Cross-space incidence must be declared.

These properties follow naturally from the protocol design.

---

# 15. Relation to Closure and Category Models

The FTF architecture admits three complementary interpretations.

### Closure system

Seven roles form a minimal closure basis.

### Category model

Artifacts are objects, transforms are morphisms.

### Incidence geometry

Artifacts and events form a hypergraph of causal relationships.

Each interpretation describes the same underlying structure.

---

# 16. Architectural Consequence

Understanding the kernel as incidence geometry clarifies why the core protocol remains stable.

All higher-level capabilities operate on top of the incidence structure:

```
workflow orchestration
visualization
distributed federation
runtime adapters
```

These layers do not require new protocol primitives.

They operate on the same underlying geometry.

---

# Summary

The Frozen Trace Fabric kernel can be interpreted as a deterministic incidence geometry where:

```
artifacts = points
events = lines
annotations = evidence overlays
trace = observable projection
```

Replay reconstructs this structure deterministically from append-only logs.

This perspective complements the closure and categorical interpretations and helps explain why the seven-role kernel remains both minimal and expressive.
