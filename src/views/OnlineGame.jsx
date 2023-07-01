import { io } from 'socket.io-client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useGameApi } from '@/hooks/useGameApi.js';
import { useTheme } from '@/hooks/useTheme.js';
import { GameHeader } from '@/components/GameHeader.jsx';
import { TbArrowsShuffle, TbCircleCheck, TbProgress } from 'react-icons/tb';
import { ThemeButton } from '@/components/ThemeButton.jsx';
import { TilesTable } from '@/components/TilesTable.jsx';
import { GameView } from '@/components/GameView.jsx';
import { ColorTag } from '@/components/ColorTag.jsx';
import { OnlineEnd } from '@/components/OnlineEnd.jsx';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { usePlayer } from '@/reducers/player.js';
import { toastErrors } from '@/utils/toast.js';

import './OnlineGame.css';

export function OnlineGame() {
  const tableEl = useRef(null);
  const roomId = useLoaderData();
  const localPlayer = usePlayer();
  const socket = useMemo(() => io(), []);

  const [theme, nextTheme, changeTheme] = useTheme();
  const [game, setGame] = useState();
  const api = useGameApi(game, setGame);

  const onSelect = useCachedCallback((tile) => api.toggleOnlineTile(tile, {
    onMiss(miss) {
      tableEl.current.shakeTiles(miss);
      toastErrors(miss, theme);
    },
    onFind(tiles) {
      socket.emit('check', { roomId, tiles });
    }
  }));
  const onReady = useCachedCallback(() => socket.emit('ready', { roomId }));

  const player = game?.players?.find((p) => p.id === localPlayer?.id);

  useEffect(() => {
    socket.on('update-game', api.updateGame);
    socket.on('update-players', api.updatePlayers);

    socket.emit('hello', localPlayer);
    socket.emit('join-game', { roomId });

    return () => {
      socket.emit('leave-game', { roomId });
    };
  }, [roomId, socket]);

  console.log(game?.players);

  return (
    <GameView className="game online limited" game={game} EndGame={OnlineEnd}>
      <GameHeader game={game}>
        <button onClick={api.shuffleTable} title="Reorder tiles"><TbArrowsShuffle/></button>
        <ThemeButton onClick={changeTheme} theme={nextTheme.id} title="Switch theme"/>
        <ColorTag className="player" color={player?.color}>{player?.score}</ColorTag>
        {game?.players
          .filter((p) => p.id !== player?.id)
          .sort((a, b) => a.online - b.online)
          .map((p) => <ColorTag key={p.id} color={p.online ? p.color : '#232323'}>{ p.score}</ColorTag>)
        }
      </GameHeader>
      {!game?.started && <div className="online-status">
        <p>Waiting for players</p>
        <div className="online-players">
          {game?.players.map((p) => <ColorTag key={p.id} className="online-player" color={p?.color}>{p.ready ? <TbCircleCheck/> : <TbProgress/>} {p.name}</ColorTag>)}
        </div>
        {!player?.ready && <button onClick={onReady}>I'm ready</button>}
      </div>}
      {game?.started && <TilesTable theme={theme.id} tiles={game.table} selected={game.selected} onSelect={onSelect} ref={tableEl}/>}
    </GameView>
  );
}
