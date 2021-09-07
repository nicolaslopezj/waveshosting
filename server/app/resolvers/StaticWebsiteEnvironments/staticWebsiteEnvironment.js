import {resolver} from '@orion-js/app'
import StaticWebsiteEnvironment from 'app/models/StaticWebsiteEnvironment'
import StaticWebsiteEnvironments from 'app/collections/StaticWebsiteEnvironments'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'

export default resolver({
  params: {
    environmentName: {
      type: 'ID'
    },
    staticWebsiteId: {
      type: 'ID'
    }
  },
  returns: StaticWebsiteEnvironment,
  checkPermission: checkStaticWebsitePermission,
  async resolve({environmentName, staticWebsiteId}, viewer) {
    return await StaticWebsiteEnvironments.findOne({name: environmentName, staticWebsiteId})
  }
})
