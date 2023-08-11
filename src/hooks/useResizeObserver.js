import { useLayoutEffect } from 'react';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';

export function useResizeEffect(ref, handler) {
  const callback = useCachedCallback(handler);

  useLayoutEffect(() => {
    const element = ref?.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      callback(element, entries[0]);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [callback, ref]);
}
