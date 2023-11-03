import { useCallback, useEffect, useRef } from 'react';
import { format } from '@/utils/time.js';

function calcDiff(startTime, stopTime, direction) {
  const now = Date.now();
  const start = startTime || now;
  const end = stopTime || now;

  if (direction >= 0) {
    return Math.max(Math.min(now, end) - start, 0);
  }

  return Math.max(end - Math.max(now, start), 0);
}

export function Timer({ startTime, stopTime, direction = 1, ...props }) {
  const el = useRef(null);
  const handle = useRef(null);

  const update = useCallback(() => {
    // don't do anything if element is not available
    if (!el.current) {
      return;
    }

    const diff = calcDiff(startTime, stopTime, direction);
    const text = format(diff, direction);

    if (el.current.textContent !== text) {
      el.current.textContent = text;
    }

    handle.current = diff >= 0 ? requestAnimationFrame(update) : null;
  }, [el, handle, startTime, stopTime, direction]);

  useEffect(() => {
    if (startTime || stopTime) {
      handle.current = requestAnimationFrame(update);
    }

    return () => {
      if (handle.current) {
        cancelAnimationFrame(handle.current);
        handle.current = null;
      }
    };
  }, [handle, update, startTime, stopTime]);

  return (
    <span ref={el} {...props}>{format(calcDiff(startTime, stopTime, direction), direction)}</span>
  );
}
