import { ref, firebaseAuth } from 'config/constants'

// export function auth () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         name: 'Nahum Smith',
//         avatar: 'https://avatars2.githubusercontent.com/u/22522782?v=4',
//         uid: 'nahum-smith',
//         timestamp: Date.now(),
//       })
//     }, 3000)
//   })
// }

/* eslint no-undef: "off" */

export function auth () {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
}
export function checkIfAuthed (store) {
  return store.getState().isAuthed
}
export function logout () {
  return firebaseAuth().signOut()
}
export function saveUser (user) {
  console.info('save user', user)
  const userURL = ref.child(`users/${user.uid}`)
  return userURL.set(user).then(() => {
    return userURL.once('value')
  })
}
