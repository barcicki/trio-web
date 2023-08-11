import { THEMES } from '@/components/TileThemes/themes.js';
import { createSliceWithStorage } from '@/utils/redux.js';

const {
  actions: {
    setTheme,
    setNextTheme
  },
  reducer,
  synchronizer
} = createSliceWithStorage({
  name: 'theme',
  initialState(saved) {
    return saved ?? THEMES[0].id;
  },
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
  reducer as themeReducer,
  synchronizer as themeSynchronizer
};
