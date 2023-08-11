export const GameModes = {
  SINGLE: 'game',
  ONLINE: 'online',
  PUZZLE: 'puzzle',
  PRACTICE: 'practice'
} as const;
export type GameModes = typeof GameModes[keyof typeof GameModes];

export const GameTypes = {
  MATCH: 'match',
  FIND: 'find',
} as const;
export type GameTypes = typeof GameTypes[keyof typeof GameTypes];

export const TargetTypes = {
  GOAL: 'goal',
  DECK: 'deck',
  ENDLESS: 'endless'
} as const;
export type TargetTypes = typeof TargetTypes[keyof typeof TargetTypes];

export const CheckResults = {
  MATCH: 'match',
  MISS: 'miss',
  ALREADY_FOUND: 'already-found',
  TOO_SMALL: 'too-small',
  TOO_BIG: 'too-big',
} as const;
export type CheckResults = typeof CheckResults[keyof typeof CheckResults];
