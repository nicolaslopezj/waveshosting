import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import Environment from 'app/models/Environment'
import checkAppPermission from 'app/helpers/checkAppPermission'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: 'ID'
    },
    instanceType: {
      type: String
    }
  },
  returns: Environment,
  mutation: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve({appId, environmentName, instanceType}, viewer) {
    const app = await Apps.findOne(appId)

    const settings = [
      {
        Namespace: 'aws:autoscaling:launchconfiguration',
        OptionName: 'InstanceType',
        Value: instanceType
      }
    ]

    const env = await app.updateEnvironmentSettings({environmentName, settings})

    return env
  }
})
