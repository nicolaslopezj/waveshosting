import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(staticWebsiteVersion, params, viewer) {
    return 'v' + staticWebsiteVersion.number
  }
})
