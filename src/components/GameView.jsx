import './GameView.css';

export function GameView({ className, game, children, EndGame }) {
  return (
    <main className={`game-view ${className} ${game?.ended ? 'ended' : ''}`}>
      {game?.ended ? <EndGame game={game}/> : children}
    </main>
  );
}
