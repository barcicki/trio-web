/**
 * Analyzes letters in words, and returns an array with number of unique letters used at given position. If any of words
 * doesn't have a letter at this position, it would result in `-1`
 *
 * In Trio game, it can simplify checks for match under various conditions.
 * For example, assume the tiles have 4 features with 3 possible values. It can be represented by words with 4 letters
 * length, and letters `a`, `b` & `c`.
 * @example analyze(['abca', 'bbca', 'cbca']) // -> [3, 1, 1, 1]
 * The match is when all items in the array are equal to 1 or 3.
 *
 * @param {string[]} words
 * @returns {number[]}
 */
export function analyze(words) {
  const result = [];

  if (!words?.length) {
    return result;
  }

  const maxWordLength = Math.max(...words.map((word) => word.length));

  mainLoop:
  for (let i = 0; i < maxWordLength; i++) {
    const set = new Set();

    for (let j = 0; j < words.length; j++) {
      const letter = words[j][i];

      if (!letter) {
        result.push(-1);
        continue mainLoop;
      }

      set.add(letter);
    }

    result.push(set.size);
  }

  return result;
}
