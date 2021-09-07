import {resolver} from '@orion-js/app'
import StaticWebsite from 'app/models/StaticWebsite'
import StaticWebsites from 'app/collections/StaticWebsites'

export default resolver({
  returns: StaticWebsite,
  async resolve(staticWebsiteEnvironment, params, viewer) {
    return await StaticWebsites.findOne(staticWebsiteEnvironment.staticWebsiteId)
  }
})
