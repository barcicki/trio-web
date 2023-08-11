import { GameTypes, TargetTypes } from './consts.ts';
import { endGame, startGameWithTimeLimit, stopGame } from './time.js';
import { getDeck, getMatchError, getMatches, hasMatch, isMatch } from './base.js';
import {
  anyIncludeSubset,
  generateId,
  generateIdWithRandom,
  getSeededRandom,
  shuffleWithRandom
} from '../utils/index.js';
import { createMatchTable } from './match.js';
import {
  createTable,
  pickTable,
  replaceTableWithDeck,
  replaceTableWithRandom,
  shuffleTable,
  updateTable
} from './table.js';
import {
  getPlayer,
  getTotalFoundTrios,
  hasAnyPlayerFound,
  increaseFound,
  increaseMissed,
  joinPlayer,
  leavePlayer,
  updatePlayer
} from './player.js';

export type TrioTiles = [string, string, string];

export interface GameState {
  players: GamePlayerState[];

  started?: number;
  duration?: number;
  remaining?: number;
  ended?: boolean;

  seed?: string;
  nextSeed?: string;
  matchTiles?: [string, string];
  table?: string[];
  deck?: string[];
}

export interface GameConfig {
  type?: GameTypes;
  seed?: string;
  tableSize?: number;
  timeLimit?: number | null;
  matchLimit?: number | null;
  matchTiles?: [string, string] | null;
  target?: TargetTypes;
  goalSize?: number | null;
  hintsLimit?: number | null;
}

export interface GamePlayer {
  id: string;
  name: string;
  color: string;
}

export interface GamePlayerState extends GamePlayer {
  active: boolean;
  found?: TrioTiles[];
  missed?: TrioTiles[];
  hints: number;
  reorders: number;
  selected?: string[];
}

export interface CheckResult {
  valid?: boolean;
  match?: boolean;
  miss?: null | (string[] | null)[];
  tiles?: string[];
  error?: string;
}

export interface GameApi {
  join(player: GamePlayer, ready?: boolean): GameApi;
  leave(playerId: string): GameApi;
  start(): GameApi;
  stop(): GameApi;
  toggle(playerId: string, tile: string): GameApi;
  miss(playerId: string, tiles: string[]): GameApi;
  submit(playerId: string, tiles: string[]): GameApi;
  reorder(): GameApi;
  tick(): GameApi;
  sync(newState: GameState): GameApi;
  hint(playerId: string): GameApi;

  check(playerId: string, tile: string): CheckResult;
  readonly state: GameState;
  readonly config: GameConfig;
}

function createGameState(config: GameConfig): GameState {
  const initialDeck = getDeck();
  const random = getSeededRandom(config.seed);
  const nextSeed = generateIdWithRandom(random);

  const base = {
    seed: config.seed,
    nextSeed,
    players: []
  };

  if (config.type === GameTypes.MATCH) {
    const [table, matchTiles] = createMatchTable(initialDeck,
      random,
      config.tableSize,
      config.matchTiles
    );

    return {
      ...base,
      matchTiles,
      table
    };
  }

  if (config.target === TargetTypes.DECK) {
    const shuffledDeck = shuffleWithRandom(initialDeck, random);
    const [table, deck] = pickTable(shuffledDeck, config.tableSize);

    return {
      ...base,
      deck,
      table
    };
  }

  if (config.target === TargetTypes.GOAL) {
    const [table] = createTable(
      initialDeck,
      random,
      config.tableSize,
      config.goalSize
    );

    return {
      ...base,
      table
    };
  }

  const [table] = createTable(
    initialDeck,
    random,
    config.tableSize,
    1
  );

  return {
    ...base,
    table
  };
}

