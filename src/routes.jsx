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
import { OnlineIntro } from '@/views/OnlineIntro.jsx';
import { OnlineGame } from '@/views/OnlineGame.jsx';

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
          return loadData(GameModes.SINGLE) || null;
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

          return saveGameInStore(GameModes.SINGLE, startGame(game));
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
          return loadData('puzzle') || null;
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

          return saveGameInStore(GameModes.PUZZLE, startGame(game));
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
          return saveGameInStore(GameModes.PRACTICE, startPractice(createPractice(), 0));
        }
      },
      {
        path: 'speed',
        element: <Practice/>,
        loader() {
          return saveGameInStore(GameModes.PRACTICE, startPractice(createPractice(), 60000));
        }
      }
    ]
  },
  {
    path: 'online',
    children: [
      {
        path: '',
        element: <OnlineIntro/>,
        loader() {
          return generateId();
        }
      },
      {
        path: ':roomId',
        element: <OnlineGame/>,
        loader({ params }) {
          return params.roomId;
        }
      }
    ]
  }
];

function saveGameInStore(mode, game) {
  store.dispatch(setGame({
    key: mode,
    value: game
  }));

  return game;
}
