import React, { useState, useMemo, useEffect, useRef } from 'react';

const App = () => {
  // Expanded Parametric Variables p, q, r, s ... z
  const [params, setParams] = useState({
    p: 6,      // Shells / Depth
    q: 12,     // Density / Circumference
    r: 0,      // Twist / Spiral
    s: 1,      // Symmetry / Sectors
    t: 12,     // Global Scale
    w: 1,      // Wave Frequency (Radial spacing oscillation)
    x: 0,      // X-Skew / Projection
    y: 0,      // Y-Skew / Projection
    z: 1,      // Z-Depth / Intensity Scaling
  });
  
  const [effect, setEffect] = useState('snake');

  const centerX = 200;
  const centerY = 200;

  // The Master Generator Function
  const ledData = useMemo(() => {
    let points = [];
    const { p, q, r, s, t, w, x, y, z } = params;

    for (let ringIdx = 0; ringIdx <= p; ringIdx++) {
      // W (Wave) modulates the spacing of the rings
      const radialOscillation = Math.cos(ringIdx * w) * (t * 0.5);
      const radius = (ringIdx * t * 2) + radialOscillation;
      
      // S (Symmetry) and Q (Density) define counts
      const count = ringIdx === 0 ? 1 : Math.max(s, Math.floor(ringIdx * q / s) * s);

      for (let i = 0; i < count; i++) {
        // R (Twist) + I (Index)
        const twist = (ringIdx * r * Math.PI) / 180;
        const baseAngle = ((i / count) * (Math.PI * 2)) + twist;
        
        // Apply X and Y skew factors
        const rawX = Math.cos(baseAngle) * radius;
        const rawY = Math.sin(baseAngle) * radius;
        
        // Z (Depth) affects how 'compressed' the projection is
        const projectedX = centerX + rawX + (x * ringIdx);
        const projectedY = centerY + rawY + (y * ringIdx);

        points.push({
          x: projectedX,
          y: projectedY,
          ringIdx,
          angle: baseAngle,
          dist: radius,
          depthScale: z, // Used for visual intensity
          id: `p${ringIdx}-i${i}`
        });
      }
    }
    return points.sort((a, b) => a.dist - b.dist || a.angle - b.angle);
  }, [params]);

  const canvasRef = useRef(null);
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    let frame = 0;
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, 400, 400);
      frame += 0.04;

      ledData.forEach((led, i) => {
        let intensity = 0;
        const zMod = (1 / led.depthScale);

        if (effect === 'snake') {
          const head = (frame * 20) % ledData.length;
          const d = (head - i + ledData.length) % ledData.length;
          if (d < 12) intensity = (1 - (d / 12)) * zMod;
        } else {
          const wave = (frame * 35) % 280;
          const d = Math.abs(led.dist - wave);
          intensity = Math.max(0, 1 - d / 40) * zMod;
        }

        if (intensity > 0.02) {
          ctx.shadowBlur = 15 * intensity;
          ctx.shadowColor = `hsl(${200 + led.ringIdx * 10}, 100%, 50%)`;
          ctx.fillStyle = `hsla(${200 + led.ringIdx * 10}, 100%, 60%, ${intensity})`;
          ctx.beginPath();
          ctx.arc(led.x, led.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [ledData, effect]);

  const updateParam = (key, val) => setParams(prev => ({ ...prev, [key]: parseFloat(val) }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020202] text-white p-4 font-mono">
      <div className="flex flex-col lg:flex-row gap-6 items-stretch bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-2xl">
        
        {/* Parametric Inputs Scrollable Column */}
        <div className="w-72 space-y-4 pr-2 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-emerald-900">
          <h2 className="text-xl font-black tracking-tighter text-emerald-400 mb-4 sticky top-0 bg-[#0a0a0a] py-2">Z-MAP ENGINE</h2>
          
          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="bg-white/5 p-3 rounded-lg">
              <div className="flex justify-between text-[10px] mb-2">
                <span className="uppercase text-white/30 font-bold">{key} identifier</span>
                <span className="text-emerald-400">{value.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min={key === 'z' || key === 's' ? 0.1 : key === 'x' || key === 'y' ? -10 : 0} 
                max={key === 'r' ? 180 : key === 'q' ? 64 : 20} 
                step={0.1}
                value={value} 
                onChange={(e) => updateParam(key, e.target.value)}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <button onClick={() => setEffect('snake')} className={`flex-1 text-[10px] py-3 rounded-lg border ${effect === 'snake' ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-white/10 text-white/40'}`}>SNAKE</button>
            <button onClick={() => setEffect('pulse')} className={`flex-1 text-[10px] py-3 rounded-lg border ${effect === 'pulse' ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-white/10 text-white/40'}`}>PULSE</button>
          </div>
        </div>

        {/* Visualizer */}
        <div className="relative w-[450px] h-[500px] bg-black rounded-xl overflow-hidden border border-white/10">
          <div className="absolute top-4 left-4 z-20 text-[9px] text-emerald-500/50 uppercase tracking-widest">
            Coordinate Projection Matrix Active
          </div>
          <svg viewBox="0 0 400 400" className="absolute inset-0 opacity-10">
            {ledData.map(led => (
              <circle key={led.id} cx={led.x} cy={led.y} r="2" fill="white" />
            ))}
          </svg>
          <canvas ref={canvasRef} width="400" height="500" className="relative z-10 w-full h-full" />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4 text-[9px] text-white/20 uppercase max-w-4xl tracking-tighter">
        <p>W: Radial Frequency</p>
        <p>X: Projection Skew X</p>
        <p>Y: Projection Skew Y</p>
        <p>Z: Intensity Depth</p>
        <p>S: Symmetry Step</p>
        <p>R: Phase Shift</p>
      </div>
    </div>
  );
};

export default App;