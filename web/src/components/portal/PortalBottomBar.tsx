import type { WesiriEngine } from '../../engine/useWesiriEngine';
import { WORDNET_SIMPLEX, faceColor } from './constants';

type PortalBottomBarProps = {
  engine: WesiriEngine;
};

export default function PortalBottomBar({ engine }: PortalBottomBarProps) {
  return (
    <div id="bottom">
      <div className="bottom-cell">
        <div className="bottom-cell-title">16×16 Shared Array Buffer · w-depth</div>
        <div id="window-grid">
          {engine.windowColors.map((background, index) => (
            <div
              key={index}
              className="win-cell"
              title={`SAB[${index}] row=${Math.floor(index / 16)} col=${index % 16}`}
              style={{ background }}
            />
          ))}
        </div>
      </div>
      <div className="bottom-cell">
        <div className="bottom-cell-title">WordNet Basis · Signed SPO Simplex</div>
        <div id="wordnet-panel">
          <div style={{ fontSize: 7, color: 'var(--gold2)', lineHeight: 1.8 }}>
            <div style={{ color: 'var(--dim)', marginBottom: 4 }}>{`basis: ${engine.basisHash.slice(0, 20)}…`}</div>
            {WORDNET_SIMPLEX.map((ws) => (
              <div key={ws.word} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '2px 0', borderBottom: '1px solid var(--dimmer)' }}>
                <span style={{ color: faceColor(ws.face), width: 12 }}>▸</span>
                <span style={{ width: 70, color: 'var(--gold)' }}>{ws.word}</span>
                <span style={{ color: 'var(--dim)', flex: 1 }}>{ws.synset}</span>
                <span style={{ color: 'var(--gold2)' }}>{`w=${ws.w.toFixed(3)}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-cell">
        <div className="bottom-cell-title">NDJSON CommitEvent · Schema</div>
        <div style={{ fontSize: 7, color: 'var(--gold2)', lineHeight: 1.7, overflowY: 'auto', maxHeight: 150 }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 7 }}>{engine.schemaText}</pre>
        </div>
      </div>
      <div className="bottom-cell">
        <div className="bottom-cell-title">Narrative · SPO Triple Stream</div>
        <div style={{ fontSize: 8, color: 'var(--gold2)', lineHeight: 1.8, overflowY: 'auto', maxHeight: 150, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
          {engine.narratives.map((text, index) => (
            <div key={`${index}-${text.slice(0, 16)}`} style={{ padding: '2px 0', borderBottom: '1px solid var(--dimmer)' }}>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
