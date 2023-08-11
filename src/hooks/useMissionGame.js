import { useDispatch } from 'react-redux';
import { resetMission, updateMission, useMissions } from '@/reducers/story.js';
import { useCallback } from 'react';

export function useMissionGame(missionId) {
  const missions = useMissions();
  const mission = missions[missionId];
  const dispatch = useDispatch();
  const onUpdate = useCallback((game) => dispatch(updateMission({
    id: mission.id,
    game
  })), [mission.id, dispatch]);
  const onReset = useCallback(() => dispatch(resetMission(mission.id)), [mission.id, dispatch]);

  return [mission.game, onUpdate, onReset];
}
