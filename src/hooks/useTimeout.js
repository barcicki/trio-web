import { useEffect } from 'react';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';

export function useTimeout(fn, delay) {
  const cb = useCachedCallback(fn);

  useEffect(() => {
    const timer = setTimeout(cb, delay);

    return () => clearTimeout(timer);
  }, []);
}
