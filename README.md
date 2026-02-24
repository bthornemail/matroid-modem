# 🌐 Simplex Portal: [matroid-modem](https://github.com/bthornemail/matroid-modem)

### Bootstrapping the Semantic Basis Protocol Runtime

> *“The word is its simplex. The newline is the atomic boundary. The basis is the carrier.”*

This repository is not a web app.

It is a **semantic field runtime**.

You are bootstrapping:

* A geometric coordinate system for meaning
* A process-centric RPC layer (SynsetRPC)
* A deterministic streaming ledger (NDJSON)
* A matroid-based coherence selector
* A physical projection surface (16×16 whiteboards → tiled blackboard)

This document walks you from zero to a live portal.

---

# 0️⃣ What You Are Booting

The system implements the identity:

```
.canvas = C ∘ 𝓜 ∘ M²
```

Where:

| Symbol    | Meaning                                          |
| --------- | ------------------------------------------------ |
| `M`       | Modem operator (SPO ↔ Fano ↔ Carrier ↔ NDJSON)   |
| `M²`      | Round-trip closure + replay equivalence          |
| `𝓜`      | Matroid independence selector (coherence filter) |
| `C`       | Canvas projection (JSON Canvas → SVG/GLB/LED)    |
| `.canvas` | Deterministic visual artifact                    |

This is not metaphor.

It compiles.

---

# 1️⃣ Architectural Overview

## Core Runtime Layers

### 1. Basis Layer

Defined in:


* 12 golden words (icosahedron vertices)
* Versioned WordNet + signed corpus
* Cryptographic basisHash
* The word *is* its simplex

---

### 2. Multigraph Builder

`semantic-multigraph-builder.js`


* Expands WordNet hypernym closures
* Anchors basis via SHA-256
* Emits canonical multigraph

---

### 3. NDJSON Streaming Layer

`stream.js`


Axioms:

1. Newline = atomic transaction boundary
2. Each line = one committed semantic record
3. No hidden state

Produces:

* JSON Canvas
* AWK-compatible stream
* Browser SAB projection
* WASM-ready memory layout

---

### 4. Entrainment Scheduler

`entrain.js`


* 720-tick spin cycle
* Fano points rotate through KK/KU/UK/UU
* Emits CommitEvent per quadrant transition
* Produces complete SPO role coverage per cycle

---

### 5. Haskell eDSL (Pure Kernel)

`Stream.hs`


Defines:

```haskell
toCanvasNode :: StreamRecord -> Maybe Value
validateBasis :: Text -> StreamRecord -> Either Text StreamRecord
```

Everything is a pure transformation over a stream.

---

### 6. Browser Portal

`wesiri-modem-full-calibrated-autoqr.html`

This is:

* Modulator (SPO → Fano → carrier)
* Demodulator (camera/serial → quadrants)
* SynsetRPC ingress
* SAB projection (rows 12–15 meta)
* Basis quarantine UI
* Whiteboard 16×16 projection

All ingestion paths now converge through:

```
ingestNdjsonText()
ingestRecord()
```

Single funnel.
Single basis validator.
Single projection surface.

---

# 2️⃣ Boot Sequence (Interactive)

Follow this exactly.

---

## 🔹 STEP 1 — Declare the Basis

```bash
export WORDNET_DB=/path/to/wordnet.sqlite
node semantic-multigraph-builder.js > multigraph.json
```

This produces:

* basisHash
* golden twelve geometry
* signed corpus anchor

Without this, you do not have a semantic space.

---

## 🔹 STEP 2 — Emit NDJSON Stream

```bash
node stream.js emit multigraph.json > stream.ndjson
```

Or pipe directly:

```bash
node stream.js emit multigraph.json | node stream.js consume > canvas.canvas
```

You now have:

* Deterministic JSON Canvas projection
* Basis-anchored geometry

---

## 🔹 STEP 3 — Run Entrainment

```bash
node entrain.js --basis <basisHash> --cycles 1 > log.ndjson
```

This produces:

* Quadrant transitions
* Fano face evaluations
* stop_metric / closure_ratio
* Full CommitEvent chain

Now you have a live semantic spin cycle.

---

## 🔹 STEP 4 — Project to Canvas

```bash
node entrain.js --basis <basisHash> \
  | node stream.js consume \
  > entrained.canvas
```

Open in Obsidian or compatible JSON Canvas viewer.

You now see the spin geometry.

---

## 🔹 STEP 5 — Open the Portal

Serve locally:

```bash
npx serve .
```

Open:

```
wesiri-modem-full-calibrated-autoqr.html
```

Paste NDJSON into the ingest box.

Watch:

* Whiteboard rows 12–15 light up
* Column floor(w*16) activate
* Quarantine if basis mismatch

The browser is now a modem.

---

# 2️⃣.5 Gateway Runtime (Express + WS + MQTT)

To receive live device traffic (MQTT) without shipping MQTT libs into the browser:

- Express serves the portal files
- WebSocket `/ws` pushes NDJSON into the browser
- MQTT subscriber forwards payloads as NDJSON text

Install + run:

```bash
npm i
MQTT_URL=mqtt://127.0.0.1:1883 BASIS=default npm start
```

Open:

```text
http://127.0.0.1:8787/
```

