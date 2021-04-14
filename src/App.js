import React from 'react';


// async function getMedia() {
//   const constraints = { audio: true, video: true };
  // let stream = null;

  // try {
  //   stream = await navigator.mediaDevices.getUserMedia(constraints);
  //   /* ストリームを使用 */
  // } catch(err) {
  //   /* エラーを処理 */
  // }
// }
const getMedia  = async () => {
  const constraints = { audio: true, video: true };
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch(err) {
    /* エラーを処理 */
  }
}

getMedia();

const App = () =>  {
  return <div>Hello, React!</div>;
}

export default App;
