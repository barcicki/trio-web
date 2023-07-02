import { Link } from 'react-router-dom';
import { Details } from '@/components/Details.jsx';
import { GameTimer } from '@/components/GameTimer.jsx';

export function PuzzleEnd({ game }) {
  return (
    <>
      <h1>Well done!</h1>
      <p>You have found all 3 hidden trios.</p>

      <GameTimer className="game-timer-ended" game={game}/>

      <Details details={{
        'Miss-clicks': game.missed.length
      }}></Details>

      <div className="end-actions">
        <Link className="button" to="/">Home</Link>
        <Link className="button" to="../new" replace={true}>New puzzle</Link>
      </div>
    </>
  );
}
