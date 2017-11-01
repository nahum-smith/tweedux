export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Nahum Smith',
        avatar: 'https://avatars2.githubusercontent.com/u/22522782?v=4',
        uid: 'nahum-smith',
        timestamp: Date.now(),
      })
    }, 2000)
  })
}
