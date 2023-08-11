import classNames from 'classnames';
import { useCampaigns, useMissions } from '@/reducers/story.js';
import { TbCircleCheck, TbLock, TbLockOpen } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

import './Campaigns.css';

export function Campaigns() {
  const campaigns = useCampaigns();
  const missions = useMissions();

  const nextMissionId = campaigns
    .map((cmp) => cmp.missions)
    .flat()
    .find((id) => !missions[id].completed && !missions[id].locked);

  const nextMission = nextMissionId ? {
    label: 'Next mission',
    missions: [nextMissionId],
    showStatus: false
  } : null;

  return (
    <main className="campaigns">
      <div className="campaigns--actions">
        <Link className="button" to=".."><MdArrowBackIosNew/></Link>
        <Link className="button" to="../rules">Rules</Link>
      </div>
      {nextMissionId && <Campaign {...nextMission}/>}
      {campaigns.map((campaign) => <Campaign key={campaign.id} {...campaign}/>)}
    </main>
  );
}

function Campaign({ label, locked, missions, showStatus = true }) {
  const missionsMap = useMissions();
  const completedCount = missions.filter((mission) => missionsMap[mission]?.completed).length;
  const missionsTotal = missions.length;
  const status = showStatus ? `(${completedCount}/${missionsTotal})` : '';

  return (
    <div className={classNames({
      campaign: true,
      locked
    })}>
      <h3>{label} {status}</h3>
      <div className="campaign--missions">
        {missions.map((id) => <Mission key={id} {...missionsMap[id]}/>)}
      </div>
    </div>
  );
}

function Mission(props) {
  const { id, label, locked, completed } = props;

  return (
    <Link className={classNames({
      mission: true,
      completed,
      locked
    })} to={id}>
      <MissionIcon {...props}/>
      {label}
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
