import React, { useState, useMemo, useEffect, useRef } from 'react';

const App = () => {
  // Coxeter-Inspired Parameters
  const [params, setParams] = useState({
    p: 6,      // Coxeter Order [p]: Number of mirror planes
    q: 4,      // Sub-tiling [q]: Points per fundamental region
    r: 15,     // Radial steps (shells)
    s: 1.0,    // Stretching factor
    t: 10,     // Fundamental scale
    w: 0,      // Angular Warp (curvature of mirrors)
    x: 0,      // Center Offset X
    y: 0,      // Center Offset Y
    z: 1,      // Perspective / Depth
  });
  
  const [effect, setEffect] = useState('pulse');

  const centerX = 200;
  const centerY = 200;

  // COXETER SYMMETRY ENGINE
  const ledData = useMemo(() => {
    let points = [];
    const { p, q, r, s, t, w, x, y, z } = params;

    // We define the Fundamental Region based on [p]
    // The angle of the wedge is 2*PI / p
    const wedgeAngle = (Math.PI * 2) / p;

    for (let ring = 1; ring <= r; ring++) {
      const radius = ring * t * s;
      
      // Points inside the fundamental region defined by [q]
      for (let i = 0; i < q; i++) {
        // Position within the wedge (prevent overlap at edges by not going to 1.0)
        const internalAngle = (i / q) * wedgeAngle;
        
        // Mirror/Rotate the point across all [p] planes
        for (let mirror = 0; mirror < p; mirror++) {
          const rotation = mirror * wedgeAngle;
          
          // Warp (w) adds non-Euclidean curvature to the lines
          const finalAngle = rotation + internalAngle + (Math.sin(ring * w) * 0.2);
          
          // Apply Perspective / Depth factor z to radius
          const effectiveRadius = radius * (1 / z);
          const rawX = Math.cos(finalAngle) * effectiveRadius;
          const rawY = Math.sin(finalAngle) * effectiveRadius;

          points.push({
            x: centerX + rawX + x,
            y: centerY + rawY + y,
            ring,
            mirror,
            angle: finalAngle,
            dist: effectiveRadius,
            id: `m${mirror}-r${ring}-i${i}`
          });
        }
      }
    }
    // Sorting by distance then angle creates a consistent flow for effects
    return points.sort((a, b) => a.dist - b.dist || a.angle - b.angle);
  }, [params]);

  const canvasRef = useRef(null);
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let frame = 0;
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, 400, 400);
      frame += 0.03;

      ledData.forEach((led, i) => {
        let intensity = 0;

        if (effect === 'snake') {
          const head = (frame * 30) % ledData.length;
          const d = (head - i + ledData.length) % ledData.length;
          if (d < 20) intensity = 1 - (d / 20);
        } else {
          // Pulse flows through the radial shells
          const wave = (frame * 40) % 300;
          const d = Math.abs(led.dist - wave);
          intensity = Math.max(0, 1 - d / 40);
        }

        if (intensity > 0.02) {
          ctx.shadowBlur = 15 * intensity;
          // Color based on mirror index (Coxeter sectors)
          const hue = (led.mirror / params.p) * 360;
          ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${intensity})`;
          
          ctx.beginPath();
          ctx.arc(led.x, led.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [ledData, effect, params.p]);

  const updateParam = (key, val) => setParams(prev => ({ ...prev, [key]: parseFloat(val) }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050508] text-white p-4 font-mono">
      <div className="flex flex-col lg:flex-row gap-6 items-stretch bg-[#0f0f13] p-6 rounded-3xl border border-white/10 shadow-2xl">
        
        <div className="w-72 space-y-3 pr-2 overflow-y-auto max-h-[550px] scrollbar-hide">
          <div className="mb-4">
            <h2 className="text-xl font-black tracking-tighter text-indigo-400">COXETER [P,Q]</h2>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Reflection Group Generator</p>
          </div>
          
          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="bg-white/5 p-2 px-3 rounded-lg border border-white/5">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="uppercase text-white/40 font-bold">{key}</span>
                <span className="text-indigo-400">{value.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min={key === 'p' ? 2 : key === 'z' ? 0.5 : key === 'x' || key === 'y' ? -50 : 0} 
                max={key === 'p' ? 24 : key === 'q' ? 20 : key === 'r' ? 40 : 100} 
                step={key === 's' || key === 'w' || key === 'z' ? 0.01 : 1}
                value={value} 
                onChange={(e) => updateParam(key, e.target.value)}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <button onClick={() => setEffect('snake')} className={`flex-1 text-[10px] py-3 rounded-xl border transition ${effect === 'snake' ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-white/10 text-white/40'}`}>KALEIDOSCOPE</button>
            <button onClick={() => setEffect('pulse')} className={`flex-1 text-[10px] py-3 rounded-xl border transition ${effect === 'pulse' ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-white/10 text-white/40'}`}>RADIAL PULSE</button>
          </div>
        </div>

        <div className="relative w-[500px] h-[550px] bg-black rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
          {/* Mirror Plane Overlays */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 opacity-10 pointer-events-none">
            {Array.from({ length: params.p }).map((_, i) => {
              const angle = (i * Math.PI * 2) / params.p;
              return (
                <line 
                  key={i} x1="200" y1="200" 
                  x2={200 + Math.cos(angle) * 300} y2={200 + Math.sin(angle) * 300} 
                  stroke="white" strokeWidth="0.5" 
                />
              );
            })}
          </svg>
          <canvas ref={canvasRef} width="400" height="400" className="relative z-10 scale-110" />
        </div>
      </div>
      
      <div className="mt-6 flex gap-12 text-[9px] text-white/20 uppercase tracking-widest">
        <div>[P] Mirror Count</div>
        <div>[Q] Internal Points</div>
        <div>[W] Mirror Warp</div>
        <div>[S] Stretch</div>
      </div>
    </div>
  );
};

export default App;
