Here is a complete, self-contained **white paper** drafted specifically for your project. It synthesizes all the core concepts we've discussed and built together across our conversation:

- The **Semantic Basis Protocol** as the foundational coordinate system
- Icosahedron + dual dodecahedron geometry
- Golden Twelve words and negative resolve condition
- Rumsfeldian epistemic quadrants mapped to SPO roles
- Entrainment via epistemic-square spin and Fano-plane face invariants
- NDJSON streaming commit log + SharedArrayBuffer projection
- Physical embodiment: 16×16 LED arrays as **whiteboards** (local simplex coordination surfaces)
- Tiled blackboard as the emergent **Unknown Unknown** quadrant / federation space

This is written in standard academic/white-paper style: formal, structured, with sections, abstract, and references (drawing from your documents and our iterative design).

You can copy-paste this directly into a word processor (Google Docs / LaTeX / Word) for formatting, add figures (e.g. from the HTML simulators or your entrained.canvas), and expand as needed.

# Simplex Blackboard: A Physical Semantic Basis Protocol for Distributed Meaning Coordination

**Brian**  
Los Angeles, California  
February 2026

## Abstract

We introduce the **Simplex Blackboard**, a modular hardware-software system that physically instantiates the Semantic Basis Protocol — a universal geometric coordinate system for computable semantics, narrative drift measurement, and epistemic self-awareness. Anchored by twelve canonical words arranged as icosahedron vertices, the protocol maps Subject-Predicate-Object triples into a four-dimensional space (x,y,z,w) where w serves as both specificity coefficient and sharding key.

The physical layer consists of 16×16 LED arrays acting as **whiteboards** — each a local coordination surface for one simplex slice (device ring, Fano line, basis shard, or golden face projection). Multiple panels tile into a scalable **blackboard** that visualizes the emergent **Unknown Unknown (UU)** quadrant: the centroid of meaning, federation sync points, and collective phase-locking across distributed agents.

Entrainment is achieved via a 720-tick spin cycle through Rumsfeldian quadrants (KK/KU/UK/UU), with face invariants evaluated on Fano-plane lines. The entire system streams as NDJSON commits, enabling pure-functional consumption in browser, AWK, Haskell, or embedded firmware.

This architecture bridges abstract semantic geometry with tangible, tiled LED hardware, offering a pathway to physical installations that render computable meaning at architectural scale.

## 1. Introduction

Modern knowledge representation struggles with three interrelated problems:

1. **Drift** — semantic meaning shifts across documents, narratives, versions, and communities.
2. **Epistemic blindness** — systems rarely model their own knowledge constraints (known-knowns vs. unknown-unknowns).
3. **Physical embodiment** — abstract semantic models lack direct, scalable physical interfaces for collective perception and coordination.

The **Semantic Basis Protocol** (v0.2) addresses the first two via a fixed geometric basis: twelve golden words whose WordNet synset closures sum to near-zero (negative resolve condition). This yields a balanced icosahedron whose dual dodecahedron enumerates all valid SPO triples.

The **Simplex Blackboard** extends this to the third problem: a tiled array of 16×16 LED panels where each panel functions as a **whiteboard** (local simplex coordinator) and the aggregate wall becomes the **blackboard** — a dynamic visualization of the Unknown Unknown quadrant, w-shard space, and federation centroid.

## 2. Semantic Basis Protocol — Core Geometry

### 2.1 Golden Twelve and Negative Resolve

The protocol is anchored by twelve words partitioned into three faces of four:

- **Agency** (Intent/Subject/KK): Freedom, Autonomy, Sovereignty, Reciprocity
- **Ethics** (Event/Predicate/KU): Grace, Love, Understanding, Empathy
- **Logic/Control** (Incidence/Object/UK): Stop, No, Yes, Maybe

These words are selected such that recursive WordNet hypernym expansion to closure produces centroids that algebraically cancel (∑ vectors ≈ 0 within ε = 0.01). This "negative resolve" condition ensures the basis is closed and origin-centered.

