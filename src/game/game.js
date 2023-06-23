import { createCore } from '@/game/core.js';
import { generateId, shuffle } from '@/game/utils.js';

const { getDeck, isMatch, hasMatch, getMatches, getMatchingTile, toStyleArray, getMatchError } = createCore({
  values: ['a', 'b', 'c'],
  totalFeatures: 4
});

export function createGame(seed = generateId()) {
  const initialDeck = shuffle(getDeck(), seed);
  const [table, deck] = pickTable(initialDeck);

  return {
    seed,
    deck,
    table,
    selected: [],
    found: [],
    missed: [],
    started: false,
    ended: false,
    duration: 0
  };
}

export function startGame(state) {
  return {
    ...state,
    started: Date.now() - (state.duration ?? 0)
  };
}

export function stopGame(state) {
  return {
    ...state,
    started: false,
    duration: getDuration(state)
  };
}

export function loadGame(key) {
  const result = localStorage.getItem(key);

  return result && JSON.parse(result);
}

export function saveGame(key, game) {
  return localStorage.setItem(key, JSON.stringify(stopGame(game)));
}

export function toggleTile(state, target, options) {
  const { table, selected } = state;

  const onFind = options?.onFind;
  const onMiss = options?.onMiss;
  const onEnd = options?.onEnd;

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
    onMiss?.(newSelected);

    return {
      ...state,
      selected: [],
      missed: [
        ...state.missed,
        newSelected
      ]
    };
  }

  const [newTable, newDeck] = replaceTable(state.deck, table, newSelected);

  onFind?.(newSelected);

  const newState = {
    ...state,
    deck: newDeck,
    table: newTable,
    selected: [],
    found: [
      ...state.found,
      newSelected
    ]
  };

  if (!hasMatch(newTable)) {
    newState.duration = Date.now() - newState.started;
    newState.started = false;
    newState.ended = true;

    onEnd?.(newState);
  }

  return newState;
}

export function shuffleTable(state) {
  return {
    ...state,
    table: shuffle(state.table)
  };
}

export function getHint(state) {
  const { selected, table } = state;

  if (selected.length === 0) {
    const [firstMatch] = getMatches(table);

    return toggleTile(state, firstMatch[0]);
  }

  if (selected.length === 1) {
    const selectedTile = selected[0];
    const matchWithSelectedTile = getMatches(table).find((match) => match.includes(selectedTile));

    if (matchWithSelectedTile) {
      const nextTileToSelect = matchWithSelectedTile.find((tile) => tile !== selectedTile);

      return toggleTile(state, nextTileToSelect);
    } else {
      return getHint(toggleTile(state, selectedTile));
    }
  }


  return {
    ...state
  };
}

export function getRandomTile() {
  return shuffle(getDeck())[0];
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

export function getDuration(state) {
  return state.started ? Date.now() - state.started : (state.duration ?? 0);
}

export {
  hasMatch,
  getMatches,
  getMatchingTile,
  isMatch,
  toStyleArray,
  getMatchError
};
