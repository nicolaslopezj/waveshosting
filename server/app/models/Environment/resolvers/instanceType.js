import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(environment, params, viewer) {
    return await environment.option({
      namespace: 'aws:autoscaling:launchconfiguration',
      optionName: 'InstanceType'
    })
  }
})
