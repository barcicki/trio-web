import { Timer } from '../components/Timer.jsx';
import { useRef, useState } from 'react';
import { createGame, toggleTile, getMatches, shuffleTable, getHint } from '@/game/game.js';
import { Tile } from '@/components/Tile.jsx';
import { AnimatePresence } from 'framer-motion';
import './game.css';

const GameStatus = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused'
};

const THEMES = [
  {
    label: 'Shapes',
    id: 'shapes'
  },
  {
    label: 'Shields',
    id: 'shields'
  },
];

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

  let leftControls = '';
  let rightControls = '';

  if (game) {
    leftControls = (
      <>
        <Timer className="game-timer" startTime={start}/>
        <span className="game-deck-left">Cards: <b>{game.deck.length}</b></span>
        <span className="game-trios-found">Trios: <b>{game.found.length}</b></span>
      </>
    );

    rightControls = (
      <>
        <button onClick={() => setGame(getHint(game))}>Hint</button>
        <button onClick={() => setGame(shuffleTable(game))}>Reorder</button>
        <button onClick={() => setThemeIndex(themeIndex + 1)}>{nextTheme.label}</button>
        <button onClick={() => onExit()}>Exit</button>
      </>
    );
  } else {
    rightControls = <button onClick={() => onExit()}>Exit</button>;
  }

  return (
    <main className="game">
      <div className="game-controls">
        <div className="game-controls-right">{rightControls}</div>
        <div className="game-controls-left">{leftControls}</div>
      </div>
      <div className="game-tiles">
        {status === GameStatus.IDLE && <button onClick={() => {
          setGame(createGame());
          setStart(Date.now());
          setStatus(GameStatus.PLAYING);
        }}>Start</button>}
        <AnimatePresence>
          {tiles.map(([tile, isSelected], index) => <Tile key={index} tile={tile} isSelected={isSelected}
                                                          theme={theme.id} onClick={() => handleTile(tile)}
                                                          ref={(el) => tilesEls.current[index] = el} />)}
        </AnimatePresence>
      </div>
    </main>
  );

  function handleTile(tile) {
    const next = toggleTile(game, tile);

    if (next.missed.length > game.missed.length) {
      const miss = next.missed[next.missed.length - 1];

      tiles.forEach(([tile], index) => {
        if (miss.includes(tile)) {
          tilesEls.current[index].shake();
        }
      });
    }

    setGame(next);
  }
}
