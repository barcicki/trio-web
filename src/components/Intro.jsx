import './Intro.css';

export function Intro({ goal, children }) {
  return (
    <main className="intro">
      <div className="intro-goal">
        {goal}
      </div>
      <div className="intro-options">
        {children}
      </div>
    </main>
  );
}
