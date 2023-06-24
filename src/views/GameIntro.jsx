import { Link, useLoaderData } from 'react-router-dom';
import { IntroTile } from '@/components/IntroTile.jsx';
import { GameGoal } from '@/components/GameGoal.jsx';
import { Intro } from '@/components/Intro.jsx';
import { format } from '@/utils/time.js';
import { Details } from '@/components/Details.jsx';

export function GameIntro() {
  const savedGame = useLoaderData();

  return (
    <Intro goal={<GameGoal/>}>
      {savedGame && <IntroTile>
        <Details details={{
          'Trios found': savedGame.found.length,
          'Tiles in deck': savedGame.deck.length,
          'Time spent': format(savedGame.duration)
        }}/>
        <Link className="button" to="continue">Continue</Link>
      </IntroTile>}
      <IntroTile>
        <Link className="button" to="new">{savedGame ? 'New game' : 'Start'}</Link>
      </IntroTile>
    </Intro>
  );
}
