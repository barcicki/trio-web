import { describe, expect, test } from 'vitest';
import { createDeck } from './deck.js';

describe('game', () => {
  describe('deck', () => {
    test('can generate single-item deck correctly', () => {
      const result = createDeck({
        noOfFeatureValues: 1,
        noOfFeatures: 1
      });

      expect(result).toEqual(['a']);
    });

    test('can generate deck with 4 features and 2 feature values correctly', () => {
      const result = createDeck({
        noOfFeatureValues: 2,
        noOfFeatures: 4
      });

      expect(result).toEqual([
        'aaaa', 'aaab',
        'aaba', 'aabb',
        'abaa', 'abab',
        'abba', 'abbb',
        'baaa', 'baab',
        'baba', 'babb',
        'bbaa', 'bbab',
        'bbba', 'bbbb'
      ]);
    });

    test('can generate default deck correctly', () => {
      const result = createDeck();

      expect(result.length).toEqual(81);
      expect(new Set(result).size).toEqual(81);
    });

    test('throws when too many feature values requested', () => {
      expect(() => createDeck({
        noOfFeatureValues: 27
      })).toThrowError();
    });
  });
});
