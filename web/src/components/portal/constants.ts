export const ESP_NODES = [
  { id: 'esp-s3-00', state: 'sealed', metric: 1.0, color: '#00ff44' },
  { id: 'esp-c3-01', state: 'validated', metric: 0.71, color: '#ffee00' },
  { id: 'esp-c3-02', state: 'validated', metric: 0.57, color: '#ffee00' },
  { id: 'esp-c3-03', state: 'pending', metric: 0.28, color: '#ff8800' },
  { id: 'esp-c3-04', state: 'pending', metric: 0.14, color: '#ff8800' },
];

export const WORDNET_SIMPLEX = [
  { word: 'Freedom', synset: 'freedom.n.01', w: 0.25, face: 'agency' },
  { word: 'Grace', synset: 'grace.n.03', w: 0.375, face: 'ethics' },
  { word: 'Yes', synset: 'yes.n.01', w: 0.125, face: 'logic' },
  { word: 'Stop', synset: 'stop.v.01', w: 0.3125, face: 'logic' },
  { word: 'Love', synset: 'love.n.01', w: 0.4375, face: 'ethics' },
  { word: 'Sovereignty', synset: 'sovereignty.n.01', w: 0.3125, face: 'agency' },
];

export function faceColor(face: string): string {
  if (face === 'agency') return '#00ff44';
  if (face === 'ethics') return '#ffee00';
  return '#ff8800';
}
