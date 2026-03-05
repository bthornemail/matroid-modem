import React, { useState, useMemo, useEffect, useRef } from 'react';

const App = () => {
  // P: Symmetry order, Q: Density, R: Mirror Offset (The Shatter factor)
  const [params, setParams] = useState({
    p: 6,       // Coxeter Order (Mirrors)
    q: 8,       // Radial depth
    offsetA: 0, // Distance of Seed A from Mirror
    offsetB: 15, // Distance of Seed B from Mirror
    twist: 0,   // Internal rotation
    beta: 1,    // Topological voids
    z: 1.0      // Perspective
  });

  const [effect, setEffect] = useState('orbits');
  const canvasRef = useRef(null);

  const ledData = useMemo(() => {
    let allPoints = [];
    const { p, q, offsetA, offsetB, twist, beta, z } = params;
    const centerX = 200, centerY = 200;
    
    // Coxeter wedge angle
    const alpha = (Math.PI * 2) / p;

    for (let ring = 1; ring <= q; ring++) {
      // Betti number logic: skip rings to create "genus" holes
      if (beta > 1 && (ring % Math.floor(beta + 1) === 0)) continue;

      const radius = ring * 22;

      // We generate TWO distinct orbits (Seed A and Seed B)
      // This is what creates the "two or more circular arrays" look
      [offsetA, offsetB].forEach((offset, seedIdx) => {
        for (let m = 0; m < p; m++) {
          const baseAngle = m * alpha;
          
          // The Coxeter Generator Action:
          // Reflecting a point across the mirror wedge
          // Point 1: Original wedge position
          // Point 2: Reflected wedge position (Mirror symmetry)
          const subPoints = [
            { angle: baseAngle + (offset / radius) + (ring * twist * 0.01) },
            { angle: baseAngle - (offset / radius) - (ring * twist * 0.01) }
          ];

          subPoints.forEach((pt, subIdx) => {
            const x = Math.cos(pt.angle) * radius;
            const y = Math.sin(pt.angle) * radius;
            
            // Apply Z-projection
            const scale = 1 / (1 + (ring * 0.1 * z));

            allPoints.push({
              x: centerX + x * scale,
              y: centerY + y * scale,
              ring,
              seedIdx, // Identifies which "array" it belongs to
              m,
              dist: radius,
              id: `r${ring}-s${seedIdx}-m${m}-i${subIdx}`
            });
          });
        }
      });
    }
    return allPoints;
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
        
        if (effect === 'orbits') {
          // Different timing for the two distinct arrays
          const speed = led.seedIdx === 0 ? 30 : 45;
          const wave = (frame * speed) % 250;
          intensity = Math.max(0, 1 - Math.abs(led.dist - wave) / 40);
        } else {
          const head = (frame * 50) % ledData.length;
          const d = (head - i + ledData.length) % ledData.length;
          intensity = d < 25 ? 1 - (d / 25) : 0;
        }

        if (intensity > 0.01) {
          // Color coding the two "split" arrays
          const hue = led.seedIdx === 0 ? 190 : 280;
          ctx.shadowBlur = 10 * intensity;
          ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${intensity})`;
          ctx.beginPath();
          ctx.arc(led.x, led.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [ledData, effect]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 font-mono">
      <div className="flex flex-col lg:flex-row gap-6 bg-[#0a0a0f] p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-6xl">
        
        <div className="w-80 space-y-4">
          <h2 className="text-xl font-bold text-cyan-400 tracking-tighter">COXETER SHATTER</h2>
          <p className="text-[9px] text-white/30 mb-4 italic leading-tight">
            Moving seed points off mirror planes to generate multi-orbit interleaved arrays.
          </p>
          
          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-[10px] mb-2 uppercase font-bold text-white/40">
                <span>{key}</span>
                <span className="text-cyan-400">{value}</span>
              </div>
              <input 
                type="range" 
                min={key.includes('offset') ? -30 : key === 'p' ? 2 : 0} 
                max={key === 'p' ? 16 : 40} 
                step={0.1}
                value={value} 
                onChange={(e) => setParams(p => ({...p, [key]: parseFloat(e.target.value)}))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <button onClick={() => setEffect('orbits')} className={`flex-1 py-3 text-[10px] rounded-lg border transition ${effect === 'orbits' ? 'bg-cyan-600 border-cyan-400' : 'border-white/10'}`}>ORBIT PULSE</button>
            <button onClick={() => setEffect('flow')} className={`flex-1 py-3 text-[10px] rounded-lg border transition ${effect === 'flow' ? 'bg-cyan-600 border-cyan-400' : 'border-white/10'}`}>ARRAY FLOW</button>
          </div>
        </div>

        <div className="flex-1 relative bg-black rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
           <svg viewBox="0 0 400 400" className="absolute inset-0 opacity-10 pointer-events-none">
             {Array.from({length: params.p}).map((_, i) => (
               <line key={i} x1="200" y1="200" x2={200 + Math.cos(i * (Math.PI*2/params.p)) * 300} y2={200 + Math.sin(i * (Math.PI*2/params.p)) * 300} stroke="white" strokeWidth="0.5" />
             ))}
           </svg>
           <canvas ref={canvasRef} width="400" height="400" className="w-[400px] h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default App;