import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: Boolean,
  async resolve({userId}, params, viewer) {
    return userId === viewer.userId
  }
})
