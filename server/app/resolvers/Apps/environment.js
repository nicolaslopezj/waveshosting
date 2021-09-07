import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import Environment from 'app/models/Environment'
import init from 'app/models/Environment/init'
import checkAppPermission from 'app/helpers/checkAppPermission'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: String
    }
  },
  returns: Environment,
  cache: 1000,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, environmentName}, viewer) {
    const app = await Apps.findOne(appId)
    const beanstalk = await app.beanstalk()
    const {Environments: items} = await beanstalk
      .describeEnvironments({
        ApplicationName: app._id,
        EnvironmentNames: [environmentName]
      })
      .promise()
    if (!items[0]) return null

    return init(items[0])
  }
})
