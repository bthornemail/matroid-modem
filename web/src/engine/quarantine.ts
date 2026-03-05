import type { QuarantineRecord, ValidationError } from './types';

const MAX_QUARANTINE = 500;

const quarantineBuffer: QuarantineRecord[] = [];

function toReason(errors: ValidationError[]): Pick<QuarantineRecord, 'reason_code' | 'reason_detail'> {
  if (errors.length === 0) {
    return { reason_code: 'unknown_validation_error', reason_detail: 'Record rejected with no explicit reason' };
  }
  const [first] = errors;
  if (errors.length === 1) {
    return { reason_code: first.reason_code, reason_detail: first.reason_detail };
  }
  return {
    reason_code: first.reason_code,
    reason_detail: `${first.reason_detail} (+${errors.length - 1} more)`,
  };
}

export function quarantineRecord(
  rawLine: string,
  errors: ValidationError[],
  source: string,
  parsed?: unknown,
  receivedAt = Date.now(),
): QuarantineRecord {
  const reason = toReason(errors);
  const record: QuarantineRecord = {
    ...reason,
    raw_line: rawLine,
    source,
    received_at: receivedAt,
    parsed,
  };
  quarantineBuffer.unshift(record);
  if (quarantineBuffer.length > MAX_QUARANTINE) quarantineBuffer.length = MAX_QUARANTINE;
  return record;
}

export function getQuarantineRecords(): QuarantineRecord[] {
  return quarantineBuffer.slice();
}

export function clearQuarantineRecords(): void {
  quarantineBuffer.length = 0;
}
