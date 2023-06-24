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
  const callback = useCallback(() => ref.current(), []);

  ref.current = fn;

  return callback;
}
