**SynsetRPC: Formal Specification**  
**Process-Sharing over Semantic Basis Coordinates**  
**Version 0.1 — Draft**  
**Brian** — Los Angeles, California  
**February 23, 2026**

---

### Abstract

This document provides the complete formalization of **SynsetRPC**, a remote-procedure-call protocol that replaces traditional data-centric sharing with **semantic-process sharing**. Calls are resolved and executed against **synset closures** anchored in the Semantic Basis Protocol’s (x, y, z, w) coordinate space.

The protocol integrates directly with the existing entrainment scheduler, Fano-plane invariants, and physical Simplex Blackboard (16×16 LED whiteboards tiling into a scalable blackboard). The blackboard visualizes emergent process clusters in the Unknown-Unknown (UU) quadrant rather than static data.

This inversion — sharing executable semantic intent instead of serialized state — yields drift-resistant, privacy-preserving, and visually observable distributed computation.

---

### 1. Core Definitions

**Synset Closure**  
A synset closure `C` for a word `w` in basis `B` is the finite tree (or DAG) obtained by recursive hypernym/hyponym expansion from the root synset of `w` up to depth `d ≤ 7`, closed under lowest-common-hypernym (LCH) with other closures in the same basis.  
Formally:  
`C(w, B, d) = (V, E)` where `V` are synset nodes and `E` are hypernym/hyponym edges, with closure condition: ∀ pairs of nodes from different closures, their LCH is recorded.

**Semantic Coordinate**  
A 4-tuple `coord = (x, y, z, w) ∈ [0,1]^4` where:  
- `x` = Intent (Agency) closure magnitude  
- `y` = Event (Ethics) closure magnitude  
- `z` = Incidence (Logic) closure magnitude  
- `w` = normalized WordNet depth at LCH (sharding key, column in 16×16 SAB)

**Golden Vertex**  
One of the 12 fixed words in the icosahedron. Each vertex `v_i` hosts exactly one primary synset closure.

**Fano Line**  
A 3-point subset `L_k ⊂ {1..7}` (Metatron=1, Solomon=2, …, Genesis=7). There are exactly 7 lines (L1–L7) as defined in the protocol.

**Quadrant**  
`Q ∈ {KK, KU, UK, UU}` at any entrainment tick `t`.

**SynsetRPC Call**  
A triple `(coord_target, intent_delta, caller_nonce)` that requests execution of the closure nearest to `coord_target`, with optional local delta context `intent_delta`.

---

### 2. Message Syntax (NDJSON-native)

Every SynsetRPC message is a self-describing NDJSON record extending the existing commit schema:

```json
{
  "type": "synset_call" | "synset_reply" | "synset_error",
  "basisRef": "0x...",
  "call_id": "call-uuid-or-nonce",
  "target_coord": { "x": 0.82, "y": 0.14, "z": 0.91, "w": 0.125 },
  "intent_delta": {                     // optional minimal closure patch
    "added_hypernyms": ["..."],
    "added_hyponyms": ["..."]
  },
  "caller_entrainment": {               // current tick on caller side
    "tick": 142,
    "angle_deg": 71.0,
    "quadrant_state": { "1": "KK", ... }
  },
  "payload": { ... },                   // opaque arguments (synset-referenced only)
  "prev_hash": "...",
  "self_hash": "...",
  "sig": "..."
}
```

**Reply** mirrors the call with added fields:
- `resolved_coord`: actual coordinate executed
- `result_coord`: emergent centroid after execution
- `drift`: Euclidean distance in semantic space
- `faces_passed`: number of Fano invariants preserved (0–7)

---

### 3. Resolution and Execution Semantics

**Resolution Rule** (on receiving node)  
Given incoming `target_coord`:

1. Compute distance to every golden vertex closure in local basis:
   `dist_i = √[(x−x_i)² + (y−y_i)² + (z−z_i)² + (w−w_i)²]`
2. Select minimal `i*` (nearest golden vertex).
3. If `dist_i* > threshold` (default 0.15), reject with `synset_error`.
4. Execute the local closure `C_i*` with `intent_delta` applied (merge as LCH).
5. Return `result_coord` = new centroid after execution.

**Execution is pure** with respect to the current entrainment state: the call is evaluated at the receiver’s current tick/angle/quadrant snapshot.

**Return Semantics**  
The reply always includes a new coordinate in (x,y,z,w) space. This coordinate may be:
- The same as input (idempotent read-like call)
- Shifted along one axis (process mutated local state)
- Projected into UU (w-shard) when the call produces emergent meaning

---

### 4. Entrainment and Invariant Preservation

Every SynsetRPC call is subject to the same Fano-plane evaluation as regular commits:

- Before execution: record current quadrant state of the 7 Fano points.
- After execution: re-evaluate all 7 lines.
- The call is **valid** only if `faces_passed ≥ 3` (or configurable quorum).
- If invariants break, the reply includes `invariant_violation` and the blackboard flashes red on the affected panel.

This guarantees that **shared processes remain coherent** across distributed nodes even under drift.

---

### 5. Blackboard / Whiteboard Integration

**Whiteboard (single 16×16 panel)**  
- Represents one w-shard slice or one local simplex (e.g., column 2 = 2nd-row ring, w=0.125).
- On receiving a SynsetRPC call targeting its shard: the entire column lights up in the quadrant color of the resolved golden vertex.
- On successful reply: a brief “pulse” (green flash) propagates outward from column 2.

**Blackboard (tiled panels)**  
- Each tile renders its local whiteboard state.
- Global patterns emerge:
  - **Process clusters**: contiguous same-color regions = popular synset closures.
  - **Federation sync**: all panels flash white simultaneously on a `sync` commit.
  - **Emergent UU**: when a call returns a coordinate with w > 0.9, the entire blackboard performs a radial wave from the centroid tile.

**Visualization Rule**  
LED at grid position `(row, col)` on tile `(tx, ty)` lights with color of quadrant of the golden vertex nearest to the last executed coordinate whose w-shard matches `col`.

---

### 6. Security and Basis Matching

- Every message carries `basisRef`.
- Mismatch → immediate rejection (different semantic space).
- Optional Web3 signature over `call_id + target_coord + self_hash`.
- Access control is semantic: a node can declare “I expose only Agency-face closures with w ≤ 0.3”.

---

### 7. Complete Example Flow

1. Node A (garden ring) wants to invoke “grant freedom” → computes target_coord near Freedom vertex (x≈0.9).
2. Sends SynsetRPC to Node B (talisman) whose w=0.125 shard matches column 2.
3. Node B resolves to Solomon closure (nearest), executes with caller delta, produces new centroid shifted into Ethics face.
4. Replies with result_coord and drift=0.07.
5. Both blackboards light column 2 in KU (yellow) for 800 ms, then fade.

---

### 8. Protocol Extensions to Existing Stack

- New record types: `synset_call`, `synset_reply`, `synset_error`
- Entrainment scheduler now emits these at every transition where a pending call queue exists.
- `src/stream.js consume` treats them as first-class canvas nodes (with live color updates).
- ESP32 firmware listens on MQTT topic `semantic-basis/synset-rpc` and renders directly to column 2 (or full panel in local-simplex mode).
