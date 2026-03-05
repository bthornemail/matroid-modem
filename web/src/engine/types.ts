export type RecordTypeV1 = 'tx_frame' | 'rx_frame' | 'commit';

export type ValidationError = {
  reason_code: string;
  reason_detail: string;
  path?: string;
};

export type BaseRecordV1 = {
  type: RecordTypeV1;
  v: 1;
  t: number;
  basisHash: string;
  prev_hash: string | null;
  self_hash: string;
  sig?: string;
  sig_scheme?: string;
  signer?: string;
};

export type TxFrameV1 = BaseRecordV1 & {
  type: 'tx_frame';
  fano_line_id: string;
  register_state: number;
  hexagram_index: number;
  hexagram_bits: [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1];
  shell: number[];
  leaf_hash: string;
  source: string;
};

export type RxFrameV1 = BaseRecordV1 & {
  type: 'rx_frame';
  fano_line_id: string;
  register_state: number;
  hexagram_index: number;
  hexagram_bits: [0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1, 0 | 1];
  shell: number[];
  leaf_hash: string;
  source: string;
  confidence: number;
};

export type CommitCentroidV1 = {
  stop_metric: number;
  closure_ratio: number;
  sabbath: boolean;
  reason: string;
  pass: number;
};

export type CommitFaceV1 = {
  face_id: string;
  vertices: number[];
  status: 'pass' | 'fail';
  invariant_name: string;
};

export type CommitV1 = BaseRecordV1 & {
  type: 'commit';
  event_ref: string;
  lc: number;
  tick: number;
  angle: string;
  centroid: CommitCentroidV1;
  faces: CommitFaceV1[];
};

export type WireRecordV1 = TxFrameV1 | RxFrameV1 | CommitV1;

export type QuarantineRecord = {
  reason_code: string;
  reason_detail: string;
  raw_line: string;
  received_at: number;
  source: string;
  parsed?: unknown;
};
