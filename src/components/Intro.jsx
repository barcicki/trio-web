import './Intro.css';
import { Link } from 'react-router-dom';

export function Intro({ goal, children }) {
  return (
    <main className="intro">
      <div className="intro-goal">
        {goal}
      </div>
      <div className="intro-options">
        {children}
      </div>
      <div className="intro-footer">
        <Link className="button" to="/">Back to home</Link>
      </div>
    </main>
  );
}
