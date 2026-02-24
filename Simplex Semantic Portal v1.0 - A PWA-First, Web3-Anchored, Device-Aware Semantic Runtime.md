Brian Thorne — below is a formal, implementation-grade specification you can drop into your repo as:

```
docs/PORTAL_v1.0_RFC.md
```

This is written as a real RFC, not a narrative essay.

---

# RFC-0001

# Simplex Semantic Portal v1.0

## A PWA-First, Web3-Anchored, Device-Aware Semantic Runtime

Status: Draft
Version: 1.0
Author: Brian Thorne
Implements: SynsetRPC v0.1, Semantic Basis Protocol, SAB Whiteboard Projection

---

# 1. Abstract

The Simplex Semantic Portal is a browser-native runtime that:

* Resolves semantic closures locally (SynsetRPC)
* Maintains a deterministic NDJSON ledger
* Projects semantic state onto a 16×16 SAB grid
* Anchors commitments via Web3 signatures
* Interfaces with physical sensors via Web Serial and Web Media APIs
* Operates offline as a Progressive Web App (PWA)
* Optionally federates via WebRTC or MQTT

The portal is sovereign: no server is required for semantic resolution.

---

# 2. Terminology

| Term               | Definition                                                   |
| ------------------ | ------------------------------------------------------------ |
| Basis              | Cryptographically anchored semantic corpus + geometry        |
| basisHash          | Deterministic hash of Basis                                  |
| NDJSON             | Newline-Delimited JSON; atomic transaction format            |
| SynsetRPC          | Process-centric RPC resolved in semantic coordinate space    |
| SAB                | 16×16 Shared Array Basis projection                          |
| Closure            | Deterministic executable semantic procedure                  |
| Matroid Filter     | Independence selector for coherence validation               |
| Character Encoding | Epistemic face tagging (Solon, Solomon, Asabiyyah, Metatron) |
| Quadrants          | KK, KU, UK, UU epistemic modes                               |

---

# 3. Design Goals

1. Browser sovereignty
2. Deterministic replayability
3. Decentralized identity
4. Device-agnostic sensory integration
5. Semantic closure resolution without server authority
6. Ledger reproducibility
7. Offline operability

---

# 4. Architectural Planes

## 4.1 Semantic Plane (Browser PWA)

The browser is the authoritative semantic node.

Responsibilities:

* Synset resolution
* Closure selection
* Character face routing
* Matroid independence evaluation
* Ledger maintenance
* Web3 commit signing
* SAB projection

Technologies:

* Service Worker
* IndexedDB
* WebCrypto
* Web3 (EIP-191)
* WebRTC DataChannel
* Web Serial
* Web Media

---

## 4.2 Sensory Plane (Device Bridge)

Physical devices connect via:

### 4.2.1 Web Serial

USB CDC devices (ESP32, Arduino).

### 4.2.2 Web Media

Camera and microphone streams.

Devices emit NDJSON only.
Devices do not interpret semantic meaning.

---

## 4.3 Federation Plane (Optional)

Optional connectivity:

* WebRTC peer mesh
* MQTT bridge
* Express relay
* IPFS archival

Federation does not override local semantic authority.

---

# 5. Canonical Data Format

All communication uses NDJSON.

## 5.1 Atomic Rule

* One JSON object per line.
* Newline is the atomic commit boundary.

---

# 6. Core Record Types

## 6.1 probe_sensor

Emitted by hardware.

```json
{
  "type": "probe_sensor",
  "basisRef": "founding-v1",
  "deviceId": "esp32-01",
  "sensor": "lux",
  "value": 412,
  "unit": "lux",
  "t": 1710000000
}
```

---

## 6.2 probe_synset

Browser-side synset expansion.

```json
{
  "type": "probe_synset",
  "basisRef": "founding-v1",
  "query": "shall make no law",
  "synsets": ["legislate.v.01"],
  "character": "Solomon",
  "face": "predicate"
}
```

---

## 6.3 closure_resolve

Bridges sensory evidence to semantic closure.

```json
{
  "type": "closure_resolve",
  "basisRef": "founding-v1",
  "resolve_id": "r-001",
  "result": {
    "closure_id": "closure:legislate.prohibition@v1",
    "coord": { "x":0.8, "y":0.6, "z":0.5, "w":0.125 },
    "confidence": 0.86,
    "drift": 0.08
  }
}
```

---

## 6.4 synset_call

