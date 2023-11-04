import classNames from 'classnames';
import { useMissions } from '@/reducers/story.js';
import { TilesList } from '@/components/TilesList.jsx';
import { MissionItem } from '@/components/Campaign/MissionItem.jsx';

import './CampaignItem.css';

export function CampaignItem({ label, locked, missions, theme, showStatus = true }) {
  const missionsMap = useMissions();
  const completedCount = missions.filter((mission) => missionsMap[mission]?.completed).length;
  const missionsTotal = missions.length;
  const status = showStatus ? `(${completedCount}/${missionsTotal})` : '';

  return (
    <div className={classNames({
      campaign: true,
      locked
    })}>
      <h3 className="campaign--label">
        {theme && <TilesList className="campaign--tiles" tiles={['aaaa', 'bbbb', 'cccc']} theme={theme}/>}
        <span>{label} {status}</span>
      </h3>
      <div className="campaign--missions">
        {missions.map((id) => <MissionItem key={id} {...missionsMap[id]}/>)}
      </div>
    </div>
  );
}
