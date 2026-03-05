import type { WesiriEngine } from '../../engine/useWesiriEngine';

type PortalHeaderProps = {
  headerStatus: WesiriEngine['headerStatus'];
};

export default function PortalHeader({ headerStatus }: PortalHeaderProps) {
  return (
    <header>
      <h1>WESIRI</h1>
      <span style={{ fontSize: 8, color: 'var(--gold2)', letterSpacing: 2 }}>FEDERATED LIGHT PROTOCOL</span>
      <div className="status-bar">
        <span>
          <span className="status-dot" style={{ background: 'var(--kk)' }} />
          BASIS
        </span>
        <span>{`lc:${headerStatus.lc}`}</span>
        <span>{`tick:${headerStatus.tick}`}</span>
        <span>{`${headerStatus.angle.toFixed(1)}°`}</span>
        <span>{`Φ:${headerStatus.stopMetric.toFixed(2)}`}</span>
        <span style={{ color: headerStatus.sabbath ? '#00ff44' : 'var(--dim)' }}>
          {headerStatus.sabbath ? 'SABBATH:✦' : 'SABBATH:—'}
        </span>
      </div>
    </header>
  );
}
