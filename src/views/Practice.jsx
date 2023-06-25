import { useRef } from 'react';
import { GameHeader } from '@/components/GameHeader.jsx';
import { ThemeButton } from '@/components/ThemeButton.jsx';
import { TilesTable } from '@/components/TilesTable.jsx';
import { Tile } from '@/components/Tile.jsx';
import { getNextTheme, getTheme, setTheme } from '@/utils/theme.js';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { useSavedGame } from '@/hooks/useSavedGame.js';
import { togglePracticeTile } from '@/game/game.js';
import { toastErrors } from '@/utils/toast.js';

import './Practice.css';

export function Practice({ limit }) {
  const [practice, setPractice] = useSavedGame('practice');
  const tableEl = useRef();

  const theme = getTheme(practice);
  const nextTheme = getNextTheme(practice);

  const onThemeChange = useCachedCallback(() => setPractice(setTheme(practice, nextTheme)));
  const onSelect = useCachedCallback((tile) => setPractice(togglePracticeTile(practice, tile, {
    onMiss(tile, tiles) {
      tableEl.current.shakeTile(tile);
      toastErrors(tiles, theme);
    }
  })));

  const status = <>
    <span className="practice-score">Score: <strong>{practice.score}</strong></span>
    <span className="practice-missed">Missed: <strong>{practice.missed}</strong></span>
  </>;

  return (
    <main className="practice limited">
      <GameHeader game={practice} countdown={limit > 0} status={status}>
        <ThemeButton onClick={onThemeChange} theme={nextTheme.id} title="Switch theme"/>
      </GameHeader>
      <div className="practice-query">
        <Tile tile={practice.query[0]} theme={theme.id} />
        <Tile tile={practice.query[1]} theme={theme.id} />
        <Tile theme='unknown' />
      </div>
      <TilesTable theme={theme.id} tiles={practice.table} onSelect={onSelect} ref={tableEl}/>
    </main>
  );
}
