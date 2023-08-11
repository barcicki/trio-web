import { getMatches, hasMatch } from './base.js';
import { shuffle, shuffleWithRandom } from '../utils/index.js';

export function pickTable(deck, minTiles = 12, maxTiles = 20) {
  const newDeck = deck.slice();
  const newTable = [];

  while (newTable.length < minTiles && newDeck.length) {
    newTable.push(newDeck.shift());
  }

  while (!hasMatch(newTable) && newDeck.length && newTable.length < maxTiles) {
    newTable.push(newDeck.shift());
  }

  return [newTable, newDeck];
}

export function pickUniqueTiles(deck, count, picked) {
  const result = [];
  let index = 0;

  while (result.length < count && index <= deck.length) {
    const next = deck[index++];

    if (!picked || !picked.includes(next)) {
      result.push(next);
    }
  }

  return result;
}

export function createTable(initialDeck, random, tableSize, matchesSize, omit) {
  let table;
  let matches;

  do {
    table = pickUniqueTiles(shuffleWithRandom(initialDeck, random), tableSize, omit);
    matches = getMatches(table).map((tiles) => tiles.sort());
  } while (matches.length !== matchesSize);

  return [table, matches];
}

export function replaceTiles(table, toReplace, mutatedPool, limit) {
  let tableIndex = 0;
  const result = [];
  let replaceSlots = Math.max(limit - (table.length - toReplace.length), 0);

  while (tableIndex < table.length) {
    const tile = table[tableIndex++];

    if (!toReplace.includes(tile)) {
      result.push(tile);
    } else if (mutatedPool.length && replaceSlots) {
      result.push(mutatedPool.shift());
      replaceSlots--;
    }
  }

  return result;
}

export function replaceTableWithDeck(deck, table, selected, minTiles = 12, maxTiles = 20) {
  const newDeck = deck.slice();
  const newTable = replaceTiles(table, selected, newDeck, minTiles);

  while (!hasMatch(newTable) && newDeck.length && newTable.length < maxTiles) {
    newTable.push(newDeck.shift());
  }

  return [newTable, newDeck];
}

export function replaceTableWithRandom(deck, table, selected, random, tableSize = 12) {
  const availableDeck = deck.filter((tile) => !table.includes(tile));
  let newTable;

  do {
    const shuffledDeck = shuffleWithRandom(availableDeck, random);
    newTable = replaceTiles(table, selected, shuffledDeck, tableSize);
  } while (!hasMatch(newTable));

  return newTable;
}

export function updateTable(prev, next) {
  const missing = next.filter((t) => !prev.includes(t));
  const result = [];

  prev.forEach((tile) => {
    if (next.includes(tile)) {
      result.push(tile);
    } else if (missing.length) {
      result.push(missing.shift());
    }
  });

  return result.concat(missing);
}

export function shuffleTable(state) {
  return {
    ...state,
    table: shuffle(state.table)
  };
}

export function getHash(table) {
  return table.slice().sort().join('-');
}
