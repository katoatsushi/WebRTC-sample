import React, { useRef, useEffect } from 'react';

import Video from './Video'

const VideoLocal = ({ rtcClient }) => {
    const videoRef = useRef(null);
    const currentVideoRef = videoRef.current;
    const mediaStream = rtcClient.mediaStream

    useEffect(() => {
        if (currentVideoRef === null) return;
        const getMedia  = () => {
            // const constraints = { audio: true, video: true };
            try {
                currentVideoRef.srcObject = mediaStream;
            } catch(err) {
                console.log(err)
            }
        }
        getMedia();
    },[currentVideoRef, mediaStream]);

    return <Video isLocal={true} name={rtcClient.localPeername} videoRef={videoRef} />;
}

export default VideoLocal