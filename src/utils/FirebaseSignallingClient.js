import firebase from 'firebase/app';
import 'firebase/database';


export default class FirebaseSignallingClient {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyCAfqU0B1l4Hw-vu38gjUnn8yKyjjQ3QwA",
            authDomain: "webrtc-react-firebase-42cd1.firebaseapp.com",
            databaseURL: "https://webrtc-react-firebase-42cd1-default-rtdb.firebaseio.com",
            projectId: "webrtc-react-firebase-42cd1",
            storageBucket: "webrtc-react-firebase-42cd1.appspot.com",
            messagingSenderId: "1045683611594",
            appId: "1:1045683611594:web:e23ebf0d8cc3cd6964d133"
        };

        if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.localPeername = '';
        this.remotePeername = '';
    } 
}
