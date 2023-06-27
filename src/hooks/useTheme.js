import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { THEMES } from '@/components/TileThemes/themes.js';
import { setTheme } from '@/reducers/theme.js';

function themeSelector(state) {
  return state?.theme;
}

export function useTheme() {
  const themeId = useSelector(themeSelector);
  const dispatch = useDispatch();

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const nextTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];
  const changeTheme = useCallback(() => dispatch(setTheme(nextTheme.id)), [dispatch, nextTheme]);

  return [currentTheme, nextTheme, changeTheme];
}
