import {resolver} from '@orion-js/app'
import StaticWebsiteEnvironments from 'app/collections/StaticWebsiteEnvironments'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'
import deleteResources from './deleteResources'

export default resolver({
  params: {
    environmentName: {
      type: 'ID'
    },
    staticWebsiteId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  checkPermission: checkStaticWebsitePermission,
  requireTwoFactor: true,
  mutation: true,
  async resolve({environmentName, staticWebsiteId}, viewer) {
    const environment = await StaticWebsiteEnvironments.findOne({
      name: environmentName,
      staticWebsiteId
    })
    await deleteResources(environment)

    await StaticWebsiteEnvironments.deleteOne(environment._id)
  }
})
