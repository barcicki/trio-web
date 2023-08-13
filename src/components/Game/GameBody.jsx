import classNames from 'classnames';
import { useRef, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';
import { TilesTable } from '@/components/TilesTable.jsx';
import { GameTypes } from '@/game/trio';
import { GameGoal } from './GameGoal.jsx';

import './GameBody.css';

export function GameBody({
  theme,
  goals,
  table,
  goalText,
  selected,
  onSelect
}) {
  const [goalTextVisible, setGoalTextVisible] = useState(true);
  const tableRef = useRef();
  const onTileSelect = useCachedCallback((tile) => onSelect?.(tile, tableRef.current));

  return (
    <div className="game--body">
      {goalText && goalTextVisible && <p className="game--goal-text">
        <span className="game--goal-text-content">{goalText}</span>
        <span className="game--goal-text-toggle" onClick={() => setGoalTextVisible(!goalTextVisible)}><MdOutlineClose/></span>
      </p>}
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
