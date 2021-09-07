import {resolver} from '@orion-js/app'
import Environment from 'app/models/Environment'
import DeploymentOptions from 'app/models/Environment/DeploymentOptions'
import Apps from 'app/collections/Apps'
import checkAppPermission from 'app/helpers/checkAppPermission'
import getUpdatesOptions from './getUpdatesOptions'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: String
    },
    options: {
      type: DeploymentOptions,
      optional: true
    }
  },
  returns: Environment,
  mutation: true,
  async checkPermission(params, viewer) {
    return await checkAppPermission(params, viewer)
  },
  async resolve(params, viewer) {
    const {appId, environmentName, options} = params
    const app = await Apps.findOne(appId)

    const policyMap = {
      allAtOnce: 'AllAtOnce',
      rolling: 'Rolling',
      rollingWithAdditionalBatch: 'RollingWithAdditionalBatch',
      immutable: 'Immutable'
    }

    const settings = [
      ...getUpdatesOptions(options),
      {
        Namespace: 'aws:elasticbeanstalk:command',
        OptionName: 'DeploymentPolicy',
        Value: policyMap[options.deploymentPolicy]
      },
      {
        Namespace: 'aws:elasticbeanstalk:command',
        OptionName: 'BatchSize',
        Value: `${options.batchSize}`
      },
      {
        Namespace: 'aws:elasticbeanstalk:command',
        OptionName: 'BatchSizeType',
        Value: 'Fixed'
      }
    ]

    const env = await app.updateEnvironmentSettings({environmentName, settings})

    return env
  }
})
