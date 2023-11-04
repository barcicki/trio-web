import { useCampaigns, useMissions } from '@/reducers/story.js';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { CampaignItem } from '@/components/Campaign/CampaignItem.jsx';

import './CampaignList.css';

export function CampaignList() {
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
      {availableMissions && <CampaignItem {...availableMissionsInfo}/>}
      {campaigns.map((campaign) => <CampaignItem key={campaign.id} {...campaign}/>)}
    </main>
  );
}
