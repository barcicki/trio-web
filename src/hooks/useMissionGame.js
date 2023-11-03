import { useDispatch } from 'react-redux';
import { resetMission, stopMission, updateMission, useMissions } from '@/reducers/story.js';
import { useCallback, useEffect } from 'react';

export function useMissionGame(missionId) {
  const missions = useMissions();
  const mission = missions[missionId];
  const dispatch = useDispatch();
  const onUpdate = useCallback((game) => dispatch(updateMission({
    id: mission.id,
    game
  })), [mission.id, dispatch]);
  const onReset = useCallback(() => dispatch(resetMission(mission.id)), [mission.id, dispatch]);
  const onStop = useCallback(() => dispatch(stopMission(mission.id)), [mission.id, dispatch]);

  useEffect(() => {
    return onStop;
  }, [onStop]);

  return [mission.game, onUpdate, onReset, onStop];
}
