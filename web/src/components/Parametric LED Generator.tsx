import { useMemo, useState } from 'react';
import SamplePanel from './SamplePanel';

export default function ParametricLedGeneratorSample() {
  const [rings, setRings] = useState(6);
  const [density, setDensity] = useState(12);
  const ledCount = useMemo(() => {
    let count = 1;
    for (let i = 1; i <= rings; i++) count += Math.max(4, Math.floor(i * density));
    return count;
  }, [rings, density]);

  return (
    <SamplePanel title="Parametric LED Generator (Sample)" subtitle="Sample shell-density generator for LED budget estimation.">
      <label style={{ display: 'block', fontSize: 12 }}>rings: {rings}</label>
      <input type="range" min={1} max={16} value={rings} onChange={(e) => setRings(Number(e.target.value))} />
      <label style={{ display: 'block', fontSize: 12, marginTop: 8 }}>density: {density}</label>
      <input type="range" min={4} max={24} value={density} onChange={(e) => setDensity(Number(e.target.value))} />
      <div style={{ marginTop: 10, fontSize: 12, color: '#9ad1ff' }}>Estimated LEDs: {ledCount}</div>
    </SamplePanel>
  );
}
