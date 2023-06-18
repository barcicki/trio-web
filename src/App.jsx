import './App.css';
import { Home } from './home/Home.jsx';
import { Timer } from './components/Timer.jsx';
import { useState } from 'react';
import { createGame, toggleTile, getMatches, toStyleArray } from '@/game/game.js';
import { ShieldTile } from '@/components/ShieldTile.jsx';

function App() {
  const [game, setGame] = useState(null);
  const [start, setStart] = useState(null);

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
        {tiles.map(([tile, isSelected]) => <ShieldTile key={tile} styles={toStyleArray(tile)} isSelected={isSelected} onClick={() => handleTile(tile)}/>)}
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
    setGame(toggleTile(game, tile));
  }
}

export default App;
