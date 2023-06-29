import { useEffect } from 'react';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';

export function useIntervalEffect(effect, interval) {
  const onInterval = useCachedCallback(effect); // wrap with cached callback to make sure that reference won't change

  useEffect(() => {
    const intervalId = setInterval(onInterval, interval);
    return () => clearInterval(intervalId);
  }, [interval, onInterval]);
}
