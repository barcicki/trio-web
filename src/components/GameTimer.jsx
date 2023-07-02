import { Timer } from '@/components/Timer.jsx';

export function GameTimer({ className, game }) {
  return <Timer className={`game-timer ${className || ''}`} {...getTimerProps(game)}/>;
}

function getTimerProps(game) {
  if (game.remaining) {
    return {
      stopTime: game.started + game.remaining,
      direction: -1
    };
  }

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
