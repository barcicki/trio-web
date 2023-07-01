import { configureStore } from '@reduxjs/toolkit';
import { loadData, saveData } from '@/utils/storage.js';
import { themeReducer } from '@/reducers/theme.js';
import { gamesReducer } from '@/reducers/games.js';
import { playerReducer } from '@/reducers/player.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    games: gamesReducer,
    player: playerReducer
  },
  preloadedState: {
    theme: loadData('theme'),
    player: loadData('player')
  }
});

store.subscribe(saveToLocalStorage);

// immediately save store state
saveToLocalStorage();

function saveToLocalStorage() {
  const { theme, player } = store.getState();

  saveData('theme', theme);
  saveData('player', player);
}
