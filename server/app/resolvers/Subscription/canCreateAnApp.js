import {resolver} from '@orion-js/app'

export default resolver({
  returns: Boolean,
  async resolve(params, viewer) {
    return true
  }
})
