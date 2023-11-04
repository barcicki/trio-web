import { redirect } from 'react-router-dom';
import { Error } from '@/components/Error.jsx';
import { Home } from '@/components/Home.jsx';
import { FindGame } from '@/components/FindGame/FindGame.jsx';
import { FindGameIntro } from '@/components/FindGame/FindGameIntro.jsx';
import { PuzzleGame } from '@/components/PuzzleGame/PuzzleGame.jsx';
import { PuzzleIntro } from '@/components/PuzzleGame/PuzzleIntro.jsx';
import { PracticeIntro } from '@/components/PracticeGame/PracticeIntro.jsx';
import { Rules } from '@/components/Rules.jsx';
import { Practice } from '@/components/PracticeGame/Practice.jsx';
import { OnlineIntro } from '@/components/Online/OnlineIntro.jsx';
import { OnlineGame } from '@/components/Online/OnlineGame.jsx';
import { CampaignList } from '@/components/Campaign/CampaignList.jsx';
import { MissionGame } from '@/components/Campaign/MissionGame.jsx';

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
        element: <CampaignList/>
      },
      {
        path: ':key',
        element: <MissionGame/>,
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
        element: <FindGameIntro/>,
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
        element: <FindGame/>
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
        element: <PuzzleGame/>
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
