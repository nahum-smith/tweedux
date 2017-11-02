import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAgvllXXFFIki2DqoqVzP5h8g1aVLBOYBs",
  authDomain: "tweedux-dadb5.firebaseapp.com",
  databaseURL: "https://tweedux-dadb5.firebaseio.com",
  projectId: "tweedux-dadb5",
  storageBucket: "tweedux-dadb5.appspot.com",
  messagingSenderId: "196467033228"
}

firebase.initializeApp(config)
console.log(firebase)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
