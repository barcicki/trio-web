import { Tile } from '@/components/Tile.jsx';

import './ThemeButton.css';

export function ThemeButton({ onClick, theme, tile = 'abac', title }) {
  return <button className="theme-button" onClick={onClick} title={title}><Tile className="theme-tile" tile={tile} theme={theme}/></button>;
}
