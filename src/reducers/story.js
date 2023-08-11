import { createSliceWithStorage } from '@/utils/redux.js';
import { THEMES } from '@/components/TileThemes/themes.js';
import { MISSIONS } from '@game/trio/missions.js';
import { useSelector } from 'react-redux';

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
    let lastLocked = false;
    let prevMission = null;

    const campaigns = [];
    const missions = {};

    THEMES.forEach((theme) => {
      const campaignMissions = [];

      MISSIONS.forEach((mission) => {
        const id = getMissionKey(theme.id, mission.id);
        const game = saved?.pending?.[id] ?? null;
        const completed = saved?.completed?.[id] ?? false;
        const locked = lastLocked;

        lastLocked ||= !completed;

        if (prevMission) {
          missions[prevMission].next = id;
        }

        missions[id] = {
          ...mission,
          theme: theme.id,
          id,
          game,
          locked,
          completed,
          prev: prevMission,
          next: null
        };

        campaignMissions.push(id);
        prevMission = id;
      });

      campaigns.push({
        id: `campaign-${theme.id}`,
        label: theme.label,
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

