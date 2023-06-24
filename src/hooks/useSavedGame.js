import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { saveGame, startGame, stopGame } from '@/game/game.js';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';

export function useSavedGame(key) {
  const savedGame = useLoaderData();
  const [game, setGame] = useState(savedGame);

  const save = useCachedCallback(() => saveGame(key, game));
  const visibility = useCachedCallback(() => setGame(document.hidden ? stopGame(game) : startGame(game)));

  // save on any game change
  useEffect(save, [game]);

  // save regularly
  useEffect(() => {
    const intervalId = setInterval(save, 1000);
    window.addEventListener('visibilitychange', visibility);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('visibilitychange', visibility);
    };
  }, [save, visibility]);

  return [game, setGame];
}