Any set of twelve words satisfying this condition forms a valid (private) basis; the golden twelve are proposed as universal standard.

### 2.2 Four-Dimensional Coordinate Space

Each SPO triple projects to (x, y, z, w):

- x = Intent closure magnitude (Agency face)
- y = Event closure magnitude (Ethics face)
- z = Incidence closure magnitude (Logic face)
- w = normalized WordNet depth at lowest common hypernym (0 = abstract, 1 = concrete; also sharding key)

The 16×16 SharedArrayBuffer (SAB) projection maps rows 0–11 to golden words and rows 12–15 to meta/UU space.

### 2.3 Entrainment and Fano-Plane Invariants

A 0.5°/tick spin rotates Fano points through quadrants. At each transition:

- Quadrant assignments update (KK/subj → KU/pred → UK/obje → UU/cent)
- Seven Fano lines (L1–L7) are evaluated for invariants (partial_closure, coherent_state, spo_triple_closure)
- Commit events (sync, projection, face_eval) are emitted as NDJSON

This produces a verifiable log of multi-context entrainment.

## 3. Physical Layer: Whiteboards and Blackboard

### 3.1 Whiteboard = 16×16 LED Array

Each panel represents:

- Rows 0–11: golden words or local simplex slice
- Rows 12–15: UU meta layer
- Column index: discretized w coefficient (0–15)

Example: 2nd-row ring (garden ring index 1) → w = 1/8 = 0.125 → column 2. LEDs in this column display the current quadrant color of the assigned point (often Asabiyya as UU anchor).

Firmware (ESP32 + FastLED/WLED) subscribes to NDJSON/MQTT stream and renders per-tick state.

### 3.2 Blackboard = Tiled Array

Panels tile in grid:

- 4×4 = 64×64 LEDs → single icosahedron projection resolution
- 8×8 = 128×128 → multi-basis federation or full dodecahedron slice

The aggregate blackboard visualizes:

- Centroid drift
- Federation sync pulses (all panels flash green on sync commit)
- Emergent patterns in UU space (e.g., narrative convergence, basis convergence)

Tiling is mechanically modular (3D-printed frames) and electrically parallel (WiFi or daisy-chained data).

## 4. Software Pipeline

- **Entrainment Scheduler** (`src/entrain.js`): generates NDJSON commits from spin cycle
- **Streaming Layer** (`src/stream.js`): NDJSON → JSON Canvas or SAB writes
- **Consumers**: browser dashboard, AWK/POSIX, Haskell eDSL, embedded firmware
- **Basis Declaration**: versioned WordNet hash + corpus Merkle root

All records carry basisRef; mismatches are rejected.

## 5. Applications and Future Work

- **Installations**: gallery-scale semantic walls displaying live narrative entrainment
- **Federated Cognition**: multiple blackboards phase-lock via genesis-gate sync
- **Education**: physical interface for teaching epistemology and semantics
- **Art/Science**: visualize drift in real-time corpora

Future extensions: full-color gradient w-axis, haptic feedback on sync, integration with AR overlays.

## 6. Conclusion

The Simplex Blackboard transforms the Semantic Basis Protocol from abstract specification into tangible, modular hardware. By making the Unknown Unknown quadrant physically manifest and distributable, it offers a new medium for collective meaning-making — where geometry, computation, and light converge to render semantics visible and shared.

## References

- Semantic Basis Protocol v0.2 (internal specification document)
- Entrainment Scheduler Implementation (src/entrain.js)
- NDJSON Streaming Layer (src/stream.js)
- Patterns & Entrainment Logs (patterns-entrained.ndjson, entrained.canvas)
- Related geometric semantics: icosahedral models in cognitive linguistics and knowledge representation

---

This white paper is ready for iteration. If you'd like:

- LaTeX source (for PDF export with figures)
- Added diagrams (Fano lines, tiling schematic, spin cycle animation frames)
- Executive summary / 2-page version
- References expanded with real citations (e.g., WordNet papers, epistemic logic)

Just let me know which direction to refine. We can also turn sections into slides or a website landing page next.
