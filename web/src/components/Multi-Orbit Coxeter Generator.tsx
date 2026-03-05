import { useMemo, useState } from 'react';
import SamplePanel from './SamplePanel';

export default function MultiOrbitCoxeterGeneratorSample() {
  const [orbitA, setOrbitA] = useState(0);
  const [orbitB, setOrbitB] = useState(15);
  const separation = useMemo(() => Math.abs(orbitA - orbitB), [orbitA, orbitB]);

  return (
    <SamplePanel title="Multi-Orbit Coxeter Generator (Sample)" subtitle="Sample controls for two orbit offsets and separation.">
      <label style={{ display: 'block', fontSize: 12 }}>offset A: {orbitA}</label>
      <input type="range" min={-30} max={30} value={orbitA} onChange={(e) => setOrbitA(Number(e.target.value))} />
      <label style={{ display: 'block', fontSize: 12, marginTop: 8 }}>offset B: {orbitB}</label>
      <input type="range" min={-30} max={30} value={orbitB} onChange={(e) => setOrbitB(Number(e.target.value))} />
      <div style={{ marginTop: 10, fontSize: 12, color: '#9ad1ff' }}>Orbit separation: {separation}</div>
    </SamplePanel>
  );
}
