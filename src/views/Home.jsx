import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TilesTable } from '@/components/TilesTable.jsx';
import { useTheme } from '@/hooks/useTheme.js';
import { getRandomTrio } from '@game/trio';

import './Home.css';

export function Home() {
  const [theme] = useTheme();
  const [tiles, setTiles] = useState(getRandomTrio());

  return (
    <main className="home limited">
      <h1 className="home-name">TRIO</h1>

      <TilesTable className="home-tiles" tiles={tiles} theme={theme.id} onSelect={() => changeTile()}/>

      <div className="home-menu">
        <Link className="button" to="campaign">Campaign</Link>
        <Link className="button" to="game">Play</Link>
        <Link className="button" to="online">Play online</Link>
        <Link className="button" to="puzzle">Puzzle</Link>
        <Link className="button" to="practice">Practice</Link>
        <Link className="button" to="rules">Rules</Link>
      </div>
    </main>
  );

  function changeTile() {
    setTiles(getRandomTrio());
  }
}
