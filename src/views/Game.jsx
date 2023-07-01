import { useRef } from 'react';
import { TbArrowsShuffle, TbBulb } from 'react-icons/tb';

import { ThemeButton } from '@/components/ThemeButton.jsx';
import { TilesTable } from '@/components/TilesTable.jsx';
import { GameHeader } from '@/components/GameHeader.jsx';
import { Details } from '@/components/Details.jsx';
import { GameView } from '@/components/GameView.jsx';
import { GameEnd } from '@/components/GameEnd.jsx';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { useTheme } from '@/hooks/useTheme.js';
import { useGame } from '@/hooks/useGame.js';
import { GameModes, getMatches } from '@game/trio';
import { toastErrors } from '@/utils/toast.js';

import './game.css';

export function Game() {
  const [game, api] = useGame(GameModes.SINGLE);
  const [theme, nextTheme, changeTheme] = useTheme();
  const tableEl = useRef(null);

  const matches = getMatches(game.table);

  const onSelect = useCachedCallback((tile) => api.toggle(tile, {
    onMiss(miss) {
      tableEl.current.shakeTiles(miss);
      toastErrors(miss, theme);
    }
  }));

  return (
    <GameView className="game limited" game={game} EndGame={GameEnd}>
      <GameHeader game={game}>
        <button onClick={api.hint} title="Show hint"><TbBulb/></button>
        <button onClick={api.reorder} title="Reorder tiles"><TbArrowsShuffle/></button>
        <ThemeButton onClick={changeTheme} theme={nextTheme.id} title="Switch theme"/>
      </GameHeader>
      <Details horizontal={true} details={{
        Deck: game.deck.length,
        Visible: matches.length,
        Found: game.found.length
      }}/>
      <TilesTable theme={theme.id} tiles={game.table} selected={game.selected} onSelect={onSelect} ref={tableEl}/>
    </GameView>
  );
}
