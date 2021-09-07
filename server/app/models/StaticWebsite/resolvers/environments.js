import {resolver} from '@orion-js/app'
import StaticWebsiteEnvironment from 'app/models/StaticWebsiteEnvironment'
import StaticWebsiteEnvironments from 'app/collections/StaticWebsiteEnvironments'

export default resolver({
  returns: [StaticWebsiteEnvironment],
  async resolve(staticWebsite, params, viewer) {
    return await StaticWebsiteEnvironments.find({staticWebsiteId: staticWebsite._id}).toArray()
  }
})
