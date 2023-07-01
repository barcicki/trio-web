import { useMemo, useRef } from 'react';
import {
  endGame,
  showHint,
  shuffleTable,
  startGame,
  stopGame,
  toggleOnlineTile,
  togglePracticeTile,
  togglePuzzleTile,
  toggleTile,
  updateGame,
  updatePlayers
} from '@/game/game.js';

const PUBLIC_GAME_API = {
  startGame,
  stopGame,
  showHint,
  toggleTile,
  toggleOnlineTile,
  togglePuzzleTile,
  togglePracticeTile,
  shuffleTable,
  endGame,
  updateGame,
  updatePlayers
};

/**
 * Creates Game API
 * - the API is an object with methods to update game state, which will be generated once (kept same between rerenders)
 * - the methods will always use passed `state` and call `update` with new state

 * @param {object} state - current game state
 * @param {function} update - function to call that receives new state and should know what to do afterwards
 * @returns {object}
 */
export function useGameApi(state, update) {
  const ref = useRef();

  ref.current = {
    state,
    update
  };

  return useMemo(() => {
    const result = {};

    for (const method in PUBLIC_GAME_API) {
      result[method] = (...args) => {
        const newState = PUBLIC_GAME_API[method](ref.current.state, ...args);

        ref.current.update(newState);

        return newState;
      };
    }

    return result;
  }, [ref]);
}
