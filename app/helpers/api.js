import { ref } from 'config/constants'

export function saveToTweeds (tweed) {
  const tweedId = ref.child('tweeds').push().key
  const tweedPromise = ref.child(`tweeds/${tweedId}`).set({...tweed, tweedId})
  return {
    tweedId,
    tweedPromise,
  }
}

export function saveToUsersTweeds (tweed, tweedId) {
  return ref.child(`usersTweeds/${tweed.uid}/${tweedId}`)
    .set({...tweed, tweedId})
}

export function saveLikeCount (tweedId) {
  return ref.child(`likeCount/${tweedId}`).set(0)
}

export function saveTweed (tweed) {
  const { tweedId, tweedPromise } = saveToTweeds(tweed)

  return Promise.all([
    tweedPromise,
    saveToUsersTweeds(tweed, tweedId),
    saveLikeCount(tweedId),
  ]).then(() => {
    return {
      ...tweed,
      tweedId,
    }
  })
}

export function listenToFeed (cb, errorCB) {
  ref.child('tweeds').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    const args = { feed, sortedIds }
    cb(args)
  }, errorCB)
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, tweedId) {
  return ref.child(`usersLikes/${uid}/${tweedId}`).set(true)
}

export function deleteFromUsersLikes (uid, tweedId) {
  return ref.child(`usersLikes/${uid}/${tweedId}`).set(null)
}

export function incrementNumberOfLikes (tweedId) {
  return ref.child(`likeCount/${tweedId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (tweedId) {
  return ref.child(`likeCount/${tweedId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchUsersTweeds (uid) {
  return ref.child(`usersTweeds/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
export function fetchTweed (tweedId) {
  return ref.child(`tweeds/${tweedId}`).once('value')
    .then((snapshot) => snapshot.val())
}
export function fetchTweedLikeCount (tweedId) {
  return ref.child(`likeCount/${tweedId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}
export function postReply (tweedId, reply) {
  const replyId = ref.child(`replies/${tweedId}`).push().key
  const replyWithId = {...reply, replyId}
  const replyPromise = ref.child(`replies/${tweedId}/${replyId}`).set(replyWithId)
  return {
    replyWithId,
    replyPromise,
  }
}
export function fetchReplies (tweedId) {
  return ref.child(`replies/${tweedId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
