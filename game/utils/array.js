export function swap(array, indexA, indexB) {
  const toSwap = array[indexA];

  array[indexA] = array[indexB];
  array[indexB] = toSwap;
}
