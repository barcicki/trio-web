import { configureStore } from '@reduxjs/toolkit';
import { createSynchronizerMiddleware } from '@/utils/redux.js';
import { themeReducer, themeSynchronizer } from '@/reducers/theme.js';
import { gamesReducer, gamesSynchronizer } from '@/reducers/games.js';
import { playerReducer, playerSynchronizer } from '@/reducers/player.js';
import { storyReducer, storySynchronizer } from '@/reducers/story.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    games: gamesReducer,
    player: playerReducer,
    story: storyReducer
  },
  middleware: [
    createSynchronizerMiddleware([
      themeSynchronizer,
      playerSynchronizer,
      storySynchronizer,
      gamesSynchronizer
    ])
  ]
});
