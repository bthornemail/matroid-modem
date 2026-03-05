import { useMemo, useState } from 'react';
import SamplePanel from './SamplePanel';

export default function IChing256CentroidSample() {
  const [index, setIndex] = useState(0);
  const bits = useMemo(() => index.toString(2).padStart(8, '0'), [index]);

  return (
    <SamplePanel title="I Ching 256 Centroid (Sample)" subtitle="Simple 8-bit index view for 16×16 centroid addressing.">
      <label style={{ display: 'block', fontSize: 12 }}>hexagram index: {index}</label>
      <input type="range" min={0} max={255} value={index} onChange={(e) => setIndex(Number(e.target.value))} />
      <div style={{ marginTop: 10, fontSize: 12 }}>Binary: {bits}</div>
      <div style={{ marginTop: 4, fontSize: 12, color: '#9ad1ff' }}>
        Grid position: row {Math.floor(index / 16)}, col {index % 16}
      </div>
    </SamplePanel>
  );
}
