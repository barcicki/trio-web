import { Link, useLoaderData } from 'react-router-dom';
import { Intro } from '@/components/Intro.jsx';
import { IntroTile } from '@/components/IntroTile.jsx';
import { ColorTag } from '@/components/ColorTag.jsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAbsoluteHref } from '@/hooks/useAbsoluteHref.js';
import { changeColor, setName, usePlayer } from '@/reducers/player.js';

import './OnlineIntro.css';

export function OnlineIntro() {
  const dispatch = useDispatch();
  const player = usePlayer();
  const newGameCode = useLoaderData();
  const newGameUrl = useAbsoluteHref(newGameCode);
  const [joinGameCode, setJoinGameCode] = useState();

  return (
    <Intro goal={<p>Find all trios in a shuffled deck of 81 unique tiles.<br/>The game starts with 12 tiles visible.<br/>When trio is found, selected 3 tiles are replaced with new ones from the deck. </p>}>
      <IntroTile className="online-profile">
        <ColorTag color={player?.color} onClick={() => dispatch(changeColor())}>Change Color</ColorTag>
        <input className="online-player-name-input" defaultValue={player?.name} onChange={(e) => dispatch(setName(e.target.value))}/>
      </IntroTile>
      <IntroTile className="online-mode">
        <p className="intro-hint">Got a game code? Join the game:</p>
        <input className="online-game-code-input" onChange={(e) => setJoinGameCode(e.target.value)}/>
        <Link className="button" to={joinGameCode ? String(joinGameCode).toLowerCase() : newGameUrl}>Join</Link>
      </IntroTile>
      <IntroTile className="online-mode">
        <p className="intro-hint">Start new game, share below game code or link:</p>
        <p className="online-game-code">{newGameCode}</p>
        <p className="online-game-link">{newGameUrl}</p>
        <Link className="button" to={newGameCode}>Create new game</Link>
      </IntroTile>
    </Intro>
  );
}
