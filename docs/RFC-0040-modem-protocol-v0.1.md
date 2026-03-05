# RFC-0040: Modem Protocol v0.1 (7→8→64→240)

## Status
- Accepted (implementation target)
- Version: `v=1`

## Scope
- Canonical mapping: `fano_line_id + register_state + hexagram_index -> hexagram_bits[6] -> shell[240]`
- Canonical wire records: `tx_frame`, `rx_frame`, `commit`
- Strict ingest validation with quarantine-on-failure
- Deterministic hash/chaining semantics

## Canonical Pipeline
1. Resolve `fano_line_id`.
2. Resolve `register_state` in `[0..7]`.
3. Resolve `hexagram_index` in `[0..63]`.
4. Derive `hexagram_bits[6]` from index binary representation.
5. Project shell as `6` sectors × `40` nodes each (`240` total).
6. Compute `leaf_hash = H(shell)`.
7. Compute `self_hash = H(canonical_record_without_self_hash_and_sig)`.
8. Chain record using `prev_hash` (`null` only for genesis).

## Record Contract (Normative)

### Shared core (required on all)
- `type`: `"tx_frame" | "rx_frame" | "commit"`
- `v`: `1`
- `t`: unix epoch milliseconds (`number`)
- `basisHash`: `string`
- `prev_hash`: `string | null`
- `self_hash`: `string`

### Optional on all
- `sig`: `string`
- `sig_scheme`: `string`
- `signer`: `string`

If `sig` is present, `sig_scheme` and `signer` MUST also be present.

### `tx_frame` (required fields)
- `fano_line_id`: `string`
- `register_state`: integer in `[0..7]`
- `hexagram_index`: integer in `[0..63]`
- `hexagram_bits`: `[0|1, 0|1, 0|1, 0|1, 0|1, 0|1]`
- `shell`: `number[240]` where each value is `0|1`
- `leaf_hash`: `string`
- `source`: `string`

### `rx_frame` (required fields)
- Same required fields as `tx_frame`
- `confidence`: number in `[0..1]`

### `commit` (required fields)
- `event_ref`: `string` (references tx/rx event)
- `lc`: non-negative integer
- `centroid`: object with:
  - `stop_metric: number`
  - `closure_ratio: number`
  - `sabbath: boolean`
  - `reason: string`
  - `pass: number`
- `faces`: array of objects with:
  - `face_id: string`
  - `vertices: number[]`
  - `status: "pass" | "fail"`
  - `invariant_name: string`

## Canonicalization and Hashing
- Canonical hash payload excludes:
  - `self_hash`
  - `sig`
  - keys with `undefined` values
- Object keys are serialized in stable lexicographic order.
- `leaf_hash` is the hash of full shell projection.
- `self_hash` is hash of canonical payload.

Reference implementation:
- `web/src/engine/semanticMerkle.ts`

## Validation and Quarantine
- Ingest MUST run strict validation before runtime processing.
- Invalid records MUST be quarantined and MUST NOT mutate accepted stream state.
- Quarantine entry shape:
  - `reason_code`
  - `reason_detail`
  - `raw_line`
  - `received_at`
  - `source`

Reference implementation:
- Validator: `web/src/engine/validateRecord.ts`
- Quarantine buffer: `web/src/engine/quarantine.ts`

## Reason Codes (minimum set)
- `missing_required_field`
- `unknown_record_type`
- `type_mismatch`
- `unsupported_version`
- `invalid_type`
- `out_of_range`
- `invalid_hexagram_bits`
- `hexagram_bits_mismatch`
- `invalid_shell_projection`
- `leaf_hash_mismatch`
- `self_hash_mismatch`
- `signature_fields_incomplete`
- `invalid_record_shape`

## Conformance Requirements
- A conforming runtime MUST:
  1. Accept valid `tx_frame`, `rx_frame`, `commit`.
  2. Reject invalid records with deterministic reason codes.
  3. Preserve deterministic hash behavior for golden vectors.
  4. Preserve chain integrity (`prev_hash -> self_hash`) across emitted records.

## Test Vectors and Harness
- Golden vectors and validator/chain tests are located in:
  - `web/src/engine/__tests__/semanticMerkle.test.ts`
  - `web/src/engine/__tests__/validateRecord.test.ts`
  - `web/src/engine/__tests__/conformanceChain.test.ts`

## Companion (Non-Normative)
- `docs/SEMANTIC_MERKLE_TREE.md`
