import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { Timer } from '@/components/Timer.jsx';
import { Tile, THEMES } from '@/components/Tile.jsx';
import { getHint, getMatchError, getMatches, saveGame, shuffleTable, toggleTile } from '@/game/game.js';

import './game.css';

export function Game() {
  const savedGame = useLoaderData();
  const [game, setGame] = useState(savedGame);
  const tilesEls = useRef([]);

  const theme = getTheme(game);
  const nextTheme = getNextTheme(game);
  const tiles = useMemo(() => game.table.map((tile) => [tile, game.selected.includes(tile)]) || [], [game]);
  const matches = getMatches(game.table);

  const onThemeChange = useCallback(() => setGame({ ...game, theme: nextTheme.id }), [game, nextTheme]);
  const onHint = useCallback(() => setGame(getHint(game)), [game]);
  const onReorder = useCallback(() => setGame(shuffleTable(game)), [game]);
  const onSelect = useCallback((tile) => setGame(toggleTile(game, tile, {
    onMiss(miss) {
      tiles.forEach(([tile], index) => {
        if (miss.includes(tile)) {
          tilesEls.current[index].shake();
        }
      });

      const invalidFeatures = getMatchError(miss)
        .map((val, index) => val ? theme.features[index] : null)
        .filter(Boolean);

      console.log(invalidFeatures);

      toast.remove();
      toast(`Wrong ${invalidFeatures.join(', ')}`);
    }
  })), [game, tiles, tilesEls, theme]);

  const save = useCallback(() => saveGame('game', game), [game]);

  useEffect(save, [save]);

  useEffect(() => {
    const intervalId = setInterval(save, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <main className="game limited">
      <div className="game-controls">
        <div className="game-controls-right">
          <button onClick={onHint}>Hint</button>
          <button onClick={onReorder}>Reorder</button>
          <button onClick={onThemeChange}>{nextTheme.label}</button>
          <Link className="button" to="/">Exit</Link>
        </div>
        <div className="game-controls-left">
          <Timer className="game-timer" {...getTimerProps(game)}/>
          <span className="game-deck-left">Deck: <b>{game.deck.length}</b></span>
          <span className="game-trios-found">Points: <b>{game.found.length}</b></span>
          <span className="game-trios-visible">Trios: <b>{matches.length}</b></span>
        </div>
      </div>
      {game.ended && <h2 className="game-end">Well done!</h2>}
      <div className="game-tiles">
        <AnimatePresence>
          {tiles.map(([tile, isSelected], index) => <Tile key={index} tile={tile} isSelected={isSelected}
                                                          theme={theme.id} onSelect={onSelect}
                                                          ref={(el) => tilesEls.current[index] = el} />)}
        </AnimatePresence>
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

function getTheme(game) {
  const theme = THEMES.find((t) => t.id === game.theme);

  return theme || THEMES[0];
}

function getNextTheme(game) {
  const index = THEMES.findIndex((t) => t.id === game.theme);

  if (index < 0) {
    return THEMES[1]; // assuming it exists :)
  }

  return THEMES[(index + 1) % THEMES.length];
}
