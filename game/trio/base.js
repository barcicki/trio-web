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
  toStyleArray,
  getMatchError,
  countMatches,
  canMatch
};

export function getRandomTile() {
  return shuffle(getDeck())[0];
}

export function getRandomTrio() {
  const tiles = shuffle(getDeck()).slice(0, 2);

  return [...tiles, getMatchingTile(tiles)];
}

