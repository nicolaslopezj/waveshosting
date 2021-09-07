import {resolver} from '@orion-js/app'
import StaticWebsiteEnvironments from 'app/collections/StaticWebsiteEnvironments'
import StaticWebsiteEnvironment from 'app/models/StaticWebsiteEnvironment'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'
import buildEnvironment from './buildEnvironment'

export default resolver({
  params: {
    name: {
      type: String,
      label: 'Name'
    },
    staticWebsiteId: {
      type: 'ID'
    }
  },
  returns: StaticWebsiteEnvironment,
  checkPermission: checkStaticWebsitePermission,
  mutation: true,
  async resolve({name, staticWebsiteId}, viewer) {
    const environmentId = await StaticWebsiteEnvironments.insert({
      name,
      staticWebsiteId,
      createdAt: new Date()
    })
    const environment = await StaticWebsiteEnvironments.findOne(environmentId)
    await buildEnvironment(environment)

    return environment
  }
})
