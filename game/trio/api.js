import * as online from './online.js';
import * as puzzle from './puzzle.js';
import * as practice from './practice.js';
import * as single from './single.js';
import { GameModes } from './consts.js';

export const GameApis = {
  [GameModes.PUZZLE]: puzzle,
  [GameModes.SINGLE]: single,
  [GameModes.ONLINE]: online,
  [GameModes.PRACTICE]: practice
};
