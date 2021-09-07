import {Model} from '@orion-js/app'

export default new Model({
  name: 'EnvironmentDeploymentOptions',
  schema: {
    deploymentPolicy: {
      type: String,
      allowedValues: ['allAtOnce', 'rolling', 'rollingWithAdditionalBatch', 'immutable']
    },
    batchSize: {
      type: Number
    }
  }
})
