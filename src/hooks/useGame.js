import { useCallback, useEffect } from 'react';
import { setGame } from '@/reducers/games.js';
import { saveData } from '@/utils/storage.js';
import { useDispatch, useSelector } from 'react-redux';
import { useIntervalEffect } from '@/hooks/useIntervalEffect.js';
import { useVisibilityChangeEffect } from '@/hooks/useVisibilityChangeEffect.js';
import { startGame, stopGame } from '@/game/game.js';
import { useGameApi } from '@/hooks/useGameApi.js';

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
  const selector = useCallback((state) => state.games[key], [key]);
  const state = useSelector(selector);

  // helpers
  const updateInStore = useCallback((state) => dispatch(setGame({ key, value: state })), [key, dispatch]);
  const updateInLocalStorage = useCallback(() => saveData(key, stopGame(state)), [key, state]);

  // create unchangeable api object reference witch access to dynamic `state` and `update`
  const api = useGameApi(state, updateInStore);

  // bind effects
  useEffect(updateInLocalStorage, [updateInLocalStorage]);
  useIntervalEffect(updateInLocalStorage, 1000);
  useVisibilityChangeEffect(() => updateInStore(document.hidden ? stopGame(state) : startGame(state)));

  return [state, api];
}
