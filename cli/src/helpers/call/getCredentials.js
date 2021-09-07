import fs from 'fs'
import getCredentialsPath from './getCredentialsPath'
import setCredentials from './setCredentials'

export default function() {
  try {
    const content = fs.readFileSync(getCredentialsPath()).toString()
    if (!content) return []
    return JSON.parse(content) || []
  } catch (e) {
    console.log('Credentials file is corrupted, resetting sessions')
    setCredentials([])
    return []
  }
}
