import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '@/reducers/theme.js';
import { loadData, saveData } from '@/utils/storage.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer
  },
  preloadedState: {
    theme: loadData('theme')
  }
});

store.subscribe(() => {
  const { theme } = store.getState();

  saveData('theme', theme);
});
