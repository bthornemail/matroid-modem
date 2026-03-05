import React, { useState, useMemo, useEffect, useRef } from 'react';

const App = () => {
  const [params, setParams] = useState({
    p: 6,       // Coxeter Base (Mirror planes)
    q: 8,       // Density
    beta: 1,    // Betti Number (Topological "holes")
    entropy: 0, // Symmetry Breaking (0 = Perfect, 1 = Chaos)
    twist: 0,   // Spiral/Phyllotaxis factor
    jitter: 5,  // Local noise
    z: 1.0      // Perspective skew
  });

  const [effect, setEffect] = useState('organic');
  const canvasRef = useRef(null);

  const ledData = useMemo(() => {
    let points = [];
    const { p, q, beta, entropy, twist, jitter, z } = params;
    const centerX = 200, centerY = 200;
    const wedgeAngle = (Math.PI * 2) / p;

    for (let ring = 1; ring <= q; ring++) {
      const radius = ring * 20;
      
      // Topological Voids: Using Betti logic to "cut" through the manifold
      // We skip entire radial or angular sectors based on beta cycles
      if (beta > 1 && Math.sin(ring * beta) < -0.5) continue;

      for (let m = 0; m < p; m++) {
        for (let i = 0; i < 4; i++) {
          const internalAngle = (i / 4) * wedgeAngle;
          
          // ASYMMETRY LOGIC
          // 1. Twist creates a non-symmetrical spiral flow
          const ringTwist = ring * twist;
          
          // 2. Entropy breaks the mirror reflection
          // Instead of reflecting perfectly, we add an offset unique to each sector
          const sectorShift = Math.sin(m * entropy * 10) * entropy * 20;
          
          const finalAngle = (m * wedgeAngle) + internalAngle + ringTwist;
          
          // 3. Jitter adds localized Cartesian noise (breaking the grid)
          const xNoise = (Math.random() - 0.5) * jitter;
          const yNoise = (Math.random() - 0.5) * jitter;

          const rawX = Math.cos(finalAngle) * (radius + sectorShift);
          const rawY = Math.sin(finalAngle) * (radius + sectorShift);

          // Apply Z-Depth (Perspective skew)
          const scale = 1 / (1 + (ring * 0.1 * z));

          points.push({
            x: centerX + (rawX + xNoise) * scale,
            y: centerY + (rawY + yNoise) * scale,
            ring,
            mirror: m,
            dist: radius,
            id: `r${ring}-m${m}-i${i}`
          });
        }
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
        if (effect === 'organic') {
          const wave = (frame * 40) % 300;
          const d = Math.abs(led.dist - wave);
          intensity = Math.max(0, 1 - d / 60);
        } else {
          const head = (frame * 60) % ledData.length;
          const d = (head - i + ledData.length) % ledData.length;
          if (d < 30) intensity = 1 - (d / 30);
        }

        if (intensity > 0.01) {
          const hue = (led.mirror * (360/params.p) + frame * 20) % 360;
          ctx.shadowBlur = 12 * intensity;
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
  }, [ledData, effect, params.p]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030303] text-white p-6 font-mono">
      <div className="flex flex-col lg:flex-row gap-8 bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 shadow-2xl w-full max-w-6xl">
        
        {/* Entropy Controls */}
        <div className="w-80 space-y-4">
          <h1 className="text-xl font-black text-rose-500 mb-6 tracking-tighter uppercase">Asymmetric Coxeter</h1>
          
          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-[10px] mb-2 uppercase font-bold text-white/40">
                <span>{key} tensor</span>
                <span className="text-rose-400">{value.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={key === 'entropy' || key === 'twist' ? 1 : key === 'beta' ? 10 : 20} 
                step={0.01}
                value={value} 
                onChange={(e) => setParams(p => ({...p, [key]: parseFloat(e.target.value)}))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          ))}

          <div className="pt-4 flex gap-2">
            <button onClick={() => setEffect('organic')} className={`flex-1 py-3 text-[10px] rounded-lg border ${effect === 'organic' ? 'bg-rose-600 border-rose-400' : 'border-white/10'}`}>WAVE</button>
            <button onClick={() => setEffect('glitch')} className={`flex-1 py-3 text-[10px] rounded-lg border ${effect === 'glitch' ? 'bg-rose-600 border-rose-400' : 'border-white/10'}`}>GLITCH</button>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 relative bg-black rounded-2xl border border-white/5 flex items-center justify-center min-h-[500px]">
           <canvas ref={canvasRef} width="400" height="400" className="w-[400px] h-[400px]" />
           <div className="absolute top-6 right-6 text-[9px] text-white/20 uppercase tracking-widest text-right">
             Topological Genus: {params.beta}<br/>
             Symmetry Breaking Active
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;