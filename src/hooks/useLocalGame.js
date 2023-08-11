import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gamesSelector, setGame } from '@/reducers/games.js';
import { stopGame } from '@/game/trio/time.js';

export function useLocalGame(key) {
  const game = useSelector((state) => gamesSelector(state, key));
  const dispatch = useDispatch();
  const onUpdate = useCallback((game) => dispatch(setGame({
    key,
    value: stopGame(game)
  })), [key, dispatch]);

  return [game, onUpdate];
}
