import createSeededRandom from 'seedrandom';

export function getSeededRandom(seed) {
  return createSeededRandom(seed).quick;
}
