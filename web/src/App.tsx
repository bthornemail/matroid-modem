import { useState } from 'react';
import SampleGallery from './components/SampleGallery';
import PortalLayout from './components/portal/PortalLayout';
import ViewToggle from './components/portal/ViewToggle';
import { useWesiriEngine } from './engine/useWesiriEngine';
import './legacy/wesiri.css';

export default function App() {
  const [view, setView] = useState<'portal' | 'gallery'>('portal');
  const engine = useWesiriEngine();

  return (
    <main className="app">
      <ViewToggle view={view} onSelect={setView} />
      {view === 'gallery' ? <SampleGallery /> : <PortalLayout engine={engine} />}
    </main>
  );
}
