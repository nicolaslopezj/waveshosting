import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(token, params, viewer) {
    return token.publicKey + ':' + token.secretKey + ':' + token.userId
  }
})
