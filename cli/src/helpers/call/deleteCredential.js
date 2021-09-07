import setCredentials from './setCredentials'
import getCredentials from './getCredentials'

export default function(credentialId) {
  const credentials = getCredentials()
  for (let i = 0; i < credentials.length; i++) {
    const session = credentials[i]
    if (session._id === credentialId) {
      credentials.splice(i, 1)
      setCredentials(credentials)
      return
    }
  }
}
