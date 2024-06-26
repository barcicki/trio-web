import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { usePlayer } from '@/reducers/player.js';
import { useMissions } from '@/reducers/story.js';
import { LocalGame } from '@/components/Game/LocalGame.jsx';
import { useMissionGame } from '@/hooks/useMissionGame.js';
import { getTheme } from '@/components/TileThemes/themes.js';

export function MissionGame() {
  const missionId = useLoaderData();
  const missions = useMissions();
  const mission = missions[missionId];
  const nextMission = missions[mission.next];
  const [game, onUpdate, onReset] = useMissionGame(missionId);
  const player = usePlayer();
  const theme = getTheme(mission.theme);
  const missionGoal = mission.goal
    .replace(/\$F(\d)/g, (str, place) => theme.features[Number(place) - 1]);
  const [infoVisible, setInfoVisible] = useState(true);

  useEffect(() => {
    setInfoVisible(true);
  }, [missionId]);

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
      showInfo={!infoVisible}
      onInfo={() => setInfoVisible(true)}
      onGoalClose={() => setInfoVisible(false)}
      goalText={infoVisible ? missionGoal : null}
      endHeader={mission.end || `Mission completed!`}
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
