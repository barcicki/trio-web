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
