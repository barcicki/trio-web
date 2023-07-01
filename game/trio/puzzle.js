import { generateId, getSeededRandom, shuffleWithRandom } from '../utils/index.js';
import { getMatches, getDeck, isMatch } from './base.js';
import { endGame, startGame, stopGame } from './time.js';
import { handleMatchMiss } from './miss.js';
import { toggleTile } from './toggle.js';
import { shuffleTable } from './table.js';

const HASH_SEPARATOR = ';';

export function create(seed = generateId()) {
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

export function start(state) {
  return startGame(state);
}

export function stop(state) {
  return stopGame(state);
}

export function check(state) {
  if (!state.found.length === state.matches.length) {
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
  const onAlreadyFound = options?.onAlreadyFound;

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

  newState.found = [
    ...newState.found,
    index
  ];

  onFind?.(selected, index);

  return check(newState);
}

export function reorder(state) {
  return shuffleTable(state);
}
