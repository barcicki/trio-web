import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GameTypes } from '@game/trio';
import { LocalGame } from '@/components/Game/LocalGame.jsx';
import { useTheme } from '@/hooks/useTheme.js';
import { usePlayer } from '@/reducers/player.js';

export function Practice({ limit }) {
  const config = {
    type: GameTypes.MATCH,
    matchLimit: null,
    tableSize: 6,
    timeLimit: limit
  };

  const [game, setGame] = useState();
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
      onUpdate={setGame}
      endMessage="Time-limited practice completed."
      endDetails={(game) => ({
        'Found trios': game.currentPlayer.found.length,
        'Miss-clicks': game.currentPlayer.missed.length
      })}
      endActions={(
        <>
          <Link className="button" to="/">Home</Link>
          <Link className="button primary" onClick={() => setGame(null)}>Restart</Link>
        </>
      )}
    />
  );
}
