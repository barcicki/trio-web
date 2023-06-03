import { describe, expect, test } from 'vitest';
import { analyze } from './analyze.js';

const TEST_CASES = [
  {
    input: [],
    expected: []
  },
  {
    input: ['a'],
    expected: [1]
  },
  {
    input: ['a', 'b'],
    expected: [2]
  },
  {
    input: ['a', 'a'],
    expected: [1]
  },
  {
    input: ['ab', 'ac'],
    expected: [1, 2]
  },
  {
    input: ['abcd', 'acbd'],
    expected: [1, 2, 2, 1]
  },
  {
    input: ['abcd', 'acbd', 'abcd'],
    expected: [1, 2, 2, 1]
  },
  {
    input: ['aaaa', 'bbbb', 'cccc'],
    expected: [3, 3, 3, 3]
  },
  {
    input: ['aaaa', 'abbb', 'accc'],
    expected: [1, 3, 3, 3]
  },
  {
    input: ['aaaa', 'abb', 'acc'],
    expected: [1, 3, 3, -1]
  },
  {
    input: ['aaaaaa', 'b'],
    expected: [2, -1, -1, -1, -1, -1]
  }
];

describe('game', () => {
  describe('analyze', () => {
    TEST_CASES.forEach(({ input, expected }) => {
      test(`can handle input=${JSON.stringify(input)}`, () => {
        expect(analyze(input)).toEqual(expected);
      });
    });
  });
});
