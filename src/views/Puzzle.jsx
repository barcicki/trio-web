import { useSavedGame } from '@/hooks/useSavedGame.js';

export function Puzzle() {
  const [puzzle] = useSavedGame('puzzle');

  console.log(puzzle);

  return (
    <main className="puzzle limited">
      Puzzle {JSON.stringify(puzzle)}
    </main>
  );
}

