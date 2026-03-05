import { useMemo, useState } from 'react';
import SamplePanel from './SamplePanel';

export default function CoxeterSymmetryGeneratorExtendedSample() {
  const [p, setP] = useState(6);
  const [q, setQ] = useState(4);
  const points = useMemo(() => p * q * 2, [p, q]);

  return (
    <SamplePanel
      title="Coxeter Symmetry Generator Extended (Sample)"
      subtitle="Sample component scaffold for expanded [p,q] experiments."
    >
      <label style={{ display: 'block', fontSize: 12 }}>p: {p}</label>
      <input type="range" min={3} max={12} value={p} onChange={(e) => setP(Number(e.target.value))} />
      <label style={{ display: 'block', fontSize: 12, marginTop: 8 }}>q: {q}</label>
      <input type="range" min={2} max={12} value={q} onChange={(e) => setQ(Number(e.target.value))} />
      <div style={{ marginTop: 10, fontSize: 12, color: '#9ad1ff' }}>Generated point budget: {points}</div>
    </SamplePanel>
  );
}
