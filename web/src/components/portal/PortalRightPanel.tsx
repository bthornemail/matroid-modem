import type { WesiriEngine } from '../../engine/useWesiriEngine';

type PortalRightPanelProps = {
  engine: WesiriEngine;
};

export default function PortalRightPanel({ engine }: PortalRightPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">Epistemic State · Rumsfeldian</div>
      <div className="panel-body">
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: 160, marginBottom: 8 }}>
          <rect width="100" height="100" x="100" y="100" fill="rgba(0,255,68,0.08)" />
          <rect width="100" height="100" x="0" y="100" fill="rgba(255,238,0,0.08)" />
          <rect width="100" height="100" x="100" y="0" fill="rgba(255,136,0,0.08)" />
          <rect width="100" height="100" x="0" y="0" fill="rgba(68,85,255,0.08)" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="var(--dim)" strokeWidth="1" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="var(--dim)" strokeWidth="1" />
          <text x="150" y="195" textAnchor="middle" fill="var(--kk)" style={{ fontSize: 7 }}>
            KK
          </text>
          <text x="50" y="195" textAnchor="middle" fill="var(--ku)" style={{ fontSize: 7 }}>
            KU
          </text>
          <text x="150" y="12" textAnchor="middle" fill="var(--uk)" style={{ fontSize: 7 }}>
            UK
          </text>
          <text x="50" y="12" textAnchor="middle" fill="var(--uu)" style={{ fontSize: 7 }}>
            UU
          </text>
        </svg>

        <div style={{ marginBottom: 6, fontSize: 7, color: 'var(--dim)', letterSpacing: 1 }}>SPO CONTEXT</div>
        <div id="spo-table">
          {engine.spoRows.map((row) => (
            <div key={row.id} className="spo-row">
              <span className="spo-name" style={{ color: row.color }}>
                {row.name}
              </span>
              <span className={`spo-quad ${row.q}`}>{row.q}</span>
              <span className="spo-role">{row.role}</span>
              <span className="spo-repl">{`${row.repl}·${row.io}`}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, marginBottom: 6, fontSize: 7, color: 'var(--dim)', letterSpacing: 1 }}>CENTROID · STOP METRIC</div>
        <div className="centroid-bar-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span className="centroid-val">{engine.centroidPanel.stopMetric.toFixed(4)}</span>
            <span style={{ fontSize: 9, color: engine.centroidPanel.sabbath ? '#00ff44' : 'var(--dim)' }}>
              {engine.centroidPanel.sabbath ? 'SABBATH ✦' : `Φ ${(engine.centroidPanel.stopMetric * 7).toFixed(0)}/7`}
            </span>
          </div>
          <div className="centroid-bar-bg">
            <div className="centroid-bar-fill" style={{ width: `${engine.centroidPanel.stopMetric * 100}%` }} />
          </div>
        </div>

        <div style={{ marginTop: 10, marginBottom: 6, fontSize: 7, color: 'var(--dim)', letterSpacing: 1 }}>FACE INVARIANTS · L1–L7</div>
        <div id="face-table">
          {engine.faceRows.map((face) => (
            <div key={face.face_id} className="face-row">
              <span className="face-id">{face.face_id}</span>
              <span className="face-pts">{`{${face.vertices.join(',')}}`}</span>
              <span className={`face-status ${face.status}`}>{face.status.toUpperCase()}</span>
              <span className="face-inv">{face.invariant_name}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, marginBottom: 6, fontSize: 7, color: 'var(--dim)', letterSpacing: 1 }}>BASIS · HASH</div>
        <div>{engine.basisHash}</div>
      </div>
    </div>
  );
}
