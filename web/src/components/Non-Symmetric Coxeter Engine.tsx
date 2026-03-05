import { useState } from 'react';
import SamplePanel from './SamplePanel';

export default function NonSymmetricCoxeterEngineSample() {
  const [entropy, setEntropy] = useState(0.2);
  const [jitter, setJitter] = useState(5);

  return (
    <SamplePanel title="Non-Symmetric Coxeter Engine (Sample)" subtitle="Sample asymmetry controls for entropy and jitter.">
      <label style={{ display: 'block', fontSize: 12 }}>entropy: {entropy.toFixed(2)}</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={entropy}
        onChange={(e) => setEntropy(Number(e.target.value))}
      />
      <label style={{ display: 'block', fontSize: 12, marginTop: 8 }}>jitter: {jitter}</label>
      <input type="range" min={0} max={20} value={jitter} onChange={(e) => setJitter(Number(e.target.value))} />
    </SamplePanel>
  );
}
