import { Timer } from '../components/Timer.jsx';
import { useCallback, useRef, useState } from 'react';
import { createGame, toggleTile, getMatches, shuffleTable, getHint, getMatchError } from '@/game/game.js';
import { Tile, THEMES } from '@/components/Tile.jsx';
import { AnimatePresence } from 'framer-motion';
import './game.css';
import toast from 'react-hot-toast';

const GameStatus = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused'
};

export function Game({ onExit }) {
  const [themeIndex, setThemeIndex] = useState(0);
  const [status, setStatus] = useState(GameStatus.IDLE);
  const [game, setGame] = useState(null);
  const [start, setStart] = useState(null);
  const tilesEls = useRef([]);

  const theme = THEMES[themeIndex % THEMES.length];
  const nextTheme = THEMES[(themeIndex + 1) % THEMES.length];

  const tiles = game?.table.map((tile) => [tile, game.selected.includes(tile)]) || [];
  const matches = getMatches(game?.table);

  const onHint = useCallback(() => setGame(getHint(game)), [game]);
  const onReload = useCallback(() => setGame(shuffleTable(game)), [game]);
  const onThemeChange = useCallback(() => setThemeIndex(themeIndex + 1), [themeIndex]);

  const onStart = useCallback(() => {
    setGame(createGame());
    setStart(Date.now());
    setStatus(GameStatus.PLAYING);
  }, []);

  const onSelect = useCallback((tile) => {
    const next = toggleTile(game, tile);

    if (next.missed.length > game.missed.length) {
      const miss = next.missed[next.missed.length - 1];

      tiles.forEach(([tile], index) => {
        if (miss.includes(tile)) {
          tilesEls.current[index].shake();
        }
      });

      const error = getMatchError(miss)
        .map((val, index) => val ? theme.features[index] : null)
        .filter(Boolean);

      toast.remove();
      toast(`Wrong ${error.join(', ')}`);
    }

    setGame(next);
  }, [game, theme]);

  let leftControls = '';
  let rightControls = '';

  if (game) {
    leftControls = (
      <>
        <Timer className="game-timer" startTime={start}/>
        <span className="game-deck-left">Cards: <b>{game.deck.length}</b></span>
        <span className="game-trios-found">Points: <b>{game.found.length}</b></span>
        <span className="game-trios-visible">Trios: <b>{matches.length}</b></span>
      </>
    );

    rightControls = (
      <>
        <button onClick={onHint}>Hint</button>
        <button onClick={onReload}>Reorder</button>
        <button onClick={onThemeChange}>{nextTheme.label}</button>
        <button onClick={onExit}>Exit</button>
      </>
    );
  } else {
    rightControls = <button onClick={onExit}>Exit</button>;
  }

  return (
    <main className="game">
      <div className="game-controls">
        <div className="game-controls-right">{rightControls}</div>
        <div className="game-controls-left">{leftControls}</div>
      </div>
      <div className="game-tiles">
        {status === GameStatus.IDLE && <button onClick={onStart}>Start</button>}
        <AnimatePresence>
          {tiles.map(([tile, isSelected], index) => <Tile key={index} tile={tile} isSelected={isSelected}
                                                          theme={theme.id} onSelect={onSelect}
                                                          ref={(el) => tilesEls.current[index] = el} />)}
        </AnimatePresence>
      </div>
    </main>
  );
}
