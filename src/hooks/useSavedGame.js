import { useCallback, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { saveGame } from '@/game/game.js';

export function useSavedGame(key) {
  const savedGame = useLoaderData();
  const [game, setGame] = useState(savedGame);

  const save = useCallback(() => saveGame(key, game), [key, game]);

  // save on any game change
  useEffect(save, [save]);

  // save regularly
  useEffect(() => {
    const intervalId = setInterval(save, 1000);

    return () => clearInterval(intervalId);
  });

  return [game, setGame];
}
