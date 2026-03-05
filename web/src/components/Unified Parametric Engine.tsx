import { useMemo, useState } from 'react';
import SamplePanel from './SamplePanel';

export default function UnifiedParametricEngineSample() {
  const [p, setP] = useState(6);
  const [q, setQ] = useState(4);
  const [beta, setBeta] = useState(1);

  const score = useMemo(() => Number((p * q * beta).toFixed(2)), [p, q, beta]);

  return (
    <SamplePanel title="Unified Parametric Engine (Sample)" subtitle="Sample aggregate control surface for p/q/beta manifold scoring.">
      <label style={{ display: 'block', fontSize: 12 }}>p: {p}</label>
      <input type="range" min={3} max={12} value={p} onChange={(e) => setP(Number(e.target.value))} />
      <label style={{ display: 'block', fontSize: 12, marginTop: 8 }}>q: {q}</label>
      <input type="range" min={2} max={12} value={q} onChange={(e) => setQ(Number(e.target.value))} />
      <label style={{ display: 'block', fontSize: 12, marginTop: 8 }}>beta: {beta.toFixed(1)}</label>
      <input type="range" min={0.5} max={5} step={0.1} value={beta} onChange={(e) => setBeta(Number(e.target.value))} />
      <div style={{ marginTop: 10, fontSize: 12, color: '#9ad1ff' }}>Engine score: {score}</div>
    </SamplePanel>
  );
}
