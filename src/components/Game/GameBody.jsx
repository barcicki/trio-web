import classNames from 'classnames';
import { useRef } from 'react';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { TilesTable } from '@/components/TilesTable.jsx';
import { GameGoal } from './GameGoal.jsx';
import { GameTypes } from '@game/trio';

import './GameBody.css';

export function GameBody({
  theme,
  goals,
  table,
  goalText,
  selected,
  onSelect
}) {
  const tableRef = useRef();
  const onTileSelect = useCachedCallback((tile) => onSelect?.(tile, tableRef.current));

  return (
    <div className="game--body">
      {goalText && <p className="game--goal-text">{goalText}</p>}
      {goals?.length ? (
        <div className={classNames({
          'game--goals': true,
          'game--match-goals': goals.some((goal) => goal.type === GameTypes.MATCH),
          'game--find-goals': goals.some((goal) => goal.type === GameTypes.FIND),
          'multi-row': goals.length > 3
        })}>
          {goals.map((goal, index) => <GameGoal key={index} theme={theme} {...goal}/>)}
        </div>
      ) : ''}
      <TilesTable
        className="game--table"
        ref={tableRef}
        tiles={table}
        theme={theme}
        selected={selected}
        onSelect={onTileSelect}
      />
    </div>
  );
}
