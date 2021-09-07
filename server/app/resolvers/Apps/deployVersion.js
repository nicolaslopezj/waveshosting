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
    version: {
      type: String
    },
    environment: {
      type: String
    }
  },
  returns: Environment,
  mutation: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, version, environment}, viewer) {
    const app = await Apps.findOne(appId)
    const beanstalk = await app.beanstalk()

    const result = await beanstalk
      .updateEnvironment({
        ApplicationName: appId,
        EnvironmentName: environment,
        VersionLabel: version
      })
      .promise()

    return init(result)
  }
})
