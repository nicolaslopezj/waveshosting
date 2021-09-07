import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(token, params, viewer) {
    if (!token.options) return ''
    return token.options.name
  }
})
