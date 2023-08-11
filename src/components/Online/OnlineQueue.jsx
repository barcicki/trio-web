import { ColorTag } from '@/components/ColorTag.jsx';
import { TbCircleCheck, TbProgress, TbProgressX } from 'react-icons/tb';

import './OnlineQueue.css';

export function OnlineQueue({
    currentPlayer,
    otherPlayers,
    onReady
}) {
    return (
        <div className="online-status centered">
            <p>Waiting for players</p>
            <div className="online-players">
                {[currentPlayer, ...otherPlayers].map((p) => (
                    <ColorTag key={p.id} className="online-player" color={p.color}>
                        {getPlayerStatusIcon(p)} {p.name}
                    </ColorTag>
                ))}
            </div>
            {!currentPlayer?.ready && <button onClick={onReady}>I&apos;m ready</button>}
        </div>
    );
}

function getPlayerStatusIcon(player) {
    if (!player?.active) {
        return <TbProgressX/>;
    }

    return player.ready ? <TbCircleCheck/> : <TbProgress className="animated"/>;
}
