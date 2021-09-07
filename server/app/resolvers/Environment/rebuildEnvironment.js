import {resolver} from '@orion-js/app'
import Environment from 'app/models/Environment'
import Apps from 'app/collections/Apps'
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
  mutation: true,
  returns: Environment,
  requireTwoFactor: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, environmentName}, viewer) {
    const app = await Apps.findOne(appId)
    const beanstalk = await app.beanstalk()

    await beanstalk.rebuildEnvironment({EnvironmentName: environmentName}).promise()

    return await app.environment({environmentName})
  }
})
