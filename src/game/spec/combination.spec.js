import { describe, expect, test } from 'vitest';
import { combination } from '@/game/utils.js';

const TEST_CASES = [
  {
    input: ['a'],
    expected: [
      ['a']
    ]
  },
  {
    input: ['a', 'b'],
    expected: [
      ['a', 'b']
    ]
  },
  {
    input: ['a', 'b', 'c'],
    expected: [
      ['a', 'b', 'c']
    ]
  },
  {
    input: ['a', 'b', 'c'],
    size: 2,
    expected: [
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'c']
    ]
  },
  {
    input: ['a', 'b', 'c'],
    size: 1,
    expected: [
      ['a'],
      ['b'],
      ['c']
    ]
  },
  {
    input: ['a', 'b', 'c', 'd'],
    size: 2,
    expected: [
      ['a', 'b'],
      ['a', 'c'],
      ['a', 'd'],
      ['b', 'c'],
      ['b', 'd'],
      ['c', 'd']
    ]
  }
];

describe('utils', () => {
  describe('combination', () => {
    TEST_CASES.forEach(({ input, expected, size }) => {
      test(`checks combination of ${JSON.stringify(input)} with size=${size ?? input.length}`, () => {
        expect(Array.from(combination(input, size))).toEqual(expected);
      });
    });
  });
});
