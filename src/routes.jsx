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

import { GameModes, createGame, createPractice, createPuzzle, startGame, startPractice } from '@/game/game.js';
import { generateId } from '@/game/utils.js';
import { store } from '@/store.js';
import { setGame } from '@/reducers/games.js';
import { loadData } from '@/utils/storage.js';

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
          return loadData(GameModes.SINGLE);
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
          const savedGame = loadData(GameModes.SINGLE);

          if (!savedGame || savedGame.ended) {
            return redirect('../new');
          }

          return redirect(`../${savedGame.seed}`);
        }
      },
      {
        path: ':seed',
        loader({ params }) {
          const savedGame = loadData(GameModes.SINGLE);
          const game = savedGame?.seed === params.seed ? savedGame : createGame(params.seed);
          const result = startGame(game);

          store.dispatch(setGame({
            key: GameModes.SINGLE,
            value: result
          }));

          return result;
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
          return loadData('puzzle');
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
          const savedGame = loadData(GameModes.PUZZLE);

          if (!savedGame || savedGame.ended) {
            return redirect('../new');
          }

          return redirect(`../${savedGame.seed}`);
        }
      },
      {
        path: ':seed',
        loader({ params }) {
          const savedGame = loadData(GameModes.PUZZLE);
          const game = savedGame?.seed === params.seed ? savedGame : createPuzzle(params.seed);
          const result = startGame(game);

          store.dispatch(setGame({
            key: GameModes.PUZZLE,
            value: result
          }));

          return result;
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
          const game = startPractice(createPractice(), 0);

          store.dispatch(setGame({
            key: GameModes.PRACTICE,
            value: game
          }));

          return game;
        }
      },
      {
        path: 'speed',
        element: <Practice/>,
        loader() {
          const game = startPractice(createPractice(), 60000);

          store.dispatch(setGame({
            key: GameModes.PRACTICE,
            value: game
          }));

          return game;
        }
      }
    ]
  },
  {
    path: 'online',
    element: <div>Online game</div>
  }
];
