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
        this.rtcPeerConnection.addTrack(this.videoTrack, this.mediaStream);
    }

    get audioTrack() {
        return this.mediaStream.getAudioTracks()[0]
    }
    get videoTrack() {
        return this.mediaStream.getVideoTracks()[0]
    }

    async offer() {
       const sessionDescription =  await this.createOffer();
       await this.setLocalDescription(sessionDescription)
       await this.sendOffer()
    }

    async createOffer() {
        try{
            return await this.rtcPeerConnection.createOffer();
        } catch (e) {
            console.error(e)
        }
    }
    async setLocalDescription(sessionDescription){
        try{
            await this.rtcPeerConnection.setLocalDescription(sessionDescription)
        } catch(error) {
            console.log({error})
        }
    }
    async sendOffer() {
        this.firebaseSignallingClient.setPeerNames(
            this.localPeername,
            this.remotePeername
        );
        // 自分の画面をシグナリングサーバーに送る
        await this.firebaseSignallingClient.sendOffer(this.localDescription)
    }

    setOntrack() {
        this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
            if (rtcTrackEvent.track.kind !== "video") return;
            
            const remoteMediaStream =  rtcTrackEvent.streams[0];
            this.remoteVideoRef.current.srcObject = remoteMediaStream;
            this.setRtcClient();
        }
        this.setRtcClient();
    }

    async answer(sender, sessionDescription) {
        try{
            this.remotePeername = sender;
            this.setOnicecandidateCallback();
            this.setOntrack();
            await this.setRemoteDescription(sessionDescription)
            const answer = await this.rtcPeerConnection.createAnswer();
            this.rtcPeerConnection.setLocalDescription(answer)
            await this.sendAnswer();
        }catch(e){
            console.log(e)
        }
    }
    
    async connect(remotePeername) {
        this.remotePeername = remotePeername;
        this.setOnicecandidateCallback();
        this.setOntrack();
        await this.offer();
        this.setRtcClient();
    }

    async setRemoteDescription(sessionDescription) {
        return await this.rtcPeerConnection.setRemoteDescription(sessionDescription)
    }

    sendAnswer() {
        this.firebaseSignallingClient.setPeernames(
            this.localPeername,
            this.remotePeername
        )
        this.firebaseSignallingClient.sendAnswer(this.localDescription);
    }


    get localDescription() {
        return this.rtcPeerConnection.localDescription.toJSON();
    }
    setOnicecandidateCallback(){
        this.rtcPeerConnection.onicecandidate = ({candidate}) => {
            if (candidate) {
                // Send the candidate to the remote peer
            } else {
                // All ICE candidates have been sent
            }
        }
    }

    startListening(localPeername) {
        this.localPeername = localPeername;
        this.setRtcClient();
        this.firebaseSignallingClient.database
        .ref(localPeername)
        .on('value', async (snapshot) => {
            const data = snapshot.val();
            if (data === null) return;
            console.log({ data })
            const { sender, sessionDescription, type } = data;
            switch(type){
                case 'offer':
                    await this.answer(sender, sessionDescription)
                    break;
                default:
                    break;
            }
        });
    }
}