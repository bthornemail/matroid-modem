type ViewToggleProps = {
  view: 'portal' | 'gallery';
  onSelect: (view: 'portal' | 'gallery') => void;
};

export default function ViewToggle({ view, onSelect }: ViewToggleProps) {
  return (
    <div style={{ position: 'fixed', right: 12, top: 12, zIndex: 9999, display: 'flex', gap: 8 }}>
      <button className={`btn ${view === 'portal' ? 'active' : ''}`} onClick={() => onSelect('portal')}>
        Portal
      </button>
      <button className={`btn ${view === 'gallery' ? 'active' : ''}`} onClick={() => onSelect('gallery')}>
        Samples
      </button>
    </div>
  );
}
