import { THEMES } from '@/components/TileThemes/themes.js';

export function getTheme(game) {
  const theme = THEMES.find((t) => t.id === game.theme);

  return theme || THEMES[0];
}

export function getNextTheme(game) {
  const index = THEMES.findIndex((t) => t.id === game.theme);

  if (index < 0) {
    return THEMES[1]; // assuming it exists :)
  }

  return THEMES[(index + 1) % THEMES.length];
}

export function setTheme(game, theme) {
  return {
    ...game,
    theme: theme.id
  };
}
