import { useRef } from 'react';
import { TbArrowsShuffle } from 'react-icons/tb';

import { ThemeButton } from '@/components/ThemeButton.jsx';
import { GameHeader } from '@/components/GameHeader.jsx';
import { TilesTable } from '@/components/TilesTable.jsx';
import { TilesList } from '@/components/TilesList.jsx';
import { GameView } from '@/components/GameView.jsx';
import { PuzzleEnd } from '@/components/PuzzleEnd.jsx';
import { useSavedGame } from '@/hooks/useSavedGame.js';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { shuffleTable, togglePuzzleTile } from '@/game/game.js';
import { toastAlreadyFound, toastErrors } from '@/utils/toast.js';

import './Puzzle.css';
import { useTheme } from '@/hooks/useTheme.js';

export function Puzzle() {
  const [puzzle, setPuzzle] = useSavedGame('puzzle');
  const [theme, nextTheme, changeTheme] = useTheme();
  const tableEl = useRef(null);

  const onReorder = useCachedCallback(() => setPuzzle(shuffleTable(puzzle)));
  const onSelect = useCachedCallback((tile) => setPuzzle(togglePuzzleTile(puzzle, tile, {
    onMiss(miss) {
      tableEl.current.shakeTiles(miss);
      toastErrors(miss, theme);
    },
    onAlreadyFound(tiles) {
      tableEl.current.shakeTiles(tiles);
      toastAlreadyFound();
    }
  })));

  const matches = puzzle.matches.map((tiles, index) => {
    const found = puzzle.found.includes(index);
    const themeId = found ? theme.id : 'unknown';

    return <TilesList key={index} tiles={tiles} theme={themeId} className={found ? 'found' : ''}/>;
  });

  return (
    <GameView className="puzzle limited" game={puzzle} EndGame={PuzzleEnd}>
      <GameHeader game={puzzle}>
        <button onClick={onReorder} title="Reorder tiles"><TbArrowsShuffle/></button>
        <ThemeButton onClick={changeTheme} theme={nextTheme.id} title="Switch theme"/>
      </GameHeader>
      <div className="puzzle-matches">{matches}</div>
      <TilesTable theme={theme.id} tiles={puzzle.table} selected={puzzle.selected} onSelect={onSelect} ref={tableEl}/>
    </GameView>
  );
}

