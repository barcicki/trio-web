import { AnimatePresence } from 'framer-motion';
import { Tile } from '@/components/Tile.jsx';

import './TilesList.css';

export function TilesList({ tiles, theme, className }) {
  return (
    <div className={`tiles-list ${className || ''}`}>
      <AnimatePresence>
      {tiles.map((tile, index) => <Tile key={index} tile={tile} theme={theme}/>)}
      </AnimatePresence>
    </div>
  );
}
