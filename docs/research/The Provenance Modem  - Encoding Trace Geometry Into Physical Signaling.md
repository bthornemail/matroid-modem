# The Provenance Modem

## Encoding Trace Geometry Into Physical Signaling

Status: exploratory architecture note
Normative protocol behavior remains defined in `PROTOCOL.md`.

This document describes how the deterministic provenance geometry of the FTF kernel can be encoded into **physical signaling systems** such as LED arrays or other spatial devices.

The goal is to show how provenance structures can be **transmitted, navigated, and synchronized through physical interfaces** without modifying the underlying protocol semantics.

---

# 1. Concept

A **provenance modem** converts trace-derived provenance structures into physical signals.

Conceptual pipeline:

```
signed events
      ↓
deterministic replay
      ↓
trace geometry
      ↓
physical signal encoding
```

The device does not alter the provenance model.

It only encodes and decodes **observable projections of trace**.

---

# 2. Trace as Signal Source

Trace exposes the deterministic structure needed for signaling.

Trace elements:

```
trace.artifact
trace.event
trace.edge
trace.note
```

These elements provide:

* node identity
* causal relationships
* evidence annotations
* ordering information

A modem uses these structures to generate physical signals.

---

# 3. Physical Surface

A physical modem requires a **projection surface**.

Examples:

| Surface            | Example               |
| ------------------ | --------------------- |
| LED grid           | matrix display        |
| LED ring           | circular array        |
| polyhedral display | multi-face LED system |
| radial panel       | layered ring display  |

Each surface provides spatial coordinates for trace elements.

---

# 4. Artifact Encoding

Artifacts correspond to spatial positions.

Example mapping:

| Artifact property | Physical encoding     |
| ----------------- | --------------------- |
| artifact hash     | node index            |
| artifact state    | LED color             |
| artifact role     | brightness or pattern |

Artifacts therefore become **addressable nodes** on the surface.

---

# 5. Transform Encoding

Transform events correspond to transitions between nodes.

Possible encodings:

* light pulse along path
* directional LED sweep
* temporal blink pattern

Example:

```
A → B
```

could be represented by a traveling pulse from node A to node B.

---

# 6. Evidence Encoding

Annotations appear as overlays.

Examples:

| Evidence      | Encoding       |
| ------------- | -------------- |
| attest        | green halo     |
| revoke        | red halo       |
| pending fetch | blinking amber |

These encodings do not alter structural relationships.

They simply visualize epistemic state.

---

# 7. Deterministic Frame Generation

Because replay is deterministic, modem frames can be generated deterministically.

Frame generation process:

```
trace state
     ↓
artifact layout
     ↓
event transitions
     ↓
annotation overlays
```

Each frame represents a consistent projection of the provenance state.

---

# 8. Navigation Cursor (Centroid)

Large surfaces require a focus mechanism.

The **centroid cursor** acts as a navigation anchor.

Responsibilities:

* identify current artifact
* provide local coordinate origin
* control traversal

Example interaction:

```
centroid → artifact
artifact → adjacent event
event → next artifact
```

This allows stepwise exploration of the graph.

---

# 9. Local Phase State

The cursor also maintains local phase state.

Examples of local state variables:

```
current artifact
current transform edge
navigation orientation
display layer
```

This state is independent of the global provenance structure.

It only controls navigation.

---

# 10. Public Projection vs Private Phase

The modem separates two layers:

### Public projection

Visible surface state.

Example:

```
LED positions
node colors
transition pulses
```

### Private phase

Local cursor and navigation state.

Example:

```
current node
cursor orientation
interaction history
```

This separation allows multiple observers to view the same projection while navigating independently.

---

# 11. Deterministic Synchronization

Multiple devices can synchronize by replaying identical event streams.

Procedure:

```
shared signed events
       ↓
deterministic replay
       ↓
trace projection
       ↓
identical physical state
```

This allows distributed displays to remain consistent.

---

# 12. Signal Transport

Physical signaling may also transmit provenance updates.

Example transport methods:

* optical pulses
* LED blink codes
* radio transmission
* wired serial protocols

Encoded messages correspond to new signed events or trace updates.

---

# 13. Incremental Updates

Instead of redrawing the entire surface, the modem can transmit incremental updates.

Example update sequence:

```
new event
     ↓
trace recomputation
     ↓
artifact addition
     ↓
surface update
```

Only affected nodes and edges change.

---

# 14. Error Detection

Because events are signed and hashed, modems can verify integrity.

Verification steps:

```
receive message
verify signature
verify hash
apply replay ordering
update trace
```

Invalid events are rejected.

---

# 15. Federation Display

Cross-space handoffs can also be visualized.

Example representation:

```
space alpha cluster
      ↓
handoff artifact
      ↓
space beta cluster
```

This reveals provenance boundaries across domains.

---

# 16. Human Interaction

The modem interface allows interactive exploration.

Possible controls:

```
move cursor
expand dependencies
inspect evidence
follow alias
jump to transform
```

All interactions operate on trace-derived structure.

---

# 17. Physical Geometry

Projection surfaces can adopt symmetric geometries.

Examples:

```
ring manifolds
grid manifolds
polyhedral surfaces
radial layers
```

Symmetry improves navigation and visual consistency.

---

# 18. Provenance as Navigable Geometry

The modem demonstrates that provenance structures behave like spatial systems.

Key properties:

* deterministic reconstruction
* causal direction
* annotation overlays
* local navigation

These properties make provenance suitable for geometric exploration.

---

# 19. Architectural Consequence

The modem operates entirely as an adapter over trace.

Protocol layers remain unchanged:

```
protocol kernel
deterministic replay
trace projection
physical modem
```

Thus physical interfaces can evolve independently of the core protocol.

---

# Summary

A provenance modem encodes deterministic trace geometry into physical signals by mapping:

```
artifacts → spatial nodes
transforms → transitions
annotations → overlays
cursor → navigation state
```

This allows provenance structures to become **interactive physical systems** while preserving deterministic replay and append-only semantics.
