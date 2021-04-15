import React,{useReducer, useState, useEffect} from 'react';
import RtcClient from '../../utils/RtcClient'

const useRtcClient = () => {
    const [rtcClient, _setRtcClient] = useState(null);
    const [, forceRender] = useReducer((boolean) => !boolean, false)

    const setRtcClient = (rtcClient) => {
        _setRtcClient(rtcClient);
        forceRender();
    }
    useEffect(() => {
        const init = async () => {
            const client = new RtcClient(setRtcClient);
            await client.setMediaStream();
        }
        init();
    },[])
    console.log({rtcClient})

    return rtcClient;
};

export default useRtcClient;