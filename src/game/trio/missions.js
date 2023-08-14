import { TargetTypes, GameTypes } from './consts.ts';

export const MISSIONS = [
  {
    id: 'match-3',
    label: 'Make trio with 3 shared features',
    goal: 'These tiles share $F1, $F2 and $F3. They have different $F4. Select a tile that has the same shared features but different $F4.',
    end: 'Trio completed!',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 1,
      matchTiles: ['aaaa', 'aaab'],
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'find-3-features-in-6',
    label: 'Find trio with 3 shared features within 6 tiles',
    goal: 'These tiles contain exactly 1 trio with 3 shared features. Find it.',
    end: 'Trio found!',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      timeLimit: null,
      hintsLimit: 0,
      sharedFeatures: [3],
      tableSize: 6
    }
  },
  {
    id: 'find-3-features-in-12',
    label: 'Find trio with 3 shared features within 12 tiles',
    goal: 'These tiles contain exactly 1 trio with 3 shared features. Find it.',
    end: 'Trio found!',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      timeLimit: null,
      hintsLimit: 0,
      sharedFeatures: [3],
      tableSize: 12
    }
  },
  {
    id: 'match-2',
    label: 'Make trio with 2 shared features',
    goal: 'These tiles share $F1 and $F2. They have different $F3 and $F4. Select a tile that has different $F3 and $F4 from those two.',
    end: 'Trio completed!',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 1,
      matchTiles: ['aaaa', 'aabb'],
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'find-2-features-in-6',
    label: 'Find trio with 2 shared features within 6 tiles',
    goal: 'These tiles contain exactly 1 trio with 2 shared features. Find it.',
    end: 'Trio found!',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      timeLimit: null,
      hintsLimit: 0,
      sharedFeatures: [2],
      tableSize: 6
    }
  },
  {
    id: 'find-2-features-in-12',
    label: 'Find trio with 2 shared features within 12 tiles',
    goal: 'These tiles contain exactly 1 trio with 2 shared features. Find it.',
    end: 'Trio found!',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      timeLimit: null,
      hintsLimit: 0,
      sharedFeatures: [2],
      tableSize: 12
    }
  },
  {
    id: 'match-1',
    label: 'Make trio with 1 shared feature',
    goal: 'These tiles have only one common feature - $F1. Select a tile with the same $F1 but different all other features.',
    end: 'Trio completed!',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 1,
      matchTiles: ['cabc', 'cbaa'],
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'find-1-features-in-6',
    label: 'Find trio with 1 shared features within 6 tiles',
    goal: 'These tiles contain exactly 1 trio with 1 shared features. Find it.',
    end: 'Trio found!',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      timeLimit: null,
      hintsLimit: 0,
      sharedFeatures: [1],
      tableSize: 6
    }
  },
  {
    id: 'find-1-features-in-12',
    label: 'Find trio with 1 shared features within 12 tiles',
    goal: 'These tiles contain exactly 1 trio with 1 shared features. Find it.',
    end: 'Trio found!',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      timeLimit: null,
      hintsLimit: 0,
      sharedFeatures: [1],
      tableSize: 12
    }
  },
  {
    id: 'match-0',
    label: 'Make trio with none shared feature',
    goal: 'These tiles don\'t share any features. Find a tile with different $F1, $F2, $F3 and $F4.',
    end: 'Trio completed!',
    config: {
      type: GameTypes.MATCH,
      matchLimit: 1,
      matchTiles: ['bbca', 'caac'],
      timeLimit: null,
      tableSize: 6
    }
  },
  {
    id: 'find-0-features-in-6',
    label: 'Find trio with none shared features within 6 tiles',
    goal: 'These tiles contain exactly 1 trio with none shared features. Find it.',
    end: 'Trio found!',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      timeLimit: null,
      hintsLimit: 0,
      sharedFeatures: [0],
      tableSize: 6
    }
  },
  {
    id: 'find-0-features-in-12',
    label: 'Find trio with none shared features within 12 tiles',
    goal: 'These tiles contain exactly 1 trio with none shared features. Find it.',
    end: 'Trio found!',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.GOAL,
      goalSize: 1,
      timeLimit: null,
      hintsLimit: 0,
      sharedFeatures: [0],
      tableSize: 12
    }
  },
  {
    id: 'match-10',
    label: 'Make 10 random trios',
    goal: 'Find matching tiles to 10 randomly selected pair of tiles.',
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
    goal: 'These tiles contain exactly 1 trio - find and select 3 matching tiles.',
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
    goal: 'These tiles contain exactly 1 trio - find and select 3 matching tiles.',
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
    goal: 'These tiles contain exactly 2 trios - select 3 tiles to check. Single tile can be part of multiple trios.',
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
    goal: 'These tiles contain exactly 1 trio - find and select 3 matching tiles.',
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
    goal: 'These tiles contain exactly 2 trios - select 3 tiles to check. Single tile can be part of multiple trios.',
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
    goal: 'These tiles contain exactly 3 trios - select 3 tiles to check. Single tile can be part of multiple trios.',
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
    goal: 'These tiles contain 1 or more trios. Select 3 tiles to check. If found, the tiles will be replaced with new random ones. Find 5 trios to complete a mission.',
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
    goal: 'These tiles contain 1 or more trios. Select 3 tiles to check. If found, the tiles will be replaced with new random ones. Find 10 trios to complete a mission.',
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
    goal: 'The deck contains 81 unique tiles. At least 12 tiles are visible with at least 1 hidden trio. When found, new tiles are drawn from the deck. The mission ends when there\'re no more tiles in the deck and no trio can be formed from remaining tiles on screen.',
    config: {
      type: GameTypes.FIND,
      target: TargetTypes.DECK,
      tableSize: 12,
      timeLimit: null,
      hintsLimit: 3
    }
  }
];
