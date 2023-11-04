import { Link, useLoaderData } from 'react-router-dom';
import { IntroTile } from '@/components/IntroTile.jsx';
import { GameGoal } from '@/components/GameGoal.jsx';
import { Intro } from '@/components/Intro.jsx';
import { format } from '@/utils/time.js';
import { Details } from '@/components/Details.jsx';
import { getTotalFoundTrios } from '@/game/trio/player.js';

export function FindGameIntro() {
  const savedGame = useLoaderData();

  return (
    <Intro goal={<GameGoal/>}>
      {savedGame && !savedGame.ended && <IntroTile>
        <Details details={{
          'Trios found': getTotalFoundTrios(savedGame),
          'Tiles in deck': savedGame.deck.length,
          'Time spent': format(savedGame.duration)
        }}/>
        <Link className="button" to="continue">Continue</Link>
      </IntroTile>}
      {!savedGame && <IntroTile>
        <p className="intro-hint">Is this your first game? Consider practicing finding <strong>trios</strong> first.</p>
        <Link className="button" to="../practice/endless">Practice</Link>
      </IntroTile>}
      <IntroTile>
        <Link className="button" to="new">{savedGame ? 'New game' : 'Start'}</Link>
      </IntroTile>
    </Intro>
  );
}
