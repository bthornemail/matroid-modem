**Semantic Basis Protocol & Simplex Portal**  
**Master Specification v1.0**  
**Unified Formal Reference**  
**Incorporating RFC-0001 through RFC-0037**  
**Author: Brian**  
**Los Angeles, California**  
**February 24, 2026**

---

### Abstract

The **Semantic Basis Protocol** provides a deterministic geometric foundation for meaning. Twelve golden words form an icosahedron whose dual dodecahedron enumerates all valid Subject-Predicate-Object triples. Every semantic operation is resolved in the four-dimensional coordinate space (x, y, z, w).

The **Simplex Portal** is the sovereign runtime that executes these operations via **SynsetRPC** — the core mechanism for **sharing processes instead of data**. Calls are resolved against synset closures, executed deterministically by the Closure Execution Virtual Machine (CEVM), and produce proof-carrying replies with measurable drift.

Physical embodiment uses 16×16 LED arrays as **whiteboards** (local simplex coordination surfaces) tiled into a **blackboard** (the emergent Unknown-Unknown quadrant and federation visualization space). All behavior is replay-deterministic, proof-carrying, and governed by constitutional invariants.

This master specification unifies all 37 RFCs into a single coherent model ready for implementation.

---

### 1. Core Foundations (RFC-0001, RFC-0009, RFC-0016)

**Basis**  
A cryptographically identified semantic coordinate system defined by `(WordNet_hash, corpus_merkle_root)`. Identity is `basisHash = sha256(WordNet_hash + corpus_merkle_root)`.

**Golden Twelve & Faces**  
- Agency (subject / Intent / KK): Freedom · Autonomy · Sovereignty · Reciprocity  
- Ethics (predicate / Event / KU): Grace · Love · Understanding · Empathy  
- Logic/Control (object / Incidence / UK): Stop · No · Yes · Maybe  

**Semantic Coordinate**  
`(x, y, z, w) ∈ [0,1]^4`  
- x = Agency closure magnitude  
- y = Ethics closure magnitude  
- z = Logic closure magnitude  
- w = WordNet depth at lowest-common-hypernym (sharding key, SAB column)

**Fano-Plane Invariants**  
Seven lines (L1–L7) over 7 points. A line passes if coherent or SPO-complete.

**Entrainment**  
720-tick spin cycle at 0.5°/tick. Every transition emits a commit.

---

### 2. Process-Sharing Core: SynsetRPC (the model you requested)

**Definition**  
SynsetRPC replaces data mobility with executable semantic intent. A call requests execution of the closure nearest to a target coordinate.

**Call (NDJSON)**

```json
{
  "type": "synset_call",
  "basisRef": "...",
  "call_id": "...",
  "target_coord": { "x":0.82, "y":0.14, "z":0.91, "w":0.125 },
  "intent_delta": { ... },
  "caller_entrainment": { "tick":142, ... }
}
```

**Resolution** (RFC-0002, RFC-0011)  
1. Nearest golden-vertex closure by Euclidean distance.  
2. Execute via CEVM (declarative rule graph).  
3. Return `synset_reply` with `result_coord`, `drift` (RFC-0008), `faces_passed`, and `closure_proof` (RFC-0015).

**Reply**

```json
{
  "type": "synset_reply",
  "result_coord": {...},
  "drift": 0.084321,
  "faces_passed": 3,
  "closure_proof": { ... }
}
```

**CEVM** (RFC-0011)  
Constrained, deterministic, sandboxed rule evaluator. No arbitrary code. Pure functional. Replayable offline.

---

### 3. Physical Layer: Whiteboards & Blackboard (RFC-0004, RFC-0006, RFC-0013)

**Whiteboard** = 16×16 LED panel  
- Column 2 = your 2nd-row ring (w=0.125)  
- Rows 12–15 = UU meta layer  
- Lights show quadrant of resolved closure or active SynsetRPC.

**Blackboard** = tiled panels (4×4 minimum = 64×64)  
- Visualizes process clusters, federation sync pulses, and emergent UU meaning.

**Carrier Encoding** (RFC-0013)  
Hue = quadrant, brightness = amplitude, phase = Fano line, 720-tick baud cycle.

ESP32 devices are semantic-blind (RFC-0004). They emit probes only; Portal is semantic authority.

---

### 4. Determinism, Coherence & Proofs (RFC-0005, RFC-0007, RFC-0008, RFC-0015)

**Matroid Filter**  
Selects maximal coherent independent set under basis agreement, drift threshold, face quorum, and no contradictions.

**Drift Metric** (RFC-0008)  
`D_total = 0.5·D_coord + 0.3·D_synset + 0.2·D_intent`

**Proof-Carrying Events**  
Every critical operation includes a verifiable `closure_proof` that can be recomputed offline.

**Replay Equivalence**  
Identical inputs → identical independent set, SAB matrix, canvas, and worldHash.

---

### 5. Governance, Identity & Evolution (RFC-0023, RFC-0026, RFC-0029, RFC-0036)

**Constitution**  
Immutable invariants + amendment rules. Changes require fork (RFC-0022).

**Policy Layer**  
Declarative constraints evaluated during matroid admission.

**Identity**  
Stable `identityHash = hash(public_key + canonical_type_profile)`. Human, agent, or collective.

**Evolution**  
Controlled adaptation bounded by invariants. Disagreement → fork.

**Ontological Death** (RFC-0035)  
World ends when no valid independent extension exists. Ledger frozen, replayable forever.

---

### 6. Federation & Multi-World (RFC-0010, RFC-0018, RFC-0022, RFC-0031)

Proof-carrying, drift-gated exchange. No global authority. Convergence is structural (identical independent-set hashes).

Treaties define typed exchange boundaries without collapsing sovereignty.

---

### 7. Bundling & Resurrection (RFC-0019, RFC-0032)

`.simplex` bundles contain canon, registry, ledger, SAB state, and assets for fully offline replay and resurrection.

---

### 8. Complete System Invariants (unified)

1. Newline = atomic commit boundary  
2. basisHash mismatch = quarantine  
3. self_hash excludes self_hash and sig  
4. All resolution and replay MUST be bit-for-bit identical offline  
5. SAB projection deterministic from independent set  
6. Federation events proof-carrying or invalid  
7. Devices semantic-blind; Portal is semantic authority  