import {resolver} from '@orion-js/app'

export default resolver({
  returns: Boolean,
  async resolve(staticWebsiteEnvironment, params, viewer) {
    if (!staticWebsiteEnvironment.distributionId) return false

    const config = await staticWebsiteEnvironment.getDistributionConfig()
    const {Enabled} = config.DistributionConfig
    return Enabled
  }
})
