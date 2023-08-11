import { useSelector } from 'react-redux';
import { createSliceWithStorage } from '@/utils/redux.js';
import { generateColor, generateId } from '@game/utils';

export function usePlayer() {
  return useSelector(playerSelector);
}

const {
  actions: {
    setName,
    changeColor
  },
  reducer,
  synchronizer
} = createSliceWithStorage({
  name: 'player',
  initialState(saved) {
    return {
      id: saved?.id ?? generateId(),
      name: saved?.name ?? 'Player',
      color: saved?.color ?? generateColor()
    };
  },
  reducers: {
    setName(state, action) {
      return {
        ...state,
        name: action.payload
      };
    },
    changeColor(state) {
      return {
        ...state,
        color: generateColor()
      };
    }
  }
});

export {
  setName,
  changeColor,
  reducer as playerReducer,
  synchronizer as playerSynchronizer
};

export function playerSelector(state) {
  return state?.player;
}
