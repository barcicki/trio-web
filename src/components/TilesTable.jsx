import { AnimatePresence } from 'framer-motion';
import { Tile } from '@/components/Tile.jsx';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import './TilesTable.css';

export const TilesTable = forwardRef(function TileTable({ tiles, selected = [], theme, onSelect }, ref) {
  const tilesEls = useRef([]);

  useImperativeHandle(ref, () => {
    return {
      shakeIndex(index) {
        return tilesEls.current[index]?.shake?.();
      },
      shakeTile(tile) {
        const index = tiles.indexOf(tile);

        if (index >= 0) {
          return tilesEls.current[index]?.shake?.();
        }
      },
      shakeIndexes(indexesToShake) {
        return Promise.all(indexesToShake.map((index) => {
          return tilesEls.current[index]?.shake?.();
        }));
      },
      shakeTiles(tilesToShake) {
        return Promise.all(tilesToShake.map((tile) => {
          const index = tiles.indexOf(tile);

          if (index >= 0) {
            return tilesEls.current[index]?.shake?.();
          }
        }));
      }
    };
  });

  return (
    <div className="tiles-table">
      <AnimatePresence>
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            tile={tile}
            isSelected={selected.includes(tile)}
            theme={theme}
            onSelect={onSelect}
            ref={(el) => tilesEls.current[index] = el}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});
