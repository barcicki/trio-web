import { createCore } from '../core/index.js';
import { shuffle } from '../utils/index.js';

const {
  getDeck,
  isMatch,
  hasMatch,
  getMatches,
  getMatchingTile,
  toStyleArray,
  getMatchError,
  getFeatureTiles,
  getSharedFeatures,
  countMatches,
  canMatch
} = createCore({
  values: ['a', 'b', 'c'],
  totalFeatures: 4
});

export {
  getDeck,
  isMatch,
  hasMatch,
  getMatches,
  getMatchingTile,
  getFeatureTiles,
  getSharedFeatures,
  toStyleArray,
  getMatchError,
  countMatches,
  canMatch
};

export function getRandomTile() {
  return shuffle(getDeck())[0];
}

export function getRandomTiles(count) {
  return shuffle(getDeck()).slice(0, count);
}

export function getRandomTrio() {
  const tiles = getRandomTiles(2);

  return [...tiles, getMatchingTile(tiles)];
}

