import { Link, useNavigate } from 'react-router-dom';
import { Details } from '@/components/Details.jsx';

export function PracticeEnd({ game }) {
  const navigate = useNavigate();

  return (
    <>
      <h1>Well done!</h1>
      <p>Time-limited practice completed.</p>

      <Details details={{
        'Trios completed': game.score,
        'Miss-clicks': game.missed
      }}></Details>

      <div className="end-actions">
        <Link className="button" to="/">Home</Link>
        <Link className="button" onClick={() => navigate(0)}>Restart</Link>
      </div>
    </>
  );
}
