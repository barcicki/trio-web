import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Tile } from '@/components/Tile.jsx';
import { getRandomTile } from '@/game/game.js';

import './Home.css';
import { Link } from 'react-router-dom';

export function Home() {
  const [tiles, setTiles] = useState([
    { theme: 'shapes', tile: 'cbac' },
    { theme: 'shields', tile: 'cbac' },
    { theme: 'shields', tile: 'babb' },
    { theme: 'shapes', tile: 'bcbac'}
  ]);

  return (
    <main className="home limited">
      <div className="home-promo">
        <h1>TRIO</h1>
        <div className="home-tiles">
          <AnimatePresence>
            {tiles.map((tile, index) => <Tile key={index} {...tile} onSelect={() => changeTile(index)}/>)}
          </AnimatePresence>
        </div>
      </div>
      <div className="home-menu">
        <Link className="button" to="game">Play</Link>
        <Link className="button disabled">Play online</Link>
        <Link className="button" to="puzzle">Puzzle</Link>
        <Link className="button" to="practice">Practice</Link>
        <Link className="button" to="rules">Rules</Link>
      </div>
    </main>
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
