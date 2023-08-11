import { generateId } from './id.js';
import { getSeededRandom } from './random.js';
import { swap } from './array.js';

export function shuffle(array, seed = generateId()) {
  return shuffleWithRandom(array, getSeededRandom(seed));
}

export function shuffleWithRandom(array, random) {
  const result = array.slice();
  let index = result.length;

  while (index > 0) {
    const other = Math.floor(random() * index--);

    swap(result, index, other);
  }

  return result;
}
