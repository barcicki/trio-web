import { Home } from '@/views/Home.jsx';
import { ToastPlaceholder } from '@/components/ToastPlaceholder.jsx';
import { useGame } from '@/GameProvider.jsx';
import { Game } from '@/views/Game.jsx';

export function App() {
  const game = useGame();

  return (
    <>
      {!game && <Home/>}
      {game && <Game/>}
      <ToastPlaceholder/>
    </>
  );
}
