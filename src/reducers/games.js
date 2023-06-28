import { createSlice } from '@reduxjs/toolkit';

const {
  actions: {
    setGame
  },
  reducer
} = createSlice({
  name: 'games',
  initialState: {},
  reducers: {
    setGame(state, action) {
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    }
  }
});

export {
  setGame,
  reducer as gamesReducer
};
