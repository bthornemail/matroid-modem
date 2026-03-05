import { toHexagramBits, verifyCanonicalHash, verifyLeafHash } from './semanticMerkle';
import type { CommitV1, RxFrameV1, TxFrameV1, ValidationError } from './types';

type ValidationResult = { ok: boolean; errors: ValidationError[] };

const SHARED_REQUIRED = ['type', 'v', 't', 'basisHash', 'prev_hash', 'self_hash'] as const;
const FRAME_REQUIRED = ['fano_line_id', 'register_state', 'hexagram_index', 'hexagram_bits', 'shell', 'leaf_hash', 'source'] as const;
const COMMIT_REQUIRED = ['event_ref', 'centroid', 'faces', 'lc'] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isBit(bit: unknown): bit is 0 | 1 {
  return bit === 0 || bit === 1;
}

function isBitArray(value: unknown): value is [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1] {
  return Array.isArray(value) && value.length === 6 && value.every((bit) => isBit(bit));
}

function addMissingRequired(errors: ValidationError[], record: Record<string, unknown>, fields: readonly string[]) {
  for (const field of fields) {
    if (!(field in record)) {
      errors.push({
        reason_code: 'missing_required_field',
        reason_detail: `Missing required field: ${field}`,
        path: field,
      });
    }
  }
}

function validateCommonShape(record: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  addMissingRequired(errors, record, SHARED_REQUIRED);
  if (errors.length > 0) return errors;

  if (record.v !== 1) {
    errors.push({ reason_code: 'unsupported_version', reason_detail: 'Only protocol version v=1 is supported', path: 'v' });
  }
  if (typeof record.t !== 'number') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 't must be number', path: 't' });
  }
  if (typeof record.basisHash !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'basisHash must be string', path: 'basisHash' });
  }
  if (record.prev_hash !== null && typeof record.prev_hash !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'prev_hash must be string|null', path: 'prev_hash' });
  }
  if (typeof record.self_hash !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'self_hash must be string', path: 'self_hash' });
  }

  if ('sig' in record && typeof record.sig !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'sig must be string when present', path: 'sig' });
  }
  if ('sig_scheme' in record && typeof record.sig_scheme !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'sig_scheme must be string when present', path: 'sig_scheme' });
  }
  if ('signer' in record && typeof record.signer !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'signer must be string when present', path: 'signer' });
  }
  if ('sig' in record && (!('sig_scheme' in record) || !('signer' in record))) {
    errors.push({
      reason_code: 'signature_fields_incomplete',
      reason_detail: 'sig requires sig_scheme and signer fields',
      path: 'sig',
    });
  }
  if (!('sig' in record) && ('sig_scheme' in record || 'signer' in record)) {
    errors.push({
      reason_code: 'signature_fields_incomplete',
      reason_detail: 'sig_scheme/signer require sig field',
      path: 'sig',
    });
  }
  return errors;
}

