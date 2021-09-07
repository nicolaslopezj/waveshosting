import StaticWebsites from 'app/collections/StaticWebsites'
import {resolver} from '@orion-js/app'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'

export default resolver({
  params: {
    staticWebsiteId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  checkPermission: checkStaticWebsitePermission,
  async resolve({staticWebsiteId}, viewer) {
    await StaticWebsites.remove(staticWebsiteId)

    return true
  }
})
