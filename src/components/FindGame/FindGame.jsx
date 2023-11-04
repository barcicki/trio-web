import { GameModes, GameTypes, TargetTypes } from '@/game/trio';
import { Link, useLoaderData } from 'react-router-dom';
import { LocalGame } from '@/components/Game/LocalGame.jsx';

import { useTheme } from '@/hooks/useTheme.js';
import { useLocalGame } from '@/hooks/useLocalGame.js';
import { usePlayer } from '@/reducers/player.js';

export function FindGame() {
  const seed = useLoaderData();

  const config = {
    type: GameTypes.FIND,
    target: TargetTypes.DECK,
    tableSize: 12,
    hintsLimit: null,
    seed
  };

  const [game, updateGame] = useLocalGame(GameModes.SINGLE);
  const [theme, nextTheme, changeTheme] = useTheme();
  const player = usePlayer();

  return (
    <LocalGame
      backPath=".."
      config={config}
      game={game}
      theme={theme.id}
      nextTheme={nextTheme.id}
      onThemeSwitch={changeTheme}
      showPlayers={false}
      player={player}
      onUpdate={updateGame}
      endMessage="You have found all hidden trios."
      endDetails={(game) => ({
        'Trios found': game.currentPlayer.found.length,
        'Miss-clicks': game.currentPlayer.missed.length,
        'Used hints': game.currentPlayer.hints
      })}
      endActions={(
        <>
          <Link className="button" to="/">Home</Link>
          <Link className="button primary" to="../new" replace={true}>New game</Link>
        </>
      )}
    />
  );
}
