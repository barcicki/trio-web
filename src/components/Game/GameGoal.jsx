import { GameTypes, getMatchingTile } from '@game/trio';
import { TilesList } from '@/components/TilesList.jsx';
import { Tile } from '@/components/Tile.jsx';

import './GameGoal.css';

export function GameGoal(props) {
  const Goal = props.type === GameTypes.MATCH ? MatchGoal : FindGoal;

  return <Goal {...props}/>;
}

function FindGoal({ tiles, theme, found = false }) {
  return (
    <TilesList tiles={tiles} theme={found ? theme : 'unknown'} className={`game--goal game--find-goal ${found ? 'found' : ''}`}/>
  );
}

function MatchGoal({ tiles, theme, found = false }) {
  return (
    <div className={`game--goal game--match-goal ${found ? 'found' : ''}`}>
      <Tile tile={tiles[0]} theme={theme} />
      <Tile tile={tiles[1]} theme={theme} />
      {found ? <Tile tile={getMatchingTile(tiles)} theme={theme}/> : <Tile theme='unknown' />}
    </div>
  );
}
