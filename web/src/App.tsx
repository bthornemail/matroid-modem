import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useWesiriEngine } from './engine/useWesiriEngine';
import legacyMarkup from './legacy/wesiri-markup.html?raw';
import './legacy/wesiri.css';

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);

  const [controlsNode, setControlsNode] = useState<HTMLElement | null>(null);
  const [docGraphNode, setDocGraphNode] = useState<HTMLElement | null>(null);
  const [basisNode, setBasisNode] = useState<HTMLElement | null>(null);
  const [windowNode, setWindowNode] = useState<HTMLElement | null>(null);
  const [hdrLcNode, setHdrLcNode] = useState<HTMLElement | null>(null);
  const [hdrTickNode, setHdrTickNode] = useState<HTMLElement | null>(null);
  const [hdrAngleNode, setHdrAngleNode] = useState<HTMLElement | null>(null);
  const [hdrMetricNode, setHdrMetricNode] = useState<HTMLElement | null>(null);
  const [hdrSabbathNode, setHdrSabbathNode] = useState<HTMLElement | null>(null);
  const [spoNode, setSpoNode] = useState<HTMLElement | null>(null);
  const [faceNode, setFaceNode] = useState<HTMLElement | null>(null);
  const [centMetricNode, setCentMetricNode] = useState<HTMLElement | null>(null);
  const [centBarNode, setCentBarNode] = useState<HTMLElement | null>(null);
  const [centSabbathNode, setCentSabbathNode] = useState<HTMLElement | null>(null);
  const [streamNode, setStreamNode] = useState<HTMLElement | null>(null);
  const [schemaNode, setSchemaNode] = useState<HTMLElement | null>(null);
  const [narrativeNode, setNarrativeNode] = useState<HTMLElement | null>(null);

  const engine = useWesiriEngine();

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    mountNode.innerHTML = legacyMarkup;

    setControlsNode(mountNode.querySelector('#controls-panel') as HTMLElement | null);
    setDocGraphNode(mountNode.querySelector('#doc-graph') as HTMLElement | null);
    setBasisNode(mountNode.querySelector('#basis-hash-text') as HTMLElement | null);
    setWindowNode(mountNode.querySelector('#window-grid') as HTMLElement | null);
    setHdrLcNode(mountNode.querySelector('#hdr-lc') as HTMLElement | null);
    setHdrTickNode(mountNode.querySelector('#hdr-tick') as HTMLElement | null);
    setHdrAngleNode(mountNode.querySelector('#hdr-angle') as HTMLElement | null);
    setHdrMetricNode(mountNode.querySelector('#hdr-metric') as HTMLElement | null);
    setHdrSabbathNode(mountNode.querySelector('#hdr-sabbath') as HTMLElement | null);
    setSpoNode(mountNode.querySelector('#spo-table') as HTMLElement | null);
    setFaceNode(mountNode.querySelector('#face-table') as HTMLElement | null);
    setCentMetricNode(mountNode.querySelector('#cent-metric') as HTMLElement | null);
    setCentBarNode(mountNode.querySelector('#cent-bar') as HTMLElement | null);
    setCentSabbathNode(mountNode.querySelector('#cent-sabbath') as HTMLElement | null);
    setStreamNode(mountNode.querySelector('#stream-log') as HTMLElement | null);
    setSchemaNode(mountNode.querySelector('#schema-panel') as HTMLElement | null);
    setNarrativeNode(mountNode.querySelector('#narrative-panel') as HTMLElement | null);

    return () => {
      mountNode.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    if (!centBarNode) return;
    centBarNode.style.width = `${engine.centroidPanel.stopMetric * 100}%`;
  }, [centBarNode, engine.centroidPanel.stopMetric]);

  return (
    <main className="app">
      <div ref={mountRef} className="legacy-mount" />

      {controlsNode &&
        createPortal(
          <>
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
              <span style={{ fontSize: '8px', color: 'var(--gold)', width: '28px' }}>{`${engine.controls.spinSpeed.toFixed(1)}°`}</span>
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
          </>,
          controlsNode,
        )}

      {docGraphNode &&
        createPortal(
          <>
            {engine.docs.map((doc) => (
              <div key={doc.id} className={`doc-node ${engine.activeDoc === doc.id ? 'active' : ''}`} onClick={() => engine.selectDoc(doc.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: doc.color, fontSize: '9px' }}>{doc.name}</span>
                  <span className="doc-node-type">{doc.type}</span>
                </div>
                <div className="doc-node-hash">{`${doc.hash} · ${doc.id}`}</div>
              </div>
            ))}
          </>,
          docGraphNode,
        )}

      {basisNode && createPortal(<>{engine.basisHash}</>, basisNode)}
      {windowNode &&
        createPortal(
          <>
            {engine.windowColors.map((background, index) => (
              <div
                key={index}
                className="win-cell"
                title={`SAB[${index}] row=${Math.floor(index / 16)} col=${index % 16}`}
                style={{ background }}
              />
            ))}
          </>,
          windowNode,
        )}

      {hdrLcNode && createPortal(<>{`lc:${engine.headerStatus.lc}`}</>, hdrLcNode)}
      {hdrTickNode && createPortal(<>{`tick:${engine.headerStatus.tick}`}</>, hdrTickNode)}
      {hdrAngleNode && createPortal(<>{`${engine.headerStatus.angle.toFixed(1)}°`}</>, hdrAngleNode)}
      {hdrMetricNode && createPortal(<>{`Φ:${engine.headerStatus.stopMetric.toFixed(2)}`}</>, hdrMetricNode)}
      {hdrSabbathNode &&
        createPortal(
          <span style={{ color: engine.headerStatus.sabbath ? '#00ff44' : 'var(--dim)' }}>
            {engine.headerStatus.sabbath ? 'SABBATH:✦' : 'SABBATH:—'}
          </span>,
          hdrSabbathNode,
        )}

      {spoNode &&
        createPortal(
          <>
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
          </>,
          spoNode,
        )}

      {faceNode &&
        createPortal(
          <>
            {engine.faceRows.map((face) => (
              <div key={face.face_id} className="face-row">
                <span className="face-id">{face.face_id}</span>
                <span className="face-pts">{`{${face.vertices.join(',')}}`}</span>
                <span className={`face-status ${face.status}`}>{face.status.toUpperCase()}</span>
                <span className="face-inv">{face.invariant_name}</span>
              </div>
            ))}
          </>,
          faceNode,
        )}

      {centMetricNode && createPortal(<>{engine.centroidPanel.stopMetric.toFixed(4)}</>, centMetricNode)}
      {centSabbathNode &&
        createPortal(
          <span style={{ color: engine.centroidPanel.sabbath ? '#00ff44' : 'var(--dim)' }}>
            {engine.centroidPanel.sabbath
              ? 'SABBATH ✦'
              : `Φ ${(engine.centroidPanel.stopMetric * 7).toFixed(0)}/7`}
          </span>,
          centSabbathNode,
        )}

      {streamNode &&
        createPortal(
          <>
            {engine.records.map((record, index) => (
              <div key={`${record.lc ?? 'x'}-${index}`} className={`stream-line ${record.type ?? ''}`}>
                {`lc:${record.lc ?? '—'} ${record.type ?? 'record'} ${record.self_hash?.slice(0, 14) ?? ''}… Φ:${record.centroid?.stop_metric?.toFixed(2) ?? '—'}`}
              </div>
            ))}
          </>,
          streamNode,
        )}

      {schemaNode &&
        createPortal(
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '7px', lineHeight: 1.7 }}>{engine.schemaText}</pre>,
          schemaNode,
        )}

      {narrativeNode &&
        createPortal(
          <>
            {engine.narratives.map((text, index) => (
              <div key={`${index}-${text.slice(0, 16)}`} style={{ padding: '2px 0', borderBottom: '1px solid var(--dimmer)' }}>
                {text}
              </div>
            ))}
          </>,
          narrativeNode,
        )}
    </main>
  );
}
