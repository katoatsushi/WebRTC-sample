import React from 'react';

const Video = ({ isLocal, name, videoRef }) => {
    return (
        <div>
            <video muted={isLocal} ref={videoRef} autoPlay />
            <div>{ name }</div>
            {/* <video muted={isLocal} ref={videoRef} autoPlay >
                <div style={{fontSize: 200}}>{ name }</div>
            </video> */}
        </div>
    );
};

export default Video;