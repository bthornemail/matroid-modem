import { useMemo, useState } from 'react';
import SamplePanel from './SamplePanel';

export default function CoxeterSymmetryGeneratorSample() {
  const [order, setOrder] = useState(6);
  const [rings, setRings] = useState(8);
  const segments = useMemo(() => order * rings, [order, rings]);

  return (
    <SamplePanel title="Coxeter Symmetry Generator (Sample)" subtitle="Baseline sample for mirror-order and shell controls.">
      <label style={{ display: 'block', fontSize: 12 }}>mirror order: {order}</label>
      <input type="range" min={3} max={12} value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      <label style={{ display: 'block', fontSize: 12, marginTop: 8 }}>rings: {rings}</label>
      <input type="range" min={1} max={16} value={rings} onChange={(e) => setRings(Number(e.target.value))} />
      <div style={{ marginTop: 10, fontSize: 12, color: '#9ad1ff' }}>Projected segments: {segments}</div>
    </SamplePanel>
  );
}
