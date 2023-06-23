import { useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

import { THEMES } from '@/components/Tile.jsx';
import { GameTimer } from '@/components/GameTimer.jsx';
import { TilesTable } from '@/components/TilesTable.jsx';
import { useSavedGame } from '@/hooks/useSavedGame.js';
import { getHint, getMatches,  shuffleTable, toggleTile } from '@/game/game.js';
import { toastErrors } from '@/utils/toast.js';

import './game.css';

export function Game() {
  const [game, setGame] = useSavedGame('game');
  const tableEl = useRef(null);

  const theme = getTheme(game);
  const nextTheme = getNextTheme(game);
  const tiles = useMemo(() => game.table.map((tile) => [tile, game.selected.includes(tile)]) || [], [game]);
  const matches = getMatches(game.table);

  const onThemeChange = useCallback(() => setGame({ ...game, theme: nextTheme.id }), [game, nextTheme]);
  const onHint = useCallback(() => setGame(getHint(game)), [game]);
  const onReorder = useCallback(() => setGame(shuffleTable(game)), [game]);
  const onSelect = useCallback((tile) => setGame(toggleTile(game, tile, {
    onMiss(miss) {
      tableEl.current.shakeTiles(miss);
      toastErrors(miss, theme);
    }
  })), [game, tiles, theme]);

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
          <GameTimer game={game}/>
          <span className="game-deck-left">Deck: <b>{game.deck.length}</b></span>
          <span className="game-trios-found">Points: <b>{game.found.length}</b></span>
          <span className="game-trios-visible">Trios: <b>{matches.length}</b></span>
        </div>
      </div>
      {game.ended && <h2 className="game-end">Well done!</h2>}
      <TilesTable theme={theme.id} tiles={game.table} selected={game.selected} onSelect={onSelect} ref={tableEl}/>
    </main>
  );
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
