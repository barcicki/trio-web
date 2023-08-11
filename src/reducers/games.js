import { createSliceWithStorage } from '@/utils/redux.js';
import { stopGame } from '@game/trio/time.js';

export function gamesSelector(state, key) {
  return state.games[key];
}

const {
  actions: {
    setGame
  },
  reducer,
  synchronizer,
} = createSliceWithStorage({
  name: 'games',
  initialState(saved) {
    return {
      ...saved
    };
  },
  reducers: {
    setGame(state, action) {
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    }
  },
  convert(state) {
    const result = {};

    for (const key in state) {
      result[key] = stopGame(state[key]);
    }

    return result;
  }
});

export {
  setGame,
  reducer as gamesReducer,
  synchronizer as gamesSynchronizer
};
