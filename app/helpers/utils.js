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
