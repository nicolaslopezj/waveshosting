import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(staticWebsiteEnvironment, params, viewer) {
    if (!staticWebsiteEnvironment.distributionId) return 'Terminated'

    const cloudfront = await staticWebsiteEnvironment.cloudfront()
    const distribution = await cloudfront
      .getDistribution({Id: staticWebsiteEnvironment.distributionId})
      .promise()

    return distribution.Status
  }
})
