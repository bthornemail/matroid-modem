/// <reference types="vite/client" />

declare module '*.html?raw' {
  const content: string;
  export default content;
}

declare module '*.js?raw' {
  const content: string;
  export default content;
}

interface WesiriBridge {
  renderMode: 'react';
  onCommit?: (commit: Record<string, unknown>) => void;
  onNarratives?: (items: string[]) => void;
  onTickStatus?: (status: { lc: number; tick: number; angle: number }) => void;
  onCentroidStatus?: (status: { stopMetric: number; sabbath: boolean }) => void;
  onBasisHash?: (basisHash: string) => void;
  onWindowColors?: (colors: string[]) => void;
  onSPO?: (rows: Array<{ id: number; name: string; color: string; q: string; role: string; repl: string; io: string }>) => void;
  onFaces?: (faces: Array<{ face_id: string; vertices: number[]; status: string; invariant_name: string }>) => void;
  onCentroidPanel?: (data: { stopMetric: number; sabbath: boolean }) => void;
}

interface Window {
  __wesiriBridge?: WesiriBridge;
}
