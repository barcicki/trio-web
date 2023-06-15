import createSeededRandom from 'seedrandom';

export function generateId() {
  return Math.random().toString(36).slice(2, 8);
}

export function shuffle(array, seed = generateId()) {
  const random = createSeededRandom(seed);
  const result = array.slice();
  let index = result.length;

  while (index > 0) {
    const other = Math.floor(random.quick() * index--);

    swap(result, index, other);
  }

  return result;
}

export function* permutation(array, size = array.length) {
  const count = array.length;
  const data = [];
  const used = [];

  yield* next(0);

  function* next(index) {
    if (index === size) {
      return yield data.slice();
    }

    for (let i = 0; i < count; i++) {
      if (!used[i]) {
        used[i] = true;
        data[index] = array[i];
        yield *next(index + 1);
        used[i] = false;
      }
    }
  }
}

export function* combination(array, size = array.length) {
  const count = array.length;
  const data = [];

  yield* next(0, 0);

  function* next(start, index) {
    if (index === size) {
      return yield data.slice();
    }

    for (let i = start; i < count && count - i >= size - index; i++) {
      data[index] = array[i];
      yield* next(i + 1, index + 1);
    }
  }
}

export function swap(array, indexA, indexB) {
  const toSwap = array[indexA];

  array[indexA] = array[indexB];
  array[indexB] = toSwap;
}
