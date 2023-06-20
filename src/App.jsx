import { useState } from 'react';
import { Home } from '@/views/Home.jsx';
import { Game } from '@/views/Game.jsx';

export default function App() {
  const [isPlaying, setPlaying] = useState(false);

  return (
    <>
      {!isPlaying && <Home onSelect={() => setPlaying(true)}/>}
      {isPlaying && <Game onExit={() => setPlaying(false)}/>}
    </>
  );
}
