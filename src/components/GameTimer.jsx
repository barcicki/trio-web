import { Timer } from '@/components/Timer.jsx';

export function GameTimer({ game }) {
  return <Timer className="game-timer" {...getTimerProps(game)}/>;
}

function getTimerProps(game) {
  if (game.started) {
    return {
      startTime: game.started
    };
  }

  if (game.duration) {
    const now = Date.now();

    return {
      startTime: now - game.duration,
      stopTime: now
    };
  }

  return {};
}
