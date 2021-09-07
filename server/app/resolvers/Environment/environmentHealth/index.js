import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import checkAppPermission from 'app/helpers/checkAppPermission'
import returns from './returns'
import init from './init'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: String
    }
  },
  returns,
  cache: 5000,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, environmentName}, viewer) {
    const app = await Apps.findOne(appId)
    const beanstalk = await app.beanstalk()
    const result = await beanstalk
      .describeEnvironmentHealth({
        AttributeNames: ['All'],
        EnvironmentName: environmentName
      })
      .promise()

    return init(result)
  }
})
