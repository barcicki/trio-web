import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { GameView } from '@/components/Game/GameView.jsx';
import { OnlineResults } from '@/components/Online/OnlineResults.jsx';
import { OnlineQueue } from '@/components/Online/OnlineQueue.jsx';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { useTheme } from '@/hooks/useTheme.js';
import { usePlayer } from '@/reducers/player.js';
import { toastAlreadyFound, toastErrors } from '@/utils/toast.js';
import { getHintsConfig, getStatusConfig, getGoals, getPlayers } from '@/utils/game.js';
import { createGame } from '@/game/trio';
import { THEMES } from '@/components/Tile.jsx';

import './OnlineGame.css';

export function OnlineGame() {
  const roomId = useLoaderData();
  const player = usePlayer();
  const [localTheme, nextTheme, changeTheme] = useTheme();
  const [replays, setReplays] = useState(0);
  const [game, setGame] = useState();
  const [config, setConfig] = useState();
  const [theme, setTheme] = useState(localTheme.id);
  const socket = useMemo(() => io(), [replays]);

  const api = createGame(config, game)
    .join(player);

  const [currentPlayer, otherPlayers] = getPlayers(api, player.id);

  const onUpdate = useCachedCallback(({ config, state, theme }) => {
    setConfig(config);
    setGame(api.sync(state).state);

    if (config.theme && !config.canChangeTheme) {
      setTheme(theme);
    }
  });

  const onReady = useCachedCallback(() => socket.emit('ready', { roomId }));
  const onReorder = useCachedCallback(() => setGame(api.reorder().state));
  const onHint = useCachedCallback(() => setGame(api.hint(player.id).state));

  const onSelect = useCachedCallback((tile, table) => {
    const result = api.check(player.id, tile);

    if (result.valid && (!result.match || result.error)) {
      table.shakeTiles(currentPlayer.selected.concat(tile));
      socket.emit('miss', {
        roomId,
        tiles: result.tiles
      });

      if (result.miss) {
        toastErrors(result.miss, THEMES.find((t) => t.id === theme) || THEMES[0]);
      } else if (result.error) {
        toastAlreadyFound();
      }
    }

    if (result.valid && result.match) {
      socket.emit('check', {
        roomId,
        tiles: result.tiles
      });
    } else {
      setGame(api.toggle(currentPlayer.id, tile).state);
    }
  });

  useEffect(() => {
    socket.on('sync', onUpdate);
    socket.emit('hello', player);
    socket.emit('join-game', { roomId });

    return () => {
      socket.off('sync', onUpdate);
      socket.emit('leave-game', { roomId });
    };
  }, [roomId, socket]);

  useEffect(() => {
    if (config?.canChangeTheme !== false) {
      setTheme(localTheme.id);
    }
  }, [config, setTheme, localTheme.id]);

  return (
    <>
      {!game && <p className="centered">Connecting...</p>}
      {game && !game.started && !game.ended && <OnlineQueue
        currentPlayer={currentPlayer}
        otherPlayers={otherPlayers}
        onReady={onReady}
      />}
      {game && (game.started || game.ended) && <GameView
        backPath=".."
        {...api.state}
        {...getStatusConfig(api, player.id)}
        {...getHintsConfig(api, player.id)}
        goals={getGoals(api)}
        theme={theme}
        showPlayers={true}
        currentPlayer={currentPlayer}
        otherPlayers={otherPlayers}
        selected={currentPlayer.selected}
        nextTheme={nextTheme.id}
        onThemeSwitch={changeTheme}
        onHint={onHint}
        onSelect={onSelect}
        onReorder={onReorder}
        endShowTime={false}
        endShowHeader={false}
        endBody={<OnlineResults players={api.state.players}/>}
        endActions={(
          <>
            <Link className="button" to="/">Home</Link>
            <Link className="button primary" onClick={() => {
              setGame(null);
              setReplays(replays + 1);
            }}>Play again</Link>
          </>
        )}
      />}
    </>
  );
}
