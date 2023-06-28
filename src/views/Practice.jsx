import { useRef } from 'react';
import { GameView } from '@/components/GameView.jsx';
import { GameHeader } from '@/components/GameHeader.jsx';
import { ThemeButton } from '@/components/ThemeButton.jsx';
import { PracticeEnd } from '@/components/PracticeEnd.jsx';
import { TilesTable } from '@/components/TilesTable.jsx';
import { Tile } from '@/components/Tile.jsx';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { useTimeout } from '@/hooks/useTimeout.js';
import { useGame } from '@/hooks/useGame.js';
import { useTheme } from '@/hooks/useTheme.js';
import { toastErrors } from '@/utils/toast.js';
import { GameModes } from '@/game/game.js';

import './Practice.css';

export function Practice({ limit }) {
  const [practice, api] = useGame(GameModes.PRACTICE);
  const [theme, nextTheme, changeTheme] = useTheme();
  const tableEl = useRef();

  const onSelect = useCachedCallback((tile) => api.togglePracticeTile(tile, {
    onMiss(tile, tiles) {
      tableEl.current.shakeTile(tile);
      toastErrors(tiles, theme);
    }
  }));

  useTimeout(() => {
    if (practice.remaining > 0) {
      api.endPractice();
    }
  }, practice.remaining);

  const status = <span className="practice-score">Score: <strong>{practice.score}</strong></span>;

  return (
    <GameView className="practice limited" game={practice} EndGame={PracticeEnd}>
      <GameHeader game={practice} countdown={limit > 0} status={status}>
        <ThemeButton onClick={changeTheme} theme={nextTheme.id} title="Switch theme"/>
      </GameHeader>
      <div className="practice-query">
        <Tile tile={practice.query[0]} theme={theme.id} />
        <Tile tile={practice.query[1]} theme={theme.id} />
        <Tile theme='unknown' />
      </div>
      <TilesTable theme={theme.id} tiles={practice.table} onSelect={onSelect} ref={tableEl}/>
    </GameView>
  );
}
