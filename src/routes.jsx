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
import { Campaigns } from '@/views/Campaigns.jsx';
import { CampaignMission } from '@/views/CampaignMission.jsx';

import { GameModes } from '@/game/trio';
import { generateId } from '@/game/utils';
import { toastMissionLocked } from '@/utils/toast.js';
import { gamesSelector } from '@/reducers/games.js';
import { missionSelector } from '@/reducers/story.js';

import { store } from '@/store.js';

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
    path: 'campaign',
    children: [
      {
        path: '',
        element: <Campaigns/>
      },
      {
        path: ':key',
        element: <CampaignMission/>,
        loader({ params }) {
          const state = store.getState();
          const mission = missionSelector(state, params.key);

          if (!mission) {
            return redirect('../404');
          }

          if (mission.locked) {
            toastMissionLocked();
            return redirect('..');
          }

          return mission.id;
        }
      }
    ]
  },
  {
    path: 'game',
    children: [
      {
        path: '',
        element: <GameIntro/>,
        loader() {
          return gamesSelector(store.getState(), GameModes.SINGLE) || null;
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
          const savedGame = gamesSelector(store.getState(), GameModes.SINGLE);

          if (!savedGame || savedGame.ended) {
            return redirect('../new');
          }

          return redirect(`../${savedGame.seed}`);
        }
      },
      {
        path: ':seed',
        loader({ params }) {
          return params.seed;
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
          return gamesSelector(store.getState(), GameModes.PUZZLE) || null;
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
          const savedGame = gamesSelector(store.getState(), GameModes.PUZZLE);

          if (!savedGame || savedGame.ended) {
            return redirect('../new');
          }

          return redirect(`../${savedGame.seed}`);
        }
      },
      {
        path: ':seed',
        loader({ params }) {
          return params.seed;
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
        element: <Practice limit={0}/>
      },
      {
        path: 'speed',
        element: <Practice limit={60000}/>
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
