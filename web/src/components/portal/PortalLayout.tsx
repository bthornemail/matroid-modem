import { useMemo } from 'react';
import type { WesiriEngine } from '../../engine/useWesiriEngine';
import PortalBottomBar from './PortalBottomBar';
import PortalCenterPanel from './PortalCenterPanel';
import PortalHeader from './PortalHeader';
import PortalLeftPanel from './PortalLeftPanel';
import PortalRightPanel from './PortalRightPanel';

type PortalLayoutProps = {
  engine: WesiriEngine;
};

export default function PortalLayout({ engine }: PortalLayoutProps) {
  const activeLine = useMemo(() => {
    const passing = engine.faceRows.find((f) => f.status === 'pass');
    return passing ? `${passing.face_id} {${passing.vertices.join(',')}}` : '—';
  }, [engine.faceRows]);

  return (
    <div id="app">
      <PortalHeader headerStatus={engine.headerStatus} />
      <PortalLeftPanel engine={engine} />
      <PortalCenterPanel spoRows={engine.spoRows} activeLine={activeLine} />
      <PortalRightPanel engine={engine} />
      <PortalBottomBar engine={engine} />
    </div>
  );
}
