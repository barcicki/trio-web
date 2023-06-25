import { createCore } from '@/game/core.js';
import { generateId, generateIdWithRandom, getSeededRandom, shuffle, shuffleWithRandom } from '@/game/utils.js';

const HASH_SEPARATOR = ';';

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
    found: [],
    missed: [],
    selected: [],
    usedHints: 0,
    started: false,
    ended: false,
    duration: 0
  };
}

export function createPuzzle(seed = generateId()) {
  const deck = getDeck();
  const random = getSeededRandom(seed);
  let table;
  let matches;

  do {
    table = shuffleWithRandom(deck, random).slice(0, 12);
    matches = getMatches(table).map((tiles) => tiles.sort());
  } while (matches.length !== 3);

  return {
    seed,
    table,
    matches,
    found: [],
    missed: [],
    selected: [],
    started: false,
    ended: false,
    duration: 0
  };
}

export function createPractice(seed = generateId()) {
  const deck = getDeck();
  const random = getSeededRandom(seed);

  let table;
  let matches;

  do {
    table = shuffleWithRandom(deck, random).slice(0, 8);
    matches = getMatches(table);
  } while (matches.length !== 1);

  const query = matches[0].slice(0, 2);

  return {
    seed,
    nextSeed: generateIdWithRandom(random),
    table: table.filter((tile) => !query.includes(tile)),
    query,
    score: 0,
    missed: 0,
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

export function startPractice(state, limit) {
  if (!limit) {
    return startGame(state);
  }

  if ((state.duration ?? 0) > limit) {
    return {
      ...state,
      ended: true
    };
  }

  return {
    ...startGame(state),
    remaining: limit - (state.duration ?? 0)
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
  const newState = handleToggleTile(state, target);

  if (newState.selected.length !== 3) {
    return newState;
  }

  const onFind = options?.onFind;
  const onMiss = options?.onMiss;
  const onEnd = options?.onEnd;

  if (!isMatch(newState.selected)) {
    onMiss?.(newState.selected);

    return handleMatchMiss(newState);
  }

  const [newTable, newDeck] = replaceTable(newState.deck, newState.table, newState.selected);

  onFind?.(newState.selected);

  newState.deck = newDeck;
  newState.table = newTable;
  newState.found.push(newState.selected);
  newState.selected = [];

  if (!hasMatch(newTable)) {
    newState.duration = Date.now() - newState.started;
    newState.started = false;
    newState.ended = true;

    onEnd?.(newState);
  }

  return newState;
}

export function togglePuzzleTile(state, target, options) {
  const newState = handleToggleTile(state, target);

  if (newState.selected.length !== 3) {
    return newState;
  }

  const onFind = options?.onFind;
  const onMiss = options?.onMiss;
  const onAlreadyFound = options?.onAlreadyFound;
  const onEnd = options?.onEnd;

  if (!isMatch(newState.selected)) {
    onMiss?.(newState.selected);

    return handleMatchMiss(newState);
  }

  const selected = newState.selected;
  const hash = selected.sort().join(HASH_SEPARATOR);
  const index = newState.matches.findIndex((tiles) => tiles.join(HASH_SEPARATOR) === hash);

  newState.selected = [];

  if (newState.found.includes(index)) {
    onAlreadyFound?.(selected);

    return newState;
  }

  newState.found.push(index);

  onFind?.(selected, index);

  if (newState.found.length === newState.matches.length) {
    newState.duration = Date.now() - newState.started;
    newState.started = false;
    newState.ended = true;

    onEnd?.(newState);
  }

  return newState;
}

export function togglePracticeTile(state, target, options) {
  const tiles = state.query.concat(target);

  if (isMatch(tiles)) {
    return {
      ...state,
      ...createPractice(state.nextSeed),
      started: state.started,
      remaining: state.remaining,
      score: state.score + 1,
      missed: state.missed,
    };
  }

  options?.onMiss?.(target, tiles);

  return {
    ...state,
    started: state.started,
    remaining: state.remaining,
    score: state.score,
    missed: state.missed + 1
  };
}

function handleToggleTile(state, target) {
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

  return {
    ...state,
    selected: newSelected
  };
}

function handleMatchMiss(state) {
  return {
    ...state,
    selected: [],
    missed: [
      ...state.missed,
      state.selected
    ]
  };
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

    return {
      ...toggleTile(state, firstMatch[0]),
      usedHints: state.usedHints + 1
    };
  }

  if (selected.length === 1) {
    const selectedTile = selected[0];
    const matchWithSelectedTile = getMatches(table).find((match) => match.includes(selectedTile));

    if (matchWithSelectedTile) {
      const nextTileToSelect = matchWithSelectedTile.find((tile) => tile !== selectedTile);

      return {
        ...toggleTile(state, nextTileToSelect),
        usedHints: state.usedHints + 1
      };
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
