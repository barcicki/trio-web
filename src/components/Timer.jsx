import { useRef } from 'react';
import { format } from '@/utils/time.js';

export function Timer({ startTime, stopTime, direction = 1, ...props }) {
  const el = useRef(null);
  const handle = useRef(null);

  if (handle.current) {
    cancelAnimationFrame(handle.current);
  }

  if (startTime || stopTime) {
    handle.current = requestAnimationFrame(update);
  }

  return (
    <span ref={el} {...props}>{format(calcDiff(), direction)}</span>
  );

  function calcDiff() {
    const now = Date.now();
    const start = startTime || now;
    const end = stopTime || now;

    if (direction >= 0) {
      return Math.max(Math.min(now, end) - start, 0);
    }

    return Math.max(end - Math.max(now, start), 0);
  }


  function update() {
    const diff = calcDiff();
    const text = format(diff, direction);

    if (el.current && el.current.textContent !== text) {
      el.current.textContent = text;
    }

    handle.current = diff >= 0 ? requestAnimationFrame(update) : null;
  }
}
