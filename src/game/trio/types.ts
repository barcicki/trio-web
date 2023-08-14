import type { GameTypes, TargetTypes } from '@/game/trio/consts.ts';

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
  sharedFeatures?: number[];
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
