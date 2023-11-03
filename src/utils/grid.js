export function getGrid(containerWidth, containerHeight, count, gap, ratio = 1) {
  let best = null;

  for (let i = 1; i <= count; i++) {
    const cols = i;
    const rows = Math.ceil(count / cols);
    const maxWidth = (containerWidth - gap * (cols - 1)) / cols;
    const maxHeight = (containerHeight - gap * (rows - 1)) / rows;
    const [width, height] = getContainedSize(maxWidth, maxHeight, ratio);
    const area = width * height;

    if (!best || area > best.area) {
      best = {
        cols,
        rows,
        width,
        height,
        area
      };
    }
  }

  return best;
}

export function getContainedSize(containerWidth, containerHeight, ratio) {
  const maxWidth = Math.min(containerHeight * ratio, containerWidth);
  const maxHeight = Math.min(containerWidth / ratio, containerHeight);

  return ratio > 1 ? [maxWidth, maxWidth / ratio] : [maxHeight * ratio, maxHeight];
}
