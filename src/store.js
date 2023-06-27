import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '@/reducers/theme.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer
  }
});
