import React from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import IconButton from '@material-ui/core/IconButton';

const VolumeButton = ({muted, setMuted,rtcClient, isLocal}) => {
    const Icon = muted ? VolumeOffIcon : VolumeUpIcon
    return (
        <IconButton aria-label="switch mute" 
        onClick={() => {
            setMuted((prev) => !prev);
            // 以下はlocal側だけで実行可能
            if (isLocal) rtcClient.toggleAudio();
        }}>
            <Icon />
        </IconButton>
    )
}

export default VolumeButton