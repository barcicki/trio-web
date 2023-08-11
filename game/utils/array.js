export function swap(array, indexA, indexB) {
  const toSwap = array[indexA];

  array[indexA] = array[indexB];
  array[indexB] = toSwap;
}

export function includesSubset(array, subset) {
  if (!subset.length) {
    return false;
  }

  return subset.every((tile) => array.includes(tile));
}

export function anyIncludeSubset(arrays, subset) {
  if (!subset.length) {
    return false;
  }

  return arrays.some((set) => includesSubset(set, subset));
}
