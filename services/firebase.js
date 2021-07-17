import firebase from "firebase/app";
import "firebase/auth";

const config = {
apiKey: "AIzaSyBdJSSsIDI2xfAhdWhcIjjzrCAEFoXbo7E",
authDomain: "babitz.firebaseapp.com",
projectId: "babitz",
storageBucket: "babitz.appspot.com",
messagingSenderId: "500355572360",
appId: "1:500355572360:web:c04e9f2bf594ac9d79b53d"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  const auth = firebase.auth();
}