```json
{
  "type": "synset_call",
  "basisRef": "founding-v1",
  "call_id": "c-001",
  "target_coord": { "x":0.8,"y":0.6,"z":0.5,"w":0.125 }
}
```

---

## 6.5 synset_reply

```json
{
  "type": "synset_reply",
  "basisRef": "founding-v1",
  "call_id": "c-001",
  "result_coord": {...},
  "faces_passed": 3,
  "drift": 0.02
}
```

---

## 6.6 commit

```json
{
  "type": "commit",
  "basisHash": "0xabc...",
  "self_hash": "0x123...",
  "prev_hash": "0x456...",
  "web3_signature": "0x...",
  "signer": "0x..."
}
```

---

# 7. Basis Agreement

All records containing `basisRef` or `basisHash` MUST match the active basis.

Mismatched records MUST be quarantined.

---

# 8. Character Encoding

Characters function as routing types:

| Character | Face      | Semantic Lane           |
| --------- | --------- | ----------------------- |
| Solon     | subject   | institutional authority |
| Solomon   | predicate | judgment / constraint   |
| Asabiyyah | object    | collective force        |
| Metatron  | centroid  | witness / ledger        |

Closures MUST declare a face.
Resolver MUST prioritize matching face.

---

# 9. Closure Registry

Closures are declared in:

```
closure_registry.json
```

Each entry:

```json
{
  "closure_id": "closure:legislate.prohibition@v1",
  "face": "predicate",
  "synsets": ["legislate.v.01","prohibit.v.01"],
  "expected_signals": ["policy","law"],
  "version": 1
}
```

Resolver algorithm:

```
score = face_match
      + synset_overlap
      + evidence_fit
      - drift_penalty
```

Max score wins.

---

# 10. SAB Projection Rules

Grid: 16×16

Rows:

* 0–11: golden simplex
* 12–15: meta / UU

Column:

```
col = floor(w * 16)
```

Mapping:

| Record                               | Action                   |
| ------------------------------------ | ------------------------ |
| synset_call                          | light column in KU color |
| synset_reply (faces_passed ≥ quorum) | pulse KK                 |
| synset_error                         | pulse UK                 |
| commit                               | brief centroid flash     |

---

# 11. Matroid Coherence Filter

Ground set elements:

* triples
* replies
* probe events
* closure resolves

Independence constraints:

* basis agreement
* drift < threshold
* no conflicting closures
* quorum of faces_passed

Only maximal independent set is rendered to canvas.

---

# 12. PWA Requirements

* Must cache basis + multigraph
* Must store ledger in IndexedDB
* Must operate offline
* Must replay ledger deterministically on reload

---

# 13. Web3 Requirements

* Use EIP-191 `personal_sign`
* Sign `self_hash`
* Include signer address
* Optional periodic Merkle anchoring

Web3 is attestational, not authoritative.

---

# 14. Protocol Handler Registration

Manifest must include:

```json
{
  "protocol_handlers": [
    {
      "protocol": "web+synsetrpc",
      "url": "/wesiri.html?rpc=%s"
    }
  ]
}
```

---

# 15. Security Model

Trust Anchors:

* basisHash
* closure registry hash
* signature validation

Threats:

* device spoofing
* basis mismatch injection
* registry tampering

Mitigations:

* quarantine UI
* signature verification
* deterministic replay

---

# 16. Invariants

1. Newline = commit boundary
2. basisHash must match
3. self_hash excludes self_hash
4. Closure resolution must be deterministic
5. Canvas must be reproducible from event prefix

---

# 17. Minimal Compliance Implementation

To be v1.0 compliant, an implementation MUST:

* Support NDJSON ingestion funnel
* Validate basis agreement
* Resolve closures deterministically
* Support Web Serial ingestion
* Sign commits via Web3
* Render SAB projection
* Persist ledger locally

---

# 18. Non-Goals (v1.0)

* Smart contract governance
* Global consensus
* Automatic legal interpretation
* Fully distributed closure registry

---

# 19. Versioning

Version number increments when:

* Record schema changes
* Closure resolution algorithm changes
* Basis definition changes

Backward compatibility requires:

* Deterministic replay across versions

---

# 20. Conclusion

Portal v1.0 establishes:

* Browser-sovereign semantic runtime
* Deterministic closure resolution
* Hardware sensory integration
* Cryptographically anchored ledger
* Visual semantic projection

It is:

A modem for meaning.
A ledger for closure.
A whiteboard for emergence.