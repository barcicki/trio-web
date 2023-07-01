import { useMemo, useRef } from 'react';
import { GameApis } from '@game/trio';

/**
 * Creates Game API
 * - the API is an object with methods to update game state, which will be generated once (kept same between rerenders)
 * - the methods will always use passed `state` and call `update` with new state

 * @param {string} mode - api mode to get api for
 * @param {object} state - current game state
 * @param {function} update - function to call that receives new state and should know what to do afterwards
 * @returns {object}
 */
export function useGameApi(mode, state, update) {
  const api = GameApis[mode];
  const ref = useRef();

  ref.current = {
    state,
    update
  };

  return useMemo(() => {
    const result = {};

    for (const method in api) {
      result[method] = (...args) => {
        const newState = api[method](ref.current.state, ...args);

        ref.current.update(newState);

        return newState;
      };
    }

    return result;
  }, [api, ref]);
}
