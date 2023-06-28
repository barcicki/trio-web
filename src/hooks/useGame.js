import {
  showHint,
  shuffleTable,
  togglePracticeTile,
  togglePuzzleTile,
  toggleTile,
  endPractice,
  startGame,
  stopGame
} from '@/game/game.js';
import { useCallback, useEffect } from 'react';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { setGame } from '@/reducers/games.js';
import { saveData } from '@/utils/storage.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLiveMemo } from '@/hooks/useLiveMemo.js';

const PUBLIC_API = {
  startGame,
  stopGame,
  showHint,
  toggleTile,
  togglePuzzleTile,
  togglePracticeTile,
  shuffleTable,
  endPractice
};

/**
 * Returns game state and API for controlling it
 * - the game is stored in localStorage and redux store under `key`
 * - the game is automatically paused when browser tab becomes hidden
 * - the game is saved in localStorage every second
 * - the api object is kept the same between the rerenders
 * - the api exposes simple methods with access to game state and dispatcher through useRef
 *
 * It assumes that game object has already been initiated in the store - it would fail if there's no game present
 *
 * @param {string} key
 * @returns {[object, object]}
 */
export function useGame(key) {
  const dispatch = useDispatch();

  // create helper methods, cached
  const selector = useCallback((state) => state.games[key], [key]);
  const updateInStore = useCallback((state) => dispatch(setGame({
    key,
    value: state
  })), [key, dispatch]);
  const updateInLocalStorage = useCachedCallback(() => saveData(key, stopGame(state)));
  const onVisibilityChange = useCachedCallback(() => updateInStore(document.hidden ? stopGame(state) : startGame(state)));

  // get current state of the game
  const state = useSelector(selector);

  // create unchangeable api object reference witch access to dynamic `state` and `update`
  const api = useLiveMemo((ref) => buildGameApi(PUBLIC_API, key, ref), {
    state,
    update: updateInStore
  });

  // save on any game change
  useEffect(updateInLocalStorage, [state]);

  // save regularly
  useEffect(() => {
    const intervalId = setInterval(updateInLocalStorage, 1000);
    return () => clearInterval(intervalId);
  }, [updateInLocalStorage]);

  // toggle pause when browser tab changes visibility
  useEffect(() => {
    window.addEventListener('visibilitychange', onVisibilityChange);
    return () => window.removeEventListener('visibilitychange', onVisibilityChange);
  }, [onVisibilityChange]);

  return [state, api];
}

/**
 * Creates object "proxy".
 * Given `api` equal to `{ method(state) -> state }`, it would produce `{ method() }` object that would assume that
 * input `state` can be taken from `ref.current.state` and then the result of the method can be passed to
 * `ref.current.update` to trigger update
 *
 * @param {object} api
 * @param {string} key
 * @param {Ref} ref
 * @returns {object}
 */
function buildGameApi(api, key, ref) {
  const result = {};

  for (const method in api) {
    result[method] = (...args) => {
      const newState = api[method](ref.current.state, ...args);

      ref.current.update(newState);

      return newState;
    };
  }

  return result;
}
