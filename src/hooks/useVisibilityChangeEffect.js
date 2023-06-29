import { useEffect } from 'react';
import { useCachedCallback } from '@/hooks/useCachedCallback.js';

export function useVisibilityChangeEffect(effect) {
  const onVisibilityChange = useCachedCallback(effect);

  useEffect(() => {
    window.addEventListener('visibilitychange', onVisibilityChange);
    return () => window.removeEventListener('visibilitychange', onVisibilityChange);
  }, [onVisibilityChange]);
}
