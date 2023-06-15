import { describe, expect, test } from 'vitest';
import { createCore } from '@/game/core.js';
import { MATCH_CASES, TABLE_CASES } from './cases.js';

describe('core', () => {
  MATCH_CASES.forEach(({ totalFeatures, values, tests }) => {
    describe(`when features=${totalFeatures} with values=${JSON.stringify(values)}`, () => {
      tests.forEach(({ input, match, canMatch }) => {
        test(`checks correctly if ${JSON.stringify(input)} is${match ? '' : ' not'} a match`, () => {
          const core = createCore({
            totalFeatures,
            values
          });

          expect(core.isMatch(input)).toEqual(match);
          expect(core.canMatch(input)).toEqual(canMatch);

          if (match) {
            expect(core.getMatchingTile(input.slice(0, -1))).toEqual(input[input.length - 1]);
          }
        });
      });
    });
  });

  TABLE_CASES.forEach(({ totalFeatures, values, tests }) => {
    describe(`when features=${totalFeatures} with values=${JSON.stringify(values)}`, () => {
      tests.forEach(({ input, matches }) => {
        test(`checks correctly if ${JSON.stringify(input)} has matches`, () => {
          const core = createCore({
            totalFeatures,
            values
          });

          expect(core.getMatches(input)).toEqual(matches);
          expect(core.countMatches(input)).toEqual(matches.length);
          expect(core.hasMatch(input)).toEqual(matches.length > 0);
        });
      });
    });
  });
});
