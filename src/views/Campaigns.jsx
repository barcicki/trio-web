import classNames from 'classnames';
import { useCampaigns, useMissions } from '@/reducers/story.js';
import { TbCircleCheck, TbLock, TbLockOpen } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

import './Campaigns.css';
import { Tile } from '@/components/Tile.jsx';
import { TilesList } from '@/components/TilesList.jsx';

export function Campaigns() {
  const campaigns = useCampaigns();
  const missions = useMissions();

  const availableMissions = campaigns
    .map((cmp) => cmp.missions)
    .flat()
    .filter((id) => !missions[id].completed && !missions[id].locked);

  const availableMissionsInfo = availableMissions ? {
    label: 'Available missions',
    missions: availableMissions,
    showStatus: false
  } : null;

  return (
    <main className="campaigns">
      <div className="campaigns--actions">
        <Link className="button" to=".."><MdArrowBackIosNew/></Link>
        <Link className="button" to="../rules">Rules</Link>
      </div>
      {availableMissions && <Campaign {...availableMissionsInfo}/>}
      {campaigns.map((campaign) => <Campaign key={campaign.id} {...campaign}/>)}
    </main>
  );
}

function Campaign({ label, locked, missions, theme, showStatus = true }) {
  const missionsMap = useMissions();
  const completedCount = missions.filter((mission) => missionsMap[mission]?.completed).length;
  const missionsTotal = missions.length;
  const status = showStatus ? `(${completedCount}/${missionsTotal})` : '';

  return (
    <div className={classNames({
      campaign: true,
      locked
    })}>
      <h3>
        {theme && <TilesList className="campaign--tiles" tiles={['aaaa', 'bbbb', 'cccc']} theme={theme}/>}
        <span>{label} {status}</span>
      </h3>
      <div className="campaign--missions">
        {missions.map((id) => <Mission key={id} {...missionsMap[id]}/>)}
      </div>
    </div>
  );
}

function Mission(props) {
  const { id, label, locked, completed, theme, tile } = props;

  return (
    <Link className={classNames({
      mission: true,
      completed,
      locked
    })} to={id}>
      <MissionIcon {...props}/>
      {label}
      <Tile className="mission--tile" tile={tile} theme={theme}/>
    </Link>
  );
}

function MissionIcon({ completed, locked }) {
  if (completed) {
    return <TbCircleCheck/>;
  }

  if (locked) {
    return <TbLock/>;
  }

  return <TbLockOpen/>;
}
