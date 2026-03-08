# Projection Surfaces

## From Provenance Geometry to Physical Interfaces

Status: explanatory architecture note
Normative protocol behavior remains defined in `PROTOCOL.md`.

This document describes how the provenance geometry of the FTF kernel can be rendered onto **interactive projection surfaces** such as LED arrays, visualization canvases, or spatial runtime environments.

The goal is to show how deterministic provenance structures can become **navigable physical or visual systems** without altering protocol semantics.

---

# 1. From Provenance Graph to Projection Surface

The FTF kernel reconstructs provenance as a deterministic incidence structure through replay and trace.

Trace outputs elements such as:

```id="xj5hy1"
trace.artifact
trace.event
trace.edge
trace.note
```

These elements collectively form a **causal hypergraph**.

Projection surfaces convert this abstract structure into a **spatial representation**.

Conceptually:

```id="7r6rtp"
signed events
    ↓
deterministic replay
    ↓
trace lineage graph
    ↓
projection surface
```

---

# 2. Projection Surfaces

A projection surface is any structure that maps provenance elements to spatial coordinates.

Examples include:

| Surface  | Example                 |
| -------- | ----------------------- |
| visual   | graph viewer or SVG     |
| spatial  | 3-D scene or simulation |
| physical | LED array               |
| runtime  | entity-component world  |

Projection surfaces are adapters that **interpret trace output**.

They do not change the provenance structure itself.

---

# 3. Artifact and Event Mapping

A projection surface typically maps:

| Provenance element | Surface element            |
| ------------------ | -------------------------- |
| artifact           | node                       |
| transform event    | connector                  |
| dependency edge    | directional link           |
| annotation         | overlay or state indicator |

Example mapping:

```id="pqkl2u"
artifact node
   ↓
transform edge
   ↓
artifact node
```

This creates a spatialized causal graph.

---

# 4. Deterministic Layout

Because replay ordering is deterministic, projection layouts can also be deterministic.

Common layout strategies include:

* topological ordering
* layered dependency graphs
* chronological radial layouts
* symmetric manifolds

Deterministic layouts allow different observers to reconstruct the **same visual structure**.

---

# 5. Projection Manifolds

Projection surfaces can also use structured coordinate spaces.

Examples:

```
grid surfaces
circular rings
spherical projections
polyhedral manifolds
```

These manifolds provide stable coordinates for navigating large provenance graphs.

The choice of manifold does not affect protocol semantics.

It only affects visualization and navigation.

---

# 6. LED Surface Example

A physical LED surface can represent nodes of a provenance graph.

Example mapping:

| Element         | LED meaning             |
| --------------- | ----------------------- |
| active artifact | illuminated node        |
| dependency      | transition between LEDs |
| transform event | pulse pattern           |
| annotation      | color change            |

A deterministic mapping ensures that identical trace inputs produce identical LED states.

---

# 7. Centroid Navigation

Large projection surfaces benefit from a **local navigation mechanism**.

A centroid cursor provides:

* current focus node
* local traversal direction
* interaction anchor

Example navigation loop:

```id="d0zjz7"
current artifact
     ↓
select adjacent event
     ↓
move to resulting artifact
```

The centroid acts as a **local coordinate origin** for exploring the provenance graph.

---

# 8. Local Charts and Navigation

When provenance graphs become large, projection surfaces behave like coordinate charts.

Local charts show a neighborhood of the graph around a focus node.

Navigation then proceeds through adjacent structures.

Conceptually:

```id="r1xv5c"
local chart
   ↓
neighbor traversal
   ↓
next chart
```

This mirrors geometric chart navigation.

---

# 9. Multi-Observer Consistency

Because replay and trace are deterministic, multiple observers can reconstruct identical projection surfaces.

This enables:

* collaborative visualization
* synchronized physical displays
* distributed runtime environments

Observers simply replay the same signed events.

---

# 10. Runtime Projection

Projection surfaces are not limited to visualization.

A runtime engine can interpret provenance graphs as world state.

Example mapping:

| Trace element | Runtime element    |
| ------------- | ------------------ |
| artifact      | entity             |
| transform     | system execution   |
| dependency    | component relation |
| annotation    | runtime metadata   |

This creates a **provenance-driven runtime world**.

---

# 11. Spaces as Projection Domains

Each space acts as a local provenance domain.

Projection surfaces can render:

* a single space
* multiple spaces
* federated handoff boundaries

This preserves locality while allowing cross-space exploration.

---

# 12. Handoff Visualization

Cross-space handoff artifacts become explicit bridges.

Example projection:

```id="xguxpr"
space alpha graph
      ↓
handoff node
      ↓
space beta graph
```

This allows visualizing federation boundaries directly.

---

# 13. Physical Interfaces

Physical interfaces provide intuitive exploration of provenance structures.

Possible implementations include:

* LED rings
* radial displays
* polyhedral surfaces
* multi-layer panels

These devices present provenance relationships as **navigable geometry**.

---

# 14. Deterministic Interaction

Interaction with projection surfaces must preserve deterministic reconstruction.

Typical interactions include:

```
select artifact
expand dependencies
inspect evidence
follow alias
jump to event
```

All navigation derives from the same trace output.

---

# 15. Geometry and Provenance

Projection surfaces reveal an underlying geometric structure in provenance graphs.

Important characteristics include:

* directed causal flow
* hyperedge transformations
* annotation overlays
* deterministic reconstruction

These properties allow provenance to behave like a **navigable geometry**.

---

# 16. Architectural Consequence

Because projection surfaces operate entirely on trace output, they require no protocol changes.

This separation preserves kernel stability.

System layers remain:

```
protocol kernel
deterministic replay
trace projection
visual / spatial adapters
```

Projection surfaces are therefore **pure adapters over provenance geometry**.

---

# Summary

FTF provenance structures can be rendered as navigable projection surfaces by mapping:

```
artifacts → spatial nodes
transforms → directional connectors
annotations → overlays
trace → projection engine
```

Because replay and trace are deterministic, projection surfaces remain consistent across observers and devices.

This enables provenance systems to become **interactive geometric environments** without altering protocol semantics.
