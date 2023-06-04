export function format(ms) {
  const sign = Math.sign(ms) >= 0 ? '' : '-';
  const seconds = Math.floor(Math.abs(ms) / 1000);
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
