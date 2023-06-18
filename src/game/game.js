import { createCore } from '@/game/core.js';
import { generateId, shuffle } from '@/game/utils.js';

const { createDeck, isMatch, hasMatch, getMatches, getMatchingTile, toStyleArray } = createCore({
  values: ['a', 'b', 'c'],
  totalFeatures: 4
});

window.cc = createCore;

export function createGame(seed = generateId()) {
  const initialDeck = shuffle(createDeck(), seed);
  const [table, deck] = pickTable(initialDeck);

  return {
    seed,
    deck,
    table,
    selected: [],
    found: []
  };
}

export function toggleTile(state, target) {
  const { table, selected } = state;

  if (!table.includes(target)) {
    return state;
  }

  // tile is selected, should be deselected
  if (selected.includes(target)) {
    return {
      ...state,
      selected: selected.filter((tile) => tile !== target)
    };
  }

  const newSelected = selected.concat(target);

  // there are fewer than 3 selected tiles, nothing happens
  if (newSelected.length < 3) {
    return {
      ...state,
      selected: newSelected
    };
  }

  // not a trio, reset selected
  if (!isMatch(newSelected)) {
    return {
      ...state,
      selected: []
    };
  }

  const [newTable, newDeck] = replaceTable(state.deck, table, newSelected);

  return {
    ...state,
    deck: newDeck,
    table: newTable,
    selected: [],
    found: state.found.concat(newSelected)
  };
}

function pickTable(deck, minTiles = 12, maxTiles = 20) {
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

function replaceTable(deck, table, selected, minTiles = 12, maxTiles = 20) {
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

export {
  hasMatch,
  getMatches,
  getMatchingTile,
  isMatch,
  toStyleArray
};
