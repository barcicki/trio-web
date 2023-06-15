import { describe, expect, test } from 'vitest';
import { permutation } from '@/game/utils.js';

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
      ['a', 'b'],
      ['b', 'a'],
    ]
  },
  {
    input: ['a', 'b', 'c'],
    expected: [
      ['a', 'b', 'c'],
      ['a', 'c', 'b'],
      ['b', 'a', 'c'],
      ['b', 'c', 'a'],
      ['c', 'a', 'b'],
      ['c', 'b', 'a']
    ]
  },
  {
    input: ['a', 'b', 'c'],
    size: 2,
    expected: [
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'a'],
      ['b', 'c'],
      ['c', 'a'],
      ['c', 'b']
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
      ['b', 'a'],
      ['b', 'c'],
      ['b', 'd'],
      ['c', 'a'],
      ['c', 'b'],
      ['c', 'd'],
      ['d', 'a'],
      ['d', 'b'],
      ['d', 'c']
    ]
  }
];

describe('utils', () => {
  describe('permutation', () => {
    TEST_CASES.forEach(({ input, expected, size }) => {
      test(`checks permutation of ${JSON.stringify(input)} with size=${size ?? input.length}`, () => {
        expect(Array.from(permutation(input, size))).toEqual(expected);
      });
    });
  });
});
