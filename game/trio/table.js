import { hasMatch } from './base.js';
import { shuffle } from '../utils';

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

export function replaceTable(deck, table, selected, minTiles = 12, maxTiles = 20) {
  const newDeck = deck.slice();
  const newTable = [];
  let index = 0;
  let tilesToReplace = Math.max(minTiles - (table.length - selected.length), 0);

  while (index < table.length) {
    const tile = table[index++];

    if (!selected.includes(tile)) {
      newTable.push(tile);
    } else if (newDeck.length && tilesToReplace) {
      newTable.push(newDeck.shift());
      tilesToReplace--;
    }
  }

  while (!hasMatch(newTable) && newDeck.length && newTable.length < maxTiles) {
    newTable.push(newDeck.shift());
  }

  return [newTable, newDeck];
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
