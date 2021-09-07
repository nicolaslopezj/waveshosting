import {resolver} from '@orion-js/app'
import DeploymentOptions from '../../DeploymentOptions'

const policyMap = {
  AllAtOnce: 'allAtOnce',
  Rolling: 'rolling',
  RollingWithAdditionalBatch: 'rollingWithAdditionalBatch',
  Immutable: 'immutable'
}

export default resolver({
  returns: DeploymentOptions,
  async resolve(environment, params, viewer) {
    const options = {}

    const policy =
      (await environment.option({
        namespace: 'aws:elasticbeanstalk:command',
        optionName: 'DeploymentPolicy'
      })) || 'AllAtOnce'

    options.deploymentPolicy = policyMap[policy]

    options.batchSize = Number(
      await environment.option({
        namespace: 'aws:elasticbeanstalk:command',
        optionName: 'BatchSize'
      })
    )

    return options
  }
})
