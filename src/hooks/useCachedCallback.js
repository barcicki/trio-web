import { useCallback, useRef } from 'react';

/**
 * Always returns same function instances but every time the parent component is rerendered it updates internal
 * reference to original function
 *
 * @param {function} fn
 * @returns {function}
 */
export function useCachedCallback(fn) {
  const ref = useRef();

  // always update reference
  ref.current = fn;

  // always same instance due to empty deps, that calls frequently-updated `ref` instance
  const callback = useCallback((...args) => ref.current(...args), []);

  return callback;
}
