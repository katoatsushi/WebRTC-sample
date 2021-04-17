import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useDimensions from './hooks/useDimensions'
import VolumeButton from './VolumeButton'

const Video = ({ isLocal, name, videoRef, rtcClient }) => {
    const [muted, setMuted] = useState(rtcClient.initialAudioMuted)
    const refCard = useRef(null)
    const dimensionCard = useDimensions(refCard)

    return (
        <Card ref={refCard}>
        <CardActionArea>
            <video 
                muted={isLocal || muted} 
                ref={videoRef} 
                autoPlay
                width={dimensionCard.width}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {name}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <VolumeButton 
                isLocal={isLocal}
                muted={muted} 
                setMuted={setMuted}
                rtcClient={rtcClient}
            />
        </CardActions>
        </Card>
    );
}


// const V = ({ isLocal, name, videoRef }) => {
//     return (
//         <div>
//             <video muted={isLocal} ref={videoRef} autoPlay />
//             <div>{ name }</div>
//         </div>
//     );
// };

export default Video;