export function createGame(gameConfig?: GameConfig, gameState?: GameState): GameApi {
  const type = gameConfig?.type === GameTypes.MATCH ? GameTypes.MATCH : GameTypes.FIND;
  const tableSize = gameConfig?.tableSize ?? (type === GameTypes.MATCH ? 6 : 12);
  const target = gameConfig?.target ?? TargetTypes.ENDLESS;

  const config = {
    type,
    tableSize,
    target,
    seed: gameConfig?.seed ?? gameState?.seed ?? generateId(),
    timeLimit: gameConfig?.timeLimit ?? null,
    matchLimit: gameConfig?.matchLimit ?? null,
    matchTiles: gameConfig?.matchTiles ?? null,
    goalSize: gameConfig?.goalSize ?? (target === TargetTypes.GOAL ? 1 : null),
    hintsLimit: type === GameTypes.MATCH ? 0 : (typeof gameConfig?.hintsLimit !== 'undefined' ? gameConfig.hintsLimit : 10)
  };

  const state = create(gameState);

  return createApi(state);

  function createApi(state: GameState): GameApi {
    return {
      start() {
        return createApi(start(state));
      },
      stop() {
        return createApi(stop(state));
      },
      tick() {
        return createApi(tick(state));
      },
      join(player, ready) {
        return createApi(join(state, player, ready));
      },
      leave(playerId) {
        return createApi(leave(state, playerId));
      },
      toggle(playerId, tile) {
        if (state.ended || !state.started) {
          return createApi(state);
        }

        return createApi(toggle(state, playerId, tile));
      },
      miss(playerId, tiles) {
        if (state.ended || !state.started) {
          return createApi(state);
        }

        return createApi(updatePlayer(state, playerId, increaseMissed, tiles));
      },
      submit(playerId, tiles) {
        if (state.ended || !state.started) {
          return createApi(state);
        }

        return createApi(submit(state, playerId, tiles));
      },
      reorder() {
        return createApi(reorder(state));
      },
      sync(newState) {
        return createApi(sync(state, newState));
      },
      check(playerId, tile) {
        return check(state, playerId, tile);
      },
      hint(playerId: string) {
        return createApi(hint(state, playerId));
      },
      get state() {
        return state;
      },
      get config() {
        return config;
      }
    };
  }

  function create(state?: GameState): GameState {
    if (state && (state.seed === config.seed)) {
      return state;
    }

    return createGameState(config);
  }

  function start(state: GameState): GameState {
    return startGameWithTimeLimit(state, config.timeLimit);
  }

  function stop(state: GameState): GameState {
    return stopGame(state);
  }

  function tick(state: GameState): GameState {
    if (shouldEnd(state)) {
      return endGame(state);
    }

    return state;
  }

  function join(state: GameState, player: GamePlayer, ready?: boolean): GameState {
    return joinPlayer(state, player, ready);
  }

  function leave(state: GameState, playerId: string): GameState {
    return leavePlayer(state, playerId);
  }

  function shouldEnd(state: GameState): boolean {
    if (config.timeLimit && state.started) {
      return (Date.now() - state.started) >= (state.remaining ?? 0);
    }

    if (config.type === GameTypes.MATCH) {
      return config.matchLimit ? getTotalFoundTrios(state) >= config.matchLimit : false;
    }

    if (config.target === TargetTypes.GOAL) {
      return getTotalFoundTrios(state) >= config.goalSize!;
    }

    if (config.target === TargetTypes.DECK) {
      return !hasMatch(state.table) && !hasMatch(state.deck);
    }

    if (config.target === TargetTypes.ENDLESS && config.goalSize) {
      return getTotalFoundTrios(state) >= config.goalSize;
    }

    return false;
  }

  function check(state: GameState, playerId: string, tile: string): CheckResult {
    if (!state.table?.includes(tile)) {
      return {
        valid: false,
        error: 'tile not in a game'
      };
    }

    const player = getPlayer(state, playerId);
    let tiles;

    if (config.type === GameTypes.MATCH) {
      tiles = state.matchTiles!.concat(tile);
    } else {
      tiles = player.selected.includes(tile) ?
        player.selected.filter((sel: string) => sel !== tile) :
        player.selected.concat(tile);
    }

    if (tiles.length !== 3) {
      return {
        valid: false,
        error: 'invalid tiles count'
      };
    }

    if (!isMatch(tiles)) {
      return {
        valid: true,
        match: false,
        miss: getMatchError(tiles) as CheckResult['miss'],
        tiles
      };
    }

    if (config.type === GameTypes.FIND && config.target === TargetTypes.GOAL) {
      if (hasAnyPlayerFound(state, tiles)) {
        return {
          valid: true,
          match: true,
          error: 'already found',
          tiles
        };
      }
    }

    return {
      valid: true,
      match: true,
      tiles
    };
  }

  function toggle(state: GameState, playerId: string, tile: string): GameState {
    if (!state.table?.includes(tile)) {
      return state;
    }

    if (config.type === GameTypes.MATCH) {
      const tiles = state.matchTiles!.concat(tile);

      if (!isMatch(tiles)) {
        return updatePlayer(state, playerId, increaseMissed, tiles);
      }

      const newState = updatePlayer(state, playerId, increaseFound, tiles);

      if (shouldEnd(newState)) {
        return endGame(newState);
      }

      return getNextMatchState(newState);
    }

    if (config.type === GameTypes.FIND) {
      const player = getPlayer(state, playerId);
      const selected = player.selected.includes(tile) ?
        player.selected.filter((sel: string) => sel !== tile) :
        player.selected.concat(tile);

      if (selected.length < 3) {
        return updatePlayer(state, playerId, {
          ...player,
          selected
        });
      }

      const matched = (
        isMatch(selected) &&
        (config.target !== TargetTypes.GOAL || !hasAnyPlayerFound(state, selected))
      );

      let newState = updatePlayer(state, playerId, {
        ...(matched ? increaseFound(player, selected) : increaseMissed(player, selected)),
        selected: []
      });

      if (!matched) {
        return newState;
      }

      if (config.target === TargetTypes.DECK) {
        newState = getNextFindDeckState(newState, selected);
      } else if (config.target === TargetTypes.ENDLESS) {
        newState = getNextFindEndlessState(newState, selected);
      }

      if (shouldEnd(newState)) {
        return endGame(newState);
      }

      return newState;
    }

    return state;
  }

  function getNextMatchState(state: GameState): GameState {
    const random = getSeededRandom(state.nextSeed);
    const nextSeed = generateIdWithRandom(random);
    const [table, matchTiles] = createMatchTable(
      getDeck(),
      random,
      config.tableSize
    );

    return {
      ...state,
      table,
      nextSeed,
      matchTiles
    };
  }

  function getNextFindDeckState(state: GameState, tiles: string[]): GameState {
    const [table, deck] = replaceTableWithDeck(state.deck, state.table, tiles, config.tableSize);

    return {
      ...state,
      table,
      deck
    };
  }

  function getNextFindEndlessState(state: GameState, tiles: string[]): GameState {
    const random = getSeededRandom(state.nextSeed);
    const nextSeed = generateIdWithRandom(random);
    const table = replaceTableWithRandom(getDeck(), state.table, tiles, random, config.tableSize);

    return {
      ...state,
      nextSeed,
      table
    };
  }

  function submit(state: GameState, playerId: string, tiles: string[]): GameState {
    console.log('PRE FOUND');

    if (!isMatch(tiles)) {
      return updatePlayer(state, playerId, increaseMissed, tiles);
    }

    if (config.type === GameTypes.MATCH) {
      const newState = updatePlayer(state, playerId, increaseFound, tiles);

      if (shouldEnd(newState)) {
        return endGame(newState);
      }

      return getNextMatchState(newState);
    }

    if (config.type === GameTypes.FIND) {
      if (config.target === TargetTypes.GOAL || hasAnyPlayerFound(state, tiles)) {
        return updatePlayer(state, playerId, increaseMissed, tiles);
      }

      let newState = updatePlayer(state, playerId, increaseFound, tiles);

      console.log('FOUND');

      if (config.target === TargetTypes.DECK) {
        newState = getNextFindDeckState(newState, tiles);
      } else if (config.target === TargetTypes.ENDLESS) {
        newState = getNextFindEndlessState(newState, tiles);
      }

      if (shouldEnd(newState)) {
        return endGame(newState);
      }

      return newState;
    }

    return state;
  }

  function reorder(state: GameState): GameState {
    return shuffleTable(state);
  }

  function sync(state: GameState, newState: GameState): GameState {
    const oldPlayersMap = state.players.reduce<Record<string, GamePlayerState>>((map, player) => {
      map[player.id] = player;

      return map;
    }, {});

    return {
      ...state,
      ...newState,
      players: newState.players.map((p) => {
        const old = oldPlayersMap[p.id];

        if (!old) {
          return p;
        }

        return ({
          ...p,
          selected: old.selected?.length ? old.selected.filter((tile) => newState.table!.includes(tile)) : []
        });
      }),
      table: updateTable(state.table, newState.table)
    };
  }

  function hint(state: GameState, playerId: string): GameState {
    if (config.type === GameTypes.MATCH) {
      return state;
    }

    const player = getPlayer(state, playerId);

    if (typeof config.hintsLimit === 'number' && player.hints >= config.hintsLimit!) {
      return state;
    }

    let matches = getMatches(state.table!.slice().sort());

    if (config.target === TargetTypes.GOAL) {
      matches = matches.filter((match) => !hasAnyPlayerFound(state, match));
    }

    if (!anyIncludeSubset(matches, player.selected)) {
      return updatePlayer(state, playerId, {
        ...player,
        selected: [matches[0][0]],
        hints: player.hints + 1
      });
    }

    if (player.selected.length === 1) {
      const current = player.selected[0];
      const matchWithSelected = matches.find((match) => match.includes(current));
      const nextSelected = matchWithSelected.filter((t: string) => t !== current)[0];

      return updatePlayer(state, playerId, {
        ...player,
        selected: [current, nextSelected],
        hints: player.hints + 1
      });
    }

    return state;
  }
}
