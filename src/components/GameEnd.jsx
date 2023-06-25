import { Link } from 'react-router-dom';
import { Details } from '@/components/Details.jsx';
import { GameTimer } from '@/components/GameTimer.jsx';

export function GameEnd({ game }) {
  return (
    <>
      <h1>Well done!</h1>
      <p>You have found all hidden trios.</p>

      <GameTimer game={game}/>

      <Details details={{
        'Trios found': game.found.length,
        'Miss-clicks': game.missed.length,
        'Hints used': game.usedHints
      }}></Details>

      <div className="end-actions">
        <Link className="button" to="/">Home</Link>
        <Link className="button" to="../new" replace={true}>New game</Link>
      </div>
    </>
  );
}
