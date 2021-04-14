export default class RtcClient {
    constructor(setRtcClient) {
        const config = {
            // スタンサーバーの情報
            // このクライアントがインターンネット上でどのIPアドレスになるかを教えてくれる
            iceServers: [{urls: "stun:stun.stunprotocol.org"}]
        }
        this.rtcPeerConnection = new RTCPeerConnection(config);
        this.localPeername = '';
        this.remotePeername = '';
        this._setRtcClient = setRtcClient;
    }
    setRtcClient() {
        this._setRtcClient(this);
    }
}