import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Tile } from '@/components/Tile.jsx';
import { getRandomTile } from '@/game/game.js';
import { GameActions, useGameDispatcher, useSavedGame } from '@/GameProvider.jsx';

import './Home.css';

export function Home() {
  const savedGame = useSavedGame();
  const dispatcher = useGameDispatcher();

  const [tiles, setTiles] = useState([
    { theme: 'shapes', tile: 'cbac' },
    { theme: 'shields', tile: 'cbac' },
    { theme: 'shields', tile: 'babb' },
    { theme: 'shapes', tile: 'bcbac'}
  ]);

  return (
    <>
      <div className="section menu">
        {savedGame && <button onClick={() => dispatcher({
          type: GameActions.LOAD,
          game: savedGame
        })}>Continue</button>}
        <button onClick={() => dispatcher({
          type: GameActions.CREATE
        })}>New game</button>
      </div>
      <div className="section home">
        <h1>TRIO</h1>
        <div className="tiles">
          <AnimatePresence>
            {tiles.map((tile, index) => <Tile key={index} {...tile} onSelect={() => changeTile(index)}/>)}
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