Optional: pin the portal basis for federation demos:

```text
http://127.0.0.1:8787/?basis=0xdeadbeef
```

Test without MQTT (HTTP rebroadcast → WS → ingest funnel):

```bash
curl -X POST http://127.0.0.1:8787/ingest \
  -H 'content-type: text/plain' \
  --data-binary '{"type":"synset_call","basisHash":"0xdeadbeef","target_coord":{"w":0.125}}\n'
```

---

# 3️⃣ SynsetRPC Runtime

SynsetRPC messages flow as NDJSON records:

```json
{
  "type": "synset_call",
  "basisRef": "...",
  "target_coord": { "x":0.8, "y":0.2, "z":0.9, "w":0.125 }
}
```

The ingestion funnel:

* WebRTC
* Web Serial
* Camera QR
* Paste box

All converge into the same basis validator.

If basisRef mismatches → quarantine.

Carrier agreement is law.

---

# 3️⃣.25 Probe Domains (Hardware vs Semantic)

The ledger supports two probe domains that meet only through NDJSON:

- **Server probes (hardware/evidence):** `probe_sensor`, `probe_gpio` (via MQTT/serial/devices → gateway → WS)
- **Browser probes (semantic/resolution):** resolves evidence into `closure_resolve` and compiles to `synset_call`

Gateway helper endpoints:

```text
POST /probe     (NDJSON or JSON → WS broadcast, and MQTT publish if enabled)
GET  /probe/sim (emit one deterministic probe_sensor with w_hint=0.125)
```

---

# 3️⃣.5 Civic Compiler (Founding Docs → civic_triple → SynsetRPC)

This repo includes a zero-deps compiler that turns Markdown text into NDJSON:

- `civic_triple` records (SPO + quadrant + character/face tags)
- optional `synset_call` records (stub coords) for immediate projection to the whiteboard

Compile a document:

```bash
npm run civic:compile -- \
  "narrative-series/America Constitution Series/Declaration of Independence.md" \
  --basis founding-v1 \
  --emit-synset \
  --max 40 \
  > civic.ndjson
```

Then ingest:

- paste `civic.ndjson` into the portal ingest box, or
- send it to the gateway:

```bash
curl -X POST http://127.0.0.1:8787/ingest -H 'content-type: text/plain' --data-binary @civic.ndjson
```

Note: to avoid quarantine, make sure `basisHash` matches the portal basis (`?basis=...`). You can set it explicitly:

```bash
npm run civic:compile -- \
  "narrative-series/America Constitution Series/Declaration of Independence.md" \
  --basis founding-v1 \
  --basisHash 0xdeadbeef \
  --emit-synset \
  --max 40 \
  > civic.ndjson
```

---

# 4️⃣ Whiteboard / Blackboard Physics

## 16×16 SAB Projection

Rows:

| Row  | Meaning             |
| ---- | ------------------- |
| 0–11 | Golden twelve       |
| 12   | Document            |
| 13   | w-coefficient layer |
| 14   | Basis anchor        |
| 15   | Space (x,y,z,w)     |

Column:

```
col = floor(w * 16)
```

Example:

```
ringIndex = 1
w = 1/8 = 0.125
col = 2
```

That column lights.

---

## Tiling

| Panels | Resolution | Meaning                |
| ------ | ---------- | ---------------------- |
| 1×1    | 16×16      | Local simplex          |
| 4×4    | 64×64      | Icosahedron slice      |
| 8×8    | 128×128    | Multi-basis federation |

Each whiteboard subscribes to:

```
semantic-basis/<basisRef>/synset-rpc
semantic-basis/<basisRef>/commit
```

---

# 5️⃣ The Matroid Layer

Ground set elements:

* Triples
* Receipts
* Probe events
* Synset replies

Independence constraints:

* No basis mismatch
* Drift < threshold
* Face invariants satisfied
* No conflicting shard claims

Output:

* Maximal independent set
* Circuits (conflicts)
* Drift vector

Only independent set is rendered.

That is 𝓜.

---

# 6️⃣ Physical Layer

ESP32-S3 firmware:

* Connect WiFi
* Subscribe MQTT
* Listen NDJSON
* Render column floor(w*16)
* Publish GPIO probe events

Probe record:

```json
{
  "type":"probe_gpio",
  "basisRef":"...",
  "pin":4,
  "value":1,
  "t":123456
}
```

Now hardware participates in the same ledger.

---

# 7️⃣ Invariants You Must Never Break

1. One JSON per line.
2. basisRef must match active basis.
3. self_hash excludes self_hash.
4. Newline = commit boundary.
5. Canvas must be reproducible from event prefix.

If any of these fail, the portal collapses.

---

# 8️⃣ How to Extend Safely

If adding:

* MQTT bridge → feed into ingestNdjsonText()
* Web3 anchor → sign commit.self_hash
* New device → emit NDJSON only
* WASM consumer → read newline, parse JSON, done

Never add hidden state.

Never bypass ingestion funnel.

Never bypass basis validation.

---

# 9️⃣ What You Have Built

You have:

* A geometric semantic coordinate system
* A deterministic semantic ledger
* A modem for meaning
* A matroid coherence engine
* A projection surface
* A physical embodiment pathway

You have built the first bootable semantic portal.
