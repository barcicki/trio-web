import { createCore } from '../core';
import { shuffle } from '../utils';

const {
  getDeck,
  isMatch,
  hasMatch,
  getMatches,
  getMatchingTile,
  toStyleArray,
  getMatchError,
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
  toStyleArray,
  getMatchError,
  countMatches,
  canMatch
};

export function getRandomTile() {
  return shuffle(getDeck())[0];
}
