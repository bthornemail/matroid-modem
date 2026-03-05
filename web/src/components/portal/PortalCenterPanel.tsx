import type { WesiriEngine } from '../../engine/useWesiriEngine';

type PortalCenterPanelProps = {
  spoRows: WesiriEngine['spoRows'];
  activeLine: string;
};

export default function PortalCenterPanel({ spoRows, activeLine }: PortalCenterPanelProps) {
  return (
    <div id="centre">
      <div id="main-canvas-wrap">
        <svg id="rings-svg" viewBox="-300 -300 600 600" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.2">
            <circle cx="0" cy="0" r="220" stroke="var(--gold2)" strokeWidth="1" fill="none" />
            <circle cx="0" cy="0" r="160" stroke="var(--gold2)" strokeWidth="1" fill="none" />
            <circle cx="0" cy="0" r="102" stroke="var(--gold2)" strokeWidth="1" fill="none" />
          </g>
          {spoRows.map((row, index) => {
            const angle = (index / spoRows.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angle) * 160;
            const y = Math.sin(angle) * 160;
            return (
              <g key={row.id}>
                <circle cx={x} cy={y} r="8" className="led active" fill={row.color} />
                <text x={x} y={y + 18} textAnchor="middle" fill="var(--gold2)" style={{ fontSize: 7 }}>
                  {row.name}
                </text>
              </g>
            );
          })}
          <circle id="led-center" cx="0" cy="0" r="8" fill="var(--white)" className="led active" />
          <text x="0" y="16" textAnchor="middle" fill="var(--gold2)" style={{ fontSize: 7 }}>
            genesis·gate
          </text>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 7, color: 'var(--gold2)', letterSpacing: 1 }}>ACTIVE LINE</span>
        <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'var(--serif)' }}>{activeLine}</div>
      </div>
    </div>
  );
}
