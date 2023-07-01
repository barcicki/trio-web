import { generateId, shuffle } from '../utils/index.js';
import { getDeck, hasMatch, isMatch } from './base.js';
import { pickTable, updateTable, replaceTable, shuffleTable } from './table.js';
import { toggleTile } from './toggle.js';
import { endGame, startGame, stopGame } from './time.js';

export function create(seed = generateId()) {
  const initialDeck = shuffle(getDeck(), seed);
  const [table, deck] = pickTable(initialDeck);

  return {
    seed,
    deck,
    table,
    selected: [],
    players: [],
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
  if (!state) {
    return {
      ...newState,
      selected: []
    };
  }

  const newSelected = state.selected.filter((t) => newState.table.includes(t));
  const newTable = updateTable(state.table, newState.table);

  return {
    ...newState,
    selected: newSelected,
    table: newTable
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

    return {
      ...state,
      selected: []
    };
  }

  onFind?.(newState.selected);

  return newState;
}

export function replace(state, tiles) {
  const [newTable, newDeck] = replaceTable(state.deck, state.table, tiles);

  return {
    ...state,
    deck: newDeck,
    table: newTable
  };
}

export function reorder(state) {
  return shuffleTable(state);
}
