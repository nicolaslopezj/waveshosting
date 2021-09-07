import writeFile from '../writeFile'
import getCredentialsPath from './getCredentialsPath'

export default function(credentials) {
  writeFile(getCredentialsPath(), JSON.stringify(credentials, null, 2))
}
