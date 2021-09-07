import setCredentials from './setCredentials'
import getCredentials from './getCredentials'

export default function(credential) {
  const credentials = getCredentials()
  credentials.push(credential)
  setCredentials(credentials)
}
