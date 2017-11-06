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
