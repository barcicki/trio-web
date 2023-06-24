import './Intro.css';
import { useNavigate } from 'react-router-dom';

export function Intro({ goal, children }) {
  const navigate = useNavigate();

  return (
    <main className="intro">
      <div className="intro-goal">
        {goal}
      </div>
      <div className="intro-options">
        {children}
      </div>
      <div className="intro-footer">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </main>
  );
}
