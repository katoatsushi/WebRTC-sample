import FirebaseSignallingClient from "./FirebaseSignallingClient";
export default class RtcClient {
    constructor(setRtcClient) {
        const config = {
            // スタンサーバーの情報
            // このクライアントがインターンネット上でどのIPアドレスになるかを教えてくれる
            iceServers: [{urls: "stun:stun.stunprotocol.org"}]
        }
        this.rtcPeerConnection = new RTCPeerConnection(config);
        this.firebaseSignallingClient = new FirebaseSignallingClient()
        this.localPeername = '';
        this.remotePeername = '';
        this._setRtcClient = setRtcClient;
        this.mediaStream = null;
    }
    setRtcClient() {
        this._setRtcClient(this);
    }
    async getUserMedia() {
        try {
        const constraints = { audio: true , video: true}
        this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch(error) {
            console.log({error})
        }
    }

    startListening(localPeername) {
        this.localPeername = localPeername;
        this.setRtcClient();
        this.firebaseSignallingClient.database.ref(localPeername).on('value', (snapshot) => {
            const data = snapshot.val();
        });
    }
}