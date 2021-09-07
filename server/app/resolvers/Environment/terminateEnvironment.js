import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import App from 'app/models/App'
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
  returns: App,
  requireTwoFactor: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, environmentName}, viewer) {
    const app = await Apps.findOne(appId)
    const beanstalk = await app.beanstalk()

    await beanstalk.terminateEnvironment({EnvironmentName: environmentName}).promise()

    return app
  }
})
