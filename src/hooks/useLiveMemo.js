import { useMemo, useRef } from 'react';

/**
 * Creates a memoized entity using `fn` function that has access to kept-updating `ref` instance.
 * The ref.current will contain anything passed to `liveData`
 *
 * @param {function} fn
 * @param {any} liveData
 * @param {any[] }dependencies
 * @returns {any}
 */
export function useLiveMemo(fn, liveData, dependencies = []) {
  const ref = useRef();

  // always update current with liveData
  ref.current = liveData;

  return useMemo(() => fn(ref), dependencies);
}
