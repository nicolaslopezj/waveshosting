import getEnv from './getEnv'

const urls = {
  local: `http://${window.location.hostname}:3000`,
  dev: 'https://api.beta.waveshosting.com',
  prod: 'https://api.waveshosting.com'
}

const env = getEnv()

if (env !== 'local' && window.location.protocol !== 'https:') {
  window.location.protocol = 'https:'
}

export default urls[env]
