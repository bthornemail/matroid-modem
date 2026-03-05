import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import legacyMarkup from './legacy/wesiri-markup.html?raw';
import legacyRuntime from './legacy/wesiri-runtime.js?raw';
import './legacy/wesiri.css';

type CommitRecord = {
  id?: string;
  t?: number;
  lc?: number;
  type?: string;
  self_hash?: string;
  prev_hash?: string;
  centroid?: { stop_metric?: number };
};

type SpoRow = {
  id: number;
  name: string;
  color: string;
  q: string;
  role: string;
  repl: string;
  io: string;
};

type FaceRow = {
  face_id: string;
  vertices: number[];
  status: string;
  invariant_name: string;
};

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
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
  const [records, setRecords] = useState<CommitRecord[]>([]);
  const [schemaText, setSchemaText] = useState<string>('');
  const [narratives, setNarratives] = useState<string[]>([]);
  const [basisHash, setBasisHash] = useState<string>('');
  const [headerStatus, setHeaderStatus] = useState({
    lc: 0,
    tick: 0,
    angle: 0,
    stopMetric: 0,
    sabbath: false,
  });
  const [windowColors, setWindowColors] = useState<string[]>([]);
  const [spoRows, setSpoRows] = useState<SpoRow[]>([]);
  const [faceRows, setFaceRows] = useState<FaceRow[]>([]);
  const [centroidPanel, setCentroidPanel] = useState({ stopMetric: 0, sabbath: false });

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    window.__wesiriBridge = {
      renderMode: 'react',
      onCommit: (record) => {
        const commit = record as CommitRecord;
        setRecords((prev) => [commit, ...prev].slice(0, 40));
        setSchemaText(
          JSON.stringify(
            {
              id: commit.id ? `${commit.id.slice(0, 20)}…` : undefined,
              t: commit.t,
              lc: commit.lc,
              type: commit.type,
              centroid: commit.centroid,
              prev_hash: commit.prev_hash ? `${commit.prev_hash.slice(0, 14)}…` : undefined,
              self_hash: commit.self_hash ? `${commit.self_hash.slice(0, 14)}…` : undefined,
            },
            null,
            1,
          ),
        );
      },
      onNarratives: (items) => setNarratives(items),
      onTickStatus: (status) => {
        setHeaderStatus((prev) => ({
          ...prev,
          lc: status.lc,
          tick: status.tick,
          angle: status.angle,
        }));
      },
      onCentroidStatus: (status) => {
        setHeaderStatus((prev) => ({
          ...prev,
          stopMetric: status.stopMetric,
          sabbath: status.sabbath,
        }));
      },
      onBasisHash: (hash) => setBasisHash(hash),
      onWindowColors: (colors) => setWindowColors(colors),
      onSPO: (rows) => setSpoRows(rows as SpoRow[]),
      onFaces: (faces) => setFaceRows(faces as FaceRow[]),
      onCentroidPanel: (data) => setCentroidPanel(data),
    };

    mountNode.innerHTML = legacyMarkup;
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

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = legacyRuntime;
    mountNode.appendChild(script);

    return () => {
      delete window.__wesiriBridge;
      mountNode.innerHTML = '';
      setBasisNode(null);
      setWindowNode(null);
      setHdrLcNode(null);
      setHdrTickNode(null);
      setHdrAngleNode(null);
      setHdrMetricNode(null);
      setHdrSabbathNode(null);
      setSpoNode(null);
      setFaceNode(null);
      setCentMetricNode(null);
      setCentBarNode(null);
      setCentSabbathNode(null);
      setStreamNode(null);
      setSchemaNode(null);
      setNarrativeNode(null);
    };
  }, []);

  useEffect(() => {
    if (!centBarNode) return;
    centBarNode.style.width = `${centroidPanel.stopMetric * 100}%`;
  }, [centBarNode, centroidPanel.stopMetric]);

  return (
    <main className="app">
      <div ref={mountRef} className="legacy-mount" />
      {streamNode &&
        createPortal(
          <>
            {records.map((record, index) => (
              <div key={`${record.lc ?? 'x'}-${index}`} className={`stream-line ${record.type ?? ''}`}>
                {`lc:${record.lc ?? '—'} ${record.type ?? 'record'} ${record.self_hash?.slice(0, 14) ?? ''}… Φ:${record.centroid?.stop_metric?.toFixed(2) ?? '—'}`}
              </div>
            ))}
          </>,
          streamNode,
        )}
      {schemaNode &&
        createPortal(
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '7px', lineHeight: 1.7 }}>{schemaText}</pre>,
          schemaNode,
        )}
      {narrativeNode &&
        createPortal(
          <>
            {narratives.map((text, index) => (
              <div key={`${index}-${text.slice(0, 16)}`} style={{ padding: '2px 0', borderBottom: '1px solid var(--dimmer)' }}>
                {text}
              </div>
            ))}
          </>,
          narrativeNode,
        )}
      {basisNode && createPortal(<>{basisHash}</>, basisNode)}
      {windowNode &&
        createPortal(
          <>
            {windowColors.map((background, index) => (
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
      {hdrLcNode && createPortal(<>{`lc:${headerStatus.lc}`}</>, hdrLcNode)}
      {hdrTickNode && createPortal(<>{`tick:${headerStatus.tick}`}</>, hdrTickNode)}
      {hdrAngleNode && createPortal(<>{`${headerStatus.angle.toFixed(1)}°`}</>, hdrAngleNode)}
      {hdrMetricNode && createPortal(<>{`Φ:${headerStatus.stopMetric.toFixed(2)}`}</>, hdrMetricNode)}
      {hdrSabbathNode &&
        createPortal(
          <span style={{ color: headerStatus.sabbath ? '#00ff44' : 'var(--dim)' }}>
            {headerStatus.sabbath ? 'SABBATH:✦' : 'SABBATH:—'}
          </span>,
          hdrSabbathNode,
        )}
      {spoNode &&
        createPortal(
          <>
            {spoRows.map((row) => (
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
            {faceRows.map((face) => (
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
      {centMetricNode && createPortal(<>{centroidPanel.stopMetric.toFixed(4)}</>, centMetricNode)}
      {centSabbathNode &&
        createPortal(
          <span style={{ color: centroidPanel.sabbath ? '#00ff44' : 'var(--dim)' }}>
            {centroidPanel.sabbath ? 'SABBATH ✦' : `Φ ${(centroidPanel.stopMetric * 7).toFixed(0)}/7`}
          </span>,
          centSabbathNode,
        )}
    </main>
  );
}
