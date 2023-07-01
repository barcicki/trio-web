import { createSlice } from '@reduxjs/toolkit';
import { generateColor, generateId } from '@/game/utils.js';
import { useSelector } from 'react-redux';

export function usePlayer() {
  return useSelector(getPlayer);
}

const {
  actions: {
    setName,
    changeColor
  },
  reducer
} = createSlice({
  name: 'player',
  initialState: {
    id: generateId(),
    name: 'Player',
    color: generateColor()
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
  reducer as playerReducer
};

function getPlayer(state) {
  return state?.player;
}
