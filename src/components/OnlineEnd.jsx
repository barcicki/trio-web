import { Fragment } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { usePlayer } from "@/reducers/player.js";
import { GameTimer } from '@/components/GameTimer.jsx';
import { ColorTag } from '@/components/ColorTag.jsx';

import './OnlineEnd.css';

export function OnlineEnd({ game }) {
  const localPlayer = usePlayer();
  const navigate = useNavigate();
  const players = game.players.slice().sort((a, b) => b.score - a.score);
  const winners = players.filter((p) => p.score === players[0].score);
  const isWinner = winners.find((p) => p.id === localPlayer.id);

  return (
    <>
      <h1>{ isWinner ? 'Congratulations!' : 'Game over!' }</h1>

      <h2>Winners</h2>
      <div className="online-winners">
        {winners.map((p) => <ColorTag key={p.id} color={p.color}>{p.name}</ColorTag>)}
      </div>

      <p className="online-time-result">
        Time taken: <GameTimer game={game}/>
      </p>

      <div className="online-results">
        <div className="online-result-header online-result-color">Color</div>
        <div className="online-result-header online-result-name">Player</div>
        <div className="online-result-header online-result-score">Score</div>
        <div className="online-result-header online-result-missed">Missed</div>
        {players.map((player) => (
          <Fragment key={player.id}>
            <ColorTag className="online-result-color" color={player.color}/>
            <div className="online-result-name">{player.name}</div>
            <div className="online-result-score">{player.score}</div>
            <div className="online-result-missed">{player.missed}</div>
          </Fragment>
        ))}
      </div>

      <div className="end-actions">
        <Link className="button" to="/">Home</Link>
        <Link className="button" onClick={() => navigate(0)}>Play again</Link>
      </div>
    </>
  );
}
