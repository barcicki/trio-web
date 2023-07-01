import { generateId, generateIdWithRandom, getSeededRandom, shuffle, shuffleWithRandom } from '../utils/index.js';
import { getMatches, getDeck, isMatch } from './base.js';
import { endGame, startGameWithTimeLimit, stopGame } from './time.js';
import { shuffleTable } from './table.js';

export function create(seed = generateId()) {
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
    table: shuffle(table.filter((tile) => !query.includes(tile))),
    query,
    score: 0,
    missed: 0,
    started: false,
    ended: false,
    duration: 0
  };
}

export function start(state, limit) {
  return startGameWithTimeLimit(state, limit);
}

export function stop(state) {
  return stopGame(state);
}

export function check(state) {
  return endGame(state);
}

export function update(state, newState) {
  return {
    ...state,
    ...newState
  };
}

export function toggle(state, target, options) {
  const tiles = state.query.concat(target);

  if (isMatch(tiles)) {
    return {
      ...state,
      ...create(state.nextSeed),
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

export function reorder(state) {
  return shuffleTable(state);
}
