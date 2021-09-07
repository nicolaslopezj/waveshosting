import {resolver} from '@orion-js/app'
import StaticWebsite from 'app/models/StaticWebsite'
import StaticWebsites from 'app/collections/StaticWebsites'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'

export default resolver({
  params: {
    staticWebsiteId: {
      type: 'ID'
    }
  },
  returns: StaticWebsite,
  checkPermission: checkStaticWebsitePermission,
  async resolve({staticWebsiteId}, viewer) {
    return await StaticWebsites.findOne(staticWebsiteId)
  }
})
