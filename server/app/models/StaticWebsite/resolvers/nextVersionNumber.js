import {resolver} from '@orion-js/app'
import StaticWebsiteVersions from 'app/collections/StaticWebsiteVersions'

export default resolver({
  returns: Number,
  async resolve(staticWebsiteEnvironment, params, viewer) {
    const {_id: staticWebsiteId} = staticWebsiteEnvironment
    const last = (await StaticWebsiteVersions.findOne({staticWebsiteId}, {sort: {number: -1}})) || {
      number: 0
    }
    return last.number + 1
  }
})
