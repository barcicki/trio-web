import { AnimatePresence } from 'framer-motion';
import { Tile } from '@/components/Tile.jsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useResizeEffect } from '@/hooks/useResizeObserver.js';
import { getGrid } from '@/utils/grid.js';

import './TilesTable.css';

export const TilesTable = forwardRef(function TileTable({ className = '', tiles, selected = [], theme, onSelect }, ref) {
  const tilesEls = useRef([]);
  const tableEl = useRef();
  const [grid, setGrid] = useState(null);
  const gridTemplate = grid ? `repeat(${grid.rows}, 1fr) / repeat(${grid.cols}, 1fr)` : '';
  const gridClassName = grid ? `grid-${grid.tiles}-${grid.rows}x${grid.cols}` : '';
  const gridSizeValue = grid ? `${Math.floor(grid.size)}px` : '';

  useImperativeHandle(ref, () => {
    return {
      get current() {
        return tableEl.current;
      },
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

  const onResize = useCallback(() => {
    if (tableEl.current) {
      const area = tableEl.current.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(tableEl.current).gap) || 0;
      const gridConfig = getGrid(area.width, area.height, tiles.length, gap);

      if (gridConfig) {
        setGrid({
          rows: gridConfig.rows,
          cols: gridConfig.cols,
          size: gridConfig.width,
          tiles: tiles.length
        });
      }
    }
  }, [tableEl, tiles.length]);

  useResizeEffect(tableEl, onResize);
  useEffect(onResize, [onResize]);

  return (
    <div className={`tiles-table ${className} ${gridClassName}`} ref={tableEl} style={{ gridTemplate, '--tile-size': gridSizeValue }}>
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
