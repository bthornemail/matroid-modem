Brian Thorne — excellent. I’d very much like to see the **precursors**. Please upload them and I’ll integrate them into the model. Those earlier artifacts usually reveal the **implicit invariants** that later become the protocol laws. 🔎📡

In the meantime, here is the document you asked for.

---

# Centroid Phase Navigation on Symmetric Projection Manifolds

Status: exploratory architecture note
Normative protocol behavior remains defined in `PROTOCOL.md`.

This document describes a navigation model for interacting with provenance geometry through **symmetric projection manifolds** using a **centroid-based phase cursor**.

The model provides a deterministic method for exploring trace-derived provenance structures on physical or visual surfaces.

---

# 1. Motivation

Large provenance graphs can become difficult to inspect directly.

Instead of navigating arbitrary graph layouts, this model treats the graph as a **projection onto a symmetric manifold**.

Navigation is then controlled through a **centroid phase cursor**.

Conceptually:

```
trace geometry
      ↓
projection manifold
      ↓
centroid navigation
```

The centroid provides a stable reference point for exploration.

---

# 2. Projection Manifold

A projection manifold is a symmetric coordinate surface used to display provenance nodes.

Examples:

| Manifold   | Example             |
| ---------- | ------------------- |
| ring       | circular LED array  |
| grid       | rectangular display |
| sphere     | globe projection    |
| polyhedron | multi-face display  |

Symmetry simplifies navigation because local neighborhoods are consistent across the surface.

---

# 3. Node Placement

Artifacts from trace are assigned positions on the manifold.

Mapping may be based on:

* topological depth
* chronological ordering
* artifact hash mapping
* dependency clusters

Example mapping:

```
artifact hash → manifold coordinate
```

This produces a spatial graph representation.

---

# 4. The Centroid

The centroid acts as the navigation origin.

Responsibilities:

* anchor navigation
* define local coordinate frame
* control traversal operations

Conceptually:

```
centroid = local coordinate origin
```

The centroid does not alter the graph structure.

It only determines **where the observer is focused**.

---

# 5. Phase State

Navigation is controlled by a phase state.

Example phase components:

```
current artifact
navigation orientation
selection layer
interaction mode
```

This phase state determines how movements map onto the manifold.

---

# 6. Navigation Moves

Typical navigation operations include:

| Operation | Meaning                   |
| --------- | ------------------------- |
| step      | move to adjacent artifact |
| expand    | reveal dependencies       |
| contract  | hide deeper layers        |
| jump      | follow alias or reference |

These operations correspond to graph traversal.

---

# 7. Phase Rotation

On symmetric manifolds, movement may involve rotation.

Example:

```
centroid orientation → rotation
```

Rotation determines how neighboring nodes are interpreted.

For example:

* clockwise traversal
* counterclockwise traversal
* radial expansion

This allows efficient exploration of large graphs.

---

# 8. Deterministic Traversal

Traversal operations are deterministic because they derive from trace.

Example traversal:

```
artifact A
   ↓
xform event
   ↓
artifact B
```

Every observer performing the same traversal sees the same result.

---

# 9. Layered Visualization

Manifolds may contain multiple layers.

Example layers:

| Layer           | Content     |
| --------------- | ----------- |
| artifact layer  | nodes       |
| transform layer | edges       |
| evidence layer  | annotations |

The centroid phase state determines which layer is visible.

---

# 10. Evidence Overlays

Annotations appear as overlays.

Example overlays:

```
attest → positive marker
revoke → negative marker
pending_fetch → unresolved dependency
```

These overlays help distinguish epistemic states.

---

# 11. Federation Navigation

Cross-space handoffs appear as boundary transitions.

Example:

```
space alpha cluster
      ↓
handoff artifact
      ↓
space beta cluster
```

The centroid can traverse these bridges.

---

# 12. Physical Interfaces

The centroid model maps well to physical devices.

Example hardware:

* LED rings
* rotary controls
* radial displays
* layered panels

The centroid corresponds to the **current physical focus**.

---

# 13. Multi-Observer Interaction

Multiple observers can navigate the same provenance structure independently.

Each observer maintains their own centroid phase state.

Shared structure remains deterministic.

---

# 14. Manifold Symmetry

Symmetric manifolds simplify navigation rules.

Benefits include:

* consistent neighborhood sizes
* predictable traversal paths
* easier physical encoding

Common symmetric manifolds include:

```
ring
hexagonal grid
polyhedral surfaces
```

---

# 15. Navigation Protocol

A centroid navigation step can be described as:

```
(state, input) → (state', artifact')
```

Where:

* `state` = centroid phase state
* `input` = navigation command
* `artifact'` = next artifact focus

This defines a deterministic navigation protocol.

---

# 16. Provenance Navigation Geometry

Combining these components produces a geometric exploration system.

```
trace graph
      ↓
projection manifold
      ↓
centroid phase navigation
```

This allows provenance structures to become **interactive spatial systems**.

---

# Summary

Centroid phase navigation provides a deterministic method for exploring provenance graphs projected onto symmetric manifolds.

Key elements include:

```
projection manifold
centroid navigation
phase state
deterministic traversal
```

This model enables both software and physical interfaces to interact with provenance geometry in a consistent way.

