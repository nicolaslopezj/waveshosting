import getCredentials from './getCredentials'

export default async function() {
  return !!getCredentials().length
}