function validateFrameFields(record: Record<string, unknown>, type: 'tx_frame' | 'rx_frame'): ValidationError[] {
  const errors = validateCommonShape(record);
  addMissingRequired(errors, record, FRAME_REQUIRED);

  if (record.type !== type) {
    errors.push({ reason_code: 'type_mismatch', reason_detail: `Record type must be ${type}`, path: 'type' });
  }
  if ('fano_line_id' in record && typeof record.fano_line_id !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'fano_line_id must be string', path: 'fano_line_id' });
  }
  if ('register_state' in record) {
    const value = record.register_state;
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 7) {
      errors.push({ reason_code: 'out_of_range', reason_detail: 'register_state must be integer in [0..7]', path: 'register_state' });
    }
  }
  if ('hexagram_index' in record) {
    const value = record.hexagram_index;
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 63) {
      errors.push({ reason_code: 'out_of_range', reason_detail: 'hexagram_index must be integer in [0..63]', path: 'hexagram_index' });
    }
  }
  if ('hexagram_bits' in record && !isBitArray(record.hexagram_bits)) {
    errors.push({ reason_code: 'invalid_hexagram_bits', reason_detail: 'hexagram_bits must be 6 bits', path: 'hexagram_bits' });
  }
  if ('shell' in record) {
    const value = record.shell;
    if (!Array.isArray(value) || value.length !== 240 || !value.every((bit) => isBit(bit))) {
      errors.push({
        reason_code: 'invalid_shell_projection',
        reason_detail: 'shell must be a 240-length 0/1 array',
        path: 'shell',
      });
    }
  }
  if ('leaf_hash' in record && typeof record.leaf_hash !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'leaf_hash must be string', path: 'leaf_hash' });
  }
  if ('source' in record && typeof record.source !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'source must be string', path: 'source' });
  }
  if ('hexagram_index' in record && 'hexagram_bits' in record && isBitArray(record.hexagram_bits) && typeof record.hexagram_index === 'number') {
    const expectedBits = toHexagramBits(record.hexagram_index);
    const matches = expectedBits.every((bit, idx) => bit === record.hexagram_bits[idx]);
    if (!matches) {
      errors.push({
        reason_code: 'hexagram_bits_mismatch',
        reason_detail: 'hexagram_bits must match hexagram_index',
        path: 'hexagram_bits',
      });
    }
  }

  return errors;
}

export function validateTxFrame(record: unknown): ValidationResult {
  if (!isObject(record)) {
    return { ok: false, errors: [{ reason_code: 'invalid_record_shape', reason_detail: 'Record must be object' }] };
  }
  const errors = validateFrameFields(record, 'tx_frame');
  if (errors.length === 0) {
    const frame = record as TxFrameV1;
    if (!verifyLeafHash(frame)) {
      errors.push({ reason_code: 'leaf_hash_mismatch', reason_detail: 'leaf_hash does not match shell hash', path: 'leaf_hash' });
    }
    if (!verifyCanonicalHash(frame)) {
      errors.push({
        reason_code: 'self_hash_mismatch',
        reason_detail: 'self_hash does not match canonical record hash',
        path: 'self_hash',
      });
    }
  }
  return { ok: errors.length === 0, errors };
}

export function validateRxFrame(record: unknown): ValidationResult {
  if (!isObject(record)) {
    return { ok: false, errors: [{ reason_code: 'invalid_record_shape', reason_detail: 'Record must be object' }] };
  }
  const errors = validateFrameFields(record, 'rx_frame');

  if ('confidence' in record) {
    const value = record.confidence;
    if (typeof value !== 'number' || value < 0 || value > 1) {
      errors.push({ reason_code: 'out_of_range', reason_detail: 'confidence must be in [0..1]', path: 'confidence' });
    }
  } else {
    errors.push({ reason_code: 'missing_required_field', reason_detail: 'Missing required field: confidence', path: 'confidence' });
  }

  if (errors.length === 0) {
    const frame = record as RxFrameV1;
    if (!verifyLeafHash(frame)) {
      errors.push({ reason_code: 'leaf_hash_mismatch', reason_detail: 'leaf_hash does not match shell hash', path: 'leaf_hash' });
    }
    if (!verifyCanonicalHash(frame)) {
      errors.push({
        reason_code: 'self_hash_mismatch',
        reason_detail: 'self_hash does not match canonical record hash',
        path: 'self_hash',
      });
    }
  }
  return { ok: errors.length === 0, errors };
}

