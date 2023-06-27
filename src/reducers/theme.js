import { THEMES } from '@/components/TileThemes/themes.js';
import { createSlice } from '@reduxjs/toolkit';

const {
  actions: {
    setTheme,
    setNextTheme
  },
  reducer
} = createSlice({
  name: 'theme',
  initialState: THEMES[0].id,
  reducers: {
    setTheme(state, action) {
      return action.payload;
    },
    setNextTheme(state) {
      const index = THEMES.findIndex((t) => t.id === state);
      const nextIndex = (index >= 0 ? index + 1 : 1) % THEMES.length;

      return THEMES[nextIndex].id;
    }
  }
});

export {
  setTheme,
  setNextTheme,
  reducer as themeReducer
};
