import { useTheme } from '@/hooks/useTheme.js';
import { usePlayer } from '@/reducers/player.js';
import { Link, useLoaderData } from 'react-router-dom';
import { useLocalGame } from '@/hooks/useLocalGame.js';

import { GameModes, GameTypes, TargetTypes } from '@/game/trio';
import { LocalGame } from '@/components/Game/LocalGame.jsx';

export function Puzzle() {
  const seed = useLoaderData();

  const config = {
    type: GameTypes.FIND,
    target: TargetTypes.GOAL,
    goalSize: 3,
    tableSize: 12,
    hintsLimit: 3,
    seed
  };

  const [game, updateGame] = useLocalGame(GameModes.PUZZLE);
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
      endMessage="You have found all 3 hidden trios."
      endDetails={(game) => ({
        'Miss-clicks': game.currentPlayer.missed.length,
        'Used hints': game.currentPlayer.hints
      })}
      endActions={(
        <>
          <Link className="button" to="/">Home</Link>
          <Link className="button primary" to="../new" replace={true}>New puzzle</Link>
        </>
      )}
    />
  );
}

