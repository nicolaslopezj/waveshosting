import {resolver} from '@orion-js/app'
import StaticWebsiteEnvironment from 'app/models/StaticWebsiteEnvironment'
import StaticWebsiteEnvironments from 'app/collections/StaticWebsiteEnvironments'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'
import buildEnvironment from '../createStaticWebsiteEnvironment/buildEnvironment'
import deleteResources from '../terminateStaticWebsiteEnvironment/deleteResources'

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
  requireTwoFactor: true,
  mutation: true,
  async resolve({environmentName, staticWebsiteId}, viewer) {
    const environment = await StaticWebsiteEnvironments.findOne({
      name: environmentName,
      staticWebsiteId
    })
    await deleteResources(environment)
    await buildEnvironment(environment)
  }
})
