import { redirect } from 'react-router-dom';
import { Error } from '@/views/Error.jsx';
import { Home } from '@/views/Home.jsx';
import { Game } from '@/views/Game.jsx';
import { GameIntro } from '@/views/GameIntro.jsx';
import { Puzzle } from '@/views/Puzzle.jsx';
import { PuzzleIntro } from '@/views/PuzzleIntro.jsx';
import { PracticeIntro } from '@/views/PracticeIntro.jsx';
import { Rules } from '@/views/Rules.jsx';
import { Practice } from '@/views/Practice.jsx';

import { createGame, createPractice, createPuzzle, loadGame, startGame, startPractice } from '@/game/game.js';
import { generateId } from '@/game/utils.js';

export const routes = [
  {
    path: '/',
    element: <Home/>,
    errorElement: <Error/>,
  },
  {
    path: 'rules',
    element: <Rules/>
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

          if (!savedGame || savedGame.ended) {
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

          if (!savedGame || savedGame.ended) {
            return redirect('../new');
          }

          return redirect(`../${savedGame.seed}`);
        }
      },
      {
        path: ':seed',
        loader({ params }) {
          const savedGame = loadGame('puzzle');

          if (savedGame?.seed === params.seed) {
            return startGame(savedGame);
          }

          return startGame(createPuzzle(params.seed));
        },
        element: <Puzzle/>
      }
    ]
  },
  {
    path: 'practice',
    children: [
      {
        path: '',
        element: <PracticeIntro/>
      },
      {
        path: 'endless',
        element: <Practice/>,
        loader() {
          return startPractice(createPractice(), 0);
        }
      },
      {
        path: 'speed',
        element: <Practice/>,
        loader() {
          return startPractice(createPractice(), 60000);
        }
      }
    ]
  },
  {
    path: 'online',
    element: <div>Online game</div>
  }
];
