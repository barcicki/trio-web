import { useRef } from 'react';
import { TbArrowsShuffle } from 'react-icons/tb';

import { ThemeButton } from '@/components/ThemeButton.jsx';
import { GameHeader } from '@/components/GameHeader.jsx';
import { TilesTable } from '@/components/TilesTable.jsx';
import { useSavedGame } from '@/hooks/useSavedGame.js';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { shuffleTable } from '@/game/game.js';
import { getNextTheme, getTheme, setTheme } from '@/utils/theme.js';

import './Puzzle.css';
import toast from 'react-hot-toast';

export function Puzzle() {
  const [puzzle, setPuzzle] = useSavedGame('puzzle');
  const tableEl = useRef(null);

  const theme = getTheme(puzzle);
  const nextTheme = getNextTheme(puzzle);

  const onSelect = useCachedCallback(() => toast('Not working yet'));
  const onReorder = useCachedCallback(() => setPuzzle(shuffleTable(puzzle)));
  const onThemeChange = useCachedCallback(() => setPuzzle(setTheme(puzzle, nextTheme)));

  return (
    <main className="puzzle limited">
      <GameHeader game={puzzle}>
        <button onClick={onReorder} title="Reorder tiles"><TbArrowsShuffle/></button>
        <ThemeButton onClick={onThemeChange} theme={nextTheme.id} title="Switch theme"/>
      </GameHeader>
      <TilesTable theme={theme.id} tiles={puzzle.table} selected={puzzle.selected} onSelect={onSelect} ref={tableEl}/>
    </main>
  );
}

