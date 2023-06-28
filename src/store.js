import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '@/reducers/theme.js';
import { loadData, saveData } from '@/utils/storage.js';
import { gamesReducer } from '@/reducers/games.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    games: gamesReducer
  },
  preloadedState: {
    theme: loadData('theme')
  }
});

store.subscribe(() => {
  const { theme } = store.getState();

  saveData('theme', theme);
});
