import React, { useState, useMemo, useEffect, useRef } from 'react';

const App = () => {
  // THE ALPHABET MATRIX: a-z definition
  const [params, setParams] = useState({
    a: 200,    // Center X
    b: 200,    // Center Y
    p: 6,      // Schlafli p (Symmetry)
    q: 4,      // Schlafli q (Density)
    r: 10,     // Radius Scale
    s: 1.0,    // Stretch / Skew
    t: 0,      // Time / Phase Shift
    w: 0.1,    // Wave / Warp
    z: 1.0,    // Betti-like connectivity / Z-Depth
    beta: 1,   // Betti Number (Influences hole count/cycles)
  });

  const [effect, setEffect] = useState('manifold');
  const canvasRef = useRef(null);

  // MANIFOLD GENERATOR
  const ledData = useMemo(() => {
    const points = [];
    const { p, q, r, s, t, w, z, beta, a, b } = params;

    // Use Betti Number to influence the topology
    // Higher beta introduces more "holes" or cycles in the radial distribution
    for (let layer = 1; layer <= 8; layer++) {
      const radiusBase = layer * r * s;
      
      // Topological hole modulation based on Betti Number
      const holeFactor = Math.abs(Math.sin(layer * beta));
      if (holeFactor < 0.2 && beta > 1) continue; 

      const count = Math.floor(layer * q * p);

      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        
        // Apply Warp (w) and Schlafli-inspired p-fold symmetry
        const warpAngle = Math.sin(theta * p + t) * w;
        const finalAngle = theta + warpAngle;

        // Cartesian mapping with z-projection
        const xRaw = Math.cos(finalAngle) * radiusBase;
        const yRaw = Math.sin(finalAngle) * radiusBase;

        // Apply a "Z" transformation (3D projection logic)
        const scale = 1 / (1 + (layer * 0.1 * z));
        
        points.push({
          x: a + xRaw * scale,
          y: b + yRaw * scale,
          layer,
          angle: finalAngle,
          dist: radiusBase,
          id: `l${layer}-i${i}`
        });
      }
    }
    return points;
  }, [params]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let frame = 0;
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, 400, 400);
      frame += 0.02;

      ledData.forEach((led, i) => {
        let intensity = 0;

        if (effect === 'manifold') {
          // Pulse through the topology
          const wave = (frame * 30) % 250;
          const d = Math.abs(led.dist - wave);
          intensity = Math.max(0, 1 - d / 50);
        } else {
          // Sequential "Betti" flow
          const head = (frame * 50) % ledData.length;
          const d = (head - i + ledData.length) % ledData.length;
          if (d < 20) intensity = 1 - (d / 20);
        }

        if (intensity > 0.01) {
          const hue = (led.layer * 40 + params.t * 20) % 360;
          ctx.shadowBlur = 10 * intensity;
          ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${intensity})`;
          
          ctx.beginPath();
          ctx.arc(led.x, led.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [ledData, effect, params.t]);

  const updateParam = (key, val) => setParams(prev => ({ ...prev, [key]: parseFloat(val) }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020205] text-white p-4 font-mono">
      <div className="flex flex-col lg:flex-row gap-8 bg-[#0a0a10] p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-6xl">
        
        {/* Parametric Alphabet Control */}
        <div className="w-80 space-y-4 pr-4 overflow-y-auto max-h-[600px] custom-scrollbar">
          <div className="mb-6 sticky top-0 bg-[#0a0a10] z-10 pb-2">
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              ALPHABET ENGINE
            </h1>
            <p className="text-[10px] text-white/30 tracking-[0.3em]">SCHLÄFLI + BETTI PROJECTION</p>
          </div>

          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-wider">
                <span className="text-white/40">{key} coefficient</span>
                <span className="text-blue-400">{value.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min={key === 'beta' || key === 'p' ? 1 : 0} 
                max={key === 'p' ? 24 : key === 'beta' ? 10 : key === 'a' || key === 'b' ? 400 : 50} 
                step={0.1}
                value={value} 
                onChange={(e) => updateParam(key, e.target.value)}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          ))}

          <div className="flex gap-2 pt-4">
             <button onClick={() => setEffect('manifold')} className={`flex-1 py-3 text-[10px] rounded-lg border transition ${effect === 'manifold' ? 'bg-blue-600 border-blue-400' : 'border-white/10 text-white/40'}`}>MANIFOLD PULSE</button>
             <button onClick={() => setEffect('flow')} className={`flex-1 py-3 text-[10px] rounded-lg border transition ${effect === 'flow' ? 'bg-blue-600 border-blue-400' : 'border-white/10 text-white/40'}`}>TOPOLOGICAL FLOW</button>
          </div>
        </div>

        {/* The Projection Viewport */}
        <div className="flex-1 relative bg-black rounded-2xl border border-white/5 flex items-center justify-center min-h-[500px]">
          <div className="absolute top-6 left-6 flex flex-col gap-1 z-20">
             <div className="text-[10px] text-blue-500 font-bold tracking-widest">MAP: {'{'}p, q{'}'}</div>
             <div className="text-[10px] text-emerald-500 font-bold tracking-widest">GENUS: β({params.beta})</div>
          </div>
          <canvas ref={canvasRef} width="400" height="400" className="w-[400px] h-[400px]" />
          
          <div className="absolute bottom-6 right-6 text-[8px] text-white/20 text-right uppercase">
            Cartesian Topology Generator<br/>
            Ref: Coxeter-Schläfli-Betti Matrix
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;