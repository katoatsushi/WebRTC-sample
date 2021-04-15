import FirebaseSignallingClient from "./FirebaseSignallingClient";
export default class RtcClient {
    constructor(remoteVideoRef, setRtcClient) {
        const config = {
            // このクライアントがインターンネット上でどのIPアドレスになるかを教えてくれる
            iceServers: [{urls: "stun:stun.stunprotocol.org"}]
        }
        this.rtcPeerConnection = new RTCPeerConnection(config);
        this.firebaseSignallingClient = new FirebaseSignallingClient()
        this.localPeername = '';
        this.remotePeername = '';
        this.remoteVideoRef = remoteVideoRef;
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

    //メディアストリームを設定するためのメソッド
    async setMediaStream() {
        await this.getUserMedia();
        // 相手のビデオと音声を取得
        this.addTracks()
        this.setRtcClient();
    }

    addTracks(){
        this.addAudioTrack();
        this.addVideoTrack();
    }

    addAudioTrack(){
        // 相手側に自分の音声Trackを送信
        this.rtcPeerConnection.addTrack(this.audioTrack, this.mediaStream);
    }

    addVideoTrack(){
        // 相手側に自分のビデオTrackを送信
        console.log({MediaStream: this.mediaStream})
        this.rtcPeerConnection.addTrack(this.videoTrack, this.mediaStream);
    }

    get audioTrack() {
        return this.mediaStream.getAudioTracks()[0]
    }
    get videoTrack() {
        return this.mediaStream.getVideoTracks()[0]
    }

    startListening(localPeername) {
        this.localPeername = localPeername;
        this.setRtcClient();
        this.firebaseSignallingClient.database.ref(localPeername).on('value', (snapshot) => {
            const data = snapshot.val();
        });
    }
}