export function validateCommit(record: unknown): ValidationResult {
  if (!isObject(record)) {
    return { ok: false, errors: [{ reason_code: 'invalid_record_shape', reason_detail: 'Record must be object' }] };
  }
  const errors = validateCommonShape(record);
  addMissingRequired(errors, record, COMMIT_REQUIRED);

  if (record.type !== 'commit') {
    errors.push({ reason_code: 'type_mismatch', reason_detail: 'Record type must be commit', path: 'type' });
  }
  if ('event_ref' in record && typeof record.event_ref !== 'string') {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'event_ref must be string', path: 'event_ref' });
  }
  if ('lc' in record && (typeof record.lc !== 'number' || !Number.isInteger(record.lc) || record.lc < 0)) {
    errors.push({ reason_code: 'invalid_type', reason_detail: 'lc must be non-negative integer', path: 'lc' });
  }
  if ('centroid' in record) {
    if (!isObject(record.centroid)) {
      errors.push({ reason_code: 'invalid_type', reason_detail: 'centroid must be object', path: 'centroid' });
    } else {
      const c = record.centroid;
      if (typeof c.stop_metric !== 'number') {
        errors.push({ reason_code: 'invalid_type', reason_detail: 'centroid.stop_metric must be number', path: 'centroid.stop_metric' });
      }
      if (typeof c.closure_ratio !== 'number') {
        errors.push({ reason_code: 'invalid_type', reason_detail: 'centroid.closure_ratio must be number', path: 'centroid.closure_ratio' });
      }
      if (typeof c.sabbath !== 'boolean') {
        errors.push({ reason_code: 'invalid_type', reason_detail: 'centroid.sabbath must be boolean', path: 'centroid.sabbath' });
      }
      if (typeof c.reason !== 'string') {
        errors.push({ reason_code: 'invalid_type', reason_detail: 'centroid.reason must be string', path: 'centroid.reason' });
      }
      if (typeof c.pass !== 'number') {
        errors.push({ reason_code: 'invalid_type', reason_detail: 'centroid.pass must be number', path: 'centroid.pass' });
      }
    }
  }

  if ('faces' in record) {
    if (!Array.isArray(record.faces)) {
      errors.push({ reason_code: 'invalid_type', reason_detail: 'faces must be array', path: 'faces' });
    } else {
      record.faces.forEach((face, index) => {
        if (!isObject(face)) {
          errors.push({ reason_code: 'invalid_type', reason_detail: 'face must be object', path: `faces[${index}]` });
          return;
        }
        if (typeof face.face_id !== 'string') {
          errors.push({ reason_code: 'invalid_type', reason_detail: 'face_id must be string', path: `faces[${index}].face_id` });
        }
        if (!Array.isArray(face.vertices) || !face.vertices.every((n) => typeof n === 'number')) {
          errors.push({
            reason_code: 'invalid_type',
            reason_detail: 'vertices must be number[]',
            path: `faces[${index}].vertices`,
          });
        }
        if (face.status !== 'pass' && face.status !== 'fail') {
          errors.push({ reason_code: 'invalid_type', reason_detail: 'status must be pass|fail', path: `faces[${index}].status` });
        }
        if (typeof face.invariant_name !== 'string') {
          errors.push({
            reason_code: 'invalid_type',
            reason_detail: 'invariant_name must be string',
            path: `faces[${index}].invariant_name`,
          });
        }
      });
    }
  }

  if (errors.length === 0 && !verifyCanonicalHash(record as CommitV1)) {
    errors.push({ reason_code: 'self_hash_mismatch', reason_detail: 'self_hash does not match canonical record hash', path: 'self_hash' });
  }

  return { ok: errors.length === 0, errors };
}

export function validateRecord(record: unknown): ValidationResult {
  if (!isObject(record) || typeof record.type !== 'string') {
    return {
      ok: false,
      errors: [{ reason_code: 'missing_required_field', reason_detail: 'Record must include type', path: 'type' }],
    };
  }

  if (record.type === 'tx_frame') return validateTxFrame(record);
  if (record.type === 'rx_frame') return validateRxFrame(record);
  if (record.type === 'commit') return validateCommit(record);
  return {
    ok: false,
    errors: [{ reason_code: 'unknown_record_type', reason_detail: `Unsupported record type: ${record.type}`, path: 'type' }],
  };
}
