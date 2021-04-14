import React, { useState } from 'react';
import {Button} from '@material-ui/core'
import InputFormRemote from './InputFormRemote'
import InputFormLocal from './InputFormLocal'


const getMedia  = async () => {
  const constraints = { audio: true, video: true };
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch(err) {
    /* エラーを処理 */
    console.log(err)
  }
}

getMedia();

const App = () =>  {
  const [localPeername, setLoaclPeername] = useState('');
  const [remotePeername, setRemotePeername] = useState('');
  return (
    <>
      <InputFormLocal 
        localPeername={localPeername}
        setLoaclPeername={setLoaclPeername}
      />
      <InputFormRemote 
        remotePeername={remotePeername}
        setRemotePeername={setRemotePeername}
      />
    </>
  );
}

export default App;
