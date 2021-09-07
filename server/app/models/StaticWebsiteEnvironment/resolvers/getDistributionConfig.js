import {resolver} from '@orion-js/app'

export default resolver({
  returns: 'blackbox',
  cache: 10,
  async resolve(staticWebsiteEnvironment, params, viewer) {
    const cloudfront = await staticWebsiteEnvironment.cloudfront()
    return await cloudfront
      .getDistributionConfig({Id: staticWebsiteEnvironment.distributionId})
      .promise()
  }
})
