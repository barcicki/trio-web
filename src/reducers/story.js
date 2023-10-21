import { useSelector } from 'react-redux';
import { createSliceWithStorage } from '@/utils/redux.js';
import { THEMES } from '@/components/TileThemes/themes.js';
import { MISSIONS } from './missions.js';
import { getDeck } from '@/game/trio';

export function useCampaigns() {
  return useSelector(campaignsSelector);
}

export function useMissions() {
  return useSelector(missionsSelector);
}

export function campaignsSelector(state) {
  return state.story.campaigns;
}

export function missionsSelector(state) {
  return state.story.missions;
}
export function missionSelector(state, missionId) {
  return state.story.missions[missionId];
}

export function getMissionKey(themeId, missionId) {
  return `${themeId}-${missionId}`;
}

const {
  actions: {
    updateMission,
    resetMission
  },
  reducer,
  synchronizer
} = createSliceWithStorage({
  name: 'story',
  initialState(saved) {
    let prevMission = null;

    const campaigns = [];
    const missions = {};
    const deck = getDeck();

    THEMES.forEach((theme) => {
      const campaignMissions = [];

      MISSIONS.forEach((mission, index) => {
        const id = getMissionKey(theme.id, mission.id);
        const game = saved?.pending?.[id] ?? null;
        const completed = saved?.completed?.[id] ?? false;
        const available = game || index === 0 || prevMission?.completed;

        if (prevMission) {
          prevMission.next = id;
        }

        missions[id] = {
          ...mission,
          theme: theme.id,
          id,
          game,
          locked: !available,
          completed,
          prev: prevMission?.id || null,
          next: null,
          tile: deck[index]
        };

        campaignMissions.push(id);
        prevMission = missions[id];
      });

      campaigns.push({
        id: `campaign-${theme.id}`,
        label: theme.label,
        theme: theme.id,
        completed: campaignMissions.every((id) => missions[id].completed),
        locked: missions[campaignMissions[0]].locked,
        missions: campaignMissions
      });
    });

    return {
      campaigns,
      missions
    };
  },
  convert(state) {
    const result = {
      pending: {},
      completed: {}
    };

    for (const id in state.missions) {
      const mission = state.missions[id];

      if (mission.game) {
        result.pending[mission.id] = mission.game;
      }

      result.completed[mission.id] = !!mission.completed;
    }

    return result;
  },
  reducers: {
    updateMission(state, action) {
      const { id, game } = action.payload;

      const missions = {
        ...state.missions
      };

      if (id in missions) {
        const mission = missions[id];

        missions[id] = {
          ...mission,
          game
        };

        if (game?.ended) {
          missions[id].completed = true;

          if (mission.next in missions) {
            missions[mission.next] = {
              ...missions[mission.next],
              locked: false
            };
          }
        }
      }

      return {
        ...state,
        missions
      };
    },
    resetMission(state, action) {
      const id = action.payload;

      const missions = {
        ...state.missions
      };

      if (id in missions) {
        const mission = missions[id];

        missions[id] = {
          ...mission,
          game: null
        };
      }

      return {
        ...state,
        missions
      };
    }
  }
});

export {
  updateMission,
  resetMission,
  reducer as storyReducer,
  synchronizer as storySynchronizer
};

