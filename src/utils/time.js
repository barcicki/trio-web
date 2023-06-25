export function format(ms, direction = 1) {
  const sign = Math.sign(ms) >= 0 ? '' : '-';
  const s = Math.abs(ms) / 1000;
  const seconds = direction > 0 ? Math.floor(s) : Math.ceil(s);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const minutesString = pad(minutes % 60);
  const secondsString = pad(seconds % 60);

  if (hours > 0) {
    return `${sign}${pad(hours)}:${minutesString}:${secondsString}`;
  }

  return `${sign}${minutesString}:${secondsString}`;
}
export function pad(num, len = 2) {
  return String(num).padStart(len, '0');
}
