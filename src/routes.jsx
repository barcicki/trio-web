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

import { GameModes, GameApis } from '@game/trio';
import { generateId } from '@game/utils';

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
          return createOrLoadGame(GameModes.SINGLE, params.seed);
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
          return createOrLoadGame(GameModes.PUZZLE, params.seed);
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
          return createGameWithLimit(GameModes.PRACTICE, 0);
        }
      },
      {
        path: 'speed',
        element: <Practice/>,
        loader() {
          return createGameWithLimit(GameModes.PRACTICE, 60000);
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

function createOrLoadGame(mode, seed) {
  const api = GameApis[mode];
  const savedGame = loadData(mode);
  const game = savedGame?.seed === seed ? savedGame : api.create(seed);

  return saveGameInStore(mode, api.start(game));
}

function createGameWithLimit(mode, limit) {
  const api = GameApis[mode];

  return saveGameInStore(mode, api.start(api.create(), limit));
}

function saveGameInStore(mode, game) {
  store.dispatch(setGame({
    key: mode,
    value: game
  }));

  return game;
}
