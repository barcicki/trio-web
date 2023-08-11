import { TargetTypes, GameTypes } from './consts.ts';

export const MISSIONS = [
  {
    id: 'match-3',
    label: 'Make trio with 3 shared features',
    goal: 'Select matching tile',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 1,
      matchTiles: ['aaaa', 'aaab'],
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'match-2',
    label: 'Make trio with 2 shared features',
    goal: 'Select matching tile',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 1,
      matchTiles: ['abba', 'abcc'],
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'match-1',
    label: 'Make trio with 1 shared feature',
    goal: 'Select matching tile',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 1,
      matchTiles: ['cabc', 'cbaa'],
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'match-0',
    label: 'Make trio with none shared feature',
    goal: 'Select matching tile',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 1,
      matchTiles: ['bbca', 'caac'],
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'match-10',
    label: 'Make 10 random trios',
    goal: 'Select matching tile',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 10,
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'find-in-6',
    label: 'Find trio within 6 tiles',
    goal: 'Select 3 matching tiles',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      tableSize: 6,
      timeLimit: null,
      hintsLimit: 0
    }
  },
  {
    id: 'find-in-8',
    label: 'Find trio within 8 tiles',
    goal: 'Select 3 matching tiles',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      tableSize: 8,
      timeLimit: null,
      hintsLimit: 0
    }
  },
  {
    id: 'find-2-in-8',
    label: 'Find 2 trios within 8 tiles',
    goal: 'Find 2 hidden trios',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 2,
      tableSize: 8,
      timeLimit: null,
      hintsLimit: 0
    }
  },
  {
    id: 'find-in-12',
    label: 'Find trio within 12 tiles',
    goal: 'Select 3 matching tiles',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      tableSize: 12,
      timeLimit: null,
      hintsLimit: 1
    }
  },
  {
    id: 'find-2-in-12',
    label: 'Find 2 trios within 12 tiles',
    goal: 'Find 2 hidden trios',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 2,
      tableSize: 12,
      timeLimit: null,
      hintsLimit: 1
    }
  },
  {
    id: 'find-3-in-12',
    label: 'Find 3 trios within 12 tiles',
    goal: 'Find 3 hidden trios',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 3,
      tableSize: 12,
      timeLimit: null,
      hintsLimit: 1
    }
  },
  {
    id: 'find-5-in-endless',
    label: 'Find 5 trios',
    goal: 'Find hidden trios. Found tiles will be replaced with new random ones.',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.ENDLESS,
      goalSize: 5,
      tableSize: 12,
      timeLimit: null,
      hintsLimit: 2
    }
  },
  {
    id: 'find-10-in-endless',
    label: 'Find 10 trios',
    goal: 'Find hidden trios. Found tiles will be replaced with new random ones.',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.ENDLESS,
      goalSize: 10,
      tableSize: 12,
      timeLimit: null,
      hintsLimit: 3
    }
  },
  {
    id: 'find-in-deck',
    label: 'Find all trios within a deck',
    goal: 'Find hidden trios. Found tiles will be replaced with new one from the deck until it runs out of tiles.',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.DECK,
      tableSize: 12,
      timeLimit: null,
      hintsLimit: 3
    }
  }
];
