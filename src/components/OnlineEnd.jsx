import { Link, useNavigate } from 'react-router-dom';
import { GameTimer } from '@/components/GameTimer.jsx';
import { ColorTag } from '@/components/ColorTag.jsx';

import './OnlineEnd.css';

export function OnlineEnd({ game }) {
  const navigate = useNavigate();
  const players = game.players.slice().sort((a, b) => b.score - a.score);
  const winners = players.filter((p) => p.score === players[0].score);
  const others = players.filter((p) => !winners.includes(p));

  const otherPlayers = others?.length ? (
    <div className="online-others">
      <h3>Other results:</h3>
      <div className="online-players">
        {others.map((p) => <ColorTag key={p.id} color={p.color}>{p.score}</ColorTag>)}
      </div>
    </div>
  ) : '';

  return (
    <>
      <h1>Game over!</h1>

      <GameTimer game={game}/>

      <div className="online-winner">
        <h2>The winner:</h2>
        <div className="online-players">
          {winners.map((p) => <ColorTag key={p.id} color={p.color}>{p.score}</ColorTag>)}
        </div>
      </div>

      {otherPlayers}

      <div className="end-actions">
        <Link className="button" to="/">Home</Link>
        <Link className="button" onClick={() => navigate(0)}>Play again</Link>
      </div>
    </>
  );
}
