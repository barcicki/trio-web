import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { createGame, getHint, shuffleTable, toggleTile } from '@/game/game.js';

export const GameActions = {
  CREATE: 'create',
  LOAD: 'load',
  START: 'start',
  STOP: 'stop',
  RESET: 'reset',
  REORDER_TABLE: 'reorderTable',
  HINT: 'hint',
  TOGGLE_TILE: 'toggleTile'
};

export const GameContext = createContext(null);
export const GameDispatcherContext = createContext(null);
export const SavedGameContext = createContext(null);

export function useGame() {
  return useContext(GameContext);
}

export function useSavedGame() {
  return useContext(SavedGameContext);
}

export function useGameDispatcher() {
  return useContext(GameDispatcherContext);
}

export function GameProvider({ children, name }) {
  const reducer = useCallback((state, payload) => {
    switch (payload.type) {
      case GameActions.CREATE:
        return {
          ...createGame(payload.seed),
          started: false
        };
      case GameActions.LOAD:
        return payload.game;
      case GameActions.RESET:
        localStorage.removeItem(name);
        return null;
      case GameActions.START:
        return {
          ...state,
          started: Date.now() - (state.duration ?? 0)
        };
      case GameActions.STOP:
        if (state) {
          save(name, {
            ...state,
            started: false,
            duration: getDuration(state)
          });
        }
        return null;
      case GameActions.REORDER_TABLE:
        return shuffleTable(state);
      case GameActions.HINT:
        return getHint(state);
      case GameActions.TOGGLE_TILE: {
        const newState = toggleTile(state, payload.tile);

        if (typeof payload.onFind === 'function' && newState.found.length > state.found.length) {
          const found = newState.found[newState.found.length - 1];

          payload.onFind(found);
        }

        if (typeof payload.onMiss === 'function' && newState.missed.length > state.missed.length) {
          const miss = newState.missed[newState.missed.length - 1];

          payload.onMiss(miss);
        }

        return newState;
      }
    }
  }, [name]);

  const [game, dispatch] = useReducer(reducer, null);
  const savedGame = name && load(name) || null;

  useEffect(() => {
    if (!name || !game) {
      return;
    }

    save(name, {
      ...game,
      started: false,
      duration: getDuration(game)
    });
  }, [name, game]);

  return (
    <GameContext.Provider value={game}>
      <GameDispatcherContext.Provider value={dispatch}>
        <SavedGameContext.Provider value={savedGame}>
          {children}
        </SavedGameContext.Provider>
      </GameDispatcherContext.Provider>
    </GameContext.Provider>
  );
}

function getDuration(game) {
  return game.started ? Date.now() - game.started : (game.duration ?? 0);
}

function load(key) {
  const result = localStorage.getItem(key);

  return result && JSON.parse(result);
}

function save(key, game) {
  return localStorage.setItem(key, JSON.stringify(game));
}
