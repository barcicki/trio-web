import './App.css';
import { Home } from './home/Home.jsx';
import { Timer } from './components/Timer.jsx';
import { useRef, useState } from 'react';
import { createGame, toggleTile, getMatches } from '@/game/game.js';
import { Tile } from '@/components/Tile.jsx';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [game, setGame] = useState(null);
  const [start, setStart] = useState(null);
  const [theme, setTheme] = useState('shields');
  const tilesEls = useRef([]);

  const tiles = game?.table.map((tile) => [tile, game.selected.includes(tile)]) || [];
  const matches = getMatches(game?.table);

  return (
    <>
      <Timer startTime={start} />
      <Home />

      <button onClick={() => setTheme('shields')}>Shields</button>
      <button onClick={() => {
        setGame(createGame());
        setStart(Date.now());
      }}>Start</button>
      <button onClick={() => setTheme('shapes')}>Shapes</button>

      <main className="tiles">
        <AnimatePresence>
          {tiles.map(([tile, isSelected], index) => <Tile key={index} tile={tile} isSelected={isSelected} theme={theme} onClick={() => handleTile(tile)} ref={(el) => tilesEls.current[index] = el}/>)}
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

      tiles.forEach(([tile], index) => {
        if (miss.includes(tile)) {
          tilesEls.current[index].shake();
        }
      });
    }

    setGame(next);
  }
}

export default App;
