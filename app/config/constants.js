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
// Provide custom logger which prefixes log statements with "[FIREBASE]"
// firebase.database.enableLogging(function(message) {
//   console.log("[FIREBASE]", message);
// })

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersTweedsExpirationLength = 100000
export const userExpirationlength = 100000
