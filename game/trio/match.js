import { getMatchingTile } from './base.js';
import { pickUniqueTiles } from './table.js';
import { shuffleWithRandom } from '../utils/index.js';

export function createMatchTable(initialDeck, random, tableSize, predefinedMatchTiles) {
  const deck = shuffleWithRandom(initialDeck, random);
  const matchTiles = predefinedMatchTiles ?? deck.slice(0, 2);
  const matchingTile = getMatchingTile(matchTiles);
  const randomTiles = pickUniqueTiles(deck, tableSize - 1, [...matchTiles, matchingTile]);

  return [shuffleWithRandom([matchingTile, ...randomTiles], random), matchTiles];
}
