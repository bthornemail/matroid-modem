# Semantic Basis Protocol

# Formal Index & Glossary v1.0

Status: Canonical Reference
Scope: RFC-0001 → RFC-0037

---

# I. CORE ONTOLOGICAL TERMS

---

### Basis

A finite, deterministic coordinate system used to resolve semantic closures.

Invariant:

```
basisHash = hash(canonical_basis_definition)
```

A world cannot operate without a basis.

---

### Closure

A deterministic executable semantic unit that:

* has a type
* has defined inputs/outputs
* produces replay-stable results

Closures are the atomic unit of process-sharing.

---

### World

A fully defined semantic system:

```
world = (basisHash, constitutionHash, ledger_prefix)
```

A world is replayable.

---

### Constitution

The immutable invariants governing a world:

* drift limits
* independence rules
* amendment procedure
* identity model

---

### Canon

The authoritative, replayable ledger-derived semantic state.

Canon is derived, not narrated.

---

### Narrative

Interpretive layer that compiles deterministically into canonical triples.

Narrative may interpret; canon may not drift.

---

### Resurrection

Deterministic reconstruction of world state from canonical ledger.

---

### Drift

Formal semantic distance between expected and resolved closures.

Defined in RFC-0008.

---

### Independence (Matroid)

A set of semantic elements that:

* contains no contradiction
* respects invariants
* passes face constraints

---

### Circuit

A minimal dependent (contradictory) set.

Used for debugging and governance.

---

### Replay Determinism

Property that:

```
replay(ledger_prefix) → identical worldHash
```

---

# II. SEMANTIC STRUCTURE

---

### SPO Triple

Subject–Predicate–Object primitive relation.

Used as canonical civic unit.

---

### Face

Epistemic projection plane:

| Face     | Meaning                |
| -------- | ---------------------- |
| Agency   | Action / Intention     |
| Ethics   | Judgment / Normativity |
| Logic    | Structural validity    |
| Centroid | Integration / UU       |

---

### Quadrant

Epistemic state classification (KK, KU, UK, UU).

Used in carrier encoding and SAB projection.

---

### SAB (Semantic Array Buffer)

16×16 canonical projection grid:

* Rows 12–15 = UU meta-layer
* Column = discretized w coefficient

---

### w Coefficient

Depth/sharding coordinate:

```
w ∈ [0,1]
column = floor(w * 16)
```

---

### Fano Projection

7-point minimal coherence geometry.

Used for carrier encoding + face validation.

---

# III. GOVERNANCE & CIVIC LAYER

---

### Civic Triple

SPO extracted from constitutional or legal text.

Canonical governance unit.

---

### Amendment

A closure that modifies constitution while preserving invariants.

---

### Epistemic Justice

Bias correction system based on drift and proof density, not demographic identity.

---

### Personhood

A semantic identity class:

* human
* agent
* collective

Defined by deterministic closure stability.

---

### Treaty

Typed exchange boundary between worlds.

Does not collapse sovereignty.

---

# IV. TEMPORAL & META-LAYER

---

### Ontological Death

World state where no valid independent extension exists.

---

### Evolution

Bounded adaptation preserving invariants.

---

### Transcendent Closure

Limit behavior of infinite basis expansion while maintaining replayability.

---

### Multi-World Federation

Set of worlds interacting under treaty constraints.

---

# V. PROTOCOL LAYER

---

### SynsetRPC

Process-sharing protocol resolving closures via semantic coordinates.

---

### Modem

Encode/decode + replay equivalence operator.

---

### Matroid Selector

Independence filter applied to event stream.

---

### Closure Proof Certificate

Formal proof that a closure satisfies invariants.

---

### Canonical Hash

Deterministic content-address of:

* basis
* constitution
* ledger prefix

---

### Resurrection Bundle

Portable world reconstruction package.

---

# VI. FORMAL IDENTITIES

---

### identityHash

Stable identity derived from:

```
hash(public_key + canonical_type_profile)
```

---

### worldHash

Stable world identifier:

```
hash(basisHash + constitutionHash + independent_set_hash)
```

---

### canvasHash

Deterministic visual state projection hash.

---

# VII. ECONOMIC & VALUE LAYER

---

### Value (Non-Token)

Contribution measured as:

* independence strength
* proof density
* drift minimization

Not a currency.

---

### Contribution Certificate

Proof of meaningful canonical extension.

---

# VIII. META-PRINCIPLES

---

### Replay Principle

If it cannot be replayed, it is not canon.

---

### Independence Principle

Truth is defined by structural non-contradiction under invariants.

---

### Sovereignty Principle

Worlds cooperate without forced semantic unification.

---

### Death Principle

A world ends when it cannot extend coherently.

---

### Evolution Principle

Evolution is drift bounded by invariants.

---

### Transcendence Principle

Infinite scaling must preserve replay determinism.

---

# IX. SYMBOL INDEX

| Symbol | Meaning                   |
| ------ | ------------------------- |
| Δ      | Amendment delta           |
| 𝓜     | Matroid selector          |
| M²     | Modem round-trip operator |
| D      | Drift function            |
| W      | World                     |
| T      | Transcendent closure      |

---

# X. INDEX OF RFC REFERENCES

| RFC       | Title                                 |
| --------- | ------------------------------------- |
| 0001–0010 | Core protocol & geometry              |
| 0011–0019 | Closure, proof, type systems          |
| 0020–0028 | Governance & federation               |
| 0029–0031 | Identity, justice, diplomacy          |
| 0032–0037 | Temporal, cosmological, transcendence |

---

# XI. Canonical Definition Rule

All glossary terms must satisfy:

1. Deterministic definition
2. No circular dependency
3. Compatible with replay
4. Compatible with independence selection
