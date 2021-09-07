import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(staticWebsiteEnvironment, params, viewer) {
    const cloudfront = await staticWebsiteEnvironment.cloudfront()
    const {distributionId} = staticWebsiteEnvironment
    if (!distributionId) return
    const {Distribution} = await cloudfront.getDistribution({Id: distributionId}).promise()
    return Distribution.DomainName
  }
})
