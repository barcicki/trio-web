import { Link, useLoaderData } from 'react-router-dom';
import { usePlayer } from '@/reducers/player.js';
import { useMissions } from '@/reducers/story.js';
import { LocalGame } from '@/components/Game/LocalGame.jsx';
import { useMissionGame } from '@/hooks/useMissionGame.js';

export function CampaignMission() {
  const missionId = useLoaderData();
  const missions = useMissions();
  const mission = missions[missionId];
  const nextMission = missions[mission.next];
  const [game, onUpdate, onReset] = useMissionGame(missionId);
  const player = usePlayer();

  return (
    <LocalGame
      backPath=".."
      config={mission.config}
      game={game}
      theme={mission.theme}
      showPlayers={false}
      player={player}
      canChangeTheme={false}
      onUpdate={onUpdate}
      goalText={mission.goal}
      endHeader="Mission completed!"
      endShowTime={false}
      endActions={(
        <>
          <Link className="button" to="..">Back</Link>
          <Link className="button" onClick={onReset}>Restart</Link>
          {nextMission && <Link className="button primary" to={`../${nextMission.id}`}>Next mission</Link>}
        </>
      )}
    />
  );
}
