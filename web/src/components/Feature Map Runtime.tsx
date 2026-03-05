import { useMemo, useState } from 'react';
import SamplePanel from './SamplePanel';

type Feature = { id: string; weight: number };

export default function FeatureMapRuntimeSample() {
  const [threshold, setThreshold] = useState(0.5);
  const features = useMemo<Feature[]>(
    () => [
      { id: 'AUTH_KERNEL', weight: 0.82 },
      { id: 'LEDGER_SHARD', weight: 0.61 },
      { id: 'ROUTING_TABLE', weight: 0.47 },
      { id: 'ENCLAVE_GATE', weight: 0.39 },
    ],
    [],
  );

  const active = features.filter((f) => f.weight >= threshold);

  return (
    <SamplePanel title="Feature Map Runtime (Sample)" subtitle="Runtime sample for thresholded feature activation.">
      <label style={{ display: 'block', fontSize: 12 }}>activation threshold: {threshold.toFixed(2)}</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={threshold}
        onChange={(e) => setThreshold(Number(e.target.value))}
      />
      <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 12 }}>
        {active.map((f) => (
          <li key={f.id}>
            {f.id} ({f.weight.toFixed(2)})
          </li>
        ))}
      </ul>
    </SamplePanel>
  );
}
