import type { WesiriEngine } from '../../engine/useWesiriEngine';
import { ESP_NODES } from './constants';

type PortalLeftPanelProps = {
  engine: WesiriEngine;
};

export default function PortalLeftPanel({ engine }: PortalLeftPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">Document Graph · Federated SVGs</div>
      <div className="panel-body">
        <div style={{ marginBottom: 10 }}>
          <div className="ctrl-row">
            <span className="ctrl-label">spin speed</span>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={engine.controls.spinSpeed}
              onChange={(event) => engine.setSpinSpeed(Number(event.target.value))}
            />
            <span style={{ fontSize: 8, color: 'var(--gold)', width: 28 }}>{`${engine.controls.spinSpeed.toFixed(1)}°`}</span>
          </div>
          <div className="ctrl-row">
            <span className="ctrl-label">auto-rotate</span>
            <button className={`btn ${engine.controls.autoRotate ? 'active' : ''}`} onClick={engine.toggleRotate}>
              {engine.controls.autoRotate ? 'ON' : 'OFF'}
            </button>
            <button className="btn" onClick={engine.seekSabbath}>
              SEEK Ω
            </button>
          </div>
          <div className="ctrl-row">
            <span className="ctrl-label">pattern</span>
            <button className="btn" onClick={() => engine.runPattern('tetrahedral_sweep')}>
              SWEEP
            </button>
            <button className="btn" onClick={() => engine.runPattern('fano_line_cycle')}>
              LINES
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 8, fontSize: 7, color: 'var(--dim)', letterSpacing: 1 }}>SVG DOCUMENT NODES</div>
        <div id="doc-graph">
          {engine.docs.map((doc) => (
            <div key={doc.id} className={`doc-node ${engine.activeDoc === doc.id ? 'active' : ''}`} onClick={() => engine.selectDoc(doc.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: doc.color, fontSize: 9 }}>{doc.name}</span>
                <span className="doc-node-type">{doc.type}</span>
              </div>
              <div className="doc-node-hash">{`${doc.hash} · ${doc.id}`}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, marginBottom: 6, fontSize: 7, color: 'var(--dim)', letterSpacing: 1 }}>ESP32 LATTICE</div>
        <div id="esp-list">
          {ESP_NODES.map((node) => (
            <div key={node.id} className="esp-node">
              <span className="esp-dot" style={{ background: node.color }} />
              <span className="esp-id">{node.id}</span>
              <span className="esp-state" style={{ color: node.color }}>
                {node.state}
              </span>
              <span className="esp-metric" style={{ color: node.color }}>
                {node.metric.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, marginBottom: 6, fontSize: 7, color: 'var(--dim)', letterSpacing: 1 }}>NDJSON WIRE STREAM (V0.1)</div>
        <div id="stream-log">
          {engine.records.map((record, index) => {
            if (record.type === 'commit') {
              return (
                <div key={`${record.self_hash}-${index}`} className={`stream-line ${record.type}`}>
                  {`lc:${record.lc} commit ${record.self_hash.slice(0, 14)}… Φ:${record.centroid.stop_metric.toFixed(2)}`}
                </div>
              );
            }
            return (
              <div key={`${record.self_hash}-${index}`} className={`stream-line ${record.type}`}>
                {`r:${record.register_state} h:${record.hexagram_index} ${record.type} ${record.self_hash.slice(0, 14)}…`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
