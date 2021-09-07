import {resolver} from '@orion-js/app'
import StaticWebsiteVersion from 'app/models/StaticWebsiteVersion'
import StaticWebsiteVersions from 'app/collections/StaticWebsiteVersions'

export default resolver({
  returns: [StaticWebsiteVersion],
  async resolve(staticWebsite, params, viewer) {
    return await StaticWebsiteVersions.find({staticWebsiteId: staticWebsite._id})
      .sort({number: -1})
      .toArray()
  }
})
