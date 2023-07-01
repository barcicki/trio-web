import { useHref } from 'react-router-dom';

export function useAbsoluteHref(to) {
  const href = useHref(to);
  const { protocol, host } = window.location;

  return `${protocol}//${host}${href}`;
}
