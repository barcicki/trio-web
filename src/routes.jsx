import { redirect } from 'react-router-dom';
import { Error } from '@/views/Error.jsx';
import { Home } from '@/views/Home.jsx';
import { Game } from '@/views/Game.jsx';
import { GameIntro } from '@/views/GameIntro.jsx';
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
        element: <div>Puzzle</div>
      },
      {
        path: 'new',
        element: <div>Redirect to new puzzle</div>
      },
      {
        path: 'continue',
        element: <div>Redirect to saved puzzle</div>
      },
      {
        path: ':seed',
        element: <div>Seeded puzzle</div>
      }
    ]
  },
  {
    path: 'online',
    element: <div>Online game</div>
  }
];
