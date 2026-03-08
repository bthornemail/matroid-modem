# Sevenfold Closure Basis for Provenance

Status: explanatory model
Normative protocol behavior remains defined in `PROTOCOL.md`.

This note explains why the FTF kernel stabilizes around **seven roles** and how those roles form a minimal closure basis for deterministic provenance systems.

The goal is not to redefine protocol semantics but to describe the structural reason the kernel remains small and complete.

---

# 1. The Seven Roles

The FTF kernel exposes six protocol body kinds and one projection command:

```
put
use
xform
attest
revoke
alias_claim
trace
```

These roles partition into four semantic domains:

| Domain        | Role          | Meaning                          |
| ------------- | ------------- | -------------------------------- |
| Material      | `put`         | introduce artifact               |
| Material      | `use`         | declare dependency               |
| Material      | `xform`       | produce artifact from inputs     |
| Epistemic     | `attest`      | positive evidence                |
| Epistemic     | `revoke`      | negative evidence                |
| Nominal       | `alias_claim` | name resolution                  |
| Observational | `trace`       | deterministic lineage projection |

The kernel is intentionally frozen around this set.

The design objective is to preserve **deterministic replay and auditability** while keeping the core algebra minimal.

---

# 2. Closure Requirement

A provenance system must answer four fundamental questions:

### 1. Existence

How are artifacts introduced?

```
put
```

---

### 2. Causality

How do artifacts depend on or produce other artifacts?

```
use
xform
```

---

### 3. Judgment

What evidence exists about artifacts or events?

```
attest
revoke
```

---

### 4. Reference and Observation

How do humans refer to artifacts and inspect lineage?

```
alias_claim
trace
```

Together these cover the minimal semantic space required for auditable provenance.

---

# 3. Why Seven Is Minimal

Reducing the role count collapses essential semantics.

## Removing `trace`

Without `trace`, signed events exist but **observable lineage does not**.

```
events -> replay -> ? -> inspection
```

Trace closes this loop:

```
events -> replay -> trace -> inspectable causality
```

---

## Merging `attest` and `revoke`

Positive and negative evidence must remain distinct.

Conflating them produces ambiguous epistemic state.

Provenance systems require polarity.

---

## Removing `alias_claim`

Artifact identity must remain separate from human naming.

```
canonical identity = artifact hash
alias = human reference layer
```

Collapsing these layers introduces instability in identity resolution.

---

## Removing `use`

Dependency intent becomes inseparable from transformation.

This removes the ability to record consumption relationships independent of production.

---

Therefore any six-role system must sacrifice one of:

* observation
* evidence polarity
* name indirection
* dependency declaration

Seven is the first stable closure.

---

# 4. Triple Incidence

The seven roles interact primarily through triples.

Common operational triples include:

```
put + use -> xform
xform + attest -> trusted evidence
xform + revoke -> corrected evidence
alias_claim + artifact -> human reference
trace + verified stream -> observable lineage
```

These triples illustrate how meaning emerges through minimal combinations of roles.

This triple-incidence structure is why the system naturally resembles a **Fano-style closure model**.

---

# 5. Category Interpretation

From a categorical viewpoint:

Objects:

```
artifact hashes
```

Morphisms:

```
xform events
```

Composition:

```
provenance paths recovered through replay
```

Additional roles enrich the category:

| Role          | Category Interpretation                    |
| ------------- | ------------------------------------------ |
| `put`         | witness of object presence                 |
| `use`         | dependency boundary                        |
| `attest`      | evidence about morphisms or objects        |
| `revoke`      | negative evidence                          |
| `alias_claim` | name mapping                               |
| `trace`       | projection of recovered morphism structure |

Thus the protocol forms a **free provenance category with annotation fields**.

---

# 6. Bundle Interpretation

The architecture can also be understood through a layered bundle view.

```
identity fibers
      ↓
deterministic replay surface
      ↓
lineage projection
```

Mapping roles onto layers:

| Layer           | Roles                                                 |
| --------------- | ----------------------------------------------------- |
| Identity fibers | authorship of all message bodies                      |
| Replay surface  | ordering of `put/use/xform/attest/revoke/alias_claim` |
| Projection      | `trace`                                               |

Trace acts as the **bundle projection operator**, materializing lineage from the hidden replay structure.

---

# 7. Separation of Concerns

The kernel deliberately separates five conceptual layers:

```
identity
ordering
lineage
annotation
naming
projection
```

Mapping to roles:

| Layer      | Role              |
| ---------- | ----------------- |
| identity   | author signatures |
| ordering   | replay `(t, mh)`  |
| lineage    | `put/use/xform`   |
| annotation | `attest/revoke`   |
| naming     | `alias_claim`     |
| projection | `trace`           |

Maintaining these separations ensures:

* deterministic replay
* implementation independence
* audit stability
* cross-language conformance

---

# 8. Kernel Stability

The kernel remains intentionally small.

Future capability should expand **around the kernel**, not within it.

Typical extension layers include:

```
spaces
federation
transport
identity workflows
runtime adapters
visualization
```

These features compose over the seven-role basis without altering the core algebra.

---

# 9. Provenance Basis Theorem (Informal)

A deterministic append-only provenance system requires at least seven roles to simultaneously preserve:

```
material causality
epistemic polarity
human reference
deterministic observation
```

The FTF kernel achieves this using:

```
put
use
xform
attest
revoke
alias_claim
trace
```

This constitutes the **Sevenfold Closure Basis for Provenance**.

---

# 10. Architectural Consequence

Because the kernel already spans the minimal semantic space, most future system design work should occur in:

```
workflow layers
distribution layers
navigation layers
visualization layers
```

rather than expanding protocol primitives.

This keeps the core protocol small, deterministic, and auditable.

---

# Summary

The FTF kernel stabilizes around seven roles because seven is the smallest number that simultaneously supports:

```
artifact introduction
dependency declaration
transformation
evidence polarity
name indirection
deterministic lineage observation
```

The result is a **minimal closed algebra for provenance systems**.
