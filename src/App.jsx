import './App.css';
import { Home } from './home/Home.jsx';
import { Timer } from './components/Timer.jsx';
import { useRef, useState } from 'react';
import { createGame, toggleTile, getMatches, getMatchError } from '@/game/game.js';
import { ShieldTile } from '@/components/ShieldTile.jsx';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [game, setGame] = useState(null);
  const [start, setStart] = useState(null);
  const tilesEls = useRef([]);

  const tiles = game?.table.map((tile) => [tile, game.selected.includes(tile)]) || [];
  const matches = getMatches(game?.table);

  return (
    <>
      <Timer startTime={start} />
      <Home />

      <button onClick={() => {
        setGame(createGame());
        setStart(Date.now());
      }}>Start</button>

      <main className="tiles">
        <AnimatePresence>
          {tiles.map(([tile, isSelected], index) => <ShieldTile key={index} tile={tile} isSelected={isSelected} onClick={() => handleTile(tile)} ref={(el) => tilesEls.current[index] = el}/>)}
        </AnimatePresence>
      </main>

      <div>
        Seed: {game?.seed}<br/>
        Deck: {game?.deck?.length}<br/>
        Table: {game?.table?.length}<br/>
        Matches: {matches.length}<br/>
        {getMatches(game?.table).map((set) => set.join(',')).join(' | ')}
      </div>
    </>
  );

  function handleTile(tile) {
    const next = toggleTile(game, tile);

    if (next.missed.length > game.missed.length) {
      const miss = next.missed[next.missed.length - 1];
      const errors = getMatchError(miss);

      tiles.forEach(([tile], index) => {
        if (miss.includes(tile)) {
          tilesEls.current[index].shake();
        }
      });

      console.log('Errors', errors);
    }

    setGame(next);
  }
}

export default App;
