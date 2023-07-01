import { generateId, shuffle } from '../utils/index.js';
import { pickTable, replaceTable, shuffleTable } from './table.js';
import { getDeck, hasMatch, isMatch, getMatches } from './base.js';
import { startGame, stopGame, endGame } from './time.js';
import { toggleTile } from './toggle.js';
import { handleMatchMiss } from './miss.js';

export function create(seed = generateId()) {
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

export function start(state) {
  return startGame(state);
}

export function stop(state) {
  return stopGame(state);
}

export function check(state) {
  if (!hasMatch(state.table)) {
    return endGame(state);
  }

  return state;
}

export function update(state, newState) {
  return {
    ...state,
    ...newState
  };
}

export function toggle(state, target, options) {
  const newState = toggleTile(state, target);

  if (newState.selected.length !== 3) {
    return newState;
  }

  const onFind = options?.onFind;
  const onMiss = options?.onMiss;

  if (!isMatch(newState.selected)) {
    onMiss?.(newState.selected);

    return handleMatchMiss(newState);
  }

  const [newTable, newDeck] = replaceTable(newState.deck, newState.table, newState.selected);

  onFind?.(newState.selected);

  newState.deck = newDeck;
  newState.table = newTable;
  newState.found = [
    ...newState.found,
    newState.selected
  ];
  newState.selected = [];

  return check(newState);
}

export function reorder(state) {
  return shuffleTable(state);
}

export function hint(state) {
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
      return hint(toggleTile(state, selectedTile));
    }
  }

  return {
    ...state
  };
}
