import { redirect } from 'react-router-dom';
import { Error } from '@/views/Error.jsx';
import { Home } from '@/views/Home.jsx';
import { Game } from '@/views/Game.jsx';
import { GameIntro } from '@/views/GameIntro.jsx';
import { PuzzleIntro } from '@/views/PuzzleIntro.jsx';
import { generateId } from '@/game/utils.js';
import { createGame, loadGame, startGame } from '@/game/game.js';

export const routes = [
  {
    path: '/',
    element: <Home/>,
    errorElement: <Error/>,
  },
  {
    path: 'tutorial',
    element: <div>Tutorial</div>
  },
  {
    path: 'game',
    children: [
      {
        path: '',
        element: <GameIntro/>,
        loader() {
          return loadGame('game');
        }
      },
      {
        path: 'new',
        loader() {
          return redirect(`../${generateId()}`);
        }
      },
      {
        path: 'continue',
        loader() {
          const savedGame = loadGame('game');

          if (!savedGame) {
            return redirect('../new');
          }

          return redirect(`../${savedGame.seed}`);
        }
      },
      {
        path: ':seed',
        loader({ params }) {
          const savedGame = loadGame('game');

          if (savedGame?.seed === params.seed) {
            return startGame(savedGame);
          }

          return startGame(createGame(params.seed));
        },
        element: <Game/>
      }
    ]
  },
  {
    path: 'puzzle',
    children: [
      {
        path: '',
        element: <PuzzleIntro/>,
        loader() {
          return loadGame('puzzle');
        }
      },
      {
        path: 'new',
        loader() {
          return redirect(`../${generateId()}`);
        }
      },
      {
        path: 'continue',
        loader() {
          const savedGame = loadGame('puzzle');

          if (!savedGame) {
            return redirect('../new');
          }

          return redirect(`../${savedGame.seed}`);
        }
      },
      {
        path: ':seed',
        loader({ params }) {
          const savedGame = loadGame('game');

          if (savedGame?.seed === params.seed) {
            return startGame(savedGame);
          }

          return startGame(createGame(params.seed));
        },
        element: <div>Puzzle</div>
      }
    ]
  },
  {
    path: 'online',
    element: <div>Online game</div>
  }
];
