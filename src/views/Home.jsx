import { Tile } from '@/components/Tile.jsx';
import { AnimatePresence } from 'framer-motion';

import './Home.css';
import { useState } from 'react';
import { getRandomTile } from '@/game/game.js';

export function Home({ onSelect }) {
  const [tiles, setTiles] = useState([
    { theme: 'shapes', tile: 'cbac' },
    { theme: 'shields', tile: 'cbac' },
    { theme: 'shields', tile: 'babb' },
    { theme: 'shapes', tile: 'bcbac'}
  ]);

  return (
    <>
      <div className="section menu">
        <button onClick={() => onSelect?.('newGame')}>New game</button>
      </div>
      <div className="section home">
        <h1>TRIO</h1>
        <div className="tiles">
          <AnimatePresence>
            {tiles.map((tile, index) => <Tile key={index} {...tile} onClick={() => changeTile(index)}/>)}
          </AnimatePresence>
        </div>
      </div>
    </>
  );

  function changeTile(index) {
    const newTiles = tiles.slice();
    const tile = tiles[index];

    newTiles.splice(index, 1, {
      theme: tile.theme,
      tile: getRandomTile()
    });

    setTiles(newTiles);
  }
}
