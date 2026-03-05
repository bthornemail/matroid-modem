import React, { useState, useEffect, useMemo } from 'react';

const App = () => {
  const P_SIZE = 240;
  
  // Private States for Peer A and Peer B
  const [privA, setPrivA] = useState({ c: 0, b: [1, 0, 1, 1, 0, 1] });
  const [privB, setPrivB] = useState({ c: 0, b: [1, 0, 1, 1, 0, 0] }); // Note b[5] differs

  // Public State U = (p, k, c_pub)
  const [publicState, setPublicState] = useState({ p: 0, k: 0, c_pub: 0 });
  const [trace, setTrace] = useState([0]);
  const [status, setStatus] = useState('IDLE'); // IDLE, RUNNING, FAIL, COMPLETE

  // Deterministic Projection Function F(U, line, residual) -> p'
  const F = (U, line, residual) => {
    const { p, k, c_pub } = U;
    // Implementation of the deterministic mapping:
    // We use a modular hop based on the line bit and residual
    const step = line === 1 ? 37 : 13; // Primes for distribution
    const direction = residual === 0 ? 1 : -1;
    const nextP = (p + (step * (k + 1) * direction) + P_SIZE) % P_SIZE;
    return nextP;
  };

  const runStep = () => {
    if (publicState.k >= 6 || status === 'FAIL') return;

    const k = publicState.k;
    const lineA = privA.b[k];
    const residualA = privA.c ^ publicState.c_pub;

    const lineB = privB.b[k];
    const residualB = privB.c ^ publicState.c_pub;

    const pPrimeA = F(publicState, lineA, residualA);
    const pPrimeB = F(publicState, lineB, residualB);

    if (pPrimeA === pPrimeB) {
      const nextU = { ...publicState, p: pPrimeA, k: k + 1 };
      setPublicState(nextU);
      setTrace([...trace, pPrimeA]);
      if (k === 5) setStatus('COMPLETE');
    } else {
      setStatus('FAIL');
    }
  };

  const reset = () => {
    setPublicState({ p: 0, k: 0, c_pub: 0 });
    setTrace([0]);
    setStatus('IDLE');
  };

  // Visualization helper: Mapping P {0..239} to a circular layout
  const points = useMemo(() => {
    return Array.from({ length: P_SIZE }).map((_, i) => {
      const angle = (i / P_SIZE) * Math.PI * 2;
      const r = 160;
      return { x: 200 + Math.cos(angle) * r, y: 200 + Math.sin(angle) * r, i };
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-4 font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Peer Controls */}
        <div className="space-y-6 bg-[#111] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold text-blue-400">PSYNC PROJECTION</h2>
          
          <div className="space-y-4">
            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
              <label className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">Peer A (c_A, b_A)</label>
              <div className="flex gap-2">
                <button onClick={() => setPrivA({...privA, c: privA.c ^ 1})} className={`px-2 py-1 rounded border ${privA.c ? 'bg-blue-600' : 'border-white/20'}`}>{privA.c}</button>
                <div className="flex gap-1">
                  {privA.b.map((bit, i) => (
                    <button key={i} onClick={() => {
                      const newB = [...privA.b]; newB[i] = bit ^ 1; setPrivA({...privA, b: newB});
                    }} className={`w-6 h-8 rounded border ${bit ? 'bg-blue-500/40 border-blue-400' : 'border-white/10'}`}>{bit}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
              <label className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">Peer B (c_B, b_B)</label>
              <div className="flex gap-2">
                <button onClick={() => setPrivB({...privB, c: privB.c ^ 1})} className={`px-2 py-1 rounded border ${privB.c ? 'bg-indigo-600' : 'border-white/20'}`}>{privB.c}</button>
                <div className="flex gap-1">
                  {privB.b.map((bit, i) => (
                    <button key={i} onClick={() => {
                      const newB = [...privB.b]; newB[i] = bit ^ 1; setPrivB({...privB, b: newB});
                    }} className={`w-6 h-8 rounded border ${bit ? 'bg-indigo-500/40 border-indigo-400' : 'border-white/10'}`}>{bit}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <button 
              onClick={runStep} 
              disabled={status === 'FAIL' || status === 'COMPLETE'}
              className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-blue-400 transition disabled:opacity-20"
            >
              PROJECT STEP (k={publicState.k})
            </button>
            <button onClick={reset} className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest py-2">Reset State</button>
          </div>
        </div>

        {/* Visualizer - The Public Address Space */}
        <div className="lg:col-span-2 relative aspect-square bg-black rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center">
          <div className="absolute top-6 left-6 z-20">
            <div className={`text-xs font-bold tracking-widest uppercase ${status === 'FAIL' ? 'text-red-500' : 'text-emerald-500'}`}>
              STATUS: {status}
            </div>
            <div className="text-[10px] text-white/30 mt-1">U = ({publicState.p}, {publicState.k}, {publicState.c_pub})</div>
          </div>

          <svg viewBox="0 0 400 400" className="w-[90%] h-[90%] transform -rotate-90">
            {/* Background Address Space */}
            {points.map(p => (
              <circle key={p.i} cx={p.x} cy={p.y} r="1.5" fill={p.i === publicState.p ? "#60a5fa" : "#222"} />
            ))}
            
            {/* The Trace (Append-only) */}
            {trace.length > 1 && trace.map((pIdx, i) => {
              if (i === 0) return null;
              const prev = points[trace[i-1]];
              const curr = points[pIdx];
              return (
                <line 
                  key={i} x1={prev.x} y1={prev.y} x2={curr.x} y2={curr.y} 
                  stroke="#3b82f6" strokeWidth="2" strokeOpacity={i / trace.length}
                />
              );
            })}

            {/* Active Pointer Highlight */}
            <circle 
              cx={points[publicState.p].x} cy={points[publicState.p].y} 
              r="6" fill="transparent" stroke="#60a5fa" strokeWidth="2" 
              className="animate-pulse"
            />
          </svg>

          {status === 'FAIL' && (
            <div className="absolute inset-0 bg-red-950/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center p-8 bg-black border border-red-500/50 rounded-2xl">
                <h3 className="text-red-500 font-black text-xl tracking-tighter">COMMIT ERROR</h3>
                <p className="text-[10px] text-white/40 mt-2 uppercase">Projections diverged at k={publicState.k}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-[9px] text-white/20 uppercase tracking-[0.4em] max-w-4xl text-center">
        Formal Closure: F(U, line_A, res_A) == F(U, line_B, res_B)
      </div>
    </div>
  );
};

export default App;