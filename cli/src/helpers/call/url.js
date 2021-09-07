import env from './env'

const urls = {
  local: 'http://localhost:3000/graphql',
  beta: 'http://api.beta.waveshosting.com/graphql',
  prod: 'https://api.waveshosting.com/graphql'
}

export default urls[env]
