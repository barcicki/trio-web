import { useCallback, useMemo, useRef } from 'react';
import { TbArrowsShuffle, TbBulb } from 'react-icons/tb';

import { ThemeButton } from '@/components/ThemeButton.jsx';
import { TilesTable } from '@/components/TilesTable.jsx';
import { GameHeader } from '@/components/GameHeader.jsx';
import { Details } from '@/components/Details.jsx';
import { THEMES } from '@/components/Tile.jsx';
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
      <GameHeader game={game}>
        <button onClick={onHint} title="Show hint"><TbBulb/></button>
        <button onClick={onReorder} title="Reorder tiles"><TbArrowsShuffle/></button>
        <ThemeButton onClick={onThemeChange} theme={nextTheme.id} title="Switch theme"/>
      </GameHeader>
      <Details horizontal={true} details={{
        Deck: game.deck.length,
        Visible: matches.length,
        Found: game.found.length
      }}/>
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
