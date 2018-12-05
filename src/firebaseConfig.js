import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCuoNYYLLuSmcJVyDkYyjAVo8j_dHaRxWE",
  authDomain: "netflix-cln.firebaseapp.com",
  databaseURL: "https://netflix-cln.firebaseio.com",
  projectId: "netflix-cln",
  storageBucket: "netflix-cln.appspot.com",
  messagingSenderId: "211714319276"
};

export default firebase.initializeApp(config);
