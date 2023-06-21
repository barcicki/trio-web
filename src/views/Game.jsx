import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { Timer } from '@/components/Timer.jsx';
import { Tile, THEMES } from '@/components/Tile.jsx';
import { getMatchError, getMatches } from '@/game/game.js';
import { GameActions, useGame, useGameDispatcher } from '@/GameProvider.jsx';

import './game.css';

export function Game() {
  const game = useGame();
  const dispatcher = useGameDispatcher();
  const [themeIndex, setThemeIndex] = useState(0);
  const tilesEls = useRef([]);

  const theme = THEMES[themeIndex % THEMES.length];
  const nextTheme = THEMES[(themeIndex + 1) % THEMES.length];
  const tiles = useMemo(() => game.table.map((tile) => [tile, game.selected.includes(tile)]) || [], [game]);
  const matches = getMatches(game.table);

  const onThemeChange = useCallback(() => setThemeIndex(themeIndex + 1), [themeIndex]);

  const onExit = useCallback(() => dispatcher({
    type: GameActions.STOP
  }), [dispatcher]);

  const onHint = useCallback(() => dispatcher({
    type: GameActions.HINT
  }), [dispatcher]);

  const onReorder = useCallback(() => dispatcher({
    type: GameActions.REORDER_TABLE
  }), [dispatcher]);

  const onStart = useCallback(() => dispatcher({
    type: GameActions.START
  }), [dispatcher]);

  const onSelect = useCallback((tile) => dispatcher({
    type: GameActions.TOGGLE_TILE,
    tile,
    onMiss(miss) {
      tiles.forEach(([tile], index) => {
        if (miss.includes(tile)) {
          tilesEls.current[index].shake();
        }
      });

      const invalidFeatures = getMatchError(miss)
        .map((val, index) => val ? theme.features[index] : null)
        .filter(Boolean);

      toast.remove();
      toast(`Wrong ${invalidFeatures.join(', ')}`);
    }
  }), [dispatcher, tiles, theme]);

  let rightControls = '';

  if (game.started) {
    rightControls = (
      <>
        <button onClick={onHint}>Hint</button>
        <button onClick={onReorder}>Reorder</button>
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
        <div className="game-controls-left">
          <Timer className="game-timer" {...getTimerProps(game)}/>
          <span className="game-deck-left">Deck: <b>{game.deck.length}</b></span>
          <span className="game-trios-found">Points: <b>{game.found.length}</b></span>
          {game.started && <span className="game-trios-visible">Trios: <b>{matches.length}</b></span>}
        </div>
      </div>
      <div className="game-tiles">
        {!game.started && <button onClick={onStart}>Start</button>}
        {game.started && <AnimatePresence>
          {tiles.map(([tile, isSelected], index) => <Tile key={index} tile={tile} isSelected={isSelected}
                                                          theme={theme.id} onSelect={onSelect}
                                                          ref={(el) => tilesEls.current[index] = el} />)}
        </AnimatePresence>}
      </div>
    </main>
  );
}

function getTimerProps(game) {
  if (game.started) {
    return {
      startTime: game.started
    };
  }

  if (game.duration) {
    const now = Date.now();

    return {
      startTime: now - game.duration,
      stopTime: now
    };
  }

  return {};
}
