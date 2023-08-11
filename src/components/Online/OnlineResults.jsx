import { Fragment } from 'react';
import { ColorTag } from '@/components/ColorTag.jsx';
import { usePlayer } from '@/reducers/player.js';

import './OnlineResults.css';

export function OnlineResults({ players }) {
  const player = usePlayer();
  const sortedPlayers = players.slice()
    .map((p) => ({
      ...p,
      score: p.score ?? p.found?.length ?? 0,
      missed: p.missed?.length ?? 0
    }))
    .sort((a, b) => b.score - a.score);

  const winners = sortedPlayers.filter((p) => p.score === sortedPlayers[0].score);
  const isWinner = winners.find((p) => p.id === player.id);

  return (
    <>
      <h1>{ isWinner ? 'Congratulations!' : 'Game over!' }</h1>

      <h2>Winners</h2>
      <div className="online-winners">
        {winners.map((p) => <ColorTag key={p.id} color={p.color}>{p.name}</ColorTag>)}
      </div>

      <div className="online-results">
        <div className="online-result-header online-result-color">Color</div>
        <div className="online-result-header online-result-name">Player</div>
        <div className="online-result-header online-result-score">Score</div>
        <div className="online-result-header online-result-missed">Missed</div>
        {sortedPlayers.map((player) => (
          <Fragment key={player.id}>
            <ColorTag className="online-result-color" color={player.color}/>
            <div className="online-result-name">{player.name}</div>
            <div className="online-result-score">{player.score}</div>
            <div className="online-result-missed">{player.missed}</div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
