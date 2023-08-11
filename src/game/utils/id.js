export function generateId() {
  return Math.random().toString(36).slice(2, 8);
}

export function generateIdWithRandom(random) {
  return random().toString(36).slice(2, 8);
}
