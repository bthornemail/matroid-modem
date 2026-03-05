import { useState } from 'react';
import SamplePanel from './SamplePanel';

export default function PsyncProtocolSimulatorSample() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'COMPLETE'>('IDLE');

  const next = () => {
    setStatus('RUNNING');
    setStep((prev) => {
      const value = prev + 1;
      if (value >= 6) setStatus('COMPLETE');
      return value;
    });
  };

  const reset = () => {
    setStep(0);
    setStatus('IDLE');
  };

  return (
    <SamplePanel title="PSYNC Protocol Simulator (Sample)" subtitle="Sample finite-step protocol loop with deterministic state transitions.">
      <div style={{ fontSize: 12 }}>k: {step}</div>
      <div style={{ fontSize: 12, marginBottom: 10 }}>status: {status}</div>
      <button style={{ marginRight: 8 }} onClick={next} disabled={status === 'COMPLETE'}>
        Step
      </button>
      <button onClick={reset}>Reset</button>
    </SamplePanel>
  );
}
