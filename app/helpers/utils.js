import { userExpirationlength, usersTweedsExpirationLength } from 'config/constants'

export const formatUserInfo = (name, avatar, uid) => {
  return {
    name,
    avatar,
    uid,
  }
}
export const formatTweed = (text, { name, avatar, uid }) => {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}

export function formatTimeStamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime - new Date(timestamp).getTime()
}
export function staleUser (timestamp) {
  return getMilliseconds(timestamp) > userExpirationlength
}

export function staleTweeds (timestamp) {
  return getMilliseconds(timestamp) > usersTweedsExpirationLength
}

export function formatReply ({ name, uid, avatar }, reply) {
  return {
    name,
    reply,
    uid,
    avatar,
    timestamp: Date.now(),
  }
}
